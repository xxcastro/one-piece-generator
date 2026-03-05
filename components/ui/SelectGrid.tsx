interface Props {
  options: readonly string[];
  value: string;
  onChange: (val: string) => void;
}

export default function SelectGrid({ options, value, onChange }: Props) {
  return (
    // flex-wrap hace que los botones salten de línea si no caben
    <div className="flex flex-wrap gap-2">
      {options.map((opcion) => {
        // Para cada opción comprobamos si es la seleccionada
        const seleccionado = value === opcion;

        return (
          <button
            key={opcion}
            onClick={() => onChange(opcion)}
            className={seleccionado
              // Si está seleccionado: borde dorado, fondo dorado transparente, texto dorado
              ? "px-4 py-2 rounded-lg border-2 border-red-400 bg-red-400/20 text-red-400 text-xs font-bold"
              // Si no está seleccionado: borde gris, fondo transparente, texto gris
              : "px-4 py-2 rounded-lg border-2 border-white/20 bg-white/5 text-white/60 text-xs"
            }
          >
            {opcion}
          </button>
        );
      })}
    </div>
  );
}