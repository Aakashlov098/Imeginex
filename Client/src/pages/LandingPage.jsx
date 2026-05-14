import { useState } from "react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    key: "generate",
    icon: "✦",
    name: "Generate Images",
    desc: "Text se stunning AI art banao. Realistic, anime, 3D — sab kuch.",
    cta: "Try free",
  },
  {
    key: "explore",
    icon: "◎",
    name: "Explore Feed",
    desc: "Community creations discover karo. Trending aur viral content.",
    cta: "Explore",
  },
  {
    key: "style",
    icon: "◈",
    name: "Style Studio",
    desc: "100+ art styles — cinematic, watercolor, sketch, neon aur bahut kuch.",
    cta: "See styles",
  },
  {
    key: "remix",
    icon: "↺",
    name: "Remix & Edit",
    desc: "Kisi bhi image ko edit karo ya remix karo apne style mein.",
    cta: "Remix",
  },
  {
    key: "save",
    icon: "⊡",
    name: "Collections",
    desc: "Best creations save karo aur private gallery mein organize karo.",
    cta: "Save work",
  },
  {
    key: "credits",
    icon: "◉",
    name: "Free Credits",
    desc: "Register karo aur free credits pao — turant generate karo.",
    cta: "Claim now",
  },
];

const modalData = {
  generate: { title: "Generate Images",  sub: <>AI image generation ke liye <b style={{color:"#a78bfa"}}>Imaginex</b> join karo — free!</> },
  explore:  { title: "Explore Feed",     sub: <>Community feed dekhne ke liye <b style={{color:"#a78bfa"}}>account banao</b>.</> },
  style:    { title: "Style Studio",     sub: <>100+ styles unlock karne ke liye <b style={{color:"#a78bfa"}}>register karo</b>.</> },
  remix:    { title: "Remix & Edit",     sub: <>Images remix karne ke liye <b style={{color:"#a78bfa"}}>sign in karo</b>.</> },
  save:     { title: "My Collections",  sub: <>Gallery banane ke liye <b style={{color:"#a78bfa"}}>Imaginex join karo</b>.</> },
  credits:  { title: "Free Credits",    sub: <>Register karo aur <b style={{color:"#a78bfa"}}>free credits</b> turant pao!</> },
  login:    { title: "Welcome Back!",   sub: <>Apne account mein <b style={{color:"#a78bfa"}}>sign in karo</b> — ya naya banao.</> },
  register: { title: "Start Creating",  sub: <><b style={{color:"#a78bfa"}}>Free account</b> banao aur AI image generation shuru karo!</> },
};

