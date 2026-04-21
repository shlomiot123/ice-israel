# I.C.E · גיורא מראני

אתר סטטי של I.C.E — קורסי מדריכים, סדנאות נשימה ואמבטיות קרח.

## 📁 מבנה הפרויקט

```
.
├── index.html              # עמוד הבית
├── blog.html               # עמוד הבלוג הראשי
├── posts/                  # עמודי כתבות
│   ├── temperature.html
│   ├── company-events.html
│   ├── why-ice.html
│   ├── hold-space.html
│   ├── gaps-and-magic.html
│   └── freeze-time.html
├── assets/
│   ├── site.css            # סטיילים משותפים
│   └── site.js             # JS משותף (שלג, ניווט, share)
├── render.yaml             # Infrastructure-as-Code ל-Render
└── README.md
```

## 🚀 הרצה מקומית

אין תלות בכלים — זהו אתר סטטי טהור (HTML/CSS/JS). אפשר פשוט לפתוח את `index.html` בדפדפן, או להריץ שרת מקומי פשוט:

```bash
# Python (מומלץ)
python3 -m http.server 8000

# או Node
npx serve .
```

לאחר מכן פתחו `http://localhost:8000`.

## ☁️ Deploy ל-Render

האתר מוגדר ל-Render דרך `render.yaml`. הצעדים:

1. **Push ל-GitHub** (ראו הוראות בהמשך).
2. ב-Render: **New → Blueprint** → לחברו ל-repo. Render יקרא את `render.yaml` אוטומטית.
3. לחלופין: **New → Static Site** → `Publish directory` = `.` (שורש).

האתר ישתמש ב-Render CDN הגלובלי בחינם, עם SSL אוטומטי.

## 🎨 עיצוב

- **פלטת צבעים**: נייבי עמוק → תכלת קרח → לבן קרח
- **טיפוגרפיה**: Heebo (Google Fonts) + Assistant
- **אנימציות**: Canvas-based snowfall, scroll reveal, glass morphism
- **RTL מלא**, רספונסיבי מדסקטופ עד מובייל

## 📝 עריכה

כל שינוי ב-HTML/CSS/JS ישתקף מייד ברענון דפדפן. אין תהליך build.

להוספת כתבה חדשה — צרו קובץ חדש בתיקיית `posts/` על בסיס אחד הקבצים הקיימים, ועדכנו את `blog.html` עם כרטיס נוסף.

---

© 2025 כל הזכויות שמורות לגיורא מראני · I.C.E Israel
