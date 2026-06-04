import { useState } from "react";
import { exercises } from "@/data/exercises";
import ExerciseCard from "@/components/ExerciseCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Filter, 
  Dumbbell 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Exercises = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMuscles, setSelectedMuscles] = useState<string[]>([]);

  // Extract unique categories and muscles
  const categories = [...new Set(exercises.map((exercise) => exercise.category))];
  const muscles = [...new Set(exercises.flatMap((exercise) => exercise.targetMuscles))];

  // Filter exercises based on search term and filters
  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategories.length === 0 || 
                          selectedCategories.includes(exercise.category);
    
    const matchesMuscle = selectedMuscles.length === 0 || 
                         exercise.targetMuscles.some(muscle => selectedMuscles.includes(muscle));
    
    return matchesSearch && matchesCategory && matchesMuscle;
  });

  // Handle category toggle
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  // Handle muscle toggle
  const toggleMuscle = (muscle: string) => {
    setSelectedMuscles(prev => 
      prev.includes(muscle) 
        ? prev.filter(m => m !== muscle) 
        : [...prev, muscle]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-900 to-indigo-900 border-b border-violet-850">
          <div className="section-container py-16 md:py-24 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Exercise Library</h1>
              <p className="text-violet-200 text-lg">
                Discover detailed guides for all major exercises to optimize your workouts and achieve your fitness goals.
              </p>
            </div>
          </div>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-slate-950 border-b border-violet-900/20 shadow-md">
          <div className="section-container py-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search exercises..."
                  className="pl-10 bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-violet-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:text-white text-slate-300">
                      <Filter className="mr-2 h-4 w-4 text-violet-400" />
                      Categories
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-slate-950 border-slate-800 text-white">
                    <DropdownMenuLabel className="text-slate-400">Exercise Categories</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-800" />
                    {categories.map((category) => (
                      <DropdownMenuCheckboxItem
                        key={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                        className="hover:bg-violet-900/30 focus:bg-violet-900/30 text-white"
                      >
                        {category}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:text-white text-slate-300">
                      <Dumbbell className="mr-2 h-4 w-4 text-violet-400" />
                      Muscles
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-slate-950 border-slate-800 text-white">
                    <DropdownMenuLabel className="text-slate-400">Target Muscles</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-800" />
                    {muscles.map((muscle) => (
                      <DropdownMenuCheckboxItem
                        key={muscle}
                        checked={selectedMuscles.includes(muscle)}
                        onCheckedChange={() => toggleMuscle(muscle)}
                        className="hover:bg-violet-900/30 focus:bg-violet-900/30 text-white"
                      >
                        {muscle}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            
            {/* Active filters */}
            {(selectedCategories.length > 0 || selectedMuscles.length > 0) && (
              <div className="mt-4 flex flex-wrap gap-2 items-center">
                {selectedCategories.map((category) => (
                  <div 
                    key={category} 
                    className="flex items-center bg-violet-950/40 border border-violet-900/40 text-violet-300 px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {category}
                    <button 
                      onClick={() => toggleCategory(category)}
                      className="ml-2 hover:text-white focus:outline-none"
                    >
                      ×
                    </button>
                  </div>
                ))}
                
                {selectedMuscles.map((muscle) => (
                  <div 
                    key={muscle} 
                    className="flex items-center bg-blue-950/40 border border-blue-900/40 text-blue-300 px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {muscle}
                    <button 
                      onClick={() => toggleMuscle(muscle)}
                      className="ml-2 hover:text-white focus:outline-none"
                    >
                      ×
                    </button>
                  </div>
                ))}
                
                <button 
                  onClick={() => {
                    setSelectedCategories([]);
                    setSelectedMuscles([]);
                  }}
                  className="text-xs text-slate-400 hover:text-violet-400 font-semibold transition-colors ml-1"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Exercises Grid */}
        <div className="bg-black py-12">
          <div className="section-container">
            {filteredExercises.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
                {filteredExercises.map((exercise) => (
                  <ExerciseCard
                    key={exercise.id}
                    {...exercise}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Dumbbell className="h-16 w-16 text-slate-700 mx-auto mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold mb-2 text-white">No exercises found</h3>
                <p className="text-slate-400 mb-6 max-w-sm mx-auto text-sm">
                  Try adjusting your search terms or filters to find what you're looking for.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategories([]);
                    setSelectedMuscles([]);
                  }}
                  className="bg-violet-600 hover:bg-violet-500 text-white font-medium"
                >
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Exercises;
