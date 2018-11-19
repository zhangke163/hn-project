layui.use(['layer'], function() {
	var map = null;
	var popup = null;
	var personMarkerLayer = new L.FeatureGroup();
	$(function() {
		initWindow();
		initMap();
		var personId = getUrlParam('personId');
		locatePerson(map, personId);
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
			layers: [gdTile, personMarkerLayer]
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

		// personMarkerLayer.on('click', function(e) {
		// 	var personId = e.layer.options["personId"];
		// 	locatePerson(map, personId);
		// });
	}


	function locatePerson(map, personId) {
		

		$.ajax({
			url: elementDataUrl,
			type: 'post',
			data: {
				entityname: 'sqjw_zdry',
				filter: JSON.stringify({
					"Conditions": [{
						"AttributeName": "sqjw_zdryid",
						"Operator": "equal",
						"Values": [personId]
					}],
					"FilterOperator": "AND",
					"Filters ": []
				})
			},
			dataType:'json',
			success: function(res) {
				var person = res.List[0];
				locateZDRYGK(map, personId, person);
			}
		});
	}

	function locateZDRYGK(map, personId, person) {
		var icon = L.icon({
			iconUrl: '../assets/images/person.png',
			iconSize: [46, 54], // 图标大小  
			opacity: 1
		});
		// var textIcon = L.divIcon({
		// 	html: '<div style="border: 1px solid #f00; color: #f00; width: 50px;height:20px;text-align:center;background-color: #afe">名字</div>',
		// 	// className: 'div-icon',
		// 	iconSize: [50, 20],
		// 	iconAnchor: [25, 10],
		// 	iconSize: 15
		// })

		var name = person.sqjw_name;
		var sfzh = person.sqjw_sfzh;
		var hjdz = person.sqjw_hjdz;
		var xjzdz = person.sqjw_xjzdz;
		var lxdh = person.sqjw_lxdh == null ? '':  person.sqjw_lxdh;
		var clxx = person.sqjw_clxx == null ? '':  person.sqjw_clxx;

		$.ajax({
			url: elementDataUrl,
			type: 'post',
			data: {
				entityname: 'sqjw_zdrygk',
				filter: JSON.stringify({
					"Conditions": [{
						"AttributeName": "sqjw_zdryid",
						"Operator": "equal",
						"Values": [{id: personId}]
					}],
					"FilterOperator": "AND",
					"Filters ": []
				})
			},
			dataType:'json',
			success: function(res) {
				for(var index in res.List) {
					var gk = res.List[index];
					var lat = gk.sqjw_wd;
					var lng = gk.sqjw_jd;
					var rq = gk.sqjw_gkrq;
					var gkfs = gk.sqjw_gkfs;
					var ryqk = gk.sqjw_ryqk;
					if(lat != null && lng != null) {

						var popup = "<div><p style='font-size:18px;font-weight:bold'>重点人员管控</p></div>\
							<div><span>姓名：" + name + "</span></div>\
							<div><span>身份证号：" + sfzh + "</span></div>\
							<div><span>现居住地址：" + xjzdz + "</span></div>\
							<div><span>联系电话：" + lxdh + "</span></div>\
							<div><span>车辆信息：" + clxx + "</span></div>\
							<div><span>管控时间：" + rq + "</span></div>\
							<div><span>管控方式：" + gkfs + "</span></div>\
							<div><span>人员情况：" + ryqk + "</span></div>";

						var personMarker = new L.marker([lat, lng], {
							icon: icon,
							personId: personId
						}).bindPopup(popup).bindTooltip(name);
						// personMarkerLayer.clearLayers();
						personMarkerLayer.addLayer(personMarker);

						// popup = L.popup()
						// 	.setLatLng([lat, lng])
						// 	.setContent(name + '\n' + rq)
						// 	.openOn(map);
					} 
					
				}
			}
		});

		$.ajax({
			url: elementDataUrl,
			type: 'post',
			data: {
				entityname: 'sqjw_xfhl',
				filter: JSON.stringify({
					"Conditions": [{
						"AttributeName": "sqjw_sfzh",
						"Operator": "equal",
						"Values": [sfzh]
					}],
					"FilterOperator": "AND",
					"Filters ": []
				})
			},
			dataType:'json',
			success: function(res1) {
				for(var index in res1.List) {
					var xfhl = res1.List[index];
					var lat = xfhl.sqjw_wd;
					var lng = xfhl.sqjw_jd;
					var bmdm = xfhl.sqjw_bmdm;
					var hcmj = xfhl.sqjw_hcmj;
					var hckssj = xfhl.sqjw_hckssj;
					var hcjssj = xfhl.sqjw_hcjssj;
					var mainId = xfhl.importid;
					if(lat != null && lng != null) {

						var popup = "<div><p style='font-size:18px;font-weight:bold'>巡防核录检查</p></div>\
							<div><img src='http://10.120.193.12/ydjwt/getimage.aspx?id=" + mainId + "' style='height: 100px'></div>\
							<div><span>姓名：" + name + "</span></div>\
							<div><span>身份证号：" + sfzh + "</span></div>\
							<div><span>现居住地址：" + xjzdz + "</span></div>\
							<div><span>联系电话：" + lxdh + "</span></div>\
							<div><span>车辆信息：" + clxx + "</span></div>\
							<div><span>巡查部门：" + bmdm + "</span></div>\
							<div><span>巡查民警：" + hcmj + "</span></div>\
							<div><span>巡查开始时间：" + hckssj + "</span></div>\
							<div><span>巡查结束时间：" + hcjssj + "</span></div>";

						var personMarker = new L.marker([lat, lng], {
							icon: icon,
							personId: personId
						}).bindPopup(popup).bindTooltip(name);
						// personMarkerLayer.clearLayers();
						personMarkerLayer.addLayer(personMarker);

						// popup = L.popup()
						// 	.setLatLng([lat, lng])
						// 	.setContent(name + '\n' + rq)
						// 	.openOn(map);
					} 
					
				}
			}
		});
	}
});