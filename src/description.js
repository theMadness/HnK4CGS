const colorMap = {
  義: "#92E0FF", // Righteousness
  愛: "#FFA500", // Love
  流: "#97FF7A", // Style
  覇: "#A480FF", // Supremacy
  邪: "#FF6745", // Evil
};

const spaceCorrection = -11;

const renderTypeCost = ({ type, group, attribute, cost }) => {
  const costPadding = (3 - cost.length) * 4;
  const labelMarkup = `<color=${colorMap[attribute]}>${group ? `${type} — ${group}` : type}</color>`;
  const costMarkup = cost
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

  return `${labelMarkup}${" ".repeat(typePadding[type + (group || "")] + costPadding + spaceCorrection)}${costMarkup}`;
};

const renderAttributeRow = ({ type, powerOrSummary, attribute }) => {
  switch (true) {
    case type === "Character" && powerOrSummary >= 1000:
      return `<b><size=20>PWR</size>${" ".repeat(58 + spaceCorrection)}<color=${colorMap[attribute]}><size=20>${attribute} attribute</size></color>\n【${powerOrSummary}】 </b>${" ".repeat(60 + spaceCorrection)}`;
    case type === "Character":
      return `<b><size=20>PWR</size>${" ".repeat(58 + spaceCorrection)}<color=${colorMap[attribute]}><size=20>${attribute} attribute</size></color>\n【${powerOrSummary}】  </b>${" ".repeat(61 + spaceCorrection)}`;
    case powerOrSummary.includes("COUNTER"):
      return `<b><color=#FF6666>COUNTER</color>${" ".repeat(46 + spaceCorrection)}<color=${colorMap[attribute]}><size=20>${attribute} Attribute</size></color></b>`;
    default:
      return ` <b>${" ".repeat(63 + spaceCorrection)}<color=${colorMap[attribute]}><size=20>${attribute} Attribute</size></color></b>`;
  }
};

const refineText = (text) =>
  text
    .replace('"義" (blue)', `<color=${colorMap["義"]}>義</color>`)
    .replace('"愛" (orange)', `<color=${colorMap["愛"]}>愛</color>`)
    .replace('"邪" (red)', `<color=${colorMap["邪"]}>邪</color>`);

const renderRules = ({ rules }) =>
  rules && rules !== ""
    ? `\n<color=#666666>————————————————</color>\n${refineText(rules)}`
    : "";

const renderFlavor = ({ flavor }) =>
  flavor && flavor !== ""
    ? `\n<color=#666666>————————————————</color>\n<color=#CCCCCC><i>${flavor}</i></color>`
    : "";

const description = ({
  type,
  group,
  attribute,
  cost,
  powerOrSummary,
  rules,
  flavor,
}) => `<size=30>
${renderTypeCost({ type, group, attribute, cost })}
${renderAttributeRow({ type, powerOrSummary, attribute })}${renderRules({ rules })}${renderFlavor({ flavor })}</size>`;

module.exports = { description, renderTypeCost };
