/**
 * DATA STORY: GLOBAL INFLATION (2020-2024)
 * Professional Script for Milestone 4
 */

// 1. DATA PREPARATION (Based on your CSV file)
const globalInflation2024 = [
    ['au', 3.53],   // Australia
    ['at', 3.92],   // Austria
    ['az', 3.546],  // Azerbaijan
    ['al', 3.495],  // Albania
    ['dz', 7.551],  // Algeria
    ['ao', 22.004], // Angola
    ['ad', 4.266],  // Andorra
    ['ag', 2.634],  // Antigua and Barbuda
    ['ar', 249.793],// Argentina
    ['am', 3.124],  // Armenia
    ['aw', 2.345],  // Aruba
    ['af', null],   // Afghanistan
    ['bs', 2.042],  // Bahamas
    ['bd', 9.3],    // Bangladesh
    ['bb', 3.857],  // Barbados
    ['bh', 1.4],    // Bahrain
    ['by', 6.307],  // Belarus
    ['bz', 3.063],  // Belize
    ['be', 3.623],  // Belgium
    ['bj', 3.00],   // Benin
    ['ci', 3.8],    // Ivory Coast
    ['bg', 3.351],  // Bulgaria
    ['bo', 4.484],  // Bolivia
    ['ba', 3.032],  // Bosnia and Herzegovina
    ['bw', 4.02],   // Botswana
    ['br', 4.113],  // Brazil
    ['bn', 1.3],    // Brunei
    ['bf', 2.1],    // Burkina Faso
    ['bi', 21.964], // Burundi
    ['bt', 4.898],  // Bhutan
    ['vu', 7.631],  // Vanuatu
    ['gb', 2.453],  // United Kingdom
    ['hu', 3.723],  // Hungary
    ['ve', 99.981], // Venezuela
    ['tl', 3.508],  // East Timor
    ['vn', 3.74],   // Vietnam
    ['ga', 2.09],   // Gabon
    ['ht', 23.013], // Haiti
    ['gy', 2.794],  // Guyana
    ['gm', 15.123], // Gambia
    ['gh', 22.271], // Ghana
    ['gt', 4.025],  // Guatemala
    ['gn', 11.034], // Guinea
    ['gw', 3.00],   // Guinea-Bissau
    ['de', 2.406],  // Germany
    ['hn', 4.39],   // Honduras
    ['hk', 2.3],    // Hong Kong
    ['gd', 1.709],  // Grenada
    ['gr', 2.749],  // Greece
    ['ge', 2.58],   // Georgia
    ['dk', 1.459],  // Denmark
    ['cd', 17.247], // DR Congo
    ['dj', 1.811],  // Djibouti
    ['dm', 2.808],  // Dominica
    ['do', 4.229],  // Dominican Republic
    ['eg', 32.547], // Egypt
    ['zm', 11.37],  // Zambia
    ['ps', null],   // West Bank and Gaza
    ['zw', 560.981],// Zimbabwe
    ['il', 2.448],  // Israel
    ['in', 4.563],  // India
    ['id', 2.557],  // Indonesia
    ['jo', 2.72],   // Jordan
    ['iq', 4.00],   // Iraq
    ['ie', 2.38],   // Ireland
    ['ir', 37.50],  // Iran
    ['is', 5.609],  // Iceland
    ['es', 2.674],  // Spain
    ['it', 1.673],  // Italy
    ['ye', 16.909], // Yemen
    ['cv', 2.00],   // Cabo Verde
    ['kz', 8.671],  // Kazakhstan
    ['kh', 2.268],  // Cambodia
    ['cm', 5.9],    // Cameroon
    ['ca', 2.606],  // Canada
    ['qa', 2.58],   // Qatar
    ['ke', 6.601],  // Kenya
    ['cy', 2.312],  // Cyprus
    ['ki', 4.469],  // Kiribati
    ['cn', 0.97],   // China
    ['co', 6.39],   // Colombia
    ['km', 1.957],  // Comoros
    ['kr', 2.522],  // South Korea
    ['xk', 3.491],  // Kosovo
    ['cr', 0.29],   // Costa Rica
    ['kw', 3.168],  // Kuwait
    ['kg', 6.687],  // Kyrgyzstan
    ['la', 21.5],   // Laos
    ['lv', 1.954],  // Latvia
    ['ls', 6.384],  // Lesotho
    ['lr', 6.344],  // Liberia
    ['lb', null],   // Lebanon
    ['ly', 2.863],  // Libya
    ['lt', 1.46],   // Lithuania
    ['lu', 2.539],  // Luxembourg
    ['mu', 4.901],  // Mauritius
    ['mr', 2.785],  // Mauritania
    ['mg', 7.789],  // Madagascar
    ['mo', 1.7],    // Macao
    ['mw', 27.892]  // Malawi
];

const kzTrend = {
    years: ['2020', '2021', '2022', '2023', '2024'],
    rates: [6.79, 8.00, 14.95, 14.55, 8.67]
};

// 2. INITIALIZE CHARTS ON LOAD
window.onload = function () {
    initMap();
    initBarChart();
    initLineChart();
};

// --- MAP FUNCTION (Highcharts) ---
function initMap() {
    if (typeof Highcharts !== 'undefined' && Highcharts.maps['custom/world']) {
        Highcharts.mapChart('container-map', {
            chart: {
                map: 'custom/world',
                backgroundColor: 'transparent',
                style: { fontFamily: 'Arial' }
            },
            title: { text: '' },
            credits: { enabled: false },
            mapNavigation: {
                enabled: true,
                buttonOptions: { verticalAlign: 'bottom' }
            },
            colorAxis: {
                min: 0,
                max: 40, // Cap color intensity at 40% so Argentina doesn't wash out others
                stops: [
                    [0, '#d4edda'],   // Stable (Green)
                    [0.2, '#fff3cd'], // Moderate (Yellow)
                    [0.5, '#f8d7da'], // High (Orange)
                    [1, '#721c24']    // Critical (Dark Red)
                ]
            },
            series: [{
                data: globalInflation2024,
                name: 'Inflation Rate 2024',
                states: {
                    hover: { color: '#ff4a4a' }
                },
                dataLabels: {
                    enabled: false
                },
                tooltip: {
                    valueSuffix: '%'
                }
            }]
        });
    } else {
        console.error("Highcharts Map Data not found.");
        document.getElementById('container-map').innerHTML =
            "<p style='padding:20px; color:red;'>Map display error: Make sure you have an active internet connection to load the World Map scripts.</p>";
    }
}

// --- BAR CHART FUNCTION (Chart.js) ---
function initBarChart() {
    const ctx = document.getElementById('barChart');
    if (!ctx) return;

    new Chart(ctx.getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Argentina', 'Iran', 'Kazakhstan', 'Austria'],
            datasets: [{
                label: 'Inflation Rate 2024 (%)',
                data: [249.79, 37.5, 8.67, 3.92],
                backgroundColor: ['#721c24', '#e67e22', '#3498db', '#2ecc71'],
                borderRadius: 5
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Percent (%)' }
                }
            }
        }
    });
}

// --- LINE CHART FUNCTION (Chart.js) ---
function initLineChart() {
    const ctx = document.getElementById('lineChart');
    if (!ctx) return;

    new Chart(ctx.getContext('2d'), {
        type: 'line',
        data: {
            labels: kzTrend.years,
            datasets: [{
                label: 'Kazakhstan Inflation',
                data: kzTrend.rates,
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointRadius: 5,
                pointBackgroundColor: '#2980b9'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Inflation Rate (%)' }
                }
            }
        }
    });
}
