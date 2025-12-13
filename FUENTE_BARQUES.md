# Configuración de la Fuente Barques

Actualmente el proyecto está usando **Bebas Neue** como fuente temporal (similar a Barques) hasta que agregues los archivos de la fuente Barques.

## Cómo agregar la fuente Barques

1. **Descarga la fuente Barques:**
   - Visita: https://www.dafont.com/barque.font
   - Descarga el archivo de la fuente

2. **Coloca los archivos en el proyecto:**
   - Coloca los archivos de fuente (`.woff2`, `.woff`, `.ttf` o `.otf`) en la carpeta:
     ```
     public/fonts/
     ```
   - Asegúrate de que el archivo se llame `Barques-Regular.woff2` (o el formato que prefieras)

3. **Actualiza la configuración en `app/layout.tsx`:**
   
   Reemplaza esta sección:
   ```typescript
   const barques = Bebas_Neue({
     weight: "400",
     variable: "--font-barques",
     subsets: ["latin"],
     display: "swap",
   });
   ```
   
   Con esta configuración usando `localFont`:
   ```typescript
   const barques = localFont({
     src: [
       {
         path: "./public/fonts/Barques-Regular.woff2",
         weight: "400",
         style: "normal",
       },
       // Puedes agregar más formatos como fallback:
       {
         path: "./public/fonts/Barques-Regular.woff",
         weight: "400",
         style: "normal",
       },
     ],
     variable: "--font-barques",
     fallback: ["serif"],
     display: "swap",
   });
   ```

4. **Reinicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

## Formatos de fuente soportados

- `.woff2` (recomendado - mejor compresión)
- `.woff`
- `.ttf`
- `.otf`

## Nota sobre licencias

Barques es una fuente gratuita para uso personal y comercial, pero verifica los términos de la licencia en DaFont antes de usarla en proyectos comerciales.
