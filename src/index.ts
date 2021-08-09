import client, { loadCommands } from "./discord";
import dotenv from "dotenv";

dotenv.config();

const init = async () => {
  await loadCommands();
  await client.login(process.env.BOT_TOKEN);
};
init();

// const git = new Gitlab({
//   host: process.env.GITLAB_HOST,
//   token: process.env.GITLAB_TOKEN,
// });

//export default git;
