const initialState = {
  fetchCardPending: false,
  fetchCardError: null,
  flashCard: {},
  cardFlipped: false,
  meaningGram: null,
  selectedExamples: [],
  selectedMeaning: null,
  selectedExample: null,
  userSessionLength_: null,
  userAlias_: null,
  consecutiveNext: 0,

  word: null,
  words: [],
  cardId: 0,
  cardForDay: 0,
  cardForLength: 0,
  fetchWordByIdPending: false,
  fetchWordByIdError: null,
  fetchWordsPending: false,
  fetchWordsError: null
};

export default initialState;
