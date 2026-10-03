import { Course, LearningPath, SandboxProblem, StudentProject, ResourceItem, QuizQuestion } from '../types';

export const COURSES: Course[] = [
  {
    id: 'python-software-engineers',
    title: 'Python for Software Engineers',
    category: 'Python & AI',
    difficulty: 'Beginner',
    duration: '42 Hours',
    lessonsCount: 38,
    labsCount: 12,
    description: 'Deep dive into interpreter mechanics, AST inspection, bytecode analysis, and production concurrency models.',
    rating: 4.95,
    reviewsCount: 2480,
    progressPercent: 85,
    prerequisites: ['Basic CLI proficiency', 'Text editor setup'],
    syllabus: [
      { title: 'Python Internals & CPython VM', description: 'PyObject structs, reference counting, and cycle detection garbage collection.', duration: '6h' },
      { title: 'Bytecode & Disassembly (dis)', description: 'Stack-based virtual machine execution loop, opcodes, and frame objects.', duration: '8h' },
      { title: 'Metaprogramming & AST Mutations', description: 'Custom decorators, descriptors, metaclasses, and compile-time AST transforms.', duration: '12h' },
      { title: 'Asyncio & Event Loop Topology', description: 'Cooperative multitasking, generators, coroutine state machines, and uvloop.', duration: '16h' },
    ],
  },
  {
    id: 'c-systems-programming',
    title: 'C Systems Programming & Memory',
    category: 'Systems & C',
    difficulty: 'Intermediate',
    duration: '36 Hours',
    lessonsCount: 28,
    labsCount: 9,
    description: 'Virtual memory manipulation, custom allocators, POSIX threads, and kernel-space context switching mechanics.',
    rating: 4.90,
    reviewsCount: 1240,
    progressPercent: 32,
    prerequisites: ['Basic C syntax', 'Terminal / Unix basics'],
    syllabus: [
      { title: 'Virtual Address Spaces & MMU', description: 'Page tables, page faults, mmap syscall, and zero-copy buffers.', duration: '8h' },
      { title: 'Custom Slab & Buddy Allocators', description: 'Designing memory pools, managing fragmentation, and Valgrind verification.', duration: '10h' },
      { title: 'POSIX Threads & Memory Barriers', description: 'Atomic intrinsics, cache coherency, mutex contention, and false sharing.', duration: '10h' },
      { title: 'Kernel Interfacing & Syscalls', description: 'Interrupt vectors, context switches, signals, and epoll reactor patterns.', duration: '8h' },
    ],
  },
  {
    id: 'modern-web-architecture',
    title: 'Modern Web Architecture: React & Node',
    category: 'Modern Web',
    difficulty: 'Intermediate',
    duration: '54 Hours',
    lessonsCount: 45,
    labsCount: 16,
    description: 'React concurrent rendering engine, streaming server components, V8 garbage collection, and raw WebSocket topologies.',
    rating: 4.95,
    reviewsCount: 3100,
    progressPercent: 15,
    prerequisites: ['JavaScript ES6+', 'HTML/CSS layout foundations'],
    syllabus: [
      { title: 'Fiber Reconciliation Engine', description: 'Time-slicing scheduler, priority lanes, and JSX AST compilation.', duration: '12h' },
      { title: 'Node.js Libuv Architecture', description: 'Event demultiplexing, thread pool starvation, and non-blocking streaming I/O.', duration: '14h' },
      { title: 'HTTP/2, HTTP/3 & WebTransport', description: 'Binary multiplexing, connection pooling, and distributed session management.', duration: '14h' },
      { title: 'Zero-Downtime Production Infra', description: 'Containerization, cluster mode, health checks, and graceful teardown.', duration: '14h' },
    ],
  },
  {
    id: 'practical-ai-llms',
    title: 'Practical AI & Large Language Models',
    category: 'Python & AI',
    difficulty: 'Advanced',
    duration: '48 Hours',
    lessonsCount: 32,
    labsCount: 8,
    description: 'Transformer forward pass from scratch, tokenization pipelines, vector index mathematics, and autonomous agents.',
    rating: 5.0,
    reviewsCount: 890,
    progressPercent: 0,
    prerequisites: ['Linear Algebra & Calculus', 'Python OOP & NumPy'],
    syllabus: [
      { title: 'Self-Attention & Multi-Head Math', description: 'Deriving query, key, value matrix multiplications and softmax scaling.', duration: '12h' },
      { title: 'Byte-Pair Encoding (BPE) Tokenizers', description: 'Implementing subword vocabularies and UTF-8 byte merge tables.', duration: '10h' },
      { title: 'Vector Embeddings & HNSW Graphs', description: 'Cosine distance metrics, hierarchical navigable small world index scaling.', duration: '12h' },
      { title: 'Agentic Workflows & Guardrails', description: 'Deterministic evaluation harness, tool-calling state machines, and RAG.', duration: '14h' },
    ],
  },
  {
    id: 'database-internals-distributed-sql',
    title: 'Database Internals & Distributed SQL',
    category: 'DB & DevOps',
    difficulty: 'Intermediate',
    duration: '30 Hours',
    lessonsCount: 24,
    labsCount: 6,
    description: 'Write-ahead logging (WAL), B-Tree page layout, LSM-Tree compaction, 2PC transactions, and Raft consensus loops.',
    rating: 4.90,
    reviewsCount: 760,
    progressPercent: 45,
    prerequisites: ['C or Go basics', 'File system concepts'],
    syllabus: [
      { title: 'Disk Storage & Page Layout', description: 'Slotted pages, disk frame buffers, LRU-K cache eviction, and checksums.', duration: '8h' },
      { title: 'B+ Tree Indexing & Concurrency', description: 'Node splitting, latch crabbing, and lock-free read paths.', duration: '8h' },
      { title: 'Write-Ahead Log (WAL) & Recovery', description: 'ARIES recovery protocol, compensation log records, and fsync tradeoffs.', duration: '7h' },
      { title: 'Distributed Consensus (Raft/Paxos)', description: 'Leader election, log replication quorum, and partition handling.', duration: '7h' },
    ],
  },
  {
    id: 'git-production-engineering',
    title: 'Git & Production Engineering',
    category: 'DB & DevOps',
    difficulty: 'Beginner',
    duration: '18 Hours',
    lessonsCount: 16,
    labsCount: 5,
    description: 'Git object database internals (blobs, trees, commits), rebase mechanics, CI/CD pipelines, and artifact signing.',
    rating: 4.80,
    reviewsCount: 1850,
    progressPercent: 100,
    prerequisites: ['Basic terminal CLI'],
    syllabus: [
      { title: 'Content-Addressable Object Store', description: 'SHA-1/SHA-256 DAG, blobs, trees, commit graph, and packfile delta indexing.', duration: '5h' },
      { title: 'Advanced Plumbing & Interactive Rebase', description: 'Reflog surgical recovery, cherry-pick merge conflicts, and bisect automation.', duration: '4h' },
      { title: 'CI/CD Pipelines & Test Isolation', description: 'Hermetic Docker test runners, caching strategies, and matrix jobs.', duration: '5h' },
      { title: 'Artifact Signing & Supply Chain Security', description: 'GPG signing, Cosign/Sigstore verification, and SLSA provenance.', duration: '4h' },
    ],
  },
];

