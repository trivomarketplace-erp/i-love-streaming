import reviews from "@/data/reviews";
import MovieCard from "@/components/MovieCard";

export default function TopRatedPage() {

  const sortedReviews = [...reviews].sort(
    (a, b) => Number(b.rating) - Number(a.rating)
  );

  return (
    <main className="min-h-screen bg-black text-white px-10 py-20">

      <div className="mb-14">

        <span className="text-red-600 uppercase tracking-[0.3em] text-sm font-bold">
          Ranking
        </span>

        <h1 className="text-7xl font-black mt-4 mb-6">
          Top Rated
        </h1>

        <p className="text-zinc-400 text-xl max-w-3xl">
          Os reviews mais bem avaliados da plataforma.
        </p>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

        {sortedReviews.map((review) => (

          <MovieCard
            key={review.slug}
            review={review}
          />

        ))}

      </div>

    </main>
  );
}
