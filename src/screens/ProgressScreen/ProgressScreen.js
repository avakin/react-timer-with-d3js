import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Timer from "../../components/Timer/Timer";
import styles from "../../styles.module.css";
import {
  resetTimer,
  pauseTimer,
  changeTimer,
  finishTimer,
  startTimer,
  resumeTimer
} from "../../actions/actions";
export class ProgressScreen extends Component {
  static propTypes = {
    pause: PropTypes.bool.isRequired,
    fullDistance: PropTypes.number.isRequired,
    time: PropTypes.shape({
      minutes: PropTypes.number.isRequired,
      seconds: PropTypes.number.isRequired
    }),
    resetTimer: PropTypes.func,
    pauseTimer: PropTypes.func,
    changeTimer: PropTypes.func,
    finishTimer: PropTypes.func,
    startTimer: PropTypes.func,
    resumeTime: PropTypes.func
  };
  onResetTimer = () => {
    //function to reset timer and go to screen 'home'
    const { resetTimer } = this.props;
    resetTimer();
  };
  onChangeTimer = data => {
    //function to change data in store
    const { changeTimer, finishTimer } = this.props;
    if (data.minutes === 0 && data.seconds === 0) {
      //function to finish timer when receiving min=0 and sec=0
      finishTimer();
    }
    changeTimer(data);
  };
  onPauseTimer = () => {
    //function to pause timer via setting pause:true in store
    const { pauseTimer } = this.props;
    pauseTimer();
  };
  onResumeTimer = () => {
    //function to resume timer via setting pause:false in store
    const { resumeTimer, time } = this.props;
    resumeTimer(time);
  };
  render() {
    const {
      pause,
      fullDistance,
      time: { minutes, seconds }
    } = this.props;
    return (
      <>
        <h1 className={styles.title}>Your timer in progress</h1>
        <div className={styles.timer_wrapper}>
          <Timer
            fullDistance={fullDistance}
            pause={pause}
            changeTime={this.onChangeTimer}
            timer={{ minutes, seconds }}
          />
        </div>
        <div className={styles.buttonholder}>
          <button
            attr="reset"
            onClick={this.onResetTimer}
            className={`${styles.button} ${styles.button_reset}`}
          >
            Reset
          </button>
          {pause ? (
            <button
              attr="play"
              onClick={this.onResumeTimer}
              className={`${styles.button} ${styles.button_start}`}
            >
              Play
            </button>
          ) : (
            <button
              attr="pause"
              onClick={this.onPauseTimer}
              className={`${styles.button} ${styles.button_pause}`}
            >
              Pause
            </button>
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ timer }) => ({
  time: timer.time,
  pause: timer.pause,
  fullDistance: timer.fullDistance
});

const mapDispatchToProps = {
  resetTimer,
  pauseTimer,
  changeTimer,
  finishTimer,
  startTimer,
  resumeTimer
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgressScreen);
