import { removeUser } from "../queries/removerUser";

const command: CommandFile = {
  name: "remove",
  description: "",
  example: "",
  execute: async (msg, args) => {
    if (args[0] === "help") {
      msg.channel.send("```!remove GitUsername```");
    }
    // const myRole = msg.guild?.roles.cache.find((role) => role.name === "Admin");
    // - Run this one time to learn what your role id is in the discord. Replace "Admin" with the role name you want to know the id of.

    const myRole = "870305921065168897"; // This is just the id it assigns Admins in my test server
    if (!msg.member?.roles.cache.has(myRole)) {
      /* || for extra roleIDs you want to be able to perform the removeUser function */
      msg.channel.send("You don't have the permissions to do that.");
      return;
    }
    const gitUser = args[0];
    removeUser(gitUser);

    msg.channel.send(`Removal of ${gitUser} completed.`);
  },
};

export default command;
