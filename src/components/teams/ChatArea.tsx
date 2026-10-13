"use client";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
}

interface ChatAreaProps {
  messages: Message[];
  currentUserId: string;
}

export default function ChatArea({ messages, currentUserId }: ChatAreaProps) {
  return (
    <div className="flex-1 space-y-4 overflow-y-auto bg-zinc-900/30 p-6">
      {messages.map((msg) => {
        const isMe = msg.senderId === currentUserId;
        return (
          <div key={msg.id} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
            <span className="mb-1 px-1 text-xs text-zinc-500">
              {msg.senderName} • {msg.timestamp}
            </span>
            <div
              className={`max-w-md rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                isMe
                  ? "rounded-br-none bg-indigo-600 text-white"
                  : "rounded-bl-none border border-zinc-800 bg-zinc-900 text-zinc-200"
              }`}
            >
              {msg.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
