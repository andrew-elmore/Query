import { bindActionCreators } from 'redux';
import AppStateActions from './AppStateActions'
import UploadActions from './UploadActions'
import QueryActions from './QueryActions'
import ViewActions from './ViewActions'
import DownloadActions from './DownloadActions';

const actionsToBind = {
  AppStateActions,
  UploadActions,
  QueryActions,
  ViewActions,
  DownloadActions
};

export default class Actions {
  constructor(dispatch) {
      this.dispatch = dispatch;
      const boundActions = this.generateBoundAction();
      Object.keys(boundActions).forEach((key) => {
          this[key] = boundActions[key];
      });
  }

  clone = () => new Actions(this.dispatch);

  generateBoundAction() {
      const a2b = { ...actionsToBind };
      Object.keys(a2b).forEach((key) => {
          a2b[key] = bindActionCreators(a2b[key], this.dispatch);
      });
      return a2b;
  }
}

/** A function that creates a action provider, used within a react-redux `connect` injection call * */
export const actionProvider = (dispatch) => ({ actions: new Actions(dispatch) });