CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(100) UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamp DEFAULT NOW()
);


CREATE TABLE csb_profile (
    id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    lembaga VARCHAR(50),
    tingkatan VARCHAR(20),
    asal_sekolah VARCHAR(255),
    tahun_lulus INT,
    alamat_pendidikan_sebelumnya TEXT,
    npsn VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE biodata_siswa (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    profile_id UUID REFERENCES csb_profile(id) ON DELETE CASCADE,
    nama_lengkap VARCHAR(255) NOT NULL,
    nisn VARCHAR(20) UNIQUE,
    nik VARCHAR(20) UNIQUE,
    no_kk VARCHAR(20),
    jenis_kelamin VARCHAR(10) NOT NULL,
    tempat_lahir VARCHAR(100),
    tanggal_lahir DATE,
    agama VARCHAR(50) DEFAULT 'Islam',
    hobi TEXT,
    cita_cita TEXT,
    jumlah_saudara INT,
    anak_ke INT DEFAULT 1,
    golongan_darah VARCHAR(5),
    penyakit VARCHAR(255)
);

CREATE TABLE biodata_ortu (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    siswa_id BIGINT REFERENCES biodata_siswa(id) ON DELETE CASCADE,
    nama_ayah VARCHAR(100),
    nama_ibu VARCHAR(100),
    pekerjaan_ayah VARCHAR(100),
    pekerjaan_ibu VARCHAR(100),
    status_ayah VARCHAR(50),
    status_ibu VARCHAR(50),
    no_telp_ayah VARCHAR(20),
    no_telp_ibu VARCHAR(20),
    nik_ayah VARCHAR(20),
    nik_ibu VARCHAR(20),
    tempat_lahir_ayah VARCHAR(100),
    tempat_lahir_ibu VARCHAR(100),
    tanggal_lahir_ayah DATE,
    tanggal_lahir_ibu DATE,
    penghasilan_ayah VARCHAR(100),
    penghasilan_ibu VARCHAR(100),
    pendidikan_ayah VARCHAR(100),
    pendidikan_ibu VARCHAR(100),
    alamat_ortu TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE biodata_wali (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    siswa_id BIGINT REFERENCES biodata_siswa(id) ON DELETE CASCADE,
    nama_wali VARCHAR(100),
    nik_wali VARCHAR(20),
    tempat_lahir_wali VARCHAR(100),
    tanggal_lahir_wali DATE,
    pendidikan_wali VARCHAR(100),
    pekerjaan_wali VARCHAR(100),
    penghasilan_wali VARCHAR(100),
    no_telp_wali VARCHAR(20),
    alamat_wali TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tempat_tinggal (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    siswa_id BIGINT REFERENCES biodata_siswa(id) ON DELETE CASCADE,
    status_rumah VARCHAR(50),
    tinggal_bersama VARCHAR(100),
    alamat TEXT
);

CREATE TABLE dokumen (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    siswa_id BIGINT NOT NULL REFERENCES biodata_siswa(id),
    nama_file TEXT NOT NULL,
    tipe_file TEXT NOT NULL,
    url TEXT NOT NULL,
    uploaded_at TIMESTAMP DEFAULT NOW()
);

-- Tabel master step (isi sekali saja oleh admin/dev)
CREATE TABLE registration_steps (
    step_number_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    label VARCHAR(100) UNIQUE NOT NULL
);

-- Tabel status step tiap user
CREATE TABLE user_step_status (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    user_id UUID REFERENCES csb_profile(id) ON DELETE CASCADE,
    step_number_id BIGINT REFERENCES registration_steps(step_number_id) ON DELETE CASCADE,
    status_step BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, step_number_id)
);

-- Tabel dokumen (untuk data pendaftar)


-- Isi data step awal
INSERT INTO registration_steps (label) VALUES
('Registrasi User'),
('Bayar Formulir'),
('Isi Biodata'),
('Ujian Masuk'),
('Surat Persetujuan'),
('Validasi'),
('Info Pengumuman');


INSERT INTO user_step_status (user_id, step_number_id, status_step) VALUES
('98eec5d4-34cb-456d-aaad-9821dfa54959', 1, true);


CREATE TABLE test_profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nama_lengkap VARCHAR(100),
  lembaga VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE test_siswa (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  profile_id uuid REFERENCES test_profile(id) ON DELETE CASCADE,
  nama_lengkap VARCHAR(100),
  lembaga VARCHAR(100),
  nisn VARCHAR(20),
  tempat_lahir VARCHAR(100)
);

CREATE TABLE test_ortu (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  siswa_id uuid REFERENCES test_profile(id) ON DELETE CASCADE,
  nama_lengkap VARCHAR(100),
  lembaga VARCHAR(100),
  nisn VARCHAR(20),
  tempat_lahir VARCHAR(100)
);