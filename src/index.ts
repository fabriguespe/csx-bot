import { run, HandlerContext } from "@xmtp/message-kit";
import { handler as agent } from "./handlers/agent.js";
import { updatePromptFile } from "./lib/notion.js";
import { clearChatHistory } from "./handlers/agent.js";

run(async (context: HandlerContext) => {
  const {
    typeId,
    content: { content: text, command },
  } = context.message;

  if (typeId === "text") {
    console.log(text);
    if (command === "update") {
      const success = await updatePromptFile();
      if (success) await context.reply("Notion DB updated");
      else await context.reply("Error updating Notion DB");
      clearChatHistory();
    } else await agent(context);
  }
});
