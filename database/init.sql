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
    no_telp_ibu VARCHAR(15),
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (username, password, email, lembaga, tingkatan, nama, jenis_kelamin, no_telp, no_telp_ibu)
VALUES
('user1', '$2b$10$hNNFSQoJ.btOnhJI45K63O9WOpyKQsgSIw/AMFty9nYOmK88NBfP2', 'user1@mail.com', 'MI', '1', 'Ahmad', 'Laki-laki', '081234567890', '081234567891'),
('user2', '$2b$10$bbywNkPGJ5k4bVM3CAzGou5pkpztjZpdITFqqA4VYh9Bc2dedsura', 'user2@mail.com', 'TK', '', 'Siti', 'Perempuan', '081234567892', '081234567893'),
('user3', '$2b$10$rGAOj/me619bFzlOwJI.HOnY2zZDfBnCx4ZqlZVz9kTx9.wbwDdw6', 'user3@mail.com', 'KB', '', 'Budi', 'Laki-laki', '081234567894', '081234567895'),
('user4', '$2b$10$lEVMDAzQdNt20mWBYdTH1.z.nhPioUT/yM7ijOvWWy7RdSVWwm3SG', 'user4@mail.com', 'MI', '2', 'Ali', 'Laki-laki', '081234567896', '081234567897'),
('user5', '$2b$10$VBeKI0CY0HpGSVFFjzmjneJgZTUJOYprum3q5SWaay/V8Tmik/E/i', 'user5@mail.com', 'TPA', '', 'Dewi', 'Perempuan', '081234567898', '081234567899'),
('user6', '$2b$10$wyWlDAeMwC8Mli1.Ce77XOVbls/15L/M74LL8T.7PoTWntXEjRjjC', 'user6@mail.com', 'MI', '3', 'Fajar', 'Laki-laki', '081234567900', '081234567901'),
('user7', '$2b$10$gvSYYqFKIfn0fKLUaDbDZezZoagolDch9W7sKXh3rVdQK.r9zLxGy', 'user7@mail.com', 'TK', '', 'Rina', 'Perempuan', '081234567902', '081234567903'),
('user8', '$2b$10$VV.MHOUPbvjCKEdFpDjd8.AXa.rFIGuuBfWtXUQr1R3kUVj7fhjK6', 'user8@mail.com', 'MI', '4', 'Hendra', 'Laki-laki', '081234567904', '081234567905');

-- Tabel master step (isi sekali saja oleh admin/dev)
CREATE TABLE registration_steps (
  id SERIAL PRIMARY KEY,
  step_number INT NOT NULL,
  label VARCHAR(100) NOT NULL,
  content TEXT
);

-- Isi data step awal
INSERT INTO registration_steps (step_number, label, content) VALUES
(1, 'Registrasi User', 'Form registrasi user telah diisi.'),
(2, 'Bayar Formulir', 'Informasi pembayaran formulir.'),
(3, 'Isi Biodata', 'Form biodata lengkap siswa.'),
(4, 'Ujian Masuk', 'Tes a, b, c, d.'),
(5, 'Surat Persetujuan', 'Silahkan setuju'),
(6, 'Validasi', 'Apakah valid'),
(7, 'Info Pengumuman', 'Pengumuman penerimaan periode.');

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

