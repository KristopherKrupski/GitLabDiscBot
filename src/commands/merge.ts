import mergeEmbed from "../embeds/mergeEmbed";
import git from "../git";
import projectIDs from "../projectIDs";

const command: CommandFile = {
  name: "merge",
  description: "",
  example: "",
  execute: async (msg, args) => {
    if (args[0] === "help") {
      msg.channel.send("```!merge ID(API or incompass) title ```");
      return;
    }

    type ProjectIDKeys = keyof typeof projectIDs;
    const projectString = args[0].toLowerCase();
    if (!(projectString in projectIDs)) {
      return;
    }

    const id: number = projectIDs[projectString as ProjectIDKeys];
    const srcBranch = "main";
    const name = args.slice(1).join("-").trim();
    const createdBranch = await git.Branches.create(id, name, srcBranch);

    const mergeName = `${createdBranch.name} Merge Request`;
    const newMerge = await git.MergeRequests.create(
      id,
      createdBranch.name,
      srcBranch,
      mergeName
    );

    const mergeReqEmbed = mergeEmbed(
      mergeName,
      [createdBranch.web_url, newMerge.web_url],
      newMerge.id,
      ["Branch", "Merge Request"]
    );

    msg.channel.send(mergeReqEmbed);
  },
};

export default command;
