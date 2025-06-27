
import { useState } from "react";
import { User, GraduationCap, BookOpen, Star, Upload, Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const CreateProfile = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    classYear: "",
    gpa: "",
    availability: "",
    preferredMeetingTimes: []
  });
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  const roles = [
    {
      id: "mentee",
      title: "Junior Student",
      description: "Looking for guidance from senior students",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "mentor",
      title: "Senior Student",
      description: "Help guide junior students in their academic journey",
      icon: GraduationCap,
      color: "from-purple-500 to-pink-500"
    }
  ];

  const subjects = [
    "Mathematics", "Physics", "Chemistry", "Biology", "English Literature", "History",
    "Computer Science", "Spanish", "French", "Psychology", "Economics", "Art",
    "Music", "Physical Education", "Geography", "Philosophy"
  ];

  const classYears = ["9th Grade", "10th Grade", "11th Grade", "12th Grade"];
  
  const timeSlots = [
    "Monday 7:00-8:00 AM", "Monday 12:00-1:00 PM", "Monday 3:00-4:00 PM", "Monday 7:00-8:00 PM",
    "Tuesday 7:00-8:00 AM", "Tuesday 12:00-1:00 PM", "Tuesday 3:00-4:00 PM", "Tuesday 7:00-8:00 PM",
    "Wednesday 7:00-8:00 AM", "Wednesday 12:00-1:00 PM", "Wednesday 3:00-4:00 PM", "Wednesday 7:00-8:00 PM",
    "Thursday 7:00-8:00 AM", "Thursday 12:00-1:00 PM", "Thursday 3:00-4:00 PM", "Thursday 7:00-8:00 PM",
    "Friday 7:00-8:00 AM", "Friday 12:00-1:00 PM", "Friday 3:00-4:00 PM", "Friday 7:00-8:00 PM",
    "Saturday 9:00-10:00 AM", "Saturday 10:00-11:00 AM", "Saturday 2:00-3:00 PM", "Saturday 3:00-4:00 PM",
    "Sunday 9:00-10:00 AM", "Sunday 10:00-11:00 AM", "Sunday 2:00-3:00 PM", "Sunday 3:00-4:00 PM"
  ];

  const handleSubjectToggle = (subject) => {
    setSelectedSubjects(prev => 
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleTimeSlotToggle = (timeSlot) => {
    setSelectedTimeSlots(prev => 
      prev.includes(timeSlot)
        ? prev.filter(t => t !== timeSlot)
        : [...prev, timeSlot]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRole) {
      toast.error("Please select your role");
      return;
    }
    if (!formData.name || !formData.email || !formData.classYear) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (selectedRole === "mentor" && selectedSubjects.length === 0) {
      toast.error("Please select at least one subject you can mentor in");
      return;
    }
    
    toast.success("Profile created successfully!");
    console.log("Profile data:", { 
      ...formData, 
      role: selectedRole, 
      subjects: selectedSubjects,
      availableTimeSlots: selectedTimeSlots 
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Join Our School Mentoring Program
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Connect senior and junior students for free peer-to-peer mentoring and academic support.
        </p>
      </div>

      {/* Role Selection */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Choose Your Role</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`p-6 rounded-xl cursor-pointer transition-all duration-300 border-2 ${
                  selectedRole === role.id
                    ? "border-blue-400 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg scale-105"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                }`}
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${role.color} flex items-center justify-center`}>
                  <role.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-center mb-2">{role.title}</h3>
                <p className="text-sm text-gray-600 text-center">{role.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center space-x-6">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl">
                  {formData.name ? formData.name.split(' ').map(n => n[0]).join('') : <User className="w-12 h-12" />}
                </AvatarFallback>
              </Avatar>
              <Button type="button" variant="outline" className="flex items-center space-x-2">
                <Upload className="w-4 h-4" />
                <span>Upload Photo</span>
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter your full name"
                  className="border-gray-200 focus:border-blue-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  School Email *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your school email"
                  className="border-gray-200 focus:border-blue-400"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Class Year *
                </label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, classYear: value }))}>
                  <SelectTrigger className="border-gray-200 focus:border-blue-400">
                    <SelectValue placeholder="Select your grade level" />
                  </SelectTrigger>
                  <SelectContent>
                    {classYears.map((year) => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedRole === "mentor" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GPA (Optional)
                  </label>
                  <Input
                    value={formData.gpa}
                    onChange={(e) => setFormData(prev => ({ ...prev, gpa: e.target.value }))}
                    placeholder="e.g., 3.8"
                    className="border-gray-200 focus:border-blue-400"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder={selectedRole === "mentor" 
                  ? "Tell junior students about yourself, your academic interests, and how you'd like to help them..."
                  : "Tell senior students about yourself, what you're passionate about, and what kind of guidance you're looking for..."
                }
                rows={4}
                className="border-gray-200 focus:border-blue-400"
              />
            </div>
          </CardContent>
        </Card>

        {/* Subjects */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">
              {selectedRole === "mentee" ? "Subjects You Need Help With" : "Subjects You Can Mentor In"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <Badge
                  key={subject}
                  variant={selectedSubjects.includes(subject) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedSubjects.includes(subject)
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleSubjectToggle(subject)}
                >
                  {subject}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Availability Schedule */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Availability Schedule</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              Select the time slots when you're available for mentoring sessions
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {timeSlots.map((timeSlot) => (
                <Badge
                  key={timeSlot}
                  variant={selectedTimeSlots.includes(timeSlot) ? "default" : "outline"}
                  className={`cursor-pointer transition-all duration-200 justify-center py-2 ${
                    selectedTimeSlots.includes(timeSlot)
                      ? "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => handleTimeSlotToggle(timeSlot)}
                >
                  <Clock className="w-3 h-3 mr-1" />
                  {timeSlot}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="text-center">
          <Button 
            type="submit"
            size="lg"
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-12 py-3 text-lg"
          >
            Create Profile
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProfile;
