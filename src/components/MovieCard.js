import Link from "next/link";

export default function MovieCard({ review }) {

  return (

    <Link href={`/review/${review.slug}`}>

      <div className="group relative rounded-[30px] overflow-hidden bg-zinc-900 cursor-pointer transition-all duration-500 hover:scale-[1.03] hover:-translate-y-3 shadow-2xl">

        {/* IMAGE */}
        <div className="relative h-[500px] overflow-hidden">

          <img
            src={review.image}
            alt={review.title}
            className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
          />

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          {/* HOVER OVERLAY */}
          <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition duration-500" />

          {/* RATING */}
          <div className="absolute top-5 right-5 bg-yellow-400 text-black font-black px-4 py-2 rounded-2xl text-sm shadow-xl">
            ★ {review.rating}
          </div>

        </div>

        {/* CONTENT */}
        <div className="absolute bottom-0 left-0 w-full p-7">

          {/* CATEGORY */}
          <span className="text-red-500 text-xs font-bold uppercase tracking-[0.25em]">
            {review.category}
          </span>

          {/* TITLE */}
          <h3 className="text-3xl font-black mt-3 mb-4 leading-tight">
            {review.title}
          </h3>

          {/* DESCRIPTION */}
          <p className="text-zinc-300 text-sm leading-7 line-clamp-3 mb-6">
            {review.description}
          </p>

          {/* BUTTON */}
          <button className="w-full bg-white/10 backdrop-blur-md hover:bg-red-600 py-4 rounded-2xl font-bold transition duration-300">
            Ler Review
          </button>

        </div>

      </div>

    </Link>

  );
}