# Crack — Frontend Application

Frontend aplikasi **Crack**, sistem booking yang dibangun menggunakan **Next.js App Router** dengan **TypeScript**, **Tailwind CSS**, dan terintegrasi dengan **Supabase** untuk authentication & data management.

🌐 **Live Demo:** [https://crack-fe-wmibrahim.vercel.app](https://crack-fe-wmibrahim.vercel.app)

> Project ini merupakan bagian dari program **Revou Full Stack Software Engineering (Oct 2025)**.

---

## 📋 Daftar Isi

- [Tech Stack](#-tech-stack)
- [Fitur Utama](#-fitur-utama)
- [Struktur Proyek](#-struktur-proyek)
- [Routing](#-routing)
- [Instalasi](#-instalasi)
- [Environment Variables](#-environment-variables)
- [Scripts](#-scripts)
- [Deployment](#-deployment)
- [Author](#-author)

---

## 🚀 Tech Stack

| Kategori          | Teknologi                                    |
|-------------------|----------------------------------------------|
| Framework         | [Next.js 15](https://nextjs.org/) (App Router) |
| Language          | TypeScript                                   |
| UI Library        | React 19                                     |
| Styling           | [Tailwind CSS](https://tailwindcss.com/)     |
| Backend Service   | [Supabase](https://supabase.com/) (Auth & DB) |
| Validation        | [Zod](https://zod.dev/)                      |
| Linting           | ESLint (Next.js config)                      |
| Build Tool        | Turbopack                                    |
| Deployment        | [Vercel](https://vercel.com/)                |
| Runtime           | Node.js 18+                                  |

---

## ✨ Fitur Utama

### 👤 Member Area
- 🔐 **Login & Register** — Autentikasi pengguna via Supabase
- 📊 **Dashboard** — Ringkasan aktivitas booking member
- 📅 **Booking** — Membuat dan mengelola reservasi
- 📜 **History** — Melihat riwayat booking

### 🛠️ Admin Area
- 📈 **Dashboard** — Overview statistik aplikasi
- 👥 **Members Management** — Kelola data member
- 📋 **Bookings Management** — Kelola seluruh booking
- 🗓️ **Schedule Management** — Atur jadwal dan slot tersedia

---

## 📁 Struktur Proyek

```
crack-fe-wmibrahim/
├── public/                     # Static assets (images, icons)
├── src/
│   ├── app/
│   │   ├── (auth)/             # Route group untuk autentikasi
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── register/
│   │   │       └── page.tsx
│   │   ├── (member)/           # Route group untuk member
│   │   │   └── member/
│   │   │       ├── booking/
│   │   │       │   └── page.tsx
│   │   │       ├── dashboard/
│   │   │       │   └── page.tsx
│   │   │       └── history/
│   │   │           └── page.tsx
│   │   ├── admin/              # Halaman admin
│   │   │   ├── bookings/
│   │   │   │   └── page.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── members/
│   │   │   │   └── page.tsx
│   │   │   └── schedule/
│   │   │       └── page.tsx
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Landing page
│   └── lib/
│       └── types/              # TypeScript type definitions
├── .env.local                  # Environment variables (gitignored)
├── .gitignore
├── next.config.ts              # Konfigurasi Next.js
├── tsconfig.json               # Konfigurasi TypeScript
├── tailwind.config.ts          # Konfigurasi Tailwind
├── eslint.config.mjs           # Konfigurasi ESLint
└── package.json
```

> 💡 **Catatan:** Tanda kurung pada folder seperti `(auth)` dan `(member)` adalah **Route Groups** di Next.js — folder ini tidak mempengaruhi URL path, hanya untuk pengelompokan secara logis.

---

## 🗺️ Routing

### Public Routes
| Path           | Deskripsi                |
|----------------|--------------------------|
| `/`            | Landing page             |
| `/login`       | Halaman login            |
| `/register`    | Halaman registrasi       |

### Member Routes (Authenticated)
| Path                     | Deskripsi                  |
|--------------------------|----------------------------|
| `/member/dashboard`      | Dashboard member           |
| `/member/booking`        | Membuat booking baru       |
| `/member/history`        | Riwayat booking            |

### Admin Routes (Admin Only)
| Path                  | Deskripsi                  |
|-----------------------|----------------------------|
| `/admin/dashboard`    | Dashboard admin            |
| `/admin/members`      | Manajemen member           |
| `/admin/bookings`     | Manajemen booking          |
| `/admin/schedule`     | Manajemen jadwal/slot      |

---

## ⚙️ Instalasi

### Prasyarat

- **Node.js** versi 18 atau lebih baru
- **npm**, **yarn**, atau **pnpm**
- Akun **Supabase** ([https://supabase.com](https://supabase.com))
- Backend API sudah berjalan (lihat [crack-be-wmibrahim](https://github.com/Revou-FSSE-Oct25/crack-be-wmibrahim))

### Langkah-langkah

1. **Clone repository**
   ```bash
   git clone https://github.com/Revou-FSSE-Oct25/crack-fe-wmibrahim.git
   cd crack-fe-wmibrahim
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   
   Buat file `.env.local` di root project (lihat bagian [Environment Variables](#-environment-variables) di bawah).

4. **Jalankan development server**
   ```bash
   npm run dev
   ```

   Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000)

---

## 🔑 Environment Variables

Buat file `.env.local` di root project dengan konfigurasi berikut:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Backend API URL (opsional, jika frontend memanggil backend terpisah)
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

> ⚠️ **Catatan keamanan:** Jangan commit file `.env.local` ke repository. Pastikan file ini sudah ada di `.gitignore`.

---

## 📜 Scripts

| Command           | Deskripsi                                  |
|-------------------|--------------------------------------------|
| `npm run dev`     | Menjalankan development server (Turbopack) |
| `npm run build`   | Build aplikasi untuk production            |
| `npm run start`   | Menjalankan production server              |
| `npm run lint`    | Menjalankan ESLint                         |

---

## 🌐 Deployment

Project ini sudah di-deploy ke **Vercel** dan dapat diakses melalui:

🔗 **[https://crack-fe-wmibrahim.vercel.app](https://crack-fe-wmibrahim.vercel.app)**

### Langkah deploy ke Vercel:

1. Push code ke GitHub
2. Import project di [vercel.com/new](https://vercel.com/new)
3. Tambahkan environment variables di Vercel Dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy 🚀

---

## 🔗 Related Projects

- 🔙 **Backend API:** [crack-be-wmibrahim](https://github.com/Revou-FSSE-Oct25/crack-be-wmibrahim)

---

## 👤 Author

**Wildan Ibrahim**

- 🔗 GitHub Repository: [crack-fe-wmibrahim](https://github.com/Revou-FSSE-Oct25/crack-fe-wmibrahim)
- 🌐 Live Demo: [crack-fe-wmibrahim.vercel.app](https://crack-fe-wmibrahim.vercel.app)
- 🎓 Program: Revou Full Stack Software Engineering — Oct 2025 Batch

---

## 📝 License

This project is created for educational purposes as part of Revou FSSE coursework.

---

<p align="center">Made with ❤️ using Next.js, Tailwind CSS & Supabase</p>
