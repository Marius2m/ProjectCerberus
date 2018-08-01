const Alexa = require("alexa-sdk")
var firebase = require("firebase");

// Initialize Firebase
var config = {
	apiKey: "yourDataHere",
	authDomain: "yourDataHere",
	databaseURL: "yourDataHere",
	storageBucket: "yourDataHere",
};
firebase.initializeApp(config);
/*
 * Activate: [system, security system, Guardian]
 * Deactivate: [system, security system, Guardian]
 * Others: Unahandled Intent
 */
const handlers = {
	"Unhandled": function() {
		//unhandled intent:
		this.emit(":ask", "Guardian here! To start my security system say 'activate system' and to stop it say 'deactivate system'.")
	},
	"Deactivate": function() {
		firebase.database().ref("/armed").set("false").then(() =>{
			this.emit(":tell", "Guardian has been deactivated.")
		})
	},
	"Activate": function() {
		firebase.database().ref("/armed").set("true").then(() =>{
			this.emit(":tell", "Guardian has been activated.")
		})
	},
	"SessionEndedRequest": function() {
		// exit the function if the user tries at an unexpected time
		this.emit()
	}
}

//lambda config
exports.handler = function(event, context, callback) {
	const alexa = Alexa.handler(event, context)
	alexa.registerHandlers(handlers)	// connect handler functions
	alexa.execute()										// execute function
}
