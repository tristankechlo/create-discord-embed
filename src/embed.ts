import { EmbedBuilder } from "discord.js";
import type { Inputs, WebhookMessage } from "./types";

export async function makeEmbed(inputs: Inputs): Promise<WebhookMessage> {
  // prepare variables
  let changelog = inputs.changelog;
  if (inputs.changelog_split.length >= 1) {
    changelog = changelog.split(inputs.changelog_split)[0].trim();
  }
  changelog = "```md\n" + changelog + "\n```";

  let pages = `${inputs.github_emoji} [GitHub](${inputs.github})`;
  if (inputs.released) {
    pages += `\n${inputs.curseforge_emoji} [Curseforge](${inputs.curseforge})`;
    pages += `\n${inputs.modrinth_emoji} [Modrinth](${inputs.modrinth})`;
  }

  // prepare embed
  const embed = new EmbedBuilder();
  embed.setColor(inputs.color);
  embed.setThumbnail(inputs.thumbnail);
  embed.setTimestamp(Date.now());
  embed.setTitle(inputs.title);
  embed.setDescription(inputs.description);
  embed.addFields(
    { name: "Changelog", value: changelog, inline: false },
    { name: "Project Pages", value: pages, inline: true },
    { name: "New Version", value: inputs.version, inline: true }
  );

  // finalize json content
  const message = {
    username: inputs.username,
    avatar_url: inputs.avatar_url,
    embeds: [embed]
  } as WebhookMessage;

  if (inputs.content.length > 0) {
    message['content'] = inputs.content;
  }
  return message;
}
