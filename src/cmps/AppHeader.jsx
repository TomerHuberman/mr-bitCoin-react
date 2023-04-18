// import { connect } from "react-redux";
import { Link, NavLink, withRouter } from "react-router-dom";

function _AppHeader(props) {
  return (
    <header className="app-header">
      <NavLink exact to="/">
        <h1 className="logo">Mr-bitCoin</h1>
      </NavLink>
      <nav>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/contact">Contacts</NavLink>
        <NavLink to="/statistic">Statistics</NavLink>
      </nav>
    </header>
  );
}

export const AppHeader = withRouter(_AppHeader);
