"use client";
import React, { useEffect, useRef, useState } from 'react';

const useInView = (threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const FadeIn = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
};

const courses = [
  { icon: '📖', title: 'Quran & Tajweed', desc: 'Proper recitation, Makhaarij, and rules of Tajweed taught by qualified Huffadh.' },
  { icon: '🌙', title: 'Islamic Aqeedah', desc: "Foundational beliefs of Ahlus Sunnah wal Jama'ah, explained simply and clearly." },
  { icon: '🤲', title: 'Fiqh & Ibadah', desc: 'Practical worship — Salah, Sawm, Wudhu — with understanding and confidence.' },
  { icon: '📜', title: 'Seerah & History', desc: 'The inspiring life of the Prophet ﷺ and the golden era of Islamic civilization.' },
  { icon: '🗣️', title: 'Arabic Language', desc: 'Foundational vocabulary and grammar to connect directly with the Quran.' },
  { icon: '🌸', title: 'Akhlaq & Character', desc: 'Instilling prophetic manners, empathy, and Islamic values for daily life.' },
];

const stats = [
  { num: '2026', label: 'Inaugural Batch' },
  { num: '6', label: 'Core Subjects' },
  { num: '15+', label: 'Qualified Instructors' },
  { num: 'Free', label: 'Registration' },
];

