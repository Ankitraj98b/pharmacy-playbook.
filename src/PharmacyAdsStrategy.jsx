import { useState } from "react";

const COLORS = {
  bg: "#0B0F1A",
  card: "#111827",
  cardBorder: "#1E2A3A",
  accent: "#00C896",
  accentDim: "#00C89622",
  accentGlow: "#00C89644",
  warn: "#F59E0B",
  red: "#EF4444",
  blue: "#3B82F6",
  purple: "#8B5CF6",
  text: "#E8EDF5",
  muted: "#8B9AB0",
  white: "#FFFFFF",
};

const tabs = ["📊 Overview", "🎯 Keywords", "👥 Audiences", "📣 Ad Copy", "🤖 Automation", "📅 Timeline"];

const keywords = {
  "🔥 High Intent (Use These First)": [
    { kw: "B Pharm admission 2026", intent: "Very High", cpc: "₹12–25" },
    { kw: "D Pharm college near me", intent: "Very High", cpc: "₹10–20" },
    { kw: "pharmacy college admission open", intent: "Very High", cpc: "₹8–18" },
    { kw: "B Pharma fees structure", intent: "High", cpc: "₹7–15" },
    { kw: "pharmacy course after 12th PCB", intent: "High", cpc: "₹6–14" },
    { kw: "D Pharma 2 year course", intent: "High", cpc: "₹5–12" },
    { kw: "pharmacy college [your city]", intent: "Very High", cpc: "₹10–22" },
    { kw: "GPAT coaching admission", intent: "High", cpc: "₹8–16" },
  ],
  "📈 Mid Intent (Scale With)": [
    { kw: "career in pharmacy India", intent: "Medium", cpc: "₹4–10" },
    { kw: "pharmacy salary after B Pharm", intent: "Medium", cpc: "₹3–8" },
    { kw: "best pharmacy college India 2026", intent: "Medium", cpc: "₹5–12" },
    { kw: "pharmacy vs nursing which is better", intent: "Medium", cpc: "₹3–7" },
    { kw: "PCI approved pharmacy college", intent: "Medium", cpc: "₹6–13" },
    { kw: "pharmacy job scope India", intent: "Medium", cpc: "₹3–8" },
    { kw: "pharma company jobs fresher", intent: "Medium", cpc: "₹4–9" },
    { kw: "M Pharm after B Pharm", intent: "Medium", cpc: "₹5–11" },
  ],
  "🌱 Awareness (Retarget These)": [
    { kw: "science stream career options", intent: "Low", cpc: "₹2–5" },
    { kw: "PCB career without NEET", intent: "Low", cpc: "₹2–6" },
    { kw: "healthcare courses after 12th", intent: "Low", cpc: "₹2–5" },
    { kw: "paramedical courses India", intent: "Low", cpc: "₹2–4" },
    { kw: "best course after 12th biology", intent: "Low", cpc: "₹2–5" },
    { kw: "drug inspector exam preparation", intent: "Low", cpc: "₹3–7" },
  ],
};

const audiences = [
  {
    name: "Primary — Students",
    icon: "🎓",
    color: COLORS.accent,
    age: "17–22",
    targeting: [
      "Interests: Pharmacy, NEET, Biology, Science",
      "Education: High school / 12th pass",
      "Behaviors: Engaged with edu content",
      "Location: 50–100km radius of college",
    ],
    budget: "40% of total budget",
    expectedCPL: "₹60–90",
  },
  {
    name: "Secondary — Parents",
    icon: "👨‍👩‍👧",
    color: COLORS.warn,
    age: "35–50",
    targeting: [
      "Interests: Child education, Career counselling",
      "Behaviors: Parents of teenagers",
      "Income: Middle class India",
      "Facebook users (not Instagram)",
    ],
    budget: "30% of total budget",
    expectedCPL: "₹80–120",
  },
  {
    name: "Retargeting — Warm",
    icon: "🔄",
    color: COLORS.purple,
    age: "All",
    targeting: [
      "Video viewers 50%+ (last 14 days)",
      "Page engagers (last 30 days)",
      "Lead form openers who didn't submit",
      "Website visitors (if pixel set up)",
    ],
    budget: "20% of total budget",
    expectedCPL: "₹30–50",
  },
  {
    name: "Lookalike — Scale",
    icon: "🚀",
    color: COLORS.blue,
    age: "17–30",
    targeting: [
      "1% LAL from converted admissions list",
      "1% LAL from lead form submitters",
      "2–3% LAL for broader reach",
      "Combine with interest stack",
    ],
    budget: "10% of total budget",
    expectedCPL: "₹50–80",
  },
];

