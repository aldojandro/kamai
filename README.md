# Kamai

Proyecto Next.js configurado con React, TypeScript, Tailwind CSS y Shadcn/ui.

## 🚀 Tecnologías

- **[Next.js 16](https://nextjs.org/)** - Framework React con App Router
- **[React 19](https://react.dev/)** - Biblioteca de UI
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Framework de CSS utility-first
- **[Shadcn/ui](https://ui.shadcn.com/)** - Componentes UI reutilizables

## 📦 Instalación

Las dependencias ya están instaladas. Si necesitas reinstalarlas:

```bash
npm install
```

## 🛠️ Desarrollo

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## 📝 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta ESLint

## 🎨 Agregar Componentes de Shadcn/ui

Para agregar componentes de Shadcn/ui, usa el CLI:

```bash
npx shadcn@latest add [component-name]
```

Ejemplo:
```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

Los componentes se agregarán en `components/ui/`.

## 📁 Estructura del Proyecto

```
kamai/
├── app/              # App Router de Next.js
│   ├── layout.tsx    # Layout principal
│   ├── page.tsx      # Página principal
│   └── globals.css   # Estilos globales con variables de Shadcn
├── components/        # Componentes React
│   └── ui/           # Componentes de Shadcn/ui
├── lib/              # Utilidades
│   └── utils.ts      # Funciones helper (cn, etc.)
└── public/           # Archivos estáticos
```

## 🎯 Configuración

- **Tailwind CSS**: Configurado con variables CSS de Shadcn/ui
- **TypeScript**: Configurado con paths alias (`@/*`)
- **Shadcn/ui**: Estilo "new-york", modo oscuro habilitado, usando Lucide icons

## 📚 Recursos

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de Shadcn/ui](https://ui.shadcn.com/)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Componentes de Shadcn/ui](https://ui.shadcn.com/docs/components)

## 🚢 Despliegue

La forma más fácil de desplegar tu aplicación Next.js es usando [Vercel Platform](https://vercel.com/new).

Consulta la [documentación de despliegue de Next.js](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.
