export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/30 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 h-20 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">
          AIP
          <span className="text-cyan-400">.</span>
        </h1>

        <div className="hidden md:flex gap-8 text-gray-300">
          <a href="#" className="hover:text-cyan-400 transition">
            Protocol
          </a>

          <a href="#" className="hover:text-cyan-400 transition">
            Documentation
          </a>

          <a href="#" className="hover:text-cyan-400 transition">
            SDK
          </a>

          <a href="#" className="hover:text-cyan-400 transition">
            GitHub
          </a>
        </div>

        <button className="bg-cyan-500 hover:bg-cyan-400 transition px-5 py-2 rounded-full font-semibold text-black">
          Launch App
        </button>
      </div>
    </nav>
  );
}