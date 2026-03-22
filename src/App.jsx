import { useState, useEffect, useRef } from "react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { Zap, Brain, Target, TrendingUp, Calendar, BarChart3, Search, Users, MessageSquare, Globe, Sparkles, ChevronRight, Play, Pause, Check, AlertTriangle, ArrowUp, ArrowDown, Clock, Eye, Heart, Share2, MousePointer, DollarSign, Layers, RefreshCw, Send, FileText, Image, Video, Mic, Hash, AtSign, Link, Settings, Bell, Filter, Download, PlusCircle, X, ChevronDown, Activity, Cpu, Database, Workflow, Bot, Rocket, Shield, Award, Coffee, Copy, Wand2, Trophy, Crosshair } from "lucide-react";

// ═══ Color Palette ═══
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

// ═══ Shared Styles ═══
const sCard = { background: C.card, borderRadius: 16, border: `1px solid ${C.border}`, padding: 24, transition: "all 0.3s ease" };
const sBadge = (color) => ({ display: "inline-flex", alignItems: "center", gap: 4, padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600, background: color + "18", color });
const sButton = (primary) => ({
  display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 20px", borderRadius: 10,
  border: primary ? "none" : `1px solid ${C.border}`, cursor: "pointer", fontSize: 13, fontWeight: 600,
  background: primary ? C.gradient1 : "transparent", color: primary ? "#fff" : C.textMuted,
  transition: "all 0.2s ease",
});
const sGlow = (color) => ({ boxShadow: `0 0 20px ${color}22, 0 4px 20px rgba(0,0,0,0.3)` });
const sInput = { background: C.bg, border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", color: C.text, fontSize: 13, outline: "none", width: "100%" };
const sSelect = { ...sInput, cursor: "pointer", appearance: "none" };

// ═══ Empty State Component ═══
function EmptyState({ icon: Icon, title, subtitle, buttonLabel, onAction, color = C.accent }) {
  return (
    <div style={{ ...sCard, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 60, textAlign: "center" }}>
      <div style={{ width: 64, height: 64, borderRadius: 16, background: color + "15", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
        <Icon size={28} color={color} />
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 13, color: C.textMuted, maxWidth: 400, marginBottom: 24, lineHeight: 1.6 }}>{subtitle}</div>
      {buttonLabel && (
        <button onClick={onAction} style={sButton(true)}>
          <PlusCircle size={15} /> {buttonLabel}
        </button>
      )}
    </div>
  );
}

// ═══ Modal Wrapper ═══
function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 20, padding: 32, width: 520, maxHeight: "80vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: C.text }}>{title}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted }}><X size={20} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ═══ Components ═══

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
  const sc = statusConfig[item.status] || { color: C.textMuted, label: item.status };
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: `1px solid ${C.border}22` }}>
      <div style={{ width: 36, height: 36, borderRadius: 8, background: C.accent + "12", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <TypeIcon size={16} color={C.accentLight} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</div>
        <div style={{ display: "flex", gap: 10, marginTop: 4, fontSize: 11, color: C.textMuted }}>
          <span>{item.platform}</span>
          {item.aiAgent && <span>Agent: {item.aiAgent}</span>}
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

// ═══ AI Chat Panel ═══
function AIChatPanel({ open, onClose, agentCount }) {
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
        "I've noted your request. To get started, use the navigation tabs to create your first campaign, add content to the pipeline, or set up keyword tracking. I'll help optimize everything as you build out your marketing stack!",
        "Great idea! Head over to the Campaigns tab and click 'New Campaign' to set up your first campaign. I'll monitor its performance and suggest optimizations once it's running.",
        "Let me help you with that. Start by adding some keywords in the SEO tab — I'll track their rankings and suggest content opportunities based on search volume and difficulty.",
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
          <div><div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Nexus AI Agent</div><div style={{ fontSize: 10, color: C.green }}>Online — {agentCount} agents ready</div></div>
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

// ═══ Main App ═══
export default function NexusAI() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [chatOpen, setChatOpen] = useState(false);

  // ─── Stateful Data (starts empty) ───
  const [campaigns, setCampaigns] = useState([]);
  const [contentPipeline, setContentPipeline] = useState([]);
  const [seoKeywords, setSeoKeywords] = useState([]);
  const [abTests, setAbTests] = useState([]);
  const [audienceSegments, setAudienceSegments] = useState([]);
  const [aiAgents] = useState([
    { name: "ContentGen", role: "Content Creation", status: "idle", tasks: 0, accuracy: 96, icon: FileText, color: C.accent },
    { name: "SEO Oracle", role: "SEO Optimization", status: "idle", tasks: 0, accuracy: 94, icon: Search, color: C.green },
    { name: "AdOptimizer", role: "Ad Campaign Mgmt", status: "idle", tasks: 0, accuracy: 91, icon: Target, color: C.orange },
    { name: "SocialPulse", role: "Social Listening", status: "idle", tasks: 0, accuracy: 89, icon: Globe, color: C.pink },
    { name: "ThreadWeaver", role: "Thread Generation", status: "idle", tasks: 0, accuracy: 93, icon: MessageSquare, color: C.blue },
    { name: "VisualCraft", role: "Visual Content", status: "idle", tasks: 0, accuracy: 88, icon: Image, color: C.purple },
    { name: "AnalyticsAI", role: "Data Analysis", status: "idle", tasks: 0, accuracy: 97, icon: BarChart3, color: C.greenDark },
    { name: "LeadScorer", role: "Lead Qualification", status: "idle", tasks: 0, accuracy: 92, icon: Users, color: C.orangeDark },
  ]);

  // ─── Modals ───
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [showNewContent, setShowNewContent] = useState(false);
  const [showNewKeyword, setShowNewKeyword] = useState(false);
  const [showNewTest, setShowNewTest] = useState(false);
  const [showNewAudience, setShowNewAudience] = useState(false);

  // ─── Form States ───
  const [campaignForm, setCampaignForm] = useState({ name: "", budget: "", status: "active" });
  const [contentForm, setContentForm] = useState({ title: "", type: "blog", platform: "Website", status: "draft", scheduled: "" });
  const [keywordForm, setKeywordForm] = useState({ keyword: "", volume: "", difficulty: "", cpc: "" });
  const [testForm, setTestForm] = useState({ name: "", variant_a: "", variant_b: "" });
  const [audienceForm, setAudienceForm] = useState({ name: "", size: "", conversion: "", value: "" });

  // ─── Computed Stats ───
  const totalBudget = campaigns.reduce((s, c) => s + c.budget, 0);
  const totalSpent = campaigns.reduce((s, c) => s + c.spent, 0);
  const totalLeads = campaigns.reduce((s, c) => s + c.leads, 0);
  const avgCpl = totalLeads > 0 ? (totalSpent / totalLeads) : 0;
  const activeAgents = aiAgents.filter(a => a.status === "active").length;

  // ─── Create Handlers ───
  const createCampaign = () => {
    if (!campaignForm.name || !campaignForm.budget) return;
    setCampaigns(prev => [...prev, {
      name: campaignForm.name,
      budget: parseFloat(campaignForm.budget),
      spent: 0,
      leads: 0,
      cpl: 0,
      roas: 0,
      status: campaignForm.status,
    }]);
    setCampaignForm({ name: "", budget: "", status: "active" });
    setShowNewCampaign(false);
  };

  const createContent = () => {
    if (!contentForm.title) return;
    setContentPipeline(prev => [...prev, {
      id: Date.now(),
      title: contentForm.title,
      type: contentForm.type,
      platform: contentForm.platform,
      status: contentForm.status,
      score: 0,
      engagement: 0,
      trend: "neutral",
      aiAgent: "",
      scheduled: contentForm.scheduled || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    }]);
    setContentForm({ title: "", type: "blog", platform: "Website", status: "draft", scheduled: "" });
    setShowNewContent(false);
  };

  const createKeyword = () => {
    if (!keywordForm.keyword) return;
    setSeoKeywords(prev => [...prev, {
      keyword: keywordForm.keyword,
      volume: parseInt(keywordForm.volume) || 0,
      difficulty: parseInt(keywordForm.difficulty) || 0,
      position: 0,
      change: 0,
      cpc: parseFloat(keywordForm.cpc) || 0,
    }]);
    setKeywordForm({ keyword: "", volume: "", difficulty: "", cpc: "" });
    setShowNewKeyword(false);
  };

  const createTest = () => {
    if (!testForm.name || !testForm.variant_a || !testForm.variant_b) return;
    setAbTests(prev => [...prev, {
      name: testForm.name,
      variant_a: testForm.variant_a,
      variant_b: testForm.variant_b,
      a_conv: 0,
      b_conv: 0,
      confidence: 0,
      winner: "none",
      status: "running",
    }]);
    setTestForm({ name: "", variant_a: "", variant_b: "" });
    setShowNewTest(false);
  };

  const createAudience = () => {
    if (!audienceForm.name) return;
    setAudienceSegments(prev => [...prev, {
      name: audienceForm.name,
      size: parseInt(audienceForm.size) || 0,
      conversion: parseFloat(audienceForm.conversion) || 0,
      value: parseFloat(audienceForm.value) || 0,
      growth: 0,
    }]);
    setAudienceForm({ name: "", size: "", conversion: "", value: "" });
    setShowNewAudience(false);
  };

  const tabs = [
    { id: "dashboard", label: "Command Center", icon: Activity },
    { id: "agents", label: "AI Agents", icon: Bot },
    { id: "content", label: "Content Engine", icon: FileText },
    { id: "seo", label: "SEO & Keywords", icon: Search },
    { id: "campaigns", label: "Campaigns", icon: Target },
    { id: "analytics", label: "Deep Analytics", icon: BarChart3 },
    { id: "abtests", label: "A/B Testing", icon: Layers },
    { id: "audiences", label: "Audiences", icon: Users },
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

      {/* ═══ Header ═══ */}
      <header style={{ background: C.surface, borderBottom: `1px solid ${C.border}`, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, position: "sticky", top: 0, zIndex: 100, backdropFilter: "blur(20px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: C.gradient1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={20} color="#fff" />
          </div>
          <span style={{ fontSize: 20, fontWeight: 800, background: C.gradient1, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>NEXUS AI</span>
          <span style={sBadge(C.green)}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: C.green, animation: "pulse 2s infinite" }} />
            {aiAgents.length} Agents Ready
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, background: C.card, fontSize: 12, color: C.textMuted }}>
            <Target size={13} color={C.accent} /> {campaigns.length} Campaigns
          </div>
          <button onClick={() => setChatOpen(!chatOpen)} style={{ ...sButton(true), padding: "8px 16px" }}>
            <Brain size={15} /> AI Command
          </button>
        </div>
      </header>

      {/* ═══ Navigation ═══ */}
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

      {/* ═══ Main Content ═══ */}
      <main style={{ padding: 32, maxWidth: 1440, margin: "0 auto" }}>

        {/* ═══ DASHBOARD ═══ */}
        {activeTab === "dashboard" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "slideUp 0.4s ease" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              <Metric icon={Target} label="Active Campaigns" value={campaigns.length} color={C.accent} />
              <Metric icon={FileText} label="Content Items" value={contentPipeline.length} color={C.green} />
              <Metric icon={Search} label="Tracked Keywords" value={seoKeywords.length} color={C.pink} />
              <Metric icon={Users} label="Audience Segments" value={audienceSegments.length} color={C.orange} />
            </div>

            {campaigns.length > 0 ? (
              <div style={sCard}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                  <div><div style={{ fontSize: 16, fontWeight: 700 }}>Campaign Overview</div><div style={{ fontSize: 12, color: C.textMuted }}>Budget allocation across campaigns</div></div>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={campaigns}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="name" stroke={C.textDim} fontSize={11} />
                    <YAxis stroke={C.textDim} fontSize={11} />
                    <Tooltip contentStyle={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="budget" fill={C.accent} radius={[4, 4, 0, 0]} name="Budget" />
                    <Bar dataKey="spent" fill={C.green} radius={[4, 4, 0, 0]} name="Spent" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyState
                icon={Activity}
                title="Welcome to NEXUS AI"
                subtitle="Your AI-powered marketing command center is ready. Start by creating a campaign, adding content to the pipeline, or setting up keyword tracking."
                buttonLabel="Create First Campaign"
                onAction={() => setShowNewCampaign(true)}
                color={C.accent}
              />
            )}

            {contentPipeline.length > 0 && (
              <div style={sCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <div><div style={{ fontSize: 16, fontWeight: 700 }}>Content Pipeline</div><div style={{ fontSize: 12, color: C.textMuted }}>Recent content across all channels</div></div>
                  <button onClick={() => setShowNewContent(true)} style={sButton(true)}><PlusCircle size={14} /> New Content</button>
                </div>
                {contentPipeline.slice(-5).map(item => <ContentRow key={item.id} item={item} />)}
              </div>
            )}
          </div>
        )}

        {/* ═══ AI AGENTS ═══ */}
        {activeTab === "agents" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "slideUp 0.4s ease" }}>
            <div style={{ ...sCard, background: `linear-gradient(135deg, ${C.card}, ${C.accent}12)`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Agentic AI Workforce</div>
                <div style={{ fontSize: 14, color: C.textMuted, maxWidth: 600 }}>{aiAgents.length} specialized AI agents ready to work across your marketing stack. Create campaigns and content to activate them.</div>
              </div>
              <div style={{ display: "flex", gap: 16, textAlign: "center" }}>
                <div><div style={{ fontSize: 28, fontWeight: 800, color: C.green }}>{aiAgents.reduce((s, a) => s + a.tasks, 0)}</div><div style={{ fontSize: 11, color: C.textMuted }}>Total Tasks</div></div>
                <div><div style={{ fontSize: 28, fontWeight: 800, color: C.accent }}>{aiAgents.length}</div><div style={{ fontSize: 11, color: C.textMuted }}>Agents</div></div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {aiAgents.map(a => <AgentCard key={a.name} agent={a} />)}
            </div>
          </div>
        )}

        {/* ═══ CONTENT ENGINE ═══ */}
        {activeTab === "content" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "slideUp 0.4s ease" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              {[{ icon: FileText, label: "Blog Posts", count: contentPipeline.filter(c => c.type === "blog").length, color: C.accent },
                { icon: Video, label: "Videos", count: contentPipeline.filter(c => c.type === "video").length, color: C.pink },
                { icon: MessageSquare, label: "Social Posts", count: contentPipeline.filter(c => c.type === "thread" || c.type === "carousel").length, color: C.green },
                { icon: Mic, label: "Podcasts", count: contentPipeline.filter(c => c.type === "audio").length, color: C.orange }].map(t => (
                <div key={t.label} style={{ ...sCard, display: "flex", alignItems: "center", gap: 14, padding: 18, cursor: "pointer" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: t.color + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <t.icon size={20} color={t.color} />
                  </div>
                  <div><div style={{ fontSize: 22, fontWeight: 800 }}>{t.count}</div><div style={{ fontSize: 11, color: C.textMuted }}>{t.label}</div></div>
                </div>
              ))}
            </div>

            {contentPipeline.length > 0 ? (
              <div style={sCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Content Calendar & Pipeline</div>
                  <button onClick={() => setShowNewContent(true)} style={sButton(true)}><PlusCircle size={14} /> New Content</button>
                </div>
                {contentPipeline.map(item => <ContentRow key={item.id} item={item} />)}
              </div>
            ) : (
              <EmptyState
                icon={FileText}
                title="No Content Yet"
                subtitle="Start building your content pipeline. Add blog posts, videos, social threads, and more — AI agents will help optimize and schedule them."
                buttonLabel="Create First Content"
                onAction={() => setShowNewContent(true)}
                color={C.green}
              />
            )}
          </div>
        )}

        {/* ═══ SEO ═══ */}
        {activeTab === "seo" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "slideUp 0.4s ease" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              <Metric icon={Search} label="Tracked Keywords" value={seoKeywords.length} color={C.accent} />
              <Metric icon={Globe} label="Avg. Difficulty" value={seoKeywords.length > 0 ? Math.round(seoKeywords.reduce((s, k) => s + k.difficulty, 0) / seoKeywords.length) : 0} color={C.green} />
              <Metric icon={TrendingUp} label="Avg. Volume" value={seoKeywords.length > 0 ? Math.round(seoKeywords.reduce((s, k) => s + k.volume, 0) / seoKeywords.length).toLocaleString() : "0"} color={C.orange} />
            </div>

            {seoKeywords.length > 0 ? (
              <div style={sCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div><div style={{ fontSize: 16, fontWeight: 700 }}>Keyword Tracker</div><div style={{ fontSize: 12, color: C.textMuted }}>AI-monitored keyword rankings</div></div>
                  <button onClick={() => setShowNewKeyword(true)} style={sButton(true)}><PlusCircle size={14} /> Add Keyword</button>
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
                    <div style={{ fontWeight: 700, color: kw.position <= 3 && kw.position > 0 ? C.green : kw.position <= 10 && kw.position > 0 ? C.orange : C.textMuted }}>{kw.position > 0 ? `#${kw.position}` : "—"}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 2, color: kw.change > 0 ? C.green : kw.change < 0 ? C.red : C.textMuted }}>
                      {kw.change > 0 ? <ArrowUp size={12} /> : kw.change < 0 ? <ArrowDown size={12} /> : null}{kw.change !== 0 ? Math.abs(kw.change) : "—"}
                    </div>
                    <div style={{ color: C.textMuted }}>${kw.cpc.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Search}
                title="No Keywords Tracked"
                subtitle="Add keywords to track their search volume, difficulty, and ranking positions. AI will monitor changes and suggest optimization opportunities."
                buttonLabel="Add First Keyword"
                onAction={() => setShowNewKeyword(true)}
                color={C.accent}
              />
            )}
          </div>
        )}

        {/* ═══ CAMPAIGNS ═══ */}
        {activeTab === "campaigns" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "slideUp 0.4s ease" }}>
            {campaigns.length > 0 ? (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                  <Metric icon={DollarSign} label="Total Budget" value={`$${(totalBudget / 1000).toFixed(0)}K`} color={C.accent} />
                  <Metric icon={Target} label="Total Leads" value={totalLeads.toLocaleString()} color={C.green} />
                  <Metric icon={TrendingUp} label="Avg CPL" value={avgCpl > 0 ? `$${avgCpl.toFixed(2)}` : "$0"} color={C.pink} />
                  <Metric icon={Award} label="Campaigns" value={campaigns.length} color={C.orange} />
                </div>

                <div style={sCard}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>Active Campaigns</div>
                    <button onClick={() => setShowNewCampaign(true)} style={sButton(true)}><PlusCircle size={14} /> New Campaign</button>
                  </div>
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
                            <span>{c.budget > 0 ? Math.round(c.spent / c.budget * 100) : 0}%</span>
                          </div>
                          <div style={{ height: 4, borderRadius: 2, background: C.border }}>
                            <div style={{ width: `${c.budget > 0 ? (c.spent / c.budget * 100) : 0}%`, height: "100%", borderRadius: 2, background: C.gradient1 }} />
                          </div>
                        </div>
                      </div>
                      <div style={{ textAlign: "center", width: 80 }}><div style={{ fontSize: 18, fontWeight: 800 }}>{c.leads.toLocaleString()}</div><div style={{ fontSize: 10, color: C.textMuted }}>Leads</div></div>
                      <div style={{ textAlign: "center", width: 70 }}><div style={{ fontSize: 16, fontWeight: 700, color: C.green }}>${c.cpl.toFixed(2)}</div><div style={{ fontSize: 10, color: C.textMuted }}>CPL</div></div>
                      <div style={{ textAlign: "center", width: 60 }}><div style={{ fontSize: 16, fontWeight: 700, color: c.roas >= 4 ? C.green : C.orange }}>{c.roas}x</div><div style={{ fontSize: 10, color: C.textMuted }}>ROAS</div></div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <EmptyState
                icon={Target}
                title="No Campaigns Yet"
                subtitle="Create your first marketing campaign. Set a budget, define your target, and let AI agents optimize performance in real time."
                buttonLabel="Create First Campaign"
                onAction={() => setShowNewCampaign(true)}
                color={C.green}
              />
            )}
          </div>
        )}

        {/* ═══ DEEP ANALYTICS ═══ */}
        {activeTab === "analytics" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "slideUp 0.4s ease" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
              <Metric icon={Target} label="Campaigns" value={campaigns.length} color={C.accent} />
              <Metric icon={FileText} label="Content Items" value={contentPipeline.length} color={C.green} />
              <Metric icon={DollarSign} label="Total Spent" value={`$${totalSpent.toLocaleString()}`} color={C.pink} />
              <Metric icon={Users} label="Total Leads" value={totalLeads.toLocaleString()} color={C.orange} />
            </div>

            {campaigns.length > 0 ? (
              <div style={sCard}>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Campaign Budget vs Spend</div>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={campaigns}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="name" stroke={C.textDim} fontSize={11} />
                    <YAxis stroke={C.textDim} fontSize={11} />
                    <Tooltip contentStyle={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="budget" fill={C.accent} radius={[4, 4, 0, 0]} name="Budget" />
                    <Bar dataKey="spent" fill={C.green} radius={[4, 4, 0, 0]} name="Spent" />
                    <Bar dataKey="leads" fill={C.pink} radius={[4, 4, 0, 0]} name="Leads" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <EmptyState
                icon={BarChart3}
                title="No Analytics Data Yet"
                subtitle="Analytics will populate as you create campaigns and content. Start adding data to see performance charts, trends, and insights."
                buttonLabel="Go to Campaigns"
                onAction={() => setActiveTab("campaigns")}
                color={C.accent}
              />
            )}
          </div>
        )}

        {/* ═══ A/B TESTING ═══ */}
        {activeTab === "abtests" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "slideUp 0.4s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div><div style={{ fontSize: 22, fontWeight: 800 }}>A/B Testing Lab</div><div style={{ fontSize: 13, color: C.textMuted }}>Design, run, and evaluate experiments</div></div>
              <button onClick={() => setShowNewTest(true)} style={sButton(true)}><PlusCircle size={14} /> New Experiment</button>
            </div>
            {abTests.length > 0 ? (
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
            ) : (
              <EmptyState
                icon={Layers}
                title="No A/B Tests Yet"
                subtitle="Set up your first experiment to test headlines, CTAs, layouts, and more. AI will analyze results and declare winners when confidence is high enough."
                buttonLabel="Create First Experiment"
                onAction={() => setShowNewTest(true)}
                color={C.orange}
              />
            )}
          </div>
        )}

        {/* ═══ AUDIENCES ═══ */}
        {activeTab === "audiences" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "slideUp 0.4s ease" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              <Metric icon={Users} label="Total Audience" value={audienceSegments.reduce((s, a) => s + a.size, 0).toLocaleString()} color={C.accent} />
              <Metric icon={Target} label="Segments" value={audienceSegments.length} color={C.green} />
              <Metric icon={TrendingUp} label="Avg Conversion" value={audienceSegments.length > 0 ? `${(audienceSegments.reduce((s, a) => s + a.conversion, 0) / audienceSegments.length).toFixed(1)}%` : "0%"} color={C.orange} />
            </div>

            {audienceSegments.length > 0 ? (
              <div style={sCard}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>Audience Segments</div>
                  <button onClick={() => setShowNewAudience(true)} style={sButton(true)}><PlusCircle size={14} /> New Segment</button>
                </div>
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
            ) : (
              <EmptyState
                icon={Users}
                title="No Audience Segments"
                subtitle="Define audience segments to target your campaigns more effectively. Track size, conversion rates, and value for each segment."
                buttonLabel="Create First Segment"
                onAction={() => setShowNewAudience(true)}
                color={C.pink}
              />
            )}
          </div>
        )}
      </main>

      {/* ═══ MODALS ═══ */}

      {/* New Campaign Modal */}
      <Modal open={showNewCampaign} onClose={() => setShowNewCampaign(false)} title="Create New Campaign">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: 12, color: C.textMuted, marginBottom: 6, display: "block" }}>Campaign Name</label>
            <input value={campaignForm.name} onChange={e => setCampaignForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Q1 Product Launch" style={sInput} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: C.textMuted, marginBottom: 6, display: "block" }}>Budget ($)</label>
            <input type="number" value={campaignForm.budget} onChange={e => setCampaignForm(p => ({ ...p, budget: e.target.value }))} placeholder="e.g. 25000" style={sInput} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: C.textMuted, marginBottom: 6, display: "block" }}>Status</label>
            <select value={campaignForm.status} onChange={e => setCampaignForm(p => ({ ...p, status: e.target.value }))} style={sSelect}>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <button onClick={createCampaign} style={{ ...sButton(true), justifyContent: "center", marginTop: 8 }}>
            <Rocket size={15} /> Launch Campaign
          </button>
        </div>
      </Modal>

      {/* New Content Modal */}
      <Modal open={showNewContent} onClose={() => setShowNewContent(false)} title="Create New Content">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: 12, color: C.textMuted, marginBottom: 6, display: "block" }}>Content Title</label>
            <input value={contentForm.title} onChange={e => setContentForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. AI-Powered SEO: The Ultimate Guide" style={sInput} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, color: C.textMuted, marginBottom: 6, display: "block" }}>Type</label>
              <select value={contentForm.type} onChange={e => setContentForm(p => ({ ...p, type: e.target.value }))} style={sSelect}>
                <option value="blog">Blog Post</option>
                <option value="video">Video</option>
                <option value="thread">Social Thread</option>
                <option value="carousel">Carousel</option>
                <option value="audio">Podcast/Audio</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: C.textMuted, marginBottom: 6, display: "block" }}>Platform</label>
              <select value={contentForm.platform} onChange={e => setContentForm(p => ({ ...p, platform: e.target.value }))} style={sSelect}>
                <option value="Website">Website</option>
                <option value="YouTube">YouTube</option>
                <option value="X/Twitter">X/Twitter</option>
                <option value="Instagram">Instagram</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Spotify">Spotify</option>
                <option value="TikTok">TikTok</option>
              </select>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, color: C.textMuted, marginBottom: 6, display: "block" }}>Status</label>
              <select value={contentForm.status} onChange={e => setContentForm(p => ({ ...p, status: e.target.value }))} style={sSelect}>
                <option value="draft">Draft</option>
                <option value="in_review">In Review</option>
                <option value="scheduled">Scheduled</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: C.textMuted, marginBottom: 6, display: "block" }}>Scheduled Date</label>
              <input value={contentForm.scheduled} onChange={e => setContentForm(p => ({ ...p, scheduled: e.target.value }))} placeholder="e.g. Mar 25" style={sInput} />
            </div>
          </div>
          <button onClick={createContent} style={{ ...sButton(true), justifyContent: "center", marginTop: 8 }}>
            <FileText size={15} /> Add Content
          </button>
        </div>
      </Modal>

      {/* New Keyword Modal */}
      <Modal open={showNewKeyword} onClose={() => setShowNewKeyword(false)} title="Add Keyword">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: 12, color: C.textMuted, marginBottom: 6, display: "block" }}>Keyword</label>
            <input value={keywordForm.keyword} onChange={e => setKeywordForm(p => ({ ...p, keyword: e.target.value }))} placeholder="e.g. ai marketing tools" style={sInput} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, color: C.textMuted, marginBottom: 6, display: "block" }}>Search Volume</label>
              <input type="number" value={keywordForm.volume} onChange={e => setKeywordForm(p => ({ ...p, volume: e.target.value }))} placeholder="e.g. 14800" style={sInput} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: C.textMuted, marginBottom: 6, display: "block" }}>Difficulty (0-100)</label>
              <input type="number" value={keywordForm.difficulty} onChange={e => setKeywordForm(p => ({ ...p, difficulty: e.target.value }))} placeholder="e.g. 72" style={sInput} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: C.textMuted, marginBottom: 6, display: "block" }}>CPC ($)</label>
              <input type="number" step="0.01" value={keywordForm.cpc} onChange={e => setKeywordForm(p => ({ ...p, cpc: e.target.value }))} placeholder="e.g. 8.40" style={sInput} />
            </div>
          </div>
          <button onClick={createKeyword} style={{ ...sButton(true), justifyContent: "center", marginTop: 8 }}>
            <Search size={15} /> Track Keyword
          </button>
        </div>
      </Modal>

      {/* New A/B Test Modal */}
      <Modal open={showNewTest} onClose={() => setShowNewTest(false)} title="New A/B Experiment">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: 12, color: C.textMuted, marginBottom: 6, display: "block" }}>Experiment Name</label>
            <input value={testForm.name} onChange={e => setTestForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Homepage Hero CTA" style={sInput} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: C.textMuted, marginBottom: 6, display: "block" }}>Variant A</label>
            <input value={testForm.variant_a} onChange={e => setTestForm(p => ({ ...p, variant_a: e.target.value }))} placeholder="e.g. Start Free Trial" style={sInput} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: C.textMuted, marginBottom: 6, display: "block" }}>Variant B</label>
            <input value={testForm.variant_b} onChange={e => setTestForm(p => ({ ...p, variant_b: e.target.value }))} placeholder="e.g. Unlock AI Power" style={sInput} />
          </div>
          <button onClick={createTest} style={{ ...sButton(true), justifyContent: "center", marginTop: 8 }}>
            <Layers size={15} /> Start Experiment
          </button>
        </div>
      </Modal>

      {/* New Audience Modal */}
      <Modal open={showNewAudience} onClose={() => setShowNewAudience(false)} title="Create Audience Segment">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: 12, color: C.textMuted, marginBottom: 6, display: "block" }}>Segment Name</label>
            <input value={audienceForm.name} onChange={e => setAudienceForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. High-Intent Visitors" style={sInput} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, color: C.textMuted, marginBottom: 6, display: "block" }}>Audience Size</label>
              <input type="number" value={audienceForm.size} onChange={e => setAudienceForm(p => ({ ...p, size: e.target.value }))} placeholder="e.g. 12400" style={sInput} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: C.textMuted, marginBottom: 6, display: "block" }}>Conv. Rate (%)</label>
              <input type="number" step="0.1" value={audienceForm.conversion} onChange={e => setAudienceForm(p => ({ ...p, conversion: e.target.value }))} placeholder="e.g. 8.2" style={sInput} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: C.textMuted, marginBottom: 6, display: "block" }}>Avg Value ($)</label>
              <input type="number" value={audienceForm.value} onChange={e => setAudienceForm(p => ({ ...p, value: e.target.value }))} placeholder="e.g. 240" style={sInput} />
            </div>
          </div>
          <button onClick={createAudience} style={{ ...sButton(true), justifyContent: "center", marginTop: 8 }}>
            <Users size={15} /> Create Segment
          </button>
        </div>
      </Modal>

      {/* ═══ AI Chat Floating Button ═══ */}
      {!chatOpen && (
        <button onClick={() => setChatOpen(true)} style={{
          position: "fixed", bottom: 24, right: 24, width: 56, height: 56, borderRadius: "50%",
          background: C.gradient1, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 4px 24px ${C.accent}44`, zIndex: 999, transition: "transform 0.2s ease",
        }}>
          <Brain size={24} color="#fff" />
        </button>
      )}

      <AIChatPanel open={chatOpen} onClose={() => setChatOpen(false)} agentCount={aiAgents.length} />
    </div>
  );
}
