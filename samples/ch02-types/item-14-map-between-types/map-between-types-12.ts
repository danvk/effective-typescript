interface State {
  userId: string;
  pageTitle: string;
  recentFiles: string[];
  pageContents: string;
}
type TopNavState = Pick<State, 'userId' | 'pageTitle' | 'recentFiles'>;
