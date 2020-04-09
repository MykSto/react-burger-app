import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from 'components/Navigation/NavigationItems/NavigationItems';
import NavigationItem from 'components/Navigation/NavigationItems/NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
  it('should render two <NavigationItems /> elements if not authenticated', () => {
    const wrapper = shallow(<NavigationItems />);

    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
});
