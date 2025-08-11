const { renderTypeCost } = require("./description");

const testCases = [
  {
    type: "Character",
    group: "Hokuto Shinken",
    attribute: "義",
    cost: [],
    expected:
      "<color=#92E0FF>Character — Hokuto Shinken</color>                         <b></b>",
  },
  {
    type: "Character",
    group: "Hokuto Shinken",
    attribute: "義",
    cost: ["義"],
    expected:
      "<color=#92E0FF>Character — Hokuto Shinken</color>                     <b><color=#92E0FF>義</color></b>",
  },
  {
    type: "Character",
    group: "Hokuto Shinken",
    attribute: "義",
    cost: ["⏺", "義"],
    expected:
      "<color=#92E0FF>Character — Hokuto Shinken</color>                 <b><color=#D6D0B5>Ｏ</color><color=#92E0FF>義</color></b>",
  },
  {
    type: "Character",
    group: "Hokuto Shinken",
    attribute: "義",
    cost: ["⏺", "⏺", "義"],
    expected:
      "<color=#92E0FF>Character — Hokuto Shinken</color>             <b><color=#D6D0B5>Ｏ</color><color=#D6D0B5>Ｏ</color><color=#92E0FF>義</color></b>",
  },
  {
    type: "Character",
    group: "Nanto Seiken",
    attribute: "義",
    cost: ["⏺", "⏺", "義"],
    expected:
      "<color=#92E0FF>Character — Nanto Seiken</color>                   <b><color=#D6D0B5>Ｏ</color><color=#D6D0B5>Ｏ</color><color=#92E0FF>義</color></b>",
  },
  {
    type: "Character",
    group: "Horse",
    attribute: "義",
    cost: ["⏺", "⏺", "義"],
    expected:
      "<color=#92E0FF>Character — Horse</color>                                <b><color=#D6D0B5>Ｏ</color><color=#D6D0B5>Ｏ</color><color=#92E0FF>義</color></b>",
  },
  {
    type: "Character",
    group: "Kazan Ryu",
    attribute: "義",
    cost: ["⏺", "⏺", "義"],
    expected:
      "<color=#92E0FF>Character — Kazan Ryu</color>                        <b><color=#D6D0B5>Ｏ</color><color=#D6D0B5>Ｏ</color><color=#92E0FF>義</color></b>",
  },
  {
    type: "Character",
    group: "Taizan Ryu",
    attribute: "義",
    cost: ["⏺", "⏺", "義"],
    expected:
      "<color=#92E0FF>Character — Taizan Ryu</color>                       <b><color=#D6D0B5>Ｏ</color><color=#D6D0B5>Ｏ</color><color=#92E0FF>義</color></b>",
  },
  {
    type: "Character",
    group: "Commoner",
    attribute: "義",
    cost: ["⏺", "⏺", "義"],
    expected:
      "<color=#92E0FF>Character — Ordinary Person</color>            <b><color=#D6D0B5>Ｏ</color><color=#D6D0B5>Ｏ</color><color=#92E0FF>義</color></b>",
  },
  {
    type: "Character",
    group: "Nothing",
    attribute: "義",
    cost: ["⏺", "⏺", "義"],
    expected:
      "<color=#92E0FF>Character — Nothing</color>                            <b><color=#D6D0B5>Ｏ</color><color=#D6D0B5>Ｏ</color><color=#92E0FF>義</color></b>",
  },
  {
    type: "Event",
    attribute: "義",
    cost: ["⏺", "⏺", "義"],
    expected:
      "<color=#92E0FF>Event</color>                                                         <b><color=#D6D0B5>Ｏ</color><color=#D6D0B5>Ｏ</color><color=#92E0FF>義</color></b>",
  },
  {
    type: "Skill",
    attribute: "義",
    cost: ["⏺", "⏺", "義"],
    expected:
      "<color=#92E0FF>Skill</color>                                                            <b><color=#D6D0B5>Ｏ</color><color=#D6D0B5>Ｏ</color><color=#92E0FF>義</color></b>",
  },
];

test.each(testCases)("renders $type — $group with cost $cost", (testCase) => {
  expect(renderTypeCost(testCase)).toBe(testCase.expected);
});

test.each(testCases)(
  "right length for $type — $group with cost $cost",
  (testCase) => {
    expect(testCase.expected.length - renderTypeCost(testCase).length).toBe(0);
  },
);
