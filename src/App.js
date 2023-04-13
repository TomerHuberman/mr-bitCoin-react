import logo from "./logo.svg";
import "./assets/main.scss";
import { Home } from "./views/Home";
import { Contacts } from "./views/ContactIndex";
import { StatisticPage } from "./views/StatisticPage";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>bitCoin</h1>
      </header>

      {/* <Home /> */}
      {/* <Contacts /> */}
      <StatisticPage />
    </div>
  );
}

export default App;
