import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Button, Card, Label, Header, Icon, Form } from 'semantic-ui-react'
import { JSDOM } from 'jsdom'
import createDOMPurify from 'dompurify'
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-bottts-sprites';

import { USER_ALIAS, USER_LOGGED, USER_SINCE, USER_SESSION_LENGTH, USER_HASH } from './redux/constants';


const window = (new JSDOM('')).window
const DOMPurify = createDOMPurify(window)

export class WelcomePage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  handleChange = (event, { name, value }) => {
    this.props.home[name] = value;
  }

  hashCode = s => s.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a }, 0);

  login = () => {
    const { userAlias_, userSessionLength_ } = this.props.home;

    localStorage.setItem(USER_ALIAS, userAlias_)
    localStorage.setItem(USER_SESSION_LENGTH, userSessionLength_)
    localStorage.setItem(USER_LOGGED, true);
    localStorage.setItem(USER_SINCE, Date.now());
    localStorage.setItem(USER_HASH, this.hashCode(userAlias_));
    this.props.history.push('/flashcard');
  }

  logout = () => {
    localStorage.removeItem(USER_ALIAS);
    localStorage.removeItem(USER_LOGGED);
    localStorage.removeItem(USER_SINCE);
    localStorage.removeItem(USER_SESSION_LENGTH);
    localStorage.removeItem(USER_HASH);

    this.props.history.push('/');
  }

  render() {

    const isUserLogged = localStorage.getItem(USER_LOGGED);
    const userLoggedSince = localStorage.getItem(USER_SINCE);
    const userAlias = localStorage.getItem(USER_ALIAS);
    const userHash = localStorage.getItem(USER_HASH);
    const userSessionLength = localStorage.getItem(USER_SESSION_LENGTH);
    let { userAlias_, userSessionLength_ } = this.props.home;
    const timeOptions = [
      { key: 'w1', text: '1 week', value: 7, },
      { key: 'w2', text: '2 weeks', value: 14, },
      { key: 'm1', text: '1 month', value: 30, },
      { key: 'm2', text: '2 months', value: 60, },
      { key: 'm3', text: '3 months', value: 90, },
      { key: 'm6', text: '6 months', value: 180, },
      { key: 'm12', text: '12 months', value: 365, },
    ]
    return (
      <div className="home-welcome-page">
        {isUserLogged ? (<Card centered>
          <Card.Content>
            <Card.Meta dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(createAvatar(style, { 'seed': { userAlias } })) }} />
            <Card.Header>
              <Header as='h1'>{userAlias}</Header>
              <Label color='green'>#{userHash}</Label>
            </Card.Header>
            <Card.Description>
              Session length: {userSessionLength} days
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            Logged since {new Date(parseInt(userLoggedSince)).toLocaleDateString("vi-VN")}
            <div className='ui two buttons'>
              <Button icon labelPosition='left' onClick={(event, data) => this.logout()}><Icon name='arrow left' />Logout</Button>
              <Button.Or />
              <Button icon labelPosition='right' color='green' href='/flashcard'><Icon name='book' />Learning</Button>
            </div>
          </Card.Content>
        </Card>) : (<Card centered>
          <Card.Content>
            <Form onSubmit={this.login}>
              <Form.Input label='Your name' name='userAlias_' type='text' onChange={this.handleChange} value={userAlias_} />
              <Form.Dropdown label='Session length' name='userSessionLength_' type='dropdown' options={timeOptions} onChange={this.handleChange} selection value={userSessionLength_} />
              <Button type='submit'>Submit</Button>
            </Form>
          </Card.Content>
        </Card>)}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomePage);
