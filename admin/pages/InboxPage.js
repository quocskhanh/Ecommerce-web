import React, { useState } from "react";
import LayoutDashboard from "../layout/LayoutDashboard";
import { useNavigate } from "react-router-dom";

const mockConversations = [
    { id: 1, name: "Tom Anderson", avatar: "https://randomuser.me/api/portraits/men/1.jpg", message: "Hello, I'm interested in this item...", time: "12:24 AM", online: true },
    { id: 2, name: "Luis Pittman", avatar: "https://randomuser.me/api/portraits/men/2.jpg", message: "Hi, can I ask if there is anything...", time: "10:50 AM", online: true },
    { id: 3, name: "Alison Mack", avatar: "https://randomuser.me/api/portraits/women/1.jpg", message: "I want to complain about item...", time: "Yesterday", online: false },
    { id: 4, name: "Barry George", avatar: "https://randomuser.me/api/portraits/men/3.jpg", message: "Is there any chance to get a refund...", time: "Yesterday", online: false },
    { id: 5, name: "Barry George", avatar: "https://randomuser.me/api/portraits/men/3.jpg", message: "Is there any chance to get a refund...", time: "Yesterday", online: false },
];

const mockMessages = {
    2: [
        { id: 1, sender: "Luis Pittman", avatar: "https://randomuser.me/api/portraits/men/2.jpg", message: "Hi, I wonder if there is going to be anything new for spring?", time: "12:24 AM" },
        { id: 2, sender: "You", avatar: "https://randomuser.me/api/portraits/lego/1.jpg", message: "Hi Luis, can you please be more specific?", time: "12:31 AM" },
        { id: 3, sender: "Luis Pittman", avatar: "https://randomuser.me/api/portraits/men/2.jpg", message: "Sure, I want to know when the new spring collection for men is coming.", time: "12:35 AM" },
        { id: 4, sender: "You", avatar: "https://randomuser.me/api/portraits/lego/1.jpg", message: "Thank you for taking interest in our upcoming products. You can have a look at the upcoming collection in our blog post.", time: "12:45 AM" },
    ],
};

