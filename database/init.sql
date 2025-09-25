CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    lembaga VARCHAR(20),
    tingkatan VARCHAR(10),
    nama VARCHAR(100),
    jenis_kelamin VARCHAR(10),
    no_telp VARCHAR(15),
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (username, password, email, lembaga, tingkatan, nama, jenis_kelamin, no_telp)
VALUES
('user1', '$2b$10$hNNFSQoJ.btOnhJI45K63O9WOpyKQsgSIw/AMFty9nYOmK88NBfP2', 'user1@mail.com', 'MI', '1', 'Ahmad', 'Laki-laki', '081234567890'),
('user2', '$2b$10$bbywNkPGJ5k4bVM3CAzGou5pkpztjZpdITFqqA4VYh9Bc2dedsura', 'user2@mail.com', 'TK', '', 'Siti', 'Perempuan', '081234567892'),
('user3', '$2b$10$rGAOj/me619bFzlOwJI.HOnY2zZDfBnCx4ZqlZVz9kTx9.wbwDdw6', 'user3@mail.com', 'KB', '', 'Budi', 'Laki-laki', '081234567894'),
('user4', '$2b$10$lEVMDAzQdNt20mWBYdTH1.z.nhPioUT/yM7ijOvWWy7RdSVWwm3SG', 'user4@mail.com', 'MI', '2', 'Ali', 'Laki-laki', '081234567896'),
('user5', '$2b$10$VBeKI0CY0HpGSVFFjzmjneJgZTUJOYprum3q5SWaay/V8Tmik/E/i', 'user5@mail.com', 'TPA', '', 'Dewi', 'Perempuan', '081234567898'),
('user6', '$2b$10$wyWlDAeMwC8Mli1.Ce77XOVbls/15L/M74LL8T.7PoTWntXEjRjjC', 'user6@mail.com', 'MI', '3', 'Fajar', 'Laki-laki', '081234567900'),
('user7', '$2b$10$gvSYYqFKIfn0fKLUaDbDZezZoagolDch9W7sKXh3rVdQK.r9zLxGy', 'user7@mail.com', 'TK', '', 'Rina', 'Perempuan', '081234567902'),
('user8', '$2b$10$VV.MHOUPbvjCKEdFpDjd8.AXa.rFIGuuBfWtXUQr1R3kUVj7fhjK6', 'user8@mail.com', 'MI', '4', 'Hendra', 'Laki-laki', '081234567904');

