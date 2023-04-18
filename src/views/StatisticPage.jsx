import { Component } from "react";
import { BitcoinService } from "../services/bitcoinService";
import { Chart } from "../cmps/Chart";

export class StatisticPage extends Component {
  state = {
    marketPrice: null,
  };

  async componentDidMount() {
    const marketPrice = await BitcoinService.getMarketPrice();
    this.setState({ marketPrice });
  }

  render() {
    const { marketPrice } = this.state;
    if (!marketPrice) return <div>loading</div>;
    return (
      <section className="statistic">
        <div className="market-price">
          <Chart data={marketPrice} />
        </div>
      </section>
    );
  }
}
