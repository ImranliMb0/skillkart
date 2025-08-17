import React, { useState, useEffect, useMemo } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl?: string;
  isTopSeller?: boolean;
  sellerId?: string;
  sellerName?: string;
}

// Bakery UI COLORS and FONTS
const pastelBg = '#fff7f4';
const waveBg = '#ffebe0';
const accent = '#2d7d7d'; // The bakery teal
const accentCoral = '#ff6b6b';
const headFont = '"Fredoka", "Poppins", sans-serif';
const font = '"Poppins", Arial, sans-serif';
const cardShadow = "0 10px 24px 0 #2d7d7d22";

const styles = {
  container: {
    background: pastelBg,
    minHeight: '100vh',
    fontFamily: font,
  } as React.CSSProperties,
  hero: {
    background: `linear-gradient(180deg, ${waveBg} 80%,${pastelBg} 100%)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '26px 60px 18px 60px',
    borderRadius: '0 0 60px 60px',
    boxShadow: '0 3px 38px #ffe0d8aa',
    position: 'relative' as const,
    zIndex: 10,
  } as React.CSSProperties,
  nav: {
    display: 'flex',
    gap: '32px',
    alignItems: 'center',
    fontFamily: headFont,
    fontWeight: 700,
  },
  navLink: {
    color: accent,
    textDecoration: 'none',
    fontSize: '17px',
    fontWeight: 700,
    cursor: 'pointer',
    letterSpacing: '.03em',
  },
  logo: {
    fontFamily: headFont,
    color: accent,
    fontSize: '2.2rem',
    fontWeight: 800,
    letterSpacing: '-0.5px',
    textShadow: "0 1px 0 #fff, 0 4px 24px #2d7d7d44"
  },
  registerBtn: {
    background: 'transparent',
    color: accent,
    border: `2px solid ${accent}`,
    borderRadius: '25px',
    padding: '11px 28px',
    fontSize: '15px',
    fontWeight: 700,
    fontFamily: headFont,
    marginRight: '12px',
    cursor: 'pointer',
    boxShadow: cardShadow,
    transition: 'all 0.2s',
  },
  cartBtn: {
    background: accentCoral,
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    padding: '12px 23px',
    fontSize: '15px',
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 5px 20px #ff6b6b25',
    fontFamily: headFont,
    transition: 'transform 0.3s',
  },
  heroSection: {
    background: 'linear-gradient(135deg, #fff 95%, #ffe8e8 100%)',
    margin: '0 60px',
    borderRadius: '32px',
    padding: '60px 12vw',
    textAlign: 'center' as const,
    position: 'relative' as const,
    overflow: 'hidden',
    boxShadow: '0 16px 40px rgba(0,0,0,0.07)',
    marginTop: '26px',
    marginBottom: '45px',
  } as React.CSSProperties,
  heroTitle: {
    fontFamily: headFont,
    fontSize: '54px',
    fontWeight: 700,
    color: accent,
    marginBottom: '13px',
    lineHeight: '1.13',
    letterSpacing: '0.03em',
  },
  heroSubtitle: {
    fontFamily: headFont,
    fontSize: '44px',
    fontWeight: 700,
    color: accentCoral,
    marginBottom: '18px',
    lineHeight: '1.13',
    letterSpacing: '0.01em',
  },
  heroDescription: {
    fontFamily: font,
    fontSize: '18px',
    color: '#777',
    maxWidth: '480px',
    margin: '0 auto 35px',
    lineHeight: '1.45',
    fontWeight: 500,
  },
  shopNowBtn: {
    background: accentCoral,
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    padding: '15px 38px',
    fontSize: '17px',
    fontFamily: headFont,
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 6px 32px #ff6b6b3d',
    transition: 'background 0.17s, transform 0.17s',
  },
  searchSection: {
    background: '#fff',
    margin: '0 60px 60px',
    borderRadius: '22px',
    padding: '40px 0 32px',
    boxShadow: '0 10px 38px #ffe8e825',
    maxWidth: 1360,
  },
  searchRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '22px',
    alignItems: 'center',
  },
  searchInput: {
    fontSize: '16px',
    padding: '15px 25px',
    border: `2px solid ${waveBg}`,
    borderRadius: '25px',
    width: '340px',
    background: '#fff7f4',
    outline: 'none',
    fontFamily: font,
    fontWeight: 500,
  },
  filterInput: {
    fontSize: '16px',
    padding: '15px 20px',
    border: `2px solid ${waveBg}`,
    borderRadius: '25px',
    background: '#fff7f4',
    width: '120px',
    outline: 'none',
    textAlign: 'center' as const,
    fontFamily: font,
    fontWeight: 500,
  },
  productsSection: {
    background: waveBg,
    margin: '0 60px',
    borderRadius: '30px',
    padding: '58px 0 44px 0',
    boxShadow: cardShadow,
    position: 'relative' as const,
    marginBottom: '40px'
  },
  sectionTitle: {
    fontFamily: headFont,
    fontSize: '38px',
    fontWeight: 700,
    color: accentCoral,
    textAlign: 'center' as const,
    marginBottom: '45px',
    letterSpacing: '0.02em'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '38px',
    maxWidth: '1180px',
    margin: '0 auto',
  },
  card: {
    background: '#fff',
    borderRadius: '22px',
    padding: '33px 16px 22px 16px',
    textAlign: 'center' as const,
    boxShadow: cardShadow,
    transition: 'all 0.19s',
    position: 'relative' as const,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center'
  },
  img: {
    width: '95%',
    height: '170px',
    objectFit: 'cover' as const,
    borderRadius: '15px',
    marginBottom: '16px',
    background: waveBg,
    cursor: 'pointer',
    boxShadow: cardShadow,
  },
  productTitle: {
    fontFamily: headFont,
    fontSize: '20px',
    fontWeight: 700,
    color: accent,
    marginBottom: '7px',
    letterSpacing: '.01em'
  },
  productPrice: {
    fontSize: '22px',
    fontWeight: 700,
    color: accentCoral,
    marginBottom: '18px',
    fontFamily: headFont
  },
  addToCartBtn: {
    background: accent,
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    padding: '12px 30px',
    fontSize: '15px',
    fontFamily: headFont,
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 5px 20px #2d7d7d33',
    marginTop: '12px',
    transition: 'all 0.22s'
  },
  modalBg: {
    position: 'fixed' as const,
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.63)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    background: '#fff',
    borderRadius: '23px',
    width: '410px',
    padding: '38px',
    textAlign: 'center' as const,
    boxShadow: '0 22px 60px #2d7d7d28',
    position: 'relative' as const,
  },
  modalImg: {
    width: '90%',
    height: '146px',
    borderRadius: '12px',
    objectFit: 'cover' as const,
    marginBottom: '16px',
    background: waveBg,
    boxShadow: cardShadow,
  },
  closeModal: {
    position: 'absolute' as const,
    right: '18px',
    top: '13px',
    background: 'none',
    border: 'none',
    fontSize: '28px',
    color: '#a2b1b1',
    cursor: 'pointer',
  },
  modalTitle: {
    fontSize: '23px',
    fontWeight: 700,
    color: accent,
    fontFamily: headFont,
    marginBottom: '7px',
  },
  modalPrice: {
    fontSize: '24px',
    fontWeight: 700,
    color: accentCoral,
    marginBottom: '26px',
    fontFamily: headFont
  },
  modalAddCart: {
    background: accentCoral,
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    padding: '15px 40px',
    fontSize: '16px',
    fontWeight: 700,
    fontFamily: headFont,
    cursor: 'pointer',
    width: '100%',
    boxShadow: '0 7px 22px #ff6b6b28',
    transition: 'transform 0.17s',
  },
  cartDrawer: {
    position: 'fixed' as const,
    right: 0, top: 0, height: '100vh',
    width: '400px',
    background: '#fff',
    boxShadow: '-10px 0 40px #2d7d7d22',
    zIndex: 2222,
    padding: '44px 22px 28px',
    overflowY: 'auto' as const,
    borderTopLeftRadius: 28,
    borderBottomLeftRadius: 28,
  },
  cartClose: {
    position: 'absolute' as const,
    right: '22px',
    top: '22px',
    background: 'none',
    border: 'none',
    fontSize: '25px',
    color: '#777',
    cursor: 'pointer',
  },
  cartTitle: {
    fontSize: '26px',
    fontWeight: 700,
    color: accent,
    fontFamily: headFont,
    marginBottom: '24px',
    textAlign: "center" as const,
  },
  cartList: { margin: '16px 0 28px 0' },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '17px',
    gap: '15px',
    padding: '13px',
    background: '#fff7f4',
    borderRadius: '12px',
    boxShadow: '0 2px 8px #2d7d7d13'
  },
  cartImg: {
    width: '56px',
    height: '56px',
    objectFit: 'cover' as const,
    borderRadius: '10px',
    background: waveBg,
    boxShadow: cardShadow,
  },
  cartInfo: { flex: 1 },
  cartTot: {
    fontWeight: 700,
    fontSize: '21px',
    color: accent,
    textAlign: 'center' as const,
    marginBottom: '14px',
    fontFamily: headFont
  },
  checkoutBtn: {
    background: accentCoral,
    color: '#fff',
    border: 'none',
    borderRadius: '22px',
    padding: '15px 0',
    fontSize: '17px',
    fontWeight: 700,
    fontFamily: headFont,
    cursor: 'pointer',
    width: '100%',
    marginTop: 8,
    boxShadow: '0 8px 20px #ff6b6b26',
    transition: 'transform 0.17s',
  },
  decorativeCircle: {
    position: 'absolute' as const,
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: 'rgba(45,125,125,0.10)',
    filter: 'blur(2px)',
  },
};

const Marketplace = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [color] = useState<string>('red');
  const [qty, setQty] = useState(1);
  const [showCart, setShowCart] = useState(false);
  const { cart, addToCart, removeFromCart, updateCartQty } = useCart();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(getAuth());
    navigate('/login');
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const snap = await getDocs(collection(db, 'products'));
      const productList: Product[] = snap.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, 'id'>)
      }));
      setProducts(productList);
    };
    fetchProducts();
  }, []);

  const filtered = useMemo(
    () =>
      products.filter(
        p =>
          (p.title.toLowerCase().includes(search.toLowerCase()) ||
            p.description?.toLowerCase().includes(search.toLowerCase())) &&
          (min ? p.price >= +min : true) &&
          (max ? p.price <= +max : true)
      ),
    [search, min, max, products]
  );

  const openModal = (product: Product) => {
    setModalProduct(product);
    setQty(1);
    setShowModal(true);
  };

  const handleModalAdd = () => {
    if (!modalProduct) return;
   addToCart({
  id: modalProduct.id,
  title: modalProduct.title,
  price: modalProduct.price,
  imageUrl: modalProduct.imageUrl,
  quantity: qty,
  color,
  sellerId: modalProduct.sellerId || 'unknown',  // ✅ Add this line
});

    setShowModal(false);
    setShowCart(true);
  };

  const cartSubtotal = cart.reduce((a, c) => a + c.price * c.quantity, 0);

  return (
    <div style={styles.container}>
      <div style={{ ...styles.decorativeCircle, top: '10%', left: '5%' }}></div>
      <div style={{ ...styles.decorativeCircle, top: '60%', right: '8%', width: '80px', height: '80px' }}></div>

      {/* Header */}
      <header style={styles.hero}>
        <div style={styles.nav}>
          <span style={styles.navLink}>ABOUT</span>
          <span style={styles.navLink}>PRODUCTS</span>
          <span style={styles.navLink}>BLOG</span>
          <span style={styles.navLink}>CONTACT</span>
        </div>
        <div style={styles.logo}>BAKESOY</div>
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          {user ? (
            <>
              <div
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                style={{
                  color: accent,
                  cursor: 'pointer',
                  marginRight: '15px',
                  fontWeight: 700,
                  fontFamily: headFont
                }}
              >
                👤 {user.displayName || user.email}
              </div>
              {showProfileMenu && (
                <div style={{
                  position: 'absolute',
                  top: '45px',
                  right: '100px',
                  background: '#fff',
                  color: accent,
                  borderRadius: '12px',
                  boxShadow: cardShadow,
                  padding: '10px',
                  zIndex: 2000,
                  minWidth: '160px',
                  fontFamily: font,
                  fontWeight: 600
                }}>
                  <div
                    style={{ padding: '10px', cursor: 'pointer' }}
                    onClick={() => {
                      alert('Edit Profile feature coming soon!');
                      setShowProfileMenu(false);
                    }}
                  >
                    ✏️ Edit Profile
                  </div>
                  <div
                    style={{ padding: '10px', cursor: 'pointer' }}
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </div>
                </div>
              )}
            </>
          ) : (
            <button style={styles.registerBtn} onClick={() => navigate('/login')}>
              LOGIN
            </button>
          )}

          <button style={styles.cartBtn} onClick={() => setShowCart(true)}>
            🛒 Cart ({cart.length})
          </button>
        </div>
      </header>

      <div style={styles.heroSection}>
        <h1 style={styles.heroTitle}>Delight in</h1>
        <h2 style={styles.heroSubtitle}>every bites!</h2>
        <p style={styles.heroDescription}>
          Experience the joy of perfectly baked cakes made with love and crafted to bring a smile to every celebration.
        </p>
        <button style={styles.shopNowBtn}>SHOP NOW</button>
        <div style={{
          position: 'absolute' as const,
          right: '10%',
          top: '20%',
          fontSize: '120px',
          opacity: 0.10,
          pointerEvents: "none"
        }}>🥐</div>
      </div>

      <div style={styles.searchSection}>
        <div style={styles.searchRow}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search delicious treats..."
            style={styles.searchInput}
          />
          <input
            value={min}
            onChange={e => setMin(e.target.value.replace(/\D/g, ''))}
            placeholder="Min ₹"
            style={styles.filterInput}
          />
          <span style={{ color: '#bbb', fontWeight: 600, fontSize: '20px' }}>-</span>
          <input
            value={max}
            onChange={e => setMax(e.target.value.replace(/\D/g, ''))}
            placeholder="Max ₹"
            style={styles.filterInput}
          />
        </div>
      </div>

      <div style={styles.productsSection}>
        <h2 style={styles.sectionTitle}>Our Signature</h2>
        <div style={styles.grid}>
          {filtered.map(product => (
            <div
              key={product.id}
              style={{
                ...styles.card,
                transform: hoveredId === product.id ? 'translateY(-10px) scale(1.015)' : 'translateY(0) scale(1)',
                boxShadow: hoveredId === product.id ? '0 20px 44px #2d7d7d19' : styles.card.boxShadow,
              }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <img
                src={product.imageUrl || 'https://via.placeholder.com/300x200'}
                alt={product.title}
                style={styles.img}
                onClick={() => openModal(product)}
              />

              <div style={styles.productTitle}>{product.title}</div>

              <div style={{ color: '#777', fontSize: '15px', marginBottom: '8px' }}>
                Sold by:{' '}
                <span
                  style={{
                    color: accent,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontWeight: 700,
                    fontFamily: headFont
                  }}
                  onClick={() => navigate(`/seller/${product.sellerId}`)}
                >
                  {product.sellerName || 'Unknown'}
                </span>
              </div>
              <div style={styles.productPrice}>₹{product.price}</div>
              <button
                style={styles.addToCartBtn}
                onClick={() => openModal(product)}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "scale(1.035)";
                  e.currentTarget.style.background = "#1a5555";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.background = accent;
                }}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>

      {showModal && modalProduct && (
        <div style={styles.modalBg} onClick={() => setShowModal(false)}>
          <div style={styles.modal} onClick={e => e.stopPropagation()}>
            <button style={styles.closeModal} onClick={() => setShowModal(false)}>&times;</button>
            <img
              src={modalProduct.imageUrl || 'https://via.placeholder.com/200'}
              alt={modalProduct.title}
              style={styles.modalImg}
            />
            <div style={styles.modalTitle}>{modalProduct.title}</div>
            <div style={styles.modalPrice}>₹{modalProduct.price}</div>
            <button
              style={styles.modalAddCart}
              onClick={handleModalAdd}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      {showCart && (
        <div style={styles.cartDrawer}>
          <button style={styles.cartClose} onClick={() => setShowCart(false)}>&times;</button>
          <h3 style={styles.cartTitle}>Your Cart</h3>
          <div style={styles.cartList}>
            {cart.length === 0 ? (
              <div style={{ color: '#999', fontWeight: 500, textAlign: 'center', fontSize: '18px' }}>Cart is empty</div>
            ) : (
              cart.map(item => (
                <div key={item.id + item.color} style={styles.cartItem}>
                  <img
                    src={item.imageUrl || 'https://via.placeholder.com/60'}
                    style={styles.cartImg}
                    alt={item.title}
                  />
                  <div style={styles.cartInfo}>
                    <div style={{ fontWeight: 700, fontSize: '16px', color: accent, fontFamily: headFont }}>{item.title}</div>
                    <div style={{ color: '#75797d', fontSize: '14px', margin: '5px 0' }}>Color: {item.color}</div>
                    <div style={{ fontSize: '14px', color: '#555' }}>Qty: {item.quantity}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 700, color: accentCoral, fontSize: '16px', marginBottom: '10px' }}>
                      ₹{item.price * item.quantity}
                    </div>
                    <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                      <button
                        onClick={() => updateCartQty(item.id, item.color, item.quantity - 1)}
                        style={{
                          border: 'none',
                          background: '#ecf7f7',
                          borderRadius: '50%',
                          width: '25px',
                          height: '25px',
                          fontWeight: 700,
                          color: accent,
                          cursor: 'pointer'
                        }}
                      >-</button>
                      <button
                        onClick={() => updateCartQty(item.id, item.color, item.quantity + 1)}
                        style={{
                          border: 'none',
                          background: '#ecf7f7',
                          borderRadius: '50%',
                          width: '25px',
                          height: '25px',
                          fontWeight: 700,
                          color: accent,
                          cursor: 'pointer'
                        }}
                      >+</button>
                      <button
                        onClick={() => removeFromCart(item.id, item.color)}
                        style={{
                          marginLeft: '8px',
                          color: accentCoral,
                          fontWeight: 700,
                          border: 'none',
                          background: 'transparent',
                          cursor: 'pointer'
                        }}
                      >✕</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div style={styles.cartTot}>Total: ₹{cartSubtotal}</div>
          <button
            style={styles.checkoutBtn}
            disabled={cart.length === 0}
            onClick={() => {
              setShowCart(false);
              navigate('/customer/payment');
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Checkout
          </button>
        </div>
      )}
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;700&family=Poppins:wght@400;700&display=swap');
        `}
      </style>
    </div>
  );
};

export default Marketplace;
