export default function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-semibold text-white md:text-4xl">{title}</h2>
        {subtitle && <p className="mt-4 text-slate-400">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}
