/* ══════════════════════════════════════════
   BHARAT NEXUS — Data Layer (localStorage)
   ══════════════════════════════════════════ */

const DB_KEY = 'bharatnexus_db_v1';
const SESSION_KEY = 'bharatnexus_session_v1';

// Seed default shops + products
const SEED_DATA = {
  users: [
    {
      id: 'm1',
      name: 'Ramu Kaka',
      phone: '9876543210',
      password: '1234',
      role: 'merchant',
      shopName: "Ramu Kirana Store",
      category: 'Grocery',
      village: 'Khandwa',
      gstVerified: true,
      faceVerified: true,
      rating: 4.8,
      products: [
        { id: 'p1', name: 'Aata (5kg)', price: 280, stock: 25, emoji: '🌾', category: 'Grocery' },
        { id: 'p2', name: 'Chini (1kg)', price: 45, stock: 40, emoji: '🍚', category: 'Grocery' },
        { id: 'p3', name: 'Namak (1kg)', price: 22, stock: 60, emoji: '🧂', category: 'Grocery' },
        { id: 'p4', name: 'Chai Patti', price: 140, stock: 15, emoji: '🍵', category: 'Grocery' },
        { id: 'p5', name: 'Biscuit Pack', price: 30, stock: 100, emoji: '🍪', category: 'Snacks' },
        { id: 'p6', name: 'Toor Dal (1kg)', price: 140, stock: 20, emoji: '🫘', category: 'Grocery' }
      ]
    },
    {
      id: 'm2',
      name: 'Sharma Ji',
      phone: '9876543211',
      password: '1234',
      role: 'merchant',
      shopName: "Sharma General Store",
      category: 'General',
      village: 'Rampur',
      gstVerified: true,
      faceVerified: true,
      rating: 4.6,
      products: [
        { id: 'p7', name: 'Soap (Lifebuoy)', price: 35, stock: 50, emoji: '🧼', category: 'Personal Care' },
        { id: 'p8', name: 'Toothpaste', price: 95, stock: 30, emoji: '🪥', category: 'Personal Care' },
        { id: 'p9', name: 'Detergent (1kg)', price: 180, stock: 20, emoji: '🧴', category: 'Household' },
        { id: 'p10', name: 'Notebook', price: 40, stock: 40, emoji: '📓', category: 'Stationery' },
        { id: 'p11', name: 'Pen (Pack of 5)', price: 25, stock: 80, emoji: '🖊️', category: 'Stationery' }
      ]
    },
    {
      id: 'm3',
      name: 'Dr. Ganga Devi',
      phone: '9876543212',
      password: '1234',
      role: 'merchant',
      shopName: "Ganga Medical",
      category: 'Medical',
      village: 'Ankleshwar',
      gstVerified: true,
      faceVerified: true,
      rating: 4.9,
      products: [
        { id: 'p12', name: 'Crocin (10 tabs)', price: 30, stock: 100, emoji: '💊', category: 'Medicine' },
        { id: 'p13', name: 'Bandage Roll', price: 45, stock: 50, emoji: '🩹', category: 'Medicine' },
        { id: 'p14', name: 'ORS Powder', price: 25, stock: 70, emoji: '🥤', category: 'Medicine' },
        { id: 'p15', name: 'Sanitizer 500ml', price: 120, stock: 25, emoji: '🧴', category: 'Medicine' }
      ]
    },
    {
      id: 'm4',
      name: 'Chotu Bhai',
      phone: '9876543213',
      password: '1234',
      role: 'merchant',
      shopName: "Chotu Dairy & Fresh",
      category: 'Dairy',
      village: 'Khandwa',
      gstVerified: false,
      faceVerified: false,
      rating: 4.4,
      products: [
        { id: 'p16', name: 'Doodh (1L)', price: 55, stock: 40, emoji: '🥛', category: 'Dairy' },
        { id: 'p17', name: 'Dahi (500g)', price: 40, stock: 25, emoji: '🥣', category: 'Dairy' },
        { id: 'p18', name: 'Paneer (250g)', price: 90, stock: 15, emoji: '🧀', category: 'Dairy' },
        { id: 'p19', name: 'Ghee (500g)', price: 280, stock: 10, emoji: '🫙', category: 'Dairy' }
      ]
    }
  ],
  customers: [
    {
      id: 'c1',
      name: 'Gaurav Beta',
      phone: '1111111111',
      password: '1234',
      role: 'customer',
      village: 'Khandwa',
      addresses: ['Home: House 42, Main Gali, Khandwa']
    }
  ],
  orders: [],
  drivers: []
};

// Initialize
function initDB() {
  if (!localStorage.getItem(DB_KEY)) {
    localStorage.setItem(DB_KEY, JSON.stringify(SEED_DATA));
  }
}
initDB();

