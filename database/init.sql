CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    lembaga VARCHAR(20) NOT NULL,
    tingkatan VARCHAR(10),
    nama_lengkap VARCHAR(255) NOT NULL,
    jenis_kelamin VARCHAR(10) NOT NULL,
    no_telp VARCHAR(15),
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (username, password, email, lembaga, tingkatan, nama_lengkap, jenis_kelamin, no_telp)
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
    tempat_lahir VARCHAR(100) ,
    tanggal_lahir DATE,
    alamat TEXT,
    agama VARCHAR(50) DEFAULT 'Islam',
    anak_ke INT DEFAULT 1,
    jumlah_saudara INT,
    golongan_darah VARCHAR(5),
    penyakit VARCHAR(255),
    nama_ayah VARCHAR(100),
    nama_ibu VARCHAR(100),
    pekerjaan_ayah VARCHAR(100),
    pekerjaan_ibu VARCHAR(100),
    no_telp_ayah VARCHAR(15),
    no_telp_ibu VARCHAR(15),
    alamat_ortu TEXT,
    asal_sekolah VARCHAR(255),
    tahun_lulus INT,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO biodata_lengkap 
(
    user_id, tempat_lahir, tanggal_lahir, alamat, agama, anak_ke, jumlah_saudara, 
    golongan_darah, penyakit, nama_ayah, nama_ibu, pekerjaan_ayah, pekerjaan_ibu, 
    no_telp_ayah, no_telp_ibu, alamat_ortu, asal_sekolah, tahun_lulus
) 
VALUES
(1, 'Jakarta', '2005-01-10', 'Jl. Merdeka No.1, Jakarta', 'Islam', 1, 2, 'O', NULL, 'Budi Santoso', 'Ani Lestari', 'Pegawai Negeri', 'Ibu Rumah Tangga', '081234567890', '081234567899', 'Jl. Merdeka No.1, Jakarta', 'SMPN 1 Jakarta', 2020),
(2, 'Bandung', '2004-05-12', 'Jl. Asia Afrika No.5, Bandung', 'Islam', 2, 3, 'A', 'Asma', 'Dedi Gunawan', 'Ratna Sari', 'Wiraswasta', 'Guru', '081234567891', '081234567900', 'Jl. Asia Afrika No.5, Bandung', 'SMPN 2 Bandung', 2019),
(3, 'Surabaya', '2006-07-20', 'Jl. Pahlawan No.10, Surabaya', 'Islam', 1, 1, 'B', NULL, 'Andi Prasetyo', 'Maya Wulandari', 'Dokter', 'Perawat', '081234567892', '081234567901', 'Jl. Pahlawan No.10, Surabaya', 'SMPN 3 Surabaya', 2021),
(4, 'Medan', '2005-02-18', 'Jl. Gatot Subroto No.22, Medan', 'Islam', 3, 4, 'AB', 'Alergi Debu', 'Syahrul Hidayat', 'Siti Aminah', 'Polisi', 'Pedagang', '081234567893', '081234567902', 'Jl. Gatot Subroto No.22, Medan', 'SMPN 4 Medan', 2020),
(5, 'Yogyakarta', '2004-11-05', 'Jl. Malioboro No.45, Yogyakarta', 'Islam', 1, 2, 'O', NULL, 'Ignatius Wibowo', 'Maria Kusuma', 'Dosen', 'Dokter', '081234567894', '081234567903', 'Jl. Malioboro No.45, Yogyakarta', 'SMPN 5 Yogyakarta', 2019),
(6, 'Semarang', '2005-08-25', 'Jl. Pandanaran No.7, Semarang', 'Islam', 2, 2, 'A', NULL, 'Slamet Riyadi', 'Nurhayati', 'Petani', 'Pedagang', '081234567895', '081234567904', 'Jl. Pandanaran No.7, Semarang', 'SMPN 6 Semarang', 2020),
(7, 'Makassar', '2006-03-14', 'Jl. Pettarani No.9, Makassar', 'Islam', 1, 1, 'B', 'Gastritis', 'Rahmat Hidayat', 'Dewi Kartika', 'Nelayan', 'Guru', '081234567896', '081234567905', 'Jl. Pettarani No.9, Makassar', 'SMPN 7 Makassar', 2021),
(8, 'Denpasar', '2005-09-30', 'Jl. Sudirman No.12, Denpasar', 'Islam', 2, 3, 'O', NULL, 'Made Sujana', 'Ni Luh Ayu', 'Seniman', 'Ibu Rumah Tangga', '081234567897', '081234567906', 'Jl. Sudirman No.12, Denpasar', 'SMPN 8 Denpasar', 2020);


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

