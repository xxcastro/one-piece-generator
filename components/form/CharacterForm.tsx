"use client";
import { useState } from "react";
import { CharacterForm as FormType } from "@/types/character";
import { FACTIONS, RACES, GENDERS, DEVIL_FRUITS, HAKIS, WEAPONS, SPECIALTIES, STYLES } from "@/lib/constants";
import FieldLabel from "@/components/ui/FieldLabel";
import SelectGrid from "@/components/ui/SelectGrid";
import StepIndicator from "@/components/ui/StepIndicator";

const INITIAL: FormType = {
  name: "", gender: "Hombre", faction: "", race: "",
  devilFruit: "Ninguna", haki: "Ninguno", weapon: "",
  specialty: "", height: 1.7, laugh: "", style: "Animación One Piece",
};

interface Props {
  onGenerate: (form: FormType) => void;
  loading: boolean;
}

export default function CharacterForm({ onGenerate, loading }: Props) {
    const [step, setStep] = useState(0);
    const [form, setForm] = useState<FormType>(INITIAL);
    const set = <K extends keyof FormType>(key: K, val: FormType[K]) => {
    setForm((f) => ({ ...f, [key]: val }));
    };
    const steps = [
                      {
                        title: "Identidad",
                        subtitle: "¿Quién eres en el Gran Mar?",
                        content:(
                          <div className="flex flex-col gap-6">
                            <div>
                              <FieldLabel>Nombre del Personaje</FieldLabel>
                              <input
                                value={form.name}
                                onChange={(e) => set("name", e.target.value)}
                                placeholder="Escribe tu nombre..."
                                className="w-full px-4 py-3 rounded-lg bg-white/5 text-white text-sm outline-none border-2 border-yellow-400/30 focus:border-yellow-400 placeholder:text-white/30"
                              />
                            </div>
                            <div>
                              <FieldLabel>Género</FieldLabel>
                              <SelectGrid options={GENDERS} value={form.gender} onChange={(v) => set("gender", v as FormType["gender"])} />
                            </div>
                            <div>
                              <FieldLabel>Facción</FieldLabel>
                              <SelectGrid options={FACTIONS} value={form.faction} onChange={(v) => set("faction", v)} />
                            </div>
                            <div>
                              <FieldLabel>Raza</FieldLabel>
                              <SelectGrid options={RACES} value={form.race} onChange={(v) => set("race", v)} />
                            </div>
                          </div>),
                      },
                      {
                        title: "Poderes",
                        subtitle: "¿Qué te hace temible?",
                        content: (
                          <div className="flex flex-col gap-6">
                            <div>
                              <FieldLabel>Fruta del Diablo</FieldLabel>
                              <SelectGrid options={DEVIL_FRUITS} value={form.devilFruit} onChange={(v) => set("devilFruit", v as FormType["devilFruit"])} />
                            </div>
                            <div>
                              <FieldLabel>Haki</FieldLabel>
                              <SelectGrid options={HAKIS} value={form.haki} onChange={(v) => set("haki", v as FormType["haki"])} />
                            </div>
                            <div>
                              <FieldLabel>Arma / Estilo de combate</FieldLabel>
                              <SelectGrid options={WEAPONS} value={form.weapon} onChange={(v) => set("weapon", v)} />
                            </div>
                          </div>),
                      },
                      {
                        title: "Físico",
                        subtitle: "¿Cómo te ven los demás?",
                        content: (
                          <div className="flex flex-col gap-6">
                            <div>
                              <FieldLabel>Estatura</FieldLabel>
                              <div className="flex justify-between mb-2">
                                <span className="text-white/50 text-xs">0.5m</span>
                                <span className="text-yellow-400 text-xl font-bold">{form.height.toFixed(1)}m</span>
                                <span className="text-white/50 text-xs">30m</span>
                              </div>
                              <input
                                type="range" min={0.5} max={30} step={0.1}
                                value={form.height}
                                onChange={(e) => set("height", parseFloat(e.target.value))}
                                className="w-full accent-yellow-400"
                              />
                            </div>
                            <div>
                              <FieldLabel>Especialidad en la Tripulación</FieldLabel>
                              <SelectGrid options={SPECIALTIES} value={form.specialty} onChange={(v) => set("specialty", v)} />
                            </div>
                            <div>
                              <FieldLabel>Tu Risa Característica</FieldLabel>
                              <input
                                value={form.laugh}
                                onChange={(e) => set("laugh", e.target.value)}
                                placeholder="Ej: Shishishi, Zehahaha..."
                                className="w-full px-4 py-3 rounded-lg bg-white/5 text-white text-sm outline-none border-2 border-yellow-400/30 focus:border-yellow-400 placeholder:text-white/30"
                              />
                            </div>
                          </div>),
                      },
                      {
                        title: "Estilo Visual",
                        subtitle: "¿Cómo quieres que te recuerden?",
                        content: (
                          <div className="flex flex-col gap-4">
                            {STYLES.map((s) => (
                              <button
                                key={s}
                                onClick={() => set("style", s as FormType["style"])}
                                className={`p-5 rounded-xl text-left border-2 transition-all ${
                                  form.style === s
                                    ? "border-yellow-400 bg-yellow-400/15"
                                    : "border-white/15 bg-white/3 hover:border-yellow-400/40"
                                }`}
                              >
                                <div className={`font-bold mb-1 ${form.style === s ? "text-yellow-400" : "text-white"}`}>{s}</div>
                                <div className="text-xs text-white/50">
                                  {s === "Animación One Piece"
                                    ? "Estilo manga de Eiichiro Oda, colores vibrantes"
                                    : "Ilustración fotorrealista con iluminación cinematográfica"}
                                </div>
                              </button>
                            ))}
                          </div>
                        ),
                      },
                  ];
    return (
        <div className="w-full max-w-lg mx-auto px-4 py-6">
          {/* Título */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-yellow-400 tracking-widest">ONE PIECE</h1>
            <p className="text-white/40 text-xs tracking-widest mt-1">GENERADOR DE PERSONAJES</p>
          </div>

          {/* Card */}
          <div className="rounded-2xl p-8 bg-white/5 border border-yellow-400/20">
            
            <StepIndicator current={step} total={steps.length} />

            {/* Título del paso */}
            <div className="mb-7">
              <h2 className="text-yellow-400 font-black text-xl tracking-widest mb-1">
                {steps[step].title.toUpperCase()}
              </h2>
              <p className="text-white/40 text-sm">{steps[step].subtitle}</p>
            </div>

            {/* Contenido del paso actual */}
            {steps[step].content}

            {/* Botones de navegación */}
            <div className="flex gap-3 mt-8">
              {step > 0 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="flex-1 py-3 rounded-xl border-2 border-white/15 text-white/60 text-xs font-bold tracking-widest hover:border-white/30"
                >
                  ← ATRÁS
                </button>
              )}
              {step < steps.length - 1 ? (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  className="flex-[2] py-3 rounded-xl bg-yellow-400 text-black text-xs font-black tracking-widest"
                >
                  SIGUIENTE →
                </button>
              ) : (
                <button
                  onClick={() => onGenerate(form)}
                  disabled={loading}
                  className="flex-[2] py-3 rounded-xl bg-yellow-400 text-black text-xs font-black tracking-widest disabled:opacity-50"
                >
                  {loading ? "GENERANDO..." : "⚓ FORJAR PERSONAJE"}
                </button>
              )}
            </div>
          </div>
        </div>
      );
}