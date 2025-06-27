
import { useState } from "react";
import { User, GraduationCap, BookOpen, Star, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const CreateProfile = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    subjects: [],
    experience: "",
    hourlyRate: "",
    availability: ""
  });
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const roles = [
    {
      id: "student",
      title: "Student",
      description: "Looking for help with my studies",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "tutor",
      title: "Tutor",
      description: "Experienced in helping others learn",
      icon: GraduationCap,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "mentor",
      title: "Mentor",
      description: "Guide students in their academic journey",
      icon: Star,
      color: "from-green-500 to-emerald-500"
    }
  ];

  const subjects = [
    "Mathematics", "Physics", "Chemistry", "Biology", "English", "History",
    "Computer Science", "Spanish", "French", "Psychology", "Economics", "Art"
  ];

  const handleSubjectToggle = (subject) => {
    setSelectedSubjects(prev => 
      prev.includes(subject)
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRole) {
      toast.error("Please select a role");
      return;
    }
    if (!formData.name || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success("Profile created successfully!");
    console.log("Profile data:", { ...formData, role: selectedRole, subjects: selectedSubjects });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          Create Your Profile
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join our community and start your learning journey. Choose your role and let others know how they can connect with you.
        </p>
      </div>

      {/* Role Selection */}
      <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl">Choose Your Role</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
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
                  Email Address *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                  className="border-gray-200 focus:border-blue-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell others about yourself, your interests, and what you're passionate about..."
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
              {selectedRole === "student" ? "Subjects You Need Help With" : "Subjects You Can Teach"}
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

        {/* Additional Information for Tutors/Mentors */}
        {(selectedRole === "tutor" || selectedRole === "mentor") && (
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Teaching Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level
                  </label>
                  <Input
                    value={formData.experience}
                    onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                    placeholder="e.g., 2 years, Beginner, Expert"
                    className="border-gray-200 focus:border-blue-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hourly Rate
                  </label>
                  <Input
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: e.target.value }))}
                    placeholder="e.g., $25/hour"
                    className="border-gray-200 focus:border-blue-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <Input
                  value={formData.availability}
                  onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                  placeholder="e.g., Weekdays 6-9 PM, Weekends"
                  className="border-gray-200 focus:border-blue-400"
                />
              </div>
            </CardContent>
          </Card>
        )}

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
