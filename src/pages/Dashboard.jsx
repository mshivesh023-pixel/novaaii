import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import GenerateForm from '../components/GenerateForm.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../services/api.js';
import { sampleHistory } from '../data.js';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(null); // null = using placeholder data

  useEffect(() => { api.history().then((d) => setHistory(d.items)).catch(() => {}); }, []);

  async function generate(values) {
    setBusy(true); setError('');
    try {
      const data = await api.generate(values);
      setResult(data);
      setHistory((h) => [
  {
    id: crypto.randomUUID(),
    type: values.type,
    topic: values.topic,
    date: 'Just now',
  },
  ...(h || []),
]);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  const items = history ?? sampleHistory;

  return (
    <div className="flex min-h-screen">
      <Sidebar user={user} open={menu} onClose={() => setMenu(false)} onLogout={() => { logout(); navigate('/'); }} />
      <main className="min-w-0 flex-1 p-5 md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <button className="md:hidden" aria-label="Open menu" onClick={() => setMenu(true)}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
          <h1 className="text-2xl font-semibold text-white">Generate content</h1>
        </div>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,380px)_1fr]">
          <GenerateForm onSubmit={generate} busy={busy} />
          <section className="rounded-2xl border border-white/10 bg-navy-800/60 p-6" aria-live="polite">
            <h2 className="font-semibold text-white">Preview</h2>
            {error && <p role="alert" className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>}
            {result ? <p className="mt-4 whitespace-pre-wrap text-slate-200">{result.content}</p>
              : !error && <p className="mt-4 text-sm text-slate-500">Your generated content will appear here. Fill in the form and select Generate content.</p>}
          </section>
        </div>
        <section className="mt-8">
          <h2 className="mb-3 font-semibold text-white">History {history === null && <span className="text-xs font-normal text-slate-500">(sample data)</span>}</h2>
          <ul className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-navy-800/60">
            {items.length === 0 && <li className="p-4 text-sm text-slate-500">Nothing yet. Generate your first piece of content.</li>}
        
{items.map((h) => (
  <li key={h.id}>
    <button
      type="button"
      onClick={() =>
        setResult({
          id: h.id,
          type: h.type,
          topic: h.topic,
          content: h.content,
        })
      }
      className="flex w-full items-center justify-between gap-4 p-4 text-left transition hover:bg-white/5"
    >
      <div className="min-w-0">
        <p className="truncate text-sm text-white">{h.topic}</p>
        <p className="text-xs text-slate-500">{h.type}</p>
      </div>
      <span className="shrink-0 text-xs text-slate-500">
        {h.date}
      </span>
    </button>
  </li>
))}

          </ul>
        </section>
      </main>
    </div>
  );
}
