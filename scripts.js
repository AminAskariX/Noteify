/*!
 * Noteify
 * Copyright (c) M. Amin Askari
 * Licensed under the MIT License. See LICENSE.
 */
const $ = id => document.getElementById(id);
const NOTES_KEY = 'noteify_notes', CATEGORIES_KEY = 'noteify_categories';
function readArray(key) {
  try { const value = JSON.parse(localStorage.getItem(key) || '[]'); return Array.isArray(value) ? value : []; }
  catch { return []; }
}
let notes = readArray(NOTES_KEY);
let categories = readArray(CATEGORIES_KEY);
if (!categories.includes('متفرقه')) categories.unshift('متفرقه');
let editingId = null, timer = null;
function save() {
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    return true;
  } catch { alert('فضای ذخیره‌سازی مرورگر در دسترس نیست.'); return false; }
}
function clearForm() {
  $('note-title').value = $('note-content').value = $('note-reminder').value = '';
  $('note-category').value = 'متفرقه';
  editingId = null;
  $('add-note').textContent = '➕ افزودن یادداشت';
  $('cancel-edit').hidden = true;
}
function dueCheck() {
  clearTimeout(timer);
  const now = Date.now();
  let changed = false;
  for (const note of notes) {
    const when = Date.parse(note.reminder || '');
    if (!note.notified && Number.isFinite(when) && when <= now) {
      note.notified = true;
      changed = true;
      $('reminder-status').textContent = '⏰ زمان یادداشت «' + note.title + '» رسیده است.';
      if ('Notification' in window && Notification.permission === 'granted')
        new Notification('یادآور Noteify', { body: note.title });
    }
  }
  if (changed) { save(); renderNotes(); }
  const next = notes.map(note => note.notified ? NaN : Date.parse(note.reminder || ''))
    .filter(when => Number.isFinite(when) && when > now).sort((a,b) => a-b)[0];
  if (next) timer = setTimeout(dueCheck, Math.min(next-now, 2147483647));
}
function renderCategories() {
  const select = $('note-category'), list = $('category-list');
  select.replaceChildren(); list.replaceChildren();
  for (const category of categories) {
    const option = document.createElement('option');
    option.value = option.textContent = category;
    select.append(option);
    const li = document.createElement('li');
    li.append(document.createTextNode(category + ' '));
    if (category !== 'متفرقه') {
      const button = document.createElement('button');
      button.textContent = '🗑️';
      button.setAttribute('aria-label', 'حذف دستهٔ ' + category);
      button.onclick = () => {
        categories = categories.filter(item => item !== category);
        notes = notes.map(note => note.category === category ? {...note, category:'متفرقه'} : note);
        if (save()) { renderCategories(); renderNotes(); }
      };
      li.append(button);
    }
    list.append(li);
  }
}
function renderNotes() {
  const query = $('search-input').value.trim().toLocaleLowerCase('fa');
  const list = $('notes-container');
  list.replaceChildren();
  for (const note of notes.filter(item => (item.title + ' ' + item.content).toLocaleLowerCase('fa').includes(query))) {
    const li = document.createElement('li');
    for (const [className, value] of [
      ['note-title', note.title], ['note-content', note.content],
      ['note-meta', '📁 ' + note.category + ' | ⏰ ' + (note.reminder || 'بدون یادآور') + (note.notified ? ' · یادآوری شد' : '')]
    ]) {
      const div = document.createElement('div');
      div.className = className; div.textContent = value; li.append(div);
    }
    const actions = document.createElement('div'); actions.className = 'note-actions';
    const edit = document.createElement('button'); edit.textContent = 'ویرایش';
    edit.onclick = () => {
      editingId = note.id;
      $('note-title').value = note.title; $('note-content').value = note.content;
      $('note-category').value = note.category; $('note-reminder').value = note.reminder || '';
      $('add-note').textContent = '💾 ذخیرهٔ تغییرات'; $('cancel-edit').hidden = false;
      $('note-title').focus();
    };
    const remove = document.createElement('button'); remove.textContent = 'حذف';
    remove.onclick = () => {
      notes = notes.filter(item => item.id !== note.id);
      if (editingId === note.id) clearForm();
      if (save()) { renderNotes(); dueCheck(); }
    };
    actions.append(edit, remove); li.append(actions); list.append(li);
  }
}
$('add-note').onclick = async () => {
  const title = $('note-title').value.trim(), content = $('note-content').value.trim();
  const reminder = $('note-reminder').value;
  if (!title || !content) return alert('عنوان و متن یادداشت الزامی است.');
  if (reminder && !Number.isFinite(Date.parse(reminder))) return alert('زمان یادآور نامعتبر است.');
  if (reminder && 'Notification' in window && Notification.permission === 'default')
    await Notification.requestPermission();
  const previous = notes.find(note => note.id === editingId);
  const updated = {
    id: previous ? previous.id : String(Date.now()) + '-' + Math.random(),
    title, content, category: $('note-category').value || 'متفرقه', reminder,
    notified: previous && previous.reminder === reminder ? !!previous.notified : false
  };
  if (previous) notes = notes.map(note => note.id === previous.id ? updated : note);
  else notes.push(updated);
  if (save()) { clearForm(); renderNotes(); dueCheck(); }
};
$('cancel-edit').onclick = clearForm;
$('add-category').onclick = () => {
  const value = $('new-category').value.trim();
  if (!value || categories.includes(value)) return;
  categories.push(value);
  if (save()) { $('new-category').value = ''; renderCategories(); }
};
$('search-input').addEventListener('input', renderNotes);
$('export-notes').onclick = () => {
  const blob = new Blob([JSON.stringify({notes, categories}, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob), link = document.createElement('a');
  link.href = url; link.download = 'noteify-backup.json'; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};
$('import-notes').onchange = async event => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const data = JSON.parse(await file.text());
    if (!Array.isArray(data.notes) || !Array.isArray(data.categories) ||
        !data.notes.every(note => ['string','number'].includes(typeof note.id) &&
          typeof note.title === 'string' && typeof note.content === 'string' &&
          typeof note.category === 'string' && typeof note.reminder === 'string'))
      throw Error('invalid backup');
    if (!confirm('یادداشت‌های فعلی با فایل پشتیبان جایگزین شوند؟')) return;
    notes = data.notes.map(note => ({...note, notified: !!note.notified}));
    categories = ['متفرقه', ...new Set(data.categories.filter(value => typeof value === 'string' && value !== 'متفرقه'))];
    if (save()) { clearForm(); renderCategories(); renderNotes(); dueCheck(); }
  } catch { alert('فایل پشتیبان معتبر نیست.'); }
  finally { event.target.value = ''; }
};
if (localStorage.getItem('noteify_theme') === 'dark') document.body.classList.add('dark-mode');
$('theme-toggle').onclick = () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('noteify_theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
};
window.addEventListener('focus', dueCheck);
document.addEventListener('visibilitychange', () => { if (!document.hidden) dueCheck(); });
window.addEventListener('storage', event => {
  if (event.key === NOTES_KEY || event.key === CATEGORIES_KEY) {
    notes = readArray(NOTES_KEY); categories = readArray(CATEGORIES_KEY);
    if (!categories.includes('متفرقه')) categories.unshift('متفرقه');
    renderCategories(); renderNotes(); dueCheck();
  }
});
renderCategories(); renderNotes(); dueCheck();
