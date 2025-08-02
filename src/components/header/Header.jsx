import './Header.css';

export default function Header({ onCompile, onPlay }) {
  return (
    <header className="app-header">
      <button onClick={onCompile}>Compile</button>
      <button onClick={onPlay}>Play</button>
    </header>
  );
}
