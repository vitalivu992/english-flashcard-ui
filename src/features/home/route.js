import { Layout, Flashcard, CardsPage, WelcomePage } from './';
export default {
  component: Layout,
  path: '',
  childRoutes: [
    { path: 'flashcard', component: Flashcard },
    { path: 'cards', component: CardsPage },
    { path: 'welcome', component: WelcomePage, isIndex: true }
  ],
};
