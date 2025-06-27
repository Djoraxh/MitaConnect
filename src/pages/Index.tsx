
import { useState } from "react";
import { MessageSquare, Video, User, Search, Star, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FindTutors from "@/components/FindTutors";
import ChatRoom from "@/components/ChatRoom";
import VideoCall from "@/components/VideoCall";
import CreateProfile from "@/components/CreateProfile";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  const renderContent = () => {
    switch (activeSection) {
      case "tutors":
        return <FindTutors />;
      case "chat":
        return <ChatRoom />;
      case "video":
        return <VideoCall />;
      case "profile":
        return <CreateProfile />;
      default:
        return <HomePage setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TM</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TutorMatch
              </h1>
            </div>
            <nav className="hidden md:flex space-x-1">
              {[
                { id: "home", label: "Home", icon: Users },
                { id: "tutors", label: "Find Tutors", icon: Search },
                { id: "chat", label: "Chat", icon: MessageSquare },
                { id: "video", label: "Video Call", icon: Video },
                { id: "profile", label: "Profile", icon: User },
              ].map(({ id, label, icon: Icon }) => (
                <Button
                  key={id}
                  variant={activeSection === id ? "default" : "ghost"}
                  onClick={() => setActiveSection(id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t shadow-lg">
        <div className="flex justify-around py-2">
          {[
            { id: "home", icon: Users },
            { id: "tutors", icon: Search },
            { id: "chat", icon: MessageSquare },
            { id: "video", icon: Video },
            { id: "profile", icon: User },
          ].map(({ id, icon: Icon }) => (
            <Button
              key={id}
              variant="ghost"
              size="sm"
              onClick={() => setActiveSection(id)}
              className={`flex flex-col items-center space-y-1 ${
                activeSection === id ? "text-blue-600" : "text-gray-600"
              }`}
            >
              <Icon className="w-5 h-5" />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

const HomePage = ({ setActiveSection }: { setActiveSection: (section: string) => void }) => {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
          Connect. Learn. Grow.
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Join our community of students and mentors. Find the perfect tutor, chat with peers, 
          and accelerate your learning journey through personalized guidance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={() => setActiveSection("tutors")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
          >
            Find a Tutor
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => setActiveSection("profile")}
            className="border-2 border-blue-200 hover:bg-blue-50 px-8 py-3 text-lg"
          >
            Become a Mentor
          </Button>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Find Tutors",
            description: "Browse profiles of experienced students and mentors",
            icon: Search,
            action: () => setActiveSection("tutors"),
            gradient: "from-blue-500 to-cyan-500"
          },
          {
            title: "Live Chat",
            description: "Connect instantly with your study group or mentor",
            icon: MessageSquare,
            action: () => setActiveSection("chat"),
            gradient: "from-green-500 to-emerald-500"
          },
          {
            title: "Video Calls",
            description: "Start face-to-face tutoring sessions anytime",
            icon: Video,
            action: () => setActiveSection("video"),
            gradient: "from-purple-500 to-pink-500"
          },
          {
            title: "Create Profile",
            description: "Join our community as a student or mentor",
            icon: User,
            action: () => setActiveSection("profile"),
            gradient: "from-orange-500 to-red-500"
          },
        ].map((feature, index) => (
          <Card 
            key={index} 
            className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 bg-white/60 backdrop-blur-sm"
            onClick={feature.action}
          >
            <CardHeader className="text-center pb-4">
              <div className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
        {[
          { number: "500+", label: "Active Tutors", icon: Users },
          { number: "1,200+", label: "Students Helped", icon: Star },
          { number: "24/7", label: "Support Available", icon: Clock },
        ].map((stat, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <stat.icon className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Index;
