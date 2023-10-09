const groupElements1 = document.querySelectorAll(
  ".highcharts-series.highcharts-tracker"
);
const selectedGroups1 = [groupElements1[2], groupElements1[6]];

const heightsCornersGet = [];

selectedGroups1.forEach((groupElement) => {
  const rectElements = groupElement.querySelectorAll("rect:nth-of-type(-n+2)");

  rectElements.forEach((rectElement) => {
    const height = parseFloat(rectElement.getAttribute("height"));
    if (!isNaN(height)) {
      heightsCornersGet.push(height);
    }
  });
});

const groupElements2 = document.querySelectorAll(
  ".highcharts-series.highcharts-tracker"
);
const selectedGroups2 = [groupElements2[3], groupElements2[7]];

const heightsCornersLost = [];

selectedGroups2.forEach((groupElement) => {
  const rectElements = groupElement.querySelectorAll("rect:nth-of-type(-n+2)");

  rectElements.forEach((rectElement) => {
    const height = parseFloat(rectElement.getAttribute("height"));
    if (!isNaN(height)) {
      heightsCornersLost.push(height);
    }
  });
});

const textElements = document.querySelectorAll("text.highcharts-title");

const textContent = [];

textElements.forEach((textElement) => {
  const tspanElement = textElement.querySelector("tspan");
  if (tspanElement) {
    textContent.push(tspanElement.textContent.trim());
  }
});

const data = {
  team2: {
    name: textContent[1],
    cornersGet: [heightsCornersGet[2], heightsCornersGet[3]],
    cornersLost: [heightsCornersLost[2], heightsCornersLost[3]],
  },
};

const jsonData = JSON.stringify(data, null, 2);

const blob = new Blob([jsonData], { type: "application/json" });

const url = URL.createObjectURL(blob);

const a = document.createElement("a");
a.href = url;
a.download = "data.json";

document.body.appendChild(a);
a.click();

URL.revokeObjectURL(url);
