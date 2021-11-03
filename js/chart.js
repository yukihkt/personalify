var chart1 = document.getElementById("musictraitschart");
var myChart1 = new Chart(chart1, {
    type: 'radar',
    data: {
        labels: [
            'Duration',
            'Acousticness',
            'Danceability',
            'Instrumentalness',
            'Loudness',
            'Speechiness',
            'Valence',
            'Tempo'
        ],
        datasets: [{
            label: 'Your Music Traits',
            data: [65, 59, 90, 81, 56, 55, 40,90],
            fill: true,
            backgroundColor: "rgba(86,189,102,0.8)",
            pointBorderWidth: 5,
            borderColor: 'green',
            pointBorderColor: 'green',
        }]
        },
    options: {
        title: {
            display: true,
            text: 'Your Music Traits'
        },
        scale: {
            r: {
                angleLines: {
                    color: "gba(86,189,102)"
                },
                grid: {
                    color: "gba(86,189,102)"
                },
                gridLines: {
                    color: ['black', 'red', 'orange', 'yellow']
                
                },
                pointLabels: {
                    color:"gba(86,189,102)"
                },
                ticks :{
                    color: "gba(86,189,102)"
                }
            }
        },
        elements: {
        line: {
            borderWidth: 2,
            color: "green"
        }
        }
    }
    });

var chart2 = document.getElementById("personalitytraits");
var myChart2 = new Chart(chart2, {
    type: 'radar',
    data: {
        labels: [
            'Extraversion',
            'Agreeableness',
            'Conscientiousness',
            'Neuroticism',
            'Openness to Experience'
        ],
        datasets: [{
            label: 'Your Personality Traits',
            data: [65, 59, 90, 81, 56],
            fill: true,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)'],
            borderColor: 'green',
            pointBorderColor: 'green',
        }]
    },
    options: {
        title: {
            display: true,
            text: 'Your Personality Traits'
        },
        legend: {
            labels: {
                // This more specific font property overrides the global property
                font: {
                    size: 50
                }
            }
        },
        scales: {
            r: {
                angleLines: {
                    color: "green"
                },
                grid: {
                    color: "green"
                },
                pointLabels: {
                    color: "white"
                },
                ticks :{
                    color: "white"
                }
            }
        },
        elements: {
            line: {
                borderWidth: 2,
                color: "white"
            }
            
        }
    }
    });