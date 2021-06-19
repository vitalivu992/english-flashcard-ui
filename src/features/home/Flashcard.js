import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Button, Card, Label, Header, Icon, Progress } from 'semantic-ui-react'
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

  nextCard() {
    const { fetchCard } = this.props.actions;
    const { cardFlipped } = this.props.home;

    if (!cardFlipped)
      this.props.home.consecutiveNext += 1;
    else
      this.props.home.consecutiveNext = 0;
    fetchCard();
  }

  render() {
    const { flashCard, cardFlipped, selectedExample, selectedMeaning, meaningGram, consecutiveNext } = this.props.home;
    const { flipCard, nextExample, nextMeaning } = this.props.actions;
    return (
      <div className='home-flashcard'>
        <Card fluid>
          <Card.Content>
            <Card.Header >
              <Label size='tiny' float='left' color='green' >#{flashCard.id}</Label>
              <Header as='h1' textAlign='center'>{flashCard.word}</Header>
              <Label size='small' color='blue' ribbon='right' as='a' href={'/cards?day='+flashCard.day+'&length='+flashCard.days}>Day {flashCard.day}/{flashCard.days}</Label>
            </Card.Header>
            <Card.Meta textAlign='center'>
              {flashCard.type && <Label color='grey' size='tiny'>{flashCard.type}</Label>}
              <Label size='large'>{flashCard.pronounce}</Label>
            </Card.Meta>
            <Card.Description textAlign='center'>
              {cardFlipped ? (<div>
                {meaningGram && <Label color='grey' size='tiny'>{meaningGram}</Label>}
                <b>{selectedMeaning && selectedMeaning}</b>
                <br />
                <i>{selectedExample && selectedExample}</i>
                <br />
                <Button.Group size='mini'>
                  <Button color='grey' onClick={(event, data) => nextMeaning()}>Meaning</Button>
                  <Button.Or />
                  <Button onClick={(event, data) => nextExample()}>Example</Button>
                </Button.Group>
              </div>) : (
                  <Button icon labelPosition='left' color='red' onClick={(event, data) => flipCard()}><Icon name='flipboard' />Show</Button>)
              }

            </Card.Description>
          </Card.Content>
          <Card.Content extra textAlign='center'>
            <Button icon labelPosition='left' href={'/cards?id=' + flashCard.id}><Icon name='credit card outline' /> Detail</Button>
            {cardFlipped ? (<Button icon labelPosition='left' color='green' onClick={(event, data) => flipCard()}><Icon name='flipboard' />Hide</Button>) : ('')}
            <Button icon labelPosition='right' color='blue' onClick={(event, data) => this.nextCard()}>Next<Icon name='right arrow' /></Button>
          </Card.Content>
          <Card.Content>
            <Progress value={consecutiveNext} total={flashCard.limit} progress='percent' precision='1' active size='small' autoSuccess />
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
