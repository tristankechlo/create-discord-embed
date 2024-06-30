import * as core from "@actions/core";
import { makeEmbed } from "./embed";
import { saveToFile } from "./util";
import type { Inputs, WebhookMessage } from "./types";

async function run(): Promise<void> {
  try {
    // read inputs
    const released = core.getBooleanInput("released", { required: true });
    const changelog = core.getInput("changelog", { required: true });
    const version = core.getInput("version", { required: true });
    const color = Number.parseInt(core.getInput("color", { required: true }));
    const content = core.getInput("content", { required: true });
    const title = core.getInput("title", { required: true });
    const description = core.getInput("description", { required: true });
    const curseforge = core.getInput("curseforge", { required: true });
    const modrinth = core.getInput("modrinth", { required: true });
    const github = core.getInput("github", { required: true });
    const thumbnail = core.getInput("thumbnail", { required: true });
    const curseforge_emoji = core.getInput("curseforge-emoji");
    const modrinth_emoji = core.getInput("modrinth-emoji");
    const github_emoji = core.getInput("github-emoji");
    const username = core.getInput("username");
    const avatar_url = core.getInput("avatar-url");
    const changelog_split = core.getInput("changelog-split");
    const inputs: Inputs = { released, changelog, version, color, content, title, description, curseforge, modrinth, github, thumbnail, curseforge_emoji, modrinth_emoji, github_emoji, username, avatar_url, changelog_split };

    // call handler
    const message: WebhookMessage = await makeEmbed(inputs);

    // create github summary
    const codeInputs = core.summary.addCodeBlock(JSON.stringify(inputs, null, "  "), "json").stringify();
    core.summary.emptyBuffer();
    const codeMessage = core.summary.addCodeBlock(JSON.stringify(message, null, "  "), "json").stringify();
    core.summary.emptyBuffer();
    await core.summary
      .addDetails("Inputs", codeInputs)
      .addSeparator()
      .addDetails("Discord Message", codeMessage)
      .write();

    // save message to file
    const filename = core.getInput("filename", { required: true });
    await saveToFile(filename, message);
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed(JSON.stringify(error));
    }
  }
}

run();
