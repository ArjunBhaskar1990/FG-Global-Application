<!DOCTYPE html>
<html lang="en" data-theme="dark">

<head>
    @routes
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>FG Global School</title>
    @viteReactRefresh

    @vite(['resources/css/app.css', 'resources/js/app.jsx'])

    @inertiaHead
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">
    <link rel="icon" type="image/png" href="/storage/fgglobal/fg_og.png">
    <!-- remix icon font css  -->
    <link rel="stylesheet" href="/storage/assets/css/remixicon.css">
    <!-- BootStrap css -->
    <link rel="stylesheet" href="/storage/assets/css/lib/bootstrap.min.css">
    <!-- Apex Chart css -->
    {{-- <link rel="stylesheet" href="/storage/assets/css/lib/apexcharts.css"> --}}
    <!-- Data Table css -->
    <link rel="stylesheet" href="/storage/assets/css/lib/dataTables.min.css">
    <!-- Date picker css -->
    <link rel="stylesheet" href="/storage/assets/css/lib/flatpickr.min.css">
    <!-- Calendar css -->
    <link rel="stylesheet" href="/storage/assets/css/lib/full-calendar.css">
    <!-- calendar -->
    <link rel="stylesheet" href="/storage/assets/css/lib/calendar.css">
    <!-- main css -->
    <link rel="stylesheet" href="/storage/assets/css/style.css">
    <link rel="stylesheet" href="/storage/assets/css/pagination.css">
</head>

