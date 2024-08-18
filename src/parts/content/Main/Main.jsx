import React, { useState, useEffect } from 'react';
import styles from './Main.module.css'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import StopWatch from '../../Functions/Timer/StopWatch';
import { Line, Pie } from "react-chartjs-2";
import chart from 'chart.js/auto';

const items = [
    <p>"Sed ut perspiciatis unde omnis iste natus 
        error sit voluptatem accusantium doloremque 
        laudantium"</p>,
    <p>"Sed ut perspiciatis unde omnis iste natus 
    error sit voluptatem accusantium doloremque 
    laudantium"</p>,
    <p>"Sed ut perspiciatis unde omnis iste natus 
    error sit voluptatem accusantium doloremque 
    laudantium"</p>
];

const Chart1 = () => {
    const lineChartData = {
        labels: ["October", "November", "December"],
        datasets: [
          {
            data: [8137119, 9431691, 10266674],
            label: "Infected",
            borderColor: "#3333ff",
            fill: true,
            lineTension: 0.5
          },
          {
            data: [1216410, 1371390, 1477380],
            label: "Deaths",
            borderColor: "#ff3333",
            backgroundColor: "rgba(255, 0, 0, 0.5)",
            fill: true,
            lineTension: 0.5
          }
        ]
    };
    return (
        <Line
            type="line"
            width={160}
            height={60}
            options={{
                title: {
                    display: true,
                    text: "COVID-19 Cases of Last 6 Months",
                    fontSize: 20
                },
                legend: {
                    display: true, //Is the legend shown?
                    position: "top" //Position of the legend.
                }
            }}
            data={lineChartData}
        />
    )
}

const Chart2 = () => {
    const pieChartData = {
        labels: ["October", "November", "December"],
        datasets: [{
            data: [8137119, 9431691, 10266674],
            label: "Infected People",
            backgroundColor: ["#2FDE00", "#00A6B4", "#ff6600"],
            hoverBackgroundColor: ["#175000", "#003350", "#993d00"]
        }]
    };
    const pieChart = (
        <Pie
            type="pie"
            width={130}
            height={50}
            options={{
                title: {
                    display: true,
                    text: "COVID-19 Cases of Last 3 Months",
                    fontSize: 15
                },
                legend: {
                    display: true, //Is the legend shown?
                    position: "top" //Position of the legend.
                }
            }}
            data={pieChartData}
        />
    );
    return pieChart;
};

const Main = (props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapper__inner}>
                <div className={styles.wrapper__leftside}>
                    <div className={styles.wrapper__leftupside}>
                        <div className={styles.wrapper__tasks}>
                            <h2>Ваши задачи:</h2>
                            <div className={styles.wrapper__carousel}>
                                <AliceCarousel
                                    autoPlayInterval={3000}
                                    infinite={true}
                                    mouseTracking
                                    autoPlay
                                    items={items}
                                    disableButtonsControls />
                            </div>
                        </div>
                    </div>
                    <div className={styles.wrapper__leftdownside}>
                       <Chart1 />
                    </div>
                </div>
                <div className={styles.wrapper__rightside}>
                    <div className={styles.wrapper__rightupside}>
                        <Chart2 />
                    </div>
                    <div className={styles.wrapper__rightdownside}>
                        <h1>незнаю чо сюда вставить</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main