CREATE TABLE biodata_lengkap (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    nama_lengkap VARCHAR(255) NOT NULL,
    tempat_lahir VARCHAR(100) NOT NULL,
    tanggal_lahir DATE NOT NULL,
    alamat TEXT NOT NULL,
    agama VARCHAR(50) NOT NULL,
    anak_ke INT,
    jumlah_saudara INT,
    golongan_darah VARCHAR(5),
    penyakit VARCHAR(255),
    nama_ayah VARCHAR(100),
    nama_ibu VARCHAR(100),
    pekerjaan_ayah VARCHAR(100),
    pekerjaan_ibu VARCHAR(100),
    no_telp_ortu VARCHAR(15),
    alamat_ortu TEXT,
    asal_sekolah VARCHAR(255),
    tahun_lulus INT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Tabel master step (isi sekali saja oleh admin/dev)
CREATE TABLE registration_steps (
  id SERIAL PRIMARY KEY,
  step_number INT NOT NULL,
  label VARCHAR(100) NOT NULL,
  content TEXT
);

-- Isi data step awal
INSERT INTO registration_steps (step_number, label) VALUES
(1, 'Registrasi User'),
(2, 'Bayar Formulir'),
(3, 'Isi Biodata'),
(4, 'Ujian Masuk'),
(5, 'Surat Persetujuan'),
(6, 'Validasi'),
(7, 'Info Pengumuman');

/*CREATE TABLE all_content (
    id SERIAL PRIMARY KEY,
    registration_steps_id INT REFERENCES registration_steps(id) ON DELETE CASCADE,
    label VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(registration_steps_id, label)
);

INSERT INTO all_content (registration_steps_id, label, body) VALUES
(1, 'fin', 'Form registrasi user telah diisi.'),
(2, 'fin', 'Terima kasih telah bergabung di Yayasan ABC.'),
(3, 'fin', 'Biodata lengkap siswa telah diisi.'),
(4, 'fin', 'Selamat! Anda telah menyelesaikan ujian masuk. Kami akan segera menginformasikan hasilnya kepada Anda. Terima kasih atas partisipasi Anda dalam proses seleksi ini.'),
(5, 'fin', 'Terima kasih telah menyetujui syarat dan ketentuan yang berlaku. Kami menghargai komitmen Anda untuk mengikuti aturan yang telah ditetapkan demi kelancaran proses administrasi. Jika ada pertanyaan lebih lanjut, jangan ragu untuk menghubungi tim kami.'),
(6, 'fin', 'Data Anda telah berhasil divalidasi. Terima kasih atas kerjasama Anda dalam proses ini. Jika ada pertanyaan atau informasi lebih lanjut yang Anda butuhkan, jangan ragu untuk menghubungi tim kami.'),
(7, 'fin', 'Selamat! Anda telah diterima di Yayasan ABC. Kami sangat senang menyambut Anda sebagai bagian dari komunitas kami. Informasi lebih lanjut mengenai langkah selanjutnya akan segera kami sampaikan. Terima kasih atas kepercayaan Anda kepada kami.');

(2, 'con1', 'Terima kasih telah bergabung di Yayasan ABC. Proses registrasi Anda akan segera dilanjutkan setelah pembayaran formulir diterima. Pastikan semua data yang Anda masukkan sudah benar agar proses administrasi berjalan lancar. Jika ada pertanyaan, jangan ragu untuk menghubungi tim kami.'),
(2, 'con2', 'Pembayran dapat dilakukan melalui transfer bank ke rekening berikut:')
(2, 'bank', 'Bank ABC'),
(2, 'va', 'Nomor Rekening: 123-456-789'),
(2, 'an', 'Atas Nama: Yayasan ABC')
(2, 'con3', 'Setelah melakukan pembayaran, harap konfirmasi melalui email atau nomor telepon yang tertera di website kami. Terima kasih atas kerjasama Anda.'),
(2, '', 'Pembayaran formulir telah diterima. Terima kasih atas kerjasama Anda. Proses registrasi akan segera dilanjutkan ke tahap berikutnya. Jika ada pertanyaan lebih lanjut, jangan ragu untuk menghubungi tim kami.');

(3, 'con1', 'Isi Biodata Lengkap Celon Siswa'),
(4, 'Ujian Masuk', 'Ujian masuk telah diselesaikan.'),
(5, 'Surat Persetujuan', 'Surat persetujuan telah ditandatangani.'),
(6, 'Validasi', 'Data telah berhasil divalidasi.'),
(7, 'Info Pengumuman', 'Informasi pengumuman telah diterima.');*/

-- Tabel status step tiap user
CREATE TABLE user_step_status (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  step_id INT REFERENCES registration_steps(id),
  status_step VARCHAR(20) DEFAULT 'pending', -- pending / completed
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, step_id)
);
INSERT INTO user_step_status (user_id, step_id, status_step) VALUES
(1, 1, 'completed'),
(2, 1, 'completed'),
(2, 2, 'completed'),
(2, 3, 'completed'),
(3, 1, 'completed'),
(4, 1, 'completed'),
(4, 2, 'completed'),
(4, 3, 'completed'),
(4, 4, 'completed'),
(5, 1, 'completed'),
(6, 1, 'completed'),
(7, 1, 'completed'),
(7, 2, 'completed'),
(8, 1, 'completed'),
(8, 2, 'completed'),
(8, 3, 'completed'),
(8, 4, 'completed'),
(8, 5, 'completed');

