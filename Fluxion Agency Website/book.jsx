// Fluxion booking page

const { useState } = React;

const SECTIONS = [
  { n: '01', label: 'Basic Info' },
  { n: '02', label: 'Ads Status' },
  { n: '03', label: 'Business Goals' },
  { n: '04', label: 'Challenges' },
  { n: '05', label: 'Commitment' },
  { n: '06', label: 'Schedule' },
];

function Sidebar({ step }) {
  return (
    <aside className="book-side">
      <a href="index.html" className="book-side-logo">
        <img src="assets/logo-white.png" alt="Fluxion" />
      </a>
      <div>
        <h1>Book a strategy call.</h1>
        <p style={{ marginTop: 16 }}>
          A 30-minute call to look at your numbers and tell you what we'd change. Five quick sections — no pitch deck, no fluff.
        </p>
      </div>
      <div className="book-steps">
        {SECTIONS.map((s, i) => (
          <div key={s.n} className={`book-step ${step === i ? 'active' : ''} ${step > i ? 'done' : ''}`}>
            <span className="book-step-num">{step > i ? '✓' : s.n}</span>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
      <div className="book-side-footer">
        <span>Fluxion · 2026</span>
        <a href="index.html">← Home</a>
      </div>
    </aside>
  );
}

function Progress({ step, total }) {
  return (
    <div className="book-progress">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className={`book-progress-bar ${i < step ? 'done' : i === step ? 'active' : ''}`} />
      ))}
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div>
      <label className="field-label">{label}{required && <span className="req">*</span>}</label>
      {children}
    </div>
  );
}

