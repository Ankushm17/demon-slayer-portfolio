import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "muzan_profile_chat_v1";
const MUZAN_AVATAR_SRC = `${import.meta.env.BASE_URL}muzan-avatar.jpg`;
const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL || "/api/chat";
const SUGGESTED_PROMPTS = [
  "What does Ankush do?",
  "Tell me about his Citi work",
  "What are his best projects?",
  "What skills does he have?",
];

const DEFAULT_MESSAGES = [
  {
    id: "muzan-welcome-message",
    role: "assistant",
    username: "Muzan",
    text: "I am Muzan. Ask me about Ankush Madan's experience, skills, projects, education, or contact details.",
    avatarSrc: MUZAN_AVATAR_SRC,
    ts: 0,
  },
];

function createMessage(role, text) {
  return {
    id: `${role}-${Date.now()}-${Math.random()}`,
    role,
    username: role === "assistant" ? "Muzan" : "You",
    text,
    avatarSrc: role === "assistant" ? MUZAN_AVATAR_SRC : "",
    ts: Date.now(),
  };
}

function timeAgo(ts) {
  if (!ts) return "summons";
  const seconds = Math.floor((Date.now() - ts) / 1000);
  if (seconds < 10) return "just now";
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

function parseBold(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

function renderMarkdown(text) {
  const lines = text.split('\n');
  const elements = [];
  let listItems = [];

  lines.forEach((line, i) => {
    const isBullet = /^[-*]\s/.test(line.trim());

    if (isBullet) {
      const content = line.trim().replace(/^[-*]\s/, '');
      listItems.push(<li key={i}>{parseBold(content)}</li>);
    } else {
      if (listItems.length) {
        elements.push(<ul key={`ul-${i}`} className="msg-list">{listItems}</ul>);
        listItems = [];
      }
      if (line.trim()) {
        elements.push(<p key={i} className="msg-para">{parseBold(line)}</p>);
      }
    }
  });

  if (listItems.length) {
    elements.push(<ul key="ul-end" className="msg-list">{listItems}</ul>);
  }

  return elements.length ? elements : text;
}

function Avatar({ name, src }) {
  const initials = (name || "U").slice(0, 2).toUpperCase();

  return (
    <div className="avatar">
      {src ? <img src={src} alt="" className="avatar__image" /> : initials}
    </div>
  );
}

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState(() => {
    try {
      const storedMessages = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      return Array.isArray(storedMessages) && storedMessages.length ? storedMessages : DEFAULT_MESSAGES;
    } catch {
      return DEFAULT_MESSAGES;
    }
  });

  const listRef = useRef(null);

  useEffect(() => {
    const normalizedMessages = messages.map((item) =>
      item.role === "assistant" ? { ...item, avatarSrc: MUZAN_AVATAR_SRC } : item
    );

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedMessages));
    } catch {}

    if (listRef.current) {
      listRef.current.scrollTo({ top: listRef.current.scrollHeight + 200, behavior: "smooth" });
    }
  }, [messages]);

  async function sendQuestion(question) {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || isLoading) return;

    const userMessage = createMessage("user", trimmedQuestion);
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, text }) => ({ role, content: text })),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Muzan is silent right now.");

      setMessages((prev) => [...prev, createMessage("assistant", data.reply)]);
    } catch {
      setMessages((prev) => [
        ...prev,
        createMessage(
          "assistant",
          "I don't have the power to answer this question, please reach out to Ankush at ankushmadan17@gmail.com"
        ),
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSend(e) {
    e.preventDefault();
    sendQuestion(message);
  }

  function onKeyDownMessage(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendQuestion(message);
    }
  }

  return (
    <div className="chat-root">
      <div className="muzan-panel">
        <img src={MUZAN_AVATAR_SRC} alt="" className="muzan-panel__portrait" />
        <div className="muzan-panel__copy">
          <p className="muzan-panel__eyebrow">AI Demon</p>
          <h3 className="muzan-panel__title">Muzan</h3>
          <p className="muzan-panel__text">
            Ask about Ankush&apos;s work, projects, stack, education, or how to reach him.
          </p>
        </div>
        <div className={`muzan-panel__status${isLoading ? " muzan-panel__status--active" : ""}`}>
          {isLoading ? "Thinking" : "Online"}
        </div>
      </div>

      <div className="pixel-card">
        <div
          ref={listRef}
          className="cbx-list chat-scrollbar"
          style={{ borderTop: "1px solid rgba(255,255,255,0.02)" }}
        >
          {messages.map((item) => (
            <div key={item.id} className={`message-row message-row--${item.role}`}>
              <Avatar name={item.username} src={item.avatarSrc} />
              <div className="message-content">
                <div className="message-meta">
                  <div className="username">{item.username}</div>
                  <div className="timestamp">{timeAgo(item.ts)}</div>
                </div>
                <div className="text">{renderMarkdown(item.text)}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message-row message-row--assistant">
              <Avatar name="Muzan" src={MUZAN_AVATAR_SRC} />
              <div className="message-content">
                <div className="message-meta">
                  <div className="username">Muzan</div>
                  <div className="timestamp">now</div>
                </div>
                <div className="text text--thinking">Reading Ankush&apos;s records...</div>
              </div>
            </div>
          )}
        </div>

        <div className="chat-prompts" aria-label="Suggested questions">
          {SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              className="prompt-chip"
              onClick={() => sendQuestion(prompt)}
              disabled={isLoading}
            >
              {prompt}
            </button>
          ))}
        </div>

        <form onSubmit={handleSend} className="chat-form">
          <div className="form-row-second">
            <textarea
              aria-label="Ask Muzan about Ankush"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={onKeyDownMessage}
              placeholder="Ask Muzan about Ankush..."
              rows={2}
              className="message-input"
              disabled={isLoading}
            />

            <button type="submit" className="send-btn" aria-label="Send question" disabled={isLoading}>
              {isLoading ? "THINKING" : "ASK"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
