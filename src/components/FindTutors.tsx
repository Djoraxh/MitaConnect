
import { useState } from "react";
import { Search, Star, Clock, MapPin, Filter, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FindTutors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedClassYear, setSelectedClassYear] = useState("all");

  const mentors = [
    {
      id: 1,
      name: "Sarah Chen",
      classYear: "12th Grade",
      subjects: ["Mathematics", "Physics"],
      rating: 4.9,
      sessions: 27,
      gpa: "4.0",
      online: true,
      bio: "Computer Science enthusiast helping fellow students excel in STEM subjects",
      avatar: "/placeholder.svg",
      availableSlots: ["Monday 3:00-4:00 PM", "Wednesday 7:00-8:00 PM", "Saturday 10:00-11:00 AM"]
    },
    {
      id: 2,
      name: "Marcus Johnson",
      classYear: "11th Grade",
      subjects: ["Chemistry", "Biology"],
      rating: 4.8,
      sessions: 19,
      gpa: "3.9",
      online: false,
      bio: "Pre-med track student passionate about helping others succeed in sciences",
      avatar: "/placeholder.svg",
      availableSlots: ["Tuesday 12:00-1:00 PM", "Thursday 3:00-4:00 PM", "Sunday 2:00-3:00 PM"]
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      classYear: "12th Grade",
      subjects: ["Spanish", "English Literature"],
      rating: 4.9,
      sessions: 35,
      gpa: "3.8",
      online: true,
      bio: "Bilingual student helping peers with language arts and literature",
      avatar: "/placeholder.svg",
      availableSlots: ["Monday 7:00-8:00 AM", "Friday 3:00-4:00 PM", "Saturday 9:00-10:00 AM"]
    },
    {
      id: 4,
      name: "David Kim",
      classYear: "11th Grade",
      subjects: ["History", "Psychology"],
      rating: 4.7,
      sessions: 22,
      gpa: "3.7",
      online: true,
      bio: "Social sciences enthusiast helping students develop critical thinking skills",
      avatar: "/placeholder.svg",
      availableSlots: ["Wednesday 12:00-1:00 PM", "Friday 7:00-8:00 PM", "Sunday 10:00-11:00 AM"]
    }
  ];

  const subjects = ["all", "Mathematics", "Physics", "Chemistry", "Biology", "Spanish", "English Literature", "History", "Psychology", "Computer Science"];
  const classYears = ["all", "12th Grade", "11th Grade", "10th Grade"];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject = selectedSubject === "all" || mentor.subjects.includes(selectedSubject);
    const matchesClassYear = selectedClassYear === "all" || mentor.classYear === selectedClassYear;
    return matchesSearch && matchesSubject && matchesClassYear;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Find Your Mentor
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Connect with senior students who can guide you through your academic journey - completely free!
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by name or subject..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 border-gray-200 focus:border-blue-400"
            />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
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
            
            <div className="md:w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">Class Year</label>
              <Select value={selectedClassYear} onValueChange={setSelectedClassYear}>
                <SelectTrigger className="border-gray-200 focus:border-blue-400">
                  <SelectValue placeholder="All years" />
                </SelectTrigger>
                <SelectContent>
                  {classYears.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year === "all" ? "All Years" : year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Mentors Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredMentors.map((mentor) => (
          <Card key={mentor.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/70 backdrop-blur-sm border-0">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={mentor.avatar} alt={mentor.name} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {mentor.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{mentor.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="text-xs">
                        <GraduationCap className="w-3 h-3 mr-1" />
                        {mentor.classYear}
                      </Badge>
                      {mentor.gpa && (
                        <Badge variant="outline" className="text-xs">
                          GPA: {mentor.gpa}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium text-gray-700">{mentor.rating}</span>
                  </div>
                  <div className="text-xs text-gray-500">{mentor.sessions} sessions</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 leading-relaxed">{mentor.bio}</p>
              
              <div className="flex flex-wrap gap-1">
                {mentor.subjects.map((subject) => (
                  <Badge key={subject} variant="outline" className="text-xs">
                    {subject}
                  </Badge>
                ))}
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Available Times:</h4>
                <div className="flex flex-wrap gap-1">
                  {mentor.availableSlots.slice(0, 2).map((slot) => (
                    <Badge key={slot} variant="secondary" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {slot}
                    </Badge>
                  ))}
                  {mentor.availableSlots.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{mentor.availableSlots.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  FREE Mentoring
                </Badge>
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

      {filteredMentors.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No mentors found</h3>
          <p className="text-gray-500">Try adjusting your search criteria or browse all subjects</p>
        </div>
      )}
    </div>
  );
};

export default FindTutors;
