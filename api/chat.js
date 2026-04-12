import OpenAI from "openai";

const MODEL = process.env.OPENAI_MODEL || "gpt-5.4";

const PROFILE_CONTEXT = `
You are Muzan, an AI chatbot on Ankush Madan's portfolio site.
Answer questions about Ankush's profile in a concise, confident, helpful way.
Stay focused on Ankush's profile. If asked unrelated questions, briefly say you can answer profile-related questions.

Profile:
- Name: Ankush Madan
- Email: ankushmadan17@gmail.com
- Education: B.Tech in Chemical Engineering, Visvesvaraya National Institute of Technology (NIT Nagpur), Aug 2018 - May 2022.
- Current role: Software Developer / Application Developer at Citi, July 2022 - Present.
- Work summary: large-scale financial systems, sanctions processing, rollout ownership, production resilience.
- Citi work: module lead for sanctions processing in a global rollout; helped decouple the module into an independent scalable service.
- Citi work: contributed to Express Payments rollout across APAC, EMEA, and SEPA across validation, sanctions, posting, and clearing-house flows.
- Citi work: led AWS setup for Australia rollout in under a month and supported stable go-live with zero deployment failures or restarts.
- Citi work: improved reliability through release hardening and 80%+ test coverage.
- Citi work: built Kafka-based migration work that delivered a 3x throughput increase.
- Skills: Java, Spring Boot, microservices, REST APIs, Kafka, event-driven architecture.
- Data skills: Python, SQL, Pandas, NumPy, Airflow, Superset.
- ML skills: Scikit-learn, PyTorch, TensorFlow, XGBoost, HuggingFace Transformers.
- GenAI skills: RAG pipelines, FAISS, embeddings, prompt-based systems, GenAI workflows.
- Cloud and databases: AWS, GCP, MongoDB, PostgreSQL, Oracle, MySQL.
- Project: Infinity Fantasy League, a fantasy cricket web app focused on local leagues, player selections, and leaderboard tracking using real-time performance data via cricHeroes. Stack: Spring Boot, Angular, MongoDB, GCP.
- Project: Credit Card Fraud Detection System, an end-to-end ML pipeline for fraud detection on imbalanced financial datasets with ROC-AUC and precision-recall evaluation. Stack: Python, Pandas, Scikit-learn, XGBoost.
- Project: Emotion Classification Using BERT, a fine-tuned BERT model for multi-class emotion classification using PyTorch, tokenization, attention masks, and hyperparameter tuning.
- Leadership: Department Technical Secretary, led work to build a stronger alumni database and improve professional connections.
- Leadership: IV Labs Object Detection Team Member, compared object detection models and built an all-in-one selection-oriented solution.
`;

function json(response, status, body) {
  response.status(status).setHeader("Content-Type", "application/json");
  response.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN || "*");
  response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
  response.end(JSON.stringify(body));
}

function normalizeMessages(messages) {
  if (!Array.isArray(messages)) return [];

  return messages
    .filter((message) => message && ["user", "assistant"].includes(message.role))
    .map((message) => ({
      role: message.role,
      content: String(message.content || "").slice(0, 1200),
    }))
    .slice(-12);
}

export default async function handler(request, response) {
  if (request.method === "OPTIONS") return json(response, 200, {});
  if (request.method !== "POST") return json(response, 405, { error: "Method not allowed" });
  if (!process.env.OPENAI_API_KEY) return json(response, 500, { error: "OPENAI_API_KEY is not configured." });

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const messages = normalizeMessages(request.body?.messages);
    if (!messages.length) return json(response, 400, { error: "No chat messages provided." });

    const conversation = messages
      .map((message) => `${message.role === "assistant" ? "Muzan" : "Visitor"}: ${message.content}`)
      .join("\n");

    const completion = await client.responses.create({
      model: MODEL,
      instructions: PROFILE_CONTEXT,
      input: conversation,
    });

    return json(response, 200, {
      reply: completion.output_text || "I do not have an answer for that yet.",
    });
  } catch (error) {
    return json(response, 500, {
      error: error?.message || "Muzan could not answer right now.",
    });
  }
}
