import { useState, useEffect, useRef } from "react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { Zap, Brain, Target, TrendingUp, Calendar, BarChart3, Search, Users, MessageSquare, Globe, Sparkles, ChevronRight, Play, Pause, Check, AlertTriangle, ArrowUp, ArrowDown, Clock, Eye, Heart, Share2, MousePointer, DollarSign, Layers, RefreshCw, Send, FileText, Image, Video, Mic, Hash, AtSign, Link, Settings, Bell, Filter, Download, PlusCircle, X, ChevronDown, Activity, Cpu, Database, Workflow, Bot, Rocket, Shield, Award, Coffee, Copy, Wand2, Trophy, Crosshair } from "lucide-react";

// âââ Color Palette âââ
const C = {
  bg: "#0a0a0f", surface: "#12121a", card: "#1a1a2e", cardHover: "#22223a",
  border: "#2a2a4a", borderLight: "#3a3a5a",
  accent: "#6c5ce7", accentLight: "#a29bfe", accentDark: "#5a4bd1",
  green: "#00cec9", greenDark: "#00b894",
  orange: "#fdcb6e", orangeDark: "#e17055",
  pink: "#fd79a8", pinkDark: "#e84393",
  red: "#ff7675", blue: "#74b9ff", purple: "#a29bfe",
  text: "#e8e8f0", textMuted: "#8888aa", textDim: "#555577",
  gradient1: "linear-gradient(135deg, #6c5ce7, #a29bfe)",
  gradient2: "linear-gradient(135deg, #00cec9, #55efc4)",
  gradient3: "linear-gradient(135deg, #fd79a8, #fdcb6e)",
  gradient4: "linear-gradient(135deg, #0984e3, #74b9ff)",
};

// âââ Mock Data âââ
const trafficData = [
  { day: "Mon", organic: 4200, paid: 1800, social: 2100, referral: 900 },
  { day: "Tue", organic: 4800, paid: 2100, social: 1900, referral: 1100 },
  { day: "Wed", organic: 5100, paid: 1900, social: 2400, referral: 800 },
  { day: "Thu", organic: 5800, paid: 2400, social: 2800, referral: 1200 },
  { day: "Fri", organic: 6200, paid: 2800, social: 3100, referral: 1400 },
  { day: "Sat", organic: 4900, paid: 1500, social: 3800, referral: 900 },
  { day: "Sun", organic: 4100, paid: 1200, social: 4200, referral: 700 },
];

const conversionFunnel = [
  { stage: "Impressions", value: 284000, rate: 100 },
  { stage: "Clicks", value: 42600, rate: 15 },
  { stage: "Landing Page", value: 31950, rate: 75 },
  { stage: "Engagement", value: 19170, rate: 60 },
  { stage: "Lead", value: 5751, rate: 30 },
  { stage: "Conversion", value: 1725, rate: 30 },
];

const contentPipeline = [
  { id: 1, title: "AI-Powered SEO: The Ultimate 2026 Guide", type: "blog", status: "published", score: 94, engagement: 12400, trend: "up", platform: "Website", aiAgent: "ContentGen", scheduled: "Mar 10" },
  { id: 2, title: "5 Growth Hacking Strategies That Actually Work", type: "video", status: "scheduled", score: 87, engagement: 0, trend: "neutral", platform: "YouTube", aiAgent: "VideoScript", scheduled: "Mar 18" },
  { id: 3, title: "Marketing Automation Masterclass Thread", type: "thread", status: "in_review", score: 91, engagement: 0, trend: "neutral", platform: "X/Twitter", aiAgent: "ThreadWeaver", scheduled: "Mar 19" },
  { id: 4, title: "B2B Lead Gen: Cold Email Templates That Convert", type: "blog", status: "draft", score: 78, engagement: 0, trend: "neutral", platform: "Website", aiAgent: "ContentGen", scheduled: "Mar 22" },
  { id: 5, title: "Instagram Carousel: Data-Driven Marketing Tips", type: "carousel", status: "generating", score: 0, engagement: 0, trend: "neutral", platform: "Instagram", aiAgent: "VisualCraft", scheduled: "Mar 20" },
  { id: 6, title: "Podcast Episode: Future of Agentic Marketing", type: "audio", status: "scheduled", score: 82, engagement: 0, trend: "neutral", platform: "Spotify", aiAgent: "AudioGen", scheduled: "Mar 21" },
];

const aiAgents = [
  { name: "ContentGen", role: "Content Creation", status: "active", tasks: 47, accuracy: 96, icon: FileText, color: C.accent },
  { name: "SEO Oracle", role: "SEO Optimization", status: "active", tasks: 31, accuracy: 94, icon: Search, color: C.green },
  { name: "AdOptimizer", role: "Ad Campaign Mgmt", status: "active", tasks: 28, accuracy: 91, icon: Target, color: C.orange },
  { name: "SocialPulse", role: "Social Listening", status: "active", tasks: 156, accuracy: 89, icon: Globe, color: C.pink },
  { name: "ThreadWeaver", role: "Thread Generation", status: "idle", tasks: 12, accuracy: 93, icon: MessageSquare, color: C.blue },
  { name: "VisualCraft", role: "Visual Content", status: "processing", tasks: 19, accuracy: 88, icon: Image, color: C.purple },
  { name: "AnalyticsAI", role: "Data Analysis", status: "active", tasks: 84, accuracy: 97, icon: BarChart3, color: C.greenDark },
  { name: "LeadScorer", role: "Lead Qualification", status: "active", tasks: 203, accuracy: 92, icon: Users, color: C.orangeDark },
];

const seoKeywords = [
  { keyword: "ai marketing tools", volume: 14800, difficulty: 72, position: 3, change: 2, cpc: 8.40 },
  { keyword: "marketing automation", volume: 22100, difficulty: 85, position: 7, change: -1, cpc: 12.50 },
  { keyword: "content strategy ai", volume: 8900, difficulty: 45, position: 1, change: 0, cpc: 6.20 },
  { keyword: "agentic marketing", volume: 3200, difficulty: 28, position: 2, change: 5, cpc: 4.80 },
  { keyword: "seo automation 2026", volume: 6700, difficulty: 38, position: 4, change: 3, cpc: 7.10 },
  { keyword: "growth hacking strategies", volume: 18500, difficulty: 78, position: 11, change: -2, cpc: 9.30 },
];

