import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Button, Card, Label, Header, Icon } from 'semantic-ui-react'
import queryString from 'query-string';

export class Flashcard extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };


  componentDidMount() {
    const { fetchCard } = this.props.actions;
    let params = queryString.parse(this.props.location.search);
    let { day, days } = params;
    fetchCard(day, days);
  }

  render() {
    const { flashCard, cardFlipped, selectedExample, selectedMeaning, meaningGram } = this.props.home;
    const { fetchCard, flipCard, nextExample, nextMeaning } = this.props.actions;
    return (
      <div className='home-flashcard'>
        <Card fluid>
          <Card.Content>

            <Card.Header textAlign='center'>
              <Label color='green' >#{flashCard.id}</Label>
              <Header as='h1'>{flashCard.word}</Header>
            </Card.Header>
            <Card.Meta textAlign='center'>
              {meaningGram && <Label color='grey' size='tiny'>{meaningGram}</Label>}
              <Label size='large'>{flashCard.pronounce}</Label>
              {flashCard.type && <Label color='grey' size='tiny'>{flashCard.type}</Label>}
            </Card.Meta>
            <Card.Description textAlign='center'>
              {cardFlipped ?
                (<div><b>{selectedMeaning && selectedMeaning}</b>
                  <br />
                  <i>{selectedExample && selectedExample}</i>
                  <br />
                  <Button.Group size='tiny'>
                    <Button icon labelPosition='left' onClick={(event, data) => nextMeaning()}><Icon name='align justify' />Meaning</Button>
                    <Button icon labelPosition='left' onClick={(event, data) => nextExample()}><Icon name='align left' />Example</Button>
                  </Button.Group>
                </div>) :
                (<Label>not flipped yet</Label>)
              }

            </Card.Description>
          </Card.Content>
          <Card.Content extra textAlign='center'>
            <Button icon labelPosition='left' color='blue' href={'/words/' + flashCard.id}><Icon name='credit card outline' /> Detail</Button>
            <Button icon labelPosition='left' color='red' onClick={(event, data) => flipCard()}><Icon name='redo' />Flip</Button>
            <Button icon labelPosition='right' color='green' onClick={(event, data) => fetchCard()}>Next<Icon name='right arrow' /></Button>
            <Label floating>Day {flashCard.day}</Label>
          </Card.Content>
        </Card>
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
)(Flashcard);
