import React, { useState } from 'react';
import { useCart, CartItem } from './CartContext';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase';

const accent = '#2d7d7d';
const accentCoral = '#ff6b6b';
const font = '"Poppins", Arial, sans-serif';
const headFont = '"Fredoka", "Poppins", sans-serif';

export default function PaymentPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [txnId, setTxnId] = useState('');
  const [placing, setPlacing] = useState(false);

  const total = cart.reduce(
    (sum: number, item: CartItem) =>
      sum + Number(item.price) * Number(item.quantity),
    0
  );

  const upiId = 'yourupiid@okicici';

 const handleConfirm = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!txnId.trim()) return alert('Please enter your UPI transaction/reference ID');

  const user = auth.currentUser;
  if (!user) return alert('Please login');

  setPlacing(true);

  try {
    for (const item of cart) {
      const orderRef = await addDoc(collection(db, 'orders'), {
  productId: item.id,
  buyerId: user.uid,
  buyerName: user.displayName || user.email || 'Unknown Buyer',
  sellerId: item.sellerId,
  productTitle: item.title,
  quantity: item.quantity,
  txnId: txnId.trim(),
  status: 'Paid',
  createdAt: new Date(),
});

// 🔁 Trigger Google Apps Script Webhook
await fetch('http://localhost:5000/send-order', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
  productId: item.id,
  productTitle: item.title,     // ✅ Title
  quantity: item.quantity,      // ✅ Quantity
  buyerName: user.displayName || user.email || "Unknown Buyer",
  buyerEmail: user.email,
  sellerEmail: item.sellerEmail || "playerunknownu@gmail.com",
  txnId: txnId.trim()
}),

});


     
    }

    alert('Payment submitted! Seller will be notified.');
    clearCart();
    console.log("Redirecting now...");
    navigate('/customer/marketplace');
  } catch (err) {
    console.error('Order submission error:', err);
    alert('Failed to submit order.');
  } finally {
    setPlacing(false);
  }
};


  return (
    <div style={{
      background: 'linear-gradient(135deg, #2d7d7d 0%, #1a5555 100%)',
      minHeight: '100vh',
      fontFamily: font,
      padding: '40px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        maxWidth: 520,
        width: '100%',
        background: '#fff',
        borderRadius: '27px',
        padding: '54px 36px 38px 36px',
        textAlign: 'center',
        boxShadow: '0 20px 60px #2d7d7d23',
        position: 'relative',
      }}>
        <h2 style={{
          fontWeight: 800,
          color: accent,
          fontSize: '2.2rem',
          marginBottom: '18px',
          fontFamily: headFont,
          letterSpacing: '.04em'
        }}>
          UPI Payment
        </h2>
        <p style={{
          color: '#417474',
          fontFamily: headFont,
          fontWeight: 600,
          fontSize: '1.04rem',
          marginBottom: '26px',
        }}>
          Please scan the QR with any UPI app or send the amount to<br />
          <span style={{ color: accent }}>{upiId}</span>
        </p>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/800px-QR_code_for_mobile_English_Wikipedia.svg.png"
          style={{
            width: '185px',
            height: '185px',
            margin: '18px auto 15px',
            borderRadius: '16px',
            background: '#f8fafc',
            border: `2.2px solid #dde7e7`,
            display: 'block',
            boxShadow: '0 3px 22px #2d7d7d21'
          }}
          alt="Pay by UPI QR"
        />
        <div style={{
          background: '#ffe8e8',
          borderRadius: '16px',
          padding: '22px 24px',
          margin: '36px 0 26px 0',
          textAlign: 'left'
        }}>
          <h3 style={{
            color: accent,
            fontSize: '1.18rem',
            fontWeight: 700,
            fontFamily: headFont,
            marginBottom: '12px',
            textAlign: 'center' as const
          }}>Order Summary</h3>
          {cart.map((item: CartItem) => (
            <div key={item.id + (item.color || '')} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '9px',
              fontSize: '15.5px'
            }}>
              <span>
                <strong style={{ color: accent }}>{item.title}</strong>
                <span style={{ color: '#b1c0c0' }}> x {item.quantity}</span>
              </span>
              <span style={{ fontWeight: 700, color: accentCoral }}>
                ₹{(Number(item.price) * Number(item.quantity)).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div style={{
          fontWeight: 700,
          color: accent,
          fontSize: '1.65rem',
          marginBottom: '22px',
          padding: '13px',
          background: '#f0f8f8',
          borderRadius: '10px'
        }}>
          Total: ₹{total.toFixed(2)}
        </div>
        <form onSubmit={handleConfirm}>
          <label style={{
            fontWeight: 700,
            fontSize: '1.09rem',
            color: accent,
            marginBottom: '8px',
            fontFamily: headFont,
            display: 'block'
          }}>
            Enter UPI Reference/Transaction ID:
          </label>
          <input
            value={txnId}
            onChange={e => setTxnId(e.target.value)}
            required
            placeholder="Eg: 1234567890@upi"
            style={{
              margin: '12px 0 18px',
              padding: '14px 17px',
              borderRadius: '23px',
              border: `2px solid #dde7e7`,
              width: '99%',
              fontSize: '1.09rem',
              background: '#f8fafc',
              outline: 'none',
              boxSizing: 'border-box' as const,
              fontFamily: font,
              fontWeight: 500
            }}
          />
          <button
            style={{
              background: accentCoral,
              color: '#fff',
              border: 'none',
              borderRadius: '25px',
              padding: '15px 52px',
              fontSize: '1.14rem',
              fontWeight: 700,
              fontFamily: headFont,
              cursor: 'pointer',
              transition: 'transform 0.23s',
              boxShadow: '0 8px 30px #ff6b6b18',
            }}
            disabled={placing}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {placing ? "Submitting..." : "I Have Paid"}
          </button>
        </form>
        <div style={{
          color: '#879da0',
          fontSize: '15px',
          marginTop: '23px',
          fontStyle: 'italic'
        }}>
          <span style={{ fontWeight: 600, color: accent }}>*</span>
          Your order will be confirmed after payment verification.
        </div>
        <style>
          {`
          @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;700&family=Poppins:wght@400;700&display=swap');
          `}
        </style>
      </div>
    </div>
  );
}
