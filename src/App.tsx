import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

// All portfolio navigation is native anchors; no client router needs to boot.
const App = () => window.location.pathname === "/" ? <Index /> : <NotFound />;

export default App;
