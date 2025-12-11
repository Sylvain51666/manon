"use strict";
const Translator = class {
	constructor(options) {
		this._language = "en";
		if (options === undefined) {
			options = {};
		}
		this._options = Object.assign({}, this.defaultConfig, options);
		this._language = this.getLanguage();
		this._elements = document.querySelectorAll(
			this._options.dataAttributeName
		);
	}

	get defaultConfig() {
		return {
			languages: ["en", "fr"],
			defaultLanguage: "fr",
			filesLocation: "../i18n",
			dataAttributeName: "[data-i18n]",
			detectLanguage: true,
		};
	}

	getLanguage() {
		if (!this._options.detectLanguage) {
			return this._options.defaultLanguage;
		}

		var l = navigator.languages
			? navigator.languages[0]
			: navigator.language;
		return l.substr(0, 2);
	}

	storeCurrentLanguage() {
		localStorage.setItem("language-key", this._language);
	}

	storedCurrentLanguage() {
		try {
			return localStorage.getItem("language-key") || "en";
		} catch (error) {
			return "en";
		}
	}

	loadLanguage(language) {
		if (language) {
			if (!this._options.languages.includes(language)) {
				return;
			}

			this._language = language;
			this.storeCurrentLanguage();
		}

		var translation;
		switch (this._language) {
			case "en":
				translation = en;
				break;
			case "fr":
				translation = fr;
				break;

			default:
				break;
		}
		this.translate(translation);
	}

	translate(translation) {
		function replace(element) {
			var text = element.dataset.i18n
				.split(".")
				.reduce((obj, i) => obj[i], translation);

			if (text) {
				element.innerHTML = text;
			}
		}

		this._elements.forEach(replace);
	}
};
//export default Translator;

// source : https://codeburst.io/translating-your-website-in-pure-javascript-98b9fa4ce427

/*
import Translator from "./translator.js";

var translator = new Translator({
    languages: ["en", "fr"],
    defaultLanguage: "en",
    detectLanguage: true,
    filesLocation: "_pacifa-assets/pacifaprod/wims_v2/i18n",
});
translator.loadLanguage();


*/
