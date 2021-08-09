import { User } from "discord.js";
import { query } from "../datasources/sqlServer";

export const getGitID = async (discID: User) => {
  console.log(discID + " This is the variable on the gitID file");
  const result = await query<{
    GitUser: string;
  }>`
  SELECT GitUser FROM Users WHERE DiscID = ${discID}
  `;
  if (result.length === 0) throw new Error("Discord ID not found");
  const firstRecord = result[0];
  const gitLabUser = firstRecord.GitUser;
  console.log(gitLabUser + " This is the ID it's trying to use");
  console.log(result[0]);
  return gitLabUser;
};
