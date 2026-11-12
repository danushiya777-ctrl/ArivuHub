/**
 * ArivuHub - Mock & Sample Data
 * 
 * Hackathon Note:
 * This file serves as the offline mock database for the frontend prototype.
 * When you connect Python FastAPI later, replace these static getters with API fetch calls!
 */

import { StudyTopic, QuizQuestion, WeakConcept, Flashcard, MnemonicItem, MindMapNode, Tutor, TutorBooking, VideoReference } from '../types';

export const SAMPLE_TOPICS: StudyTopic[] = [
  {
    id: 'topic-bio-1',
    title: 'Cellular Respiration & Photosynthesis',
    subject: 'Biology',
    difficulty: 'Intermediate',
    initialMastery: 58,
    lastStudied: 'Today, 2:30 PM',
    summary: 'Energy conversion in cells: Glycolysis, Krebs Cycle, Electron Transport Chain (ETC), and the Light vs Dark reactions in chloroplasts.',
    notesContent: `CELLULAR RESPIRATION & PHOTOSYNTHESIS SUMMARY

1. Overview:
- Cellular Respiration: Catabolic pathway breaking down glucose to release ATP. 
  Formula: C6H12O6 + 6O2 -> 6CO2 + 6H2O + ~32 ATP.
- Photosynthesis: Anabolic pathway converting solar energy into chemical bonds.
  Formula: 6CO2 + 6H2O + Light -> C6H12O6 + 6O2.

2. Stages of Respiration:
- Glycolysis: Occurs in Cytoplasm (Anaerobic). Glucose -> 2 Pyruvate + 2 ATP (net) + 2 NADH.
- Krebs Cycle (Citric Acid Cycle): Occurs in Mitochondrial Matrix. Produces CO2, NADH, FADH2, and 2 ATP.
- Oxidative Phosphorylation & ETC: Occurs in Mitochondrial Inner Membrane. Electrons passed along cytochromes; proton gradient powers ATP Synthase (~28 ATP). Oxygen is the final electron acceptor!

3. Stages of Photosynthesis:
- Light-Dependent Reactions: Occur in Thylakoid membrane. Chlorophyll absorbs light; water is split (photolysis) releasing O2; generates ATP & NADPH.
- Light-Independent (Calvin Cycle): Occurs in Stroma. CO2 fixation via enzyme RuBisCO, using ATP and NADPH to synthesize G3P (precursor to glucose).`
  },
  {
    id: 'topic-cs-1',
    title: 'JavaScript Event Loop & Microtasks',
    subject: 'Computer Science',
    difficulty: 'Intermediate',
    initialMastery: 64,
    lastStudied: 'Yesterday',
    summary: 'Call stack, Task Queue (Macrotasks), Microtask Queue (Promises, queueMicrotask), and Render phase.',
    notesContent: `JAVASCRIPT EVENT LOOP ESSENTIALS

1. Single-Threaded Nature:
- JS runtime has only one Call Stack. It processes one frame at a time.
- Asynchronous tasks are delegated to Web APIs / Node C++ APIs.

2. Task Queues Priority:
- Microtask Queue: Promises (.then/.catch/finally), queueMicrotask(), MutationObserver.
- Macrotask Queue: setTimeout(), setInterval(), setImmediate(), I/O, UI rendering events.
- RULE: Microtasks ALWAYS drain completely before the Event Loop picks up the NEXT macrotask!`
  },
  {
    id: 'topic-phys-1',
    title: "Newton's Laws of Motion & Momentum",
    subject: 'Physics',
    difficulty: 'Beginner',
    initialMastery: 72,
    lastStudied: '3 days ago',
    summary: 'Inertia, F = ma, Action-Reaction, and Conservation of Linear Momentum in elastic vs inelastic collisions.',
    notesContent: `NEWTONIAN MECHANICS FUNDAMENTALS

1. First Law (Law of Inertia): An object remains at rest or in uniform straight-line velocity unless acted upon by an external net force.
2. Second Law: Net Force = mass * acceleration (F = ma). Acceleration is directly proportional to net force and inversely proportional to mass.
3. Third Law: For every action, there is an equal and opposite reaction (Forces always come in matched pairs acting on different bodies!).
4. Momentum: p = mv. In a closed isolated system, total initial momentum = total final momentum.`
  }
];

