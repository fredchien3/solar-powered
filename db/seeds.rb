# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

ApplicationRecord.transaction do 
  puts "Destroying tables..."
  User.destroy_all

  puts "Resetting primary keys..."
  ApplicationRecord.connection.reset_pk_sequence!('users')

  puts "Creating users..."
  User.create!(
    username: 'ford', 
    display_name: 'ford',
    email: 'fred.chien3@gmail.com', 
    password: 'password'
  )

  User.create!(
    username: 'gaben', 
    display_name: 'gaben',
    email: 'gaben@valvesoftware.com', 
    password: 'MoolyFTW'
  )

  10.times do 
    User.create!({
      username: Faker::Internet.unique.username(specifier: 3),
      email: Faker::Internet.unique.email,
      password: 'password'
    }) 
  end

  Game.create!( # Fallout 4
    title: 'Fallout 4',
    price: '59.99',
    release_date: Date.parse('Nov 10, 2015'),
    short_description: "Bethesda Game Studios, the award-winning creators of Fallout 3 and The Elder Scrolls V: Skyrim, welcome you to the world of Fallout 4 – their most ambitious game ever, and the next generation of open-world gaming.",
    long_description: "Bethesda Game Studios, the award-winning creators of Fallout 3 and The Elder Scrolls V: Skyrim, welcome you to the world of Fallout 4 – their most ambitious game ever, and the next generation of open-world gaming.

    As the sole survivor of Vault 111, you enter a world destroyed by nuclear war. Every second is a fight for survival, and every choice is yours. Only you can rebuild and determine the fate of the Wasteland. Welcome home.
    Key Features:
    Freedom and Liberty!
    Do whatever you want in a massive open world with hundreds of locations, characters, and quests. Join multiple factions vying for power or go it alone, the choices are all yours.
    
    You’re S.P.E.C.I.A.L!
    Be whoever you want with the S.P.E.C.I.A.L. character system. From a Power Armored soldier to the charismatic smooth talker, you can choose from hundreds of Perks and develop your own playstyle.
    
    Super Deluxe Pixels!
    An all-new next generation graphics and lighting engine brings to life the world of Fallout like never before. From the blasted forests of the Commonwealth to the ruins of Boston, every location is packed with dynamic detail.
    
    Violence and V.A.T.S.!
    Intense first or third person combat can also be slowed down with the new dynamic Vault-Tec Assisted Targeting System (V.A.T.S) that lets you choose your attacks and enjoy cinematic carnage.
    
    Collect and Build!
    Collect, upgrade, and build thousands of items in the most advanced crafting system ever. Weapons, armor, chemicals, and food are just the beginning - you can even build and manage entire settlements.",
    developer: 'Bethesda Game Studios',
    publiser: 'Bethesda Softworks'
  )

  Game.create!( # RimWorld
    title: 'RimWorld',
    price: '34.99',
    release_date: Date.parse('Oct 17, 2018'),
    short_description: "A sci-fi colony sim driven by an intelligent AI storyteller. Generates stories by simulating psychology, ecology, gunplay, melee combat, climate, biomes, diplomacy, interpersonal relationships, art, medicine, trade, and more.",
    long_description: "RimWorld is a sci-fi colony sim driven by an intelligent AI storyteller. Inspired by Dwarf Fortress, Firefly, and Dune.

    You begin with three survivors of a shipwreck on a distant world.
    Manage colonists' moods, needs, wounds, illnesses and addictions.
    Build in the forest, desert, jungle, tundra, and more.
    Watch colonists develop and break relationships with family members, lovers, and spouses.
    Replace wounded limbs and organs with prosthetics, bionics, or biological parts harvested from others.
    Fight pirates, tribes, mad animals, giant insects and ancient killing machines.
    Craft structures, weapons, and apparel from metal, wood, stone, cloth, and futuristic materials.
    Tame and train cute pets, productive farm animals, and deadly attack beasts.
    Trade with passing ships and caravans.
    Form caravans to complete quests, trade, attack other factions, or migrate your whole colony.
    Dig through snow, weather storms, and fight fires.
    Capture refugees or prisoners and turn them to your side or sell them into slavery.
    Discover a new generated world each time you play.
    Explore hundreds of wild and interesting mods on the Steam Workshop.
    Learn to play easily with the help of an intelligent and unobtrusive AI tutor.
    
    RimWorld is a story generator. It’s designed to co-author tragic, twisted, and triumphant stories about imprisoned pirates, desperate colonists, starvation and survival. It works by controlling the “random” events that the world throws at you. Every thunderstorm, pirate raid, and traveling salesman is a card dealt into your story by the AI Storyteller. There are several storytellers to choose from. Randy Random does crazy stuff, Cassandra Classic goes for rising tension, and Phoebe Chillax likes to relax.
    
    Your colonists are not professional settlers – they’re crash-landed survivors from a passenger liner destroyed in orbit. You can end up with a nobleman, an accountant, and a housewife. You’ll acquire more colonists by capturing them in combat and turning them to your side, buying them from slave traders, or taking in refugees. So your colony will always be a motley crew.
    
    Each person’s background is tracked and affects how they play. A nobleman will be great at social skills (recruiting prisoners, negotiating trade prices), but refuse to do physical work. A farm oaf knows how to grow food by long experience, but cannot do research. A nerdy scientist is great at research, but cannot do social tasks at all. A genetically engineered assassin can do nothing but kill – but he does that very well.
    
    Colonists develop - and destroy - relationships. Each has an opinion of the others, which determines whether they'll become lovers, marry, cheat, or fight. Perhaps your two best colonists are happily married - until one of them falls for the dashing surgeon who saved her from a gunshot wound.
    
    The game generates a whole planet from pole to equator. You choose whether to land your crash pods in a cold northern tundra, a parched desert flat, a temperate forest, or a steaming equatorial jungle. Different areas have different animals, plants, diseases, temperatures, rainfall, mineral resources, and terrain. These challenges of surviving in a disease-infested, choking jungle are very different from those in a parched desert wasteland or a frozen tundra with a two-month growing season.
    
    Travel across the planet. You're not stuck in one place. You can form a caravan of people, animals, and prisoners. Rescue kidnapped former allies from pirate outposts, attend peace talks, trade with other factions, attack enemy colonies, and complete other quests. You can even pack up your entire colony and move to a new place. You can use rocket-powered transport pods to travel faster.
    
    You can tame and train animals. Lovable pets will cheer up sad colonists. Farm animals can be worked, milked, and sheared. Attack beasts can be released upon your enemies. There are many animals - cats, labrador retrievers, grizzly bears, camels, cougars, chinchillas, chickens, and exotic alien-like lifeforms.
    
    People in RimWorld constantly observe their situation and surroundings in order to decide how to feel at any given moment. They respond to hunger and fatigue, witnessing death, disrespectfully unburied corpses, being wounded, being left in darkness, getting packed into cramped environments, sleeping outside or in the same room as others, and many other situations. If they're too stressed, they might lash out or break down.
    
    Wounds, infections, prosthetics, and chronic conditions are tracked on each body part and affect characters' capacities. Eye injuries make it hard to shoot or do surgery. Wounded legs slow people down. Hands, brain, mouth, heart, liver, kidneys, stomach, feet, fingers, toes, and more can all be wounded, diseased, or missing, and all have logical in-game effects. And other species have their own body layouts - take off a deer's leg, and it can still hobble on the other three. Take off a rhino's horn, and it's much less dangerous.
    
    You can repair body parts with prosthetics ranging from primitive to transcendent. A peg leg will get Joe Colonist walking after an unfortunate incident with a rhinoceros, but he'll still be quite slow. Buy an expensive bionic leg from a trader the next year, and Joe becomes a superhuman runner. You can even extract, sell, buy, and transplant internal organs.
    
    And there's much more than that! The game is easy to mod and has an active mod community. Read more at http://rimworldgame.com.
    
    (All non-English translations are made by fans.)",
    developer: 'Ludeon Studios',
    publiser: 'Ludeon Studios'
  )

  Game.create!( # CS:GO
    title: 'Counter-Strike: Global Offensive',
    price: '0',
    release_date: Date.parse('Aug 21, 2012'),
    short_description: "Counter-Strike: Global Offensive (CS: GO) expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago. CS: GO features new maps, characters, weapons, and game modes, and delivers updated versions of the classic CS content (de_dust2, etc.).",
    long_description: "Counter-Strike: Global Offensive (CS: GO) expands upon the team-based action gameplay that it pioneered when it was launched 19 years ago.

    CS: GO features new maps, characters, weapons, and game modes, and delivers updated versions of the classic CS content (de_dust2, etc.).
    
    \"Counter-Strike took the gaming industry by surprise when the unlikely MOD became the most played online PC action game in the world almost immediately after its release in August 1999,\" said Doug Lombardi at Valve. \"For the past 12 years, it has continued to be one of the most-played games in the world, headline competitive gaming tournaments and selling over 25 million units worldwide across the franchise. CS: GO promises to expand on CS' award-winning gameplay and deliver it to gamers on the PC as well as the next gen consoles and the Mac.\"",
    developer: 'Valve, Hidden Path Entertainment',
    publiser: 'Valve'
  )

  Game.create!( # Space Engineers
    title: 'Space Engineers',
    price: '19.99',
    release_date: Date.parse('Feb 28, 2019'),
    short_description: "Space Engineers is a sandbox game about engineering, construction, exploration and survival in space and on planets. Players build space ships, space stations, planetary outposts of various sizes and uses, pilot ships and travel through space to explore planets and gather resources to survive.",
    long_description: "Space Engineers is an open world sandbox game defined by creativity and exploration.
    
    It is a sandbox game about engineering, construction, exploration and survival in space and on planets. Players build space ships, wheeled vehicles, space stations, planetary outposts of various sizes and uses (civil and military), pilot ships and travel through space to explore planets and gather resources to survive. Featuring both creative and survival modes, there is no limit to what can be built, utilized and explored.
    
    
    
    Space Engineers features a realistic, volumetric-based physics engine: everything in the game can be assembled, disassembled, damaged and destroyed. The game can be played either in single or multiplayer modes.
    
    Volumetric objects are structures composed from block-like modules interlocked in a grid. Volumetric objects behave like real physical objects with mass, inertia and velocity. Individual modules have real volume and storage capacity.
    
    
    
    Space Engineers is inspired by reality and by how things work. Think about modern-day NASA technology extrapolated 60 years into the future. Space Engineers strives to follow the laws of physics and doesn't use technologies that wouldn't be feasible in the near future.
    
    Space Engineers concentrates on construction and exploration aspects, but can be played as a survival shooter as well. We expect players will avoid engaging in direct man-to-man combat and instead use their creativity and engineering skills to build war machines and fortifications to survive in space and on planets. Space Engineers shouldn’t be about troops; it should be about the machinery you build.
    CORE FEATURES
    Planets and moons – fully destructible & persistent, volumetric, atmosphere, gravity, climate zones
    Game modes
    - Creative – unlimited resources, instant building, no death
    - Survival – realistic management of resources and inventory capacity; manual building; death/respawn
    
    
    
    Single-player – you are the sole space engineer
    Multiplayer
    - Creative and survival mode with your friends
    - Cooperative and competitive
    - Privacy customization: offline, private, friends only, public
    - Up to 16 players
    - Dedicated servers
    New game options
    - Scenarios - offer linear story with action-packed gameplay, while the majority of Space Engineers scenarios feature unique sandbox environments where players create their own challenges.
    - Workshop worlds - offer worlds created by other players.
    - Custom worlds - offer variety of customizable worlds where you can start your own scenario.
    Customizable character - skins, colors, community market, male and female character
    Ships (small and large) – build and pilot them
    Space stations
    Planetary bases, outposts, cities
    First-person & Third-person
    Super-large worlds – the size of the world to 1,000,000,000 km in diameter (almost infinite)
    Procedural asteroids - an infinite number of asteroids to the game world
    Exploration - adds an infinite number of ships and stations to the game world; discover, explore, acquire and conquer!
    Drilling / harvesting
    Manual building in survival mode – use welder to assemble blocks from components; use grinder to disassemble and reuse components
    Deformable and destructible objects – real proportions, mass, storage capacity, integrity
    
    
    
    Visual script editor - players can create missions and game modes which can be played by other players. Capture the flag, death-match, racing or campaign driven missions - all can be done by using the editor, with your own rules and designs! Even main campaign and game scenarios were created in this tool.
    Building blocks - over 200 blocks (gravity generators, jump drive, turrets, doors, landing gears, assembler, refinery, rotors, wheels, thrusters, pistons, wind turbine and many more)
    Programmable block - allows players to write small programs that will be executed in the game
    Electricity – all blocks in a grid are wired in an electrical and computer network; electricity is generated by nuclear reactors or various power sources
    Gravity – produced by planets and gravity generators. Spherical gravity generator also available.
    Symmetry/Mirroring – useful in creative mode when building structures that require symmetry
    Weapons – automatic rifle, small and large explosive warheads, small ship gatling gun, small ship missile launcher
    Steam Workshop – share your creations with the Community (upload and download worlds, blueprints, MODs, scripts)
    Localized interface
    - Official localization: English, Russian, Chinese, French, Spanish, German, Italian, Portuguese-Brazil
    - Community localization: Czech, Danish, Dutch, German, Icelandic, Polish, Spanish-Spain, Spanish-Latin America, Finnish, Hungarian, Estonian, Norwegian, Swedish, Slovak, Ukrainian
    Cargo ships - auto-piloted vessels (miners, freighters and military) that carry ore, ingots, constructions components and other materials from sector to sector. They can be looted but beware, they often contain booby traps!
    Oxygen - take off character's helmet, generate oxygen out of ice by using the oxygen generator
    Hydrogen - hydrogen thrusters, hydrogen tanks and hydrogen bottles
    Factions - create and join factions, determine ownership of blocks and manage the relations between them (hostile/ally).
    Remote control – control ships and turrets without being inside
    Modding - world files, shaders, textures, 3D models
    Modding API - brings a lot of new possibilities to modders and allows them to alter the game by writing C# scripts which have access to in-game objects
    Blueprints - save your ship or station on a blueprint and paste it into your game
    GPS - create, send, receive and manage GPS coordinates in the game
    Voxel hands - shape and form the asteroids and change their material (creative mode only)
    Xbox controller support
    Sounds – realistic and arcade mode
    
    Space Engineers utilizes an in-house built VRAGE 2.0, realistic volumetric-based physics engine: all objects can be assembled, disassembled, damaged and destroyed.
     
    
    How to Play
    Start by watching this video tutorial:http://www.SpaceEngineersGame.com/how-to-play.html
     
    Performance Notes
    The performance depends on the complexity of your world and the configuration of your computer. Simple worlds run smoothly even on low-end computers, but a more complex world with rich object interactions could overload even high-end computers.
    Please read our performance advices: https://www.spaceengineersgame.com/performance-advice/
    
    Minimum requirements represent the bare minimum to run simple scenes and don’t guarantee a perfect experience.",
    developer: 'Keen Software House',
    publiser: 'Keen Software House'
  )

  Game.create!( # Project Zomboid
    title: 'Project Zomboid',
    price: '19.99',
    release_date: Date.parse('Nov 8, 2013'),
    short_description: "Project Zomboid is the ultimate in zombie survival. Alone or in MP: you loot, build, craft, fight, farm and fish in a struggle to survive. A hardcore RPG skillset, a vast map, massively customisable sandbox and a cute tutorial raccoon await the unwary. So how will you die? All it takes is a bite..",
    long_description: "Project Zomboid is an open-ended zombie-infested sandbox. It asks one simple question – how will you die? 

    In the towns of Muldraugh and West Point, survivors must loot houses, build defences and do their utmost to delay their inevitable death day by day. No help is coming – their continued survival relies on their own cunning, luck and ability to evade a relentless horde.
    Current Features
    Hardcore Sandbox Zombie Survival Game with a focus on realistic survival.
    Online multiplayer survival with persistent player run servers.
    Local 4 player split-screen co-op
    Hundreds of zombies with swarm mechanics and in-depth visual and hearing systems.
    Full line of sight system and real-time lighting, sound and visibility mechanics. Hide in the shadows, keep quiet and keep the lights off at night, or at least hang sheets over the windows.
    Vast and growing map (loosely based on a real world location) for you to explore, loot and set up your fortress. Check out Blindcoder’s map project: https://map.projectzomboid.com/
    Vehicles with full physics and deep and realistic gameplay mechanics.
    Use tools and items to craft weapons, barricade and cook. You can even build zombie proof forts by chopping trees, sawing wood and scavenging supplies.
    Deal with depression, boredom, hunger, thirst and illness while trying to survive.
    Day turns to night. The electricity falters. Hordes migrate. Winter draws in. Nature gradually starts to take over.
    Farming, fishing, carpentry, cooking, trapping, character customization, skills and perks that develop based on what you do in-game.
    Proper zombies that don’t run. (Unless you tell them to in the sandbox menu).
    A ton of amazing atmospheric music tracks by the prodigy that is Zach Beever.
    Imaginative Challenge scenarios and instant action ‘Last Stand’ mode, on top of regular Sandbox and Survival 
    Full, open and powerful Lua modding support.
    Xbox Controller Gamepad support on Windows. [Others pads can be set up manually. Gamepad support not currently available on Mac]
    
    We’re a small team at the moment, but we’re also committed to providing the following:
    planned Features:
    The return of our PZ Stories mode that also serves as first ever tutorial actively trying to kill you at every turn. Kate and Baldspot return!
    In-depth and varied NPC encounters driven in a persistent world, powered by a metagame system that turns each play-through into your very own zombie survival movie with emergent narrative gameplay.
    Constant expansion of the countryside and cities around Muldraugh and West Point
    Full wilderness survival systems, animals and hunting for food.
    More items, crafting recipes, weapons and gameplay systems.
    Steam Workshop and Achievements support
    
    For more details on the game follow us on @theindiestone or visit http://www.projectzomboid.com",
    developer: 'The Indie Stone',
    publiser: 'The Indie Stone'
  )

  puts "Done!"
end