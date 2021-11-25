import { App, Platform, PluginSettingTab, Setting } from 'obsidian';
import CalibrePlugin from './main';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface CalibrePluginSettings {
	address: string;
}

export const DEFAULT_SETTINGS: CalibrePluginSettings = {
	address: 'http://localhost:8080',
}

export class CalibreSettingTab extends PluginSettingTab {

	constructor(app: App, private plugin: CalibrePlugin) {
		super(app, plugin);
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();
		containerEl.createEl('h2', { text: 'Calibre Settings' });

		new Setting(containerEl)
			.setName("Address")
			.setDesc("The address of calibre Content server.")
			.addText(text => {
				text.inputEl.size = 25;
				text
					.setPlaceholder("http://localhost:8080")
					.setValue(this.plugin.settings.address)
					.onChange(async (value) => {
						this.plugin.settings.address = value;
						await this.plugin.saveSettings();
					});
			});

		if (Platform.isDesktopApp) {
			ReactDOM.render(
				<>
					<p>Make a donation to support Calibre plugin development.</p>
					<p>❤️ Thank you for your support. ❤️</p>
					<a href="https://paypal.me/caronchenhz" className="paypal">
						<svg width="145px" height="37px" viewBox="0 0 145 37" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
							<defs>
								<polygon id="path-1" points="0 0.30377 29.7890799 0.30377 29.7890799 36.629778 0 36.629778"></polygon>
								<polygon id="path-3" points="0 0.30377 27.0026179 0.30377 27.0026179 32.599368 0 32.599368"></polygon>
								<polygon id="path-5" points="0 0.30377 27.0025944 0.30377 27.0025944 32.599368 0 32.599368"></polygon>
							</defs>
							<g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
								<g id="01.2---Corp-Landing---Sticky-Nav" transform="translate(-80.000000, -21.000000)">
									<g id="logo-paypal" transform="translate(80.000000, 21.000000)">
										<path d="M112.489747,16.203225 C112.054389,19.158415 109.870796,19.158415 107.758093,19.158415 L106.556562,19.158415 L107.399352,13.640975 C107.450549,13.307605 107.728735,13.061925 108.055253,13.061925 L108.606253,13.061925 C110.04408,13.061925 111.402426,13.061925 112.102364,13.908485 C112.521611,14.415015 112.647994,15.165745 112.489747,16.203225 M111.570698,8.493535 L103.60429,8.493535 C103.059735,8.493535 102.595735,8.903125 102.511241,9.458865 L99.2897346,30.568475 C99.2260062,30.985095 99.5374877,31.362125 99.9456358,31.362125 L104.033204,31.362125 C104.414142,31.362125 104.739228,31.075005 104.798302,30.686135 L105.711623,24.701385 C105.796833,24.145275 106.260475,23.735315 106.805031,23.735315 L109.325525,23.735315 C114.572735,23.735315 117.600907,21.111645 118.3925,15.910185 C118.748735,13.635425 118.406821,11.847955 117.376068,10.596615 C116.243278,9.220955 114.235475,8.493535 111.570698,8.493535" id="Fill-1" fill="#009CDE"></path>
										<path d="M55.6725531,16.203225 C55.2371951,19.158415 53.0532444,19.158415 50.9412568,19.158415 L49.7393679,19.158415 L50.582158,13.640975 C50.6333556,13.307605 50.9115407,13.061925 51.2380593,13.061925 L51.7890593,13.061925 C53.2268864,13.061925 54.5852321,13.061925 55.2851704,13.908485 C55.7040593,14.415015 55.8308,15.165745 55.6725531,16.203225 M54.7535037,8.493535 L46.7870963,8.493535 C46.2425407,8.493535 45.7788988,8.903125 45.6936889,9.458865 L42.4725407,30.568475 C42.4091704,30.985095 42.7206519,31.362125 43.128442,31.362125 L46.9320963,31.362125 C47.4766519,31.362125 47.9402938,30.952165 48.0255037,30.396055 L48.8944296,24.701385 C48.9792815,24.145275 49.4432815,23.735315 49.987837,23.735315 L52.5086889,23.735315 C57.7555407,23.735315 60.7840716,21.111645 61.5753062,15.910185 C61.9315407,13.635425 61.5896272,11.847955 60.5592321,10.596615 C59.426084,9.220955 57.4182815,8.493535 54.7535037,8.493535" id="Fill-3" fill="#003087"></path>
										<path d="M73.2472333,23.781713 C72.8788259,26.034273 71.1484926,27.546093 68.9416284,27.546093 C67.8353321,27.546093 66.949579,27.178313 66.3803198,26.482343 C65.8160728,25.791923 65.6034062,24.808093 65.7824185,23.712893 C66.1261222,21.480683 67.8840235,19.919653 70.0572333,19.919653 C71.140616,19.919653 72.0199247,20.291133 72.6002827,20.994133 C73.184579,21.701943 73.4144309,22.692063 73.2472333,23.781713 M78.563184,16.108653 L74.7487889,16.108653 C74.4219123,16.108653 74.1437272,16.354333 74.0925296,16.688073 L73.9253321,17.790303 L73.6582457,17.391073 C72.8322827,16.151573 70.9913198,15.737913 69.1525049,15.737913 C64.9385543,15.737913 61.338616,19.038313 60.6379617,23.667013 C60.2731346,25.976553 60.7908383,28.183233 62.0578877,29.723543 C63.222184,31.138793 64.8830605,31.727833 66.862221,31.727833 C70.2588012,31.727833 72.1430852,29.472683 72.1430852,29.472683 L71.9726654,30.568253 C71.908937,30.984873 72.2204185,31.361903 72.6285667,31.361903 L76.0638136,31.361903 C76.6083691,31.361903 77.0720111,30.952683 77.156863,30.396573 L79.2190852,16.901563 C79.2824556,16.485313 78.9709741,16.108653 78.563184,16.108653" id="Fill-5" fill="#003087"></path>
										<path d="M130.064427,23.781713 C129.69602,26.034273 127.966044,27.546093 125.75918,27.546093 C124.652526,27.546093 123.766773,27.178313 123.197156,26.482343 C122.633267,25.791923 122.4206,24.808093 122.599612,23.712893 C122.943316,21.480683 124.701217,19.919653 126.874427,19.919653 C127.957452,19.919653 128.837119,20.291133 129.417477,20.994133 C130.001773,21.701943 130.231625,22.692063 130.064427,23.781713 M135.380378,16.108653 L131.565983,16.108653 C131.239106,16.108653 130.960921,16.354333 130.909723,16.688073 L130.742526,17.790303 L130.47544,17.391073 C129.649477,16.151573 127.808156,15.737913 125.969699,15.737913 C121.755748,15.737913 118.15581,19.038313 117.455156,23.667013 C117.090686,25.976553 117.608032,28.183233 118.875081,29.723543 C120.03902,31.138793 121.700254,31.727833 123.679415,31.727833 C127.075995,31.727833 128.960279,29.472683 128.960279,29.472683 L128.789859,30.568253 C128.726131,30.984873 129.037612,31.361903 129.44576,31.361903 L132.881007,31.361903 C133.425563,31.361903 133.889205,30.952683 133.974057,30.396573 L136.036279,16.901563 C136.099649,16.485313 135.788168,16.108653 135.380378,16.108653" id="Fill-7" fill="#009CDE"></path>
										<path d="M98.8795457,16.108727 L95.0454593,16.108727 C94.678842,16.108727 94.3358543,16.296687 94.1296321,16.610077 L88.8408914,24.660167 L86.5992988,16.924947 C86.4593111,16.440617 86.0278914,16.108727 85.5391877,16.108727 L81.7702617,16.108727 C81.3148543,16.108727 80.9951383,16.571227 81.1415704,17.016707 L85.3633975,29.823147 L81.3925457,35.613277 C81.0807062,36.068007 81.3954099,36.696267 81.9345951,36.696267 L85.7647432,36.696267 C86.1277802,36.696267 86.4675457,36.512377 86.674484,36.204167 L99.4251753,17.186167 C99.7302123,16.731067 99.4151506,16.108727 98.8795457,16.108727" id="Fill-9" fill="#003087"></path>
										<path d="M139.876523,9.07314 L136.606684,30.56903 C136.543314,30.98565 136.855153,31.36194 137.262585,31.36194 L140.551042,31.36194 C141.095598,31.36194 141.55924,30.95235 141.644091,30.39661 L144.867746,9.287 C144.931474,8.87038 144.619993,8.49372 144.211844,8.49372 L140.532425,8.49372 C140.205548,8.49372 139.927363,8.7394 139.876523,9.07314" id="Fill-11" fill="#009CDE"></path>
										<g id="Group-15" transform="translate(0.000000, 0.066415)">
											<mask id="mask-2" fill="white">
												<use xlinkHref="#path-1"></use>
											</mask>
											<g id="Clip-14"></g>
											<path d="M26.8450852,9.532828 C27.2739988,6.706768 26.842221,4.784248 25.363221,3.042288 C23.7349247,1.124948 20.7933938,0.303548 17.0294802,0.303548 L6.10471481,0.303548 C5.33567778,0.303548 4.68085062,0.881858 4.56091235,1.667368 L0.0114925926,31.479008 C-0.0780135802,32.067308 0.361998765,32.599368 0.938060494,32.599368 L7.68252963,32.599368 L7.21709753,35.650018 C7.13869012,36.164688 7.52320864,36.629778 8.02730741,36.629778 L13.7120235,36.629778 C14.3851099,36.629778 14.9579494,36.123988 15.0628506,35.437268 L15.1187025,35.138308 L16.1895543,28.120148 L16.2586531,27.732388 C16.3635543,27.045668 16.9363938,26.539508 17.6091222,26.539508 L18.4594309,26.539508 C23.9669247,26.539508 28.2793321,24.227378 29.539221,17.539998 C30.0658753,14.745388 29.7934185,12.413278 28.4014185,10.773438 C27.9800235,10.277268 27.4562333,9.867308 26.8450852,9.532828" id="Fill-13" fill="#009CDE" mask="url(#mask-2)"></path>
										</g>
										<g id="Group-18" transform="translate(0.000000, 0.066415)">
											<mask id="mask-4" fill="white">
												<use xlinkHref="#path-3"></use>
											</mask>
											<g id="Clip-17"></g>
											<path d="M26.8450852,9.532828 C27.2739988,6.706768 26.842221,4.784248 25.363221,3.042288 C23.7349247,1.124948 20.7933938,0.303548 17.0294802,0.303548 L6.10471481,0.303548 C5.33567778,0.303548 4.68085062,0.881858 4.56091235,1.667368 L0.0114925926,31.479008 C-0.0780135802,32.067308 0.361998765,32.599368 0.938060494,32.599368 L7.68252963,32.599368 L9.37670247,21.496778 L9.32407284,21.844948 C9.44401111,21.059808 10.0931099,20.481498 10.8625049,20.481498 L14.0679,20.481498 C20.3634062,20.481498 25.2930481,17.838218 26.7333815,10.194018 C26.7759864,9.967578 26.8125049,9.748538 26.8450852,9.532828" id="Fill-16" fill="#012169" mask="url(#mask-4)"></path>
										</g>
										<g id="Group-21" transform="translate(0.000000, 0.066415)">
											<mask id="mask-6" fill="white">
												<use xlinkHref="#path-5"></use>
											</mask>
											<g id="Clip-20"></g>
											<path d="M11.196721,9.570198 C11.268684,9.098078 11.5622642,8.711058 11.9571654,8.515698 C12.1365358,8.426898 12.3370296,8.377318 12.5471901,8.377318 L21.1107827,8.377318 C22.1254247,8.377318 23.0713259,8.445768 23.9363136,8.590068 C24.1833506,8.630768 24.4239432,8.678128 24.6573753,8.731778 C24.8911654,8.785428 25.1177951,8.845368 25.3372642,8.911598 C25.4471778,8.944898 25.5549432,8.979678 25.6612765,9.015938 C26.0858938,9.161718 26.4811531,9.333398 26.8452642,9.532828 C27.2738198,6.706768 26.842042,4.783878 25.363042,3.042288 C23.7351037,1.124948 20.7932148,0.303548 17.0296593,0.303548 L6.10489383,0.303548 C5.33549877,0.303548 4.6806716,0.881858 4.56073333,1.667368 L0.0116716049,31.479008 C-0.0781925926,32.067308 0.361819753,32.599368 0.937881481,32.599368 L7.68270864,32.599368 L9.37688148,21.496778 L11.196721,9.570198 Z" id="Fill-19" fill="#003087" mask="url(#mask-6)"></path>
										</g>
									</g>
								</g>
							</g>
						</svg>
					</a>
				</>,
				containerEl.createDiv({cls: "calibre-donation"})
			);
		}
	}
}