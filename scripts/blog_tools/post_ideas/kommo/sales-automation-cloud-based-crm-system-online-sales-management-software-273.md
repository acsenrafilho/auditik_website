---
title: "Sales Automation. Cloud Based CRM System. Online Sales Management Software"
source: "https://www.kommo.com/id/layanan/crm/panduan-salesbot"
date: "2023-02-02"
---

Buat Salesbot yang kuat dan efisien dengan Kommo! Visual editor kami membuat automasi menjadi mulus dan sesuai untuk bisnis apa pun. Untuk kamu yang baru mengenal bot atau sudah berpengalaman, panduan ini akan memandumu.
Belum pernah membuat bot sebelumnya? Pelajari cara membuatnya.
Apa saja langkah-langkah Salesbot?
Langkah-langkah Salesbot adalah blok bangunan Salesbot kamu. Mereka yang memandu percakapan dengan lead dan mengotomatiskan proses internal. Setiap langkah memiliki tujuan tertentu.
Buka Visual Builder untuk melihat langkah-langkah yang tersedia:
Pesan
Langkah Pesan adalah alat utama kamu untuk berkomunikasi dengan pelanggan. Gunakan langkah ini untuk mengirim pesan teks atau template pesan.
Cara menggunakannya:
-
Klik Pesan di visual builder.
- Blok pesan akan muncul. Klik pada kolom teks untuk mengedit konten.
- Untuk menambahkan template pesan, klik template, lalu pilih satu dari daftar template obrolan yang tersedia.
Kamu juga dapat meningkatkan komunikasi klien dengan menambahkan tombol balasan cepat (Balas cepat). Tombol-tombol ini memungkinkan klien memilih dari opsi yang kamu tetapkan, memandu mereka melalui alurmu. Untuk menambahkannya, klik + Quick Reply.
Misalnya, kamu dapat mencantumkan beberapa opsi yang mungkin dipilih klienmu, dan bot akan mengikuti jalur yang sesuai berdasarkan pilihan mereka.
Catatan: Kamu dapat menambahkan hingga 13 tombol, tetapi kami sarankan untuk menambahkan tidak lebih dari tiga tombol untuk menghindari pesan yang terpotong pada beberapa platform.
Kamu juga dapat menambahkan kata kunci sinonim sebagai alternatif untuk tombol, agar membantu bot memahami maksud klien meskipun mereka mengetik dan bukan mengklik. Hanya dengan satu kata kunci saja sudah cukup bagi Salesbot untuk mengidentifikasi opsi yang tepat.
Pada langkah Pesan, kamu juga dapat menyertakan tombol URL yang mengarahkan klien ke halaman web. Misalnya, beri label tombol sebagai Kunjungi website kami, tambahkan tautan ke website kamu dan saat diklik, mereka akan diarahkan langsung ke beranda web.
Setelah kamu menambahkan setidaknya satu tombol ke pesanmu, sistem akan menyarankan untuk menambahkan dua cabang tambahan:
-
Jawaban lain: Jika klien membalas pesan dengan tombol dengan memberikan input yang berbeda (tidak mengklik tombol atau memasukkan sinonim), cabang alternatif dapat diatur.
-
Tidak ada jawaban: Klik Tambah langkah selanjutnya. Pengatur waktu akan ditambahkan sebagai langkah pertama setelah langkah ini. Jika Salesbot tidak menerima respon dalam jangka waktu yang ditentukan, cabang alternatif dapat dikonfigurasi:
Kamu juga dapat melampirkan file ke pesanmu dengan mengklik ikon lampiran — cocok untuk berbagi dokumen seperti daftar harga atau menu.
Jenis file yang didukung meliputi:
- Dokumen
- Gambar
- Video
- File audio
Kamu dapat mengirim file audio melalui metode berikut:
- Sebagai tautan audio dalam format .mp3, .wav melalui integrasi Instagram.
- Sebagai file audio dalam format .mp3 melalui integrasi WACA.
Kamu dapat mengirim pesan suara dengan Salesbot menggunakan format .ogg melalui sistem Android. Ketika mengirim pesan dalam format .ogg melalui iOS, file akan dikirimkan sebagai lampiran file audio.
Kamu dapat mengirim pesan suara melalui integrasi berikut: Instagram, Facebook, dan WACA.
Selanjutnya, pilih penerima pesan jika ada beberapa kontak dalam kartu lead:
-
Semua contacts - selected channel (default) – Mengirim pesan ke semua kontak hanya menggunakan channel yang telah kamu pilih.
-
Semua kontak - saluran utama – Mengirim pesan ke semua kontak, namun hanya melalui salah satu channel.
-
Main contact - selected channel – Mengirim pesan hanya ke kontak utama melalui channel yang telah kamu pilih.
-
Kontak utama - saluran utama – Mengirim pesan ke kontak utama hanya melalui salah satu channel.
Catatan: Main contact merujuk pada kontak utama dalam lead saat beberapa kontak dikaitkan. Jika lead hanya memiliki satu kontak, maka lead tersebut dianggap setara dengan kontak utama. Semua contacts merujuk pada semua kontak yang dihubungkan ke lead saat ada beberapa kontak.
Pilih saluran yang akan digunakan Salesbot dengan mengklik Channel di bagian atas. Secara default, ia akan diatur ke Semua. Buka menu tarik-turun untuk melihat semua channel yang terhubung dan pilih semua atau beberapa di antaranya.
Opsi ini memberikanmu fleksibilitas dalam mengelola komunikasi, sehingga kamu dapat menyesuaikannya dengan struktur lead dan preferensi channel. Bagian terbaiknya? Kamu tidak perlu membuat bot terpisah untuk setiap channel — kamu dapat mengelola semuanya dengan satu bot!
Catatan: Saat pesan dikirim, statusnya jadi Terkirim. Kalau gagal terkirim, bot akan lanjut ke cabang Gagal mengirim pesan.
Kalau statusnya berhasil jadi Tersampaikan, bot akan lanjut ke cabang utama.
List Pesan (WhatsApp)
Fitur ini memungkinkan kamu mengirim hingga 10 opsi dalam daftar terstruktur. Klien dapat dengan mudah menavigasi dan memilih dari opsi. Kamu juga dapat menambahkan deskripsi ke setiap opsi untuk memberikan informasi yang lebih rinci.
-
Pilih List Pesan (WhatsApp) dari visual builder.
- Isi kolom berikut:
- Pesan title (opsional)
- Pesan (wajib diisi)
- Footer (opsional)
- Button name (wajib diisi)
- Section title (wajib diisi)
- Option title (wajib diisi)
- Option description (opsional)
-
Tambahkan lebih banyak opsi dan bagian dengan mengklik Tambah opsi atau + Tambah bagian:
Mengklik tombol Tambah bagian akan membuat bagian baru yang perlu dilengkapi.
Mengklik tombol Tambah opsi akan membuat opsi baru yang perlu dilengkapi.
Kondisi
Langkah ini berfungsi sebagai filter antara tindakan Salesbot. Kamu dapat menetapkan beberapa kondisi yang harus dipenuhi oleh pesan chat atau kolom kontak sebelum melanjutkan ke langkah berikutnya. Fitur ini berguna saat kamu perlu memfilter jenis kontak tertentu atau memandu Salesbot berdasarkan isi pesan.
Kamu dapat menetapkan kondisi yang berbeda dalam satu langkah atau membuat beberapa kondisi untuk jalur percakapan yang berbeda.
Ini membantumu menyesuaikan respon bot berdasarkan apa yang dikatakan klien. Misalnya, jika klien mengetik “Halo,” bot dapat membalas dengan “Selamat datang di perusahaan kami.” Jika mereka meminta “katalog,” bot dapat mengirimkan katalog dan berkata “Ini katalog kami.”
Kamu dapat mempersonalisasi langkah ini dengan berbagai cara. Alih-alih hanya menggunakan pesan klien, kamu dapat mendasarkan kondisi pada hal-hal seperti Active chat code, Lead source, atau kolom khusus lainnya.
Komentar
Langkah ini dapat digunakan untuk menyiapkan automasi komentar Instagram. Untuk memulai, pastikan kamu sudah menginstal integrasi Instagram kami.
Untuk mempelajari lebih lanjut tentang integrasi, baca artikel Instagram: Cara menghubungkan Instagram dengan Kommo.
Cara mengaturnya:
- Gunakan Kondisi untuk memicu respon berdasarkan kata kunci tertentu dalam komentar. Atur menjadi If Client comment Equals: lalu ketik kata kunci pilihanmu sebagai trigger.
-
Tambahkan langkah Komentar untuk membuat balasan publik yang akan diposting saat kata kunci terdeteksi dalam komentar.
-
Jika sudah siap, tekan Simpan & Lanjutkan untuk menyelesaikan pengaturan.
Untuk mempelajari lebih lanjut tentang automasi Instagram, baca artikel Automasi komentar Instagram: Cara mengaturnya.
Jeda
Langkah Jeda memungkinkan bot untuk menunggu tindakan tertentu sebelum melanjutkan.
Cara mengaturnya:
-
Pilih Jeda dari daftar langkah.
Secara default, bot akan menunggu hingga pesan diterima (until message received). Klik untuk mengedit langkah ini.
Bot dapat menunggu hingga:
-
Pesan diterima (Pesan received): bot akan menghentikan tindakannya hingga menerima respon dari klien.
-
Penghitung waktu habis (Timer is out): bot akan menunggu selama waktu tertentu sebelum melanjutkan ke langkah berikutnya. Jumlah waktu maksimum yang dapat kamu atur adalah 8760 jam, 60 menit, 60 detik.
-
Kecuali di jam kerja (Except for duty hours): Bot akan menjeda jika waktu saat ini berada di luar jam kerja yang telah ditentukan sebelumnya.
-
Video dibuka (Video is opened) atau video ditutup (Video is ditutup): bot akan menunggu hingga klien membuka atau menutup video yang telah dikirim kepada mereka sebelum melanjutkan. Ini dapat digunakan untuk memastikan bahwa klien telah berinteraksi dengan konten video sebelum melanjutkan. Harap perhatikan bahwa fitur Video dibuka atau video ditutup hanya tersedia di channel Live Chat.
Kamu dapat menambahkan beberapa kondisi dengan mengklik +Tambahkan kondisi berikutnya. Untuk menghapus kondisi, arahkan kursor ke atasnya dan klik tiga titik, lalu Hapus.
Catatan: Dalam skenario yang ditunjukkan di screenshot (dengan dua kondisi: Until message received dan Timer), bot hanya akan mengikuti satu kondisi. Jika Salesbot menerima pesan sebelum pengatur waktu berakhir, bot akan melanjutkan dengan langkah setelah kondisi Until message received. Jika timer kadaluwarsa terlebih dahulu, bot akan mengikuti langkah setelah kondisi timer.
Validation
Langkah validasi memeriksa pesan klien dan mengarahkan bot sebagaimana mestinya.
Ia memvalidasi pesan berdasarkan berbagai variabel, seperti:
- equals
- does not equal
- berisi
- tidak berisi
- has a length of; atau
- regular expression
Catatan: Saat kamu memilih berisi, kamu harus menentukan apakah konten harus berisi angka, huruf, nomor telepon, email, atau rentang numerik.
Misalkan bot meminta nomor telepon klien. Untuk memastikan klien memberikan nomor telepon dan bukan teks acak, kamu dapat menetapkan kondisi validasi seperti if client message berisi phone number. Jika nomor telepon terdeteksi, bot dapat melanjutkan ke langkah berikutnya. Kamu juga dapat menambahkan kondisi lain, seperti if client message does not include phone number meminta bot untuk meminta nomor telepon yang benar.
Kirim internal message
Pesan internal sangat bagus untuk berbagi informasi dalam perusahaanmu. Mereka hanya terlihat untuk orang yang dipilih atau tim yang ditunjuk.
Misalnya, jika kamu menjalankan bisnis katering dan klien ingin membahas opsi melalui panggilan, bot dapat mengirim pesan ke asisten yang bertanggung jawab menangani masalah tersebut.
Cara mengaturnya:
- Pilih langkah Internal message di visual builder.
- Masukkan teks dan pilih pengguna yang bertanggung jawab atau pengguna yang ingin kamu kirimi pesan tersebut saat dipicu:
Langganan (Meta)
Jendela percakapan 24 jam Meta membatasi pengiriman pesan kepada pelanggan hingga 24 jam setelah pesan terakhir mereka. Hal ini dilakukan untuk mencegah spam. Pesan opt-in mengatasi masalah ini dengan mengizinkan klien untuk berlangganan newsletter reguler pada topik yang mereka pilih, membantu menjaga percakapan tetap berjalan. Kamu dapat mengaturnya menggunakan langkah Langganan (Meta).
Dua kolom yang harus diisi agar langkah tersebut dapat diluncurkan adalah #tambahkan tag dan Masukkan judul pesan.
Catatan: Langkah ini hanya tersedia untuk channel Meta (Facebook). Pelajari lebih lanjut tentang langkah ini di artikel Pesan opt-in Meta.
Semua tindakan yang tersedia
Salesbot menawarkan berbagai tindakan untuk mengotomatiskan alur kerja dan meningkatkan komunikasi. Cukup klik Tindakan saat menyiapkan langkah, dan kamu akan melihat menu tarik-turun dengan opsi berikut. Berikut adalah uraian setiap tindakan:
-
Tambahkan catatan: Menambahkan catatan secara langsung ke kartu lead untuk pelacakan yang lebih baik.
Untuk menambahkan catatan, pertama-tama, pilih jenis entitas untuk catatan tersebut (default: main contact).
Kemudian, masukkan teks catatan. Setelah dipicu, catatan akan muncul di chat lead.
Kamu dapat mengedit catatan di kartu lead saat kamu mengkliknya. Kamu dapat melampirkan berkas atau menghapusnya dengan mengarahkan kursor ke sisi kanannya dan mengklik Hapus.
-
Tambahkan tugas: Menugaskan tugas kepada anggota tim. Kamu dapat menetapkan tenggat waktu, memilih pengguna yang bertanggung jawab, mengubah jenis tugas, atau memberikan komentar.
Misalnya, ketika lead mencapai tahap pengambilan keputusan, kamu dapat menggunakan tindakan ini untuk memudahkan tugas follow-up dan koordinasi tim. Secara otomatis menetapkan tugas kepada anggota tim yang bertanggung jawab untuk menindaklanjuti lead. Untuk mempelajari lebih lanjut tentang Task, baca artikel Task kami.
-
Ubah status percakapan: Secara otomatis memperbarui status percakapan menjadi ditutup (ditutup) atau dijawab (terjawab) berdasarkan pemicu tertentu.
-
Ubah status lead: Pindahkan lead melalui pipeline secara otomatis berdasarkan tindakan yang kamu tetapkan. Yang perlu kamu lakukan adalah memilih pipeline dan tahap (misal, Decision Making), dengan mengklik tombol Pipeline.
Misalnya, kamu dapat mengaturnya agar ketika klien memilih layanan dari tombol quick reply, bot akan memindahkannya ke tahapan Decision making.
-
Ubah penanggung jawab: Mengarahkan klien ke penanggung jawab yang tepat berdasarkan kebutuhan mereka. Penanggung jawab dapat diubah dalam entitas berikut: kontak utama, semua kontak, kontak chat, lead, dan perusahaan:
Untuk memilih pengguna yang bertanggung jawab untuk menanganilead, klik ... :
-
Complete task: Secara otomatis menandai tugas sebagai selesai dan memperbarui kalender. Kamu dapat memilih semua tugas atau tugas tertentu dan tentukan tenggat waktu. Setelah langkah ini dijalankan, tugas akan selesai. Sebuah catatan akan muncul dalam chat dengan user yang membuat tugas tersebut.
Task akan berpindah dari kolom to-dos di kalender Kommo ke to-dos yang sudah selesai.
-
Buat formulir: Buat formulir untuk mengumpulkan lebih banyak informasi dari lead. Semua data masuk ke dalam kartu lead. Atau, kamu dapat memilih untuk membuat lead baru berdasarkan informasi dari formulir. Kamu juga dapat mengatur tahap pipeline atau menambahkan tag ke kartu lead.
Untuk membuat formulir, klik tombol Buat form pilih tata letak formulir, edit kolom, dan desain yang kamu inginkan.
Kamu dapat mempelajari lebih lanjut tentang mengedit formulir di artikel Webform oleh Kommo.
-
Buat lead: Secara otomatis membuat lead baru dengan detail penting.
Kamu dapat memilih informasi apa yang akan disertakan (seperti Penjualan, Tag, Kontak, dan Perusahaan) dan menetapkannya ke pengguna mana pun. Kamu juga dapat mengatur tahap pipeline yang akan digunakan. Ketika pengguna memilih opsi dari daftar, informasi spesifik ini akan disalin langsung dari kartu lead yang sedang ditangani bot.
Sebagai contoh, Salesbot dapat secara otomatis membuat lead untuk peserta webinar yang meminta konsultasi. Salesbot dapat menambahkan detail seperti nama, info kontak, dan perusahaan mereka dari formulir pendaftaran, menandai mereka sebagai “Peserta Webinar,” dan menetapkan lead ke tahap pipeline dan penanggung jawab yang tepat . Hal ini menghemat waktu dan memastikan tidak ada klien potensial yang terlewatkan.
-
Kelola pelanggan: Menambah atau menghapus subscriber (misalnya, anggota tim) dalam chat agar mereka tetap mendapat notifikasi tentang pembaruan di kartu lead.
-
Kelola tag: Menambah atau menghapus tag dengan mudah untuk pengaturan yang lebih baik. Kamu dapat menambah/menghapus tag, dan mengubah entitas yang akan ditugaskan/dihapus. Ketika kamu mengklik #tambahkan tag daftar tag yang tersedia akan muncul. Pilih salah satu yang kamu perlukan dari daftar, atau buat tag baru.
-
Meta Conversions API: Lacak tindakan pelanggan dengan mudah di Kommo (seperti lead dan pembelian) dari iklan Click-to-Pesan kamu di Instagram, Facebook Messenger, atau WhatsApp dengan menyinkronkannya secara langsung dengan Meta Peristiwa Manager. Integrasi ini membantumu memantau performa iklan, menilai kampanye, dan menyempurnakan strategi, sehingga memberikan pemahaman yang komprehensif tentang perjalanan pelangganmu.
Untuk mempelajari cara menyiapkan Meta Conversions API melalui Salesbot, baca artikel Cara menggunakan Meta Conversions API.
-
Kirim email: Mengotomatiskan pengiriman email menggunakan template.
Pertama, kamu perlu menghubungkan alamat email dengan mengklik connect.
Catatan: untuk mengirim email, kamu harus membuat template email dengan membuka Mail > Pengaturan > menu Templates.
Email dikirim dari email penanggung jawab yang terhubung. Jika tidak tersedia, email perusahaan akan digunakan.
Untuk detail lebih lanjut, lihat artikel Triggered emails.
-
Kirim webhook: Kirim data ke aplikasi pihak ketiga menggunakan webhook. Misalnya, kamu dapat menggunakan webhook untuk mengubah status pesanan dari Placed menjadi Canceled di sistem ERP. Yang perlu kamu lakukan adalah memasukkan URL webhook.
-
Atur kolom: Memperbarui kolom khusus di profil lead secara otomatis. Misalnya, bot dapat secara otomatis mengisi kolom khusus ketika klien memberikan email atau nomor telepon mereka dalam chat.
Untuk memilih kolom yang ingin kamu minta isi oleh klien, klik ... :
Pilih jenis entitas yang akan diatur dengan mengklik Chat contact:
Selanjutnya, pilih kolom mana yang ingin kamu perbarui dan jenis data yang kamu perlukan. Tergantung pada pilihan entitasmu, Salesbot dapat mengisi kolom yang berbeda. Berikut ini adalah yang paling populer:
- Client message - Menerima pesan chat terakhir yang dikirim klien sebelum tindakan ini dipicu.
- Manual input - Salesbot akan menghubungi user yang bertanggung jawab di Kommo dan meminta mereka untuk memasukkan data secara manual
Pergi ke langkah lain
Fitur Pergi ke Another Step memungkinkan bot untuk melompat langsung ke langkah lain dalam urutanmu. Fitur ini dirancang untuk membuat alur yang rumit menjadi lebih mudah dengan menghubungkan beberapa langkah tanpa menduplikasinya. Cukup pilih satu langkah dari daftar, dan bot akan menghubungkannya untukmu.
Catatan: Opsi ini hanya tersedia setelah kamu menyiapkan setidaknya satu langkah lain dalam alur bot.
Gunakan Pergi ke langkah lain untuk menggabungkan beberapa tindakan menjadi satu jalur atau langkah, sehingga tidak redundan:
Ini juga memungkinkan menghubungkan beberapa tindakan ke satu langkah untuk menghindari pengulangan proses yang sama berulang kali. Misalnya, jika klien belum memberikan nomor telepon yang diperlukan, minta mereka untuk memasukkannya dan arahkan bot kembali ke langkah validasi.
Tip: Jika alur Salesbot menjadi rumit, gunakan tool peta di bagian bawah layar untuk menavigasi antar langkah dengan mudah. Klik bagian mana pun di peta untuk melompat langsung ke bagian urutan bot.
Untuk navigasi yang lebih lancar, ketika kamu melompat di antara langkah, sebuah tombol akan muncul di atas peta selama beberapa detik, sehingga kamu dapat dengan cepat kembali ke langkah sebelumnya.
Jika dua langkah terlalu jauh untuk dihubungkan oleh panah otomatis, langkah tersebut akan muncul sebagai tombol yang dapat diklik:
Mengklik tombol ini juga akan menampilkan tombol Kembali ke... di atas peta untuk memudahkan navigasi.
Mulai bot
Langkah Mulai bot memungkinkanmu menautkan bot yang sudah ada ke alur kerjamu saat ini.
Klik Mulai bot lalu pilih bot yang ingin kamu sertakan dalam proses.
Kamu dapat menggunakan bot jenis ini untuk membangun alur kerja penjualan yang lengkap, mengotomatiskan tugas dari awal hingga akhir.
Misalnya, sebelum mengirimkan pesanan, kamu mungkin ingin memverifikasi informasi kontak klien. Jika informasinya salah, kamu dapat mengaktifkan bot sambutan untuk mengumpulkan detail kontak yang diperbarui. Setelah bot sambutan menyelesaikan tugasnya, bot konfirmasi data dapat melanjutkan.
Custom step (Code)
Pada langkah ini, kamu dapat memasukkan kodemu sendiri untuk fungsionalitas tingkat lanjut.
Catatan: Handler kode “” harus berisi setidaknya satu karakter agar langkah dapat diaktifkan. Untuk mengetahui lebih rinci tentang cara membuat perintah untuk Salesbot melalui pengkodean, silakan lihat artikel Salesbot di basis pengetahuan kami untuk developer.
WIdget
Langkah ini memiliki widget pihak ketiga yang dapat digunakan dalam Salesbot. Kamu dapat menambahkan berbagai integrasi melalui langkah ini, seperti Stripe, Mailer, dan lainnya ke alur bot. Mereka akan menambahkan fitur ekstra ke bot kamu. Untuk menambahkan widget, klik WIdget
Daftar widget yang tersedia akan muncul. WIdget yang sudah kamu pasang akan muncul terlebih dahulu. Jika kamu ingin menggunakan widget lain, cukup klik Instal.
Misalnya, dengan widget Stripe, kamu dapat mengirim faktur pembayaran yang dipersonalisasi. Saat kamu memilih widget, akan muncul langkah berisi informasi yang diperlukan untuk diisi.
Mereka dapat ditambahkan secara manual atau secara otomatis. Untuk petunjuk terperinci tentang cara menggunakan Stripe dengan bot, lihat artikel integrasi Stripe kami.
Setiap langkah widget bersifat unik. Untuk menjelajahi integrasi apa saja yang ditawarkan Kommo, lihat halaman Aplikasi dan integrasi kami.
Round Robin
Fitur Round Robin memungkinkan kamu menjalankan langkah-langkah dalam urutan melingkar, sehingga memudahkan pendistribusian tindakan secara merata di antara calon pelangganmu. Kamu dapat memilih hingga 100 opsi yang berbeda, yang masing-masing menjalankan tindakan unik.
Cara mengaturnya:
-
Pilih Round Robin dari menu Salesbot.
-
Tambahkan langkah untuk setiap opsi dengan mengklik Tambahkan Berikutnya/Selanjutnya Step.
-
Pilih tindakan untuk setiap langkah, seperti Pesan, Task, atau tindakan lain yang tersedia.
Manfaat lain dari langkah ini adalah memungkinkan kamu melakukan A/B testing untuk menentukan pesan mana yang paling efektif.
Misalnya, jika kamu menambahkan tiga opsi, bot akan memutarnya seperti ini:
-
Lead pertama mendapatkan Pesan 1.
-
Lead kedua mendapat Pesan 2.
-
Lead ketiga mendapat Pesan 3.
-
Lead keempat kembali ke Pesan 1.
Pola ini berlanjut, memastikan pesan didistribusikan secara merata di antara lead kamu.
Meskipun Round Robin bersifat fleksibel, perlu diingat beberapa batasan dan kondisi restart:
-
Tindakan maksimum: kamu dapat memiliki hingga 100 tindakan, tetapi minimal diperlukan dua tindakan. Blok dimulai dengan dua opsi, dan kamu tidak dapat menghapus satu tindakan hingga kamu menambahkan tindakan ketiga.
-
Mulai ulang distribusi: Urutan akan diatur ulang jika kamu menambahkan/mengedit/menghapus tindakan baru.
Catatan: Selalu ingat untuk menyimpan pengaturan Salesbot setelah kamu selesai mengonfigurasinya.
Perlu bantuan lebih lanjut untuk pemasangan atau troubleshooting? Hubungi kami dengan mengirimkan email ke support@kommo.com atau kirimkan pesan melalui WhatsApp. Kamu juga bisa menyewa partner Kommo untuk melakukan semua pekerjaan sulit untukmu.
Belum menjadi pengguna? Daftar untuk uji coba gratis selama 14 hari atau pesan live demo gratis untuk melihat fiturnya secara langsung!
