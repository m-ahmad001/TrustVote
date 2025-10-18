import React from "react";

const About = () => {
  return (
    <section className="py-20" id="about">
      <div className="container mx-auto px-4 md:px-10">
        <div
          className="bg-background-dark-secondary rounded-xl p-10 md:p-16 border border-white/10"
          // style={{ background: "linear-gradient(145deg, #000000, #101411)" }}
        >
          <h2 className="text-center text-4xl font-bold leading-tight tracking-[-0.015em] mb-6">
            About DeVo
          </h2>
          <p className="text-white/70 text-center text-lg font-normal leading-relaxed max-w-4xl mx-auto">
            DeVo is committed to revolutionizing the electoral process. By
            harnessing the power of blockchain technology, we offer a voting
            platform that is inherently secure, transparent, and resistant to
            tampering. Our system allows for the seamless management of multiple
            campaigns, real-time tracking of results, and a new standard of
            trust in democratic participation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
