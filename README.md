# 🏴‍☠️ One Piece Character Generator

Genera tu personaje único en el universo de One Piece con Inteligencia Artificial. Elige tu facción, poderes y raza, y obtén tu cartel de recompensa personalizado.

🔗 **Demo en vivo:** [one-piece-generator.vercel.app](https://one-piece-generator.vercel.app)

---

## ✨ Funcionalidades

- **Formulario de 4 pasos** — Identidad, Poderes, Físico y Estilo Visual
- **Descripción generada con IA** — Groq ,genera el origen, personalidad, poderes y sueño del personaje
- **Imagen generada con IA** — Hugging Face ,genera una ilustración única del personaje
- **Cartel de recompensa** — Cartel estilo "SE BUSCA" con Berrys calculadas según los poderes elegidos
- **Prompt para video IA** — Genera un prompt para crear un video con herramientas como Sora o Runway
- **Compartir en redes** — Twitter, Reddit y TikTok
- **Descargar imagen** — Descarga la ilustración generada

---

## 🛠️ Stack Tecnológico

| Tecnología | Uso |
|---|---|
| Next.js | Framework frontend y backend |
| TypeScript | Tipado estático |
| Tailwind CSS 4 | Estilos |
| Groq API (LLaMA 3.3 70B) | Generación de texto con IA |
| Hugging Face (FLUX.1-schnell) | Generación de imágenes con IA |
| Vercel | Deploy |

---

## 🚀 Instalación y uso local

### 1. Clona el repositorio

```bash
git clone https://github.com/xxcastro/one-piece-generator.git
cd one-piece-generator
```

### 2. Instala las dependencias

```bash
npm install
```

### 3. Configura las variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
GROQ_API_KEY=tu_api_key_de_groq
HF_API_KEY=tu_api_key_de_hugging_face
```

#### Cómo obtener las API keys

- **Groq** — Regístrate gratis en [console.groq.com](https://console.groq.com) y crea una API key. Tier gratuito: 14.400 peticiones/día.
- **Hugging Face** — Regístrate gratis en [huggingface.co](https://huggingface.co), ve a Settings → Access Tokens y crea un token de tipo Read.

### 4. Arranca el servidor de desarrollo

```bash
npm run dev
```

Abre [localhost:3000](http://localhost:3000) en tu navegador.

---

## 📁 Estructura del proyecto

```
src/
├── app/
│   ├── api/
│   │   ├── generate-character/   # Genera descripción con Groq
│   │   └── generate-image/       # Genera imagen con Hugging Face
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── form/
│   │   └── CharacterForm.tsx     # Formulario de 4 pasos
│   ├── result/
│   │   └── CharacterResult.tsx   # Pantalla de resultado
│   └── ui/
│       ├── FieldLabel.tsx        # Etiqueta de campo
│       ├── SelectGrid.tsx        # Grid de botones de selección
│       └── StepIndicator.tsx     # Indicador de pasos
├── lib/
│   ├── berry-calculator.ts       # Calcula la recompensa en Berrys
│   ├── constants.ts              # Arrays de opciones del formulario
│   └── prompt-builder.ts        # Construye los prompts para las IAs
└── types/
    └── character.ts              # Tipos TypeScript del proyecto
```

---

## 🔑 Variables de entorno

| Variable | Descripción |
|---|---|
| `GROQ_API_KEY` | API key de Groq para generación de texto |
| `HF_API_KEY` | Token de Hugging Face para generación de imágenes |

---

## 📝 Notas técnicas

- Las imágenes se generan con **FLUX.1-schnell** usando el provider **nscale** de Hugging Face, que mantiene el modelo activo y responde en segundos.
- La generación de texto usa **LLaMA 3.3 70B** via Groq, que devuelve JSON estructurado para facilitar el parseo.
- Las imágenes se convierten a **base64** en el servidor antes de enviarse al frontend para evitar problemas de CORS.

---

## 👨‍💻 Autor

**Alexander Castro** — [Portfolio](https://alexander-dev-portfolio.vercel.app)

---

*Este proyecto es un fan project sin fines comerciales. One Piece es propiedad de Eiichiro Oda / Shueisha.*
