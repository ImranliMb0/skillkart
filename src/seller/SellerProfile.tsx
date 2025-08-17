import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const accent = '#2d7d7d';
const accentCoral = '#ff6b6b';
const pastelBg = '#fff7f4';
const waveBg = '#ffebe0';
const headFont = '"Fredoka", "Poppins", sans-serif';
const font = '"Poppins", Arial, sans-serif';
const cardShadow = "0 8px 24px #2d7d7d10";

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl?: string;
}

const SellerProfile: React.FC = () => {
  const { sellerId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [sellerName, setSellerName] = useState('');

  useEffect(() => {
    const fetchSellerProducts = async () => {
      if (!sellerId) return;
      const q = query(collection(db, 'products'), where('sellerId', '==', sellerId));
      const snapshot = await getDocs(q);
      const list: Product[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        list.push({ id: doc.id, ...(data as Omit<Product, 'id'>) });
        if (!sellerName && data.sellerName) setSellerName(data.sellerName);
      });
      setProducts(list);
    };
    fetchSellerProducts();
    // eslint-disable-next-line
  }, [sellerId]);

  return (
    <div style={{
      minHeight: '100vh',
      background: pastelBg,
      fontFamily: font,
      padding: 0,
    }}>
      {/* Wavy header */}
      <div style={{
        background: `linear-gradient(180deg, ${waveBg} 80%,${pastelBg} 100%)`,
        borderRadius: `0 0 56px 56px`,
        minHeight: 120,
        boxShadow: '0 3px 38px #ffe0d8aa',
        marginBottom: 45,
        textAlign: 'center'
      }}>
        <div style={{
          fontFamily: headFont,
          color: accent,
          fontWeight: 800,
          fontSize: '2.3rem',
          marginTop: 36,
          marginBottom: 5,
          letterSpacing: '0.04em',
          textShadow: "0 2px 14px #2d7d7d14"
        }}>
          👤 Seller Profile
        </div>
        <div style={{
          color: accentCoral,
          fontFamily: headFont,
          fontSize: '1.21rem',
          fontWeight: 700,
          marginBottom: 3,
        }}>
          {sellerName || 'Unknown Seller'}
        </div>
        <div style={{
          color: accent,
          fontFamily: font,
          fontWeight: 600,
          marginBottom: 23,
          letterSpacing: '.02em',
          fontSize: "1.06rem"
        }}>
          Total Products: <span style={{ color: accentCoral }}>{products.length}</span>
        </div>
      </div>

      {/* Product grid */}
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 20px 40px 20px"
      }}>
        {products.length === 0 ? (
          <div style={{
            background: waveBg,
            color: accent,
            borderRadius: "22px",
            padding: '38px 10px',
            fontFamily: headFont,
            fontWeight: 700,
            fontSize: "1.17rem",
            textAlign: 'center' as const,
            boxShadow: cardShadow,
            margin: '30px auto',
            maxWidth: 410
          }}>
            No products by this seller yet.
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(255px, 1fr))",
            gap: "36px",
            marginTop: "0px",
            alignItems: 'stretch'
          }}>
            {products.map((product) => (
              <div
                key={product.id}
                style={{
                  background: "#fff",
                  borderRadius: 21,
                  boxShadow: cardShadow,
                  padding: "26px 16px 20px 16px",
                  fontFamily: font,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  border: `2px dashed ${accent}13`,
                  transition: "transform 0.17s",
                  minHeight: 340,
                  minWidth: 235,
                  maxWidth: 295
                }}
              >
                <img
                  src={product.imageUrl || 'https://via.placeholder.com/250'}
                  alt={product.title}
                  style={{
                    width: "100%",
                    minHeight: 150,
                    maxHeight: 150,
                    objectFit: "cover",
                    borderRadius: 12,
                    marginBottom: 13,
                    background: waveBg,
                    boxShadow: cardShadow,
                  }}
                />
                <div style={{
                  fontFamily: headFont,
                  color: accent,
                  fontWeight: 700,
                  fontSize: '1.18rem',
                  marginBottom: 3,
                  textAlign: "center" as const,
                  letterSpacing: '.01em'
                }}>{product.title}</div>
                <div style={{
                  color: accentCoral,
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  marginBottom: 7,
                  fontFamily: headFont,
                }}>
                  ₹{product.price}
                </div>
                <div style={{
                  color: "#577373",
                  fontSize: '1.02rem',
                  textAlign: "center" as const,
                  marginBottom: 8,
                  fontWeight: 500
                }}>
                  {product.description}
                </div>
              </div>
            ))}
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

export default SellerProfile;
