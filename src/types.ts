import { EmbedBuilder } from "discord.js";

export interface Inputs {
  released: boolean;
  changelog: string;
  changelog_split: string;
  version: string;
  color: number;
  content: string;
  title: string;
  description: string;
  curseforge: string;
  modrinth: string;
  github: string;
  thumbnail: string;
  curseforge_emoji: string;
  modrinth_emoji: string;
  github_emoji: string;
  username: string;
  avatar_url: string;
};

export interface WebhookMessage {
  content: string;
  username: string;
  avatar_url: string;
  embeds: EmbedBuilder[];
};