const InboxPage = () => {
    const [activeConversation, setActiveConversation] = useState(2);
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState(mockMessages);

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
        const newMsg = {
            id: (messages[activeConversation]?.length || 0) + 1,
            sender: "You",
            avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
            message: newMessage,
            time: "Now",
        };
        setMessages((prev) => ({
            ...prev,
            [activeConversation]: [...(prev[activeConversation] || []), newMsg],
        }));
        setNewMessage("");
    };

    const navigate = useNavigate();

    const activeUser = mockConversations.find((conv) => conv.id === activeConversation);

    return (
        <LayoutDashboard>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Inbox</h1>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        onClick={() => navigate("/product/add-product")}
                    >
                        + Add Message
                    </button>
                </div>
                <div className="flex h-screen bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Conversations List */}
                    <div className="p-4 border-b">
                        <header className="w-[293px] text-[#131523] text-base font-bold leading-normal mb-10">Conversations</header>
                        <div className="relative mb-10">
                            {/* Icon Search */}
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
                                 height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                            {/* Input Search */}
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full px-10 py-2 bg-gray-100 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>


                    {mockConversations.map((conv) => (
                            <div
                                key={conv.id}
                                onClick={() => setActiveConversation(conv.id)}
                                className={`p-4 border-b flex items-center gap-3 cursor-pointer hover:bg-gray-200 ${
                                    conv.id === activeConversation ? "bg-gray-200" : ""
                                }`}
                            >
                                <div className="relative">
                                    <img src={conv.avatar} alt={conv.name} className="h-10 w-10 rounded-full" />
                                    {conv.online && (
                                        <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></span>
                                    )}
                                </div>
                                <div>
                                    <p className="font-medium truncate">{conv.name}</p>
                                    <p className="text-sm text-gray-500 truncate">{conv.message}</p>
                                    <p className="text-xs text-gray-400">{conv.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Active Conversation */}
                    <div className="w-3/4 flex flex-col bg-gray-50">
                        {/* Header */}
                        <div className="p-4 bg-white border-b flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img
                                        src={activeUser?.avatar}
                                        alt={activeUser?.name}
                                        className="h-10 w-10 rounded-full"
                                    />
                                    {activeUser?.online && (
                                        <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-white rounded-full"></span>
                                    )}
                                </div>
                                <div>
                                    <h2 className="font-medium text-lg">{activeUser?.name}</h2>
                                    <p className="text-sm text-gray-500">{activeUser?.online ? "Online" : "Offline"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    className="p-2  bg-gray-200 text-white rounded-full hover:bg-gray-100"
                                    title="Start Video Call"
                                >
                                    <span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="icon">
<path id="color" fill-rule="evenodd" clip-rule="evenodd" d="M15 5L17 9L20.4855 6.9087C20.9591 6.62455 21.5733 6.77811 21.8575 7.25169C21.9507 7.40711 22 7.58495 22 7.76619V16.2338C22 16.7861 21.5523 17.2338 21 17.2338C20.8188 17.2338 20.6409 17.1846 20.4855 17.0913L17 15L15 19H4C2.89543 19 2 18.1046 2 17V7C2 5.89543 2.89543 5 4 5H15ZM17 11H16L13.929 7H4V17H13.928L16 13H17L20 14.468V9.531L17 11Z" fill="#7E84A3"/>
</g>
</svg>

                                    </span>
                                </button>
                                <button
                                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                                    title="View Profile"
                                >
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
                                    </span>
                                </button>
                                <button
                                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                                    title="Settings"
                                >
                                    <span>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="icon">
<path id="color" fill-rule="evenodd" clip-rule="evenodd" d="M13.5 2L16 5L20 5.5L22 8.5L20 12L22 15.5L20 18.5L16 19L13.5 22H10.5L8 19L4 18.5L2 15.5L4 12L2 8.5L4 5.5L8 5L10.5 2H13.5ZM12.562 3.999H11.437L9.0312 6.88666L5.156 7.37L4.35 8.581L6.3035 12L4.35 15.418L5.156 16.629L9.0312 17.1133L11.436 19.999H12.563L14.9688 17.1133L18.843 16.629L19.649 15.418L17.6965 12L19.649 8.581L18.843 7.37L14.9688 6.88666L12.562 3.999ZM12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8ZM12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10Z" fill="#7E84A3"/>
</g>
</svg>

                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages[activeConversation]?.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"} items-start`}
                                >
                                    {msg.sender !== "You" && (
                                        <img
                                            src={msg.avatar}
                                            alt={msg.sender}
                                            className="h-8 w-8 rounded-full mr-2"
                                        />
                                    )}
                                    <div
                                        className={`max-w-md p-3 rounded-lg shadow ${
                                            msg.sender === "You"
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-200 text-gray-900"
                                        }`}
                                    >
                                        <p>{msg.message}</p>
                                        <p className="text-xs mt-1 text-gray-400">{msg.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Message Input */}
                        <div className="p-4 bg-white border-t flex items-center gap-2">
                            {/* Button to Add File or Image */}
                            <button className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M330-240q-104 0-177-73T80-490q0-104 73-177t177-73h370q75 0 127.5 52.5T880-560q0 75-52.5 127.5T700-380H350q-46 0-78-32t-32-78q0-46 32-78t78-32h370v80H350q-13 0-21.5 8.5T320-490q0 13 8.5 21.5T350-460h350q42-1 71-29.5t29-70.5q0-42-29-71t-71-29H330q-71-1-120.5 49T160-490q0 70 49.5 119T330-320h390v80H330Z"/></svg>
                            </button>

                            {/* Input for Typing Messages */}
                            <input
                                type="text"
                                placeholder="Your message..."
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            {/* Send Button */}
                            <button
                                onClick={handleSendMessage}
                                disabled={!newMessage.trim()}
                                className={`px-4 py-2 rounded-md ${newMessage.trim() ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </LayoutDashboard>
    );
};

export default InboxPage;
