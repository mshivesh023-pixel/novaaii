// Static mock of the dashboard. Illustration only; nothing here is generated.
export default function ProductPreview() {
  return (
    <div className="mx-auto mt-16 max-w-4xl rounded-2xl border border-white/10 bg-navy-800/70 p-2 shadow-2xl shadow-violet-500/10">
      <div className="grid gap-4 rounded-xl bg-navy-900 p-5 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs text-slate-500">Content type</p>
          <div className="rounded-lg border border-white/10 px-3 py-2 text-sm">Instagram caption</div>
          <p className="text-xs text-slate-500">What is it about?</p>
          <div className="rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-400">Our new spring menu…</div>
          <div className="rounded-lg bg-gradient-to-r from-violet-500 to-indigo-500 py-2 text-center text-sm font-semibold text-white">Generate content</div>
        </div>
        <div className="space-y-2 rounded-lg border border-white/10 p-4" aria-label="Example output layout">
          <p className="text-xs text-slate-500">Preview (example layout)</p>
          {[100, 90, 95, 60].map((w, i) => <div key={i} className="h-3 rounded bg-white/10" style={{ width: `${w}%` }} />)}
        </div>
      </div>
    </div>
  );
}
