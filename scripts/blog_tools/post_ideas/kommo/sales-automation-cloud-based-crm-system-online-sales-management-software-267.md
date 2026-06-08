---
title: "Sales Automation. Cloud Based CRM System. Online Sales Management Software"
source: "https://www.kommo.com/id/layanan/crm/webhooks"
date: "2023-01-30"
---

Jika kamu ingin menerima informasi yang sesuai lewat webhook, akan lebih baik membuat Webhook di bagian Integrasi.
Untuk memulai, pergi ke Pengaturan lalu pergi ke bagian Integrasi di Kommo. Di bagian ini kamu punya integrasi kamu yang terinstal dan kamu akan melihat tombol “Webhook”, kamu bisa mengkliknya dan sebuah jendela akan terbuka seperti berikut:
Kamu bisa klik “+Tambahkan webhook”. Kamu harus menentukan URL mana yang akan menerima webhook ini dan events atau aksi yang akan mendorong webhook ini.
Peristiwa tersebut adalah sebagai berikut:
- Lead ditambahkan, diedit, dihapus, dipulihkan, user yang bertanggung jawab diubah, status berubah, tiap catatan ditambahkan sebagai event terpisah.
- Kontak ditambahkan, diedit, dihapus, dipulihkan, user yang bertanggung jawab diubah, tiap catatan ditambahkan sebagai event terpisah.
- Perusahaan ditambahkan, diedit, dihapus, dipulihkan, user yang bertanggung jawab diubah, tiap catatan ditambahkan sebagai event terpisah.
- Task ditambahkan, diedit, dihapus, tiap user yang bertanggung jawab diubah sebagai event terpisah.
- Pelanggan ditambahkan, diedit, dihapus, dipulihkan, user yang bertanggung jawab diubah, tiap catatan ditambahkan sebagai event terpisah.
- Incoming Lead ditambahkan, diedit, dihapus, setiap lead merupakan event terpisah.
- Incoming message diterima
- Element ditambahkan, diedit atau dihapus dari daftar kamu, setiap element merupakan event terpisah.
Kamu akan menerima informasi utuh untuk event yang kamu pilih, dan saat event terjadi, kamu bisa memilih para event yang ada untuk melakukan trigger, contohnya mari kita lihat dari Lead yang sudah diedit.
Untuk webhook trigger, kamu akan menerima informasi untuk dua kolom:
- From lead field: ID dari lead, nama, ID tahapan, ID dari tahapan sebelumnya, harga, ID user yang bertanggung jawab, tanggal terakhir perubahan, ID user yang diubah, ID user yang terbuat, tanggal pembuatan, ID pipeline, tags dari lead dengan ID mereka, dan nama-nama, dan juga kolom mana yang diubah dengan nama ID dan bagaimana mengubahnya dengan values baru dan lama.
- From account field: subdomain, ID dari tautan akun kamu.
Butuh bantuan lebih lanjut untuk pengaturan dan troubleshooting? Kontak kami dengan mengirimkan email support@kommo.com ke atau hubungi kami melalui Facebook.
Belum punya akun Kommo? Kunjungi halaman tur kami atau hubungi kami untuk melihat demo.
