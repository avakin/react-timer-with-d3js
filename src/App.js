import React from "react";
import { ProgressScreen, HomeScreen, FinishedScreen } from "./screens";
import { connect } from "react-redux";
import styles from "./styles.module.css";
import { setupNotificationPermission } from "./actions/actions";
class App extends React.Component {
  componentDidMount() {
    //get notifications permission after mounting root component
    this.getNotificationPermission();
  }

  getNotificationPermission = () => {
    const { setupNotificationPermission } = this.props;
    // check if browser support notifications
    if (!("Notification" in window)) {
      window.alert("This browser does not support desktop notification");
      setupNotificationPermission(false);
    }
    // check if user allow notifications sending
    else if (Notification.permission === "granted") {
      setupNotificationPermission(true);
    }
    // if no, try to get permission for notifications
    else if (Notification.permission !== "denied") {
      Notification.requestPermission(function(permission) {
        // if permissions was allowed, setup the prop, that notifications was allowed and supported
        if (permission === "granted") {
          setupNotificationPermission(true);
        }
      });
    }
  };
  render() {
    //getting props from store to define what screen we need to display
    const { screen, start } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.timer_holder}>
          {screen === "home" ? (
            <HomeScreen />
          ) : screen === "in_progress" && start ? (
            <ProgressScreen />
          ) : screen === "finished" && !start ? (
            <FinishedScreen />
          ) : null}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ timer }) => ({
  screen: timer.screen,
  start: timer.start
});
export default connect(
  mapStateToProps,
  { setupNotificationPermission }
)(App);
