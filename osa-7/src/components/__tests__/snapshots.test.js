import React from 'react';
import Notification from '../Notification/Notification';
import renderer from 'react-test-renderer';

describe('Snapshots', () => {
  describe('<Notification />', () => {
    it('renders correctly', () => {

      const notif = {
        message: 'Test',
        status: 'error'
      }

      const tree = renderer
        .create(<Notification notification={notif} />)
        .toJSON();

      expect(tree).toMatchSnapshot();
    })
  })
})
