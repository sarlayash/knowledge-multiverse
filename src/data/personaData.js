// Knowledge Multiverse — Persona Profiles, Tailored Tracks & Diagnostic Assessments
// Powered by Kapil

export const PERSONAS = {
  school: {
    id: 'school',
    title: 'School Student',
    gradeScope: 'Classes 6 to 12 / High School',
    tagline: 'Junior Tech Prodigy & Future Creator',
    badgeText: '🎒 SCHOOL PRODIGY TRACK',
    accentColor: '#38bdf8', // sky
    badgeGradient: 'from-sky-500 to-blue-600',
    icon: '🎒',
    mindset: 'Learn computational thinking, build fun games & apps, explore AI safely, and ace school computer science.',
    goals: [
      { id: 'foundations-logic', title: 'Learn Coding & Logic from Scratch', desc: 'Master binary, algorithms, and how computers think' },
      { id: 'creative-coding', title: 'Build Cool Apps, Websites & Games', desc: 'Create interactive HTML/JS projects and Python mini-games' },
      { id: 'school-cs-topper', title: 'Ace School Computer Science Exams', desc: 'Get top grades in Python/C++ school syllabus' },
      { id: 'ai-robotics', title: 'Explore AI, IoT & Future Gadgets', desc: 'Understand ChatGPT, smart sensors, and 3D printing safely' }
    ],
    priorityLevels: [1, 2, 3, 5, 7, 20, 23, 25],
    diagnosticQuiz: [
      {
        id: 'diag-sch-1',
        question: 'Which of the following is the smallest unit of digital memory that computers understand?',
        options: ['1 Megabyte', '1 Bit (0 or 1)', '1 Kilobyte', '1 Gigabyte'],
        correctIndex: 1,
        explanation: 'A bit (binary digit: 0 or 1) is the fundamental building block of all computer data!'
      },
      {
        id: 'diag-sch-2',
        question: 'In programming, what do we call a repeatable step-by-step recipe to solve a problem?',
        options: ['An Algorithm', 'A Monitor', 'A Keyboard', 'A Motherboard'],
        correctIndex: 0,
        explanation: 'An algorithm is a step-by-step set of instructions to solve a problem, like a cooking recipe.'
      },
      {
        id: 'diag-sch-3',
        question: 'Which technology allows computers to recognize faces, translate languages, and generate text?',
        options: ['Artificial Intelligence (AI)', 'Bluetooth', 'USB Cable', 'Power Supply'],
        correctIndex: 0,
        explanation: 'Artificial Intelligence (AI) and Machine Learning enable computers to learn from patterns and make smart decisions.'
      }
    ],
    studyPackTitle: 'Knowledge Multiverse Junior Prodigy Study Pack',
    studyPackIntro: 'Tailored for young creators and school innovators to build unbreakable digital foundations and logic.'
  },

  college: {
    id: 'college',
    title: 'College Student',
    gradeScope: 'B.Tech, BCA, BSc, MCA, Engineering & Degree',
    tagline: 'Campus to FAANG & Software Engineering Track',
    badgeText: '🎓 CAMPUS TO FAANG TRACK',
    accentColor: '#f59e0b', // amber
    badgeGradient: 'from-amber-500 to-yellow-400',
    icon: '🎓',
    mindset: 'Crack product & FAANG campus placements, master CS subjects (OS, DBMS, CN), master DSA, and build 10+ resume projects.',
    goals: [
      { id: 'crack-faang', title: 'Crack FAANG / Tier-1 Product Companies', desc: 'Master DSA, system design basics, and technical rounds' },
      { id: 'campus-placement', title: 'Ace Campus Placements & Mass Drives', desc: 'Crack aptitude, core CS subjects (OS/DBMS/CN), and coding tests' },
      { id: 'fullstack-dev', title: 'Become a Full-Stack Software Developer', desc: 'Build scalable React, Node, SQL & API portfolio projects' },
      { id: 'gate-higher-studies', title: 'Core CS Foundations for Exams / GATE', desc: 'Deep dive into computer architecture, OS concurrency, and relational algebra' }
    ],
    priorityLevels: [3, 4, 5, 6, 7, 9, 10, 11, 12, 15, 17, 20],
    diagnosticQuiz: [
      {
        id: 'diag-col-1',
        question: 'What is the average time complexity of searching an element in a balanced Binary Search Tree (BST)?',
        options: ['O(N^2)', 'O(log N)', 'O(1)', 'O(N!)'],
        correctIndex: 1,
        explanation: 'A balanced BST cuts the search space in half at each step, giving an efficient O(log N) runtime.'
      },
      {
        id: 'diag-col-2',
        question: 'Which SQL clause is used to filter records resulting from an aggregate function like COUNT() or AVG()?',
        options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'],
        correctIndex: 1,
        explanation: 'HAVING filters grouped rows after aggregation, whereas WHERE filters individual rows prior to aggregation.'
      },
      {
        id: 'diag-col-3',
        question: 'In Operating Systems, what primary problem is prevented using the Banker’s Algorithm?',
        options: ['Deadlock', 'Thrashing', 'Buffer Overflow', 'Cache Miss'],
        correctIndex: 0,
        explanation: 'The Banker’s algorithm simulates resource allocation to ensure the system stays in a safe state and avoids deadlocks.'
      }
    ],
    studyPackTitle: 'Knowledge Multiverse Campus to FAANG Career Blueprint',
    studyPackIntro: 'Designed for college engineers to master core CS fundamentals, conquer coding interviews, and build an ATS-ready portfolio.'
  },

  professional: {
    id: 'professional',
    title: 'Working Professional',
    gradeScope: 'IT Engineers, Career Switchers & Upskillers',
    tagline: 'Career Transition & Tech Architect Track',
    badgeText: '💼 PRO ARCHITECT TRACK',
    accentColor: '#10b981', // emerald
    badgeGradient: 'from-emerald-500 to-teal-400',
    icon: '💼',
    mindset: 'Modernize tech stack, switch from non-tech/support to high-paying software engineering, and master Cloud, DevOps & GenAI.',
    goals: [
      { id: 'career-switch', title: 'Switch to High-Paying Software Developer Role', desc: 'Transition from non-tech, support, or QA into core development' },
      { id: 'cloud-devops', title: 'Master Cloud Architecture & DevOps CI/CD', desc: 'Lead AWS/GCP infrastructure, Docker, Kubernetes, and automated pipelines' },
      { id: 'genai-architect', title: 'Lead AI & GenAI Transformation', desc: 'Build LLM applications, RAG pipelines, and enterprise automation' },
      { id: 'tech-leadership', title: 'Step Up to Senior Engineer / Tech Lead', desc: 'Master system design, distributed databases, security, and scalability' }
    ],
    priorityLevels: [5, 6, 7, 11, 12, 14, 16, 17, 18, 19, 21, 22],
    diagnosticQuiz: [
      {
        id: 'diag-pro-1',
        question: 'In high-scale distributed systems, what does the CAP Theorem state you must trade off during a network partition?',
        options: [
          'Choose between Consistency and Availability',
          'Choose between Speed and Security',
          'Choose between SQL and NoSQL',
          'Choose between CPU and Memory'
        ],
        correctIndex: 0,
        explanation: 'When a network partition (P) occurs, a distributed system must sacrifice either Consistency (C) or Availability (A).'
      },
      {
        id: 'diag-pro-2',
        question: 'Which architectural pattern decouples services via asynchronous events and message brokers (Kafka/RabbitMQ)?',
        options: ['Monolithic Shared Memory', 'Event-Driven Architecture', 'Strict Two-Tier Client-Server', 'Static File Hosting'],
        correctIndex: 1,
        explanation: 'Event-Driven Architecture (EDA) allows independent scaling, loose coupling, and asynchronous resilience across services.'
      },
      {
        id: 'diag-pro-3',
        question: 'What is the primary benefit of Blue-Green or Canary deployment strategies in DevOps CI/CD pipelines?',
        options: [
          'Zero-downtime updates and instant rollback if bugs occur',
          'Eliminating the need for automated tests',
          'Reducing cloud server count to one',
          'Replacing SQL databases with static JSON'
        ],
        correctIndex: 0,
        explanation: 'Canary and Blue-Green deployments route traffic gradually to new releases, verifying telemetry with zero downtime.'
      }
    ],
    studyPackTitle: 'Knowledge Multiverse Enterprise Tech Architect Study Pack',
    studyPackIntro: 'Curated for working professionals seeking career acceleration, modern cloud practices, and enterprise system design.'
  }
};

