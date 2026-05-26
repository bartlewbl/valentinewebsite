import { HashRouter, Routes, Route } from "react-router-dom";
import { CodeEntry } from "./pages/CodeEntry";
import { MemoryPage } from "./pages/MemoryPage";
import { AppreciationPage } from "./pages/AppreciationPage";
import { FinalPage } from "./pages/FinalPage";
import "./index.css";

export function App() {
  return (
    <HashRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<CodeEntry />} />
          <Route path="/memory/:n" element={<MemoryPage />} />
          <Route path="/appreciation/:n" element={<AppreciationPage />} />
          <Route path="/final" element={<FinalPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
