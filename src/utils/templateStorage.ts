import { Exercise } from "@/types/workout";

export type WorkoutTemplate = {
  id: string;
  name: string;
  exercises: { name: string; setsCount: number }[];
};

const TEMPLATE_KEY = "workout_templates";

const getDemoTemplates = (): WorkoutTemplate[] => {
  return [
    {
      id: "demo-1",
      name: "Push Day (Chest/Shoulders/Triceps)",
      exercises: [
        { name: "Flat Barbell Bench Press", setsCount: 4 },
        { name: "Seated Dumbbell Shoulder Press", setsCount: 4 },
        { name: "Incline Dumbbell Press", setsCount: 3 },
        { name: "Cable Triceps Pushdowns", setsCount: 3 }
      ]
    },
    {
      id: "demo-2",
      name: "Pull Day (Back/Rear Delts/Biceps)",
      exercises: [
        { name: "Overhand Lat Pulldowns", setsCount: 4 },
        { name: "Seated Cable Rows", setsCount: 3 },
        { name: "Face Pulls", setsCount: 3 },
        { name: "Dumbbell Hammer Curls", setsCount: 3 }
      ]
    },
    {
      id: "demo-3",
      name: "Leg Day (Quads/Hamstrings/Calves)",
      exercises: [
        { name: "Barbell Back Squats", setsCount: 4 },
        { name: "Romanian Deadlifts", setsCount: 4 },
        { name: "Leg Press", setsCount: 3 },
        { name: "Standing Calf Raises", setsCount: 4 }
      ]
    }
  ];
};

/**
 * Fetch all templates from localStorage, defaulting to demo templates if none are saved.
 */
export const getSavedTemplates = (): WorkoutTemplate[] => {
  const data = localStorage.getItem(TEMPLATE_KEY);
  if (!data) {
    // Populate demo templates by default
    localStorage.setItem(TEMPLATE_KEY, JSON.stringify(getDemoTemplates()));
    return getDemoTemplates();
  }
  return JSON.parse(data);
};

/**
 * Save a new workout configuration as a reusable template.
 */
export const saveTemplate = (name: string, exercises: Exercise[]): WorkoutTemplate => {
  const templates = getSavedTemplates();
  const newTemplate: WorkoutTemplate = {
    id: Date.now().toString(),
    name,
    exercises: exercises.map((ex) => ({
      name: ex.name,
      setsCount: ex.sets.length || 1,
    })),
  };
  templates.push(newTemplate);
  localStorage.setItem(TEMPLATE_KEY, JSON.stringify(templates));
  return newTemplate;
};

/**
 * Remove a saved template by id.
 */
export const deleteTemplate = (id: string): void => {
  const templates = getSavedTemplates();
  const filtered = templates.filter((t) => t.id !== id);
  localStorage.setItem(TEMPLATE_KEY, JSON.stringify(filtered));
};
