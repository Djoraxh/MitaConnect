
import { useState } from "react";
import { Search, Star, Clock, MapPin, Filter } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const FindTutors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const tutors = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Senior Tutor",
      subjects: ["Mathematics", "Physics"],
      rating: 4.9,
      sessions: 127,
      price: "$25/hr",
      online: true,
      bio: "Computer Science major with 3 years of tutoring experience",
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Marcus Johnson",
      role: "Peer Mentor",
      subjects: ["Chemistry", "Biology"],
      rating: 4.8,
      sessions: 89,
      price: "$20/hr",
      online: false,
      bio: "Pre-med student passionate about helping others succeed",
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Language Expert",
      subjects: ["Spanish", "English"],
      rating: 4.9,
      sessions: 203,
      price: "$30/hr",
      online: true,
      bio: "Bilingual educator with certification in language instruction",
      avatar: "/placeholder.svg"
    },
    {
      id: 4,
      name: "David Kim",
      role: "Study Coach",
      subjects: ["Study Skills", "Test Prep"],
      rating: 4.7,
      sessions: 156,
      price: "$35/hr",
      online: true,
      bio: "Graduate student specializing in learning strategies",
      avatar: "/placeholder.svg"
    }
  ];

  const subjects = ["all", "Mathematics", "Physics", "Chemistry", "Biology", "Spanish", "English", "Study Skills"];

  const filteredTutors = tutors.filter(tutor => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutor.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject = selectedSubject === "all" || tutor.subjects.includes(selectedSubject);
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Find Your Perfect Tutor
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Connect with experienced students and mentors who can help you achieve your academic goals
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by name or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 border-gray-200 focus:border-blue-400"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {subjects.map((subject) => (
              <Button
                key={subject}
                variant={selectedSubject === subject ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSubject(subject)}
                className="capitalize"
              >
                {subject}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Tutors Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTutors.map((tutor) => (
          <Card key={tutor.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/70 backdrop-blur-sm border-0">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={tutor.avatar} alt={tutor.name} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {tutor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {tutor.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{tutor.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {tutor.role}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{tutor.rating}</span>
                  </div>
                  <div className="text-xs text-gray-500">{tutor.sessions} sessions</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">{tutor.bio}</p>
              
              <div className="flex flex-wrap gap-1">
                {tutor.subjects.map((subject) => (
                  <Badge key={subject} variant="outline" className="text-xs">
                    {subject}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="font-semibold text-lg text-blue-600">{tutor.price}</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Available now</span>
                  </div>
                </div>
                <Button 
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Connect
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTutors.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No tutors found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or browse all subjects</p>
        </div>
      )}
    </div>
  );
};

export default FindTutors;
