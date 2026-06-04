
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const formSchema = z.object({
  age: z.coerce.number().min(18, { message: "Age must be at least 18" }).max(100, { message: "Age must be at most 100" }),
  gender: z.enum(["male", "female"]),
  weight: z.coerce.number().min(40, { message: "Weight must be at least 40kg" }).max(200, { message: "Weight must be at most 200kg" }),
  height: z.coerce.number().min(140, { message: "Height must be at least 140cm" }).max(220, { message: "Height must be at most 220cm" }),
  activityLevel: z.enum(["sedentary", "light", "moderate", "active", "very-active"]),
});

type FormValues = z.infer<typeof formSchema>;

const activityLevels = [
  { value: "sedentary", label: "Sedentary (little or no exercise)" },
  { value: "light", label: "Light (exercise 1-3 days/week)" },
  { value: "moderate", label: "Moderate (exercise 3-5 days/week)" },
  { value: "active", label: "Active (exercise 6-7 days/week)" },
  { value: "very-active", label: "Very Active (exercise & physical job)" },
];

const CalorieCalculator = () => {
  const [results, setResults] = useState<{
    bmr: number;
    maintenance: number;
    weightLoss: number;
    weightGain: number;
  } | null>(null);
  const [activeTarget, setActiveTarget] = useState<"maintenance" | "weightLoss" | "weightGain">("maintenance");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: undefined,
      gender: "male",
      weight: undefined,
      height: undefined,
      activityLevel: "moderate",
    },
  });

  const calculateCalories = (data: FormValues) => {
    // BMR calculation using Mifflin-St Jeor Equation
    let bmr = 0;
    if (data.gender === "male") {
      bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5;
    } else {
      bmr = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161;
    }

    // Activity multiplier
    let activityMultiplier = 1.2; // sedentary
    
    switch (data.activityLevel) {
      case "light":
        activityMultiplier = 1.375;
        break;
      case "moderate":
        activityMultiplier = 1.55;
        break;
      case "active":
        activityMultiplier = 1.725;
        break;
      case "very-active":
        activityMultiplier = 1.9;
        break;
    }

    const maintenance = Math.round(bmr * activityMultiplier);
    const weightLoss = Math.round(maintenance - 500); // 500 calorie deficit
    const weightGain = Math.round(maintenance + 500); // 500 calorie surplus

    setResults({
      bmr: Math.round(bmr),
      maintenance,
      weightLoss,
      weightGain,
    });

    toast.success("Calorie calculation complete!");
  };

  const onSubmit = (data: FormValues) => {
    calculateCalories(data);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader className="bg-primary text-white rounded-t-lg">
          <CardTitle className="text-2xl">Daily Calorie Calculator</CardTitle>
          <CardDescription className="text-primary-foreground">
            Calculate your daily calorie needs based on your personal information
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Years" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Kilograms" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (cm)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Centimeters" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="activityLevel"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Activity Level</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select activity level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {activityLevels.map((level) => (
                            <SelectItem key={level.value} value={level.value}>
                              {level.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div>
                <Button type="submit" className="w-full">
                  Calculate
                </Button>
              </div>
            </form>
          </Form>
          
          {results && (
            <div className="mt-8 p-6 bg-slate-950/20 border border-slate-900 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-center text-white">Your Results</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-center">
                  <p className="text-sm text-slate-400">Your BMR</p>
                  <p className="text-2xl font-bold text-violet-400">
                    {results.bmr} <span className="text-sm font-normal">kcal</span>
                  </p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-center">
                  <p className="text-sm text-slate-400">Maintenance</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {results.maintenance} <span className="text-sm font-normal">kcal</span>
                  </p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-center">
                  <p className="text-sm text-slate-400">Weight Loss</p>
                  <p className="text-2xl font-bold text-rose-400">
                    {results.weightLoss} <span className="text-sm font-normal">kcal</span>
                  </p>
                </div>
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-center">
                  <p className="text-sm text-slate-400">Weight Gain</p>
                  <p className="text-2xl font-bold text-amber-500">
                    {results.weightGain} <span className="text-sm font-normal">kcal</span>
                  </p>
                </div>
              </div>

              {/* Macronutrient Distribution */}
              <div className="mt-6 border-t border-slate-900 pt-6">
                <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse" />
                  Estimated Macronutrient Splits
                </h4>

                {/* Tab selector for targets */}
                <div className="flex gap-2 mb-4 bg-slate-900/50 p-1 rounded-lg max-w-sm border border-slate-800">
                  {(["maintenance", "weightLoss", "weightGain"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setActiveTarget(t)}
                      className={`flex-1 text-xs py-1.5 px-2 rounded-md font-semibold transition-all ${
                        activeTarget === t
                          ? "bg-violet-600 text-white shadow"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {t === "maintenance" ? "Maintenance" : t === "weightLoss" ? "Loss" : "Gain"}
                    </button>
                  ))}
                </div>

                {/* Macro breakdown */}
                {(() => {
                  const calVal = results[activeTarget];
                  const protein = Math.round((calVal * 0.30) / 4);
                  const carbs = Math.round((calVal * 0.40) / 4);
                  const fat = Math.round((calVal * 0.30) / 9);

                  return (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      {/* Protein */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300 font-medium">Protein (30%)</span>
                          <span className="text-violet-400 font-bold">{protein}g <span className="text-[10px] text-slate-500 font-normal">({protein * 4} kcal)</span></span>
                        </div>
                        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                          <div className="h-full bg-violet-600 rounded-full" style={{ width: "30%" }} />
                        </div>
                      </div>

                      {/* Carbs */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300 font-medium">Carbohydrates (40%)</span>
                          <span className="text-blue-400 font-bold">{carbs}g <span className="text-[10px] text-slate-500 font-normal">({carbs * 4} kcal)</span></span>
                        </div>
                        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: "40%" }} />
                        </div>
                      </div>

                      {/* Fat */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-300 font-medium">Fat (30%)</span>
                          <span className="text-amber-500 font-bold">{fat}g <span className="text-[10px] text-slate-500 font-normal">({fat * 9} kcal)</span></span>
                        </div>
                        <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: "30%" }} />
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div className="mt-6 text-xs text-slate-400 border-t border-slate-900 pt-4 space-y-1 select-none">
                <p><strong>BMR (Basal Metabolic Rate):</strong> Minimum calories needed to survive at rest.</p>
                <p><strong>Maintenance:</strong> Calories needed to keep your current body weight.</p>
                <p><strong>Weight Loss:</strong> Safe calorie deficit (~500 kcal reduction) for safe fat loss.</p>
                <p><strong>Weight Gain:</strong> Clean calorie surplus (~500 kcal excess) combined with heavy lifting for muscle building.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalorieCalculator;
