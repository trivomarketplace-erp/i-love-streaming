import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ReviewPage({ params }) {

  const { slug } = params;

  const { data: review, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !review) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="relative h-[85vh] flex items-end pt-24 overflow-hidden">

        {/* IMAGE */}
        <img
          src={review.image}
          alt={review.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-5xl px-8 pb-20">

          {/* BACK BUTTON */}
          <Link href="/">
            <button className="mb-8 bg-white/10 hover:bg-white/20 backdrop-blur-md px-5 py-3 rounded-2xl transition">
              ← Voltar
            </button>
          </Link>

          {/* CATEGORY */}
          <span className="text-red-500 uppercase tracking-[0.3em] text-sm font-bold">
            {review.category}
          </span>

          {/* TITLE */}
          <h1 className="text-7xl font-black mt-5 mb-6 leading-tight">
            {review.title}
          </h1>

          {/* META */}
          <div className="flex flex-wrap gap-6 text-zinc-300 mb-8 text-lg">

            <span>{review.year}</span>

            <span className="text-yellow-400 font-bold">
              ★ {review.rating}/10
            </span>

          </div>

          {/* DESCRIPTION */}
          <p className="max-w-3xl text-xl text-zinc-200 leading-9">
            {review.description}
          </p>

        </div>

      </section>

      {/* CONTENT */}
      <section className="max-w-5xl mx-auto px-8 py-24">

        <div className="flex items-center gap-4 mb-12">

          <div className="w-2 h-10 bg-red-600 rounded-full" />

          <h2 className="text-5xl font-black">
            Review Completo
          </h2>

        </div>

        <div className="space-y-10 text-zinc-300 text-xl leading-[2.2rem]">

          {review.content
            ?.split("\n")
            .filter((paragraph) => paragraph.trim() !== "")
            .map((paragraph, index) => (

              <p key={index}>
                {paragraph}
              </p>

          ))}

        </div>

      </section>

    </main>
  );
}
