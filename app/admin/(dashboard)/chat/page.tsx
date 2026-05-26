"use client";

import { useEffect, useState } from "react";

interface ChatMessage {
  role: string;
  content: string;
  timestamp: string;
}

interface ChatSession {
  _id: string;
  phoneNumber: string;
  messages: ChatMessage[];
  updatedAt: string;
}

export default function AdminChatPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetchChats();
  }, []);

  async function fetchChats() {
    setLoading(true);
    try {
      const res = await fetch("/api/conversations");
      const data = await res.json();
      setSessions(Array.isArray(data) ? data : []);
    } catch {
      console.error("Failed");
    } finally {
      setLoading(false);
    }
  }

  const selectedSession = sessions.find((s) => s._id === selected);
  const sorted = [...sessions].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <div className="p-6 h-[calc(100vh-3rem)] flex gap-4">
      <div className="w-72 bg-white rounded-xl shadow-sm overflow-hidden flex flex-col flex-shrink-0">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-semibold text-[#3B2A24] text-sm">Percakapan</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {loading && (
            <p className="text-gray-400 text-center py-8 text-sm">Memuat...</p>
          )}
          {!loading && sorted.length === 0 && (
            <p className="text-gray-400 text-center py-8 text-sm">
              Belum ada percakapan
            </p>
          )}
          {sorted.map((s) => (
            <button
              key={s._id}
              onClick={() => setSelected(s._id)}
              className={`w-full text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${
                selected === s._id ? "bg-[#F3E7DD]" : ""
              }`}
            >
              <p className="text-sm font-medium text-[#3B2A24] truncate">
                {s.phoneNumber}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {s.messages?.length || 0} pesan
              </p>
              <p className="text-[10px] text-gray-300 mt-0.5">
                {new Date(s.updatedAt).toLocaleDateString("id-ID")}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
        {!selectedSession && (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
            Pilih percakapan untuk melihat pesan
          </div>
        )}
        {selectedSession && (
          <>
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-[#3B2A24] text-sm">
                {selectedSession.phoneNumber}
              </h2>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {(!selectedSession.messages ||
                selectedSession.messages.length === 0) && (
                <p className="text-gray-400 text-center text-sm">
                  Tidak ada pesan
                </p>
              )}
              {selectedSession.messages?.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-2.5 rounded-xl text-sm ${
                      msg.role === "user"
                        ? "bg-[#C97B7B] text-white rounded-br-sm"
                        : "bg-gray-100 text-gray-700 rounded-bl-sm"
                    }`}
                  >
                    <p className="text-xs opacity-60 mb-1">
                      {msg.role === "user" ? "User" : "AI"}
                    </p>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
