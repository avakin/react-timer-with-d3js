import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { startNewTimer } from "../../actions/actions";
import styles from "../../styles.module.css";
import alarmSound from "../../assets/light.mp3";
export class FinishedScreen extends Component {
  static propTypes = {
    startNewTimer: PropTypes.func.isRequired
  };
  componentDidMount() {
    const { notification } = this.props;
    // play notification if user allowed permission
    if (notification) {
      this.notifyMe();
    }
  }
  notifyMe = () => {
    //add audio signal
    let audio = new Audio(alarmSound);
    //play audio
    var playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise
        .then(_ => {
          // Automatic playback started
        })
        .catch(error => {
          // Auto-play was prevented
        });
    }
    //create notification and add click event listener to it for getting back to aour app's tab
    let notification = new Notification("Your timer was finished!");
    notification.onclick = function(e) {
      window.focus();
      this.close();
    };
    return notification;
  };
  dissmiss = () => {
    //function to go home screen
    const { startNewTimer } = this.props;
    startNewTimer();
  };
  render() {
    return (
      <div>
        <h1 className={styles.title}> Timer Complete</h1>
        <div className={styles.buttonholder}>
          <button
            className={`${styles.button} ${styles.button_start}`}
            onClick={this.dissmiss}
          >
            Dissmiss
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ timer }) => ({
  notification: timer.notification
});
export default connect(
  mapStateToProps,
  { startNewTimer }
)(FinishedScreen);
