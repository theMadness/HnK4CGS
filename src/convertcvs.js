const fs = require("fs");
const csv = require("csv-parser");
const { description } = require("./description");

const results = [];

// prettier-ignore
const deckAttributeCorrespondences = {
    "0": [
        "0",
        "R", "L", "S", "U", "E",
        "RL", "LS", "SU", "UE", "ER", "RS", "LU", "SE", "UR", "EL",
        "RLS", "LSU", "SUE", "UER", "ERL", "RSU", "LUE", "SER", "URL", "ELS",
        "RLSU", "LSUE", "SUER", "UERL", "ERLS",
        "RLSUE"
    ],
    "R": [
        "R", "RL", "ER", "RS", "UR", "RLS", "UER", "ERL", "RSU", "SER", "URL", "RLSU", "SUER", "UERL", "ERLS", "RLSUE"
    ],
    "L": [
        "L", "RL", "LS", "LU", "EL", "RLS", "LSU", "ERL", "LUE", "URL", "ELS", "RLSU", "LSUE", "UERL", "ERLS", "RLSUE"
    ],
    "S": [
        "S", "LS", "SU", "RS", "SE", "RLS", "LSU", "SUE", "RSU", "SER", "ELS", "RLSU", "LSUE", "SUER", "ERLS", "RLSUE"
    ],
    "U": [
        "U", "SU", "UE", "LU", "UR", "LSU", "SUE", "UER", "RSU", "LUE", "URL", "RLSU", "LSUE", "SUER", "UERL", "RLSUE"
    ],
    "E": [
        "E", "UE", "ER", "SE", "EL", "SUE", "UER", "ERL", "LUE", "SER", "ELS", "LSUE", "SUER", "UERL", "ERLS", "RLSUE"
    ],
    "RL": ["RL", "RLS", "ERL", "URL", "RLSU", "UERL", "ERLS", "RLSUE"],
    "LR": ["RL", "RLS", "ERL", "URL", "RLSU", "UERL", "ERLS", "RLSUE"],
    "LS": ["LS", "RLS", "LSU", "ELS", "RLSU", "LSUE", "ERLS", "RLSUE"],
    "SL": ["LS", "RLS", "LSU", "ELS", "RLSU", "LSUE", "ERLS", "RLSUE"],
    "UE": ["UE", "SUE", "UER", "LUE", "LSUE", "SUER", "UERL", "RLSUE"],
    "EU": ["UE", "SUE", "UER", "LUE", "LSUE", "SUER", "UERL", "RLSUE"],
};

// prettier-ignore
const translateCostSymbol = (symbol) => ({
  '⏺': 'G', // generic
  '義': 'R', // righteousness
  '愛': 'L', // love
  '流': 'S', // style
  '覇': 'U', // supremacy
  '邪': 'E'  // evil
})[symbol?.trim()] || "";

const getDeckAttributes = (costSymbols) =>
  deckAttributeCorrespondences[
    costSymbols
      .map(translateCostSymbol)
      .filter((v, i, a) => a.indexOf(v) === i)
      .join("")
      .replace(/G/g, "")
  ] || deckAttributeCorrespondences["0"];

const getCost = (data) =>
  ["Cost3", "Cost2", "Cost1"]
    .map((key) => translateCostSymbol(data[key]))
    .join("");
const getId = (data) => data["Number"]?.padStart(2, "0") || "00";
const getSetCode = () => "HnK1";
const getImage = (data) =>
  `https://cgs.games/api/proxy/drive.google.com/uc?export=download&id=${imageMap[`${getSetCode()}-${getId(data)}.png`]}`;
const getType = (data) => data["Type"]?.trim().charAt(0) || "";
const getCostValue = (data) =>
  ["Cost3", "Cost2", "Cost1"].reduce(
    (acc, key) => acc + (data[key]?.trim() ? 1 : 0),
    0,
  );
const getAttributeCostType = (data) => [
  ...new Set(
    ["Cost3", "Cost2", "Cost1"]
      .map((key) => data[key]?.trim())
      .filter((val) => val && val !== "⏺"),
  ),
];
const getPower = (data) =>
  getType(data) === "C" ? parseInt(data["Power/Summary"], 10) || null : null;
const getRarity = (data) =>
  data["Rarity"]?.trim() === "" ? " " : data["Rarity"];
const getRules = (data) => data["Text"] || "";
const getSchool = (data) => data["Style"]?.replace(/\s+/g, "") || "";

const imageMap = {};

fs.createReadStream(__dirname + "/ImageCatalog.csv")
  .pipe(csv())
  .on("data", (data) => {
    imageMap[data["Filename"]] = data["DriveId"];
  })
  .on("end", () => {
    console.log("Image Map complete.");
    // console.log(JSON.stringify(imageMap));
    fs.createReadStream(__dirname + "/CardData.csv")
      .pipe(csv())
      .on("data", (data) => {
        results.push({
          id: `${getSetCode()}-${getId(data)}`,
          collector: getId(data),
          deckFileTxtId: `${data["Name"]} (${getSetCode()}-${getId(data)})`,
          setCode: getSetCode(),
          name: data["Name"] || "",
          image: getImage(data),
          description: description(data),
          attribute: data["Attribute"] || "",
          attributeCostType: getAttributeCostType(data),
          deckAttributes: getDeckAttributes(
            ["Cost3", "Cost2", "Cost1"].map((key) => data[key]),
          ),
          cost: getCost(data),
          costValue: getCostValue(data),
          type: getType(data),
          school: getSchool(data),
          rules: getRules(data),
          flavor: data["Flavor"] || "",
          power: getPower(data),
          rarity: getRarity(data),
        });
      })
      .on("end", () => {
        fs.writeFileSync(
          __dirname + "/../dist/AllCards.json",
          JSON.stringify(results, null, 2),
        );
        console.log("Conversion complete!");
      });
  });
