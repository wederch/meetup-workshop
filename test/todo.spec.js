import React from "react";
import {shallow, mount} from "enzyme";
import Todo from "../src/todo/todo";

describe('<Todo/>', ()=> {

  it('renders an empty todo', ()=> {
    const wrapper = shallow(<Todo />);
    expect(wrapper.find('li')).to.have.length(1);
    expect(wrapper.find('input')).to.have.length(1);
    expect(wrapper.find('label')).to.have.length(2);
  });

  it('renders an open todo with a text', ()=> {
    const data = {id: 10, text: 'test todo', done: false};
    const wrapper = mount(<Todo data={data}/>);
    expect(wrapper.find('.text').text()).to.equal(data.text);
  });

});
