import React from 'react';
//import { render } from '@testing-library/react';
import App from './App';
import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

it('renders correctly enzyme', () => {
  const wrapper = shallow(<App />);

  expect(wrapper.instance().state.newTask).toBeFalsy();

  wrapper.instance().setNewTask();

  expect(wrapper.instance().state.newTask).toBeFalsy();
});

it('renders corr', () => {
  const wrapper = render(<App />);
})