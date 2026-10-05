"use client";
import { useState } from "react";
import { CharacterForm as FormType, CharacterResult } from "@/types/character";
import CharacterFormComponent from "@/components/form/CharacterForm";
import CharacterResultView from "@/components/result/CharacterResult";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormType | null>(null);
  const [result, setResult] = useState<CharacterResult | null>(null);
  const [imagePrompt, setImagePrompt] = useState<string>("");

  const handleGenerate = async (formData: FormType) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate-character", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      // Si el servidor devolvió un error (500, 400, etc.), no seguimos
      if (!res.ok) {
        throw new Error(data.error || "Ocurrió un error al generar el personaje.");
      }

      // Validamos que description y berrys vengan en la respuesta
      if (!data.description) {
        throw new Error("La IA no devolvió la descripción del personaje.");
      }

      setForm(formData);
      setResult({ ...data.description, berrys: data.berrys ?? 0 });
      setImagePrompt(data.imagePrompt || "");
    } catch (err: any) {
      console.error("Error capturado:", err);
      setError(err?.message || "Error al generar el personaje. Inténtalo de nuevo.");
      // Limpiamos el resultado para asegurarnos de no desmontar la app con datos vacíos
      setResult(null);
      setForm(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm(null);
    setResult(null);
    setImagePrompt("");
    setError(null);
  };

  return (
    <main className="min-h-screen w-full flex flex-col justify-between bg-gradient-to-b from-blue-900 via-blue-950 to-black">
      <div className="w-full flex-1 flex flex-col items-center justify-center p-4">
        {result && form ? (
          <CharacterResultView
            form={form}
            result={result}
            imagePrompt={imagePrompt}
            onReset={handleReset}
          />
        ) : (
          <div className="w-full max-w-xl flex flex-col items-center">
            <CharacterFormComponent onGenerate={handleGenerate} loading={loading} />
            {error && (
              <div className="mt-4 p-3 rounded-lg bg-red-500/20 border border-red-500 text-red-200 text-sm text-center">
                {error}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full py-6 flex flex-col items-center gap-2 text-white/70">
        <p className="text-xs font-medium tracking-[0.3em] uppercase opacity-50">Creador</p>
        <div className="flex gap-6">
          <a
            href="https://linkedin.com/in/alexander-gavilanez-castro-037a8927b"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a
            href="https://github.com/xxcastro"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
        </div>
      </footer>
    </main>
  );
}
