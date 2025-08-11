const estimateStringWidth = require("./estimateStringWidth");

// prettier-ignore
const colorMap = {
  "義": "#92E0FF", // Justice
  "愛": "#FFA500", // Love
  "流": "#97FF7A", // Flow
  "覇": "#A480FF", // Hegemony
  "邪": "#FF6745", // Wickedness
  "generic": "#D6D0B5",
  "counter": "#FF6666",
  "separator": "#666666",
  "flavor": "#CCCCCC",
};

const lineWidth = 370;
const baseFontSize = 28;
const pwrLabelSize = 20;
const attributeSize = 20;

const linePad = (usedWidth, size = baseFontSize) =>
  " ".repeat(
    Math.max(0, lineWidth - usedWidth) /
      estimateStringWidth({ string: " ", size }),
  );

/**
 * @param {Object} input
 * @param {string} input.type
 * @param {string} input.group
 * @param {string} input.attribute
 * @param {string[]} input.cost
 * @returns string
 */
const renderTypeCost = ({ type, group, attribute, cost }) => {
  const typeLine = group ? `${type} — ${group}` : type;
  const costMarkup =
    "<b>" +
    cost
      .map((c) =>
        c === "⏺"
          ? `<color=${colorMap.generic}>Ｏ</color>`
          : `<color=${colorMap[c]}>${c}</color>`,
      )
      .join("") +
    "</b>";

  const typeWidth = estimateStringWidth({
    string: typeLine,
    size: baseFontSize,
  });
  const costWidth = estimateStringWidth({
    string: cost.join(""),
    size: baseFontSize,
  });

  return `<color=${colorMap[attribute]}>${typeLine}</color>${linePad(typeWidth + costWidth)}${costMarkup}`;
};

const renderAttributeRow = ({ type, powerOrSummary, attribute }) => {
  const attr = {
    markup: `<color=${colorMap[attribute]}><size=${attributeSize}>${attribute} attribute</size></color>`,
    width: estimateStringWidth({
      string: `${attribute} attribute`,
      size: attributeSize,
    }),
  };
  const pwrLabel = {
    markup: `<size=${pwrLabelSize}>PWR</size>`,
    width: estimateStringWidth({ string: `PWR`, size: pwrLabelSize }),
  };
  const counter = {
    markup: `<color=${colorMap.counter}>COUNTER</color>`,
    width: estimateStringWidth({ string: `PWR`, size: baseFontSize }),
  };

  switch (true) {
    case type === "Character":
      return (
        `<b>${pwrLabel.markup}${linePad(pwrLabel.width + attr.width)}${attr.markup}</b>` +
        `\n<b>【${powerOrSummary}】${linePad(estimateStringWidth({ string: `【${powerOrSummary}】`, size: baseFontSize }))}</b>`
      );
    case powerOrSummary.includes("COUNTER"):
      return `<b>${counter.markup}${linePad(counter.width + attr.width)}${attr.markup}</b>`;
    default:
      return `<b>${linePad(attr.width)}${attr.markup}</b>`;
  }
};

const refineText = (text) =>
  text
    .replace('"義" (blue)', `<color=${colorMap["義"]}>義</color>`)
    .replace('"愛" (orange)', `<color=${colorMap["愛"]}>愛</color>`)
    .replace('"邪" (red)', `<color=${colorMap["邪"]}>邪</color>`)
    .replace("⚔️", `2˟`)
    .replace("➰", `↻`)
    .replace("🗲", `↯︎`)
    .replace("˟✊", `˟A`)
    .replace("˟🎴", `˟D`)
    .replace(/^・ (.{1,20}): /gm, `・ <b><i>[$1]</i></b> — `)
    .replace("🗑", `✘`);

const renderRules = ({ rules }) =>
  rules && rules !== ""
    ? `\n<color=${colorMap.separator}>————————————————</color>\n${refineText(rules)}`
    : "";

const renderFlavor = ({ flavor }) =>
  flavor && flavor !== ""
    ? `\n<color=${colorMap.separator}>————————————————</color>\n<color=${colorMap.flavor}><i>${flavor}</i></color>`
    : "";

const description = ({
  type,
  group,
  attribute,
  cost,
  powerOrSummary,
  rules,
  flavor,
}) => `<size=${baseFontSize}>
${renderTypeCost({ type, group, attribute, cost })}
${renderAttributeRow({ type, powerOrSummary, attribute })}${renderRules({ rules })}${renderFlavor({ flavor })}</size>`;

const nameFormat = ({ name, attribute }) =>
  `<color=${colorMap[attribute]}>${name}</color>\n`;

module.exports = { nameFormat, description, renderTypeCost };
