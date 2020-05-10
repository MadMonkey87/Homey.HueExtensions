'use strict';

const Homey = require('homey');
const { http } = require('./nbhttp');

class HueExtensionsApp extends Homey.App {
	
	onInit() {
		this.log('HueExtensionsApp is running...');

		this.host = Homey.ManagerSettings.get('host');
		this.apikey = Homey.ManagerSettings.get('apikey');

		if (!this.host || !this.apikey) {
			Homey.ManagerSettings.on('set', this.onSettingsChanged.bind(this));
			return this.log('Go to the app settings page and fill all the fields');
		}

		this.initializeActions();
	}

	initializeActions() {
		let setGroupRelativeBrightnessAction = new Homey.FlowCardAction('set_group_relative_brightness');
		setGroupRelativeBrightnessAction
			.register()
			.registerRunListener(async ( args, state ) => {
				const groupState = { bri_inc : Math.round(args.relative_increasement * 254) };
				return new Promise((resolve) => {
					this.setGroupState(args.group.id, groupState,(error, result) => {
						console.log(JSON.stringify(error));
						if (error) {
							return this.error(error);
						}
						resolve(true);
					})
				});
			})
			.getArgument('group')
			.registerAutocompleteListener(( query, args ) => {
				return new Promise((resolve) => {
					this.getGroupsList((error, groups) => {
						if (error) {
							return this.error(error);
						}
						let result = [{ name: 'All lights', id: '0'}];
						Object.entries(groups).forEach(entry => {
							const key = entry[0];
							const group = entry[1];
							result.push({name: group.name, id: key});
						});
						resolve(result);
					})
				});
			})
	}

	getLightState(device, callback) {
		http.get(`http://${this.host}/api/${this.apikey}/lights/${device.id}`, (error, response) => {
			callback(error, !!error ? null : JSON.parse(response))
		})
	}

	getSensorState(device, callback) {
		http.get(`http://${this.host}/api/${this.apikey}/sensors/${device.id}`, (error, response) => {
			callback(error, !!error ? null : JSON.parse(response))
		})
	}

	getLightsList(callback) {
		http.get(`http://${this.host}/api/${this.apikey}/lights`, (error, response) => {
			callback(error, !!error ? null : JSON.parse(response))
		})
	}

	getSensorsList(callback) {
		http.get(`http://${this.host}/api/${this.apikey}/sensors`, (error, response) => {
			callback(error, !!error ? null : JSON.parse(response))
		})
	}

	getGroupsList(callback) {
		http.get(`http://${Homey.app.host}/api/${Homey.app.apikey}/groups`, (error, response) => {
			callback(error, !!error ? null : JSON.parse(response))
		})
	}

	setGroupState(groupId, state, callback){
		http.put(this.host, this.port, `/api/${this.apikey}/groups/${groupId}/action`, state, (error, response) => {
			callback(error, !!error ? null : JSON.parse(response))
		})
	}
	
}

module.exports = HueExtensionsApp;