const adCopies = [
  {
    type: "🔥 Pain Hook — For Students",
    hook: "NEET didn't go as planned? That's okay. ✅",
    body: "B.Pharm & D.Pharm at Krishna Institute of Pharmacy opens direct doors to MNCs like Sun Pharma, Cipla, Dr. Reddy's — no NEET required.\n\n✅ PCI Approved College\n✅ 100% Placement Support\n✅ EMI Available on Fees\n✅ Hostel Facility\n\nAdmissions for 2026 batch — CLOSING SOON 🔔",
    cta: "Apply for Free Counselling →",
    platform: "Facebook + Instagram",
    format: "Image / Carousel",
  },
  {
    type: "💡 Career Angle — For Students",
    hook: "Earn ₹4–12 LPA after just 4 years of B.Pharm 💊",
    body: "India's pharma industry is worth $130 Billion and growing. Companies like Cipla, Zydus, Abbott are hiring every month.\n\nAt Krishna Institute of Pharmacy:\n🏆 NAAC Accredited\n📚 Experienced Faculty\n🏭 Industry Tie-ups\n💼 Campus Placements\n\nLimited seats available for 2026.",
    cta: "Check Eligibility & Apply →",
    platform: "Instagram Reels + Facebook",
    format: "Video (30–60 sec)",
  },
  {
    type: "👨‍👩‍👧 Parent-Focused Ad",
    hook: "Secure your child's future in 2 years with D.Pharm 🎓",
    body: "While other courses take 5+ years, D.Pharm at Krishna Institute gives your child:\n\n✅ Govt-registered qualification in just 2 years\n✅ Own pharmacy / medical shop license eligibility\n✅ Hospital jobs from Day 1 of passing\n\nAffordable fee | Scholarship available | Hostel facility",
    cta: "Get Free Brochure on WhatsApp →",
    platform: "Facebook (Desktop Feed)",
    format: "Image Ad",
  },
  {
    type: "⏰ Urgency Ad — Closing Seats",
    hook: "⚠️ Only 12 seats left in B.Pharm 2026 Batch",
    body: "We've already enrolled 80+ students this year.\n\nDon't miss out — Once seats fill, admission closes.\n\n🎯 B.Pharm | D.Pharm | M.Pharm\n📍 Krishna Institute of Pharmacy\n📞 Free counselling session — TODAY ONLY\n\nFill the form below in 30 seconds.",
    cta: "Claim My Seat Now →",
    platform: "Retargeting Only",
    format: "Single Image",
  },
];

