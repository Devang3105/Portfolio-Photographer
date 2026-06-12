import { useState, useEffect, useRef } from "react";
import { Camera, Menu, X, Star, ChevronDown, Mail, Phone, MapPin, MessageCircle, ArrowRight, Award, Clock, Heart, Zap, Users, Eye, Briefcase, Image, ShoppingBag, Smartphone, Play, CheckCircle } from "lucide-react";

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8C97A";

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
};

const FadeIn = ({ children, delay = 0, direction = "up", className = "" }) => {
  const [ref, inView] = useInView();
  const transforms = { up: "translateY(40px)", down: "translateY(-40px)", left: "translateX(-40px)", right: "translateX(40px)", none: "none" };
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0, transform: inView ? "none" : transforms[direction],
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
    }}>{children}</div>
  );
};

const Counter = ({ end, suffix = "", label }) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView();
  useEffect(() => {
    if (!inView) return;
    let start = 0; const duration = 1800; const step = duration / end;
    const timer = setInterval(() => { start += 1; setCount(start); if (start >= end) clearInterval(timer); }, step);
    return () => clearInterval(timer);
  }, [inView, end]);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{ fontSize: "2.8rem", fontWeight: 700, color: GOLD, fontFamily: "'Playfair Display', serif", lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ color: "#aaa", fontSize: "0.9rem", marginTop: "0.4rem", letterSpacing: "0.05em" }}>{label}</div>
    </div>
  );
};

const NAV_LINKS = ["Home", "About", "Services", "Portfolio", "Why Us", "Contact"];

const SERVICES = [
  { icon: <Briefcase size={28} />, title: "Corporate Photography", desc: "Professional images for brands, boardrooms, and business identity." },
  { icon: <Camera size={28} />, title: "Event Coverage", desc: "Seamless documentation of conferences, launches, and celebrations." },
  { icon: <Eye size={28} />, title: "Fashion Photography", desc: "Editorial and campaign shoots that define visual narratives." },
  { icon: <Users size={28} />, title: "Portrait Photography", desc: "Capturing personality and soul in every individual frame." },
  { icon: <Award size={28} />, title: "Jewellery Photography", desc: "Macro precision and light mastery for luxury product imaging." },
  { icon: <ShoppingBag size={28} />, title: "Product Photography", desc: "Clean, compelling visuals that convert browsers into buyers." },
  { icon: <Play size={28} />, title: "Commercial Shoots", desc: "Full-scale creative production for advertising campaigns." },
  { icon: <Smartphone size={28} />, title: "Social Media Content", desc: "Scroll-stopping content crafted for digital platforms." },
];

const FEATURES = [
  { icon: <Award size={22} />, title: "Professional Quality", desc: "Studio-grade results on every project, no exceptions." },
  { icon: <Heart size={22} />, title: "Creative Storytelling", desc: "Every image tells a story that resonates with your audience." },
  { icon: <Image size={22} />, title: "Premium Editing", desc: "Meticulous post-production with cinematic colour grading." },
  { icon: <Clock size={22} />, title: "Fast Turnaround", desc: "Delivery timelines that respect your deadlines and launches." },
  { icon: <Users size={22} />, title: "Personalised Experience", desc: "Collaborative process tailored to your unique vision." },
  { icon: <Zap size={22} />, title: "Attention to Detail", desc: "From lighting to composition, nothing is left to chance." },
];

const TESTIMONIALS = [
  { name: "Meera Shah", role: "CEO, Vogue Interiors", text: "Ronak transformed our brand shoot into something extraordinary. The images speak a language of their own — elegant, refined, and absolutely on point." },
  { name: "Arjun Patel", role: "Founder, Auric Jewels", text: "Our jewellery never looked so stunning online. The detail in each shot boosted our conversion rate significantly. Highly recommend Ronakography." },
  { name: "Priya Desai", role: "Marketing Head, TechSummit", text: "Covered our annual corporate event flawlessly. Every keynote moment captured with professionalism and a creative eye that sets them apart." },
];

