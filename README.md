# 🚀 ArivuHub – Frontend Prototype

> **"Learn Anything. Teach What You Know. Grow Together."**  
> An AI-powered learning platform that helps students diagnose conceptual blind spots, revise through intuitive analogies and active-recall tools, and connect with expert human tutors.

---

## 🌟 Hackathon Features Walkthrough

1. **AI Learning Lab (`LearningLab.tsx`)**
   - Paste raw study notes or click one-click sample presets (**Biology**, **JavaScript Event Loop**, **Newtonian Physics**).
   - Mock file uploader for `.pdf`, `.docx`, or `.txt` notes.
   - Click **"Generate Diagnostic Quiz"** to trigger simulated multi-step AI synthesis with interactive loading indicators.

2. **Personalized Learning & Diagnostic Quiz (`QuizEvaluation.tsx`)**
   - 5-question adaptive diagnostic quiz with instant feedback and hints.
   - Evaluates answers to identify weak areas.
   - **"Explain Like I'm 10"** simplified breakdowns with intuitive real-world analogies (e.g. the hot potato factory assembly line).
   - Highlights common student misconceptions.

3. **Multi-Modal Revision Suite (`RevisionTools.tsx`)**
   - **3D Flashcards:** Interactive card flipping with 3D CSS transform, next/previous buttons, and "Mark as Mastered".
   - **Mnemonics & Memory Hooks:** Catchy acronyms (e.g., *OIL RIG*, *Go Learn Krebs Online*) with letter-by-letter explanations.
   - **Interactive Mind Map:** SVG concept graph with color-coded nodes (*Green = Mastered*, *Amber = Review*, *Red = Weak Spot*). Clicking any node opens a detailed inspection drawer.
   - **🎥 Curated YouTube Video Lessons:** High-yield video references (Amoeba Sisters, CrashCourse, Khan Academy, Fireship) aligned directly with identified weak spots, including timestamp chapters!
   - **High-Yield Revision Notes:** Structured summary notes with a one-click copy button.

4. **Progress Tracking & Retest (`ProgressTracker.tsx`)**
   - Targeted retest focused specifically on previously missed concepts.
   - **Before vs After Score Delta** visualizer showing measurable growth (e.g., *Initial 50% ➡️ Retest 100% = +50% Growth!*).
   - Fires celebratory confetti upon retest completion.

5. **Find a Human Tutor (`TutorFinder.tsx` & `BookingModal.tsx`)**
   - Search and filter tutors by subject (Biology, Computer Science, Physics).
   - Detailed tutor profile cards with ratings, verified badges, and availability.
   - **Book Free Demo Session:** Modal to select date, time slot, and concept to focus on.
   - **Booked Sessions View (`MyBookingsView.tsx`):** Confirmed sessions with launchable video meeting room links.

---

## 💻 How to Run on Windows

### Prerequisites
- Node.js (v18 or higher) and npm installed. *(If you just ran the setup script, Node is already configured in `%LOCALAPPDATA%\nodejs`)*.

### 1. Open a Terminal (PowerShell or Command Prompt)
Navigate to the project folder:
```powershell
cd "c:\Users\Danus\OneDrive\Desktop\ArivuHub"
```

### 2. Start the Local Development Server
```powershell
npm run dev
```

### 3. Open in Your Browser
Once the server starts, open your browser and go to:
👉 **`http://localhost:5173/`**

---

## 📁 Key File Structure Explained

```text
ArivuHub/
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx            # Navigation drawer with active tab badges & streak counter
│   │   ├── Header.tsx             # Active topic switcher dropdown, AI tokens, and streak
│   │   ├── DashboardOverview.tsx  # High-level stats, current topic progress, and 5-step loop
│   │   ├── LearningLab.tsx        # Feature 1: Study notes input & diagnostic quiz generator
│   │   ├── QuizEvaluation.tsx     # Feature 2: Interactive quiz & "Explain Like I'm 10" report
│   │   ├── RevisionTools.tsx      # Feature 3: 3D flashcards, mnemonics, SVG mind map, notes
│   │   ├── ProgressTracker.tsx    # Feature 4: Retest & before-vs-after improvement delta
│   │   ├── TutorFinder.tsx        # Feature 5: Search & filter expert tutors for 1-on-1 demo
│   │   ├── BookingModal.tsx       # Date & slot booking dialog with concept focus picker
│   │   └── MyBookingsView.tsx     # Management of confirmed tutor demo calls
│   │
│   ├── data/
│   │   └── sampleData.ts          # Clearly labeled mock data ready to be connected to FastAPI
│   │
│   ├── types/
│   │   └── index.ts               # Clean TypeScript interfaces for all data structures
│   │
│   ├── App.tsx                    # Main app coordinator with interactive state
│   ├── index.css                  # Custom modern purple-and-white theme design system
│   └── main.tsx                   # React entry point
│
├── package.json                   # Dependencies: React 19, Lucide icons, Canvas-Confetti
└── vite.config.ts                 # Fast Vite build configuration
```

---

## 🔮 Next Step: Backend Integration
Once you have tested and verified the frontend UI, we will build the **Python FastAPI** backend with SQLite and Google Gemini AI API to dynamically generate questions and explanations from any custom study notes!
