import { Component } from "react";
import { userService } from "../services/user.service";
import { BitcoinService } from "../services/bitcoinService";

export class Home extends Component {
  state = {
    user: userService.getUser(),
    rate: null,
  };

  async componentDidMount() {
    const rate = await BitcoinService.getRate();
    this.setState({ rate });
  }

  render() {
    const { user, rate } = this.state;

    return (
      <section className="home">
        <div className="user-info">
        <h1>Hello {user.name}!</h1>
        <h3>Coins: {user.coins} </h3>
        <h3>Rate: {rate} </h3>
        </div>
      </section>
    );
  }
}
