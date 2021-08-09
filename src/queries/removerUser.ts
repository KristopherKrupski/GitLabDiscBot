import { query } from "../datasources/sqlServer";

export const removeUser = async (gitUser: string) => {
  console.log(gitUser + " This is what the query has");
  query`
    DELETE FROM Users 
    WHERE 
    ${gitUser} = gitUser
    `;
};
