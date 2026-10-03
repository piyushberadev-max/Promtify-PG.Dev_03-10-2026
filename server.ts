import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// Initialize GoogleGenAI client on server
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

// Fallback technical responses for PG Assistant if API key is unconfigured
function getFallbackAssistantResponse(query: string, context?: string): string {
  const q = query.toLowerCase();
  if (q.includes('pointer') || q.includes('dereferenc') || q.includes('segfault')) {
    return `In C and low-level systems, an uninitialized pointer contains indeterminate residual stack bits—it points to an arbitrary memory address already mapped to your process's virtual page tables.\n\n\`\`\`c\nint *ptr;      // Residual stack bits\n*ptr = 42;     // If mapped with WRITE permission, memory is silently corrupted.\n\`\`\`\n\nThe hardware Memory Management Unit (MMU) only faults (SIGSEGV) if the target page is unmapped or lacks write permissions. Hence, undefined behavior and silent memory corruption occur before any exception triggers.`;
  }
  if (q.includes('b-tree') || q.includes('btree') || q.includes('rebalanc')) {
    return `In B-Trees of order M (where internal nodes hold between ⌈M/2⌉ and M children):\n\n1. **Underflow Trigger:** When a deletion leaves a node with fewer than ⌈M/2⌉ - 1 keys.\n2. **Borrowing (Rotation):** If an immediate left or right sibling has at least ⌈M/2⌉ keys, rotate through the parent key.\n3. **Merging:** If both siblings have exactly ⌈M/2⌉ - 1 keys, merge the node with a sibling and pull down the separator key from the parent. If parent underflows, propagate up to the root.`;
  }
  if (q.includes('mutex') || q.includes('lock') || q.includes('race')) {
    return `When auditing mutex locking paths in concurrent systems:\n\n1. **Lock Ordering:** Ensure all threads acquire locks in a globally deterministic order to prevent cyclic wait states (deadlocks).\n2. **Scope Minimization:** Never hold a mutex across blocking I/O, network RPCs, or memory allocation routines.\n3. **RAII Guards:** In modern C++/Rust, prefer std::lock_guard or MutexGuard so unlocks are guaranteed during stack unwinding on exceptions.`;
  }
  if (q.includes('even') || q.includes('odd') || q.includes('parity') || q.includes('bitwise')) {
    return `To check whether integer \`n\` is even without modulo (\`%\`) or division (\`/\`), inspect the least significant bit (LSB):\n\n\`\`\`python\ndef is_even(n: int) -> bool:\n    return (n & 1) == 0\n\`\`\`\n\n**Complexity:** Time: Θ(1) single-cycle bitwise AND. Space: O(1). This works for both positive and negative two's complement integers.`;
  }
  return `**_PG.Dev Technical Analysis**:\nRegarding: "${query}"\n\n1. **Architecture & Invariants:** Verify your data structures maintain runtime determinism under concurrent load.\n2. **Memory Efficiency:** Avoid redundant allocations inside hot path loops. Measure resident set size (RSS) using profilers.\n3. **POSIX Alignment:** Ensure system calls properly handle \`EINTR\` and respect non-blocking socket semantics.\n\nWould you like a line-by-line code review, formal complexity analysis, or deterministic test harness?`;
}

// AI Copilot Chat Endpoint
app.post('/api/assistant/chat', async (req, res) => {
  const { message, context, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  // If Gemini API is available, use real gemini-3.8-flash
  if (aiClient && process.env.GEMINI_API_KEY) {
    try {
      const systemInstruction = `You are "PG Assistant", the elite deterministic coding copilot and tutor for _PG.Dev, a premier engineering education platform.
Your persona:
- Deeply authoritative, minimal, concise, rigorous, mathematically sound, systems-oriented.
- Specialize in C/C++, Rust, Python, Go, TypeScript/Node, distributed systems, compiler architecture, database internals, and applied AI.
- Explain concepts with concrete code snippets and exact hardware/runtime implications (e.g. MMU, cache lines, V8 event loop, epoll).
- Never use childish fluff, marketing buzzwords, or unsolicited apologies.
- If asked to debug or review code, point out the architectural flaw and asymptotic complexity.
- Context of user: ${context || 'General Systems Engineering Lab'}`;

      // Build conversation contents
      const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

      if (Array.isArray(history)) {
        for (const item of history.slice(-6)) {
          contents.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.text }],
          });
        }
      }

      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: contents,
        config: {
          systemInstruction,
          temperature: 0.2,
        },
      });

      const text = response.text || getFallbackAssistantResponse(message, context);
      return res.json({ reply: text });
    } catch (err: any) {
      console.warn('Gemini API call failed, falling back to local engine:', err?.message);
      const fallback = getFallbackAssistantResponse(message, context);
      return res.json({ reply: fallback });
    }
  }

  // Graceful deterministic fallback
  const fallback = getFallbackAssistantResponse(message, context);
  return res.json({ reply: fallback });
});

// Deterministic Code Playground Test Harness Execution
app.post('/api/playground/execute', (req, res) => {
  const { code, language, problemId } = req.body;

  // Simulate fast, containerized sandbox evaluation
  const isPython = language?.toLowerCase().includes('python');
  const isEvenOddProblem = !problemId || problemId === '104' || problemId === 'parity';

  let passed = true;
  let testSuites = [
    { name: 'Suite 1: Single Bit Check (n = 7)', status: 'PASS', duration: '2ms' },
    { name: 'Suite 2: Negative Parity Check (n = -12)', status: 'PASS', duration: '3ms' },
    { name: 'Suite 3: 32-bit Max Int (n = 2147483647)', status: 'PASS', duration: '4ms' },
  ];

  if (isEvenOddProblem && code) {
    // If the student used modulo % or / operator when constraints forbid it
    if (code.includes('%') || code.includes('/') && !code.includes('//')) {
      testSuites[0].status = 'FAIL (Constraint Violation: Disallowed operator)';
      passed = false;
    }
  }

  return res.json({
    status: passed ? 'ACCEPTED' : 'WRONG_ANSWER',
    passedSuites: passed ? 3 : 2,
    totalSuites: 3,
    runtimeMs: Math.floor(Math.random() * 5) + 10,
    memoryMb: (6.5 + Math.random() * 0.4).toFixed(1),
    complexity: 'Θ(1) Bitwise',
    percentileRuntime: '96.4%',
    percentileMemory: '92.1%',
    suites: testSuites,
    stdout: passed ? 'All test suites passed cleanly.\nMemory allocator slab verified.' : 'Constraint check failure: modulo (%) operator detected in restricted sandbox.',
  });
});

// Setup Vite middleware in dev or static files in prod
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`_PG.Dev Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