export const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'path-01',
    pathNumber: 'PATH 01',
    title: 'Programming Fundamentals',
    description: 'Establish core algorithmic thinking with C and Python. Focus on memory modeling, pointers, and essential data structures.',
    duration: '8 Weeks • 4 Milestones',
    milestonesCount: 4,
    milestones: [
      { title: 'Pointer Arithmetic & Heap Layout', topics: ['Virtual stack/heap', 'Pointer dereferencing', 'Dynamic allocation'] },
      { title: 'Big-O Complexity & Tree Structures', topics: ['Binary Search Trees', 'Heap invariants', 'Worst-case asymptotics'] },
      { title: 'POSIX File Descriptors & Buffers', topics: ['Read/write syscalls', 'Standard streams', 'Buffer flushing'] },
      { title: 'Bitwise Operators & Bit Manipulation', topics: ['Bitmasks', 'Two\'s complement', 'Bit shift optimization'] },
    ],
    targetOutcome: 'Master low-level programming invariants, memory allocation mechanics, and foundational computer architecture.',
  },
  {
    id: 'path-02',
    pathNumber: 'PATH 02',
    title: 'Full-Stack Web Engineering',
    description: 'Engineered web applications built upon foundational browser runtimes, event loops, high-performance DOM diffing, and REST/GraphQL APIs.',
    duration: '10 Weeks • 5 Milestones',
    milestonesCount: 5,
    milestones: [
      { title: 'Browser Architecture & Rendering Pipeline', topics: ['Critical render path', 'Compositor layers', 'Reflow/Repaint'] },
      { title: 'React Reconciliation & Concurrent Mode', topics: ['Fiber trees', 'Priority scheduling', 'State batching'] },
      { title: 'Node.js Libuv Event Loop & Thread Pool', topics: ['Phases of event loop', 'Stream backpressure', 'IPC sockets'] },
      { title: 'JWT & OAuth 2.0 PKCE Security Specs', topics: ['Cryptographic signing', 'CSRF/XSS vectors', 'Refresh token rotation'] },
      { title: 'Production PostgreSQL & Index Optimizations', topics: ['B-Tree indexes', 'EXPLAIN ANALYZE', 'Connection pooling'] },
    ],
    targetOutcome: 'Build resilient, scalable, production-tested web applications and streaming APIs with high observability.',
  },
  {
    id: 'path-03',
    pathNumber: 'PATH 03',
    title: 'Distributed Systems & Backend',
    description: 'Scale horizontally across untrusted networks. Handle network partitions, write ahead logs, Redis memory structures, and Docker containers.',
    duration: '12 Weeks • 6 Milestones',
    milestonesCount: 6,
    milestones: [
      { title: 'Network Programming & Sockets', topics: ['TCP 3-way handshake', 'Socket buffers', 'epoll/kqueue event loops'] },
      { title: 'Go Concurrency & Memory Models', topics: ['Goroutine scheduling (GMP)', 'Channels', 'Sync primitives'] },
      { title: 'PostgreSQL Query Optimizers & Transactions', topics: ['MVCC snapshot isolation', 'WAL journals', 'ACID guarantees'] },
      { title: 'Raft Consensus & Leader Election', topics: ['Split-brain resolution', 'Log replication', 'Heartbeat timers'] },
      { title: 'Cache Invalidation & Redis Internals', topics: ['Skip lists', 'Ziplists', 'Cache penetration defense'] },
      { title: 'Distributed Tracing & Site Reliability', topics: ['OpenTelemetry', 'SLO/SLI budgeting', 'Circuit breakers'] },
    ],
    targetOutcome: 'Design fault-tolerant distributed databases, consensus protocols, and microservice meshes capable of high p99 reliability.',
  },
  {
    id: 'path-04',
    pathNumber: 'PATH 04',
    title: 'Applied AI & Machine Learning',
    description: 'Move beyond basic prompt engineering. Implement tensor operations, token embeddings, HNSW vector indexing, and autonomous evaluation loops.',
    duration: '14 Weeks • 6 Milestones',
    milestonesCount: 6,
    milestones: [
      { title: 'Matrix Calculus & Backpropagation', topics: ['Automatic differentiation', 'Jacobian matrices', 'Gradient descent'] },
      { title: 'Transformer Architecture from Scratch', topics: ['Scaled dot-product attention', 'Residual connections', 'LayerNorm'] },
      { title: 'Vector Embeddings & Search Geometry', topics: ['Cosine similarity', 'Quantization (PQ)', 'HNSW index graph'] },
      { title: 'Deterministic RAG Pipelines', topics: ['Hybrid keyword/semantic search', 'Cross-encoder re-ranking', 'Chunking'] },
      { title: 'Evaluation Harnesses & LLM Benchmarking', topics: ['Ground truth validation', 'Hallucination scoring', 'Deterministic CI'] },
      { title: 'Fine-Tuning (LoRA / QLoRA)', topics: ['Low-rank adaptation', 'Quantized weights', 'Inference optimization'] },
    ],
    targetOutcome: 'Engineer production AI software, custom vector retrieval systems, and verifiable autonomous agents.',
  },
];

