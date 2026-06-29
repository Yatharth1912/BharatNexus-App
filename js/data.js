// ═══════════════════════════════════════════════════════════════
// BHARAT NEXUS - DATA.JS (FIREBASE CLOUD VERSION)
// Bas ye pure file ko copy paste kar de - kuch nahi karna
// ═══════════════════════════════════════════════════════════════


// ═══════════ 1. AUTH FUNCTIONS ═══════════

// Login session check karna
function requireAuth(role) {
  const user = JSON.parse(localStorage.getItem('user_session'));
  if (!user) {
    window.location.href = '../index.html';
    return null;
  }
  if (role && user.role !== role) {
    alert('Access denied!');
    window.location.href = '../index.html';
    return null;
  }
  return user;
}

// Login save karna (login.html se call hoga)
function saveSession(user) {
  localStorage.setItem('user_session', JSON.stringify(user));
}

// Logout
function logout() {
  if (!confirm('Logout karna chahte ho?')) return;
  localStorage.removeItem('user_session');
  window.location.href = '../index.html';
}


// ═══════════ 2. MERCHANT REGISTRATION (Signup) ═══════════

async function registerMerchant(merchantData) {
  try {
    // Firestore mein merchant create karo
    const docRef = await db.collection('merchants').add({
      name: merchantData.name,
      phone: merchantData.phone,
      shopName: merchantData.shopName,
      village: merchantData.village,
      category: merchantData.category || 'Grocery',
      rating: 0,
      gstVerified: false,
      faceVerified: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    // Session save karo
    const session = {
      id: docRef.id,
      name: merchantData.name,
      phone: merchantData.phone,
      shopName: merchantData.shopName,
      village: merchantData.village,
      category: merchantData.category,
      role: 'merchant'
    };
    saveSession(session);
    return { success: true, id: docRef.id };
  } catch (e) {
    console.error('Register error:', e);
    return { success: false, error: e.message };
  }
}


// ═══════════ 3. CUSTOMER REGISTRATION ═══════════

async function registerCustomer(customerData) {
  try {
    const docRef = await db.collection('customers').add({
      name: customerData.name,
      phone: customerData.phone,
      village: customerData.village || '',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    const session = {
      id: docRef.id,
      name: customerData.name,
      phone: customerData.phone,
      village: customerData.village,
      role: 'customer'
    };
    saveSession(session);
    return { success: true, id: docRef.id };
  } catch (e) {
    console.error('Register error:', e);
    return { success: false, error: e.message };
  }
}


// ═══════════ 4. LOGIN (Phone se) ═══════════

async function loginUser(phone, role) {
  try {
    const collection = role === 'merchant' ? 'merchants' : 'customers';
    const snapshot = await db.collection(collection)
      .where('phone', '==', phone)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return { success: false, error: 'User not found. Please signup first.' };
    }

    const doc = snapshot.docs[0];
    const userData = doc.data();
    const session = {
      id: doc.id,
      name: userData.name,
      phone: userData.phone,
      shopName: userData.shopName || null,
      village: userData.village || '',
      category: userData.category || null,
      role: role
    };
    saveSession(session);
    return { success: true, session };
  } catch (e) {
    console.error('Login error:', e);
    return { success: false, error: e.message };
  }
}


// ═══════════ 5. UTILS (Helpers) ═══════════

function fmtPrice(n) {
  return '₹' + Number(n || 0).toLocaleString('en-IN');
}

function fmtDate(ts) {
  if (!ts) return 'Just now';
  const d = ts.seconds ? new Date(ts.seconds * 1000) : new Date(ts);
  return d.toLocaleDateString('en-IN', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  });
}

function toast(msg, type = 'info') {
  const c = document.getElementById('toast-container');
  if (!c) { 
    alert(msg); 
    return; 
  }
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.textContent = msg;
  c.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}


// ═══════════ 6. CUSTOMER FUNCTIONS (Future use) ═══════════

// Saare products fetch karo (customer ke liye)
function listenToAllProducts(callback) {
  return db.collection('products')
    .onSnapshot((snapshot) => {
      const products = [];
      snapshot.forEach(doc => {
        products.push({ id: doc.id, ...doc.data() });
      });
      callback(products);
    });
}

// Order place karna (customer ke liye)
async function placeOrder(orderData) {
  try {
    const docRef = await db.collection('orders').add({
      ...orderData,
      status: 'pending',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (e) {
    console.error('Order error:', e);
    return { success: false, error: e.message };
  }
}


console.log('✅ data.js loaded — Firebase Cloud ready!');