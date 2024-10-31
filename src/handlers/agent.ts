import { HandlerContext } from "@xmtp/message-kit";
import { textGeneration } from "../lib/openai.js";
import { readPromptFile } from "../lib/notion.js";
import { processResponseWithIntent } from "../lib/openai.js";

let chatHistories: Record<string, any[]> = {};

export async function handler(context: HandlerContext) {
  if (!process?.env?.OPEN_AI_API_KEY) {
    console.log("No OPEN_AI_API_KEY found in .env");
    return;
  }

  const {
    message: {
      content: { content, params },
      sender,
    },
    group,
  } = context;

  try {
    let userPrompt = params?.prompt ?? content;
    const { reply, history } = await textGeneration(
      userPrompt,
      await readPromptFile(sender.address),
      chatHistories[sender.address]
    );
    console.log(reply);
    if (!group) chatHistories[sender.address] = history; // Update chat history for the user

    chatHistories[sender.address] = await processResponseWithIntent(
      reply,
      context,
      sender.address,
      chatHistories[sender.address]
    );
  } catch (error) {
    console.error("Error during OpenAI call:", error);
    await context.send("An error occurred while processing your request.");
  }
}

export async function clearChatHistory() {
  chatHistories = {};
}
