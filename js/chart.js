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
            backgroundColor: '',
            borderColor: 'white',
            pointBackgroundColor: 'white',
            pointBorderColor: 'white',
        }]
        },
    options: {
        elements: {
        line: {
            borderWidth: 2
        }
        }
    },
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
            backgroundColor: '',
            borderColor: 'white',
            pointBackgroundColor: 'white',
            pointBorderColor: 'white',
        }]
        },
    options: {
        elements: {
        line: {
            borderWidth: 3
        }
        }
    },
    });