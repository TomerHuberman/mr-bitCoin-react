import { storageService } from "./storage.service";

export const userService = {
  getUser,
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

function createEmptyUser() {
  return {
    name: "Bobi bo",
    coins: 100,
    moves: [],
  };
}