const automationSteps = [
  {
    step: "Step 1",
    title: "Meta Lead Form Fills",
    desc: "User sees ad → fills 4-field instant form (Name, Mobile, City, Course). Qualifying question filters non-PCB students automatically.",
    tool: "Meta Ads Manager",
    color: COLORS.accent,
    time: "0 sec",
  },
  {
    step: "Step 2",
    title: "Zapier / Make.com Webhook",
    desc: "New lead triggers Zapier. Lead data (name, mobile, course) is passed instantly to Google Sheets CRM + WhatsApp API simultaneously.",
    tool: "Zapier (Free plan: 100 tasks/month) or Make.com",
    color: COLORS.blue,
    time: "< 30 sec",
  },
  {
    step: "Step 3",
    title: "Auto WhatsApp Message (Day 0)",
    desc: "WATI / Interakt sends branded WhatsApp: Welcome message + College brochure PDF + Course fee details + Application link. 24/7 — no human needed.",
    tool: "WATI / Interakt / AiSensy (₹999–2499/mo)",
    color: COLORS.purple,
    time: "Instant",
  },
  {
    step: "Step 4",
    title: "WhatsApp Chatbot Qualification",
    desc: "Bot asks: 'Have you completed 12th with PCB? Which course are you interested in?' Hot leads (answered yes + course selected) are flagged in CRM.",
    tool: "WhatsApp Chatbot (built-in with WATI)",
    color: COLORS.warn,
    time: "Day 0",
  },
  {
    step: "Step 5",
    title: "Day 2 — Follow-up Message",
    desc: "Automated: 'Hi [Name], have you had a chance to go through our brochure? We'd love to help you secure your seat before they fill up 🎓'",
    tool: "WATI Drip Sequence",
    color: COLORS.accent,
    time: "Day 2",
  },
  {
    step: "Step 6",
    title: "Day 4 — Testimonial / Social Proof",
    desc: "Send student success story: 'Meet Priya — she joined B.Pharm last year, now placed at Cipla at ₹5.2 LPA 💊' + CTA to book counselling.",
    tool: "WATI Drip Sequence",
    color: COLORS.blue,
    time: "Day 4",
  },
  {
    step: "Step 7",
    title: "Day 7 — Scarcity Close",
    desc: "Final automated push: 'Only a few seats left for 2026 batch. Scholarship deadline is [date]. Reply YES to reserve your seat — no commitment needed.'",
    tool: "WATI Drip Sequence",
    color: COLORS.red,
    time: "Day 7",
  },
  {
    step: "Step 8",
    title: "Google Sheets Live Dashboard",
    desc: "Every lead auto-logged: Name, Mobile, Course, City, Date, WhatsApp Status. Filter hot/warm/cold. You see real-time ROI without touching anything.",
    tool: "Google Sheets + Zapier",
    color: COLORS.accent,
    time: "Always-on",
  },
];

const timeline = [
  { week: "Week 1", title: "Setup & Launch", color: COLORS.accent, tasks: [
    "Create Meta Business Manager + Ad Account",
    "Install Facebook Pixel on college website",
    "Set up Google Sheets CRM template",
    "Connect Zapier: Meta Leads → Sheets + WhatsApp",
    "Create WATI account + upload brochure",
    "Build 3 ad creatives (1 video + 2 images)",
    "Launch Campaign 1 — Lead Gen (₹300–500/day)",
  ]},
  { week: "Week 2", title: "Optimize & Test", color: COLORS.blue, tasks: [
    "Kill ad sets with CPL > ₹150",
    "Scale ad sets with CPL < ₹80 (increase budget 20%)",
    "A/B test 2 different hooks in ad copy",
    "Launch Campaign 2 — Retargeting warm audience",
    "Check WhatsApp open rates in WATI dashboard",
    "Add negative keywords (exclude competitor names)",
    "Review lead quality — adjust qualifying question if needed",
  ]},
  { week: "Week 3", title: "Scale Winners", color: COLORS.purple, tasks: [
    "Create Lookalike audience from submitted leads",
    "Refresh creatives to avoid ad fatigue",
    "Add video view campaign (awareness layer)",
    "Increase retargeting budget to 25% of total",
    "Start collecting video testimonials from enrolled students",
    "Update WhatsApp Day 4 message with real testimonial",
  ]},
  { week: "Week 4", title: "Report & Upsell", color: COLORS.warn, tasks: [
    "Build ROI report for college: leads → admissions",
    "Calculate your CPL, CPA, ROAS clearly",
    "Present results — negotiate retainer increase",
    "Propose ₹15,000/admission for next season",
    "Set up Facebook CAPI for better tracking post-iOS",
    "Plan next month content calendar",
  ]},
];

