import Image from "next/image";
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <main className="flex-grow flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl font-mono mb-4">Home Page</h1>
        <h3 className="text-lg font-mono ">Check out our projects!</h3>
      </main>
    </div>
  );
}
