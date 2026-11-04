/**
 * NEXUS AI OS — 60FPS INTERACTIVE MULTI-AGENT DAG WORKFLOW STUDIO
 * Real-Time Bezier Packet Router, Web Audio Tactile Synthesizer & Multi-Target Workflow Compiler
 * Targets: n8n Workflow JSON | Python 3 Async Swarm | Model Context Protocol (FastMCP + Claude Config)
 */

(function () {
  'use strict';

  /* ==========================================================================
   * 1. WEB AUDIO API SCI-FI TACTILE SOUND SYNTHESIZER (window.NexusAudio)
   * ========================================================================== */
  class NexusAudioEngine {
    constructor() {
      this.ctx = null;
      this.enabled = true;
      this.lastTickTime = 0;
    }

    initContext() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    }

    isSoundEnabled() {
      const btn = document.getElementById('btnSoundToggle');
      if (btn && btn.dataset && btn.dataset.sound) {
        return btn.dataset.sound !== 'off';
      }
      return this.enabled;
    }

    setSoundEnabled(state) {
      this.enabled = Boolean(state);
      const btn = document.getElementById('btnSoundToggle');
      if (btn) {
        btn.setAttribute('data-sound', this.enabled ? 'on' : 'off');
        const label = btn.querySelector('.sound-label, span:last-child');
        if (label && label.textContent.toLowerCase().includes('audio')) {
          label.textContent = this.enabled ? 'AUDIO: ON' : 'AUDIO: OFF';
        } else if (btn.textContent.toLowerCase().includes('sound') || btn.textContent.toLowerCase().includes('audio')) {
          // Preserve icon if any
          const icon = btn.querySelector('svg, i, .icon');
          if (!icon) {
            btn.textContent = this.enabled ? '🔊 Audio: ON' : '🔇 Audio: OFF';
          }
        }
      }
    }

    toggle() {
      const next = !this.isSoundEnabled();
      this.setSoundEnabled(next);
      if (next) {
        this.playTick(960);
      }
      return next;
    }

    /**
     * Ultra-subtle Raycast / Linear style micro-click
     */
    playTick(freq = 1150) {
      if (!this.isSoundEnabled()) return;
      const nowMs = performance.now();
      if (nowMs - this.lastTickTime < 28) return;
      this.lastTickTime = nowMs;

      try {
        this.initContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.48, now + 0.022);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.032, now + 0.003);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.024);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.026);
      } catch (_) {}
    }

    /**
     * Harmonic telemetry chime when an autonomous agent node activates
     */
    playNodeActivate(stepIndex = 0) {
      if (!this.isSoundEnabled()) return;
      try {
        this.initContext();
        if (!this.ctx) return;

        // Pentatonic sci-fi progression (C5, D5, F5, G5, A5, C6)
        const scale = [523.25, 587.33, 698.46, 783.99, 880.0, 1046.5];
        const baseFreq = scale[stepIndex % scale.length];
        const now = this.ctx.currentTime;

        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc1.type = 'triangle';
        osc2.type = 'sine';

        osc1.frequency.setValueAtTime(baseFreq, now);
        osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.015, now + 0.14);

        osc2.frequency.setValueAtTime(baseFreq * 1.5, now);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2600, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.045, now + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.19);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.2);
        osc2.stop(now + 0.2);
      } catch (_) {}
    }

    /**
     * Lush ambient chord when all 6 DAG nodes complete verification
     */
    playSuccess() {
      if (!this.isSoundEnabled()) return;
      try {
        this.initContext();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const chord = [523.25, 659.25, 783.99, 1046.5]; // C5 Maj7/9 shimmer
        chord.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const start = now + idx * 0.038;

          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, start);
          osc.frequency.exponentialRampToValueAtTime(freq * 1.004, start + 0.36);

          gain.gain.setValueAtTime(0.0001, start);
          gain.gain.linearRampToValueAtTime(0.036, start + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.42);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(start);
          osc.stop(start + 0.45);
        });
      } catch (_) {}
    }
  }

  window.NexusAudio = new NexusAudioEngine();

  /* ==========================================================================
   * 2. SIX AUTONOMOUS AGENT NODE DEFINITIONS
   * ========================================================================== */
  const BASE_NODES = [
    {
      id: 'node-ingest',
      step: 1,
      code: 'INGEST',
      title: 'INGEST // Trigger & Telemetry',
      subtitle: 'Webhook / Schedule / GitHub Event',
      model: 'Edge-Router-v4 (Zero-Latency)',
      accent: '#38bdf8', // Sky Cyan
      glow: 'rgba(56, 189, 248, 0.38)',
      rx: 0.11,
      ry: 0.27,
      tokensPerSec: 412.4,
      avgLatencyMs: 38,
      systemPrompt:
        'You are INGEST-01, the deterministic edge telemetry gateway. Validate incoming HMAC signatures, normalize webhook payloads into strict JSON-Schema envelopes, deduplicate idempotency keys, and initialize distributed OpenTelemetry trace spans.',
      capabilities: ['HMAC-SHA256 Guard', 'JSON Schema AST', 'Idempotency Lock', 'OTel Trace Init']
    },
    {
      id: 'node-recon',
      step: 2,
      code: 'RECON',
      title: 'RECON // Deep Context Harvester',
      subtitle: 'Browser / AST / DOM / DNS Scraper',
      model: 'Gemini-2.5-Pro (2M Context)',
      accent: '#818cf8', // Indigo Violet
      glow: 'rgba(129, 140, 248, 0.38)',
      rx: 0.11,
      ry: 0.73,
      tokensPerSec: 194.8,
      avgLatencyMs: 265,
      systemPrompt:
        'You are RECON-02, an autonomous multi-modal context harvester. Traverse repository AST graphs, execute headless Chromium DOM snapshots, query vector embeddings, and assemble high-density grounding context with zero hallucination drift.',
      capabilities: ['Tree-Sitter AST', 'Playwright Stealth', 'Hybrid BM25+Vector', 'Dependency Graph']
    },
    {
      id: 'node-planner',
      step: 3,
      code: 'PLANNER',
      title: 'PLANNER // Neural Task Router',
      subtitle: 'Claude 3.7 / Gemini 2.5 / DeepSeek R1',
      model: 'DeepSeek-R1 + Claude-3.7-Sonnet',
      accent: '#c084fc', // Neon Purple
      glow: 'rgba(192, 132, 252, 0.42)',
      rx: 0.49,
      ry: 0.24,
      tokensPerSec: 148.2,
      avgLatencyMs: 390,
      systemPrompt:
        'You are PLANNER-03, the meta-cognitive DAG reasoning architect. Decompose complex objectives into verifiable atomic sub-tasks, compute critical-path execution dependencies, allocate token budgets, and define rollback invariants.',
      capabilities: ['Chain-of-Thought DAG', 'Dynamic Speculative Routing', 'Budget Governor', 'Self-Reflection']
    },
    {
      id: 'node-synth',
      step: 4,
      code: 'SYNTH',
      title: 'SYNTH // Code & Workflow Builder',
      subtitle: 'Multi-File Patch / n8n / MCP Synthesizer',
      model: 'Claude-3.7-Sonnet (Extended Thinking)',
      accent: '#2dd4bf', // Teal Cyan
      glow: 'rgba(45, 212, 191, 0.38)',
      rx: 0.49,
      ry: 0.74,
      tokensPerSec: 168.9,
      avgLatencyMs: 440,
      systemPrompt:
        'You are SYNTH-04, the principal polyglot code & workflow synthesizer. Emit deterministic multi-file diffs, type-safe Python async swarms, valid n8n workflow graphs, and FastMCP tool servers with strict error recovery.',
      capabilities: ['Unified Diff Patch', 'n8n Graph Compiler', 'FastMCP Tool Gen', 'Strict Type-Check']
    },
    {
      id: 'node-verifier',
      step: 5,
      code: 'VERIFIER',
      title: 'VERIFIER // Sandbox & CI Guard',
      subtitle: 'Unit Test / Schema / Security Gate',
      model: 'Claude-3.7-Sonnet + Firecracker VM',
      accent: '#fbbf24', // Amber Gold
      glow: 'rgba(251, 191, 36, 0.38)',
      rx: 0.86,
      ry: 0.27,
      tokensPerSec: 215.6,
      avgLatencyMs: 210,
      systemPrompt:
        'You are VERIFIER-05, the adversarial sandbox & security gatekeeper. Execute synthesized artifacts inside isolated microVMs, run pytest/vitest suites, scan for OWASP/secret leaks, and enforce 100% schema conformance before dispatch.',
      capabilities: ['MicroVM Sandbox', 'OWASP SAST Scan', 'Pytest/Vitest Runner', 'Zero-Trust Policy']
    },
    {
      id: 'node-dispatch',
      step: 6,
      code: 'DISPATCH',
      title: 'DISPATCH // Autonomous Delivery',
      subtitle: 'GitHub PR / Telegram / CRM / Webhook',
      model: 'Gemini-2.5-Flash (Ultra-Low Latency)',
      accent: '#10b981', // Emerald Green
      glow: 'rgba(16, 185, 129, 0.42)',
      rx: 0.86,
      ry: 0.73,
      tokensPerSec: 386.0,
      avgLatencyMs: 85,
      systemPrompt:
        'You are DISPATCH-06, the autonomous production delivery actuator. Open signed GitHub Pull Requests, trigger webhook callbacks, push executive telemetry digests to Slack/Telegram, and persist cryptographic audit logs.',
      capabilities: ['Signed GitHub PR', 'Slack/Telegram Rich Blocks', 'CRM Sync', 'Audit Ledger']
    }
  ];

  // Primary sequential pipeline edges + secondary verification/telemetry connections
  const DAG_EDGES = [
    { from: 0, to: 1, primary: true, label: 'normalized_event' },
    { from: 1, to: 2, primary: true, label: 'ast_context_bundle' },
    { from: 2, to: 3, primary: true, label: 'execution_dag_spec' },
    { from: 3, to: 4, primary: true, label: 'synthesized_artifact' },
    { from: 4, to: 5, primary: true, label: 'verified_attestation' },
    // Auxiliary topological bridges for visual depth
    { from: 0, to: 2, primary: false, label: 'priority_telemetry' },
    { from: 1, to: 3, primary: false, label: 'repo_embeddings' },
    { from: 2, to: 4, primary: false, label: 'assertion_invariants' }
  ];

  /* ==========================================================================
   * 3. SIX BUILT-IN PRESET AUTOMATION BLUEPRINTS
   * ========================================================================== */
  const WORKFLOW_PRESETS = {
    'wf-pr-solver': {
      id: 'wf-pr-solver',
      name: 'Autonomous GitHub PR Bug-Fix & CI Healer',
      category: 'SWE / DevSecOps',
      triggerType: 'github.pull_request.opened | check_suite.failed',
      targetLatencyMs: 1420,
      throughputTokSec: 164.8,
      summary: 'Intercepts failing GitHub Actions / Sentry stack traces, localizes root cause via AST graph traversal, synthesizes a minimal patch, verifies in Firecracker sandbox, and pushes a signed fix commit.',
      logs: [
        { node: 0, msg: 'Webhook received: `check_suite.failed` on repo `nexus-core/runtime` (PR #418, SHA `8f92c1a`).' },
        { node: 1, msg: 'Tree-Sitter AST indexed 42 files; isolated `TypeError: Cannot read properties of undefined (reading "cursor")` in `src/stream/paginator.ts:114`.' },
        { node: 2, msg: 'DeepSeek-R1 decomposed fix into 2 atomic patches: null-safe cursor guard + regression unit test in `paginator.spec.ts`.' },
        { node: 3, msg: 'Claude-3.7-Sonnet synthesized unified diff (+19 / -4 lines) preserving strict TypeScript generics.' },
        { node: 4, msg: 'Sandbox VM executed `pnpm test:unit` -> 128/128 passed in 412ms. Zero SAST vulnerabilities detected.' },
        { node: 5, msg: 'Signed commit `fix(stream): guard nullable cursor on empty page boundary` pushed to PR #418 & Slack notified.' }
      ],
      pythonCode: `#!/usr/bin/env python3
"""
NEXUS AI OS — Autonomous GitHub PR Bug-Fix & CI Healer Swarm
Blueprint ID: wf-pr-solver | Runtime: Python 3.11+ Asyncio + Anthropic / OpenAI / MCP
"""
import asyncio
import hashlib
import json
import os
from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any, Dict, List

@dataclass
class AgentTelemetry:
    node_id: str
    model: str
    latency_ms: int
    tokens_sec: float
    output: Dict[str, Any] = field(default_factory=dict)

class AutonomousPRSolverSwarm:
    def __init__(self, repo: str = "nexus-core/runtime", pr_number: int = 418):
        self.repo = repo
        self.pr_number = pr_number
        self.trace_id = hashlib.sha256(f"{repo}:{pr_number}".encode()).hexdigest()[:16]

    async def step_1_ingest(self, payload: Dict[str, Any]) -> AgentTelemetry:
        await asyncio.sleep(0.04)
        return AgentTelemetry(
            node_id="INGEST",
            model="Edge-Router-v4",
            latency_ms=38,
            tokens_sec=412.4,
            output={"repo": self.repo, "pr": self.pr_number, "trace_id": self.trace_id, "event": payload.get("event", "check_suite.failed")}
        )

    async def step_2_recon(self, ingest_ctx: Dict[str, Any]) -> AgentTelemetry:
        await asyncio.sleep(0.08)
        return AgentTelemetry(
            node_id="RECON",
            model="Gemini-2.5-Pro",
            latency_ms=265,
            tokens_sec=194.8,
            output={
                "suspect_file": "src/stream/paginator.ts",
                "line": 114,
                "ast_symbol": "AsyncCursorPaginator.nextBatch",
                "root_cause": "Unchecked undefined cursor when upstream GraphQL pageInfo.endCursor is null"
            }
        )

    async def step_3_planner(self, recon_ctx: Dict[str, Any]) -> AgentTelemetry:
        await asyncio.sleep(0.09)
        return AgentTelemetry(
            node_id="PLANNER",
            model="DeepSeek-R1 + Claude-3.7-Sonnet",
            latency_ms=390,
            tokens_sec=148.2,
            output={
                "plan_steps": [
                    "Add optional chaining and fallback sentinel in src/stream/paginator.ts",
                    "Add boundary unit test for empty cursor pagination in tests/paginator.spec.ts"
                ],
                "rollback_policy": "revert_commit_on_ci_nonzero"
            }
        )

    async def step_4_synth(self, plan_ctx: Dict[str, Any]) -> AgentTelemetry:
        await asyncio.sleep(0.11)
        patch = (
            "--- a/src/stream/paginator.ts\\n"
            "+++ b/src/stream/paginator.ts\\n"
            "@@ -112,4 +112,5 @@\\n"
            "-  const next = response.data.pageInfo.endCursor.trim();\\n"
            "+  const rawCursor = response?.data?.pageInfo?.endCursor ?? '';\\n"
            "+  const next = rawCursor.trim() || null;"
        )
        return AgentTelemetry(
            node_id="SYNTH",
            model="Claude-3.7-Sonnet",
            latency_ms=440,
            tokens_sec=168.9,
            output={"unified_diff": patch, "files_modified": 2}
        )

    async def step_5_verifier(self, synth_ctx: Dict[str, Any]) -> AgentTelemetry:
        await asyncio.sleep(0.07)
        return AgentTelemetry(
            node_id="VERIFIER",
            model="Firecracker-Sandbox-v2",
            latency_ms=210,
            tokens_sec=215.6,
            output={"unit_tests": "128/128 PASSED", "sast_status": "CLEAN", "coverage_delta": "+1.4%"}
        )

    async def step_6_dispatch(self, verify_ctx: Dict[str, Any]) -> AgentTelemetry:
        await asyncio.sleep(0.05)
        return AgentTelemetry(
            node_id="DISPATCH",
            model="Gemini-2.5-Flash",
            latency_ms=77,
            tokens_sec=386.0,
            output={
                "status": "PR_COMMIT_PUSHED",
                "commit_sha": "c491e0b",
                "pr_url": f"https://github.com/{self.repo}/pull/{self.pr_number}",
                "timestamp": datetime.now(timezone.utc).isoformat()
            }
        )

    async def run_pipeline(self) -> List[AgentTelemetry]:
        t1 = await self.step_1_ingest({"event": "check_suite.failed"})
        t2 = await self.step_2_recon(t1.output)
        t3 = await self.step_3_planner(t2.output)
        t4 = await self.step_4_synth(t3.output)
        t5 = await self.step_5_verifier(t4.output)
        t6 = await self.step_6_dispatch(t5.output)
        return [t1, t2, t3, t4, t5, t6]

if __name__ == "__main__":
    swarm = AutonomousPRSolverSwarm()
    results = asyncio.run(swarm.run_pipeline())
    print(json.dumps([r.__dict__ for r in results], indent=2))
`
    },

    'wf-lead-sniper': {
      id: 'wf-lead-sniper',
      name: 'B2B Deep OSINT Lead Enrichment & Outbound Sniper',
      category: 'Growth / Revenue AI',
      triggerType: 'webhook.high_intent_signup | HubSpot Deal Created',
      targetLatencyMs: 1290,
      throughputTokSec: 178.4,
      summary: 'Enriches incoming enterprise signups via live DNS/tech-stack fingerprinting, GitHub org activity, and SEC/hiring signals, then drafts hyper-personalized executive outbound sequences.',
      logs: [
        { node: 0, msg: 'Ingested high-intent enterprise signup: `vp-infra@acme-cloud.io` (Clearbit IP ASN matched Tier-1 FinTech).' },
        { node: 1, msg: 'Harvested DNS TXT/SPF records, detected Kubernetes + Datadog + Stripe stack, and scraped 14 open AI Engineering roles.' },
        { node: 2, msg: 'Computed ICP Fit Score: `96.4/100` (Enterprise Tier). Selected technical pain-point angle: Multi-Region LLM Latency.' },
        { node: 3, msg: 'Synthesized bespoke 3-touch executive sequence + custom ROI architecture brief for VP of Infrastructure.' },
        { node: 4, msg: 'Verified zero PII compliance violations, CAN-SPAM/GDPR conformance, and DKIM domain reputation check.' },
        { node: 5, msg: 'Synced enriched deal record to HubSpot CRM, queued Apollo sequence, and alerted #enterprise-deals on Slack.' }
      ],
      pythonCode: `#!/usr/bin/env python3
"""
NEXUS AI OS — B2B Deep OSINT Lead Enrichment & Outbound Sniper
Blueprint ID: wf-lead-sniper | Runtime: Python 3.11+ Asyncio Swarm
"""
import asyncio
import json
from datetime import datetime, timezone

class LeadSniperSwarm:
    async def enrich_and_dispatch(self, email: str = "vp-infra@acme-cloud.io"):
        domain = email.split("@")[-1]
        recon_profile = {
            "domain": domain,
            "detected_stack": ["Kubernetes", "Terraform", "Anthropic API", "Snowflake"],
            "hiring_velocity": "+14 Infra roles in 30d",
            "icp_score": 96.4
        }
        sequence = {
            "subject": f"Cutting {domain}'s multi-region LLM p99 latency by 42%",
            "body_preview": "Noticed your team scaling Kubernetes + Anthropic workloads across regions...",
            "compliance_verified": True,
            "crm_status": "HUBSPOT_DEAL_STAGE_QUALIFIED",
            "dispatched_at": datetime.now(timezone.utc).isoformat()
        }
        return {"lead": email, "recon": recon_profile, "outbound": sequence}

if __name__ == "__main__":
    print(json.dumps(asyncio.run(LeadSniperSwarm().enrich_and_dispatch()), indent=2))
`
    },

    'wf-site-auditor': {
      id: 'wf-site-auditor',
      name: 'Full-Stack Security, Core Web Vitals & A11y Auditor',
      category: 'Web Perf / SecOps',
      triggerType: 'cron.hourly | vercel.deployment.ready',
      targetLatencyMs: 1540,
      throughputTokSec: 152.1,
      summary: 'Launches headless Chromium against preview deployments, audits LCP/CLS layout shifts, WCAG 2.2 AA contrast, and CSP headers, then auto-generates concrete CSS/HTML remediation patches.',
      logs: [
        { node: 0, msg: 'Triggered by `vercel.deployment.ready` on preview URL `https://staging-app.nexus.dev`.' },
        { node: 1, msg: 'Captured DOM performance trace: LCP `2.84s` (hero image unprioritized), 2 missing ARIA labels, and permissive `script-src` CSP.' },
        { node: 2, msg: 'Prioritized 3 zero-regression fixes: add `fetchpriority="high"`, inject strict CSP nonce header, and patch ARIA attributes.' },
        { node: 3, msg: 'Generated Next.js `middleware.ts` CSP nonce patch and optimized `<Image priority />` component diff.' },
        { node: 4, msg: 'Re-ran Lighthouse CI in sandbox: LCP dropped to `1.12s` (+39% speed), Accessibility `100/100`, Security Grade `A+`.' },
        { node: 5, msg: 'Published interactive audit report & opened automated optimization PR #509.' }
      ],
      pythonCode: `#!/usr/bin/env python3
"""
NEXUS AI OS — Autonomous Security, Core Web Vitals & Accessibility Auditor
Blueprint ID: wf-site-auditor | Runtime: Python 3.11+ Asyncio Swarm
"""
import asyncio
import json

async def run_site_audit(target_url: str = "https://staging-app.nexus.dev"):
    await asyncio.sleep(0.05)
    return {
        "target": target_url,
        "metrics_before": {"lcp_ms": 2840, "cls": 0.14, "a11y_score": 88, "csp_grade": "B"},
        "remediation_patch": {
            "middleware.ts": "Added cryptographic nonce to Content-Security-Policy header",
            "HeroSection.tsx": "Added fetchPriority='high' and explicit aspect-ratio container"
        },
        "metrics_after_sandbox": {"lcp_ms": 1120, "cls": 0.01, "a11y_score": 100, "csp_grade": "A+"},
        "status": "VERIFIED_AND_PR_OPENED"
    }

if __name__ == "__main__":
    print(json.dumps(asyncio.run(run_site_audit()), indent=2))
`
    },

    'wf-rag-indexer': {
      id: 'wf-rag-indexer',
      name: 'Hybrid Vector + Knowledge Graph RAG Ingestion Engine',
      category: 'Data / Knowledge AI',
      triggerType: 's3.object.created | notion.page.updated',
      targetLatencyMs: 1380,
      throughputTokSec: 189.6,
      summary: 'Streams enterprise PDFs, Markdown docs, and Notion pages through semantic chunking, extracts entity-relationship triples into Neo4j, and upserts hybrid dense+sparse vectors into Qdrant.',
      logs: [
        { node: 0, msg: 'Detected 18 updated architecture RFC documents in `s3://nexus-knowledge-vault/rfcs/`.' },
        { node: 1, msg: 'Parsed layout-aware Markdown + tables; extracted 142 semantic chunks with sliding context windows.' },
        { node: 2, msg: 'Extracted 86 canonical Knowledge Graph triples `(Service)-[DEPENDS_ON]->(Database)` via Gemini-2.5-Pro.' },
        { node: 3, msg: 'Computed 1536-d dense embeddings + SPLADE sparse lexical vectors for hybrid reciprocal rank fusion (RRF).' },
        { node: 4, msg: 'Executed retrieval eval benchmark: Recall@5 hit `98.7%` (+9.2% over baseline naive chunking) with zero PII leakage.' },
        { node: 5, msg: 'Committed atomic index snapshot `snap-2026-11-04` to Qdrant + Neo4j cluster and refreshed MCP RAG endpoint.' }
      ],
      pythonCode: `#!/usr/bin/env python3
"""
NEXUS AI OS — Hybrid Vector + Knowledge Graph RAG Ingestion Engine
Blueprint ID: wf-rag-indexer | Runtime: Python 3.11+ Asyncio Swarm
"""
import asyncio
import json

async def ingest_hybrid_rag(bucket_uri: str = "s3://nexus-knowledge-vault/rfcs/"):
    await asyncio.sleep(0.05)
    return {
        "source": bucket_uri,
        "documents_processed": 18,
        "semantic_chunks": 142,
        "knowledge_graph_triples": 86,
        "vector_index": "qdrant://nexus_prod_hybrid_v4",
        "eval_recall_at_5": 0.987,
        "status": "INDEX_COMMITTED"
    }

if __name__ == "__main__":
    print(json.dumps(asyncio.run(ingest_hybrid_rag()), indent=2))
`
    },

    'wf-video-factory': {
      id: 'wf-video-factory',
      name: 'Autonomous Short-Form Technical Video & TTS Pipeline',
      category: 'Media / Multimodal AI',
      triggerType: 'rss.arxiv_trending | github.release.published',
      targetLatencyMs: 1610,
      throughputTokSec: 144.5,
      summary: 'Transforms new GitHub releases or ArXiv papers into high-retention 60-second technical explainers with synchronized neural voiceover, Manim/Canvas motion diagrams, and burned-in kinetic captions.',
      logs: [
        { node: 0, msg: 'Triggered on new release `v4.2.0` of `nexus-ai/dag-runtime` with changelog & benchmark deltas.' },
        { node: 1, msg: 'Extracted key benchmark wins (+60fps Canvas Packet Router, -45% memory footprint) and code snippets.' },
        { node: 2, msg: 'Scripted 5-scene storyboard with hook, architecture breakdown, and frame-accurate visual cues.' },
        { node: 3, msg: 'Synthesized 48kHz studio neural narration + 1080x1920 60fps motion graphics timeline and word-level SRT.' },
        { node: 4, msg: 'Verified loudness normalization (-14 LUFS), zero frame drops, and caption timing accuracy (+/- 12ms).' },
        { node: 5, msg: 'Published MP4 master to CDN & scheduled multi-platform release (YouTube Shorts, X, LinkedIn).' }
      ],
      pythonCode: `#!/usr/bin/env python3
"""
NEXUS AI OS — Autonomous Multimodal Technical Video & TTS Factory
Blueprint ID: wf-video-factory | Runtime: Python 3.11+ Asyncio Swarm
"""
import asyncio
import json

async def render_release_explainer(release_tag: str = "v4.2.0"):
    await asyncio.sleep(0.05)
    return {
        "release": release_tag,
        "resolution": "1080x1920@60fps",
        "audio_master": "-14.0 LUFS Studio Neural TTS",
        "scenes_rendered": 5,
        "cdn_artifact": f"https://cdn.nexus.dev/media/explainer-{release_tag}.mp4",
        "status": "PUBLISHED_MULTI_CHANNEL"
    }

if __name__ == "__main__":
    print(json.dumps(asyncio.run(render_release_explainer()), indent=2))
`
    },

    'wf-devops-healer': {
      id: 'wf-devops-healer',
      name: 'Kubernetes / Cloud Incident Auto-Remediation Swarm',
      category: 'SRE / Autonomous Infra',
      triggerType: 'pagerduty.incident.triggered | prometheus.oom_kill',
      targetLatencyMs: 1180,
      throughputTokSec: 204.2,
      summary: 'Correlates Prometheus latency spikes with Kubernetes pod OOMKills and recent Helm deployments, isolates memory-leaking worker revisions, executes safe canary rollback, and posts root-cause postmortem.',
      logs: [
        { node: 0, msg: 'PagerDuty P1 Alert ingested: `PodOOMKilled` spike in namespace `prod-inference` (cluster `us-east-1-eks`).' },
        { node: 1, msg: 'Queried Prometheus + Loki logs: heap exhaustion started 6m after Helm revision `r84` (`v2.9.4-canary`).' },
        { node: 2, msg: 'Formulated zero-downtime remediation plan: drain canary pods, rollback Helm release to `r83`, scale HPA buffer +20%.' },
        { node: 3, msg: 'Synthesized signed `kubectl` + `helm rollback` runbook and updated memory limit manifest patch.' },
        { node: 4, msg: 'Validated cluster health post-rollback: p99 latency stabilized at `42ms`, 0 OOMKills over 180s observation window.' },
        { node: 5, msg: 'Auto-resolved PagerDuty incident #9042 and published timeline postmortem to Notion & #sre-war-room.' }
      ],
      pythonCode: `#!/usr/bin/env python3
"""
NEXUS AI OS — Autonomous Kubernetes Incident Healer & Rollback Swarm
Blueprint ID: wf-devops-healer | Runtime: Python 3.11+ Asyncio Swarm
"""
import asyncio
import json

async def heal_k8s_incident(cluster: str = "us-east-1-eks", namespace: str = "prod-inference"):
    await asyncio.sleep(0.05)
    return {
        "cluster": cluster,
        "namespace": namespace,
        "detected_anomaly": "OOMKill spike in deployment/inference-worker (Helm rev r84)",
        "remediation_executed": "helm rollback inference-worker 83 --wait",
        "post_check_p99_ms": 42,
        "pagerduty_status": "AUTO_RESOLVED"
    }

if __name__ == "__main__":
    print(json.dumps(asyncio.run(heal_k8s_incident()), indent=2))
`
    }
  };

  /* ==========================================================================
   * 4. DYNAMIC CUSTOM MISSION COMPILER & MULTI-TARGET CODE GENERATORS
   * ========================================================================== */
  function buildCustomBlueprint(customPromptText) {
    const cleanPrompt = (customPromptText || '').trim();
    const shortTitle = cleanPrompt.length > 58 ? cleanPrompt.slice(0, 55) + '...' : cleanPrompt;
    const slug = cleanPrompt
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 32) || 'custom-mission';

    return {
      id: `wf-custom-${slug}`,
      name: `Custom Mission // ${shortTitle}`,
      category: 'Custom Autonomous Swarm',
      triggerType: 'nexus.mission.custom_prompt',
      targetLatencyMs: 1360,
      throughputTokSec: 172.5,
      summary: `Custom multi-agent execution graph dynamically compiled for mission: "${cleanPrompt}"`,
      logs: [
        { node: 0, msg: `Mission directive ingested & schema-validated: "${shortTitle}"` },
        { node: 1, msg: `RECON harvested live domain context, dependency ASTs, and grounding telemetry for "${slug}".` },
        { node: 2, msg: `PLANNER (DeepSeek-R1 + Claude 3.7) decomposed mission into 4 parallelizable execution stages with strict rollback guards.` },
        { node: 3, msg: `SYNTH generated production Python 3 Asyncio Swarm, n8n workflow topology, and FastMCP server bindings.` },
        { node: 4, msg: `VERIFIER executed schema assertions & security policy gates inside isolated Firecracker sandbox (100% pass).` },
        { node: 5, msg: `DISPATCH delivered verified execution artifacts & emitted cryptographic OpenTelemetry completion receipt.` }
      ],
      pythonCode: `#!/usr/bin/env python3
"""
NEXUS AI OS — Custom Autonomous Multi-Agent Swarm
Mission Directive: ${cleanPrompt.replace(/"/g, '\\"')}
Generated dynamically by SYNTH-04 Compiler
"""
import asyncio
import json
from datetime import datetime, timezone

MISSION_DIRECTIVE = ${JSON.stringify(cleanPrompt)}

class CustomNexusSwarm:
    def __init__(self, directive: str = MISSION_DIRECTIVE):
        self.directive = directive

    async def execute_dag(self):
        stages = [
            {"node": "INGEST", "status": "VERIFIED", "detail": "Validated custom mission envelope"},
            {"node": "RECON", "status": "VERIFIED", "detail": "Harvested grounding context & domain signals"},
            {"node": "PLANNER", "status": "VERIFIED", "detail": "Constructed 6-node topological execution plan"},
            {"node": "SYNTH", "status": "VERIFIED", "detail": "Synthesized deterministic code & tool bindings"},
            {"node": "VERIFIER", "status": "VERIFIED", "detail": "Passed sandbox assertions & security checks"},
            {"node": "DISPATCH", "status": "VERIFIED", "detail": "Dispatched final payload & telemetry digest"},
        ]
        await asyncio.sleep(0.05)
        return {
            "mission": self.directive,
            "completed_at": datetime.now(timezone.utc).isoformat(),
            "nodes_verified": "6/6",
            "stages": stages
        }

if __name__ == "__main__":
    swarm = CustomNexusSwarm()
    print(json.dumps(asyncio.run(swarm.execute_dag()), indent=2))
`
    };
  }

  /**
   * Generates a valid, directly importable n8n Workflow JSON (nodes + connections)
   */
  function compileN8nWorkflowJson(blueprint, nodesState) {
    const n8nNodes = nodesState.map((n, idx) => {
      const logEntry = blueprint.logs[idx] ? blueprint.logs[idx].msg : n.subtitle;
      const isTrigger = idx === 0;
      return {
        parameters: isTrigger
          ? {
              httpMethod: 'POST',
              path: `nexus/${blueprint.id}`,
              responseMode: 'onReceived',
              options: { rawBody: true }
            }
          : {
              jsCode: `// ${n.title}\n// Model: ${n.model}\n// Action: ${logEntry.replace(/\n/g, ' ')}\nreturn $input.all().map(item => ({\n  json: {\n    ...item.json,\n    ${n.code.toLowerCase()}_status: "VERIFIED",\n    ${n.code.toLowerCase()}_model: ${JSON.stringify(n.model)},\n    ${n.code.toLowerCase()}_timestamp: new Date().toISOString()\n  }\n}));`
            },
        id: `nexus-${n.id}-${idx + 1}`,
        name: `${idx + 1}. ${n.code} (${n.model.split(' ')[0]})`,
        type: isTrigger ? 'n8n-nodes-base.webhook' : 'n8n-nodes-base.code',
        typeVersion: 2,
        position: [Math.round(n.rx * 1100), Math.round(n.ry * 520)]
      };
    });

    const connections = {};
    for (let i = 0; i < n8nNodes.length - 1; i++) {
      const sourceName = n8nNodes[i].name;
      const targetName = n8nNodes[i + 1].name;
      connections[sourceName] = {
        main: [
          [
            {
              node: targetName,
              type: 'main',
              index: 0
            }
          ]
        ]
      };
    }

    const workflowDoc = {
      name: `NEXUS AI OS // ${blueprint.name}`,
      nodes: n8nNodes,
      connections,
      active: true,
      settings: {
        executionOrder: 'v1',
        saveManualExecutions: true,
        callerPolicy: 'workflowsFromSameOwner'
      },
      meta: {
        templateCredsSetupCompleted: true,
        nexusBlueprintId: blueprint.id,
        compiledAt: new Date().toISOString(),
        architecture: '6-Node Autonomous Multi-Agent DAG'
      }
    };

    return JSON.stringify(workflowDoc, null, 2);
  }

  /**
   * Generates a complete `claude_desktop_config.json` + FastMCP Server definition bundle
   */
  function compileMcpConfigBundle(blueprint, nodesState) {
    const bundle = {
      mcpServers: {
        'nexus-autonomous-dag': {
          command: 'uv',
          args: [
            'run',
            '--with',
            'fastmcp',
            '--with',
            'httpx',
            'fastmcp',
            'run',
            `nexus_${blueprint.id.replace(/-/g, '_')}_mcp.py`
          ],
          env: {
            NEXUS_BLUEPRINT_ID: blueprint.id,
            NEXUS_MISSION_NAME: blueprint.name,
            NEXUS_LOG_LEVEL: 'INFO',
            ANTHROPIC_API_KEY: '${ANTHROPIC_API_KEY}',
            GEMINI_API_KEY: '${GEMINI_API_KEY}'
          }
        }
      },
      nexusFastMcpServerSpec: {
        serverName: `nexus-${blueprint.id}`,
        protocolVersion: '2025-06-18',
        exposedTools: nodesState.map((n, idx) => ({
          name: `nexus_${n.code.toLowerCase()}_agent`,
          description: `${n.title} — ${blueprint.logs[idx] ? blueprint.logs[idx].msg : n.subtitle}`,
          model: n.model,
          inputSchema: {
            type: 'object',
            properties: {
              trace_id: { type: 'string', description: 'Distributed OpenTelemetry trace identifier' },
              payload: { type: 'object', description: 'Input context envelope for this DAG stage' }
            },
            required: ['trace_id', 'payload']
          }
        })),
        fastMcpPythonServerStub: [
          'from fastmcp import FastMCP',
          `mcp = FastMCP("NEXUS // ${blueprint.name}")`,
          '',
          '@mcp.tool()',
          `async def execute_${blueprint.id.replace(/-/g, '_')}(directive: str = ${JSON.stringify(blueprint.name)}) -> dict:`,
          '    """Execute the full 6-node verified NEXUS autonomous DAG pipeline via MCP."""',
          '    return {',
          `        "blueprint": ${JSON.stringify(blueprint.id)},`,
          '        "directive": directive,',
          '        "nodes_verified": ["INGEST", "RECON", "PLANNER", "SYNTH", "VERIFIER", "DISPATCH"],',
          '        "status": "VERIFIED"',
          '    }',
          '',
          'if __name__ == "__main__":',
          '    mcp.run()'
        ].join('\n')
      }
    };

    return JSON.stringify(bundle, null, 2);
  }

  /* ==========================================================================
   * 5. 60FPS INTERACTIVE HTML5 CANVAS DAG ENGINE & CONTROLLER
   * ========================================================================== */
  class NexusDagStudio {
    constructor() {
      this.canvas = null;
      this.ctx = null;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.width = 900;
      this.height = 460;

      // Clone base nodes with live state
      this.nodes = BASE_NODES.map((n, idx) => ({
        ...n,
        index: idx,
        x: 0,
        y: 0,
        w: 212,
        h: 88,
        status: 'IDLE', // 'IDLE' | 'RUNNING' | 'VERIFIED'
        pulsePhase: idx * 0.9,
        activeIntensity: 0
      }));

      this.selectedNodeIndex = 2; // Default inspect PLANNER or active node
      this.hoveredNodeIndex = -1;
      this.draggingNodeIndex = -1;
      this.dragOffsetX = 0;
      this.dragOffsetY = 0;

      // Active workflow state
      this.currentPresetId = 'wf-pr-solver';
      this.currentBlueprint = WORKFLOW_PRESETS['wf-pr-solver'];
      this.activeExportFormat = 'python'; // 'python' | 'n8n' | 'mcp'
      this.isRunning = false;
      this.loopEnabled = false;
      this.runToken = 0;

      // Flowing bezier data packets
      this.packets = [];
      this.ambientParticles = [];
      this.lastFrameTime = performance.now();

      this.initAmbientParticles();
    }

    initAmbientParticles() {
      this.ambientParticles = [];
      DAG_EDGES.forEach((edge, idx) => {
        const count = edge.primary ? 2 : 1;
        for (let i = 0; i < count; i++) {
          this.ambientParticles.push({
            edgeIndex: idx,
            t: (i / count + idx * 0.13) % 1,
            speed: edge.primary ? 0.0022 : 0.0014,
            size: edge.primary ? 2.2 : 1.5
          });
        }
      });
    }

    mount() {
      this.canvas = document.getElementById('dagCanvas');
      if (this.canvas) {
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvasSizing();
        this.bindCanvasEvents();
      }

      this.bindUiControls();
      this.updateInspector(this.nodes[this.selectedNodeIndex]);
      this.renderCodeOutput();

      if (this.canvas) {
        requestAnimationFrame((ts) => this.animate(ts));
      }

      // Auto-run initial demonstration pipeline on page load
      setTimeout(() => {
        this.runWorkflow(this.currentPresetId);
      }, 420);
    }

    setupCanvasSizing() {
      if (!this.canvas) return;

      const updateSize = () => {
        const rect = this.canvas.getBoundingClientRect();
        const parentRect = this.canvas.parentElement
          ? this.canvas.parentElement.getBoundingClientRect()
          : null;

        const targetW = Math.max(rect.width || (parentRect ? parentRect.width : 880), 320);
        const targetH = Math.max(rect.height || (parentRect ? parentRect.height : 440), 340);

        this.dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.width = targetW;
        this.height = targetH;

        this.canvas.width = Math.round(this.width * this.dpr);
        this.canvas.height = Math.round(this.height * this.dpr);

        // Adapt node card dimensions to viewport width
        const compact = this.width < 680;
        const nw = compact ? Math.max(136, Math.min(168, this.width * 0.27)) : Math.min(220, Math.max(176, this.width * 0.225));
        const nh = compact ? 74 : 88;

        this.nodes.forEach((n) => {
          n.w = nw;
          n.h = nh;
          if (!n.userDragged) {
            n.x = Math.max(16, Math.min(this.width - nw - 16, n.rx * this.width - nw * 0.35));
            n.y = Math.max(18, Math.min(this.height - nh - 18, n.ry * this.height - nh * 0.5));
          } else {
            n.x = Math.max(10, Math.min(this.width - nw - 10, n.x));
            n.y = Math.max(10, Math.min(this.height - nh - 10, n.y));
          }
        });
      };

      updateSize();
      window.addEventListener('resize', updateSize, { passive: true });
      if (typeof ResizeObserver !== 'undefined' && this.canvas.parentElement) {
        const ro = new ResizeObserver(() => updateSize());
        ro.observe(this.canvas.parentElement);
      }
    }

    getCanvasCoords(evt) {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = evt.touches && evt.touches[0] ? evt.touches[0].clientX : evt.clientX;
      const clientY = evt.touches && evt.touches[0] ? evt.touches[0].clientY : evt.clientY;
      return {
        x: ((clientX - rect.left) / (rect.width || 1)) * this.width,
        y: ((clientY - rect.top) / (rect.height || 1)) * this.height
      };
    }

    hitTestNode(x, y) {
      for (let i = this.nodes.length - 1; i >= 0; i--) {
        const n = this.nodes[i];
        if (x >= n.x && x <= n.x + n.w && y >= n.y && y <= n.y + n.h) {
          return i;
        }
      }
      return -1;
    }

    bindCanvasEvents() {
      if (!this.canvas) return;

      const onPointerDown = (e) => {
        const pt = this.getCanvasCoords(e);
        const hitIdx = this.hitTestNode(pt.x, pt.y);
        if (hitIdx !== -1) {
          this.draggingNodeIndex = hitIdx;
          this.selectedNodeIndex = hitIdx;
          const node = this.nodes[hitIdx];
          this.dragOffsetX = pt.x - node.x;
          this.dragOffsetY = pt.y - node.y;
          this.canvas.style.cursor = 'grabbing';
          window.NexusAudio.playTick(1280);
          this.updateInspector(node);
          if (e.cancelable) e.preventDefault();
        }
      };

      const onPointerMove = (e) => {
        const pt = this.getCanvasCoords(e);
        if (this.draggingNodeIndex !== -1) {
          const node = this.nodes[this.draggingNodeIndex];
          node.userDragged = true;
          node.x = Math.max(10, Math.min(this.width - node.w - 10, pt.x - this.dragOffsetX));
          node.y = Math.max(10, Math.min(this.height - node.h - 10, pt.y - this.dragOffsetY));
          // Keep normalized rx/ry updated for n8n export coordinates
          node.rx = Number(((node.x + node.w * 0.35) / Math.max(this.width, 1)).toFixed(3));
          node.ry = Number(((node.y + node.h * 0.5) / Math.max(this.height, 1)).toFixed(3));
          return;
        }

        const hitIdx = this.hitTestNode(pt.x, pt.y);
        if (hitIdx !== this.hoveredNodeIndex) {
          this.hoveredNodeIndex = hitIdx;
          this.canvas.style.cursor = hitIdx !== -1 ? 'grab' : 'default';
          if (hitIdx !== -1) {
            window.NexusAudio.playTick(1420);
            this.updateInspector(this.nodes[hitIdx]);
          }
        }
      };

      const onPointerUp = () => {
        if (this.draggingNodeIndex !== -1) {
          this.draggingNodeIndex = -1;
          this.canvas.style.cursor = this.hoveredNodeIndex !== -1 ? 'grab' : 'default';
          if (this.activeExportFormat === 'n8n') {
            this.renderCodeOutput();
          }
        }
      };

      this.canvas.addEventListener('mousedown', onPointerDown);
      window.addEventListener('mousemove', onPointerMove, { passive: true });
      window.addEventListener('mouseup', onPointerUp, { passive: true });

      this.canvas.addEventListener('touchstart', onPointerDown, { passive: false });
      window.addEventListener('touchmove', onPointerMove, { passive: true });
      window.addEventListener('touchend', onPointerUp, { passive: true });

      // Double click canvas background to reset node layout
      this.canvas.addEventListener('dblclick', (e) => {
        const pt = this.getCanvasCoords(e);
        if (this.hitTestNode(pt.x, pt.y) === -1) {
          this.resetLayout();
        }
      });
    }

    resetLayout() {
      BASE_NODES.forEach((base, idx) => {
        const n = this.nodes[idx];
        n.rx = base.rx;
        n.ry = base.ry;
        n.userDragged = false;
        n.x = Math.max(16, Math.min(this.width - n.w - 16, n.rx * this.width - n.w * 0.35));
        n.y = Math.max(18, Math.min(this.height - n.h - 18, n.ry * this.height - n.h * 0.5));
      });
      window.NexusAudio.playTick(980);
      if (this.activeExportFormat === 'n8n') {
        this.renderCodeOutput();
      }
    }

    /* ========================================================================
     * UI CONTROLS & PRESET / COMPILER BINDINGS
     * ======================================================================== */
    bindUiControls() {
      // 1. Sound toggle button (#btnSoundToggle)
      const soundBtn = document.getElementById('btnSoundToggle');
      if (soundBtn && !soundBtn.dataset.dagBound) {
        soundBtn.dataset.dagBound = 'true';
        soundBtn.addEventListener('click', () => {
          window.NexusAudio.toggle();
        });
      }

      // 2. Preset selectors (buttons with data-preset / data-workflow / IDs / select dropdown)
      const presetIds = Object.keys(WORKFLOW_PRESETS);
      presetIds.forEach((pid) => {
        const byId = document.getElementById(pid);
        if (byId && !byId.dataset.dagBound) {
          byId.dataset.dagBound = 'true';
          byId.addEventListener('click', () => {
            this.selectPreset(pid);
          });
        }
      });

      document.querySelectorAll('[data-preset], [data-workflow], .dag-preset-btn, .preset-btn').forEach((el) => {
        if (el.dataset.dagBound) return;
        const pid = el.getAttribute('data-preset') || el.getAttribute('data-workflow') || el.id;
        if (pid && WORKFLOW_PRESETS[pid]) {
          el.dataset.dagBound = 'true';
          el.addEventListener('click', () => {
            this.selectPreset(pid);
          });
        }
      });

      const presetSelect = document.getElementById('dagPresetSelect') || document.getElementById('workflowPresetSelect');
      if (presetSelect && !presetSelect.dataset.dagBound) {
        presetSelect.dataset.dagBound = 'true';
        presetSelect.addEventListener('change', (e) => {
          const val = e.target.value;
          if (WORKFLOW_PRESETS[val]) {
            this.selectPreset(val);
          }
        });
      }

      // 3. Custom Mission Input (#dagCustomPrompt) + Run buttons
      const customInput = document.getElementById('dagCustomPrompt');
      if (customInput && !customInput.dataset.dagBound) {
        customInput.dataset.dagBound = 'true';
        customInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const val = customInput.value.trim();
            if (val) {
              this.runWorkflow(null, val);
            } else {
              this.runWorkflow(this.currentPresetId);
            }
          }
        });
      }

      const runBtnIds = ['btnRunDag', 'btnExecuteDag', 'dagRunBtn', 'btnDeploySwarm'];
      runBtnIds.forEach((id) => {
        const btn = document.getElementById(id);
        if (btn && !btn.dataset.dagBound) {
          btn.dataset.dagBound = 'true';
          btn.addEventListener('click', () => {
            const customVal = customInput ? customInput.value.trim() : '';
            if (customVal) {
              this.runWorkflow(null, customVal);
            } else {
              this.runWorkflow(this.currentPresetId);
            }
          });
        }
      });

      // 4. Loop Mode Toggle (#btnLoopDag)
      const loopBtn = document.getElementById('btnLoopDag');
      if (loopBtn && !loopBtn.dataset.dagBound) {
        loopBtn.dataset.dagBound = 'true';
        // Check initial state
        if (loopBtn.dataset.loop === 'on' || loopBtn.classList.contains('active')) {
          this.loopEnabled = true;
        }
        loopBtn.addEventListener('click', () => {
          this.loopEnabled = !this.loopEnabled;
          loopBtn.setAttribute('data-loop', this.loopEnabled ? 'on' : 'off');
          loopBtn.classList.toggle('active', this.loopEnabled);
          window.NexusAudio.playTick(this.loopEnabled ? 1320 : 880);

          const labelEl = loopBtn.querySelector('span') || loopBtn;
          if (labelEl === loopBtn && loopBtn.textContent.toLowerCase().includes('loop')) {
            loopBtn.textContent = this.loopEnabled ? '∞ Autonomous Loop: ON' : '∞ Autonomous Loop: OFF';
          }

          if (this.loopEnabled && !this.isRunning) {
            const customVal = customInput ? customInput.value.trim() : '';
            this.runWorkflow(customVal ? null : this.currentPresetId, customVal || '');
          }
        });
      }

      // 5. Reset Layout Button (#btnResetDag / #btnResetLayout)
      ['btnResetDag', 'btnResetLayout'].forEach((id) => {
        const btn = document.getElementById(id);
        if (btn && !btn.dataset.dagBound) {
          btn.dataset.dagBound = 'true';
          btn.addEventListener('click', () => this.resetLayout());
        }
      });

      // 6. 1-Click Workflow Compilers (#btnExportN8n, #btnExportPython, #btnExportMcp, #btnCopyDagCode)
      const btnN8n = document.getElementById('btnExportN8n');
      if (btnN8n && !btnN8n.dataset.dagBound) {
        btnN8n.dataset.dagBound = 'true';
        btnN8n.addEventListener('click', () => this.exportN8n(true));
      }

      const btnPy = document.getElementById('btnExportPython');
      if (btnPy && !btnPy.dataset.dagBound) {
        btnPy.dataset.dagBound = 'true';
        btnPy.addEventListener('click', () => this.exportPython(true));
      }

      const btnMcp = document.getElementById('btnExportMcp');
      if (btnMcp && !btnMcp.dataset.dagBound) {
        btnMcp.dataset.dagBound = 'true';
        btnMcp.addEventListener('click', () => this.exportMcp(true));
      }

      const btnCopy = document.getElementById('btnCopyDagCode');
      if (btnCopy && !btnCopy.dataset.dagBound) {
        btnCopy.dataset.dagBound = 'true';
        btnCopy.addEventListener('click', () => this.copyCodeOutput(btnCopy));
      }
    }

    selectPreset(presetId) {
      if (!WORKFLOW_PRESETS[presetId]) return;
      this.currentPresetId = presetId;

      // Clear custom prompt so preset takes precedence unless user types again
      const customInput = document.getElementById('dagCustomPrompt');
      if (customInput && customInput.value.trim()) {
        customInput.value = '';
      }

      // Highlight active preset button/tab
      document.querySelectorAll('[data-preset], [data-workflow], .dag-preset-btn, .preset-btn').forEach((el) => {
        const pid = el.getAttribute('data-preset') || el.getAttribute('data-workflow') || el.id;
        if (pid) {
          el.classList.toggle('active', pid === presetId);
          el.setAttribute('aria-selected', pid === presetId ? 'true' : 'false');
        }
      });

      const presetSelect = document.getElementById('dagPresetSelect') || document.getElementById('workflowPresetSelect');
      if (presetSelect && presetSelect.value !== presetId) {
        presetSelect.value = presetId;
      }

      window.NexusAudio.playTick(1220);
      this.runWorkflow(presetId);
    }

    /* ========================================================================
     * INSPECTOR PANEL (#dagNodeInspector)
     * ======================================================================== */
    updateInspector(node) {
      if (!node) return;
      const inspector = document.getElementById('dagNodeInspector');
      if (!inspector) return;

      const statusColors = {
        IDLE: '#94a3b8',
        RUNNING: '#38bdf8',
        VERIFIED: '#10b981'
      };
      const badgeColor = statusColors[node.status] || '#38bdf8';

      const capabilitiesHtml = (node.capabilities || [])
        .map(
          (cap) =>
            `<span style="display:inline-block;padding:2px 8px;border-radius:999px;font-size:11px;font-family:var(--font-mono,monospace);background:rgba(148,163,184,0.1);border:1px solid rgba(148,163,184,0.22);color:#e2e8f0;">${cap}</span>`
        )
        .join(' ');

      inspector.innerHTML = `
        <div class="dag-inspector-card" style="display:flex;flex-direction:column;gap:10px;">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="width:10px;height:10px;border-radius:50%;background:${node.accent};box-shadow:0 0 10px ${node.accent};display:inline-block;"></span>
              <strong style="font-family:var(--font-mono,monospace);font-size:13px;color:#f8fafc;letter-spacing:0.03em;">0${node.step} // ${node.title}</strong>
            </div>
            <span style="font-family:var(--font-mono,monospace);font-size:11px;padding:2px 8px;border-radius:4px;background:rgba(15,23,42,0.85);border:1px solid ${badgeColor};color:${badgeColor};font-weight:600;">
              ● ${node.status}
            </span>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(135px,1fr));gap:8px;font-family:var(--font-mono,monospace);font-size:11.5px;">
            <div style="padding:6px 10px;border-radius:6px;background:rgba(15,23,42,0.65);border:1px solid rgba(148,163,184,0.14);">
              <div style="color:#64748b;font-size:10px;text-transform:uppercase;">Foundation Model</div>
              <div style="color:${node.accent};font-weight:600;margin-top:2px;">${node.model}</div>
            </div>
            <div style="padding:6px 10px;border-radius:6px;background:rgba(15,23,42,0.65);border:1px solid rgba(148,163,184,0.14);">
              <div style="color:#64748b;font-size:10px;text-transform:uppercase;">Throughput</div>
              <div style="color:#e2e8f0;font-weight:600;margin-top:2px;">${node.tokensPerSec.toFixed(1)} tok/s</div>
            </div>
            <div style="padding:6px 10px;border-radius:6px;background:rgba(15,23,42,0.65);border:1px solid rgba(148,163,184,0.14);">
              <div style="color:#64748b;font-size:10px;text-transform:uppercase;">Avg Node Latency</div>
              <div style="color:#10b981;font-weight:600;margin-top:2px;">${node.avgLatencyMs} ms</div>
            </div>
          </div>

          <div style="padding:8px 10px;border-radius:6px;background:rgba(2,6,23,0.75);border-left:3px solid ${node.accent};font-size:12px;line-height:1.5;color:#cbd5e1;">
            <div style="font-family:var(--font-mono,monospace);font-size:10px;color:#94a3b8;text-transform:uppercase;margin-bottom:3px;">System Prompt Directive</div>
            ${node.systemPrompt}
          </div>

          <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;">
            ${capabilitiesHtml}
          </div>
        </div>
      `;
    }

    /* ========================================================================
     * WORKFLOW EXECUTION & REAL-TIME PACKET STREAMING
     * ======================================================================== */
    spawnPacketBurst(fromIdx, toIdx, color = '#38bdf8') {
      const edgeIdx = DAG_EDGES.findIndex((e) => e.from === fromIdx && e.to === toIdx);
      const resolvedEdgeIdx = edgeIdx !== -1 ? edgeIdx : 0;

      for (let i = 0; i < 4; i++) {
        this.packets.push({
          edgeIndex: resolvedEdgeIdx,
          from: fromIdx,
          to: toIdx,
          t: -i * 0.09,
          speed: 0.032 + i * 0.002,
          color,
          size: 4.5 - i * 0.5
        });
      }
    }

    appendTerminalLog(stepIdx, node, message, elapsedMs) {
      const stream = document.getElementById('dagTerminalStream');
      if (!stream) return;

      const now = new Date();
      const ts =
        now.toTimeString().split(' ')[0] +
        '.' +
        String(now.getMilliseconds()).padStart(3, '0');

      const line = document.createElement('div');
      line.className = 'dag-log-entry';
      line.style.cssText =
        'padding:5px 8px;border-bottom:1px solid rgba(148,163,184,0.08);font-family:var(--font-mono,monospace);font-size:12px;line-height:1.45;display:flex;gap:8px;align-items:flex-start;animation:fadeIn 0.18s ease-out;';

      line.innerHTML = `
        <span style="color:#64748b;flex-shrink:0;">[${ts}]</span>
        <span style="color:${node.accent};font-weight:700;flex-shrink:0;min-width:74px;">[${node.code}]</span>
        <span style="color:#e2e8f0;flex:1;">${message}</span>
        <span style="color:#10b981;font-size:11px;flex-shrink:0;">+${elapsedMs}ms</span>
      `;

      stream.appendChild(line);
      stream.scrollTop = stream.scrollHeight;
    }

    updateLiveMetrics(verifiedCount, totalNodes, tokPerSec, elapsedMs, statusLabel = '') {
      const metricsEl = document.getElementById('dagLiveMetrics');
      if (!metricsEl) return;

      const suffix = statusLabel ? ` • ${statusLabel}` : '';
      metricsEl.textContent = `${tokPerSec.toFixed(1)} tok/s • ${verifiedCount}/${totalNodes} Nodes Verified • ${elapsedMs.toLocaleString()}ms${suffix}`;
    }

    async runWorkflow(presetId = null, customPrompt = '') {
      const myToken = ++this.runToken;
      this.isRunning = true;

      if (customPrompt && customPrompt.trim().length > 0) {
        this.currentBlueprint = buildCustomBlueprint(customPrompt);
      } else {
        const pid = presetId && WORKFLOW_PRESETS[presetId] ? presetId : this.currentPresetId;
        this.currentPresetId = pid;
        this.currentBlueprint = WORKFLOW_PRESETS[pid] || WORKFLOW_PRESETS['wf-pr-solver'];
      }

      const blueprint = this.currentBlueprint;

      // Reset all nodes to IDLE
      this.nodes.forEach((n) => {
        n.status = 'IDLE';
        n.activeIntensity = 0;
      });

      // Clear terminal stream & print header banner
      const stream = document.getElementById('dagTerminalStream');
      if (stream) {
        stream.innerHTML = '';
        const banner = document.createElement('div');
        banner.style.cssText =
          'padding:6px 8px;margin-bottom:4px;background:rgba(56,189,248,0.09);border-left:3px solid #38bdf8;font-family:var(--font-mono,monospace);font-size:11.5px;color:#bae6fd;';
        banner.innerHTML = `<strong>⚡ SWARM DISPATCH INITIATED:</strong> ${blueprint.name} <span style="color:#7dd3fc;">(${blueprint.triggerType})</span>`;
        stream.appendChild(banner);
      }

      // Immediately update code output for this blueprint
      this.renderCodeOutput();

      const totalNodes = this.nodes.length;
      let cumulativeMs = 0;

      for (let i = 0; i < totalNodes; i++) {
        if (myToken !== this.runToken) return;

        const node = this.nodes[i];
        node.status = 'RUNNING';
        node.activeIntensity = 1.0;
        this.selectedNodeIndex = i;
        this.updateInspector(node);
        window.NexusAudio.playNodeActivate(i);

        const stepDuration = Math.round(blueprint.targetLatencyMs / totalNodes);
        this.updateLiveMetrics(i, totalNodes, node.tokensPerSec, cumulativeMs, `${node.code} RUNNING`);

        // Wait while node processes
        await new Promise((r) => setTimeout(r, 270));
        if (myToken !== this.runToken) return;

        node.status = 'VERIFIED';
        cumulativeMs += stepDuration;

        const logMessage =
          blueprint.logs[i] && blueprint.logs[i].msg
            ? blueprint.logs[i].msg
            : `${node.title} completed verification cleanly.`;

        this.appendTerminalLog(i, node, logMessage, stepDuration);
        this.updateInspector(node);
        this.updateLiveMetrics(i + 1, totalNodes, blueprint.throughputTokSec, cumulativeMs);

        // Spawn glowing data packets along the bezier curve to the next node
        if (i < totalNodes - 1) {
          this.spawnPacketBurst(i, i + 1, node.accent);
          // Also spawn auxiliary cross-packets where applicable
          if (i === 0) this.spawnPacketBurst(0, 2, '#38bdf8');
          if (i === 1) this.spawnPacketBurst(1, 3, '#818cf8');
          if (i === 2) this.spawnPacketBurst(2, 4, '#c084fc');
          await new Promise((r) => setTimeout(r, 175));
        }
      }

      if (myToken !== this.runToken) return;

      this.isRunning = false;
      window.NexusAudio.playSuccess();
      this.updateLiveMetrics(totalNodes, totalNodes, blueprint.throughputTokSec, blueprint.targetLatencyMs);

      if (stream) {
        const doneBanner = document.createElement('div');
        doneBanner.style.cssText =
          'padding:6px 8px;margin-top:4px;background:rgba(16,185,129,0.12);border-left:3px solid #10b981;font-family:var(--font-mono,monospace);font-size:11.5px;color:#6ee7b7;';
        doneBanner.innerHTML = `<strong>✔ PIPELINE VERIFIED (6/6 NODES):</strong> All sandbox assertions passed in ${blueprint.targetLatencyMs.toLocaleString()}ms. Ready for 1-Click Export.`;
        stream.appendChild(doneBanner);
        stream.scrollTop = stream.scrollHeight;
      }

      // Autonomous Loop mode check
      const loopBtn = document.getElementById('btnLoopDag');
      const domLoopOn = loopBtn && (loopBtn.dataset.loop === 'on' || loopBtn.classList.contains('active'));
      if (this.loopEnabled || domLoopOn) {
        setTimeout(() => {
          if (myToken !== this.runToken) return;
          if (!this.loopEnabled && !(loopBtn && loopBtn.dataset.loop === 'on')) return;
          // Cycle to next preset in autonomous loop if no custom prompt is locked
          const customInput = document.getElementById('dagCustomPrompt');
          const customVal = customInput ? customInput.value.trim() : '';
          if (customVal) {
            this.runWorkflow(null, customVal);
          } else {
            const keys = Object.keys(WORKFLOW_PRESETS);
            const nextIdx = (keys.indexOf(this.currentPresetId) + 1) % keys.length;
            this.selectPreset(keys[nextIdx]);
          }
        }, 2200);
      }
    }

    /* ========================================================================
     * 1-CLICK WORKFLOW COMPILERS & FILE DOWNLOAD TRIGGERS
     * ======================================================================== */
    renderCodeOutput() {
      const codeEl = document.getElementById('dagCodeOutput');
      if (!codeEl) return;

      let codeText = '';
      if (this.activeExportFormat === 'n8n') {
        codeText = compileN8nWorkflowJson(this.currentBlueprint, this.nodes);
      } else if (this.activeExportFormat === 'mcp') {
        codeText = compileMcpConfigBundle(this.currentBlueprint, this.nodes);
      } else {
        codeText = this.currentBlueprint.pythonCode;
      }

      if ('value' in codeEl && (codeEl.tagName === 'TEXTAREA' || codeEl.tagName === 'INPUT')) {
        codeEl.value = codeText;
      } else {
        codeEl.textContent = codeText;
      }

      // Update active visual state on compiler buttons
      const map = {
        n8n: document.getElementById('btnExportN8n'),
        python: document.getElementById('btnExportPython'),
        mcp: document.getElementById('btnExportMcp')
      };
      Object.keys(map).forEach((key) => {
        const btn = map[key];
        if (btn) {
          btn.classList.toggle('active', key === this.activeExportFormat);
          btn.setAttribute('data-active', key === this.activeExportFormat ? 'true' : 'false');
        }
      });
    }

    triggerFileDownload(filename, content, mimeType = 'application/json') {
      try {
        const blob = new Blob([content], { type: `${mimeType};charset=utf-8` });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }, 150);
      } catch (_) {}
    }

    exportN8n(download = true) {
      this.activeExportFormat = 'n8n';
      this.renderCodeOutput();
      window.NexusAudio.playNodeActivate(3);
      const jsonStr = compileN8nWorkflowJson(this.currentBlueprint, this.nodes);
      if (download) {
        this.triggerFileDownload(
          `nexus-${this.currentBlueprint.id}-n8n-workflow.json`,
          jsonStr,
          'application/json'
        );
      }
      return jsonStr;
    }

    exportPython(download = true) {
      this.activeExportFormat = 'python';
      this.renderCodeOutput();
      window.NexusAudio.playNodeActivate(4);
      const pyStr = this.currentBlueprint.pythonCode;
      if (download) {
        this.triggerFileDownload(
          `nexus_${this.currentBlueprint.id.replace(/-/g, '_')}_swarm.py`,
          pyStr,
          'text/x-python'
        );
      }
      return pyStr;
    }

    exportMcp(download = true) {
      this.activeExportFormat = 'mcp';
      this.renderCodeOutput();
      window.NexusAudio.playNodeActivate(5);
      const mcpStr = compileMcpConfigBundle(this.currentBlueprint, this.nodes);
      if (download) {
        this.triggerFileDownload(
          `claude_desktop_config_${this.currentBlueprint.id}.json`,
          mcpStr,
          'application/json'
        );
      }
      return mcpStr;
    }

    copyCodeOutput(btnEl) {
      const codeEl = document.getElementById('dagCodeOutput');
      if (!codeEl) return;
      const text = 'value' in codeEl && codeEl.value ? codeEl.value : codeEl.textContent || '';

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).catch(() => {});
      } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }

      window.NexusAudio.playSuccess();
      if (btnEl) {
        const origHtml = btnEl.innerHTML;
        btnEl.textContent = '✔ COPIED TO CLIPBOARD';
        setTimeout(() => {
          btnEl.innerHTML = origHtml;
        }, 1600);
      }
    }

    /* ========================================================================
     * 60FPS CANVAS RENDERING PIPELINE (Grid, Bezier Curves, Packets, Nodes)
     * ======================================================================== */
    getEdgeControlPoints(fromNode, toNode) {
      // Determine anchor ports based on relative geometry
      const fromCenter = { x: fromNode.x + fromNode.w / 2, y: fromNode.y + fromNode.h / 2 };
      const toCenter = { x: toNode.x + toNode.w / 2, y: toNode.y + toNode.h / 2 };

      const dx = toCenter.x - fromCenter.x;
      const dy = toCenter.y - fromCenter.y;

      let x1, y1, x2, y2, cp1x, cp1y, cp2x, cp2y;

      if (Math.abs(dx) > Math.abs(dy) * 0.65) {
        // Horizontal-dominant connection
        x1 = dx >= 0 ? fromNode.x + fromNode.w : fromNode.x;
        y1 = fromNode.y + fromNode.h * 0.5;
        x2 = dx >= 0 ? toNode.x : toNode.x + toNode.w;
        y2 = toNode.y + toNode.h * 0.5;
        const curveTension = Math.max(Math.abs(x2 - x1) * 0.48, 56);
        cp1x = x1 + (dx >= 0 ? curveTension : -curveTension);
        cp1y = y1;
        cp2x = x2 - (dx >= 0 ? curveTension : -curveTension);
        cp2y = y2;
      } else {
        // Vertical-dominant connection (e.g. Node 1 -> Node 2 or Node 3 -> Node 4)
        x1 = fromNode.x + fromNode.w * 0.5;
        y1 = dy >= 0 ? fromNode.y + fromNode.h : fromNode.y;
        x2 = toNode.x + toNode.w * 0.5;
        y2 = dy >= 0 ? toNode.y : toNode.y + toNode.h;
        const curveTension = Math.max(Math.abs(y2 - y1) * 0.48, 42);
        cp1x = x1;
        cp1y = y1 + (dy >= 0 ? curveTension : -curveTension);
        cp2x = x2;
        cp2y = y2 - (dy >= 0 ? curveTension : -curveTension);
      }

      return { x1, y1, cp1x, cp1y, cp2x, cp2y, x2, y2 };
    }

    evalCubicBezier(pts, t) {
      const mt = 1 - t;
      const mt2 = mt * mt;
      const t2 = t * t;
      const a = mt2 * mt;
      const b = 3 * mt2 * t;
      const c = 3 * mt * t2;
      const d = t * t2;
      return {
        x: a * pts.x1 + b * pts.cp1x + c * pts.cp2x + d * pts.x2,
        y: a * pts.y1 + b * pts.cp1y + c * pts.cp2y + d * pts.y2
      };
    }

    drawRoundedRect(ctx, x, y, w, h, r) {
      const radius = Math.min(r, w / 2, h / 2);
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.arcTo(x + w, y, x + w, y + h, radius);
      ctx.arcTo(x + w, y + h, x, y + h, radius);
      ctx.arcTo(x, y + h, x, y, radius);
      ctx.arcTo(x, y, x + w, y, radius);
      ctx.closePath();
    }

    animate(timestamp) {
      const dt = Math.min((timestamp - this.lastFrameTime) / 1000, 0.1);
      this.lastFrameTime = timestamp;

      this.renderCanvas(timestamp, dt);
      requestAnimationFrame((ts) => this.animate(ts));
    }

    renderCanvas(timestamp, dt) {
      if (!this.ctx || !this.canvas) return;
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;

      ctx.save();
      ctx.scale(this.dpr, this.dpr);

      // 1. Deep Engineering Void Background
      ctx.fillStyle = '#060a14';
      ctx.fillRect(0, 0, w, h);

      // Subtle radial atmospheric glow in center
      const bgGrad = ctx.createRadialGradient(w * 0.5, h * 0.5, 20, w * 0.5, h * 0.5, Math.max(w, h) * 0.65);
      bgGrad.addColorStop(0, 'rgba(56, 189, 248, 0.055)');
      bgGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.025)');
      bgGrad.addColorStop(1, 'rgba(6, 10, 20, 0)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // 2. Precision Engineering Grid
      const gridStep = 28;
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.055)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let gx = 0; gx < w; gx += gridStep) {
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
      }
      for (let gy = 0; gy < h; gy += gridStep) {
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
      }
      ctx.stroke();

      // 3. Draw Bezier Connections & Ambient Telemetry Particles
      DAG_EDGES.forEach((edge, eIdx) => {
        const fromNode = this.nodes[edge.from];
        const toNode = this.nodes[edge.to];
        if (!fromNode || !toNode) return;

        const pts = this.getEdgeControlPoints(fromNode, toNode);
        const bothVerified = fromNode.status === 'VERIFIED' && toNode.status === 'VERIFIED';
        const isFlowing = fromNode.status === 'VERIFIED' && toNode.status === 'RUNNING';

        // Outer glow path for primary edges
        ctx.beginPath();
        ctx.moveTo(pts.x1, pts.y1);
        ctx.bezierCurveTo(pts.cp1x, pts.cp1y, pts.cp2x, pts.cp2y, pts.x2, pts.y2);

        if (edge.primary) {
          ctx.strokeStyle = isFlowing
            ? 'rgba(56, 189, 248, 0.78)'
            : bothVerified
            ? 'rgba(16, 185, 129, 0.52)'
            : 'rgba(148, 163, 184, 0.24)';
          ctx.lineWidth = isFlowing ? 2.6 : 1.8;
          ctx.setLineDash([]);
        } else {
          ctx.strokeStyle = 'rgba(129, 140, 248, 0.16)';
          ctx.lineWidth = 1.15;
          ctx.setLineDash([4, 5]);
        }
        ctx.stroke();
        ctx.setLineDash([]);

        // Port anchor dots
        ctx.fillStyle = edge.primary ? fromNode.accent : 'rgba(148,163,184,0.4)';
        ctx.beginPath();
        ctx.arc(pts.x1, pts.y1, 3, 0, Math.PI * 2);
        ctx.arc(pts.x2, pts.y2, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Update & Render Ambient Heartbeat Particles
      this.ambientParticles.forEach((p) => {
        p.t = (p.t + p.speed) % 1;
        const edge = DAG_EDGES[p.edgeIndex];
        if (!edge) return;
        const fromNode = this.nodes[edge.from];
        const toNode = this.nodes[edge.to];
        const pts = this.getEdgeControlPoints(fromNode, toNode);
        const pos = this.evalCubicBezier(pts, p.t);

        ctx.fillStyle = edge.primary ? 'rgba(56, 189, 248, 0.65)' : 'rgba(192, 132, 252, 0.45)';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 5. Update & Render High-Velocity Active Workflow Packets
      for (let i = this.packets.length - 1; i >= 0; i--) {
        const pkt = this.packets[i];
        pkt.t += pkt.speed;
        if (pkt.t > 1) {
          this.packets.splice(i, 1);
          continue;
        }
        if (pkt.t < 0) continue;

        const fromNode = this.nodes[pkt.from];
        const toNode = this.nodes[pkt.to];
        if (!fromNode || !toNode) continue;

        const pts = this.getEdgeControlPoints(fromNode, toNode);
        const pos = this.evalCubicBezier(pts, pkt.t);

        // Glowing aura
        const grad = ctx.createRadialGradient(pos.x, pos.y, 0.5, pos.x, pos.y, pkt.size * 3.2);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.35, pkt.color);
        grad.addColorStop(1, 'rgba(56, 189, 248, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pkt.size * 3.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, pkt.size * 0.75, 0, Math.PI * 2);
        ctx.fill();
      }

      // 6. Render 6 Autonomous Agent Nodes
      this.nodes.forEach((node, idx) => {
        node.pulsePhase += dt * 3.4;
        if (node.status !== 'RUNNING' && node.activeIntensity > 0) {
          node.activeIntensity = Math.max(0, node.activeIntensity - dt * 1.4);
        }

        const isSelected = idx === this.selectedNodeIndex;
        const isHovered = idx === this.hoveredNodeIndex;
        const isRunning = node.status === 'RUNNING';
        const isVerified = node.status === 'VERIFIED';

        // Pulsing outer ring when RUNNING
        if (isRunning || node.activeIntensity > 0.05) {
          const pulseRadius = 6 + Math.sin(node.pulsePhase * 2) * 4;
          ctx.save();
          this.drawRoundedRect(
            ctx,
            node.x - pulseRadius,
            node.y - pulseRadius,
            node.w + pulseRadius * 2,
            node.h + pulseRadius * 2,
            14
          );
          ctx.strokeStyle = node.accent;
          ctx.globalAlpha = isRunning ? 0.45 + Math.sin(node.pulsePhase * 2) * 0.2 : node.activeIntensity * 0.3;
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        }

        // Card drop shadow / glow
        ctx.save();
        ctx.shadowColor = isRunning || isSelected ? node.glow : 'rgba(0, 0, 0, 0.55)';
        ctx.shadowBlur = isRunning ? 24 : isSelected || isHovered ? 16 : 10;
        ctx.shadowOffsetY = 4;

        this.drawRoundedRect(ctx, node.x, node.y, node.w, node.h, 10);
        ctx.fillStyle = isSelected ? 'rgba(15, 23, 42, 0.96)' : 'rgba(11, 17, 32, 0.92)';
        ctx.fill();
        ctx.restore();

        // Top accent bar on node card
        ctx.save();
        this.drawRoundedRect(ctx, node.x, node.y, node.w, node.h, 10);
        ctx.clip();
        ctx.fillStyle = node.accent;
        ctx.globalAlpha = isRunning ? 0.95 : isVerified ? 0.8 : 0.55;
        ctx.fillRect(node.x, node.y, node.w, 3);
        ctx.restore();

        // Card border
        this.drawRoundedRect(ctx, node.x, node.y, node.w, node.h, 10);
        ctx.lineWidth = isRunning || isSelected ? 1.7 : 1.1;
        ctx.strokeStyle = isRunning
          ? node.accent
          : isVerified
          ? 'rgba(16, 185, 129, 0.62)'
          : isHovered || isSelected
          ? 'rgba(148, 163, 184, 0.55)'
          : 'rgba(148, 163, 184, 0.2)';
        ctx.stroke();

        // Node Header: Step Badge + Code + Status Pill
        const padX = 11;
        ctx.font = '700 10.5px "JetBrains Mono", "Fira Code", monospace';
        ctx.fillStyle = node.accent;
        ctx.textBaseline = 'middle';
        ctx.fillText(`0${node.step} // ${node.code}`, node.x + padX, node.y + 19);

        // Status Pill (IDLE | RUNNING | VERIFIED)
        const statusColor = isRunning ? '#38bdf8' : isVerified ? '#10b981' : '#64748b';
        const statusText = node.status;
        ctx.font = '600 9.5px "JetBrains Mono", monospace';
        const stWidth = ctx.measureText(statusText).width + 14;
        const stX = node.x + node.w - stWidth - 9;
        const stY = node.y + 10;

        this.drawRoundedRect(ctx, stX, stY, stWidth, 17, 4);
        ctx.fillStyle = 'rgba(2, 6, 23, 0.8)';
        ctx.fill();
        ctx.strokeStyle = statusColor;
        ctx.lineWidth = 0.9;
        ctx.stroke();

        // Status indicator dot
        ctx.fillStyle = statusColor;
        ctx.beginPath();
        ctx.arc(stX + 6, stY + 8.5, 2.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = statusColor;
        ctx.fillText(statusText, stX + 11, stY + 9);

        // Node Title / Role
        ctx.font = '600 11.5px "Inter", system-ui, sans-serif';
        ctx.fillStyle = '#f8fafc';
        const roleShort = node.title.split('//')[1] ? node.title.split('//')[1].trim() : node.title;
        ctx.fillText(roleShort, node.x + padX, node.y + 41);

        // Subtitle (Tools / Trigger)
        ctx.font = '400 10px "Inter", system-ui, sans-serif';
        ctx.fillStyle = '#94a3b8';
        const maxSubLen = node.w < 175 ? 22 : 30;
        const subText =
          node.subtitle.length > maxSubLen ? node.subtitle.slice(0, maxSubLen - 2) + '…' : node.subtitle;
        ctx.fillText(subText, node.x + padX, node.y + 58);

        // Bottom telemetry bar: Model + Latency
        if (node.h >= 82) {
          ctx.font = '500 9.5px "JetBrains Mono", monospace';
          ctx.fillStyle = '#64748b';
          const modelShort = node.model.split(' ')[0];
          ctx.fillText(`${modelShort} • ${node.avgLatencyMs}ms`, node.x + padX, node.y + 74);
        }
      });

      // 7. Subtle HUD Watermark in Bottom-Right of Canvas
      ctx.font = '500 10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(148, 163, 184, 0.42)';
      ctx.textAlign = 'right';
      ctx.fillText('DRAG NODES TO REWIRE TOPOLOGY • DOUBLE-CLICK TO RESET • 60FPS DAG ENGINE', w - 12, h - 10);
      ctx.textAlign = 'left';

      ctx.restore();
    }
  }

  /* ==========================================================================
   * 6. INITIALIZATION & GLOBAL EXPORT
   * ========================================================================== */
  const studio = new NexusDagStudio();
  window.NexusDAG = studio;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => studio.mount());
  } else {
    studio.mount();
  }
})();
