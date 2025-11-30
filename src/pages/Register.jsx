import { Navbar } from '../components';

export default function Register() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-4xl font-bold text-primary">User Registration</h1>
          <p className="mt-4 text-lg text-muted-foreground">Register your account</p>
        </div>
      </main>
    </div>
  );
}
