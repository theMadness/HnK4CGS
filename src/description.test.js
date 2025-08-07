const { renderTypeCost } = require("./description");

describe("First Row", () => {
  describe("First Row — Cost and Style Alignment", () => {
    test.each([
      {
        Type: "Character",
        Style: "Hokuto Shinken",
        Attribute: "義",
        Cost3: "",
        Cost2: "",
        Cost1: "",
        expected:
          "<color=#92E0FF>Character — Hokuto Shinken</color>                         ",
      },
      {
        Type: "Character",
        Style: "Hokuto Shinken",
        Attribute: "義",
        Cost3: "",
        Cost2: "",
        Cost1: "義",
        expected:
          "<color=#92E0FF>Character — Hokuto Shinken</color>                     <color=#92E0FF>義</color>",
      },
      {
        Type: "Character",
        Style: "Hokuto Shinken",
        Attribute: "義",
        Cost3: "",
        Cost2: "⏺",
        Cost1: "義",
        expected:
          "<color=#92E0FF>Character — Hokuto Shinken</color>                 <color=#D6D0B5><b>Ｏ</b></color><color=#92E0FF>義</color>",
      },
      {
        Type: "Character",
        Style: "Hokuto Shinken",
        Attribute: "義",
        Cost3: "⏺",
        Cost2: "⏺",
        Cost1: "義",
        expected:
          "<color=#92E0FF>Character — Hokuto Shinken</color>             <color=#D6D0B5><b>Ｏ</b></color><color=#D6D0B5><b>Ｏ</b></color><color=#92E0FF>義</color>",
      },
      {
        Type: "Character",
        Style: "Nanto Seiken",
        Attribute: "義",
        Cost3: "⏺",
        Cost2: "⏺",
        Cost1: "義",
        expected:
          "<color=#92E0FF>Character — Nanto Seiken</color>                   <color=#D6D0B5><b>Ｏ</b></color><color=#D6D0B5><b>Ｏ</b></color><color=#92E0FF>義</color>",
      },
      {
        Type: "Character",
        Style: "Horse",
        Attribute: "義",
        Cost3: "⏺",
        Cost2: "⏺",
        Cost1: "義",
        expected:
          "<color=#92E0FF>Character — Horse</color>                                <color=#D6D0B5><b>Ｏ</b></color><color=#D6D0B5><b>Ｏ</b></color><color=#92E0FF>義</color>",
      },
      {
        Type: "Character",
        Style: "Kazan Ryu",
        Attribute: "義",
        Cost3: "⏺",
        Cost2: "⏺",
        Cost1: "義",
        expected:
          "<color=#92E0FF>Character — Kazan Ryu</color>                        <color=#D6D0B5><b>Ｏ</b></color><color=#D6D0B5><b>Ｏ</b></color><color=#92E0FF>義</color>",
      },
      {
        Type: "Character",
        Style: "Taizan Ryu",
        Attribute: "義",
        Cost3: "⏺",
        Cost2: "⏺",
        Cost1: "義",
        expected:
          "<color=#92E0FF>Character — Taizan Ryu</color>                       <color=#D6D0B5><b>Ｏ</b></color><color=#D6D0B5><b>Ｏ</b></color><color=#92E0FF>義</color>",
      },
      {
        Type: "Character",
        Style: "Ordinary Person",
        Attribute: "義",
        Cost3: "⏺",
        Cost2: "⏺",
        Cost1: "義",
        expected:
          "<color=#92E0FF>Character — Ordinary Person</color>            <color=#D6D0B5><b>Ｏ</b></color><color=#D6D0B5><b>Ｏ</b></color><color=#92E0FF>義</color>",
      },
      {
        Type: "Character",
        Style: "Nothing",
        Attribute: "義",
        Cost3: "⏺",
        Cost2: "⏺",
        Cost1: "義",
        expected:
          "<color=#92E0FF>Character — Nothing</color>                            <color=#D6D0B5><b>Ｏ</b></color><color=#D6D0B5><b>Ｏ</b></color><color=#92E0FF>義</color>",
      },
      {
        Type: "Event",
        Attribute: "義",
        Cost3: "⏺",
        Cost2: "⏺",
        Cost1: "義",
        expected:
          "<color=#92E0FF>Event</color>                                                         <color=#D6D0B5><b>Ｏ</b></color><color=#D6D0B5><b>Ｏ</b></color><color=#92E0FF>義</color>",
      },
      {
        Type: "Skill",
        Attribute: "義",
        Cost3: "⏺",
        Cost2: "⏺",
        Cost1: "義",
        expected:
          "<color=#92E0FF>Skill</color>                                                            <color=#D6D0B5><b>Ｏ</b></color><color=#D6D0B5><b>Ｏ</b></color><color=#92E0FF>義</color>",
      },
    ])("renders $Type — $Style with cost $Cost3 $Cost2 $Cost1", (testCase) => {
      const rendered = renderTypeCost(testCase);
      expect(rendered).toHaveLength(testCase.expected.length);
      expect(rendered).toBe(testCase.expected);
    });
  });
});
