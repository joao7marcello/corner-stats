const homeChart = $("#away_distribution_chart").highcharts();

const homeTeamName = homeChart.title.textStr;

const homeCornerGetSeries = homeChart.series.find(
  (series) => series.name === "Corner Get"
);
const homeCornerLostSeries = homeChart.series.find(
  (series) => series.name === "Corner Lost"
);

const homeCornerGetData = homeCornerGetSeries.data.map((point) => point.y);
const homeCornerLostData = homeCornerLostSeries.data.map((point) => point.y);

const homeCornerGetFirstValue = homeCornerGetData[0];
const homeCornerGetSecondValue = homeCornerGetData[1];

const homeCornerLostFirstValue = homeCornerLostData[0];
const homeCornerLostSecondValue = homeCornerLostData[1];

const data = {
  team1: {
    name: homeTeamName,
    cornersGet: [homeCornerGetFirstValue, homeCornerGetSecondValue],
    cornersLost: [homeCornerLostFirstValue, homeCornerLostSecondValue],
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
