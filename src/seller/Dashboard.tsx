import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import DashboardChart from './DashboardChart'; // adjust path if needed

// --- TYPES ---
interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl?: string;
  sellerName?: string;
}
interface Order {
  id: string;
  productId: string;
  productTitle: string;
  quantity: number;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  txnId: string;
  status: string;
  createdAt: any;
}

// --- CONSTANTS (UI colors, fonts) ---
const pastelBg = '#fff7f4';
const waveBg = '#ffebe0';
const accent = '#fe9188';
const mainTeal = '#2d7d7d'; // Use teal for headings
const headFont = '"Fredoka", "Poppins", sans-serif';
const font = '"Poppins", Arial, sans-serif';
const cardShadow = "0 10px 24px 0 #fe918822";

const SellerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [chartData, setChartData] = useState<{ title: string; sales: number }[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Fetch products
  const fetchProducts = async () => {
    if (!auth.currentUser) return;
    const q = query(
      collection(db, 'products'),
      where('sellerId', '==', auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    const items: Product[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<Product, 'id'>;
      items.push({ id: doc.id, ...data });
    });
    setProducts(items);
  };

  // Fetch orders
  const fetchOrders = async () => {
    if (!auth.currentUser) return;
    const q = query(collection(db, 'orders'), where('sellerId', '==', auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    const items: Order[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Omit<Order, 'id'>;
      items.push({ id: doc.id, ...data });
    });
    setOrders(items);
  };

  // On mount: fetch both products and orders.
  useEffect(() => {
    fetchProducts();
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  // Calculate revenue/chartData only when both are loaded.
  useEffect(() => {
    if (orders.length && products.length) {
      calculateChartData(orders);
    }
    // eslint-disable-next-line
  }, [orders, products]);

  // Calculate chart and revenue
  const calculateChartData = (orders: Order[]) => {
    const salesMap: Record<string, number> = {};
    orders.forEach(order => {
      if (salesMap[order.productTitle]) {
        salesMap[order.productTitle] += order.quantity;
      } else {
        salesMap[order.productTitle] = order.quantity;
      }
    });
    const data = Object.entries(salesMap).map(([title, sales]) => ({ title, sales }));
    setChartData(data);

    // Total revenue calc (uses price per product)
    const total = orders.reduce((sum, order) => {
      const product = products.find(p => p.title === order.productTitle);
      const price = product ? product.price : 0;
      return sum + (order.quantity * price);
    }, 0);
    setTotalRevenue(total);
  };

  // Best Seller calculation (from chartData)
  const bestSeller = chartData.length > 0
    ? chartData.reduce((top, prod) => prod.sales > top.sales ? prod : top, chartData[0])
    : { title: 'N/A', sales: 0 };

  // Logout
  const handleLogout = () => {
    signOut(auth).then(() => navigate('/login'));
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: pastelBg,
        fontFamily: font,
        padding: 0,
        margin: 0,
      }}
    >
      {/* Wavy Header */}
      <div style={{
        background: `linear-gradient(180deg, ${waveBg} 80%,${pastelBg} 100%)`,
        paddingBottom: 48,
        borderRadius: '0 0 60px 60px',
        position: 'relative',
        marginBottom: 30,
        boxShadow: '0 3px 38px #ffe0d8aa',
      }}>
        {/* Logo + Navigation Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '36px 60px 18px 60px',
          flexWrap: 'wrap',
        }}>
          <div style={{
            fontFamily: headFont,
            color: mainTeal,
            fontSize: '2.1rem',
            letterSpacing: '0.5px',
            fontWeight: 800,
            textShadow: "0 1px 0 #fff, 0 4px 24px #2d7d7d44",
          }}>
            BAKESOY
          </div>
          <div>
            <button
              onClick={() => navigate('/upload')}
              style={{
                background: accent,
                color: '#fff',
                border: 'none',
                padding: '12px 28px',
                borderRadius: '23px',
                fontWeight: 600,
                fontSize: '1.05rem',
                boxShadow: cardShadow,
                marginRight: 10,
                cursor: 'pointer',
                letterSpacing: '0.05em',
              }}
            >
              + Upload Product
            </button>
            <button
  onClick={() => navigate('/skillhub')}
  style={{
    background: '#fff',
    color: accent,
    border: `1.5px solid ${accent}`,
    padding: '12px 28px',
    borderRadius: '23px',
    fontWeight: 600,
    fontSize: '1.05rem',
    boxShadow: cardShadow,
    marginRight: 10,
    cursor: 'pointer',
    letterSpacing: '0.05em',
  }}
>
  🎓 SkillHub
</button>

            <button
              onClick={handleLogout}
              style={{
                background: '#fff',
                color: accent,
                border: `1.5px solid ${accent}`,
                padding: '12px 28px',
                borderRadius: '23px',
                fontWeight: 600,
                fontSize: '1.05rem',
                boxShadow: cardShadow,
                cursor: 'pointer',
                letterSpacing: '0.05em',
              }}
            >
              Logout
            </button>
          </div>
        </div>
        {/* Welcome Section */}
        <div style={{
          textAlign: 'center',
          margin: '12px auto 0 auto',
        }}>
          <div style={{
            fontFamily: headFont,
            fontSize: '2.8rem',
            color: mainTeal,
            marginBottom: 8,
            fontWeight: 700,
            textShadow: "0 2px 16px #2d7d7d22",
          }}>
            Seller Dashboard
          </div>
          <div style={{
            fontSize: '1.23rem',
            color: "#e0796a",
            marginBottom: 10,
            fontWeight: 600,
            fontFamily: headFont,
            letterSpacing: '0.03em'
          }}>
            Welcome, {auth.currentUser?.displayName || auth.currentUser?.email}
          </div>
        </div>
      </div>

      {/* --- STAT CARDS: Best Seller + Total Revenue --- */}
      <div style={{
        display: 'flex',
        gap: '32px',
        margin: '40px 0 32px 0',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        {/* Best Seller */}
        <div style={{
          background: waveBg,
          borderRadius: 22,
          boxShadow: cardShadow,
          padding: '30px 34px',
          minWidth: 260,
          minHeight: 120,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: headFont,
        }}>
          <div style={{
            color: mainTeal,
            fontWeight: 800,
            fontSize: '1.18rem',
            marginBottom: 9,
            letterSpacing: '.04em',
          }}>Best Seller</div>
          <div style={{
            color: accent,
            fontWeight: 700,
            fontSize: '1.07rem',
            marginBottom: 5,
          }}>
            {bestSeller.title}
          </div>
          <div style={{
            fontFamily: font,
            color: "#858c8c",
            fontWeight: 600,
            fontSize: '.96rem'
          }}>
            Sold: {bestSeller.sales}
          </div>
        </div>
        {/* Total Revenue */}
        <div style={{
          background: "#fff",
          borderRadius: 22,
          boxShadow: cardShadow,
          padding: '30px 34px',
          minWidth: 260,
          minHeight: 120,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: headFont,
        }}>
          <div style={{
            color: mainTeal,
            fontWeight: 800,
            fontSize: '1.18rem',
            marginBottom: 9,
            letterSpacing: '.04em',
          }}>Total Revenue</div>
          <div style={{
            color: accent,
            fontWeight: 700,
            fontSize: '1.22rem'
          }}>
            ₹{totalRevenue}
          </div>
        </div>
      </div>

      {/* --- PRODUCTS LIST --- */}
      <div style={{ margin: '0 auto', maxWidth: 1100 }}>
        <div style={{
          fontFamily: headFont,
          color: mainTeal,
          fontWeight: 700,
          fontSize: '1.55rem',
          margin: '6px 0 30px 10px',
        }}
        >Your Products</div>
        {products.length === 0 ? (
          <div style={{
            background: waveBg,
            borderRadius: 22,
            padding: '30px 0',
            color: accent,
            fontWeight: 600,
            textAlign: 'center',
            marginBottom: 44,
            fontFamily: headFont,
            fontSize: '1.17rem',
          }}>
            No products uploaded yet.
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '32px',
              justifyContent: 'flex-start',
              marginBottom: 40,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  background: '#fff',
                  borderRadius: 21,
                  boxShadow: cardShadow,
                  padding: '28px 18px 18px',
                  minWidth: 265,
                  maxWidth: 275,
                  flex: '1 1 270px',
                  margin: 0,
                  fontFamily: font,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  border: `2px dashed ${accent}22`,
                  transition: "transform 0.17s",
                  position: 'relative'
                }}
              >
                {product.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    style={{
                      width: '95%',
                      height: 148,
                      objectFit: 'cover',
                      borderRadius: 13,
                      marginBottom: 13,
                      background: waveBg,
                      boxShadow: cardShadow,
                    }}
                  />
                )}
                <div style={{
                  fontFamily: headFont,
                  color: mainTeal,
                  fontWeight: 700,
                  fontSize: '1.19rem',
                  marginBottom: 2,
                  textAlign: 'center',
                  letterSpacing: '0.03em'
                }}>{product.title}</div>
                <div style={{
                  color: "#ff7860",
                  fontWeight: 700,
                  fontSize: '1.12rem',
                  marginBottom: 5,
                }}>
                  ₹{product.price}
                </div>
                <div style={{
                  color: "#ad594e",
                  fontSize: '0.97rem',
                  marginBottom: 9,
                  textAlign: 'center',
                  fontWeight: 500,
                }}>{product.description}</div>
              </div>
            ))}
          </div>
        )}

        {/* --- ORDERS TABLE --- */}
        <div style={{
          fontFamily: headFont,
          color: mainTeal,
          fontWeight: 700,
          fontSize: '1.43rem',
          margin: '24px 0 18px 10px',
        }}>Orders Received</div>
        {orders.length === 0 ? (
          <div style={{
            background: waveBg,
            borderRadius: 22,
            padding: '30px 0',
            color: accent,
            fontWeight: 600,
            textAlign: 'center',
            fontFamily: headFont,
            fontSize: '1.17rem',
            marginBottom: 36,
          }}>
            No orders yet.
          </div>
        ) : (
          <div style={{
            width: "100%",
            maxWidth: 950,
            margin: '0 auto 64px auto',
            background: "#fff",
            padding: '22px 0 8px',
            borderRadius: 19,
            boxShadow: cardShadow,
            overflowX: 'auto'
          }}>
            <table style={{
              width: '97%',
              margin: '0 auto',
              borderCollapse: 'separate',
              borderSpacing: 0,
              fontFamily: font,
            }}>
              <thead>
                <tr style={{
                  background: waveBg,
                  color: mainTeal,
                  fontFamily: headFont,
                  fontSize: '1rem',
                  letterSpacing: '0.05em'
                }}>
                  <th style={{ padding: '13px 12px', fontWeight: 700, borderTopLeftRadius: 12 }}>Order ID</th>
                  <th style={{ padding: '13px 12px', fontWeight: 700 }}>Product</th>
                  <th style={{ padding: '13px 12px', fontWeight: 700 }}>Quantity</th>
                  <th style={{ padding: '13px 12px', fontWeight: 700 }}>Buyer</th>
                  <th style={{ padding: '13px 12px', fontWeight: 700 }}>Txn ID</th>
                  <th style={{ padding: '13px 12px', fontWeight: 700 }}>Status</th>
                  <th style={{ padding: '13px 12px', fontWeight: 700, borderTopRightRadius: 12 }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={order.id} style={{
                    background: idx % 2 === 0 ? '#ffebe066' : '#fff',
                  }}>
                    <td style={{
                      padding: '11px 12px', color: "#b87968", fontWeight: 600, textAlign: 'center', fontFamily: font,
                      borderBottom: `1.5px dashed ${accent}12`
                    }}>{order.id}</td>
                    <td style={{
                      padding: '11px 12px', textAlign: 'center', color: "#b87968",
                      borderBottom: `1.5px dashed ${accent}12`
                    }}>{order.productTitle || order.productId}</td>
                    <td style={{
                      padding: '11px 12px', textAlign: 'center', color: accent,
                      fontWeight: 700,
                      borderBottom: `1.5px dashed ${accent}12`
                    }}>{order.quantity}</td>
                    <td style={{
                      padding: '11px 12px', textAlign: 'center', color: "#b87968",
                      borderBottom: `1.5px dashed ${accent}12`
                    }}>{order.buyerName || order.buyerId}</td>
                    <td style={{
                      padding: '11px 12px', textAlign: 'center', color: "#b87968",
                      borderBottom: `1.5px dashed ${accent}12`
                    }}>{order.txnId || 'N/A'}</td>
                    <td style={{
                      padding: '11px 12px', textAlign: 'center', color: "#46a066", fontWeight: 700,
                      borderBottom: `1.5px dashed ${accent}12`
                    }}>{order.status || 'Pending'}</td>
                    <td style={{
                      padding: '11px 12px', textAlign: 'center', color: "#b87968",
                      borderBottom: `1.5px dashed ${accent}12`
                    }}>
                      {order.createdAt?.toDate().toLocaleString() || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* --- CHART --- */}
        {chartData.length > 0 && (
          <div style={{ maxWidth: 800, margin: '0 auto 60px auto' }}>
            <h2 style={{
              textAlign: 'center' as const,
              color: mainTeal,
              fontFamily: headFont,
              fontSize: '1.8rem',
              marginBottom: 20,
            }}>
              Sales Overview
            </h2>
            <DashboardChart data={chartData} />
          </div>
        )}
      </div>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;700&family=Poppins:wght@400;700&display=swap');
        `}
      </style>
    </div>
  );
};

export default SellerDashboard;
