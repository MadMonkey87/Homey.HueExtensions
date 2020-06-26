'use strict';

const Homey = require('homey');
const { http } = require('./nbhttp');

class HueExtensionsApp extends Homey.App {
	
	onInit() {
		this.log('HueExtensionsApp is running...');

		this.host = Homey.ManagerSettings.get('host');
		this.apikey = Homey.ManagerSettings.get('apikey');

		if (!this.host || !this.apikey) {
			return this.log('Go to the app settings page and fill all the fields');
		}

		this.initializeActions();
		this.initializeConditions();
	}

	initializeActions() {

		let setGroupRelativeBrightnessAction = new Homey.FlowCardAction('set_group_relative_brightness');
		setGroupRelativeBrightnessAction
			.register()
			.registerRunListener(async ( args, state ) => {
				const groupState = { bri_inc : Math.round(args.relative_increasement * 254), transitiontime : args.transitiontime };
				return new Promise((resolve) => {
					this.setGroupState(args.group.id, groupState, (error, result) => {
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
			});

			let setGroupColorModeAction = new Homey.FlowCardAction('set_group_colormode');
			setGroupColorModeAction
				.register()
				.registerRunListener(async ( args, state ) => {
					const groupState = { colormode : args.colormode.id};
					return new Promise((resolve) => {
						this.setGroupState(args.group.id, groupState, (error, result) => {
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
				});

				let setLightColorModeAction = new Homey.FlowCardAction('set_light_colormode');
				setLightColorModeAction
					.register()
					.registerRunListener(async ( args, state ) => {
						const lightState = { colormode : args.colormode.id};
						return new Promise((resolve) => {
							this.setLightState(args.light.id, lightState, (error, result) => {
								if (error) {
									return this.error(error);
								}
								resolve(true);
							})
						});
					})
					.getArgument('light')
					.registerAutocompleteListener(( query, args ) => {
						return new Promise((resolve) => {
							this.getLightsList((error, groups) => {
								if (error) {
									return this.error(error);
								}
								let result = [];
								Object.entries(groups).forEach(entry => {
									const key = entry[0];
									const light = entry[1];
									result.push({name: light.name,id: key});
								});
								resolve(result);
							})
						});
					});

			let setLightRelativeBrightnessAction = new Homey.FlowCardAction('set_light_relative_brightness');
			setLightRelativeBrightnessAction
				.register()
				.registerRunListener(async ( args, state ) => {
					const lightState = { bri_inc : Math.round(args.relative_increasement * 254), transitiontime : args.transitiontime };
					return new Promise((resolve) => {
						this.setLightState(args.light.id, lightState, (error, result) => {
							if (error) {
								return this.error(error);
							}
							resolve(true);
						})
					});
				})
				.getArgument('light')
				.registerAutocompleteListener(( query, args ) => {
					return new Promise((resolve) => {
						this.getLightsList((error, groups) => {
							if (error) {
								return this.error(error);
							}
							let result = [];
							Object.entries(groups).forEach(entry => {
								const key = entry[0];
								const light = entry[1];
								result.push({name: light.name,id: key});
							});
							resolve(result);
						})
					});
				});

				let setGroupRelativeSaturationAction = new Homey.FlowCardAction('set_group_relative_saturation');
				setGroupRelativeSaturationAction
					.register()
					.registerRunListener(async ( args, state ) => {
						const groupState = { sat_inc : Math.round(args.relative_increasement * 254), transitiontime : args.transitiontime };
						return new Promise((resolve) => {
							this.setGroupState(args.group.id, groupState, (error, result) => {
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
					});

					let setLightRelativeSaturationAction = new Homey.FlowCardAction('set_light_relative_saturation');
					setLightRelativeSaturationAction
						.register()
						.registerRunListener(async ( args, state ) => {
							const lightState = { sat_inc : Math.round(args.relative_increasement * 254), transitiontime : args.transitiontime };
							return new Promise((resolve) => {
								this.setLightState(args.light.id, lightState, (error, result) => {
									if (error) {
										return this.error(error);
									}
									resolve(true);
								})
							});
						})
						.getArgument('light')
						.registerAutocompleteListener(( query, args ) => {
							return new Promise((resolve) => {
								this.getLightsList((error, groups) => {
									if (error) {
										return this.error(error);
									}
									let result = [];
									Object.entries(groups).forEach(entry => {
										const key = entry[0];
										const light = entry[1];
										result.push({name: light.name,id: key});
									});
									resolve(result);
								})
							});
						});

						let setGroupRelativeHueAction = new Homey.FlowCardAction('set_group_relative_hue');
						setGroupRelativeHueAction
							.register()
							.registerRunListener(async ( args, state ) => {
								const groupState = { hue_inc : Math.round(args.relative_increasement * 65534), transitiontime : args.transitiontime };
								return new Promise((resolve) => {
									this.setGroupState(args.group.id, groupState, (error, result) => {
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
							});
		
							let setLightRelativeHueAction = new Homey.FlowCardAction('set_light_relative_hue');
							setLightRelativeHueAction
								.register()
								.registerRunListener(async ( args, state ) => {
									const lightState = { sat_inc : Math.round(args.relative_increasement * 65534), transitiontime : args.transitiontime };
									return new Promise((resolve) => {
										this.setLightState(args.light.id, lightState, (error, result) => {
											if (error) {
												return this.error(error);
											}
											resolve(true);
										})
									});
								})
								.getArgument('light')
								.registerAutocompleteListener(( query, args ) => {
									return new Promise((resolve) => {
										this.getLightsList((error, groups) => {
											if (error) {
												return this.error(error);
											}
											let result = [];
											Object.entries(groups).forEach(entry => {
												const key = entry[0];
												const light = entry[1];
												result.push({name: light.name,id: key});
											});
											resolve(result);
										})
									});
								});

								let setGroupRelativeCtAction = new Homey.FlowCardAction('set_group_relative_ct');
								setGroupRelativeCtAction
									.register()
									.registerRunListener(async ( args, state ) => {
										const groupState = { ct_inc : Math.round(args.relative_increasement * 347), transitiontime : args.transitiontime };
										return new Promise((resolve) => {
											this.setGroupState(args.group.id, groupState, (error, result) => {
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
									});
				
									let setLightRelativeCtAction = new Homey.FlowCardAction('set_light_relative_ct');
									setLightRelativeCtAction
										.register()
										.registerRunListener(async ( args, state ) => {
											const lightState = { ct_inc : Math.round(args.relative_increasement * 347), transitiontime : args.transitiontime };
											return new Promise((resolve) => {
												this.setLightState(args.light.id, lightState, (error, result) => {
													if (error) {
														return this.error(error);
													}
													resolve(true);
												})
											});
										})
										.getArgument('light')
										.registerAutocompleteListener(( query, args ) => {
											return new Promise((resolve) => {
												this.getLightsList((error, groups) => {
													if (error) {
														return this.error(error);
													}
													let result = [];
													Object.entries(groups).forEach(entry => {
														const key = entry[0];
														const light = entry[1];
														result.push({name: light.name,id: key});
													});
													resolve(result);
												})
											});
										});

										let setGroupColorLoopEnabledAction = new Homey.FlowCardAction('set_group_color_loop_enabled');
										setGroupColorLoopEnabledAction
											.register()
											.registerRunListener(async ( args, state ) => {
												const groupState = { effect: 'colorloop' };
												return new Promise((resolve) => {
													this.setGroupState(args.group.id, groupState, (error, result) => {
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
											});

											let setGroupColorLoopDisabledAction = new Homey.FlowCardAction('set_group_color_loop_disabled');
											setGroupColorLoopDisabledAction
												.register()
												.registerRunListener(async ( args, state ) => {
													const groupState = { effect: 'none' };
													return new Promise((resolve) => {
														this.setGroupState(args.group.id, groupState, (error, result) => {
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
												});

												let flashGroupShortAction = new Homey.FlowCardAction('flash_group_short');
												flashGroupShortAction
													.register()
													.registerRunListener(async ( args, state ) => {
														const groupState = { alert: 'select' };
														return new Promise((resolve) => {
															this.setGroupState(args.group.id, groupState, (error, result) => {
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
													});

													let flashGroupLongAction = new Homey.FlowCardAction('flash_group_long');
													flashGroupLongAction
														.register()
														.registerRunListener(async ( args, state ) => {
															const groupState = { alert: 'lselect' };
															return new Promise((resolve) => {
																this.setGroupState(args.group.id, groupState, (error, result) => {
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
														});

															let setGroupAbsoluteCtAction = new Homey.FlowCardAction('set_group_absolute_ct');
															setGroupAbsoluteCtAction
																.register()
																.registerRunListener(async ( args, state ) => {
																	const groupState = { ct : Math.round(args.ct * 347 + 135), transitiontime : args.transitiontime };
																	return new Promise((resolve) => {
																		this.setGroupState(args.group.id, groupState, (error, result) => {
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
																});

																let setGroupAbsoluteSaturationAction = new Homey.FlowCardAction('set_group_absolute_saturation');
																setGroupAbsoluteSaturationAction
																	.register()
																	.registerRunListener(async ( args, state ) => {
																		const groupState = { sat : Math.round(args.saturation * 254), transitiontime : args.transitiontime };
																		return new Promise((resolve) => {
																			this.setGroupState(args.group.id, groupState, (error, result) => {
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
																	});

																	let setGroupAbsoluteHueAction = new Homey.FlowCardAction('set_group_absolute_hue');
																	setGroupAbsoluteHueAction
																		.register()
																		.registerRunListener(async ( args, state ) => {
																			const groupState = { hue : Math.round(args.hue * 65535 ), transitiontime : args.transitiontime };
																			return new Promise((resolve) => {
																				this.setGroupState(args.group.id, groupState, (error, result) => {
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
																		});
	}

	initializeConditions() {

		let anyLightOnCondition = new Homey.FlowCardCondition('any_light_on');
		anyLightOnCondition
			.register()
			.registerRunListener(async ( args, state ) => {
				return new Promise((resolve) => {
					this.getGroupState(args.group.id, (error, result) => {
						if (error) {
							return this.error(error);
						}
						resolve(result.state.any_on);
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
			});	
			
			let allLightsOnCondition = new Homey.FlowCardCondition('all_lights_on');
			allLightsOnCondition
				.register()
				.registerRunListener(async ( args, state ) => {
					return new Promise((resolve) => {
						this.getGroupState(args.group.id, (error, result) => {
							if (error) {
								return this.error(error);
							}
							resolve(result.state.all_on);
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
				});

	}

	getLightState(deviceId, callback) {
		http.get(`http://${this.host}/api/${this.apikey}/lights/${deviceId}`, (error, response) => {
			callback(error, !!error ? null : JSON.parse(response))
		})
	}

	getSensorState(deviceId, callback) {
		http.get(`http://${this.host}/api/${this.apikey}/sensors/${deviceId}`, (error, response) => {
			callback(error, !!error ? null : JSON.parse(response))
		})
	}

	getGroupState(deviceId, callback) {
		http.get(`http://${this.host}/api/${this.apikey}/groups/${deviceId}`, (error, response) => {
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
		this.log('set group state', `/api/${this.apikey}/groups/${groupId}/action`, JSON.stringify(state))
		http.put(this.host, this.port, `/api/${this.apikey}/groups/${groupId}/action`, state, (error, response) => {
			callback(error, !!error ? null : JSON.parse(response))
		})
	}

	setLightState(lightId, state, callback){
		this.log('set light state', `/api/${this.apikey}/lights/${lightId}/state`, JSON.stringify(state))
		http.put(this.host, this.port, `/api/${this.apikey}/lights/${lightId}/state`, state, (error, response) => {
			callback(error, !!error ? null : JSON.parse(response))
		})
	}
	
}

module.exports = HueExtensionsApp;