const GALLERY_CATS = ["All", "Corporate", "Events", "Fashion", "Portraits", "Jewellery", "Products"];
const GALLERY_ITEMS = [
  { cat: "Corporate", aspect: "portrait", bg: "linear-gradient(135deg,#1a1a2e,#16213e)" },
  { cat: "Fashion", aspect: "landscape", bg: "linear-gradient(135deg,#2d1b00,#5c3200)" },
  { cat: "Portraits", aspect: "portrait", bg: "linear-gradient(135deg,#0d0d0d,#1a0a00)" },
  { cat: "Events", aspect: "landscape", bg: "linear-gradient(135deg,#0a1628,#1a2e4a)" },
  { cat: "Jewellery", aspect: "portrait", bg: "linear-gradient(135deg,#1a1500,#332b00)" },
  { cat: "Products", aspect: "landscape", bg: "linear-gradient(135deg,#0d1a0d,#1a330d)" },
  { cat: "Fashion", aspect: "portrait", bg: "linear-gradient(135deg,#1a0d1a,#33003a)" },
  { cat: "Corporate", aspect: "landscape", bg: "linear-gradient(135deg,#0d0d1a,#1a1a33)" },
  { cat: "Portraits", aspect: "portrait", bg: "linear-gradient(135deg,#1a0a0a,#330d0d)" },
];

