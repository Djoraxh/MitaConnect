
import { useState } from "react";
import { Video, Phone, Mic, MicOff, VideoOff, Settings, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const VideoCall = () => {
  const [isInCall, setIsInCall] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [micEnabled, setMicEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);

  const upcomingSessions = [
    {
      id: 1,
      tutor: "Sarah Chen",
      subject: "Calculus",
      time: "3:00 PM",
      duration: "1 hour",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      tutor: "Marcus Johnson",
      subject: "Chemistry",
      time: "5:30 PM",
      duration: "45 mins",
      avatar: "/placeholder.svg"
    }
  ];

  const handleStartCall = () => {
    if (roomId.trim()) {
      setIsInCall(true);
      // Here you would integrate with Zoom/Jitsi
      console.log("Starting call with room ID:", roomId);
    }
  };

  const handleEndCall = () => {
    setIsInCall(false);
    setRoomId("");
  };

  if (isInCall) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Video Call Session
          </h1>
        </div>

        {/* Video Call Interface */}
        <div className="relative">
          <Card className="bg-black/90 backdrop-blur-sm border-0 shadow-2xl overflow-hidden">
            <CardContent className="p-0">
              {/* Main Video Area */}
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                <div className="text-center text-white">
                  <Video className="w-24 h-24 mx-auto mb-4 opacity-50" />
                  <h3 className="text-2xl font-semibold mb-2">Video Call Active</h3>
                  <p className="text-gray-300">Room ID: {roomId}</p>
                </div>
                
                {/* Self Video Preview */}
                <div className="absolute bottom-4 right-4 w-48 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center">
                    <Avatar className="w-16 h-16 mx-auto mb-2">
                      <AvatarFallback className="bg-white/20 text-white">You</AvatarFallback>
                    </Avatar>
                    <p className="text-sm">You</p>
                  </div>
                </div>

                {/* Participant */}
                <div className="absolute top-4 left-4 flex items-center space-x-2 bg-black/50 px-3 py-2 rounded-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-white text-sm">2 participants</span>
                </div>
              </div>

              {/* Call Controls */}
              <div className="bg-gray-900 p-6">
                <div className="flex justify-center space-x-4">
                  <Button
                    variant={micEnabled ? "secondary" : "destructive"}
                    size="lg"
                    onClick={() => setMicEnabled(!micEnabled)}
                    className="rounded-full w-14 h-14"
                  >
                    {micEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                  </Button>
                  
                  <Button
                    variant={videoEnabled ? "secondary" : "destructive"}
                    size="lg"
                    onClick={() => setVideoEnabled(!videoEnabled)}
                    className="rounded-full w-14 h-14"
                  >
                    {videoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="rounded-full w-14 h-14"
                  >
                    <Settings className="w-6 h-6" />
                  </Button>

                  <Button
                    variant="destructive"
                    size="lg"
                    onClick={handleEndCall}
                    className="rounded-full w-14 h-14 bg-red-600 hover:bg-red-700"
                  >
                    <Phone className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Video Call Center
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Start a video call with your tutor or study group. Connect face-to-face for personalized learning
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Start Call Section */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Video className="w-6 h-6 text-purple-600" />
              <span>Start New Call</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Room ID or Meeting Link
              </label>
              <Input
                placeholder="Enter room ID or paste meeting link..."
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="border-gray-200 focus:border-purple-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2"
                onClick={() => setRoomId("zoom-meeting-" + Math.random().toString(36).substr(2, 9))}
              >
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Video className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm">Zoom Meeting</span>
              </Button>
              
              <Button
                variant="outline"
                className="h-20 flex-col space-y-2"
                onClick={() => setRoomId("jitsi-room-" + Math.random().toString(36).substr(2, 9))}
              >
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-sm">Jitsi Meet</span>
              </Button>
            </div>

            <Button 
              onClick={handleStartCall}
              disabled={!roomId.trim()}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg"
            >
              Start Video Call
            </Button>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Quick Setup Tips:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Test your camera and microphone before calling</li>
                <li>• Use a quiet environment for better audio</li>
                <li>• Have good lighting for clear video</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Sessions */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-blue-600" />
              <span>Upcoming Sessions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={session.avatar} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {session.tutor.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{session.tutor}</h4>
                      <p className="text-sm text-gray-600">{session.subject}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-white">
                    {session.time}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Duration: {session.duration}</span>
                  <Button size="sm" variant="outline">
                    Join Call
                  </Button>
                </div>
              </div>
            ))}

            {upcomingSessions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>No upcoming sessions scheduled</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VideoCall;
