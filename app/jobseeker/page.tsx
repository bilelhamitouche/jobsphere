import Analytics from "./components/Analytics";
import Navbar from "./components/navbar";

export default function JobSeeker() {
  return (
    <div className="w-full h-full">
      <Navbar />
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold md:text-3xl">Dashboard</h2>
        <Analytics />
      </div>
    </div>
  );
}
