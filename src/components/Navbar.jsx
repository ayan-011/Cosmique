import { ArrowUpRight } from './Icons'

const NAV_LINKS = ['Home', 'Voyages', 'Worlds', 'Innovation', 'Plan Launch']

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 px-8 lg:px-16 flex items-center justify-between">
      {/* Logo */}
      <div className="liquid-glass w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
        <span className="font-heading italic text-white text-xl">a</span>
      </div>

      {/* Center — desktop only */}
      <div className="hidden md:flex items-center liquid-glass rounded-full px-1.5 py-1.5 gap-1">
        {NAV_LINKS.map((link) => (
          <a
            key={link}
            href="#"
            className="px-3 py-2 text-sm font-medium text-white/90 font-body whitespace-nowrap hover:text-white transition-colors"
          >
            {link}
          </a>
        ))}
        <button className="bg-white text-black rounded-full px-4 py-2 text-sm font-medium font-body whitespace-nowrap flex items-center gap-1 hover:bg-white/90 transition-colors">
          Claim a Spot <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      {/* Spacer to balance logo */}
      <div className="w-12 h-12 flex-shrink-0 invisible" />
    </nav>
  )
}