function Radio({ name, value, checked, onChange, label }) {
  const id = `${name}-${value}`;
  return (
    <div className="field-radio">
      <input type="radio" id={id} name={name} value={value} checked={checked} onChange={() => onChange(value)} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

function App() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: '', business: '', email: '', location: '', instagram: '', whatsapp: '',
    runningAds: '', dailyBudget: '',
    goal: '', desiredResult: '',
    challenges: '',
    commitment: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxfeubm76opbuCosD792-zZEiVlZZ30JNaHa5T_goa3mHOe3Ilr7RwLg_vDE1wBTFSG/exec';

  const submit = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      // Apps Script web apps don't return CORS headers; use no-cors so the request fires
      // and Apps Script still appends the row. We can't read the response in that mode,
      // but the row lands in the sheet reliably.
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(data),
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError('Could not submit. Please try again or email nowfluxion@gmail.com');
    } finally {
      setSubmitting(false);
    }
  };

  const set = (k) => (e) => setData({ ...data, [k]: e.target?.value ?? e });
  const setVal = (k, v) => setData({ ...data, [k]: v });

  const next = () => setStep(s => Math.min(s + 1, SECTIONS.length - 1));
  const back = () => setStep(s => Math.max(s - 1, 0));

  function Section1() {
    return (
      <div className="book-section">
        <Progress step={step} total={SECTIONS.length} />
        <div className="book-eyebrow">SECTION 01 · BASIC INFO</div>
        <h2 className="book-h1">Let's get<br />acquainted.</h2>
        <p className="book-sub">Start by telling us a bit about you and your business.</p>
        <div className="book-fields">
          <div className="field-row">
            <Field label="Full name" required>
              <input className="field-input" placeholder="Your name" value={data.name} onChange={set('name')} />
            </Field>
            <Field label="Business name" required>
              <input className="field-input" placeholder="Your business" value={data.business} onChange={set('business')} />
            </Field>
          </div>
          <Field label="Email address" required>
            <input className="field-input" type="email" placeholder="you@business.com" value={data.email} onChange={set('email')} />
          </Field>
          <Field label="Where is your business located?" required>
            <input className="field-input" placeholder="City, country" value={data.location} onChange={set('location')} />
          </Field>
          <div className="field-row">
            <Field label="Instagram handle">
              <input className="field-input" placeholder="@yourbrand" value={data.instagram} onChange={set('instagram')} />
            </Field>
            <Field label="WhatsApp number" required>
              <input className="field-input" placeholder="+234 ..." value={data.whatsapp} onChange={set('whatsapp')} />
            </Field>
          </div>
        </div>
      </div>
    );
  }

  function Section2() {
    return (
      <div className="book-section">
        <Progress step={step} total={SECTIONS.length} />
        <div className="book-eyebrow">SECTION 02 · ADS STATUS</div>
        <h2 className="book-h1">Where are<br />you now?</h2>
        <p className="book-sub">Let's talk about your current Meta advertising setup.</p>
        <div className="book-fields">
          <Field label="Are you currently running Meta Ads?" required>
            <div className="field-radio-group">
              <Radio name="ads" value="yes" label="Yes — running now" checked={data.runningAds === 'yes'} onChange={(v) => setVal('runningAds', v)} />
              <Radio name="ads" value="no" label="No — not yet" checked={data.runningAds === 'no'} onChange={(v) => setVal('runningAds', v)} />
            </div>
          </Field>
          <Field label="Current ad budget per day (in NGN)">
            <input className="field-input" placeholder="e.g. ₦15,000" value={data.dailyBudget} onChange={set('dailyBudget')} />
          </Field>
        </div>
      </div>
    );
  }

  function Section3() {
    const goals = [
      { v: 'leads', label: 'Leads' },
      { v: 'sales', label: 'Sales' },
      { v: 'growth', label: 'Growth' },
      { v: 'others', label: 'Others' },
    ];
    return (
      <div className="book-section">
        <Progress step={step} total={SECTIONS.length} />
        <div className="book-eyebrow">SECTION 03 · BUSINESS GOALS</div>
        <h2 className="book-h1">What does<br />success look like?</h2>
        <p className="book-sub">Help us understand what you're hoping to achieve with your ads.</p>
        <div className="book-fields">
          <Field label="Main goal with advertising" required>
            <div className="field-options">
              {goals.map(g => (
                <Radio key={g.v} name="goal" value={g.v} label={g.label} checked={data.goal === g.v} onChange={(v) => setVal('goal', v)} />
              ))}
            </div>
          </Field>
          <Field label="What result are you hoping to achieve?" required>
            <textarea className="field-textarea" placeholder="e.g. 20 qualified leads per month, ₦2M monthly revenue..." value={data.desiredResult} onChange={set('desiredResult')} />
          </Field>
        </div>
      </div>
    );
  }

  function Section4() {
    return (
      <div className="book-section">
        <Progress step={step} total={SECTIONS.length} />
        <div className="book-eyebrow">SECTION 04 · CHALLENGES</div>
        <h2 className="book-h1">What's getting<br />in the way?</h2>
        <p className="book-sub">Tell us about any struggles you're facing with ads or marketing right now.</p>
        <div className="book-fields">
          <Field label="Current challenges with ads or marketing" required>
            <textarea className="field-textarea" style={{ minHeight: 180 }} placeholder="e.g. Spending without leads, don't know what's working, leads don't convert..." value={data.challenges} onChange={set('challenges')} />
          </Field>
        </div>
      </div>
    );
  }

  function Section5() {
    return (
      <div className="book-section">
        <Progress step={step} total={SECTIONS.length} />
        <div className="book-eyebrow">SECTION 05 · COMMITMENT</div>
        <h2 className="book-h1">Are you ready<br />to commit?</h2>
        <p className="book-sub">Let's set expectations for success. Honesty here saves both of us time.</p>
        <div className="book-fields">
          <Field label="Willing to implement a structured advertising system if it's proven to work?" required>
            <div className="field-radio-group">
              <Radio name="commit" value="yes" label="Yes — I'm in" checked={data.commitment === 'yes'} onChange={(v) => setVal('commitment', v)} />
              <Radio name="commit" value="no" label="No — not yet" checked={data.commitment === 'no'} onChange={(v) => setVal('commitment', v)} />
            </div>
          </Field>
          <div className="book-note">
            <div className="book-note-icon">!</div>
            <div>
              <h4>Important note about Meta advertising</h4>
              <p>Results may vary depending on your industry, budget, and execution. Success requires ongoing learning, adaptation, and commitment to the process. By working with us, you acknowledge that results are not guaranteed — but you'll gain the tools and guidance to maximize your advertising potential.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function Section6() {
        useEffect(() => {
      const onMessage = (e) => {
        if (e.data && e.data.event === 'calendly.event_scheduled') {
          window.location.href = 'thankyou.html';
        }
      };
      window.addEventListener('message', onMessage);
      return () => window.removeEventListener('message', onMessage);
    }, []);
    return (
      <div className="book-section">
        <Progress step={step} total={SECTIONS.length} />
        <div className="book-eyebrow">SECTION 06 · SCHEDULE</div>
        <h2 className="book-h1">Pick a time<br />that works.</h2>
        <p className="book-sub">Choose a slot below — we'll send a confirmation to <b style={{ color: 'var(--white)' }}>{data.email || 'your email'}</b> with the meeting link.</p>
        <div className="book-schedule" style={{ padding: 0, overflow: 'hidden' }}>
          <iframe
            src="https://calendly.com/nowfluxion/30min?embed_domain=fluxion&embed_type=Inline&hide_gdpr_banner=1&background_color=0a1530&text_color=ffffff&primary_color=ddf90d"
            style={{ width: '100%', height: 720, border: 0, borderRadius: 18, display: 'block' }}
            title="Book a 30-minute call with Fluxion"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="book-shell">
        <Sidebar step={SECTIONS.length} />
        <main className="book-main">
          <div className="book-confirm">
            <div className="book-confirm-mark">✓</div>
            <h1>You're booked.</h1>
            <p>We've received your details, {data.name || 'friend'}. Check your inbox for the meeting confirmation — talk soon.</p>
            <div style={{ marginTop: 40 }}>
              <a href="index.html" className="book-back" style={{ display: 'inline-flex' }}>← Back to home</a>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const sections = [Section1, Section2, Section3, Section4, Section5, Section6];
  const Current = sections[step];
  const isLast = step === SECTIONS.length - 1;

  return (
    <div className="book-shell">
      <Sidebar step={step} />
      <main className="book-main">
        <Current />
        <div className="book-actions">
          {step > 0 ? (
            <button className="book-back" onClick={back}>← Back</button>
          ) : (
            <a href="index.html" className="book-back">← Cancel</a>
          )}
          <button className="book-next" onClick={isLast ? submit : next} disabled={submitting}>
            {submitting ? 'Submitting…' : isLast ? 'Submit & schedule' : 'Continue'}
            <span className="arrow">→</span>
          </button>
        </div>
        {submitError && (
          <div style={{ marginTop: 16, color: '#f7aa0f', fontSize: 14 }}>{submitError}</div>
        )}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
