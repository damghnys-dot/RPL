===========================================================
SMART HELM PARKING - UNIVERSITY HELMET STORAGE SYSTEM
===========================================================
Project: Mobile Web Application (SPA)
Tech Stack: React 18, TypeScript, Tailwind CSS v4, Vite

A. CARA MENJALANKAN SISTEM (LOCAL DEVELOPMENT)
-----------------------------------------------------------
Pastikan laptop Anda sudah terinstall Node.js (versi 18 ke atas).

1. Buka folder "smart-helm-parking" di Terminal atau Command Prompt.
2. Jalankan perintah untuk menginstall semua library:
   > npm install
3. Setelah selesai, jalankan server development:
   > npm run dev
4. Buka browser dan akses alamat yang muncul (biasanya http://localhost:5173).

B. CARA AKSES LEWAT HP (SAMA JARINGAN WI-FI)
-----------------------------------------------------------
1. Jalankan perintah dengan flag host:
   > npm run dev -- --host
2. Lihat alamat "Network" yang muncul (contoh: http://192.168.1.5:5173).
3. Buka alamat IP tersebut di browser HP Anda.

C. CARA DEPLOY KE INTERNET (VERCEL)
-----------------------------------------------------------
Jika Anda ingin sistem bisa diakses dosen penguji secara online:

1. Push folder ini ke repository GitHub Anda.
2. Login ke https://vercel.com menggunakan akun GitHub.
3. Klik "Add New" -> "Project".
4. Pilih repository project ini.
5. Klik "Deploy".
6. Vercel akan memberikan URL publik (contoh: smart-helm.vercel.app).

D. STRUKTUR FOLDER
-----------------------------------------------------------
- src/app       : Routing dan konfigurasi aplikasi utama.
- src/components: Komponen UI reusable (Mobile Container, Navigasi, dll).
- src/screens   : Halaman-halaman aplikasi (Dashboard, Scanner, Admin, dll).
- src/data      : Mock data (Data user, rak, dan log sistem).
- src/styles    : Tema Tailwind CSS v4 dan font.

E. FITUR UTAMA
-----------------------------------------------------------
1. Student: Deposit Helm, QR Code Generation, History.
2. Staff  : QR Scanner Simulation, Verification, Retrieval Process.
3. Admin  : Analytics Dashboard, Weekly Reports, System Logs.

===========================================================
Dibuat untuk keperluan Demo Tugas Akhir / Skripsi
===========================================================
