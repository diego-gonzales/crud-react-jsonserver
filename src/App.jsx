import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Characters = lazy(() => import("./pages/Characters"));
const CharacterForm = lazy(() => import("./pages/CharacterForm"));

function App() {
  return (
    <div className="container">
      <header>
        <h1 className="text-center">My App</h1>
      </header>
      <main>
        <BrowserRouter>
          <Suspense fallback={<p>Loading...</p>}>
            <Routes>
              <Route path="/characters" element={<Characters />} />
              <Route path="/character/add" element={<CharacterForm />} />
              <Route path="/character/edit/:id" element={<CharacterForm />} />
              <Route path="" element={<Navigate to="/characters" />} />
              <Route path="*" element={<p>Page not found</p>} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </main>
    </div>
  );
}

export default App;
