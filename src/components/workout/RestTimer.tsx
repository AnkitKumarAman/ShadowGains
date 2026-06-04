import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, X, Timer, ChevronDown, ChevronUp, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const RestTimer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [duration, setDuration] = useState(90); // default 90 seconds
  const [timeLeft, setTimeLeft] = useState(90);
  const [isRunning, setIsRunning] = useState(false);
  const [customTime, setCustomTime] = useState("");
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Play a synthesis beep sound when the timer finishes
  const playTimerEndSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      
      // Play 3 short consecutive beeps
      const playBeep = (startTime: number) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, startTime); // A5 note
        gain.gain.setValueAtTime(0.3, startTime);
        gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.25);
        
        osc.start(startTime);
        osc.stop(startTime + 0.3);
      };

      const now = audioCtx.currentTime;
      playBeep(now);
      playBeep(now + 0.4);
      playBeep(now + 0.8);
    } catch (e) {
      console.warn("Failed to play timer sound:", e);
    }
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            playTimerEndSound();
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, soundEnabled]);

  // Adjust timer settings
  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration);
  };

  const selectPreset = (seconds: number) => {
    setIsRunning(false);
    setDuration(seconds);
    setTimeLeft(seconds);
  };

  const handleCustomTimeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(customTime, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setIsRunning(false);
      setDuration(parsed);
      setTimeLeft(parsed);
      setCustomTime("");
    }
  };

  // Circular progress calculations
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = duration > 0 ? circumference - (timeLeft / duration) * circumference : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Timer Window */}
      {isOpen && (
        <div className="w-80 bg-slate-950 border border-violet-800/40 rounded-xl shadow-[0_10px_40px_-10px_rgba(124,58,237,0.5)] p-5 mb-3 backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-300">
          <div className="flex justify-between items-center mb-4 border-b border-violet-900/30 pb-2">
            <div className="flex items-center gap-2 text-violet-400">
              <Timer className="h-5 w-5" />
              <span className="font-semibold text-white">Rest Timer</span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-violet-400 hover:text-white hover:bg-violet-900/20"
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-violet-400 hover:text-white hover:bg-violet-900/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Visual Circle & Countdown */}
          <div className="flex justify-center items-center my-6 relative">
            <svg className="w-36 h-36 transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-violet-950/40"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Animated foreground circle */}
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-violet-500 transition-all duration-1000 ease-linear"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-bold font-mono text-white">{formatTime(timeLeft)}</span>
              <span className="text-xs text-violet-400 font-medium">/{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-3 mb-4">
            <Button
              onClick={handleStartPause}
              variant="default"
              className="bg-violet-600 hover:bg-violet-500 text-white font-medium px-6 py-2 h-10 min-w-[110px]"
            >
              {isRunning ? (
                <>
                  <Pause className="mr-2 h-4 w-4" /> Pause
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" /> Start
                </>
              )}
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-violet-900/50 hover:bg-violet-950/50 text-violet-400 hover:text-white h-10"
            >
              <RotateCcw className="h-4 w-4 mr-1" /> Reset
            </Button>
          </div>

          {/* Preset Buttons */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {[30, 60, 90, 120].map((sec) => (
              <Button
                key={sec}
                variant="outline"
                size="sm"
                onClick={() => selectPreset(sec)}
                className={`text-xs py-1 px-0 border-slate-800 ${
                  duration === sec
                    ? "bg-violet-900/40 border-violet-500 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                {sec}s
              </Button>
            ))}
          </div>

          {/* Custom Time Form */}
          <form onSubmit={handleCustomTimeSubmit} className="flex gap-2">
            <Input
              type="number"
              placeholder="Custom sec (e.g. 150)"
              value={customTime}
              onChange={(e) => setCustomTime(e.target.value)}
              className="h-8 bg-slate-900 border-slate-800 text-slate-200 text-xs placeholder:text-slate-500"
            />
            <Button
              type="submit"
              size="sm"
              className="h-8 bg-violet-900/40 hover:bg-violet-800 text-violet-300 hover:text-white text-xs border border-violet-800/40"
            >
              Set
            </Button>
          </form>
        </div>
      )}

      {/* Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white px-4 py-3 rounded-full shadow-[0_4px_20px_rgba(124,58,237,0.4)] hover:shadow-[0_4px_25px_rgba(124,58,237,0.6)] hover:scale-[1.05] transition-all duration-300"
      >
        <Timer className={`h-5 w-5 ${isRunning ? "animate-pulse text-green-300" : ""}`} />
        <span className="font-semibold text-sm">
          {isOpen ? "Close Timer" : isRunning ? `Resting: ${formatTime(timeLeft)}` : "Rest Timer"}
        </span>
        {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
      </button>
    </div>
  );
};

export default RestTimer;
