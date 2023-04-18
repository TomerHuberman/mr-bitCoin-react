import { storageService } from "./storage.service";

export const userService = {
  getUser,
  transferCoins,
  createMove
};

const USER_KEY = "user";

function getUser() {
  let user = storageService.load(USER_KEY);
  if (!user) {
    user = createEmptyUser();
    storageService.store(USER_KEY, user);
  }
  return user;
}

function createMove(contact, amount) {
  const newMove = {
    toId: contact._id,
    to: contact.name,
    at: Date.now(),
    amount,
  };
  return newMove;
}

function transferCoins(amount, contact) {
  const loggedInUser = storageService.load(USER_KEY);
  const newMove = createMove(contact, amount);
  loggedInUser.moves.unshift(newMove);
  loggedInUser.balance -= +amount;
  storageService.store(USER_KEY, loggedInUser);
  return loggedInUser;
}


function createEmptyUser() {
  return {
    name: "Bobi bo",
    balance: 100,
    moves: [],
  };
}
