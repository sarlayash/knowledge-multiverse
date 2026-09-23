// Knowledge Multiverse — Complete 25-Level Curriculum Data Architecture
// Powered by Kapil
// Stage Progression: ZERO -> BEGINNER -> FOUNDATION -> PRACTITIONER -> ADVANCED -> INDUSTRY READY -> EXPERT

export const DOMAINS = [
  { id: 'foundations', name: 'Foundations', levels: [1, 2, 3], icon: '🌍', color: '#38bdf8' },
  { id: 'systems', name: 'Systems & Programming', levels: [4, 5], icon: '💻', color: '#818cf8' },
  { id: 'data-web', name: 'Data & Web Systems', levels: [6, 7], icon: '🗄️', color: '#34d399' },
  { id: 'engineering', name: 'Software Engineering & Agile', levels: [8, 9, 10, 11, 12], icon: '⚙️', color: '#fbbf24' },
  { id: 'infrastructure', name: 'Infrastructure, Cloud & Security', levels: [13, 14, 15, 16, 17, 18], icon: '☁️', color: '#f43f5e' },
  { id: 'emerging', name: 'AI & Frontier Technologies', levels: [19, 20, 21, 22, 23, 24, 25], icon: '🚀', color: '#c084fc' }
];

export const LEVELS_DATA = [
  {
    id: 1,
    title: 'Digital Foundations',
    stage: 'ZERO',
    domain: 'Foundations',
    icon: '🌍',
    planetColor: 'from-blue-600 via-sky-500 to-indigo-800',
    accentColor: '#38bdf8',
    summary: 'The bedrock of modern computing: information systems, binary representation, digital literacy, and logic gates.',
    modules: [
      { id: 'm1-1', title: 'What is Information Technology?', concepts: ['Data vs Information', 'Hardware & Software ecosystem', 'IT in daily life'] },
      { id: 'm1-2', title: 'Data Representation & Binary', concepts: ['Bits, Bytes, KB, MB, GB, TB', 'Binary, Octal, Hexadecimal numbers', 'ASCII and Unicode standards'] },
      { id: 'm1-3', title: 'Digital Literacy & Safety', concepts: ['File management', 'Safe browsing', 'Digital identity & privacy'] }
    ],
    quickNotes: `• **Bit**: Smallest unit of data (0 or 1, electrical charge on/off).\n• **Byte**: 8 bits (256 distinct values, holds 1 character in ASCII).\n• **Data vs Information**: Data is raw unorganized facts; Information is processed, structured, meaningful data.\n• **Hexadecimal (Base 16)**: Uses 0-9 and A-F. Widely used for memory addresses and color codes (#FFFFFF).\n• **Unicode (UTF-8)**: Supports emojis and global characters, variable length (1-4 bytes).`,
    deepDive: `### The Physical Reality of Computing\nComputers fundamentally manipulate electrical voltages across microscopic silicon transistors. When billions of transistors act as high-speed switches (on = 1, off = 0), they form **Logic Gates** (AND, OR, NOT, XOR).\n\n#### Why Binary?\nAnalog signals are prone to electrical noise and voltage decay. In contrast, digital two-state logic provides a wide noise margin: either high voltage (~3.3V/5V) or ground (0V). This binary simplicity makes massive scale computation reliable.\n\n#### Interview Q&A\n**Q: Why do network systems use hexadecimal for MAC addresses and IPv6?**\n*A: Hexadecimal represents 4 bits with a single character (nibble), making long 48-bit MAC addresses and 128-bit IPv6 addresses compact and human-readable.*`,
    assessments: [
      {
        id: 'q1-1',
        type: 'mcq',
        difficulty: 'easy',
        question: 'How many distinct values can be represented with an 8-bit byte?',
        options: ['128', '256', '512', '1024'],
        correctIndex: 1,
        whyWrong: 'An 8-bit byte has 2^8 combinations = 256 distinct numeric states (0 to 255). 128 is 2^7, while 1024 is 2^10.'
      },
      {
        id: 'q1-2',
        type: 'true_false',
        difficulty: 'easy',
        question: 'True or False: Hexadecimal is Base 16 and uses letters A through F to represent values 10 through 15.',
        options: ['True', 'False'],
        correctIndex: 0,
        whyWrong: 'Hexadecimal incorporates digits 0-9 and letters A (10), B (11), C (12), D (13), E (14), F (15).'
      },
      {
        id: 'q1-3',
        type: 'fill_blank',
        difficulty: 'medium',
        question: 'What is the binary equivalent of decimal number 13?',
        options: ['1101', '1011', '1110', '1001'],
        correctIndex: 0,
        whyWrong: '13 in binary = 8 + 4 + 0 + 1 = 1101.'
      }
    ],
    codingChallenge: {
      title: 'Binary to Decimal Converter',
      language: 'javascript',
      description: 'Write a function `binaryToDecimal(binStr)` that takes a string of 1s and 0s and returns its integer decimal value.',
      starterCode: `function binaryToDecimal(binStr) {
  // Convert binary string to decimal integer
  return parseInt(binStr, 2);
}

console.log(binaryToDecimal("1101")); // Expected: 13`,
      testCases: [
        { input: '"1101"', expectedOutput: '13', hint: '1101 is 8 + 4 + 1' },
        { input: '"1010"', expectedOutput: '10', hint: '1010 is 8 + 2' },
        { input: '"11111111"', expectedOutput: '255', hint: '8 ones is 255' }
      ]
    }
  },
  {
    id: 2,
    title: 'Computer Fundamentals',
    stage: 'BEGINNER',
    domain: 'Foundations',
    icon: '🪐',
    planetColor: 'from-amber-600 via-orange-500 to-red-800',
    accentColor: '#fb923c',
    summary: 'Hardware vs software, CPU cycles, RAM vs Storage, motherboard bus, and peripherals.',
    modules: [
      { id: 'm2-1', title: 'Hardware Anatomy', concepts: ['CPU (ALU, CU, Registers)', 'Motherboard & Chipsets', 'Buses and Clock Speed'] },
      { id: 'm2-2', title: 'Memory Hierarchy', concepts: ['Registers vs Cache (L1/L2/L3)', 'RAM (Volatile) vs SSD/HDD (Non-volatile)', 'Virtual memory'] },
      { id: 'm2-3', title: 'System Software vs Application Software', concepts: ['Firmware, BIOS/UEFI', 'Operating Systems', 'Device Drivers'] }
    ],
    quickNotes: `• **CPU**: The brain with ALU (Arithmetic Logic Unit), CU (Control Unit), and Registers.\n• **Clock Speed**: Measured in GHz (billions of cycles per second).\n• **RAM**: Fast, volatile workspace for active programs; cleared upon power loss.\n• **SSD vs HDD**: SSD uses NAND flash memory with zero mechanical latency, 10x-30x faster than magnetic spinning HDDs.\n• **BIOS/UEFI**: Low-level firmware initializing hardware before booting the OS.`,
    deepDive: `### The Von Neumann Architecture\nModern computers are modeled after John von Neumann's 1945 design:\n1. **Processing Unit**: containing ALU and processor registers.\n2. **Control Unit**: containing Instruction Register and Program Counter.\n3. **Memory**: storing both instructions (code) and operational data.\n4. **External Mass Storage & I/O mechanisms**.\n\n#### The Bottleneck\nThe shared bus between CPU and Memory creates the *Von Neumann Bottleneck*, where data transmission delays constrain execution throughput. Multi-level caching (L1, L2, L3) mitigates this.\n\n#### Interview Q&A\n**Q: What happens when computer RAM is 100% consumed?**\n*A: The OS initiates Paging/Swapping, writing memory pages to secondary storage (Virtual Memory/Swap space), causing disk thrashing and dramatic slowdown.*`,
    assessments: [
      {
        id: 'q2-1',
        type: 'mcq',
        difficulty: 'easy',
        question: 'Which of the following memory types is volatile (loses contents on power loss)?',
        options: ['RAM', 'ROM', 'NVMe SSD', 'Hard Disk Drive'],
        correctIndex: 0,
        whyWrong: 'RAM requires constant electrical refresh to retain charge in its capacitors; ROM and SSDs are non-volatile.'
      },
      {
        id: 'q2-2',
        type: 'multiple_select',
        difficulty: 'medium',
        question: 'Select all components found inside the Central Processing Unit (CPU):',
        options: ['Arithmetic Logic Unit (ALU)', 'Control Unit (CU)', 'Internal Registers', 'Mechanical Platter'],
        correctIndex: 0, // In multi select, evaluated as array check
        whyWrong: 'ALU, Control Unit, and Registers reside in the CPU die. Mechanical platters belong to legacy hard drives.'
      }
    ],
    codingChallenge: {
      title: 'Memory Converter',
      language: 'javascript',
      description: 'Write a function `gbToBytes(gb)` converting gigabytes to exact bytes (using 1024 multiplier).',
      starterCode: `function gbToBytes(gb) {
  return gb * 1024 * 1024 * 1024;
}

console.log(gbToBytes(1)); // 1073741824`,
      testCases: [
        { input: '1', expectedOutput: '1073741824', hint: '1024^3' },
        { input: '2', expectedOutput: '2147483648', hint: '2 * 1024^3' },
        { input: '0.5', expectedOutput: '536870912', hint: 'Half a GB' }
      ]
    }
  },
  {
    id: 3,
    title: 'Computer Organization',
    stage: 'FOUNDATION',
    domain: 'Foundations',
    icon: '⚙️',
    planetColor: 'from-cyan-600 via-teal-500 to-emerald-900',
    accentColor: '#2dd4bf',
    summary: 'Instruction cycle (Fetch-Decode-Execute), assembly basics, memory addressing, interrupts, and RISC vs CISC.',
    modules: [
      { id: 'm3-1', title: 'Instruction Cycle', concepts: ['Fetch, Decode, Execute, Writeback', 'Program Counter (PC)', 'Instruction Register (IR)'] },
      { id: 'm3-2', title: 'Processor Architectures', concepts: ['RISC (ARM, RISC-V) vs CISC (x86-64)', 'Pipelining and Hazards', 'Branch prediction'] },
      { id: 'm3-3', title: 'Interrupts & Bus Systems', concepts: ['Hardware interrupts', 'Software traps / Syscalls', 'Direct Memory Access (DMA)'] }
    ],
    quickNotes: `• **F-D-E Cycle**: Fetch instruction from RAM -> Decode in Control Unit -> Execute in ALU -> Store result.\n• **Program Counter (PC)**: Holds the memory address of the NEXT instruction.\n• **RISC vs CISC**: RISC (ARM) uses small, simple, single-cycle instructions (power efficient); CISC (x86) uses rich multi-cycle instructions.\n• **DMA (Direct Memory Access)**: Enables high-speed peripherals (NIC, SSD) to transfer data directly to RAM without burdening the CPU.\n• **Interrupt**: A signal alerting CPU to suspend current execution and run an Interrupt Service Routine (ISR).`,
    deepDive: `### Pipelining in Modern Superscalar Processors\nPipelining divides instruction execution into assembly line stages: while instruction 3 is fetched, instruction 2 is decoded, and instruction 1 is executed in parallel.\n\n#### Pipeline Hazards\n1. **Structural Hazards**: Hardware resource conflict (e.g. single memory port).\n2. **Data Hazards (RAW)**: An instruction depends on the result of an earlier uncommitted instruction.\n3. **Control Hazards**: Conditional branches ('if'/'goto') where the branch target is uncertain, leading to pipeline flushes unless branch prediction succeeds.\n\n#### Interview Q&A\n**Q: Why does Apple Silicon (M-series) achieve high battery efficiency compared to traditional x86?**\n*A: It utilizes an ARM-based RISC architecture with uniform fixed-length instructions, massive decode width, out-of-order execution windows, and unified memory architecture (UMA) on-chip.*`,
    assessments: [
      {
        id: 'q3-1',
        type: 'mcq',
        difficulty: 'medium',
        question: 'Which CPU register stores the memory address of the next instruction to be fetched?',
        options: ['Instruction Register (IR)', 'Accumulator (ACC)', 'Program Counter (PC)', 'Memory Buffer Register (MBR)'],
        correctIndex: 2,
        whyWrong: 'The Program Counter (PC) tracks execution by incrementing to point to the subsequent instruction in memory.'
      },
      {
        id: 'q3-2',
        type: 'output_prediction',
        difficulty: 'medium',
        question: 'In a 4-stage pipeline (Fetch, Decode, Execute, Writeback), how many cycles does it ideally take to execute 5 independent instructions?',
        options: ['20 cycles', '8 cycles', '12 cycles', '5 cycles'],
        correctIndex: 1,
        whyWrong: 'Formula: Cycles = Stages + (Instructions - 1) = 4 + (5 - 1) = 8 cycles. Without pipelining it would take 4 * 5 = 20 cycles!'
      }
    ],
    codingChallenge: {
      title: 'Simple Virtual Machine Register Simulator',
      language: 'javascript',
      description: 'Implement a tiny accumulator processor: starting with accumulator `0`, execute an array of instructions: `ADD 5`, `SUB 2`, `MUL 3`.',
      starterCode: `function runInstructions(instructions) {
  let acc = 0;
  for (const inst of instructions) {
    const [op, valStr] = inst.split(' ');
    const val = parseInt(valStr, 10);
    if (op === 'ADD') acc += val;
    if (op === 'SUB') acc -= val;
    if (op === 'MUL') acc *= val;
  }
  return acc;
}

console.log(runInstructions(['ADD 10', 'SUB 4', 'MUL 2'])); // Expected: 12`,
      testCases: [
        { input: "['ADD 10', 'SUB 4', 'MUL 2']", expectedOutput: '12', hint: '(0+10-4)*2' },
        { input: "['ADD 5', 'MUL 5', 'SUB 10']", expectedOutput: '15', hint: '(5*5)-10' },
        { input: "['ADD 100', 'SUB 50']", expectedOutput: '50', hint: '100-50' }
      ]
    }
  },
  {
    id: 4,
    title: 'Operating Systems',
    stage: 'FOUNDATION',
    domain: 'Systems & Programming',
    icon: '🌐',
    planetColor: 'from-violet-700 via-indigo-600 to-purple-900',
    accentColor: '#818cf8',
    summary: 'Processes, threads, CPU scheduling algorithms, virtual memory paging, deadlocks, and file systems.',
    modules: [
      { id: 'm4-1', title: 'Process vs Thread', concepts: ['Process Control Block (PCB)', 'Context switching', 'Multithreading and Race Conditions'] },
      { id: 'm4-2', title: 'CPU Scheduling Algorithms', concepts: ['FCFS, SJF, Round Robin', 'Turnaround time & Waiting time', 'Priority scheduling'] },
      { id: 'm4-3', title: 'Memory Management & Deadlocks', concepts: ['Virtual memory & Paging', 'Page Faults & LRU Replacement', 'Banker’s Algorithm & Coffman conditions'] }
    ],
    quickNotes: `• **Process**: A program in execution with isolated memory address space.\n• **Thread**: A lightweight unit of CPU execution sharing memory and file handles with other threads in the same process.\n• **Context Switch**: Saving state of one process/thread and loading another; has CPU overhead.\n• **Deadlock Conditions (Coffman)**: 1) Mutual Exclusion, 2) Hold and Wait, 3) No Preemption, 4) Circular Wait.\n• **Round Robin**: Preemptive scheduling giving each process a fixed time slice (quantum).`,
    deepDive: `### Virtual Memory and Paging Mechanics\nInstead of loading an entire application into physical RAM contiguous blocks, modern OS kernels partition memory into fixed-size **Pages** (typically 4 KB).\n- **Page Table**: Translates logical (virtual) addresses to physical frame addresses via the Memory Management Unit (MMU).\n- **TLB (Translation Lookaside Buffer)**: High-speed hardware cache for fast address translations.\n- **Page Fault**: When an address references a page not currently in physical RAM, an interrupt pauses the process, fetches the page from swap storage, and updates the page table.\n\n#### Interview Q&A\n**Q: What is a Race Condition, and how is it prevented in multi-threaded programming?**\n*A: A race condition occurs when concurrent threads access and modify shared resources simultaneously without synchronization, producing non-deterministic bugs. It is prevented using Mutexes, Semaphores, or atomic operations.*`,
    assessments: [
      {
        id: 'q4-1',
        type: 'mcq',
        difficulty: 'medium',
        question: 'Which of the following is NOT shared among threads of the same process?',
        options: ['Heap memory', 'Open file descriptors', 'CPU Registers & Stack', 'Global variables'],
        correctIndex: 2,
        whyWrong: 'Each thread possesses its own distinct CPU Register state and Stack to track its individual function calls and local variables.'
      },
      {
        id: 'q4-2',
        type: 'scenario',
        difficulty: 'hard',
        question: 'Scenario: Four processes are locked in an indefinite wait because each holds a resource the other needs in a circular loop. Which deadlock prevention strategy breaks this?',
        options: [
          'Enforce strict global ordering on resource acquisition to eliminate Circular Wait',
          'Increase the CPU clock frequency',
          'Double the virtual memory page size',
          'Switch scheduling from Round Robin to FCFS'
        ],
        correctIndex: 0,
        whyWrong: 'Imposing a global total ordering on all resource acquisitions ensures that cyclic dependency is impossible, completely preventing circular wait.'
      }
    ],
    codingChallenge: {
      title: 'First-Come First-Served (FCFS) Turnaround Time Calculator',
      language: 'javascript',
      description: 'Given an array of burst times for sequential processes, return their average turnaround time.',
      starterCode: `function averageTurnaroundTime(burstTimes) {
  let currentTime = 0;
  let totalTurnaround = 0;
  for (const b of burstTimes) {
    currentTime += b;
    totalTurnaround += currentTime;
  }
  return Number((totalTurnaround / burstTimes.length).toFixed(2));
}

console.log(averageTurnaroundTime([3, 5, 2])); // Expected: (3 + 8 + 10) / 3 = 7.00`,
      testCases: [
        { input: '[3, 5, 2]', expectedOutput: '7', hint: 'Turnaround times: 3, 8, 10' },
        { input: '[2, 4, 6]', expectedOutput: '6.67', hint: 'Turnaround times: 2, 6, 12' },
        { input: '[1, 1, 1]', expectedOutput: '2', hint: 'Turnaround times: 1, 2, 3' }
      ]
    }
  },
  {
    id: 5,
    title: 'C Programming',
    stage: 'PRACTITIONER',
    domain: 'Systems & Programming',
    icon: '💻',
    planetColor: 'from-blue-600 via-indigo-500 to-sky-700',
    accentColor: '#38bdf8',
    summary: 'The mother of modern languages: variables, pointers, dynamic memory allocation, structs, arrays, and file handling.',
    modules: [
      { id: 'm5-1', title: 'What is Programming & Compiler vs Interpreter', concepts: ['C history', 'Preprocessor (#include, #define)', 'Compilation phases: Preprocess -> Compile -> Assemble -> Link'] },
      { id: 'm5-2', title: 'Variables, Data Types & Operators', concepts: ['int, float, double, char', 'Format specifiers (%d, %f, %c, %s)', 'Bitwise and logical operators'] },
      { id: 'm5-3', title: 'Control Flow & Conditionals', concepts: ['if-else ladder', 'switch-case', 'Ternary operator'] },
      { id: 'm5-4', title: 'Loops & Iterations', concepts: ['for, while, do-while', 'break and continue', 'Nested loops'] },
      { id: 'm5-5', title: 'Functions & Scope', concepts: ['Function prototypes', 'Pass by value vs Pass by reference', 'Recursion and Call stack'] },
      { id: 'm5-6', title: 'Arrays & Multidimensional Arrays', concepts: ['1D array memory contiguousness', 'Matrix operations', 'Array decay into pointers'] },
      { id: 'm5-7', title: 'Strings in C', concepts: ['Null terminator (\\0)', 'string.h library (strlen, strcpy, strcmp, strcat)', 'Buffer overflow vulnerabilities'] },
      { id: 'm5-8', title: 'Pointers Deep Dive', concepts: ['Address-of operator (&) and Dereference (*)', 'Pointer arithmetic', 'Double pointers (void**)', 'Function pointers'] },
      { id: 'm5-9', title: 'Structures & Unions', concepts: ['struct syntax', 'struct padding and alignment', 'Arrow operator (->)', 'unions vs structs'] },
      { id: 'm5-10', title: 'Dynamic Memory Allocation', concepts: ['malloc, calloc, realloc, free', 'Memory Leaks and Valgrind', 'Dangling pointers and Double Free'] },
      { id: 'm5-11', title: 'File Handling', concepts: ['fopen modes (r, w, a, rb, wb)', 'fprintf, fscanf, fread, fwrite', 'fclose and EOF'] },
      { id: 'm5-12', title: 'Placement Coding Challenges', concepts: ['Linked Lists in C', 'String reversals without library', 'Bit manipulation tricks'] }
    ],
    quickNotes: `• **Pointers**: A variable that stores the memory address of another variable ('int *p = &x;').\n• **Dangling Pointer**: A pointer pointing to memory that has already been deallocated by 'free()'.\n• **Memory Leak**: Allocating heap memory via 'malloc()' without releasing it via 'free()'.\n• **Null Terminator**: In C, strings are character arrays terminated with '\\0'. Without it, string functions read random memory.\n• **Struct Padding**: Compilers insert padding bytes so variables align with 4-byte or 8-byte CPU word boundaries.`,
    deepDive: `### The 4 Phases of C Compilation\n1. **Pre-processing ('gcc -E')**: Expands '#include' headers, substitutes '#define' macros, strips comments.\n2. **Compilation ('gcc -S')**: Translates preprocessed C into assembly language instructions.\n3. **Assembly ('gcc -c')**: Translates assembly code into machine binary object code ('.o').\n4. **Linking ('gcc -o')**: Combines object files with standard C library implementations ('libc') to produce an executable.\n\n#### Interview Q&A\n**Q: What is the difference between 'malloc()' and 'calloc()'?**\n*A: 'malloc(size)' allocates uninitialized heap memory leaving garbage values. 'calloc(num, size)' allocates contiguous memory and zeroes out all allocated bytes.*`,
    assessments: [
      {
        id: 'q5-1',
        type: 'output_prediction',
        difficulty: 'medium',
        question: 'What is the output of the following C snippet?\n\nint arr[] = {10, 20, 30, 40};\nint *ptr = arr;\nprintf("%d", *(ptr + 2));',
        options: ['10', '20', '30', '40'],
        correctIndex: 2,
        whyWrong: '`ptr` points to index 0 (10). `*(ptr + 2)` dereferences index 2, which is 30.'
      },
      {
        id: 'q5-2',
        type: 'code_debugging',
        difficulty: 'hard',
        question: 'Identify the critical flaw in this memory allocation code:\n\nint *p = (int*)malloc(10 * sizeof(int));\n/* ... do work ... */\nfree(p);\nprintf("%d", *p);',
        options: [
          'Using dangling pointer *p after calling free(p) causes undefined behavior',
          'malloc requires sizeof(char)',
          'free() cannot be called on integer pointers',
          'There is no syntax error'
        ],
        correctIndex: 0,
        whyWrong: 'After calling `free(p)`, the memory is returned to the OS heap. Accessing `*p` is an illegal read of a dangling pointer leading to undefined behavior.'
      },
      {
        id: 'q5-3',
        type: 'fill_blank',
        difficulty: 'easy',
        question: 'Which character terminates strings in C?',
        options: ['\\0', '\\n', ';', 'EOF'],
        correctIndex: 0,
        whyWrong: 'C strings are null-terminated by the character `\\0` (ASCII value 0).'
      }
    ],
    codingChallenge: {
      title: 'Reverse String in Place (C Style)',
      language: 'javascript',
      description: 'Simulate C pointer in-place array swap: write a function `reverseArray(arr)` that reverses an array in-place without creating a second array.',
      starterCode: `function reverseArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
  }
  return arr;
}

console.log(reverseArray([1, 2, 3, 4, 5])); // Expected: [5, 4, 3, 2, 1]`,
      testCases: [
        { input: '[1, 2, 3, 4, 5]', expectedOutput: '[5,4,3,2,1]', hint: 'Two-pointer approach' },
        { input: '["h","e","l","l","o"]', expectedOutput: '["o","l","l","e","h"]', hint: 'Character array' },
        { input: '[42]', expectedOutput: '[42]', hint: 'Single element' }
      ]
    }
  },
  {
    id: 6,
    title: 'Database Management',
    stage: 'PRACTITIONER',
    domain: 'Data & Web Systems',
    icon: '🗄️',
    planetColor: 'from-emerald-600 via-teal-600 to-cyan-900',
    accentColor: '#34d399',
    summary: 'RDBMS vs NoSQL, ACID transactions, relational schema design, 1NF/2NF/3NF/BCNF normalization, and SQL JOINs.',
    modules: [
      { id: 'm6-1', title: 'DBMS Fundamentals & Relational Algebra', concepts: ['Tables, Rows (Tuples), Columns (Attributes)', 'Primary, Foreign, Unique, Candidate Keys', 'ER Diagrams and Cardinality'] },
      { id: 'm6-2', title: 'SQL Essentials & Queries', concepts: ['DDL (CREATE, ALTER, DROP)', 'DML (INSERT, UPDATE, DELETE)', 'DQL (SELECT, WHERE, ORDER BY, GROUP BY, HAVING)'] },
      { id: 'm6-3', title: 'Advanced SQL & Joins', concepts: ['INNER, LEFT, RIGHT, FULL OUTER JOIN', 'Subqueries & CTEs', 'Window Functions (RANK, ROW_NUMBER)'] },
      { id: 'm6-4', title: 'Normalization & Transactions', concepts: ['1NF, 2NF, 3NF, BCNF rules', 'ACID Properties (Atomicity, Consistency, Isolation, Durability)', 'Indexing (B-Tree, Hash) and Query plans'] }
    ],
    quickNotes: `• **ACID**: Atomicity (All or nothing), Consistency (Valid states), Isolation (Concurrent safety), Durability (Persisted across crashes).\n• **Primary Key**: Unique identifier for each record; cannot be NULL.\n• **Foreign Key**: Enforces referential integrity by pointing to a Primary Key in another table.\n• **3NF**: A table is in 3NF if it is in 2NF and has NO transitive dependencies (non-key columns must not depend on other non-key columns).\n• **Indexes**: B-Tree indexes transform O(N) table scans into O(log N) lookups, but add overhead to writes.`,
    deepDive: `### The SQL JOIN Anatomy\n- **INNER JOIN**: Returns only rows with matching values in both tables.\n- **LEFT JOIN**: Returns ALL rows from the left table, plus matched rows from the right table (with NULLs for unmatched right rows).\n- **RIGHT JOIN**: Returns all rows from right table.\n- **FULL OUTER JOIN**: Returns rows when there is a match in either left or right table.\n\n#### Interview Q&A\n**Q: What is the difference between 'WHERE' and 'HAVING' in SQL?**\n*A: 'WHERE' filters individual rows BEFORE they are grouped or aggregated. 'HAVING' filters aggregated groups AFTER 'GROUP BY' calculation.*`,
    assessments: [
      {
        id: 'q6-1',
        type: 'mcq',
        difficulty: 'medium',
        question: 'Which SQL clause is executed FIRST during query evaluation?',
        options: ['SELECT', 'FROM', 'WHERE', 'ORDER BY'],
        correctIndex: 1,
        whyWrong: 'The logical processing order of SQL begins with FROM (and JOINs), followed by WHERE, GROUP BY, HAVING, SELECT, and finally ORDER BY.'
      },
      {
        id: 'q6-2',
        type: 'output_prediction',
        difficulty: 'medium',
        question: 'If Table A has 5 rows and Table B has 4 rows, how many rows are produced by a CROSS JOIN without a WHERE filter?',
        options: ['9', '20', '5', '4'],
        correctIndex: 1,
        whyWrong: 'A CROSS JOIN produces the Cartesian product of both sets: 5 * 4 = 20 rows.'
      }
    ],
    codingChallenge: {
      title: 'SQL Join & Filter Simulator',
      language: 'javascript',
      description: 'Write a function `innerJoin(users, orders)` that joins user objects with order objects on `userId`.',
      starterCode: `function innerJoin(users, orders) {
  const result = [];
  for (const u of users) {
    for (const o of orders) {
      if (u.id === o.userId) {
        result.push({ name: u.name, item: o.item, amount: o.amount });
      }
    }
  }
  return result;
}

const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
const orders = [{ id: 101, userId: 1, item: 'Laptop', amount: 1200 }];
console.log(innerJoin(users, orders));`,
      testCases: [
        { input: 'users, orders', expectedOutput: '[{"name":"Alice","item":"Laptop","amount":1200}]', hint: 'Match on u.id === o.userId' }
      ]
    }
  },
  {
    id: 7,
    title: 'Web Development',
    stage: 'PRACTITIONER',
    domain: 'Data & Web Systems',
    icon: '🌎',
    planetColor: 'from-teal-600 via-sky-600 to-indigo-900',
    accentColor: '#38bdf8',
    summary: 'HTML5 semantic markup, CSS modern layout (Grid/Flexbox), JavaScript ES6+, DOM manipulation, and REST APIs.',
    modules: [
      { id: 'm7-1', title: 'Internet & Web Architecture', concepts: ['HTTP/HTTPS request-response lifecycle', 'DNS lookup and TCP handshake', 'Client-Server architecture'] },
      { id: 'm7-2', title: 'Semantic HTML5 & Accessible UI', concepts: ['header, nav, main, article, footer', 'ARIA roles and forms', 'SEO meta tags'] },
      { id: 'm7-3', title: 'CSS Mastery', concepts: ['CSS Box Model', 'Flexbox & CSS Grid', 'Media queries and Mobile-First styling'] },
      { id: 'm7-4', title: 'Modern JavaScript & Async/Await', concepts: ['DOM APIs, Event Bubbling and Delegation', 'Promises, Fetch API, and async/await', 'Web Storage (localStorage, sessionStorage)'] }
    ],
    quickNotes: `• **Box Model**: Content -> Padding -> Border -> Margin.\n• **HTTP Status Codes**: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 500 (Internal Server Error).\n• **Event Delegation**: Attaching a single event listener to a parent element to handle events on children via bubbling.\n• **CORS (Cross-Origin Resource Sharing)**: Browser security header preventing malicious sites from fetching data from external domains without permission.`,
    deepDive: `### The Critical Rendering Path\nWhen a browser receives HTML:\n1. **DOM Tree**: Parses HTML tags into Document Object Model nodes.\n2. **CSSOM Tree**: Parses CSS rules into style hierarchy.\n3. **Render Tree**: Combines DOM and CSSOM, omitting hidden elements ('display: none').\n4. **Layout (Reflow)**: Calculates geometric coordinates for each element on screen.\n5. **Paint**: Draws pixels (colors, borders, images) onto GPU layers.\n\n#### Interview Q&A\n**Q: What is the difference between 'display: none' and 'visibility: hidden'?**\n*A: 'display: none' completely removes the element from the layout render tree taking up zero space. 'visibility: hidden' hides the element visually but preserves its original space in the document layout.*`,
    assessments: [
      {
        id: 'q7-1',
        type: 'mcq',
        difficulty: 'easy',
        question: 'Which CSS layout module is optimized for one-dimensional layouts (row OR column)?',
        options: ['CSS Grid', 'Flexbox', 'Float', 'Absolute Positioning'],
        correctIndex: 1,
        whyWrong: 'Flexbox is designed for 1-dimensional layouts (either a row or a column). CSS Grid is designed for 2-dimensional layouts (rows AND columns simultaneously).'
      }
    ],
    codingChallenge: {
      title: 'Fetch Data and Filter Array',
      language: 'javascript',
      description: 'Write a function `getActiveUsers(users)` that filters an array of user objects to return only those with `isActive: true`.',
      starterCode: `function getActiveUsers(users) {
  return users.filter(u => u.isActive === true);
}

console.log(getActiveUsers([{name: "A", isActive: true}, {name: "B", isActive: false}]));`,
      testCases: [
        { input: '[{name:"A",isActive:true},{name:"B",isActive:false}]', expectedOutput: '[{"name":"A","isActive":true}]', hint: 'Use .filter()' }
      ]
    }
  },
  {
    id: 8,
    title: 'MS Office & Productivity',
    stage: 'FOUNDATION',
    domain: 'Software Engineering & Agile',
    icon: '📊',
    planetColor: 'from-blue-700 via-sky-600 to-slate-800',
    accentColor: '#60a5fa',
    summary: 'Spreadsheets (Excel formulas, VLOOKUP/XLOOKUP, Pivot Tables), Word document structuring, and executive presentation engineering.',
    modules: [
      { id: 'm8-1', title: 'Spreadsheet Analytics', concepts: ['Formulas: SUM, AVERAGE, IF, COUNTIF', 'VLOOKUP vs modern XLOOKUP', 'Pivot Tables and Data Modeling'] },
      { id: 'm8-2', title: 'Documentation & Communication', concepts: ['Style sheets and table of contents', 'Version control in docs', 'Executive slide deck design'] }
    ],
    quickNotes: `• **XLOOKUP**: Successor to VLOOKUP; searches in any direction, does not break when columns are rearranged, defaults to exact match.\n• **Pivot Tables**: Interactive tool to aggregate, slice, and summarize massive tabular datasets in seconds.\n• **Absolute Cell Reference ($A$1)**: Locking cell coordinate with dollar signs so formulas do not shift when copied across cells.`,
    deepDive: `### Financial and Operational Data Modeling in Spreadsheets\nMastering spreadsheets is a critical prerequisite for business analysts, managers, and software engineers.\n- **Nested IF vs IFS**: IFS evaluates multiple conditions cleanly without deep nesting.\n- **Data Validation**: Enforcing dropdown choices and input boundaries directly in cells prevents dirty data.\n- **Conditional Formatting**: Instantly highlighting outliers and trends dynamically.`,
    assessments: [
      {
        id: 'q8-1',
        type: 'mcq',
        difficulty: 'easy',
        question: 'What symbol is used in Excel to lock a cell coordinate into an absolute reference (e.g. $B$4)?',
        options: ['#', '$', '%', '&'],
        correctIndex: 1,
        whyWrong: '$ is the absolute reference operator in spreadsheet formulas.'
      }
    ],
    codingChallenge: {
      title: 'Spreadsheet Average and Max Calculator',
      language: 'javascript',
      description: 'Write a function `summarizeScores(scores)` returning an object with `{ count, average, max }`.',
      starterCode: `function summarizeScores(scores) {
  const count = scores.length;
  const max = Math.max(...scores);
  const average = scores.reduce((a, b) => a + b, 0) / count;
  return { count, average, max };
}`,
      testCases: [
        { input: '[80, 90, 100]', expectedOutput: '{"count":3,"average":90,"max":100}', hint: 'Average is sum / count' }
      ]
    }
  },
  {
    id: 9,
    title: 'Software Development Life Cycle (SDLC)',
    stage: 'FOUNDATION',
    domain: 'Software Engineering & Agile',
    icon: '⚙️',
    planetColor: 'from-amber-500 via-orange-600 to-stone-900',
    accentColor: '#f59e0b',
    summary: 'Waterfall, V-Model, Spiral, Requirements Engineering, Architectural Design, Testing tiers, and Maintenance.',
    modules: [
      { id: 'm9-1', title: 'SDLC Phases', concepts: ['Requirements Gathering -> Design -> Coding -> Testing -> Deployment -> Maintenance'] },
      { id: 'm9-2', title: 'Classic Process Models', concepts: ['Waterfall advantages & pitfalls', 'V-Model (Verification & Validation)', 'Iterative and Prototype models'] },
      { id: 'm9-3', title: 'Software Quality Assurance', concepts: ['Unit, Integration, System, Acceptance (UAT) testing', 'Black Box vs White Box testing', 'Code reviews'] }
    ],
    quickNotes: `• **Waterfall**: Linear sequential model; changes are very costly once a phase finishes.\n• **V-Model**: Verification (Specification) mapped directly against Validation (Testing).\n• **Unit Test**: Tests smallest testable unit of source code (function/method) in isolation.\n• **Regression Testing**: Re-running existing tests to verify that new code additions did not break existing behavior.`,
    deepDive: `### Cost of Defect Escalation\nA bug caught during Requirements costs 1x to fix. Caught during Architecture: 5x. During Coding: 10x. During Testing: 30x. In Production: up to 100x!\nThis economic principle drives the **Shift-Left** movement in modern software engineering.`,
    assessments: [
      {
        id: 'q9-1',
        type: 'mcq',
        difficulty: 'medium',
        question: 'Which testing phase validates that the overall system satisfies business requirements from the client/end-user perspective?',
        options: ['Unit Testing', 'Integration Testing', 'User Acceptance Testing (UAT)', 'Smoke Testing'],
        correctIndex: 2,
        whyWrong: 'UAT (User Acceptance Testing) is performed by real clients or domain stakeholders to verify fitness for business use.'
      }
    ],
    codingChallenge: {
      title: 'Bug Severity Categorizer',
      language: 'javascript',
      description: 'Write a function `categorizeBug(impact, frequency)` returning "P0" (high impact & high freq), "P1", or "P2".',
      starterCode: `function categorizeBug(impact, frequency) {
  if (impact === 'CRITICAL' || (impact === 'HIGH' && frequency === 'HIGH')) return 'P0';
  if (impact === 'HIGH' || frequency === 'HIGH') return 'P1';
  return 'P2';
}`,
      testCases: [
        { input: '"CRITICAL", "LOW"', expectedOutput: '"P0"', hint: 'Critical impact is P0' },
        { input: '"MEDIUM", "LOW"', expectedOutput: '"P2"', hint: 'Medium/Low is P2' }
      ]
    }
  },
  {
    id: 10,
    title: 'Project Life Cycle',
    stage: 'PRACTITIONER',
    domain: 'Software Engineering & Agile',
    icon: '🚀',
    planetColor: 'from-orange-500 via-amber-600 to-red-900',
    accentColor: '#f97316',
    summary: 'Initiation, Planning, Execution, Monitoring & Controlling, and Project Closure with Risk Management.',
    modules: [
      { id: 'm10-1', title: 'Project Initiation & Charter', concepts: ['Business Case and ROI', 'Stakeholder Analysis', 'Project Charter signoff'] },
      { id: 'm10-2', title: 'Work Breakdown Structure (WBS)', concepts: ['Work packages', 'Gantt charts and Critical Path Method (CPM)', 'Resource leveling'] },
      { id: 'm10-3', title: 'Risk Management & Scope Creep', concepts: ['Risk Matrix (Probability vs Impact)', 'Scope Creep mitigation', 'Post-Mortem & Retrospectives'] }
    ],
    quickNotes: `• **Triple Constraint**: Scope, Time, Cost (Quality sits at the center; changing one impacts the others).\n• **Critical Path**: The longest sequence of dependent tasks determining the shortest possible project completion time.\n• **Scope Creep**: Uncontrolled expansion of project deliverables without adjustment to budget, time, or resources.`,
    deepDive: `### Calculating the Critical Path\nTasks on the Critical Path have **Zero Slack (Float)**. Any delay on a critical path task delays the entire project launch date. Project managers prioritize resources on critical path items.`,
    assessments: [
      {
        id: 'q10-1',
        type: 'mcq',
        difficulty: 'medium',
        question: 'What is "slack time" or "float" in project scheduling?',
        options: [
          'The amount of time a task can be delayed without delaying the overall project completion',
          'The lunch break for the development team',
          'The total time spent on documentation',
          'The duration of server downtime during upgrades'
        ],
        correctIndex: 0,
        whyWrong: 'Float/Slack is the flexibility window a non-critical activity has before it impacts downstream milestones.'
      }
    ],
    codingChallenge: {
      title: 'Project Budget Burn Rate',
      language: 'javascript',
      description: 'Write `calculateBurnRate(totalBudget, weeksElapsed, amountSpent)` returning remaining budget and projected runway in weeks.',
      starterCode: `function calculateBurnRate(totalBudget, weeksElapsed, amountSpent) {
  const weeklyBurn = amountSpent / weeksElapsed;
  const remainingBudget = totalBudget - amountSpent;
  const runwayWeeks = Math.floor(remainingBudget / weeklyBurn);
  return { weeklyBurn, remainingBudget, runwayWeeks };
}`,
      testCases: [
        { input: '100000, 4, 20000', expectedOutput: '{"weeklyBurn":5000,"remainingBudget":80000,"runwayWeeks":16}', hint: '80000 / 5000 = 16' }
      ]
    }
  },
  {
    id: 11,
    title: 'Agile & Scrum',
    stage: 'PRACTITIONER',
    domain: 'Software Engineering & Agile',
    icon: '🔄',
    planetColor: 'from-amber-400 via-yellow-500 to-stone-800',
    accentColor: '#facc15',
    summary: 'Agile Manifesto, Scrum ceremonies (Sprint Planning, Daily Standup, Review, Retrospective), Kanban, User Stories, and Velocity.',
    modules: [
      { id: 'm11-1', title: 'Agile Philosophy & Manifesto', concepts: ['4 Core Values and 12 Principles', 'Iterative value delivery vs rigid plans'] },
      { id: 'm11-2', title: 'Scrum Roles & Ceremonies', concepts: ['Product Owner, Scrum Master, Developers', 'Sprint Planning, Daily Standup (15m)', 'Sprint Review & Retrospective'] },
      { id: 'm11-3', title: 'Scrum Artifacts & Kanban', concepts: ['Product Backlog vs Sprint Backlog', 'User Stories & Acceptance Criteria (Given-When-Then)', 'Kanban WIP (Work in Progress) limits'] }
    ],
    quickNotes: `• **Product Owner**: Maximizes product value; owns and prioritizes the Product Backlog.\n• **Scrum Master**: Servant leader; removes team impediments and coaches Scrum practices.\n• **User Story Format**: As a [role], I want [feature], so that [benefit].\n• **Velocity**: The number of story points completed by a team during a single sprint.`,
    deepDive: `### Fibonacci Story Point Estimation & Planning Poker\nTeams estimate user story complexity using Fibonacci sequence numbers (1, 2, 3, 5, 8, 13) rather than raw hours. Relative estimation accounts for cognitive uncertainty: humans are much better at estimating relative size than exact elapsed hours.`,
    assessments: [
      {
        id: 'q11-1',
        type: 'mcq',
        difficulty: 'easy',
        question: 'Who is solely responsible for prioritizing items in the Product Backlog in Scrum?',
        options: ['The Scrum Master', 'The Product Owner', 'The Lead Architect', 'The Project Sponsor'],
        correctIndex: 1,
        whyWrong: 'The Product Owner has exclusive accountability for maximizing product value and grooming/prioritizing the backlog.'
      }
    ],
    codingChallenge: {
      title: 'Sprint Velocity Forecaster',
      language: 'javascript',
      description: 'Write `forecastCapacity(pastVelocities)` returning the rolling 3-sprint average velocity rounded to nearest integer.',
      starterCode: `function forecastCapacity(pastVelocities) {
  const last3 = pastVelocities.slice(-3);
  const sum = last3.reduce((a, b) => a + b, 0);
  return Math.round(sum / last3.length);
}`,
      testCases: [
        { input: '[20, 24, 28]', expectedOutput: '24', hint: '(20+24+28)/3' },
        { input: '[15, 30, 25, 35]', expectedOutput: '30', hint: '(30+25+35)/3' }
      ]
    }
  },
  {
    id: 12,
    title: 'DevOps & CI/CD',
    stage: 'ADVANCED',
    domain: 'Software Engineering & Agile',
    icon: '♾️',
    planetColor: 'from-pink-600 via-rose-600 to-purple-900',
    accentColor: '#f43f5e',
    summary: 'Continuous Integration, Continuous Delivery/Deployment, Git workflows, automated pipelines, Docker containerization, and monitoring.',
    modules: [
      { id: 'm12-1', title: 'Git & Version Control', concepts: ['Branching strategies (GitFlow, Trunk-based development)', 'Merge vs Rebase', 'Resolving merge conflicts'] },
      { id: 'm12-2', title: 'CI/CD Automated Pipelines', concepts: ['Build, Test, Scan, Package automation', 'GitHub Actions / GitLab CI syntax', 'Artifact repositories'] },
      { id: 'm12-3', title: 'Deployment Strategies & Observability', concepts: ['Blue-Green vs Canary vs Rolling deployments', 'Logs, Metrics, Tracing (Prometheus, Grafana)', 'Infrastructure as Code (IaC)'] }
    ],
    quickNotes: `• **Trunk-Based Development**: Developers merge short-lived branches frequently into main/trunk, avoiding massive merge conflicts.\n• **Continuous Integration (CI)**: Automatically building and running tests on every code push.\n• **Continuous Deployment (CD)**: Automatically releasing every passing build directly to production without manual approval.\n• **Blue-Green Deployment**: Running two identical production environments; cut traffic instantly to Green when validated.`,
    deepDive: `### Observability: The Three Pillars\n1. **Metrics**: Aggregated numeric telemetry over time (e.g. CPU utilization, request throughput, error rates).\n2. **Logs**: Timestamped discrete event records providing localized diagnostic context.\n3. **Traces**: Distributed request paths following a single transaction across microservices via correlation IDs.`,
    assessments: [
      {
        id: 'q12-1',
        type: 'mcq',
        difficulty: 'medium',
        question: 'What is the key difference between Continuous Delivery and Continuous Deployment?',
        options: [
          'Continuous Delivery requires a manual approval step before releasing to production; Continuous Deployment deploys automatically',
          'Continuous Delivery only applies to mobile apps',
          'Continuous Deployment does not run unit tests',
          'Continuous Delivery uses Git while Continuous Deployment uses SVN'
        ],
        correctIndex: 0,
        whyWrong: 'In Continuous Delivery, code is always deployable, but release to production requires manual human trigger. In Continuous Deployment, releases occur automatically.'
      }
    ],
    codingChallenge: {
      title: 'CI/CD Pipeline Status Aggregator',
      language: 'javascript',
      description: 'Write `evaluatePipeline(stages)` taking an array of `{ name, status }` and returning "PASSED", "FAILED", or "RUNNING".',
      starterCode: `function evaluatePipeline(stages) {
  if (stages.some(s => s.status === 'FAILED')) return 'FAILED';
  if (stages.some(s => s.status === 'RUNNING' || s.status === 'PENDING')) return 'RUNNING';
  return 'PASSED';
}`,
      testCases: [
        { input: '[{name:"lint",status:"PASSED"},{name:"test",status:"PASSED"}]', expectedOutput: '"PASSED"', hint: 'All passed' },
        { input: '[{name:"lint",status:"PASSED"},{name:"test",status:"FAILED"}]', expectedOutput: '"FAILED"', hint: 'Any failure fails' }
      ]
    }
  },
  {
    id: 13,
    title: 'IT Industry & Roles',
    stage: 'INDUSTRY READY',
    domain: 'Infrastructure, Cloud & Security',
    icon: '🏢',
    planetColor: 'from-blue-600 via-indigo-600 to-slate-900',
    accentColor: '#6366f1',
    summary: 'The landscape of enterprise IT: Software Engineers, DevOps, SRE, Data Engineers, Cloud Architects, Cybersecurity Analysts, and Product Managers.',
    modules: [
      { id: 'm13-1', title: 'Tech Roles Demystified', concepts: ['Frontend, Backend, Full-stack developer', 'DevOps vs Site Reliability Engineering (SRE)', 'Data Analyst vs Data Scientist vs Data Engineer'] },
      { id: 'm13-2', title: 'Enterprise Org Structures', concepts: ['Cross-functional product squads', 'Service companies vs Product/FAANG companies', 'Engineering levels (L3 to L8)'] },
      { id: 'm13-3', title: 'Career Growth & Technical Leadership', concepts: ['Individual Contributor (IC) track vs Management track', 'Code ownership & RFCs', 'Continuous learning'] }
    ],
    quickNotes: `• **SRE (Site Reliability Engineer)**: Treats operations as a software problem; manages Service Level Objectives (SLOs) and Error Budgets.\n• **Data Engineer**: Constructs reliable data ingestion and transformation pipelines (ETL/ELT) for analytics.\n• **Product Manager**: Defines the 'what' and 'why'; engineering decides the 'how'.`,
    deepDive: `### FAANG Engineering Levels and Impact Scope\n- **Junior (L3)**: Executes tasks with well-defined requirements; needs guidance on architecture.\n- **Mid-Level (L4)**: Owns complete features end-to-end; manages ambiguity.\n- **Senior (L5)**: Architects complex systems, mentors engineers, drives team technical direction.\n- **Staff (L6+)**: Solves multi-team organizational and architectural bottlenecks with company-wide impact.`,
    assessments: [
      {
        id: 'q13-1',
        type: 'mcq',
        difficulty: 'easy',
        question: 'Which role is primarily responsible for maximizing system uptime, automating operations, and managing Error Budgets?',
        options: ['Site Reliability Engineer (SRE)', 'Scrum Master', 'Graphic Designer', 'Technical Recruiter'],
        correctIndex: 0,
        whyWrong: 'SREs focus on infrastructure reliability, latency, performance, monitoring, and automated incident response.'
      }
    ],
    codingChallenge: {
      title: 'SRE Error Budget Calculator',
      language: 'javascript',
      description: 'Write `calculateAllowedDowntime(sloPercentage, periodDays)` returning allowed downtime in minutes.',
      starterCode: `function calculateAllowedDowntime(sloPercentage, periodDays) {
  const totalMinutes = periodDays * 24 * 60;
  const allowedDowntimeFraction = (100 - sloPercentage) / 100;
  return Number((totalMinutes * allowedDowntimeFraction).toFixed(2));
}`,
      testCases: [
        { input: '99.9, 30', expectedOutput: '43.2', hint: '43.2 minutes per month' }
      ]
    }
  },
  {
    id: 14,
    title: 'IT Infrastructure & Services',
    stage: 'ADVANCED',
    domain: 'Infrastructure, Cloud & Security',
    icon: '🏛️',
    planetColor: 'from-slate-700 via-gray-600 to-zinc-900',
    accentColor: '#94a3b8',
    summary: 'On-premise datacenters, enterprise storage (SAN/NAS), rack servers, UPS power redundancy, and Active Directory.',
    modules: [
      { id: 'm14-1', title: 'Data Center Architecture', concepts: ['Tier 1 to Tier 4 datacenters', 'HVAC cooling & power redundancy (N+1, 2N)', 'Blade vs Rack servers'] },
      { id: 'm14-2', title: 'Enterprise Storage Systems', concepts: ['Direct Attached Storage (DAS)', 'Network Attached Storage (NAS) vs Storage Area Network (SAN)', 'RAID levels (RAID 0, 1, 5, 6, 10)'] },
      { id: 'm14-3', title: 'Identity & Directory Services', concepts: ['LDAP, Microsoft Active Directory', 'Kerberos authentication', 'Domain Controllers and Group Policies'] }
    ],
    quickNotes: `• **RAID 0**: Striping for speed (no fault tolerance; 1 drive failure loses all data).\n• **RAID 1**: Mirroring (100% redundancy, 50% capacity efficiency).\n• **RAID 5**: Block-level striping with distributed parity (survives 1 drive failure).\n• **Active Directory**: Centralized management of users, computers, and security policies on Windows networks.`,
    deepDive: `### RAID 10 (1+0) in Production Databases\nHigh-performance transactional databases (e.g. Oracle, PostgreSQL) strongly prefer RAID 10 over RAID 5 because RAID 5 incurs a 'parity write penalty' (reading old data and parity before writing new parity), whereas RAID 10 provides maximum write throughput and redundant mirroring.`,
    assessments: [
      {
        id: 'q14-1',
        type: 'mcq',
        difficulty: 'medium',
        question: 'Which RAID configuration provides block striping with distributed parity, requiring at least 3 drives and tolerating 1 drive failure?',
        options: ['RAID 0', 'RAID 1', 'RAID 5', 'RAID 10'],
        correctIndex: 2,
        whyWrong: 'RAID 5 requires a minimum of 3 drives and writes distributed parity across all disks, allowing the array to recover from a single drive failure.'
      }
    ],
    codingChallenge: {
      title: 'RAID 5 Usable Capacity Calculator',
      language: 'javascript',
      description: 'Write `raid5Capacity(numDrives, driveSizeGB)` calculating usable storage capacity in GB.',
      starterCode: `function raid5Capacity(numDrives, driveSizeGB) {
  if (numDrives < 3) return 0;
  return (numDrives - 1) * driveSizeGB;
}`,
      testCases: [
        { input: '4, 1000', expectedOutput: '3000', hint: '(4-1)*1000' }
      ]
    }
  },
  {
    id: 15,
    title: 'Computer Networking',
    stage: 'ADVANCED',
    domain: 'Infrastructure, Cloud & Security',
    icon: '🌐',
    planetColor: 'from-blue-600 via-sky-600 to-indigo-900',
    accentColor: '#38bdf8',
    summary: 'OSI 7 Layers, TCP/IP stack, IP addressing & CIDR subnetting, DNS resolution, DHCP leases, Routing & Switching.',
    modules: [
      { id: 'm15-1', title: 'OSI Model & TCP/IP', concepts: ['7 Layers: Physical, Data Link, Network, Transport, Session, Presentation, Application', 'Encapsulation & Decapsulation', 'TCP 3-way handshake vs UDP'] },
      { id: 'm15-2', title: 'IP Addressing & Subnetting', concepts: ['IPv4 vs IPv6', 'Subnet masks and CIDR notation (/24, /16)', 'Public vs Private IP ranges (RFC 1918)'] },
      { id: 'm15-3', title: 'Protocols & Routing', concepts: ['DNS, DHCP, ARP, ICMP', 'Routing algorithms (OSPF, BGP)', 'VLANs and Switch Spanning Tree Protocol (STP)'] }
    ],
    quickNotes: `• **OSI Layers Mnemonic**: **P**lease **D**o **N**ot **T**hrow **S**ausage **P**izza **A**way (Physical to Application).\n• **TCP vs UDP**: TCP is connection-oriented, reliable, and ordered (SYN -> SYN-ACK -> ACK); UDP is connectionless, fast, best-effort (video streaming, gaming).\n• **Private IP Ranges (RFC 1918)**: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.\n• **DNS**: Resolves domain names (google.com) to IP addresses (142.250.x.x).`,
    deepDive: `### The Life of an HTTP Packet\nWhen you type 'https://example.com' into your browser:\n1. Browser checks cache, then queries DNS server for IP address.\n2. Client initiates TCP 3-way handshake with target IP on port 443.\n3. TLS handshake completes (certificate verification and session key exchange).\n4. Browser sends HTTP GET request inside encrypted TLS payload.\n5. Web server responds with HTTP 200 and HTML payload.`,
    assessments: [
      {
        id: 'q15-1',
        type: 'mcq',
        difficulty: 'medium',
        question: 'Which layer of the OSI model does a Router operate on?',
        options: ['Layer 1 (Physical)', 'Layer 2 (Data Link)', 'Layer 3 (Network)', 'Layer 4 (Transport)'],
        correctIndex: 2,
        whyWrong: 'Routers inspect Layer 3 IP packet headers to make forwarding decisions across network boundaries.'
      }
    ],
    codingChallenge: {
      title: 'IPv4 Subnet Host Capacity Calculator',
      language: 'javascript',
      description: 'Write `usableHosts(cidr)` returning the number of usable host IP addresses for an IPv4 CIDR prefix (subtracting network and broadcast addresses).',
      starterCode: `function usableHosts(cidr) {
  if (cidr >= 31) return 0;
  const hostBits = 32 - cidr;
  return Math.pow(2, hostBits) - 2;
}`,
      testCases: [
        { input: '24', expectedOutput: '254', hint: '2^8 - 2' },
        { input: '28', expectedOutput: '14', hint: '2^4 - 2' }
      ]
    }
  },
  {
    id: 16,
    title: 'Virtualization',
    stage: 'ADVANCED',
    domain: 'Infrastructure, Cloud & Security',
    icon: '💻',
    planetColor: 'from-indigo-600 via-purple-600 to-slate-900',
    accentColor: '#a855f7',
    summary: 'Hypervisors (Type 1 Bare-Metal vs Type 2 Hosted), Virtual Machines, Docker Containers, and microservices.',
    modules: [
      { id: 'm16-1', title: 'Hypervisors & VMs', concepts: ['Type 1 (ESXi, KVM) vs Type 2 (VirtualBox, VMware Workstation)', 'Hardware assisted virtualization (VT-x/AMD-V)', 'Snapshotting and VM migration'] },
      { id: 'm16-2', title: 'Containerization vs Virtualization', concepts: ['Linux Namespaces & cgroups', 'Docker architecture (Engine, Daemon, Images, Containers)', 'VM vs Container resource footprint'] }
    ],
    quickNotes: `• **Type 1 Hypervisor**: Runs directly on physical hardware (ESXi, Hyper-V, KVM) — enterprise standard.\n• **Type 2 Hypervisor**: Runs as an application inside an existing host OS (VirtualBox).\n• **Containers vs VMs**: VMs virtualize the entire hardware including a full guest OS; Containers virtualize the OS kernel, sharing the host kernel for instant boot (< 1 sec) and low memory overhead.`,
    deepDive: `### Linux Kernel Underpinnings of Docker\nDocker is not magic; it leverages two fundamental Linux kernel features:\n1. **Namespaces**: Provide process isolation (pid, net, ipc, mnt, uts, user).\n2. **Control Groups (cgroups)**: Enforce resource limits (CPU quotas, memory caps, I/O bandwidth).`,
    assessments: [
      {
        id: 'q16-1',
        type: 'mcq',
        difficulty: 'medium',
        question: 'Why do Docker containers start in seconds while Virtual Machines take minutes?',
        options: [
          'Containers share the host OS kernel and do not boot a full guest operating system',
          'Containers do not use memory',
          'Containers run on quantum processors',
          'Containers are written exclusively in C'
        ],
        correctIndex: 0,
        whyWrong: 'Because containers share the already-booted host OS kernel and isolate via namespaces, they start instantaneously like native processes.'
      }
    ],
    codingChallenge: {
      title: 'Container Density Calculator',
      language: 'javascript',
      description: 'Write `maxContainers(hostMemoryMB, containerMemoryMB, osReservedMB)` calculating how many containers can safely run.',
      starterCode: `function maxContainers(hostMemoryMB, containerMemoryMB, osReservedMB) {
  const available = hostMemoryMB - osReservedMB;
  return Math.floor(available / containerMemoryMB);
}`,
      testCases: [
        { input: '16384, 512, 2048', expectedOutput: '28', hint: '(16384 - 2048) / 512' }
      ]
    }
  },
  {
    id: 17,
    title: 'Cloud Computing',
    stage: 'INDUSTRY READY',
    domain: 'Infrastructure, Cloud & Security',
    icon: '☁️',
    planetColor: 'from-sky-500 via-blue-600 to-indigo-900',
    accentColor: '#38bdf8',
    summary: 'Cloud paradigms (IaaS, PaaS, SaaS), public/private/hybrid cloud, AWS/GCP/Azure architecture, serverless, and cloud security.',
    modules: [
      { id: 'm17-1', title: 'Cloud Service Models', concepts: ['IaaS (EC2, Compute Engine)', 'PaaS (App Engine, Elastic Beanstalk)', 'SaaS (Google Workspace, Salesforce)', 'Shared Responsibility Model'] },
      { id: 'm17-2', title: 'Core Cloud Building Blocks', concepts: ['Compute, Object Storage (S3), Managed Databases (RDS)', 'Virtual Private Cloud (VPC) & Subnets', 'Auto-scaling and Load Balancing'] },
      { id: 'm17-3', title: 'Serverless & Cloud Economics', concepts: ['FaaS (AWS Lambda, Cloud Functions)', 'CAPEX vs OPEX', 'FinOps and cost monitoring'] }
    ],
    quickNotes: `• **Shared Responsibility Model**: Cloud provider secures the cloud (hardware, datacenters, host virtualization); Customer secures what is IN the cloud (IAM, data, network traffic, OS patching for IaaS).\n• **Object Storage (S3)**: Flat storage storing data as objects with metadata; virtually unlimited scalability, 99.999999999% (11 9s) durability.\n• **Serverless**: Pay only for execution time down to milliseconds; zero servers to provision or manage.`,
    deepDive: `### Designing Multi-AZ High Availability\nIn enterprise cloud engineering, single datacenter failures must never cause downtime. Systems are architected across multiple **Availability Zones (AZs)**, physically separated datacenters connected with low-latency private fiber. If AZ-1 suffers a flood or power grid loss, health checks redirect traffic to AZ-2 instantly.`,
    assessments: [
      {
        id: 'q17-1',
        type: 'mcq',
        difficulty: 'easy',
        question: 'Under the Cloud Shared Responsibility Model for IaaS, who is responsible for patching the guest operating system?',
        options: ['The Customer', 'The Cloud Provider', 'The Hardware Manufacturer', 'The ISP'],
        correctIndex: 0,
        whyWrong: 'In IaaS (like AWS EC2), the customer manages the guest OS, including security patches and application configuration.'
      }
    ],
    codingChallenge: {
      title: 'Cloud Storage Cost Estimator',
      language: 'javascript',
      description: 'Write `estimateS3Cost(storageGB, perGBCost, getRequests, per10kReqCost)` calculating monthly bill.',
      starterCode: `function estimateS3Cost(storageGB, perGBCost, getRequests, per10kReqCost) {
  const storageCost = storageGB * perGBCost;
  const requestCost = (getRequests / 10000) * per10kReqCost;
  return Number((storageCost + requestCost).toFixed(2));
}`,
      testCases: [
        { input: '500, 0.023, 200000, 0.004', expectedOutput: '11.58', hint: '11.50 + 0.08' }
      ]
    }
  },
  {
    id: 18,
    title: 'Information Security',
    stage: 'INDUSTRY READY',
    domain: 'Infrastructure, Cloud & Security',
    icon: '🔐',
    planetColor: 'from-red-600 via-rose-600 to-stone-900',
    accentColor: '#f43f5e',
    summary: 'CIA Triad, symmetric vs asymmetric encryption, hashing, authentication (MFA, OAuth2), OWASP Top 10 vulnerabilities, and zero trust.',
    modules: [
      { id: 'm18-1', title: 'Security Principles & CIA Triad', concepts: ['Confidentiality, Integrity, Availability', 'Principle of Least Privilege', 'Defense in Depth and Zero Trust'] },
      { id: 'm18-2', title: 'Cryptography Fundamentals', concepts: ['Symmetric (AES) vs Asymmetric (RSA, ECC)', 'Hashing algorithms (SHA-256, bcrypt)', 'Digital Signatures and SSL/TLS certificates'] },
      { id: 'm18-3', title: 'Web App Security & OWASP Top 10', concepts: ['SQL Injection (SQLi) & Cross-Site Scripting (XSS)', 'Broken Authentication & CSRF', 'Security headers (CSP, HSTS)'] }
    ],
    quickNotes: `• **CIA Triad**: Confidentiality (only authorized eyes), Integrity (unaltered data), Availability (accessible when needed).\n• **Hashing vs Encryption**: Encryption is two-way (can be decrypted with a key); Hashing is one-way (irreversible; used for passwords and checksums).\n• **Salting**: Adding random bytes before hashing passwords to defeat rainbow table attacks.\n• **Zero Trust**: "Never trust, always verify" — every request is authenticated, authorized, and encrypted regardless of origin.`,
    deepDive: `### How Modern HTTPS / TLS 1.3 Works\n1. **Client Hello**: Sends supported cipher suites and key share.\n2. **Server Hello**: Selects cipher suite, sends digital certificate and server key share.\n3. **ECDHE Key Exchange**: Both sides independently compute a shared symmetric session key without transmitting it over the wire.\n4. **Encrypted Communication**: All subsequent HTTP data is encrypted with blazing-fast AES-GCM symmetric encryption.`,
    assessments: [
      {
        id: 'q18-1',
        type: 'mcq',
        difficulty: 'medium',
        question: 'Which of the following describes why passwords should be HASHED with a salt rather than encrypted?',
        options: [
          'Hashing is irreversible, so even if the database is leaked, raw passwords cannot be decrypted',
          'Hashing uses less disk space',
          'Encrypted passwords expire every 30 days',
          'Hashes run faster on the GPU'
        ],
        correctIndex: 0,
        whyWrong: 'Hashes are one-way mathematical functions. Even an attacker with full database access cannot reverse secure salted hashes (e.g. bcrypt/argon2) to obtain cleartext passwords.'
      }
    ],
    codingChallenge: {
      title: 'Simple String Hash Generator',
      language: 'javascript',
      description: 'Write `simpleHash(str)` returning a 32-bit integer checksum.',
      starterCode: `function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}`,
      testCases: [
        { input: '"admin"', expectedOutput: '92668751', hint: 'Standard DJB2 variant' }
      ]
    }
  },
  {
    id: 19,
    title: 'Industry 5.0',
    stage: 'ADVANCED',
    domain: 'AI & Frontier Technologies',
    icon: '🏭',
    planetColor: 'from-amber-600 via-orange-600 to-indigo-900',
    accentColor: '#f59e0b',
    summary: 'Human-machine collaboration, resilient value chains, sustainable manufacturing, smart cobots, and circular economy in tech.',
    modules: [
      { id: 'm19-1', title: 'From Industry 4.0 to 5.0', concepts: ['Human-centric engineering', 'Collaborative robots (Cobots)', 'Sustainability and net-zero technology'] },
      { id: 'm19-2', title: 'Cyber-Physical Systems & Digital Twins', concepts: ['Real-time 3D simulation of physical plants', 'Predictive maintenance with IoT', 'Resilient supply chain telemetry'] }
    ],
    quickNotes: `• **Industry 4.0 vs 5.0**: Industry 4.0 prioritized hyper-automation; Industry 5.0 places humans back at the center, emphasizing collaboration between human creativity and intelligent machines.\n• **Cobots**: Robots designed with sensors to work safely alongside human colleagues.\n• **Digital Twin**: A real-time virtual simulation of a physical asset, bridge, or factory receiving live telemetry.`,
    deepDive: `### Digital Twins and Predictive Maintenance\nBy streaming vibration, temperature, and acoustic metrics from factory equipment into a physics-calibrated AI model (Digital Twin), engineers predict component failure weeks before catastrophic breakdown, eliminating downtime.`,
    assessments: [
      {
        id: 'q19-1',
        type: 'mcq',
        difficulty: 'easy',
        question: 'What is the core distinction of Industry 5.0 compared to Industry 4.0?',
        options: [
          'Industry 5.0 emphasizes human-centric collaboration, sustainability, and resilience alongside automation',
          'Industry 5.0 bans all computers',
          'Industry 5.0 only uses fossil fuels',
          'Industry 5.0 replaces all human workers completely'
        ],
        correctIndex: 0,
        whyWrong: 'Industry 5.0 integrates human creativity and social values into the automated systems developed in Industry 4.0.'
      }
    ],
    codingChallenge: {
      title: 'Sensor Outlier Detector',
      language: 'javascript',
      description: 'Write `detectAnomalies(readings, threshold)` returning an array of indices where readings exceeded threshold.',
      starterCode: `function detectAnomalies(readings, threshold) {
  const anomalies = [];
  readings.forEach((val, idx) => {
    if (val > threshold) anomalies.push(idx);
  });
  return anomalies;
}`,
      testCases: [
        { input: '[22, 23, 85, 24, 91], 80', expectedOutput: '[2,4]', hint: 'Values 85 and 91 are outliers' }
      ]
    }
  },
  {
    id: 20,
    title: 'Artificial Intelligence & Machine Learning',
    stage: 'EXPERT',
    domain: 'AI & Frontier Technologies',
    icon: '🤖',
    planetColor: 'from-purple-600 via-indigo-600 to-blue-900',
    accentColor: '#a855f7',
    summary: 'Supervised vs unsupervised learning, neural networks, gradient descent, feature engineering, and model evaluation metrics.',
    modules: [
      { id: 'm20-1', title: 'ML Paradigms', concepts: ['Supervised (Classification, Regression)', 'Unsupervised (Clustering, PCA)', 'Reinforcement Learning (Reward optimization)'] },
      { id: 'm20-2', title: 'Neural Networks & Deep Learning', concepts: ['Perceptrons and activation functions (ReLU, Sigmoid)', 'Backpropagation & Gradient Descent', 'Overfitting, Underfitting, and Regularization'] },
      { id: 'm20-3', title: 'Model Evaluation Metrics', concepts: ['Confusion Matrix: Precision, Recall, F1-Score', 'ROC-AUC curve', 'Train-Validation-Test splits'] }
    ],
    quickNotes: `• **Overfitting**: Model memorizes training noise and fails on unseen test data (high variance; fix with dropout, regularization, more data).\n• **Underfitting**: Model is too simple to capture patterns (high bias).\n• **Precision vs Recall**: Precision = TP / (TP + FP) (How many selected were relevant?); Recall = TP / (TP + FN) (How many relevant were selected?).\n• **Gradient Descent**: Iteratively tuning weights in the opposite direction of the loss function gradient to minimize error.`,
    deepDive: `### Backpropagation Demystified\nBackpropagation computes the partial derivative (gradient) of the loss function with respect to every weight in the neural network using the Calculus Chain Rule. The optimizer (e.g. Adam) then updates weights: ' + "'W_new = W_old - lr * dLoss/dW'" + '.`,
    assessments: [
      {
        id: 'q20-1',
        type: 'mcq',
        difficulty: 'medium',
        question: 'In medical cancer diagnosis, which metric is most vital to maximize to ensure diseased patients are never missed?',
        options: ['Recall (Sensitivity)', 'Precision', 'Accuracy on imbalanced data', 'Training Speed'],
        correctIndex: 0,
        whyWrong: 'Recall minimizes False Negatives (FN). In medicine, a False Negative means an ill patient is falsely told they are healthy, which can be fatal.'
      }
    ],
    codingChallenge: {
      title: 'Calculate F1 Score',
      language: 'javascript',
      description: 'Write `calculateF1(precision, recall)` returning the harmonic mean rounded to 2 decimal places.',
      starterCode: `function calculateF1(precision, recall) {
  if (precision + recall === 0) return 0;
  const f1 = 2 * (precision * recall) / (precision + recall);
  return Number(f1.toFixed(2));
}`,
      testCases: [
        { input: '0.8, 0.6', expectedOutput: '0.69', hint: '2*(0.8*0.6)/(1.4)' }
      ]
    }
  },
  {
    id: 21,
    title: 'Generative AI & ChatGPT',
    stage: 'EXPERT',
    domain: 'AI & Frontier Technologies',
    icon: '✨',
    planetColor: 'from-fuchsia-600 via-pink-600 to-indigo-900',
    accentColor: '#ec4899',
    summary: 'Transformer architecture, Self-Attention mechanism, Large Language Models (LLMs), Prompt Engineering, and RAG.',
    modules: [
      { id: 'm21-1', title: 'The Transformer Architecture', concepts: ['Attention is All You Need (2017)', 'Multi-Head Self-Attention', 'Tokens, Positional Encodings, and Context Windows'] },
      { id: 'm21-2', title: 'Prompt Engineering & In-Context Learning', concepts: ['Zero-shot, Few-shot, Chain-of-Thought (CoT)', 'System instructions & Temperature tuning', 'Hallucinations and safety guardrails'] },
      { id: 'm21-3', title: 'Retrieval-Augmented Generation (RAG) & Agents', concepts: ['Vector Embeddings & Cosine Similarity', 'Vector Databases (Pinecone, Chroma)', 'AI Agents with tool calling'] }
    ],
    quickNotes: `• **Self-Attention**: Computes dynamic relationship weights between every token and every other token in a sentence regardless of distance.\n• **Temperature**: Controls randomness (0 = deterministic & factual; 1 = creative & diverse).\n• **RAG**: Retrieves factual enterprise documents from a vector database and injects them into the prompt, preventing hallucinations.\n• **Token**: Sub-word chunk (average 1 token ≈ 4 characters or 0.75 words in English).`,
    deepDive: `### Vector Embeddings and Semantic Search\nText is projected into high-dimensional geometric vectors (e.g. 1536 dimensions). Sentences with similar meanings ("King" and "Monarch") end up clustered closely in vector space. Dot product or Cosine Similarity calculates semantic relevance.`,
    assessments: [
      {
        id: 'q21-1',
        type: 'mcq',
        difficulty: 'medium',
        question: 'What technique retrieves external private documents and injects them into the prompt to provide grounded, factual LLM responses?',
        options: ['Retrieval-Augmented Generation (RAG)', 'Recurrent Neural Network (RNN)', 'Overfitting', 'Model Quantization'],
        correctIndex: 0,
        whyWrong: 'RAG bridges proprietary data with LLMs by searching a vector store and augmenting the user prompt with exact source excerpts.'
      }
    ],
    codingChallenge: {
      title: 'Cosine Similarity Calculator',
      language: 'javascript',
      description: 'Write `cosineSimilarity(vecA, vecB)` computing dotProduct / (magnitudeA * magnitudeB).',
      starterCode: `function cosineSimilarity(vecA, vecB) {
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    magA += vecA[i] * vecA[i];
    magB += vecB[i] * vecB[i];
  }
  return Number((dot / (Math.sqrt(magA) * Math.sqrt(magB))).toFixed(2));
}`,
      testCases: [
        { input: '[1, 2], [2, 4]', expectedOutput: '1', hint: 'Identical directional vectors = 1.0' }
      ]
    }
  },
  {
    id: 22,
    title: 'Blockchain & Web3',
    stage: 'EXPERT',
    domain: 'AI & Frontier Technologies',
    icon: '⛓️',
    planetColor: 'from-amber-600 via-yellow-600 to-zinc-900',
    accentColor: '#f59e0b',
    summary: 'Distributed ledgers, cryptographic block hashing, consensus mechanisms (PoW vs PoS), smart contracts, and decentralized apps.',
    modules: [
      { id: 'm22-1', title: 'Blockchain Fundamentals', concepts: ['Immutable ledger', 'Cryptographic hashing (SHA-256)', 'Genesis block and block headers'] },
      { id: 'm22-2', title: 'Consensus Mechanisms', concepts: ['Proof of Work (PoW) & Difficulty target', 'Proof of Stake (PoS) & Validators', 'Byzantine Fault Tolerance (BFT)'] },
      { id: 'm22-3', title: 'Smart Contracts & Wallets', concepts: ['Ethereum Virtual Machine (EVM)', 'Solidity smart contract lifecycle', 'Public/Private key pairs and seed phrases'] }
    ],
    quickNotes: `• **Immutability**: Changing data in block N invalidates the hashes of all subsequent blocks N+1, N+2... across the entire peer-to-peer network.\n• **Proof of Work (PoW)**: Miners race to find a cryptographic nonce producing a hash with leading zeroes.\n• **Proof of Stake (PoS)**: Validators stake tokens as collateral to propose and validate blocks; uses 99.9% less energy than PoW.\n• **Smart Contract**: Self-executing code stored on the blockchain that runs automatically when predetermined conditions are met.`,
    deepDive: `### The Double-Spending Problem Solved\nBefore Bitcoin (Satoshi Nakamoto, 2008), digital cash could be duplicated like copying a file. Distributed consensus and timestamped chains ensure that once an unspent transaction output (UTXO) is spent, the entire global network rejects any subsequent attempt to spend it again.`,
    assessments: [
      {
        id: 'q22-1',
        type: 'mcq',
        difficulty: 'medium',
        question: 'Why does altering a transaction in an earlier block invalidate the rest of the blockchain?',
        options: [
          'Because each block contains the cryptographic hash of the preceding block',
          'Because the electricity will shut down',
          'Because the miners will get banned',
          'Because smart contracts are written in Python'
        ],
        correctIndex: 0,
        whyWrong: 'Every block includes the hash of the preceding block. Changing any character in an earlier block alters its hash, breaking the cryptographic chain link for every downstream block.'
      }
    ],
    codingChallenge: {
      title: 'Validate Blockchain Link',
      language: 'javascript',
      description: 'Write `isBlockValid(currentBlock, previousBlock)` checking if `currentBlock.prevHash === previousBlock.hash`.',
      starterCode: `function isBlockValid(currentBlock, previousBlock) {
  return currentBlock.prevHash === previousBlock.hash;
}`,
      testCases: [
        { input: '{prevHash:"00ab12"}, {hash:"00ab12"}', expectedOutput: 'true', hint: 'Hashes match' },
        { input: '{prevHash:"00ab12"}, {hash:"0099ff"}', expectedOutput: 'false', hint: 'Tampered chain' }
      ]
    }
  },
  {
    id: 23,
    title: 'Internet of Things (IoT)',
    stage: 'EXPERT',
    domain: 'AI & Frontier Technologies',
    icon: '📡',
    planetColor: 'from-emerald-600 via-teal-600 to-sky-900',
    accentColor: '#10b981',
    summary: 'Embedded microcontrollers (ESP32, Arduino, Raspberry Pi), sensor telemetry, MQTT protocol, and edge computing.',
    modules: [
      { id: 'm23-1', title: 'IoT Hardware & Sensors', concepts: ['Analog vs Digital GPIO', 'Microcontrollers (ESP32) vs Single Board Computers (Raspberry Pi)', 'I2C, SPI, and UART communication protocols'] },
      { id: 'm23-2', title: 'IoT Protocols & Telemetry', concepts: ['MQTT (Broker, Publish, Subscribe, Topics)', 'CoAP and HTTP in constrained devices', 'Edge filtering vs Cloud analytics'] }
    ],
    quickNotes: `• **MQTT**: Extremely lightweight publish/subscribe protocol with tiny packet headers (2 bytes), ideal for battery-powered sensor networks.\n• **QoS Levels**: QoS 0 (At most once), QoS 1 (At least once), QoS 2 (Exactly once).\n• **Edge Computing**: Processing data locally on the gateway/device rather than sending raw high-frequency data to the cloud.`,
    deepDive: `### MQTT Pub/Sub Architecture\nInstead of direct client-to-client connections, IoT devices publish messages to a central **MQTT Broker** under hierarchical topics (e.g. ' + "'factory/floor2/boiler3/temp'" + '). Subscribed devices receive updates instantly via persistent, low-overhead TCP sockets.`,
    assessments: [
      {
        id: 'q23-1',
        type: 'mcq',
        difficulty: 'easy',
        question: 'Which network protocol is specifically designed for constrained IoT devices with minimal bandwidth and battery?',
        options: ['MQTT', 'FTP', 'BGP', 'SNMP'],
        correctIndex: 0,
        whyWrong: 'MQTT is designed specifically for low-bandwidth, high-latency, or unreliable networks with minimal 2-byte header overhead.'
      }
    ],
    codingChallenge: {
      title: 'MQTT Topic Filter Matcher',
      language: 'javascript',
      description: 'Write `matchTopic(pattern, topic)` checking if a topic matches a wildcard `#` or exact string.',
      starterCode: `function matchTopic(pattern, topic) {
  if (pattern.endsWith('/#')) {
    const prefix = pattern.slice(0, -2);
    return topic.startsWith(prefix);
  }
  return pattern === topic;
}`,
      testCases: [
        { input: '"home/living/#", "home/living/lights/1"', expectedOutput: 'true', hint: 'Wildcard # matches everything below' },
        { input: '"home/living/#", "office/desk"', expectedOutput: 'false', hint: 'Different prefix' }
      ]
    }
  },
  {
    id: 24,
    title: 'AR / VR / MR + Drones',
    stage: 'EXPERT',
    domain: 'AI & Frontier Technologies',
    icon: '🥽',
    planetColor: 'from-cyan-600 via-sky-600 to-indigo-900',
    accentColor: '#06b6d4',
    summary: 'Spatial computing, 6 DoF tracking, Mixed Reality passthrough, WebXR, autonomous drone telemetry, and computer vision.',
    modules: [
      { id: 'm24-1', title: 'Spatial Computing Spectrum', concepts: ['Virtual Reality (VR) vs Augmented Reality (AR) vs Mixed Reality (MR)', '6 Degrees of Freedom (6 DoF: Pitch, Yaw, Roll, X, Y, Z)', 'SLAM (Simultaneous Localization and Mapping)'] },
      { id: 'm24-2', title: 'Autonomous Drones & Robotics', concepts: ['Flight controllers and IMU sensors (accelerometer, gyroscope, barometer)', 'PID controllers and GPS waypoint navigation', 'Computer vision for obstacle avoidance'] }
    ],
    quickNotes: `• **6 DoF**: Tracking orientation (3 axes) AND translational physical movement in space (3 axes).\n• **SLAM**: Algorithm building a map of an unknown environment while simultaneously tracking location within it.\n• **PID Controller**: Proportional-Integral-Derivative feedback loop maintaining drone stability in wind gusts.`,
    deepDive: `### SLAM (Simultaneous Localization and Mapping)\nUsing camera optical flow (Visual Inertial Odometry) combined with high-frequency IMU sensors, spatial headsets map environmental feature points in real time, projecting virtual hologram models that remain anchored rigidly to physical tables and walls.`,
    assessments: [
      {
        id: 'q24-1',
        type: 'mcq',
        difficulty: 'medium',
        question: 'What tracking capability allows a VR headset to track both your head rotation AND walking forward/backward in the room?',
        options: ['3 DoF', '6 DoF', 'Monoscopic tracking', 'Ray tracing'],
        correctIndex: 1,
        whyWrong: '6 DoF (Six Degrees of Freedom) tracks both 3 rotational axes (roll, pitch, yaw) and 3 positional axes (X, Y, Z).'
      }
    ],
    codingChallenge: {
      title: 'Drone Altitude PID Error Calculator',
      language: 'javascript',
      description: 'Write `pidError(targetAltitude, currentAltitude)` returning the altitude error delta.',
      starterCode: `function pidError(targetAltitude, currentAltitude) {
  return Number((targetAltitude - currentAltitude).toFixed(2));
}`,
      testCases: [
        { input: '100.0, 94.5', expectedOutput: '5.5', hint: 'Target - Current' }
      ]
    }
  },
  {
    id: 25,
    title: '3D Printing & Emerging Tech',
    stage: 'EXPERT',
    domain: 'AI & Frontier Technologies',
    icon: '🌌',
    planetColor: 'from-amber-400 via-yellow-500 to-purple-600',
    accentColor: '#fbbf24',
    summary: 'Additive manufacturing, slicing engines, CAD design, Quantum Computing, Neuromorphic chips, and the Grand Multiverse Master Capstone.',
    modules: [
      { id: 'm25-1', title: '3D Printing & Additive Manufacturing', concepts: ['FDM, SLA, and SLS technologies', 'G-code generation and Slicing software', 'Infill density, support structures, and CAD modeling'] },
      { id: 'm25-2', title: 'Frontier Horizons', concepts: ['Quantum Computing (Qubits, Superposition, Entanglement)', 'Neuromorphic chips & Brain-Computer Interfaces (BCI)', 'Synthetic biology and nanotech'] },
      { id: 'm25-3', title: 'The Multiverse Master Capstone', concepts: ['Synthesizing 25 levels into end-to-end architecture', 'FAANG leadership mindset', 'Lifelong engineering mastery'] }
    ],
    quickNotes: `• **G-Code**: Numerical machine language instructing 3D printers and CNC machines where to move the nozzle in X, Y, Z coordinates.\n• **FDM vs SLA**: FDM melts thermoplastic filament; SLA cures liquid photopolymer resin with precision ultraviolet lasers for ultra-high detail.\n• **Qubit**: Quantum bit existing in a superposition of both 0 and 1 simultaneously until measured.`,
    deepDive: `### The Grand Horizon: Quantum Computing & Superposition\nClassical computers with N bits can be in 1 of 2^N states at any instant. A quantum computer with N qubits can exist in a superposition of ALL 2^N states simultaneously, revolutionizing cryptography, molecular simulation, and complex combinatorial optimization.`,
    assessments: [
      {
        id: 'q25-1',
        type: 'mcq',
        difficulty: 'medium',
        question: 'What is the fundamental property of a Quantum Bit (Qubit) that allows it to represent 0 and 1 simultaneously?',
        options: ['Superposition', 'Overclocking', 'Polymorphism', 'Serialization'],
        correctIndex: 0,
        whyWrong: 'Superposition is the quantum mechanical principle enabling qubits to exist in a linear combination of basis states.'
      }
    ],
    codingChallenge: {
      title: 'G-Code Distance Calculator',
      language: 'javascript',
      description: 'Write `calculateToolpathDistance(p1, p2)` calculating Euclidean distance in 3D space: sqrt((x2-x1)^2 + (y2-y1)^2 + (z2-z1)^2).',
      starterCode: `function calculateToolpathDistance(p1, p2) {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const dz = p2.z - p1.z;
  return Number(Math.sqrt(dx*dx + dy*dy + dz*dz).toFixed(2));
}`,
      testCases: [
        { input: '{x:0, y:0, z:0}, {x:3, y:4, z:0}', expectedOutput: '5', hint: 'Pythagorean 3-4-5' }
      ]
    }
  }
];