const testimonials = [
  { name: 'Fathima Noor', role: 'Parent', text: 'My daughter came home reciting Quran beautifully. The teachers are so patient and dedicated. Truly a blessed program.' },
  { name: 'Ibrahim Khalil', role: 'Student, Age 14', text: 'I finally understood Tajweed properly. The classes are fun and the ustadhs explain everything so clearly.' },
  { name: 'Umm Salma', role: 'Parent', text: "Alhamdulillah. This isn't just a class — it's a complete environment of tarbiyah. I can see the change in my son's character." },
];

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = () => setMenuOpen(false);
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [menuOpen]);

  return (
    <div style={{ fontFamily: "'El Messiri', Georgia, serif", background: '#FDFCF8', color: '#1a1a1a', overflowX: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=El+Messiri:wght@400;500;600;700&family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; max-width: 100vw; }
        .amiri  { font-family: 'Amiri', Georgia, serif; }
        .dm     { font-family: 'DM Sans', sans-serif; }
        .el     { font-family: 'El Messiri', sans-serif; }

        .btn-gold { display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#c4a006,#e9bc2f);color:#1a1a1a;font-family:'DM Sans',sans-serif;font-weight:700;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;padding:15px 32px;border-radius:6px;box-shadow:0 8px 28px rgba(196,160,6,.4);transition:all .3s;font-size:13px; }
        .btn-gold:hover { transform:translateY(-2px);box-shadow:0 16px 40px rgba(196,160,6,.5); }
        .btn-ghost { display:inline-flex;align-items:center;gap:8px;border:2px solid rgba(255,255,255,.35);color:#fff;font-family:'DM Sans',sans-serif;font-weight:600;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;padding:13px 28px;border-radius:6px;transition:all .3s;font-size:13px; }
        .btn-ghost:hover { background:rgba(255,255,255,.12);border-color:rgba(255,255,255,.6); }
        .btn-green { display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#2d8a44,#3da355);color:#fff;font-family:'DM Sans',sans-serif;font-weight:700;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;padding:14px 28px;border-radius:6px;box-shadow:0 8px 24px rgba(45,138,68,.35);transition:all .3s;font-size:13px; }
        .btn-green:hover { transform:translateY(-2px);box-shadow:0 16px 36px rgba(45,138,68,.45); }
        .btn-og { display:inline-flex;align-items:center;gap:8px;border:2px solid #2d8a44;color:#2d8a44;font-family:'DM Sans',sans-serif;font-weight:600;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;padding:12px 26px;border-radius:6px;transition:all .3s;font-size:13px; }
        .btn-og:hover { background:#2d8a44;color:#fff;transform:translateY(-2px); }

        .divider { width:64px;height:3px;background:linear-gradient(90deg,#2d8a44,#c4a006);border-radius:2px; }
        .div-c   { margin:0 auto; }
        .card-lift { transition:all .35s cubic-bezier(.25,.46,.45,.94); }
        .card-lift:hover { transform:translateY(-6px);box-shadow:0 20px 56px rgba(0,0,0,.11); }
        .pdot { width:8px;height:8px;border-radius:50%;transition:all .3s;cursor:pointer; }

        @keyframes gradS  { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:.6} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes waP    { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,.5)} 70%{box-shadow:0 0 0 14px rgba(37,211,102,0)} }

        .u1 { animation:fadeUp .9s ease .1s both; }
        .u2 { animation:fadeUp .9s ease .3s both; }
        .u3 { animation:fadeUp .9s ease .5s both; }
        .u4 { animation:fadeUp .9s ease .7s both; }

        .wa { position:fixed;bottom:24px;right:24px;z-index:9999;width:56px;height:56px;border-radius:50%;background:#25d366;display:flex;align-items:center;justify-content:center;text-decoration:none;animation:waP 2.5s infinite;transition:transform .2s; }
        .wa:hover { transform:scale(1.1); }
        .wa svg { width:28px;height:28px;fill:#fff; }

        .hbg { display:none;flex-direction:column;justify-content:center;gap:5px;width:40px;height:40px;cursor:pointer;border:none;background:transparent;flex-shrink:0;padding:4px;border-radius:8px; }
        .hbg span { display:block;height:2px;border-radius:2px;background:#333;transition:all .3s; }
        .hbg.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
        .hbg.open span:nth-child(2) { opacity:0; }
        .hbg.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }

        .mnav { display:none;position:absolute;top:70px;left:0;right:0;background:#fff;box-shadow:0 12px 32px rgba(0,0,0,.1);border-bottom:1px solid rgba(45,138,68,.12);flex-direction:column;padding:12px 20px 20px;gap:2px;z-index:99; }
        .mnav.open { display:flex; }
        .mnav a { font-family:'DM Sans',sans-serif;font-size:14px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#333;text-decoration:none;padding:12px 8px;border-bottom:1px solid rgba(0,0,0,.05); }
        .mnav .eb { margin-top:10px;background:linear-gradient(135deg,#2d8a44,#3da355);color:#fff!important;border-radius:8px;text-align:center;border-bottom:none!important; }

        /* POSTER BANNER — fully visible, no overlay */
        .pbanner { width:100%;position:relative;background:#000;overflow:hidden; }
        .pimg-wrap { width:100%;position:relative;overflow:hidden; }
        .pimg-wrap img { width:100%;height:auto;display:block;object-fit:contain;object-position:top center; }
        /* CTA strip below the image */
        .pbelow { background:#0a1a10;padding:28px 24px; }

        @media (max-width:768px) {
          .hide-m { display:none!important; }
          .hbg    { display:flex!important; }
          .sc     { display:none!important; }
          .strip-r { flex-direction:column!important;gap:10px!important;text-align:center!important; }
          .hero-s  { min-height:auto!important;padding:52px 20px 60px!important; }
          .hero-r  { flex-direction:column!important;gap:24px!important; }
          .about-g { grid-template-columns:1fr!important;gap:32px!important; }
          .about-p { padding:60px 20px!important; }
          .qcard   { padding:28px 18px!important; }
          .qcard blockquote { font-size:17px!important; }
          .pimg-wrap img { width:100%!important; }
          .pbelow-grid { grid-template-columns:1fr 1fr!important; }
          .pctas  { flex-direction:column!important;align-items:stretch!important;width:100%!important; }
          .pctas a { max-width:100%!important;justify-content:center!important; }
          .dstrip-g { grid-template-columns:1fr 1fr!important;gap:12px!important; }
          .reg-r  { flex-direction:column!important; }
          .reg-c  { grid-template-columns:1fr 1fr!important;width:100%!important; }
          .stats-g { grid-template-columns:1fr 1fr!important;gap:16px!important; }
          .c-grid { grid-template-columns:1fr!important; }
          .pg     { grid-template-columns:1fr 1fr!important;gap:12px!important; }
          .sec-p  { padding:60px 20px!important; }
          .tcard  { padding:28px 18px!important; }
          .cta-s  { padding:48px 20px!important; }
          .cta-b  { padding:36px 20px!important;border-radius:14px!important; }
          .ctab   { flex-direction:column!important;align-items:stretch!important; }
          .ctab a { justify-content:center!important; }
          .cong   { grid-template-columns:1fr!important; }
          .fp     { flex-direction:column!important;align-items:center!important;text-align:center!important;padding:28px 20px!important;gap:18px!important; }
          .fl     { justify-content:center!important; }
          .wa     { bottom:16px!important;right:16px!important;width:50px!important;height:50px!important; }
          .wa svg { width:24px!important;height:24px!important; }
          .bgrp   { flex-direction:column!important;align-items:stretch!important;width:100%!important; }
          .bgrp a { justify-content:center!important; }
        }
        @media (max-width:400px) {
          .pg     { grid-template-columns:1fr!important; }
          .dstrip-g { grid-template-columns:1fr!important; }
        }
      `}</style>

      {/* WA FAB */}
      <a href="https://wa.me/918590012229" target="_blank" rel="noopener noreferrer" className="wa">
        <svg viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>

      {/* STRIP */}
      <div style={{ background:'linear-gradient(90deg,#1e5c2d,#2d8a44,#1e5c2d)',backgroundSize:'200% 100%',animation:'gradS 5s ease infinite',padding:'9px 20px' }}>
        <div className="strip-r" style={{ display:'flex',alignItems:'center',justifyContent:'center',gap:16,flexWrap:'wrap' }}>
          <span className="dm" style={{ color:'#fff',fontSize:13,fontWeight:500 }}>
            🌙 <strong style={{ color:'#e9bc2f' }}>Vacation Dini Classes 2026</strong> — April 6 · Ambalathara, Trivandrum
          </span>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSdayn2w_JujPQQoVM6vOwJ2z-wr7Bv24uj7X5TitBzXjtQhug/viewform?usp=publish-editor" className="dm" style={{ background:'#e9bc2f',color:'#1a1a1a',fontWeight:700,fontSize:11,letterSpacing:'.12em',textTransform:'uppercase',textDecoration:'none',padding:'5px 14px',borderRadius:99,whiteSpace:'nowrap' }}>Register Free →</a>
        </div>
      </div>

      {/* NAV */}
      <nav style={{ position:'sticky',top:0,zIndex:100,background:'#fff',borderBottom:'1px solid rgba(45,138,68,.1)',padding:'0 28px',display:'flex',alignItems:'center',justifyContent:'space-between',height:70,boxShadow:scrolled?'0 4px 20px rgba(0,0,0,.07)':'0 1px 6px rgba(0,0,0,.04)',transition:'all .3s' }}>
        <a href="/" style={{ display:'flex',alignItems:'center',textDecoration:'none',flexShrink:0 }}>
          <img src="/logo.png" alt="Ummul Qura" style={{ height:52,width:'auto',display:'block' }} />
        </a>
        <div style={{ display:'flex',alignItems:'center',gap:4 }} className="hide-m">
          {['About','Courses','Testimonials','Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="dm" style={{ fontSize:12,letterSpacing:'.12em',textTransform:'uppercase',fontWeight:600,color:'#555',textDecoration:'none',padding:'8px 14px',borderRadius:6,transition:'all .2s' }}
              onMouseEnter={e => { (e.target as HTMLElement).style.color='#2d8a44';(e.target as HTMLElement).style.background='rgba(45,138,68,.06)'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.color='#555';(e.target as HTMLElement).style.background='transparent'; }}
            >{l}</a>
          ))}
          <div style={{ width:1,height:28,background:'rgba(0,0,0,.1)',margin:'0 10px' }} />
          <a href="tel:+918590012229" className="dm" style={{ background:'linear-gradient(135deg,#2d8a44,#3da355)',color:'#fff',fontWeight:600,fontSize:12,letterSpacing:'.1em',textTransform:'uppercase',textDecoration:'none',padding:'10px 20px',borderRadius:8,boxShadow:'0 4px 14px rgba(45,138,68,.3)',transition:'all .25s',display:'flex',alignItems:'center',gap:6 }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; }}
          >Call Us Now</a>
        </div>
        <button className={`hbg${menuOpen?' open':''}`} onClick={e=>{e.stopPropagation();setMenuOpen(o=>!o);}} aria-label="Menu" style={{ display:'none' }}>
          <span/><span/><span/>
        </button>
        <div className={`mnav${menuOpen?' open':''}`} onClick={e=>e.stopPropagation()}>
          {['About','Courses','Testimonials','Contact'].map(l=>(
            <a key={l} href={`#${l.toLowerCase()}`} onClick={()=>setMenuOpen(false)}>{l}</a>
          ))}
          <a href="tel:+918590012229" className="eb" onClick={()=>setMenuOpen(false)}>Call Us Now</a>
        </div>
      </nav>

      {/* ══ 1. ABOUT / WHO WE ARE — RIGHT BELOW NAVBAR ══ */}
      <section id="about" className="about-p" style={{ padding:'96px 48px',background:'#FDFCF8' }}>
        <div style={{ maxWidth:1100,margin:'0 auto' }}>
          <FadeIn>
            <div style={{ textAlign:'center',marginBottom:60 }}>
              <p className="dm" style={{ fontSize:11,letterSpacing:'.32em',textTransform:'uppercase',color:'#c4a006',fontWeight:600,marginBottom:20 }}>Who We Are</p>
              <h2 className="el" style={{ fontSize:'clamp(40px,8vw,80px)',fontWeight:700,lineHeight:1.0,marginBottom:10,letterSpacing:'-0.01em' }}>
                <span style={{ color:'#2d8a44' }}>Ummul</span>{' '}
                <span style={{ color:'#c4a006' }}>Qura</span>
              </h2>
              <p className="amiri" style={{ fontSize:'clamp(17px,2.5vw,23px)',color:'#555',fontStyle:'italic',marginBottom:20,lineHeight:1.5 }}>
                Institute of Islamic Studies
              </p>
              <div className="divider div-c" style={{ marginBottom:18 }} />
              <p className="dm" style={{ fontSize:13,color:'#aaa',fontWeight:300,letterSpacing:'.1em',margin:'0 auto' }}>
                Ambalathara, Trivandrum · Est. 2026
              </p>
            </div>
          </FadeIn>
          <div className="about-g" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:56,alignItems:'start' }}>
            <FadeIn>
              <div className="qcard" style={{ background:'linear-gradient(145deg,#f0f7f1,#fdfcf8)',borderRadius:16,padding:'40px 32px',border:'1px solid rgba(45,138,68,.15)',position:'relative' }}>
                <div style={{ position:'absolute',top:-2,left:-2,right:-2,bottom:-2,borderRadius:17,border:'2px solid rgba(196,160,6,.2)',pointerEvents:'none' }} />
                <div style={{ fontSize:52,textAlign:'center',marginBottom:18 }}>🕌</div>
                <blockquote className="amiri" style={{ fontSize:'clamp(16px,2.5vw,21px)',fontStyle:'italic',color:'#2d8a44',lineHeight:1.7,textAlign:'center',marginBottom:16 }}>
                  "Seeking knowledge is an obligation upon every Muslim."
                </blockquote>
                <p className="dm" style={{ textAlign:'center',color:'#aaa',fontSize:12,letterSpacing:'.12em' }}>— Prophet Muhammad ﷺ (Ibn Mājah)</p>
                <div style={{ display:'flex',justifyContent:'space-around',marginTop:28,paddingTop:22,borderTop:'1px solid rgba(45,138,68,.1)' }}>
                  {[['🧑‍🏫','Expert Teachers'],['📚','Rich Curriculum'],['🌿','Safe Env.']].map(([ic,lb])=>(
                    <div key={lb as string} className="dm" style={{ fontSize:12,color:'#666',display:'flex',flexDirection:'column',alignItems:'center',gap:5 }}>
                      <span style={{ fontSize:20 }}>{ic}</span>
                      <span style={{ fontWeight:500,textAlign:'center' }}>{lb}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.18}>
              <div>
                <p className="dm" style={{ fontSize:16,color:'#555',lineHeight:2,marginBottom:18,fontWeight:300 }}>
                  <strong style={{ color:'#1a1a1a',fontWeight:600 }}>Ummul Qura Institute of Islamic Studies</strong> is a newly established centre of Islamic learning in Ambalathara, Trivandrum — founded with the vision of making authentic Dini education <em>accessible, structured, and joyful</em> for every child.
                </p>
                <p className="dm" style={{ fontSize:16,color:'#555',lineHeight:2,marginBottom:32,fontWeight:300 }}>
                  With a curriculum rooted in the Quran and Sunnah, we nurture children to become confident, morally grounded, and spiritually connected young Muslims — equipping them not just with knowledge, but with wisdom and love for their Deen.
                </p>
                <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:14 }}>
                  {[
                    { icon:'📖',title:'Authentic Knowledge',desc:'Curriculum rooted in Quran & Sunnah' },
                    { icon:'❤️',title:'Loving Environment',desc:'Nurturing, patient & qualified teachers' },
                    { icon:'🌍',title:'Community Driven',desc:'Serving Ambalathara & beyond' },
                    { icon:'⭐',title:'Holistic Growth',desc:'Knowledge, character & confidence' },
                  ].map(({ icon,title,desc })=>(
                    <div key={title} style={{ background:'#fff',border:'1px solid rgba(45,138,68,.12)',borderRadius:12,padding:'16px 16px',display:'flex',gap:12,alignItems:'flex-start' }}>
                      <span style={{ fontSize:20,flexShrink:0 }}>{icon}</span>
                      <div>
                        <div className="el" style={{ fontSize:14,fontWeight:600,color:'#1a1a1a',marginBottom:3 }}>{title}</div>
                        <div className="dm" style={{ fontSize:12,color:'#999',fontWeight:300,lineHeight:1.5 }}>{desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ 2. HERO ══ */}
      <section className="hero-s" style={{ minHeight:'82vh',display:'flex',alignItems:'center',padding:'72px 48px',background:'#fff',position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',right:-40,top:'50%',transform:'translateY(-50%)',fontSize:320,color:'rgba(45,138,68,.034)',fontFamily:'serif',lineHeight:1,userSelect:'none',pointerEvents:'none' }}>﷽</div>
        <div className="hero-r" style={{ maxWidth:1160,margin:'0 auto',width:'100%',display:'flex',alignItems:'center',gap:72 }}>
          <div style={{ flex:1,minWidth:0 }}>
            <div className="u1" style={{ display:'flex',alignItems:'center',gap:12,marginBottom:22 }}>
              <div className="divider" style={{ width:36,flexShrink:0 }} />
              <span className="dm" style={{ fontSize:11,letterSpacing:'.25em',textTransform:'uppercase',color:'#c4a006',fontWeight:600 }}>Ambalathara · Trivandrum · 2026</span>
            </div>
            <h1 className="el u2" style={{ fontSize:'clamp(34px,6vw,74px)',fontWeight:700,lineHeight:1.08,color:'#1a1a1a',marginBottom:16 }}>
              Where Faith<br/>
              <span style={{ color:'#2d8a44' }}>Meets</span>{' '}
              <span style={{ color:'#c4a006' }}>Learning</span>
            </h1>
            <p className="amiri u2" style={{ fontSize:'clamp(17px,2.5vw,24px)',color:'#666',fontStyle:'italic',marginBottom:20,lineHeight:1.5 }}>
              Ummul Qura Institute of Islamic Studies
            </p>
            <p className="dm u3" style={{ fontSize:15,color:'#777',lineHeight:1.85,marginBottom:36,fontWeight:300,maxWidth:460 }}>
              A new centre of Islamic learning in Ambalathara, Trivandrum — offering structured, joyful, and authentic Dini education for children and youth.
            </p>
            <div className="u4 bgrp" style={{ display:'flex',gap:14,flexWrap:'wrap' }}>
              <a href="#vacation-camp" className="btn-green">View Vacation Camp ↓</a>
              <a href="#courses" className="btn-og">Explore Courses</a>
            </div>
            <div className="dm" style={{ display:'flex',gap:24,marginTop:40,flexWrap:'wrap' }}>
              {[['✓','Certified Instructors'],['✓','Ages 6–18'],['✓','Girls & Boys Batches']].map(([ic,tx])=>(
                <div key={tx as string} style={{ display:'flex',alignItems:'center',gap:6,color:'#666',fontSize:13 }}>
                  <span style={{ color:'#2d8a44',fontWeight:700 }}>{ic}</span> {tx}
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex:'0 0 280px' }} className="hide-m">
            <div style={{ background:'linear-gradient(160deg,#0c1f14,#1a3d24)',borderRadius:20,padding:'36px 28px',boxShadow:'0 32px 72px rgba(0,0,0,.2)' }}>
              <div style={{ marginBottom:24 }}>
                <div style={{ fontSize:36,marginBottom:8 }}>🕌</div>
                <p className="el" style={{ fontSize:20,fontWeight:700,color:'#fff',lineHeight:1.3 }}>Inaugural Batch<br/><span style={{ color:'#e9bc2f' }}>2026</span></p>
              </div>
              <div style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:12 }}>
                {[['6','Core Subjects'],['15+','Instructors'],['Free','Registration'],['6–18','Age Group']].map(([n,l])=>(
                  <div key={l} style={{ background:'rgba(255,255,255,.07)',borderRadius:10,padding:'12px 10px' }}>
                    <div className="el" style={{ fontSize:24,fontWeight:700,color:'#e9bc2f',lineHeight:1 }}>{n}</div>
                    <div className="dm" style={{ fontSize:10,color:'rgba(255,255,255,.5)',letterSpacing:'.1em',textTransform:'uppercase',marginTop:4 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="sc" style={{ position:'absolute',bottom:28,left:'50%',transform:'translateX(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:6 }}>
          <span className="dm" style={{ fontSize:10,letterSpacing:'.22em',textTransform:'uppercase',color:'#bbb' }}>Scroll</span>
          <div style={{ width:1,height:36,background:'linear-gradient(180deg,#2d8a44,transparent)' }} />
        </div>
      </section>

      {/* ══ 3. STATS ══ */}
      <section style={{ background:'#2d8a44',padding:'36px 24px' }}>
        <div className="stats-g" style={{ maxWidth:1000,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:20,textAlign:'center' }}>
          {stats.map(({ num,label },i)=>(
            <FadeIn key={label} delay={i*.1}>
              <div>
                <div className="el" style={{ fontSize:'clamp(28px,5vw,44px)',fontWeight:700,color:'#e9bc2f',lineHeight:1 }}>{num}</div>
                <div className="dm" style={{ fontSize:11,letterSpacing:'.15em',textTransform:'uppercase',color:'rgba(255,255,255,.7)',marginTop:6 }}>{label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ══ 4. POSTER BANNER — FULLY VISIBLE, FULL WIDTH ══ */}
      <section id="vacation-camp" className="pbanner">
        {/* top accent line */}
        <div style={{ position:'absolute',top:0,left:0,right:0,height:4,background:'linear-gradient(90deg,#2d8a44,#c4a006,#2d8a44,#c4a006)',backgroundSize:'300% 100%',animation:'gradS 3s linear infinite',zIndex:3 }} />

        {/* The poster — no crop, no overlay, fully visible edge to edge */}
        <div className="pimg-wrap">
          <img src="/poster.jpeg" alt="Ummul Qura Vacation Dini Camp 2026 — അവധിക്കാല ദീനി പഠന ക്യാമ്പ്" />
        </div>
      </section>

      {/* ══ BELOW POSTER — Premium registration strip ══ */}
      <div style={{ background:'#0a1a0f', borderTop:'1px solid rgba(196,160,6,.25)' }}>

        {/* Thin gold accent line at very top */}
        <div style={{ height:2, background:'linear-gradient(90deg, transparent, #c4a006, #2d8a44, #c4a006, transparent)' }} />

        <div style={{ maxWidth:960, margin:'0 auto', padding:'40px 24px' }}>

          {/* Status pill */}
          <div style={{ display:'flex', justifyContent:'center', marginBottom:28 }}>
            <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(45,138,68,.15)', border:'1px solid rgba(45,138,68,.35)', borderRadius:99, padding:'7px 20px' }}>
              <span style={{ width:7, height:7, borderRadius:'50%', background:'#3da355', display:'inline-block', animation:'pulse 1.8s ease infinite' }} />
              <span className="dm" style={{ fontSize:11, fontWeight:700, letterSpacing:'.22em', textTransform:'uppercase', color:'#5bc47a' }}>Registrations Open · Free Entry</span>
            </div>
          </div>

          {/* 4 detail items in a clean row */}
          <div className="pbelow-grid" style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, marginBottom:32, borderRadius:12, overflow:'hidden', border:'1px solid rgba(255,255,255,.08)' }}>
            {[
              { icon:'🗓️', label:'Dates',    value:'April 6 – May 10' },
              { icon:'⏰',  label:'Time',     value:'9:30 AM – 1:00 PM' },
              { icon:'📍',  label:'Venue',    value:'Ambalathara, TVM' },
              { icon:'👥',  label:'Open For', value:'Ages 6–18, All' },
            ].map(({ icon, label, value }, i) => (
              <div key={label} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,.04)' : 'rgba(255,255,255,.02)', padding:'20px 16px', textAlign:'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,.07)' : 'none' }}>
                <div style={{ fontSize:22, marginBottom:8 }}>{icon}</div>
                <div className="dm" style={{ fontSize:10, letterSpacing:'.18em', textTransform:'uppercase', color:'rgba(255,255,255,.35)', marginBottom:5 }}>{label}</div>
                <div className="el" style={{ fontSize:15, fontWeight:600, color:'#fff', lineHeight:1.3 }}>{value}</div>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="pctas" style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSdayn2w_JujPQQoVM6vOwJ2z-wr7Bv24uj7X5TitBzXjtQhug/viewform?usp=publish-editor" style={{
              display:'inline-flex', alignItems:'center', justifyContent:'center', gap:10,
              background:'linear-gradient(135deg,#c4a006,#e9bc2f)',
              color:'#0a1a0f', fontFamily:"'DM Sans',sans-serif", fontWeight:700,
              fontSize:13, letterSpacing:'.1em', textTransform:'uppercase',
              textDecoration:'none', padding:'16px 36px', borderRadius:8,
              boxShadow:'0 8px 28px rgba(196,160,6,.35)', transition:'all .3s',
              flex:1, maxWidth:340,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 14px 36px rgba(196,160,6,.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 8px 28px rgba(196,160,6,.35)'; }}
            >
              <span>📋</span> Register Now — It's Free
            </a>
            <a href="tel:+918590012229" style={{
              display:'inline-flex', alignItems:'center', justifyContent:'center', gap:10,
              background:'transparent', border:'1.5px solid rgba(255,255,255,.2)',
              color:'rgba(255,255,255,.8)', fontFamily:"'DM Sans',sans-serif", fontWeight:600,
              fontSize:13, letterSpacing:'.1em', textTransform:'uppercase',
              textDecoration:'none', padding:'16px 32px', borderRadius:8,
              transition:'all .3s', flex:1, maxWidth:220,
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(255,255,255,.5)'; e.currentTarget.style.color='#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,.2)'; e.currentTarget.style.color='rgba(255,255,255,.8)'; }}
            >
              <span>📞</span> Call Us
            </a>
          </div>

        </div>

        {/* Bottom gold line */}
        <div style={{ height:2, background:'linear-gradient(90deg, transparent, #2d8a44, #c4a006, #2d8a44, transparent)' }} />
      </div>

      {/* ══ 5. VACATION DETAIL CARDS ══ */}
      <section style={{ background:'#060f08',padding:'48px 24px' }}>
        <div style={{ maxWidth:1000,margin:'0 auto' }}>
          <div className="dstrip-g" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16 }}>
            {[
              { icon:'🗓️',title:'Duration',      detail:'April 6 – May 10',        sub:'Full summer vacation' },
              { icon:'⏰', title:'Timings',       detail:'9:30 AM – 1:00 PM',       sub:'Monday to Saturday' },
              { icon:'📍', title:'Venue',         detail:'Ambalathara, Trivandrum', sub:'Easy access, safe campus' },
              { icon:'👧👦',title:'Who Can Join', detail:'Ages 6 – 18',             sub:'Separate boys & girls batches' },
              { icon:'💰', title:'Fee',           detail:'Free Registration',       sub:'Subsidised monthly fee' },
              { icon:'📜', title:'Certificate',   detail:'Completion Cert.',        sub:'Awarded to all students' },
            ].map(({ icon,title,detail,sub })=>(
              <div key={title} style={{ background:'rgba(255,255,255,.06)',border:'1px solid rgba(255,255,255,.09)',borderRadius:12,padding:'20px 16px',display:'flex',gap:14,alignItems:'flex-start' }}>
                <span style={{ fontSize:24,flexShrink:0,marginTop:2 }}>{icon}</span>
                <div>
                  <div className="dm" style={{ fontSize:10,letterSpacing:'.15em',textTransform:'uppercase',color:'#e9bc2f',marginBottom:5 }}>{title}</div>
                  <div className="el" style={{ fontSize:16,fontWeight:700,color:'#fff',lineHeight:1.3,marginBottom:3 }}>{detail}</div>
                  <div className="dm" style={{ fontSize:12,color:'rgba(255,255,255,.45)' }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. REGULAR CLASSES ══ */}
      <section style={{ background:'linear-gradient(135deg,#fff8e7,#fffdf5,#f0f7f1)',padding:'56px 24px',borderBottom:'1px solid rgba(45,138,68,.15)',position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',right:-30,top:'50%',transform:'translateY(-50%)',fontSize:180,color:'rgba(45,138,68,.05)',lineHeight:1,userSelect:'none',pointerEvents:'none' }}>🕌</div>
        <div style={{ maxWidth:1000,margin:'0 auto' }}>
          <div style={{ marginBottom:24 }}>
            <div className="dm" style={{ background:'linear-gradient(135deg,#2d8a44,#3da355)',color:'#fff',fontSize:11,fontWeight:700,letterSpacing:'.18em',textTransform:'uppercase',padding:'6px 16px',borderRadius:99,display:'inline-flex',alignItems:'center',gap:6 }}>
              <span style={{ animation:'pulse 2s infinite',display:'inline-block',width:6,height:6,borderRadius:'50%',background:'#a8f0bc' }} />
              New — Launching June 2026
            </div>
          </div>
          <div className="reg-r" style={{ display:'flex',alignItems:'flex-start',gap:48,flexWrap:'wrap' }}>
            <div style={{ flex:1,minWidth:0 }}>
              <h2 className="el" style={{ fontSize:'clamp(22px,4vw,44px)',fontWeight:700,color:'#1a1a1a',lineHeight:1.1,marginBottom:14 }}>
                Regular <span style={{ color:'#2d8a44' }}>Dini</span> <span style={{ color:'#c4a006' }}>Classes</span><br/>
                <span style={{ fontSize:'.58em',color:'#777',fontWeight:400,fontFamily:"'Amiri',serif",fontStyle:'italic' }}>Year-Round Islamic Education</span>
              </h2>
              <p className="dm" style={{ fontSize:15,color:'#666',lineHeight:1.85,fontWeight:300,maxWidth:440,marginBottom:22 }}>
                Ummul Qura is launching <strong style={{ color:'#2d8a44',fontWeight:600 }}>regular weekly classes</strong> starting June 2026 — a consistent, structured path for year-round Islamic growth.
              </p>
              <div style={{ display:'flex',gap:8,flexWrap:'wrap',marginBottom:26 }}>
                {['📅 Weekly Sessions','🕌 Weekend Batches','👧👦 All Ages','📖 Full Curriculum','🏅 Certified'].map(t=>(
                  <span key={t} className="dm" style={{ background:'rgba(45,138,68,.08)',border:'1px solid rgba(45,138,68,.2)',color:'#2d8a44',fontWeight:600,fontSize:12,padding:'5px 12px',borderRadius:99 }}>{t}</span>
                ))}
              </div>
              <div className="bgrp" style={{ display:'flex',gap:12,flexWrap:'wrap' }}>
                <a href="https://docs.google.com/forms/d/..." className="btn-green">📋 Pre-Register for June</a>
                <a href="tel:+918590012229" className="btn-og">📞 Call to Know More</a>
              </div>
            </div>
            <div className="reg-c" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,width:256,flexShrink:0 }}>
              {[{ icon:'🗓️',label:'Starts',value:'June 2026'},{ icon:'⏱️',label:'Schedule',value:'Weekends'},{ icon:'👩‍🎓',label:'For',value:'Ages 6–18'},{ icon:'💰',label:'Fee',value:'Subsidised'}].map(({ icon,label,value })=>(
                <div key={label} style={{ background:'#fff',border:'1px solid rgba(45,138,68,.15)',borderRadius:12,padding:'16px 10px',textAlign:'center',boxShadow:'0 4px 14px rgba(0,0,0,.05)' }}>
                  <div style={{ fontSize:22,marginBottom:6 }}>{icon}</div>
                  <div className="dm" style={{ fontSize:9,letterSpacing:'.15em',textTransform:'uppercase',color:'#bbb',marginBottom:3 }}>{label}</div>
                  <div className="el" style={{ fontSize:16,fontWeight:700,color:'#2d8a44' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 7. COURSES ══ */}
      <section id="courses" className="sec-p" style={{ padding:'96px 48px',background:'#fff',borderTop:'1px solid rgba(0,0,0,.05)' }}>
        <div style={{ maxWidth:1100,margin:'0 auto' }}>
          <FadeIn>
            <div style={{ textAlign:'center',marginBottom:52 }}>
              <span className="dm" style={{ fontSize:11,letterSpacing:'.28em',textTransform:'uppercase',color:'#c4a006',fontWeight:600 }}>What We Teach</span>
              <div className="divider div-c" style={{ marginTop:12,marginBottom:18 }} />
              <h2 className="el" style={{ fontSize:'clamp(22px,5vw,42px)',fontWeight:700,color:'#1a1a1a',lineHeight:1.15 }}>
                Our <span style={{ color:'#2d8a44' }}>Core Curriculum</span>
              </h2>
            </div>
          </FadeIn>
          <div className="c-grid" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18 }}>
            {courses.map(({ icon,title,desc },i)=>(
              <FadeIn key={title} delay={i*.07}>
                <div className="card-lift" style={{ background:'#FDFCF8',border:'1px solid rgba(45,138,68,.12)',borderRadius:12,padding:'24px 20px',position:'relative',overflow:'hidden' }}>
                  <div style={{ position:'absolute',top:0,left:0,right:0,height:3,background:'linear-gradient(90deg,#2d8a44,#c4a006)' }} />
                  <div style={{ fontSize:30,marginBottom:12 }}>{icon}</div>
                  <h3 className="el" style={{ fontSize:18,fontWeight:700,color:'#2d8a44',marginBottom:9 }}>{title}</h3>
                  <p className="dm" style={{ fontSize:13,color:'#888',lineHeight:1.7,fontWeight:300 }}>{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 8. PROGRAMME DETAILS ══ */}
      <section className="sec-p" style={{ padding:'80px 48px',background:'linear-gradient(135deg,#1e5c2d,#2d8a44,#1e5c2d)',position:'relative',overflow:'hidden' }}>
        <div style={{ position:'absolute',top:-60,right:-60,width:260,height:260,borderRadius:'50%',background:'rgba(196,160,6,.1)',pointerEvents:'none' }} />
        <div style={{ maxWidth:1000,margin:'0 auto' }}>
          <FadeIn>
            <div style={{ textAlign:'center',marginBottom:44 }}>
              <span className="dm" style={{ fontSize:11,letterSpacing:'.28em',textTransform:'uppercase',color:'#e9bc2f',fontWeight:600 }}>Programme Details</span>
              <div className="divider div-c" style={{ marginTop:12,marginBottom:18 }} />
              <h2 className="el" style={{ fontSize:'clamp(22px,5vw,42px)',fontWeight:700,color:'#fff',lineHeight:1.15 }}>
                What to <span style={{ color:'#e9bc2f' }}>Expect</span>
              </h2>
            </div>
          </FadeIn>
          <div className="pg" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:16 }}>
            {[
              { icon:'🗓️',title:'Duration',      detail:'Full Summer Vacation',    sub:'Structured daily sessions' },
              { icon:'👧👦',title:'Age Group',   detail:'Ages 6 – 18',             sub:'Separate boys & girls batches' },
              { icon:'⏰', title:'Timings',       detail:'9:30 AM – 1:00 PM',       sub:'Mon – Sat' },
              { icon:'📍', title:'Venue',         detail:'Ambalathara, TVM',        sub:'Easy access, safe campus' },
              { icon:'💰', title:'Fee',           detail:'Affordable & Subsidised', sub:'Scholarships available' },
              { icon:'📜', title:'Certification', detail:'Completion Certificate',  sub:'Issued to all students' },
            ].map(({ icon,title,detail,sub })=>(
              <FadeIn key={title}>
                <div style={{ background:'rgba(255,255,255,.08)',borderRadius:12,padding:'18px 16px',border:'1px solid rgba(255,255,255,.13)' }}>
                  <div style={{ fontSize:24,marginBottom:10 }}>{icon}</div>
                  <div className="dm" style={{ fontSize:10,letterSpacing:'.15em',textTransform:'uppercase',color:'#e9bc2f',marginBottom:5 }}>{title}</div>
                  <div className="el" style={{ fontSize:'clamp(14px,2.2vw,18px)',fontWeight:700,color:'#fff',marginBottom:3,lineHeight:1.3 }}>{detail}</div>
                  <div className="dm" style={{ fontSize:11,color:'rgba(255,255,255,.5)' }}>{sub}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 9. TESTIMONIALS ══ */}
      <section id="testimonials" className="sec-p" style={{ padding:'96px 24px',background:'#FDFCF8' }}>
        <div style={{ maxWidth:720,margin:'0 auto',textAlign:'center' }}>
          <FadeIn>
            <span className="dm" style={{ fontSize:11,letterSpacing:'.28em',textTransform:'uppercase',color:'#c4a006',fontWeight:600 }}>Testimonials</span>
            <div className="divider div-c" style={{ marginTop:12,marginBottom:18 }} />
            <h2 className="el" style={{ fontSize:'clamp(20px,5vw,38px)',fontWeight:700,color:'#1a1a1a',marginBottom:44 }}>
              Voices of Our <span style={{ color:'#2d8a44' }}>Community</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ position:'relative',minHeight:280 }}>
              {testimonials.map((t,i)=>(
                <div key={i} className="tcard" style={{ position:i===0?'relative':'absolute',top:0,left:0,right:0,opacity:activeTestimonial===i?1:0,transform:activeTestimonial===i?'translateY(0)':'translateY(14px)',transition:'all .55s ease',pointerEvents:activeTestimonial===i?'auto':'none',background:'#fff',borderRadius:16,padding:'36px 28px',boxShadow:'0 20px 56px rgba(0,0,0,.07)',border:'1px solid rgba(45,138,68,.1)',textAlign:'left' }}>
                  <div style={{ color:'#c4a006',fontSize:28,lineHeight:1,marginBottom:14 }}>"</div>
                  <p className="amiri" style={{ fontSize:'clamp(15px,2.5vw,19px)',fontStyle:'italic',color:'#333',lineHeight:1.75,marginBottom:22 }}>{t.text}</p>
                  <div className="dm" style={{ fontWeight:600,color:'#2d8a44',fontSize:13 }}>{t.name}</div>
                  <div className="dm" style={{ fontSize:11,color:'#aaa',marginTop:3 }}>{t.role}</div>
                </div>
              ))}
            </div>
            <div style={{ display:'flex',justifyContent:'center',gap:10,marginTop:30 }}>
              {testimonials.map((_,i)=>(
                <div key={i} className="pdot" onClick={()=>setActiveTestimonial(i)} style={{ background:activeTestimonial===i?'#2d8a44':'#ddd',transform:activeTestimonial===i?'scale(1.4)':'scale(1)' }} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══ 10. CTA ══ */}
      <section className="cta-s" style={{ padding:'56px 20px',background:'#fff',borderTop:'1px solid rgba(0,0,0,.05)' }}>
        <FadeIn>
          <div className="cta-b" style={{ maxWidth:820,margin:'0 auto',textAlign:'center',background:'linear-gradient(145deg,#f0f7f1,#fffef5)',border:'1px solid rgba(196,160,6,.22)',borderRadius:20,padding:'52px 36px',position:'relative',overflow:'hidden' }}>
            <div style={{ position:'absolute',top:-24,right:-24,fontSize:140,opacity:.04,lineHeight:1 }}>🌙</div>
            <span className="dm" style={{ fontSize:11,letterSpacing:'.28em',textTransform:'uppercase',color:'#c4a006',fontWeight:600 }}>Limited Seats Available</span>
            <h2 className="el" style={{ fontSize:'clamp(20px,4.5vw,38px)',fontWeight:700,color:'#1a1a1a',margin:'14px 0 0',lineHeight:1.2 }}>
              Give Your Child the Gift of <span style={{ color:'#2d8a44' }}>Islamic Knowledge</span>
            </h2>
            <p className="dm" style={{ fontSize:15,color:'#888',fontWeight:300,maxWidth:440,margin:'14px auto 28px' }}>
              Don't let this vacation pass without purpose. Enrol today and invest in their Deen and Dunya.
            </p>
            <div className="ctab" style={{ display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap' }}>
              <a href="https://docs.google.com/forms/d/..." className="btn-gold">Enroll Now — It's Free to Apply</a>
              <a href="tel:+918590012229" className="btn-og">Call to Inquire</a>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ══ 11. CONTACT ══ */}
      <section id="contact" className="sec-p" style={{ padding:'80px 24px',background:'#0f1f14',color:'#fff' }}>
        <div style={{ maxWidth:1100,margin:'0 auto' }}>
          <FadeIn>
            <div style={{ textAlign:'center',marginBottom:48 }}>
              <span className="dm" style={{ fontSize:11,letterSpacing:'.28em',textTransform:'uppercase',color:'#e9bc2f',fontWeight:600 }}>Get In Touch</span>
              <div className="divider div-c" style={{ marginTop:12,marginBottom:18 }} />
              <h2 className="el" style={{ fontSize:'clamp(20px,4.5vw,38px)',fontWeight:700,color:'#fff',lineHeight:1.15 }}>
                We'd Love to <span style={{ color:'#5bc47a' }}>Hear From You</span>
              </h2>
            </div>
          </FadeIn>
          <div className="cong" style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:18 }}>
            {[
              { icon:'📍',title:'Visit Us', lines:['Ambalathara, Trivandrum','Kerala, India'] },
              { icon:'📞',title:'Call Us',  lines:['+91 85900 12229','Mon–Sat, 9am–6pm'] },
              { icon:'📧',title:'Email Us', lines:['ummulquratvm@gmail.com','We reply within 24 hrs'] },
            ].map(({ icon,title,lines },i)=>(
              <FadeIn key={title} delay={i*.1}>
                <div style={{ background:'rgba(255,255,255,.05)',border:'1px solid rgba(255,255,255,.08)',borderRadius:12,padding:'30px 18px',textAlign:'center',transition:'all .3s' }}
                  onMouseEnter={e=>e.currentTarget.style.background='rgba(45,138,68,.18)'}
                  onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,.05)'}
                >
                  <div style={{ width:48,height:48,borderRadius:'50%',background:'rgba(196,160,6,.15)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 14px',fontSize:19 }}>{icon}</div>
                  <h3 className="dm" style={{ fontWeight:600,color:'#e9bc2f',letterSpacing:'.1em',textTransform:'uppercase',fontSize:11,marginBottom:12 }}>{title}</h3>
                  {lines.map((l,j)=>(
                    <p key={j} className="dm" style={{ color:j===0?'rgba(255,255,255,.88)':'rgba(255,255,255,.45)',fontSize:j===0?14:12,marginBottom:3,wordBreak:'break-word' }}>{l}</p>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background:'#060d07' }}>
        <div className="fp" style={{ padding:'22px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',flexWrap:'wrap',gap:14 }}>
          <img src="/logo.png" alt="Ummul Qura" style={{ height:34,opacity:.6,filter:'grayscale(1) brightness(2)' }} />
          <p className="dm" style={{ fontSize:11,color:'rgba(255,255,255,.3)',letterSpacing:'.06em',textAlign:'center' }}>
            © {new Date().getFullYear()} Ummul Qura Institute of Islamic Studies · Ambalathara, Trivandrum
          </p>
          <div className="fl" style={{ display:'flex',gap:18 }}>
            {['About','Course','Contact'].map(l=>(
              <a key={l} href={`#${l.toLowerCase()}`} className="dm" style={{ fontSize:12,color:'rgba(255,255,255,.32)',textDecoration:'none',letterSpacing:'.1em',transition:'color .2s' }}
                onMouseEnter={e=>(e.target as HTMLElement).style.color='#e9bc2f'}
                onMouseLeave={e=>(e.target as HTMLElement).style.color='rgba(255,255,255,.32)'}
              >{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}