// Diagnostic Quiz Questions for Biology
export const SAMPLE_QUIZ_QUESTIONS: Record<string, QuizQuestion[]> = {
  'topic-bio-1': [
    {
      id: 'q-bio-1',
      conceptKey: 'etc-oxygen',
      question: 'What is the primary role of molecular oxygen (O2) in aerobic cellular respiration?',
      options: [
        'It binds to glucose during glycolysis to break it down',
        'It acts as the terminal electron acceptor in the Electron Transport Chain',
        'It powers the rotation of ATP synthase directly',
        'It enters the Krebs Cycle to produce citric acid'
      ],
      correctIndex: 1,
      explanation: 'Oxygen acts as the final electron acceptor at Complex IV of the ETC. When it accepts electrons and protons, it forms harmless water (H2O). Without oxygen, the entire ETC backs up.',
      hint: 'Think about where electrons end up after passing through the cytochrome chain.',
      difficulty: 'Medium'
    },
    {
      id: 'q-bio-2',
      conceptKey: 'calvin-cycle-location',
      question: 'Where do the light-independent reactions (Calvin Cycle) take place inside the plant cell?',
      options: [
        'Inside the thylakoid lumen',
        'Across the inner mitochondrial cristae',
        'In the stroma of the chloroplast',
        'On the outer surface of the vacuole'
      ],
      correctIndex: 2,
      explanation: 'The Calvin Cycle occurs in the stroma (the dense fluid inside the chloroplast surrounding the thylakoids), where enzymes like RuBisCO are dissolved.',
      hint: 'Thylakoids do the light reactions; the surrounding fluid houses the carbon-fixing enzymes.',
      difficulty: 'Easy'
    },
    {
      id: 'q-bio-3',
      conceptKey: 'atp-synthase-gradient',
      question: 'How does ATP Synthase physically synthesize ATP from ADP and inorganic phosphate?',
      options: [
        'By using chemical energy directly from pyruvate breakdown',
        'By utilizing the electrochemical proton (H+) gradient across the membrane',
        'By absorbing red and blue photons directly',
        'By pumping sodium ions into the matrix'
      ],
      correctIndex: 1,
      explanation: 'Chemiosmosis: Protons concentrated in the intermembrane space flow down their gradient back into the mitochondrial matrix through ATP Synthase, rotating the turbine rotor to make ATP.',
      hint: 'Think of a hydroelectric dam powered by flowing hydrogen ions.',
      difficulty: 'Hard'
    },
    {
      id: 'q-bio-4',
      conceptKey: 'glycolysis-net-yield',
      question: 'What is the NET production of ATP molecules directly produced per molecule of glucose during Glycolysis alone?',
      options: [
        '4 ATP',
        '2 ATP',
        '32 ATP',
        '0 ATP (it only uses ATP)'
      ],
      correctIndex: 1,
      explanation: 'Glycolysis invests 2 ATP during the preparatory phase and produces 4 ATP in the payoff phase, resulting in a NET gain of 2 ATP.',
      hint: 'Total produced is 4, but 2 were borrowed in the beginning.',
      difficulty: 'Easy'
    },
    {
      id: 'q-bio-5',
      conceptKey: 'rubisco-photorespiration',
      question: 'Which enzyme catalyzes the primary carbon-fixation step of the Calvin Cycle, and what is its major catalytic vulnerability?',
      options: [
        'DNA Polymerase; prone to point mutations',
        'RuBisCO; can accidentally bind oxygen instead of CO2 (photorespiration)',
        'ATP Synthase; slows down in high sunlight',
        'Amylase; breaks starch too quickly'
      ],
      correctIndex: 1,
      explanation: 'RuBisCO (Ribulose-1,5-bisphosphate carboxylase-oxygenase) fixes CO2, but when CO2 is low and O2 is high (hot dry days), it binds O2 causing wasteful photorespiration.',
      hint: 'The "O" in RuBisCO stands for oxygenase.',
      difficulty: 'Hard'
    }
  ]
};

