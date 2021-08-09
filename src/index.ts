import client, { loadCommands } from "./discord";
import dotenv from "dotenv";

dotenv.config();

const init = async () => {
  await loadCommands();
  await client.login(process.env.BOT_TOKEN);
};
init();

