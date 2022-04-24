import { ItemView, WorkspaceLeaf } from "obsidian";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { CalibrePluginSettings } from "./settings";

export const CALIBRE_VIEW_TYPE = "calibre-view";

export class CalibreView extends ItemView {
  constructor(leaf: WorkspaceLeaf, private settings: CalibrePluginSettings) {
    super(leaf);
  }

  getViewType() {
    return CALIBRE_VIEW_TYPE;
  }

  getDisplayText() {
    return this.settings.displayText;
  }

  async onOpen() {
    const container = this.containerEl.children[1];
		ReactDOM.unmountComponentAtNode(container);
		try {
			const props = this.settings;

			ReactDOM.render(
				<iframe src={props.address}></iframe>,
				container
			);
		} catch (e) {
      console.error(e);
			ReactDOM.render(
				<div style={{ color: 'var(--text-title-h1)' }}>{e.toString()}</div>,
				container
			);
		}
  }

  async onClose() {
    // Nothing to clean up.
  }
}