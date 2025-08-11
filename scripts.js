/*!
 * Project   : Noteify - Daily Note App
 * Author    : م.امین عسکری (M.Amin Askari)
 * Website   : aminaskarix.ir | microservice.ir | metacortex.ir
 * GitHub    : github.com/aminaskarix
 * License   : MIT License - Open Source ❤️
 * Year      : 2025
 */
// انتخاب المنت‌ها از DOM
const noteTitle = document.getElementById('note-title');
const noteContent = document.getElementById('note-content');
const noteCategory = document.getElementById('note-category');
const noteReminder = document.getElementById('note-reminder');
const addNoteBtn = document.getElementById('add-note');

const newCategoryInput = document.getElementById('new-category');
const addCategoryBtn = document.getElementById('add-category');
const categoryList = document.getElementById('category-list');

const searchInput = document.getElementById('search-input');
const notesContainer = document.getElementById('notes-container');

// کلیدها برای ذخیره‌سازی در localStorage
const NOTES_KEY = 'noteify_notes';
const CATEGORIES_KEY = 'noteify_categories';

let notes = [];
let categories = ['متفرقه'];

// بارگذاری اطلاعات از localStorage
window.onload = function () {
  const storedNotes = localStorage.getItem(NOTES_KEY);
  const storedCategories = localStorage.getItem(CATEGORIES_KEY);

  notes = storedNotes ? JSON.parse(storedNotes) : [];
  categories = storedCategories ? JSON.parse(storedCategories) : ['متفرقه'];

  renderCategories();
  renderNotes();
};

// 📌 تابع ذخیره‌سازی در localStorage
function saveToStorage() {
  localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}

// ✍ افزودن یادداشت
addNoteBtn.addEventListener('click', () => {
  const title = noteTitle.value.trim();
  const content = noteContent.value.trim();
  const category = noteCategory.value || 'متفرقه';
  const reminder = noteReminder.value;

  if (!title || !content) return alert('عنوان و متن یادداشت الزامی است!');

  const id = Date.now();
  notes.push({ id, title, content, category, reminder });
  saveToStorage();
  renderNotes();
  clearForm();

  if (reminder) scheduleReminder(id, title, reminder);
});

// 🔁 پاک کردن فرم
function clearForm() {
  noteTitle.value = '';
  noteContent.value = '';
  noteCategory.value = '';
  noteReminder.value = '';
}

// 📚 رندر کردن یادداشت‌ها
function renderNotes(filtered = null) {
  const data = filtered || notes;
  notesContainer.innerHTML = '';

  data.forEach(note => {
    const li = document.createElement('li');

    li.innerHTML = `
      <div class="note-title">${note.title}</div>
      <div class="note-content">${note.content}</div>
      <div class="note-meta">📁 ${note.category} | ⏰ ${note.reminder || 'بدون یادآور'}</div>
      <div class="note-actions">
        <button class="edit">ویرایش</button>
        <button class="delete">حذف</button>
      </div>
    `;

    // حذف یادداشت
    li.querySelector('.delete').onclick = () => {
      notes = notes.filter(n => n.id !== note.id);
      saveToStorage();
      renderNotes();
    };

    // ویرایش یادداشت
    li.querySelector('.edit').onclick = () => {
      noteTitle.value = note.title;
      noteContent.value = note.content;
      noteCategory.value = note.category;
      noteReminder.value = note.reminder;
      notes = notes.filter(n => n.id !== note.id);
      saveToStorage();
      renderNotes();
    };

    notesContainer.appendChild(li);
  });
}

// 📁 مدیریت دسته‌بندی‌ها
addCategoryBtn.addEventListener('click', () => {
  const newCat = newCategoryInput.value.trim();
  if (!newCat) return;
  if (categories.includes(newCat) || newCat === 'متفرقه') return;

  categories.push(newCat);
  saveToStorage();
  renderCategories();
  newCategoryInput.value = '';
});

function renderCategories() {
  // برای فرم انتخاب
  noteCategory.innerHTML = '';
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.textContent = cat;
    noteCategory.appendChild(option);
  });

  // برای لیست نمایش
  categoryList.innerHTML = '';
  categories.forEach(cat => {
    const li = document.createElement('li');
    li.textContent = cat;

    if (cat !== 'متفرقه') {
      const delBtn = document.createElement('button');
      delBtn.textContent = '🗑️';
      delBtn.onclick = () => {
        categories = categories.filter(c => c !== cat);
        notes = notes.map(n => n.category === cat ? { ...n, category: 'متفرقه' } : n);
        saveToStorage();
        renderCategories();
        renderNotes();
      };
      li.appendChild(delBtn);
    }

    categoryList.appendChild(li);
  });
}

// 🔍 جستجو در یادداشت‌ها
searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase();
  const filtered = notes.filter(n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q));
  renderNotes(filtered);
});

// ⏰ تنظیم یادآور با نوتیفیکیشن مرورگر
function scheduleReminder(id, title, datetime) {
  const time = new Date(datetime).getTime() - Date.now();
  if (time <= 0) return;

  setTimeout(() => {
    showNotification(title);
  }, time);
}

// 🛎️ نمایش نوتیفیکیشن مرورگر
function showNotification(title) {
  if (Notification.permission === 'granted') {
    new Notification(`یادآور Noteify`, {
      body: `⏰ زمان یادداشت: ${title}`,
      icon: 'https://cdn-icons-png.flaticon.com/512/1827/1827272.png'
    });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        showNotification(title);
      }
    });
  }
}
// 🌗 تغییر تم (Dark/Light Mode)
const themeToggleBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('noteify_theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
}

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  localStorage.setItem('noteify_theme', isDark ? 'dark' : 'light');
});
