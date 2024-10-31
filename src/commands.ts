import type { CommandGroup } from "@xmtp/message-kit";

export const commands: CommandGroup[] = [
  {
    name: "Notion",
    description: "Update your Notion prompt.",
    commands: [
      {
        command: "/update",
        triggers: ["/update"],
        handler: undefined,
        description: "Update your Notion prompt.",
        params: {},
      },
    ],
  },
];