function getDB() {
  return JSON.parse(localStorage.getItem(DB_KEY) || JSON.stringify(SEED_DATA));
}
function saveDB(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

// AUTH
function getSession() {
  const s = localStorage.getItem(SESSION_KEY);
  return s ? JSON.parse(s) : null;
}
function setSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}
function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}
function requireAuth(role) {
  const s = getSession();
  if (!s) { window.location.href = '../login.html'; return null; }
  if (role && s.role !== role) {
    alert(`This page is for ${role}s only!`);
    window.location.href = '../index.html';
    return null;
  }
  return s;
}
function logout() {
  clearSession();
  window.location.href = '../index.html';
}

// USERS
function findUserByPhone(phone, role) {
  const db = getDB();
  const list = role === 'merchant' ? db.users : db.customers;
  return list.find(u => u.phone === phone);
}
function createUser(data) {
  const db = getDB();
  const list = data.role === 'merchant' ? 'users' : 'customers';
  const id = data.role[0] + Date.now();
  const newUser = {
    id,
    ...data,
    gstVerified: data.role === 'merchant' ? false : undefined,
    faceVerified: data.role === 'merchant' ? false : undefined,
    rating: data.role === 'merchant' ? 5.0 : undefined,
    products: data.role === 'merchant' ? [] : undefined,
    addresses: data.role === 'customer' ? [] : undefined
  };
  db[list].push(newUser);
  saveDB(db);
  return newUser;
}
function updateUser(userId, updates, role) {
  const db = getDB();
  const list = role === 'merchant' ? db.users : db.customers;
  const u = list.find(x => x.id === userId);
  if (u) { Object.assign(u, updates); saveDB(db); }
  return u;
}
function getUserById(id, role) {
  const db = getDB();
  if (role === 'merchant') return db.users.find(u => u.id === id);
  if (role === 'customer') return db.customers.find(c => c.id === id);
  return null;
}
function getAllMerchants() { return getDB().users; }

// PRODUCTS (merchant specific)
function getMerchantProducts(merchantId) {
  const m = getUserById(merchantId, 'merchant');
  return m ? m.products : [];
}
function addProduct(merchantId, product) {
  const db = getDB();
  const m = db.users.find(u => u.id === merchantId);
  if (m) {
    m.products.push({ id: 'p' + Date.now(), ...product });
    saveDB(db);
  }
}
function updateProduct(merchantId, productId, updates) {
  const db = getDB();
  const m = db.users.find(u => u.id === merchantId);
  if (m) {
    const p = m.products.find(pr => pr.id === productId);
    if (p) { Object.assign(p, updates); saveDB(db); }
  }
}
function removeProduct(merchantId, productId) {
  const db = getDB();
  const m = db.users.find(u => u.id === merchantId);
  if (m) {
    m.products = m.products.filter(p => p.id !== productId);
    saveDB(db);
  }
}

// ORDERS
function getAllProducts() {
  const db = getDB();
  const all = [];
  db.users.forEach(m => {
    m.products.forEach(p => {
      all.push({
        ...p,
        merchantId: m.id,
        shopName: m.shopName,
        shopOwner: m.name,
        shopVillage: m.village,
        shopCategory: m.category
      });
    });
  });
  return all;
}
function createOrder(customerId, items, address) {
  const db = getDB();
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryFee = total > 500 ? 20 : 40;
  const order = {
    id: 'ORD' + Date.now().toString().slice(-6),
    customerId,
    items,
    address,
    subtotal: total,
    deliveryFee,
    total: total + deliveryFee,
    status: 'pending',
    createdAt: new Date().toISOString(),
    merchantIds: [...new Set(items.map(i => i.merchantId))]
  };
  db.orders.push(order);

  // Decrement stock
  items.forEach(item => {
    const m = db.users.find(u => u.id === item.merchantId);
    if (m) {
      const p = m.products.find(pr => pr.id === item.productId);
      if (p) p.stock = Math.max(0, p.stock - item.qty);
    }
  });

  saveDB(db);
  return order;
}
function getOrdersByCustomer(customerId) {
  return getDB().orders.filter(o => o.customerId === customerId).reverse();
}
function getOrdersForMerchant(merchantId) {
  return getDB().orders.filter(o => o.merchantIds.includes(merchantId)).reverse();
}
function updateOrderStatus(orderId, status) {
  const db = getDB();
  const o = db.orders.find(x => x.id === orderId);
  if (o) { o.status = status; saveDB(db); }
}

// TOAST helper
function toast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) {
    const c = document.createElement('div');
    c.id = 'toast-container';
    c.className = 'toast-container';
    document.body.appendChild(c);
  }
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  document.getElementById('toast-container').appendChild(t);
  setTimeout(() => {
    t.style.animation = 'toastOut 0.4s forwards';
    setTimeout(() => t.remove(), 400);
  }, 3000);
}

// Formatting
function fmtPrice(n) { return '₹' + n.toLocaleString('en-IN'); }
function fmtDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

// Reset demo
function resetDemoData() {
  localStorage.removeItem(DB_KEY);
  localStorage.removeItem(SESSION_KEY);
  initDB();
  toast('Demo data reset!', 'info');
  setTimeout(() => location.reload(), 800);
}
