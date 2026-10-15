import Logo from './Logo.jsx';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 text-sm text-slate-500 md:flex-row">
        <Logo />
        <div className="flex gap-6">{['Privacy', 'Terms', 'Contact'].map((l) => <a key={l} href="#" className="transition hover:text-white">{l}</a>)}</div>
        <p>© {new Date().getFullYear()} NovaAI. All rights reserved.</p>
      </div>
    </footer>
  );
}
