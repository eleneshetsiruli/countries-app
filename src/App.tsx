import "./App.css";
import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layout/default";
import { lazy, Suspense } from "react";
import CardView from "./pages/home/views/list";

const LazyAboutView = lazy(() => import("./pages/about/views"));
const LazyMapPageView = lazy(() => import("./pages/maps/views"));

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<CardView />} />
            <Route path="about" element={<LazyAboutView />} />
            <Route path="maps" element={<LazyMapPageView />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
export default App;
