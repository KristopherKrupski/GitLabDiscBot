import { User } from "discord.js";
import { query } from "../datasources/sqlServer";

export const checkUser = async (discID: User) => {
  const result = await query<{
    DiscordID: string;
  }>`
  SELECT * FROM Users WHERE DiscID = ${discID}
  `;
  return result;
};
