export interface ProductData {
  name: string;
  title: string;
  brand: string;
  
  imageUrls: string[];
  originalPrice: string;
  discountedPrice: string;
  category: string;
  subcategory: string;
  quantity: string;
  size: string;
  description: string;
  material: string;
  weight: string;
  dimensions: string;
  manufacturingDate: string;
  warranty: string;
  shippingInfo: string;
  highlights: string[];
  stockAlert: string;
  colors: string[];
}


export const subcategorySizeMap: { [key: string]: string } = {
  "gloves": "clothing",
  "reflectiveVests": "clothing",
  "resistantJackets": "clothing",
  "yogaPants": "clothing",
  "yogaTops": "clothing",
  "yogaShorts": "clothing",
  "yogaBra": "clothing",
  "cricketClothing": "clothing",
  "cricketShoes": "shoes",
  "battingPads": "clothing",
  "battingGloves": "clothing",
  "protectiveHelmet": "clothing",
  "tennisTops": "clothing",
  "tennisShorts": "clothing",
  "courtShoes": "shoes",
  "swimsuits": "clothing",
  "swimShorts": "clothing",
  "headCaps": "clothing",
  "cyclingJerseys": "clothing",
  "cyclingShorts": "clothing",
  "cyclingShoes": "shoes",
  "cyclingHelmet": "clothing",
  "sportUniform": "clothing",
  "winterBoots": "shoes",
  "jackets": "clothing",
  "pants": "clothing",
  "thermalWear": "clothing",
  "kidsClothing": "clothing",
  "kidsShoes": "shoes",
  "sportsSocks": "clothing",
  "sportsCaps": "clothing",
  "hoodies": "clothing",
  "t-shirts": "clothing",
  "jeans": "clothing",
  "shorts": "clothing",
  "sneakers": "shoes",
  "boots": "shoes",
  "sandals": "shoes",
  "flipFlops": "shoes",
  "dressShoes": "shoes",
  "formalWear": "clothing",
  "activewear": "clothing",
  "outerwear": "clothing",
  "accessories": "clothing",
  "sportsBras": "clothing",
  "workoutLeggings": "clothing",
  "compressionShirts": "clothing",
  "runningTights": "clothing",
  "swimwear": "clothing",
  "trackPants": "clothing",
  "cargoPants": "clothing",
  "slippers": "shoes",
  "clogs": "shoes",
  "ankleBoots": "shoes",
};


  export const sizeOptionsMap: { [key: string]: string[] } = {
    clothing: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
    shoes: ["UK6_EU39", "UK7_EU40", "UK8_EU41", "UK9_EU42", "UK10_EU43", "UK11_EU44", "UK12_EU45"],
  };

