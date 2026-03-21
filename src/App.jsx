import { useState, useEffect, useRef } from "react";
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { Zap, Brain, Target, TrendingUp, Calendar, BarChart3, Search, Users, MessageSquare, Globe, Sparkles, ChevronRight, Play, Pause, Check, AlertTriangle, ArrowUp, ArrowDown, Clock, Eye, Heart, Share2, MousePointer, DollarSign, Layers, RefreshCw, Send, FileText, Image, Video, Mic, Hash, AtSign, Link, Settings, Bell, Filter, Download, PlusCircle, X, ChevronDown, Activity, Cpu, Database, Workflow, Bot, Rocket, Shield, Award, Coffee, Copy, Wand2, Trophy, Crosshair } from "lucide-react";

// âââ Color Palette âââ
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

// âââ Shared Styles âââ
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

// âââ Empty State Component âââ
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
  
 "r: "pointer" }}>
      <div style={{ width: 40, height: 40, borderRadius: 10, background: agent.color + "15", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
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

// âââ AI Chat Panel âââ
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
        "Let me help you with that. Start by adding some keywords in the SEO tab â I'll track their rankings and suggest content opportunities based on search volume and difficulty.",
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
          <div><div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Nexus AI Agent</div><div style={{ fontSize: 10, color: C.green }}>Online â {agentCount} agents ready</div></div>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted }}><X size={18} /></button>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {messages?.map((m, i) => (
            <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "85%", padding: "10px 14px", borderRadius: 14, background: m.role === "user" ? C.accent : C.card, color: C.text, fontSize: 13, lineHeight: 1.5, whiteSpace: "pre-line",
              borderBottomRightRadius: m.role === "user" ? 4 : 14, borderBottomLefN <div style={sCard}>
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
                    </div> <div style={{ display: "frid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {seoKeywords.map(kw => (
                <div key={kw.keyword} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 0", borderBottom: `1px solid ${C.border}22` }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: C.accent + "12", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Search size={18} color={C.accentLight} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700 }}>{kw.keyword}</div>
                    <div style={{ fontSize: 11, color: C.textMuted }}>{kw.volume.toLocaleString()} searches | Diff: {kw.difficulty}</div>
                  </div>
                  <div style={{ textAlign: "center", width: 80 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: kw.position < 10 ? C.green : kw.position < 20 ? C.orange : C.red }}>#{kw.position}</div>
                    <div style={{ fontSize: 10, color: C.textMuted }}>position</div>
                  </div>
                </div>
              ))}
            </div>
            :null}
        </div>
        </div>
      </Modal>

      {/* New Content Modal */}
      <Modal open={showNewContent} onClose={() => setShowNewContent(false)} title="Add Content">
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: 12, color: C.textMuted, marginBottom: 6, display: "block" }}>Title</label>
            <input value={contentForm.title} onChange={e => setContentForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. The Future of AI" style={sInput} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, color: C.textMuted, marginBottom: 6, display: "block" }}>Type</label>
              <select value={contentForm.type} onChange={e => setContentForm(p => ({ ...p, type: e.target.value }))} style={sSelect}>
                <option value="blog">Blog Post</option>
                <option value="video">BÃ­deo</option>
                <option value="thread">Social Thread</option>
                <option value="carousel">Image Carousel</option>
                <option value="audio">Audio / Podcast</option>
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
            <label style={{ fontSize: 12, color: C.textMuted, marginBottom: 6, display: "block" }}>KnWword</label>
            <input value={keywordForm.keyword} onChange={e => setKeywordForm(p => ({ ..pp, keyword: e.target.value }))} placeholder="e.g. ai marketing tools" style={sInput} />
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

      {/* âââ AI Chat Floating Button âââ */}
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
