import { useState } from 'react';
import Button from './Button.jsx';

const types = ['Instagram caption', 'Facebook post', 'Email', 'Ad copy', 'Product description'];
const tones = ['Friendly', 'Professional', 'Playful', 'Bold'];

export default function GenerateForm({ onSubmit, busy }) {
  const [v, setV] = useState({ type: types[0], tone: tones[0], topic: '' });
  const set = (k) => (e) => setV({ ...v, [k]: e.target.value });
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(v); }} className="space-y-4 rounded-2xl border border-white/10 bg-navy-800/60 p-6">
      <h2 className="font-semibold text-white">New content</h2>
      <label className="block text-sm text-slate-300">Content type
        <select className="input mt-2" value={v.type} onChange={set('type')}>{types.map((t) => <option key={t}>{t}</option>)}</select>
      </label>
      <label className="block text-sm text-slate-300">Tone
        <select className="input mt-2" value={v.tone} onChange={set('tone')}>{tones.map((t) => <option key={t}>{t}</option>)}</select>
      </label>
      <label className="block text-sm text-slate-300">What is it about?
        <textarea required rows={4} className="input mt-2" placeholder="Describe your offer, event or product…" value={v.topic} onChange={set('topic')} />
      </label>
      <Button type="submit" disabled={busy} className="w-full">{busy ? 'Generating…' : 'Generate content'}</Button>
    </form>
  );
}
