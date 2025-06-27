
import { useState } from "react";
import { Send, Users, MessageSquare, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const ChatRoom = () => {
  const [selectedRoom, setSelectedRoom] = useState("general");
  const [message, setMessage] = useState("");

  const chatRooms = [
    { id: "general", name: "General Study", members: 45, online: 12 },
    { id: "math", name: "Mathematics Help", members: 28, online: 8 },
    { id: "science", name: "Science Discussion", members: 32, online: 15 },
    { id: "languages", name: "Language Exchange", members: 19, online: 6 },
  ];

  const messages = [
    {
      id: 1,
      user: "Alex Thompson",
      avatar: "/placeholder.svg",
      message: "Hey everyone! Working on calculus derivatives, anyone free to help?",
      time: "2:30 PM",
      isOwn: false
    },
    {
      id: 2,
      user: "You",
      avatar: "/placeholder.svg",
      message: "I can help! What specific topic are you struggling with?",
      time: "2:32 PM",
      isOwn: true
    },
    {
      id: 3,
      user: "Sarah Chen",
      avatar: "/placeholder.svg",
      message: "Chain rule is tricky! I have some great resources I can share",
      time: "2:35 PM",
      isOwn: false
    },
    {
      id: 4,
      user: "Alex Thompson",
      avatar: "/placeholder.svg",
      message: "That would be amazing, thank you both! 🙏",
      time: "2:36 PM",
      isOwn: false
    }
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would typically send the message to Firebase
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Live Chat Rooms
        </h1>
        <p className="text-lg text-gray-600">
          Connect with fellow students and get instant help with your studies
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Chat Rooms Sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Study Rooms</CardTitle>
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {chatRooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoom(room.id)}
                  className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedRoom === room.id
                      ? "bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-200"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{room.name}</h4>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{room.members} members</span>
                    <span>{room.online} online</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg h-[600px] flex flex-col">
            <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
                  <div>
                    <CardTitle className="text-lg">
                      {chatRooms.find(room => room.id === selectedRoom)?.name}
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      {chatRooms.find(room => room.id === selectedRoom)?.online} members online
                    </p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Users className="w-3 h-3 mr-1" />
                  Live
                </Badge>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-full p-6">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex max-w-xs lg:max-w-md ${msg.isOwn ? "flex-row-reverse" : "flex-row"} items-start space-x-2`}>
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={msg.avatar} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                            {msg.user.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`${msg.isOwn ? "mr-2" : "ml-2"}`}>
                          <div className={`px-4 py-2 rounded-2xl ${
                            msg.isOwn 
                              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" 
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            <p className="text-sm leading-relaxed">{msg.message}</p>
                          </div>
                          <div className={`flex items-center mt-1 text-xs text-gray-500 ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                            <span className="font-medium">{msg.user}</span>
                            <span className="mx-2">•</span>
                            <span>{msg.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>

            {/* Message Input */}
            <div className="p-4 border-t bg-gray-50/50">
              <div className="flex space-x-3">
                <Input
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 border-gray-200 focus:border-blue-400"
                />
                <Button 
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
