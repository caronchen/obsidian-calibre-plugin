import { addIcon, Plugin, SplitDirection } from 'obsidian';
import { CalibreView, CALIBRE_VIEW_TYPE } from './CalibreView';
import {
	CalibrePluginSettings,
	CalibreSettingTab,
	DEFAULT_SETTINGS,
} from './settings';
import {
	CALIBRE_ICON_ID,
	CALIBRE_ICON_SVG
} from './tools';

export default class CalibrePlugin extends Plugin {
	settings: CalibrePluginSettings;

	async onload() {
		try {
			await this.loadSettings();
			this.addSettingTab(new CalibreSettingTab(this.app, this));
			addIcon(CALIBRE_ICON_ID, CALIBRE_ICON_SVG);

			this.registerView(CALIBRE_VIEW_TYPE, (leaf) => new CalibreView(leaf, this.settings));

			this.addRibbonIcon(CALIBRE_ICON_ID, 'Calibre', async () => {
				this.activateView();
			});

			this.addCommand({
				id: 'calibre-open-horizontally',
				name: 'Open horizontally',
				callback: () => this.activateView('horizontal')
			});

			this.addCommand({
				id: 'calibre-open-vertically',
				name: 'Open vertically',
				callback: () => this.activateView('vertical')
			});
		} catch (error) {
			console.log(`Load error. ${error}`);
		}
	}

	async loadSettings() {
		this.settings = Object.assign(DEFAULT_SETTINGS, await this.loadData());
	}

	async activateView(direction?: SplitDirection) {
		const leaf = this.app.workspace.splitActiveLeaf(direction ?? this.settings.splitDirection);
		await leaf.setViewState({
			type: CALIBRE_VIEW_TYPE,
			active: true,
		});

		this.app.workspace.revealLeaf(leaf);
	}

	onunload() {
		this.app.workspace.detachLeavesOfType(CALIBRE_VIEW_TYPE);
	}
}