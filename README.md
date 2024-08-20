# Create Discord Embed

[![Continuous Integration](https://github.com/tristankechlo/create-discord-embed/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/tristankechlo/create-discord-embed/actions/workflows/ci.yml)

creates the json-representation of a custom discord embed, used in my workflows

## Usage

```yaml
- name: Create the discord embed
  uses: tristankechlo/create-discord-embed@v1.0.1
  with:
# required values
    released: true
    changelog: "full changelog of this release"
    version: "1.20.4 - 2.0.0"
    color: 27392
    title: "This will be the title of the embed"
    description: "Description/Subtitle of the embed"
    curseforge: "link to the curseforge page of the project"
    modrinth: "link to the modrinth page of the project"
    github: "link to the github repo of the project"
    thumbnail: "link to an image, used as a thumbnail in the embed"
# optional values
    content: "This is the message above the embed"
    filename: "embed.json"
    curseforge-emoji: "<:curseforge:938093919848267807>"
    modrinth-emoji: "<:modrinth:977251171980963890>"
    github-emoji: "<:github:938091396785639434>"
    username: "the username of the webhook"
    avatar-url: "link to an image, used as the profile pic of the webhook message"
    changelog-split: "if set, the provided changelog will be split at this position, only the first match will be used"
```
