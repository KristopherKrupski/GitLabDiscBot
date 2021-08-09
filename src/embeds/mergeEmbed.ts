import Discord from "discord.js";
type EmbedConstructor = (
  name: string,
  url: string[],
  id: number,
  request: string[]
) => Discord.MessageEmbed;
const mergeEmbed: EmbedConstructor = (
  name: string,
  url: string[],
  id: number,
  request: string[]
) => {
  const embed = new Discord.MessageEmbed()
    .setTitle(`Merge Request: ${name}`)
    .setURL(url[0])
    .setDescription(
      `${request[0]} created at ${url[0]}\n\n
      ${request[1]} created at ${url[1]} with: \`\`\`Name: ${name}\nRequest ID: ${id}\`\`\`\v`
    )
    .addField(
      "\nFetch and check out the branch for this merge request:",
      `\`\`\`git fetch origin\ngit checkout -b "${name}" "origin/${name}"\`\`\``,
      true
    )
    .setTimestamp();
  return embed;
};
export default mergeEmbed;
