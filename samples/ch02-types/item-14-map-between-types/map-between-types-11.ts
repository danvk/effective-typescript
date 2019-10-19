interface State {
  userId: string;
  pageTitle: string;
  recentFiles: string[];
  pageContents: string;
}
type TopNavState = {
  [k in 'userId' | 'pageTitle' | 'recentFiles']: State[k]
};
