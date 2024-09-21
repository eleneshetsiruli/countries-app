import "./App.css";
import { Footer } from "./footer-component/Footer.js";
import { CountriesCard } from "./countries-app/CountriesCard.js";
import { Header } from "./header-component/Header.js";
import { HeroSection } from "./hero-component/HeroSection.js";

function App() {
  return (
    <>
      <Header />
      <HeroSection />
      <CountriesCard />
      <Footer />
    </>
  );
}

export default App;
