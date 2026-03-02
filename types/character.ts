// Esto describe exactamente qué datos tiene el formulario
export interface CharacterForm {
  name: string;
  gender: "Hombre" | "Mujer";
  faction: string;
  race: string;
  devilFruit: string;
  haki: string;
  weapon: string;
  specialty: string;
  height: number;
  laugh: string;
  style: string;
}

// Esto describe el resultado que nos devuelve la IA
export interface CharacterResult {
  title: string;
  background: string;
  personality: string;
  power: string;
  dream: string;
  videoPrompt: string;
  berrys: number;
}
