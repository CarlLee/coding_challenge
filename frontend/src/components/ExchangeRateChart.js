import React, { Component } from 'react';
import { Line as LineChart } from 'react-chartjs'
import './ExchangeRateChart.css';

class ExchangeRateChart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chartData: {
        labels: [],
        datasets: [
          {
            label: "ETH to USD exchange rate",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: []
          }
        ]
      }
    }
  }
  componentDidMount() {
    let that = this
    let now = new Date().getTime()
    let chartData = this.state.chartData
    let promises = []
    let labels = chartData.labels = []
    for(let i = 0; i < 7; i++) {
      let time = now - i * 60 * 60 * 24 * 1000;
      let date = new Date(time)
      let month = date.getMonth()
      let day = date.getDay()
      labels.push(`${month}/${day}`)
      promises.unshift(this.fetchExchangeRate(date.toISOString()))
    }

    Promise.all(promises).then(function(results) {
      console.log(results)
      let data = results.map((result) => result.rate)
      chartData.datasets[0].data = data
      that.setState(chartData)
    })
  }

  fetchExchangeRate(time) {
    return fetch(`https://rest.coinapi.io/v1/exchangerate/ETH/USD?time=${time}`, {
        headers: {'X-CoinAPI-Key': 'F681EC22-8D80-4D3A-9225-77FCCCDDAFEF'},
      }).then((res) => res.json())
  }

  render() {
    return (
      <div className="ExchangeRateChart">
        <LineChart data={this.state.chartData} width="600" height="250" />
      </div>
    )
  }
}

export default ExchangeRateChart;
