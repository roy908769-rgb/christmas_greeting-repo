# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Adding Music

To add background music to the app:

- Copy your MP3 file (for example `christmas1.mp3`) into the project's `public/` folder. The file path should be `public/christmas1.mp3`.
 - Put your MP3 (named `christmas1.mp3`) into the project's `public/` folder so it's available at `/christmas1.mp3`.
 - Music will play when the user taps the gift (the audio is created/played inside the gift-open handler). This is a user gesture so browsers will allow playback.

Development server:

```powershell
npm install
npm run dev
```

If you placed the file on your Desktop, copy it into the project with a command like (PowerShell):

```powershell
Copy-Item -Path "$env:USERPROFILE\Desktop\your-music-file.mp3" -Destination "./public/christmas1.mp3"
```

If the audio fails to load, open the browser console to see a warning from the music player explaining the expected location.
