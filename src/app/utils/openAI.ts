import { OpenAI } from 'openai'

import * as dotenv from 'dotenv'
import { AssistantCreateParams } from 'openai/resources/beta/assistants/assistants.mjs'

dotenv.config()

const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

type Props = {
  name: string,
  instructions: string,
  fileId: string[],
  assistantId: string,
  threadId: string
}

export const createAssistant = async ({name, instructions, fileId}: Props) => {
  const assistant = await openAi.beta.assistants.create({
    name: name,
    instructions:  instructions,
    file_ids: fileId,
    model: 'gpt-4-0125-preview'
  })

  return assistant
}

export const runAssistant  = async ({ instructions, threadId, assistantId }: Props) => {
  const run = await openAi.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
    instructions: instructions
  })

  return run
}

export const getAssistant = async ({assistantId}: Props) => {
  const assistant = await openAi.beta.assistants.retrieve(assistantId)
  return assistant
}

export const deleteAssistant = async ({ assistantId }: Props) => {
  const response = async () => {

  }
  
  return response
}