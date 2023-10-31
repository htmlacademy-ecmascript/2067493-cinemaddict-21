import AbstractView from '../framework/view/abstract-view.js';
import { createPopupContainerTemplate } from './view-template/popup/popup-container-template.js';

export default class PopupContainer extends AbstractView {
  get template() {
    return createPopupContainerTemplate();
  }
}
