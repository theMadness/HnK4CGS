const colorMap = {
  義: "#92E0FF", // Righteousness
  愛: "#FFA500", // Love
  流: "#97FF7A", // Style
  覇: "#A480FF", // Supremacy
  邪: "#FF6745", // Evil
};

const spaceCorrection = -11;

const renderTypeCost = ({ Type, Style, Attribute, Cost1, Cost2, Cost3 }) => {
  const labelText = Style ? `${Type} — ${Style}` : Type;
  const costParts = [Cost3, Cost2, Cost1].filter(Boolean);
  const costPadding = (3 - costParts.length) * 4;
  const labelMarkup = `<color=${colorMap[Attribute]}>${labelText}</color>`;
  const costMarkup = costParts
    .map((c) =>
      c === "⏺"
        ? "<color=#D6D0B5><b>Ｏ</b></color>"
        : `<color=${colorMap[c]}>${c}</color>`,
    )
    .join("");
  const typePadding = {
    "CharacterHokuto Shinken": 13,
    "CharacterNanto Seiken": 19,
    CharacterHorse: 32,
    "CharacterKazan Ryu": 24,
    "CharacterTaizan Ryu": 23,
    "CharacterOrdinary Person": 12,
    CharacterNothing: 28,
    Event: 57,
    Skill: 60,
  };

  return `${labelMarkup}${" ".repeat(typePadding[Type + (Style || "")] + costPadding + spaceCorrection)}${costMarkup}`;
};

const renderAttributeRow = (data) => {
  switch (true) {
    case data.Type === "Character" && data["Power/Summary"] >= 1000:
      return `<b><size=20>PWR</size>${" ".repeat(58 + spaceCorrection)}<color=${colorMap[data.Attribute]}><size=20>${data.Attribute} Attribute</size></color>\n【${data["Power/Summary"]}】 </b>${" ".repeat(60 + spaceCorrection)}`;
    case data.Type === "Character":
      return `<b><size=20>PWR</size>${" ".repeat(58 + spaceCorrection)}<color=${colorMap[data.Attribute]}><size=20>${data.Attribute} Attribute</size></color>\n【${data["Power/Summary"]}】  </b>${" ".repeat(61 + spaceCorrection)}`;
    case data["Power/Summary"].includes("COUNTER"):
      return `<b><color=#FF6666>COUNTER</color>${" ".repeat(46 + spaceCorrection)}<color=${colorMap[data.Attribute]}><size=20>${data.Attribute} Attribute</size></color></b>`;
    default:
      return ` <b>${" ".repeat(63 + spaceCorrection)}<color=${colorMap[data.Attribute]}><size=20>${data.Attribute} Attribute</size></color></b>`;
  }
};

const refineText = (text) =>
  text
    .replace('"義" (blue)', `<color=${colorMap["義"]}>義</color>`)
    .replace('"愛" (orange)', `<color=${colorMap["愛"]}>愛</color>`)
    .replace('"邪" (red)', `<color=${colorMap["邪"]}>邪</color>`);

const renderRules = ({ Text }) =>
  Text && Text !== ""
    ? `\n<color=#666666>————————————————</color>\n${refineText(Text)}`
    : "";

const renderFlavor = ({ Flavor }) =>
  Flavor && Flavor !== ""
    ? `\n<color=#666666>————————————————</color>\n<color=#CCCCCC><i>${Flavor}</i></color>`
    : "";

const description = (data) => `<size=30>
${renderTypeCost(data)}
${renderAttributeRow(data)}${renderRules(data)}${renderFlavor(data)}</size>`;

module.exports = { description, renderFirstRow: renderTypeCost };
