// Vite + React FE Template – Article Grid (Dominant White, No Images)
// -----------------------------------------------------------------
// How to use:
// 1) Create a Vite React app: `npm create vite@latest my-app -- --template react`
// 2) Install deps (optional but recommended here): `npm i framer-motion`
// 3) Replace `src/App.jsx` with this file's content.
// 4) Start dev server: `npm run dev`
//
// Notes:
// - Dominant white UI, no images/logos.
// - Shows a 10-card grid of articles: title, genre, author, published time, short synopsis.
// - Includes quick search (title/author), genre filter, and sort (date/title).
// - Ready to connect to a Go backend via `/api/articles` (see `loadFromBackend` comment).

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

// -----------------------------
// Types & Mock Data
// -----------------------------
/** @typedef {{ id:number; title:string; genre:string; author:string; publishedAt:string; synopsis:string }} Article */

const mockArticles /** @type {Article[]} */ = [
  {
    id: 1,
    title: "Understanding Goroutines",
    genre: "Tech",
    author: "Aulia Rahman",
    publishedAt: "2025-08-10T09:00:00+07:00",
    synopsis: "Pengantar ringan tentang concurrency di Go dan kapan sebaiknya digunakan.",
  },
  {
    id: 2,
    title: "Planning a Minimalist UI",
    genre: "Design",
    author: "Maya Putri",
    publishedAt: "2025-08-09T14:15:00+07:00",
    synopsis: "Prinsip membuat antarmuka putih yang rapi, fokus pada konten dan tipografi.",
  },
  {
    id: 3,
    title: "Vite: Fast Frontend Tooling",
    genre: "Tech",
    author: "Bagus Saputra",
    publishedAt: "2025-08-08T08:30:00+07:00",
    synopsis: "Mengapa Vite cocok untuk proyek React modern dan cara memaksimalkan HMR.",
  },
  {
    id: 4,
    title: "Go + Postgres Migrations",
    genre: "Tech",
    author: "Dewi Kartika",
    publishedAt: "2025-08-07T11:00:00+07:00",
    synopsis: "Menyusun migrasi database yang rapi untuk backend Go dengan contoh nyata.",
  },
  {
    id: 5,
    title: "Writing Crisp Synopses",
    genre: "Writing",
    author: "Niko Arif",
    publishedAt: "2025-08-06T16:40:00+07:00",
    synopsis: "Cara merangkum artikel jadi 1–2 kalimat padat tanpa kehilangan makna.",
  },
  {
    id: 6,
    title: "State Management: Simple First",
    genre: "Tech",
    author: "Rina Oktaviani",
    publishedAt: "2025-08-05T10:05:00+07:00",
    synopsis: "Mulai dari useState & context, baru naik ke toolkit jika kompleksitas meningkat.",
  },
  {
    id: 7,
    title: "Design Tokens 101",
    genre: "Design",
    author: "Yuda Pratama",
    publishedAt: "2025-08-04T13:25:00+07:00",
    synopsis: "Membuat skala spacing, radius, dan typography yang konsisten di proyek FE.",
  },
  {
    id: 8,
    title: "Effective API Error Handling",
    genre: "Tech",
    author: "Sari Anggraini",
    publishedAt: "2025-08-03T09:50:00+07:00",
    synopsis: "Strategi menampilkan error yang ramah pengguna tanpa mengorbankan detail debug.",
  },
  {
    id: 9,
    title: "Editorial Calendar Basics",
    genre: "Writing",
    author: "Andi Mahendra",
    publishedAt: "2025-08-02T17:20:00+07:00",
    synopsis: "Menjadwalkan ide dan rilis artikel agar konsisten tiap minggu.",
  },
  {
    id: 10,
    title: "Microcopy that Guides",
    genre: "Writing",
    author: "Laras Widya",
    publishedAt: "2025-08-01T15:00:00+07:00",
    synopsis: "Contoh microcopy kecil yang membantu user mengambil keputusan dengan cepat.",
  },
];

// -----------------------------
// Utilities
// -----------------------------
function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString("id-ID", {
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

// -----------------------------
// Main App
// -----------------------------
export default function App() {
  const [articles, setArticles] = useState(mockArticles);
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState("all");
  const [sortBy, setSortBy] = useState("date_desc");

  
   async function loadFromBackend() {
      const res = await fetch("/api/articles");
      if (!res.ok) throw new Error("Failed to load articles");
        /** @type {Article[]} */
      const data = await res.json();
      setArticles(data);
      }

      useEffect(() => { loadFromBackend(); }, []);
        const genres = useMemo(() => {
          const s = new Set(articles.map((a) => a.genre));
          return ["all", ...Array.from(s)];
        }, [articles]);

        const filtered = useMemo(() => {
          let list = [...articles];

    if (q.trim()) {
      const term = q.trim().toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(term) ||
          a.author.toLowerCase().includes(term)
      );
    }

    if (genre !== "all") {
      list = list.filter((a) => a.genre === genre);
    }

    switch (sortBy) {
      case "title_asc":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title_desc":
        list.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "date_asc":
        list.sort(
          (a, b) => new Date(a.publishedAt) - new Date(b.publishedAt)
        );
        break;
      case "date_desc":
      default:
        list.sort(
          (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
        );
    }

    return list;
  }, [articles, q, genre, sortBy]);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-2xl font-semibold tracking-tight">Artikel</h1>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari judul/author..."
                className="w-full rounded-2xl border border-slate-300 px-4 py-2 outline-none placeholder:text-slate-400 focus:border-slate-400 sm:w-64"
              />
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="rounded-2xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-400"
              >
                {genres.map((g) => (
                  <option key={g} value={g}>
                    {g === "all" ? "Semua Genre" : g}
                  </option>
                ))}
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-2xl border border-slate-300 px-3 py-2 outline-none focus:border-slate-400"
              >
                <option value="date_desc">Terbaru</option>
                <option value="date_asc">Terlama</option>
                <option value="title_asc">Judul A–Z</option>
                <option value="title_desc">Judul Z–A</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Grid */}
      <main className="mx-auto max-w-6xl px-4 py-6">
        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-slate-200 p-6 text-center text-slate-500">
            Tidak ada artikel yang cocok.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.slice(0, 10).map((a) => (
              <motion.article
                key={a.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md"
              >
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="inline-flex rounded-full border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {a.genre}
                  </span>
                  <time className="text-xs text-slate-500" dateTime={a.publishedAt}>
                    {formatDate(a.publishedAt)}
                  </time>
                </div>
                <h2 className="mb-1 line-clamp-2 text-lg font-semibold leading-snug">
                  {a.title}
                </h2>
                <p className="mb-3 text-sm text-slate-500">oleh {a.author}</p>
                <p className="line-clamp-3 text-sm leading-relaxed text-slate-700">
                  {a.synopsis}
                </p>
                <div className="mt-4 flex items-center justify-end">
                <button className="rounded-xl border px-3 py-1.5 text-sm hover:bg-gray-50 active:bg-gray-100 cursor-pointer">
                  Baca
                </button>
              </div>
              </motion.article>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-4 pb-10 pt-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Dummy Site. Tanpa gambar/logo.
      </footer>
    </div>
  );
}
