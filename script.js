async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts'); // Replace with your API endpoint
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function createChart(data) {
    const userIds = data.map(item => item.userId);
    const postCounts = userIds.reduce((countMap, userId) => {
        const group = Math.floor(userId / 10) * 10; 
        countMap[group] = (countMap[group] || 0) + 1;
        return countMap;
    }, {});

    const labels = Object.keys(postCounts).map(group => `${group}-${group + 9}`);
    const values = Object.values(postCounts);

    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of Posts (Grouped by 10 Users)',
                data: values,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 3,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
                
            },
            plugins: {
                datalabels: {
                    align: 'end',
                    anchor: 'end',
                    font: {
                        size: 14,
                    },
                    formatter: function(value) {
                        return `${value} Posts`;
                    }
                }
            }
        }
    });
}

// Fetch data and create the chart
fetchData().then(data => {
    if (data) {
        createChart(data);
    }
});
