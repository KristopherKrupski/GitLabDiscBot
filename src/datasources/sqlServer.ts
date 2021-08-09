import mssql from "mssql";

const configuration: mssql.config = {
  server: "localhost",
  database: "discbot",
  user: "sa",
  password: "Pass123!",
  port: 1433,
  options: {
    trustServerCertificate: true,
  },
};
const mssqlConnection = async () => {
  try {
    const connection = await mssql.connect(configuration);
    return connection;
  } catch (err) {
    console.error(err);
    throw new Error("Unable to connect to the database");
  }
};

export const query = async <T>(
  command: TemplateStringsArray,
  ...values: any[]
): Promise<mssql.IRecordSet<T>> => {
  const connection = await mssqlConnection();
  try {
    const queryResponse: mssql.IResult<T> = await connection.query(
      command,
      ...values
    );
    await connection.close();
    return queryResponse.recordset;
  } catch (err) {
    console.log(err);
    await connection.close();
    throw new Error("Failed to get query response");
  }
};
