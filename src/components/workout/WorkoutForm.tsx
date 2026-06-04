import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Save, Trash2, Calendar, FolderOpen, Copy } from "lucide-react";
import { Workout } from "@/types/workout";
import { useToast } from "@/hooks/use-toast";
import ExerciseCard from "./ExerciseCard";
import { getSavedTemplates, saveTemplate, WorkoutTemplate } from "@/utils/templateStorage";

interface WorkoutFormProps {
  currentWorkout: Workout;
  setCurrentWorkout: React.Dispatch<React.SetStateAction<Workout>>;
  saveWorkout: (workout: Workout) => Promise<{ success: boolean, workout?: Workout, error?: any }>;
}

const WorkoutForm = ({ currentWorkout, setCurrentWorkout, saveWorkout }: WorkoutFormProps) => {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
  const [isSavingTemplate, setIsSavingTemplate] = useState(false);
  const [templateName, setTemplateName] = useState("");

  // Load templates on mount
  useEffect(() => {
    setTemplates(getSavedTemplates());
  }, []);

  const handleSaveWorkout = async () => {
    if (!currentWorkout.exercises[0].name) {
      toast({
        title: "Missing information",
        description: "Please add at least one exercise with details",
        variant: "destructive",
      });
      return;
    }
    
    const result = await saveWorkout(currentWorkout);
    
    if (result.success) {
      setCurrentWorkout({
        id: "",
        date: new Date().toISOString().split("T")[0],
        exercises: [{ name: "", sets: [{ weight: "", reps: "" }] }]
      });
      
      toast({
        title: "Success!",
        description: "Your workout has been saved",
      });
    }
  };

  const addExercise = () => {
    setCurrentWorkout({
      ...currentWorkout,
      exercises: [
        ...currentWorkout.exercises,
        { name: "", sets: [{ weight: "", reps: "" }] }
      ]
    });
  };

  const handleLoadTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) return;

    // Map template exercises into the workout structure
    const loadedExercises = template.exercises.map(ex => ({
      name: ex.name,
      sets: Array.from({ length: ex.setsCount }, () => ({ weight: "", reps: "" }))
    }));

    setCurrentWorkout({
      ...currentWorkout,
      exercises: loadedExercises
    });

    toast({
      title: "Template Loaded",
      description: `Loaded: ${template.name}`,
    });
  };

  const handleSaveTemplateClick = () => {
    if (!currentWorkout.exercises[0].name) {
      toast({
        title: "Cannot save template",
        description: "Please enter at least one exercise name first",
        variant: "destructive",
      });
      return;
    }
    setIsSavingTemplate(true);
  };

  const handleConfirmSaveTemplate = () => {
    if (!templateName.trim()) {
      toast({
        title: "Template name required",
        description: "Please enter a name for your routine template",
        variant: "destructive",
      });
      return;
    }

    const newTpl = saveTemplate(templateName.trim(), currentWorkout.exercises);
    setTemplates(getSavedTemplates());
    setTemplateName("");
    setIsSavingTemplate(false);

    toast({
      title: "Template Saved!",
      description: `"${newTpl.name}" is now available to load`,
    });
  };

  return (
    <Card className="border border-violet-900/20 bg-slate-950/40 shadow-lg hover:shadow-violet-900/30 transition-all duration-300 ease-in-out">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <Calendar className="h-5 w-5 text-violet-400" />
          {currentWorkout.id ? "Edit Workout Log" : "New Workout Entry"}
        </CardTitle>
        <CardDescription className="text-slate-400">Record your exercises, sets, reps, and weights</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Date and Template Select Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="workout-date" className="text-slate-200">Workout Date</Label>
            <Input 
              id="workout-date" 
              type="date" 
              value={currentWorkout.date}
              className="bg-slate-900 border-slate-800 text-slate-200 focus-visible:ring-violet-500"
              onChange={(e) => setCurrentWorkout({...currentWorkout, date: e.target.value})}
            />
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="template-select" className="text-slate-200 flex items-center gap-1.5">
              <FolderOpen className="h-3.5 w-3.5 text-violet-400" /> Quick-Load Routine
            </Label>
            <select
              id="template-select"
              className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
              onChange={(e) => handleLoadTemplate(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Choose a template...</option>
              {templates.map((tpl) => (
                <option key={tpl.id} value={tpl.id}>
                  {tpl.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Exercises List */}
        <div className="space-y-6">
          {currentWorkout.exercises.map((exercise, exerciseIndex) => (
            <ExerciseCard
              key={exerciseIndex}
              exercise={exercise}
              exerciseIndex={exerciseIndex}
              currentWorkout={currentWorkout}
              setCurrentWorkout={setCurrentWorkout}
            />
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col gap-4 border-t border-slate-900/60 pt-6">
        {/* Save Template Prompt Popover (Inline) */}
        {isSavingTemplate && (
          <div className="w-full flex flex-col sm:flex-row gap-3 p-4 rounded-lg bg-violet-950/20 border border-violet-900/40 animate-in slide-in-from-bottom-2 duration-300">
            <div className="flex-grow space-y-1">
              <Label htmlFor="new-template-name" className="text-white text-xs font-semibold">Save routine as template</Label>
              <Input
                id="new-template-name"
                placeholder="e.g. Upper Body Strength"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="h-8 bg-slate-900 border-slate-800 text-slate-200 placeholder:text-slate-600 text-xs"
              />
            </div>
            <div className="flex items-end gap-2">
              <Button size="sm" variant="default" onClick={handleConfirmSaveTemplate} className="h-8 bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold">
                Save
              </Button>
              <Button size="sm" variant="ghost" onClick={() => { setIsSavingTemplate(false); setTemplateName(""); }} className="h-8 text-slate-400 hover:text-white hover:bg-slate-900 text-xs">
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-3">
          <Button onClick={addExercise} className="w-full sm:w-auto border-violet-900/50 hover:bg-violet-950/20 text-violet-400 hover:text-white" variant="outline">
            <Plus className="mr-2 h-4 w-4" /> Add Exercise
          </Button>
          
          <Button onClick={handleSaveTemplateClick} className="w-full sm:w-auto border-violet-900/50 hover:bg-violet-950/20 text-violet-400 hover:text-white" variant="outline">
            <Copy className="mr-2 h-4 w-4" /> Save as Template
          </Button>
          
          <Button onClick={handleSaveWorkout} className="w-full sm:w-auto sm:ml-auto bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)]">
            <Save className="mr-2 h-4 w-4" /> {currentWorkout.id ? "Update Workout" : "Save Workout"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default WorkoutForm;