const abTests = [
  { name: "Homepage Hero CTA", variant_a: "Start Free Trial", variant_b: "Unlock AI Power", a_conv: 3.2, b_conv: 4.8, confidence: 97, winner: "B", status: "completed" },
  { name: "Email Subject Line", variant_a: "Your weekly insights", variant_b: "AI found 3 opportunities", a_conv: 22.1, b_conv: 31.4, confidence: 99, winner: "B", status: "completed" },
  { name: "Landing Page Layout", variant_a: "Long-form", variant_b: "Video-first", a_conv: 5.1, b_conv: 4.9, confidence: 62, winner: "none", status: "running" },
  { name: "Ad Creative Style", variant_a: "Minimal text", variant_b: "Data overlay", a_conv: 1.8, b_conv: 2.4, confidence: 88, winner: "B", status: "running" },
];

const campaigns = [
  { name: "Q1 Product Launch", budget: 25000, spent: 18400, leads: 1240, cpl: 14.84, roas: 4.2, status: "active" },
  { name: "Brand Awareness Push", budget: 15000, spent: 12100, leads: 890, cpl: 13.60, roas: 3.8, status: "active" },
  { name: "Retargeting Warm Leads", budget: 8000, spent: 6200, leads: 420, cpl: 14.76, roas: 5.1, status: "active" },
  { name: "Competitor Conquest", budget: 12000, spent: 4800, leads: 310, cpl: 15.48, roas: 3.2, status: "paused" },
];

const audienceSegments = [
  { name: "High-Intent Visitors", size: 12400, conversion: 8.2, value: 240, growth: 15 },
  { name: "Email Engaged", size: 34200, conversion: 4.5, value: 180, growth: 8 },
  { name: "Social Followers", size: 89000, conversion: 1.2, value: 45, growth: 22 },
  { name: "Past Customers", size: 5800, conversion: 12.1, value: 520, growth: 3 },
  { name: "Lookalike Audiences", size: 156000, conversion: 2.8, value: 95, growth: 31 },
];

const competitorAds = [
  { id: 1, brand: "GrowthStack", niche: "SaaS Marketing", platform: "Meta", type: "Video Ad", headline: "10x Your Pipeline in 30 Days â AI Does the Work", cta: "Start Free Trial", impressions: 2840000, clicks: 142000, ctr: 5.0, conversions: 8520, cvr: 6.0, spend: 42000, roas: 6.8, score: 97, hook: "Pattern interrupt + bold claim + social proof", visual: "Split-screen before/after dashboard", trending: true },
  { id: 2, brand: "AdScale Pro", niche: "E-Commerce", platform: "Google", type: "Search Ad", headline: "Stop Wasting Ad Spend â AI Optimizes Every Dollar", cta: "See Demo", impressions: 1920000, clicks: 115200, ctr: 6.0, conversions: 6912, cvr: 6.0, spend: 28000, roas: 5.9, score: 94, hook: "Pain point + authority + urgency", visual: "Clean text with dynamic keyword insertion", trending: true },
  { id: 3, brand: "ContentForge", niche: "Content Marketing", platform: "LinkedIn", type: "Carousel Ad", headline: "How We Generated 500 Leads from 1 Blog Post", cta: "Get the Playbook", impressions: 890000, clicks: 53400, ctr: 6.0, conversions: 4272, cvr: 8.0, score: 92, spend: 15000, roas: 7.1, hook: "Specific result + curiosity gap", visual: "Data-rich carousel with step-by-step flow", trending: false },
  { id: 4, brand: "Pixel Perfect", niche: "Design Tools", platform: "Instagram", type: "Reel Ad", headline: "Create Stunning Designs in 60 Seconds â No Skills Needed", cta: "Try Free", impressions: 4200000, clicks: 210000, ctr: 5.0, conversions: 12600, cvr: 6.0, spend: 35000, roas: 5.4, score: 91, hook: "Time scarcity + democratization + FOMO", visual: "Fast-paced tutorial with music", trending: true },
  { id: 5, brand: "LeadRocket", niche: "Lead Generation", platform: "TikTok", type: "UGC Ad", headline: "This AI Bot Booked 47 Meetings While I Slept", cta: "Watch Demo", impressions: 6100000, clicks: 366000, ctr: 6.0, conversions: 18300, cvr: 5.0, spend: 22000, roas: 8.2, score: 96, hook: "Personal story + unbelievable result + authenticity", visual: "Face-to-camera testimonial style", trending: true },
  { id: 6, brand: "FunnelWise", niche: "Sales Funnels", platform: "YouTube", type: "Pre-Roll Ad", headline: "The $0 Funnel That Made $1M â Step by Step", cta: "Free Training", impressions: 3400000, clicks: 136000, ctr: 4.0, conversions: 9520, cvr: 7.0, spend: 48000, roas: 4.2, score: 88, hook: "Contrast hook + step-by-step promise", visual: "Whiteboard animation + live demo", trending: false },
];

const radarData = [
  { metric: "SEO", score: 92 }, { metric: "Content", score: 88 },
  { metric: "Social", score: 76 }, { metric: "Email", score: 84 },
  { metric: "Ads", score: 71 }, { metric: "Analytics", score: 95 },
];

const channelPie = [
  { name: "Organic Search", value: 38, color: C.accent },
  { name: "Paid Ads", value: 22, color: C.green },
  { name: "Social Media", value: 25, color: C.pink },
  { name: "Email", value: 10, color: C.orange },
  { name: "Referral", value: 5, color: C.blue },
];

const revenueData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  revenue: 2000 + Math.random() * 3000 + i * 80,
  cost: 800 + Math.random() * 600,
  profit: 1200 + Math.random() * 2400 + i * 60,
}));

// âââ Shared Styles âââ
const sCard = { background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, padding: 24, transition: "all 0.3s ease" };
const sBadge = (color) => ({ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: color + "18", color });
const sButton = (primary) => ({
  display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 10,
  border: primary ? "none" : `1px solid ${C.border}`, cursor: "pointer", fontSize: 13, fontWeight: 600,
  background: primary ? C.gradient1 : "transparent", color: primary ? "#fff" : C.textMuted,
  transition: "all 0.2s ease",
});
const sGlow = (color) => ({ boxShadow: `0 0 20px ${color}22, 0 4px 20px rgba(0,0,0,0.3)` });

