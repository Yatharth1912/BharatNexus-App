# ⚡ BHARAT NEXUS
### Disrupting Rural Logistics & Hyperlocal Delivery

> "Gaanv ke log bhi deserve karte hain — fast, fair aur affordable delivery."
> — Yatharth Mangal

---

## 🚀 How to Run the App

### Method 1: Easy (double-click)
1. `index.html` pe **double click** karo
2. Browser mein khul jayega — poora app explore karo!
3. Login page pe jao, role choose karo

### Method 2: Live Server (Best — camera works)
1. VS Code mein folder kholo
2. **Live Server** extension install karo (agar nahi hai)
3. `index.html` pe right click → **"Open with Live Server"**
4. Face scan ke liye ye method zaroori hai!

---

## 🔑 Demo Credentials

| Role | Phone | Password |
|------|-------|----------|
| 🛒 Customer | `1111111111` | `1234` |
| 🏪 Shop Owner (Ramu Kirana) | `9876543210` | `1234` |
| 🏪 Shop Owner (Sharma General) | `9876543211` | `1234` |
| 🏪 Medical Shop | `9876543212` | `1234` |
| 🏪 Dairy (unverified) | `9876543213` | `1234` |

**GST Demo:** Try `27AAPFU0939F1ZV`

---

## 📁 Project Structure

```
bharat-nexus/
├── index.html              ← Landing Page (with particle effects!)
├── login.html              ← Signup / Login (Customer + Merchant)
├── README.md               ← You're here
│
├── css/
│   └── style.css           ← Master styles (all pages share this)
│
├── js/
│   └── data.js             ← Data layer (localStorage DB + helpers)
│
└── pages/
    ├── customer.html       ← Customer dashboard (browse, cart, orders)
    ├── merchant.html       ← Shop owner dashboard (products, orders, earnings)
    └── security.html       ← GST + Face Scan verification
```

---

## ✨ Features Built

### 🛒 Customer App
- ✅ Browse all local shops & products
- ✅ Search products by name/category
- ✅ Category filters (Grocery, Dairy, Medical, etc.)
- ✅ Shopping cart with quantity controls
- ✅ Delivery fee auto-calc (₹20 over ₹500, else ₹40)
- ✅ Place orders with address
- ✅ Order history with statuses
- ✅ View all nearby shops with ratings

### 🏪 Merchant App
- ✅ **Add / Edit / Delete products** (name, price, stock, emoji, category)
- ✅ **Quick price & stock updates** (inline editing)
- ✅ Low stock / out of stock alerts
- ✅ Incoming orders panel (accept / complete / cancel)
- ✅ Revenue dashboard
- ✅ Total orders / products / rating stats
- ✅ Shop profile with verification status

### 🔐 Security & Verification
- ✅ **GSTIN format validation** with demo data
- ✅ **Live face scan** using device camera (with animated rings + scan line)
- ✅ Liveness detection simulation (6 phases)
- ✅ 87-point facial mapping UI
- ✅ Camera-denied fallback (demo mode button)
- ✅ Verified badge unlocks dashboard access
- 🎉 Confetti celebration on complete!

### 🎨 UI / UX
- ✅ Particle network animation on landing page
- ✅ Full responsive (mobile + desktop)
- ✅ Smooth scroll reveal animations
- ✅ Gradient cards with hover effects
- ✅ Toast notifications
- ✅ Animated counters
- ✅ Hindi/English mixed content (as per your PPT)
- ✅ Consistent Bharat Nexus branding (orange/gold/green)

---

## 💾 How Data Works
Saara data browser ke **localStorage** mein save hota hai — no backend needed for demo!
- Refresh karne par data persist rehta hai
- Naya demo chahte ho? Browser console mein `resetDemoData()` chalao

---

## 🎯 Pitch Tips for Startup Cell

1. **Landing page** dikhao → problem statement explain karo
2. **Customer flow**: Login → Browse → Cart → Order
3. **Merchant flow**: Signup → GST+Face verification → Dashboard → Add products → Accept orders
4. **Security slide** pe live GST + face scan demo karo! Sabse impressive part yehi hai 🚀
5. **Comparison table** dikhao ₹150-300 vs ₹20-40 (landing pe hai)

---

## 🔧 Tech Stack Used
- **Frontend:** Pure HTML + CSS + Vanilla JS (no frameworks)
- **Styling:** Tailwind-inspired custom CSS + CSS Grid
- **Animations:** CSS keyframes + Canvas particles
- **Data:** localStorage (production mein MongoDB + Node.js aayega)
- **Camera:** WebRTC getUserMedia API (live face scan!)
- **Auth:** Session via localStorage (demo only)

**Production plan (as per your PPT):**
- React Native / Flutter for mobile
- Node.js + Express backend
- MongoDB database
- Firebase for push notifications
- Real GST API + Face.io for production auth

---

Made with ❤️ for Bharat Nexus • Created by Yatharth Mangal
