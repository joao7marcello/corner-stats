// Find the Highcharts chart for the home team
const homeChart = $("#home_distribution_chart").highcharts();

// Extract the team name from the home chart's title
const homeTeamName = homeChart.title.textStr;

// Access the data for "Corner Get" and "Corner Lost" series for the home team
const homeCornerGetSeries = homeChart.series.find(
  (series) => series.name === "Corner Get"
);
const homeCornerLostSeries = homeChart.series.find(
  (series) => series.name === "Corner Lost"
);

// Extract the data points from the series for the home team
const homeCornerGetData = homeCornerGetSeries.data.map((point) => point.y);
const homeCornerLostData = homeCornerLostSeries.data.map((point) => point.y);

// Access the data at positions 0 and 1 for the home team
const homeCornerGetFirstValue = homeCornerGetData[0];
const homeCornerGetSecondValue = homeCornerGetData[1];

const homeCornerLostFirstValue = homeCornerLostData[0];
const homeCornerLostSecondValue = homeCornerLostData[1];

// Create the data object directly as required
const data = {
  team1: {
    name: homeTeamName,
    cornersGet: [homeCornerGetFirstValue, homeCornerGetSecondValue],
    cornersLost: [homeCornerLostFirstValue, homeCornerLostSecondValue],
  },
};

// Format the data as JSON
const jsonData = JSON.stringify(data, null, 2);

// Create a Blob and download link
const blob = new Blob([jsonData], { type: "application/json" });
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = "data.json";

// Trigger the download
document.body.appendChild(a);
a.click();

// Revoke the URL to free up resources
URL.revokeObjectURL(url);
