var clear_layer, timer, divId, unusualOrbit, unusualMaker;
L.Control.ClearOrbit = L.Control.extend({
	options: {
		position: 'topright'
	},
	setClearLayer: function(layer, timer) {
		clear_layer = layer;
		timer = timer;
	},
	onAdd: function(map) {
		var clearOrbit_div = L.DomUtil.create('div', 'clearOrbir_control');
		L.DomEvent.addListener(clearOrbit_div, 'click', L.DomEvent.stopPropagation)
			.addListener(clearOrbit_div, 'click', L.DomEvent.preventDefault)
			.addListener(clearOrbit_div, 'click', function() {
				onClear(clear_layer);
			});
		clearOrbit_div.title = '清除轨迹';
		return clearOrbit_div;
	},

});

L.Control.UnusualOrbit = L.Control.extend({
	options: {
		position: 'topright'
	},
	setOptions: function(divId1, unusualOrbit1, unusualMaker1) {
		unusualOrbit = unusualOrbit1;
		divId = divId1;
		unusualMaker = unusualMaker1;
	},
	onAdd: function(map) {
		var unusual_div = L.DomUtil.create('div', 'unusual_control');
		L.DomEvent.addListener(unusual_div, 'click', L.DomEvent.stopPropagation)
			.addListener(unusual_div, 'click', L.DomEvent.preventDefault)
			.addListener(unusual_div, 'click', function() {
				showUnusualList(divId, unusualOrbit, unusualMaker);
			});
		unusual_div.title = '异常显示';
		return unusual_div;
	},

});

function onClear(layers) {
	clearInterval(timer);
	var len = layers.length;
	for(var i = 0; i < len; i++) {
		layers[i].clearLayers();
	}
}

function showUnusualList(divId, unusualOrbit, unusualMaker) {
	$("#" + divId).toggle();
	popup.removeFrom(map);
	if($("#unusualListDiv").css('display') == 'none') {
		unusualOrbit.clearLayers();
		unusualMaker.clearLayers();
	} else {
		showUnusualOrbitAndMarker(unusualOrbit,unusualMaker);
		getUnusualList(1, 'wayBillScreen/getUnusualLog.json');
	}
}

L.control.clearOrbit = function(options) {
	return new L.Control.ClearOrbit(options);
};

L.control.unusualControl = function(options) {
	return new L.Control.UnusualOrbit(options);
};