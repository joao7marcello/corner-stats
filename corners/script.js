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

// Find the Highcharts chart for the away team
const awayChart = $("#away_distribution_chart").highcharts();

// Extract the team name from the away chart's title
const awayTeamName = awayChart.title.textStr;

// Access the data for "Corner Get" and "Corner Lost" series for the away team
const awayCornerGetSeries = awayChart.series.find(
  (series) => series.name === "Corner Get"
);
const awayCornerLostSeries = awayChart.series.find(
  (series) => series.name === "Corner Lost"
);

// Extract the data points from the series for the away team
const awayCornerGetData = awayCornerGetSeries.data.map((point) => point.y);
const awayCornerLostData = awayCornerLostSeries.data.map((point) => point.y);

// Access the data at positions 0 and 1 for the away team
const awayCornerGetFirstValue = awayCornerGetData[0];
const awayCornerGetSecondValue = awayCornerGetData[1];

const awayCornerLostFirstValue = awayCornerLostData[0];
const awayCornerLostSecondValue = awayCornerLostData[1];

// Create objects with the extracted data for both teams
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

// Merge the data for both teams into one object
const data = { ...homeData, ...awayData };

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
