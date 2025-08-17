import React, { useEffect } from 'react';

const accent = '#2d7d7d';
const mainTeal = '#2d7d7d';
const accentCoral = '#ff6b6b';
const pastelBg = '#fff7f4';
const waveBg = '#ffebe0';
const headFont = '"Fredoka", "Poppins", sans-serif';
const font = '"Poppins", Arial, sans-serif';
const cardShadow = "0 8px 24px #2d7d7d10";

const businessIdea = {
  title: "“Pop-up Cloud Kitchens: Weddings & Celebrations Edition”",
  description:
    "Offer cakes and bakes via short-term pop-up kitchens for events, weddings, and festivals! Partner with venues and event planners to serve fresh, bespoke cakes on-site for a limited period. Use social media teasers to build buzz for each pop-up.",
};

const tips = [
  "Start simple – focus on a few cakes you make REALLY well.",
  "Use Instagram and WhatsApp for local marketing (before making a website).",
  "Calculate costs for every ingredient and box – never guess your prices.",
  "Build a small, loyal customer base first (neighbors, friends).",
  "Capture customer feedback (photos, reviews) – share it to build trust.",
];

const blogs = [
  {
    title: "How I Built My 6-Figure Home Bakery",
    summary: "From kitchen hobbyist to a full-fledged business: mistakes, wins, and tips from India’s baking queens.",
    link: "https://homebakeryblog.com/the-6-figure-story"
  },
  {
    title: "Pricing Cakes for Profit (Not Guesswork!)",
    summary: "A step-by-step guide to costing, profit margins, and raising prices the right way.",
    link: "https://bakeschool.com/blog/pricing-cakes-india"
  },
  {
    title: "10 Instagram Strategies for Selling More Cakes",
    summary: "Grow your followers, boost local orders, and turn your feed into a cake magnet.",
    link: "https://bakerybusinessboost.com/instagram-tips"
  },
  {
    title: "Home Bakery Registration & Food License Guide (India, 2024)",
    summary: "The legal checklist for FSSAI and GST—no lawyer needed.",
    link: "https://www.bakeinfo.in/blog/home-bakery-license-guide"
  },
  {
    title: "Creative Cake Packaging: Win Customers Before the First Bite",
    summary: "Design ideas, branding tips, and where to buy budget packaging that wows.",
    link: "https://thecakeblog.com/creative-packaging"
  },
  {
    title: "300+ Cake Flavor Combinations for Indian Tastes",
    summary: "Expand your menu and stand out from the crowd with local & fusion cake ideas.",
    link: "https://bakerstreet.in/best-cake-flavors"
  }
];

const upskilling = [
  {
    title: "Online Workshop: Cake Pricing & Menu Design",
    summary: "Master cost calculation, branding, and digital sales for bakers.",
    link: "https://www.youtube.com/watch?v=qm4Mun-uXlQ"
  },
  {
    title: "Professional Baking Skills – Chef Pragya (YouTube)",
    summary: "Budget-friendly Indian home-baking classes, live Q&A, Hindi/Eng.",
    link: "https://www.youtube.com/@quickcookbypragya"
  },
  {
    title: "Udemy: The Complete Cake Business Bootcamp",
    summary: "For Indian startups: costing, marketing, delivery, licensing.",
    link: "https://www.udemy.com/s?k=cake+business"
  },
  {
    title: "Skillshare: Cake Decorating – Beginner to Pro",
    summary: "Step-by-step video courses to improve your decorating game.",
    link: "https://www.skillshare.com/search?query=cake%20decorating"
  },
  {
    title: "Coursera – Food Entrepreneurship 101",
    summary: "Entrepreneurship essentials for growing your food business.",
    link: "https://www.coursera.org/learn/food-entrepreneurship"
  }
];

const tutorials = [
  {
    url: "https://youtu.be/qhdy2hCc60Q?si=848ry1qmcltmVXUP",
    title: "7 Small Cake Business Ideas to Start From Home",
  },
  {
    url: "https://youtu.be/71QnXt6zklk?si=DTqIb5XRjoDl682j",
    title: "10 Examples of Cake Marketing Ideas",
  },
  {
    url: "https://youtu.be/jmviDvmh5js?si=kCkauUMmi0AAXxaR",
    title: "How This Cupcake Business Grew From $5 to $10 Million",
  },
  {
    url: "https://youtu.be/KyTTnIG4Ghc?si=TOUcPv1MNnBLrtCy",
    title: "Home Bakery vs. Cloud Kitchen",
  },
  {
    url: "https://youtu.be/I6CfG2VEt2c?si=7dmVFsMnq-O6VtGU",
    title: "How To Start Cake Business in 2024",
  },
  {
    url: "https://youtu.be/Du-ImJG0QXE?si=Kp7X3V5JAI3WAovC",
    title: "How to Write a Cake Business Plan",
  },
];

