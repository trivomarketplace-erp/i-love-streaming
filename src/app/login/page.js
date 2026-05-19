"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const router = useRouter();

  const [password, setPassword] = useState("");

  function handleLogin(e) {

    e.preventDefault();

    if (password === "123456") {

      localStorage.setItem("admin-auth", "true");

      router.push("/admin");

    } else {

      alert("Senha incorreta");

    }

  }

  return (

    <main className="min-h-screen bg-black flex items-center justify-center p-6">

      <div className="bg-zinc-900 w-full max-w-md rounded-3xl p-10">

        <h1 className="text-4xl font-black text-white mb-8">
          Login Admin
        </h1>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <input
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-800 text-white rounded-xl px-4 py-4 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-bold transition"
          >
            Entrar
          </button>

        </form>

      </div>

    </main>

  );

}
