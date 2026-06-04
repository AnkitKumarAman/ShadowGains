
interface Exercise {
  id: string;
  name: string;
  category: string;
  description: string;
  benefits: string[];
  instructions: string[];
  image: string;
  targetMuscles: string[];
}

export const exercises: Exercise[] = [
  {
    id: "leg-press",
    name: "Leg Press",
    category: "Lower Body",
    description: "The leg press is a compound weight training exercise in which the individual pushes a weight away from them using their legs.",
    benefits: [
      "Builds quadriceps, hamstrings, and glute strength",
      "Allows for heavy loading with reduced lower back stress",
      "Effective for building overall lower body mass",
      "Suitable for beginners and advanced lifters",
      "Can be modified to target specific leg muscles"
    ],
    instructions: [
      "Sit on the leg press machine with your back against the padded support",
      "Place your feet shoulder-width apart on the platform",
      "Release the safety locks and lower the platform by bending your knees",
      "Lower until your knees form approximately a 90-degree angle",
      "Push through your heels to extend your legs without locking your knees",
      "Repeat for the desired number of repetitions"
    ],
    image: "https://www.eatthis.com/wp-content/uploads/sites/4/2023/03/muscular-man-leg-press.jpg",
    targetMuscles: ["Quadriceps", "Hamstrings", "Glutes"]
  },
  {
    id: "squats",
    name: "Squats",
    category: "Lower Body",
    description: "The squat is a compound exercise that trains primarily the muscles of the thighs, hips, and buttocks, as well as strengthening the bones, ligaments, and tendons throughout the lower body.",
    benefits: [
      "Strengthens the entire lower body",
      "Improves core stability and strength",
      "Increases functional fitness for daily activities",
      "Boosts hormone production",
      "Burns calories efficiently"
    ],
    instructions: [
      "Stand with feet shoulder-width apart",
      "Keep your chest up and back straight",
      "Bend at the knees and hips, lowering your body as if sitting in a chair",
      "Keep your knees in line with your toes, not extending past them",
      "Lower until your thighs are parallel to the ground (or as low as comfortable)",
      "Push through your heels to return to the starting position",
      "Repeat for the desired number of repetitions"
    ],
    image: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    targetMuscles: ["Quadriceps", "Hamstrings", "Glutes", "Core"]
  },
  {
    id: "bench-press",
    name: "Bench Press",
    category: "Upper Body",
    description: "The bench press is a compound exercise that targets the muscles of the upper body. It involves lying on a bench and pressing weight upward using either a barbell or dumbbells.",
    benefits: [
      "Builds chest, shoulder, and tricep strength",
      "Increases upper body mass",
      "Improves pushing strength for everyday activities",
      "Develops balanced chest development",
      "Enhances overall upper body aesthetics"
    ],
    instructions: [
      "Lie flat on a bench with feet firmly on the ground",
      "Grip the barbell slightly wider than shoulder-width apart",
      "Unrack the barbell and position it over your chest with arms extended",
      "Lower the barbell slowly to the mid-chest",
      "Press the barbell back up to the starting position, fully extending your arms",
      "Repeat for the desired number of repetitions"
    ],
    image: "https://imgs.search.brave.com/qmj1Pdt_rrxu-oDncncfKgp6ziJhcD3o_0z0nnDrWHg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMx/NDQ4OTcwNy9waG90/by9iZW5jaC1wcmVz/cy10cmFpbmluZy5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/dHpFdVBqUENueUFs/OHNMSFdIRFNkclhX/d3BvQ3FfZENxSTIt/SmhtSUNkcz0",
    targetMuscles: ["Chest", "Shoulders", "Triceps"]
  },
  {
    id: "incline-bench-press",
    name: "Incline Bench Press",
    category: "Upper Body",
    description: "The incline bench press is a variation of the flat bench press performed on an inclined bench. This exercise shifts the focus to the upper chest and anterior deltoids.",
    benefits: [
      "Emphasizes upper chest development",
      "Targets the anterior deltoids more than flat bench",
      "Creates a more balanced chest appearance",
      "Provides variety in chest training",
      "Helps develop pushing strength at different angles"
    ],
    instructions: [
      "Set an adjustable bench to a 30-45 degree incline",
      "Lie on the bench with feet planted firmly on the floor",
      "Grip the barbell slightly wider than shoulder-width",
      "Unrack the barbell and hold it above your upper chest with arms extended",
      "Lower the barbell to your upper chest in a controlled manner",
      "Press the weight back up until your arms are fully extended",
      "Repeat for the desired number of repetitions"
    ],
    image: "https://imgs.search.brave.com/enU0lQs80N_Vr4X2B6zq3KbxrHKZK2LCiwRPizrwORo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9icmVh/a2luZ211c2NsZS5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MTIvMTIvc2h1dHRl/cnN0b2NrNjg4ODAy/NTYuanBn",
    targetMuscles: ["Upper Chest", "Anterior Deltoids", "Triceps"]
  },
  {
    id: "tricep-extension-rope",
    name: "Tricep Extension (Rope)",
    category: "Upper Body",
    description: "The rope tricep extension is an isolation exercise that targets the triceps. It's performed using a cable machine with a rope attachment, focusing on the extension of the elbow joint.",
    benefits: [
      "Isolates the triceps muscles effectively",
      "Provides constant tension throughout the movement",
      "Allows for a greater range of motion",
      "The rope allows for natural wrist positioning",
      "Helps develop defined triceps"
    ],
    instructions: [
      "Attach a rope to a high pulley on a cable machine",
      "Face the machine, grasp the rope with both hands, and stand upright with a slight forward lean",
      "Start with your elbows bent at 90 degrees, tucked close to your sides",
      "While keeping your upper arms stationary, extend your forearms downward until arms are fully extended",
      "Slowly return to the starting position",
      "Repeat for the desired number of repetitions"
    ],
    image: "https://thumbs.dreamstime.com/b/fitness-girl-doing-triceps-workout-cable-machine-fitness-woman-doing-triceps-workout-gym-221936139.jpg",
    targetMuscles: ["Triceps"]
  },
  {
    id: "tricep-extension-rod",
    name: "Tricep Extension (Rod)",
    category: "Upper Body",
    description: "The tricep extension with a straight bar (rod) is an isolation exercise targeting the triceps muscles. It's performed using a cable machine with a straight bar attachment.",
    benefits: [
      "Targets all three heads of the triceps",
      "The straight bar allows for heavier loading",
      "Provides constant tension on the triceps",
      "Helps develop arm definition and strength",
      "Improves lockout strength for pressing movements"
    ],
    instructions: [
      "Attach a straight bar to a high pulley on a cable machine",
      "Face the machine, grasp the bar with an overhand grip, hands 8-12 inches apart",
      "Stand upright with a slight forward lean, keeping elbows close to your head",
      "Starting with your elbows bent, extend your arms downward until fully straight",
      "Slowly return to the starting position, keeping tension on the triceps",
      "Repeat for the desired number of repetitions"
    ],
    image: "https://app-media.fitbod.me/v2/401/images/landscape/0_960x540.jpg",
    targetMuscles: ["Triceps"]
  },
  {
    id: "tricep-overhead-press",
    name: "Tricep Overhead Press",
    category: "Upper Body",
    description: "The tricep overhead press is an isolation exercise that targets the long head of the triceps muscle. It can be performed with a dumbbell, cable, or resistance band.",
    benefits: [
      "Emphasizes the long head of the triceps",
      "Stretches the triceps under load for better development",
      "Improves overhead pressing stability",
      "Adds variety to triceps training",
      "Can be performed with minimal equipment"
    ],
    instructions: [
      "Stand or sit with a dumbbell held in both hands",
      "Raise the dumbbell overhead with arms fully extended",
      "Keeping upper arms close to your head, lower the weight behind your head by bending at the elbows",
      "Lower until you feel a stretch in your triceps",
      "Extend your arms to raise the weight back to the starting position",
      "Repeat for the desired number of repetitions"
    ],
    image: "https://media.post.rvohealth.io/wp-content/uploads/2021/10/overhead-tricep-extension-dumbbell-732x549-thumbnail-732x549.jpg",
    targetMuscles: ["Triceps (Long Head)"]
  },
  {
    id: "shoulder-press",
    name: "Shoulder Press",
    category: "Upper Body",
    description: "The shoulder press, also known as the overhead press, is a compound exercise that targets the deltoid muscles of the shoulder, as well as the triceps and upper chest.",
    benefits: [
      "Builds stronger and broader shoulders",
      "Strengthens the entire shoulder girdle",
      "Improves overhead strength for functional activities",
      "Engages core stabilizers",
      "Can be performed with various equipment (barbell, dumbbells, machines)"
    ],
    instructions: [
      "Sit or stand with a straight back and core engaged",
      "Hold dumbbells at shoulder height with palms facing forward",
      "Press the weights overhead until your arms are fully extended",
      "Briefly pause at the top",
      "Lower the weights back to shoulder level in a controlled manner",
      "Repeat for the desired number of repetitions"
    ],
    image: "https://www.myprotein.co.in/images?url=https://blogscdn.thehut.net/app/uploads/sites/478/2019/06/shoulder-workout-min_1646837508.jpg&format=webp&auto=avif&width=700&height=385&fit=crop",
    targetMuscles: ["Deltoids", "Triceps", "Upper Chest", "Trapezius"]
  },
  {
    id: "leg-extension",
    name: "Leg Extension",
    category: "Lower Body",
    description: "The leg extension is an isolation exercise that targets the quadriceps muscles. It's performed on a leg extension machine and involves extending the knee joint against resistance.",
    benefits: [
      "Isolates and strengthens the quadriceps",
      "Useful for rehabilitation after knee injuries",
      "Helps develop definition in the front of the thighs",
      "Can be used for high-rep endurance training",
      "Minimal technical skill required"
    ],
    instructions: [
      "Sit on a leg extension machine with back firmly against the pad",
      "Adjust the pad so it rests on your lower shins just above the feet",
      "Grasp the side handles for stability",
      "Extend your legs to lift the weight until your knees are fully extended (but not locked)",
      "Pause briefly at the top of the movement",
      "Lower the weight back to the starting position in a controlled manner",
      "Repeat for the desired number of repetitions"
    ],
    image: "https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2024/08/leg-press-vs-leg-extension-for-quads.jpg?fit=1953%2C1351&ssl=1",
    targetMuscles: ["Quadriceps"]
  },
  {
    id: "hamstring-curls",
    name: "Hamstring Curls",
    category: "Lower Body",
    description: "Hamstring curls, also known as leg curls, are an isolation exercise that targets the hamstring muscles. They're typically performed on a dedicated machine and involve flexing the knee joint against resistance.",
    benefits: [
      "Isolates and strengthens the hamstrings",
      "Helps balance quadriceps development",
      "Improves knee joint stability",
      "Supports lower body power for activities like sprinting and jumping",
      "Can help prevent hamstring injuries"
    ],
    instructions: [
      "Lie face down on a leg curl machine with the pad positioned just above your heels",
      "Grasp the handles for stability",
      "Keep your hips pressed into the bench",
      "Curl your legs up by bending at the knees, bringing your heels toward your buttocks",
      "Squeeze your hamstrings at the top of the movement",
      "Lower your legs back to the starting position in a controlled manner",
      "Repeat for the desired number of repetitions"
    ],
    image: "https://repfitness.com/cdn/shop/articles/lying-leg-curl.jpg?v=1770147928&width=1100",
    targetMuscles: ["Hamstrings", "Calves (partially)"]
  },
  {
    id: "treadmill-running",
    name: "Treadmill Running",
    category: "Cardio",
    description: "Running on a treadmill is a classic cardiovascular exercise that improves endurance, burns calories, and strengthens the legs and core.",
    benefits: [
      "Improves cardiovascular health and lung capacity",
      "Burns a high number of calories for weight management",
      "Strengthens lower body muscles including calves, hamstrings, and quads",
      "Convenient and unaffected by outdoor weather conditions",
      "Easy to track pace, distance, and incline"
    ],
    instructions: [
      "Step onto the treadmill belt and attach the safety key to your clothing",
      "Start at a slow walking pace (1.5 - 2.0 mph) to warm up",
      "Gradually increase the speed to a jogging or running pace that matches your target intensity",
      "Maintain an upright posture, keep your gaze forward, and swing your arms naturally",
      "To finish, gradually decrease speed to a walk for a cool-down before stopping",
      "Step off the treadmill once the belt has come to a complete stop"
    ],
    image: "https://static.vecteezy.com/system/resources/thumbnails/024/576/448/small/silhouette-of-athlete-running-on-treadmill-indoors-generated-by-ai-photo.jpg",
    targetMuscles: ["Quadriceps", "Hamstrings", "Calves", "Core", "Cardiovascular"]
  },
  {
    id: "stationary-cycling",
    name: "Stationary Cycling",
    category: "Cardio",
    description: "Stationary cycling is a low-impact cardiovascular workout targeting the lower body muscles while boosting heart rate and endurance.",
    benefits: [
      "Low impact on joints (knees, hips, ankles)",
      "Boosts cardiovascular fitness and stamina",
      "Strengthens legs, particularly quadriceps, hamstrings, and glutes",
      "Highly customizable resistance levels",
      "Burns calories efficiently"
    ],
    instructions: [
      "Adjust the seat height so your knee has a slight bend at the bottom of the pedal stroke",
      "Adjust the handlebars to a comfortable height and distance",
      "Secure your feet in the pedal straps",
      "Select your workout program or start pedaling manually",
      "Adjust the resistance to your desired level to simulate climbing hills or riding flat ground",
      "Pedal at a steady pace, keeping your chest lifted and shoulders relaxed"
    ],
    image: "https://media.istockphoto.com/id/2235683537/photo/stationary-cycling-class-in-a-gym.jpg?s=612x612&w=0&k=20&c=pUa7cLsiFEla7Oh4IgSUytC7CEqsY1MrmH-5SOe9_jk=",
    targetMuscles: ["Quadriceps", "Hamstrings", "Glutes", "Calves", "Cardiovascular"]
  },
  {
    id: "bicep-curls",
    name: "Bicep Curls",
    category: "Upper Body",
    description: "Bicep curls are an isolation exercise targeting the biceps brachii, helping build arm strength and size.",
    benefits: [
      "Builds biceps strength and muscular definition",
      "Improves forearm and grip strength",
      "Helps stabilize the elbow joint",
      "Enhances pulling capacity for functional movements"
    ],
    instructions: [
      "Stand with feet shoulder-width apart, holding dumbbells at your sides",
      "Keep elbows close to your torso, palms facing forward",
      "Exhale and curl the weights up toward your shoulders, keeping upper arms stationary",
      "Squeeze your biceps at the top for a brief moment",
      "Inhale and slowly lower the dumbbells back to the starting position",
      "Repeat for the desired number of repetitions"
    ],
    image: "https://static.vecteezy.com/system/resources/thumbnails/053/694/755/small/a-muscular-woman-in-a-grey-tank-top-is-doing-bicep-curls-with-dumbbells-in-a-gym-free-photo.jpeg",
    targetMuscles: ["Biceps", "Forearms"]
  },
  {
    id: "lat-pulldown",
    name: "Lat Pulldown",
    category: "Upper Body",
    description: "The lat pulldown is a compound pulling exercise targeting the latissimus dorsi (back) muscles to build upper body width and strength.",
    benefits: [
      "Develops upper back width and the classic V-taper",
      "Strengthens the lats, traps, rhomboids, and biceps",
      "Improves pull-up capacity and posture",
      "Provides controlled loading for back muscles"
    ],
    instructions: [
      "Sit at a lat pulldown machine and adjust the knee pad to secure your thighs",
      "Grasp the bar with a wide overhand grip, palms facing forward",
      "Leaning back slightly, pull the bar down toward your upper chest",
      "Squeeze your shoulder blades together at the bottom of the movement",
      "Slowly return the bar to the starting position, maintaining control",
      "Repeat for the desired number of repetitions"
    ],
    image: "https://d2rf5xu5rxzcu4.cloudfront.net/img/exercises/lat-pulldown/hero.jpg",
    targetMuscles: ["Lats", "Upper Back", "Biceps"]
  },
  {
    id: "rowing-machine",
    name: "Rowing Machine",
    category: "Cardio",
    description: "Rowing is a full-body cardiovascular workout that engages legs, core, back, and arms while building exceptional stamina.",
    benefits: [
      "Highly efficient full-body cardiorespiratory training",
      "Low impact on lower body joints",
      "Engages over 80% of body muscles (legs, core, back, shoulders)",
      "Burns high calories for weight loss"
    ],
    instructions: [
      "Sit on the rower seat and secure your feet in the straps",
      "Grasp the handle with an overhand grip, arms straight, torso leaning slightly forward",
      "Drive backward through your legs, keeping your arms straight until legs are almost flat",
      "Lean your torso back slightly and pull the handle to your lower chest",
      "Extend your arms forward, hinge your torso forward, and bend your knees to slide back to start",
      "Maintain a smooth, continuous sequence (Legs-Torso-Arms, Arms-Torso-Legs)"
    ],
    image: "https://static.vecteezy.com/system/resources/thumbnails/073/061/857/small/muscular-man-working-out-on-rowing-machine-free-photo.jpg",
    targetMuscles: ["Quadriceps", "Hamstrings", "Lats", "Upper Back", "Core", "Cardiovascular"]
  },
  {
    id: "jump-rope",
    name: "Jump Rope",
    category: "Cardio",
    description: "Jumping rope is a high-intensity cardiovascular training movement that builds agility, footwork speed, and calf endurance.",
    benefits: [
      "Builds exceptional agility, balance, and foot speed",
      "Strengthens the calves, ankles, and feet",
      "Extremely high caloric burn in short timeframes",
      "Improves coordination and athletic performance"
    ],
    instructions: [
      "Hold rope handles with hands at hip level, elbows close to your torso",
      "Place the rope loop behind your heels",
      "Rotate wrists to swing the rope overhead",
      "Jump 1-2 inches off the ground using the balls of your feet as the rope passes under",
      "Keep your knees slightly soft and land softly on your toes",
      "Maintain a smooth, rhythmic jumping cadence"
    ],
    image: "https://media.gettyimages.com/id/1142050299/photo/young-man-with-jumping-rope-in-garage.jpg?s=612x612&w=0&k=20&c=tnv-ZLiFj_gKb5jItxknnKucsR5oa-UvsaPRHDM7slo=",
    targetMuscles: ["Calves", "Quadriceps", "Shoulders", "Cardiovascular"]
  },
  {
    id: "romanian-deadlift",
    name: "Romanian Deadlift (RDL)",
    category: "Lower Body",
    description: "The Romanian deadlift (RDL) is a compound barbell/dumbbell exercise targeting the hamstrings, glutes, and lower back to build posterior chain strength.",
    benefits: [
      "Develops powerful hamstring and glute strength",
      "Improves hip hinge mechanics and core stability",
      "Strengthens the lower back and erector spinae",
      "Helps prevent hamstring strains and lower back injuries"
    ],
    instructions: [
      "Stand with feet hip-width apart, holding a barbell in front of your thighs with an overhand grip",
      "Keep your back straight, chest up, and knees slightly bent",
      "Hinge at the hips, pushing your butt backward to lower the bar along your shins",
      "Lower until you feel a deep stretch in your hamstrings, keeping your back completely flat",
      "Drive your hips forward and squeeze your glutes to return to the starting position",
      "Repeat for the desired number of repetitions"
    ],
    image: "https://tensiongroup4.wpenginepowered.com/wp-content/uploads/2021/02/Hamstrings-stretched_feat-672x379.jpeg",
    targetMuscles: ["Hamstrings", "Glutes", "Lower Back", "Core"]
  },
  {
    id: "dumbbell-lunges",
    name: "Dumbbell Lunges",
    category: "Lower Body",
    description: "Dumbbell lunges are a unilateral compound lower body exercise targeting the quadriceps, glutes, and hamstrings while improving balance and hip stability.",
    benefits: [
      "Corrects muscle imbalances between legs (unilateral training)",
      "Builds strength in quads, glutes, and hamstrings",
      "Enhances balance, coordination, and core stability",
      "Improves hip flexor flexibility"
    ],
    instructions: [
      "Stand tall holding a dumbbell in each hand at your sides",
      "Take a large step forward with one leg, keeping your torso upright",
      "Lower your body until your rear knee is just above the floor and front thigh is parallel to the ground",
      "Ensure your front knee does not extend past your toes",
      "Push through your front heel to return to the standing starting position",
      "Alternate legs or complete all reps on one side before switching"
    ],
    image: "https://media.istockphoto.com/id/1132086764/photo/young-muscular-woman-doing-lunges-exercise-with-dumbbells-in-the-gym.jpg?s=612x612&w=0&k=20&c=zsVwyULkFv4SKrJIhvOIv3yJQ-pwUVjgmAt7_Yu4zqM=",
    targetMuscles: ["Quadriceps", "Glutes", "Hamstrings", "Calves"]
  },
  {
    id: "push-ups",
    name: "Push-Ups",
    category: "Upper Body",
    description: "The push-up is an essential bodyweight compound exercise that builds pressing strength, targeting the chest, front shoulders, triceps, and core.",
    benefits: [
      "Builds chest, shoulder, and tricep strength with zero equipment",
      "Engages the core and stabilizer muscles",
      "Highly scaleable (can be done on knees or elevated surfaces)",
      "Improves shoulder joint health and stability"
    ],
    instructions: [
      "Place hands slightly wider than shoulder-width on the floor, feet together in a plank position",
      "Engage your core and glutes to keep your body in a straight line from head to heels",
      "Lower your chest toward the floor by bending your elbows, keeping them tucked at a 45-degree angle",
      "Lower until your chest is just above the ground",
      "Push through your hands to extend your arms and return to the starting position",
      "Repeat for the desired number of repetitions"
    ],
    image: "https://static.vecteezy.com/system/resources/thumbnails/069/378/442/small/determined-man-performing-push-ups-on-a-mat-in-a-backlit-gym-setting-photo.jpeg",
    targetMuscles: ["Chest", "Triceps", "Shoulders", "Core"]
  },
  {
    id: "dumbbell-row",
    name: "Dumbbell Row",
    category: "Upper Body",
    description: "The dumbbell row is a unilateral compound pulling exercise targeting the latissimus dorsi, rhomboids, and traps to build mid-back thickness and arm pulling strength.",
    benefits: [
      "Builds back thickness, symmetry, and strength",
      "Reduces muscular imbalances in the upper back and shoulders",
      "Improves posture and core stability",
      "Enhances grip and arm pulling capacity"
    ],
    instructions: [
      "Place one knee and same-side hand firmly on a flat bench for support",
      "Keep your back flat and parallel to the bench, holding a dumbbell in your free hand",
      "Let the weight hang straight down, maintaining a neutral wrist",
      "Pull the dumbbell up toward your hip, keeping your elbow tucked close to your side",
      "Squeeze your shoulder blade at the top of the lift",
      "Slowly lower the dumbbell back to the starting position under control",
      "Complete the set, then switch sides"
    ],
    image: "https://t3.ftcdn.net/jpg/01/62/95/96/360_F_162959650_JK7i2cPUyihBmk58z2rtsce0OjcspVJy.jpg",
    targetMuscles: ["Lats", "Rhomboids", "Middle Traps", "Biceps"]
  },
  {
    id: "elliptical-trainer",
    name: "Elliptical Trainer",
    category: "Cardio",
    description: "The elliptical trainer is a low-impact cardio machine workout that coordinates upper and lower body movement to burn calories and build cardiovascular health.",
    benefits: [
      "Virtually zero-impact cardio, highly protective of knees and hips",
      "Engages both upper and lower body simultaneously",
      "Excellent option for active recovery or high-calorie burning",
      "Adjustable incline and resistance for intensity variation"
    ],
    instructions: [
      "Step onto the foot pedals and hold the moving handlebars",
      "Start pedaling in a forward motion, coordinating arm swings with leg strides",
      "Set your target resistance and incline on the machine console",
      "Maintain a tall posture, keep your core engaged, and avoid leaning heavily on handles",
      "Pedal in reverse occasionally to target calves and hamstrings differently",
      "Cool down for 2-3 minutes at a slow pace before stepping off"
    ],
    image: "https://media.istockphoto.com/id/1386276780/photo/woman-training-using-elliptical-cross-trainer.jpg?s=612x612&w=0&k=20&c=pe8b0qfKVAqZSgGoCx4_IUHx1ByggaMlqw8azDVWnas=",
    targetMuscles: ["Quadriceps", "Glutes", "Hamstrings", "Calves", "Cardiovascular"]
  },
  {
    id: "stair-climber",
    name: "Stair Climber",
    category: "Cardio",
    description: "The stair climber is a high-intensity cardiovascular machine that replicates climbing stairs to burn fat and build powerful leg muscles.",
    benefits: [
      "Incredibly high cardiovascular and respiratory challenge",
      "Builds functional leg strength, especially glutes, quads, and calves",
      "Burns calories faster than walking or standard cycling",
      "Low impact relative to high-intensity outdoor running"
    ],
    instructions: [
      "Step onto the machine platform and select your speed/intensity level",
      "Begin stepping forward as the stairs rotate downward",
      "Keep your chest upright and avoid leaning forward or resting your weight on the rails",
      "Press down through your entire foot rather than just your toes to fully engage glutes",
      "Keep a steady, rhythmic climbing pace",
      "Press the stop button and step off carefully once the stairs lock"
    ],
    image: "https://assets.clevelandclinic.org/transform/LargeFeatureImage/30ac4994-09bb-4ebd-b114-46d1af479237/stair-stepper-gym-1474835659-r",
    targetMuscles: ["Glutes", "Quadriceps", "Calves", "Hamstrings", "Cardiovascular"]
  }
];
