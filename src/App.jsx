import { BrowserRouter, Routes, Route } from "react-router-dom";

import PakletHome from "./Pages/Home";
import Shop from "./Pages/Shop";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PakletHome />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