// âââ Components âââ

function Metric({ icon: Icon, label, value, change, prefix = "", suffix = "", color = C.accent }) {
  const isUp = change > 0;
  return (
    <div style={{ ...sCard, ...sGlow(color), position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: color + "08" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: color + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={20} color={color} />
        </div>
        {change !== undefined && (
          <div style={{ display: "flex", alignItems: "center", gap: 2, color: isUp ? C.green : C.red, fontSize: 12, fontWeight: 600 }}>
            {isUp ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <div style={{ fontSize: 28, fontWeight: 800, color: C.text, letterSpacing: -1 }}>{prefix}{value}{suffix}</div>
      <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4 }}>{label}</div>
    </div>
  );
}

function AgentCard({ agent }) {
  const Icon = agent.icon;
  const statusColors = { active: C.green, idle: C.textMuted, processing: C.orange };
  const statusColor = statusColors[agent.status] || C.textMuted;
  return (
    <div style={{ ...sCard, padding: 16, display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: agent.color + "15", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon size={20} color={agent.color} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: C.text }}>{agent.name}</span>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: statusColor, display: "inline-block" }} />
        </div>
        <div style={{ fontSize: 11, color: C.textMuted }}>{agent.role}</div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: C.text }}>{agent.tasks}</div>
        <div style={{ fontSize: 10, color: C.textMuted }}>tasks</div>
      </div>
      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: agent.accuracy >= 93 ? C.green : C.orange }}>{agent.accuracy}%</div>
        <div style={{ fontSize: 10, color: C.textMuted }}>accuracy</div>
      </div>
    </div>
  );
}

function ContentRow({ item }) {
  const statusConfig = {
    published: { color: C.green, label: "Published" }, scheduled: { color: C.blue, label: "Scheduled" },
    in_review: { color: C.orange, label: "In Review" }, draft: { color: C.textMuted, label: "Draft" },
    generating: { color: C.pink, label: "AI Generating" },
  };
  const typeIcons = { blog: FileText, video: Video, thread: MessageSquare, carousel: Image, audio: Mic };
  const TypeIcon = typeIcons[item.type] || FileText;
  const sc = statusConfig[item.status];
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: `1px solid ${C.border}22` }}>
      <div style={{ width: 36, height: 36, borderRadius: 8, background: C.accent + "12", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <TypeIcon size={16} color={C.accentLight} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</div>
        <div style={{ display: "flex", gap: 10, marginTop: 4, fontSize: 11, color: C.textMuted }}>
          <span>{item.platform}</span>
          <span>Agent: {item.aiAgent}</span>
          <span>{item.scheduled}</span>
        </div>
      </div>
      <div style={sBadge(sc.color)}>{item.status === "generating" && <RefreshCw size={10} style={{ animation: "spin 1s linear infinite" }} />}{sc.label}</div>
      {item.score > 0 && (
        <div style={{ width: 40, textAlign: "center" }}>
          <div style={{ fontSize: 16, fontWeight: 800, color: item.score >= 90 ? C.green : item.score >= 80 ? C.orange : C.red }}>{item.score}</div>
          <div style={{ fontSize: 9, color: C.textMuted }}>score</div>
        </div>
      )}
      {item.engagement > 0 && (
        <div style={{ width: 60, textAlign: "right", fontSize: 12, color: C.textMuted }}>
          <Eye size={11} style={{ marginRight: 3 }} />{(item.engagement / 1000).toFixed(1)}k
        </div>
      )}
    </div>
  );
}