// Evaluated Weak Concepts with "Explain Like I'm 10" Simplifications
export const SAMPLE_WEAK_CONCEPTS: Record<string, WeakConcept[]> = {
  'topic-bio-1': [
    {
      id: 'weak-1',
      name: 'Electron Transport Chain & Oxygen Final Acceptor',
      topicId: 'topic-bio-1',
      accuracyRate: 25,
      severity: 'High',
      simpleExplanation: 'Imagine an assembly line of factory workers passing a hot potato (electrons). At the very end of the line, someone must catch the potato and put it away. Oxygen is the designated catcher. If oxygen is missing, the workers cannot pass down any new potatoes, and the whole factory shuts down!',
      realWorldAnalogy: 'A crowded waterslide where oxygen is the lifeguard at the splash pool catching swimmers. If the lifeguard leaves, no one can slide down safely.',
      keyMisconception: 'Many students believe oxygen is used in glycolysis or directly burns food, but it only acts as the cleanup catcher at the very end.'
    },
    {
      id: 'weak-2',
      name: 'Calvin Cycle & RuBisCO Specificity',
      topicId: 'topic-bio-1',
      accuracyRate: 40,
      severity: 'Medium',
      simpleExplanation: 'Plants use a chef named RuBisCO to grab carbon dioxide from the air and bake sugar. But RuBisCO has clumsy fingers: when it gets too hot and dry, it accidentally grabs oxygen instead of carbon, wasting energy and making no cookies!',
      realWorldAnalogy: 'A claw machine that occasionally grabs a useless ball instead of the stuffed animal prize when the lights get too bright.',
      keyMisconception: 'Assuming the "Dark Reactions" happen only at night. In reality, they happen during the day in the stroma using products made in the light.'
    }
  ]
};

// Revision Tools: Flashcards
export const SAMPLE_FLASHCARDS: Record<string, Flashcard[]> = {
  'topic-bio-1': [
    {
      id: 'fc-1',
      topicId: 'topic-bio-1',
      front: 'Where does Glycolysis occur, and does it require Oxygen?',
      back: 'Cytoplasm (Cytosol). It is completely ANAEROBIC (requires zero oxygen).',
      category: 'Cellular Respiration',
      isMastered: true
    },
    {
      id: 'fc-2',
      topicId: 'topic-bio-1',
      front: 'What is the role of Oxygen (O2) in the Electron Transport Chain?',
      back: 'It is the FINAL ELECTRON ACCEPTOR. It binds with electrons and H+ ions to produce water (H2O).',
      category: 'Cellular Respiration',
      isMastered: false
    },
    {
      id: 'fc-3',
      topicId: 'topic-bio-1',
      front: 'What are the inputs and outputs of the Calvin Cycle?',
      back: 'Inputs: CO2, ATP, and NADPH.\nOutputs: G3P (used to synthesize glucose), ADP, and NADP+.',
      category: 'Photosynthesis',
      isMastered: false
    },
    {
      id: 'fc-4',
      topicId: 'topic-bio-1',
      front: 'What powers the rotation of ATP Synthase?',
      back: 'The Proton (H+) Motive Force — protons flowing down their electrochemical concentration gradient from the intermembrane space into the matrix.',
      category: 'Chemiosmosis',
      isMastered: true
    }
  ]
};

