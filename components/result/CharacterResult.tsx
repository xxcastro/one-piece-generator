"use client";
import { useState, useEffect } from "react";
import { CharacterForm, CharacterResult } from "@/types/character";
import { formatBerrys } from "@/lib/berry-calculator";

interface Props {
  form: CharacterForm;
  result: CharacterResult;
  imagePrompt: string;
  onReset: () => void;
}

export default function CharacterResultView({ form, result, imagePrompt, onReset }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const showPoster = form.faction !== "Marine";

  useEffect(() => {
  if (!imagePrompt) return;

  const fetchImage = async () => {
  try {
    const res = await fetch("/api/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imagePrompt }),
    });

    if (!res.ok) throw new Error("Fallo en la respuesta");

    const data = await res.json();
    setImageUrl(data.imageUrl);
    setImageLoaded(false);
  } catch (err) {
    console.error("Error generando imagen:", err);
  }
  };

    fetchImage();
  }, [imagePrompt]);


  const copyVideoPrompt = () => {
    navigator.clipboard.writeText(result.videoPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `${form.name}-one-piece.png`;
    link.click();
  };
  const shareOn = (platform: "twitter" | "reddit") => {
    const text = `¡Soy ${form.name} con una recompensa de ${formatBerrys(result.berrys)} Berrys en One Piece! 🏴‍☠️`;
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text + " #OnePiece")}`,
      reddit: `https://reddit.com/submit?title=${encodeURIComponent(text)}`,
    };
    window.open(urls[platform], "_blank");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 text-white">

      <div className="text-center mb-8">
        <h1 className="text-5xl font-black text-red-500 tracking-widest mb-2">
          {form.name.toUpperCase()}
        </h1>
        <p className="text-white/60 italic text-lg">"{result.title}"</p>
      </div>

      <div className={`grid gap-6 mb-8 ${showPoster ? "grid-cols-2" : "grid-cols-1 max-w-xs mx-auto"}`}>
        <div className="rounded-xl overflow-hidden border border-yellow-400/40 bg-gray-900 aspect-[2/3] relative">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={form.name}
              onLoad={() => setImageLoaded(true)}
              style={{ display: imageLoaded ? "block" : "none" }}
              className="w-full h-full object-cover"
            />
          )}
          {imageLoaded && (
            <button
              onClick={downloadImage}
              className="absolute bottom-2 right-2 px-3 py-1.5 rounded-lg bg-black/60 text-white-400 text-xs font-bold border border-red-400/40 hover:bg-black/80 transition-all"
            >
              ⬇ Descargar
            </button>
          )}
          
          {!imageLoaded && (
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 min-h-64">
              <div className="w-10 h-10 border-4 border-red-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-red-400 text-xs tracking-widest">GENERANDO IMAGEN...</p>
            </div>
          )}
        </div>

        {showPoster && (
          <div className="rounded-sm p-4 font-bold"
            style={{
              background: "linear-gradient(180deg, #D4A843, #C8952C)",
              border: "6px solid #8B5E0A",
            }}
          >
            <div className="text-center mb-2">
              <p className="text-[10px] tracking-[3px] text-[#5C3A0A]">— MARINA MUNDIAL —</p>
              <p className="text-3xl font-black text-[#1A0A00] tracking-widest">SE BUSCA</p>
              <p className="text-[9px] tracking-widest text-[#5C3A0A]">VIVO O MUERTO</p>
            </div>
            <div className="w-full aspect-[3/4] bg-[#8B7355] overflow-hidden mb-3 border-2 border-[#8B5E0A]">
              {imageLoaded && (
                <img src={imageUrl} alt={form.name} className="w-full h-full object-cover" />
              )}
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-[#1A0A00] tracking-widest">{form.name.toUpperCase()}</p>
              <p className="text-[9px] text-[#5C3A0A] italic mb-2">"{result.title}"</p>
              <div style={{ borderTop: "2px solid #8B5E0A" }} className="pt-2">
                <p className="text-[9px] tracking-widest text-[#5C3A0A]">RECOMPENSA</p>
                <p className="text-xl font-black text-[#1A0A00]">{formatBerrys(result.berrys)}</p>
                <p className="text-[9px] text-[#5C3A0A]">BERRYS ฿</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {[
          { label: "⚓ Origen", text: result.background },
          { label: "💀 Personalidad", text: result.personality },
          { label: "✨ Poderes", text: result.power },
          { label: "🏴‍☠️ Sueño", text: result.dream },
        ].map((card) => (
          <div key={card.label} className="rounded-xl p-4 bg-white/5 border border-red-400/20">
            <p className="text-red-500 text-xs font-bold tracking-widest mb-2">{card.label.toUpperCase()}</p>
            <p className="text-white/80 text-sm leading-relaxed">{card.text}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl p-4 bg-red-400/5 border border-yellow-400/20 flex flex-wrap gap-4 justify-center mb-6">
        {[
          ["Facción", form.faction],
          ["Raza", form.race],
          ["Estatura", `${form.height}m`],
          ["Fruta", form.devilFruit],
          ["Haki", form.haki],
          ["Arma", form.weapon],
          ["Rol", form.specialty],
          ["Risa", form.laugh],
        ].map(([k, v]) => (
          <div key={k} className="text-center min-w-[70px]">
            <p className="text-yellow-400/60 text-[9px] tracking-widest">{k.toUpperCase()}</p>
            <p className="text-white text-sm font-bold">{v}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl p-5 mb-6 border border-purple-400/30 bg-purple-400/5">
        <div className="flex justify-between items-center mb-3">
          <p className="text-purple-300 text-xs font-bold tracking-widest">🎬 PROMPT PARA VIDEO IA</p>
          <button onClick={copyVideoPrompt}
            className="px-3 py-1 rounded-lg text-purple-300 text-xs border border-purple-400/30 bg-purple-400/10">
            {copied ? "✓ Copiado" : "Copiar"}
          </button>
        </div>
        <p className="text-white/70 text-sm leading-relaxed">{result.videoPrompt}</p>
      </div>

      <div className="flex gap-3 justify-center mb-6 flex-wrap">
        <button onClick={() => shareOn("twitter")}
          className="px-5 py-2.5 rounded-lg border-2 border-sky-400 text-sky-400 text-sm font-bold bg-sky-400/10">
          𝕏 Twitter
        </button>
        <button onClick={() => shareOn("reddit")}
          className="px-5 py-2.5 rounded-lg border-2 border-orange-500 text-orange-500 text-sm font-bold bg-orange-500/10">
          Reddit
        </button>
        <a href="https://www.tiktok.com/" target="_blank"
          className="px-5 py-2.5 rounded-lg border-2 border-cyan-400 text-cyan-400 text-sm font-bold bg-cyan-400/10">
          TikTok
        </a>
      </div>

      <div className="text-center">
        <button onClick={onReset}
          className="px-10 py-3.5 rounded-xl bg-red-500 text-black font-black tracking-widest text-sm">
          CREAR NUEVO PERSONAJE
        </button>
      </div>
      
    </div>
  );
}