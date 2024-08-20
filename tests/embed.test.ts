import * as main from '../src/embed'
import type { Inputs } from '../src/types';

let fakeInputs: Inputs;

describe('embed', () => {
  beforeEach(() => {
    fakeInputs = makeInputs();
  })

  it('no changelog splitting', async () => {
    fakeInputs.changelog_split = "";
    const output = await main.makeEmbed(fakeInputs);
    expect(output).toBeDefined();
    expect(output.embeds[0].fields[0].name).toBe("Changelog");
    expect(output.embeds[0].fields[0].value).toBe(`\`\`\`md\n${fakeInputs.changelog}\n\`\`\``);
  })

  it('changelog splitting', async () => {
    const output = await main.makeEmbed(fakeInputs);
    expect(output).toBeDefined();
    expect(output.embeds[0].fields[0].name).toBe("Changelog");
    expect(output.embeds[0].fields[0].value).not.toContain(fakeInputs.changelog_split);
  })

  it('do not release', async () => {
    fakeInputs.released = false
    const output = await main.makeEmbed(fakeInputs);
    expect(output).toBeDefined();
    expect(output.embeds[0].fields[1].name).toBe("Project Pages");
    expect(output.embeds[0].fields[1].value).not.toContain("\n");
  })

  it('create release', async () => {
    fakeInputs.released = true
    const output = await main.makeEmbed(fakeInputs);
    expect(output).toBeDefined();
    expect(output.embeds[0].fields[1].name).toBe("Project Pages");
    expect(output.embeds[0].fields[1].value).toContain("\n");
  })

  it('has content', async () => {
    fakeInputs.content = "this is the message content"
    const output = await main.makeEmbed(fakeInputs);
    expect(output).toBeDefined();
    expect(output.content).not.toBe("");
    expect(output.content).toBe(fakeInputs.content);
  })

  it('no content', async () => {
    fakeInputs.content = ""
    const output = await main.makeEmbed(fakeInputs);
    expect(output).toBeDefined();
    expect(output.content).toBe("");
  })
})


function makeInputs(): Inputs {
  return {
    released: true,
    changelog: "this is a---very long changelog",
    changelog_split: "---",
    version: "1.18.2-2.0.0",
    color: 456789,
    content: "this is the content of the message",
    title: "title of the embed",
    description: "description of the embed",
    curseforge: "https://example.com/curseforge",
    modrinth: "https://example.com/modrinth",
    github: "https://example.com/github",
    thumbnail: "https://example.com/thumbnail",
    curseforge_emoji: "<cf-emoji>",
    modrinth_emoji: "<mr-emoji>",
    github_emoji: "<gh-emoji>",
    username: "username",
    avatar_url: "https://example.com/avatar",
  }
}