export default function Ronakography() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", project: "", message: "" });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  const sectionIds = { Home: "hero", About: "about", Services: "services", Portfolio: "portfolio", "Why Us": "why", Contact: "contact" };

  const filtered = activeTab === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.cat === activeTab);

  return (
    <div style={{ background: "#0a0a0a", color: "#fff", fontFamily: "'Poppins', sans-serif", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@400;600;700;900&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(8,8,8,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid rgba(201,168,76,0.15)` : "none",
        transition: "all 0.4s ease", padding: "0 2rem",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: GOLD, letterSpacing: "0.02em" }}>
            Ronak<span style={{ color: "#fff" }}>ography</span>
          </div>

          {/* Desktop nav */}
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="desktop-nav">
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => scrollTo(sectionIds[link])} style={{
                background: "none", border: "none", color: "#ccc", cursor: "pointer",
                fontSize: "0.88rem", fontFamily: "'Poppins',sans-serif", letterSpacing: "0.04em",
                fontWeight: 500, transition: "color 0.2s", padding: "0.3rem 0"
              }}
                onMouseEnter={e => e.target.style.color = GOLD}
                onMouseLeave={e => e.target.style.color = "#ccc"}
              >{link}</button>
            ))}
            <button onClick={() => scrollTo("contact")} style={{
              background: GOLD, color: "#0a0a0a", border: "none", borderRadius: 4,
              padding: "0.5rem 1.2rem", fontFamily: "'Poppins',sans-serif", fontWeight: 600,
              fontSize: "0.85rem", cursor: "pointer", letterSpacing: "0.03em",
              transition: "all 0.2s"
            }}
              onMouseEnter={e => { e.target.style.background = GOLD_LIGHT; }}
              onMouseLeave={e => { e.target.style.background = GOLD; }}
            >Book a Shoot</button>
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            display: "none", background: "none", border: "none", color: "#fff", cursor: "pointer"
          }} className="mobile-menu-btn">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={{
            position: "absolute", top: 70, left: 0, right: 0,
            background: "rgba(8,8,8,0.98)", borderBottom: `1px solid rgba(201,168,76,0.2)`,
            padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.2rem"
          }}>
            {NAV_LINKS.map(link => (
              <button key={link} onClick={() => scrollTo(sectionIds[link])} style={{
                background: "none", border: "none", color: "#ccc", cursor: "pointer",
                fontSize: "1rem", fontFamily: "'Poppins',sans-serif", textAlign: "left", fontWeight: 500
              }}>{link}</button>
            ))}
            <button onClick={() => scrollTo("contact")} style={{
              background: GOLD, color: "#0a0a0a", border: "none", borderRadius: 4,
              padding: "0.7rem 1.4rem", fontFamily: "'Poppins',sans-serif", fontWeight: 600,
              fontSize: "0.9rem", cursor: "pointer", width: "fit-content"
            }}>Book a Shoot</button>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="hero" style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
        background: "radial-gradient(ellipse at 60% 40%, rgba(201,168,76,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(201,168,76,0.05) 0%, transparent 50%), #080808"
      }}>
        {/* Animated particles */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          {[...Array(20)].map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              width: Math.random() * 3 + 1 + "px", height: Math.random() * 3 + 1 + "px",
              background: `rgba(201,168,76,${Math.random() * 0.4 + 0.1})`,
              borderRadius: "50%",
              left: Math.random() * 100 + "%", top: Math.random() * 100 + "%",
              animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite`,
              animationDelay: Math.random() * 4 + "s"
            }} />
          ))}
        </div>

        {/* Camera aperture graphic */}
        <div style={{
          position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)",
          width: 380, height: 380, opacity: 0.06,
          border: `2px solid ${GOLD}`, borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{ width: 280, height: 280, border: `2px solid ${GOLD}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 160, height: 160, border: `2px solid ${GOLD}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 60, height: 60, background: GOLD, borderRadius: "50%" }} />
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: 720 }}>
            <div style={{ color: GOLD, fontSize: "0.85rem", letterSpacing: "0.25em", fontWeight: 600, marginBottom: "1.5rem", textTransform: "uppercase", opacity: 0, animation: "fadeUp 0.8s ease 0.3s forwards" }}>
              Professional Photography Studio
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
              fontWeight: 900, lineHeight: 1.05, marginBottom: "1.5rem",
              opacity: 0, animation: "fadeUp 0.8s ease 0.5s forwards"
            }}>
              
              <span style={{ color: GOLD }}>Capturing Stories<br />Beyond Frames</span>
            </h1>
            <p style={{
              fontSize: "1.05rem", color: "#aaa", lineHeight: 1.8, maxWidth: 580,
              marginBottom: "2.5rem", fontWeight: 300,
              opacity: 0, animation: "fadeUp 0.8s ease 0.7s forwards"
            }}>
              Professional photography that transforms moments into timeless memories. From corporate events and fashion campaigns to portraits and commercial projects, every image is crafted with creativity, precision, and purpose.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", opacity: 0, animation: "fadeUp 0.8s ease 0.9s forwards" }}>
              <button onClick={() => scrollTo("portfolio")} style={{
                background: "transparent", border: `2px solid ${GOLD}`, color: GOLD,
                padding: "0.85rem 2rem", borderRadius: 4, fontFamily: "'Poppins',sans-serif",
                fontWeight: 600, fontSize: "0.95rem", cursor: "pointer", letterSpacing: "0.03em",
                transition: "all 0.3s", display: "flex", alignItems: "center", gap: "0.5rem"
              }}
                onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = "#0a0a0a"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = GOLD; }}
              >
                <Camera size={18} /> View Portfolio
              </button>
              <button onClick={() => scrollTo("contact")} style={{
                background: GOLD, border: `2px solid ${GOLD}`, color: "#0a0a0a",
                padding: "0.85rem 2rem", borderRadius: 4, fontFamily: "'Poppins',sans-serif",
                fontWeight: 600, fontSize: "0.95rem", cursor: "pointer", letterSpacing: "0.03em",
                transition: "all 0.3s", display: "flex", alignItems: "center", gap: "0.5rem"
              }}
                onMouseEnter={e => { e.currentTarget.style.background = GOLD_LIGHT; }}
                onMouseLeave={e => { e.currentTarget.style.background = GOLD; }}
              >
                <Phone size={18} /> Book Your Shoot
              </button>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", opacity: 0, animation: "fadeUp 0.8s ease 1.2s forwards" }}>
          <button onClick={() => scrollTo("about")} style={{
            background: "none", border: "none", color: "#666", cursor: "pointer",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
            animation: "bounce 2s ease-in-out infinite"
          }}>
            <span style={{ fontSize: "0.75rem", letterSpacing: "0.1em", color: "#666" }}>SCROLL</span>
            <ChevronDown size={20} />
          </button>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "7rem 2rem", background: "#0d0d0d" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
        
          <FadeIn>
            <div>
              <div style={{ color: GOLD, fontSize: "0.8rem", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "1rem", textTransform: "uppercase" }}>About</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 700, marginBottom: "1.5rem", lineHeight: 1.2 }}>
                <span style={{ color: GOLD }}>About Ronakography</span>
              </h2>
              <p style={{ color: "#bbb", lineHeight: 1.9, marginBottom: "1rem", fontWeight: 300 }}>
                Hi, I'm Ronak Motirai, founder of Ronakography. My photography journey began with a passion for storytelling and a camera in hand.
              </p>
              <p style={{ color: "#bbb", lineHeight: 1.9, marginBottom: "1rem", fontWeight: 300 }}>
                Over the years, I have worked across corporate, fashion, events, portraits, jewellery, and commercial photography, helping brands and individuals bring their vision to life.
              </p>
              <p style={{ color: "#bbb", lineHeight: 1.9, marginBottom: "2.5rem", fontWeight: 300 }}>
                At Ronakography, every project is approached with attention to detail, creativity, and a commitment to delivering exceptional visual experiences.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem", borderTop: `1px solid rgba(201,168,76,0.15)`, paddingTop: "2rem" }}>
                <Counter end={100} suffix="+" label="Projects Completed" />
                <Counter end={50} suffix="+" label="Happy Clients" />
                <Counter end={5} suffix="+" label="Photo Categories" />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "7rem 2rem", background: "#080808" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <div style={{ color: GOLD, fontSize: "0.8rem", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "1rem", textTransform: "uppercase" }}>What I Do</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 700 }}>
                <span style={{ color: GOLD }}>Photography Services</span>
              </h2>
            </div>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: "1.5rem" }}>
            {SERVICES.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.07}>
                <ServiceCard {...s} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" style={{ padding: "7rem 2rem", background: "#0d0d0d" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div style={{ color: GOLD, fontSize: "0.8rem", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "1rem", textTransform: "uppercase" }}>My Work</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 700 }}>
                <span style={{ color: GOLD }}>Featured Portfolio</span>
              </h2>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "3rem" }}>
              {GALLERY_CATS.map(cat => (
                <button key={cat} onClick={() => setActiveTab(cat)} style={{
                  background: activeTab === cat ? GOLD : "transparent",
                  color: activeTab === cat ? "#0a0a0a" : "#aaa",
                  border: `1px solid ${activeTab === cat ? GOLD : "rgba(201,168,76,0.3)"}`,
                  borderRadius: 4, padding: "0.45rem 1.1rem",
                  fontFamily: "'Poppins',sans-serif", fontSize: "0.85rem", fontWeight: 500,
                  cursor: "pointer", transition: "all 0.25s"
                }}>{cat}</button>
              ))}
            </div>
          </FadeIn>

          <div style={{ columns: "3 250px", gap: "1rem" }}>
            {filtered.map((item, i) => (
              <div key={i} onClick={() => setLightbox(item)} style={{
                breakInside: "avoid", marginBottom: "1rem",
                height: item.aspect === "portrait" ? 320 : 220,
                background: item.bg, borderRadius: 6,
                border: "1px solid rgba(201,168,76,0.1)",
                cursor: "pointer", position: "relative", overflow: "hidden",
                transition: "transform 0.3s, box-shadow 0.3s",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = `0 8px 32px rgba(201,168,76,0.15)`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{ textAlign: "center", color: "#555" }}>
                  <Image size={32} />
                  <p style={{ fontSize: "0.75rem", marginTop: "0.4rem" }}>{item.cat}</p>
                </div>
                <div style={{
                  position: "absolute", inset: 0, background: "rgba(0,0,0,0)",
                  transition: "background 0.3s", display: "flex", alignItems: "center", justifyContent: "center"
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.5)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0)"}
                >
                  <div style={{ color: GOLD, fontSize: "0.8rem", letterSpacing: "0.1em", opacity: 0, transition: "opacity 0.3s" }}
                    className="overlay-text"
                  >VIEW</div>
                </div>
                <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem", background: "rgba(0,0,0,0.6)", color: GOLD, fontSize: "0.7rem", padding: "0.25rem 0.6rem", borderRadius: 3, letterSpacing: "0.08em" }}>
                  {item.cat}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION + WHY */}
      <section id="why" style={{ padding: "7rem 2rem", background: "linear-gradient(180deg,#080808 0%,#0d0d0d 100%)", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%,rgba(201,168,76,0.06) 0%,transparent 60%)" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <div style={{
              textAlign: "center", padding: "4rem 2rem",
              background: "rgba(201,168,76,0.04)", border: `1px solid rgba(201,168,76,0.15)`,
              borderRadius: 8, marginBottom: "5rem",
              backdropFilter: "blur(8px)"
            }}>
              <div style={{ color: GOLD, fontSize: "0.8rem", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "1rem", textTransform: "uppercase" }}>Our Vision</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.6rem,3.5vw,2.5rem)", fontWeight: 700, maxWidth: 700, margin: "0 auto", lineHeight: 1.3 }}>
                 "<span style={{ color: GOLD }}>To create impactful visuals that inspire, connect, and leave a lasting impression.</span>"
              </h2>
            </div>
          </FadeIn>

          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 700 }}>
               <span style={{ color: GOLD }}>Why Choose Ronakography?</span>
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "1.5rem" }}>
            {FEATURES.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.08}>
                <div style={{
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.12)",
                  borderRadius: 8, padding: "1.75rem", transition: "all 0.3s"
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,168,76,0.06)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.12)"; }}
                >
                  <div style={{ color: GOLD, marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <CheckCircle size={20} />
                    <span style={{ fontSize: "0.8rem", letterSpacing: "0.08em", fontWeight: 600 }}>FEATURE</span>
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <div style={{ color: GOLD, flexShrink: 0, marginTop: "0.1rem" }}>{f.icon}</div>
                    <div>
                      <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.4rem" }}>{f.title}</h3>
                      <p style={{ color: "#888", fontSize: "0.88rem", lineHeight: 1.7, fontWeight: 300 }}>{f.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "7rem 2rem", background: "#080808" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <div style={{ color: GOLD, fontSize: "0.8rem", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "1rem", textTransform: "uppercase" }}>Client Stories</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 700 }}>
                <span style={{ color: GOLD }}>What Clients Say</span>
              </h2>
            </div>
          </FadeIn>

          <div style={{ position: "relative", maxWidth: 780, margin: "0 auto" }}>
            <div style={{
              background: "rgba(201,168,76,0.04)", border: `1px solid rgba(201,168,76,0.15)`,
              borderRadius: 8, padding: "3rem", textAlign: "center", minHeight: 260,
              transition: "opacity 0.5s"
            }}>
              <div style={{ display: "flex", justifyContent: "center", gap: "0.3rem", marginBottom: "1.5rem" }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill={GOLD} color={GOLD} />)}
              </div>
              <p style={{ color: "#ccc", fontSize: "1.05rem", lineHeight: 1.9, fontStyle: "italic", marginBottom: "2rem", fontWeight: 300 }}>
                "{TESTIMONIALS[testimonialIdx].text}"
              </p>
              <div style={{ color: GOLD, fontWeight: 600 }}>{TESTIMONIALS[testimonialIdx].name}</div>
              <div style={{ color: "#666", fontSize: "0.85rem" }}>{TESTIMONIALS[testimonialIdx].role}</div>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: "0.6rem", marginTop: "1.5rem" }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setTestimonialIdx(i)} style={{
                  width: i === testimonialIdx ? 24 : 8, height: 8, borderRadius: 4,
                  background: i === testimonialIdx ? GOLD : "rgba(201,168,76,0.3)",
                  border: "none", cursor: "pointer", transition: "all 0.3s"
                }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "7rem 2rem", background: "#0d0d0d" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <div style={{ color: GOLD, fontSize: "0.8rem", letterSpacing: "0.2em", fontWeight: 600, marginBottom: "1rem", textTransform: "uppercase" }}>Get In Touch</div>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 700 }}>
                <span style={{ color: GOLD }}>Let's Create Something Extraordinary</span>
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "4rem", alignItems: "start" }}>
            <FadeIn direction="left">
              <div>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", marginBottom: "2rem", color: GOLD }}>Studio Details</h3>
                {[
                  { icon: <Users size={18} />, label: "Founder", value: "Ronak Motirai" },
                  { icon: <Phone size={18} />, label: "Phone", value: "+91 81606 10973" },
                  { icon: <Mail size={18} />, label: "Email", value: "ronakmotirai52@gmail.com" },
                  { icon: <MapPin size={18} />, label: "Location", value: "Gujarat, India" },
                ].map(item => (
                  <div key={item.label} style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", alignItems: "flex-start" }}>
                    <div style={{ color: GOLD, flexShrink: 0, marginTop: 2 }}>{item.icon}</div>
                    <div>
                      <div style={{ color: "#666", fontSize: "0.75rem", letterSpacing: "0.08em", marginBottom: "0.2rem" }}>{item.label.toUpperCase()}</div>
                      <div style={{ color: "#ddd", fontSize: "0.95rem" }}>{item.value}</div>
                    </div>
                  </div>
                ))}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "2.5rem" }}>
                  <a href="https://wa.me/918160610973" style={{
                    display: "flex", alignItems: "center", gap: "0.6rem",
                    background: "#25D366", color: "#fff", textDecoration: "none",
                    padding: "0.75rem 1.5rem", borderRadius: 4, fontWeight: 600, fontSize: "0.9rem",
                    transition: "opacity 0.2s"
                  }}>
                    <MessageCircle size={18} /> WhatsApp Contact
                  </a>
                  <a href="mailto:ronakmotirai52@gmail.com" style={{
                    display: "flex", alignItems: "center", gap: "0.6rem",
                    background: "transparent", color: GOLD, textDecoration: "none",
                    border: `1px solid ${GOLD}`, padding: "0.75rem 1.5rem", borderRadius: 4,
                    fontWeight: 600, fontSize: "0.9rem", transition: "all 0.2s"
                  }}>
                    <Mail size={18} /> Email Inquiry
                  </a>
                  <a href="https://instagram.com/ronakk_motirai" style={{
                    display: "flex", alignItems: "center", gap: "0.6rem",
                    background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)",
                    color: "#fff", textDecoration: "none",
                    padding: "0.75rem 1.5rem", borderRadius: 4, fontWeight: 600, fontSize: "0.9rem"
                  }}>
                  
                  </a>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right">
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 8, padding: "2.5rem" }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", marginBottom: "2rem" }}>Send an Inquiry</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <FormField label="Your Name" value={formData.name} onChange={v => setFormData(p => ({ ...p, name: v }))} placeholder="Ronak Shah" />
                  <FormField label="Email" value={formData.email} onChange={v => setFormData(p => ({ ...p, email: v }))} placeholder="you@email.com" type="email" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <FormField label="Phone" value={formData.phone} onChange={v => setFormData(p => ({ ...p, phone: v }))} placeholder="+91 9876543210" />
                  <div>
                    <label style={{ display: "block", color: "#888", fontSize: "0.8rem", letterSpacing: "0.05em", marginBottom: "0.4rem" }}>PROJECT TYPE</label>
                    <select value={formData.project} onChange={e => setFormData(p => ({ ...p, project: e.target.value }))} style={{
                      width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 4, color: "#ddd", padding: "0.7rem 0.9rem", fontFamily: "'Poppins',sans-serif",
                      fontSize: "0.9rem", outline: "none"
                    }}>
                      <option value="">Select type</option>
                      {SERVICES.map(s => <option key={s.title} value={s.title} style={{ background: "#1a1a1a" }}>{s.title}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", color: "#888", fontSize: "0.8rem", letterSpacing: "0.05em", marginBottom: "0.4rem" }}>MESSAGE</label>
                  <textarea value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} placeholder="Tell me about your project..." rows={4} style={{
                    width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 4, color: "#ddd", padding: "0.7rem 0.9rem", fontFamily: "'Poppins',sans-serif",
                    fontSize: "0.9rem", resize: "vertical", outline: "none", boxSizing: "border-box"
                  }} />
                </div>
                <button style={{
                  width: "100%", background: GOLD, color: "#0a0a0a", border: "none",
                  borderRadius: 4, padding: "0.9rem", fontFamily: "'Poppins',sans-serif",
                  fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", letterSpacing: "0.03em",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
                  transition: "background 0.2s"
                }}
                  onMouseEnter={e => e.currentTarget.style.background = GOLD_LIGHT}
                  onMouseLeave={e => e.currentTarget.style.background = GOLD}
                >
                  Send Inquiry <ArrowRight size={18} />
                </button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#050505", borderTop: `1px solid rgba(201,168,76,0.1)`, padding: "4rem 2rem 2rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }}>
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.8rem", fontWeight: 700, color: GOLD, marginBottom: "1rem" }}>
                Ronak<span style={{ color: "#fff" }}>ography</span>
              </div>
              <p style={{ color: "#666", fontSize: "0.9rem", lineHeight: 1.8, maxWidth: 320, fontWeight: 300 }}>
                Let's Create Something Extraordinary Together.
              </p>
              <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.5rem" }}>
                {[<Mail size={18} />, <Phone size={18} />].map((icon, i) => (
                  <div key={i} style={{
                    width: 38, height: 38, border: `1px solid rgba(201,168,76,0.25)`,
                    borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    color: GOLD, cursor: "pointer", transition: "all 0.2s"
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = "#0a0a0a"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = GOLD; }}
                  >{icon}</div>
                ))}
              </div>
            </div>
            <div>
              <h4 style={{ color: GOLD, fontSize: "0.85rem", letterSpacing: "0.1em", marginBottom: "1.5rem", textTransform: "uppercase" }}>Quick Links</h4>
              {NAV_LINKS.map(link => (
                <button key={link} onClick={() => scrollTo(sectionIds[link])} style={{
                  display: "block", background: "none", border: "none", color: "#666",
                  cursor: "pointer", fontSize: "0.9rem", marginBottom: "0.75rem",
                  fontFamily: "'Poppins',sans-serif", padding: 0, transition: "color 0.2s"
                }}
                  onMouseEnter={e => e.target.style.color = GOLD}
                  onMouseLeave={e => e.target.style.color = "#666"}
                >{link}</button>
              ))}
            </div>
            <div>
              <h4 style={{ color: GOLD, fontSize: "0.85rem", letterSpacing: "0.1em", marginBottom: "1.5rem", textTransform: "uppercase" }}>Services</h4>
              {SERVICES.slice(0, 5).map(s => (
                <div key={s.title} style={{ color: "#666", fontSize: "0.88rem", marginBottom: "0.65rem", fontWeight: 300 }}>{s.title}</div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: `1px solid rgba(255,255,255,0.06)`, paddingTop: "1.5rem", textAlign: "center", color: "#444", fontSize: "0.85rem" }}>
            © 2026 Ronakography. All Rights Reserved. | Crafted with precision & passion.
          </div>
        </div>
      </footer>

      {/* LIGHTBOX */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.93)", zIndex: 2000,
          display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer"
        }}>
          <button onClick={() => setLightbox(null)} style={{
            position: "absolute", top: "2rem", right: "2rem", background: "none",
            border: `1px solid ${GOLD}`, color: GOLD, borderRadius: "50%",
            width: 40, height: 40, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
          }}><X size={18} /></button>
          <div style={{
            width: "80vw", maxWidth: 800, height: "60vh",
            background: lightbox.bg, borderRadius: 8, border: `1px solid rgba(201,168,76,0.3)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "scaleIn 0.3s ease"
          }}>
            <div style={{ textAlign: "center", color: "#555" }}>
              <Image size={48} />
              <p style={{ marginTop: "0.5rem", color: GOLD }}>{lightbox.cat}</p>
              <p style={{ fontSize: "0.8rem", color: "#555" }}>Add your photo here</p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes bounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-8px); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          #about > div > div { grid-template-columns: 1fr !important; gap: 2rem !important; }
          #contact > div > div:last-child { grid-template-columns: 1fr !important; gap: 2rem !important; }
          footer > div > div:first-child { grid-template-columns: 1fr !important; }
          body { margin: 0; }
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #0a0a0a; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; }
        ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.4); border-radius: 3px; }
      `}</style>
    </div>
  );
}

