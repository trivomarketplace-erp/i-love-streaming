import reviews from "@/data/reviews";
import MovieCard from "@/components/MovieCard";

export default function SeriesPage() {

  const series = reviews.filter(
    (review) => review.type === "series"
  );

  return (

    <main className="min-h-screen bg-black text-white px-6 md:px-10 py-20">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-14">

          <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-semibold">
            Catálogo
          </span>

          <h1 className="text-5xl md:text-7xl font-black mt-4">
            Séries
          </h1>

          <p className="text-zinc-400 mt-6 text-lg max-w-2xl">
            Explore reviews completos das melhores séries da plataforma.
          </p>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

          {series.map((review) => (

            <MovieCard
              key={review.slug}
              review={review}
            />

          ))}

        </div>

      </div>

    </main>

  );
}