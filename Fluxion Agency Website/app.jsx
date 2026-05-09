// Fluxion site — React components

const { useState, useEffect, useRef, useMemo } = React;

// ---------- Magnetic button wrapper ----------
function Magnetic({ children, strength = 0.35, disabled = false }) {
  const ref = useRef(null);
  useEffect(() => {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    const onLeave = () => {el.style.transform = '';};
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength, disabled]);
  return <span className="magnetic" ref={ref}>{children}</span>;
}

// ---------- Reveal on scroll ----------
function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add('is-visible'), delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return <Tag ref={ref} className={`reveal ${className}`} {...rest}>{children}</Tag>;
}

// ---------- Nav ----------
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="shell nav-inner">
        <a href="#top" className="nav-logo">
          <img src="assets/logo-white.png" alt="Fluxion" />
        </a>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#work">Work</a>
          <a href="#faq">FAQ</a>
        </div>
        <Magnetic strength={0.2}>
          <a href="book.html" className="nav-cta">
            <span className="dot" />
            Book a call
          </a>
        </Magnetic>
      </div>
    </nav>);

}

// ---------- Hero variants ----------
function HeroBig() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="hero-mark-bg">
        <img src="assets/mark-white.png" alt="" />
      </div>
      <div className="shell hero-headline">
        <div className="hero-meta">
          <span className="dot-live" />
          <span className="mono">Now booking · Q3 2026</span>
        </div>
        <h1 className="h-display">
          Meta ads built<br />
          to make money,<br />
          not <em>impressions.</em>
        </h1>
        <p className="lede" style={{ marginTop: 32, maxWidth: 620 }}>
          Fluxion is a performance studio for founders who already believe in marketing — and want a system that turns ad spend into qualified leads, not just reach.
        </p>
        <div className="hero-cta-row">
          <Magnetic strength={0.25}>
            <a href="book.html" className="btn btn-primary">
              Book a strategy call
              <span className="arrow">→</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.15}>
            <a href="#services" className="btn btn-ghost">
              See services
              <span className="arrow">→</span>
            </a>
          </Magnetic>
        </div>
      </div>
      <div className="shell">
        <div className="hero-bottom">
          <div>
            <div className="hero-stat-num">₦2.4<span className="accent">B+</span></div>
            <div className="hero-stat-lbl">Tracked ad spend under management</div>
          </div>
          <div>
            <div className="hero-stat-num">312<span className="accent">%</span></div>
            <div className="hero-stat-lbl">Avg. lift in qualified leads</div>
          </div>
          <div>
            <div className="hero-stat-num">48<span className="accent">hr</span></div>
            <div className="hero-stat-lbl">From audit to first campaign live</div>
          </div>
          <div>
            <div className="hero-stat-num">94<span className="accent">%</span></div>
            <div className="hero-stat-lbl">Client retention past month three</div>
          </div>
        </div>
      </div>
    </section>);

}

