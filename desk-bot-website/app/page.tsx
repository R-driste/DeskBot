"use client";
import { Jersey_25, Fira_Sans } from "next/font/google";
import { useState, useEffect, useMemo, useRef } from "react";

const pixel = Jersey_25({ weight: "400", subsets: ["latin"] });
const sans = Fira_Sans({ weight: ["400", "700", "800"], subsets: ["latin"] });

const FACE_OPEN  = ["0_0", ">u<", "@.@", "O_O", "^_^", "o_o", ">.>", "<.<"];
const FACE_BLINK = ["-_-", ">-<", "@-@", "-_-", "^-^", "-_-", ">->", "<-<"];

function PlusBackground() {
  return (
    <div
      className="fixed inset-0 flex flex-wrap pointer-events-none"
      style={{ alignContent: "flex-start" }}
    >
      {Array.from({ length: 6000 }, (_, i) => (
        <span
          key={i}
          className="inline-block px-3 py-2 text-[18px] select-none"
          style={{ color: "#5b8fe8", fontFamily: "monospace", opacity: 0.5 }}
        >
          +
        </span>
      ))}
    </div>
  );
}

//some ai help here
function AsciiHero() {
  const COUNT = 4000;
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(id);
  }, []);

  const schedules = useMemo(() =>
    Array.from({ length: COUNT }, () => ({
      idx: Math.floor(Math.random() * FACE_OPEN.length),
      offset: Math.random() * 6000,
      period: 2000 + Math.random() * 4000,
      blinkDuration: 600 + Math.random() * 600,
    })),
  []);

  return (
    <div
      className="absolute pointer-events-none overflow-hidden"
      style={{
        inset: "-50%",
        width: "200%",
        height: "200%",
        transform: "rotate(-20deg)",
        display: "flex",
        flexWrap: "wrap",
        alignContent: "flex-start",
        lineHeight: "2.5",
        gap: 0,
      }}
    >
      {schedules.map((s, i) => {
        const isBlinking = (now - s.offset) % s.period < s.blinkDuration;
        return (
          <span
            key={i}
            className="inline-block text-[20px] select-none whitespace-nowrap"
            style={{
              fontFamily: "monospace",
              opacity: isBlinking ? 1 : 0.2,
              color: isBlinking ? "#00FFAE" : "white",
              padding: "2px 12px",
            }}
          >
            {isBlinking ? FACE_BLINK[s.idx] : FACE_OPEN[s.idx]}
          </span>
        );
      })}
    </div>
  );
}

const fakeProjects = [
  { name: "Orpheus Bot", author: "@zephyr", desc: "A robot that reads out Slack messages and reacts with LED expressions.", img: "orphexample.png" },
  { name: "Omnicat", author: "@notdristi", desc: "A github history sharing desk robot as Octocat.", img: "catexample.png" },
  { name: "Focusing Friend", author: "@bleeeh", desc: "Pomodoro timer bot with a servo arm that physically blocks your phone.", img: "clockexample.jpg" },
  { name: "Mood Light", author: "@bob", desc: "Detects your face expression via camera and sets ambient lighting accordingly.", img: "lightexample.webp" },
  { name: "Planthehe", author: "@dristii", desc: "Monitors soil moisture and reminds you when your plants need water via audio.", img: "plantexample.jpg" },
  { name: "Chess Coach", author: "@arjun", desc: "A bot that watches my chess board via camera and suggests the best move.", img: "chessexample.webp" },
];

//got ai help here
function ProjectScroller() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animId: number;
    let paused = false;

    const scroll = () => {
      if (!paused && el) {
        el.scrollLeft += 1;
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(scroll);
    };

    animId = requestAnimationFrame(scroll);
    el.addEventListener("mouseenter", () => { paused = true; });
    el.addEventListener("mouseleave", () => { paused = false; });
    return () => cancelAnimationFrame(animId);
  }, []);

  const doubled = [...fakeProjects, ...fakeProjects];

  return (
    <div
      ref={scrollRef}
      className="w-full overflow-x-hidden flex flex-row gap-6"
      style={{ scrollbarWidth: "none" }}
    >
      {doubled.map((p, i) => (
        <div
          key={i}
          className="flex-shrink-0 flex flex-col gap-3 p-6 rounded-lg cursor-pointer"
          style={{
            width: "280px",
            border: "2px solid #00FFAE",
            backgroundColor: "#1a3fa0",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(-12px)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 16px 40px rgba(0,255,174,0.3)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
          }}
        >
          <img
            src={p.img}
            alt={p.name}
            className="w-full object-contain rounded"
            style={{ height: "100px" }}
          />
          <p className={`${pixel.className} text-xl text-white`}>{p.name}</p>
          <p className={`${sans.className} text-sm font-normal`} style={{ color: "#00FFAE" }}>{p.author}</p>
          <p className={`${sans.className} text-base text-white opacity-80 leading-relaxed`}>{p.desc}</p>
        </div>
      ))}
    </div>
  );
}

