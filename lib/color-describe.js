'use babel';

import { CompositeDisposable } from 'atom';
import Debounce from 'lodash.debounce';
import TinyColor from 'tinycolor2';

import Color from './color';

export default {

  subscriptions: null,

  isValidFileType(scopes=[]) {
    const allowedFileTypes = atom.config.get('color-describe.fileTypes');
    return scopes.length && allowedFileTypes.indexOf(scopes[0]) >= 0;
  },

  format(input, description) {
    return `The color, \`${input}\`, is a ${description}.`;
  },

  onSelectionChange(event) {
    const text = event.selection.getText().trim();

    if (text) {
      const tinycolor = new TinyColor(text);
      const color = new Color(tinycolor);

      if (!color.isValid) return; // just ignore

      color.init();

      const output = this.format(tinycolor.getOriginalInput(), color.getDescription());

      atom.notifications.addInfo(output, {
        detail: 'via color-describe'
      });
    }
  },

  observeTextEditors(editor) {
    if (editor) {
      const { scopes } = editor.getRootScopeDescriptor();

      if (this.isValidFileType(scopes)) {
        const timeout = atom.config.get('color-describe.timeout');
        const onSelectionChange = this.onSelectionChange.bind(this);
        const debounce = Debounce(onSelectionChange, timeout);
        editor.onDidChangeSelectionRange(debounce);
      }
    }
  },

  activate(state) {
    this.subscriptions = new CompositeDisposable();

    const observeTextEditors = this.observeTextEditors.bind(this);
    this.subscriptions.add(
      atom.workspace.observeTextEditors(observeTextEditors)
    );
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {}

};
