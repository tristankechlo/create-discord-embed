import type { DiscordEmbed, Inputs, WebhookMessage } from "./types";

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

  let loaders = "";
  if (inputs.parsedLoaders.length > 0) {
    loaders = "- " + inputs.parsedLoaders.join("\n- ");
  } else {
    loaders = "None";
  }

  // prepare embed
  const embed: DiscordEmbed = {
    color: inputs.color,
    thumbnail: {
      url: inputs.thumbnail
    },
    timestamp: new Date().toISOString(),
    title: `New version for ${inputs.modName} just released!`,
    fields: [
      { name: "Changelog", value: changelog, inline: false },
      { name: "Supported Loaders", value: loaders, inline: true },
      { name: "Project Pages", value: pages, inline: true },
    ]
  };

  // finalize json content
  const message: WebhookMessage = {
    username: inputs.username,
    avatar_url: inputs.avatar_url,
    content: "",
    embeds: [embed]
  };

  let content = `Version **${inputs.version}** of **${inputs.modName}** is now available!`;
  if (inputs.mention.length > 0) {
    content = " " + inputs.mention;
  }
  if (content.length > 0) {
    message['content'] = content;
  }
  return message;
}
