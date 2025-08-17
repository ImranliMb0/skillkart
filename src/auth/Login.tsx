import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const accent = '#2d7d7d';
const accentCoral = '#ff6b6b';
const pastelBg = '#fff7f4';
const waveBg = '#ffebe0';
const headFont = '"Fredoka", "Poppins", sans-serif';
const font = '"Poppins", Arial, sans-serif';
const cardShadow = "0 10px 28px #2d7d7d18";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user role from Firestore
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const role = data.role;

        // Redirect based on role
        if (role === 'seller') navigate('/seller/dashboard');
        else if (role === 'customer') navigate('/customer/marketplace');
        else if (role === 'admin') navigate('/admin/dashboard');
        else throw new Error('Invalid user role');
      } else {
        throw new Error('No user data found!');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: pastelBg,
      fontFamily: font,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 0,
    }}>
      <div style={{
        background: `linear-gradient(180deg, ${waveBg} 70%, ${pastelBg} 100%)`,
        borderRadius: '32px',
        boxShadow: cardShadow,
        padding: '36px 34px 32px 34px',
        width: '100%',
        maxWidth: 420,
        margin: 'auto'
      }}>
        <div style={{
          marginBottom: 16,
          textAlign: 'center' as const,
        }}>
          <div style={{
            fontFamily: headFont,
            color: accent,
            fontWeight: 800,
            fontSize: '2.1rem',
            marginBottom: 2,
            letterSpacing: '.05em',
            textShadow: '0 2px 12px #2d7d7d13'
          }}>
            Welcome back!
          </div>
          <div style={{
            color: accentCoral,
            fontFamily: headFont,
            fontSize: '1.11rem',
            fontWeight: 600,
            marginBottom: 18,
            letterSpacing: '.01em'
          }}>
            Sign in to continue to BAKESOY
          </div>
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              marginBottom: '1rem',
              padding: '15px 16px',
              borderRadius: 16,
              border: `1.7px solid ${waveBg}`,
              fontSize: '1.08rem',
              fontFamily: font,
              background: '#fff7f4',
              outline: 'none',
              boxShadow: '0 2px 10px #2d7d7d08'
            }}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: '100%',
              marginBottom: '1.1rem',
              padding: '15px 16px',
              borderRadius: 16,
              border: `1.7px solid ${waveBg}`,
              fontSize: '1.08rem',
              fontFamily: font,
              background: '#fff7f4',
              outline: 'none',
              boxShadow: '0 2px 10px #2d7d7d08'
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '15px 0',
              borderRadius: '22px',
              border: 'none',
              background: accent,
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.17rem',
              fontFamily: headFont,
              letterSpacing: '.05em',
              boxShadow: cardShadow,
              marginTop: 6,
              cursor: 'pointer',
              transition: 'background 0.18s, transform 0.18s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#1a5555"}
            onMouseLeave={e => e.currentTarget.style.background = accent}
          >
            Login
          </button>
        </form>
        {error && <div style={{
          color: accentCoral,
          marginTop: 18,
          textAlign: 'center',
          fontWeight: 600,
          fontFamily: headFont
        }}>{error}</div>}
      </div>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;700&family=Poppins:wght@400;700&display=swap');
        `}
      </style>
    </div>
  );
};

export default Login;