function ServiceCard({ icon, title, desc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      background: hovered ? "rgba(201,168,76,0.05)" : "rgba(255,255,255,0.02)",
      border: `1px solid ${hovered ? "rgba(201,168,76,0.4)" : "rgba(201,168,76,0.1)"}`,
      borderRadius: 8, padding: "2rem 1.5rem",
      transform: hovered ? "translateY(-6px)" : "translateY(0)",
      boxShadow: hovered ? `0 12px 40px rgba(201,168,76,0.1)` : "none",
      transition: "all 0.3s ease", cursor: "default"
    }}>
      <div style={{ color: GOLD, marginBottom: "1.25rem" }}>{icon}</div>
      <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "0.6rem" }}>{title}</h3>
      <p style={{ color: "#777", fontSize: "0.87rem", lineHeight: 1.7, fontWeight: 300 }}>{desc}</p>
    </div>
  );
}

function FormField({ label, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label style={{ display: "block", color: "#888", fontSize: "0.8rem", letterSpacing: "0.05em", marginBottom: "0.4rem" }}>
        {label.toUpperCase()}
      </label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={{
        width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: 4, color: "#ddd", padding: "0.7rem 0.9rem", fontFamily: "'Poppins',sans-serif",
        fontSize: "0.9rem", outline: "none", boxSizing: "border-box"
      }} />
    </div>
  );
}