function HeroSplit() {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" />
      <div className="hero-grid" />
      <div className="shell">
        <div className="hero-split">
          <div>
            <div className="hero-meta">
              <span className="dot-live" />
              <span className="mono">Performance studio · Lagos / Remote</span>
            </div>
            <h1 className="h-display" style={{ fontSize: 'clamp(48px,7.5vw,128px)' }}>
              Stop renting<br />
              attention. Start<br />
              owning <em>demand.</em>
            </h1>
            <p className="lede" style={{ marginTop: 32, maxWidth: 520 }}>We build Advertising systems that don't just generate clicks, they generate qualified leads, predictable pipeline, and revenue you can actually scale.

            </p>
            <div className="hero-cta-row">
              <Magnetic strength={0.25}>
                <a href="book.html" className="btn btn-primary">
                  Book a strategy call
                  <span className="arrow">→</span>
                </a>
              </Magnetic>
            </div>
          </div>
          <div className="hero-card-stack">
            <div className="hero-card c1">
              <div className="mono" style={{ opacity: 0.6 }}>CAMPAIGN · LIVE</div>
              <div style={{ fontSize: 36, fontWeight: 700, marginTop: 14, letterSpacing: '-0.025em' }}>₦487,200</div>
              <div style={{ fontSize: 13, opacity: 0.7, marginTop: 6 }}>Revenue, last 7 days</div>
              <div style={{ marginTop: 24, fontSize: 12, fontFamily: 'JetBrains Mono, monospace', opacity: 0.7 }}>+62.4% vs prev. period ▲</div>
            </div>
            <div className="hero-card c2">
              <div className="mono" style={{ color: 'var(--ink-60)' }}>CPL — META</div>
              <div style={{ fontSize: 36, fontWeight: 700, marginTop: 14, letterSpacing: '-0.025em', color: '#000' }}>₦1,840 <span style={{ color: 'var(--accent)', fontSize: 18 }}>↓</span></div>
              <div style={{ fontSize: 13, color: '#000', marginTop: 6 }}>Down from ₦4,920 at audit</div>
              <div style={{ display: 'flex', gap: 4, marginTop: 24, alignItems: 'end', height: 40 }}>
                {[18, 26, 22, 32, 28, 36, 24, 30, 18, 14, 12, 16].map((h, i) =>
                <div key={i} style={{ flex: 1, height: `${h}px`, background: i > 7 ? 'var(--accent)' : 'var(--ink-12)', borderRadius: 2 }} />
                )}
              </div>
            </div>
            <div className="hero-card c3">
              <div className="mono" style={{ color: 'var(--ink-60)' }}>QUALIFIED LEADS</div>
              <div style={{ fontSize: 36, fontWeight: 700, marginTop: 14, letterSpacing: '-0.025em' }}>148 <span style={{ color: 'var(--accent)', fontSize: 18 }}>this week</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

function HeroEditorial() {
  return (
    <section className="hero hero-editorial" id="top">
      <div className="hero-bg" />
      <div className="shell">
        <div className="hero-meta">
          <span className="dot-live" />
          <span className="mono">Index · 01 — Performance · 02 — Strategy · 03 — Scale</span>
        </div>
        <h1 className="h-display">
          More <em>leads.</em><br />
          <span className="hero-editorial-row">
            Less <span className="marker"></span> waste.
          </span>
        </h1>
        <h1 className="h-display" style={{ marginTop: 24 }}>
          Built for <em>founders.</em>
        </h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginTop: 60, gap: 40, flexWrap: 'wrap' }}>
          <p className="lede" style={{ maxWidth: 480 }}>
            A done-with-you Meta advertising studio for business owners who already spend on ads — and are tired of guessing why the numbers don't work.
          </p>
          <Magnetic strength={0.25}>
            <a href="book.html" className="btn btn-primary">
              Book a strategy call
              <span className="arrow">→</span>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>);

}

// ---------- Marquee ----------
function Marquee() {
  const items = [
  'Meta Ads', 'TikTok Ads', 'Google Ads', 'Snapchat Ads',
  'Lead Generation', 'Funnel Strategy', 'Audience Research', 'Conversion Systems'];

  // Duplicate for seamless loop
  const all = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {all.map((it, i) =>
        <div className="marquee-item" key={i}>
            <span className="dot" />
            <span>{it}</span>
          </div>
        )}
      </div>
    </div>);

}

