# مستندات پروژه Noteify

## توضیحات کلی

Noteify یک اپلیکیشن سبک و کارآمد برای مدیریت یادداشت‌ها است که به کاربران اجازه می‌دهد یادداشت‌های خود را سازماندهی کنند. این پروژه شامل قابلیت‌های زیر است:

- **دسته‌بندی یادداشت‌ها:** امکان گروه‌بندی یادداشت‌ها بر اساس موضوع.
- **جستجوی پیشرفته:** جستجوی یادداشت‌ها با کلمات کلیدی و دسته‌بندی.
- **سینک با LocalStorage:** ذخیره یادداشت‌ها در مرورگر به عنوان شبیه‌سازی سینک با فضای ابری.
- **رابط کاربری ساده و زیبا:** طراحی مینیمال برای استفاده راحت‌تر.

پشتیبانی این پروژه توسط **M.Amin Askari** ارائه می‌شود و می‌توانید اطلاعات بیشتر را در وب‌سایت‌های [Microservice.ir](https://microservice.ir) و [Metacortex.ir](https://metacortex.ir) پیدا کنید.

---

## قابلیت‌ها

### 1. دسته‌بندی یادداشت‌ها

- کاربران می‌توانند یادداشت‌های خود را بر اساس دسته‌بندی‌های شخصی، کاری و سایر گروه‌بندی کنند.

### 2. جستجوی پیشرفته

- امکان جستجو در متن و عنوان یادداشت‌ها وجود دارد.
- فیلتر کردن یادداشت‌ها بر اساس دسته‌بندی.

### 3. ذخیره در LocalStorage

- یادداشت‌ها به صورت خودکار در LocalStorage مرورگر ذخیره می‌شوند و پس از بستن مرورگر همچنان در دسترس خواهند بود.

### 4. رابط کاربری مدرن

- طراحی واکنش‌گرا (Responsive) برای دسترسی در تمامی دستگاه‌ها.
- استفاده از مدال (Modal) برای افزودن یادداشت‌های جدید.

---

## فایل‌ها و ساختار پروژه

```
Noteify/
├── index.html       # فایل اصلی HTML
├── styles.css       # فایل CSS برای استایل‌دهی
├── script.js        # فایل JavaScript برای عملکرد برنامه
```

---

## راه‌اندازی پروژه

### 1. پیش‌نیازها

- مرورگری با پشتیبانی از LocalStorage و جاوااسکریپت.

### 2. نحوه اجرا

1. فایل‌های پروژه را دانلود کنید.
2. فایل `index.html` را در مرورگر باز کنید.

---

## کد نمونه

### افزودن یادداشت جدید (JavaScript)

```javascript
noteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    const category = document.getElementById('noteCategory').value;

    const newNote = { title, content, category };
    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));

    renderNotes();
    modal.style.display = 'none';
    noteForm.reset();
});
```

---

## پشتیبانی

برای هرگونه سوال یا پیشنهاد، لطفاً با [M.Amin Askari](mailto\:support@microservice.ir) تماس بگیرید یا به وب‌سایت‌های زیر مراجعه کنید:

- [Microservice.ir](https://microservice.ir)
- [Metacortex.ir](https://metacortex.ir)

---

# Documentation for Noteify

## General Description

Noteify is a lightweight and efficient application for managing notes. It provides users with the ability to organize their notes easily. The key features include:

- **Note Categorization:** Group notes by topics.
- **Advanced Search:** Search notes by keywords and categories.
- **Sync with LocalStorage:** Save notes in the browser to simulate cloud sync.
- **Modern User Interface:** Minimalistic design for a better experience.

This project is supported by **M.Amin Askari**. For more information, visit [Microservice.ir](https://microservice.ir) and [Metacortex.ir](https://metacortex.ir).

---

## Features

### 1. Note Categorization

- Users can group their notes under categories such as personal, work, or others.

### 2. Advanced Search

- Search notes by their content and title.
- Filter notes based on categories.

### 3. LocalStorage Integration

- Notes are automatically saved in the browser's LocalStorage and remain accessible even after closing the browser.

### 4. Modern User Interface

- Responsive design accessible on all devices.
- Modal-based UI for adding new notes.

---

## Project Files and Structure

```
Noteify/
├── index.html       # Main HTML file
├── styles.css       # CSS file for styling
├── script.js        # JavaScript file for functionality
```

---

## Running the Project

### 1. Requirements

- A browser with LocalStorage and JavaScript support.

### 2. Steps

1. Download the project files.
2. Open the `index.html` file in your browser.

---

## Code Example

### Adding a New Note (JavaScript)

```javascript
noteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    const category = document.getElementById('noteCategory').value;

    const newNote = { title, content, category };
    notes.push(newNote);
    localStorage.setItem('notes', JSON.stringify(notes));

    renderNotes();
    modal.style.display = 'none';
    noteForm.reset();
});
```

---

## Support

For any questions or suggestions, please contact [M.Amin Askari](mailto\:support@microservice.ir) or visit the following websites:

- [Microservice.ir](https://microservice.ir)
- [Metacortex.ir](https://metacortex.ir)

