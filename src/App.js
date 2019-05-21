import React from "react";
import { ProgressScreen, HomeScreen, FinishedScreen } from "./screens";
import { connect } from "react-redux";
import styles from "./styles.module.css";
class App extends React.Component {
  render() {
    //getting props from store to define waht screen we need to display
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
  {}
)(App);
