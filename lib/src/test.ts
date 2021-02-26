import { Faceit } from "./index";

const f = new Faceit("6b9034d6-92c7-494c-bf44-5ecd454e1456");

async function testClass() {
  const account = await f.account();
  if (!account) {
    console.log("API Key failed");
    return;
  }

  try {
    const championships = await f.championships(
      "e32fb861-c3e0-4cbe-a88d-68795af155df",
      "csgo"
    );
    console.log(championships);
  } catch (error) {
    console.log(error);
  }
}

testClass();
