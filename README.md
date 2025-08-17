# 🛒 SkillKart

SkillKart is a smart e-commerce platform built by **Team CodeCrafters** for managing and selling products online — starting with a cake business use case.  
It combines **Firebase**, **React**, and **automation tools** to create a smooth shopping experience for customers and sellers.

---

## 🚀 Features
- 👨‍🍳 **Cake Business Demo** – Customers can browse cakes & place orders
- 💳 **UPI Payment Integration** – Secure order confirmation via transaction ID
- 📦 **Order Management** – Orders stored in Firebase Firestore
- 📊 **Google Sheets Automation** – Every order automatically logged
- 📧 **Email Notifications** – Sellers notified via Gmail (Google Apps Script / Zapier)
- 💬 **Chatling AI Bot** – Integrated chatbot to help users with cake-related queries

---

## 🛠️ Tech Stack
- **Frontend:** React + TypeScript  
- **Backend / DB:** Firebase (Auth + Firestore)  
- **Automation:** Google Apps Script + Zapier  
- **Proxy Server:** Node.js + Express (CORS proxy for Apps Script)  
- **Other Tools:** Chatling AI, GitHub

---

## 📂 Project Structure
skillkart/
│── src/ # React frontend code
│ ├── customer/ # Customer UI (Payment, Cart, Marketplace)
│ ├── seller/ # Seller dashboard (future)
│ ├── CartContext.tsx
│ ├── firebase.ts # Firebase config
│── functions/ # Node.js CORS proxy server
│── public/ # Static assets (images, etc.)
│── .gitignore
│── package.json
│── README.md

---

## ⚡ Getting Started

### 1) Clone the repo
```bash
git clone https://github.com/<your-username>/skillkart.git
cd skillkart
npm install
npm start
cd functions
node server.js


🤝 Team

Mohammed Imran YM

Prathap Umesh

Harshvardhan

Team Name: CodeCrafters

🏆 Hackathon Journey

Selected among 78 teams across India

Built SkillKart in a short span during the hackathon

Gained experience in teamwork, problem-solving, and real-world deployment






