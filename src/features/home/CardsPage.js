import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Segment, Button, Card, Label, Header, Icon } from 'semantic-ui-react'
import queryString from 'query-string';

export class CardsPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };


  componentDidMount() {
    console.log('this.props.location', this.props.location);
    if (this.props.location.search) {
      const { fetchWordById, fetchWords } = this.props.actions;
      let params = queryString.parse(this.props.location.search);
      console.log('params', params);
      let { day, length, id } = params;
      if (id) {
        this.props.home.words = [];
        fetchWordById(id);
      } if (day && length) {
        this.props.home.word = null;
        fetchWords(day, length);
      }
    }
  }


  render() {
    const { words, word } = this.props.home;
    console.log('word', words, 'word', word)
    return (
      <div className="home-cards-page">
        {word !== null ? (<Card fluid>
          <Card.Content>
            <Card.Header >
              <Label size='small' float='left' ><Icon name='info circle' /> Info</Label>
              <Header as='h1' textAlign='center'>{word.word}</Header>
            </Card.Header>
            <Card.Meta textAlign='center'>
              {word.type && <Label color='grey' size='tiny'>{word.type}</Label>}
              <Label size='large'>{word.pronounce && word.pronounce}</Label>
            </Card.Meta>
            <Card.Description>
              {word.meanings && word.meanings.map((mean, idx) => (<div>
                <Label circular>{idx + 1}</Label>
                {mean.gram && <Label color='grey' size='small'>{mean.gram}</Label>}
                <b> {mean.mean && mean.mean}</b>
                {mean.example && <ul>
                  {mean.example.map(example => (<li><i>{example && example}</i></li>))}
                </ul>}
              </div>))}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Button icon labelPosition='left' onClick={(event, data) => window.history.back()}>Back<Icon name='left arrow' /></Button>
          </Card.Content>
        </Card>) : words.length > 0 ? (<Card.Group fluid>
          {words.map((word, idx) => (<Card>
            <Card.Content>
              <Card.Header >
                <Label size='mini' color='red' circular title='Close' as='a' />
                <Label size='mini' color='green' circular title='Detail' as='a' />
                <Header as='h2' textAlign='center'>{word.word}</Header>
              </Card.Header>
              <Card.Meta textAlign='center'>
                {word.type && <Label color='grey' size='tiny'>{word.type}</Label>}
                <Label size='large'>{word.pronounce && word.pronounce}</Label>
              </Card.Meta>
            </Card.Content>
          </Card>))}
        </Card.Group>) : (
              <Segment>
                Nothing to show
          </Segment>
            )}
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
)(CardsPage);
