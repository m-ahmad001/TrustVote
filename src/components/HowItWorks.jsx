import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: "account_balance_wallet",
      title: "Connect Wallet",
      description:
        "Easily connect your digital wallet for secure identity verification.",
    },
    {
      number: 2,
      icon: "how_to_vote",
      title: "Cast Your Vote",
      description:
        "Your vote is encrypted and immutably recorded on the blockchain.",
    },
    {
      number: 3,
      icon: "monitoring",
      title: "View Live Results",
      description:
        "Transparently track results in real-time as they are tallied.",
    },
  ];

  return (
    <section className="py-20" id="how-it-works">
      <div className="container mx-auto px-4 md:px-10">
        <h2 className="text-center text-4xl font-bold leading-tight tracking-[-0.015em] mb-16">
          A Simple, Secure Process
        </h2>
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Connecting line - only visible on desktop */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent hidden md:block"></div>

          {steps.map((step) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center text-center p-8 bg-background-dark-secondary rounded-xl border border-white/10 glow-effect"
            >
              <div className="absolute -top-6 flex items-center justify-center size-12 rounded-full bg-primary text-background-dark text-2xl font-bold">
                {step.number}
              </div>
              <span className="material-symbols-outlined text-6xl text-primary mb-5 mt-8">
                {step.icon}
              </span>
              <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
              <p className="text-white/70">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
