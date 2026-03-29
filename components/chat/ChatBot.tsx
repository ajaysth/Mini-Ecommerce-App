"use client";

import { useState, useRef, useEffect } from "react";
import { FiMessageSquare, FiX, FiSend, FiUser } from "react-icons/fi";
import { FaRobot } from "react-icons/fa";

type Message = {
    role: "user" | "bot";
    content: string;
};

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState<Message[]>([
        { role: "bot", content: "Hi! I'm your AI assistant. How can I help you today?" }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [chat, isOpen, isLoading]);

    const sendMessage = async () => {
        if (!message.trim()) return;

        const userMessage = message;
        setMessage("");
        setChat((prev) => [...prev, { role: "user", content: userMessage }]);
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                body: JSON.stringify({ message: userMessage }),
            });

            if (!res.ok) throw new Error("API error");

            const data = await res.json();
            setChat((prev) => [...prev, { role: "bot", content: data.reply || "Sorry, I couldn't respond." }]);
        } catch {
            setChat((prev) => [...prev, { role: "bot", content: "Error connecting to server." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-black text-white p-4 rounded-full shadow-2xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center hover:shadow-black/20 hover:shadow-lg"
                    aria-label="Open Chat"
                >
                    <FiMessageSquare size={28} />
                </button>
            )}

            {/* Chat Window */}
            <div 
                className={`transition-all duration-300 ease-in-out transform origin-bottom-right ${
                    isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
                } ${isOpen ? 'flex' : 'hidden'} bg-white w-[350px] sm:w-[400px] h-[550px] max-h-[85vh] shadow-2xl rounded-2xl flex-col overflow-hidden border border-gray-200`}
            >
                {/* Header */}
                <div className="bg-black text-white px-5 py-4 flex justify-between items-center shadow-md z-10">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-full">
                            <FaRobot size={22} className="text-white" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm tracking-wide">AI Assistant</h3>
                            <p className="text-xs text-gray-300 flex items-center gap-1.5 mt-0.5">
                                <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                                Online
                            </p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsOpen(false)} 
                        className="text-gray-300 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Close Chat"
                    >
                        <FiX size={24} />
                    </button>
                </div>

                {/* Messages Body */}
                <div className="flex-1 overflow-y-auto p-5 bg-gray-50 flex flex-col gap-4">
                    {chat.map((msg, i) => (
                        <div 
                            key={i} 
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                        >
                            <div className={`flex gap-2 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                {/* Avatar */}
                                <div className="flex-shrink-0 mt-auto">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${msg.role === "user" ? "bg-white border border-gray-200 text-gray-700" : "bg-black text-white"}`}>
                                        {msg.role === "user" ? <FiUser size={14} /> : <FaRobot size={14} />}
                                    </div>
                                </div>
                                {/* Bubble */}
                                <div className={`px-4 py-2.5 rounded-2xl ${
                                    msg.role === "user" 
                                    ? "bg-black text-white rounded-br-none shadow-md" 
                                    : "bg-white text-gray-800 border border-gray-200 shadow-sm rounded-bl-none"
                                }`}>
                                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {isLoading && (
                        <div className="flex justify-start animate-in fade-in duration-300">
                            <div className="flex gap-2 max-w-[85%] flex-row">
                                <div className="flex-shrink-0 mt-auto">
                                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shadow-sm">
                                        <FaRobot size={14} />
                                    </div>
                                </div>
                                <div className="bg-white border border-gray-200 shadow-sm px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-1.5 h-[44px]">
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} className="pt-2" />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-100 z-10">
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-full pl-5 pr-12 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all disabled:opacity-50 disabled:bg-gray-100 shadow-inner"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => { if (e.key === "Enter" && !isLoading && message.trim()) sendMessage(); }}
                            disabled={isLoading}
                        />
                        <button 
                            onClick={sendMessage} 
                            disabled={isLoading || !message.trim()}
                            className="absolute right-2 p-2.5 bg-black text-white rounded-full disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed hover:bg-gray-800 shadow-md transition-all flex items-center justify-center group transform disabled:hover:scale-100 hover:scale-105 active:scale-95"
                            aria-label="Send"
                        >
                            <FiSend size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chatbot;