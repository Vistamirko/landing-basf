import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing1 from "./pages/Landing1";
import Landing2 from "./pages/Landing2";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing1 />} />
          <Route path="/Landing1" element={<Landing1 />} />
          <Route path="/Landing2" element={<Landing2 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}