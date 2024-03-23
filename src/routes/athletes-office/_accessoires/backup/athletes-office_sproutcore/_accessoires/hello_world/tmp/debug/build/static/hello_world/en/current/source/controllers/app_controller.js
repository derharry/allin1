// ==========================================================================
// Project:   HelloWorld.appController
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals HelloWorld */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
HelloWorld.appController = SC.ObjectController.create(
/** @scope HelloWorld.appController.prototype */ {

	greeting1: "Hello World! :-)",
	greeting2: "I'm on Sproutcore! :-)",
	isClockShowing: NO,

	greeting: "",
	
	init: function () {
		arguments.callee.base.apply(this,arguments);
		this.toggleGreeting();
	},
	
	toggleGreeting: function () {
		var currentGreeting = this.get('greeting');
		var newGreeting = (currentGreeting === this.get('greeting1')) ? this.get('greeting2') : this.get('greeting1') ;
		this.set('greeting', newGreeting);
		this.set('isClockShowing', NO);
	},
	
	
	isClockShowingObserver: function () {
		var isClockShowing = this.get('isClockShowing');
		// create timer
		if (!this._timer) {
			this._timer = SC.Timer.schedule({
				target: this, 
				action: 'tick', 
				repeats: YES, 
				interval: 1000
			});
		}
		//pause timer
		this._timer.set('isPaused', !isClockShowing);
		//update
		var newGreeting = (isClockShowing) ? this.now() : this.get('greeting1') ;
		this.set('greeting', newGreeting);
	}.observes('isClockShowing'),

	tick: function () {
		this.set('greeting', this.now());
	},
	now: function () {
		return SC.DateTime.create().toFormattedString('%H:%M:%S');
	}

}) ;
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('hello_world');