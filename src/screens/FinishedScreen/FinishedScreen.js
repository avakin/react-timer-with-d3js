import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { startNewTimer } from "../../actions/actions";
import styles from "../../styles.module.css";

export class FinishedScreen extends Component {
  static propTypes = {
    startNewTimer: PropTypes.func.isRequired
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

export default connect(
  null,
  { startNewTimer }
)(FinishedScreen);
