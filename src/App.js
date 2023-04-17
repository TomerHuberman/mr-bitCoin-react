import { Route, HashRouter as Router, Switch } from "react-router-dom";
import "./assets/main.scss";
import { Home } from "./views/Home";
import { ContactIndex } from "./views/ContactIndex";
import { StatisticPage } from "./views/StatisticPage";
import { AppHeader } from "./cmps/AppHeader";
import { ContactDetails } from "./views/ContactDetails";

function App() {
  return (
    <Router>
      <div className="app">
        <AppHeader />

        <main className="container">
          <Switch>
            <Route path="/statistic" component={StatisticPage} />
            <Route path="/contact/:id" component={ContactDetails} />
            <Route path="/contact" component={ContactIndex} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
