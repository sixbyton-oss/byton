console.log('ENV CHECK:', import.meta.env.VITE_TMDB_API_KEY ? 'KEY LOADED' : 'KEY IS UNDEFINED')
window.addEventListener('error', e => console.log('JS ERROR:', e.message))
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";

createRoot(document.getElementById("root")!).render(
  <AppWrapper>
    <App />
  </AppWrapper>
);
