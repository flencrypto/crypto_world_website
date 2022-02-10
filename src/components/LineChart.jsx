import React from 'react'
import { Line } from "react-chartjs-2"

const LineChart = ({coinHistory}) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i=0;i<coinHistory?.prices?.length; i += 1) {
    coinTimestamp.push( new Date(coinHistory?.prices[i][0]).toLocaleDateString() + ' ' + new Date(coinHistory?.prices[i][0]).toLocaleTimeString())
    coinPrice.push(coinHistory?.prices[i][1])
  }
  const data = {
    labels:coinTimestamp,
    datasets: [
      {
        label: 'Price in USD',
        data:coinPrice,
        fill:false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      }
    ]
  }

  // const options = {
  //   scales: {
  //     yAxes: [
  //       {
  //         ticks: {
  //           beginAtZero: true,
  //         },
  //       },
  //     ],
  //   },
  // };

  return (
    <>
    <Line data={data}/>
    </>
  )
}

export default LineChart