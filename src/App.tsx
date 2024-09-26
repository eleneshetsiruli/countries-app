import "./App.css";
import { CountriesCard } from "#/countries-app/CountriesCard.js";
import { HeroSection } from "#/hero-component/HeroSection.js";
import { DashboardLayout } from "@/layout/DashboardLayout.js";

function App() {
  return (
    <>
      <DashboardLayout>
        <HeroSection />
        <CountriesCard />
      </DashboardLayout>
    </>
  );
}

export default App;
