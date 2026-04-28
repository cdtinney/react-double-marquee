export default function Header() {
  return (
    <header className="header">
      <img className="header__logo" src="static/logo.png" alt="react-double-marquee logo" />
      <a
        className="header__npm"
        href="https://www.npmjs.com/package/react-double-marquee"
        target="_blank"
        rel="noopener noreferrer"
      >
        npm install react-double-marquee
      </a>
    </header>
  );
}