export const categories = [
  {
    "category": "Pet Care",
    "label": "Pet Care",
    "subcategories": [
      { "value": "dogFood", "label": "Dog Food" },
      { "value": "catFood", "label": "Cat Food" },
      { "value": "birdFood", "label": "Bird Food" },
      { "value": "fishFood", "label": "Fish Food" },
      { "value": "smallAnimalFood", "label": "Small Animal Food" },
      { "value": "petToys", "label": "Pet Toys" },
      { "value": "petBeds", "label": "Pet Beds" },
      { "value": "petGrooming", "label": "Pet Grooming Supplies" },
      { "value": "petHealthCare", "label": "Pet Health Care" },
      { "value": "petTraining", "label": "Pet Training Supplies" },
      { "value": "petClothing", "label": "Pet Clothing" },
      { "value": "aquariumSupplies", "label": "Aquarium Supplies" },
      { "value": "reptileSupplies", "label": "Reptile Supplies" },
      { "value": "petTravel", "label": "Pet Travel Accessories" },
      { "value": "petCleaning", "label": "Pet Cleaning Supplies" },
      { "value": "petCarriers", "label": "Pet Carriers" },
      { "value": "petBowls", "label": "Pet Bowls and Feeders" },
      { "value": "petWaterFountains", "label": "Pet Water Fountains" },
      { "value": "petLitter", "label": "Pet Litter and Boxes" },
      { "value": "petFleaControl", "label": "Flea and Tick Control" },
      { "value": "petHealthSupplements", "label": "Pet Health Supplements" },
      { "value": "petDentalCare", "label": "Pet Dental Care" },
      { "value": "petNailCare", "label": "Pet Nail and Fur Care" },
      { "value": "petShampoos", "label": "Pet Shampoos and Conditioners" },
      { "value": "petCages", "label": "Pet Cages and Playpens" },
      { "value": "petSnacks", "label": "Pet Snacks and Treats" },
      { "value": "petVitamins", "label": "Pet Vitamins" },
      { "value": "petRaincoats", "label": "Pet Raincoats and Boots" },
      { "value": "petCoolingHeating", "label": "Pet Cooling and Heating Products" },
      { "value": "petRamps", "label": "Pet Ramps and Stairs" },
      { "value": "petHygiene", "label": "Pet Hygiene Products" }
    ]
  },

  {
    "category": "First Aid and Personal Care",
    "label": "First Aid and Personal Care",
    "subcategories": [
      { "value": "skincare", "label": "Skincare" },
      { "value": "haircare", "label": "Haircare" },
      { "value": "oralcare", "label": "Oral Care" },
      { "value": "bathandbody", "label": "Bath and Body" },
      { "value": "feminineHygiene", "label": "Feminine Hygiene" },
      { "value": "babyCare", "label": "Baby Care" },
      { "value": "perfumesandDeodorants", "label": "Perfumes and Deodorants" },
      { "value": "toiletries", "label": "Toiletries" },
      { "value": "firstAidKits", "label": "First Aid Kits" },
      { "value": "bandages", "label": "Bandages and Elastic Bandages" },
      { "value": "gauze", "label": "Gauze and Sterile Pads" },
      { "value": "woundCare", "label": "Wound Cleaners and Antibiotic Ointments" },
      { "value": "disinfectants", "label": "Disinfectants and Antiseptics" },
      { "value": "painRelief", "label": "Pain Relief (Sprays, Creams, Gels)" },
      { "value": "burnCare", "label": "Burn Care" },
      { "value": "eyeCare", "label": "Eye Care and Eye Drops" },
      { "value": "coldHotPacks", "label": "Cold and Hot Packs" },
      { "value": "splints", "label": "Splints and Splint Kits" },
      { "value": "medicalTape", "label": "Medical Tape and Tapes" },
      { "value": "antisepticWipes", "label": "Antiseptic Wipes" },
      { "value": "disposableGloves", "label": "Disposable Gloves" },
      { "value": "disposableMasks", "label": "Disposable and Surgical Masks" },
      { "value": "thermometers", "label": "Thermometers" },
      { "value": "handSanitizers", "label": "Hand Sanitizers" },
      { "value": "nasalCare", "label": "Nasal Sprays and Balms" },
      { "value": "lipBalms", "label": "Lip Balms" },
      { "value": "footCare", "label": "Foot Creams and Sprays" },
      { "value": "antiItchCreams", "label": "Anti-Itch Creams" },
      { "value": "antifungalCreams", "label": "Antifungal and Athlete's Foot Creams" },
      { "value": "healingOils", "label": "Healing Oils" },
      { "value": "stressRelief", "label": "Stress Relief Creams" },
      { "value": "shaving", "label": "Shaving and Disposable Razors" },
      { "value": "massagers", "label": "Massagers" },
      { "value": "cottonProducts", "label": "Cotton Swabs and Wool" },
      { "value": "throatCare", "label": "Throat Lozenges" },
      { "value": "medicatedShampoos", "label": "Medicated Shampoos" },
      { "value": "eyebrowTweezers", "label": "Eyebrow Tweezers" },
      { "value": "vaporRub", "label": "Vicks Vapor Rub" },
      { "value": "sanitaryPads", "label": "Sanitary Pads" },
      { "value": "glucoseGels", "label": "Glucose Gels" }
    ]
  },  
  
  
  {
    "category": "Gym Essentials",
    "label": "Gym Essentials",
    "subcategories": [
      { "value": "dumbbells", "label": "Dumbbells" },
      { "value": "kettlebells", "label": "Kettlebells" },
      { "value": "barbells", "label": "Barbells" },
      { "value": "powerBlocks", "label": "PowerBlocks" },
      { "value": "medicineBalls", "label": "Medicine Balls" },
      { "value": "weightedVests", "label": "Weighted Vests" },
      { "value": "ankleWeights", "label": "Ankle Weights" },
      { "value": "resistanceBands", "label": "Resistance Bands" },
      { "value": "resistanceLoops", "label": "Resistance Loops" },
      { "value": "resistanceTubes", "label": "Resistance Tubes" },
      { "value": "liftingStraps", "label": "Lifting Straps" },
      { "value": "liftingChalk", "label": "Lifting Chalk" },
      { "value": "powerRacks", "label": "Power Racks" },
      { "value": "squatRacks", "label": "Squat Racks" },
      { "value": "pullUpBars", "label": "Pull-Up Bars" },
      { "value": "sleds", "label": "Sleds" },
      { "value": "abWheels", "label": "Ab Wheels" },
      { "value": "foamRollers", "label": "Foam Rollers" },
      { "value": "battleRopes", "label": "Battle Ropes" },
      { "value": "agilityLadders", "label": "Agility Ladders" },
      { "value": "exerciseBalls", "label": "Exercise Balls" },
      { "value": "jumpRopes", "label": "Jump Ropes" },
      { "value": "gymGloves", "label": "Gym Gloves" },
      { "value": "gymBelts", "label": "Gym Belts" },
      { "value": "gymTowels", "label": "Gym Towels" },
      { "value": "gymBags", "label": "Gym Bags" },
      { "value": "sweatbands", "label": "Sweatbands" },
      { "value": "headbands", "label": "Headbands" },
      { "value": "workoutHats", "label": "Workout Hats" },
      { "value": "gymShorts", "label": "Gym Shorts" },
      { "value": "trainingTShirts", "label": "Training T-Shirts" },
      { "value": "compressionTights", "label": "Compression Tights" },
      { "value": "sportsBras", "label": "Sports Bras" },
      { "value": "workoutLeggings", "label": "Workout Leggings" },
      { "value": "runningShoes", "label": "Running Shoes" },
      { "value": "trainingShoes", "label": "Training Shoes" },
      { "value": "yogaMats", "label": "Yoga Mats" }
    ]
  },     

  {
    "category": "Outdoor Fitness Gear",
    "label": "Outdoor Fitness Gear",
    "subcategories": [
      { "value": "reflectiveVests", "label": "Reflective Vests and Bands" },
      { "value": "hydrationPacks", "label": "Hydration Packs" },
      { "value": "sunscreen", "label": "Sunscreen for Outdoor Fitness" },
      { "value": "insectRepellents", "label": "Outdoor Insect Repellents" },
      { "value": "compasses", "label": "Fitness Compasses for Hiking" },
      { "value": "gpsDevices", "label": "GPS Devices for Runners" },
      { "value": "firstAidKits", "label": "First Aid Kits for Outdoor Fitness" },
      { "value": "trailShoes", "label": "Trail Running Shoes" },
      { "value": "resistantJackets", "label": "Weather-Resistant Fitness Jackets" },
      { "value": "outdoorHats", "label": "Sun-Protective Fitness Hats" },
      { "value": "sunglasses", "label": "Sports Sunglasses" },
      { "value": "fannyPacks", "label": "Hands-Free Running Belts" },
      { "value": "runningBelts", "label": "Fitness Running Belts" },
      { "value": "sandbags", "label": "Weighted Sandbags for Workouts" },
      { "value": "resistanceBands", "label": "Outdoor Resistance Bands" },
      { "value": "kettlebells", "label": "Portable Kettlebells" },
      { "value": "medicineBalls", "label": "Outdoor Medicine Balls" },
      { "value": "weightedVests", "label": "Weighted Vests for Outdoor Workouts" },
      { "value": "jumpRopes", "label": "Jump Ropes for Cardio" },
      { "value": "campingTents", "label": "Fitness Recovery Tents" },
      { "value": "sleepingBags", "label": "Restful Sleeping Bags" },
      { "value": "coolers", "label": "Coolers for Hydration" },
      { "value": "outdoorBlankets", "label": "Recovery Blankets" },
      { "value": "outdoorTowels", "label": "Cooling Towels for Workouts" },
      { "value": "pocketKnives", "label": "Multipurpose Pocket Knives" },
      { "value": "headlamps", "label": "Fitness Headlamps" },
      { "value": "binoculars", "label": "Outdoor Observation Gear" },
      { "value": "multiTools", "label": "Fitness Multi-Tools" },
      { "value": "waterproofBags", "label": "Waterproof Fitness Bags" },
      { "value": "portableChargers", "label": "Portable Chargers for Outdoor Fitness" }
    ]
  },  
    
  {
    "category": "Yoga & Meditation Essentials",
    "label": "Yoga & Meditation Essentials",
    "subcategories": [
      { "value": "yogaMats", "label": "Non-Slip Yoga Mats" },
      { "value": "yogaBlocks", "label": "Supportive Yoga Blocks" },
      { "value": "yogaStraps", "label": "Stretching Yoga Straps" },
      { "value": "yogaWheels", "label": "Yoga Wheels for Flexibility" },
      { "value": "stretchBands", "label": "Stretch Bands for Yoga" },
      { "value": "foamRollers", "label": "Foam Rollers for Recovery" },
      { "value": "meditationPillows", "label": "Ergonomic Meditation Pillows" },
      { "value": "zafuCushions", "label": "Zafu Meditation Cushions" },
      { "value": "yogaBolsters", "label": "Yoga Bolsters for Comfort" },
      { "value": "meditationStools", "label": "Adjustable Meditation Stools" },
      { "value": "eyePillows", "label": "Relaxing Eye Pillows" },
      { "value": "meditationShawls", "label": "Cozy Meditation Shawls" },
      { "value": "lavenderBags", "label": "Lavender Aromatherapy Bags" },
      { "value": "incense", "label": "Soothing Incense Sticks" },
      { "value": "essentialOils", "label": "Aromatherapy Essential Oils" },
      { "value": "saltLamps", "label": "Himalayan Salt Lamps" },
      { "value": "meditationChimes", "label": "Meditation Chimes for Focus" },
      { "value": "chantingBowls", "label": "Calming Chanting Bowls" },
      { "value": "smudgeSticks", "label": "Purifying Smudge Sticks" },
      { "value": "yogaTowels", "label": "Absorbent Yoga Towels" },
      { "value": "yogaPants", "label": "Comfortable Yoga Pants" },
      { "value": "sportsBras", "label": "Supportive Sports Bras" },
      { "value": "yogaShirts", "label": "Lightweight Yoga Shirts" },
      { "value": "socks", "label": "Grip Yoga Socks" },
      { "value": "headbands", "label": "Breathable Yoga Headbands" },
      { "value": "yogaGloves", "label": "Anti-Slip Yoga Gloves" },
      { "value": "matBags", "label": "Convenient Yoga Mat Bags" },
      { "value": "yogaRugs", "label": "Traditional Yoga Rugs" },
      { "value": "yogaBlankets", "label": "Soft Yoga Blankets" },
      { "value": "yogaPillows", "label": "Versatile Yoga Pillows" }
    ]
  },  

  {
    "category": "Cricket Essentials",
    "label": "Cricket Essentials",
    "subcategories": [
      { "value": "cricketBats", "label": "Cricket Bats" },
      { "value": "cricketBalls", "label": "Cricket Balls" },
      { "value": "cricketStumps", "label": "Cricket Stumps & Bails" },
      { "value": "cricketWickets", "label": "Cricket Wickets" },
      { "value": "cricketBowlingMachines", "label": "Bowling Machines" },
      { "value": "cricketTrainingAids", "label": "Training Aids" },
      { "value": "cricketCages", "label": "Practice Cages" },
      { "value": "cricketBoundaryMarkers", "label": "Boundary Markers" },
      { "value": "cricketPads", "label": "Leg Pads" },
      { "value": "cricketGloves", "label": "Batting Gloves" },
      { "value": "cricketHelmets", "label": "Helmets" },
      { "value": "cricketArmGuards", "label": "Arm Guards" },
      { "value": "cricketThighGuards", "label": "Thigh Guards" },
      { "value": "cricketShinGuards", "label": "Shin Guards" },
      { "value": "cricketProtectiveBoxes", "label": "Protective Boxes" },
      { "value": "cricketMouthguards", "label": "Mouthguards" },
      { "value": "cricketWicketKeepingGloves", "label": "Wicket Keeping Gloves" },
      { "value": "cricketWicketKeepingPads", "label": "Wicket Keeping Pads" },
      { "value": "cricketJerseys", "label": "Cricket Jerseys" },
      { "value": "cricketPants", "label": "Cricket Pants" },
      { "value": "cricketCaps", "label": "Cricket Caps" },
      { "value": "cricketSocks", "label": "Performance Socks" },
      { "value": "cricketShirts", "label": "Cricket Shirts" },
      { "value": "cricketSweaters", "label": "Cricket Sweaters" },
      { "value": "cricketRainwear", "label": "Rainwear" },
      { "value": "cricketVests", "label": "Vests" },
      { "value": "cricketBelts", "label": "Belts" },
      { "value": "cricketShoes", "label": "Cricket Shoes" },
      { "value": "cricketBags", "label": "Gear Bags" },
      { "value": "cricketUmpiresGear", "label": "Umpire Gear" }
    ]
  },  

  {
    "category": "Squash Essentials",
    "label": "Squash Essentials",
    "subcategories": [
      { "value": "squashRackets", "label": "Rackets" },
      { "value": "squashBalls", "label": "Balls" },
      { "value": "squashRacketStrings", "label": "Racket Strings" },
      { "value": "squashRacketCovers", "label": "Racket Covers" },
      { "value": "squashRacketCases", "label": "Racket Cases" },
      { "value": "squashGripTapes", "label": "Grip Tapes" },
      { "value": "squashGrips", "label": "Racket Grips" },
      { "value": "squashBallContainers", "label": "Ball Containers" },
      { "value": "squashTrainingAids", "label": "Training Aids" },
      { "value": "squashGoggles", "label": "Protective Goggles" },
      { "value": "squashKneePads", "label": "Knee Pads" },
      { "value": "squashWristbands", "label": "Wristbands" },
      { "value": "squashArmBands", "label": "Arm Bands" },
      { "value": "squashSweatbands", "label": "Sweatbands" },
      { "value": "squashClothing", "label": "Clothing" },
      { "value": "squashShirts", "label": "Shirts" },
      { "value": "squashPants", "label": "Pants" },
      { "value": "squashShorts", "label": "Shorts" },
      { "value": "squashSocks", "label": "Socks" },
      { "value": "squashHeadbands", "label": "Headbands" },
      { "value": "squashWarmUpJackets", "label": "Warm-Up Jackets" },
      { "value": "squashCompressionWear", "label": "Compression Wear" },
      { "value": "squashShoes", "label": "Squash Shoes" },
      { "value": "squashCourtShoes", "label": "Court Shoes" },
      { "value": "squashBags", "label": "Gear Bags" },
      { "value": "squashTowels", "label": "Towels" }
    ]
  },  
    
    
  {
    "category": "Gymnastics Equipment",
    "label": "Gymnastics Equipment",
    "subcategories": [
      // Essentials & Apparatus
      { "value": "gymnasticsMats", "label": "Mats" },
      { "value": "gymnasticsBars", "label": "Bars" },
      { "value": "gymnasticsRings", "label": "Rings" },
      { "value": "gymnasticsBalanceBeams", "label": "Balance Beams" },
      { "value": "gymnasticsVault", "label": "Vaults" },
      { "value": "gymnasticsPommelHorses", "label": "Pommel Horses" },
      { "value": "gymnasticsTrampolines", "label": "Trampolines" },
      { "value": "gymnasticsParallettes", "label": "Parallettes" },
      { "value": "gymnasticsFloorMats", "label": "Floor Mats" },
      { "value": "gymnasticsPitFoam", "label": "Pit Foam" },
      { "value": "gymnasticsTumbleTrack", "label": "Tumble Tracks" },
      { "value": "gymnasticsBarPadding", "label": "Bar Padding" },
      { "value": "gymnasticsBeamPads", "label": "Beam Pads" },
      { "value": "gymnasticsBumperBlocks", "label": "Bumper Blocks" },
  
      // Training & Flexibility Aids
      { "value": "gymnasticsResistanceBands", "label": "Resistance Bands" },
      { "value": "gymnasticsStretchingStraps", "label": "Stretching Straps" },
      { "value": "gymnasticsFoamRollers", "label": "Foam Rollers" },
  
      // Protective Gear
      { "value": "gymnasticsGrips", "label": "Grips" },
      { "value": "gymnasticsGloves", "label": "Gloves" },
      { "value": "gymnasticsWraps", "label": "Wraps" },
      { "value": "gymnasticsKneePads", "label": "Knee Pads" },
  
      // Apparel
      { "value": "gymnasticsLeotards", "label": "Leotards" },
      { "value": "gymnasticsTights", "label": "Tights" },
      { "value": "gymnasticsShirts", "label": "Shirts" },
      { "value": "gymnasticsLeggings", "label": "Leggings" },
      { "value": "gymnasticsWarmUpJackets", "label": "Warm-Up Jackets" },
  
      // Accessories
      { "value": "gymnasticsHandstands", "label": "Handstand Tools" },
      { "value": "gymnasticsGymNets", "label": "Gym Nets" },
      { "value": "gymnasticsWaterBottles", "label": "Water Bottles" }
    ]
  },  
    
  {
    "category": "Team Sports",
    "label": "Soccer/Football/Basketball Equipment",
    "subcategories": [
      // Soccer Equipment
      { "value": "soccerBalls", "label": "Soccer Balls" },
      { "value": "soccerBoots", "label": "Soccer Boots" },
      { "value": "soccerPads", "label": "Pads" },
      { "value": "soccerShinGuards", "label": "Shin Guards" },
      { "value": "soccerGoalkeeperGloves", "label": "Goalkeeper Gloves" },
      { "value": "soccerJerseys", "label": "Jerseys" },
      { "value": "soccerShorts", "label": "Shorts" },
      { "value": "soccerSocks", "label": "Socks" },
      { "value": "soccerTrainingAids", "label": "Training Aids" },
      { "value": "soccerGoalkeeperKits", "label": "Goalkeeper Kits" },
      { "value": "soccerBags", "label": "Bags" },
      { "value": "soccerRefereeKits", "label": "Referee Kits" },
  
      // Basketball Equipment
      { "value": "basketballHoops", "label": "Hoops" },
      { "value": "basketballBalls", "label": "Basketball Balls" },
      { "value": "basketballShoes", "label": "Shoes" },
      { "value": "basketballJerseys", "label": "Jerseys" },
      { "value": "basketballShorts", "label": "Shorts" },
      { "value": "basketballSocks", "label": "Socks" },
      { "value": "basketballTrainingAids", "label": "Training Aids" },
      { "value": "basketballCompressionWear", "label": "Compression Wear" },
      { "value": "basketballBackboards", "label": "Backboards" },
      { "value": "basketballNets", "label": "Nets" },
      { "value": "basketballPumps", "label": "Pumps" },
      { "value": "basketballRims", "label": "Rims" },
      { "value": "basketballScoreboards", "label": "Scoreboards" },
      { "value": "basketballRefereeKits", "label": "Referee Kits" },
      { "value": "basketballWhistles", "label": "Whistles" },
      { "value": "basketballWaterBottles", "label": "Water Bottles" },
      { "value": "basketballTowels", "label": "Towels" },
      { "value": "basketballHeadbands", "label": "Headbands" },
      { "value": "basketballWristbands", "label": "Wristbands" },
      { "value": "basketballAnkleBraces", "label": "Ankle Braces" },
      { "value": "basketballKneeBraces", "label": "Knee Braces" },
      { "value": "basketballElbowBraces", "label": "Elbow Braces" },
      { "value": "basketballMouthguards", "label": "Mouthguards" },
      { "value": "basketballGloves", "label": "Gloves" },
      { "value": "basketballBags", "label": "Bags" },
  
      // Football Equipment
      { "value": "footballBalls", "label": "Football Balls" },
      { "value": "footballBoots", "label": "Boots" },
      { "value": "footballHelmets", "label": "Helmets" },
      { "value": "footballJerseys", "label": "Jerseys" },
      { "value": "footballPads", "label": "Pads" },
      { "value": "footballShoulderPads", "label": "Shoulder Pads" },
      { "value": "footballCleats", "label": "Cleats" },
      { "value": "footballMouthguards", "label": "Mouthguards" },
      { "value": "footballGloves", "label": "Gloves" },
      { "value": "footballSocks", "label": "Socks" },
      { "value": "footballCompressionWear", "label": "Compression Wear" },
      { "value": "footballTrainingAids", "label": "Training Aids" },
      { "value": "footballTowels", "label": "Towels" },
      { "value": "footballRefereeKits", "label": "Referee Kits" }
    ]
  },  
    
  {
    "category": "Racquet Sports",
    "label": "Tennis & Badminton Equipment",
    "subcategories": [
      // Tennis Equipment
      { "value": "tennisRackets", "label": "Tennis Rackets" },
      { "value": "tennisBalls", "label": "Tennis Balls" },
      { "value": "tennisGrips", "label": "Tennis Grips" },
      { "value": "tennisShoes", "label": "Tennis Shoes" },
      { "value": "tennisShirts", "label": "Tennis Shirts" },
      { "value": "tennisShorts", "label": "Tennis Shorts" },
      { "value": "tennisSocks", "label": "Tennis Socks" },
      { "value": "tennisCompressionWear", "label": "Tennis Compression Wear" },
      { "value": "tennisVisors", "label": "Tennis Visors" },
      { "value": "tennisHeadbands", "label": "Tennis Headbands" },
      { "value": "tennisGripTapes", "label": "Tennis Grip Tapes" },
      { "value": "tennisStringingKits", "label": "Tennis Stringing Kits" },
      { "value": "tennisRacketCovers", "label": "Tennis Racket Covers" },
      { "value": "tennisTrainingAids", "label": "Tennis Training Aids" },
      { "value": "tennisWristbands", "label": "Tennis Wristbands" },
      { "value": "tennisTowels", "label": "Tennis Towels" },
  
      // Badminton Equipment
      { "value": "badmintonRackets", "label": "Badminton Rackets" },
      { "value": "badmintonBalls", "label": "Badminton Balls" },
      { "value": "badmintonShoes", "label": "Badminton Shoes" },
      { "value": "badmintonShirts", "label": "Badminton Shirts" },
      { "value": "badmintonShorts", "label": "Badminton Shorts" },
      { "value": "badmintonSocks", "label": "Badminton Socks" },
      { "value": "badmintonCompressionWear", "label": "Badminton Compression Wear" },
      { "value": "badmintonShuttlecocks", "label": "Badminton Shuttlecocks" },
      { "value": "badmintonGripTapes", "label": "Badminton Grip Tapes" },
      { "value": "badmintonRacketCovers", "label": "Badminton Racket Covers" },
      { "value": "badmintonTrainingAids", "label": "Badminton Training Aids" },
      { "value": "badmintonWristbands", "label": "Badminton Wristbands" },
      { "value": "badmintonTowels", "label": "Badminton Towels" },
      { "value": "badmintonRacketStringing", "label": "Badminton Racket Stringing" },
  
      // General Equipment
      { "value": "racquetBags", "label": "Racquet Bags" }
    ]
  },  
    
  {
    "category": "Swimming",
    "label": "Swimming & Water Sports",
    "subcategories": [
      // Swimming Equipment
      { "value": "swimmingGoggles", "label": "Swimming Goggles" },
      { "value": "swimmingCaps", "label": "Swimming Caps" },
      { "value": "swimmingPaddles", "label": "Swimming Paddles" },
      { "value": "swimmingFins", "label": "Swimming Fins" },
      { "value": "swimmingBoards", "label": "Swimming Boards" },
      { "value": "swimmingSuits", "label": "Swimming Suits" },
      { "value": "swimmingEarplugs", "label": "Swimming Earplugs" },
      { "value": "swimmingNoseClips", "label": "Swimming Nose Clips" },
      { "value": "swimmingSnorkels", "label": "Swimming Snorkels" },
      { "value": "swimmingKickboards", "label": "Swimming Kickboards" },
      { "value": "swimmingTowels", "label": "Swimming Towels" },
      { "value": "swimmingWaterShoes", "label": "Swimming Water Shoes" },
      { "value": "swimmingLifeguardWhistles", "label": "Swimming Lifeguard Whistles" },
      { "value": "swimmingWaterProofBags", "label": "Swimming Waterproof Bags" },
      { "value": "swimmingHydrationPacks", "label": "Swimming Hydration Packs" },
      { "value": "swimmingGogglesStraps", "label": "Swimming Goggles Straps" },
      { "value": "swimmingEarDefenders", "label": "Swimming Ear Defenders" },
      { "value": "swimmingPerformanceSuits", "label": "Swimming Performance Suits" },
      { "value": "swimmingWetsuits", "label": "Swimming Wetsuits" },
      { "value": "swimmingMeshBags", "label": "Swimming Mesh Bags" },
      { "value": "swimmingStretchBands", "label": "Swimming Stretch Bands" },
      { "value": "swimmingGoggleCases", "label": "Swimming Goggle Cases" },
  
      // Water Polo Equipment
      { "value": "waterPolo", "label": "Water Polo" },
      { "value": "waterPoloCaps", "label": "Water Polo Caps" },
      { "value": "waterPoloBalls", "label": "Water Polo Balls" },
  
      // Water Aerobics Equipment
      { "value": "waterAerobicsEquipment", "label": "Water Aerobics Equipment" },
      { "value": "wateraerobicsEquipment", "label": "Water Aerobics Equipment" },
  
      // Swimming Resistance Equipment
      { "value": "swimmingResistanceBands", "label": "Swimming Resistance Bands" }
    ]
  },  
    
  {
    "category": "cycling",
    "label": "Cycling Equipment",
    "subcategories": [
      // Bikes and Essential Gear
      { "value": "cyclingBikes", "label": "Cycling Bikes" },
      { "value": "cyclingHelmets", "label": "Cycling Helmets" },
      { "value": "cyclingGloves", "label": "Cycling Gloves" },
      { "value": "cyclingBags", "label": "Cycling Bags" },
      { "value": "cyclingLights", "label": "Cycling Lights" },
      { "value": "cyclingShoes", "label": "Cycling Shoes" },
      { "value": "cyclingJerseys", "label": "Cycling Jerseys" },
      { "value": "cyclingShorts", "label": "Cycling Shorts" },
      { "value": "cyclingSocks", "label": "Cycling Socks" },
      { "value": "cyclingKits", "label": "Cycling Kits" },
  
      // Maintenance and Repair Tools
      { "value": "cyclingWaterBottles", "label": "Cycling Water Bottles" },
      { "value": "cyclingLock", "label": "Cycling Lock" },
      { "value": "cyclingTubes", "label": "Cycling Tubes" },
      { "value": "cyclingTires", "label": "Cycling Tires" },
      { "value": "cyclingPedals", "label": "Cycling Pedals" },
      { "value": "cyclingChains", "label": "Cycling Chains" },
      { "value": "cyclingShifters", "label": "Cycling Shifters" },
      { "value": "cyclingBrakes", "label": "Cycling Brakes" },
      { "value": "cyclingCages", "label": "Cycling Cages" },
      { "value": "cyclingRacks", "label": "Cycling Racks" },
      { "value": "cyclingRepairKits", "label": "Cycling Repair Kits" },
      { "value": "cyclingPump", "label": "Cycling Pump" },
  
      // Cycling Clothing and Weather Protection
      { "value": "cyclingReflectiveVests", "label": "Cycling Reflective Vests" },
      { "value": "cyclingArmWarmers", "label": "Cycling Arm Warmers" },
      { "value": "cyclingKneeWarmers", "label": "Cycling Knee Warmers" },
      { "value": "cyclingShoeCovers", "label": "Cycling Shoe Covers" },
      { "value": "cyclingRainCapes", "label": "Cycling Rain Capes" },
      { "value": "cyclingWindbreakers", "label": "Cycling Windbreakers" },
  
      // Accessories and Electronics
      { "value": "cyclingGlasses", "label": "Cycling Glasses" },
      { "value": "cyclingFenders", "label": "Cycling Fenders" },
      { "value": "cyclingBikeComputers", "label": "Cycling Bike Computers" },
      { "value": "cyclingHydrationPacks", "label": "Cycling Hydration Packs" },
  
      // Additional Parts and Specialized Equipment
      { "value": "cyclingSpareParts", "label": "Cycling Spare Parts" },
      { "value": "cyclingTrainingAids", "label": "Cycling Training Aids" },
      { "value": "cyclingSaddleBags", "label": "Cycling Saddle Bags" },
      { "value": "cyclingTowingSystems", "label": "Cycling Towing Systems" }
    ]
  },  
    
  {
    "category": "Combat Sports",
    "label": "Combat Sports Equipment",
    "subcategories": [
      // Gloves and Protective Gear
      { "value": "boxingGloves", "label": "Boxing Gloves" },
      { "value": "mmaGloves", "label": "MMA Gloves" },
      { "value": "kickboxingGloves", "label": "Kickboxing Gloves" },
      { "value": "headGuards", "label": "Head Guards" },
      { "value": "shinGuards", "label": "Shin Guards" },
      { "value": "mouthGuards", "label": "Mouth Guards" },
      { "value": "boxingHeadgear", "label": "Boxing Headgear" },
      { "value": "fightMouthguards", "label": "Fight Mouthguards" },
      { "value": "combatSportsProtection", "label": "Combat Sports Protection" },
  
      // Training Equipment
      { "value": "boxingBags", "label": "Boxing Bags" },
      { "value": "punchingPads", "label": "Punching Pads" },
      { "value": "focusMitt", "label": "Focus Mitts" },
      { "value": "speedBags", "label": "Speed Bags" },
      { "value": "punchingBall", "label": "Punching Ball" },
      { "value": "trainingDummies", "label": "Training Dummies" },
  
      // Combat Apparel and Clothing
      { "value": "combatSportsApparel", "label": "Combat Sports Apparel" },
      { "value": "mmaRashGuards", "label": "MMA Rash Guards" },
      { "value": "mmaCompressionShorts", "label": "MMA Compression Shorts" },
      { "value": "boxingRobes", "label": "Boxing Robes" },
      { "value": "boxingTrunks", "label": "Boxing Trunks" },
  
      // Shoes and Accessories
      { "value": "boxingShoes", "label": "Boxing Shoes" },
      { "value": "wrestlingShoes", "label": "Wrestling Shoes" },
      { "value": "boxingHandWraps", "label": "Boxing Hand Wraps" },
      { "value": "boxingJumpRopes", "label": "Boxing Jump Ropes" },
  
      // Miscellaneous
      { "value": "mmaShorts", "label": "MMA Shorts" },
      { "value": "kickboxingPads", "label": "Kickboxing Pads" },
      { "value": "combatSportsTowels", "label": "Combat Sports Towels" },
      { "value": "mmaKicks", "label": "MMA Kicks" },
      { "value": "combatSportsBags", "label": "Combat Sports Bags" },
      { "value": "grapplingGloves", "label": "Grappling Gloves" }
    ]
  },  
    
  {
    "category": "WinterSports",
    "label": "Winter Sports Equipment",
    "subcategories": [
      // Snowboarding and Ski Gear
      { "value": "snowboards", "label": "Snowboards" },
      { "value": "skiGear", "label": "Ski Gear" },
      { "value": "snowboardBindings", "label": "Snowboard Bindings" },
      { "value": "skiBindings", "label": "Ski Bindings" },
  
      // Protective Gear
      { "value": "winterHelmets", "label": "Winter Sports Helmets" },
      { "value": "snowboardHelmets", "label": "Snowboard Helmets" },
      { "value": "skiMasks", "label": "Ski Masks" },
      { "value": "snowSuits", "label": "Snow Suits" },
      { "value": "snowGoggles", "label": "Snow Goggles" },
  
      // Footwear and Gloves
      { "value": "skiBoots", "label": "Ski Boots" },
      { "value": "snowboardBoots", "label": "Snowboard Boots" },
      { "value": "winterBoots", "label": "Winter Boots" },
      { "value": "skiGloves", "label": "Ski Gloves" },
      { "value": "snowboardGloves", "label": "Snowboard Gloves" },
  
      // Apparel
      { "value": "snowboardJackets", "label": "Snowboard Jackets" },
      { "value": "skiJackets", "label": "Ski Jackets" },
      { "value": "snowboardPants", "label": "Snowboard Pants" },
      { "value": "skiPants", "label": "Ski Pants" },
      { "value": "thermalUnderwear", "label": "Thermal Underwear" },
      { "value": "snowSocks", "label": "Snow Socks" },
  
      // Winter Accessories
      { "value": "handWarmers", "label": "Hand Warmers" },
      { "value": "footWarmers", "label": "Foot Warmers" },
      { "value": "snowShovels", "label": "Snow Shovels" },
      { "value": "avalancheGear", "label": "Avalanche Safety Gear" },
  
      // Bags and Backpacks
      { "value": "winterBackpacks", "label": "Winter Backpacks" },
      { "value": "snowboardBags", "label": "Snowboard Bags" },
      { "value": "skiBags", "label": "Ski Bags" },
      { "value": "skiLock", "label": "Ski Lock" },
  
      // Tuning and Maintenance
      { "value": "skiTuningKits", "label": "Ski Tuning Kits" },
      { "value": "snowboardWax", "label": "Snowboard Wax" },
      { "value": "snowboardTuningKits", "label": "Snowboard Tuning Kits" },
      { "value": "skiTuningTools", "label": "Ski Tuning Tools" },
      { "value": "skiStraps", "label": "Ski Straps" },
  
      // Ice Skating
      { "value": "iceSkates", "label": "Ice Skates" },
      { "value": "iceSkatingSuits", "label": "Ice Skating Suits" },
      { "value": "winterSportsGlasses", "label": "Winter Sports Glasses" }
    ]
  },  
    
  {
    "category": "Kabaddi",
    "label": "Kabaddi Equipment",
    "subcategories": [
      { "value": "kabaddiBalls", "label": "Kabaddi Balls" },
      { "value": "kabaddiShoes", "label": "Kabaddi Shoes" },
      { "value": "kabaddiPads", "label": "Kabaddi Pads" },
      { "value": "kabaddiJerseys", "label": "Kabaddi Jerseys" },
      { "value": "kabaddiGloves", "label": "Kabaddi Gloves" },
      { "value": "kabaddiKneePads", "label": "Kabaddi Knee Pads" },
      { "value": "kabaddiElbowPads", "label": "Kabaddi Elbow Pads" },
      { "value": "kabaddiShorts", "label": "Kabaddi Shorts" },
      { "value": "kabaddiTracksuits", "label": "Kabaddi Tracksuits" },
      { "value": "kabaddiHeadgear", "label": "Kabaddi Headgear" },
      { "value": "kabaddiArmGuards", "label": "Kabaddi Arm Guards" },
      { "value": "kabaddiTrainingVests", "label": "Kabaddi Training Vests" },
      { "value": "kabaddiBelts", "label": "Kabaddi Belts" },
      { "value": "kabaddiT-shirts", "label": "Kabaddi T-shirts" },
      { "value": "kabaddiWaterBottles", "label": "Kabaddi Water Bottles" },
      { "value": "kabaddiResistanceBands", "label": "Kabaddi Resistance Bands" },
      { "value": "kabaddiRecoveryTowels", "label": "Kabaddi Recovery Towels" },
      { "value": "kabaddiFirstAidKits", "label": "Kabaddi First Aid Kits" },
      { "value": "kabaddiMouthGuards", "label": "Kabaddi Mouth Guards" },
      { "value": "kabaddiTrainingCones", "label": "Kabaddi Training Cones" },
      { "value": "kabaddiWhistles", "label": "Kabaddi Whistles" },
      { "value": "kabaddiRefereeFlags", "label": "Kabaddi Referee Flags" },
      { "value": "kabaddiSocks", "label": "Kabaddi Socks" },
      { "value": "kabaddiGoalMarkers", "label": "Kabaddi Goal Markers" }
    ]
  },  
    
  {
    "category": "Kids Sports",
    "label": "Kids Sports & Equipment",
    "subcategories": [
      { "value": "babyfoods", "label": "Baby Foods" },
      { "value": "babyClothing", "label": "Baby Clothing" },
      { "value": "diapers", "label": "Diapers" },
      { "value": "wipes", "label": "Wipes" },
      { "value": "babyskinCare", "label": "Baby Skin Care" },
      { "value": "kidsBalls", "label": "Kids Balls" },
      { "value": "kidsShoes", "label": "Kids Shoes" },
      { "value": "kidsPads", "label": "Kids Pads" },
      { "value": "kidsHelmets", "label": "Kids Helmets" },
      { "value": "kidsGloves", "label": "Kids Gloves" },
      { "value": "kidsJerseys", "label": "Kids Jerseys" },
      { "value": "kidsRackets", "label": "Kids Rackets" },
      { "value": "kidsSkates", "label": "Kids Skates" },
      { "value": "kidsScooters", "label": "Kids Scooters" },
      { "value": "kidsBicycles", "label": "Kids Bicycles" },
      { "value": "kidsScooterHelmets", "label": "Kids Scooter Helmets" },
      { "value": "kidsSportsSocks", "label": "Kids Sports Socks" },
      { "value": "kidsSwimmingGoggles", "label": "Kids Swimming Goggles" },
      { "value": "kidsSwimCaps", "label": "Kids Swim Caps" },
      { "value": "kidsJumpRopes", "label": "Kids Jump Ropes" },
      { "value": "kidsYogaMats", "label": "Kids Yoga Mats" },
      { "value": "kidsTrainingCones", "label": "Kids Training Cones" },
      { "value": "kidsHockeySticks", "label": "Kids Hockey Sticks" },
      { "value": "kidsFootball", "label": "Kids Football" },
      { "value": "kidsBaseballBats", "label": "Kids Baseball Bats" },
      { "value": "kidsBasketballHoops", "label": "Kids Basketball Hoops" },
      { "value": "kidsBadmintonRackets", "label": "Kids Badminton Rackets" },
      { "value": "kidsTennisRackets", "label": "Kids Tennis Rackets" },
      { "value": "kidsArcherySets", "label": "Kids Archery Sets" },
      { "value": "kidsPaddles", "label": "Kids Paddles" },
      { "value": "kidsKickBoards", "label": "Kids Kickboards" },
      { "value": "kidsBowlingSets", "label": "Kids Bowling Sets" },
      { "value": "kidsFootballCleats", "label": "Kids Football Cleats" }
    ]
  },  
    
  {
    "category": "Fitness Trackers",
    "label": "Fitness Trackers",
    "subcategories": [
      { "value": "fitnessWatches", "label": "Fitness Watches" },
      { "value": "fitnessBands", "label": "Fitness Bands" },
      { "value": "heartRateMonitors", "label": "Heart Rate Monitors" },
      { "value": "gpsTrackers", "label": "GPS Trackers" },
      { "value": "smartwatches", "label": "Smartwatches" },
      { "value": "activityTrackers", "label": "Activity Trackers" },
      { "value": "sleepTrackers", "label": "Sleep Trackers" },
      { "value": "calorieTrackers", "label": "Calorie Trackers" },
      { "value": "pedometers", "label": "Pedometers" },
      { "value": "bloodPressureMonitors", "label": "Blood Pressure Monitors" },
      { "value": "fitnessApps", "label": "Fitness Apps" },
      { "value": "bodyCompositionMonitors", "label": "Body Composition Monitors" },
      { "value": "fitnessSmartScales", "label": "Fitness Smart Scales" },
      { "value": "spO2Monitors", "label": "SpO2 Monitors" },
      { "value": "fitnessChestStraps", "label": "Fitness Chest Straps" },
      { "value": "electrocardiogramMonitors", "label": "ECG Monitors" },
      { "value": "swimTrackers", "label": "Swim Trackers" },
      { "value": "multiSportTrackers", "label": "Multi-Sport Trackers" },
      { "value": "fitnessTrackerBands", "label": "Fitness Tracker Bands" },
      { "value": "cyclingComputers", "label": "Cycling Computers" },
      { "value": "activityMonitors", "label": "Activity Monitors" },
      { "value": "runningTrackers", "label": "Running Trackers" }
    ]
  },  
    
  {
    "category": "Athletic Care",
    "label": "Athletic Care & Recovery",
    "subcategories": [
      { "value": "icePacks", "label": "Ice Packs" },
      { "value": "muscleCream", "label": "Muscle Cream" },
      { "value": "tape", "label": "Tape" },
      { "value": "compressionSleeves", "label": "Compression Sleeves" },
      { "value": "massageRollers", "label": "Massage Rollers" },
      { "value": "foamRollers", "label": "Foam Rollers" },
      { "value": "stretchBands", "label": "Stretch Bands" },
      { "value": "jointSupportBraces", "label": "Joint Support Braces" },
      { "value": "kneeBraces", "label": "Knee Braces" },
      { "value": "ankleBraces", "label": "Ankle Braces" },
      { "value": "elbowBraces", "label": "Elbow Braces" },
      { "value": "heatPatches", "label": "Heat Patches" },
      { "value": "coldCompress", "label": "Cold Compress" },
      { "value": "iceBaths", "label": "Ice Baths" },
      { "value": "recoveryBoots", "label": "Recovery Boots" },
      { "value": "massageGuns", "label": "Massage Guns" },
      { "value": "therapeuticGel", "label": "Therapeutic Gel" },
      { "value": "ankleSupport", "label": "Ankle Support" },
      { "value": "tensTherapyDevices", "label": "TENS Therapy Devices" },
      { "value": "muscleStimulators", "label": "Muscle Stimulators" },
      { "value": "recoverySocks", "label": "Recovery Socks" },
      { "value": "hotWaterBottles", "label": "Hot Water Bottles" },
      { "value": "mobilityTools", "label": "Mobility Tools" },
      { "value": "postWorkoutSupplements", "label": "Post Workout Supplements" }
    ]
  },  
    
  {
    "category": "Sports Nutrition",
    "label": "Sports Nutrition",
    "subcategories": [
      { "value": "proteinPowder", "label": "Protein Powder" },
      { "value": "energyBars", "label": "Energy Bars" },
      { "value": "electrolyteDrinks", "label": "Electrolyte Drinks" },
      { "value": "preWorkout", "label": "Pre-Workout" },
      { "value": "postWorkout", "label": "Post-Workout" },
      { "value": "shilajit", "label": "Shilajit" },
      { "value": "aminoAcids", "label": "Amino Acids" },
      { "value": "creatine", "label": "Creatine" },
      { "value": "branchChainAminoAcids", "label": "BCAA (Branch Chain Amino Acids)" },
      { "value": "weightGain", "label": "Weight Gain Supplements" },
      { "value": "fatBurners", "label": "Fat Burners" },
      { "value": "mealReplacement", "label": "Meal Replacement" },
      { "value": "collagen", "label": "Collagen Supplements" },
      { "value": "vitamins", "label": "Vitamins & Minerals" },
      { "value": "fishOil", "label": "Fish Oil" },
      { "value": "greensPowder", "label": "Greens Powder" },
      { "value": "probiotics", "label": "Probiotics" },
      { "value": "caffeineSupplements", "label": "Caffeine Supplements" },
      { "value": "hydrolyzedProtein", "label": "Hydrolyzed Protein" },
      { "value": "carbPowder", "label": "Carb Powder" },
      { "value": "hydrationPowders", "label": "Hydration Powders" },
      { "value": "glutamine", "label": "Glutamine" },
      { "value": "jointSupplements", "label": "Joint Supplements" },
      { "value": "detoxTeas", "label": "Detox Teas" },
      { "value": "snackProtein", "label": "Protein Snacks" }
    ]
  },  
    
  {
    "category": "Dry Fruits",
    "label": "Dry Fruits",
    "subcategories": [
      { "value": "almonds", "label": "Almonds" },
      { "value": "cashews", "label": "Cashews" },
      { "value": "pistachios", "label": "Pistachios" },
      { "value": "walnuts", "label": "Walnuts" },
      { "value": "raisins", "label": "Raisins" },
      { "value": "apricots", "label": "Dried Apricots" },
      { "value": "dates", "label": "Dates" },
      { "value": "figs", "label": "Dried Figs" },
      { "value": "prunes", "label": "Prunes" },
      { "value": "sultanas", "label": "Sultanas" },
      { "value": "driedMango", "label": "Dried Mango" },
      { "value": "driedPapaya", "label": "Dried Papaya" },
      { "value": "cranberries", "label": "Dried Cranberries" },
      { "value": "gojiBerries", "label": "Goji Berries" },
      { "value": "blueberries", "label": "Dried Blueberries" },
      { "value": "cherries", "label": "Dried Cherries" },
      { "value": "hazelnuts", "label": "Hazelnuts" },
      { "value": "pecans", "label": "Pecans" },
      { "value": "brazilNuts", "label": "Brazil Nuts" },
      { "value": "macadamiaNuts", "label": "Macadamia Nuts" },
      { "value": "pineNuts", "label": "Pine Nuts" },
      { "value": "sunflowerSeeds", "label": "Sunflower Seeds" },
      { "value": "pumpkinSeeds", "label": "Pumpkin Seeds" },
      { "value": "chiaSeeds", "label": "Chia Seeds" },
      { "value": "flaxSeeds", "label": "Flax Seeds" }
    ]
  },  
    
  {
    "category": "Cooking Essentials",
    "label": "Cooking Essentials",
    "subcategories": [
      { "value": "spices", "label": "Spices" },
      { "value": "oils", "label": "Oils" },
      { "value": "sauces", "label": "Sauces" },
      { "value": "herbs", "label": "Herbs" },
      { "value": "seasonings", "label": "Seasonings" },
      { "value": "vinegars", "label": "Vinegars" },
      { "value": "salts", "label": "Salts" },
      { "value": "sweeteners", "label": "Sweeteners" },
      { "value": "mustard", "label": "Mustard" },
      { "value": "ketchup", "label": "Ketchup" },
      { "value": "mayonnaise", "label": "Mayonnaise" },
      { "value": "barbecueSauces", "label": "Barbecue Sauces" },
      { "value": "hotSauces", "label": "Hot Sauces" },
      { "value": "soySauces", "label": "Soy Sauces" },
      { "value": "fishSauces", "label": "Fish Sauces" },
      { "value": "cookingWine", "label": "Cooking Wine" },
      { "value": "coconutMilk", "label": "Coconut Milk" },
      { "value": "tomatoPaste", "label": "Tomato Paste" },
      { "value": "peanutButter", "label": "Peanut Butter" },
      { "value": "almondButter", "label": "Almond Butter" },
      { "value": "coconutOil", "label": "Coconut Oil" },
      { "value": "oliveOil", "label": "Olive Oil" },
      { "value": "sesameOil", "label": "Sesame Oil" },
      { "value": "avocadoOil", "label": "Avocado Oil" },
      { "value": "canolaOil", "label": "Canola Oil" },
      { "value": "truffleOil", "label": "Truffle Oil" },
      { "value": "gravy", "label": "Gravy" },
      { "value": "cheeseSauces", "label": "Cheese Sauces" },
      { "value": "spreads", "label": "Spreads" },
      { "value": "chutneys", "label": "Chutneys" },
      { "value": "pickles", "label": "Pickles" },
      { "value": "saladDressings", "label": "Salad Dressings" },
      { "value": "balsamicVinegar", "label": "Balsamic Vinegar" },
      { "value": "appleCiderVinegar", "label": "Apple Cider Vinegar" }
    ]
  },
  {
    "category": "Training Equipment",
    "label": "Training Equipment",
    "subcategories": [
      { "value": "trainingDummies", "label": "Training Dummies" },
      { "value": "sleds", "label": "Sleds" },
      { "value": "agilityLadders", "label": "Agility Ladders" },
      { "value": "trainingCones", "label": "Training Cones" },
      { "value": "speedChutes", "label": "Speed Chutes" },
      { "value": "resistanceBands", "label": "Resistance Bands" },
      { "value": "balanceBoards", "label": "Balance Boards" },
      { "value": "hurdles", "label": "Hurdles" },
      { "value": "medicineBalls", "label": "Medicine Balls" },
      { "value": "kettlebells", "label": "Kettlebells" },
      { "value": "battleRopes", "label": "Battle Ropes" },
      { "value": "jumpRopes", "label": "Jump Ropes" },
      { "value": "punchingBags", "label": "Punching Bags" },
      { "value": "speedBalls", "label": "Speed Balls" },
      { "value": "plyometricBoxes", "label": "Plyometric Boxes" },
      { "value": "sledPushers", "label": "Sled Pushers" },
      { "value": "weightedVests", "label": "Weighted Vests" },
      { "value": "reactionBalls", "label": "Reaction Balls" },
      { "value": "resistanceParachutes", "label": "Resistance Parachutes" },
      { "value": "speedHurdles", "label": "Speed Hurdles" },
      { "value": "verticalJumpTrainer", "label": "Vertical Jump Trainer" },
      { "value": "trainingBells", "label": "Training Bells" },
      { "value": "pushUpBars", "label": "Push-Up Bars" },
      { "value": "focusPads", "label": "Focus Pads" }
    ]
  },  
    
  {
    "category": "Sports Accessories",
    "label": "Sports Accessories",
    "subcategories": [
      { "value": "sportsBags", "label": "Sports Bags" },
      { "value": "sportsWaterBottles", "label": "Sports Water Bottles" },
      { "value": "sportsWear", "label": "Sports Wear" },
      { "value": "sportsTowels", "label": "Sports Towels" },
      { "value": "sportsCaps", "label": "Sports Caps" },
      { "value": "sportsSocks", "label": "Sports Socks" },
      { "value": "sportsHeadbands", "label": "Sports Headbands" },
      { "value": "sportsWristbands", "label": "Sports Wristbands" },
      { "value": "sportsShirts", "label": "Sports Shirts" },
      { "value": "sportsShorts", "label": "Sports Shorts" },
      { "value": "sportsShoes", "label": "Sports Shoes" },
      { "value": "compressionGear", "label": "Compression Gear" },
      { "value": "sportsGloves", "label": "Sports Gloves" },
      { "value": "armBands", "label": "Arm Bands" },
      { "value": "sportsBelts", "label": "Sports Belts" },
      { "value": "sportsHats", "label": "Sports Hats" },
      { "value": "sportsGoggles", "label": "Sports Goggles" },
      { "value": "sportsProtection", "label": "Sports Protection" },
      { "value": "gymTowels", "label": "Gym Towels" },
      { "value": "sportsShoelaces", "label": "Sports Shoelaces" },
      { "value": "sportsPads", "label": "Sports Pads" },
      { "value": "sportsTapes", "label": "Sports Tapes" },
      { "value": "fitnessBands", "label": "Fitness Bands" }
    ]
  },  
];
