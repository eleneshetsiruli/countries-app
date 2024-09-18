import "./App.css";

import { CountriesCard } from "./CountriesCard.js";
import { Header } from "./Header.js";
import { HeroSection } from "./HeroSection.js";

function App() {
  return (
    <>
      <Header />
      <HeroSection />
      <CountriesCard />
    </>
  );
}

export default App;
