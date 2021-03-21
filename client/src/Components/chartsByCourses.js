import React, { Component } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    await axios
      .get("http://localhost:3001/countCollege_byCourses")
      .then((res) => {
        this.setState({
          labels: res.data["courses"],
          series: res.data["count"],
        });
      })
      .catch((err) => {
        console.log(err, "Error in loading data");
      });
  };

  render() {
    const { colleges_byState } = this.state;
    const data = {
      series: this.state.series,
      options: {
        labels: this.state.labels,
        title: {
          text: "Chart by Courses",
          align: "left",

          style: {
            fontSize: "20px",
            fontWeight: "bold",
            color: "#263238",
          },
        },

        responsive: [
          {
            breakpoint: 863,
            options: {
              chart: {
                width: 500,
              },
              legend: {
                position: "bottom",
              },
            },
          },
          {
            breakpoint: 450,
            options: {
              chart: {
                width: 400,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };

    return (
      <div>
        {this.state.labels && this.state.series && (
          <div className="donut">
            <Chart
              options={data["options"]}
              series={data["series"]}
              type="donut"
              width="600"
            />
          </div>
        )}
      </div>
    );
  }
}
export default App;
