import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 text-lg font-bold text-white">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet-500 to-sky-500 text-sm">N</span>
      NovaAI
    </Link>
  );
}
