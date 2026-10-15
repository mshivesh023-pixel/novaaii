import Logo from './Logo.jsx';

const items = ['Generate', 'History', 'Brand voice', 'Settings'];

export default function Sidebar({ user, onLogout, open, onClose }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/60 md:hidden" onClick={onClose} />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/5 bg-navy-900 p-5 transition-transform md:static md:translate-x-0 ${open ? '' : '-translate-x-full'}`}>
        <Logo />
        <nav className="mt-8 flex-1 space-y-1">
          {items.map((i, idx) => (
            <button key={i} className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${idx === 0 ? 'bg-violet-500/15 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>{i}</button>
          ))}
        </nav>
        <div className="border-t border-white/10 pt-4">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-violet-500 to-sky-500 text-sm font-semibold text-white">{(user?.name || 'G')[0].toUpperCase()}</span>
            <div className="min-w-0"><p className="truncate text-sm text-white">{user?.name || 'Guest'}</p><p className="truncate text-xs text-slate-500">{user?.email || 'Not signed in'}</p></div>
          </div>
          <button onClick={onLogout} className="mt-3 text-xs text-slate-400 transition hover:text-white">Log out</button>
        </div>
      </aside>
    </>
  );
}
