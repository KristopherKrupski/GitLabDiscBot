import { addUser } from "../queries/addUser";
import { checkUser } from "../queries/checkUser";
const command: CommandFile = {
  name: "add",
  description: "",
  example: "",
  execute: async (msg, args) => {
    if (args[0] === "help") {
      msg.channel.send("```!add FirstName LastName GitUserName```");
      return;
    }
    const discID = msg.author;
    const userCheck = await checkUser(discID);
    if (userCheck.length > 0) {
      msg.channel.send("Account already exists under this Discord account");
      return;
    }
    const firstName = args[0];
    const lastName = args[1];
    const GitUserName = args[2];
    addUser(discID, firstName, lastName, GitUserName);
    msg.channel.send("Succesfully created profile");
  },
};

export default command;
