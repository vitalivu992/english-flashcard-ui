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
    if (this.props.location.search) {
      const { fetchWordById, fetchWords, fetchWord } = this.props.actions;
      let params = queryString.parse(this.props.location.search);
      let { day, id, word } = params;
      if (id) {
        fetchWordById(id);
      } else if (word) {
        fetchWord(word)
      } if (day) {
        fetchWords(day);
      }
    }
  }

  render() {
    const { words, word } = this.props.home;
    const { removeWord } = this.props.actions;
    return (
      <div className="home-cards-page">
        {word !== null ? (<Card fluid>
          <Card.Content>
            <Card.Header >
              <Button size='small' icon labelPosition='left' onClick={(event, data) => window.history.back()}>Back<Icon name='left arrow' /></Button>
              <Header as='h1' textAlign='center'>{word.word}</Header>
            </Card.Header>
            <Card.Meta textAlign='center'>
              {word.type && <Label color='grey' size='tiny'>{word.type}</Label>}
              <Label size='large'>{word.pronounce && word.pronounce}</Label>
            </Card.Meta>
            <Card.Description>
              {word.meanings && word.meanings.map((mean, idx) => (<Segment key={'word-mean-' + idx}>
                <Label circular>{idx + 1}</Label>
                {mean.gram && <Label color='grey' size='small'>{mean.gram}</Label>}
                <b> {mean.mean && mean.mean}</b>
                {mean.example && <ul>
                  {mean.example.map((example, idx_ex) => (<li key={'word-example-' + idx_ex}><i>{example && example}</i></li>))}
                </ul>}
              </Segment>))}
            </Card.Description>
          </Card.Content>
        </Card>) : words.length > 0 ? (<Card.Group>
          {words.map((word, idx) => (<Card key={'card-' + idx}>
            <Card.Content>
              <Card.Header >
                <Label size='mini' color='red' circular title='Remove' onClick={(event, data) => removeWord(word.word)} as='a' />
                <Label size='mini' color='green' circular title={'View more on ' + word.word} href={'/cards?word=' + word.word} as='a' />
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
