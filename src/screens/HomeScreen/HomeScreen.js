import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styles from "../../styles.module.css";
import Input from "../../components/Input/Input";
import { startTimer, changeTimer } from "../../actions/actions";
export class HomeScreen extends Component {
  static propTypes = {
    time: PropTypes.shape({
      minutes: PropTypes.number.isRequired,
      seconds: PropTypes.number.isRequired
    }),
    startTimer: PropTypes.func,
    changeTimer: PropTypes.func
  };
  state = {
    minutes: 0,
    seconds: 0
  };
  onChangeTimer = (name, val) => {
    //function to change timer start values
    const { changeTimer } = this.props;
    this.setState(
      () => ({
        [name]: val
      }),
      function() {
        changeTimer(this.state);
      }
    );
  };
  onStartTimer = () => {
    //function to start timer and go to screen 'in_progress'
    const { startTimer } = this.props;
    startTimer(this.state);
  };
  render() {
    const {
      time: { minutes, seconds }
    } = this.props;
    let disableStart = minutes === 0 && seconds === 0;
    return (
      <div className={styles.timer_holder}>
        <h1 className={styles.title}>Start a new Timer</h1>
        <Input
          onChangeTimer={this.onChangeTimer}
          value={minutes}
          placeholder={"Minutes"}
        />
        <Input
          onChangeTimer={this.onChangeTimer}
          value={seconds}
          placeholder={"Seconds"}
        />
        <div className={styles.buttonholder}>
          {disableStart ? (
            <div className={styles.error_label}>
              To start timer, please, setup values
            </div>
          ) : null}
          <button
            disabled={disableStart}
            onClick={this.onStartTimer}
            className={`${styles.button_start} ${styles.button}`}
          >
            Start
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ timer }) => ({
  time: timer.time
});

const mapDispatchToProps = { startTimer, changeTimer };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
