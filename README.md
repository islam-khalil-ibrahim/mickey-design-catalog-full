# Mickey Design Catalog

مشروع Front-end كامل من الصفر لكتالوج ميكي ديزاين.

## التقنيات

- React
- Vite
- Tailwind CSS v4
- Lucide React
- React Barcode
- RTL Arabic UI

## التشغيل

بعد فك الضغط وفتح Terminal داخل المشروع:

```bash
npm install
npm run dev
```

ثم افتحي الرابط الذي يظهر في Terminal، غالبًا:

```text
http://localhost:5173
```

## Build

```bash
npm run build
```

## هيكل المشروع

```text
mickey-design-catalog/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── App.jsx
    ├── data.js
    ├── index.css
    └── main.jsx
```

## أين أعدل المنتجات؟

كل بيانات الـ Categories والـ Subcategories موجودة في:

```text
src/data.js
```

حاليًا المنتجات Mock Data حتى نربط المشروع لاحقًا بالـ NestJS + Prisma.

## الصور

الصور الحالية Mockups مؤقتة حتى يتم إدخال صور المنتجات الحقيقية.

## الخطوة التالية

ربط:

React Frontend
↓
NestJS API
↓
Prisma
↓
PostgreSQL

ويصبح كل Product له:

- name
- SKU
- barcode
- description
- image
- material
- printingType
- minimumQuantity
- category
- subcategory
