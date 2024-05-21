import Image from "next/image";
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Home Page</h1>
        <h3 className="text-lg">Check out our projects!</h3>
      </main>
    </div>
  );
}
