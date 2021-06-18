import React from 'react';
import { Input, Menu } from 'semantic-ui-react'
// import PropTypes from 'prop-types';
import {USER_ALIAS } from './redux/constants';

export default function Layout({ children }) {

  let userAlias = sessionStorage.getItem(USER_ALIAS);
  return (
    <div>
      <Menu inverted stackable>
        <Menu.Item header>Oxford 3k</Menu.Item>
        <Menu.Item name='flashcard' href='/flashcard' />
        <Menu.Item name='Data' href='https://www.oxfordlearnersdictionaries.com/wordlists/oxford3000-5000' />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search...' />
          </Menu.Item>
          <Menu.Item name={userAlias ? userAlias : 'Login'} href='/' />
        </Menu.Menu>
      </Menu>
      <div>
        {children}
      </div>
    </div>
  );
}


Layout.propTypes = {};
Layout.defaultProps = {};
