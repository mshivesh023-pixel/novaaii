import { useState } from 'react';
import Logo from './Logo.jsx';
import Button from './Button.jsx';

const links = [['Features', '#features'], ['Pricing', '#pricing'], ['Reviews', '#reviews'], ['FAQ', '#faq']];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-navy-950/80 backdrop-blur-lg">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          {links.map(([l, h]) => <a key={l} href={h} className="text-sm text-slate-400 transition hover:text-white">{l}</a>)}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Button to="/login" variant="ghost" className="!py-2">Log in</Button>
          <Button to="/register" className="!py-2">Start free</Button>
        </div>
        <button className="md:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d={open ? 'M5 5l14 14M19 5L5 19' : 'M4 7h16M4 12h16M4 17h16'} /></svg>
        </button>
      </nav>
      {open && (
        <div className="space-y-3 border-t border-white/5 px-5 pb-5 pt-3 md:hidden">
          {links.map(([l, h]) => <a key={l} href={h} onClick={() => setOpen(false)} className="block py-1 text-slate-300">{l}</a>)}
          <div className="flex gap-3 pt-2"><Button to="/login" variant="ghost" className="flex-1">Log in</Button><Button to="/register" className="flex-1">Start free</Button></div>
        </div>
      )}
    </header>
  );
}
