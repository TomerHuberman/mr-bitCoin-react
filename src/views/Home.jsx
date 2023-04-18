import { Component } from "react";
import { userService } from "../services/user.service";
import { connect } from "react-redux";
import { BitcoinService } from "../services/bitcoinService";
import { MoveList } from "../cmps/MoveList";

class _Home extends Component {
  state = {
    rate: null,
  };

  async componentDidMount() {
    const rate = await BitcoinService.getRate();
    this.setState({ rate });
  }

  render() {
    const { rate } = this.state;
    const { loggedInUser: user } = this.props;
    return (
      <section className="home">
        <div className="user-info">
          <h1>Hello {user.name}!</h1>
          <h3>Coins: {user.balance} </h3>
          <h3>Rate: {rate} </h3>
        </div>
        <MoveList title={`Your last 3 transfers`} />
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  loggedInUser: state.userModule.loggedInUser,
});

export const Home = connect(mapStateToProps)(_Home);