// ---------- Services ----------
// Pricing data
const PLATFORMS = {
  meta: {
    label: 'Meta',
    sub: 'Facebook · Instagram',
    currency: '₦',
    rows: [
    ['₦200k – ₦500k', '₦100,000'],
    ['₦501k – ₦1M', '₦150,000'],
    ['₦1M – ₦5M', '₦200,000'],
    ['Above ₦5M', 'Custom']]

  },
  tiktok: {
    label: 'TikTok',
    sub: 'Short-form video',
    currency: '₦',
    rows: [
    ['₦250k – ₦500k', '₦100,000'],
    ['₦501k – ₦1M', '₦150,000'],
    ['₦1M – ₦5M', '₦200,000'],
    ['Above ₦5M', 'Custom']]

  },
  google: {
    label: 'Google',
    sub: 'Search · Performance Max',
    currency: '$',
    rows: [
    ['$200 – $500', '$100'],
    ['$501 – $1,000', '$200'],
    ['$1,001 – $5,000', '$500'],
    ['Above $5,000', 'Custom']]

  },
  snapchat: {
    label: 'Snapchat',
    sub: 'Discover · Spotlight',
    currency: '$',
    rows: [
    ['$200 – $500', '$100'],
    ['$501 – $1,000', '$200'],
    ['$1,001 – $5,000', '$500'],
    ['Above $5,000', 'Custom']]

  }
};

function PricingTable({ platform }) {
  const p = PLATFORMS[platform];
  return (
    <div className="pricing-table">
      <div className="pricing-row pricing-head">
        <span>Monthly ad budget</span>
        <span>Management fee</span>
      </div>
      {p.rows.map(([budget, fee], i) =>
      <div className="pricing-row" key={i}>
          <span>{budget}</span>
          <span className="pricing-fee">{fee}</span>
        </div>
      )}
    </div>);

}

