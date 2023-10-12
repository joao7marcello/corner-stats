// Function to calculate the sum of an array
function calculateSum(array) {
  return array.reduce((sum, value) => sum + value, 0);
}

// Fetch the JSON data from combined.json
fetch("combined.json")
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
        team1: "Heidenheim @ Home",
        team2: "Augsburg @ Away",
      },
      {
        team1: "Cologne @ Home",
        team2: "Borussia Monchengladbach @ Away",
      },
      {
        team1: "Mainz @ Home",
        team2: "Bayern Munich @ Away",
      },
      {
        team1: "Union Berlin @ Home",
        team2: "VfB Stuttgart @ Away",
      },
      {
        team1: "SC Freiburg @ Home",
        team2: "Bochum @ Away",
      },
      {
        team1: "Wolfsburg @ Home",
        team2: "Bayer Leverkusen @ Away",
      },
      {
        team1: "TSG Hoffenheim @ Home",
        team2: "Eintracht Frankfurt @ Away",
      },
      {
        team1: "Darmstadt @ Home",
        team2: "RB Leipzig @ Away",
      },
      {
        team1: "Borussia Dortmund @ Home",
        team2: "Werder Bremen @ Away",
      },
      // Add more games here
    ];

    // Calculate and display the game sums
    const gameSumsTableBody = document.querySelector("#gameSumsTable tbody");
    gamesToAnalyze.forEach((game) => {
      const gameSum = calculateGameSum(game);
      const row = document.createElement("tr");
      row.innerHTML = `
                          <td>${gameSum.gameName}</td>
                          <td>${gameSum.forHomeTeam}</td>
                          <td>${gameSum.forAwayTeam}</td>
                      `;
      gameSumsTableBody.appendChild(row);
    });

    // Sort the "Game Sums" table by the bigger of the two numbers in descending order
    const gameSumsTable = document.querySelector("#gameSumsTable");
    const gameSumsTableBodyRows = Array.from(
      gameSumsTable.querySelectorAll("tbody tr")
    );

    gameSumsTableBodyRows.sort((a, b) => {
      const combinedSumA = Math.max(
        parseFloat(a.children[1].textContent),
        parseFloat(a.children[2].textContent)
      );
      const combinedSumB = Math.max(
        parseFloat(b.children[1].textContent),
        parseFloat(b.children[2].textContent)
      );

      return combinedSumB - combinedSumA;
    });

    gameSumsTableBody.innerHTML = "";

    gameSumsTableBodyRows.forEach((row, index) => {
      row.children[0].textContent = `${index + 1}º ${
        row.children[0].textContent
      }`;
      gameSumsTableBody.appendChild(row);
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));
