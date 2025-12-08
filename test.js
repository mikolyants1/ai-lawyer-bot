const { createAgent, HumanMessage, tool } = require('langchain');
const { OpenAIEmbeddings, ChatOpenAI } = require('@langchain/openai');
const { Pinecone } = require('@pinecone-database/pinecone');
const { PineconeStore } = require('@langchain/pinecone');
const { z } = require('zod');

const OPENROUTER_KEY = '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';

const PINECONE_KEY = 'pcsk_6Ynaz9_KHEQckLaVNDeGwsPxkbGsa8vHUqcYmyxAEdWLKdVEfK7TBW54DVzFBst7hTvECq';

const LAW_INDEX = 'law-index';

const embeddings = new OpenAIEmbeddings({
  model: 'openai/text-embedding-3-small',
  apiKey: OPENROUTER_KEY,
  configuration: {
    baseURL: 'https://openrouter.ai/api/v1',
  },
});

const llm = new ChatOpenAI({
  model: 'openai/gpt-oss-20b:free',
  temperature: 0.3,
  apiKey: OPENROUTER_KEY,
  configuration: {
    baseURL: 'https://openrouter.ai/api/v1',
  },
});

const pinecone = new Pinecone({
  apiKey: PINECONE_KEY,
});

const main = async () => {
  const index = pinecone.Index(LAW_INDEX);

  const store = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex: index,
  });

  const pineconeTool = tool(
    async ({ query }) => {
      const retriever = store.asRetriever({ k: 5 });
      const result = await retriever.invoke(query);
      return result.map(d => d.pageContent).join('\n\n');
    },
    {
      name: 'pinecone_tool',
      description: 'Search relevant legal information by semantic vector request.',
      schema: z.object({
        query: z.string(),
      }),
    },
  );

  const agent = createAgent({
    model: llm,
    tools: [pineconeTool],
    systemPrompt: '',
  });
  const answer = await agent.invoke({
    messages: [new HumanMessage('how old trump ?')],
  });
  console.log(answer);
};

main();
