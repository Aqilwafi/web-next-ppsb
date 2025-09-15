import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

// helper format tanggal
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function MainMenu() {
  const [articles, setArticles] = useState([]);
  const [q, setQ] = useState("");
  const [genre, setGenre] = useState("all");
  const [sortBy, setSortBy] = useState("date_desc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("http://localhost:4000/api/artikel"); 
        if (!res.ok) throw new Error("Gagal fetch");
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error("Error fetch:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-white text-slate-900 ">
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
                  <time
                    className="text-xs text-slate-500"
                    dateTime={a.publishedAt}
                  >
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
                  <button className="rounded-xl border px-3 py-1.5 text-sm hover:bg-gray-50 active:bg-gray-100 cursor-pointer transition-colors duration-150">
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
