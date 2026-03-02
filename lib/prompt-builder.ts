import { CharacterForm } from "@/types/character";


const STYLE_MAP: Record<string, string> = {
  "Animación One Piece": "Eiichiro Oda One Piece anime art style, manga illustration, vibrant colors",
  "Realista": "hyper realistic, cinematic lighting, detailed portrait, photorealistic",
};

const RACE_MAP: Record<string, string> = {
  "Gyojin": "fish-man hybrid with fins and scales",
  "Gigante": "enormous colossal giant human",
  "Tribu Mink": "anthropomorphic animal warrior with fur",
  "Habitante del Cielo": "angel-like person with large white wings",
  "Humano": "human",
};

const FACTION_MAP: Record<string, string> = {
  "Pirata": "pirate outfit, jolly roger symbol, dramatic cape",
  "Marine": "white naval uniform with JUSTICE kanji on the back",
  "Cazarrecompensas": "rugged bounty hunter mercenary gear",
  "Revolucionario": "revolutionary army uniform with red accents",
  "Agente CP9/CP0": "black suit, government assassin, white mask",
  "Civil": "casual civilian clothes",
};

const WEAPON_MAP: Record<string, string> = {
  "Espadachín": "holding katana swords with sharp blade aura",
  "Tirador": "holding flintlock pistol, gunslinger stance",
  "Físico": "martial arts combat stance, powerful fists",
  "Tecnología": "advanced futuristic gadgets and devices",
  "Cyborg": "cybernetic mechanical arms with steel and circuits",
};

export function buildImagePrompt(character: CharacterForm): string {
  const style = STYLE_MAP[character.style] ?? STYLE_MAP["Animación One Piece"];
  const race = RACE_MAP[character.race] ?? "human";
  const faction = FACTION_MAP[character.faction] ?? "casual clothes";
  const weapon = WEAPON_MAP[character.weapon] ?? "";
  const gender = character.gender === "Hombre" ? "male" : "female";
  const height = character.height > 10 ? "enormous towering" : character.height > 3 ? "tall" : "average height";
  const fruit = character.devilFruit !== "Ninguna" ? `${character.devilFruit} devil fruit glowing power aura` : "";
  const haki = character.haki !== "Ninguno" ? "black lightning Haki energy surrounding body" : "";

  return [
    style,
    `${gender} character`,
    race,
    height,
    faction,
    weapon,
    fruit,
    haki,
    "powerful dramatic pose",
    "ocean background",
    "high quality detailed illustration",
  ]
    .filter(Boolean)
    .join(", ");
}

export function buildDescriptionPrompt(character: CharacterForm): string {
  return `Eres un narrador épico del universo de One Piece. Crea una descripción para este personaje.

    Nombre: ${character.name}
    Género: ${character.gender}
    Facción: ${character.faction}
    Raza: ${character.race}
    Estatura: ${character.height}m
    Fruta del Diablo: ${character.devilFruit}
    Haki: ${character.haki}
    Arma: ${character.weapon}
    Especialidad: ${character.specialty}
    Risa: "${character.laugh}"

    Responde ÚNICAMENTE con este JSON sin markdown ni texto extra:
    {
    "title": "Epíteto del personaje, ejemplo: El Rey de los Mares",
    "background": "Historia de origen en 3 frases. De dónde viene, qué le marcó, qué busca.",
    "personality": "Descripción de personalidad en 2 frases.",
    "power": "Descripción de sus poderes en 2 frases.",
    "dream": "Su objetivo final en 1 frase memorable.",
    "videoPrompt": "Prompt en inglés para generar video con IA. Describe movimiento, ambiente, efectos, cámara y música. Mínimo 4 frases."
    }`;
}
