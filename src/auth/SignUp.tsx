import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

const accent = '#2d7d7d';
const accentCoral = '#ff6b6b';
const pastelBg = '#fff7f4';
const waveBg = '#ffebe0';
const headFont = '"Fredoka", "Poppins", sans-serif';
const font = '"Poppins", Arial, sans-serif';
const cardShadow = "0 10px 28px #2d7d7d12";

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email,
        role,
        uid: user.uid,
      });

      navigate('/login');
    } catch (error: any) {
      console.error('Signup Error:', error);
      setError(error.message);
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
        padding: '39px 33px 31px 33px',
        width: '100%',
        maxWidth: 420,
        margin: 'auto'
      }}>
        <div style={{
          marginBottom: 17,
          textAlign: 'center' as const,
        }}>
          <div style={{
            fontFamily: headFont,
            color: accent,
            fontWeight: 800,
            fontSize: '2.1rem',
            marginBottom: 4,
            letterSpacing: '.045em',
            textShadow: '0 2px 12px #2d7d7d10'
          }}>
            Get started with BAKESOY!
          </div>
          <div style={{
            color: accentCoral,
            fontFamily: headFont,
            fontSize: '1.12rem',
            fontWeight: 600,
            marginBottom: 9,
            letterSpacing: '.01em'
          }}>
            Create your account
          </div>
        </div>
        {error && <div style={{
          color: accentCoral,
          marginBottom: 17,
          textAlign: 'center',
          fontWeight: 600,
          fontFamily: headFont
        }}>{error}</div>}
        <form onSubmit={handleSignUp}>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
            type="email"
            autoComplete="email"
            style={{
              width: '100%',
              marginBottom: '1.05rem',
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
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            autoComplete="new-password"
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
          <label style={{
            display: 'block',
            color: accent,
            marginBottom: '0.5rem',
            fontWeight: 600,
            fontFamily: headFont,
            fontSize: '1.09rem',
            letterSpacing: '0.02em'
          }}>
            Role
          </label>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            required
            style={{
              width: '100%',
              marginBottom: '1.05rem',
              padding: '14px 16px',
              borderRadius: 16,
              border: `1.7px solid ${waveBg}`,
              fontSize: '1.08rem',
              fontFamily: font,
              background: '#fff7f4',
              outline: 'none',
              boxShadow: '0 2px 10px #2d7d7d08',
              fontWeight: 600,
              color: accent,
              appearance: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="seller">Seller</option>
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
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
            Sign Up
          </button>
        </form>
        <div style={{
          display: 'block',
          marginTop: '1.3rem',
          color: '#627c8a',
          fontSize: '15px',
          textAlign: 'center' as const,
          fontFamily: font
        }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: accent, textDecoration: 'underline', fontWeight: 700 }}>
            Log in
          </Link>
        </div>
      </div>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;700&family=Poppins:wght@400;700&display=swap');
        `}
      </style>
    </div>
  );
};

export default SignUp;
