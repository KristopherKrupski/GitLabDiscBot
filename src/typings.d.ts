interface CommandFile {
  name: string;
  description: string;
  example: string;
  execute: (msg: import("discord.js").Message, args: string[]) => Promise<void>;
}
