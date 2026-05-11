"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import reviews from "../data/reviews";
import MovieCard from "@/components/MovieCard";

export default function Home() {

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [heroIndex, setHeroIndex] = useState(0);
  const [showTrailer, setShowTrailer] = useState(false);
 useEffect(() => {

  if (showTrailer) return;

  const interval = setInterval(() => {

    setHeroIndex((prev) =>
      prev === reviews.length - 1 ? 0 : prev + 1
    );

  }, 5000);

  return () => clearInterval(interval);

}, [showTrailer]);

  const featuredReview = reviews[heroIndex];

  const topRated = [...reviews]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  const filteredReviews = reviews.filter((review) => {

    const matchesSearch =
      review.title.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "Todos" ||
      review.category === selectedCategory;

    return matchesSearch && matchesCategory;

  });

  return (
    <main className="bg-black text-white min-h-screen">

      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-zinc-900">

  <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">

    {/* LOGO */}
    <div>

      <h1 className="text-2xl md:text-3xl font-black tracking-tight text-red-600">
        I Love Streaming
      </h1>

      <p className="text-zinc-500 text-xs md:text-sm">
        Reviews de filmes e séries
      </p>

    </div>

    {/* MENU DESKTOP */}
  <nav className="flex gap-6 text-sm font-medium text-zinc-300">

  <Link
    href="/"
    className="hover:text-white transition"
  >
    Início
  </Link>

  <Link
    href="/movies"
    className="hover:text-white transition"
  >
    Filmes
  </Link>

  <Link
    href="/series"
    className="hover:text-white transition"
  >
    Séries
  </Link>

  <Link
    href="/top-rated"
    className="hover:text-white transition"
  >
    Rankings
  </Link>

  <Link
    href="/latest"
    className="hover:text-white transition"
  >
    Lançamentos
  </Link>

</nav>

    {/* MENU MOBILE */}
    <button className="md:hidden bg-zinc-900 px-4 py-2 rounded-xl">

      <span className="text-white text-xl">
        ☰
      </span>

    </button>

  </div>

</header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center px-6 md:px-10">

       <div className="absolute inset-0">
        
          <img
            src={featuredReview.image}
            alt={featuredReview.title}
            className="w-full h-full object-cover opacity-40 transition-all duration-1000 scale-105"
          />
        
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-black/20" />
        
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        
        </div>

        <div className="relative z-10 max-w-3xl">

          <span className="bg-red-600 px-4 py-1 rounded-full text-sm font-semibold">
            NOVO REVIEW
          </span>

          <h2 className="text-4xl md:text-7xl font-bold mt-6 mb-6 leading-tight">
            {featuredReview.title}  
          </h2>

          <p className="text-xl text-zinc-300 mb-8">
            {featuredReview.description}
          </p>

          <div className="flex items-center gap-4 mb-8">

          <span className="text-yellow-400 font-bold text-2xl">
            ★ {featuredReview.rating}/10
          </span>

          <span className="text-zinc-400">
            {featuredReview.category}
          </span>

        </div>

          <div className="flex flex-col sm:flex-row gap-4">

            <button className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-semibold transition">
              Explorar Reviews
            </button>

            <button className="bg-zinc-800 hover:bg-zinc-700 px-8 py-4 rounded-xl font-semibold transition">
              Últimos Lançamentos
            </button>

            <button
              onClick={() => setShowTrailer(true)}
              className="bg-white/10 backdrop-blur-md hover:bg-white/20 px-8 py-4 rounded-xl font-semibold transition"
            >
              ▶ Assistir Trailer
            </button>

          </div>

        </div>

      </section>
      {/* SEARCH */}
        <section className="px-6 md:px-10 pt-10">

          <div className="max-w-2xl mx-auto">

            <input
              type="text"
              placeholder="Buscar filmes ou séries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl px-6 py-5 text-white outline-none focus:border-red-600 transition"
            />

          </div>

</section>
      {/* TRENDING */}
      <section className="px-6 md:px-10 py-20">

        <div className="flex items-center justify-between mb-10">

          <h2 className="text-4xl font-bold">
            Trending Agora
          </h2>

          <Link
            href="/top-rated"
            className="text-zinc-400 hover:text-white transition"
          >
            Ver todos
        </Link>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredReviews.map ((review) => (
            <MovieCard
              key={review.slug}
              review={review}
            />
          ))}  

        </div> 

      </section>
      {/* TOP RATED */}
        <section className="px-6 md:px-10 pb-20">

          <div className="flex items-center justify-between mb-10">

            <h2 className="text-4xl font-bold">
              Top Rated
            </h2>

            <span className="text-zinc-500">
              Os melhores avaliados
            </span>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            {topRated.map((review) => (
              <MovieCard
                key={review.slug}
                review={review}
              />
            ))}

          </div>

        </section>

      {/* CATEGORIAS */}
      <section className="px-6 md:px-10 pb-20">

        <h2 className="text-4xl font-bold mb-10">
          Categorias
        </h2>

        <div className="flex flex-wrap gap-4">

          {[
            "Todos",
            "Terror",
            "Ficção Científica",
            "Drama",
            "Netflix",
            "HBO",
            "Ação",
            "Suspense",
            "Animes"
          ].map((category) => (

            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-4 rounded-xl transition font-medium

                ${
      selectedCategory === category
        ? "bg-red-600 text-white"
        : "bg-zinc-900 hover:bg-red-600"
    }
  `}
>
              {category}
            </button>

          ))}

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800 py-10 px-10 text-zinc-500">

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6">

          <div>
            <h3 className="text-white text-xl font-bold mb-2">
              I Love Streaming
            </h3>

            <p>
              Reviews profissionais de filmes e séries.
            </p>
          </div>

          <div className="flex gap-6">
            <a href="#" className="hover:text-white">
              Instagram
            </a>

            <a href="#" className="hover:text-white">
              YouTube
            </a>

            <a href="#" className="hover:text-white">
              TikTok
            </a>
          </div>

        </div>

            </footer>
          {showTrailer && (
          
            <div className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
          
              <div className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden">
          
                <button
                  onClick={() => setShowTrailer(false)}
                  className="absolute top-4 right-4 z-50 bg-red-600 hover:bg-red-700 w-10 h-10 rounded-full text-white font-bold"
                >
                  ✕
                </button>
          
                <iframe
                  src={featuredReview.trailer}
                  title={featuredReview.title}
                  className="w-full h-full"
                  allowFullScreen
                />
          
              </div>
          
            </div>
          
)}
        
    </main>
  );
}