export default function PharmacyAdsStrategy() {
  const [activeTab, setActiveTab] = useState(0);
  const [expandedAd, setExpandedAd] = useState(null);
  const [expandedAuto, setExpandedAuto] = useState(null);

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", color: COLORS.text, fontFamily: "'Inter', system-ui, sans-serif", padding: "0 0 60px 0" }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, #0B0F1A 0%, #0D1F2D 100%)`, borderBottom: `1px solid ${COLORS.cardBorder}`, padding: "32px 24px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ background: COLORS.accentDim, border: `1px solid ${COLORS.accent}`, color: COLORS.accent, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, letterSpacing: 1.5, textTransform: "uppercase" }}>Live Strategy</span>
            <span style={{ color: COLORS.muted, fontSize: 12 }}>Updated June 2026</span>
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0, lineHeight: 1.2, letterSpacing: -0.5 }}>
            Krishna Institute of Pharmacy
            <span style={{ color: COLORS.accent }}> — Meta Ads Playbook</span>
          </h1>
          <p style={{ color: COLORS.muted, margin: "8px 0 20px", fontSize: 14 }}>
            Full automation strategy · Zero investment · Maximum admissions
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[
              { label: "Your Investment", val: "₹0", color: COLORS.accent },
              { label: "Daily Retainer", val: "₹300–400", color: COLORS.warn },
              { label: "Per Admission", val: "₹10,000", color: COLORS.purple },
              { label: "Target CPL", val: "< ₹100", color: COLORS.blue },
            ].map(s => (
              <div key={s.label} style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 10, padding: "10px 16px" }}>
                <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: `1px solid ${COLORS.cardBorder}`, background: COLORS.card, position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", overflowX: "auto", gap: 0 }}>
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setActiveTab(i)} style={{
              background: "none", border: "none", padding: "14px 18px", cursor: "pointer", fontSize: 13, fontWeight: activeTab === i ? 700 : 400,
              color: activeTab === i ? COLORS.accent : COLORS.muted,
              borderBottom: activeTab === i ? `2px solid ${COLORS.accent}` : "2px solid transparent",
              whiteSpace: "nowrap", transition: "all 0.2s"
            }}>{t}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 16px" }}>

        {/* OVERVIEW TAB */}
        {activeTab === 0 && (
          <div>
            <h2 style={{ color: COLORS.accent, fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Campaign Structure Overview</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 24 }}>
              {[
                { title: "Campaign 1 — Lead Generation", icon: "🎯", color: COLORS.accent, items: ["Objective: Lead Generation", "3 Ad Sets (Students / Parents / Broad)", "Meta Instant Forms — 4 fields max", "Budget: 70% of daily spend", "Placements: FB Feed + Instagram Feed + Reels"] },
                { title: "Campaign 2 — Retargeting", icon: "🔄", color: COLORS.purple, items: ["Objective: Lead Gen / Conversions", "Audience: Video viewers 50%+ watch", "Page engagers (30 days)", "Form openers who didn't submit", "Budget: 20% of daily spend"] },
                { title: "Campaign 3 — Lookalike Scale", icon: "🚀", color: COLORS.blue, items: ["Objective: Lead Generation", "Source: Converted leads list", "1% LAL — tightest match", "Run after Week 2+ data", "Budget: 10% of daily spend"] },
              ].map(c => (
                <div key={c.title} style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 14, padding: 20 }}>
                  <div style={{ fontSize: 22, marginBottom: 8 }}>{c.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: c.color, marginBottom: 12 }}>{c.title}</div>
                  {c.items.map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 6, fontSize: 12.5, color: COLORS.muted }}>
                      <span style={{ color: c.color, marginTop: 1 }}>▸</span>{item}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <h2 style={{ color: COLORS.accent, fontSize: 18, fontWeight: 700, marginBottom: 16 }}>Profit Calculator</h2>
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 14, overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "#0D1F2D" }}>
                    {["Scenario", "Ad Budget/Day", "Leads/Month", "Conversions (6%)", "Admission Revenue", "Retainer", "Total Earning"].map(h => (
                      <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, color: COLORS.muted, fontWeight: 600, letterSpacing: 0.5, borderBottom: `1px solid ${COLORS.cardBorder}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Conservative", "₹500", "150", "9", "₹90,000", "₹9,000", "₹99,000"],
                    ["Moderate", "₹1,000", "300", "18", "₹1,80,000", "₹9,000", "₹1,89,000"],
                    ["Aggressive", "₹2,000", "600", "36", "₹3,60,000", "₹9,000", "₹3,69,000"],
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${COLORS.cardBorder}` }}>
                      {row.map((cell, j) => (
                        <td key={j} style={{ padding: "12px 14px", fontSize: 13, color: j === 6 ? COLORS.accent : j === 0 ? COLORS.text : COLORS.muted, fontWeight: j === 6 ? 700 : 400 }}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ color: COLORS.muted, fontSize: 12, marginTop: 8 }}>* You invest ₹0. College pays ad budget. You earn retainer + per admission bonus.</p>
          </div>
        )}

        {/* KEYWORDS TAB */}
        {activeTab === 1 && (
          <div>
            <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 20 }}>
              These keywords are used in <strong style={{ color: COLORS.text }}>Meta's Detailed Targeting</strong> (interests/behaviors), not Google Search. Enter them exactly as listed in Ads Manager → Ad Set → Detailed Targeting → Search box.
            </p>
            {Object.entries(keywords).map(([cat, kws]) => (
              <div key={cat} style={{ marginBottom: 28 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, marginBottom: 12 }}>{cat}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 10 }}>
                  {kws.map(k => (
                    <div key={k.kw} style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 10, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text, marginBottom: 4 }}>{k.kw}</div>
                        <div style={{ fontSize: 11, color: COLORS.muted }}>Est. CPL: {k.cpc}</div>
                      </div>
                      <span style={{ fontSize: 10, padding: "3px 8px", borderRadius: 8, fontWeight: 700, background: k.intent === "Very High" ? "#00C89633" : k.intent === "High" ? "#F59E0B22" : k.intent === "Medium" ? "#3B82F622" : "#6B728022", color: k.intent === "Very High" ? COLORS.accent : k.intent === "High" ? COLORS.warn : k.intent === "Medium" ? COLORS.blue : COLORS.muted }}>
                        {k.intent}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ background: "#0D1F2D", border: `1px solid ${COLORS.accent}22`, borderRadius: 12, padding: 16, marginTop: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.accent, marginBottom: 8 }}>⚡ Pro Tip: Keyword Stacking</div>
              <div style={{ fontSize: 12.5, color: COLORS.muted, lineHeight: 1.7 }}>
                In one Ad Set, stack 4–6 "High Intent" keywords using the OR logic (user matches ANY). This gives Meta's algorithm more signals while keeping your audience tight. Start with audience size of 2–5 lakh (200K–500K) for best performance in India.
              </div>
            </div>
          </div>
        )}

        {/* AUDIENCES TAB */}
        {activeTab === 2 && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
              {audiences.map(a => (
                <div key={a.name} style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 14, padding: 20, borderTop: `3px solid ${a.color}` }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{a.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: a.color, marginBottom: 4 }}>{a.name}</div>
                  <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 12 }}>Age: {a.age}</div>
                  {a.targeting.map(t => (
                    <div key={t} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 12.5, color: COLORS.muted }}>
                      <span style={{ color: a.color }}>•</span>{t}
                    </div>
                  ))}
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${COLORS.cardBorder}`, display: "flex", justifyContent: "space-between" }}>
                    <div><div style={{ fontSize: 10, color: COLORS.muted }}>BUDGET SPLIT</div><div style={{ fontSize: 13, fontWeight: 700, color: a.color }}>{a.budget}</div></div>
                    <div style={{ textAlign: "right" }}><div style={{ fontSize: 10, color: COLORS.muted }}>TARGET CPL</div><div style={{ fontSize: 13, fontWeight: 700, color: a.color }}>{a.expectedCPL}</div></div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 14, padding: 20, marginTop: 20 }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: COLORS.text, marginBottom: 14 }}>🚫 Exclusions (Critical — Add These)</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {["People who already submitted the lead form", "Existing students (upload email/phone list)", "Competitors' page followers", "People interested in 'Online degrees only'", "Age below 16 (too young)", "Outside 100km radius of college"].map(e => (
                  <div key={e} style={{ display: "flex", gap: 8, fontSize: 12.5, color: COLORS.muted }}>
                    <span style={{ color: COLORS.red }}>✕</span>{e}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AD COPY TAB */}
        {activeTab === 3 && (
          <div>
            <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 20 }}>
              4 battle-tested ad copies. Use all 4 — A/B test in Week 1, keep winners in Week 2.
            </p>
            {adCopies.map((ad, i) => (
              <div key={i} style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 14, marginBottom: 14, overflow: "hidden" }}>
                <div style={{ padding: "14px 20px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }} onClick={() => setExpandedAd(expandedAd === i ? null : i)}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>{ad.type}</div>
                    <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>{ad.platform} · {ad.format}</div>
                  </div>
                  <span style={{ color: COLORS.accent, fontSize: 18 }}>{expandedAd === i ? "▲" : "▼"}</span>
                </div>
                {expandedAd === i && (
                  <div style={{ padding: "0 20px 20px", borderTop: `1px solid ${COLORS.cardBorder}` }}>
                    <div style={{ background: "#0D1F2D", borderRadius: 10, padding: 16, marginTop: 14 }}>
                      <div style={{ fontSize: 15, fontWeight: 800, color: COLORS.white, marginBottom: 10 }}>{ad.hook}</div>
                      <div style={{ fontSize: 13, color: COLORS.muted, whiteSpace: "pre-line", lineHeight: 1.8, marginBottom: 14 }}>{ad.body}</div>
                      <div style={{ display: "inline-block", background: COLORS.accent, color: "#000", fontSize: 13, fontWeight: 700, padding: "8px 16px", borderRadius: 8 }}>{ad.cta}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <div style={{ background: "#0D1F2D", border: `1px solid ${COLORS.warn}33`, borderRadius: 12, padding: 16, marginTop: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.warn, marginBottom: 8 }}>📋 Lead Form Fields (Keep It Short!)</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[["Full Name", "Required"], ["Mobile Number", "Required"], ["City", "Required"], ["Course Interest", "Dropdown: B.Pharm / D.Pharm / M.Pharm"], ["[Qualifying]", "Have you completed 12th with Science? Yes/No"]].map(([f, d]) => (
                  <div key={f} style={{ background: COLORS.card, borderRadius: 8, padding: "8px 12px" }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.text }}>{f}</div>
                    <div style={{ fontSize: 11, color: COLORS.muted }}>{d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* AUTOMATION TAB */}
        {activeTab === 4 && (
          <div>
            <p style={{ color: COLORS.muted, fontSize: 13, marginBottom: 20 }}>
              This is the engine that runs 24/7 without you. Every lead gets nurtured automatically. <strong style={{ color: COLORS.accent }}>No manual calling needed.</strong>
            </p>
            <div style={{ position: "relative" }}>
              {automationSteps.map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 16, marginBottom: 4 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 40 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: s.color + "22", border: `2px solid ${s.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: s.color, flexShrink: 0 }}>{i + 1}</div>
                    {i < automationSteps.length - 1 && <div style={{ width: 2, flex: 1, background: COLORS.cardBorder, minHeight: 20, margin: "4px 0" }} />}
                  </div>
                  <div style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderRadius: 12, padding: "14px 16px", marginBottom: 8, flex: 1, cursor: "pointer" }} onClick={() => setExpandedAuto(expandedAuto === i ? null : i)}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: s.color, marginBottom: 2 }}>{s.title}</div>
                        <div style={{ fontSize: 11, color: COLORS.muted }}>{s.tool}</div>
                      </div>
                      <span style={{ background: s.color + "22", color: s.color, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 10 }}>{s.time}</span>
                    </div>
                    {expandedAuto === i && (
                      <div style={{ fontSize: 12.5, color: COLORS.muted, marginTop: 10, lineHeight: 1.7, borderTop: `1px solid ${COLORS.cardBorder}`, paddingTop: 10 }}>{s.desc}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.accent}33`, borderRadius: 14, padding: 20, marginTop: 16 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent, marginBottom: 14 }}>🛠 Tools Stack (All Low/No Cost)</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10 }}>
                {[
                  { tool: "Meta Ads Manager", cost: "Free", use: "Run all campaigns" },
                  { tool: "Zapier", cost: "Free (100/mo)", use: "Lead → Sheet + WA" },
                  { tool: "Google Sheets", cost: "Free", use: "Live CRM dashboard" },
                  { tool: "WATI / AiSensy", cost: "₹999–2499/mo", use: "WhatsApp automation" },
                  { tool: "Canva", cost: "Free", use: "Ad creatives" },
                  { tool: "CapCut", cost: "Free", use: "Video ad editing" },
                ].map(t => (
                  <div key={t.tool} style={{ background: "#0D1F2D", borderRadius: 10, padding: "10px 12px" }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: COLORS.text }}>{t.tool}</div>
                    <div style={{ fontSize: 11, color: COLORS.accent, margin: "2px 0" }}>{t.cost}</div>
                    <div style={{ fontSize: 11, color: COLORS.muted }}>{t.use}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TIMELINE TAB */}
        {activeTab === 5 && (
          <div>
            {timeline.map((w, i) => (
              <div key={i} style={{ background: COLORS.card, border: `1px solid ${COLORS.cardBorder}`, borderLeft: `4px solid ${w.color}`, borderRadius: 14, padding: 20, marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <span style={{ background: w.color + "22", color: w.color, fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 8, letterSpacing: 1 }}>{w.week}</span>
                  <span style={{ fontSize: 15, fontWeight: 700, color: COLORS.text }}>{w.title}</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 8 }}>
                  {w.tasks.map((t, j) => (
                    <div key={j} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 12.5, color: COLORS.muted }}>
                      <span style={{ color: w.color, marginTop: 1, flexShrink: 0 }}>✓</span>{t}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.accent}33`, borderRadius: 14, padding: 20 }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: COLORS.accent, marginBottom: 12 }}>🎯 Your KPIs to Track Weekly</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 10 }}>
                {[
                  { metric: "CPL (Cost Per Lead)", target: "< ₹100", color: COLORS.accent },
                  { metric: "CTR (Click-Through Rate)", target: "> 2%", color: COLORS.blue },
                  { metric: "Lead → WhatsApp Open", target: "> 60%", color: COLORS.purple },
                  { metric: "Lead → Admission", target: "> 5%", color: COLORS.warn },
                  { metric: "Ad Frequency", target: "< 3.5/week", color: COLORS.red },
                  { metric: "CPM (Cost per 1000)", target: "< ₹80", color: COLORS.accent },
                ].map(k => (
                  <div key={k.metric} style={{ background: "#0D1F2D", borderRadius: 10, padding: "10px 12px" }}>
                    <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 2 }}>{k.metric}</div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: k.color }}>{k.target}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
