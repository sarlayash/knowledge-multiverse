// Knowledge Multiverse — Hard Level 100 MCQ Question Bank (2-Hour Proctored Mock)
// FAANG & Tier-1 Industry Standard — Zero-Tolerance Proctor Protocol
// Powered by Kapil

export const HARD_MOCK_100_QUESTIONS = [
  // ==========================================
  // DOMAIN 1: FOUNDATIONS & SYSTEMS (Q1 - Q15)
  // ==========================================
  {
    id: 'hm-1',
    level: 1,
    domain: 'Foundations',
    question: 'In two’s complement representation with an 8-bit signed integer, what occurs when you add 01111111 (127) and 00000001 (1)?',
    options: [
      'The result is 10000000, causing signed overflow and yielding -128 in decimal',
      'The result is 10000000, representing +128 in decimal without overflow',
      'The result causes a hardware trap with value 00000000',
      'The carry bit is ignored and the output saturates at 01111111'
    ],
    correctIndex: 0,
    explanation: 'In 8-bit signed two’s complement, the range is -128 to +127. Adding 1 to +127 (01111111) produces 10000000, which has a leading sign bit of 1 and represents -128. This is a classic integer overflow condition.',
    difficulty: 'hard'
  },
  {
    id: 'hm-2',
    level: 1,
    domain: 'Foundations',
    question: 'Which of the following Boolean logic equations proves that NAND is a functionally complete operator capable of generating an OR gate?',
    options: [
      'A OR B = (A NAND A) NAND (B NAND B)',
      'A OR B = (A NAND B) NAND (A NAND B)',
      'A OR B = A NAND (B NAND A)',
      'A OR B = (A NAND 1) NAND (B NAND 0)'
    ],
    correctIndex: 0,
    explanation: 'By De Morgan’s Laws, NOT(A) = A NAND A. Therefore, NOT(A) NAND NOT(B) = NOT(NOT(A) AND NOT(B)) = A OR B. Hence (A NAND A) NAND (B NAND B) yields A OR B.',
    difficulty: 'hard'
  },
  {
    id: 'hm-3',
    level: 2,
    domain: 'Foundations',
    question: 'How does the IEEE 754 single-precision (32-bit) floating-point standard represent subnormal (denormalized) numbers?',
    options: [
      'Biased exponent bits are all zeros (E = 0), and the implicit leading mantissa bit is 0 instead of 1',
      'Biased exponent bits are all ones (E = 255), and the fraction bits are all zeros',
      'Biased exponent is set to 127 with the sign bit toggled to indicate subnormal scale',
      'The fraction field is shifted left by 23 bits and the sign bit is ignored'
    ],
    correctIndex: 0,
    explanation: 'Under IEEE 754, when the exponent field is all 0s and fraction is non-zero, the number is denormalized (subnormal). The value is (-1)^S * 2^(-126) * (0.fraction), allowing gradual underflow near zero.',
    difficulty: 'hard'
  },
  {
    id: 'hm-4',
    level: 3,
    domain: 'Foundations',
    question: 'In modern CPU microarchitectures, what is the primary consequence of a branch misprediction in a deep execution pipeline?',
    options: [
      'The instruction pipeline must be flushed, discarding speculative instructions and penalizing latency by 15-20 cycles',
      'The L1 instruction cache is invalidated and must reload from DRAM via the memory bus',
      'The CPU switches execution context to an asynchronous interrupt service routine (ISR)',
      'The Arithmetic Logic Unit (ALU) enters a low-power sleep state until the branch target resolves'
    ],
    correctIndex: 0,
    explanation: 'When a branch predictor guesses wrong, all speculatively fetched and decoded instructions in the pipeline must be squashed (flushed). In deep pipelines (e.g., Intel/AMD with 14-20 stages), this introduces a 15-20 cycle penalty.',
    difficulty: 'hard'
  },
  {
    id: 'hm-5',
    level: 3,
    domain: 'Foundations',
    question: 'In superscalar architectures with out-of-order execution, what hardware mechanism resolves Write-After-Read (WAR) and Write-After-Write (WAW) register hazards?',
    options: [
      'Register Renaming using a physical register file and Reorder Buffer (ROB)',
      'Hardware bus locking using the atomic CMPXCHG instruction',
      'Disabling the L2 unified translation lookaside buffer (TLB)',
      'Inserting synchronous NOP bubbles into the decode stage'
    ],
    correctIndex: 0,
    explanation: 'WAR and WAW hazards are false dependencies caused by a limited number of architectural register names. Register Renaming maps architectural registers to a larger pool of physical registers via a Reorder Buffer (ROB) to eliminate false hazards.',
    difficulty: 'hard'
  },
  {
    id: 'hm-6',
    level: 4,
    domain: 'Operating Systems',
    question: 'In the Linux kernel, what is the fundamental difference between `fork()` and `vfork()` system calls?',
    options: [
      '`vfork()` suspends the parent process until the child calls `execve()` or `_exit()`, and the child shares the parent’s memory space without copying page tables',
      '`fork()` uses synchronous block cloning while `vfork()` triggers an asynchronous thread creation in user-space',
      '`vfork()` allocates completely independent physical memory pages immediately, whereas `fork()` uses Copy-On-Write (COW)',
      '`vfork()` requires root capabilities (CAP_SYS_ADMIN) to bypass kernel virtual memory accounting'
    ],
    correctIndex: 0,
    explanation: '`vfork()` creates a child process without copying the page table entries of the parent, suspending the parent until the child terminates or calls `exec()`. Unlike `fork()`, which uses Copy-On-Write (COW), `vfork()` borrows the parent address space directly.',
    difficulty: 'hard'
  },
  {
    id: 'hm-7',
    level: 4,
    domain: 'Operating Systems',
    question: 'What is the primary trade-off of using Peterson’s Algorithm for mutual exclusion compared to hardware-assisted test-and-set or compare-and-swap?',
    options: [
      'Peterson’s Algorithm relies on strict sequential memory consistency and fails on modern out-of-order out-of-spec CPUs without explicit memory barriers',
      'Peterson’s Algorithm can only support a maximum of 64 concurrent threads',
      'Peterson’s Algorithm induces high priority inversion that cannot be resolved via priority inheritance',
      'Peterson’s Algorithm causes unrecoverable kernel deadlocks when run in user space'
    ],
    correctIndex: 0,
    explanation: 'Peterson’s algorithm assumes sequentially consistent memory operations. On modern CPUs with weak memory models (out-of-order execution and store buffers), memory operations can be reordered unless explicit memory barriers are inserted, breaking the algorithm.',
    difficulty: 'hard'
  },
  {
    id: 'hm-8',
    level: 4,
    domain: 'Operating Systems',
    question: 'In virtual memory systems, what is the precise cause of "Thrashing"?',
    options: [
      'The sum of the working sets of active processes exceeds total available physical RAM, causing the OS to spend more time servicing page faults than executing instructions',
      'A CPU cache coherence invalidation storm across multi-socket NUMA nodes',
      'Continuous disk head thrashing caused by fragmented sequential I/O write operations',
      'Excessive TLB shootdowns triggered by atomic compare-and-swap spinlocks'
    ],
    correctIndex: 0,
    explanation: 'Thrashing occurs when the system lacks sufficient physical memory to satisfy the working sets of all executing processes. The operating system spends virtually all its CPU cycles swapping pages between disk swap and RAM rather than executing instructions.',
    difficulty: 'hard'
  },
  {
    id: 'hm-9',
    level: 4,
    domain: 'Operating Systems',
    question: 'Which of the following conditions is NOT one of Coffman’s four necessary and sufficient conditions for a deadlock to occur?',
    options: [
      'Preemption of resources by high-priority kernel threads',
      'Mutual Exclusion',
      'Hold and Wait',
      'Circular Wait'
    ],
    correctIndex: 0,
    explanation: 'The Coffman conditions are: 1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption (resources cannot be preempted), and 4. Circular Wait. Preemption is the opposite of the deadlock condition.',
    difficulty: 'hard'
  },
  {
    id: 'hm-10',
    level: 5,
    domain: 'Programming & Systems',
    question: 'In C, what is the exact output of: `int a = 5; int b = a++ + ++a; printf("%d", b);` according to the C11/C17 language standard?',
    options: [
      'Undefined Behavior (UB) because `a` is modified more than once between sequence points',
      'Exactly 12 because 5 + 7 = 12',
      'Exactly 11 because 5 + 6 = 11',
      'Compilation error due to invalid lvalue increment'
    ],
    correctIndex: 0,
    explanation: 'In C, modifying a scalar object more than once between sequence points (or unsequenced in C11) invokes Undefined Behavior (UB). The compiler is free to evaluate increments in any order or optimize arbitrarily.',
    difficulty: 'hard'
  },
  {
    id: 'hm-11',
    level: 5,
    domain: 'Programming & Systems',
    question: 'What does the `volatile` type qualifier in C guarantee to the compiler?',
    options: [
      'It prevents the compiler from caching the variable in CPU registers or optimizing away repeated reads/writes',
      'It ensures atomic access and thread safety across multi-core processors',
      'It places the variable in shared non-volatile flash memory instead of SRAM',
      'It guarantees that the memory location will never be swapped to disk'
    ],
    correctIndex: 0,
    explanation: '`volatile` informs the compiler that the value of the variable may change at any time without any action being taken by the code the compiler finds nearby (e.g., hardware register, memory-mapped I/O, signal handler). It forces every read/write to execute in memory and prevents compiler dead-store elimination.',
    difficulty: 'hard'
  },
  {
    id: 'hm-12',
    level: 5,
    domain: 'Programming & Systems',
    question: 'Consider `char *p = "Knowledge"; p[0] = \'k\';`. What happens at runtime on a POSIX x86_64 architecture?',
    options: [
      'Segmentation Fault (SIGSEGV) because string literals reside in the read-only `.rodata` section of virtual memory',
      'Successful modification changing the string in heap memory',
      'Compilation error: assignment of read-only location',
      'A silent no-op where the character remains uppercase'
    ],
    correctIndex: 0,
    explanation: 'String literals in C are stored in the read-only data segment (`.rodata`). Attempting to write to read-only virtual memory pages triggers an MMU page protection fault, causing the OS to dispatch a SIGSEGV signal (Segmentation Fault).',
    difficulty: 'hard'
  },
  {
    id: 'hm-13',
    level: 5,
    domain: 'Programming & Systems',
    question: 'In C memory layout, why does structure padding occur in `struct { char a; int b; char c; }` on a 64-bit architecture?',
    options: [
      'To satisfy CPU natural data alignment requirements, resulting in a total sizeof 12 bytes instead of 6 bytes',
      'To prevent cache line evictions in the L1 instruction cache',
      'To ensure that the structure pointer can be safely cast to `void **`',
      'To reserve space for hidden C++ virtual method table (vptr) pointers'
    ],
    correctIndex: 0,
    explanation: 'On 32/64-bit CPUs, a 4-byte `int` must typically reside on a memory address divisible by 4. `char a` (1 byte) is followed by 3 bytes of padding, then `int b` (4 bytes), then `char c` (1 byte) followed by 3 bytes of trailing padding to align the struct array elements. Total size is 12 bytes.',
    difficulty: 'hard'
  },
  {
    id: 'hm-14',
    level: 5,
    domain: 'Programming & Systems',
    question: 'Which bitwise operation efficiently computes whether an unsigned integer `n` is a non-zero power of 2?',
    options: [
      '(n != 0) && ((n & (n - 1)) == 0)',
      '(n != 0) && ((n ^ (n + 1)) == 0)',
      '((n >> 1) << 1) == n',
      '(n | (n - 1)) == (2 * n - 1)'
    ],
    correctIndex: 0,
    explanation: 'A power of 2 in binary has exactly one bit set (e.g., 8 is 1000). Subtracting 1 flips all bits up to that bit (8 - 1 = 7, which is 0111). Bitwise ANDing `n & (n - 1)` will clear that single bit and produce 0 if and only if `n` is a power of 2.',
    difficulty: 'hard'
  },
  {
    id: 'hm-15',
    level: 5,
    domain: 'Programming & Systems',
    question: 'What is the key danger of using the POSIX function `alloca()` inside a loop?',
    options: [
      'Memory allocated by `alloca()` is on the stack frame and is only deallocated when the enclosing function returns, potentially causing a stack overflow',
      '`alloca()` triggers an implicit `free()` at the end of each loop iteration causing a use-after-free bug',
      '`alloca()` leaks kernel memory into the user-space process heap',
      '`alloca()` invalidates all active register variables across thread boundaries'
    ],
    correctIndex: 0,
    explanation: '`alloca()` allocates memory directly on the execution call stack by adjusting the stack pointer. It is only freed when the enclosing function exits, NOT when the loop block ends. Allocating inside a loop can rapidly deplete the thread stack and trigger a Stack Overflow.',
    difficulty: 'hard'
  },

  // ==========================================
  // DOMAIN 2: DATA & WEB SYSTEMS (Q16 - Q35)
  // ==========================================
  {
    id: 'hm-16',
    level: 6,
    domain: 'Database Systems',
    question: 'In relational database theory, what distinguishes Boyce-Codd Normal Form (BCNF) from Third Normal Form (3NF)?',
    options: [
      'In BCNF, for every non-trivial functional dependency X -> Y, X must be a superkey, eliminating dependencies on prime attributes from non-superkeys',
      'BCNF requires all multi-valued dependencies to be functional dependencies, whereas 3NF allows partial key dependencies',
      '3NF requires all attributes to be non-nullable, while BCNF allows nullable foreign keys',
      'BCNF permits transitive dependencies provided the determinant is a candidate key'
    ],
    correctIndex: 0,
    explanation: 'In 3NF, for X -> Y, either X is a superkey OR Y is a prime attribute (part of a candidate key). BCNF eliminates the second condition: for EVERY non-trivial functional dependency X -> Y, X MUST be a superkey. BCNF is strictly stronger than 3NF.',
    difficulty: 'hard'
  },
  {
    id: 'hm-17',
    level: 6,
    domain: 'Database Systems',
    question: 'Why do relational database engines (PostgreSQL, MySQL InnoDB) utilize B+ Trees instead of standard B-Trees for table and index storage?',
    options: [
      'B+ Trees store data records exclusively in the leaf nodes, creating a linked list that enables ultra-fast range queries and maximizes non-leaf node branching factor',
      'B+ Trees guarantee O(1) worst-case lookup time regardless of dataset size',
      'B+ Trees eliminate the need for write-ahead logging (WAL) during concurrent transactions',
      'B+ Trees do not require rebalancing during random insert/delete operations'
    ],
    correctIndex: 0,
    explanation: 'In a B+ Tree, internal nodes only store routing keys (not record data), allowing many more keys per disk page (higher fan-out / smaller tree depth). Furthermore, all leaf nodes are linked in a sequential doubly linked list, making range scans (`BETWEEN`, `>`, `<`) extremely efficient.',
    difficulty: 'hard'
  },
  {
    id: 'hm-18',
    level: 6,
    domain: 'Database Systems',
    question: 'Under ANSI SQL isolation levels, which anomaly is possible in "Repeatable Read" that is strictly eliminated in "Serializable"?',
    options: [
      'Phantom Reads (a query re-reading a range of rows finds new rows inserted by another committed transaction)',
      'Dirty Reads (reading uncommitted data from an in-flight transaction)',
      'Non-Repeatable Reads (re-reading the same row returns modified values)',
      'Dirty Writes (overwriting uncommitted concurrent transaction writes)'
    ],
    correctIndex: 0,
    explanation: 'Under ANSI SQL-92 standard, Repeatable Read prevents Dirty Reads and Non-Repeatable Reads, but permits Phantom Reads (where a concurrent transaction inserts new records matching the range condition). Serializable eliminates Phantom Reads via predicate locking or two-phase locking.',
    difficulty: 'hard'
  },
  {
    id: 'hm-19',
    level: 6,
    domain: 'Database Systems',
    question: 'How does Multi-Version Concurrency Control (MVCC) in PostgreSQL handle row updates without blocking read operations?',
    options: [
      'An update writes a new row version with current `xmin` and marks the old row `xmax`, allowing readers to see historical snapshot versions without acquiring read locks',
      'The engine locks the entire table partition in exclusive mode and buffers writes in RAM',
      'All concurrent readers are queued until the writer transaction executes `COMMIT`',
      'Old row versions are moved immediately to the operating system swap file'
    ],
    correctIndex: 0,
    explanation: 'In MVCC, an `UPDATE` is physically treated as an `INSERT` of a new row version (tuple) alongside marking the old tuple’s `xmax` with the current transaction ID. Readers inspect snapshot visibility rules to view only tuples valid at their snapshot start, preventing readers from blocking writers and vice versa.',
    difficulty: 'hard'
  },
  {
    id: 'hm-20',
    level: 6,
    domain: 'Database Systems',
    question: 'In Write-Ahead Logging (WAL) and the ARIES recovery algorithm, what is the role of the "Analysis Pass" during database crash recovery?',
    options: [
      'It scans the WAL forward from the latest checkpoint to reconstruct the active transaction table and Dirty Page Table (DPT) at the time of crash',
      'It rolls back all active transactions before replaying committed logs',
      'It writes a full physical dump of the database pages to backup storage',
      'It validates foreign key constraints across all modified partition tables'
    ],
    correctIndex: 0,
    explanation: 'The ARIES algorithm performs three recovery phases: Analysis, Redo, and Undo. The Analysis pass starts from the last checkpoint and scans forward to identify all dirty pages in buffer pool and all active (uncommitted) transactions at the time of crash.',
    difficulty: 'hard'
  },
  {
    id: 'hm-21',
    level: 7,
    domain: 'Web Development',
    question: 'In the JavaScript V8 engine and HTML5 event loop specification, what is the precise execution priority order between Microtasks and Macrotasks?',
    options: [
      'After the current execution call stack clears, ALL microtasks (Promises, `queueMicrotask`, `MutationObserver`) are drained completely before the next Macrotask (`setTimeout`, `setInterval`, I/O) executes',
      'Macrotasks and microtasks are interleaved in a strict 1:1 round-robin scheduler',
      'Macrotasks take precedence over microtasks to guarantee 60fps frame rendering rate',
      'Microtasks are queued to a dedicated Web Worker thread while macrotasks run on the main thread'
    ],
    correctIndex: 0,
    explanation: 'The event loop processes one macrotask from the task queue, then immediately executes all queued microtasks until the microtask queue is completely empty. If microtasks enqueue additional microtasks, they are also executed before returning to the next macrotask or rendering step.',
    difficulty: 'hard'
  },
  {
    id: 'hm-22',
    level: 7,
    domain: 'Web Development',
    question: 'What is the purpose of the HTTP `Content-Security-Policy: default-src \'self\'; script-src \'self\' \'nonce-xyz\';` header?',
    options: [
      'To mitigate Cross-Site Scripting (XSS) by restricting the browser to execute only scripts with matching cryptographic nonce tokens',
      'To enforce Cross-Origin Resource Sharing (CORS) preflight checks across API endpoints',
      'To automatically encrypt all client-side cookies with AES-256 GCM',
      'To block search engine web crawlers from indexing administrative routes'
    ],
    correctIndex: 0,
    explanation: 'Content Security Policy (CSP) is a defense-in-depth header designed to restrict where resources (scripts, styles, images) can be loaded from. Restricting `script-src` with cryptographic nonces prevents attackers from executing injected inline XSS payloads.',
    difficulty: 'hard'
  },
  {
    id: 'hm-23',
    level: 7,
    domain: 'Web Development',
    question: 'In modern browser rendering pipelines, what triggers a "Reflow" (Layout) rather than just a "Repaint"?',
    options: [
      'Modifying geometric dimensions such as `width`, `height`, `margin`, or reading `element.offsetWidth`',
      'Changing visual appearance properties like `color`, `background-color`, or `visibility`',
      'Applying CSS3 3D hardware-accelerated transforms like `transform: translate3d(0, 0, 0)`',
      'Changing the `opacity` of a layer promoted to GPU compositing'
    ],
    correctIndex: 0,
    explanation: 'Reflow (layout calculation) occurs whenever geometry or element positions change (width, padding, font-size) or when computed style is read via properties like `offsetWidth`. In contrast, colors or background changes only trigger a Repaint, and `transform`/`opacity` trigger cheap GPU Compositing.',
    difficulty: 'hard'
  },
  {
    id: 'hm-24',
    level: 7,
    domain: 'Web Development',
    question: 'What does the HTTP header `Cache-Control: no-cache` specify according to RFC 7234?',
    options: [
      'The browser or proxy may store the cached response, but MUST validate it with the origin server (using ETag or If-Modified-Since) before serving it',
      'The response must never be stored anywhere on disk or memory under any circumstances',
      'The cache is invalidated after exactly 0 milliseconds without revalidation',
      'The cache is only available to private authenticated user sessions'
    ],
    correctIndex: 0,
    explanation: '`no-cache` does NOT mean "do not cache". It means the client/proxy CAN cache the response, but MUST send a conditional validation request (`ETag` / `If-None-Match`) to the origin server before using it. To completely prevent caching, one must use `no-store`.',
    difficulty: 'hard'
  },
  {
    id: 'hm-25',
    level: 7,
    domain: 'Web Development',
    question: 'How does the JavaScript `Same-Site` cookie attribute with value `Strict` protect against Cross-Site Request Forgery (CSRF)?',
    options: [
      'It prevents the cookie from being sent on any cross-site requests, including normal top-level navigation links from third-party sites',
      'It encrypts the cookie using the client machine’s hardware TPM chip',
      'It restricts cookie access exclusively to HTTPS connections and blocks JavaScript `document.cookie` access',
      'It terminates the user session if the client IP address changes'
    ],
    correctIndex: 0,
    explanation: '`SameSite=Strict` ensures that the browser never sends the cookie in cross-site requests (e.g. following a link from an external forum or email to your bank). This provides robust immunity against CSRF attacks.',
    difficulty: 'hard'
  },

  // ==========================================
  // DOMAIN 3: SOFTWARE ENGINEERING & AGILE (Q26 - Q45)
  // ==========================================
  {
    id: 'hm-26',
    level: 9,
    domain: 'Software Engineering',
    question: 'In the SOLID design principles, what violation occurs when a subclass throws an `UnsupportedOperationException` for an inherited method of its superclass interface?',
    options: [
      'Liskov Substitution Principle (LSP)',
      'Single Responsibility Principle (SRP)',
      'Dependency Inversion Principle (DIP)',
      'Open-Closed Principle (OCP)'
    ],
    correctIndex: 0,
    explanation: 'The Liskov Substitution Principle states that objects of a superclass should be replaceable with objects of its subclasses without breaking application correctness. Throwing an unsupported exception breaks the expected behavioral contract of the base type.',
    difficulty: 'hard'
  },
  {
    id: 'hm-27',
    level: 9,
    domain: 'Software Engineering',
    question: 'What is the architectural objective of the "Circuit Breaker" pattern in distributed microservices?',
    options: [
      'To prevent catastrophic cascading failures by failing fast and avoiding continuous calls to an unhealthy downstream service',
      'To automatically scale up Kubernetes pod replicas when memory utilization crosses 90%',
      'To enforce distributed 2-Phase Commit (2PC) transactions across heterogeneous databases',
      'To authenticate incoming JWT tokens before hitting the internal microservice mesh'
    ],
    correctIndex: 0,
    explanation: 'Circuit Breaker monitors for downstream service failures. When failures exceed a threshold, it trips to OPEN state, immediately returning fallback responses and preventing thread pool exhaustion and cascading system collapse.',
    difficulty: 'hard'
  },
  {
    id: 'hm-28',
    level: 10,
    domain: 'Software Engineering',
    question: 'In Domain-Driven Design (DDD), what is an "Aggregate Root"?',
    options: [
      'A primary entity within an aggregate boundary that controls all access, maintains internal business invariants, and is the sole entry point for external references',
      'A database view combining multiple SQL tables with foreign key constraints',
      'The topmost Docker container running the API gateway in a microservice cluster',
      'A singleton dependency injection container managing application-wide beans'
    ],
    correctIndex: 0,
    explanation: 'In DDD, an Aggregate is a cluster of associated objects treated as a unit for data changes. The Aggregate Root is the primary Entity through which external objects are permitted to hold references, ensuring invariants are consistently enforced.',
    difficulty: 'hard'
  },
  {
    id: 'hm-29',
    level: 11,
    domain: 'Agile & DevOps',
    question: 'In Scrum, how is "Team Velocity" correctly calculated and utilized across sprint planning?',
    options: [
      'By taking the rolling average of Story Points associated with items completed according to the Definition of Done (DoD) in previous sprints to guide future capacity',
      'By calculating the total hours logged by all team members in the Jira task management system',
      'By multiplying the number of developers by the sprint length in days',
      'By measuring the code commit frequency in the main Git repository'
    ],
    correctIndex: 0,
    explanation: 'Velocity is an empirical metric calculated as the sum of Story Points of backlog items completed according to the Definition of Done during a sprint. It guides realistic forecasting during Sprint Planning and should not be used as a cross-team competition tool.',
    difficulty: 'hard'
  },
  {
    id: 'hm-30',
    level: 12,
    domain: 'Agile & DevOps',
    question: 'What is the primary operational advantage of multi-stage Docker builds?',
    options: [
      'Separating compile-time SDK tools and source code from runtime dependencies, yielding ultra-compact production images with minimal attack surfaces',
      'Enabling Docker containers to run multiple operating systems concurrently in the same pod',
      'Bypassing the Linux cgroups memory limitation on production worker nodes',
      'Allowing live kernel patching without restarting running containers'
    ],
    correctIndex: 0,
    explanation: 'Multi-stage builds allow you to use a heavy image with compilers, linters, and SDKs to build artifacts, and then copy only the compiled binary or dist files into a minimal runtime image (e.g. Alpine or distroless). This reduces image size from gigabytes to megabytes and eliminates attack vectors.',
    difficulty: 'hard'
  },
  {
    id: 'hm-31',
    level: 12,
    domain: 'Agile & DevOps',
    question: 'In Git internal architecture, how does Git uniquely identify and store commits, trees, and blobs?',
    options: [
      'As Content-Addressable Objects identified by their cryptographic SHA-1 / SHA-256 hashes in the `.git/objects` directory',
      'As sequential row entries stored in an embedded SQLite database inside the `.git` directory',
      'As differential delta patches stored relative to the initial branch commit',
      'Through central server UUIDs issued by the GitHub / GitLab remote repository'
    ],
    correctIndex: 0,
    explanation: 'Git is a content-addressable object store. Every object (commit, tree, blob, tag) is hashed using SHA-1 (or SHA-256) based on its type, size, and content. The hash acts as the key, and the compressed contents are stored in `.git/objects`.',
    difficulty: 'hard'
  },
  {
    id: 'hm-32',
    level: 12,
    domain: 'Agile & DevOps',
    question: 'In continuous deployment, what is the core mechanism of "Canary Deployment"?',
    options: [
      'Routing a small percentage (e.g., 5%) of production traffic to the new version while monitoring error rates, then gradually scaling traffic up if stable',
      'Spinning up two identical complete environments (Blue and Green) and flipping the router switch 100% instantaneously',
      'Testing the application exclusively in an isolated staging replica with mock synthetic data',
      'Deploying code changes directly to client browsers via Service Worker background sync'
    ],
    correctIndex: 0,
    explanation: 'Canary deployment rolls out changes to a small subset of servers/users first (e.g., 2-5%). Automated telemetry monitors metrics (error rate, p99 latency). If issues arise, traffic is rolled back with minimal user impact; if healthy, traffic is increased to 100%.',
    difficulty: 'hard'
  },

  // ==========================================
  // DOMAIN 4: NETWORKING, CLOUD & SECURITY (Q33 - Q65)
  // ==========================================
  {
    id: 'hm-33',
    level: 15,
    domain: 'Computer Networking',
    question: 'What occurs during the TCP Three-Way Handshake if the SYN backlog queue of the listening server is completely saturated?',
    options: [
      'The server either drops incoming SYN packets or replies with SYN Cookies (if enabled) to mitigate SYN Flood attacks',
      'The server immediately responds with an ICMP Destination Unreachable packet',
      'The server automatically upgrades the connection to raw UDP datagram streaming',
      'The operating system kernel triggers an immediate hardware kernel panic'
    ],
    correctIndex: 0,
    explanation: 'When the TCP SYN backlog is full, the OS drops new incoming SYN packets. If `syncookies` are enabled, the server constructs a cryptographically encoded sequence number without allocating state in memory, allowing legitimate handshakes to complete without server denial of service.',
    difficulty: 'hard'
  },
  {
    id: 'hm-34',
    level: 15,
    domain: 'Computer Networking',
    question: 'Why does the TCP congestion control mechanism utilize "Slow Start" and how does it adjust the congestion window (cwnd)?',
    options: [
      'It starts with a small cwnd (e.g., 10 MSS) and doubles it every Round-Trip Time (RTT) exponentially until it reaches `ssthresh`',
      'It linearly increases the cwnd by 1 MSS per second until a timeout occurs',
      'It measures physical link voltage drops to determine maximum wire bandwidth',
      'It requests the downstream router to throttle upstream queue buffers via ICMP Source Quench'
    ],
    correctIndex: 0,
    explanation: 'Slow Start avoids overwhelming the network by starting with a conservative congestion window (cwnd) and doubling `cwnd` for every round-trip time (RTT) where ACKs are received (exponential growth). Once `cwnd >= ssthresh`, it transitions to linear Congestion Avoidance.',
    difficulty: 'hard'
  },
  {
    id: 'hm-35',
    level: 15,
    domain: 'Computer Networking',
    question: 'In the Border Gateway Protocol (BGP), what mechanism prevents routing loops across Autonomous Systems (AS)?',
    options: [
      'The AS_PATH attribute: a router discards incoming BGP advertisements containing its own AS number in the path',
      'The Spanning Tree Protocol (STP) running on edge backbone switches',
      'Split Horizon with Poison Reverse running across external BGP peers',
      'A global synchronized NTP server validating route timestamp expirations'
    ],
    correctIndex: 0,
    explanation: 'BGP is a path-vector protocol. Every BGP update includes an AS_PATH attribute listing the sequence of AS numbers the route has traversed. If a BGP router detects its own AS number in the AS_PATH of an advertisement, it immediately drops the route to prevent routing loops.',
    difficulty: 'hard'
  },
  {
    id: 'hm-36',
    level: 15,
    domain: 'Computer Networking',
    question: 'What is the function of the ARP (Address Resolution Protocol) cache and what vulnerability allows "ARP Spoofing"?',
    options: [
      'It maps IPv4 addresses to physical MAC addresses; since ARP is stateless without authentication, a host blindly accepts unsolicited gratuitous ARP replies',
      'It resolves domain names to IP addresses; DNS cache poisoning overwrites the root nameservers',
      'It assigns IP leases dynamically; rogue DHCP servers exhaust available address pools',
      'It routes packets across VLAN trunks; 802.1Q double-tagging hops across boundaries'
    ],
    correctIndex: 0,
    explanation: 'ARP resolves Layer 3 IP addresses into Layer 2 MAC addresses. Because ARP lacks cryptographic authentication, an attacker can broadcast unsolicited ARP replies claiming the IP of the default gateway, poisoning the ARP caches of subnet devices to execute Man-In-The-Middle (MITM) attacks.',
    difficulty: 'hard'
  },
  {
    id: 'hm-37',
    level: 16,
    domain: 'Virtualization & Cloud',
    question: 'In Linux containerization, what is the architectural distinction between Linux "Namespaces" and "cgroups" (Control Groups)?',
    options: [
      'Namespaces provide isolation of system resources (PID, Mount, Net, User), while cgroups enforce resource metering and limits (CPU, Memory, I/O)',
      'Namespaces manage hardware hypervisor scheduling, while cgroups handle disk storage encryption',
      'Namespaces are executed in kernel space, while cgroups are user-space helper daemons',
      'cgroups isolate process IDs, while Namespaces limit network bandwidth'
    ],
    correctIndex: 0,
    explanation: 'Namespaces isolate what a process can SEE (its own PID list, network interfaces, mounts, IPC). cgroups (Control Groups) limit how much of a resource a process can USE (CPU quota, memory limits, blkio rate). Together they form the backbone of Docker and Kubernetes.',
    difficulty: 'hard'
  },
  {
    id: 'hm-38',
    level: 17,
    domain: 'Cloud Architecture',
    question: 'In designing a globally distributed cloud architecture, what does the CAP Theorem guarantee about network partitions in a CP system like Apache HBase or Google Cloud Spanner?',
    options: [
      'During a network partition, the system preserves data Consistency by refusing or delaying writes that cannot reach a quorum, sacrificing Availability for that minority partition',
      'The system guarantees 100% Availability across all nodes by accepting writes and reconciling via multi-master eventual consistency',
      'The system automatically converts all relational queries into static JSON file streams',
      'Network partitions are rendered physically impossible through quantum optical cross-links'
    ],
    correctIndex: 0,
    explanation: 'In the CAP theorem, when a network partition (P) occurs, a CP system chooses Consistency over Availability. Nodes in a minority partition that cannot confirm consensus (e.g., Paxos/Raft quorum) will reject client requests to prevent split-brain inconsistencies.',
    difficulty: 'hard'
  },
  {
    id: 'hm-39',
    level: 17,
    domain: 'Cloud Architecture',
    question: 'How does Google Cloud Spanner achieve externally consistent distributed transactions globally without a single central bottleneck?',
    options: [
      'TrueTime API utilizing synchronized atomic clocks and GPS receivers in each data center with bounded clock skew uncertainty [e]',
      'Strict two-phase locking coordinated through a single master datacenter in North America',
      'Eventual consistency with vector clocks and client-side resolution',
      'Hardware bus bridging across transatlantic submarine optical cables'
    ],
    correctIndex: 0,
    explanation: 'Spanner uses Google’s TrueTime API, which provides a hardware-backed synchronized time API with bounded uncertainty [e] (using GPS receivers and atomic clocks). Transactions wait out the uncertainty window to guarantee global linearizable ordering without centralized lock bottlenecks.',
    difficulty: 'hard'
  },
  {
    id: 'hm-40',
    level: 18,
    domain: 'Cybersecurity',
    question: 'In asymmetric cryptography and TLS 1.3, what security benefit does Ephemeral Diffie-Hellman (ECDHE) provide over static RSA key exchange?',
    options: [
      'Perfect Forward Secrecy (PFS): compromising the server’s long-term private key in the future does not decrypt past recorded session traffic',
      'It reduces TLS certificate size from 2048 bits to 128 bits',
      'It eliminates the need for Certificate Authorities (CAs) and root trust stores',
      'It guarantees symmetric AES encryption without requiring random nonce generation'
    ],
    correctIndex: 0,
    explanation: 'In TLS 1.3, static RSA key exchange is deprecated because if the server private key is leaked in the future, all historically recorded encrypted traffic can be decrypted. Ephemeral Diffie-Hellman (ECDHE) generates fresh temporary keys for every session, ensuring Perfect Forward Secrecy (PFS).',
    difficulty: 'hard'
  },
  {
    id: 'hm-41',
    level: 18,
    domain: 'Cybersecurity',
    question: 'What is a "Blind SQL Injection" attack and how does an attacker extract database information without visible error messages or returned data rows?',
    options: [
      'By injecting boolean conditions paired with timed delays (e.g., `pg_sleep()` / `WAITFOR DELAY`) and inferring characters bit-by-bit from server response times',
      'By overflowing the SQL query buffer and reading memory dumps from the server log file',
      'By manipulating HTTP cookies to hijack the database administrator’s active session',
      'By sending corrupted unicode strings to trigger an unhandled database server restart'
    ],
    correctIndex: 0,
    explanation: 'In Blind SQL Injection, the application does not return query results or database errors. The attacker crafts boolean questions (e.g., "Is the first character of the password > \'m\'?") and uses conditional time delays (`SLEEP(5)`) or response content changes to reconstruct the database character by character.',
    difficulty: 'hard'
  },
  {
    id: 'hm-42',
    level: 18,
    domain: 'Cybersecurity',
    question: 'How does an Address Space Layout Randomization (ASLR) implementation in modern operating systems mitigate buffer overflow exploits?',
    options: [
      'It randomizes the memory locations of the stack, heap, and shared libraries on process execution, making fixed shellcode return addresses unpredictable',
      'It encrypts the entire CPU stack using an AES-128 hardware key on every function invocation',
      'It replaces the instruction pointer (EIP/RIP) with a random integer whenever a function returns',
      'It marks all memory pages as executable and read-only simultaneously'
    ],
    correctIndex: 0,
    explanation: 'ASLR randomizes the base memory addresses of the program stack, heap, and loaded libraries whenever a program runs. An attacker attempting a Return-to-libc or shellcode injection cannot hardcode memory jump targets, causing the exploit to trigger an invalid memory access crash instead.',
    difficulty: 'hard'
  },

  // ==========================================
  // DOMAIN 5: AI, MACHINE LEARNING & LLMS (Q43 - Q65)
  // ==========================================
  {
    id: 'hm-43',
    level: 20,
    domain: 'Artificial Intelligence',
    question: 'What is the "Vanishing Gradient Problem" in deep feedforward neural networks using sigmoid or tanh activation functions?',
    options: [
      'During backpropagation, gradients shrink exponentially as they propagate backward through layers because the derivatives of sigmoid are strictly less than 0.25, halting early layer weight updates',
      'The learning rate decays to zero during stochastic gradient descent',
      'Weights grow to infinity, causing floating-point arithmetic overflow',
      'The loss function oscillates violently around local minima without converging'
    ],
    correctIndex: 0,
    explanation: 'The derivative of the sigmoid function reaches a maximum of 0.25. When chain-rule multiplying these fractions across many deep layers during backpropagation, the resulting gradients approach zero, preventing early layers from updating their weights. ReLU addresses this with a constant derivative of 1 for positive inputs.',
    difficulty: 'hard'
  },
  {
    id: 'hm-44',
    level: 20,
    domain: 'Artificial Intelligence',
    question: 'In Transformer neural networks ("Attention Is All You Need"), what is the time and memory complexity of standard Self-Attention with sequence length `N`?',
    options: [
      'O(N^2) in both time and memory due to computing the dot-product attention matrix between all token pairs',
      'O(N log N) time complexity and O(N) memory complexity using Fast Fourier Transforms',
      'Strictly O(N) linear complexity by reusing recurrent hidden states across timesteps',
      'O(N^3) time complexity due to singular value matrix decomposition at each layer'
    ],
    correctIndex: 0,
    explanation: 'Standard multi-head self-attention computes `softmax((Q * K^T) / sqrt(d_k)) * V`. Multiplying the Query matrix (N x d) by Key matrix (d x N) creates an N x N attention score matrix, yielding quadratic O(N^2) computational and memory cost with respect to token sequence length.',
    difficulty: 'hard'
  },
  {
    id: 'hm-45',
    level: 21,
    domain: 'Generative AI',
    question: 'In Retrieval-Augmented Generation (RAG) architectures, how does Cosine Similarity compare to Euclidean Distance for dense vector embedding comparisons?',
    options: [
      'Cosine similarity measures the orientation (angle) between normalized embeddings, making it invariant to vector length/magnitude, while Euclidean distance is sensitive to magnitude',
      'Cosine similarity is strictly computed in polynomial time while Euclidean distance is NP-hard',
      'Euclidean distance ignores high-dimensional dimensions while cosine similarity only inspects the first 128 dimensions',
      'Cosine similarity requires all vectors to be integer-quantized to 8 bits'
    ],
    correctIndex: 0,
    explanation: 'Cosine similarity measures `(A . B) / (||A|| * ||B||)`, which evaluates the angle between vectors regardless of their magnitude. For text embeddings (e.g. OpenAI / Gemini embeddings), semantic relatedness is captured in directional orientation in semantic space.',
    difficulty: 'hard'
  },
  {
    id: 'hm-46',
    level: 21,
    domain: 'Generative AI',
    question: 'What is the role of Temperature in LLM sampling strategies (e.g., softmax with temperature)?',
    options: [
      'Lowering temperature (< 1.0) sharpens the probability distribution, making high-probability tokens more dominant and the model more deterministic',
      'Raising temperature increases the maximum sequence context window of the model',
      'Lowering temperature speeds up GPU matrix multiplication by skipping attention heads',
      'Temperature controls the learning rate decay schedule during Reinforcement Learning from Human Feedback (RLHF)'
    ],
    correctIndex: 0,
    explanation: 'In the softmax computation `P(y_i) = exp(z_i / T) / sum(exp(z_j / T))`, dividing logits `z` by a temperature `T < 1.0` amplifies the differences between logits, concentrating probability mass on the top tokens and producing more factual, deterministic outputs. A higher temperature flattens distribution, increasing diversity/creativity.',
    difficulty: 'hard'
  },
  {
    id: 'hm-47',
    level: 21,
    domain: 'Generative AI',
    question: 'What is the core distinction between LoRA (Low-Rank Adaptation) and full fine-tuning of large language models?',
    options: [
      'LoRA freezes the pre-trained model weights and injects trainable rank-decomposition matrices (A and B) into the attention layers, drastically reducing trainable parameters by 99%',
      'LoRA eliminates the need for training dataset labels by using self-supervised contrastive clustering',
      'LoRA compiles the model directly to FPGA hardware without requiring GPU CUDA cores',
      'LoRA only trains the final linear classification head of the transformer architecture'
    ],
    correctIndex: 0,
    explanation: 'LoRA freezes the original weight matrix W_0 (d x k) and parameterizes its updates as the product of two low-rank matrices B (d x r) and A (r x k) where rank `r << d`. This allows fine-tuning multi-billion parameter models with minimal GPU VRAM.',
    difficulty: 'hard'
  },

  // ==========================================
  // DOMAIN 6: BLOCKCHAIN, IOT & FRONTIER (Q48 - Q60)
  // ==========================================
  {
    id: 'hm-48',
    level: 22,
    domain: 'Blockchain',
    question: 'In Ethereum and EVM-based smart contracts, what causes a "Reentrancy Attack" (as observed in the infamous DAO hack)?',
    options: [
      'A vulnerable contract transfers ether to an external untrusted contract before updating its internal balance state, allowing the recipient fallback function to call back into the withdraw function recursively',
      'An attacker mines invalid blocks on a private fork and performs a 51% reorganization',
      'A zero-division exception in Solidity integer arithmetic triggers a transaction reversion',
      'A transaction exceeds the maximum gas limit of the block and executes without validation'
    ],
    correctIndex: 0,
    explanation: 'A reentrancy attack occurs when contract A sends funds to external contract B before deducting B’s balance (`state update`). Contract B’s fallback function calls back into contract A’s withdrawal method recursively before the balance update occurs, draining contract A’s funds.',
    difficulty: 'hard'
  },
  {
    id: 'hm-49',
    level: 22,
    domain: 'Blockchain',
    question: 'How does a Merkle-Patricia Trie provide cryptographic proof that a transaction is included in an Ethereum block header?',
    options: [
      'By providing a cryptographic Merkle proof (the sibling hashes along the branch path from the transaction leaf to the root hash), verified in O(log N) time',
      'By executing a zero-knowledge SNARK proof verifying all block state transitions',
      'By checking the digital signature of the proof-of-stake validator against the beacon chain',
      'By downloading the complete 500GB blockchain history to re-execute every opcode'
    ],
    correctIndex: 0,
    explanation: 'A Merkle tree allows light clients to verify that a transaction exists in a block without downloading the entire block. Providing the sibling hashes up to the Merkle root hash (O(log N) proof) proves inclusion mathematically.',
    difficulty: 'hard'
  },
  {
    id: 'hm-50',
    level: 23,
    domain: 'Internet of Things',
    question: 'In the MQTT IoT messaging protocol, what is the guarantee of Quality of Service level 2 (QoS 2)?',
    options: [
      'Exactly once delivery using a 4-step handshake (PUBLISH -> PUBREC -> PUBREL -> PUBCOMP)',
      'At most once delivery with best-effort UDP transmission and no acknowledgment',
      'At least once delivery with potential duplicate message arrivals',
      'Synchronous broadcast to all subscribed edge broker nodes within 1 millisecond'
    ],
    correctIndex: 0,
    explanation: 'MQTT QoS 2 is the highest level of service, guaranteeing that messages are received exactly once by the intended recipients through a two-phase four-step handshake (PUBLISH, PUBREC, PUBREL, PUBCOMP), eliminating duplicate messages.',
    difficulty: 'hard'
  },
  {
    id: 'hm-51',
    level: 23,
    domain: 'Internet of Things',
    question: 'Why is the CoAP (Constrained Application Protocol) protocol built on top of UDP rather than TCP for constrained IoT sensor devices?',
    options: [
      'UDP eliminates TCP handshake and connection-state overhead, minimizing battery power and packet transmission size across lossy radio networks',
      'UDP provides built-in end-to-end hardware encryption without requiring TLS/DTLS',
      'TCP cannot operate on microcontrollers with less than 16 gigabytes of RAM',
      'UDP packets automatically route through firewalls without requiring NAT hole punching'
    ],
    correctIndex: 0,
    explanation: 'Constrained IoT devices have micro-amps of battery power and minimal RAM. TCP requires connection establishment (3-way handshake) and maintains connection states. CoAP uses UDP with optional lightweight reliability (Confirmable messages) and DTLS security to optimize power and bandwidth.',
    difficulty: 'hard'
  },
  {
    id: 'hm-52',
    level: 24,
    domain: 'Frontier Tech',
    question: 'In Virtual Reality (VR) head-mounted displays, what is the "Motion-to-Photon Latency" threshold required to prevent vestibular simulator sickness?',
    options: [
      'Under 20 milliseconds (< 20ms)',
      'Between 80 and 120 milliseconds',
      'Under 250 milliseconds',
      'Strictly under 1 millisecond'
    ],
    correctIndex: 0,
    explanation: 'Motion-to-photon latency is the delay between a physical head movement and the updated image photons reaching the user’s eyes. If this latency exceeds 20ms, the mismatch between vestibular inner-ear balance and visual perception triggers motion sickness and disequilibrium.',
    difficulty: 'hard'
  },
  {
    id: 'hm-53',
    level: 25,
    domain: 'Frontier Tech',
    question: 'In Additive Manufacturing (3D Printing), what is the difference between Stereolithography (SLA) and Fused Deposition Modeling (FDM)?',
    options: [
      'SLA cures liquid photopolymer resin using a targeted ultraviolet (UV) laser, while FDM extrudes melted thermoplastic filament layer-by-layer',
      'FDM uses powder bed laser sintering while SLA uses jet binder drops',
      'SLA is only capable of printing conductive copper alloys',
      'FDM produces isotropic parts with zero inter-layer structural weaknesses'
    ],
    correctIndex: 0,
    explanation: 'SLA (Stereolithography) uses a UV laser or light projector to photopolymerize and solidify liquid resin layer by layer with high microscopic resolution. FDM (Fused Deposition Modeling) heats and extrudes solid plastic filament (PLA/ABS) through a mechanical nozzle.',
    difficulty: 'hard'
  },

  // ==========================================
  // DOMAIN 7: ADVANCED DSA & ALGORITHMS (Q54 - Q75)
  // ==========================================
  {
    id: 'hm-54',
    level: 5,
    domain: 'Algorithms & DSA',
    question: 'What is the tightest upper bound time complexity of Dijkstra’s Algorithm implemented with a Fibonacci Heap for a graph with V vertices and E edges?',
    options: [
      'O(E + V log V)',
      'O(E log V)',
      'O(V^2)',
      'O(E * V)'
    ],
    correctIndex: 0,
    explanation: 'Using a Fibonacci Heap, `decrease-key` takes amortized O(1) time and `extract-min` takes O(log V) time. Over E edge relaxations and V vertex extractions, the total runtime is O(E + V log V), which is asymptotically superior to binary heaps (O(E log V)) on dense graphs.',
    difficulty: 'hard'
  },
  {
    id: 'hm-55',
    level: 5,
    domain: 'Algorithms & DSA',
    question: 'In a Red-Black Tree, what is the maximum possible height of a tree with `n` internal nodes?',
    options: [
      '2 * log2(n + 1)',
      'log2(n)',
      '3 * log2(n)',
      'n / 2'
    ],
    correctIndex: 0,
    explanation: 'In a Red-Black Tree, every path from root to leaf has the same number of black nodes (black-height `bh >= h/2`). Since a tree of black-height `bh` has at least `2^bh - 1` internal nodes, `n >= 2^(h/2) - 1`, giving `h <= 2 * log2(n + 1)`.',
    difficulty: 'hard'
  },
  {
    id: 'hm-56',
    level: 5,
    domain: 'Algorithms & DSA',
    question: 'What is the worst-case space complexity of the QuickSort algorithm when implemented with Tail Call Optimization for the larger partition?',
    options: [
      'O(log N) auxiliary call stack space',
      'O(N) call stack space',
      'O(1) strictly constant space',
      'O(N log N) space'
    ],
    correctIndex: 0,
    explanation: 'By recursing on the smaller partition first and using a tail-call loop for the larger partition, the stack depth is bounded by `log2(N)` even in the worst-case pivot distribution, guaranteeing O(log N) stack space.',
    difficulty: 'hard'
  },
  {
    id: 'hm-57',
    level: 5,
    domain: 'Algorithms & DSA',
    question: 'Which algorithm finds strongly connected components (SCCs) in a directed graph using two depth-first search passes?',
    options: [
      'Kosaraju’s Algorithm',
      'Kruskal’s Algorithm',
      'Floyd-Warshall Algorithm',
      'Bellman-Ford Algorithm'
    ],
    correctIndex: 0,
    explanation: 'Kosaraju’s algorithm computes SCCs in O(V + E) time: 1. Run DFS on the graph to order vertices by finish time. 2. Compute the transpose (reversed) graph G^T. 3. Run DFS on G^T in decreasing order of finish time to extract the SCCs.',
    difficulty: 'hard'
  },
  {
    id: 'hm-58',
    level: 5,
    domain: 'Algorithms & DSA',
    question: 'What is the runtime complexity of the Knuth-Morris-Pratt (KMP) string matching algorithm for text of length N and pattern of length M?',
    options: [
      'O(N + M) time',
      'O(N * M) time',
      'O(N log M) time',
      'O(N^2) time'
    ],
    correctIndex: 0,
    explanation: 'KMP precomputes the Longest Prefix Suffix (LPS) array of the pattern in O(M) time, then matches the text in O(N) time without backtracking the text pointer, resulting in total linear O(N + M) time complexity.',
    difficulty: 'hard'
  },
  {
    id: 'hm-59',
    level: 5,
    domain: 'Algorithms & DSA',
    question: 'In dynamic programming, what is the time complexity to solve the 0/1 Knapsack Problem with `N` items and maximum capacity `W`?',
    options: [
      'O(N * W) pseudo-polynomial time',
      'O(N + W) strictly linear time',
      'O(2^N) polynomial time',
      'O(N log W) time'
    ],
    correctIndex: 0,
    explanation: 'The standard dynamic programming solution evaluates `dp[i][w]` in O(N * W) time. Because `W` is a numeric value whose representation size in bits is `log2(W)`, the algorithm is pseudo-polynomial (exponential with respect to the input length of W).',
    difficulty: 'hard'
  },
  {
    id: 'hm-60',
    level: 5,
    domain: 'Algorithms & DSA',
    question: 'What is the purpose of the Tarjan’s Offline Least Common Ancestor (LCA) algorithm?',
    options: [
      'To compute LCAs for a batch of query pairs in a tree in O(N + Q * alpha(N)) time using Disjoint-Set Union (DSU)',
      'To sort tree edges using topological sorting in O(V^2) time',
      'To balance AVL trees during concurrent write transactions',
      'To detect cycle deadlocks in directed acyclic graphs in O(1) time'
    ],
    correctIndex: 0,
    explanation: 'Tarjan’s off-line LCA algorithm answers an entire set of Q queries concurrently during a single post-order tree traversal using the Disjoint-Set Union (Union-Find) data structure in near-linear O(N + Q * alpha(N)) time.',
    difficulty: 'hard'
  },

  // ==========================================
  // DOMAIN 8: FAANG INTERVIEW & SYSTEM DESIGN (Q61 - Q100)
  // ==========================================
  {
    id: 'hm-61',
    level: 13,
    domain: 'System Design',
    question: 'When designing a distributed URL shortener (e.g., TinyURL) serving 1 billion requests daily, what key collision-free approach generates 7-character Base62 keys?',
    options: [
      'A distributed ID generator (e.g., Twitter Snowflake) producing 64-bit unique sequential IDs, encoded into Base62',
      'Hashing the URL using MD5 and truncating the first 7 characters without collision checks',
      'Random string generation with database unique constraints and retry loops',
      'Assigning client IP address hashes directly into the URL token'
    ],
    correctIndex: 0,
    explanation: 'Using a dedicated distributed ID generator (like Twitter Snowflake or a ZooKeeper ticket server) yields globally unique, monotonic 64-bit integer IDs without database coordination bottlenecks. Converting this 64-bit ID to Base62 generates compact, guaranteed collision-free 7-character URLs.',
    difficulty: 'hard'
  },
  {
    id: 'hm-62',
    level: 13,
    domain: 'System Design',
    question: 'How does Consistent Hashing minimize data movement when a cache node is added or removed from a distributed cluster of N nodes?',
    options: [
      'Keys and nodes are mapped onto a 360-degree hash ring; adding or removing a node only redistributes an average of K/N keys to adjacent virtual nodes',
      'All keys are re-hashed uniformly across all N nodes using modular arithmetic `hash(key) % N`',
      'Every node maintains a full replica of all keys, eliminating the need for data redistribution',
      'The cluster pauses read queries and runs a global 2-Phase Commit migration'
    ],
    correctIndex: 0,
    explanation: 'Standard `hash(k) % N` requires remapping almost all keys when N changes. Consistent Hashing maps nodes and keys to a continuous hash ring. When a node is added/removed, only keys between adjacent node boundaries are migrated (on average K/N keys), minimizing cluster churn.',
    difficulty: 'hard'
  },
  {
    id: 'hm-63',
    level: 14,
    domain: 'System Design',
    question: 'What is the purpose of a "Bloom Filter" in storage engines like RocksDB, Apache Cassandra, and Google Bigtable?',
    options: [
      'To quickly determine if an SSTable disk file definitely does NOT contain a key, avoiding expensive disk seeks for non-existent reads',
      'To compress write-ahead log files using dictionary-based LZW compression',
      'To prevent deadlocks between concurrent row transactions',
      'To guarantee exact O(1) retrieval of cached values without false positives'
    ],
    correctIndex: 0,
    explanation: 'A Bloom filter is a space-efficient probabilistic data structure. It can return "definitely not in set" (no false negatives) or "probably in set" (some false positives). LSM-tree engines check the in-memory Bloom filter before reading on-disk SSTables to avoid unnecessary disk I/O.',
    difficulty: 'hard'
  },
  {
    id: 'hm-64',
    level: 14,
    domain: 'System Design',
    question: 'In LSM-tree (Log-Structured Merge-Tree) database engines, why are writes significantly faster than in traditional B-Tree databases?',
    options: [
      'Writes are appended sequentially to a memory buffer (MemTable) and a sequential WAL log, deferring expensive random I/O to background compaction',
      'LSM-trees write directly to non-volatile CPU cache registers',
      'LSM-trees bypass database locking by enforcing eventual consistency across all queries',
      'LSM-trees do not store table indexes on physical disk'
    ],
    correctIndex: 0,
    explanation: 'B-Trees require random disk writes to in-place page locations. LSM-trees convert all inserts, updates, and deletes into fast sequential append writes to a memory buffer (MemTable) and a sequential WAL log. Periodic background compaction merges immutable SSTables on disk.',
    difficulty: 'hard'
  },
  {
    id: 'hm-65',
    level: 14,
    domain: 'System Design',
    question: 'In distributed message queues (Apache Kafka), what guarantees message ordering within a topic?',
    options: [
      'Messages are strictly ordered only within a single Partition, not across the entire Topic',
      'Kafka guarantees total global ordering across all partitions via atomic clock timestamps',
      'The consumer group coordinator sorts incoming messages in memory prior to processing',
      'Topic partitions use distributed locks on every message produce request'
    ],
    correctIndex: 0,
    explanation: 'Kafka guarantees total ordering of messages strictly WITHIN a single partition. If a producer assigns a partition key (e.g., `user_id`), all messages for that key land in the same partition and are consumed in exact sequential order.',
    difficulty: 'hard'
  },
  {
    id: 'hm-66',
    level: 16,
    domain: 'System Design',
    question: 'What is the "Thundering Herd Problem" in high-concurrency caching architectures and how is it resolved?',
    options: [
      'When a hot cache key expires, thousands of concurrent requests miss simultaneously and overwhelm the backend database; resolved using mutex locking or probabilistic early expiration (XFetch)',
      'A spike in incoming network packets that exhausts the Linux kernel socket buffer',
      'Excessive background garbage collection cycles that halt Node.js event loop threads',
      'A sudden surge in DNS queries that knocks out authoritative nameservers'
    ],
    correctIndex: 0,
    explanation: 'When a popular cached item expires, all concurrent client requests find a cache miss and simultaneously query the database to rebuild the cache, crashing the database. Mutex locks (single-flight) or probabilistic early background refresh (XFetch) prevent this stampede.',
    difficulty: 'hard'
  },
  {
    id: 'hm-67',
    level: 17,
    domain: 'System Design',
    question: 'How does the Raft consensus algorithm guarantee log consistency across a distributed cluster?',
    options: [
      'A leader only commits a log entry once it is replicated across a majority of cluster nodes, and the Log Matching Property ensures matching entries imply identical prefix histories',
      'All nodes vote simultaneously on every read query via Byzantine fault consensus',
      'Nodes periodically ping a central NTP server to synchronize their state machines',
      'Transactions are executed speculatively and rolled back if a split-brain occurs'
    ],
    correctIndex: 0,
    explanation: 'Raft maintains consistency through strong leadership. A leader appends entries to its log and sends `AppendEntries` RPCs. Once a majority of followers acknowledge, the entry is committed. The Log Matching Property guarantees that if two logs contain an entry with the same index and term, they are identical up to that point.',
    difficulty: 'hard'
  },
  {
    id: 'hm-68',
    level: 18,
    domain: 'Cybersecurity',
    question: 'What is a "Server-Side Request Forgery" (SSRF) attack in a cloud environment (e.g., AWS EC2)?',
    options: [
      'Tricking the backend server into sending unauthorized HTTP requests to internal services, such as the AWS Instance Metadata Service (`http://169.254.169.254/latest/meta-data/`) to steal IAM credentials',
      'Injecting malicious JavaScript into the client’s browser to steal session cookies',
      'Flooding the cloud load balancer with spoofed UDP reflection packets',
      'Exploiting race conditions in the multi-factor authentication SMS gateway'
    ],
    correctIndex: 0,
    explanation: 'SSRF occurs when an attacker forces a web server to make requests to internal network resources. In AWS, attackers often target the internal link-local Instance Metadata Service (`169.254.169.254`) to extract temporary IAM role security credentials.',
    difficulty: 'hard'
  },
  {
    id: 'hm-69',
    level: 18,
    domain: 'Cybersecurity',
    question: 'How does PBKDF2, bcrypt, or Argon2 protect stored passwords against GPU-accelerated brute-force attacks compared to SHA-256?',
    options: [
      'They incorporate cryptographic salt, work factor iterations, and memory-hardness requirements that saturate GPU memory buses, making high-speed parallel cracking computationally prohibitive',
      'They encrypt passwords using the user’s biometrics stored in the operating system kernel',
      'They automatically rotate passwords every 30 days on the database server',
      'They transmit passwords via quantum-encrypted HTTPS tunnels'
    ],
    correctIndex: 0,
    explanation: 'Standard hashes like SHA-256 are designed for speed (gigahashes/second on GPUs). Password hashing functions like bcrypt and Argon2 are deliberately computationally expensive, salted, and memory-hard (Argon2), rendering brute-force attacks on GPUs/ASICs prohibitively expensive.',
    difficulty: 'hard'
  },
  {
    id: 'hm-70',
    level: 19,
    domain: 'Modern Architecture',
    question: 'In microservices, what problem does the Saga Pattern solve that traditional ACID two-phase commits cannot handle efficiently at scale?',
    options: [
      'Managing distributed transactions across multiple independent service databases through a sequence of local transactions and compensating transactions for rollbacks',
      'Automatically generating Swagger API documentation across multi-language microservices',
      'Encrypting inter-service gRPC communication using mutual TLS (mTLS)',
      'Scaling up Redis caching clusters across different geographical regions'
    ],
    correctIndex: 0,
    explanation: 'Two-Phase Commit (2PC) is a blocking protocol that impairs availability and scalability across distributed microservices. A Saga pattern breaks a distributed transaction into a series of local transactions coordinated via choreography or orchestration, executing compensating transactions if a failure occurs.',
    difficulty: 'hard'
  },
  {
    id: 'hm-71',
    level: 4,
    domain: 'Operating Systems',
    question: 'What is the role of the Linux OOM (Out-Of-Memory) Killer and how does it determine which process to terminate?',
    options: [
      'It assigns an `oom_score` based on process RAM utilization, memory growth rate, and `oom_score_adj`, terminating the highest-scoring process with SIGKILL',
      'It randomly selects any background process running under the `nobody` user account',
      'It sends a graceful SIGTERM signal to all running Docker containers sequentially',
      'It halts the Linux kernel and reboots the machine into single-user recovery mode'
    ],
    correctIndex: 0,
    explanation: 'When physical RAM and swap are exhausted, the kernel OOM killer calculates an `oom_score` for each process (factoring in memory consumed and `oom_score_adj`). The process with the highest score is terminated with `SIGKILL` (signal 9) to reclaim memory and save the system.',
    difficulty: 'hard'
  },
  {
    id: 'hm-72',
    level: 5,
    domain: 'Systems & Programming',
    question: 'What happens when a C program executes a division by zero with integer operands (`int c = 10 / 0;`)?',
    options: [
      'It is Undefined Behavior according to the C standard; on x86, the CPU raises an interrupt vector 0, which the OS kernel converts to a SIGFPE signal',
      'The variable `c` is assigned `NaN` (Not a Number) according to IEEE 754',
      'The variable `c` is assigned positive infinity and execution continues',
      'The compiler automatically replaces the division with a bitwise shift'
    ],
    correctIndex: 0,
    explanation: 'In C, integer division by zero is Undefined Behavior (UB). At hardware level on x86, the `IDIV` instruction raises hardware Exception 0 (#DE Divide Error), which the Linux kernel translates into a `SIGFPE` signal that terminates the process.',
    difficulty: 'hard'
  },
  {
    id: 'hm-73',
    level: 6,
    domain: 'Database Systems',
    question: 'What is the difference between a Clustered Index and a Non-Clustered (Secondary) Index in Microsoft SQL Server and MySQL InnoDB?',
    options: [
      'A clustered index dictates the physical on-disk storage order of the actual table rows at the leaf level, whereas secondary indexes store the index key and a pointer to the clustered key',
      'A table can possess up to 16 clustered indexes but only one secondary index',
      'Clustered indexes are stored in RAM while secondary indexes reside on disk',
      'Secondary indexes enforce primary key uniqueness while clustered indexes allow duplicates'
    ],
    correctIndex: 0,
    explanation: 'A clustered index determines the actual physical order of data pages on disk; the leaf pages contain the full row data. A non-clustered index stores index column values and points to the clustered index key (or row ID). Therefore, a table can only have ONE clustered index.',
    difficulty: 'hard'
  },
  {
    id: 'hm-74',
    level: 7,
    domain: 'Web Development',
    question: 'In Web Workers, what mechanism allows sharing large binary memory buffers between the main thread and worker threads with ZERO copying overhead?',
    options: [
      '`SharedArrayBuffer` combined with `Atomics` for thread-safe memory synchronization',
      '`JSON.stringify()` serialized over the `postMessage` channel',
      'Writing to the IndexedDB database and polling for changes',
      'Using local storage keys with custom window event dispatchers'
    ],
    correctIndex: 0,
    explanation: '`SharedArrayBuffer` allows multiple execution threads (main UI thread and Web Workers) to share the same physical memory chunk in real time. The `Atomics` object provides atomic operations (`add`, `load`, `store`, `compareExchange`) to prevent race conditions on shared memory.',
    difficulty: 'hard'
  },
  {
    id: 'hm-75',
    level: 15,
    domain: 'Computer Networking',
    question: 'How does HTTP/2 solve the Head-of-Line (HoL) Blocking problem present at the application layer in HTTP/1.1?',
    options: [
      'By multiplexing independent binary bidirectional streams over a single persistent TCP connection',
      'By opening 50 concurrent TCP sockets per domain name',
      'By switching from TCP to UDP datagram streaming (QUIC)',
      'By compressing HTTP request headers using Brotli compression'
    ],
    correctIndex: 0,
    explanation: 'In HTTP/1.1, multiple requests on a single connection had to wait for the preceding response to finish (Application-layer HoL blocking). HTTP/2 introduces binary framing and multiplexed streams, allowing interleaved request/response frames over a single TCP connection.',
    difficulty: 'hard'
  },
  {
    id: 'hm-76',
    level: 15,
    domain: 'Computer Networking',
    question: 'Why does HTTP/3 transition from TCP to the QUIC protocol on top of UDP?',
    options: [
      'To eliminate Transport-layer Head-of-Line blocking (where a single dropped TCP packet stalls all multiplexed streams) and enable 0-RTT connection resumption',
      'To bypass ISP bandwidth throttling on standard TCP ports 80 and 443',
      'To allow web servers to broadcast multicast packets to millions of users simultaneously',
      'To replace TLS 1.3 with a proprietary symmetric encryption algorithm'
    ],
    correctIndex: 0,
    explanation: 'In HTTP/2 over TCP, if a single packet is lost, the entire TCP connection stalls waiting for retransmission, blocking all multiplexed streams. HTTP/3 runs over QUIC (built on UDP), where packet loss in one stream does not impact or block any other stream.',
    difficulty: 'hard'
  },
  {
    id: 'hm-77',
    level: 17,
    domain: 'Cloud Architecture',
    question: 'In Amazon Web Services (AWS), what is the difference between a Security Group and a Network Access Control List (NACL)?',
    options: [
      'Security Groups are stateful and operate at the virtual instance/ENI level, while NACLs are stateless and operate at the subnet boundary level',
      'NACLs are stateful while Security Groups are stateless',
      'Security Groups only filter outgoing traffic while NACLs only filter incoming traffic',
      'Security Groups apply to IAM users while NACLs apply to VPC peering connections'
    ],
    correctIndex: 0,
    explanation: 'Security Groups are stateful (inbound return traffic is automatically allowed regardless of outbound rules) and filter at the instance/ENI level. NACLs are stateless (rules must explicitly allow both inbound and outbound traffic) and evaluate numbered rules at the subnet boundary.',
    difficulty: 'hard'
  },
  {
    id: 'hm-78',
    level: 18,
    domain: 'Cybersecurity',
    question: 'What is a "Padding Oracle Attack" against CBC (Cipher Block Chaining) mode in block ciphers like AES?',
    options: [
      'An attacker repeatedly sends ciphertext blocks and observes server responses indicating whether PKCS#7 padding is valid, decrypting ciphertext without knowing the key',
      'An attacker overflows the initialization vector (IV) to trigger a hardware fault',
      'An attacker guesses the RSA private key using floating point timing leaks',
      'An attacker intercepts TLS handshake certificates using DNS spoofing'
    ],
    correctIndex: 0,
    explanation: 'In CBC mode, if a server decrypts data and returns different error messages or timing cues based on whether the PKCS#7 padding is valid or corrupted (a padding oracle), an attacker can systematically deduce plaintext byte-by-byte in 256 attempts per byte without the decryption key.',
    difficulty: 'hard'
  },
  {
    id: 'hm-79',
    level: 20,
    domain: 'Artificial Intelligence',
    question: 'In machine learning evaluation, when is the F1-Score preferred over Accuracy?',
    options: [
      'When working with highly imbalanced datasets (e.g., fraud detection where positive cases are 0.1% of data), balancing Precision and Recall',
      'When the dataset contains strictly continuous regression targets',
      'When training unsupervised K-Means clustering algorithms',
      'When minimizing the cross-entropy loss function on GPU clusters'
    ],
    correctIndex: 0,
    explanation: 'On imbalanced datasets (e.g. 99.9% non-fraud, 0.1% fraud), a trivial model predicting "not fraud" achieves 99.9% accuracy while being completely useless. F1-Score computes the harmonic mean of Precision and Recall, accurately measuring performance on the minority class.',
    difficulty: 'hard'
  },
  {
    id: 'hm-80',
    level: 21,
    domain: 'Generative AI',
    question: 'What is the purpose of FlashAttention in optimizing Transformer training and inference on modern GPUs?',
    options: [
      'It tiles the softmax computation into GPU SRAM blocks to avoid reading and writing the large N x N attention matrix to high-bandwidth memory (HBM)',
      'It quantizes all neural network weights from 16-bit float to 1-bit binary representations',
      'It replaces matrix multiplications with bitwise XOR operations',
      'It prunes 90% of attention heads during runtime generation'
    ],
    correctIndex: 0,
    explanation: 'FlashAttention is an IO-aware exact attention algorithm. By tiling inputs into smaller blocks and computing softmax online without materializing the full N x N attention matrix in slow GPU High-Bandwidth Memory (HBM), it accelerates attention computation and reduces memory footprint by 5-10x.',
    difficulty: 'hard'
  },
  {
    id: 'hm-81',
    level: 22,
    domain: 'Blockchain',
    question: 'What is a "Sybil Attack" in peer-to-peer networks and how does Proof-of-Work (PoW) defend against it?',
    options: [
      'An adversary creates millions of pseudonymous fake identities to manipulate consensus; PoW ties voting power to scarce thermodynamic computational work rather than identity counts',
      'An attacker intercepts P2P packets and replays encrypted transactions',
      'A rogue node overflows the Bitcoin mempool with zero-fee transactions',
      'A validator double-signs blocks to claim fraudulent block rewards'
    ],
    correctIndex: 0,
    explanation: 'A Sybil attack occurs when an attacker creates many fake nodes to gain disproportionate influence over a peer-to-peer network. Proof-of-Work ties consensus power to physical computing energy (hash rate), rendering the creation of virtual identities meaningless.',
    difficulty: 'hard'
  },
  {
    id: 'hm-82',
    level: 1,
    domain: 'Foundations',
    question: 'What is the Hamming Distance between the two 8-bit binary strings 10101010 and 10111100?',
    options: [
      '3',
      '2',
      '4',
      '5'
    ],
    correctIndex: 0,
    explanation: 'Hamming distance is the number of bit positions in which two strings differ. XORing 10101010 ^ 10111100 gives 00010110. Counting the number of set bits (popcount) gives 3 (positions 3, 5, and 6 differ).',
    difficulty: 'hard'
  },
  {
    id: 'hm-83',
    level: 3,
    domain: 'Foundations',
    question: 'In cache memory systems, what is "False Sharing" in multi-threaded SMP architectures?',
    options: [
      'Independent threads on different CPU cores modify distinct variables that happen to share the same cache line (e.g. 64 bytes), triggering continuous cache invalidation traffic across cores',
      'Multiple processes read from the same memory-mapped file simultaneously',
      'The CPU branch predictor incorrectly assumes a loop will terminate early',
      'Two virtual memory pages are mapped to the same physical RAM frame'
    ],
    correctIndex: 0,
    explanation: 'CPUs read and write memory in 64-byte cache lines. If thread A on Core 1 updates variable X, and thread B on Core 2 updates variable Y, and both variables sit inside the same 64-byte cache line, the MESI cache coherence protocol continuously invalidates and reloads the line across cores, crippling performance.',
    difficulty: 'hard'
  },
  {
    id: 'hm-84',
    level: 4,
    domain: 'Operating Systems',
    question: 'What is the function of the Translation Lookaside Buffer (TLB) and what is a "TLB Shootdown"?',
    options: [
      'The TLB caches virtual-to-physical address translations; when a page table mapping is modified, other CPU cores must be interrupted via inter-processor interrupts (IPI) to flush their stale TLB entries',
      'The TLB translates ASCII characters into machine code instructions during JIT compilation',
      'A TLB shootdown occurs when physical RAM overheats and throttles memory clock cycles',
      'The TLB maps disk sectors directly to GPU framebuffers during gaming sessions'
    ],
    correctIndex: 0,
    explanation: 'The TLB is a high-speed hardware cache on the CPU that stores recent virtual-to-physical address translations. When one core invalidates or unmaps a page table entry, it must send an Inter-Processor Interrupt (IPI) to all other cores so they flush that translation from their TLBs (a TLB shootdown).',
    difficulty: 'hard'
  },
  {
    id: 'hm-85',
    level: 5,
    domain: 'Systems & Programming',
    question: 'In C, what is the effect of declaring a function pointer as `int (*fn)(int, int);` compared to `int *fn(int, int);`?',
    options: [
      '`(*fn)` declares a pointer to a function taking two ints and returning an int; `*fn` declares a function that takes two ints and returns an integer pointer (`int *`)',
      '`(*fn)` declares an inline assembly macro while `*fn` declares a standard library function',
      'Both declarations are completely identical due to C operator precedence rules',
      '`(*fn)` forces the function to be executed synchronously in kernel space'
    ],
    correctIndex: 0,
    explanation: 'In C, the function call operator `()` has higher precedence than dereference `*`. Therefore, `int *fn(int, int)` is parsed as a function returning a pointer to an int (`int *`). Parenthesizing `int (*fn)(int, int)` binds the `*` to `fn`, creating a pointer to a function.',
    difficulty: 'hard'
  },
  {
    id: 'hm-86',
    level: 6,
    domain: 'Database Systems',
    question: 'In database systems, what is a "Covering Index"?',
    options: [
      'An index that contains all columns requested by a query (in the `SELECT`, `JOIN`, and `WHERE` clauses), allowing the engine to satisfy the query entirely from the index without reading the table data pages',
      'An index that covers 100% of the rows in a partitioned table',
      'A full-text inverted index that scans binary documents for regex patterns',
      'An encrypted database index that protects sensitive PII columns'
    ],
    correctIndex: 0,
    explanation: 'A covering index is an index that includes all the columns referenced by a query (e.g. `CREATE INDEX idx_user ON users(email) INCLUDE (first_name)`). The database engine performs an "Index Only Scan" and never touches the main table heap pages, boosting read speeds by 10x-100x.',
    difficulty: 'hard'
  },
  {
    id: 'hm-87',
    level: 7,
    domain: 'Web Development',
    question: 'What is the role of the `Subresource Integrity` (SRI) attribute (`integrity="sha384-..."`) on HTML `<script>` tags?',
    options: [
      'It allows the browser to verify the cryptographic hash of a script fetched from a third-party CDN, rejecting execution if the file was modified or compromised',
      'It enables the browser to execute the script in a sandboxed WebAssembly runtime',
      'It compresses the JavaScript file over the network using gzip encryption',
      'It automatically polyfills missing ES6 features on legacy mobile devices'
    ],
    correctIndex: 0,
    explanation: 'Subresource Integrity (SRI) allows browsers to verify that resources fetched from third-party servers (like CDNs) have not been tampered with or replaced with malicious code. If the cryptographic hash doesn’t match the `integrity` attribute, the browser refuses to execute the script.',
    difficulty: 'hard'
  },
  {
    id: 'hm-88',
    level: 8,
    domain: 'Software Engineering',
    question: 'In system architecture, what is the key difference between Horizontal Scaling and Vertical Scaling?',
    options: [
      'Horizontal scaling adds more machines/nodes to the pool to distribute load, while Vertical scaling adds more power (CPU, RAM, NVMe) to an existing machine',
      'Horizontal scaling is only possible with relational SQL databases',
      'Vertical scaling introduces infinite linear elasticity across cloud regions',
      'Horizontal scaling requires shutting down all active servers during upgrades'
    ],
    correctIndex: 0,
    explanation: 'Vertical scaling (Scale Up) upgrades the compute resources (CPU, RAM) of a single server, which eventually hits hardware and cost limits. Horizontal scaling (Scale Out) adds more commodity nodes to a cluster, distributing traffic via load balancers for near-infinite scale.',
    difficulty: 'hard'
  },
  {
    id: 'hm-89',
    level: 10,
    domain: 'Software Engineering',
    question: 'In object-oriented design, what is the "Dependency Inversion Principle" (DIP)?',
    options: [
      'High-level modules should not depend on low-level modules; both should depend on abstractions (interfaces), and abstractions should not depend on details',
      'Subclasses must override all methods of their parent class to avoid memory leaks',
      'Code should be coupled tightly to concrete database implementations for speed',
      'Dependencies must be instantiated manually inside every class constructor'
    ],
    correctIndex: 0,
    explanation: 'Dependency Inversion states: 1. High-level modules should not import anything from low-level modules directly; both should depend on abstractions. 2. Abstractions should not depend on details; details should depend on abstractions. This enables flexible inversion of control (IoC).',
    difficulty: 'hard'
  },
  {
    id: 'hm-90',
    level: 11,
    domain: 'Agile & DevOps',
    question: 'What is the purpose of Git "Interactive Rebase" (`git rebase -i HEAD~N`) in clean software engineering workflows?',
    options: [
      'To modify commit history by squashing, rewording, editing, or reordering commits before merging a clean feature branch into main',
      'To force push untested branches directly to the production cluster',
      'To convert a Git repository into a Subversion (SVN) format',
      'To automatically resolve three-way merge conflicts without developer intervention'
    ],
    correctIndex: 0,
    explanation: 'Interactive rebase gives developers granular control over commit history. You can squash messy "wip" commits into a single cohesive commit, reword commit messages, split commits, or drop obsolete changes to present a clean, reviewable PR history.',
    difficulty: 'hard'
  },
  {
    id: 'hm-91',
    level: 12,
    domain: 'Agile & DevOps',
    question: 'What is the function of a Kubernetes "Ingress Controller" (e.g., NGINX or Traefik)?',
    options: [
      'To manage external HTTP/HTTPS routing, SSL termination, and path-based forwarding to internal cluster Services',
      'To monitor physical hardware memory temperatures across bare-metal server racks',
      'To compile Dockerfiles into container images inside the Kubernetes control plane',
      'To assign private IP addresses to individual container runtimes via CNI'
    ],
    correctIndex: 0,
    explanation: 'An Ingress Controller is a specialized reverse proxy that implements the Kubernetes Ingress resource. It accepts external web traffic, handles TLS/SSL termination, and routes requests to appropriate internal cluster Services based on hostname or URI path.',
    difficulty: 'hard'
  },
  {
    id: 'hm-92',
    level: 14,
    domain: 'System Design',
    question: 'In distributed caching, what is the "Write-Through" caching strategy versus "Write-Behind" (Write-Back)?',
    options: [
      'Write-Through synchronously writes to the cache and the backing database simultaneously, while Write-Behind writes to cache first and asynchronously batches writes to database',
      'Write-Through only stores data in memory while Write-Behind only writes to disk',
      'Write-Behind guarantees zero risk of data loss during power outages',
      'Write-Through invalidates the entire cache pool on every single write operation'
    ],
    correctIndex: 0,
    explanation: 'In Write-Through, the application writes to the cache, which synchronously updates the database before confirming success (high consistency, higher latency). In Write-Behind (Write-Back), the write is saved in cache and confirmed immediately, then asynchronously flushed to the database in batches (fast, but risk of data loss if cache crashes).',
    difficulty: 'hard'
  },
  {
    id: 'hm-93',
    level: 15,
    domain: 'Computer Networking',
    question: 'What is the Maximum Transmission Unit (MTU) of standard Ethernet and what happens when an IP packet exceeds the path MTU without the DF (Don’t Fragment) bit set?',
    options: [
      'Standard MTU is 1500 bytes; routers fragment the IP packet into smaller datagrams with identical Identification fields and incremental fragment offsets',
      'Standard MTU is 65535 bytes; the packet is immediately dropped and an ICMP echo reply is returned',
      'Standard MTU is 512 bytes; the sending host is disconnected from the local switch port',
      'The packet is compressed using gzip algorithm at Layer 2'
    ],
    correctIndex: 0,
    explanation: 'Standard Ethernet MTU is 1500 bytes. When a router receives an IPv4 packet larger than the egress interface MTU, and the Don’t Fragment (DF) flag is 0, the router divides the payload across multiple fragments with shared IP identification, reassembled by the destination host.',
    difficulty: 'hard'
  },
  {
    id: 'hm-94',
    level: 16,
    domain: 'Virtualization & Cloud',
    question: 'In hypervisor virtualization, what is the architectural difference between a Type-1 (Bare Metal) and Type-2 (Hosted) hypervisor?',
    options: [
      'Type-1 hypervisors (VMware ESXi, KVM, Xen) run directly on physical hardware without a host OS, while Type-2 (VirtualBox, VMware Workstation) run as an application on top of an existing host OS',
      'Type-1 hypervisors only support Windows guest operating systems',
      'Type-2 hypervisors bypass CPU virtualization extensions (VT-x / AMD-V)',
      'Type-1 hypervisors require 100% of memory to be pre-allocated to GPU compute'
    ],
    correctIndex: 0,
    explanation: 'Type-1 hypervisors (bare-metal) run directly on the host hardware to control hardware resources and manage guest operating systems (high performance, enterprise cloud). Type-2 hypervisors run inside a conventional host operating system just like other computer programs.',
    difficulty: 'hard'
  },
  {
    id: 'hm-95',
    level: 17,
    domain: 'Cloud Architecture',
    question: 'How does an Object Storage system (e.g. AWS S3, Google Cloud Storage) differ fundamentally from a Block Storage system (AWS EBS, SAN)?',
    options: [
      'Object storage stores data as immutable binary blobs with unique keys and metadata accessible via HTTP REST APIs, while block storage organizes raw disk sectors mounted as local file systems',
      'Object storage can be formatted with an NTFS or ext4 operating system filesystem',
      'Block storage offers infinite horizontal scalability across planetary regions with 99.999999999% durability',
      'Object storage requires physical fiber optic channel cables connected to each EC2 instance'
    ],
    correctIndex: 0,
    explanation: 'Object storage (S3/GCS) manages data as discrete objects containing key, value, and metadata, accessed via HTTP/REST. It is horizontally scalable with eleven-nines durability. Block storage presents raw blocks to the OS like a virtual hard drive for database and OS disks.',
    difficulty: 'hard'
  },
  {
    id: 'hm-96',
    level: 18,
    domain: 'Cybersecurity',
    question: 'What is a "Zero-Day Vulnerability"?',
    options: [
      'A software security flaw that is known to attackers or researchers, but for which the vendor has had "zero days" to release an official patch or fix',
      'A denial-of-service attack that lasts for exactly zero seconds',
      'A cryptographic certificate that has expired on day zero of installation',
      'A vulnerability discovered exclusively by automated AI penetration testing agents'
    ],
    correctIndex: 0,
    explanation: 'A zero-day vulnerability is an undisclosed or unpatched software vulnerability. Because the vendor is unaware or has not yet deployed a security update, developers have had "zero days" to fix it, posing severe exploitation risk.',
    difficulty: 'hard'
  },
  {
    id: 'hm-97',
    level: 20,
    domain: 'Artificial Intelligence',
    question: 'What is the role of the "Learning Rate" hyperparameter in Gradient Descent optimization?',
    options: [
      'It controls the step size taken in the direction of the negative gradient when updating model weights each iteration',
      'It defines the number of epochs the neural network trains for',
      'It sets the maximum batch size that fits in GPU VRAM memory',
      'It regulates the number of hidden layers created in a convolutional neural network'
    ],
    correctIndex: 0,
    explanation: 'The learning rate (`alpha` / `eta`) determines how aggressively model parameters are adjusted with respect to the loss gradient: `w = w - alpha * dL/dw`. If too small, training is excruciatingly slow; if too large, optimization can diverge and fail to find the minimum.',
    difficulty: 'hard'
  },
  {
    id: 'hm-98',
    level: 21,
    domain: 'Generative AI',
    question: 'In LLMs, what is "Hallucination" and which technique directly grounds model outputs in verified external domain documents?',
    options: [
      'The generation of plausible-sounding but factually inaccurate or fabricated information; mitigated using Retrieval-Augmented Generation (RAG)',
      'A GPU out-of-memory error during token generation',
      'The model repeating the same token in an infinite loop due to zero temperature',
      'The process of quantizing float16 model weights to integer 4-bit precision'
    ],
    correctIndex: 0,
    explanation: 'Hallucination occurs when an LLM produces outputs that sound fluent and authoritative but are factually false. Retrieval-Augmented Generation (RAG) injects verified, relevant context chunks from internal vector databases into the prompt, grounding the model’s answers in verifiable truth.',
    difficulty: 'hard'
  },
  {
    id: 'hm-99',
    level: 22,
    domain: 'Blockchain',
    question: 'What is a "51% Attack" on a Proof-of-Work blockchain network?',
    options: [
      'An entity controlling over 50% of the network’s total mining hash power can rewrite recent transaction history, reverse their own transactions (double-spending), and prevent others from mining',
      'An attacker guessing 51% of private keys on the network',
      'A software bug where 51% of peer nodes crash simultaneously due to memory leaks',
      'An attacker stealing 51% of all circulating cryptocurrency tokens from a central exchange'
    ],
    correctIndex: 0,
    explanation: 'If a single miner or coalition controls >50% of the hashing power, they can mine blocks faster in secret and broadcast a longer chain to execute a chain reorganization. This allows them to double-spend coins and censor transactions.',
    difficulty: 'hard'
  },
  {
    id: 'hm-100',
    level: 25,
    domain: 'Emerging Technologies',
    question: 'In Quantum Computing, what is the principle of "Quantum Superposition" that differentiates qubits from classical bits?',
    options: [
      'A qubit can exist in a linear combination of state |0> and state |1> simultaneously until it is measured, enabling parallel exploration of exponential state spaces',
      'A qubit transmits data faster than the speed of light through quantum wormholes',
      'A qubit stores 1000 bytes of binary ASCII characters inside a single atom',
      'A qubit completely replaces classical binary logic gates with optical laser routers'
    ],
    correctIndex: 0,
    explanation: 'A classical bit is strictly either 0 or 1. A quantum bit (qubit) can exist in a linear combination (superposition) `|psi> = alpha|0> + beta|1>` where `|alpha|^2 + |beta|^2 = 1`. A system of N qubits can represent 2^N states simultaneously, providing exponential computational parallelism for specific quantum algorithms (like Shor’s and Grover’s).',
    difficulty: 'hard'
  }
];