declare global {
  interface Window {
    chtlConfig: any;
  }
}

function getYouTubeId(url: string): string | null {
  try {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|v\/|embed\/|shorts\/))([\w\-]+)/
    );
    return match ? match[1] : null;
  } catch {
    return null;
  }
}

const SkillHub: React.FC = () => {
  useEffect(() => {
  const existing = document.getElementById('chtl-script');
  if (existing) existing.remove();
  window.chtlConfig = { chatbotId: "8264527719" };
  const script = document.createElement('script');
  script.async = true;
  script.setAttribute('data-id', "8264527719");
  script.id = "chtl-script";
  script.type = "text/javascript";
  script.src = "https://chatling.ai/js/embed.js";
  document.body.appendChild(script);
  return () => { script.remove(); };
}, []);
  return (
    <div style={{
      minHeight: '100vh',
      background: pastelBg,
      fontFamily: font,
      padding: 0,
      margin: 0,
    }}>
      {/* Header Bakery Wave */}
      <div style={{
        background: `linear-gradient(180deg, ${waveBg} 77%,${pastelBg} 100%)`,
        borderRadius: "0 0 62px 62px",
        minHeight: 120,
        boxShadow: '0 4px 42px #ffe0d8aa',
        textAlign: 'center',
        padding: '54px 18px 0',
        marginBottom: 10,
      }}>
        <div style={{
          fontFamily: headFont,
          color: accent,
          fontWeight: 900,
          fontSize: '2.5rem',
          letterSpacing: '.045em',
          marginBottom: 10
        }}>
          SkillHub <span style={{ color: accentCoral }}>&#127856;</span>
        </div>
        <div style={{
          color: accentCoral,
          fontFamily: headFont,
          fontSize: '1.13rem',
          fontWeight: 600,
          letterSpacing: '.01em',
        }}>Cake Business Ideas, Tips & Upskilling</div>
      </div>

      <div style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "0 16px 54px"
      }}>
        {/* Tutorials with Thumbnails */}
        <div style={{
          background: "#fff",
          borderRadius: 26,
          boxShadow: cardShadow,
          padding: "30px 26px 22px",
          margin: "0 auto 38px auto",
          maxWidth: 900,
          textAlign: "center"
        }}>
          <div style={{
            fontFamily: headFont,
            color: accent,
            fontWeight: 800,
            fontSize: "1.25rem",
            marginBottom: 24,
          }}>
            Recent YouTube Cake Business Tutorials
          </div>
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "32px",
            justifyContent: "center"
          }}>
            {tutorials.map((vid, idx) => {
              const vidId = getYouTubeId(vid.url);
              const thumbnail = vidId
                ? `https://img.youtube.com/vi/${vidId}/hqdefault.jpg`
                : 'https://via.placeholder.com/240x135?text=No+Thumbnail';
              return (
                <a
                  key={idx}
                  href={vid.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    color: mainTeal,
                    width: 240,
                    maxWidth: "90vw",
                  }}
                >
                  <div style={{
                    background: "#fff7f4",
                    borderRadius: 15,
                    boxShadow: "0 4px 14px #aaa2",
                    overflow: "hidden",
                    marginBottom: 9,
                    transition: "transform .14s",
                    cursor: "pointer"
                  }}>
                    <img
                      src={thumbnail}
                      alt={vid.title}
                      style={{
                        width: "100%",
                        height: 135,
                        objectFit: "cover",
                        display: "block",
                        borderRadius: "15px 15px 0 0",
                        borderBottom: "2px solid #ffe0d8",
                      }}
                    />
                    <div style={{
                      padding: "11px 12px 5px",
                      fontFamily: headFont,
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: mainTeal,
                      textAlign: "left"
                    }}>
                      {vid.title}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Recent Cake Business Idea */}
        <div style={{
          background: "#fff",
          borderRadius: 26,
          boxShadow: cardShadow,
          padding: "34px 36px",
          margin: "0 auto 32px auto",
          maxWidth: 590,
          textAlign: "center" as const,
        }}>
          <div style={{
            fontFamily: headFont,
            color: accent,
            fontWeight: 800,
            fontSize: "1.35rem",
            marginBottom: 10
          }}>Recent Cake Business Idea</div>
          <div style={{
            fontFamily: headFont,
            color: accentCoral,
            fontSize: "1.17rem",
            fontWeight: 700,
            letterSpacing: ".01em"
          }}>
            {businessIdea.title}
          </div>
          <div style={{
            color: "#586f74",
            fontWeight: 500,
            fontSize: "1rem",
            marginTop: 6,
          }}>{businessIdea.description}</div>
        </div>

        {/* Tips */}
        <div style={{
          background: waveBg,
          borderRadius: 22,
          boxShadow: cardShadow,
          padding: "29px 26px",
          marginBottom: 32,
          maxWidth: 640,
          marginLeft: "auto",
          marginRight: "auto"
        }}>
          <div style={{
            fontFamily: headFont,
            color: accent,
            fontWeight: 800,
            fontSize: "1.22rem",
            marginBottom: 8
          }}>Tips for Successful Cake Business</div>
          <ul style={{
            margin: 0, padding: "0 0 0 19px", color: "#355353", fontWeight: 500, fontSize: "1.03rem"
          }}>
            {tips.map((tip, idx) => <li key={idx} style={{ margin: "7px 0" }}>{tip}</li>)}
          </ul>
        </div>

        {/* Blog & Upskilling row */}
        <div style={{
          display: 'flex',
          gap: '30px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {/* Blogs */}
          <div style={{
            flex: 1,
            minWidth: 300,
            maxWidth: 400,
            background: "#fff",
            borderRadius: 22,
            boxShadow: cardShadow,
            padding: "28px 24px 26px",
            marginBottom: 32,
          }}>
            <div style={{
              fontFamily: headFont,
              color: accent,
              fontWeight: 800,
              fontSize: "1.18rem",
              marginBottom: 10,
            }}>Featured Blogs</div>
            {blogs.map((blog, idx) => (
              <div key={idx} style={{ marginBottom: 22 }}>
                <div style={{
                  fontFamily: headFont,
                  color: mainTeal,
                  fontWeight: 700,
                  fontSize: "1.02rem"
                }}>{blog.title}</div>
                <div style={{
                  fontSize: "0.97rem",
                  color: "#446373",
                  margin: "3px 0 2px 0"
                }}>{blog.summary}</div>
                <a href={blog.link} target="_blank" rel="noopener noreferrer" style={{
                  color: accentCoral, textDecoration: "underline", fontSize: "0.96rem"
                }}>Read more</a>
              </div>
            ))}
          </div>
          {/* Upskilling */}
          <div style={{
            flex: 1,
            minWidth: 300,
            maxWidth: 400,
            background: "#fff",
            borderRadius: 22,
            boxShadow: cardShadow,
            padding: "28px 24px 26px",
            marginBottom: 32,
          }}>
            <div style={{
              fontFamily: headFont,
              color: accent,
              fontWeight: 800,
              fontSize: "1.18rem",
              marginBottom: 10,
            }}>Upskilling Resources</div>
            {upskilling.map((resource, idx) => (
              <div key={idx} style={{ marginBottom: 22 }}>
                <div style={{
                  fontFamily: headFont,
                  color: mainTeal,
                  fontWeight: 700,
                  fontSize: "1.02rem"
                }}>{resource.title}</div>
                <div style={{
                  fontSize: "0.97rem",
                  color: "#446373",
                  margin: "3px 0 2px 0"
                }}>{resource.summary}</div>
                <a href={resource.link} target="_blank" rel="noopener noreferrer" style={{
                  color: accentCoral, textDecoration: "underline", fontSize: "0.96rem"
                }}>Visit</a>
              </div>
            ))}
          </div>
        </div>

        {/* --- SKILLKART AI (Chatling) WIDGET SECTION --- */}
        <div
          style={{
            background: "#fff",
            borderRadius: 26,
            boxShadow: cardShadow,
            margin: "40px auto 32px auto",
            maxWidth: 700,
            textAlign: "center",
            padding: "35px 26px",
          }}
        >
          <div
            style={{
              fontFamily: headFont,
              color: accent,
              fontWeight: 800,
              fontSize: "1.32rem",
              marginBottom: 8,
              letterSpacing: ".04em"
            }}
          >
            Skillkart AI
          </div>
          <div style={{
            color: accentCoral,
            fontWeight: 600,
            fontFamily: headFont,
            fontSize: "1.04rem",
            marginBottom: 16
          }}>
            Chat with Skillkart AI – your instant assistant for business and baking!
          </div>
          <div id="skillkart-ai-chatling-widget"></div>
        </div>
      </div>
      {/* Bakery Fonts */}
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;700&family=Poppins:wght@400;700&display=swap');
        `}
      </style>
    </div>
  );
};

export default SkillHub;
