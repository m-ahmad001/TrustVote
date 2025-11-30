import { useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '../components';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 sm:py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              className="h-full w-full object-cover opacity-10" 
              alt="Abstract blockchain network illustration with interconnected nodes and glowing lines on a dark blue background." 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcpcg4IRuWddlhqz02f_NQol9TjzjPLPNVomuhFigmuwHKM8VX-BszKfWc8IBb_MqmQLyuwSa9O-RDv8zK3r9_VdmUr_nkQjpyU8JBtTKXR7d2BXmkaYL1aCoH36pS3wuY36TRgT9XPwUP7KWFn2MFKlrfOue-2eHDWNUZHBhp_XNaFJXHJFbo86u7eRkFismU0M9ckAwpBIY3_Gs8xfrFcSDpwSv60AIs7ErDCmjNJeECBq9JUuOaTQ6pK5I6nCkbw23CVaYLsXA"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 text-center max-w-3xl mx-auto">
              <h1 className="text-primary text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl lg:text-6xl">
                Secure Voting Powered by Blockchain
              </h1>
              <h2 className="text-secondary text-base font-normal leading-normal sm:text-lg">
                Experience the future of fair and transparent elections for the university community, built on cutting-edge decentralized technology.
              </h2>
            </div>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <button 
                onClick={() => navigate('/voting')}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-accent text-white text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity"
              >
                <span className="truncate">Start Voting</span>
              </button>
              <button 
                onClick={() => navigate('/campaigns')}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-secondary text-white text-base font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity"
              >
                <span className="truncate">Create a Campaign</span>
              </button>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 sm:py-20" id="about">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-primary text-3xl font-bold leading-tight tracking-[-0.015em]">
                About The Project
              </h2>
              <p className="mt-4 text-supporting-1 text-lg font-normal leading-normal">
                Our mission is to bring transparency, security, and accessibility to the university's voting processes. By leveraging blockchain technology, we eliminate the risks of tampering and fraud associated with traditional systems, ensuring every vote is counted and verified on an immutable public ledger.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 sm:py-20 bg-white" id="how-it-works">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-primary text-3xl font-bold leading-tight tracking-[-0.015em]">
                How It Works
              </h2>
              <p className="mt-4 text-supporting-1 text-lg">
                A simple three-step process to cast your secure vote.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {/* Step 1 */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center size-16 rounded-full bg-accent/10 text-accent mb-4">
                  <span className="material-symbols-outlined text-4xl">account_balance_wallet</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">1. Connect Wallet</h3>
                <p className="text-supporting-1">
                  Simply connect your secure digital wallet to verify your identity as an eligible voter.
                </p>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center size-16 rounded-full bg-accent/10 text-accent mb-4">
                  <span className="material-symbols-outlined text-4xl">how_to_vote</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">2. Cast Your Vote</h3>
                <p className="text-supporting-1">
                  Browse ongoing elections, select your preferred candidate, and cast your vote with a single click.
                </p>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center size-16 rounded-full bg-accent/10 text-accent mb-4">
                  <span className="material-symbols-outlined text-4xl">monitoring</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">3. View Live Results</h3>
                <p className="text-supporting-1">
                  Watch the results unfold in real-time on a transparent, unchangeable public ledger.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid Section */}
        <section className="py-16 sm:py-20" id="features">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-primary text-3xl font-bold leading-tight tracking-[-0.015em]">
                Core Features
              </h2>
              <p className="mt-4 text-supporting-1 text-lg">
                Discover the advantages of a voting system built for the future.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1: Secure */}
              <div className="bg-white p-6 rounded-xl border border-slate-200/80 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center size-12 rounded-lg bg-accent/10 text-accent mb-4">
                  <span className="material-symbols-outlined">security</span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">Secure</h3>
                <p className="text-supporting-1 text-sm">
                  Utilizing cryptographic principles to ensure that every vote is private, secure, and protected from tampering.
                </p>
              </div>
              {/* Feature 2: Transparent */}
              <div className="bg-white p-6 rounded-xl border border-slate-200/80 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center size-12 rounded-lg bg-accent/10 text-accent mb-4">
                  <span className="material-symbols-outlined">visibility</span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">Transparent</h3>
                <p className="text-supporting-1 text-sm">
                  All votes are recorded on an immutable public ledger, providing complete transparency and auditability of the election process.
                </p>
              </div>
              {/* Feature 3: Fast */}
              <div className="bg-white p-6 rounded-xl border border-slate-200/80 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center size-12 rounded-lg bg-accent/10 text-accent mb-4">
                  <span className="material-symbols-outlined">speed</span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">Fast</h3>
                <p className="text-supporting-1 text-sm">
                  Experience a streamlined voting process with near-instant vote casting and real-time result tabulation.
                </p>
              </div>
              {/* Feature 4: Decentralized */}
              <div className="bg-white p-6 rounded-xl border border-slate-200/80 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-center size-12 rounded-lg bg-accent/10 text-accent mb-4">
                  <span className="material-symbols-outlined">hub</span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">Decentralized</h3>
                <p className="text-supporting-1 text-sm">
                  By operating on a distributed network, the system eliminates any single point of failure, ensuring constant uptime and reliability.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
