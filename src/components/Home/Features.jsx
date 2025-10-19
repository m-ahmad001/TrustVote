import React from "react";

const Features = () => {
  const features = [
    {
      icon: "security",
      title: "Unmatched Security",
      description:
        "End-to-end encryption and the power of blockchain ensure your vote is safe.",
    },
    {
      icon: "visibility",
      title: "Full Transparency",
      description:
        "Every vote is a public record on the blockchain ledger, ensuring verifiability.",
    },
    {
      icon: "speed",
      title: "Real-Time Results",
      description:
        "Experience instantaneous vote casting and result tabulation.",
    },
    {
      icon: "hub",
      title: "Truly Decentralized",
      description:
        "No central point of failure or control, guaranteeing a fair process.",
    },
  ];

  return (
    <section className="py-20" id="features">
      <div className="container mx-auto px-4 md:px-10">
        <h2 className="text-center text-4xl font-bold leading-tight tracking-[-0.015em] mb-16">
          Core Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-8 bg-background-dark-secondary rounded-xl border border-white/10 hover:border-secondary transition-colors duration-300 glow-effect-secondary"
            >
              <span className="material-symbols-outlined text-6xl text-secondary mb-5">
                {feature.icon}
              </span>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-white/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
