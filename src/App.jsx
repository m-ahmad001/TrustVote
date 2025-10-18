import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import HowItWorks from "./components/HowItWorks";
import Features from "./components/Features";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="bg-dark font-display text-white">
      <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-4 md:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
              <Header />
              <main className="flex-1">
                <Hero />
                <About />
                <HowItWorks />
                <Features />
              </main>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
