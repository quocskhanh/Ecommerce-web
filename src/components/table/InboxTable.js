import React, { useState } from "react";

const mockConversations = [
    {
        id: 1,
        name: "Tom Anderson",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        message: "Hello, I'm interested in this item...",
        time: "12:24 AM",
        isActive: false,
    },
    {
        id: 2,
        name: "Luis Pittman",
        avatar: "https://randomuser.me/api/portraits/men/2.jpg",
        message: "Hi, can I ask if there is anything...",
        time: "10:50 AM",
        isActive: true,
    },
    {
        id: 3,
        name: "Alison Mack",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        message: "I want to complain about item...",
        time: "Yesterday",
        isActive: false,
    },
    {
        id: 4,
        name: "Barry George",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        message: "Is there any chance to get a refund...",
        time: "Yesterday",
        isActive: false,
    },
];

const mockMessages = {
    2: [
        {
            id: 1,
            sender: "Luis Pittman",
            avatar: "https://randomuser.me/api/portraits/men/2.jpg",
            message: "Hi, I wonder if there is going to be anything new for spring?",
            time: "12:24 AM",
            isUser: false,
        },
        {
            id: 2,
            sender: "You",
            avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
            message: "Hi Luis, can you please be more specific?",
            time: "12:31 AM",
            isUser: true,
        },
    ],
};

const InboxTable = () => {
    const [conversations, setConversations] = useState(mockConversations);
    const [messages, setMessages] = useState(mockMessages);
    const [activeConversation, setActiveConversation] = useState(2);
    const [newMessage, setNewMessage] = useState("");

    const handleConversationClick = (id) => {
        setActiveConversation(id);
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const newMsg = {
                id: messages[activeConversation].length + 1,
                sender: "You",
                avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
                message: newMessage,
                time: "Now",
                isUser: true,
            };
            setMessages({
                ...messages,
                [activeConversation]: [...messages[activeConversation], newMsg],
            });
            setNewMessage("");
        }
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/4 bg-white border-r">
                <div className="p-4 border-b">
                    <div className="flex items-center border px-3 py-2 rounded-md bg-gray-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#5f6368"
                            className="mr-2"
                        >
                            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-transparent focus:outline-none"
                        />
                    </div>
                </div>
                <div>
                    {conversations.map((conv) => (
                        <div
                            key={conv.id}
                            className={`p-4 border-b cursor-pointer flex items-center gap-3 ${
                                conv.id === activeConversation ? "bg-gray-200" : ""
                            }`}
                            onClick={() => handleConversationClick(conv.id)}
                        >
                            <img
                                src={conv.avatar}
                                alt={conv.name}
                                className="h-10 w-10 rounded-full"
                            />
                            <div>
                                <p className="font-medium">{conv.name}</p>
                                <p className="text-sm text-gray-500 truncate">{conv.message}</p>
                                <p className="text-xs text-gray-400">{conv.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Conversation View */}
            <div className="w-3/4 flex flex-col">
                {/* Header */}
                <div className="p-4 bg-white border-b flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img
                            src={
                                conversations.find((conv) => conv.id === activeConversation)
                                    ?.avatar
                            }
                            alt="Avatar"
                            className="h-10 w-10 rounded-full"
                        />
                        <div>
                            <h2 className="font-medium">
                                {conversations.find((conv) => conv.id === activeConversation)
                                    ?.name || ""}
                            </h2>
                            <p className="text-sm text-green-500 flex items-center">
                                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> Online
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
        <span>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
            </svg>
        </span>
                        <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
        </span>
                        <span>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
                <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/>
            </svg>
        </span>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4">
                    {messages[activeConversation]?.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex items-start ${
                                msg.isUser ? "justify-end" : "justify-start"
                            } mb-4`}
                        >
                            {!msg.isUser && (
                                <img
                                    src={msg.avatar}
                                    alt={msg.sender}
                                    className="h-8 w-8 rounded-full mr-2"
                                />
                            )}
                            <div
                                className={`max-w-md p-3 rounded-lg ${
                                    msg.isUser
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-900"
                                }`}
                            >
                                <p>{msg.message}</p>
                                <p className="text-xs mt-1">{msg.time}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className={`px-4 py-2 rounded-md ${
                            newMessage.trim()
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                        Send
                    </button>
                </div>

            </div>
        </div>
    );
};

export default InboxTable;
