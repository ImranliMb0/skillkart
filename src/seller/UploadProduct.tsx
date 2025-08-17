import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

// COLOR & STYLE VARS (teal accent, not coral)
const pastelBg = '#fff7f4';
const waveBg = '#ffebe0';
const accent = '#2d7d7d';  // <-- main accent color now teal!
const headFont = '"Fredoka", "Poppins", sans-serif';
const font = '"Poppins", Arial, sans-serif';
const cardShadow = "0 10px 24px 0 #2d7d7d22"; // subtle teal shadow

const UploadProduct = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert('Please login as seller');
      navigate('/login');
      return;
    }

    const sellerId = user.uid;
    const sellerName = user.displayName || user.email || 'Unknown Seller';

    try {
      await addDoc(collection(db, 'products'), {
        title,
        price,
        description,
        imageUrl,
        sellerId,
        sellerName,
        createdAt: new Date(),
      });

      alert('Product uploaded successfully!');
      setTitle('');
      setPrice(0);
      setDescription('');
      setImageUrl('');
      navigate('/seller/dashboard');
    } catch (err: any) {
      console.error('Error uploading product:', err.message);
      alert('Upload failed: ' + err.message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: pastelBg,
      fontFamily: font,
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    }}>
      <div style={{
        background: `linear-gradient(180deg, ${waveBg} 80%,${pastelBg} 100%)`,
        borderRadius: '0 0 80px 80px',
        padding: '44px 0 20px 0',
        boxShadow: '0 3px 38px #ffdacc8c',
        marginBottom: 0,
        width: '100%',
        minHeight: 120,
        textAlign: 'center'
      }}>
        <div style={{
          fontFamily: headFont,
          color: accent, // teal!
          fontWeight: 800,
          fontSize: '2.25rem',
          letterSpacing: '.5px',
          marginBottom: 10,
          textShadow: "0 4px 24px #2d7d7d55",
        }}>
          Upload Product
        </div>
        <div style={{
          fontWeight: 500,
          color: "#537373", // softer shade for subheading, or use accent if you prefer
          fontFamily: headFont,
          fontSize: '1.1rem',
        }}>
          Add your delicious creation to your shop!
        </div>
      </div>

      {/* Form Card */}
      <div style={{
        background: '#fff',
        borderRadius: 32,
        boxShadow: cardShadow,
        marginTop: -44,
        padding: '38px 38px 28px 38px',
        width: '100%',
        maxWidth: 440,
        zIndex: 1,
      }}>
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          fontFamily: font,
        }}>
          <label style={{
            fontWeight: 600,
            color: accent,
            fontFamily: headFont,
            fontSize: '1.09rem',
            marginBottom: 3,
            letterSpacing: '.03em'
          }}>
            Product Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
            style={{
              width: '100%',
              padding: '15px 14px',
              borderRadius: 18,
              border: `1.7px solid ${waveBg}`,
              fontSize: '1.08rem',
              outline: 'none',
              background: '#fff7f4',
              marginBottom: 2,
              fontFamily: font,
              boxShadow: '0 2px 8px #2d7d7d22'
            }}
          />
          <label style={{
            fontWeight: 600,
            color: accent,
            fontFamily: headFont,
            fontSize: '1.09rem',
            marginBottom: 3,
          }}>
            Price (in ₹)
          </label>
          <input
            type="number"
            min="1"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            placeholder="Price"
            required
            style={{
              width: '100%',
              padding: '15px 14px',
              borderRadius: 18,
              border: `1.7px solid ${waveBg}`,
              fontSize: '1.08rem',
              outline: 'none',
              background: '#fff7f4',
              marginBottom: 2,
              fontFamily: font,
              boxShadow: '0 2px 8px #2d7d7d22'
            }}
          />
          <label style={{
            fontWeight: 600,
            color: accent,
            fontFamily: headFont,
            fontSize: '1.09rem',
            marginBottom: 3,
          }}>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Share what's special about your product!"
            required
            rows={3}
            style={{
              width: '100%',
              minHeight: 70,
              maxHeight: 170,
              padding: '15px 14px',
              borderRadius: 18,
              border: `1.7px solid ${waveBg}`,
              fontSize: '1.08rem',
              outline: 'none',
              background: '#fff7f4',
              marginBottom: 2,
              fontFamily: font,
              boxShadow: '0 2px 8px #2d7d7d22',
              resize: 'vertical'
            }}
          />

          <label style={{
            fontWeight: 600,
            color: accent,
            fontFamily: headFont,
            fontSize: '1.09rem',
            marginBottom: 3,
          }}>
            Image URL
          </label>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Paste image link here (eg: https://...)"
            style={{
              width: '100%',
              padding: '15px 14px',
              borderRadius: 18,
              border: `1.7px solid ${waveBg}`,
              fontSize: '1.08rem',
              outline: 'none',
              background: '#fff7f4',
              marginBottom: 10,
              fontFamily: font,
              boxShadow: '0 2px 8px #2d7d7d22'
            }}
          />

          <button type="submit" style={{
            padding: '16px 0',
            background: accent, // <-- teal!
            color: '#fff',
            width: '100%',
            border: 'none',
            borderRadius: '23px',
            fontWeight: 700,
            fontSize: '1.15rem',
            boxShadow: cardShadow,
            marginTop: 9,
            fontFamily: headFont,
            letterSpacing: '.05em',
            cursor: 'pointer',
            transition: 'background 0.15s, transform 0.15s',
          }}>
            Upload
          </button>
        </form>
      </div>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;700&family=Poppins:wght@400;700&display=swap');
        `}
      </style>
    </div>
  );
};

export default UploadProduct;
