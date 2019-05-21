import { ProgressScreen } from "./ProgressScreen";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    time: {
      minutes: 2,
      seconds: 10
    },
    pause: false,
    fullDistance: 70,
    resumeTimer: jest.fn(),
    pauseTimer: jest.fn(),
    resetTimer: jest.fn()
  };
  const enzymeWrapper = shallow(<ProgressScreen {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe("ProgressScreen", () => {
  it("Component  render and getting props and pause timer", () => {
    // testing getting props
    const { enzymeWrapper, props } = setup();
    const TimerComponentProps = enzymeWrapper.find("Timer").props();
    //getting Component props from 'redux'
    expect(TimerComponentProps.fullDistance).toEqual(props.fullDistance);
    expect(TimerComponentProps.pause).toEqual(props.pause);
    expect(TimerComponentProps.timer).toEqual(props.time);

    // testing timer pause button click
    // spy on ProgressScreen Component func - onPauseTimer
    const onPauseTimer = jest.spyOn(enzymeWrapper.instance(), "onPauseTimer");
    enzymeWrapper.update();
    enzymeWrapper.instance().forceUpdate();
    //getting pausing button
    const button = enzymeWrapper.find("button[attr='pause']");
    //clicking pausing button
    button.simulate("click");
    expect(onPauseTimer).toHaveBeenCalled();
    //setting pause prop to 'true'
    enzymeWrapper.setProps({ pause: true });
    //checking is timer was paused
    expect(enzymeWrapper.instance().props.pause).toEqual(true);
  });

  it("Resume timer", () => {
    // resume timer button click testing
    const { enzymeWrapper } = setup();
    //setting pause to true, to get resume button
    enzymeWrapper.setProps({ pause: true });
    // spy on ProgressScreen Component func - onResumeTimer
    const onResumeTimer = jest.spyOn(enzymeWrapper.instance(), "onResumeTimer");

    enzymeWrapper.update();
    enzymeWrapper.instance().forceUpdate();
    //getting resuming button
    const button = enzymeWrapper.find("button[attr='play']");
    // clicking on it
    button.simulate("click");
    expect(onResumeTimer).toHaveBeenCalled();
    //setting pause prop to false, to start timer
    enzymeWrapper.setProps({ pause: false });
    // checking if timer is going
    expect(enzymeWrapper.instance().props.pause).toEqual(false);
  });

  it("Reseting timer", () => {
    //testing reseting timer and unmounting component
    const { enzymeWrapper } = setup();
    // spy on ProgressScreen Component func - onResetTimer
    const onResetTimer = jest.spyOn(enzymeWrapper.instance(), "onResetTimer");

    enzymeWrapper.update();
    enzymeWrapper.instance().forceUpdate();
    //finding reset button
    const button = enzymeWrapper.find("button[attr='reset']");
    // clicking on it
    button.simulate("click");
    expect(onResetTimer).toHaveBeenCalled();

    //unmount component
    enzymeWrapper.unmount();
  });
});
