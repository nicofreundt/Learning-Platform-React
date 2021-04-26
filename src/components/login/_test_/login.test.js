import React from 'react';
import TestRenderer from 'react-test-renderer';
import Login from '../Login';
import Enzyme, { shallow, render, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

test('should render without failing', () => {
    const comp = TestRenderer.create(<Login />);
    let tree = comp.toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly enzyme', () => {
    const wrapper = shallow(<Login />)

    expect(toJson(wrapper)).toMatchSnapshot();
});