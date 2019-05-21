import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Timer.module.css";
import * as d3 from "d3";

//define setting constants
const SETTING = {
  RADIUS: 54,
  CIRCUMFERENCE: function() {
    return 2 * Math.PI * this.RADIUS;
  }
};
export default class Timer extends Component {
  //defining props types

  static propTypes = {
    fullDistance: PropTypes.number.isRequired,
    pause: PropTypes.bool.isRequired,
    timer: PropTypes.shape({
      minutes: PropTypes.number.isRequired,
      seconds: PropTypes.number.isRequired
    }),
    changeTime: PropTypes.func.isRequired
  };
  state = {
    radius: SETTING.RADIUS,
    circumference: SETTING.CIRCUMFERENCE(),
    minutes: {
      value: 59,
      dashoffset: SETTING.CIRCUMFERENCE() * (1 - 0 / 60)
    },
    seconds: {
      value: 59,
      dashoffset: SETTING.CIRCUMFERENCE() * (1 - 0 / 60)
    },
    fullDistance: 3600,
    dashoffset: SETTING.CIRCUMFERENCE() * (1 - 0 / 60)
  };
  componentWillUnmount() {
    //clear interval after unmounting component
    window.clearInterval(window.timer);
  }

  componentDidMount() {
    // draw timer charts after mounting component
    let minutesDashoffset =
      SETTING.CIRCUMFERENCE() *
      (1 - this.props.timer.minutes / this.props.fullDistance);
    let secondsDashoffset =
      SETTING.CIRCUMFERENCE() * (1 - this.props.timer.seconds / 60);
    this.drawChart(this.minutesContainer, "minutes", minutesDashoffset);
    this.drawChart(this.secondsContainer, "seconds", secondsDashoffset);
    //check if pause === false, then start timer
    if (!this.props.pause) {
      this.startTimer();
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const { changeTime, fullDistance } = this.props;
    //check charts and update data on props updating
    let minutes = document.getElementById("minutes");
    let seconds = document.getElementById("seconds");
    if (minutes) {
      d3.select(minutes)
        .select("#minutes_progress")
        .transition()
        .duration(300)
        .attr(
          "stroke-dashoffset",
          SETTING.CIRCUMFERENCE() *
            (1 - this.state.minutes.value / fullDistance)
        );
    }
    if (seconds) {
      d3.select(seconds)
        .select("#seconds_progress")
        .transition()
        .duration(300)
        .attr(
          "stroke-dashoffset",
          SETTING.CIRCUMFERENCE() * (1 - this.state.seconds.value / 60)
        );
    }
    if (prevProps.pause !== this.props.pause && this.props.pause) {
      //check if received pause === true, then stop timer
      window.clearInterval(window.timer);
    } else if (prevProps.pause !== this.props.pause && !this.props.pause) {
      //check if received pause === false, then resume timer
      this.startTimer();
    }
    if (this.state.seconds.value === 0) {
      if (this.state.minutes.value === 0) {
        // if minutes = 0, seconds = 0, give this time to finish timer
        changeTime({ minutes: 0, seconds: 0 });
        return;
      }
      // check if seconds === 0 and minutes !== 0, update seconds to 59 and decrease minutes on 1 point
      this.setState(
        () => ({
          seconds: {
            value: 59,
            dashoffset: SETTING.CIRCUMFERENCE() * (1 - 59 / 60)
          },
          minutes: {
            value: this.state.minutes.value - 1,
            dashoffset:
              SETTING.CIRCUMFERENCE() *
              (1 - this.state.minutes.value / fullDistance)
          }
        }),
        function() {
          //after updating state, pass updated state data to prop function to update time
          changeTime({ minutes: this.state.minutes.value - 1, seconds: 59 });
        }
      );
    }
  }
  startTimer = () => {
    //function to start timer
    const {
      timer: { minutes, seconds },
      changeTime,
      fullDistance
    } = this.props;
    //update state from props
    this.setState(
      () => ({
        seconds: {
          value: seconds,
          dashoffset: SETTING.CIRCUMFERENCE() * (1 - seconds / 60)
        },
        minutes: {
          value: minutes,
          dashoffset: SETTING.CIRCUMFERENCE() * (1 - minutes / fullDistance)
        }
      }),
      function() {
        //begin timer after updating state
        window.timer = setInterval(() => {
          this.setState(
            () => ({
              seconds: {
                value: this.state.seconds.value - 1,
                dashoffset:
                  SETTING.CIRCUMFERENCE() *
                  (1 - (this.state.seconds.value - 1) / 60)
              },
              minutes: {
                value: this.state.minutes.value - 1,
                dashoffset:
                  SETTING.CIRCUMFERENCE() *
                  (1 - (this.state.minutes.value - 1) / fullDistance)
              }
            }),
            function() {
              changeTime({
                minutes: this.state.minutes.value,
                seconds: this.state.seconds.value
              });
            }
          );
        }, 1000);
      }
    );
  };
  drawChart = (refNode, selector, dashoffset) => {
    //draw charts function via d3.js
    //creating svg and adding all need attrs and elements to them
    let svg = d3
      .select(refNode)
      .append("svg")
      .attr("id", selector)
      .attr(
        "viewBox",
        `0 0 ${SETTING.RADIUS * 2 + 12} ${SETTING.RADIUS * 2 + 12}`
      )
      .attr("fill", "#f9f9f9")
      .attr("width", SETTING.RADIUS * 2 + 12)
      .attr("height", SETTING.RADIUS * 2 + 12)
      .append("circle")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("stroke-linecap", "round")
      .attr("stroke", "rgba(33, 150, 243, 0.36)")
      .attr("stroke-width", 5)
      .attr("r", SETTING.RADIUS)
      .attr(
        "transform",
        `rotate(-90,${SETTING.RADIUS + 6},${SETTING.RADIUS + 6})`
      );
    // after creating on static circle adding dynamic chart circle
    d3.select(`#${selector}`)
      .append("circle")
      .attr("id", `${selector}_progress`)
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("stroke-linecap", "round")
      .attr("stroke", "#2196F3")
      .attr("stroke-dasharray", SETTING.CIRCUMFERENCE())
      .attr("stroke-dashoffset", dashoffset)
      .attr("stroke-width", 5)
      .attr(
        "transform",
        `rotate(-90,${SETTING.RADIUS + 6},${SETTING.RADIUS + 6})`
      )
      .attr("r", SETTING.RADIUS);

    return svg;
  };

  render() {
    const {
      timer: { minutes, seconds }
    } = this.props;
    return (
      <>
        <div
          className={styles.timer_inner}
          ref={node => (this.drawContainer = node)}
        >
          <div
            ref={node => (this.minutesContainer = node)}
            className={styles.holder}
          >
            <span className={styles.time_value}>
              {Math.floor(minutes / 60)}
            </span>
          </div>
          <div
            ref={node => (this.secondsContainer = node)}
            className={styles.holder}
          >
            <span className={styles.time_value}>{seconds}</span>
          </div>
        </div>
      </>
    );
  }
}
