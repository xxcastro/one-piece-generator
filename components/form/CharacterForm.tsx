"use client";
import { useState } from "react";
import { CharacterForm as FormType } from "@/types/character";

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
    
    return (
        <div>
        <p>Paso {step + 1}</p>
        </div>
    );
}