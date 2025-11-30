import { Navbar } from '../components';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-4xl font-bold text-primary">Landing Page</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Welcome to TrustVote - Secure Voting Powered by Blockchain
          </p>
        </div>
      </main>
    </div>
  );
}
