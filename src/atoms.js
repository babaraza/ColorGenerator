import { atom } from "recoil";

const alertState = atom({
  key: "alertState",
  default: false,
});

const chosenColorState = atom({
  key: "chosenColorState",
  default: "",
});

export { alertState, chosenColorState };
