import React from "react";
import { Wrap } from "./style";
import student from "../../assets/images/student.png";
import clock from "../../assets/icons/dash1.svg";
import user from "../../assets/icons/dash2.svg";
import dollor from "../../assets/icons/dash3.svg";
import cart from "../../assets/icons/dash4.svg";
import Chart from "react-apexcharts";
const Dashboard = () => {
  let series = [
    {
      name: "Inflation",
      data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
    },
  ];
  let options = {
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%";
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },

    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      position: "bottom",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + "%";
        },
      },
    },
    title: {
      text: "Monthly Inflation in Argentina, 2002",
      align: "center",
      style: {
        color: "#444",
      },
    },
  };
  return (
    <Wrap>
      <div className="header">
        <div className="students-joined card">
          <div className="content">
            <div className="title"> Congratulations John! 🎉 </div>
            <div className="subtitle">Best seller of the month</div>
            <span className="count">48.9k</span>
          </div>
          <div className="imag-wrap">
            <img src={student} alt="student" />
          </div>
        </div>
        <div className="statistics card">
          <div className="title">Statistics</div>
          <div className="wrap-stats">
            <div className="item">
              <div className="icon">
                <img src={clock} alt="clock" />
              </div>
              <div className="details">
                <span>230k</span>
                <p>Sales</p>
              </div>
            </div>
            <div className="item">
              <div className="icon userI">
                <img src={user} alt="clock" />
              </div>
              <div className="details">
                <span>230k</span>
                <p>Sales</p>
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <img src={cart} alt="clock" />
              </div>
              <div className="details">
                <span>230k</span>
                <p>Sales</p>
              </div>
            </div>
            <div className="item">
              <div className="icon">
                <img src={dollor} alt="clock" />
              </div>
              <div className="details">
                <span>230k</span>
                <p>Sales</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main">
        <Chart options={options} series={series} type="bar" height={550} />
      </div>
    </Wrap>
  );
};

export default Dashboard;
