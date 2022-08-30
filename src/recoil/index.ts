import { atom } from "recoil";

export const UsernameState = atom({
  key: "username",
  default: "",
});

export const AccessTokenState = atom({
  key: "accessToken",
  default: null,
});
