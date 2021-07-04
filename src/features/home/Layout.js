import React from 'react';
import { Menu } from 'semantic-ui-react'
// import PropTypes from 'prop-types';
import { USER_ALIAS } from './redux/constants';

export default function Layout({ children }) {

  let userAlias = localStorage.getItem(USER_ALIAS);
  return (
    <div>
      <Menu inverted fluid icon='labeled'>
        <Menu.Item header>Oxford 3k</Menu.Item>
        <Menu.Item name='flashcard' href='/flashcard' />
        <Menu.Item name='Data' href='https://www.oxfordlearnersdictionaries.com/wordlists/oxford3000-5000' />
        <Menu.Item position='right' name={userAlias ? userAlias : 'Login'} href='/' />
      </Menu>
      <div>
        {children}
      </div>
    </div>
  );
}


Layout.propTypes = {};
Layout.defaultProps = {};
