# 🚚 Replica of Vahak - Vahak Logistics 

This project is a **Vahak Logistics** inspired by **Vahak**, developed using **React** for the frontend, **PHP** for the backend, and **MySQL** for database management.

## 📂 Project Structure

```
/frontend      --> React Frontend
/backend       --> PHP Backend
/database      --> MySQL 
```

## 🚀 Features

- User Authentication (Login/Signup)
- View Available Loads
- View Your Lorries
- Freight Marketplace
- Transport Directory
- OTP Verification (Planned)
- Responsive Navbar and Routing

## 🖥️ Tech Stack

| Tech             | Usage                  |
| ---------------- | ---------------------- |
| React            | Frontend (Vite Setup)  |
| PHP              | Backend (API Services) |
| MySQL            | Database               |
| React Router DOM | Routing                |

## ⚙️ Installation & Setup

1️⃣ **Clone the repository**

```bash
git clone https://github.com/Student-Abhishekkumar/vahak-Logistics.git
```

2️⃣ **Install Frontend Dependencies**

```bash
cd frontend
npm install
```

3️⃣ **Run the React App**

```bash
npm run dev
```

4️⃣ **Setup PHP Backend**

- Copy `/backend` folder to your XAMPP `htdocs/`
- Start **Apache** and **MySQL** via XAMPP.
- Import the SQL file in `/database/vahak.sql` to your phpMyAdmin or create database in MySQL Workbench.

5️⃣ **Environment Variables (Frontend)**

```
VITE_API_URL=http://localhost/vahak/frontend/api
```

## 🌐 Routing (React) 

| Route Path             | Component           |
| ---------------------- | ------------------- |
| `/`                    | Home                |
| `/dashboard`           | dashboard           |
| `/profile`             | profile             |
| `/about`               | about               |
| `/pricing`             | Pricing             |
| `/contact`             | contact             |


## 🏠 Homepage Look 

<img width="1894" height="891" alt="Screenshot 2025-07-12 115201" src="https://github.com/user-attachments/assets/d080bd9d-b687-474d-83fc-61a060a7340e" />


## 👥 Contributors

- **Abhishek Kumar** - Backend Developer & Frontend Developer

---

## 🏁 Future Features

- ✅ User Authentication
- ✅ Advanced Search & Filters
- ✅ Booking Loads Functionality

## 📃 License

This project is open-source for educational purposes.

