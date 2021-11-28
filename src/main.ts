import { addIcon, Plugin, TFile } from 'obsidian';
import { CalibrePluginSettings, CalibreSettingTab, SERVER_ADDRESS_CHANGED, DEFAULT_SETTINGS } from './settings';
import { calibreContainer, CALIBRE_CONTAINER_FILE_IDENTIFIER, CALIBRE_ICON_ID, CALIBRE_ICON_SVG } from './tools';

const CALIBRE_CONTAINER_FILE_NAME = '@CALIBRE.Container';
const CALIBRE_CONTAINER_FILE_PATH = `${CALIBRE_CONTAINER_FILE_NAME}.md`;

declare module 'obsidian' {
    interface Vault {
        on(name: 'calibre:server-address-changed', callback: () => void): EventRef;
    }
}

export default class CalibrePlugin extends Plugin {
	settings: CalibrePluginSettings;

	async onload() {
		try {
			await this.loadSettings();
			this.addSettingTab(new CalibreSettingTab(this.app, this));
			addIcon(CALIBRE_ICON_ID, CALIBRE_ICON_SVG);

			this.addRibbonIcon(CALIBRE_ICON_ID, 'Calibre', async (event: MouseEvent) => {
				const calibre = await this.createOrGetCalibreContainerFile();
				if (calibre != null) {
					this.app.workspace.getLeaf(true).setViewState({
						type: 'markdown',
						state: { file: calibre.path, mode: 'preview' }
					});
				}
			});

			this.app.workspace.onLayoutReady(() => {
				const upperCasePath = CALIBRE_CONTAINER_FILE_PATH.toUpperCase();
				this.app.workspace.getLeavesOfType('markdown')
					.filter(leaf => (leaf.getViewState().state?.file as string).toUpperCase() == upperCasePath)
					.forEach(leaf => {
						const state = leaf.getViewState();
						state.state.mode = 'preview';
						leaf.setViewState(state);
					});
			});

			this.registerEvent(this.app.vault.on(`calibre:${SERVER_ADDRESS_CHANGED}`, () => {
				this.changeServerAddress();
			}));
		} catch (error) {
			console.log(`Load error. ${error}`);
		}
	}
	
	async createOrGetCalibreContainerFile(): Promise<TFile> {
		if (await this.app.vault.adapter.exists(CALIBRE_CONTAINER_FILE_PATH, false)) {
			return this.app.vault.getRoot().children
				.filter(file => file instanceof TFile)
				.filter(file => file.name.toUpperCase() == CALIBRE_CONTAINER_FILE_PATH.toUpperCase())
				.first() as TFile;
		}
		return this.app.vault.create(CALIBRE_CONTAINER_FILE_PATH, calibreContainer(this.settings.address));
	}
	
	async changeServerAddress(): Promise<void> {
		const calibre = await this.createOrGetCalibreContainerFile();
		const content = await this.app.vault.read(calibre);
		if (content.contains(CALIBRE_CONTAINER_FILE_IDENTIFIER)) {
			await this.app.vault.modify(calibre, calibreContainer(this.settings.address));
		} else {
			console.error('INVALID CALIBRE CONTAINER FILE FOUND.');
		}
	}

	async loadSettings() {
		this.settings = Object.assign(DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings(type?: string) {
		await this.saveData(this.settings);
		if (type) this.app.vault.trigger(`calibre:${type}`);
	}
}