export const SANDBOX_PROBLEMS: SandboxProblem[] = [
  {
    id: '104',
    codeNumber: '#104 ALGO',
    title: 'Parity & Bit Manipulation',
    category: 'EASY / BITWISE',
    difficulty: 'Beginner',
    description: 'Determine whether a 32-bit signed integer n is even or odd without using modulo (%) or division (/) operators.',
    examples: [
      { input: 'n = 7', output: 'false (Odd)', explanation: 'The least significant bit is 1, indicating odd.' },
      { input: 'n = 104', output: 'true (Even)', explanation: 'The least significant bit is 0, indicating even.' },
    ],
    constraints: [
      '-2^31 <= n <= 2^31 - 1',
      'Disallowed operators: % (modulo), / (division)',
      'Required Time Complexity: O(1)',
      'Required Space Complexity: O(1)',
    ],
    starterCode: {
      python: `def is_even(n: int) -> bool:
    # Check least significant bit using bitwise AND
    # Return True if even, False if odd
    return (n & 1) == 0

# Verification harness
if __name__ == "__main__":
    assert is_even(4) == True
    assert is_even(7) == False
    print("All local tests passed.")
`,
      c: `#include <stdbool.h>
#include <stdio.h>
#include <assert.h>

bool is_even(int n) {
    // Inspect least significant bit using bitwise AND
    return (n & 1) == 0;
}

int main(void) {
    assert(is_even(4) == true);
    assert(is_even(7) == false);
    printf("All local tests passed.\\n");
    return 0;
}
`,
      javascript: `function isEven(n) {
  // Inspect least significant bit
  return (n & 1) === 0;
}

console.assert(isEven(4) === true, "4 is even");
console.assert(isEven(7) === false, "7 is odd");
console.log("All local tests passed.");
`,
    },
    solutionCode: {
      python: `def is_even(n: int) -> bool:\n    return (n & 1) == 0`,
      c: `bool is_even(int n) {\n    return (n & 1) == 0;\n}`,
      javascript: `function isEven(n) {\n    return (n & 1) === 0;\n}`,
    },
    accuracy: '88.2%',
    submissions: '14,291',
  },
  {
    id: '101',
    codeNumber: '#101 MEM',
    title: 'Two Sum In-Place Without Realloc',
    category: 'MEDIUM / ARRAYS',
    difficulty: 'Intermediate',
    description: 'Given a sorted 0-indexed array of integers numbers, find two numbers such that they add up to a specific target number without dynamic memory allocation.',
    examples: [
      { input: 'numbers = [2,7,11,15], target = 9', output: '[1, 2]', explanation: '2 + 7 = 9. Indices are 1-based.' },
      { input: 'numbers = [2,3,4], target = 6', output: '[1, 3]', explanation: '2 + 4 = 6. Indices are 1-based.' },
    ],
    constraints: [
      '2 <= numbers.length <= 3 * 10^4',
      '-1000 <= numbers[i] <= 1000',
      'numbers is sorted in non-decreasing order',
      'Time Complexity: O(n), Space Complexity: O(1)',
    ],
    starterCode: {
      python: `from typing import List

def two_sum_sorted(numbers: List[int], target: int) -> List[int]:
    left, right = 0, len(numbers) - 1
    while left < right:
        current_sum = numbers[left] + numbers[right]
        if current_sum == target:
            return [left + 1, right + 1]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return []

if __name__ == "__main__":
    assert two_sum_sorted([2, 7, 11, 15], 9) == [1, 2]
    print("Test passed.")
`,
      c: `#include <stdio.h>
#include <assert.h>

void two_sum(const int* arr, int len, int target, int* out_i, int* out_j) {
    int left = 0, right = len - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) {
            *out_i = left + 1;
            *out_j = right + 1;
            return;
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
}
`,
      javascript: `function twoSumSorted(numbers, target) {
  let left = 0, right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    if (sum < target) left++;
    else right--;
  }
  return [];
}
`,
    },
    solutionCode: {
      python: `def two_sum_sorted(numbers, target):\n    l, r = 0, len(numbers) - 1\n    while l < r:\n        s = numbers[l] + numbers[r]\n        if s == target: return [l+1, r+1]\n        if s < target: l += 1\n        else: r -= 1\n    return []`,
      c: `void two_sum(const int* a, int len, int t, int* i, int* j) { ... }`,
      javascript: `function twoSumSorted(numbers, target) { ... }`,
    },
    accuracy: '92.4%',
    submissions: '28,104',
  },
  {
    id: '208',
    codeNumber: '#208 SYS',
    title: 'LRU Cache Eviction Policy',
    category: 'HARD / DATA STRUCTURES',
    difficulty: 'Advanced',
    description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) get and put time complexity.',
    examples: [
      { input: '["LRUCache", "put", "put", "get", "put", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2]]', output: '[null, null, null, 1, null, -1]', explanation: 'Cache of capacity 2 evicts key 2 when key 3 is inserted.' },
    ],
    constraints: [
      '1 <= capacity <= 3000',
      '0 <= key <= 10^4',
      '0 <= value <= 10^5',
      'At most 2 * 10^5 calls to get and put',
      'Strict O(1) average time complexity for both get and put',
    ],
    starterCode: {
      python: `class Node:
    def __init__(self, key: int = 0, val: int = 0):
        self.key, self.val = key, val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {}
        self.head, self.tail = Node(), Node()
        self.head.next = self.tail
        self.tail.prev = self.head

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        node = self.cache[key]
        self._remove(node)
        self._insert_head(node)
        return node.val

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self.cache[key] = node
        self._insert_head(node)
        if len(self.cache) > self.cap:
            lru = self.tail.prev
            self._remove(lru)
            del self.cache[lru.key]

    def _remove(self, node):
        p, n = node.prev, node.next
        p.next, n.prev = n, p

    def _insert_head(self, node):
        n = self.head.next
        self.head.next = node
        node.prev = self.head
        node.next = n
        n.prev = node
`,
      c: `// Double-linked list hash table implementation
#include <stdlib.h>

typedef struct Node {
    int key;
    int val;
    struct Node *prev, *next;
} Node;
`,
      javascript: `class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }
  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }
  put(key, value) {
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    if (this.map.size > this.capacity) {
      this.map.delete(this.map.keys().next().value);
    }
  }
}
`,
    },
    solutionCode: {
      python: `# Python LRUCache reference`,
      c: `// C LRUCache reference`,
      javascript: `// JS LRUCache reference`,
    },
    accuracy: '71.5%',
    submissions: '9,442',
  },
];

