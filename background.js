// create a singleton class for the time counter
var StopWatch = (function() {
	var instance;

	function createInstance() {
		instance = {"status" : "stopped"};
	}

	function start() {
		if(!instance) {
			createInstance();
		}
		instance.status = "started";
	}

	function stop() {
		if(!instance) {
			createInstance();
		}
		instance.status = "stopped";
	}

	return {
		getInstance: function() {
			if(!instance) {
				createInstance();
			}
			return instance;
		},
		getStatus: function() {
			return instance.status;
		},
		start: function() {
			start(); // call the private one up there
		},
		stop: function() {
			stop(); //call the priate one up there
		}
	};

})();

// to start the stopwatch for calculating the time spent on facebook-related webpages
function fb_start() {
	// TODO: ...
	StopWatch.start();
	console.log('StopWatch status: ' + StopWatch.getStatus());
}

// to stop the stopwatch for calculatig the time spent on facebook-related pages
function fb_stop() {
	// TODO: ...
	StopWatch.stop();
	console.log('StopWatch status: ' + StopWatch.getStatus());
}

chrome.tabs.onCreated.addListener(function(tab) {
	// check if the tab created is FB-related
	console.log('a tab is created.');
	if(tab.url.indexOf("www.facebook.com") > -1) {
		console.log('it is a facebook-related one.');
		// check if the tab is selected
		if(tab.selected) {
			// start the stopwatch
			console.log('we should start the stopwatch.');
			fb_start();
		} else {
			console.log('it is not selected.');
		}
	} else {
		console.log('it is not a facebook related one.');
	}
	console.log("");
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	console.log('a tab is updated.');
	// check the url
	if(tab.url.indexOf("www.facebook.com") > -1) {
		console.log('it is a facebook related one.');
		// check if the tab is selected
		if(tab.selected) {
			// start the stopwatch
			console.log('we should start the stopwatch.');
			fb_start();
		} else {
			console.log('it is not selected.');
		}
	} else {
		console.log('it is not a facebook related one.');
	}
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
	console.log('a tab is activated.');
	// get the information about this activated tab
	chrome.tabs.get(activeInfo.tabId, function(tab) {
		// check the url
		if(tab.url.indexOf("www.facebook.com") > -1) {
			console.log('it is a facebook related one.');
			// we should start the stopwatch
			fb_start();
		} else {
			console.log('it is not a facebook related one.');
			// we should stop the stopwatch
			fb_stop();
		}
	});
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
	console.log("a tab is being removed. (tabId = " + tabId + ")");
	if(removeInfo.isWindowClosing) {
		console.log("the window is also closing. (windowId = " + removeInfo.windowId + ")");
		// stop the stopwatch
		fb_stop();
	}
});