// Revision Tools: Mnemonics
export const SAMPLE_MNEMONICS: Record<string, MnemonicItem[]> = {
  'topic-bio-1': [
    {
      id: 'mn-1',
      topicId: 'topic-bio-1',
      title: 'Redox Reactions in Respiration',
      acronym: 'OIL RIG',
      meaning: 'Oxidation Is Loss, Reduction Is Gain of electrons',
      breakdown: [
        { letter: 'O.I.L.', word: 'Oxidation Is Loss', detail: 'Glucose loses hydrogen/electrons to become oxidized CO2' },
        { letter: 'R.I.G.', word: 'Reduction Is Gain', detail: 'Oxygen gains electrons & protons to become reduced H2O' }
      ],
      memoryHook: 'Think of an offshore oil drilling rig pumping electrons!'
    },
    {
      id: 'mn-2',
      topicId: 'topic-bio-1',
      title: 'Four Stages of Aerobic Respiration',
      acronym: 'Go Learn Krebs Online',
      meaning: 'Order of pathways from cytoplasm to inner membrane',
      breakdown: [
        { letter: 'Go', word: 'Glycolysis', detail: 'Step 1 in Cytoplasm' },
        { letter: 'Learn', word: 'Link Reaction', detail: 'Pyruvate to Acetyl-CoA' },
        { letter: 'Krebs', word: 'Krebs Citric Acid Cycle', detail: 'Matrix cycle yielding electron carriers' },
        { letter: 'Online', word: 'Oxidative Phosphorylation', detail: 'ETC + ATP Synthase' }
      ],
      memoryHook: 'Students Go Learn Krebs Online when studying for exams!'
    }
  ]
};

// Revision Tools: Interactive Mind Map Nodes
export const SAMPLE_MINDMAP_NODES: Record<string, MindMapNode[]> = {
  'topic-bio-1': [
    {
      id: 'node-core',
      label: 'Energy Metabolism',
      category: 'Core',
      status: 'mastered',
      x: 320,
      y: 190,
      details: 'Conversion of solar energy to glucose, and glucose to usable cellular ATP currency.',
      connections: ['node-glyc', 'node-krebs', 'node-etc', 'node-light', 'node-calvin']
    },
    {
      id: 'node-glyc',
      label: 'Glycolysis',
      category: 'Respiration',
      status: 'mastered',
      x: 140,
      y: 80,
      details: 'Location: Cytosol | Net Yield: 2 ATP + 2 NADH | Anaerobic',
      connections: ['node-core', 'node-krebs']
    },
    {
      id: 'node-krebs',
      label: 'Krebs Cycle',
      category: 'Respiration',
      status: 'review',
      x: 80,
      y: 220,
      details: 'Location: Mitochondrial Matrix | Releases CO2 | Produces NADH & FADH2',
      connections: ['node-core', 'node-etc']
    },
    {
      id: 'node-etc',
      label: 'Electron Transport Chain (ETC)',
      category: 'Respiration',
      status: 'weak',
      x: 160,
      y: 330,
      details: 'CRITICAL WEAK AREA: Oxygen is the final electron acceptor. Chemiosmosis powers ATP Synthase.',
      connections: ['node-core']
    },
    {
      id: 'node-light',
      label: 'Light Reactions',
      category: 'Photosynthesis',
      status: 'mastered',
      x: 500,
      y: 90,
      details: 'Location: Thylakoid membrane | Photolysis splits H2O -> releases O2 | Generates ATP & NADPH',
      connections: ['node-core', 'node-calvin']
    },
    {
      id: 'node-calvin',
      label: 'Calvin Cycle (Stroma)',
      category: 'Photosynthesis',
      status: 'weak',
      x: 480,
      y: 290,
      details: 'CRITICAL WEAK AREA: RuBisCO fixes CO2 into sugar. Prone to photorespiration when hot.',
      connections: ['node-core']
    }
  ]
};

