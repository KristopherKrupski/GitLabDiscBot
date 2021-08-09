import Discord from "discord.js";
type EmbedConstructor = (
  name: string,
  url: string,
  id: number,
  request: string
) => Discord.MessageEmbed;
const embedConstructor: EmbedConstructor = (
  name: string,
  url: string,
  id: number,
  request: string
) => {
  const embed = new Discord.MessageEmbed()
    .setTitle(name)
    .setURL(url)
    .setDescription(
      `${request} created at ${url} with: \`\`\`Name: ${name}\nRequest ID: ${id}\`\`\``
    )
    .setTimestamp();
  return embed;
};
export default embedConstructor;
