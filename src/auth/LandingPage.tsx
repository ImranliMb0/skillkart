import React from 'react';
import { useNavigate } from 'react-router-dom';

// Use your asset names here from /public folder
const pixelArts = [
  { src: 'https://i.pinimg.com/736x/34/f2/95/34f29569aea5e8356c302b72e3dc43c6.jpg', alt: "Cake Pixel Art", size: 200, left: '8vw', top: '15vh' },
  { src: 'https://i.pinimg.com/736x/1f/32/7d/1f327dea0936d1f5bdc110df1b259e76.jpg', alt: "Cake Pixel Art", size: 220, left: '18vw', top: '72vh' },
  { src: 'https://i.pinimg.com/1200x/c4/41/67/c44167a71271a8a57750eb4a4e57c40c.jpg', alt: "Pie Pixel Art", size: 180, left: '77vw', top: '23vh' },
  { src: 'https://i.pinimg.com/736x/bb/85/3f/bb853f1d4b8f52f94b48d4cbe161399e.jpg', alt: "Slice Pixel Art", size: 160, left: '65vw', top: '75vh' }
  // Add as many as you like, size 140–240 suggested for drama
];

const accent = '#2d7d7d';
const accentCoral = '#ff6b6b';
const pastelBg = '#fff7f4';
const waveBg = '#ffebe0';
const headFont = '"Fredoka", "Poppins", sans-serif';
const font = '"Poppins", Arial, sans-serif';
const cardShadow = "0 8px 32px #2d7d7d18";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      background: pastelBg,
      fontFamily: font,
      position: 'relative',
      overflow: "hidden"
    }}>
      {/* Wavy header */}
      <div className="bakery-wave-bg" />

      {/* Large pixel art cakes in background */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2
      }}>
        {pixelArts.map((art, i) => (
          <img
            key={i}
            src={art.src}
            alt={art.alt}
            style={{
              position: "absolute",
              left: art.left,
              top: art.top,
              width: art.size,
              height: art.size,
              opacity: 0.23 + 0.14 * Math.sin(i),
              animation: `pixelFloat${i % 4} 9s ${1.4 * i}s ease-in-out infinite alternate`,
              filter: "drop-shadow(0 3px 10px #0002)"
            }}
            className={`pixel-anim-${i % 4}`}
            draggable={false}
          />
        ))}
      </div>

      {/* Centered Welcome and Card */}
      <div style={{
        position: "relative",
        zIndex: 10, // above background images always
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh"
      }}>
        <div className="bakery-fadein" style={{
          fontFamily: headFont,
          color: accent,
          fontWeight: 900,
          fontSize: "3.2rem",
          textAlign: "center",
          letterSpacing: ".05em",
          marginBottom: 56,
          marginTop: 24,
          textShadow: "0 3px 8px #2d7d7d13"
        }}>
          Welcome to <span style={{ color: accentCoral }}>BAKESOY</span>
        </div>

        {/* Card with side-by-side buttons */}
        <div className=" bakery-fadein bakery-delay" style={{
          background: "#fff",
          borderRadius: 34,
          boxShadow: cardShadow,
          padding: "38px 38px",
          maxWidth: 420,
          width: "92vw",
          zIndex: 10,
          textAlign: "center",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <div style={{
            display: "flex",
            flexDirection: "row",
            gap: "22px",
            width: "100%",
            justifyContent: "center"
          }}>
            <button
              onClick={() => navigate('/login')}
              style={{
                padding: "18px 0",
                background: accent,
                color: "#fff",
                border: "none",
                borderRadius: "25px",
                fontSize: "1.38rem",
                fontWeight: 700,
                fontFamily: headFont,
                boxShadow: cardShadow,
                cursor: "pointer",
                width: "46%",
                transition: "background 0.19s",
                zIndex: 99,
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#1a5555"}
              onMouseLeave={e => e.currentTarget.style.background = accent}
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              style={{
                padding: "18px 0",
                background: "#fff",
                color: accent,
                border: `2.5px solid ${accent}`,
                borderRadius: "25px",
                fontSize: "1.38rem",
                fontWeight: 700,
                fontFamily: headFont,
                boxShadow: cardShadow,
                cursor: "pointer",
                width: "46%",
                transition: "color 0.19s, background 0.19s, border 0.16s",
                zIndex: 99,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = accent;
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = accent;
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Fonts and animation keyframes */}
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;700&family=Poppins:wght@400;700&display=swap');
        .bakery-wave-bg {
          position: absolute;
          top: 0; left: 0; width: 100vw; height: 250px;
          z-index: 0;
          border-radius: 0 0 66px 66px;
          background: linear-gradient(180deg, ${waveBg} 82%,${pastelBg} 100%);
        }
        .bakery-fadein {
          opacity: 0;
          animation: bakeryFadeIn 1s forwards;
        }
        .bakery-delay {
          animation-delay: 0.47s;
        }
        @keyframes bakeryFadeIn {
          from { opacity: 0; transform: translateY(22px) scale(.97);}
          to { opacity: 1; transform: none;}
        }
        .bakery-bouncein {
          animation: bounceCard 0.73s cubic-bezier(.42,1.62,.58,.96) forwards;
        }
        @keyframes bounceCard {
          0% { transform: scale(0.92) translateY(46px);}
          60% { transform: scale(1.04) translateY(-6px);}
          100% { transform: scale(1) translateY(0);}
        }
        @keyframes pixelFloat0 {
          0% { transform: translateY(0) rotate(-8deg);}
          100% { transform: translateY(-50px) rotate(8deg);}
        }
        @keyframes pixelFloat1 {
          0% { transform: translateY(0) rotate(7deg);}
          100% { transform: translateY(-60px) rotate(-6deg);}
        }
        @keyframes pixelFloat2 {
          0% { transform: translateY(0) scale(1);}
          100% { transform: translateY(-60px) scale(1.06);}
        }
        @keyframes pixelFloat3 {
          0% { transform: translateY(0) scale(0.97);}
          100% { transform: translateY(-40px) scale(1);}
        }
        .pixel-anim-0 { animation-name: pixelFloat0; }
        .pixel-anim-1 { animation-name: pixelFloat1; }
        .pixel-anim-2 { animation-name: pixelFloat2; }
        .pixel-anim-3 { animation-name: pixelFloat3; }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
