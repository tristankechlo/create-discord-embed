import * as main from '../src/embed'
import type { Inputs } from '../src/types';

describe('embed', () => {
  it('no changelog splitting', async () => {
    const fakeInputs: Inputs = makeInputs();
    fakeInputs.changelog_split = "";
    const output = await main.makeEmbed(fakeInputs);
    expect(output).toBeDefined();
    expect(output.embeds[0].fields[0].name).toBe("Changelog");
    expect(output.embeds[0].fields[0].value).toBe(`\`\`\`md\n${fakeInputs.changelog}\n\`\`\``);
  })

  it('changelog splitting', async () => {
    const fakeInputs: Inputs = makeInputs();
    const output = await main.makeEmbed(fakeInputs);
    expect(output).toBeDefined();
    expect(output.embeds[0].fields[0].name).toBe("Changelog");
    expect(output.embeds[0].fields[0].value).not.toContain(fakeInputs.changelog_split);
  })

  it('do not release', async () => {
    const fakeInputs: Inputs = makeInputs();
    fakeInputs.released = false
    const output = await main.makeEmbed(fakeInputs);
    expect(output).toBeDefined();
    expect(output.embeds[0].fields[2].name).toBe("Project Pages");
    expect(output.embeds[0].fields[2].value).not.toContain("\n");
  })

  it('create release', async () => {
    const fakeInputs: Inputs = makeInputs();
    fakeInputs.released = true
    const output = await main.makeEmbed(fakeInputs);
    expect(output).toBeDefined();
    expect(output.embeds[0].fields[2].name).toBe("Project Pages");
    expect(output.embeds[0].fields[2].value).toContain("\n");
  })

  it('has content', async () => {
    const fakeInputs: Inputs = makeInputs();
    const output = await main.makeEmbed(fakeInputs);
    expect(output).toBeDefined();
    expect(output.content).not.toBe("");
    expect(output.content).toContain(fakeInputs.version);
    expect(output.content).toContain(fakeInputs.mention);
    expect(output.content).toContain(fakeInputs.modName);
  })
})


function makeInputs(): Inputs {
  return {
    released: true,
    changelog: "this is a---very long changelog",
    changelog_split: "---",
    version: "1.18.2-2.0.0",
    color: 456789,
    modName: "Example Mod",
    mention: "<@&123456789012345678>",
    parsedLoaders: ["forge", "fabric"],
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