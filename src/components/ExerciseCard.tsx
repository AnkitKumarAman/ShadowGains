import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  ChevronUp, 
  Dumbbell, 
  ListChecks, 
  Target 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ExerciseCardProps {
  id: string;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  instructions: string[];
  image: string;
  targetMuscles: string[];
  expanded?: boolean;
}

const ExerciseCard = ({
  id,
  name,
  category,
  description,
  benefits,
  instructions,
  image,
  targetMuscles,
  expanded = false,
}: ExerciseCardProps) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  return (
    <div 
      className={cn(
        "overflow-hidden rounded-xl transition-all duration-300 border border-violet-900/30 bg-slate-950 text-white shadow-md",
        isExpanded 
          ? "shadow-[0_0_20px_rgba(124,58,237,0.25)] ring-1 ring-violet-500/20" 
          : "hover:shadow-[0_0_15px_rgba(124,58,237,0.15)] hover:border-violet-850/50"
      )}
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <Badge className="absolute top-3 right-3 bg-violet-600 hover:bg-violet-500 text-white border-none font-semibold">
          {category}
        </Badge>
      </div>
      
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-2xl text-white font-bold tracking-tight">{name}</h3>
        <p className="text-slate-400 text-sm mt-1">{description}</p>
      </div>
      
      <div className="p-6 pt-0 space-y-4">
        {/* Target Muscles */}
        <div className="flex items-center space-x-2">
          <Target className="h-5 w-5 text-violet-400 flex-shrink-0" />
          <span className="font-semibold text-slate-200 text-sm">Target Muscles:</span>
          <div className="flex flex-wrap gap-1.5">
            {targetMuscles.map((muscle) => (
              <span 
                key={muscle} 
                className="inline-flex items-center rounded-full border border-violet-800/40 bg-violet-950/60 text-violet-300 px-2.5 py-0.5 text-xs font-semibold tracking-wide"
              >
                {muscle}
              </span>
            ))}
          </div>
        </div>
        
        {/* Collapsible Details */}
        {isExpanded && (
          <div className="space-y-4 pt-4 border-t border-slate-900/60 animate-in fade-in duration-300">
            {/* Benefits */}
            <div>
              <div className="flex items-center mb-2">
                <Dumbbell className="h-4 w-4 text-violet-400 mr-2" />
                <h4 className="font-semibold text-white text-sm">Benefits</h4>
              </div>
              <ul className="list-disc pl-5 space-y-1 text-xs">
                {benefits.map((benefit, index) => (
                  <li key={index} className="text-slate-300">{benefit}</li>
                ))}
              </ul>
            </div>
            
            {/* Instructions */}
            <div>
              <div className="flex items-center mb-2">
                <ListChecks className="h-4 w-4 text-violet-400 mr-2" />
                <h4 className="font-semibold text-white text-sm">Instructions</h4>
              </div>
              <ol className="list-decimal pl-5 space-y-1 text-xs">
                {instructions.map((instruction, index) => (
                  <li key={index} className="text-slate-300">{instruction}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex justify-center pb-4 pt-2 border-t border-slate-900/50 px-6">
        <Button
          variant="ghost"
          className="w-full flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-900/50 text-xs font-semibold"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="mr-1.5 h-4 w-4 text-violet-400" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="mr-1.5 h-4 w-4 text-violet-400" />
              Show More
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ExerciseCard;