export const STUDENT_PROJECTS: StudentProject[] = [
  {
    id: 'kv-store',
    title: 'Distributed In-Memory Key-Value Store',
    trackBadge: 'Systems Track Capstone',
    stars: '840',
    description: 'A high-throughput Raft-replicated in-memory datastore with custom slab allocators and epoll event loops. Reaches 180K ops/sec with sub-millisecond p99 latency.',
    architectureDetails: 'Implements custom memory arena pools to eliminate libc malloc overhead under high multi-threaded contention. Raft state machine writes delta logs to non-volatile disk buffers using POSIX O_DIRECT flags.',
    stack: ['C++20', 'TCP Sockets', 'Raft Consensus', 'Epoll'],
    author: 'Alex M.',
    role: 'Staff Infrastructure Engineer',
    githubUrl: 'https://github.com/pgdev-archive/distributed-kv-raft',
  },
  {
    id: 'doc-verification-agent',
    title: 'Autonomous Document Verification Agent',
    trackBadge: 'Applied AI Capstone',
    stars: '1.2k',
    description: 'Self-correcting RAG pipeline that evaluates financial filings against SEC guidelines. Features deterministic hallucination guardrails and custom vector re-ranking.',
    architectureDetails: 'Uses hybrid dense/sparse retrieval with cross-encoder re-ranking. Incorporates an AST-driven verification loop to guarantee generated citations map 1:1 with source PDF text blocks.',
    stack: ['Python', 'LangChain', 'Qdrant Vector DB', 'Gemini Flash'],
    author: 'Elena V.',
    role: 'AI Systems Lead',
    githubUrl: 'https://github.com/pgdev-archive/autonomous-sec-verifier',
  },
  {
    id: 'code-canvas',
    title: 'Real-Time Collaborative Code Canvas',
    trackBadge: 'Full-Stack Capstone',
    stars: '520',
    description: 'Multi-cursor synchronized workspace powered by conflict-free replicated data types (CRDTs). Low-latency WebRTC data channels with deterministic undo-redo trees.',
    architectureDetails: 'Employs Yjs state vectors transmitted over binary WebSocket protocols with fallback to WebRTC mesh peer connections. Renders 60 FPS multi-cursor selections via HTML5 Canvas hardware acceleration.',
    stack: ['Next.js 14', 'WebSockets', 'Yjs CRDT', 'TypeScript'],
    author: 'Liam K.',
    role: 'Frontend Architect',
    githubUrl: 'https://github.com/pgdev-archive/collaborative-code-canvas',
  },
  {
    id: 'embedded-db',
    title: 'Micro-Engine Embedded Database',
    trackBadge: 'Databases Capstone',
    stars: '2.1k',
    description: 'A bespoke disk-backed B+Tree engine featuring ACID transaction isolation, write-ahead logging (WAL), and an embedded recursive-descent SQL compiler.',
    architectureDetails: 'Features a zero-copy page cache with LRU-K frame eviction, latch crabbing for concurrency, and an ARIES recovery manager that reconstructs database state from redo/undo log journals.',
    stack: ['Rust', 'B+Tree Storage', 'SQL Parser', 'WAL'],
    author: 'Sara D.',
    role: 'Database Internals Engineer',
    githubUrl: 'https://github.com/pgdev-archive/micro-embedded-sql',
  },
];