// Retest Questions (Targeted specifically at identified weak concepts!)
export const SAMPLE_RETEST_QUESTIONS: Record<string, QuizQuestion[]> = {
  'topic-bio-1': [
    {
      id: 'retest-1',
      conceptKey: 'etc-oxygen',
      question: 'If a cell is treated with a chemical that blocks oxygen from accepting electrons at Complex IV, what happens immediately?',
      options: [
        'Glycolysis speeds up by 100x to compensate',
        'The electron transport chain stops, the proton gradient collapses, and ATP synthesis halts',
        'Chloroplasts take over ATP generation inside the mitochondria',
        'Oxygen is converted directly into glucose'
      ],
      correctIndex: 1,
      explanation: 'Correct! Without the terminal electron acceptor, electrons back up along all protein complexes, stopping proton pumping and shutting down ATP synthesis.',
      hint: 'Remember the waterslide analogy: if the exit is blocked, everything upstream halts.',
      difficulty: 'Medium'
    },
    {
      id: 'retest-2',
      conceptKey: 'calvin-cycle-location',
      question: 'Why does the Calvin cycle require products from the light-dependent reactions even though it doesn’t directly absorb sunlight?',
      options: [
        'It requires oxygen produced by the splitting of water',
        'It needs the chemical energy in ATP and the reducing electrons in NADPH to convert 3-PGA to G3P',
        'It needs heat generated by the thylakoid membrane',
        'It requires chlorophyll molecules to diffuse into the stroma'
      ],
      correctIndex: 1,
      explanation: 'Excellent! The Calvin Cycle utilizes the ATP and NADPH generated in the thylakoid membranes to fuel the sugar-building cycle.',
      hint: 'The light reactions charge the chemical "batteries" that the Calvin cycle consumes.',
      difficulty: 'Medium'
    },
    {
      id: 'retest-3',
      conceptKey: 'rubisco-photorespiration',
      question: 'Under hot, dry conditions, plant stomata close to conserve water. What consequence does this have on RuBisCO activity?',
      options: [
        'Internal CO2 drops and O2 rises, prompting RuBisCO to bind O2 and perform wasteful photorespiration',
        'RuBisCO stops working completely and dissolves',
        'RuBisCO begins synthesizing nitrogen gas',
        'It forces the plant into immediate cellular respiration'
      ],
      correctIndex: 0,
      explanation: 'Spot on! Closed stomata trap O2 and prevent new CO2 from entering, triggering RuBisCO oxygenase activity.',
      hint: 'Closed leaves trap gases inside while photosynthesis keeps producing O2.',
      difficulty: 'Hard'
    }
  ]
};

// Expert Human Tutors for Booking Demo Sessions
export const SAMPLE_TUTORS: Tutor[] = [
  {
    id: 'tutor-1',
    name: 'Dr. Elena Vance',
    title: 'Cellular & Molecular Biology Specialist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    rating: 4.96,
    reviewCount: 142,
    subjects: ['Biology', 'Biochemistry', 'Genetics'],
    bio: 'Postdoctoral researcher with 6+ years helping students demystify cellular respiration, metabolic cycles, and genetic engineering. I love using visual models and intuitive analogies.',
    education: 'PhD in Molecular Biology, Stanford',
    hourlyRate: 45,
    isDemoFree: true,
    availableDays: ['Mon', 'Wed', 'Thu', 'Sat'],
    availableSlots: ['4:00 PM', '5:30 PM', '7:00 PM'],
    badges: ['Top Rated Tutor', 'Mastery Coach', 'Verified Expert']
  },
  {
    id: 'tutor-2',
    name: 'Alex Rivera',
    title: 'Senior Software Engineer & CS Mentor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    rating: 5.0,
    reviewCount: 98,
    subjects: ['Computer Science', 'JavaScript', 'Algorithms'],
    bio: 'Ex-Google engineer passionate about breaking down asynchronous programming, the event loop, and systems architecture. Friendly, interactive, and code-along focused.',
    education: 'B.S. in Computer Science, UC Berkeley',
    hourlyRate: 50,
    isDemoFree: true,
    availableDays: ['Tue', 'Thu', 'Fri', 'Sun'],
    availableSlots: ['3:00 PM', '6:00 PM', '8:00 PM'],
    badges: ['Silicon Valley Mentor', 'Code Review Pro']
  },
  {
    id: 'tutor-3',
    name: 'Marcus Sterling',
    title: 'Physics & Applied Mathematics Instructor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    rating: 4.88,
    reviewCount: 84,
    subjects: ['Physics', 'Calculus', 'Mechanics'],
    bio: 'Passionate STEM teacher who specializes in intuitive physics. I help students visualize forces, vectors, and momentum without memorizing endless boring formulas.',
    education: 'M.S. in Applied Physics, MIT',
    hourlyRate: 40,
    isDemoFree: true,
    availableDays: ['Mon', 'Tue', 'Fri', 'Sat'],
    availableSlots: ['2:00 PM', '4:30 PM', '6:30 PM'],
    badges: ['Concept Visualizer', 'Exam Prep Ace']
  },
  {
    id: 'tutor-4',
    name: 'Dr. Priya Sharma',
    title: 'Medical Sciences & Physiology Tutor',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
    rating: 4.94,
    reviewCount: 165,
    subjects: ['Biology', 'Anatomy', 'Physiology'],
    bio: 'Dedicated medical educator specializing in high-yield retention, mnemonics, and active recall. Book a free 20-minute demo to conquer your hardest biology hurdles.',
    education: 'MD / Clinical Instructor',
    hourlyRate: 55,
    isDemoFree: true,
    availableDays: ['Wed', 'Thu', 'Sat', 'Sun'],
    availableSlots: ['11:00 AM', '1:30 PM', '5:00 PM'],
    badges: ['Medical Educator', 'High-Yield Specialist']
  }
];