// Persona-specific insights for each level
export const PERSONA_LEVEL_INSIGHTS = {
  school: {
    1: '🎮 Young Creator Tip: Think of bits like light switches in your house: either ON (1) or OFF (0). With just 8 switches, you can spell any letter!',
    2: '🎮 Science Fair Idea: Trace how a keyboard keypress travels through the CPU bus to show pixels on your monitor.',
    5: '🎮 Project Inspiration: Write your first number guessing game using `if-else` conditions and a `while` loop.',
    7: '🎮 Interactive Web: Build your own personal homepage with colorful buttons, sound effects, and your favorite hobbies.',
    20: '🎮 AI Fun Fact: AI doesn’t "think" like a human — it looks at millions of pictures of cats and dogs to find patterns!',
    23: '🎮 Smart Gadgets: Imagine programming a sensor that waters your houseplant automatically when the soil is dry.'
  },
  college: {
    1: '🎯 Campus Placement Note: Expect questions on bitwise operators (`&`, `|`, `^`, `<<`, `>>`) for fast memory optimization in interview rounds.',
    4: '🎯 Core OS Interview: Be prepared to draw the 5 Process States (New, Ready, Running, Waiting, Terminated) and explain Context Switching.',
    5: '🎯 Coding Round Essential: Pointer arithmetic and memory allocation (`malloc`, `free`) are tested rigorously in product company rounds.',
    6: '🎯 Technical Round: Differentiate between Clustered vs Non-Clustered Indexes and explain why Normalization reduces update anomalies.',
    12: '🎯 Resume Supercharger: Add GitHub Actions CI/CD pipeline automation to your semester projects to stand out to FAANG recruiters.',
    15: '🎯 Networking Q&A: Explain the 3-Way TCP Handshake (SYN, SYN-ACK, ACK) and DNS resolution lifecycle step by step.'
  },
  professional: {
    1: '💼 Enterprise Takeaway: Understanding binary representations and memory bounds is crucial when debugging 64-bit integer overflow in financial ledgers.',
    6: '💼 Architecture Decision: Evaluate read-heavy vs write-heavy workloads when picking between SQL ACID compliance and NoSQL eventual consistency.',
    12: '💼 Production Standard: Implement automated canary rollouts with automated health check rollbacks to maintain 99.99% SLA uptime.',
    17: '💼 Cloud Cost Optimization: Architect multi-AZ serverless workloads with auto-scaling to avoid over-provisioned idle EC2 infrastructure.',
    18: '💼 Security Compliance: Enforce Principle of Least Privilege (PoLP) and automated secret rotation (KMS/Vault) for SOC2 and ISO compliance.',
    21: '💼 GenAI Enterprise Strategy: Use Retrieval-Augmented Generation (RAG) with vector databases to prevent hallucinations in private corporate knowledge.'
  }
};

