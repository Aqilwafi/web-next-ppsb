CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    genre TEXT NOT NULL,
    published_at DATE NOT NULL DEFAULT CURRENT_DATE,
    synopsis TEXT NOT NULL
);


CREATE TABLE article_datas (
    id INT PRIMARY KEY REFERENCES articles(id) ON DELETE CASCADE,
    content TEXT NOT NULL
);


INSERT INTO articles (title, author, genre, published_at, synopsis) VALUES
('Alasan yang Tak Terucapkan', 'Dinda Maharani', 'Mistery', '2025-08-20', 'Sebuah rahasia lama muncul kembali ketika Alysya menemukan catatan tersembunyi di perpustakaan.'),
('Jejak Bayangan', 'Alexander Roger', 'Thriller', '2025-08-21', 'Seorang siswa pindahan membawa teka-teki yang mengubah suasana SMA 1 Putri menjadi penuh ketegangan.'),
('Luka yang Tersisa', 'Abraham', 'Drama', '2025-08-22', 'Persahabatan lama diuji ketika kebenaran pahit tentang keluarga terungkap.'),
('Senja Terakhir', 'Kevin Josh', 'Romance', '2025-08-02', 'Di tepi pantai, Kevin dan sahabatnya berjuang memilih antara cinta dan mimpi mereka.'),
('Bayangan di Balik Pintu', 'Ahmad Sumardi', 'Horror', '2025-08-06', 'SMA 1 Putri menyimpan ruangan terkunci yang tak boleh dibuka siapapun.'),
('Nada yang Hilang', 'Nanda McFadden', 'Fantasy', '2025-08-09', 'Melodi dari dunia lain menghubungkan seorang remaja dengan masa lalunya yang misterius.'),
('Langkah Pertama', 'Agung Saputra', 'Adventure', '2025-08-12', 'Petualangan besar dimulai dari langkah kecil, ketika Agung memutuskan meninggalkan kampung halamannya.'),
('Kabut di Ujung Jalan', 'Raisa Andini', 'Mystery', '2025-08-03', 'Sebuah kabut aneh selalu muncul setiap malam di jalan kecil dekat sekolah.'),
('Di Balik Cermin', 'Jonathan Miles', 'Horror', '2025-08-04', 'Cermin tua di rumah kos mahasiswa menampilkan bayangan yang bukan miliknya.'),
('Rahasia Lantai Dua', 'Putri Amelia', 'Thriller', '2025-08-05', 'Seorang siswi menemukan kunci menuju ruang rahasia di sekolah.'),
('Lirik yang Terlupakan', 'Arif Nugraha', 'Drama', '2025-08-07', 'Seorang musisi muda kehilangan motivasi setelah insiden tragis.'),
('Langkah Dalam Hujan', 'Michael Lawrence', 'Romance', '2025-08-08', 'Pertemuan singkat di halte bus berubah menjadi kisah cinta panjang.'),
('Dunia yang Retak', 'Cassandra Lee', 'Sci-Fi', '2025-08-10', 'Dimensi lain mulai menyusup ke dunia nyata tanpa ada yang menyadari.'),
('Surat Tanpa Nama', 'Riko Hartanto', 'Detective', '2025-08-11', 'Seorang detektif SMA mendapat surat ancaman misterius.'),
('Jejak di Pasir', 'Sinta Wulandari', 'Adventure', '2025-08-13', 'Perjalanan ke gurun membawa rahasia keluarga yang lama hilang.'),
('Lilin yang Padam', 'Edward Coleman', 'Historical', '2025-08-14', 'Cerita tentang perjuangan di masa kolonial yang terlupakan.'),
('Cahaya di Tengah Malam', 'Nabila Anggraini', 'Fantasy', '2025-08-15', 'Sebuah cahaya biru misterius memandu seorang gadis ke dunia lain.'),
('Bayang-Bayang Luka', 'Fajar Prasetyo', 'Drama', '2025-08-16', 'Konflik keluarga menjadi beban berat bagi seorang anak bungsu.'),
('Kisah di Bawah Pohon Tua', 'Melinda Grace', 'Slice of Life', '2025-08-17', 'Persahabatan anak-anak desa terikat oleh janji sederhana.'),
('Nada yang Tak Pernah Usai', 'Farhan Malik', 'Philosophical', '2025-08-18', 'Seorang pemuda mempertanyakan makna hidup melalui musiknya.'),
('Langkah Sang Pengelana', 'Amelia Wardani', 'Adventure', '2025-08-19', 'Seorang pengelana muda berkelana mencari arti rumah.'),
('Hujan di Kota Tua', 'Christopher Lee', 'Romance', '2025-08-23', 'Kenangan lama kembali ketika hujan turun di jalan bersejarah.'),
('Kegelapan di Balik Senyum', 'Andi Saputra', 'Psychological', '2025-08-24', 'Senyum manis seorang siswi menyimpan trauma yang mendalam.'),
('Ruang Tanpa Waktu', 'Maya Kristina', 'Sci-Fi', '2025-08-25', 'Seorang ilmuwan menemukan cara masuk ke dimensi tanpa waktu.'),
('Malam Tanpa Bintang', 'Sarah Johnson', 'Drama', '2025-08-26', 'Kesepian mendalam membuat seorang gadis hampir kehilangan harapan.'),
('Jejak Sang Pencuri', 'Dewi Anggraini', 'Detective', '2025-08-27', 'Kasus pencurian di sekolah mengungkap konspirasi tak terduga.'),
('Api yang Membeku', 'Bayu Aditya', 'Fantasy', '2025-08-28', 'Sebuah pedang kuno mampu membekukan api dan membakar es.'),
('Kenangan di Stasiun Lama', 'Maria Fernanda', 'Romance', '2025-08-29', 'Pertemuan tak terduga di stasiun kereta tua menumbuhkan cinta baru.'),
('Sepotong Senja', 'Doni Kurniawan', 'Slice of Life', '2025-08-30', 'Kehangatan keluarga sederhana digambarkan melalui senja di beranda.'),
('Tangisan di Balik Dinding', 'Olivia Carter', 'Horror', '2025-08-31', 'Tangisan anak kecil terdengar setiap malam dari rumah kosong.'),
('Rahasia Langit Merah', 'Rangga Saputra', 'Mystery', '2025-09-01', 'Langit berubah merah setiap kali sebuah tragedi besar terjadi.'),
('Nyanyian Angin Malam', 'Sofia Alim', 'Fantasy', '2025-09-02', 'Seorang gadis dapat berbicara dengan angin yang membawa pesan masa depan.');