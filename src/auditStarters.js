const fs = require("fs");

const allCards = JSON.parse(
  fs.readFileSync(__dirname + "/../dist/AllCards.json", "utf-8"),
);

const codeCounts = Object.fromEntries(
  allCards.map((card) => [
    card.id,
    {
      name: card.name,
      count: 0,
    },
  ]),
);

const scanFile = (filePath) => {
  const matches = fs
    .readFileSync(filePath, "utf-8")
    .matchAll(/(\d) \[(HnK1-\d\d)]/g);
  for (const match of matches) {
    codeCounts[match[2]].count += parseInt(match[1]);
  }
};

const scanDirectory = (dir) =>
  fs.readdirSync(dir).forEach((entry) => scanFile(dir + "/" + entry));

scanDirectory(__dirname + "/../dist/decks");

const sortedReport = Object.entries(codeCounts).sort(
  (a, b) => a[1] - b[1] || a[0].localeCompare(b[0]),
);

console.log(
  Object.entries(codeCounts)
    .sort((a, b) => a[1].count - b[1].count || a[0].localeCompare(b[0]))
    .map(([code, { name, count }]) => `${count} [${code}] ${name}`),
);
