"use client";
import { Jersey_25, Fira_Sans } from "next/font/google";
import { useState, useEffect, useMemo } from "react";

const pixel = Jersey_25({ weight: "400", subsets: ["latin"] });
const sans = Fira_Sans({ weight: ["400", "700", "800"], subsets: ["latin"] });

//bg face sets
const FACE_OPEN  = ["0_0", ">u<", "@.@", "O_O", "^_^", "o_o", ">.>", "<.<"];
const FACE_BLINK = ["-_-", ">-<", "@-@", "-_-", "^-^", "-_-", ">->", "<-<"];

//normal background
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
          x
        </span>
      ))}
    </div>
  );
}

//hero background
function AsciiHero() {
  const COUNT = 2000;
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(id);
  }, []);

  const schedules = useMemo(() =>
    Array.from({ length: COUNT }, () => ({
      idx: Math.floor(Math.random() * FACE_OPEN.length),
      offset: Math.random() * 6000,        //random start offset so they're not all synchronized
      period: 2000 + Math.random() * 4000, //each face will blink every 2–6s
      blinkDuration: 600 + Math.random() * 600, //eyes shut for 0.6–1.2s
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
            className="inline-block text-[50px] select-none whitespace-nowrap"
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

const steps = [
  { num: "Step 1.", text: "Select the parts you wanna incorporate", img: "step1" },
  { num: "Step 2.", text: "Import their models, CAD them a frame", img: "step2" },
  { num: "Step 3.", text: "Program the modules to create your assistant", img: "step3" },
  { num: "Step 4.", text: "Submit your files on GitHub and Slack", img: "step4" },
  { num: "Step 5.", text: "Once done, we ship you what you need", img: "step5" },
];

const faqs = [
  { q: "What is it?", a: "A desktop robot that can tend to your needs. Design it to your liking and we send you the parts to build." },
  { q: "Who can apply?", a: "Any Hack Club member!" },
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
      <a
        href="https://hackclub.com"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-0 left-0 z-50"
      >
        <img src="/odyarm.png" alt="Hack Club" className="w-100 h-auto" />
      </a>

      {/* Hero card */}
      <div
        className="relative z-10 w-[95vw] h-[90vh] flex flex-col items-center justify-center overflow-hidden"
        style={{ border: "2px solid #00FFAE", backgroundColor: "#2654D3" }}
      >
        <AsciiHero />

        <div
          className={`${pixel.className} relative z-10 flex flex-col items-center justify-center text-center gap-1`}
        >
          <p className="text-3xl sm:text-[150px] tracking-widest leading-none" style={{ color: "#00FFAE" }}>
            IF YOU SHIP A
          </p>
          <h1
            className="text-7xl sm:text-[250px] font-black text-white leading-none"
            style={{ textShadow: "4px 4px 0px rgba(0,0,0,0.3)", letterSpacing: "0.04em" }}
          >
            DESKBOT
          </h1>
          <p className="text-2xl sm:text-[150px] tracking-widest leading-none" style={{ color: "#00FFAE" }}>
            WE SHIP THE PARTS
          </p>
        </div>
      </div>

      {/* How it Works card */}
      <div
        className="relative z-10 w-[95vw] flex flex-col items-center justify-start p-12 gap-10"
        style={{ border: "2px solid #00FFAE" }}
      >
        <h2 className={`${pixel.className} text-4xl sm:text-6xl tracking-widest text-white`}>
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
                  <p className={`${sans.className} text-5xl font-extrabold text-black leading-snug`}>
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
                  <p className={`${sans.className} text-5xl font-extrabold text-black leading-snug`}>
                    {step.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Placeholder FAQ card */}
      <div
        className="relative z-10 w-[95vw] flex flex-col items-start justify-start p-12 gap-10"
        style={{ border: "2px solid #00FFAE" }}
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