function Services() {
  const [platform, setPlatform] = useState('meta');
  return (
    <section className="section" id="services">
      <div className="shell">
        <Reveal className="sec-head">
          <div className="sec-head-left">
            <div className="sec-num">
              <span>01 / 04</span>
              <span>Services</span>
            </div>
            <h2 className="h-section">
              Three tiers.<br />
              Four platforms.
            </h2>
          </div>
          <div className="sec-head-right">
            <p className="lede">Whether you want to learn the system, have us run it, or just need the right tools wired up properly, there's an entry point sized to your stage.

            </p>
          </div>
        </Reveal>

        {/* Tier 1 — Programs */}
        <div className="tier-label">
          <span className="mono accent">/ TIER 01</span>
          <span>Programs · Done-with-you</span>
        </div>
        <div className="svc-grid" style={{ gridTemplateColumns: '1fr', marginBottom: 80 }}>
          <Reveal>
            <article className="svc-card svc-card-wide">
              <div className="svc-head">
                <div>
                  <span className="svc-tag">Done-with-you</span>
                </div>
                <span className="svc-num">/ 01</span>
              </div>
              <div className="svc-wide-grid">
                <div>
                  <h3 className="svc-title">Meta Ads<br />Accelerator</h3>
                  <p className="svc-desc" style={{ marginTop: 16 }}>A guided program for founders who want to actually understand and run their own ads, instead of being held hostage by an agency or freelancer.

                  </p>
                </div>
                <ul className="svc-list">
                  <li><span>Account &amp; offer audit</span></li>
                  <li><span>Business Manager setup</span></li>
                  <li><span>Campaign architecture</span></li>
                  <li><span>Audience targeting strategy</span></li>
                  <li><span>Pixel &amp; tracking install</span></li>
                  <li><span>Done-with-you launch</span></li>
                  <li><span>Two optimization sessions</span></li>
                  <li><span>Conversion process review</span></li>
                </ul>
              </div>
              <div className="svc-foot">
                <div className="svc-price">
                  <div className="svc-price-amt">₦150,000</div>
                  <div className="svc-price-lbl">One-time · Includes 2 review sessions</div>
                </div>
                <a href="book.html" className="svc-cta">Apply <span>→</span></a>
              </div>
            </article>
          </Reveal>
        </div>

        {/* Tier 2 — Management with platform tabs */}
        <div className="tier-label">
          <span className="mono accent">/ TIER 02</span>
          <span>Management · Done-for-you · Most popular</span>
        </div>
        <Reveal>
          <article className="svc-card featured svc-card-wide">
            <div className="svc-head">
              <div>
                <span className="svc-tag live">Most popular</span>
              </div>
              <span className="svc-num">/ 02</span>
            </div>
            <div className="svc-wide-grid">
              <div>
                <h3 className="svc-title">Ads<br />Management</h3>
                <p className="svc-desc" style={{ marginTop: 16 }}>
                  Done-for-you advertising on the platform that fits your audience. We own strategy, setup, testing, and optimization. You own the leads and the calendar that fills up.
                </p>
                <ul className="svc-list" style={{ marginTop: 24 }}>
                  <li><span>Full account audit &amp; strategy</span></li>
                  <li><span>Audience research &amp; testing</span></li>
                  <li><span>Campaign setup &amp; launch</span></li>
                  <li><span>Daily monitoring &amp; optimization</span></li>
                  <li><span>Scaling framework</span></li>
                  <li><span>Weekly performance reports</span></li>
                </ul>
              </div>

              <div>
                <div className="platform-tabs" role="tablist">
                  {Object.entries(PLATFORMS).map(([key, p]) =>
                  <button
                    key={key}
                    role="tab"
                    aria-selected={platform === key}
                    className={`platform-tab ${platform === key ? 'is-active' : ''}`}
                    onClick={() => setPlatform(key)}>
                    
                      <span className="platform-tab-label">{p.label}</span>
                      <span className="platform-tab-sub">{p.sub}</span>
                    </button>
                  )}
                </div>
                <PricingTable platform={platform} />
                <div className="pricing-note">
                  <span className="mono accent">·</span>
                  Management fee is separate from ad spend. Spend goes directly to {PLATFORMS[platform].label}.
                </div>
              </div>
            </div>
            <div className="svc-foot">
              <div className="svc-price">
                <div className="svc-price-amt">
                  From {PLATFORMS[platform].currency}{PLATFORMS[platform].currency === '₦' ? '100k' : '100'}
                  <span style={{ fontSize: 14, color: 'var(--ink-60)', fontWeight: 500 }}>/mo</span>
                </div>
                <div className="svc-price-lbl">Tiered to your monthly ad spend</div>
              </div>
              <a href="book.html" className="svc-cta">Get a quote <span>→</span></a>
            </div>
          </article>
        </Reveal>

        {/* Tier 3 — Growth Foundations */}
        <div className="tier-label" style={{ marginTop: 80 }}>
          <span className="mono accent">/ TIER 03</span>
          <span>Growth Foundations · One-time setups</span>
        </div>
        <Reveal>
          <p className="lede" style={{ marginBottom: 32, maxWidth: 640 }}>
            Just need the tooling wired up properly so your future ads (or your future agency) actually work? Pick a foundation and we'll set it up clean.
          </p>
        </Reveal>
        <div className="foundations-grid">
          {[
          { tag: 'GOOGLE STACK', title: 'Google Analytics, Search Console, Merchant Center & GMB', price: '₦150,000' },
          { tag: 'META STACK', title: 'Business Portfolio, Ads Account & Pixel install', price: '₦150,000' },
          { tag: 'TIKTOK', title: 'TikTok Ads Manager setup & verification', price: '₦100,000' },
          { tag: 'SNAPCHAT', title: 'Snapchat Ads Manager setup & verification', price: '₦100,000' }].
          map((f, i) =>
          <Reveal key={i} delay={i * 60}>
              <article className="foundation-card">
                <span className="foundation-tag">{f.tag}</span>
                <h4 className="foundation-title">{f.title}</h4>
                <div className="foundation-foot">
                  <div className="foundation-price">{f.price}</div>
                  <a href="book.html" className="foundation-link">Add →</a>
                </div>
              </article>
            </Reveal>
          )}
        </div>

        <Reveal delay={200}>
          <div style={{ marginTop: 48, padding: '24px 28px', borderRadius: 18, border: '1px dashed var(--ink-12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span className="mono" style={{ color: 'var(--accent)' }}>+ ADD-ONS</span>
              <span style={{ fontSize: 15, color: 'var(--ink-60)' }}>Landing pages, content production, and funnel build-outs available on request.</span>
            </div>
            <a href="#contact" style={{ fontSize: 14, fontWeight: 600, color: 'var(--accent)' }}>Ask about add-ons →</a>
          </div>
        </Reveal>
      </div>
    </section>);

}

// ---------- Process ----------
function Process() {
  const steps = [
  { n: '01', title: 'Audit', desc: 'We pull apart your account, offer, and current funnel, no fluff. You get a written diagnosis with the actual leaks.' },
  { n: '02', title: 'Strategy', desc: 'We define the ICP, build the audience map, and architect a campaign structure designed for your specific economics.' },
  { n: '03', title: 'Launch', desc: 'Setup is methodical, not improvised. Pixel, naming, structure, creative, all pre-flight checked before spend goes live.' },
  { n: '04', title: 'Scale', desc: 'Weekly optimization. Kill the losers fast, double down on the winners, and protect the campaigns that earn their keep.' }];

  return (
    <section className="section process" id="process">
      <div className="shell">
        <Reveal className="sec-head">
          <div className="sec-head-left">
            <div className="sec-num">
              <span>02 / 04</span>
              <span>Process</span>
            </div>
            <h2 className="h-section">
              A system,<br />
              not a sprint.
            </h2>
          </div>
          <div className="sec-head-right">
            <p className="lede">We don't "boost posts" and we don't gamble. Every campaign we run follows the same disciplined sequence, because that's what makes results repeatable.

            </p>
          </div>
        </Reveal>

        <div className="process-grid">
          {steps.map((s, i) =>
          <Reveal key={s.n} delay={i * 80} className="process-step">
              <div className="process-step-num">/ {s.n}</div>
              <div className="process-step-desc">{s.desc}</div>
              <div className="process-step-title">{s.title}</div>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}

// ---------- Metrics ----------
function Metrics() {
  return (
    <section className="metrics section" style={{ padding: 'clamp(80px, 10vw, 140px) 0' }}>
      <div className="shell">
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 80, flexWrap: 'wrap', gap: 24 }}>
            <h2 className="h-section" style={{ maxWidth: 700 }}>
              Numbers we<br />actually report on.
            </h2>
            <span className="mono" style={{ color: 'var(--accent-ink)', opacity: 0.6 }}>FY 2024–2026 · ROLLING</span>
          </div>
        </Reveal>
        <div className="metrics-grid">
          {[
          { num: '312%', lbl: 'Avg. lift in qualified leads after 90 days' },
          { num: '2.6×', lbl: 'Median return on ad spend across active accounts' },
          { num: '₦1,840', lbl: 'Avg. cost per lead, down from ₦4,920 at audit' },
          { num: '94%', lbl: 'Of clients renew past their third month' }].
          map((m, i) =>
          <Reveal key={i} delay={i * 80} className="metric">
              <div className="metric-num">{m.num}</div>
              <div className="metric-lbl">{m.lbl}</div>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}

// ---------- Quote ----------
function Quote() {
  return (
    <section className="quote-section">
      <div className="shell">
        <Reveal>
          <p className="quote">
            "We were burning through ad spend with nothing to show for it. Three weeks after Fluxion took over, our cost per lead was <em>cut by 64%</em>, and the leads were actually closing."
          </p>
          <div className="quote-author">
            <image-slot
              id="testimonial-avatar"
              shape="circle"
              placeholder="Drop client photo"
              style={{ width: 56, height: 56, flexShrink: 0 }}>
            </image-slot>
            <div>
              <div className="quote-author-name">[Client name placeholder]</div>
              <div className="quote-author-role">Founder, [Brand placeholder] · Lagos</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>);

}

// ---------- Cases ----------
function Cases() {
  const cases = [
  { tag: 'E-commerce · Apparel', title: 'From scaling-blind to ₦4.2M months on Meta', metrics: [['5x', 'ROAS'], ['-30%', 'CPL'], ['₦4.2M', 'Mo. revenue']] },
  { tag: 'Coaching · High-ticket', title: 'Filled a 12-week cohort with 30 qualified students', metrics: [['30', 'Apps'], ['₦2500k', 'CPA'], ['6.4×', 'ROAS']] },
  { tag: 'Community Building · Lagos', title: 'Built a lead system that brings in 60+ leads a month', metrics: [['60+', 'Leads/mo'], ['₦1.3k', 'CPL'], ['50%', 'Show rate']] },
  { tag: 'D2C · Beauty', title: 'Cut wasted spend in half while doubling weekly orders', metrics: [['-49%', 'Wasted spend'], ['2.1×', 'Orders/wk'], ['3.4×', 'ROAS']] }];

  return (
    <section className="section" id="work">
      <div className="shell">
        <Reveal className="sec-head">
          <div className="sec-head-left">
            <div className="sec-num">
              <span>03 / 04</span>
              <span>Selected work</span>
            </div>
            <h2 className="h-section">
              Receipts.<br />
              Not promises.
            </h2>
          </div>
          <div className="sec-head-right">
            <p className="lede">A handful of recent engagements. Names redacted while client agreements are finalized, full case studies arrive with the next site update.

            </p>
          </div>
        </Reveal>

        <div className="cases">
          {cases.map((c, i) =>
          <Reveal key={i} delay={i * 80}>
              <article className="case" style={{ height: "230.594px", width: "976px" }}>
                <image-slot
                id={`case-img-${i}`}
                shape="rect"
                fit="cover"
                placeholder={`Drop ${c.tag.toLowerCase()} image`}
                className="case-img-slot">
              </image-slot>
                <div className="case-body">
                  <div className="case-meta">
                    <span>{c.tag}</span>
                    <span className="sep">/</span>
                    <span>2025</span>
                  </div>
                  <h3 className="case-title">{c.title}</h3>
                  <div className="case-results">
                    {c.metrics.map(([num, lbl], j) =>
                  <div key={j}>
                        <div className="case-result-num">{num}</div>
                        <div className="case-result-lbl">{lbl}</div>
                      </div>
                  )}
                  </div>
                </div>
              </article>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}

// ---------- CTA banner ----------
function CTABanner() {
  return (
    <section className="cta-banner" id="contact">
      <div className="cta-banner-mark">
        <img src="assets/mark-black.png" alt="" />
      </div>
      <div className="shell">
        <Reveal>
          <div className="mono" style={{ marginBottom: 32, opacity: 0.6 }}>04 / 04 · LET'S TALK</div>
          <h2>
            Ready to make your<br />
            ad spend <em style={{ fontStyle: 'normal', textDecoration: 'underline', textDecorationThickness: 6, textUnderlineOffset: 12 }}>actually</em> work?
          </h2>
          <p className="cta-banner-sub">
            30-minute strategy call. No pitch deck. We'll look at your numbers and tell you what we'd change.
          </p>
          <Magnetic strength={0.25}>
            <a href="book.html" className="cta-banner-btn">
              Book a strategy call
              <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'var(--accent)', color: 'var(--accent-ink)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>→</span>
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>);

}

// ---------- Footer ----------
function Footer() {
  return (
    <footer className="footer" id="about">
      <div className="shell">
        <div className="footer-top">
          <div className="footer-brand">
            <img src="assets/logo-white.png" alt="Fluxion" />
            <p>A performance studio for founders who already believe in marketing, and want a system that turns ad spend into revenue.</p>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <a href="#services">Meta Ads Accelerator</a>
            <a href="#services">Meta Ads Management</a>
            <a href="#services">Add-ons</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#about">About</a>
            <a href="#work">Work</a>
            <a href="#process">Process</a>
            <a href="#faq">FAQ</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <a href="mailto:nowfluxion@gmail.com">nowfluxion@gmail.com</a>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">X / Twitter</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 Fluxion Agency. All rights reserved.</div>
          <div>Lagos · Remote worldwide</div>
        </div>
        <div className="footer-bigword">Fluxion.</div>
      </div>
    </footer>);

}

// ---------- FAQ ----------
function FAQ() {
  const [open, setOpen] = useState(0);
  const items = [
    { q: 'How fast can we get campaigns live?', a: "After your strategy call and onboarding, most accounts go live within 7–10 days. Audit, setup, and creative review all happen in that window, we don't believe in rushed launches." },
    { q: "What's the minimum ad budget I need?", a: 'For Meta and TikTok, we recommend starting at ₦200,000/month in ad spend. For Google and Snapchat, $200/month. Below that, the data is too thin to make confident decisions.' },
    { q: 'Is the management fee separate from ad spend?', a: 'Yes. The management fee covers our work, strategy, setup, optimization, reporting. Ad spend goes directly to the platform (Meta, TikTok, etc.) on your card. We never take a markup on media.' },
    { q: 'Do you guarantee results?', a: "No, and you should be skeptical of anyone who does. Meta and ad platforms are dynamic, and results depend on your offer, creative, audience, and follow-up. What we guarantee is a disciplined system, transparent reporting, and our undivided attention to making the numbers work." },
    { q: 'Can I keep my agency / VA and just hire you for one piece?', a: "Sometimes. If you have someone running ads and just want an audit or strategy, the Accelerator is your fit. If we're managing campaigns, we need full control of the ad account to be accountable for results." },
    { q: 'What if I want to cancel?', a: 'Management is month-to-month. Give us 14 days notice and we hand the account back clean, naming conventions intact, documentation included. No drama, no held-hostage hand-overs.' },
    { q: 'Do you handle creative production?', a: "Creative direction yes, hooks, messaging, content angles, review and refinement. Full production (filming, editing, design) is an add-on. Most clients provide raw assets and we shape them into ads that perform." },
    { q: 'Why only paid ads, no SEO, email, social management?', a: "Focus. We're better at one thing than most agencies are at five. When you need email or organic, we'll point you to specialists we trust, but we're not going to dilute what we do best." },
  ];
  return (
    <section className="section" id="faq">
      <div className="shell">
        <Reveal className="sec-head">
          <div className="sec-head-left">
            <div className="sec-num">
              <span>05 / 05</span>
              <span>FAQ</span>
            </div>
            <h2 className="h-section">
              Common<br />
              questions.
            </h2>
          </div>
          <div className="sec-head-right">
            <p className="lede">
              Still on the fence? Most of what people ask before booking a call is below. Anything else, drop us a line on WhatsApp.
            </p>
          </div>
        </Reveal>
        <div className="faq-list">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 40}>
              <div className={`faq-item ${open === i ? 'is-open' : ''}`}>
                <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                  <span className="faq-q-num">/ {String(i + 1).padStart(2, '0')}</span>
                  <span className="faq-q-text">{it.q}</span>
                  <span className="faq-q-toggle" aria-hidden>{open === i ? '–' : '+'}</span>
                </button>
                <div className="faq-a-wrap">
                  <p className="faq-a">{it.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- WhatsApp floating button ----------
function WhatsAppFAB() {
  const [hovered, setHovered] = useState(false);
  const msg = encodeURIComponent("Hi Fluxion — I'd like to chat about your Meta Ads services.");
  const href = `https://wa.me/2349014193481?text=${msg}`;
  return (
    <a
      className="wa-fab"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Chat on WhatsApp"
    >
      <span className={`wa-fab-label ${hovered ? 'is-visible' : ''}`}>Chat on WhatsApp</span>
      <span className="wa-fab-icon">
        <svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor" aria-hidden>
          <path d="M16.001 3C9.373 3 4 8.373 4 15.001c0 2.385.694 4.605 1.886 6.473L4 29l7.74-1.83a11.94 11.94 0 0 0 4.26.77h.001C22.628 27.94 28 22.567 28 15.94 28 8.373 22.628 3 16.001 3Zm0 22.06h-.001a9.05 9.05 0 0 1-4.62-1.265l-.331-.197-4.59 1.085 1.106-4.474-.215-.345A8.99 8.99 0 0 1 7 15.001c0-4.97 4.04-9.001 9-9.001 2.4 0 4.66.937 6.36 2.637 1.7 1.7 2.64 3.96 2.638 6.36 0 4.97-4.04 9.063-8.997 9.063Zm5.18-6.82c-.283-.142-1.676-.825-1.937-.918-.26-.094-.45-.142-.64.142-.188.283-.737.918-.903 1.108-.166.188-.331.213-.614.07-.283-.142-1.196-.44-2.278-1.404-.842-.751-1.41-1.679-1.575-1.962-.165-.283-.018-.436.124-.578.127-.126.283-.331.425-.497.142-.165.188-.283.283-.473.094-.188.047-.354-.024-.497-.07-.142-.64-1.54-.876-2.11-.231-.553-.466-.479-.64-.488-.166-.008-.355-.01-.544-.01-.189 0-.497.07-.757.354-.26.283-.99.967-.99 2.357 0 1.39 1.014 2.733 1.156 2.92.142.188 1.995 3.045 4.832 4.272.676.292 1.203.466 1.614.597.678.215 1.295.184 1.784.112.544-.082 1.676-.685 1.913-1.347.236-.66.236-1.226.166-1.347-.07-.118-.26-.188-.544-.331Z"/>
        </svg>
      </span>
    </a>
  );
}

// ---------- Root App ----------
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply accent to CSS vars
  useEffect(() => {
    const root = document.documentElement;
    const accents = {
      lime: { color: '#ddf90d', ink: '#050e21' },
      blue: { color: '#0055ff', ink: '#ffffff' },
      violet: { color: '#7f6bfc', ink: '#ffffff' },
      amber: { color: '#f7aa0f', ink: '#050e21' }
    };
    const a = accents[t.accent] || accents.lime;
    root.style.setProperty('--accent', a.color);
    root.style.setProperty('--accent-ink', a.ink);
  }, [t.accent]);

  // Motion class
  useEffect(() => {
    document.body.classList.toggle('no-motion', !t.motion);
  }, [t.motion]);

  const Hero = t.hero === 'split' ? HeroSplit :
  t.hero === 'editorial' ? HeroEditorial :
  HeroBig;

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Process />
        <Metrics />
        <Quote />
        <Cases />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
      <WhatsAppFAB />

      <TweaksPanel>
        <TweakSection label="Hero" />
        <TweakRadio
          label="Variant"
          value={t.hero}
          options={['big', 'split', 'editorial']}
          onChange={(v) => setTweak('hero', v)} />
        
        <TweakSection label="Theme" />
        <TweakColor
          label="Accent"
          value={{ lime: '#ddf90d', blue: '#0055ff', violet: '#7f6bfc', amber: '#f7aa0f' }[t.accent]}
          options={['#ddf90d', '#0055ff', '#7f6bfc', '#f7aa0f']}
          onChange={(hex) => {
            const map = { '#ddf90d': 'lime', '#0055ff': 'blue', '#7f6bfc': 'violet', '#f7aa0f': 'amber' };
            setTweak('accent', map[hex] || 'lime');
          }} />
        
        <TweakSection label="Motion" />
        <TweakToggle
          label="Animations on"
          value={t.motion}
          onChange={(v) => setTweak('motion', v)} />
        
      </TweaksPanel>
    </>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);