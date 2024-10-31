import { run, HandlerContext } from "@xmtp/message-kit";
import { handler as agent } from "./handlers/agent.js";
import { handleNotion } from "./handlers/notion.js";
import { downloadPage } from "./lib/notion.js";
import { handlePoap } from "./handlers/poap.js";
import { clearChatHistory } from "./handlers/agent.js";
import fs from "fs";

setupFiles();
run(async (context: HandlerContext) => {
  const {
    typeId,
    content: { content: text },
  } = context.message;

  if (typeId === "text") {
    console.log(text);
    if (text.startsWith("/update")) {
      await handleNotion(context);
      clearChatHistory();
      return;
    } else if (text.startsWith("/poap list")) {
      await handlePoap(context);
      return;
    } else await agent(context);
  }
});

async function setupFiles() {
  const page = await downloadPage();
  fs.writeFileSync("src/data/notion_prompt.md", page);
  fs.writeFileSync(".data/notion_prompt.md", page);
  console.log("Notion DB updated");
}