// Pre-filled Bookings for testing the "My Bookings" experience
export const INITIAL_BOOKINGS: TutorBooking[] = [
  {
    id: 'booking-demo-1',
    tutorId: 'tutor-1',
    tutorName: 'Dr. Elena Vance',
    tutorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    subject: 'Biology',
    topicToFocus: 'Electron Transport Chain & Oxygen role',
    date: 'Tomorrow, Oct 20',
    timeSlot: '5:30 PM',
    studentNotes: 'I am struggling with how ATP synthase rotates and why oxygen blockage stops everything.',
    status: 'Confirmed',
    meetingLink: 'https://meet.arivuhub.ai/room/demo-bio-vance-492',
    createdAt: 'Today, 10:15 AM'
  }
];

// Curated YouTube Educational Video References
export const SAMPLE_VIDEOS: Record<string, VideoReference[]> = {
  'topic-bio-1': [
    {
      id: 'vid-bio-1',
      topicId: 'topic-bio-1',
      title: 'Cellular Respiration and the Mighty Mitochondria',
      channelName: 'Amoeba Sisters',
      duration: '7:49',
      thumbnailUrl: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&w=600&q=80',
      youtubeUrl: 'https://www.youtube.com/watch?v=4Eo7Jt6QVhM',
      embedId: '4Eo7Jt6QVhM',
      keyTimestamps: '02:15 Glycolysis • 03:45 Krebs Cycle • 05:10 Electron Transport Chain',
      description: 'Engaging, memorable cartoon animation breaking down glucose oxidation, ATP yield, and why oxygen acts as the essential terminal electron sponge.',
      weakConceptTag: 'Electron Transport Chain & Oxygen Final Acceptor'
    },
    {
      id: 'vid-bio-2',
      topicId: 'topic-bio-1',
      title: 'ATP & Respiration: Crash Course Biology #7',
      channelName: 'CrashCourse',
      duration: '13:25',
      thumbnailUrl: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80',
      youtubeUrl: 'https://www.youtube.com/watch?v=00jbG_cfGuQ',
      embedId: '00jbG_cfGuQ',
      keyTimestamps: '04:30 Glycolysis • 07:12 Citric Acid Cycle • 09:40 Oxidative Phosphorylation & ATP Synthase',
      description: 'Hank Green explains the energetic currency of life, how electrons flow down cytochrome complexes, and how chemiosmotic gradients drive ATP synthesis.',
      weakConceptTag: 'Electron Transport Chain & Oxygen Final Acceptor'
    },
    {
      id: 'vid-bio-3',
      topicId: 'topic-bio-1',
      title: 'Photosynthesis: Crash Course Biology #8',
      channelName: 'CrashCourse',
      duration: '13:14',
      thumbnailUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80',
      youtubeUrl: 'https://www.youtube.com/watch?v=sQK3Yr4Sc_k',
      embedId: 'sQK3Yr4Sc_k',
      keyTimestamps: '02:40 Thylakoid Light Reactions • 06:15 Calvin Cycle & RuBisCO • 09:10 Photorespiration',
      description: 'Comprehensive breakdown of chlorophyll light absorption, photolysis of water, and why RuBisCO enzyme occasionally fixes oxygen instead of CO2.',
      weakConceptTag: 'Calvin Cycle & RuBisCO Specificity'
    },
    {
      id: 'vid-bio-4',
      topicId: 'topic-bio-1',
      title: 'Electron Transport Chain & Chemiosmosis',
      channelName: 'Khan Academy',
      duration: '14:15',
      thumbnailUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
      youtubeUrl: 'https://www.youtube.com/watch?v=mfgCcFXUZRk',
      embedId: 'mfgCcFXUZRk',
      keyTimestamps: '03:20 Complex I-IV • 08:45 Proton Gradient • 11:30 Terminal Oxygen Reduction to Water',
      description: 'Step-by-step whiteboard diagram calculating proton electrochemical gradients, redox potentials, and the mechanical rotation of ATP Synthase.',
      weakConceptTag: 'Electron Transport Chain & Oxygen Final Acceptor'
    }
  ],
  'topic-cs-1': [
    {
      id: 'vid-cs-1',
      topicId: 'topic-cs-1',
      title: 'What the heck is the event loop anyway?',
      channelName: 'Philip Roberts (JSConf EU)',
      duration: '26:52',
      thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
      youtubeUrl: 'https://www.youtube.com/watch?v=8aGhZQkoFbQ',
      embedId: '8aGhZQkoFbQ',
      keyTimestamps: '04:20 The Call Stack • 09:30 Browser Web APIs • 14:15 Task Queue vs Stack',
      description: 'The world-famous Loupe interactive visualization explaining how single-threaded JavaScript handles asynchronous concurrency without blocking the UI.',
      weakConceptTag: 'Event Loop & Task Queue Priority'
    },
    {
      id: 'vid-cs-2',
      topicId: 'topic-cs-1',
      title: 'The JavaScript Event Loop in 100 Seconds',
      channelName: 'Fireship',
      duration: '2:25',
      thumbnailUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
      youtubeUrl: 'https://www.youtube.com/watch?v=f2EQvyP0fV8',
      embedId: 'f2EQvyP0fV8',
      keyTimestamps: '00:30 Microtask Queue • 01:15 Macrotask Tick • 01:45 Promise vs setTimeout',
      description: 'Lightning-fast visual summary of the V8 JavaScript runtime, the call stack, microtasks vs macrotasks, and queue draining rules.',
      weakConceptTag: 'Microtasks vs Macrotasks'
    }
  ],
  'topic-phys-1': [
    {
      id: 'vid-phys-1',
      topicId: 'topic-phys-1',
      title: "Newton's Laws: Crash Course Physics #5",
      channelName: 'CrashCourse',
      duration: '11:04',
      thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
      youtubeUrl: 'https://www.youtube.com/watch?v=kKKM8Y-u7ds',
      embedId: 'kKKM8Y-u7ds',
      keyTimestamps: '01:45 Inertia • 04:30 F = ma • 07:15 Action-Reaction Pairs',
      description: 'Visual demonstration of inertia, net forces, acceleration proportionality, and why forces always exist in matched pairs acting on different bodies.',
      weakConceptTag: "Newton's Third Law Pairs"
    },
    {
      id: 'vid-phys-2',
      topicId: 'topic-phys-1',
      title: 'Conservation of Linear Momentum',
      channelName: 'Khan Academy',
      duration: '9:30',
      thumbnailUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80',
      youtubeUrl: 'https://www.youtube.com/watch?v=mE9pQv4S6dE',
      embedId: 'mE9pQv4S6dE',
      keyTimestamps: '02:10 Elastic Collisions • 05:40 Inelastic Impulse • 07:50 System Momentum',
      description: 'Sal Khan walks through classic collision equations showing why total initial momentum must equal total final momentum in isolated systems.',
      weakConceptTag: 'Conservation of Momentum'
    }
  ]
};

