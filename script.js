// Base de datos de ciudades
const ciudadesData = {
    madrid: {
        nombre: 'Madrid',
        poblacion: 3332035,
        densidad: 5400,
        fundacion: '860 d.C.',
        evolucionPoblacion: {
            años: [1950, 1970, 1990, 2000, 2010, 2020, 2026],
            poblacion: [1618000, 3146000, 3010000, 2882000, 3273000, 3334000, 3332035]
        }
    },
    barcelona: {
        nombre: 'Barcelona',
        poblacion: 1660122,
        densidad: 16000,
        fundacion: '100 a.C.',
        evolucionPoblacion: {
            años: [1950, 1970, 1990, 2000, 2010, 2020, 2026],
            poblacion: [1280000, 1745000, 1644000, 1496000, 1619000, 1664000, 1660122]
        }
    },
    valencia: {
        nombre: 'Valencia',
        poblacion: 807693,
        densidad: 6000,
        fundacion: '138 a.C.',
        evolucionPoblacion: {
            años: [1950, 1970, 1990, 2000, 2010, 2020, 2026],
            poblacion: [509000, 654000, 753000, 739000, 809000, 800000, 807693]
        }
    },
    sevilla: {
        nombre: 'Sevilla',
        poblacion: 684025,
        densidad: 5000,
        fundacion: '800 a.C.',
        evolucionPoblacion: {
            años: [1950, 1970, 1990, 2000, 2010, 2020, 2026],
            poblacion: [377000, 548000, 683000, 701000, 704000, 691000, 684025]
        }
    },
    bilbao: {
        nombre: 'Bilbao',
        poblacion: 346096,
        densidad: 8300,
        fundacion: '1300 d.C.',
        evolucionPoblacion: {
            años: [1950, 1970, 1990, 2000, 2010, 2020, 2026],
            poblacion: [229000, 433000, 370000, 353000, 346000, 351000, 346096]
        }
    },
    palma: {
        nombre: 'Palma de Mallorca',
        poblacion: 403350,
        densidad: 2300,
        fundacion: '123 a.C.',
        evolucionPoblacion: {
            años: [1950, 1970, 1990, 2000, 2010, 2020, 2026],
            poblacion: [137000, 234000, 297000, 334000, 405000, 423000, 403350]
        }
    },
    malaga: {
        nombre: 'Málaga',
        poblacion: 586384,
        densidad: 4600,
        fundacion: '770 a.C.',
        evolucionPoblacion: {
            años: [1950, 1970, 1990, 2000, 2010, 2020, 2026],
            poblacion: [276000, 374000, 503000, 531000, 568000, 578000, 586384]
        }
    },
    murcia: {
        nombre: 'Murcia',
        poblacion: 469177,
        densidad: 540,
        fundacion: '825 d.C.',
        evolucionPoblacion: {
            años: [1950, 1970, 1990, 2000, 2010, 2020, 2026],
            poblacion: [218000, 244000, 289000, 357000, 441000, 459000, 469177]
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
        ciudad.densidad.toLocaleString('es-ES') + ' hab/km²';
    document.getElementById(`founded${suffix}`).textContent = ciudad.fundacion;
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