export default function LandingPage() {
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();

  const openModal = (key) => setModal(key);
  const closeModal = () => setModal(null);

  const goRegister = () => { closeModal(); navigate("/register"); };
  const goLogin    = () => { closeModal(); navigate("/login"); };

  return (
    <div style={styles.app}>

      {/* TOPBAR */}
      <div style={styles.topbar}>
        <div style={styles.logo}>
          <div style={styles.logoIcon}>✦</div>
          <span style={styles.logoText}>Imaginex</span>
        </div>
        <div style={styles.topbarActions}>
          <button style={styles.ghostBtn} onClick={() => openModal("login")}>Sign In</button>
          <button style={styles.purpleBtn} onClick={() => openModal("register")}>Get Started</button>
        </div>
      </div>

      {/* HERO */}
      <div style={styles.hero}>
        <div style={styles.heroGlow} />
        <div style={styles.badge}>✦ Antigravity AI</div>
        <h1 style={styles.heroTitle}>
          Imagine It.<br />
          <span style={styles.grad}>Generate It.</span>
        </h1>
        <p style={styles.heroSub}>
          AI-powered image generation, community exploration, and creative tools — all in one place.
        </p>
        <div style={styles.heroBtns}>
          <button style={styles.mainBtn} onClick={() => openModal("register")}>
            🚀 Start Creating Free
          </button>
          <button style={styles.outlineBtn} onClick={() => openModal("explore")}>
            Explore Gallery
          </button>
        </div>
      </div>

      {/* STATS */}
      <div style={styles.stats}>
        {[
          { num: "12K+", label: "Images Created" },
          { num: "3K+",  label: "Creators" },
          { num: "50+",  label: "AI Styles" },
          { num: "100%", label: "Free to Start" },
        ].map((s) => (
          <div key={s.label} style={styles.statItem}>
            <div style={styles.statNum}>{s.num}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* SCROLL HINT */}
      <div style={styles.scrollHint}>
        <div style={styles.scrollLine} />
        <span style={styles.scrollText}>explore features</span>
        <div style={styles.scrollLine} />
      </div>

      {/* FEATURE CARDS */}
      <div style={styles.featSection}>
        <div style={styles.featRow}>
          {features.map((f) => (
            <div
              key={f.key}
              style={styles.card}
              onClick={() => openModal(f.key)}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = "rgba(124,58,237,0.5)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <span style={styles.lockIcon}>🔒</span>
              <div style={styles.cardIcon}>{f.icon}</div>
              <div style={styles.cardName}>{f.name}</div>
              <div style={styles.cardDesc}>{f.desc}</div>
              <div style={styles.cardCta}>→ {f.cta}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {modal && (
        <div style={styles.overlay} onClick={(e) => e.target === e.currentTarget && closeModal()}>
          <div style={styles.modalBox}>
            <button style={styles.closeBtn} onClick={closeModal}>✕</button>
            <div style={styles.modalIcon}>✦</div>
            <div style={styles.modalTitle}>{modalData[modal]?.title}</div>
            <div style={styles.modalSub}>{modalData[modal]?.sub}</div>
            <button style={styles.modalPrimary} onClick={goRegister}>
              🚀 Register — It's Free
            </button>
            <div style={styles.orLine}>
              <hr style={styles.hr} />
              <span style={styles.orText}>already a member?</span>
              <hr style={styles.hr} />
            </div>
            <button style={styles.modalSecondary} onClick={goLogin}>
              Sign In to Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  app: {
    fontFamily: "'Inter', sans-serif",
    background: "#0d0d0d",
    minHeight: "100vh",
    color: "#fff",
  },
  // TOPBAR
  topbar: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "16px 28px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    background: "#0d0d0d",
    position: "sticky", top: 0, zIndex: 100,
  },
  logo: { display: "flex", alignItems: "center", gap: 10 },
  logoIcon: {
    width: 34, height: 34, borderRadius: 9,
    background: "linear-gradient(135deg,#7c3aed,#a855f7)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 16, color: "#fff",
  },
  logoText: { fontSize: 16, fontWeight: 700, color: "#fff" },
  topbarActions: { display: "flex", gap: 8 },
  ghostBtn: {
    padding: "8px 16px", borderRadius: 8, border: "none",
    background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)",
    fontFamily: "inherit", fontSize: 13, fontWeight: 500, cursor: "pointer",
  },
  purpleBtn: {
    padding: "8px 16px", borderRadius: 8, border: "none",
    background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "#fff",
    fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer",
  },
  // HERO
  hero: {
    padding: "52px 28px 40px", textAlign: "center", position: "relative", overflow: "hidden",
  },
  heroGlow: {
    position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)",
    width: 500, height: 300, borderRadius: "50%",
    background: "radial-gradient(ellipse,rgba(124,58,237,0.18) 0%,transparent 70%)",
    pointerEvents: "none",
  },
  badge: {
    display: "inline-flex", alignItems: "center", gap: 6,
    background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.35)",
    color: "#a78bfa", fontSize: 11, fontWeight: 500,
    padding: "5px 14px", borderRadius: 20, marginBottom: 20, letterSpacing: "0.5px",
  },
  heroTitle: {
    fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 800, lineHeight: 1.15,
    color: "#fff", marginBottom: 14, letterSpacing: -1,
  },
  grad: {
    background: "linear-gradient(135deg,#a78bfa 0%,#c084fc 50%,#e879f9 100%)",
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
  },
  heroSub: {
    fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.7,
    maxWidth: 420, margin: "0 auto 32px",
  },
  heroBtns: { display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" },
  mainBtn: {
    padding: "12px 24px", borderRadius: 10, border: "none",
    background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "#fff",
    fontFamily: "inherit", fontSize: 14, fontWeight: 600, cursor: "pointer",
  },
  outlineBtn: {
    padding: "12px 24px", borderRadius: 10,
    background: "transparent", border: "1px solid rgba(255,255,255,0.15)",
    color: "rgba(255,255,255,0.7)", fontFamily: "inherit", fontSize: 14, cursor: "pointer",
  },
  // STATS
  stats: {
    display: "flex", justifyContent: "center",
    borderTop: "1px solid rgba(255,255,255,0.05)",
    borderBottom: "1px solid rgba(255,255,255,0.05)",
    background: "#111",
  },
  statItem: { flex: 1, textAlign: "center", padding: "16px 12px", borderRight: "1px solid rgba(255,255,255,0.05)" },
  statNum: { fontSize: 18, fontWeight: 700, color: "#a78bfa", marginBottom: 2 },
  statLabel: { fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: 1, textTransform: "uppercase" },
  // SCROLL HINT
  scrollHint: { display: "flex", alignItems: "center", gap: 10, justifyContent: "center", margin: "24px 0 16px" },
  scrollLine: { width: 40, height: 1, background: "rgba(255,255,255,0.1)" },
  scrollText: { fontSize: 10, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,0.2)" },
  // CARDS
  featSection: { padding: "0 20px 40px" },
  featRow: {
    display: "flex", gap: 12, overflowX: "auto", paddingBottom: 12,
    scrollbarWidth: "none",
  },
  card: {
    minWidth: 185, flexShrink: 0,
    background: "#141414", border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: 14, padding: "20px 18px", cursor: "pointer",
    transition: "all 0.25s", position: "relative",
  },
  lockIcon: { position: "absolute", top: 12, right: 12, fontSize: 11, opacity: 0.25 },
  cardIcon: { fontSize: 22, color: "#a78bfa", marginBottom: 12 },
  cardName: { fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 5 },
  cardDesc: { fontSize: 11, color: "rgba(255,255,255,0.32)", lineHeight: 1.55, marginBottom: 14 },
  cardCta: { fontSize: 11, color: "#8b5cf6", fontWeight: 500 },
  // MODAL
  overlay: {
    position: "fixed", inset: 0, zIndex: 500,
    background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  modalBox: {
    background: "#161616", border: "1px solid rgba(124,58,237,0.3)",
    borderRadius: 18, padding: "36px 30px", maxWidth: 340, width: "92%",
    position: "relative",
  },
  closeBtn: {
    position: "absolute", top: 14, right: 14,
    background: "rgba(255,255,255,0.05)", border: "none", borderRadius: 6,
    color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 14,
    width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center",
  },
  modalIcon: {
    width: 50, height: 50, borderRadius: 13,
    background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#a78bfa", fontSize: 22, margin: "0 auto 18px",
  },
  modalTitle: { fontSize: 19, fontWeight: 700, textAlign: "center", color: "#fff", marginBottom: 6 },
  modalSub: { fontSize: 12, color: "rgba(255,255,255,0.38)", textAlign: "center", lineHeight: 1.65, marginBottom: 22 },
  modalPrimary: {
    display: "block", width: "100%", padding: 13, borderRadius: 10, border: "none",
    background: "linear-gradient(135deg,#7c3aed,#a855f7)", color: "#fff",
    fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer", marginBottom: 8,
  },
  orLine: { display: "flex", alignItems: "center", gap: 10, margin: "2px 0 8px" },
  hr: { flex: 1, border: "none", borderTop: "1px solid rgba(255,255,255,0.07)" },
  orText: { fontSize: 10, color: "rgba(255,255,255,0.18)", whiteSpace: "nowrap" },
  modalSecondary: {
    display: "block", width: "100%", padding: 13, borderRadius: 10,
    background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
    color: "rgba(255,255,255,0.55)", fontFamily: "inherit", fontSize: 13, fontWeight: 600, cursor: "pointer",
  },
};
