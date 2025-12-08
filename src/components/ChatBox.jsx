import React, { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "arcade_chat_messages_v1";

function timeAgo(ts) {
  const seconds = Math.floor((Date.now() - ts) / 1000);
  if (seconds < 10) return "just now";
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo`;
  const years = Math.floor(months / 12);
  return `${years}y`;
}

function Avatar({ name }) {
  const initials = (name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="avatar w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-sm font-bold text-white/90">
      {initials}
    </div>
  );
}

export default function ChatBox() {
  const [username, setUsername] = useState(() => {
    try {
      return localStorage.getItem("arcade_chat_name") || "";
    } catch {
      return "";
    }
  });
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const listRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
    if (listRef.current) {
      listRef.current.scrollTo({ top: listRef.current.scrollHeight + 200, behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem("arcade_chat_name", username);
    } catch {}
  }, [username]);

  function handleSend(e) {
    e?.preventDefault();
    if (!username.trim() || !message.trim()) return;
    const newMsg = {
      id: Date.now() + Math.random(),
      username: username.trim(),
      text: message.trim(),
      ts: Date.now(),
    };
    setMessages((prev) => [...prev, newMsg]);
    setMessage("");
  }

  function onKeyDownMessage(e) {
    // Enter to send, Shift+Enter for newline
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="chat-root max-w-2xl mx-auto">
      {/* header */}
      <div className="chat-header">CHATBOX</div>

      {/* card */}
      <div className="pixel-card rounded-b-lg overflow-hidden mt-0 shadow-lg">
        <div className="flex flex-col">
          {/* messages list */}
          <div
            ref={listRef}
            className="cbx-list chat-scrollbar overflow-y-auto px-3 py-3 bg-neutral-900 text-white/90"
            style={{ borderTop: "1px solid rgba(255,255,255,0.02)" }}
          >
            {messages.length === 0 ? (
              <div className="text-center text-white/40 py-6 font-terminal">No messages yet — say hi!</div>
            ) : (
              messages.map((m) => (
                <div key={m.id} className="message-row">
                  <Avatar name={m.username} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="username font-pixel">{m.username}</div>
                      <div className="timestamp font-terminal">{timeAgo(m.ts)}</div>
                    </div>
                    <div className="text mt-1 font-terminal">{m.text}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* === NEW: two-row input area === */}
          <form onSubmit={handleSend} className="chat-form px-3 py-3 bg-neutral-800/80 border-t border-white/6">
            {/* Row 1: full-width name input */}
            <div className="form-row-first">
              <input
                aria-label="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="name"
                className="username-input-full"
              />
            </div>

            {/* Row 2: message textarea (left) + send button (right) */}
            <div className="form-row-second">
              <textarea
                aria-label="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={onKeyDownMessage}
                placeholder="message"
                rows={2}
                className="message-input"
              />

              <button
                type="submit"
                className="send-btn"
                aria-label="Send message"
              >
                SEND
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
