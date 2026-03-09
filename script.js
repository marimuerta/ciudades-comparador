// Base de datos de ciudades
const ciudadesData = {
    madrid: {
        nombre: 'Madrid',
        poblacion: 3281900,
        densidad: 5432,
        fundacion: 1083,
        monumentos: 15,
        evolucionPoblacion: {
            años: [1950, 1970, 1990, 2000, 2010, 2020, 2026],
            poblacion: [1618000, 2900000, 3121000, 2938000, 3223000, 3280000, 3281900]
        }
    },
    barcelona: {
        nombre: 'Barcelona',
        poblacion: 1620343,
        densidad: 16008,
        fundacion: 1137,
        monumentos: 18,
        evolucionPoblacion: {
            años: [1950, 1970, 1990, 2000, 2010, 2020, 2026],
            poblacion: [1280000, 1745000, 1643000, 1496000, 1615000, 1620000, 1620343]
        }
    },
    valencia: {
        nombre: 'Valencia',
        poblacion: 1604872,
        densidad: 5156,
        fundacion: 138,
        monumentos: 12,
        evolucionPoblacion: {
            años: [1950, 1970, 1990, 2000, 2010, 2020, 2026],
            poblacion: [637000, 746000, 777000, 739000, 809000, 1604000, 1604872]
        }
    },
    sevilla: {
        nombre: 'Sevilla',
        poblacion: 1538985,
        densidad: 3056,
        fundacion: 712,
        monumentos: 14,
        evolucionPoblacion: {
            años: [1950, 1970, 1990, 2000, 2010, 2020, 2026],
            poblacion: [376000, 550000, 683000, 701000, 704000, 1539000, 1538985]
        }
    },
    bilbao: {
        nombre: 'Bilbao',
        poblacion: 345122,
        densidad: 8956,
        fundacion: 1300,
        monumentos: 10,
        evolucionPoblacion: {
            años: [1950, 1970, 1990, 2000, 2010, 2020, 2026],
            poblacion: [250000, 408000, 383000, 354000, 353000, 345000, 345122]
        }
    },
    palma: {
        nombre: 'Palma de Mallorca',
        poblacion: 409602,
        densidad: 2189,
        fundacion: 1229,
        monumentos: 8,
        evolucionPoblacion: {
            años: [1950, 1970, 1990, 2000, 2010, 2020, 2026],
            poblacion: [101000, 216000, 320000, 359000, 401000, 409000, 409602]
        }
    },
    malaga: {
        nombre: 'Málaga',
        poblacion: 578460,
        densidad: 3892,
        fundacion: 1500,
        monumentos: 9,
        evolucionPoblacion: {
            años: [1950, 1970, 1990, 2000, 2010, 2020, 2026],
            poblacion: [178000, 304000, 503000, 534000, 568000, 578000, 578460]
        }
    },
    murcia: {
        nombre: 'Murcia',
        poblacion: 438887,
        densidad: 2943,
        fundacion: 825,
        monumentos: 7,
        evolucionPoblacion: {
            años: [1950, 1970, 1990, 2000, 2010, 2020, 2026],
            poblacion: [201000, 254000, 367000, 389000, 438000, 438000, 438887]
        }
    }
};

let chart = null;

// Elementos del DOM
const city1Select = document.getElementById('city1');
const city2Select = document.getElementById('city2');
const comparisonSection = document.getElementById('comparisonSection');

// Event listeners
city1Select.addEventListener('change', actualizarComparacion);
city2Select.addEventListener('change', actualizarComparacion);

function actualizarComparacion() {
    const city1 = city1Select.value;
    const city2 = city2Select.value;

    // Mostrar sección de comparación solo si ambas ciudades están seleccionadas
    if (city1 && city2 && city1 !== city2) {
        comparisonSection.style.display = 'block';
        mostrarDatos(city1, 'card1', '1');
        mostrarDatos(city2, 'card2', '2');
        actualizarGrafica(city1, city2);
    } else if (city1 === city2 && city1) {
        alert('Por favor, selecciona dos ciudades diferentes');
        if (city1 === city2) {
            city2Select.value = '';
        }
        comparisonSection.style.display = 'none';
    } else {
        comparisonSection.style.display = 'none';
    }
}

function mostrarDatos(cityKey, cardId, suffix) {
    const ciudad = ciudadesData[cityKey];
    
    document.getElementById(`name${suffix}`).textContent = ciudad.nombre;
    document.getElementById(`population${suffix}`).textContent = 
        ciudad.poblacion.toLocaleString('es-ES') + ' hab.';
    document.getElementById(`density${suffix}`).textContent = 
        ciudad.densidad.toLocaleString('es-ES');
    document.getElementById(`founded${suffix}`).textContent = ciudad.fundacion;
    document.getElementById(`monuments${suffix}`).textContent = ciudad.monumentos;
}

function actualizarGrafica(city1Key, city2Key) {
    const ciudad1 = ciudadesData[city1Key];
    const ciudad2 = ciudadesData[city2Key];

    const ctx = document.getElementById('populationChart').getContext('2d');

    // Destruir gráfica anterior si existe
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ciudad1.evolucionPoblacion.años,
            datasets: [
                {
                    label: ciudad1.nombre,
                    data: ciudad1.evolucionPoblacion.poblacion,
                    borderColor: '#667eea',
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: '#667eea',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 7
                },
                {
                    label: ciudad2.nombre,
                    data: ciudad2.evolucionPoblacion.poblacion,
                    borderColor: '#764ba2',
                    backgroundColor: 'rgba(118, 75, 162, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: '#764ba2',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 7
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    padding: 12,
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 12
                    },
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += context.parsed.y.toLocaleString('es-ES');
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Año',
                        font: {
                            weight: 'bold'
                        }
                    },
                    grid: {
                        drawBorder: true,
                        color: 'rgba(0,0,0,0.1)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Población',
                        font: {
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString('es-ES');
                        }
                    },
                    grid: {
                        color: 'rgba(0,0,0,0.1)'
                    }
                }
            }
        }
    });
}