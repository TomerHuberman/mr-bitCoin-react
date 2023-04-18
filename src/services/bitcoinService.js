import axios from "axios";
import { storageService } from "./storage.service";

const ONE_DAY = 24 * 60 * 60 * 1000;
const MARKET_PRICE_KEY = "market-price";
const RATE_KEY = "rate";

export const BitcoinService = {
  getRate,
  getMarketPrice,
};

async function getRate(coins = 1) {
  const cache = storageService.load(RATE_KEY);
  if (cache && Date.now() - cache.timestamp < ONE_DAY) {
    return cache.data;
  }
  try {
    const rate = await axios.get(
      `https://blockchain.info/tobtc?currency=USD&value=${coins}`
    );
    const data = rate.data;
    const timestamp = Date.now();
    storageService.store(RATE_KEY, { data, timestamp });
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
}

async function getMarketPrice() {
  const cache = storageService.load(MARKET_PRICE_KEY);
  if (cache && Date.now() - cache.timestamp < ONE_DAY) {
    return cache.data;
  }
  try {
    const info = await axios.get(
      `https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`
    );
    const data = info.data;
    const timestamp = Date.now();
    storageService.store(MARKET_PRICE_KEY, { data, timestamp });
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
}
