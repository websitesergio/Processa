export default function Navbar() {
  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-serif text-xl font-bold text-slate-900 tracking-tight">
          Processa
        </a>
        <a
          href="#contact"
          className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors duration-150"
        >
          Request Audit
        </a>
      </nav>
    </header>
  );
}
