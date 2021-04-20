import React from 'react';
import { Link } from 'react-router-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Pages from './Pages';

configure({adapter: new Adapter()});

describe('<Pages />', () => {
  let wrapper;
  const props = {
    allRecipes: Array(100),
    page: 1
  }
  beforeEach(() => {
    wrapper = shallow(<Pages {...props}/>)
  })

  it('It should render 9 links', () => {
    expect(wrapper.find(Link)).toHaveLength(9);
  });
  it('El primer Link debe tener el texto "1" y cambiar la ruta hacia "/home".', () => {
    //el orden donde declaran los Links es importante
    expect(wrapper.find(Link).at(0).prop('to')).toEqual('/home?page=1');
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find(Link).at(0).text()).toEqual('1');
  });
  it('El segundo Link debe tener el texto "2" y cambiar la ruta hacia "/home?page=2"', () => {
    expect(wrapper.find(Link).at(1).prop('to')).toEqual('/home?page=2');
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find(Link).at(1).text()).toEqual('2');
  });
  it('El tercer Link debe tener el texto "3" y cambiar la ruta hacia "/home?page=3"', () => {
    expect(wrapper.find(Link).at(2).prop('to')).toEqual('/home?page=3');
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find(Link).at(2).text()).toEqual('3');
  });
  it('El cuarto Link debe tener el texto "4" y cambiar la ruta hacia "/home?page=4"', () => {
    expect(wrapper.find(Link).at(3).prop('to')).toEqual('/home?page=4');
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find(Link).at(3).text()).toEqual('4');
  });
  it('El quinto Link debe tener el texto "5" y cambiar la ruta hacia "/home?page=5"', () => {
    expect(wrapper.find(Link).at(4).prop('to')).toEqual('/home?page=5');
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find(Link).at(4).text()).toEqual('5');
  });
  it('El sexto Link debe tener el texto "6" y cambiar la ruta hacia "/home?page=6"', () => {
    expect(wrapper.find(Link).at(5).prop('to')).toEqual('/home?page=6');
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find(Link).at(5).text()).toEqual('6');
  });
  it('El septimo Link debe tener el texto "7" y cambiar la ruta hacia "/home?page=7"', () => {
    expect(wrapper.find(Link).at(6).prop('to')).toEqual('/home?page=7');
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find(Link).at(6).text()).toEqual('7');
  });
    it('El octavo Link debe tener el texto "Next" y cambiar la ruta hacia "/home?page=2"', () => {
    expect(wrapper.find(Link).at(7).prop('to')).toEqual('/home?page=2');
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find(Link).at(7).text()).toEqual('Next');
  });
  it('El ultimo Link debe tener el texto "12" y cambiar la ruta hacia "/home?page=12"', () => {
    expect(wrapper.find(Link).at(8).prop('to')).toEqual('/home?page=12');
    // Tiene que ser literal! ojo con los espacios.
    expect(wrapper.find(Link).at(8).text()).toEqual('12');
  });
})