// âââ AI Chat Panel âââ
function AIChatPanel({ open, onClose }) {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hey! I'm Nexus AI. I can create content, analyze campaigns, optimize your SEO, or run A/B tests. What would you like me to do?" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setTimeout(() => {
      const responses = [
        `Great question! I've analyzed your current campaigns and here's what I recommend:\n\n1. Your "Q1 Product Launch" is performing 23% above benchmark â I'd increase budget by 15%.\n2. The "Competitor Conquest" campaign should be reactivated with updated creative.\n3. I've queued 3 new blog topics based on trending keywords in your niche.\n\nShall I execute any of these?`,
        `I just ran a deep analysis on your content performance:\n\nâ¢ Blog posts with data visualizations get 3.2x more shares\nâ¢ Your best posting time is Tuesday 9am EST\nâ¢ Long-form content (2000+ words) is ranking 40% better\n\nI've already adjusted the content calendar. Want me to generate the next batch?`,
        `Here's your real-time competitive intel:\n\nâ¢ Competitor A just launched a new campaign targeting your top keyword\nâ¢ I've auto-adjusted your bid strategy to maintain position\nâ¢ Found 12 new keyword opportunities with low competition\nâ¢ Created draft content briefs for the top 5\n\nReady to review the briefs?`,
      ];
      setMessages(prev => [...prev, { role: "ai", text: responses[Math.floor(Math.random() * responses.length)] }]);
    }, 1200);
  };

  if (!open) return null;
  return (
    <div style={{ position: "fixed", right: 24, bottom: 24, width: 400, height: 540, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, display: "flex", flexDirection: "column", zIndex: 1000, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
      <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: C.gradient1, display: "flex", alignItems: "center", justifyContent: "center" }}><Bot size={16} color="#fff" /></div>
          <div><div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Nexus AI Agent</div><div style={{ fontSize: 10, color: C.green }}>Online â 8 agents active</div></div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted }}><X size={18} /></button>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%", padding: "10px 14px", borderRadius: 14, background: m.role === "user" ? C.accent : C.card, color: C.text, fontSize: 13, lineHeight: 1.5, whiteSpace: "pre-line",
            borderBottomRightRadius: m.role === "user" ? 4 : 14, borderBottomLeftRadius: m.role === "ai" ? 4 : 14 }}>
            {m.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div style={{ padding: 12, borderTop: `1px solid ${C.border}`, display: "flex", gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSend()}
          placeholder="Ask Nexus AI anything..." style={{ flex: 1, background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", color: C.text, fontSize: 13, outline: "none" }} />
        <button onClick={handleSend} style={{ ...sButton(true), padding: "10px 14px", borderRadius: 10 }}><Send size={16} /></button>
      </div>
    </div>
  );
}

// âââ Main App âââ
export default function NexusAI() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [chatOpen, setChatOpen] = useState(false);
  const [liveMetric, setLiveMetric] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setLiveMetric(prev => prev + Math.floor(Math.random() * 5)), 3000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    { id: "dashboard", label: "Command Center", icon: Activity },
    { id: "agents", label: "AI Agents", icon: Bot },
    { id: "content", label: "Content Engine", icon: FileText },
    { id: "seo", label: "SEO & Keywords", icon: Search },
    { id: "campaigns", label: "Campaigns", icon: Target },
    { id: "analytics", label: "Deep Analytics", icon: BarChart3 },
    { id: "abtests", label: "A/B Testing", icon: Layers },
    { id: "audiences", label: "Audiences", icon: Users },
    { id: "adintel", label: "Ad Intelligence", icon: Crosshair },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
      `}</style>

      {/* âââ Header âââ */}
      <header style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(20px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: C.gradient1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={20} color="#fff" />
          </div>
          <span style={{ fontSize: 20, fontWeight: 800, background: C.gradient1, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>NEXUS AI</span>
          <span style={sBadge(C.green)}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.green, animation: "pulse 2s infinite" }} />
            {8} Agents Active
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, background: C.card, fontSize: 12, color: C.textMuted }}>
            <Cpu size={13} color={C.green} /> Live: {(42847 + liveMetric).toLocaleString()} visitors
          </div>
          <button onClick={() => setChatOpen(!chatOpen)} style={{ ...sButton(true), padding: "8px 16px" }}>
            <Brain size={15} /> AI Command
          </button>
        </div>
      </header>

      {/* âââ Navigation âââ */}
      <nav style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "0 32px", display: "flex", gap: 4, overflowX: "auto" }}>
        {tabs.map(t => {
          const Icon = t.icon;
          const active = activeTab === t.id;
          return (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "14px 18px", border: "none", cursor: "pointer",
              background: "transparent", color: active ? C.accent : C.textMuted, fontSize: 13, fontWeight: active ? 700 : 500,
              borderBottom: active ? `2px solid ${C.accent}` : "2px solid transparent", transition: "all 0.2s ease", whiteSpace: "nowrap",
            }}>
              <Icon size={15} /> {t.label}
            </button>
          );
        })}
      </nav>

      {/* âââ Main Content âââ */}
      <main style={{ padding: 32, maxWidth: 1440, margin: "0 auto" }}>

        {/* âââ DASHBOARD âââ */}
        {activeTab === "dashboard" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "slideUp 0.4s ease" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
              <Metric icon={Eye} label="Total Impressions" value="284K" change={18} color={C.accent} />
              <Metric icon={MousePointer} label="Total Clicks" value="42.6K" change={12} color={C.green} />
              <Metric icon={Users} label="Leads Generated" value="5,751" change={24} color={C.pink} />
              <Metric icon={DollarSign} label="Revenue" value="$127K" change={31} prefix="" color={C.orange} />
              <Metric icon={TrendingUp} label="ROAS" value="4.2" suffix="x" change={8} color={C.blue} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
              <div style={sCard}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                  <div><div style={{ fontSize: 16, fontWeight: 700 }}>Traffic Overview</div><div style={{ fontSize: 12, color: C.textMuted }}>Last 7 days by channel</div></div>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={trafficData}>
                    <defs>
                      <linearGradient id="gOrg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.accent} stopOpacity={0.3} /><stop offset="100%" stopColor={C.accent} stopOpacity={0} /></linearGradient>
                      <linearGradient id="gPaid" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.green} stopOpacity={0.3} /><stop offset="100%" stopColor={C.green} stopOpacity={0} /></linearGradient>
                      <linearGradient id="gSoc" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.pink} stopOpacity={0.3} /><stop offset="100%" stopColor={C.pink} stopOpacity={0} /></linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="day" stroke={C.textDim} fontSize={11} />
                    <YAxis stroke={C.textDim} fontSize={11} />
                    <Tooltip contentStyle={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }} />
                    <Area type="monotone" dataKey="organic" stroke={C.accent} fill="url(#gOrg)" strokeWidth={2} />
                    <Area type="monotone" dataKey="paid" stroke={C.green} fill="url(#gPaid)" strokeWidth={2} />
                    <Area type="monotone" dataKey="social" stroke={C.pink} fill="url(#gSoc)" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div style={sCard}>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Channel Mix</div>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={channelPie} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={3} dataKey="value">
                      {channelPie.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
                  {channelPie.map(c => (
                    <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: C.textMuted }}>
                      <span style={{ width: 8, height: 8, borderRadius: 2, background: c.color }} />{c.name} ({c.value}%)
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Conversion Funnel */}
            <div style={sCard}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>AI-Optimized Conversion Funnel</div>
              <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                {conversionFunnel.map((stage, i) => (
                  <div key={i} style={{ flex: 1, textAlign: "center", position: "relative" }}>
                    <div style={{
                      height: 60 + (100 - i * 16), background: `linear-gradient(180deg, ${C.accent}${Math.round(30 + (5 - i) * 10).toString(16)}, ${C.accent}08)`,
                      borderRadius: 8, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "0 2px",
                    }}>
                      <div style={{ fontSize: 18, fontWeight: 800, color: C.text }}>{stage.value.toLocaleString()}</div>
                      <div style={{ fontSize: 10, color: C.textMuted }}>{stage.rate}% rate</div>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: C.textMuted, marginTop: 8 }}>{stage.stage}</div>
                    {i < conversionFunnel.length - 1 && <ChevronRight size={14} style={{ position: "absolute", right: -9, top: "40%", color: C.textDim }} />}
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Content */}
            <div style={sCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div><div style={{ fontSize: 16, fontWeight: 700 }}>Content Pipeline</div><div style={{ fontSize: 12, color: C.textMuted }}>AI-managed content across all channels</div></div>
                <button style={sButton(true)}><PlusCircle size={14} /> New Content</button>
              </div>
              {contentPipeline.map(item => <ContentRow key={item.id} item={item} />)}
            </div>
          </div>
        )}

        {/* âââ AI AGENTS âââ */}
        {activeTab === "agents" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "slideUp 0.4s ease" }}>
            <div style={{ ...sCard, background: `linear-gradient(135deg, ${C.card}, ${C.accent}12)`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Agentic AI Workforce</div>
                <div style={{ fontSize: 14, color: C.textMuted, maxWidth: 600 }}>8 specialized AI agents working autonomously across your marketing stack. They create, optimize, analyze, and adapt â 24/7.</div>
              </div>
              <div style={{ display: "flex", gap: 16, textAlign: "center" }}>
                <div><div style={{ fontSize: 28, fontWeight: 800, color: C.green }}>580</div><div style={{ fontSize: 11, color: C.textMuted }}>Tasks Today</div></div>
                <div><div style={{ fontSize: 28, fontWeight: 800, color: C.accent }}>93%</div><div style={{ fontSize: 11, color: C.textMuted }}>Avg Accuracy</div></div>
                <div><div style={{ fontSize: 28, fontWeight: 800, color: C.orange }}>$14.2K</div><div style={{ fontSize: 11, color: C.textMuted }}>Saved Today</div></div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {aiAgents.map(a => <AgentCard key={a.name} agent={a} />)}
            </div>
            <div style={sCard}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Agent Performance Radar</div>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke={C.border} />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: C.textMuted, fontSize: 12 }} />
                  <PolarRadiusAxis tick={{ fill: C.textDim, fontSize: 10 }} domain={[0, 100]} />
                  <Radar name="Score" dataKey="score" stroke={C.accent} fill={C.accent} fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* âââ CONTENT ENGINE âââ */}
        {activeTab === "content" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "slideUp 0.4s ease" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {[{ icon: FileText, label: "Blog Posts", count: 24, color: C.accent },
                { icon: Video, label: "Videos", count: 8, color: C.pink },
                { icon: MessageSquare, label: "Social Posts", count: 156, color: C.green },
                { icon: Mic, label: "Podcasts", count: 6, color: C.orange }].map(t => (
                <div key={t.label} style={{ ...sCard, display: "flex", alignItems: "center", gap: 14, padding: 18, cursor: "pointer" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: t.color + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <t.icon size={20} color={t.color} />
                  </div>
                  <div><div style={{ fontSize: 22, fontWeight: 800 }}>{t.count}</div><div style={{ fontSize: 11, color: C.textMuted }}>{t.label} this month</div></div>
                </div>
              ))}
            </div>

            <div style={sCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div style={{ fontSize: 16, fontWeight: 700 }}>Content Calendar & Pipeline</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {["All", "Blog", "Video", "Social", "Audio"].map(f => (
                    <button key={f} style={{ ...sButton(f === "All"), padding: "6px 14px", fontSize: 12 }}>{f}</button>
                  ))}
                </div>
              </div>
              {contentPipeline.map(item => <ContentRow key={item.id} item={item} />)}
            </div>

            <div style={{ ...sCard, background: `linear-gradient(135deg, ${C.card}, ${C.green}08)` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <Sparkles size={20} color={C.green} />
                <div style={{ fontSize: 16, fontWeight: 700 }}>AI Content Generation Queue</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {["Generate 5 LinkedIn thought leadership posts from recent blog data",
                  "Create YouTube thumbnail variants for upcoming video",
                  "Write email nurture sequence (5 emails) for new lead segment"].map((task, i) => (
                  <div key={i} style={{ padding: 16, background: C.bg + "80", borderRadius: 12, border: `1px solid ${C.border}` }}>
                    <div style={{ fontSize: 12, color: C.text, marginBottom: 10 }}>{task}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={sBadge(C.orange)}>Queued</span>
                      <button style={{ ...sButton(true), padding: "4px 10px", fontSize: 11 }}><Play size={10} /> Run Now</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* âââ SEO âââ */}
        {activeTab === "seo" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "slideUp 0.4s ease" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              <Metric icon={Search} label="Avg. Position" value="4.2" change={15} color={C.accent} />
              <Metric icon={Globe} label="Indexed Pages" value="1,247" change={8} color={C.green} />
              <Metric icon={Link} label="Backlinks" value="3,891" change={22} color={C.pink} />
              <Metric icon={TrendingUp} label="Domain Authority" value="62" change={3} color={C.orange} />
            </div>

            <div style={sCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div><div style={{ fontSize: 16, fontWeight: 700 }}>Keyword Tracker</div><div style={{ fontSize: 12, color: C.textMuted }}>AI-monitored keyword rankings</div></div>
                <button style={sButton(true)}><PlusCircle size={14} /> Add Keyword</button>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.border}`, fontSize: 11, color: C.textMuted, fontWeight: 600 }}>
                <div>KEYWORD</div><div>VOLUME</div><div>DIFFICULTY</div><div>POSITION</div><div>CHANGE</div><div>CPC</div>
              </div>
              {seoKeywords.map(kw => (
                <div key={kw.keyword} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr", gap: 12, padding: "14px 0", borderBottom: `1px solid ${C.border}22`, alignItems: "center", fontSize: 13 }}>
                  <div style={{ fontWeight: 600 }}>{kw.keyword}</div>
                  <div style={{ color: C.textMuted }}>{kw.volume.toLocaleString()}</div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 40, height: 4, borderRadius: 2, background: C.border }}>
                        <div style={{ width: `${kw.difficulty}%`, height: "100%", borderRadius: 2, background: kw.difficulty > 70 ? C.red : kw.difficulty > 50 ? C.orange : C.green }} />
                      </div>
                      <span style={{ fontSize: 11, color: C.textMuted }}>{kw.difficulty}</span>
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, color: kw.position <= 3 ? C.green : kw.position <= 10 ? C.orange : C.red }}>#{kw.position}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 2, color: kw.change > 0 ? C.green : kw.change < 0 ? C.red : C.textMuted }}>
                    {kw.change > 0 ? <ArrowUp size={12} /> : kw.change < 0 ? <ArrowDown size={12} /> : null}{kw.change !== 0 ? Math.abs(kw.change) : "â"}
                  </div>
                  <div style={{ color: C.textMuted }}>${kw.cpc.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* âââ CAMPAIGNS âââ */}
        {activeTab === "campaigns" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "slideUp 0.4s ease" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              <Metric icon={DollarSign} label="Total Budget" value="$60K" color={C.accent} />
              <Metric icon={Target} label="Total Leads" value="2,860" change={18} color={C.green} />
              <Metric icon={TrendingUp} label="Avg CPL" value="$14.67" change={-8} color={C.pink} />
              <Metric icon={Award} label="Avg ROAS" value="4.08x" change={12} color={C.orange} />
            </div>

            <div style={sCard}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>Active Campaigns</div>
              {campaigns.map(c => (
                <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 0", borderBottom: `1px solid ${C.border}22` }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>{c.name}</span>
                      <span style={sBadge(c.status === "active" ? C.green : C.textMuted)}>{c.status}</span>
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textMuted, marginBottom: 4 }}>
                        <span>${c.spent.toLocaleString()} / ${c.budget.toLocaleString()}</span>
                        <span>{Math.round(c.spent / c.budget * 100)}%</span>
                      </div>
                      <div style={{ height: 4, borderRadius: 2, background: C.border }}>
                        <div style={{ width: `${c.spent / c.budget * 100}%`, height: "100%", borderRadius: 2, background: C.gradient1 }} />
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: "center", width: 80 }}><div style={{ fontSize: 18, fontWeight: 800 }}>{c.leads.toLocaleString()}</div><div style={{ fontSize: 10, color: C.textMuted }}>Leads</div></div>
                  <div style={{ textAlign: "center", width: 70 }}><div style={{ fontSize: 16, fontWeight: 700, color: C.green }}>${c.cpl.toFixed(2)}</div><div style={{ fontSize: 10, color: C.textMuted }}>CPL</div></div>
                  <div style={{ textAlign: "center", width: 60 }}><div style={{ fontSize: 16, fontWeight: 700, color: c.roas >= 4 ? C.green : C.orange }}>{c.roas}x</div><div style={{ fontSize: 10, color: C.textMuted }}>ROAS</div></div>
                </div>
              ))}
            </div>

            <div style={sCard}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Revenue vs Cost (30 Days)</div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.green} stopOpacity={0.3} /><stop offset="100%" stopColor={C.green} stopOpacity={0} /></linearGradient>
                    <linearGradient id="gCost" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.red} stopOpacity={0.2} /><stop offset="100%" stopColor={C.red} stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="day" stroke={C.textDim} fontSize={11} />
                  <YAxis stroke={C.textDim} fontSize={11} />
                  <Tooltip contentStyle={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }} />
                  <Area type="monotone" dataKey="revenue" stroke={C.green} fill="url(#gRev)" strokeWidth={2} />
                  <Area type="monotone" dataKey="cost" stroke={C.red} fill="url(#gCost)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* âââ DEEP ANALYTICS âââ */}
        {activeTab === "analytics" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "slideUp 0.4s ease" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
              <Metric icon={Eye} label="Page Views" value="892K" change={14} color={C.accent} />
              <Metric icon={Clock} label="Avg Session" value="4:32" color={C.green} />
              <Metric icon={Heart} label="Engagement Rate" value="67%" change={9} color={C.pink} />
              <Metric icon={Share2} label="Social Shares" value="18.4K" change={27} color={C.orange} />
              <Metric icon={DollarSign} label="Revenue/User" value="$4.82" change={11} color={C.blue} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={sCard}>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Traffic by Channel</div>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="day" stroke={C.textDim} fontSize={11} />
                    <YAxis stroke={C.textDim} fontSize={11} />
                    <Tooltip contentStyle={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="organic" fill={C.accent} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="paid" fill={C.green} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="social" fill={C.pink} radius={[4, 4, 0, 0]} />
                    <Bar dataKey="referral" fill={C.orange} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={sCard}>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Performance Radar</div>
                <ResponsiveContainer width="100%" height={260}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke={C.border} />
                    <PolarAngleAxis dataKey="metric" tick={{ fill: C.textMuted, fontSize: 12 }} />
                    <PolarRadiusAxis tick={false} domain={[0, 100]} />
                    <Radar dataKey="score" stroke={C.accent} fill={C.accent} fillOpacity={0.2} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div style={sCard}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>30-Day Profit Trend</div>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="day" stroke={C.textDim} fontSize={11} />
                  <YAxis stroke={C.textDim} fontSize={11} />
                  <Tooltip contentStyle={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }} />
                  <Line type="monotone" dataKey="profit" stroke={C.green} strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="revenue" stroke={C.accent} strokeWidth={1.5} dot={false} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* âââ A/B TESTING âââ */}
        {activeTab === "abtests" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "slideUp 0.4s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div><div style={{ fontSize: 22, fontWeight: 800 }}>A/B Testing Lab</div><div style={{ fontSize: 13, color: C.textMuted }}>AI automatically designs, runs, and evaluates experiments</div></div>
              <button style={sButton(true)}><PlusCircle size={14} /> New Experiment</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {abTests.map(test => (
                <div key={test.name} style={{ ...sCard, ...(test.status === "completed" && test.winner !== "none" ? sGlow(C.green) : {}) }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <div style={{ fontSize: 15, fontWeight: 700 }}>{test.name}</div>
                    <span style={sBadge(test.status === "completed" ? C.green : C.orange)}>{test.status === "completed" ? "Completed" : "Running"}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
                    <div style={{ padding: 14, borderRadius: 10, background: test.winner === "A" ? C.green + "15" : C.bg, border: `1px solid ${test.winner === "A" ? C.green : C.border}`, textAlign: "center" }}>
                      <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 4 }}>Variant A</div>
                      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{test.variant_a}</div>
                      <div style={{ fontSize: 24, fontWeight: 800, color: test.winner === "A" ? C.green : C.text }}>{test.a_conv}%</div>
                    </div>
                    <div style={{ padding: 14, borderRadius: 10, background: test.winner === "B" ? C.green + "15" : C.bg, border: `1px solid ${test.winner === "B" ? C.green : C.border}`, textAlign: "center" }}>
                      <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 4 }}>Variant B</div>
                      <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{test.variant_b}</div>
                      <div style={{ fontSize: 24, fontWeight: 800, color: test.winner === "B" ? C.green : C.text }}>{test.b_conv}%</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: 12, color: C.textMuted }}>Confidence: <span style={{ color: test.confidence >= 95 ? C.green : C.orange, fontWeight: 700 }}>{test.confidence}%</span></div>
                    {test.winner !== "none" && <div style={{ fontSize: 12, fontWeight: 700, color: C.green }}>Winner: Variant {test.winner}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* âââ AUDIENCES âââ */}
        {activeTab === "audiences" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "slideUp 0.4s ease" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              <Metric icon={Users} label="Total Audience" value="297K" change={16} color={C.accent} />
              <Metric icon={Target} label="Active Segments" value="12" color={C.green} />
              <Metric icon={TrendingUp} label="Avg LTV" value="$216" change={9} color={C.orange} />
            </div>

            <div style={sCard}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>AI-Powered Audience Segments</div>
              {audienceSegments.map(seg => (
                <div key={seg.name} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 0", borderBottom: `1px solid ${C.border}22` }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: C.accent + "12", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Users size={18} color={C.accentLight} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{seg.name}</div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>{seg.size.toLocaleString()} users</div>
                  </div>
                  <div style={{ textAlign: "center", width: 80 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: seg.conversion >= 8 ? C.green : seg.conversion >= 3 ? C.orange : C.textMuted }}>{seg.conversion}%</div>
                    <div style={{ fontSize: 10, color: C.textMuted }}>Conv Rate</div>
                  </div>
                  <div style={{ textAlign: "center", width: 80 }}>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>${seg.value}</div>
                    <div style={{ fontSize: 10, color: C.textMuted }}>Avg Value</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 3, color: C.green, fontSize: 12, fontWeight: 600, width: 50 }}>
                    <ArrowUp size={12} />{seg.growth}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* âââ AD INTELLIGENCE âââ */}
        {activeTab === "adintel" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "slideUp 0.4s ease" }}>
            {/* Hero Banner */}
            <div style={{ ...sCard, background: `linear-gradient(135deg, ${C.card}, ${C.pink}12, ${C.accent}12)`, display: "flex", alignItems: "center", justifyContent: "space-between", padding: 28 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <Crosshair size={22} color={C.pink} />
                  <span style={{ fontSize: 22, fontWeight: 800 }}>Competitive Ad Intelligence</span>
                </div>
                <div style={{ fontSize: 14, color: C.textMuted, maxWidth: 600 }}>AI scans millions of ads across every platform, finds the top performers in your niche, reverse-engineers why they work, and generates ready-to-launch remixed versions for your brand.</div>
              </div>
              <div style={{ display: "flex", gap: 16, textAlign: "center" }}>
                <div><div style={{ fontSize: 28, fontWeight: 800, color: C.pink }}>2.4M</div><div style={{ fontSize: 11, color: C.textMuted }}>Ads Scanned</div></div>
                <div><div style={{ fontSize: 28, fontWeight: 800, color: C.accent }}>6</div><div style={{ fontSize: 11, color: C.textMuted }}>Top Picks</div></div>
                <div><div style={{ fontSize: 28, fontWeight: 800, color: C.green }}>97</div><div style={{ fontSize: 11, color: C.textMuted }}>Best Score</div></div>
              </div>
            </div>

            {/* Summary Metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              <Metric icon={Crosshair} label="Ads Analyzed Today" value="14.2K" change={32} color={C.pink} />
              <Metric icon={Trophy} label="Avg Top Ad ROAS" value="6.3x" change={14} color={C.green} />
              <Metric icon={Wand2} label="Remixes Generated" value="48" change={22} color={C.accent} />
              <Metric icon={TrendingUp} label="Your Remix ROAS" value="5.1x" change={18} color={C.orange} />
            </div>

            {/* Top Performing Ads */}
            <div style={sCard}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                <div><div style={{ fontSize: 16, fontWeight: 700 }}>Top Performing Ads in Your Niche</div><div style={{ fontSize: 12, color: C.textMuted }}>AI-ranked by performance score, engagement, and conversion potential</div></div>
                <div style={{ display: "flex", gap: 8 }}>
                  {["All", "Meta", "Google", "LinkedIn", "TikTok", "YouTube"].map(f => (
                    <button key={f} style={{ ...sButton(f === "All"), padding: "6px 12px", fontSize: 11 }}>{f}</button>
                  ))}
                </div>
              </div>

              {competitorAds.map(ad => (
                <div key={ad.id} style={{ padding: 20, marginBottom: 12, borderRadius: 14, background: C.bg + "80", border: `1px solid ${ad.score >= 95 ? C.green + "44" : C.border}`, position: "relative", overflow: "hidden" }}>
                  {ad.trending && <div style={{ position: "absolute", top: 12, right: 12, ...sBadge(C.pink) }}><TrendingUp size={10} /> Trending</div>}

                  <div style={{ display: "flex", gap: 20 }}>
                    {/* Left: Score */}
                    <div style={{ width: 70, textAlign: "center", flexShrink: 0 }}>
                      <div style={{ width: 60, height: 60, borderRadius: "50%", border: `3px solid ${ad.score >= 95 ? C.green : ad.score >= 90 ? C.accent : C.orange}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                        <span style={{ fontSize: 22, fontWeight: 900, color: ad.score >= 95 ? C.green : ad.score >= 90 ? C.accent : C.orange }}>{ad.score}</span>
                      </div>
                      <div style={{ fontSize: 9, color: C.textMuted, marginTop: 4 }}>AI Score</div>
                    </div>

                    {/* Middle: Ad Details */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                        <span style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{ad.brand}</span>
                        <span style={sBadge(C.blue)}>{ad.platform}</span>
                        <span style={sBadge(C.textMuted)}>{ad.type}</span>
                        <span style={{ fontSize: 11, color: C.textMuted }}>Â· {ad.niche}</span>
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: C.accentLight, marginBottom: 8, lineHeight: 1.4 }}>"{ad.headline}"</div>

                      <div style={{ display: "flex", gap: 20, marginBottom: 10, fontSize: 12 }}>
                        <div><span style={{ color: C.textMuted }}>Impressions: </span><span style={{ fontWeight: 700 }}>{(ad.impressions / 1000000).toFixed(1)}M</span></div>
                        <div><span style={{ color: C.textMuted }}>Clicks: </span><span style={{ fontWeight: 700 }}>{(ad.clicks / 1000).toFixed(0)}K</span></div>
                        <div><span style={{ color: C.textMuted }}>CTR: </span><span style={{ fontWeight: 700, color: ad.ctr >= 5 ? C.green : C.orange }}>{ad.ctr}%</span></div>
                        <div><span style={{ color: C.textMuted }}>Conv: </span><span style={{ fontWeight: 700 }}>{ad.conversions.toLocaleString()}</span></div>
                        <div><span style={{ color: C.textMuted }}>ROAS: </span><span style={{ fontWeight: 700, color: ad.roas >= 6 ? C.green : C.orange }}>{ad.roas}x</span></div>
                      </div>

                      {/* AI Analysis */}
                      <div style={{ padding: 12, borderRadius: 10, background: C.card, border: `1px solid ${C.border}`, marginBottom: 10 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                          <Brain size={12} color={C.accent} />
                          <span style={{ fontSize: 11, fontWeight: 700, color: C.accent }}>AI BREAKDOWN â Why This Ad Works</span>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 12 }}>
                          <div><span style={{ color: C.textMuted }}>Hook Strategy: </span><span style={{ color: C.text }}>{ad.hook}</span></div>
                          <div><span style={{ color: C.textMuted }}>Visual Style: </span><span style={{ color: C.text }}>{ad.visual}</span></div>
                          <div><span style={{ color: C.textMuted }}>CTA: </span><span style={{ color: C.green, fontWeight: 600 }}>{ad.cta}</span></div>
                          <div><span style={{ color: C.textMuted }}>Est. Spend: </span><span style={{ color: C.text }}>${(ad.spend / 1000).toFixed(0)}K</span></div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, flexShrink: 0, justifyContent: "center" }}>
                      <button style={{ ...sButton(true), padding: "10px 18px", fontSize: 12 }}><Wand2 size={13} /> AI Remix</button>
                      <button style={{ ...sButton(false), padding: "10px 18px", fontSize: 12 }}><Copy size={13} /> Clone Structure</button>
                      <button style={{ ...sButton(false), padding: "10px 18px", fontSize: 12 }}><Eye size={13} /> Full Analysis</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* AI Remix Studio */}
            <div style={{ ...sCard, background: `linear-gradient(135deg, ${C.card}, ${C.accent}08)` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: C.gradient1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Wand2 size={20} color="#fff" />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>AI Remix Studio</div>
                  <div style={{ fontSize: 12, color: C.textMuted }}>Select any top ad above â AI adapts it with your brand voice, visuals, and offer</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                <div style={{ padding: 18, borderRadius: 12, background: C.bg + "80", border: `1px solid ${C.border}`, textAlign: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: C.accent + "15", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                    <Search size={22} color={C.accent} />
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>1. Analyze</div>
                  <div style={{ fontSize: 12, color: C.textMuted }}>AI reverse-engineers the ad's hook, structure, psychology, visual style, and CTA framework</div>
                </div>
                <div style={{ padding: 18, borderRadius: 12, background: C.bg + "80", border: `1px solid ${C.border}`, textAlign: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: C.pink + "15", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                    <Wand2 size={22} color={C.pink} />
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>2. Remix</div>
                  <div style={{ fontSize: 12, color: C.textMuted }}>Rewrites copy, adapts visuals, and customizes the offer â all in your brand voice and style</div>
                </div>
                <div style={{ padding: 18, borderRadius: 12, background: C.bg + "80", border: `1px solid ${C.border}`, textAlign: "center" }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: C.green + "15", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                    <Rocket size={22} color={C.green} />
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>3. Launch</div>
                  <div style={{ fontSize: 12, color: C.textMuted }}>One-click deploy to any ad platform with auto A/B testing and real-time optimization</div>
                </div>
              </div>
            </div>

            {/* Recent Remixes */}
            <div style={sCard}>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Recent AI Remixes</div>
              {[
                { original: "10x Your Pipeline in 30 Days", remix: "Triple Your Sales Pipeline This Quarter â Nexus AI Works While You Sleep", originalBrand: "GrowthStack", status: "live", roas: 5.1, improvement: "+12% CTR vs original" },
                { original: "Stop Wasting Ad Spend", remix: "Every Dollar Optimized in Real-Time â See Your ROAS Jump in 48 Hours", originalBrand: "AdScale Pro", status: "testing", roas: 0, improvement: "A/B test in progress" },
                { original: "How We Generated 500 Leads from 1 Blog Post", remix: "1 Article. 847 Leads. Here's the AI-Powered Framework We Used", originalBrand: "ContentForge", status: "live", roas: 7.4, improvement: "+31% conversion vs original" },
              ].map((remix, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 0", borderBottom: `1px solid ${C.border}22` }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: C.pink + "12", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Wand2 size={16} color={C.pink} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{remix.remix}</div>
                    <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>Remixed from {remix.originalBrand}: "{remix.original}"</div>
                  </div>
                  <span style={sBadge(remix.status === "live" ? C.green : C.orange)}>{remix.status === "live" ? "Live" : "Testing"}</span>
                  {remix.roas > 0 && <div style={{ textAlign: "center", width: 60 }}><div style={{ fontSize: 16, fontWeight: 700, color: C.green }}>{remix.roas}x</div><div style={{ fontSize: 9, color: C.textMuted }}>ROAS</div></div>}
                  <div style={{ fontSize: 11, color: C.green, fontWeight: 600, width: 120, textAlign: "right" }}>{remix.improvement}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* âââ AI Chat Floating Button âââ */}
      {!chatOpen && (
        <button onClick={() => setChatOpen(true)} style={{
          position: "fixed", bottom: 24, right: 24, width: 56, height: 56, borderRadius: "50%",
          background: C.gradient1, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 4px 24px ${C.accent}44`, zIndex: 999, transition: "transform 0.2s ease",
        }}>
          <Brain size={24} color="#fff" />
        </button>
      )}

      <AIChatPanel open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
}
