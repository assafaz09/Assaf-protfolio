import { useState } from 'react';

type ContactState = 'idle' | 'submitting' | 'success' | 'error';

type CursorGlow = {
  x: number;
  y: number;
};

export function App() {
  const [contactState, setContactState] = useState<ContactState>('idle');
  const [contactError, setContactError] = useState<string | null>(null);
  const [cursorGlow, setCursorGlow] = useState<CursorGlow | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setContactState('submitting');
    setContactError(null);

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get('name')?.toString().trim(),
      email: formData.get('email')?.toString().trim(),
      message: formData.get('message')?.toString().trim()
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Something went wrong.');
      }

      setContactState('success');
      event.currentTarget.reset();
    } catch (err: any) {
      setContactState('error');
      setContactError(err.message || 'Failed to send message.');
    }
  }

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      onMouseMove={(event) => {
        const rect = (event.currentTarget as HTMLDivElement).getBoundingClientRect();
        setCursorGlow({
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        });
      }}
    >
      {cursorGlow && (
        <div
          className="pointer-events-none absolute h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/18 blur-3xl transition-all duration-300"
          style={{ left: cursorGlow.x, top: cursorGlow.y }}
        />
      )}
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="animate-float-soft absolute -left-10 top-24 h-20 w-20 rounded-3xl border border-sky-400/40 bg-sky-500/10 shadow-[0_0_30px_rgba(56,189,248,0.6)] backdrop-blur-md">
          <div className="flex h-full w-full items-center justify-center">
            <img
              src="https://img.icons8.com/?id=42769&format=png&size=64"
              alt="JavaScript logo from Icons8"
              className="h-10 w-10"
            />
          </div>
        </div>
        <div className="animate-float-soft absolute right-24 top-40 h-16 w-16 rounded-2xl border border-emerald-400/40 bg-emerald-500/10 shadow-[0_0_26px_rgba(16,185,129,0.6)] backdrop-blur-md">
          <div className="flex h-full w-full items-center justify-center">
            <img
              src="https://img.icons8.com/?id=54087&format=png&size=64"
              alt="Node.js logo from Icons8"
              className="h-8 w-8"
            />
          </div>
        </div>
        <div className="animate-float-soft absolute left-24 bottom-40 h-16 w-16 rounded-2xl border border-indigo-400/40 bg-indigo-500/10 shadow-[0_0_26px_rgba(79,70,229,0.7)] backdrop-blur-md">
          <div className="flex h-full w-full items-center justify-center">
            <img
              src="https://img.icons8.com/?id=vMqgHSToxrJR&format=png&size=64"
              alt="TypeScript logo from Icons8"
              className="h-8 w-8"
            />
          </div>
        </div>
        <div className="animate-float-soft absolute right-8 bottom-24 h-16 w-16 rounded-2xl border border-sky-400/40 bg-sky-500/10 shadow-[0_0_26px_rgba(56,189,248,0.7)] backdrop-blur-md">
          <div className="flex h-full w-full items-center justify-center">
            <img
              src="https://img.icons8.com/?id=bosfpvRzNOG8&format=png&size=64"
              alt="MongoDB logo from Icons8"
              className="h-8 w-8"
            />
          </div>
        </div>
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-12 pt-5 text-slate-50">
        <header className="sticky top-3 z-20 mb-12">
          <nav className="glass-panel flex items-center justify-between rounded-full px-4 py-3 backdrop-saturate-150">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-slate-50">Assaf Azran</p>
            </div>
            <div className="hidden items-center gap-8 text-xs font-medium text-slate-200 md:flex">
              <a href="#hero" className="hover:text-sky-300">
                Home
              </a>
              <a href="#about" className="hover:text-sky-300">
                About
              </a>
              <a href="#experience" className="hover:text-sky-300">
                Experience
              </a>
              <a href="#education" className="hover:text-sky-300">
                Education
              </a>
              <a href="#skills" className="hover:text-sky-300">
                Skills
              </a>
              <a href="#contact" className="hover:text-sky-300">
                Contact
              </a>
            </div>
            <div className="flex items-center gap-2 text-[0.7rem]">
              <a
                href="#"
                className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[0.7rem] font-semibold text-slate-950 shadow-md shadow-slate-950/60 hover:translate-y-0.5 hover:shadow-lg hover:shadow-slate-950/80"
              >
                Download CV
              </a>
            </div>
          </nav>
        </header>

        <main className="flex flex-1 flex-col gap-16 md:gap-20">
          <section
            id="hero"
            className="scroll-m-24 flex min-h-[70vh] flex-col items-center pt-6 animate-fade-up"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-300 shadow-lg shadow-slate-950/60">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.9)]" />
              open for work
            </div>
            <div className="relative mb-6 h-44 w-44 overflow-hidden rounded-full border-4 border-slate-200/90 bg-slate-900/60 shadow-[0_0_40px_rgba(15,23,42,0.9)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.75),transparent_55%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.9),transparent_55%)] opacity-90" />
              <div className="relative flex h-full w-full items-center justify-center">
                <img src="/pics/main.png" alt="man" className="h-full w-full object-cover" />
              </div>
            </div>
            <h1 className="text-center text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl md:text-[2.6rem]">
              Assaf Azran
            </h1>
            <p className="mt-1 text-center text-lg font-semibold text-slate-100">
              Full Stack Developer
            </p>
            <p className="mt-3 max-w-2xl text-center text-sm leading-relaxed text-slate-200 sm:text-[0.95rem]">
              Passionate developer specialising in modern web technologies, creating seamless user
              experiences and robust backend solutions.
            </p>
            <div className="mt-10 flex flex-col items-center gap-1 text-[0.8rem] uppercase tracking-[0.26em] text-slate-400">
              <span>Scroll to explore</span>
              <span className="mt-1 h-6 w-px animate-bounce bg-slate-500/80" />
            </div>
          </section>

          <section id="about" className="scroll-m-24 animate-fade-up">
            <div className="glass-panel rounded-3xl px-5 py-5 sm:px-6 sm:py-6">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                About
              </p>
              <h2 className="text-sm font-semibold text-slate-100 sm:text-base">
                A builder across the stack.
              </h2>
              <div className="mt-3 space-y-2 text-[0.86rem] leading-relaxed text-slate-300">
                <p>
                  I&apos;m a fullstack developer who enjoys taking ideas from a rough sketch to a
                  production-ready product. I work comfortably across Python backends, modern
                  TypeScript frontends, and AI tooling like LangGraph to ship features that actually
                  solve problems.
                </p>
                <p>
                  I care about readable code, predictable deployments, and tight feedback loops.
                  Whether it&apos;s wiring an LLM-powered workflow, designing a UI from a Figma
                  file, or debugging a production issue, I like getting into the details while
                  keeping the bigger picture in mind.
                </p>
              </div>
            </div>
          </section>

          <section id="experience" className="scroll-m-24 animate-fade-up">
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Experience
                </p>
                <h2 className="text-sm font-semibold text-slate-100 sm:text-base">
                  Recent roles & responsibilities.
                </h2>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <article className="glass-panel group relative overflow-hidden rounded-2xl px-4 py-4 transition hover:border-indigo-400/70 hover:shadow-indigo-900/70">
                <div className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-indigo-400 via-sky-400 to-emerald-400 opacity-80" />
                <header className="mb-2 pl-3">
                  <h3 className="text-sm font-semibold text-slate-50">
                    FullStack Developer <span className="text-slate-500">|</span> Zynch.ai
                  </h3>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                    25&apos; – 26&apos;
                  </p>
                </header>
                <ul className="space-y-1.5 pl-3 text-[0.82rem] leading-relaxed text-slate-300">
                  <li>Developed end-to-end system features using Python, Next.js, and LangGraph.</li>
                  <li>
                    Built and integrated AI driven workflows using LangGraph and backend Python
                    services.
                  </li>
                  <li>
                    Improved system performance and reduced load issues by refactoring and optimizing
                    backend services.
                  </li>
                  <li>
                    Identified and resolved critical production bugs using structured debugging and
                    monitoring tools.
                  </li>
                  <li>Containerized and deployed services using Docker and Nginx.</li>
                  <li>Managed version control and collaboration workflows using Git and GitHub.</li>
                  <li>
                    Maintained clean, scalable, and production-ready code following best practices.
                  </li>
                </ul>
              </article>

              <article className="glass-panel group relative overflow-hidden rounded-2xl px-4 py-4 transition hover:border-indigo-400/70 hover:shadow-indigo-900/70">
                <div className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-sky-400 via-indigo-400 to-emerald-400 opacity-80" />
                <header className="mb-2 pl-3">
                  <h3 className="text-sm font-semibold text-slate-50">
                    Full-Stack Dev Intern <span className="text-slate-500">|</span> MindSway
                  </h3>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                    25&apos; – 25&apos;
                  </p>
                </header>
                <ul className="space-y-1.5 pl-3 text-[0.82rem] leading-relaxed text-slate-300">
                  <li>
                    Developed and maintained a responsive web application using React, MUI Components
                    &amp; TypeScript.
                  </li>
                  <li>Utilized Git and GitHub for efficient version control and collaboration.</li>
                  <li>
                    Implemented user interfaces based on Figma designs and managed tasks using Jira.
                  </li>
                  <li>
                    Set up development and runtime environments using Docker (Dockerfile, Docker
                    Compose).
                  </li>
                </ul>
              </article>
            </div>
          </section>

          <section id="education" className="scroll-m-24 animate-fade-up">
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Education
                </p>
                <h2 className="text-sm font-semibold text-slate-100 sm:text-base">
                  Where I learned to build.
                </h2>
              </div>
            </div>

            <div className="space-y-4">
              <article className="glass-panel rounded-3xl px-5 py-5 sm:px-6 sm:py-6">
                <h3 className="text-base font-semibold text-slate-50">
                  Full Stack Web Development
                </h3>
                <p className="mt-1 text-[0.82rem] font-medium text-slate-300">SV College</p>
                <p className="mt-0.5 text-[0.78rem] text-slate-400">
                  January 2025 – August 2025 · Tel Aviv, Israel
                </p>
                <p className="mt-3 text-[0.86rem] leading-relaxed text-slate-200">
                  A practical development course emphasising project building and working in a real
                  development environment.
                </p>
              </article>

              <article className="glass-panel rounded-3xl px-5 py-5 sm:px-6 sm:py-6">
                <h3 className="text-base font-semibold text-slate-50">
                  Practical Engineer in Mechanical Engineering
                </h3>
                <p className="mt-1 text-[0.82rem] font-medium text-slate-300">ORT College</p>
                <p className="mt-0.5 text-[0.78rem] text-slate-400">
                  October 2019 – March 2021 · Ashkelon, Israel · GPA: 86
                </p>
                <p className="mt-3 text-[0.86rem] leading-relaxed text-slate-200">
                  Technological studies with an emphasis on problem-solving, systematic thinking, and
                  the application of precise methodologies.
                </p>
              </article>
            </div>
          </section>

          <section id="skills" className="scroll-m-24 animate-fade-up">
            <div className="mb-3 flex items-baseline justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  Skills
                </p>
                <h2 className="text-sm font-semibold text-slate-100 sm:text-base">
                  Tech stack as code.
                </h2>
              </div>
            </div>

            <div className="code-gradient neon-border relative overflow-hidden rounded-2xl px-4 py-4 font-mono text-[0.78rem] leading-relaxed text-slate-100">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <span className="text-[0.7rem] text-slate-300">skills.ts</span>
              </div>
              <pre className="mt-1 overflow-x-auto whitespace-pre text-[0.78rem] leading-relaxed">
                <code>
                  <span className="text-slate-500">// Technical Skills</span>
                  {'\n'}
                  <span className="text-sky-300">const</span>{' '}
                  <span className="text-emerald-300">programmingLanguages</span>{' '}
                  <span className="text-sky-300">=</span>{' '}
                  <span className="text-slate-200">
                    [&apos;Python&apos;, &apos;JavaScript&apos;, &apos;TypeScript&apos;, &apos;
                    HTML5&apos;, &apos;CSS3&apos;];
                  </span>
                  {'\n'}
                  {'\n'}
                  <span className="text-sky-300">const</span>{' '}
                  <span className="text-emerald-300">frontend</span>{' '}
                  <span className="text-sky-300">=</span>{' '}
                  <span className="text-slate-200">
                    [&apos;React&apos;, &apos;Next.js&apos;, &apos;MUI Components&apos;, &apos;
                    Tailwind CSS&apos;, &apos;Shadcn/UI&apos;];
                  </span>
                  {'\n'}
                  {'\n'}
                  <span className="text-sky-300">const</span>{' '}
                  <span className="text-emerald-300">backendAndDatabases</span>{' '}
                  <span className="text-sky-300">=</span>{' '}
                  <span className="text-slate-200">
                    [ &apos;Node.js&apos;, &apos;Express.js&apos;, &apos;REST APIs&apos;,
                    &apos;MongoDB&apos;, &apos;LangGraph&apos;, &apos;WebSocket&apos; ];
                  </span>
                  {'\n'}
                  {'\n'}
                  <span className="text-sky-300">const</span>{' '}
                  <span className="text-emerald-300">devOpsAndCloud</span>{' '}
                  <span className="text-sky-300">=</span>{' '}
                  <span className="text-slate-200">
                    [ &apos;AWS&apos;, &apos;Docker&apos;, &apos;Nginx&apos;, &apos;Git&apos;,
                    &apos;GitHub&apos; ];
                  </span>
                  {'\n'}
                  {'\n'}
                  <span className="text-sky-300">const</span>{' '}
                  <span className="text-emerald-300">aiAndLLM</span>{' '}
                  <span className="text-sky-300">=</span>{' '}
                  <span className="text-slate-200">
                    [ &apos;LLM Integration&apos;, &apos;Prompt Engineering (Cursor, GitHub
                    Copilot)&apos;, &apos;LangGraph&apos; ];
                  </span>
                  {'\n'}
                </code>
              </pre>
            </div>
          </section>

          <section
            id="contact"
            className="scroll-m-24 grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] animate-fade-up"
          >
            <div className="glass-panel rounded-3xl px-5 py-5 sm:px-6 sm:py-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Let&apos;s talk
              </p>
              <h2 className="mt-1 text-sm font-semibold text-slate-100 sm:text-base">
                Tell me about what you&apos;re building.
              </h2>
              <p className="mt-2 text-[0.86rem] leading-relaxed text-slate-300">
                Whether you need a fullstack partner, help with an AI workflow, or support on an
                existing product, drop a short message and I&apos;ll get back to you.
              </p>

              <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="block text-[0.8rem] font-medium text-slate-200"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="block w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-[0.8rem] text-slate-50 shadow-inner shadow-slate-950/60 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="block text-[0.8rem] font-medium text-slate-200"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="block w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-[0.8rem] text-slate-50 shadow-inner shadow-slate-950/60 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="message"
                    className="block text-[0.8rem] font-medium text-slate-200"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="block w-full resize-none rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-[0.8rem] text-slate-50 shadow-inner shadow-slate-950/60 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
                    placeholder="Share a few details about your idea, team, or product…"
                  />
                </div>
                <button
                  type="submit"
                  disabled={contactState === 'submitting'}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 px-4 py-2 text-[0.78rem] font-semibold text-slate-950 shadow-lg shadow-indigo-900/70 transition hover:translate-y-0.5 hover:shadow-indigo-900/90 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {contactState === 'submitting' ? 'Sending…' : 'Send message'}
                  <span className="text-[0.7rem]">↗</span>
                </button>

                {contactState === 'success' && (
                  <p className="text-[0.78rem] text-emerald-400">
                    Thanks for reaching out — your message has been received.
                  </p>
                )}
                {contactState === 'error' && (
                  <p className="text-[0.78rem] text-rose-400">
                    {contactError || 'Something went wrong. Please try again.'}
                  </p>
                )}
              </form>
            </div>

            <div id="connect" className="glass-panel rounded-3xl px-5 py-5 sm:px-6 sm:py-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Contact
              </p>
              <h2 className="mt-1 text-sm font-semibold text-slate-100 sm:text-base">
                Direct lines to reach me.
              </h2>
              <div className="mt-3 space-y-3 text-[0.82rem] text-slate-200">
                <div>
                  <p className="text-[0.75rem] uppercase tracking-[0.18em] text-slate-400">
                    Phone
                  </p>
                  <p className="mt-0.5 text-slate-100">+972-XX-XXX-XXXX</p>
                </div>
                <div>
                  <p className="text-[0.75rem] uppercase tracking-[0.18em] text-slate-400">
                    Email
                  </p>
                  <p className="mt-0.5 text-slate-100">assaf@example.com</p>
                </div>
                <div>
                  <p className="text-[0.75rem] uppercase tracking-[0.18em] text-slate-400">
                    LinkedIn
                  </p>
                  <a
                    href="https://linkedin.com/in/assaf-azran"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-0.5 inline-flex items-center gap-1 text-slate-100 hover:text-indigo-200"
                  >
                    linkedin.com/in/assaf-azran
                  </a>
                </div>
                <div>
                  <p className="text-[0.75rem] uppercase tracking-[0.18em] text-slate-400">
                    GitHub
                  </p>
                  <a
                    href="https://github.com/assaf-azran"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-0.5 inline-flex items-center gap-1 text-slate-100 hover:text-indigo-200"
                  >
                    github.com/assaf-azran
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        <footer className="mt-10 flex items-center justify-between text-[0.7rem] text-slate-500">
          <span>© {new Date().getFullYear()} Assaf Azran</span>
          <span>Crafted with React, Tailwind &amp; a bit of AI.</span>
        </footer>
      </div>
    </div>
  );
}
