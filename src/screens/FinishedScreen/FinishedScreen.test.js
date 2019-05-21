import React from "react";
import { FinishedScreen } from "./FinishedScreen";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    startNewTimer: jest.fn()
  };
  const enzymeWrapper = shallow(<FinishedScreen {...props} />);
  return {
    props,
    enzymeWrapper
  };
}
describe("Testing FinishedScreen Component", () => {
  it("dissmiss and going to home screen", () => {
    const { enzymeWrapper } = setup();
    // testing timer pause button click
    // spy on ProgressScreen Component func - dissmiss
    const dissmiss = jest.spyOn(enzymeWrapper.instance(), "dissmiss");

    enzymeWrapper.update();
    enzymeWrapper.instance().forceUpdate();
    //getting dissmissing button
    const button = enzymeWrapper.find("button");
    //clicking dissmissing button
    button.simulate("click");
    expect(dissmiss).toHaveBeenCalled();
    //checking is timer was paused
    enzymeWrapper.unmount();
  });
});
