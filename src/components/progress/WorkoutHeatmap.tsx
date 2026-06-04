import React, { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface WorkoutHeatmapProps {
  workouts: any[];
}

const WorkoutHeatmap: React.FC<WorkoutHeatmapProps> = ({ workouts }) => {
  const heatmapData = useMemo(() => {
    // 1. Create a map of date string (YYYY-MM-DD) -> workout count
    const workoutMap: Record<string, number> = {};
    workouts.forEach((w) => {
      if (w.date) {
        const dateStr = typeof w.date === "string" ? w.date.split("T")[0] : new Date(w.date).toISOString().split("T")[0];
        workoutMap[dateStr] = (workoutMap[dateStr] || 0) + 1;
      }
    });

    // 2. Generate 365 days of data aligned to weeks
    const today = new Date();
    const days: { date: Date; dateStr: string; count: number }[] = [];
    
    // We want 53 weeks. Let's find the start date (52 weeks ago, aligned to Sunday)
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364);
    
    // Align to Sunday
    const startDay = startDate.getDay();
    startDate.setDate(startDate.getDate() - startDay);

    const totalDays = 53 * 7;
    const tempDate = new Date(startDate);
    
    for (let i = 0; i < totalDays; i++) {
      const dateStr = tempDate.toISOString().split("T")[0];
      days.push({
        date: new Date(tempDate),
        dateStr,
        count: workoutMap[dateStr] || 0,
      });
      tempDate.setDate(tempDate.getDate() + 1);
    }

    return days;
  }, [workouts]);

  // Group days into 53 columns (weeks)
  const weeks = useMemo(() => {
    const columns: typeof heatmapData[] = [];
    for (let i = 0; i < heatmapData.length; i += 7) {
      columns.push(heatmapData.slice(i, i + 7));
    }
    return columns;
  }, [heatmapData]);

  // Get month label positions
  const monthLabels = useMemo(() => {
    const labels: { text: string; index: number }[] = [];
    let currentMonth = -1;

    weeks.forEach((week, index) => {
      const midDay = week[3]?.date;
      if (midDay) {
        const month = midDay.getMonth();
        if (month !== currentMonth) {
          currentMonth = month;
          const monthName = midDay.toLocaleString("default", { month: "short" });
          labels.push({ text: monthName, index });
        }
      }
    });
    return labels;
  }, [weeks]);

  // Colors mapping for intensity of workouts
  const getCellColorClass = (count: number) => {
    if (count === 0) return "bg-slate-900 border-slate-950/20";
    if (count === 1) return "bg-violet-900/60 border-violet-850 hover:bg-violet-800/80";
    if (count === 2) return "bg-violet-750 border-violet-700 hover:bg-violet-650";
    return "bg-violet-500 border-violet-400 hover:bg-violet-400";
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="border border-violet-900/20 bg-slate-950/50 backdrop-blur-md shadow-lg overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-violet-500 animate-pulse" />
          Consistency Heatmap
        </CardTitle>
        <CardDescription className="text-slate-400">Visual logs of your exercises over the past 53 weeks</CardDescription>
      </CardHeader>
      <CardContent className="pt-2 overflow-x-auto scrollbar-thin scrollbar-thumb-violet-800 scrollbar-track-slate-950">
        <TooltipProvider>
          <div className="flex gap-3 pb-2 min-w-[720px]">
            {/* Weekdays Labels */}
            <div className="flex flex-col justify-between text-[10px] text-slate-500 font-medium h-[90px] mt-6 select-none pr-1">
              <span>Sun</span>
              <span>Tue</span>
              <span>Thu</span>
              <span>Sat</span>
            </div>

            {/* Grid Area */}
            <div className="flex-grow">
              {/* Months Header Row */}
              <div className="relative text-[10px] text-slate-500 font-medium h-5 mb-1 select-none">
                {monthLabels.map((lbl, idx) => (
                  <span
                    key={idx}
                    className="absolute"
                    style={{ left: `${lbl.index * 13.5}px` }}
                  >
                    {lbl.text}
                  </span>
                ))}
              </div>

              {/* Day Cells Grid */}
              <div className="flex gap-[3.5px]">
                {weeks.map((week, weekIdx) => (
                  <div key={weekIdx} className="flex flex-col gap-[3.5px]">
                    {week.map((day, dayIdx) => (
                      <Tooltip key={dayIdx}>
                        <TooltipTrigger asChild>
                          <div
                            className={`w-[10px] h-[10px] rounded-[2px] border ${getCellColorClass(
                              day.count
                            )} transition-colors duration-300 cursor-pointer`}
                          />
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-950 border-violet-800/40 text-white text-xs py-1.5 px-3 shadow-md">
                          <span className="font-semibold text-violet-400">{day.count} {day.count === 1 ? "workout" : "workouts"}</span> on {formatDate(day.date)}
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Heatmap Legend and Summary */}
          <div className="flex justify-between items-center text-xs mt-3 pt-3 border-t border-violet-950/40 select-none">
            <span className="text-slate-400">
              Total active days: <span className="font-semibold text-violet-400">{heatmapData.filter((d) => d.count > 0).length} days</span>
            </span>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span>Less</span>
              <div className="w-[10px] h-[10px] rounded-[2px] bg-slate-900 border border-slate-950/20" />
              <div className="w-[10px] h-[10px] rounded-[2px] bg-violet-900/60 border border-violet-850" />
              <div className="w-[10px] h-[10px] rounded-[2px] bg-violet-750 border border-violet-700" />
              <div className="w-[10px] h-[10px] rounded-[2px] bg-violet-500 border border-violet-400" />
              <span>More</span>
            </div>
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
};

export default WorkoutHeatmap;
