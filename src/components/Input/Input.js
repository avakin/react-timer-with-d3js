import React, { Component } from "react";
import PropTypes from "prop-types";

import styles from "./Input.module.css";
export default class Input extends Component {
  //defining props types
  static propTypes = {
    onChangeTimer: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  };
  state = {
    value: 0
  };
  componentDidMount() {
    // setup input value from props after mounting
    this.setState({
      value: this.props.value
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { onChangeTimer } = this.props;
    //change input value after receiving new value from outside
    if (prevState.value !== this.state.value) {
      onChangeTimer(this.input.name, this.state.value);
    }
  }

  increase = e => {
    //function to increase input value
    const { value } = this.state;
    //no setup value more then 59. (60 secs in minute)
    if (value === 59) {
      return;
    }
    this.setState(prevState => ({ value: prevState.value + 1 }));
  };
  decrease = e => {
    //function to decrease input value
    const { value } = this.state;
    //no setup negative value
    if (value === 0) {
      return;
    }
    this.setState(prevState => ({ value: prevState.value - 1 }));
  };
  userInput = e => {
    //keyboard user input
    //setup only numbers via regexp and check value not to be more then 59
    let reg = new RegExp("^[0-9]+$");
    let value = e.target.value;
    if (reg.test(e.target.value) || !value.length) {
      if (Number(value) >= 59) {
        this.setState({ value: 59 });
      } else {
        this.setState({ value: Number(value) });
      }
    }
  };
  render() {
    const { placeholder, value: propsVal } = this.props;
    return (
      <div className={styles.input_holder}>
        <div className={styles.input_placeholder}>{placeholder}</div>
        <div className={styles.input_wrapper}>
          <button onClick={this.increase} className={styles.input_control}>
            +
          </button>
          <input
            name={placeholder.toLowerCase().replace(" ", "_")}
            ref={node => (this.input = node)}
            onChange={this.userInput}
            value={propsVal}
            className={styles.input}
            type="text"
          />
          <button onClick={this.decrease} className={styles.input_control}>
            -
          </button>
        </div>
      </div>
    );
  }
}