<body>

    @inertia


    <script src="/storage/assets/js/lib/jquery-3.7.1.min.js"></script>
    <!-- Bootstrap js -->
    <script src="/storage/assets/js/lib/bootstrap.bundle.min.js"></script>
    <!-- Apex Chart js -->
    {{-- <script src="/storage/assets/js/lib/apexcharts.min.js"></script> --}}
    <!-- Iconify Font js -->
    <script src="/storage/assets/js/lib/iconify-icon.min.js"></script>
    <!-- Data Table js -->
    <script src="/storage/assets/js/lib/dataTables.min.js"></script>

    <!-- jQuery UI js -->
    <script src="/storage/assets/js/lib/jquery-ui.min.js"></script>

    <!-- main js -->
    <script src="/storage/assets/js/app.js"></script>


    <script>
        // ============================ Revenue Statistics Chart start ===============================
        var options = {
            series: [{
                name: 'Total Fee',
                data: [25, 35, 50, 60, 26, 20, 40, 20, 50, 16, 10, 40]
            }, {
                name: 'Collected Fee',
                data: [15, 16, 24, 30, 20, 15, 20, 10, 25, 10, 6, 20]
            }],
            chart: {
                type: 'bar',
                height: 250,
                stacked: true,
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: true
                }
            },
            colors: ["#25A194", "#FF7A2C"],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "50%",
                    shape: "pyramid",
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr',
                    'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ],
            },
            yaxis: {
                labels: {
                    formatter: function(value) {
                        return "$" + value + "k";
                    },
                    style: {
                        fontSize: "14px"
                    }
                },
            },
            legend: {
                show: false,
            },
            fill: {
                opacity: 1
            }
        };

        var chart = new ApexCharts(document.querySelector("#revenueStatistic"), options);
        chart.render()
        // ============================ Revenue Statistics Chart End ===============================

        // ===================== Income Vs Expense Start ===============================
        function createChartThree(chartId, color1, color2) {
            var options = {
                series: [{
                    name: 'Income',
                    data: [48, 35, 55, 32, 48, 30, 15, 50, 57]
                }, {
                    name: 'Expense',
                    data: [12, 20, 15, 26, 22, 60, 40, 32, 25]
                }],
                legend: {
                    show: false
                },
                chart: {
                    type: 'area',
                    width: '100%',
                    height: 260,
                    toolbar: {
                        show: false
                    },
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'stepline',
                    width: 2,
                    colors: [color1, color2],
                    lineCap: 'round'
                },
                grid: {
                    show: true,
                    borderColor: '#D1D5DB',
                    strokeDashArray: 1,
                    position: 'back',
                    xaxis: {
                        lines: {
                            show: false
                        }
                    },
                    yaxis: {
                        lines: {
                            show: true
                        }
                    },
                    row: {
                        colors: undefined,
                        opacity: 0.2
                    },
                    column: {
                        colors: undefined,
                        opacity: 0.2
                    },
                    padding: {
                        top: -20,
                        right: 0,
                        bottom: -10,
                        left: 0
                    },
                },
                colors: [color1, color2],
                markers: {
                    colors: [color1, color2],
                    strokeWidth: 1,
                    size: 0,
                    hover: {
                        size: 10
                    }
                },
                xaxis: {
                    labels: {
                        show: false
                    },
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    tooltip: {
                        enabled: false
                    },
                    labels: {
                        formatter: function(value) {
                            return value;
                        },
                        style: {
                            fontSize: "14px"
                        }
                    }
                },
                yaxis: {
                    labels: {
                        formatter: function(value) {
                            return "$" + value + "k";
                        },
                        style: {
                            fontSize: "14px"
                        }
                    },
                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy HH:mm'
                    }
                },
                fill: {
                    type: "gradient",
                    gradient: {
                        shade: "light",
                        type: "vertical",
                        opacityFrom: 0.4,
                        opacityTo: 0.05,
                        stops: [0, 100]
                    }
                }
            };

            var chart = new ApexCharts(document.querySelector(`#${chartId}`), options);
            chart.render();
        }

        createChartThree('incomeExpense', '#16a34a', '#FF9F29');
        // ===================== Income Vs Expense End ===============================

        // ================================ New Admissions Chart Start ================================
        var options = {
            series: [40, 87, 87, 30],
            colors: ['#0A51CE', '#25A194', '#FF7A2C', '#009F5E'],
            labels: ['Health', 'Business', 'Lifestyle', 'Entertainment'],
            legend: {
                show: false
            },
            chart: {
                type: 'donut',
                height: 270,
                sparkline: {
                    enabled: true // Remove whitespace
                },
                margin: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0
                }
            },
            stroke: {
                width: 2,
            },
            dataLabels: {
                enabled: false
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
        };

        var chart = new ApexCharts(document.querySelector("#newAdmissions"), options);
        chart.render();
        // ================================ New Admissions Chart End ================================

        // ================================ Animated Radial Progress Bar Start ================================
        $('svg.radial-progress').each(function(index, value) {
            $(this).find($('circle.complete')).removeAttr('style');
        });

        // Activate progress animation on scroll
        $(window).scroll(function() {
            $('svg.radial-progress').each(function(index, value) {
                // Trigger when the element is fully in the viewport
                if (
                    $(window).scrollTop() >= $(this).offset().top - $(window).height() &&
                    $(window).scrollTop() <= $(this).offset().top + $(this).height()
                ) {
                    // Get percentage of progress
                    const percent = $(value).data('percentage');
                    // Get radius of the svg's circle.complete
                    const radius = $(this).find($('circle.complete')).attr('r');
                    // Get circumference (2πr)
                    const circumference = 2 * Math.PI * radius;
                    // Get stroke-dashoffset value based on the percentage of the circumference
                    const strokeDashOffset = circumference - ((percent * circumference) / 100);
                    // Transition progress for 1.25 seconds
                    $(this).find($('circle.complete')).animate({
                        'stroke-dashoffset': strokeDashOffset
                    }, 1250);
                }
            });
        }).trigger('scroll');
        // ================================ Animated Radial Progress Bar End ================================

        // ============================= Calendar Js Start =================================
        let display = document.querySelector(".display");
        let days = document.querySelector(".days");
        let previous = document.querySelector(".left");
        let next = document.querySelector(".right");

        let date = new Date();

        let year = date.getFullYear();
        let month = date.getMonth();

        function displayCalendar() {
            const firstDay = new Date(year, month, 1);

            const lastDay = new Date(year, month + 1, 0);

            const firstDayIndex = firstDay.getDay(); //4

            const numberOfDays = lastDay.getDate(); //31

            let formattedDate = date.toLocaleString("en-US", {
                month: "long",
                year: "numeric"
            });

            display.innerHTML = `${formattedDate}`;

            for (let x = 1; x <= firstDayIndex; x++) {
                const div = document.createElement("div");
                div.innerHTML += "";

                days.appendChild(div);
            }

            for (let i = 1; i <= numberOfDays; i++) {
                let div = document.createElement("div");
                let currentDate = new Date(year, month, i);

                div.dataset.date = currentDate.toDateString();

                div.innerHTML += i;
                days.appendChild(div);
                if (
                    currentDate.getFullYear() === new Date().getFullYear() &&
                    currentDate.getMonth() === new Date().getMonth() &&
                    currentDate.getDate() === new Date().getDate()
                ) {
                    div.classList.add("current-date");
                }
            }
        }

        // Call the function to display the calendar
        displayCalendar();

        previous.addEventListener("click", () => {
            days.innerHTML = "";

            if (month < 0) {
                month = 11;
                year = year - 1;
            }
            month = month - 1;
            date.setMonth(month);
            displayCalendar();
        });

        next.addEventListener("click", () => {
            days.innerHTML = "";

            if (month > 11) {
                month = 0;
                year = year + 1;
            }

            month = month + 1;
            date.setMonth(month);

            displayCalendar();
        });
        // ============================= Calendar Js End =================================
    </script>

</body>

</html>
