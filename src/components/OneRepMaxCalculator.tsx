import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Activity } from "lucide-react";

const OneRepMaxCalculator = () => {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [calculated1RM, setCalculated1RM] = useState<number | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const r = parseInt(reps, 10);

    if (isNaN(w) || isNaN(r) || w <= 0 || r <= 0) {
      return;
    }

    // Epley Formula: 1RM = w * (1 + r / 30)
    const epley = w * (1 + r / 30);
    
    // Brzycki Formula: 1RM = w / (1.0278 - 0.0278 * r)
    // Avoid division by zero if reps > 36 (though typical lift reps are < 15 for 1RM estimation)
    const brzycki = r < 37 ? w / (1.0278 - 0.0278 * r) : epley;

    // Average the two formulas for a balanced estimation
    const average1RM = Math.round((epley + brzycki) / 2);
    setCalculated1RM(average1RM);
  };

  // Generate target weights from 100% down to 50%
  const percentages = [
    { pct: 100, reps: "1", intensity: "Max Effort (1RM)" },
    { pct: 95, reps: "2", intensity: "Power/Strength" },
    { pct: 90, reps: "3-4", intensity: "Max Strength" },
    { pct: 85, reps: "5-6", intensity: "Strength/Hypertrophy" },
    { pct: 80, reps: "7-8", intensity: "Hypertrophy" },
    { pct: 75, reps: "9-10", intensity: "Hypertrophy/Growth" },
    { pct: 70, reps: "11-12", intensity: "Hypertrophy/Endurance" },
    { pct: 65, reps: "13-15", intensity: "Strength Endurance" },
    { pct: 60, reps: "16-20", intensity: "Active Endurance" },
  ];

  return (
    <div className="grid md:grid-cols-5 gap-6 max-w-4xl mx-auto">
      {/* Inputs Form */}
      <Card className="md:col-span-2 border border-violet-900/20 bg-slate-950/50 backdrop-blur-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-violet-400" />
            1RM Estimator
          </CardTitle>
          <CardDescription className="text-slate-400">
            Estimate your 1-Rep Max based on your workout log sets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCalculate} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="weight" className="text-slate-200">Weight Lifted (kg)</Label>
              <Input
                id="weight"
                type="number"
                step="any"
                placeholder="e.g. 80"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="bg-slate-900 border-slate-800 text-slate-200 focus-visible:ring-violet-500"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="reps" className="text-slate-200">Reps Completed</Label>
              <Input
                id="reps"
                type="number"
                placeholder="e.g. 5"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="bg-slate-900 border-slate-800 text-slate-200 focus-visible:ring-violet-500"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-500 text-white font-medium shadow-[0_0_15px_rgba(124,58,237,0.3)]">
              Calculate
            </Button>
          </form>

          {calculated1RM !== null && (
            <div className="mt-6 p-4 rounded-lg bg-violet-950/30 border border-violet-900/40 text-center animate-in fade-in duration-300">
              <span className="text-sm text-violet-300 uppercase tracking-wider font-semibold">Estimated 1-Rep Max</span>
              <div className="text-4xl font-bold text-white mt-1">
                {calculated1RM} <span className="text-lg font-medium text-slate-400">kg</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Derived by averaging Epley and Brzycki strength equations.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Target Table Results */}
      <Card className="md:col-span-3 border border-violet-900/20 bg-slate-950/50 backdrop-blur-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-white">Lifting Targets</CardTitle>
          <CardDescription className="text-slate-400">
            Recommended loads based on percentages of your 1-Rep Max
          </CardDescription>
        </CardHeader>
        <CardContent>
          {calculated1RM === null ? (
            <div className="flex items-center justify-center h-64 border border-dashed border-slate-800 rounded-lg text-slate-500">
              Calculate your 1RM to unlock target training loads
            </div>
          ) : (
            <div className="overflow-x-auto select-none rounded-lg border border-slate-800">
              <Table>
                <TableHeader className="bg-slate-900/60">
                  <TableRow className="border-slate-800 hover:bg-transparent">
                    <TableHead className="text-violet-400 font-semibold">% 1RM</TableHead>
                    <TableHead className="text-violet-400 font-semibold">Weight</TableHead>
                    <TableHead className="text-violet-400 font-semibold">Est. Reps</TableHead>
                    <TableHead className="text-violet-400 font-semibold">Training Focus</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {percentages.map((p) => {
                    const targetWeight = Math.round((calculated1RM * p.pct) / 100);
                    return (
                      <TableRow key={p.pct} className="border-slate-800 hover:bg-violet-950/10">
                        <TableCell className="font-semibold text-slate-200">{p.pct}%</TableCell>
                        <TableCell className="font-mono text-white font-semibold">{targetWeight} kg</TableCell>
                        <TableCell className="text-slate-300">{p.reps}</TableCell>
                        <TableCell className="text-slate-400 text-xs">{p.intensity}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OneRepMaxCalculator;
