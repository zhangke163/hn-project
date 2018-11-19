layui.use(['layer'], function() {
	var map = null;
	var popup = null;
	var companyMarkerLayer = new L.FeatureGroup();
	$(function() {
		initWindow();
		initMap();
		var entityname = getUrlParam('entityname');
		var id = getUrlParam('id');
		locateCompany(map, entityname, id);
	})

	function initWindow() {
		// 初始化 map_container div 的大小
		$('#map_container').height($(window).height());
		// 监听浏览器窗口发生变化时，动态调整div的尺寸
		$(window).resize(function() {
			$('#map_container').height($(window).height());
			map.invalidateSize(); //重置地图尺寸
		});
	}

	function initMap() {
		var gdTile = L.tileLayer.gdLayer({});
		map = L.map('map_container', {
			zoomControl: false,
			attributionControl: false,
			doubleClickZoom: false,
			boxZoom: true,
			dragging: true,
			minZoom: 8,
			layers: [gdTile, companyMarkerLayer]
		}).setView([30.398517669, 120.713582], 11);

		L.control.mousePosition({
			'position': 'bottomright'
		}).addTo(map);

		//比例尺添加
		L.control.betterscale({
			'position': 'bottomright'
		}).addTo(map);

		// pianquLayer = L.geoJSON(polices, {
		// 	style: function(feature) {
		// 		return {
		// 			color: 'blue',
		// 			fillOpacity: 0.1,
		// 			weight: 2
		// 		};
		// 	}
		// }).addTo(map);

		// companyMarkerLayer.on('click', function(e) {
		// 	var companyId = e.layer.options["companyId"];
		// 	locateCompany(map,companyId);
		// });
	}

	var iconUrlList = {
		sqjw_jgdw: '../assets/images/company.png',
		sqjw_zdry: '../assets/images/person.png'
	}

	function locateCompany(map, entityname, id) {
		var iconUrl = iconUrlList[entityname];
		if(iconUrl == null) {
			iconUrl = '../assets/images/getCoordinate1.png'
		}
		var icon = L.icon({
			iconUrl: iconUrl,
			iconSize: [46, 54], // 图标大小  
			opacity: 1
		});

		//具体效果要结合实际的数据和html构造
		$.ajax({
			url: elementDataUrl,
			type: 'post',
			data: {
				entityname: entityname,
				filter: JSON.stringify({
					"Conditions": [{
						"AttributeName": entityname + 'id',
						"Operator": "equal",
						"Values": [id]
					}],
					"FilterOperator": "AND",
					"Filters ": []
				})
			},
			dataType:'json',
			success: function(res) {
				var person = res.List[0];
				var lat = person.sqjw_wd;
				var lng = person.sqjw_jd;
				var name = person.sqjw_name;
				if(lat != null && lng != null) {

					var companyMarker = new L.marker([lat, lng], {
						icon: icon,
						personId: id
					});
					companyMarkerLayer.clearLayers();
					companyMarkerLayer.addLayer(companyMarker);

					popup = L.popup()
						.setLatLng([lat, lng])
						.setContent(name)
						.openOn(map);
				} else {
					layer.alert("机构定位数据不完整，请收集定位后再查看！");
				}
			}
		});
	}
});