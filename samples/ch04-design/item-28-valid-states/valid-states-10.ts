interface RequestPending {
  state: 'pending';
}
interface RequestError {
  state: 'error';
  error: string;
}
interface RequestSuccess {
  state: 'ok';
  pageText: string;
}
type RequestState = RequestPending | RequestError | RequestSuccess;

interface State {
  currentPage: string;
  requests: {[page: string]: RequestState};
}
function getUrlForPage(p: string) { return ''; }
interface CockpitControls {
  /** Angle of the left side stick in degrees, 0 = neutral, + = forward */
  leftSideStick: number;
  /** Angle of the right side stick in degrees, 0 = neutral, + = forward */
  rightSideStick: number;
}
function getStickSetting(controls: CockpitControls) {
  const {leftSideStick, rightSideStick} = controls;
  if (leftSideStick === 0) {
    return rightSideStick;
  }
  return leftSideStick;
}
