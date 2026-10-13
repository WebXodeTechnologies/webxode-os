"use client";

import React, { useState, useEffect } from "react";
import { MessageSidebar, ChatThread } from "@/components/messages/MessageSidebar";
import { ChatAreaHeader } from "@/components/messages/ChatAreaHeader";
import { MessageBubbleList, MessageItem } from "@/components/messages/MessageBubbleList";
import { MessageInputBar } from "@/components/messages/MessageInputBar";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";
export default function InternalMessengerPage() {
  const [activeThreadId, setActiveThreadId] = useState<string>("chan-1");

  // Sample channels & team members
  const threads: ChatThread[] = [
    { id: "chan-1", name: "general-engineering", type: "channel", unreadCount: 2 },
    { id: "chan-2", name: "finance-and-gst", type: "channel" },
    {
      id: "dm-1",
      name: "Priya S. (Lead Developer)",
      type: "dm",
      department: "Engineering",
      isOnline: true,
    },
    {
      id: "dm-2",
      name: "Murugan P. (Finance Head)",
      type: "dm",
      department: "Finance",
      isOnline: false,
    },
    {
      id: "dm-3",
      name: "Ananya Ramesh (UI/UX Lead)",
      type: "dm",
      department: "Design",
      isOnline: true,
    },
  ];

  const currentActiveThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  const [messages, setMessages] = useState<Record<string, MessageItem[]>>({
    "chan-1": [
      {
        id: "m1",
        senderName: "Priya S.",
        senderRole: "Lead Developer",
        text: "Team, MongoDB indexing for Annai Agro is complete 🚀",
        timestamp: "10:15 AM",
        isMe: false,
        reactions: ["👍 2", "🔥 1"],
      },
      {
        id: "m2",
        senderName: "Akash S M",
        senderRole: "Founder",
        text: "Great work! Let's schedule the production deployment for tonight.",
        timestamp: "10:20 AM",
        isMe: true,
        reactions: ["🚀 1"],
      },
    ],
    "chan-2": [
      {
        id: "m1",
        senderName: "Murugan P.",
        senderRole: "Finance",
        text: "GSTIN validation endpoints are verified for all new client registrations.",
        timestamp: "Yesterday",
        isMe: false,
        reactions: ["✅ 3"],
      },
    ],
    "dm-1": [
      {
        id: "m1",
        senderName: "Priya S.",
        senderRole: "Lead Developer",
        text: "Akash, reviewed the new Next.js App Router layout components.",
        timestamp: "9:30 AM",
        isMe: false,
        reactions: [],
      },
    ],
  });

  // Active Socket.io connection setup
  useEffect(() => {
    const socket = io({
      path: "/api/socket", // Standard Next.js custom server or WebSocket endpoint path
      addTrailingSlash: false,
    });

    socket.on("connect", () => {
      console.log("Connected to Socket.io server:", socket.id);
    });

    socket.on("receive-message", (incomingMessage: MessageItem) => {
      setMessages((prev) => ({
        ...prev,
        [activeThreadId]: [...(prev[activeThreadId] || []), incomingMessage],
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, [activeThreadId]);

  const handleSendMessage = (text: string) => {
    const newMessage: MessageItem = {
      id: `msg-${Date.now()}`,
      senderName: "Akash S M",
      senderRole: "Founder & Full-Stack",
      text,
      timestamp: "Just now",
      isMe: true,
      reactions: [],
    };

    setMessages((prev) => ({
      ...prev,
      [activeThreadId]: [...(prev[activeThreadId] || []), newMessage],
    }));

    toast.success("Message dispatched via Socket.io");
  };

  const handleAddReaction = (messageId: string, emoji: string) => {
    setMessages((prev) => {
      const threadMsgs = prev[activeThreadId] || [];
      const updated = threadMsgs.map((m) => {
        if (m.id === messageId) {
          return { ...m, reactions: [...m.reactions, `${emoji} 1`] };
        }
        return m;
      });
      return { ...prev, [activeThreadId]: updated };
    });
    toast.success(`Reaction ${emoji} added!`);
  };

  return (
    <div className="flex h-[calc(100vh-140px)] gap-6 overflow-hidden">
      <MessageSidebar
        threads={threads}
        activeThreadId={activeThreadId}
        onSelectThread={setActiveThreadId}
      />

      <div className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-xs">
        <ChatAreaHeader
          title={currentActiveThread.name}
          subtitle={
            currentActiveThread.type === "channel"
              ? "Public channel for team collaboration"
              : `Direct message with ${currentActiveThread.department} team`
          }
          isChannel={currentActiveThread.type === "channel"}
          phone="+919842355110"
          email="contact@webxode.com"
        />

        <MessageBubbleList
          messages={messages[activeThreadId] || []}
          onAddReaction={handleAddReaction}
        />

        <MessageInputBar onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}
