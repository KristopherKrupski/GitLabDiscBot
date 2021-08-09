import { MessageReaction, User } from "discord.js";
import mergeReq from "../actions/mergeFunc";
import embedConstructor from "../embeds/embedConst";
import projectIDs from "../projectIDs";
import { getGitID } from "../queries/getGitID";
import git from "../git";

// import gitid from "../queries/gitID";

const command: CommandFile = {
  name: "issue",
  description: "",
  example: "",
  execute: async (msg, args) => {
    if (args[0] === "help") {
      msg.channel.send("```!issue ID(api or incompass) title```");
    }
    // const gittoken = query(discid.trim());
    const message = msg;
    const msgAuthor = msg.author;
    console.log(msgAuthor + " This is the real id");
    const argument = args;
    type ProjectIDKeys = keyof typeof projectIDs;
    const projectString = args[0].toLowerCase();
    if (!(projectString in projectIDs)) {
      return;
    }

    const id: number = projectIDs[projectString as ProjectIDKeys];
    const title = args.slice(1).join(" ").trim();
    const gitID = await getGitID(msgAuthor);
    console.log(gitID);
    const newIssue = await git.Issues.create(id, {
      title: title,
      // sudo: gitID, Only available as an option on a private instance
    });

    const newID = newIssue.id;
    const name = newIssue.title;

    const issueEmbed = embedConstructor(name, newIssue.web_url, newID, "Issue");

    await msg.channel.send(issueEmbed).then((sentEmbed) => {
      sentEmbed.react("👍");

      msg.reply(
        "Would you like to create a branch and merge based off this issue?"
      );
      sentEmbed
        .awaitReactions(
          (reaction: MessageReaction, user: User) =>
            user.id == msg.author.id &&
            (reaction.emoji.name == "👍" || reaction.emoji.name == "👎"),
          { max: 1 }
        )
        .then((collected) => {
          if (collected.first()?.emoji.name == "👍") {
            msg.reply("Creating your branch and merge");
            mergeReq(message, argument, msgAuthor);
          } else {
            msg.channel.send("Merge not created");
          }
        });
    });
  },
};

export default command;
