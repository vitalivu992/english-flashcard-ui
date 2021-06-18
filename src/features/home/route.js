import { Layout, Flashcard, CardDetail, WelcomePage } from './';
export default {
  component: Layout,
  path: '',
  childRoutes: [
    { path: 'flashcard', component: Flashcard },
    { path: 'card', component: CardDetail },
    { path: 'welcome', component: WelcomePage, isIndex: true }
  ],
};
