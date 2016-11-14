'use babel';

import ColorDescribeView from './color-describe-view';
import { CompositeDisposable } from 'atom';

export default {

  colorDescribeView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.colorDescribeView = new ColorDescribeView(state.colorDescribeViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.colorDescribeView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'color-describe:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.colorDescribeView.destroy();
  },

  serialize() {
    return {
      colorDescribeViewState: this.colorDescribeView.serialize()
    };
  },

  toggle() {
    console.log('ColorDescribe was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
