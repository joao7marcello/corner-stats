const homeChart = $("#home_distribution_chart").highcharts();

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

const awayChart = $("#away_distribution_chart").highcharts();

const awayTeamName = awayChart.title.textStr;

const awayCornerGetSeries = awayChart.series.find(
  (series) => series.name === "Corner Get"
);
const awayCornerLostSeries = awayChart.series.find(
  (series) => series.name === "Corner Lost"
);

const awayCornerGetData = awayCornerGetSeries.data.map((point) => point.y);
const awayCornerLostData = awayCornerLostSeries.data.map((point) => point.y);

const awayCornerGetFirstValue = awayCornerGetData[0];
const awayCornerGetSecondValue = awayCornerGetData[1];

const awayCornerLostFirstValue = awayCornerLostData[0];
const awayCornerLostSecondValue = awayCornerLostData[1];

const homeData = {
  team1: {
    name: homeTeamName,
    cornersGet: [homeCornerGetFirstValue, homeCornerGetSecondValue],
    cornersLost: [homeCornerLostFirstValue, homeCornerLostSecondValue],
  },
};

const awayData = {
  team2: {
    name: awayTeamName,
    cornersGet: [awayCornerGetFirstValue, awayCornerGetSecondValue],
    cornersLost: [awayCornerLostFirstValue, awayCornerLostSecondValue],
  },
};

const data = { ...homeData, ...awayData };

const jsonData = JSON.stringify(data, null, 2);

const blob = new Blob([jsonData], { type: "application/json" });
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = "data.json";

document.body.appendChild(a);
a.click();

URL.revokeObjectURL(url);
