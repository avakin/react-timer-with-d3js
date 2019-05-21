import { HomeScreen } from "./HomeScreen";
import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import styles from "../../styles.module.css";
Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    time: {
      minutes: 2,
      seconds: 10
    },
    start: false,
    startTimer: jest.fn(),
    changeTimer: jest.fn()
  };

  const enzymeWrapper = shallow(<HomeScreen {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe("components", () => {
  describe("HomeScreen", () => {
    it("render home screen  and it's subcomponents", () => {
      const { enzymeWrapper, props } = setup();
      //finding h1 and check it title - render passed
      expect(enzymeWrapper.find("h1").text()).toBe("Start a new Timer");
      // check start button css module classes
      expect(
        enzymeWrapper
          .find("button")
          .hasClass(`${styles.button_start} ${styles.button}`)
      ).toBe(true);
      //spy on HomeScreen func - onStartTImer
      const onStartTimer = jest.spyOn(enzymeWrapper.instance(), "onStartTimer");

      enzymeWrapper.update();
      enzymeWrapper.instance().forceUpdate();
      // find button for starting timer
      const button = enzymeWrapper.find("button");
      //clicking on it
      button.simulate("click");
      //check if clicked was passed
      expect(onStartTimer).toHaveBeenCalled();
      // check that input will receive correct props
      const minutesInputProps = enzymeWrapper
        .find("Input")
        .first()
        .props();
      expect(minutesInputProps.value).toEqual(props.time.minutes);
    });
  });
});
