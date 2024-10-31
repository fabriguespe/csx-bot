import type { CommandGroup } from "@xmtp/message-kit";
import { handlePoap } from "./handlers/poap.js";
import { handleNotion } from "./handlers/notion.js";

export const commands: CommandGroup[] = [
  {
    name: "Poap Bot",
    description: "Get your POAP.",
    commands: [
      {
        command: "/poap [address]",
        handler: handlePoap,
        triggers: ["/poap"],
        description: "Get your POAP.",
        params: {
          address: {
            type: "string",
          },
        },
      },
      {
        command: "/poap list",
        handler: handlePoap,
        triggers: ["/poap list"],
        description: "List all POAPs.",
        params: {},
      },
    ],
  },
  {
    name: "Notion",
    description: "Update your Notion prompt.",
    commands: [
      {
        command: "/update",
        triggers: ["/update"],
        handler: handleNotion,
        description: "Update your Notion prompt.",
        params: {},
      },
    ],
  },
];
