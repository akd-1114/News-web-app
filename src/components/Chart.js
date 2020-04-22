import React, { Component } from "react";
import { Line } from "react-chartjs-2";

const state = {
  labels: ["2016", "2017", "2018", "2019", "2020"],
  datasets: [
    {
      label: "Articles",
      fill: true,
      lineTension: 0,
      backgroundColor: "#82b1ff",
      borderColor: "#03a9f4",
      borderWidth: 2,
      data: [250, 300, 200, 500, 420],
    },
  ],
};

class Chart extends Component {
  render() {
    let ing = this.props.topic;
    state.datasets[0].data = this.props.dArray;

    return (
      <div>
        <Line
          data={state}
          options={{
            title: {
              display: true,
              text:
                "No of articles published per year for the last 5 years of " +
                ing,
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
    );
  }
}

export default Chart;
