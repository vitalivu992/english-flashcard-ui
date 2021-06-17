import { Flashcard, CardDetail } from './';

export default {
  path: '',
  childRoutes: [
    { path: 'flashcard', component: Flashcard, isIndex: true },
    { path: 'card', component: CardDetail }
  ],
};
