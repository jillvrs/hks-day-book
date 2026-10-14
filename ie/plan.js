// Five-day preparation plan. Each task has a stable id so completion can be saved.
// run: optional deep link into the app ({module, n, min} for a drill, {mock} for a full mock, {kira} for Kira practice)
window.PLAN = [
  {
    day: 1, title: "Diagnose and learn the formats",
    goal: "Know exactly what each section looks like, get a baseline score, and set up Kira logistics.",
    blocks: [
      { time: "Morning (90 min)", tasks: [
        { id: "d1a", t: "Read the Guide tab top to bottom: section formats, scoring, the True/False/Cannot-say decision rules.", min: 25 },
        { id: "d1b", t: "Do 10 numerical statements untimed. Say out loud what calculation each statement needs before computing.", min: 20, run: { module: "numerical", n: 10, min: 0 } },
        { id: "d1c", t: "Do 12 verbal statements untimed. For every 'Cannot say', point at the exact missing fact.", min: 20, run: { module: "verbal", n: 12, min: 0 } },
        { id: "d1d", t: "Try 5 deductive grids, 3 memory sequences and 4 maths questions untimed just to learn the controls. Then open IE's own example videos from the Guide once.", min: 25 }
      ]},
      { time: "Afternoon (60 min)", tasks: [
        { id: "d1e", t: "Full timed mock 1 (baseline). Do not stop the clock. Afterwards, write down three things that cost you time.", min: 45, run: { mock: true } },
        { id: "d1f", t: "Review every wrong answer in the mock. Classify each: misread, miscalculated, wrong Cannot-say logic, or ran out of time.", min: 15 }
      ]},
      { time: "Evening (45 min)", tasks: [
        { id: "d1g", t: "Kira logistics: open the Kira invitation, run their practice question, check camera angle, lighting and microphone, choose the room you will use.", min: 15 },
        { id: "d1h", t: "Fill the Story bank: Why IE, goals, 'tell us about yourself'. Bullet points, not scripts.", min: 30, run: { kira: "stories" } }
      ]}
    ]
  },
  {
    day: 2, title: "Numerical and deductive technique",
    goal: "Make the numerical section mechanical: read the statement, locate the cells, pick the fastest check.",
    blocks: [
      { time: "Morning (90 min)", tasks: [
        { id: "d2a", t: "Mental-maths warm-up: 10% / 5% / 1% shortcuts, percentage change = (new − old) ÷ old, share = part ÷ total, and the unit line under every table (thousands, millions). Equations drill for 5 minutes.", min: 15, run: { module: "eql", n: 30, min: 5 } },
        { id: "d2b", t: "Numerical drill, 20 statements in 7 minutes. Target: 85% accuracy on answered items.", min: 10, run: { module: "numerical", n: 20, min: 7 } },
        { id: "d2c", t: "Review. For each error, write the one-line rule that would have prevented it (e.g. 'check the unit row first').", min: 15 },
        { id: "d2d", t: "Numerical drill, 37 statements in 12 minutes (full section length).", min: 15, run: { module: "numerical", n: 37, min: 12 } },
        { id: "d2e", t: "Review again. Note how many statements you did not reach: that is your speed gap.", min: 10 },
        { id: "d2f", t: "Deductive grids, 6 minutes. Technique: scan the row and column of the ? cell, eliminate, then use the most complete other row or column.", min: 8, run: { module: "deductive", n: 40, min: 6 } },
        { id: "d2g", t: "Second deductive drill, 6 minutes. Beat the first count.", min: 8, run: { module: "deductive", n: 40, min: 6 } }
      ]},
      { time: "Afternoon (45 min)", tasks: [
        { id: "d2h", t: "Mathematics section, 12 questions in 15 minutes (skip if your programme has no maths section). Use 'I don't know' instead of guessing.", min: 17, run: { module: "math", n: 12, min: 15 } },
        { id: "d2i", t: "Inductive ix, 20 objects rows in 5 minutes (the ieGAT example; good rule-spotting practice for everyone).", min: 7, run: { module: "ix", n: 20, min: 5 } },
        { id: "d2j", t: "Memory sequences, 5 minutes. Technique: say the object names silently as a chain.", min: 8, run: { module: "memory", n: 10, min: 5 } }
      ]},
      { time: "Evening (60 min)", tasks: [
        { id: "d2k", t: "Write STAR bullets for the leadership, failure and teamwork stories in the Story bank.", min: 25, run: { kira: "stories" } },
        { id: "d2l", t: "Kira video practice: 3 questions with the timer. Record yourself on your phone and watch it back once. Rate each with the rubric.", min: 35, run: { kira: "video" } }
      ]}
    ]
  },
  {
    day: 3, title: "Verbal precision, inductive speed, written Kira",
    goal: "Eliminate Cannot-say errors and make verbal scanning fast.",
    blocks: [
      { time: "Morning (90 min)", tasks: [
        { id: "d3a", t: "Verbal drill, 24 statements in 6 minutes. Read the statement first, then hunt the tab that holds the keyword.", min: 10, run: { module: "verbal", n: 24, min: 6 } },
        { id: "d3b", t: "Review. For each wrong 'Cannot say' or wrong 'False', write which trap it was: outside knowledge, over-inference, or a modal word (may / must / only / all).", min: 15 },
        { id: "d3c", t: "Verbal drill, 49 statements in 12 minutes (full section length).", min: 15, run: { module: "verbal", n: 49, min: 12 } },
        { id: "d3d", t: "Review and note your reached-count and accuracy. Compare with Day 1.", min: 10 },
        { id: "d3e", t: "Mathematics section again, 12 in 15 minutes. Review every error against the worked solution.", min: 20, run: { module: "math", n: 12, min: 15 } },
        { id: "d3f", t: "Deductive grids, 6 minutes.", min: 8, run: { module: "deductive", n: 40, min: 6 } },
        { id: "d3g", t: "Memory sequences, 5 minutes.", min: 8, run: { module: "memory", n: 10, min: 5 } }
      ]},
      { time: "Afternoon (45 min)", tasks: [
        { id: "d3h", t: "Numerical drill, 37 in 12 minutes. Goal today: fewer unanswered than Day 2 at the same accuracy.", min: 15, run: { module: "numerical", n: 37, min: 12 } },
        { id: "d3i", t: "Inductive ix, 5 minutes.", min: 7, run: { module: "ix", n: 20, min: 5 } },
        { id: "d3j", t: "Deductive grids, 6 minutes. Count how many you solve; beat it on Day 4.", min: 8, run: { module: "deductive", n: 40, min: 6 } }
      ]},
      { time: "Evening (60 min)", tasks: [
        { id: "d3k", t: "Kira written practice: 2 prompts, 5 minutes each. Structure: claim, reason, example, so-what.", min: 15, run: { kira: "written" } },
        { id: "d3l", t: "Kira video practice: 4 questions, including one creative one. Rate them. Watch for filler words and the ending.", min: 35, run: { kira: "video" } },
        { id: "d3m", t: "Update the Story bank with anything new that came up while answering.", min: 10, run: { kira: "stories" } }
      ]}
    ]
  },
  {
    day: 4, title: "Full simulation and error analysis",
    goal: "Reproduce test conditions exactly and fix the two most expensive error types.",
    blocks: [
      { time: "Morning (75 min)", tasks: [
        { id: "d4a", t: "Set up like test day: quiet room, laptop on mains power, paper and pen, basic calculator if your test allows one, phone away, same time of day as the real test if you can.", min: 10 },
        { id: "d4b", t: "Full timed mock 2. No pauses between sections.", min: 50, run: { mock: true } },
        { id: "d4c", t: "Review and compare with mock 1 in Progress. Pick the two error types that cost the most points.", min: 15 }
      ]},
      { time: "Afternoon (45 min)", tasks: [
        { id: "d4d", t: "Targeted drill on your weakest module, 12 minutes.", min: 15 },
        { id: "d4e", t: "Targeted drill on your second-weakest module, 12 minutes.", min: 15 },
        { id: "d4f", t: "Read your own error notes from Days 1 to 3 once, slowly.", min: 15 }
      ]},
      { time: "Evening (45 min)", tasks: [
        { id: "d4g", t: "Kira full simulation: 2 video questions + 1 written, back to back, with the timers, dressed as you will be on the day.", min: 25, run: { kira: "video" } },
        { id: "d4h", t: "Watch the recordings once. Write one sentence of feedback per answer. Do not re-record more than once.", min: 20 }
      ]}
    ]
  },
  {
    day: 5, title: "Sharpen, rest, and sit the test",
    goal: "Arrive fast and calm. Light work only. No new material.",
    blocks: [
      { time: "Morning (40 min)", tasks: [
        { id: "d5a", t: "Warm-up: 15 numerical statements in 5 minutes, 20 verbal in 5 minutes, 6 minutes of deductive grids.", min: 20 },
        { id: "d5b", t: "Short Kira warm-up: 2 video questions, timed, no recording.", min: 10, run: { kira: "video" } },
        { id: "d5c", t: "Test-day checklist from the Guide: ID, test link, browser permissions, camera, stable connection, water, calculator if allowed, quiet room, no interruptions.", min: 10 }
      ]},
      { time: "Before the test (or the Kira assessment)", tasks: [
        { id: "d5d", t: "Read the one-page strategy card in the Guide: answer order, when to skip, when to choose Cannot say.", min: 5 },
        { id: "d5e", t: "If the test offers example questions before scored sections, use them to re-learn the interface, not to rush.", min: 5 },
        { id: "d5f", t: "Sit the test. Then complete the Kira assessment the same day while you are still in interview mode (if both are due).", min: 90 }
      ]}
    ]
  }
];
