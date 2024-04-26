import logo from "../../logo.png";
import "./Header.scss";
function Header() {
  return (
    <>
      <header className="header">
        <span>
          <a href="/">
            <img src={logo} width="auto" height="40" alt="logo"></img>
          </a>
        </span>
        <span className="header__title">To-do List</span>
      </header>
    </>
  );
}

export default Header;
