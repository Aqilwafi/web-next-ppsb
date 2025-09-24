CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    lembaga_a VARCHAR(50), -- dari dropdown A
    lembaga_b VARCHAR(50), -- dari dropdown B
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO users (username, email, phone, password, lembaga_a, lembaga_b)
VALUES 
('user1', 'user1@example.com', '081234567890', 'password123', 'MI', 'Option1'),
('user2', 'user2@example.com', '081234567891', 'password456', 'TK', 'Tidak perlu diisi'),
('user3', 'user3@example.com', '081234567892', 'password789', 'KB', 'Tidak perlu diisi');
