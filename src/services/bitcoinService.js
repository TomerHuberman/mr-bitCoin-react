import axios from "axios";
import { storageService } from "./storage.service";

const MARKET_PRICE_KEY = "market-price";

export const BitcoinService = {
  getRate,
  getMarketPrice
};

async function getRate(coins = 1) {
  try {
    const rate = await axios.get(
      `https://blockchain.info/tobtc?currency=USD&value=${coins}`
    );
    return rate.data;
  } catch (error) {
    console.log("error: ", error);
  }
}

async function getMarketPrice() {
  const cache = storageService.load(MARKET_PRICE_KEY);
  if (cache) return cache;
  try {
    const info = await axios.get(
      `https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`
    );
    storageService.store(MARKET_PRICE_KEY, info.data);
    return info.data;
  } catch (error) {
    console.log("error: ", error);
  }
}
