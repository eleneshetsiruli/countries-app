import "./App.css";
import { Route, Routes } from "react-router-dom";
import { DefaultLayout } from "./layout/default";
import { lazy, Suspense } from "react";
import CardView from "./pages/home/views/list";
import LoadingPage from "./pages/loading";
import SingleCardView from "./pages/singleCardPage/views";
const LazyAboutView = lazy(() => import("./pages/about/views"));
const LazyMapPageView = lazy(() => import("./pages/maps/views"));
const LazyContactView = lazy(() => import("./pages/contact/views"));
const LazyPageNotFoundView = lazy(() => import("./pages/404"));

function App() {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<CardView />} />
          <Route
            path="about"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyAboutView />
              </Suspense>
            }
          />
          <Route
            path="maps"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyMapPageView />
              </Suspense>
            }
          />
          <Route
            path="cards/:id"
            element={
              <Suspense fallback={<LoadingPage />}>
                <SingleCardView />
              </Suspense>
            }
          />

          <Route
            path="contacts"
            element={
              <Suspense fallback={<LoadingPage />}>
                <LazyContactView />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingPage />}>
              <LazyPageNotFoundView />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}
export default App;
