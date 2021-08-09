import { Client, Collection } from "discord.js";
import fs from "fs";
import path from "path";

const client = Object.assign(new Client(), {
  commands: new Collection<string, CommandFile>(),
});
const prefix = "!";
export const loadCommands = async () => {
  const commandFiles = fs.readdirSync(path.resolve("./src/commands"));
  for (const commandFile of commandFiles) {
    const command: CommandFile = (await import(`./commands/${commandFile}`))
      .default;
    client.commands.set(command.name, command);
  }
};

client.once("ready", () => {
  console.log("Bot Online");
});

client.on("message", async (msg) => {
  console.log(msg.author);
  if (!msg.content.startsWith(prefix)) return;
  // if (msg.author.id === "864189951570870272")
  // const user = sql.query(`SELECT 'gitid' FROM 'userids' WHERE 'discid' = ${msg.author.id}`)
  const args = msg.content.slice(1).trim().split(/ +/); // / +/
  const command = args.shift()?.toLowerCase();
  const commandExecutor = command && client.commands.get(command);
  if (!command || !commandExecutor) return;
  try {
    await commandExecutor.execute(msg, args);
  } catch (e) {
    if (command === "add") return;
    msg.channel.send(`ERROR: ${e.description}`);
  }
});

export default client;