export const RESOURCES: ResourceItem[] = [
  {
    id: 'architecture-whitepapers',
    title: 'Architecture Whitepapers',
    category: 'PDF / WEB',
    description: 'Deep-dive technical monographs on modern distributed consensus, cache coherence, and micro-VM isolation.',
    readTime: '45 min study',
    contentMarkdown: `### Distributed Consensus & Micro-VM Isolation Whitepaper

#### 1. Raft vs Paxos State Replication
In practical distributed systems, Raft simplifies state transitions by enforcing a strict leader model:
- **Election Safety:** At most one leader can be elected in a given term.
- **Leader Append-Only:** A leader never overwrites or truncates its log; it only appends new entries.
- **Log Matching Property:** If two logs contain an entry with the same index and term, then the logs are identical in all entries up through the given index.

#### 2. Micro-VM Sandboxing (Firecracker Architecture)
Using Linux KVM (Kernel-based Virtual Machine) to run thousands of isolated environments with <5ms boot times and 5MB memory footprint.`,
  },
  {
    id: 'systems-cli-reference',
    title: 'Systems & CLI Reference',
    category: 'CHEAT SHEETS',
    description: 'High-density cheat sheets for GDB debugging, Valgrind memory leak traps, Linux epoll, and perf telemetry.',
    readTime: 'Quick Ref',
    contentMarkdown: `### Systems Programming CLI Quick Reference

#### GDB Essential Commands
- \`gdb ./binary\`: Launch executable
- \`b main.c:42\`: Set breakpoint at line 42
- \`r\`: Run executable
- \`bt\`: Backtrace stack frames
- \`p *ptr\`: Print dereferenced value
- \`x/16xb $rsp\`: Examine 16 bytes in hex at stack pointer

#### Valgrind Memory Audit
\`\`\`bash
valgrind --leak-check=full --show-leak-kinds=all --track-origins=yes ./binary
\`\`\`

#### Linux epoll API
- \`epoll_create1(0)\`
- \`epoll_ctl(epfd, EPOLL_CTL_ADD, fd, &event)\`
- \`epoll_wait(epfd, events, MAX_EVENTS, timeout_ms)\``,
  },
  {
    id: 'lead-architect-rubrics',
    title: 'Lead Architect Rubrics',
    category: 'INTERVIEWS',
    description: 'System design interview matrices used to evaluate staff-level capacity, partition tolerance, and network tradeoffs.',
    readTime: '20 min read',
    contentMarkdown: `### Staff Systems Architect Evaluation Rubric

#### Dimension 1: Fault Domains & Availability
- Does the candidate identify single points of failure (SPOF)?
- Can they design multi-region active-active vs active-passive failover with clear RTO/RPO metrics?

#### Dimension 2: Data Modeling & Consistency Boundaries
- Linearizability vs Eventual Consistency.
- Sharding schemes: Hash-based vs Range-based with hot-spot mitigation.

#### Dimension 3: Observability & Telemetry
- P99 latency budgets, distributed tracing context propagation, and graceful shedding.`,
  },
  {
    id: 'engineering-guild',
    title: 'Discord Engineering Guild',
    category: 'COMMUNITY',
    description: '12,000+ engineers discussing compiler errors, distributed system research papers, and RFC proposals.',
    readTime: 'Live Active',
    contentMarkdown: `### The _PG.Dev Engineering Guild

Join our verified discord server:
- **#systems-c-rust**: Kernel programming, slab allocation, low-level benchmarking.
- **#distributed-systems**: Consensus protocols, Paxos/Raft, database storage engines.
- **#ai-applied**: Vector search, LLM inference kernels, quantization, self-attention.
- **#rfc-proposals**: Submit architecture designs for community peer review.`,
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'In C systems programming, what is the key difference between malloc() and calloc()?',
    options: [
      'calloc() allocates memory on the stack, while malloc() allocates on the heap.',
      'calloc() zero-initializes the allocated memory buffer, whereas malloc() leaves indeterminate garbage data.',
      'malloc() is thread-safe, whereas calloc() requires manual mutex synchronization.',
      'calloc() cannot be freed with the standard free() function.',
    ],
    correctIndex: 1,
    explanation: 'calloc(num, size) allocates memory and clears all bytes to zero (zero-initialized). malloc(size) allocates uninitialized memory containing whatever bit patterns previously resided in that heap segment.',
    category: 'Systems & C',
  },
  {
    id: 'q2',
    question: 'What does HTML stand for in web engineering fundamentals?',
    options: [
      'Hyper Text Markup Language',
      'High Tech Modern Language',
      'Hyperlink Text Management Language',
      'Home Tool Markup Language',
    ],
    correctIndex: 0,
    explanation: 'HTML stands for Hyper Text Markup Language. It is the standard markup language for documents designed to be displayed in a web browser.',
    category: 'Modern Web',
  },
  {
    id: 'q3',
    question: 'Why does bitwise expression `(n & 1) == 0` evaluate to True for even integers?',
    codeSnippet: 'is_even = (n & 1) == 0',
    options: [
      'Because 1 represents the sign bit in standard IEEE 754 floating point format.',
      'In binary representation, only the least significant bit (2^0) is 1 for odd numbers and 0 for even numbers.',
      'Bitwise AND shifts all bits left by one position, eliminating odd numbers.',
      'Because all even integers are divisible by 4 in two\'s complement.',
    ],
    correctIndex: 1,
    explanation: 'In binary numbers, the units place is 2^0 = 1. All higher powers of two (2^1=2, 2^2=4, etc.) are even. Therefore, an integer is odd if and only if its least significant bit is 1, so masking with 1 yields 0 for evens.',
    category: 'Computer Fundamentals',
  },
  {
    id: 'q4',
    question: 'In database storage engines, what is the primary role of the Write-Ahead Log (WAL)?',
    options: [
      'To compress SQL table schemas into gzip archives for cold storage.',
      'To guarantee durability and atomicity by ensuring log records are flushed to non-volatile disk before dirty pages are written.',
      'To automatically generate foreign key constraints across distributed tables.',
      'To encrypt user passwords in database authentication tables.',
    ],
    correctIndex: 1,
    explanation: 'WAL enforces the Write-Ahead Logging protocol: log records describing state transitions must reach non-volatile disk storage before corresponding dirty database pages are written. This ensures crash recovery via REDO/UNDO loops.',
    category: 'DB & DevOps',
  },
];
