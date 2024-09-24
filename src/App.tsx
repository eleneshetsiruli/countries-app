import "./App.css";
import { Footer } from "./components/footer-component/Footer.js";
import { CountriesCard } from "./components/countries-app/CountriesCard.js";
import { Header } from "./components/header-component/Header.js";
import { HeroSection } from "./components/hero-component/HeroSection.js";

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
