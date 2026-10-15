import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import Button from '../components/Button.jsx';
import Section from '../components/Section.jsx';
import ProductPreview from '../components/ProductPreview.jsx';
import { features, plans, testimonials, faqs } from '../data.js';

function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-white/10 bg-navy-800/50">
      <button className="flex w-full items-center justify-between px-5 py-4 text-left font-medium text-white" aria-expanded={open} onClick={() => setOpen(!open)}>
        {q}<span className={`ml-4 text-violet-300 transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
      </button>
      {open && <p className="px-5 pb-4 text-sm text-slate-400">{a}</p>}
    </div>
  );
}

export default function Landing() {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600/30 to-sky-500/20 blur-3xl" />
      <Navbar />
      <main className="relative">
        <section className="mx-auto max-w-6xl px-5 pb-10 pt-20 text-center md:pt-28">
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl">
            Marketing content for your business, <span className="grad-text">written in minutes</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-400">
            NovaAI helps small businesses draft social posts, emails and ads, so you can spend less time writing and more time selling.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to="/register" className="w-full sm:w-auto">Start free</Button>
            <Button href="#features" variant="ghost" className="w-full sm:w-auto" onClick={(e) => { e.preventDefault(); document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' }); }}>See features</Button>
          </div>
          <ProductPreview />
        </section>

        <Section id="features" title="Everything you need to keep posting" subtitle="Simple tools for small teams that don't have time to stare at a blank page.">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(([t, d]) => (
              <div key={t} className="card"><h3 className="font-semibold text-white">{t}</h3><p className="mt-2 text-sm text-slate-400">{d}</p></div>
            ))}
          </div>
        </Section>

        <Section id="pricing" title="Simple pricing" subtitle="Placeholder plans. Final pricing will be confirmed before launch.">
          <div className="grid gap-5 md:grid-cols-3">
            {plans.map((p) => (
              <div key={p.name} className={`card flex flex-col ${p.featured ? 'border-violet-400/60 bg-gradient-to-b from-violet-500/10 to-navy-800/60' : ''}`}>
                <h3 className="font-semibold text-white">{p.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{p.note}</p>
                <p className="my-5 text-4xl font-bold text-white">{p.price}<span className="text-sm font-normal text-slate-400"> /mo</span></p>
                <ul className="mb-6 flex-1 space-y-2 text-sm text-slate-300">{p.items.map((i) => <li key={i}>✓ {i}</li>)}</ul>
                <Button to="/register" variant={p.featured ? 'primary' : 'ghost'}>Start free</Button>
              </div>
            ))}
          </div>
        </Section>

        <Section id="reviews" title="What customers say" subtitle="Placeholder quotes until real reviews are collected.">
          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map(([q, n, r], i) => (
              <figure key={i} className="card"><blockquote className="text-slate-300">{q}</blockquote><figcaption className="mt-4 text-sm"><span className="font-medium text-white">{n}</span><span className="text-slate-500"> · {r}</span></figcaption></figure>
            ))}
          </div>
        </Section>

        <Section id="faq" title="Questions, answered">
          <div className="mx-auto max-w-2xl space-y-3">{faqs.map(([q, a]) => <Faq key={q} q={q} a={a} />)}</div>
        </Section>

        <section className="mx-auto max-w-4xl px-5 pb-24">
          <div className="rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-14 text-center">
            <h2 className="text-3xl font-semibold text-white">Ready to write your next post?</h2>
            <p className="mx-auto mt-3 max-w-md text-violet-100">Create a free account and set up your first brief in a couple of minutes.</p>
            <Button to="/register" className="mt-8 !bg-white !from-white !to-white !text-navy-900">Start free</Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
