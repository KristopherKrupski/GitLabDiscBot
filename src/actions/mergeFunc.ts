import { Message, User } from "discord.js";
import projectIDs from "../projectIDs";
import git from "../git";
import mergeEmbed from "../embeds/mergeEmbed";

async function mergeReq(msg: Message, args: string[], discID: User) {
  type ProjectIDKeys = keyof typeof projectIDs;
  const projectString = args[0].toLowerCase();
  if (!(projectString in projectIDs)) {
    return;
  }
  console.log("Message Member:" + msg.member);

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
}

export default mergeReq;
