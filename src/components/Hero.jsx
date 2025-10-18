import React from "react";

const Hero = () => {
  return (
    <section className="py-24 md:py-40">
      <div className="container mx-auto px-4">
        <div
          className="flex min-h-[480px] flex-col gap-10 items-center justify-center text-center p-4"
          style={{
            background:
              "radial-gradient(circle, rgba(94, 199, 104, 0.15) 0%, rgba(16, 20, 17, 0) 60%)",
          }}
        >
          <div className="flex flex-col gap-6">
            <h1 className="text-white text-5xl md:text-7xl font-black leading-tight tracking-tighter">
              The Future of Voting is Here
            </h1>
            <h2 className="text-white/80 text-lg md:text-xl font-normal leading-normal max-w-4xl mx-auto">
              Our decentralized voting application, powered by blockchain,
              ensures your vote is secure, transparent, and immutable. Say
              goodbye to electoral fraud.
            </h2>
          </div>
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-primary text-background-dark text-lg font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-all duration-300 glow-effect">
            <span className="truncate">Start Voting Now</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
