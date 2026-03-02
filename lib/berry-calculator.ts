import { CharacterForm } from "@/types/character";

export function calculateBerrys(character:CharacterForm): number{
    let total = 50000000

    if (character.faction === "Marine") {
    return 0;
    }
    if (character.haki == "Haki del Rey"||character.haki == "Los tres"){
        total += 500000000
    }
    if (character.devilFruit == "Logia"){
        total += 300000000
    }
    if (character.devilFruit == "Zoan"){
        total += 150000000
    }
    if (character.devilFruit == "Paramecia"){
        total += 100000000
    }
    if (character.faction == "Pirata"){
        total += 200000000
    }
    
    total += Math.floor(Math.random() * 50000000);

    return total
}

export function formatBerrys(numBerrys: number): string {
  // Si es 0, los marines no tienen recompensa
  if (numBerrys === 0) {
    return "N/A";
  }
  
  // Si es mayor de mil millones, dividimos entre mil millones y añadimos el texto
  // toFixed(1) significa "muestra 1 decimal" → 1500000000 se convierte en "1.5"
  if (numBerrys >= 1_000_000_000) {
    return (numBerrys / 1_000_000_000).toFixed(1) + " Mil Millones";
  }

  // Si es mayor de un millón, dividimos entre un millón
  // toFixed(0) significa "sin decimales" → 300000000 se convierte en "300"
  if (numBerrys >= 1_000_000) {
    return (numBerrys / 1_000_000).toFixed(0) + " Millones";
  }

  // Si no entra en ningún caso anterior, devolvemos el número tal cual
  return numBerrys.toString();
}