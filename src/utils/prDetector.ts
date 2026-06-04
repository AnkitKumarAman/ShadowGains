import { Workout } from "@/types/workout";

export type PRMilestone = {
  exerciseName: string;
  previousMax: number;
  newMax: number;
};

/**
 * Detects if a new workout sets any Personal Records (PRs) compared to past workout history.
 */
export const detectNewPRs = (newWorkout: Workout, history: Workout[]): PRMilestone[] => {
  const milestones: PRMilestone[] = [];
  
  // Filter out the current workout if we are editing it, to avoid comparing against itself
  const pastWorkouts = history.filter(w => w.id !== newWorkout.id);

  newWorkout.exercises.forEach((exercise) => {
    const name = exercise.name.trim().toLowerCase();
    if (!name) return;

    // Find the max weight in the newly logged exercise
    let newMaxWeight = 0;
    exercise.sets.forEach((set) => {
      const weightNum = parseFloat(set.weight);
      if (!isNaN(weightNum) && weightNum > newMaxWeight) {
        newMaxWeight = weightNum;
      }
    });

    if (newMaxWeight === 0) return;

    // Find the max weight for this exercise in past workouts
    let pastMaxWeight = 0;
    let hasPreviousRecords = false;

    pastWorkouts.forEach((pastWorkout) => {
      pastWorkout.exercises.forEach((pastExercise) => {
        if (pastExercise.name.trim().toLowerCase() === name) {
          pastExercise.sets.forEach((set) => {
            const weightNum = parseFloat(set.weight);
            if (!isNaN(weightNum)) {
              hasPreviousRecords = true;
              if (weightNum > pastMaxWeight) {
                pastMaxWeight = weightNum;
              }
            }
          });
        }
      });
    });

    // We consider it a PR if the user had previous records for this exercise
    // and the new weight logged is strictly greater than the old record.
    if (hasPreviousRecords && pastMaxWeight > 0 && newMaxWeight > pastMaxWeight) {
      milestones.push({
        exerciseName: exercise.name, // Keep original casing
        previousMax: pastMaxWeight,
        newMax: newMaxWeight,
      });
    }
  });

  return milestones;
};
