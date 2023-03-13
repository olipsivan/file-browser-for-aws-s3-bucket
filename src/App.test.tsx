import React from "react";
import { shallow } from "enzyme";
import App from './App';

describe('App', function () {
  it('should render the component', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find("form")).toHaveLength(1);
  });
});