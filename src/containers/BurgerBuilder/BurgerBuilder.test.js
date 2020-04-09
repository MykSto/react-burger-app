import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from 'containers/BurgerBuilder/BurgerBuilder';
import BuildControls from 'components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder>', () => {
  let wrapper;

  beforeEach(() => {
    //   important: onFetchIngredients is in useEffect(), thus should be passed with shallow
    wrapper = shallow(<BurgerBuilder onFetchIngredients={() => {}} />);
  });

  it('should render BuildControls when receiving ingredients', () => {
    wrapper.setProps({
      ings: {
        salad: 0, bacon: 0, cheese: 0, meat: 0,
      },
    });
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
