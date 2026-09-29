# 📝 Noteify

[فارسی](#فارسی) · [English](#english)

<a id="فارسی"></a>
## 🇮🇷 فارسی

برنامهٔ سبک یادداشت‌برداری فارسی که داده‌هایش را در مرورگر نگه می‌دارد.

### 🚀 امکانات

- ایجاد، ویرایش و حذف یادداشت؛ دسته‌بندی و جست‌وجوی عنوان یا متن.
- افزودن و حذف دسته‌بندی‌های دلخواه و انتقال یادداشت‌های دستهٔ حذف‌شده به «متفرقه».
- تغییر پوسته و اعلان یادآور با مجوز مرورگر.

### 🛠️ اجرا

مخزن را با `git clone https://github.com/AminAskariX/Noteify.git` دریافت کنید و `index.html` را در مرورگر باز کنید. برای اعلان‌ها، مجوز مرورگر و محیط سازگار لازم است.

### ⚠️ محدودیت فعلی

داده‌ها در `localStorage` همین مرورگر ذخیره می‌شوند و همگام‌سازی ندارند. تایمر یادآور فقط هنگام افزودن یادداشت در صفحهٔ باز ثبت می‌شود؛ پس از بستن یا بارگذاری دوبارهٔ صفحه دوباره زمان‌بندی نمی‌شود. ویرایش، یادداشت قبلی را از فهرست حذف و اطلاعاتش را به فرم منتقل می‌کند؛ برای ثبت نسخهٔ تازه باید دوباره آن را ذخیره کنید.

### 💡 یک جریان ساده برای یادداشت‌ها

یادداشت را با عنوان و متن ثبت کنید، آن را به یک دسته نسبت دهید و بعداً با جست‌وجوی عنوان یا محتوا پیدا کنید. دستهٔ «متفرقه» همیشه در دسترس است؛ حذف یک دستهٔ دیگر، یادداشت‌های آن را به «متفرقه» منتقل می‌کند. پوستهٔ انتخاب‌شده نیز در همان مرورگر ذخیره می‌شود.

### 🧩 داده‌ها کجا هستند؟

| بخش | محل یا رفتار |
| --- | --- |
| یادداشت‌ها و دسته‌ها | `localStorage` مرورگر فعلی |
| پوستهٔ روشن/تیره | `localStorage` |
| اعلان یادآور | تایمر JavaScript و مجوز Notifications مرورگر |

> 🔎 از یادداشت‌های مهم نسخهٔ جداگانه نگه دارید؛ این پروژه حساب کاربری، پشتیبان‌گیری خودکار و همگام‌سازی بین دستگاه‌ها ندارد.

### 👤 پدیدآورنده و حقوق نشر

© م.امین عسکری (M. Amin Askari). [GitHub](https://github.com/AminAskariX) · [وب‌سایت](https://aminaskarix.ir)

### 📜 مجوز

این پروژه تحت مجوز MIT منتشر شده است؛ متن کامل در [LICENSE](LICENSE) آمده است.

<a id="english"></a>
## 🇬🇧 English

A lightweight Persian note app that stores data in the browser.

### 🚀 Features

- Create, edit, delete, categorize, and search notes.
- Add or remove categories; notes in a removed category move to the default category.
- Theme toggle and permission-based browser reminders.

### 🛠️ Run

Clone `https://github.com/AminAskariX/Noteify.git` and open `index.html` in a browser. Notifications require browser permission and a compatible context.

### ⚠️ Current limitations

Notes live in this browser's `localStorage` and do not sync. Reminder timers are created when notes are added while the page is open; they are not restored after a reload or browser close. Editing removes the previous note and moves its values into the form, so save the form to create the revised note.

### 💡 A small daily-note workflow

Write a title and body, assign a category, and later find the note by searching its title or text. The default “Miscellaneous” category remains available; removing another category reassigns its notes to the default. The selected theme is saved in the same browser.

### 🧩 Where data lives

| Item | Storage or behavior |
| --- | --- |
| Notes and categories | Current browser's `localStorage` |
| Light/dark preference | `localStorage` |
| Reminder notification | JavaScript timer plus browser Notifications permission |

> 🔎 Keep separate copies of important notes. This version has no account, automatic backup, or cross-device synchronization.

### 👤 Author and copyright

Copyright © M. Amin Askari (م.امین عسکری). [GitHub](https://github.com/AminAskariX) · [Website](https://aminaskarix.ir)

### 📜 License

This project is licensed under MIT. See [LICENSE](LICENSE) for the full terms.
