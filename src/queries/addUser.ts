import { User } from "discord.js";
import { query } from "../datasources/sqlServer";
import { Message, Channel } from "discord.js";

export const addUser = async (
  discID: User,
  firstName: string,
  lastName: string,
  gitUser: string
) => {
  try {
    console.log(
      discID,
      firstName,
      lastName,
      gitUser + " This is what the query has"
    );
    query`INSERT INTO Users \n
    VALUES (${firstName}, ${lastName}, ${discID}, ${gitUser})`;
  } catch (err) {
    console.log(err);
    return err;
  }
};
