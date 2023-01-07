import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

const Characters = lazy(() => import("./components/Characters"));
const CharactersForm = lazy(() => import("./components/CharactersForm"));

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <header>
          <h1 className="text-center">My App</h1>
        </header>
        <main>
          <BrowserRouter>
            <Suspense fallback={<div>Loading ...</div>}>
              <Routes>
                <Route path="/" element={<Characters />} />
                <Route path="/character/add" element={<CharactersForm />} />
                <Route
                  path="/character/edit/:id"
                  element={<CharactersForm />}
                />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </main>
      </div>
    </Provider>
  );
}

export default App;
