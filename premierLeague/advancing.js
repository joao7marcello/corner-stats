// Function to calculate the sum of an array
function calculateSum(array) {
  return array.reduce((sum, value) => sum + value, 0);
}

// Fetch the JSON data from combined.json
fetch("combinedPL.json")
  .then((response) => response.json())
  .then((data) => {
    // Flatten the JSON data and create arrays for sums of Corners Get and Corners Lost
    const sumsCornersGet = [];
    const sumsCornersLost = [];

    data.forEach((item) => {
      const name1 = item.team1 && item.team1.name ? item.team1.name : "";
      const sumCornersGet1 =
        item.team1 && item.team1.cornersGet
          ? calculateSum(item.team1.cornersGet)
          : 0;
      const sumCornersLost1 =
        item.team1 && item.team1.cornersLost
          ? calculateSum(item.team1.cornersLost)
          : 0;

      if (sumCornersGet1 > 0) {
        sumsCornersGet.push({ name: name1, sum: sumCornersGet1 });
      }
      if (sumCornersLost1 > 0) {
        sumsCornersLost.push({ name: name1, sum: sumCornersLost1 });
      }

      const name2 = item.team2 && item.team2.name ? item.team2.name : "";
      const sumCornersGet2 =
        item.team2 && item.team2.cornersGet
          ? calculateSum(item.team2.cornersGet)
          : 0;
      const sumCornersLost2 =
        item.team2 && item.team2.cornersLost
          ? calculateSum(item.team2.cornersLost)
          : 0;

      if (sumCornersGet2 > 0) {
        sumsCornersGet.push({ name: name2, sum: sumCornersGet2 });
      }
      if (sumCornersLost2 > 0) {
        sumsCornersLost.push({ name: name2, sum: sumCornersLost2 });
      }
    });

    // Calculate the minimum and maximum sums
    const minCornersGet = Math.min(...sumsCornersGet.map((team) => team.sum));
    const maxCornersGet = Math.max(...sumsCornersGet.map((team) => team.sum));
    const minCornersLost = Math.min(...sumsCornersLost.map((team) => team.sum));
    const maxCornersLost = Math.max(...sumsCornersLost.map((team) => team.sum));

    // Normalize the sums using the provided formula
    sumsCornersGet.forEach((team) => {
      team.normalizedSum =
        ((team.sum - minCornersGet) / (maxCornersGet - minCornersGet)) * 100;
    });

    sumsCornersLost.forEach((team) => {
      team.normalizedSum =
        ((team.sum - minCornersLost) / (maxCornersLost - minCornersLost)) * 100;
    });

    // Sort the normalized sums tables in descending order
    sumsCornersGet.sort((a, b) => b.normalizedSum - a.normalizedSum);
    sumsCornersLost.sort((a, b) => b.normalizedSum - a.normalizedSum);

    // Create and populate the Normalized Corners Get table
    const cornersGetTableBody = document.querySelector(
      "#cornersGetTable tbody"
    );
    sumsCornersGet.forEach((team) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                        <td>${team.name || "-"}</td>
                        <td>${team.normalizedSum.toFixed(2)}</td>
                    `;
      cornersGetTableBody.appendChild(row);
    });

    // Create and populate the Normalized Corners Lost table
    const cornersLostTableBody = document.querySelector(
      "#cornersLostTable tbody"
    );
    sumsCornersLost.forEach((team) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                        <td>${team.name || "-"}</td>
                        <td>${team.normalizedSum.toFixed(2)}</td>
                    `;
      cornersLostTableBody.appendChild(row);
    });

    // Function to calculate the game sums
    function calculateGameSum(game) {
      const team1Name = game.team1;
      const team2Name = game.team2;

      const team1CornersGet =
        sumsCornersGet.find((team) => team.name === team1Name)?.normalizedSum ||
        0;
      const team2CornersGet =
        sumsCornersGet.find((team) => team.name === team2Name)?.normalizedSum ||
        0;
      const team1CornersLost =
        sumsCornersLost.find((team) => team.name === team1Name)
          ?.normalizedSum || 0;
      const team2CornersLost =
        sumsCornersLost.find((team) => team.name === team2Name)
          ?.normalizedSum || 0;

      // Calculate the sum of (team1 @ home corners get + team2 @ away corners lost) and (team1 @ home corners lost + team2 @ away corners get)
      const sumCornersGet = team1CornersGet + team2CornersLost;
      const sumCornersLost = team1CornersLost + team2CornersGet;

      return {
        gameName: `${team1Name} vs ${team2Name}`,
        forHomeTeam: sumCornersGet.toFixed(2),
        forAwayTeam: sumCornersLost.toFixed(2),
      };
    }

    // List of games to analyze
    const gamesToAnalyze = [
      {
        team1: "Liverpool @ Home",
        team2: "Everton @ Away",
      },
      {
        team1: "Man City @ Home",
        team2: "Brighton @ Away",
      },
      {
        team1: "Nottm Forest @ Home",
        team2: "Luton @ Away",
      },
      {
        team1: "Brentford @ Home",
        team2: "Burnley @ Away",
      },
      {
        team1: "Bournemouth @ Home",
        team2: "Wolverhampton @ Away",
      },
      {
        team1: "Newcastle @ Home",
        team2: "Crystal Palace @ Away",
      },
      {
        team1: "Chelsea @ Home",
        team2: "Arsenal @ Away",
      },
      {
        team1: "Sheff Utd @ Home",
        team2: "Man Utd @ Away",
      },
      {
        team1: "Aston Villa @ Home",
        team2: "West Ham @ Away",
      },
      {
        team1: "Tottenham @ Home",
        team2: "Fulham @ Away",
      },
      // Add more games here
    ];
    // Function to calculate the game sums
    // Function to calculate the game sums
    function calculateGameSum(game) {
      const team1Name = game.team1;
      const team2Name = game.team2;

      const team1CornersGetHome =
        sumsCornersGet.find((team) => team.name === team1Name)?.normalizedSum ||
        0;
      const team2CornersLostAway =
        sumsCornersLost.find((team) => team.name === team2Name)
          ?.normalizedSum || 0;
      const team1CornersLostHome =
        sumsCornersLost.find((team) => team.name === team1Name)
          ?.normalizedSum || 0;
      const team2CornersGetAway =
        sumsCornersGet.find((team) => team.name === team2Name)?.normalizedSum ||
        0;

      // Calculate the sum of normalized sums
      const sumCornersGetForHomeTeam = (
        team1CornersGetHome + team2CornersLostAway
      ).toFixed(2);
      const sumCornersGetForAwayTeam = (
        team2CornersGetAway + team1CornersLostHome
      ).toFixed(2);

      return [
        {
          gameName: `${team1Name} vs ${team2Name}`,
          value: sumCornersGetForHomeTeam,
          team: "For Home Team",
        },
        {
          gameName: `${team1Name} vs ${team2Name}`,
          value: sumCornersGetForAwayTeam,
          team: "For Away Team",
        },
      ];
    }

    // Calculate and display the game sums
    const gameSumsTableBody = document.querySelector("#gameSumsTable tbody");
    gamesToAnalyze.forEach((game) => {
      const gameSums = calculateGameSum(game);
      gameSums.forEach((gameSum) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${gameSum.gameName}</td>
        <td>${gameSum.value} ${gameSum.team}</td>
    `;
        gameSumsTableBody.appendChild(row);
      });
    });

    // Sort the "Game Sums" table by the bigger of the two values in descending order
    const gameSumsTable = document.querySelector("#gameSumsTable");
    const gameSumsTableBodyRows = Array.from(
      gameSumsTable.querySelectorAll("tbody tr")
    );

    gameSumsTableBodyRows.sort((a, b) => {
      const valueA = parseFloat(a.children[1].textContent.split(" ")[0]);
      const valueB = parseFloat(b.children[1].textContent.split(" ")[0]);

      return valueB - valueA;
    });

    gameSumsTableBody.innerHTML = "";

    gameSumsTableBodyRows.forEach((row, index) => {
      row.children[0].textContent = `${index + 1}º ${
        row.children[0].textContent
      }`;
      gameSumsTableBody.appendChild(row);
    });
  });
