import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { SessionPage } from "./pages/SessionPage";
import { CameraPage } from "./pages/CameraPage";
import { Navigation } from "./components/Navigation"; // Asegúrate de importar Navigation

function App() {
  const [currentUser, setCurrentUser] = useState(false);
  return (
    <BrowserRouter>
      <div className="container mx-auto">
        <Navigation currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <Routes>
          <Route path="/" element={<SessionPage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="/cams" element={<CameraPage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default App;