// Helper to generate personalized study pack content for export/download
export function generatePersonalizedStudyPack(personaId, learnerName, levelsData) {
  const p = PERSONAS[personaId] || PERSONAS.college;
  const prioritizedLevels = levelsData.filter(l => p.priorityLevels.includes(l.id));

  let content = `========================================================================
${p.studyPackTitle.toUpperCase()}
Knowledge Multiverse — Powered by Kapil
Tailored for: ${learnerName || 'Learner'} (${p.title})
Track: ${p.tagline}
Generated: ${new Date().toLocaleDateString('en-US', { dateStyle: 'full' })}
========================================================================

${p.studyPackIntro}

CORE MINDSET & TARGET OBJECTIVES:
${p.mindset}

HIGH-PRIORITY ROADMAP LEVELS:
${prioritizedLevels.map(l => `• Level ${l.id}: ${l.title} (${l.domain} - Stage: ${l.stage})`).join('\n')}

========================================================================
PART 1: TAILORED LEVEL SYLLABUS & HIGH-YIELD CHEAT SHEETS
========================================================================
`;

  prioritizedLevels.forEach(level => {
    const personaInsight = PERSONA_LEVEL_INSIGHTS[personaId]?.[level.id] || '';
    content += `
------------------------------------------------------------------------
LEVEL ${level.id}: ${level.title.toUpperCase()}
Domain: ${level.domain} | Stage: ${level.stage}
------------------------------------------------------------------------
SUMMARY:
${level.summary}

KEY MODULES & CONCEPTS:
${level.modules.map(m => `* ${m.title}: ${m.concepts.join(', ')}`).join('\n')}

QUICK NOTES & MNEMONICS:
${level.quickNotes}

${personaInsight ? `PERSONA FOCUS INSIGHT:\n${personaInsight}\n` : ''}
PRACTICAL CHALLENGE:
${level.codingChallenge ? `Title: ${level.codingChallenge.title}\nLanguage: ${level.codingChallenge.language}\nProblem: ${level.codingChallenge.description}` : 'Hands-on practice in Multiverse Live IDE'}
`;
  });

  content += `
========================================================================
PART 2: PRACTICE & PORTFOLIO ACTION PLAN
========================================================================
1. Complete all ${prioritizedLevels.length} prioritized levels in sequence.
2. Solve the coding challenges in the built-in browser IDE.
3. Test your speed in the 5-Minute Mock Assessment Center.
4. Unlock your verified Knowledge Multiverse credentials.

Legacy of Values. Future of Learning.
SarlaYash Learning Solutions LLP • Powered by Kapil
Offline PWA App: https://sarlayash.github.io/knowledge-multiverse/
========================================================================
`;

  return content;
}
