import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

// All portfolio navigation is native anchors; match the Vite base path for root and GitHub Pages.
const isHomePath = () => {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, "");
  const path = window.location.pathname.replace(/\/+$/, "");
  return path === base || path === `${base}/index.html`;
};

const App = () => (isHomePath() ? <Index /> : <NotFound />);

export default App;
