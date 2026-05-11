"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {

  const [reviews, setReviews] = useState([]);

  const [form, setForm] = useState({
    title: "",
    category: "",
    rating: "",
    image: "",
    trailer: "",
    description: "",
  });

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {

    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false });

      if (error) {
        console.log("ERRO SUPABASE:", error);
        alert(error.message);
        return;
      }

    setReviews(data);
  }

  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }

  async function handleSubmit(e) {

    e.preventDefault();

    if (
      !form.title ||
      !form.category ||
      !form.rating ||
      !form.image ||
      !form.trailer
    ) {
      alert("Preencha todos os campos.");
      return;
    }

    const newReview = {
      ...form,
      slug: form.title.toLowerCase().replaceAll(" ", "-"),
      year: "2026",
      type: "movie",
      content: form.description,
    };

    const { error } = await supabase
      .from("reviews")
      .insert([newReview]);

       if (error) {
      console.log("ERRO SUPABASE:", error);
      alert(error.message);
      return;
    }

    fetchReviews();

    setForm({
      title: "",
      category: "",
      rating: "",
      image: "",
      trailer: "",
      description: "",
    });

  }

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

        <div className="bg-zinc-900 rounded-3xl p-8 h-fit">

          <h1 className="text-3xl font-bold mb-8">
            Painel Admin
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="text"
              name="title"
              placeholder="Título"
              value={form.title}
              onChange={handleChange}
              className="w-full bg-zinc-800 rounded-xl px-4 py-4 outline-none"
            />

            <input
              type="text"
              name="category"
              placeholder="Categoria"
              value={form.category}
              onChange={handleChange}
              className="w-full bg-zinc-800 rounded-xl px-4 py-4 outline-none"
            />

            <input
              type="text"
              name="rating"
              placeholder="Nota"
              value={form.rating}
              onChange={handleChange}
              className="w-full bg-zinc-800 rounded-xl px-4 py-4 outline-none"
            />

            <input
              type="text"
              name="image"
              placeholder="URL da imagem"
              value={form.image}
              onChange={handleChange}
              className="w-full bg-zinc-800 rounded-xl px-4 py-4 outline-none"
            />

            <input
              type="text"
              name="trailer"
              placeholder="URL do trailer"
              value={form.trailer}
              onChange={handleChange}
              className="w-full bg-zinc-800 rounded-xl px-4 py-4 outline-none"
            />

            <textarea
              name="description"
              placeholder="Descrição"
              value={form.description}
              onChange={handleChange}
              className="w-full bg-zinc-800 rounded-xl px-4 py-4 outline-none min-h-[120px]"
            />

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 transition py-4 rounded-xl font-semibold"
            >
              Publicar Review
            </button>

          </form>

        </div>

        <div className="lg:col-span-2">

          <h2 className="text-3xl font-bold mb-8">
            Reviews Publicados
          </h2>

          <div className="space-y-4">

            {reviews.map((review) => (

              <div
                key={review.id}
                className="bg-zinc-900 rounded-2xl p-5 flex items-center gap-5"
              >

                <img
                  src={review.image}
                  alt={review.title}
                  className="w-24 h-32 object-cover rounded-xl"
                />

                <div>

                  <h3 className="text-2xl font-bold">
                    {review.title}
                  </h3>

                  <p className="text-zinc-400">
                    {review.category}
                  </p>

                  <span className="text-yellow-400 font-bold">
                    ★ {review.rating}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </main>
  );
}
