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
      setForm(formData);
      setResult({ ...data.description, berrys: data.berrys });
      setImagePrompt(data.imagePrompt);
    } catch {
      setError("Error al generar el personaje. Inténtalo de nuevo.");
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
    <main className="min-h-screen bg-gray-950 flex items-center justify-center">
      {result && form ? (
        <CharacterResultView
          form={form}
          result={result}
          imagePrompt={imagePrompt}
          onReset={handleReset}
        />
      ) : (
        <CharacterFormComponent onGenerate={handleGenerate} loading={loading} />
      )}
      {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
    </main>
  );
}