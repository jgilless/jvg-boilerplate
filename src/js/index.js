import { hello } from "./newfolder/funfile";

const greeting = () => {
  return `Hello ${hello()}`;
};

greeting();

function check3() {
  if (greeting() === 1) {
    return "hello";
  }
  return "goodbye";
}

check3();
