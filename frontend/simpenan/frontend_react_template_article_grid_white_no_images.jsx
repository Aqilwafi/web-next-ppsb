import { useMemo } from "react";

// Dummy seed data — replace with your API data later
const seedArticles = [
  {
    id: 1,
    title: "Alasan yang Tak Terucapkan",
    genre: "Fiksi",
    author: "Nadia P.",
    publishedAt: "2025-06-01T08:30:00Z",
    synopsis:
      "Alysya dan gengnya menyelidiki misteri pengunduran diri beruntun di sekolah mereka.",
  },
  {
    id: 2,
    title: "Membaca Kota dari Jendela Kereta",
    genre: "Esai",
    author: "Raka S.",
    publishedAt: "2025-05-20T12:00:00Z",
    synopsis:
      "Catatan pendek tentang ritme kota, orang-orangnya, dan fragmen percakapan di jalur lintas.",
  },
  {
    id: 3,
    title: "Resep Pagi yang Pelan",
    genre: "Nonfiksi",
    author: "Laras A.",
    publishedAt: "2025-04-18T07:15:00Z",
    synopsis:
      "Eksperimen kebiasaan kecil untuk memulai hari tanpa terburu-buru dan tetap produktif.",
  },
  {
    id: 4,
    title: "Senandika Hujan di Atap Seng",
    genre: "Puisi",
    author: "Dimas R.",
    publishedAt: "2025-03-02T19:40:00Z",
    synopsis:
      "Barisan bait pendek tentang kenangan masa kecil dan suara hujan yang menua.",
  },
  {
    id: 5,
    title: "Catatan Penjaga Perpustakaan Malam",
    genre: "Fiksi",
    author: "Ayu K.",
    publishedAt: "2025-02-11T22:05:00Z",
    synopsis:
      "Ada buku yang hanya muncul selepas tengah malam—dan pembacanya pun begitu.",
  },
  {
    id: 6,
    title: "Menjelang Senja di Pelabuhan",
    genre: "Cerpen",
    author: "Hafidz M.",
    publishedAt: "2025-01-29T16:20:00Z",
    synopsis:
      "Pertemuan singkat dua orang asing yang sama-sama menunda pulang.",
  },
  {
    id: 7,
    title: "Di Antara Kopi dan Keyboard",
    genre: "Esai",
    author: "Fina R.",
    publishedAt: "2024-12-10T09:00:00Z",
    synopsis:
      "Tentang disiplin menulis harian, kelelahan kreatif, dan menerima draf yang berantakan.",
  },
  {
    id: 8,
    title: "Jalan Pulang Paling Sunyi",
    genre: "Cerpen",
    author: "Yoga A.",
    publishedAt: "2024-11-22T21:10:00Z",
    synopsis:
      "Seseorang mencari alamat yang tak lagi ada, tapi menemukan dirinya sendiri.",
  },
  {
    id: 9,
    title: "Tiga Surat yang Tak Pernah Terkirim",
    genre: "Fiksi",
    author: "Mira L.",
    publishedAt: "2024-10-05T14:35:00Z",
    synopsis:
      "Sebuah arsip kecil tentang keberanian yang datang terlambat.",
  },
  {
    id: 10,
    title: "Sains dari Dapur",
    genre: "Nonfiksi",
    author: "Reno P.",
    publishedAt: "2024-09-17T06:50:00Z",
    synopsis:
      "Molekul, panas, dan kenapa telur orak-arik bisa jadi metafora karier.",
  },
];

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function ArticleGridTemplate() {
  const articles = useMemo(() => seedArticles, []);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight">Artikel</h1>
          <div className="flex items-center gap-2">
            <input
              type="search"
              placeholder="Cari judul, genre, author..."
              className="w-64 max-w-[60vw] rounded-2xl border px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-200"
              onChange={() => {}}
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.slice(0, 10).map((a) => (
            <article
              key={a.id}
              className="group rounded-2xl border bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs uppercase tracking-wide">
                  {a.genre}
                </span>
                <time className="text-xs text-gray-500">{formatDate(a.publishedAt)}</time>
              </div>
              <h2 className="text-lg font-semibold leading-snug mb-1 line-clamp-2">
                {a.title}
              </h2>
              <p className="text-sm text-gray-500 mb-3">by {a.author}</p>
              <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                {a.synopsis}
              </p>
              <div className="mt-4 flex items-center justify-end">
                <button className="rounded-xl border px-3 py-1.5 text-sm hover:bg-gray-50 active:bg-gray-100">
                  Baca
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-4 py-10 text-center text-xs text-gray-400">
        Template putih • 10 grid artikel • tanpa gambar/logo
      </footer>
    </div>
  );
}
