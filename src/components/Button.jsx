import { Link } from 'react-router-dom';

const styles = {
  primary: 'bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:brightness-110',
  ghost: 'border border-white/15 text-slate-200 hover:border-violet-400/60 hover:bg-white/5',
};

export default function Button({ to, variant = 'primary', className = '', children, ...props }) {
  const cls = `inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 ${styles[variant]} ${className}`;
  return to ? <Link to={to} className={cls} {...props}>{children}</Link> : <button className={cls} {...props}>{children}</button>;
}