const steps = [
  { num: "Step 1.", text: "Select the parts you wanna incorporate", img: "step1" },
  { num: "Step 2.", text: "Import their models, CAD them a frame", img: "step2" },
  { num: "Step 3.", text: "Program modules into your assistant", img: "step3" },
  { num: "Step 4.", text: "Submit your files on GitHub and Slack", img: "step4" },
  { num: "Step 5.", text: "Once done, we ship you what you need", img: "step5" },
];

const faqs = [
  { q: "What is Hack Club?", a: "Hack Club is a global nonprofit network of high school coding clubs and makers. Learn more at hackclub.com" },
  { q: "Who can apply?", a: "Any Hack Club member 13-18!" },
  { q: "What are the requirements?", a: "Your scripts and STEP files for the robot frame should be easily available for GitHub for review along with a description." },
  { q: "Does it use AI?", a: "We strongly encourage you to create the assistant yourself. However, if you do use AI, it must count for a minimal portion of your application and be explicitly expressed." },
  { q: "How many will be shipped?", a: "TBD!" },
];

export default function Home() {
  return (
    <div
      className="min-h-screen w-screen flex flex-col items-center justify-start py-[5vh] gap-[3vh] relative"
      style={{ backgroundColor: "#2654D3" }}
    >
      <PlusBackground />
      <div className="absolute top-0 left-0 z-50 overflow-hidden" style={{ width: "300px", height: "140px" }}>
        <a
          href="https://hackclub.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/odyarm.png"
            alt="Hack Club"
            className="w-60 h-auto"
            style={{
              transformOrigin: "50% 0%",
              animation: "swing 2s ease-in-out infinite",
              marginTop: "-25px",
            }}
          />
        </a>
      </div>

      {/* Hero card */}
      <div
        className="relative z-10 w-[95vw] h-[90vh] flex flex-col items-center justify-center overflow-hidden"
        style={{ border: "2px solid #00FFAE", backgroundColor: "#2654D3" }}
      >
        <AsciiHero />
        <div
          className={`${pixel.className} relative z-10 flex flex-col items-center justify-center text-center gap-1`}
        >
          <p className="text-3xl sm:text-[100px] tracking-widest leading-none" style={{ color: "#00FFAE" }}>
            IF YOU SHIP A
          </p>
          <h1
            className="text-7xl sm:text-[150px] font-black text-white leading-none"
            style={{ textShadow: "4px 4px 0px rgba(0,0,0,0.3)", letterSpacing: "0.04em" }}
          >
            DESKBOT
          </h1>
          <p className="text-2xl sm:text-[100px] tracking-widest leading-none" style={{ color: "#00FFAE" }}>
            WE SHIP THE PARTS
          </p>

          <div className="flex flex-row gap-8 mt-12">
            <a
              href="https://forms.fillout.com/t/dKsSDqQPikus"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-6 text-2xl text-black rounded-lg transition-transform hover:scale-105"
              style={{ backgroundColor: "#00FFAE" }}
            >
              RSVP
            </a>
            <a
              href="https://forms.fillout.com/t/uT5mAtSxPzus"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-6 text-2xl rounded-lg transition-transform hover:scale-105"
              style={{ backgroundColor: "transparent", border: "10px solid #00FFAE", color: "#00FFAE" }}
            >
              SUBMIT PROJECT
            </a>
          </div>
        </div>
      </div>

      {/* What is a DeskBot section */}
      <div
        className="relative z-10 w-[95vw] flex flex-col items-start justify-start p-12 gap-8"
        style={{ border: "2px solid #00FFAE", backgroundColor: "#2654D3" }}
      >
        <h2 className={`${pixel.className} text-4xl sm:text-6xl tracking-widest text-white`}>
          What is a DeskBot?
        </h2>
        <div className="grid w-full" style={{ gridTemplateColumns: "2fr 1fr", gap: "3rem" }}>
          <div className="flex flex-col gap-4">
            <p className={`${sans.className} text-white text-2xl leading-relaxed opacity-90`}>
              A DeskBot would be a small, programmable robot that lives on your desk and works as your personal assistant. One that's fully designed and built by <span style={{ color: "#00FFAE" }}>you</span>!
            </p>
            <p className={`${sans.className} text-white text-2xl leading-relaxed opacity-90`}>
              It could display information, respond to voice commands, react to your environment, play music, track habits, essentially whatever you want to build.
            </p>
            <p className={`${sans.className} text-white text-2xl leading-relaxed opacity-90`}>
              You pick the modules, CAD the body, write the code, and we ship you everything you need to bring it to life.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p className={`${pixel.className} text-xl`} style={{ color: "#00FFAE" }}>What it could include:</p>
            {[
              "OLED or e-ink display",
              "Microphone + voice recognition",
              "RGB LEDs or NeoPixels",
              "Wi-Fi / Bluetooth module",
              "Servo motors for movement",
              "Camera for computer vision",
              "Speaker for audio output",
            ].map((item) => (
              <p key={item} className={`${sans.className} text-white text-xl opacity-80`}>
                — {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Scrolling projects section */}
      <div
        className="relative z-10 w-[95vw] flex flex-col items-start justify-start p-12 gap-8 overflow-hidden"
        style={{ border: "2px solid #00FFAE", backgroundColor: "#2654D3" }}
      >
        <h2 className={`${pixel.className} text-4xl sm:text-6xl tracking-widest text-white`}>
          What could you build?
        </h2>
        <p className={`${sans.className} text-white text-xl opacity-70`}>
          Here are some examples of what a DeskBot could look like — hover to pause. (TOTALLY FAKE @s BTW)
        </p>
        <ProjectScroller />
      </div>

      {/* How it Works card */}
      <div
        className="relative z-10 w-[95vw] flex flex-col items-center justify-start p-12 gap-10"
        style={{ border: "2px solid #00FFAE", backgroundColor: "#2654D3" }}
      >
        <h2 className={`${pixel.className} text-5xl sm:text-6xl tracking-widest text-white`}>
          How does it work?
        </h2>

        <div className="grid grid-cols-3 gap-12 w-full">
          {steps.slice(0, 3).map((step) => (
            <div className="relative" key={step.num}>
              <div
                className="absolute inset-0 rounded-lg"
                style={{ backgroundColor: "#1a3fa0", border: "3px solid #1a3fa0", transform: "rotate(2deg)", zIndex: 0 }}
              />
              <div
                className="relative flex flex-col justify-between p-6 rounded-lg"
                style={{ backgroundColor: "#c9ffee", minHeight: "280px", zIndex: 1 }}
              >
                <img
                  src={`/${step.img}.png`}
                  alt={step.num}
                  className="w-full object-contain rounded"
                  style={{ maxHeight: "500px", filter: "invert(27%) sepia(94%) saturate(600%) hue-rotate(210deg) brightness(0.8)" }}
                />
                <div>
                  <p className={`${sans.className} text-xl font-normal mb-2`} style={{ color: "rgba(0,0,0,0.45)" }}>
                    {step.num}
                  </p>
                  <p className={`${sans.className} text-4xl font-extrabold text-black leading-snug`}>
                    {step.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-12 w-[66%]">
          {steps.slice(3).map((step) => (
            <div className="relative" key={step.num}>
              <div
                className="absolute inset-0 rounded-lg"
                style={{ backgroundColor: "#1a3fa0", border: "3px solid #1a3fa0", transform: "rotate(2deg)", zIndex: 0 }}
              />
              <div
                className="relative flex flex-col justify-between p-6 rounded-lg"
                style={{ backgroundColor: "#00FFAE", minHeight: "280px", zIndex: 1 }}
              >
                <img
                  src={`/${step.img}.png`}
                  alt={step.num}
                  className="w-full object-contain rounded"
                  style={{ maxHeight: "500px", filter: "invert(27%) sepia(94%) saturate(600%) hue-rotate(210deg) brightness(0.8)" }}
                />
                <div>
                  <p className={`${sans.className} text-xl font-normal mb-2`} style={{ color: "rgba(0,0,0,0.45)" }}>
                    {step.num}
                  </p>
                  <p className={`${sans.className} text-4xl font-extrabold text-black leading-snug`}>
                    {step.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ card */}
      <div
        className="relative z-10 w-[95vw] flex flex-col items-start justify-start p-12 gap-10"
        style={{ border: "2px solid #00FFAE", backgroundColor: "#2654D3" }}
      >
        <h2
          className={`${pixel.className} text-4xl sm:text-6xl tracking-widest`}
          style={{ color: "#00FFAE" }}
        >
          FAQ
        </h2>

        <div className="flex flex-col gap-12 w-full">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="flex flex-col gap-2"
              style={{ borderLeft: "3px solid #00FFAE", paddingLeft: "1.5rem" }}
            >
              <p className={`${pixel.className} text-2xl sm:text-3xl`} style={{ color: "#00FFAE" }}>
                {faq.q}
              </p>
              <p className={`${sans.className} text-white text-xl sm:text-2xl font-normal opacity-80`}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}