(function () {
  "use strict";

  const cfg = window.KITS_STOREFRONT_CONFIG || {
    STOREFRONT_META: {
      brandName: "@cocvn157 // Developer Kits",
      authorName: "Luu Quoc Trung",
      githubHandle: "@cocvn157",
      githubUrl: "https://github.com/cocvn157",
      contactEmail: "cocvn157@gmail.com",
      license: "MIT"
    },
    CHECKOUT_URLS: {}
  };

  const KITS = [
    {
      id: "pack1",
      category: "mcp-agents",
      tierLabel: "Core Kit 01 · MCP Servers",
      title: "Ultimate MCP Server Starter Kit",
      subtitle: "5 Production TypeScript & Python Servers",
      priceUsd: 29,
      bundleShareNote: "~$12.25/kit in $49 Bundle",
      archiveName: "Pack1-Ultimate-MCP-Server-Starter-Kit-v1.0.zip",
      fileCount: "17 files",
      archiveBytes: "28,756 bytes",
      license: "MIT",
      cover: "assets/pack1-cover.png",
      coverAlt: "Ultimate MCP Server Starter Kit cover",
      testBadge: "10/10 TS + Python self-test",
      summary:
        "Connect Claude Desktop, Cursor, Windsurf, and Cline to PostgreSQL, GitHub Bounties, local codebase RAG, REST/OpenAPI APIs, and SQLite BI analytics.",
      highlights: [
        "PostgreSQL read-only guard strips comments and blocks stacked/mutating SQL",
        "Zero-dep Python local RAG with realpath + commonpath traversal protection",
        "SQLite BI Z-score anomaly detector + claude_desktop_config & cursor examples"
      ],
      modules: [
        {
          path: "01-postgres-mcp/index.ts + sql-guard.ts",
          desc: "Read-only transaction wrapper, assertReadOnlySql(), explain_query_plan, detect_missing_indexes."
        },
        {
          path: "02-github-bounty-mcp/index.ts + github-helpers.ts",
          desc: "Segment-validated bounty issue search, repo tree summary, and structured PR draft generator."
        },
        {
          path: "03-filesystem-rag-mcp/filesystem_rag_mcp.py",
          desc: "Zero-dep TF-IDF codebase search + commonpath traversal blocking and .env/.pem exclusion."
        },
        {
          path: "04-rest-api-bridge-mcp/rest_api_bridge_mcp.ts + rest-helpers.ts",
          desc: "Safe base URL validation, protocol-relative path guard, OpenAPI route inspection, retry backoff."
        },
        {
          path: "05-sqlite-analytics-mcp/sqlite_analytics_mcp.py",
          desc: "Read-only SQLite BI queries, KPI summary, Z-score anomaly detection, and CSV export."
        }
      ],
      testOutput:
        "npm test -> tsc --noEmit + 10 TS/Stdio tests PASS (0 errors)\n" +
        "[+] Filesystem RAG MCP Self-Test Passed: 15 indexed files, 50 chunks\n" +
        "[+] SQLite BI MCP Self-Test Passed: anomaly SPIKE detected (z_score: 2.4)"
    },
    {
      id: "pack2",
      category: "mcp-agents",
      tierLabel: "Entry Tier 02 · Multi-Agent Rules",
      title: "Autonomous 6-Agent Cursor, Windsurf & Claude Code Kit",
      subtitle: "6-Agent Protocol + 27 Stack Rules",
      priceUsd: 19,
      bundleShareNote: "~$12.25/kit in $49 Bundle",
      archiveName: "Pack2-Autonomous-6-Agent-Cursor-And-Claude-Kit-v1.0.zip",
      fileCount: "11 files",
      archiveBytes: "17,471 bytes",
      license: "MIT",
      cover: "assets/pack2-cover.png",
      coverAlt: "Autonomous 6-Agent Cursor, Windsurf & Claude Code Kit cover",
      testBadge: "6-agent + 27 rules",
      summary:
        "Enforce a deterministic 6-phase workflow (Lead, Scout, Planner, Worker, Testing, Hacker) with drop-in IDE rules and 27 production stack checklists.",
      highlights: [
        "Drop-in CLAUDE.md, .cursor/rules/00-six-agent.mdc, and .windsurfrules templates",
        "Machine-readable six-agent-team.json contract for custom orchestrators",
        "13 Frontend/Full-Stack rules + 14 Backend, Rust, Go, Scala 3 ZIO, Solidity & AI rules"
      ],
      modules: [
        {
          path: "01-Six-Agent-Autonomous-Team/CLAUDE.md + six-agent-team.json",
          desc: "6-phase engineering contract: Lead -> Scout -> Planner -> Worker -> Testing -> Hacker."
        },
        {
          path: "02-25-Production-Cursor-And-Claude-Rules/PART-1-Frontend-FullStack-SaaS-Rules.md",
          desc: "Rules 01–13: Next.js 15, React 19, Tailwind v4, Astro, Remix, Vue 3.5, Svelte 5, Tauri v2, Stripe webhooks."
        },
        {
          path: "02-25-Production-Cursor-And-Claude-Rules/PART-2-Backend-Systems-Web3-AI-Rules.md",
          desc: "Rules 14–27: Rust Tokio, Go, FastAPI, Scala 3 ZIO 2, Solidity Foundry, MCP, Playwright, OWASP Top-10."
        },
        {
          path: "03-Drop-In-IDE-Templates/ + scripts/validate_kit.py",
          desc: "Ready-to-paste Cursor .mdc + Windsurf rules and zero-dependency Python validation script."
        }
      ],
      testOutput:
        "python scripts/validate_kit.py ->\n" +
        "[+] Pack 2 Validation Passed: 6-agent JSON valid, 27 stack rules verified, 10/10 files present."
    },
    {
      id: "pack3",
      category: "micro-saas",
      tierLabel: "SaaS Builder 03 · $0/mo Hosting",
      title: "Zero-Server AI Micro-SaaS Templates Bundle",
      subtitle: "3 Turnkey Static Web Apps",
      priceUsd: 39,
      bundleShareNote: "~$12.25/kit in $49 Bundle",
      archiveName: "Pack3-Zero-Server-MicroSaaS-Templates-Bundle-v1.0.zip",
      fileCount: "7 files",
      archiveBytes: "21,579 bytes",
      license: "MIT",
      cover: "assets/pack3-cover.png",
      coverAlt: "Zero-Server AI Micro-SaaS Templates Bundle cover",
      testBadge: "3/3 templates",
      summary:
        "Three client-side developer Micro-SaaS apps and sales launch page with unified SAAS_CONFIG monetization, daily free quota gates, and PRO license unlockers.",
      highlights: [
        "PromptForge Pro: system prompt compiler, token/cost estimator & date-based quota reset",
        "TypeMorph Studio: nested JSON to TypeScript, Zod, Pydantic v2, Rust Serde & PostgreSQL DDL",
        "NovaLaunch Sales Page: Bento grid, interactive ROI calculator slider & Monthly/Lifetime toggle"
      ],
      modules: [
        {
          path: "Template-1-AI-Prompt-Architect-MicroSaaS/index.html",
          desc: "PromptForge Pro with CoT/ReAct/ToT compiler, token estimator, JSON export, and PF-PRO-DEMO-2026 gate."
        },
        {
          path: "Template-2-DevTools-Polyglot-Type-Generator-SaaS/index.html",
          desc: "TypeMorph Studio polyglot schema codegen (TS, Zod, Pydantic v2, Rust, SQL) + TM-PRO-DEMO-2026 gate."
        },
        {
          path: "Template-3-High-Converting-AI-SaaS-Launch-Page/index.html",
          desc: "NovaLaunch dark-mode landing page with ROI calculator, pricing switch, FAQ, and checkout modal."
        },
        {
          path: "tests/verify-templates.mjs",
          desc: "Sandboxed Node.js vm verification testing all 3 templates end-to-end."
        }
      ],
      testOutput:
        "node --test tests/verify-templates.mjs ->\n" +
        "# tests 3\n# pass 3\n# fail 0"
    },
    {
      id: "pack4",
      category: "security",
      tierLabel: "Core Kit 04 · AI Security",
      title: "Zero-Leak AI Privacy & Agent Guardrails Kit",
      subtitle: "Zero-Dependency TypeScript",
      priceUsd: 29,
      bundleShareNote: "~$12.25/kit in $49 Bundle",
      archiveName: "Pack4-Zero-Leak-AI-Privacy-And-Agent-Guardrails-Kit-v1.0.zip",
      fileCount: "13 files",
      archiveBytes: "20,673 bytes",
      license: "MIT",
      cover: "assets/pack4-cover.png",
      coverAlt: "Zero-Leak AI Privacy & Agent Guardrails Kit cover",
      testBadge: "19/19 TypeScript zero-dep tests",
      summary:
        "Fail-closed TypeScript privacy and guardrail modules: reversible PII/secret redaction, integer micro-USD budget caps, rate limits, and SSRF-safe tool sandboxing.",
      highlights: [
        "RedactionVault + verifyZeroRawLeaks() outbound guard fails closed on any surviving secret",
        "AgentBudgetGuard uses integer micro-USD math, 24h rolling cap, clock guard & circuit breaker",
        "Sandbox middleware blocks private-IP SSRF, deep/circular payloads, __proto__ & prompt injection"
      ],
      modules: [
        {
          path: "src/redaction-engine.ts",
          desc: "Masks JWT, Bearer, sk-/ghp_/AKIA keys, SSN, email & optional Luhn cards with local rehydration."
        },
        {
          path: "src/budget-guardrail.ts",
          desc: "MICRO_SCALE=1_000_000 ledger, per-tx/daily caps, sliding-window RPM limit, CLOSED/OPEN/HALF_OPEN breaker."
        },
        {
          path: "src/sandbox-middleware.ts",
          desc: "Deny-by-default tool registry, HTTPS allowlist, SSRF IP filter, depth tripwire & createAgentPolicyMiddleware()."
        },
        {
          path: "tests/*.test.ts + examples/demo.ts",
          desc: "3 modular test suites (19 test cases) running natively on Node 22+ with zero runtime dependencies."
        }
      ],
      testOutput:
        "tsc --noEmit && node --test tests/*.test.ts ->\n" +
        "# tests 19 (3 suites: budget-guardrail, redaction-engine, sandbox-middleware)\n" +
        "# pass 19 | # fail 0 | runtime dependencies: 0"
    },
    {
      id: "leadMagnet",
      category: "free-bundle",
      tierLabel: "Free Lead Magnet · $0",
      title: "6-Agent CLAUDE.md & Drop-In IDE Starter",
      subtitle: "Free Sample from Pack 2 (MIT)",
      priceUsd: 0,
      bundleShareNote: "Free $0 Starter",
      archiveName: "Pack2 Starter Extract (CLAUDE.md + IDE Templates)",
      fileCount: "3 core files",
      archiveBytes: "4,395 bytes",
      license: "MIT",
      cover: "assets/pack2-cover.png",
      coverAlt: "Free 6-Agent CLAUDE.md and IDE starter preview",
      testBadge: "6-agent + 27 rules",
      summary:
        "Start immediately at $0: drop-in CLAUDE.md, .cursor/rules/00-six-agent.mdc, and .windsurfrules extracted from Pack 2 to eliminate AI TODO placeholders.",
      highlights: [
        "Enforces Lead -> Scout -> Planner -> Worker -> Testing -> Hacker sequencing",
        "Zero-placeholder strict typing and red-team security checklist built in",
        "Upgrade cleanly to Pack 2 ($19) or All-4 Bundle ($49) for all 27 stack rules"
      ],
      modules: [
        {
          path: "01-Six-Agent-Autonomous-Team/CLAUDE.md",
          desc: "Core 6-phase engineering discipline for Claude Code and multi-step coding agents."
        },
        {
          path: "03-Drop-In-IDE-Templates/cursor-rules-00-six-agent.mdc",
          desc: "Always-apply Cursor rules file scoping every edit to minimal diffs and tested edge cases."
        },
        {
          path: "03-Drop-In-IDE-Templates/.windsurfrules",
          desc: "Compact Windsurf rules template enforcing typecheck, unit tests, and security audit."
        }
      ],
      testOutput:
        "Validated inside Pack 2 CI check (scripts/validate_kit.py):\n" +
        "[+] 10/10 required kit files present | MIT License | $0 Starter Tier"
    },
    {
      id: "founderBundle",
      category: "free-bundle",
      tierLabel: "All-Access Bundle · Save $67",
      title: "Complete AI Engineer & Micro-SaaS Bundle",
      subtitle: "All 4 Kits Included (Pack 1 + 2 + 3 + 4)",
      priceUsd: 49,
      bundleShareNote: "Save $67 vs $116 total",
      archiveName: "All-4-Pack-Founder-Bundle-v1.0 (4 MIT .zip archives)",
      fileCount: "48 files (4 zips)",
      archiveBytes: "88,479 bytes",
      license: "MIT",
      cover: "assets/pack1-cover.png",
      coverAlt: "Complete AI Engineer and Micro-SaaS Bundle preview",
      testBadge: "100% Tested · All 4 Kits",
      summary:
        "Every kit in the catalog at 57%+ savings: 5 MCP servers, 6-Agent + 27 IDE stack rules, 3 zero-server Micro-SaaS apps, and the 19-test TS Zero-Leak guardrails engine.",
      highlights: [
        "Includes Pack 1 ($29) + Pack 2 ($19) + Pack 3 ($39) + Pack 4 ($29) = $116 value for $49",
        "100% MIT licensed source code with zero node_modules bloat or placeholder stubs",
        "Verified across TypeScript, Node.js test runner, and zero-dependency Python self-tests"
      ],
      modules: [
        {
          path: "Pack1-Ultimate-MCP-Server-Starter-Kit-v1.0.zip (17 files)",
          desc: "5 MCP servers in TS & Python — 10/10 TS + Python self-test PASS."
        },
        {
          path: "Pack2-Autonomous-6-Agent-Cursor-And-Claude-Kit-v1.0.zip (11 files)",
          desc: "6-Agent protocol + 27 stack rules — validate_kit.py PASS."
        },
        {
          path: "Pack3-Zero-Server-MicroSaaS-Templates-Bundle-v1.0.zip (7 files)",
          desc: "PromptForge, TypeMorph, NovaLaunch — 3/3 verify-templates.mjs PASS."
        },
        {
          path: "Pack4-Zero-Leak-AI-Privacy-And-Agent-Guardrails-Kit-v1.0.zip (13 files)",
          desc: "PII redaction, micro-USD budget & SSRF sandbox — 19/19 node --test PASS."
        }
      ],
      testOutput:
        "Combined Verification Summary:\n" +
        "- Pack 1: 10/10 TS + Python self-test PASS\n" +
        "- Pack 2: 6-agent JSON + 27 stack rules PASS\n" +
        "- Pack 3: 3/3 templates PASS\n" +
        "- Pack 4: 19/19 TypeScript zero-dep tests PASS"
    }
  ];

  let activeFilter = "all";
  let pricingMode = "individual";
  let lastTriggerEl = null;

  function isLiveCheckoutUrl(url) {
    return typeof url === "string" && /^https:\/\/[^\s]+$/i.test(url.trim());
  }

  function resolveCheckoutLinks(kitId) {
    const entry = (cfg.CHECKOUT_URLS && cfg.CHECKOUT_URLS[kitId]) || {};
    const links = [];
    if (isLiveCheckoutUrl(entry.payhip)) {
      links.push({ label: "Checkout on Payhip", url: entry.payhip.trim(), primary: true });
    }
    if (isLiveCheckoutUrl(entry.gumroad)) {
      links.push({
        label: "Checkout on Gumroad",
        url: entry.gumroad.trim(),
        primary: links.length === 0
      });
    }
    return links;
  }

  function formatKitDigest(kit) {
    const moduleLines = kit.modules.map((m) => `  - ${m.path}: ${m.desc}`).join("\n");
    return [
      `${kit.title} (${kit.subtitle})`,
      `Price: $${kit.priceUsd} USD | License: ${kit.license} | Archive: ${kit.archiveName}`,
      `Package: ${kit.fileCount} (${kit.archiveBytes})`,
      `Verified: ${kit.testBadge}`,
      `Modules:\n${moduleLines}`,
      `Contact: ${cfg.STOREFRONT_META.authorName} (${cfg.STOREFRONT_META.githubHandle}) — ${cfg.STOREFRONT_META.contactEmail}`,
      `GitHub: ${cfg.STOREFRONT_META.githubUrl}`
    ].join("\n");
  }

  function copyTextSafely(text, onDone) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      navigator.clipboard.writeText(text).then(
        () => onDone(true),
        () => onDone(false)
      );
      return;
    }
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      onDone(Boolean(ok));
    } catch {
      onDone(false);
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function getCardPriceDisplay(kit) {
    if (kit.priceUsd === 0) {
      return { text: "$0 FREE", pillClass: "is-free" };
    }
    if (pricingMode === "bundle" && kit.id !== "founderBundle") {
      return { text: "In $49 Bundle", pillClass: "is-bundle" };
    }
    return { text: `$${kit.priceUsd}`, pillClass: "" };
  }

  function renderCatalog() {
    const grid = document.getElementById("kitsGrid");
    const meta = document.getElementById("resultsMeta");
    if (!grid) return;

    const visibleKits = KITS.filter((k) => activeFilter === "all" || k.category === activeFilter);
    grid.innerHTML = KITS.map((kit) => {
      const isVisible = activeFilter === "all" || kit.category === activeFilter;
      const priceInfo = getCardPriceDisplay(kit);
      const liveLinks = resolveCheckoutLinks(kit.id);
      const primaryCtaLabel =
        liveLinks.length > 0
          ? liveLinks[0].label
          : kit.priceUsd === 0
          ? "Get Free Starter ($0)"
          : `Inspect & Get ($${kit.priceUsd})`;

      return `
        <article class="kit-card" data-kit-id="${escapeHtml(kit.id)}" data-category="${escapeHtml(kit.category)}" ${isVisible ? "" : "hidden"}>
          <div class="kit-cover-wrap">
            <img class="kit-cover-img" src="${escapeHtml(kit.cover)}" alt="${escapeHtml(kit.coverAlt)}" width="1280" height="720" loading="eager" />
            <span class="kit-tier-badge">${escapeHtml(kit.tierLabel)}</span>
          </div>
          <div class="kit-body">
            <div class="kit-header-row">
              <h3 class="kit-title">${escapeHtml(kit.title)}</h3>
              <span class="kit-price-pill ${priceInfo.pillClass}">${escapeHtml(priceInfo.text)}</span>
            </div>
            <p class="kit-summary">${escapeHtml(kit.summary)}</p>
            <div class="kit-specs-row">
              <span class="spec-chip">${escapeHtml(kit.fileCount)}</span>
              <span class="spec-chip">${escapeHtml(kit.license)}</span>
              <span class="spec-chip is-pass">${escapeHtml(kit.testBadge)}</span>
            </div>
            <ul class="kit-highlights">
              ${kit.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}
            </ul>
            <div class="kit-footer">
              ${
                liveLinks.length > 0
                  ? `<a class="btn btn-primary" href="${escapeHtml(liveLinks[0].url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(primaryCtaLabel)}</a>
                     <button type="button" class="btn btn-secondary" data-inspect-id="${escapeHtml(kit.id)}">Inspect Spec</button>`
                  : `<button type="button" class="btn btn-primary" data-inspect-id="${escapeHtml(kit.id)}">${escapeHtml(primaryCtaLabel)}</button>
                     <button type="button" class="btn btn-ghost" data-copy-id="${escapeHtml(kit.id)}">Copy Spec</button>`
              }
            </div>
          </div>
        </article>
      `;
    }).join("");

    if (meta) {
      meta.textContent = `Showing ${visibleKits.length} of ${KITS.length} kits`;
    }
  }

  function openModal(kitId, triggerEl) {
    const kit = KITS.find((item) => item.id === kitId);
    const modal = document.getElementById("packModal");
    if (!kit || !modal) return;

    lastTriggerEl = triggerEl || document.activeElement;

    document.getElementById("modalEyebrow").textContent = `${kit.tierLabel} · ${kit.license} License`;
    document.getElementById("modalTitle").textContent = `${kit.title} — $${kit.priceUsd}`;

    const coverImg = document.getElementById("modalCoverImg");
    coverImg.src = kit.cover;
    coverImg.alt = kit.coverAlt;

    document.getElementById("modalMetaBar").innerHTML = `
      <span class="spec-chip">${escapeHtml(kit.archiveName)}</span>
      <span class="spec-chip">${escapeHtml(kit.fileCount)}</span>
      <span class="spec-chip">${escapeHtml(kit.archiveBytes)}</span>
      <span class="spec-chip is-pass">${escapeHtml(kit.testBadge)}</span>
    `;

    document.getElementById("modalSummary").textContent = kit.summary;

    document.getElementById("modalModulesList").innerHTML = kit.modules
      .map(
        (m) => `
        <li class="modal-module-item">
          <span class="modal-module-path">${escapeHtml(m.path)}</span>
          <span>${escapeHtml(m.desc)}</span>
        </li>
      `
      )
      .join("");

    document.getElementById("modalTestBox").textContent = kit.testOutput;

    const checkoutPanel = document.getElementById("modalCheckoutPanel");
    const liveLinks = resolveCheckoutLinks(kit.id);
    const mailSubject = encodeURIComponent(`Kit Access Request: ${kit.title} ($${kit.priceUsd})`);
    const mailBody = encodeURIComponent(
      `Hi ${cfg.STOREFRONT_META.authorName},\n\nI would like access / checkout details for:\n- ${kit.title} (${kit.archiveName})\n`
    );
    const mailtoUrl = `mailto:${cfg.STOREFRONT_META.contactEmail}?subject=${mailSubject}&body=${mailBody}`;

    if (liveLinks.length > 0) {
      checkoutPanel.innerHTML = `
        <div class="modal-actions-row">
          ${liveLinks
            .map(
              (lnk) =>
                `<a class="btn ${lnk.primary ? "btn-primary" : "btn-secondary"}" href="${escapeHtml(lnk.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(lnk.label)} — $${kit.priceUsd}</a>`
            )
            .join("")}
          <button type="button" class="btn btn-ghost" id="modalCopyDigestBtn">Copy Kit Digest</button>
        </div>
        <p class="copy-feedback" id="modalCopyFeedback" role="status" aria-live="polite"></p>
      `;
    } else {
      checkoutPanel.innerHTML = `
        <p class="bundle-meta-note">
          <strong>Direct Kit Access Mode:</strong> Paste live Payhip or Gumroad URLs into <code>kits/config.js</code> anytime,
          or copy the verified kit spec below and contact <code>${escapeHtml(cfg.STOREFRONT_META.githubHandle)}</code> directly.
        </p>
        <div class="modal-actions-row">
          <button type="button" class="btn btn-primary" id="modalCopyDigestBtn">Copy Kit Digest</button>
          <a class="btn btn-secondary" href="${escapeHtml(cfg.STOREFRONT_META.githubUrl)}" target="_blank" rel="noopener noreferrer">GitHub (${escapeHtml(cfg.STOREFRONT_META.githubHandle)})</a>
          <a class="btn btn-ghost" href="${escapeHtml(mailtoUrl)}">Email Request</a>
        </div>
        <p class="copy-feedback" id="modalCopyFeedback" role="status" aria-live="polite"></p>
      `;
    }

    const modalCopyBtn = document.getElementById("modalCopyDigestBtn");
    const modalFeedback = document.getElementById("modalCopyFeedback");
    if (modalCopyBtn && modalFeedback) {
      modalCopyBtn.addEventListener("click", () => {
        copyTextSafely(formatKitDigest(kit), (ok) => {
          modalFeedback.textContent = ok
            ? `Copied ${kit.archiveName} digest to clipboard.`
            : "Clipboard unavailable in this context — use GitHub or Email link above.";
        });
      });
    }

    modal.hidden = false;
    document.body.classList.add("modal-open");
    const closeBtn = document.getElementById("modalCloseBtn");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    const modal = document.getElementById("packModal");
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    if (lastTriggerEl && typeof lastTriggerEl.focus === "function") {
      lastTriggerEl.focus();
    }
    lastTriggerEl = null;
  }

  function bindEvents() {
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeFilter = btn.dataset.filter || "all";
        document.querySelectorAll(".filter-btn").forEach((el) => {
          el.setAttribute("aria-pressed", el === btn ? "true" : "false");
        });
        renderCatalog();
      });
    });

    document.querySelectorAll(".pricing-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        pricingMode = btn.dataset.pricingMode || "individual";
        document.querySelectorAll(".pricing-btn").forEach((el) => {
          el.setAttribute("aria-pressed", el === btn ? "true" : "false");
        });
        renderCatalog();
      });
    });

    document.addEventListener("click", (event) => {
      const inspectBtn = event.target.closest("[data-inspect-id]");
      if (inspectBtn) {
        openModal(inspectBtn.dataset.inspectId, inspectBtn);
        return;
      }

      const copyBtn = event.target.closest("[data-copy-id]");
      if (copyBtn) {
        const kit = KITS.find((k) => k.id === copyBtn.dataset.copyId);
        if (kit) {
          copyTextSafely(formatKitDigest(kit), (ok) => {
            const prev = copyBtn.textContent;
            copyBtn.textContent = ok ? "Copied!" : "Inspect";
            setTimeout(() => {
              copyBtn.textContent = prev;
            }, 1600);
          });
        }
      }
    });

    const bundleCopyBtn = document.getElementById("copyBundleDigestBtn");
    const bundleFeedback = document.getElementById("bundleCopyFeedback");
    if (bundleCopyBtn && bundleFeedback) {
      bundleCopyBtn.addEventListener("click", () => {
        const bundleKit = KITS.find((k) => k.id === "founderBundle");
        if (!bundleKit) return;
        copyTextSafely(formatKitDigest(bundleKit), (ok) => {
          bundleFeedback.textContent = ok
            ? "Copied All-4-Pack Founder Bundle ($49) digest to clipboard."
            : "Clipboard unavailable — click Inspect Bundle to view full spec.";
        });
      });
    }

    const closeBtn = document.getElementById("modalCloseBtn");
    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    const modal = document.getElementById("packModal");
    if (modal) {
      modal.addEventListener("click", (event) => {
        if (event.target === modal) {
          closeModal();
        }
      });
    }

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    });
  }

  function init() {
    const brandNameEl = document.getElementById("brandName");
    if (brandNameEl && cfg.STOREFRONT_META && cfg.STOREFRONT_META.brandName) {
      brandNameEl.textContent = cfg.STOREFRONT_META.brandName;
    }
    renderCatalog();
    bindEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
