const api = 'https://disease.sh/v3/covid-19/historical/all?lastdays=90';

const getData = async () => {
  const response = await fetch(`${api}`);
  if (response.ok) {
    return await response.json();
  } else {
    return Promise.reject(response.status);
  }
};

const result = getData();
result
  .then((data) => {
    let date = Object.keys(data.cases);
    let total = Object.values(data.cases);
    let deaths = Object.values(data.deaths);
    let recovered = Object.values(data.recovered);

    var ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: date,
        datasets: [
          {
            label: 'Total Cases',
            data: total,
            borderColor: 'blue',
            fill: false,
          },
          {
            label: 'Recovered Cases',
            data: recovered,
            borderColor: 'green',
            fill: false,
          },
          {
            label: 'Deaths',
            data: deaths,
            borderColor: 'red',
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Numbers in Thousands',
              },
            },
          ],
          xAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: 'Date(DD/MM/YYYY)',
              },
            },
          ],
        },
      },
    });
  })
  .catch((error) => {
    console.log('Error: ', error);
  });