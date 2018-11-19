layui.use(['layer', 'element', 'laypage'], function() {
	var layer = layui.layer,
		element = layui.element,
		laypage = layui.laypage;
	var pageSize = 50;
	var map = null;
	var popup = null;
	var normalIcon  =  L.icon({
			iconUrl: '../assets/images/normalIcon.png',
			iconSize: [40, 40]
		}),
		selectIcon = L.icon({
			iconUrl: '../assets/images/selectIcon.png',
			iconSize: [40, 40],
		});

	var zdryLayer = new L.featureGroup([]),
		qydwLayer = new L.featureGroup([]),
		czfwLayer = new L.featureGroup([]),
		sssbLayer = new L.featureGroup([]),
		jwxwLayer = new L.featureGroup([]),
		trailLayer = new L.featureGroup([]),
		allLayer = L.layerGroup([zdryLayer, qydwLayer, czfwLayer, sssbLayer, jwxwLayer]);

	var markers = new L.MarkerClusterGroup({
		disableClusteringAtZoom: 17
	});
	//var markerList = [];

	var curData = {} //临时存储最新的ajax参数
	$(function() {
		initWindow();
		initMap();
		//初始化
		initData(TabType.zdry);

		$('.leftSider li').click(function(e) {
			console.log(e.target);
		});

		//动态元素绑定事件
		$(document).on('click', '#new_nav_tab li', function(event) {
			var _this = $(this);
			var _index = _this.index();
			_this.addClass('active').siblings().removeClass('active');

			_this.parent().parent().next().find('.policemanList').hide().eq(_index).show();
		});

		//动态元素绑定事件
		$(document).on('click', '#policemanList ul li', function(event) {
			var _this = $(this);
			var _index = _this.index();
			_this.addClass('active').siblings().removeClass('active');
		})

		$(document).on('click', '#right_tab li', function(event) {
			var _this = $(this);
			var _index = _this.index();
			_this.addClass('current').siblings().removeClass('current');
			_this.parent().parent().next().find('.tab_box').hide().eq(_index).show();
			if(_index == 1) {
				drawChart();
			}
		});

		//点击收缩
		$('#shrinkBtn').click(function() {
			$('#shrinkBtn').slideUp();
			$('.demo2').slideUp();
			setTimeout(function() {
				$('#unfoldBtn').removeClass('nons').addClass('shows');
				clearMarker();
			}, 500);

		});
		//点击展开
		$('#unfoldBtn').click(function() {
			$('#shrinkBtn').slideDown();
			$('#unfoldBtn').removeClass('shows').addClass('nons');
			$('.demo2').slideDown();
			initData(TabType.zdry);
		});

		//搜索按钮
		['#searchBtnPerson', '#searchBtnHouse', '#searchBtnCompany', '#searchBtnSSSB', '#searchBtnJWXW'].forEach(function(ele) {
			$(ele).on('click', function(e) {
				switch(e.target.id) {
					case "searchBtnPerson":
						excuteSearch(TabType.zdry);
						break;
					case "searchBtnHouse":
						excuteSearch(TabType.czfw);
						break;
					case "searchBtnCompany":
						excuteSearch(TabType.qydw);
						break;
					case "searchBtnSSSB":
						excuteSearch(TabType.sssb);
						break;
					case "searchBtnJWXW":
						excuteSearch(TabType.jwxw);
						break;
					default:
						break;
				}
			})
		});
		//下拉框
		['select#personSelect', 'select#houseSelect', 'select#companyDLSelect', 'select#companySelect', 'select#sssbSelect', 'select#jwxwSelect'].forEach(function(ele) {
			$(ele).on('change', function(e) {
				var info = $(e.target).val();

				switch(e.target.id) {
					case "personSelect":
						excuteSearch(TabType.zdry);
						break;
					case "houseSelect":
						excuteSearch(TabType.czfw);
						break;
					case "companyDLSelect":
						refreshCompanyLB(info.substr(0, 3), dwlbType);
						excuteSearch(TabType.qydw);
						break;
					case "companySelect":
						excuteSearch(TabType.qydw);
						break;
					case "sssbSelect":
						excuteSearch(TabType.sssb);
						break;
					case "jwxwSelect":
						excuteSearch(TabType.jwxw);
						break;
					default:
						break;
				}
			})
		})

		//显示全部
		$('.showBtn').on('click', function() {

		})

		function excuteSearch(type) {
			switch(type) {
				case TabType.zdry:
					var info = $('#searchBtnPerson').siblings('input').val();
					var selectValue = $('#personSelect').val();
					var filter = selectValue == "" ? {
						"Conditions": [{
							"AttributeName": "sqjw_name",
							"Operator": "like",
							"Values": ["%" + info + "%"]
						}],
						"FilterOperator": "AND",
						"Filters": []
					} : {
						"Conditions": [{
							"AttributeName": "sqjw_name",
							"Operator": "like",
							"Values": ["%" + info + "%"]
						}, {
							"AttributeName": "sqjw_zdrylb",
							"Operator": "in",
							"Values": [selectValue]
						}],
						"FilterOperator": "AND",
						"Filters": []
					}
					var personFilter = {
						entityname: 'sqjw_zdry',
						filter: JSON.stringify(filter)
					}
					excuteAjax(TabType.zdry, elementDataUrl, personFilter, "", 0, 'demo3', zdryLayer);
					break;
				case TabType.czfw:
					break;
				case TabType.qydw:
					var info = $('#searchBtnCompany').siblings('input').val();
					var selectDLValue = $('#companyDLSelect').val();
					var selectLBValue = $('#companySelect').val();
					var filter = {
						"Conditions": [{
							"AttributeName": "sqjw_name",
							"Operator": "like",
							"Values": ["%" + info + "%"]
						}],
						"FilterOperator": "AND",
						"Filters": []
					};
					if(selectDLValue != "") {
						filter.Conditions.push({
							"AttributeName": "sqjw_dwdl",
							"Operator": "in",
							"Values": [selectDLValue]
						})
					}
					if(selectLBValue != "") {
						filter.Conditions.push({
							"AttributeName": "sqjw_dwlb",
							"Operator": "in",
							"Values": [selectLBValue]
						})
					}
					var companyFilter = {
						entityname: 'sqjw_jgdw',
						filter: JSON.stringify(filter)
					}
					excuteAjax(TabType.qydw, elementDataUrl, companyFilter, '', 2, 'demo5', qydwLayer);
					break;
				case TabType.sssb:
					var searchValue = $('#searchBtnSSSB').siblings('input').val();
					var filter = {
						"Conditions": [{
							"AttributeName": "D_Name",
							"Operator": "like",
							"Values": ["%" + searchValue + "%"]
						}],
						"FilterOperator": "AND",
						"Filters": []
					};

					var info = $('#sssbSelect').val();
					var name = "getGPS";
					switch(info) {
						case SSSBType.gps:
							name = "getGPS";
							filter.Conditions.AttributeName = "D_Name"; //查询关键字
							break;
						case SSSBType.jksb:
							filter.Conditions.AttributeName = "D_Name"; //
							name = "getJK";
							break;
						case SSSBType.pfid:
							name = "getRFID";
							filter.Conditions.AttributeName = "D_Name"; //
							break;
						case SSSBType.mac:
							name = "getMAC";
							filter.Conditions.AttributeName = "D_Name"; //
							break;
						case SSSBType.G4:
							name = "getZFJLY";
							filter.Conditions.AttributeName = "D_Name"; //
							break;
						case SSSBType.jycl:
							filter.Conditions.AttributeName = "D_Name"; //
							name = "getBDJC";
							break;
						case SSSBType.jq:
							name = "getJQ";
							filter.Conditions.AttributeName = "D_Name"; //
							break;
						case SSSBType.shspd:
							name = "getSHSP";
							filter.Conditions.AttributeName = "D_Name"; //
							break;
					}
					var baseFilter = {
						fs: name
					}
					if(searchValue != "") {
						baseFilter.filter = JSON.stringify(filter);
					}
					excuteAjax(TabType.sssb, deviceUrl, baseFilter, info, 3, 'demo6', sssbLayer);
					break;
				case TabType.jwxw:
					var searchValue = $('#searchBtnJWXW').siblings('input').val();
					var filter = {
						"Conditions": [{
							"AttributeName": "sqjw_name",
							"Operator": "like",
							"Values": ["%" + searchValue + "%"]
						}],
						"FilterOperator": "AND",
						"Filters": []
					};

					var info = $('#jwxwSelect').val();
					var name = "sqjw_zfqk";
					switch(info) {
						case JWXWType.zfqk:
							name = "sqjw_zfqk";
							break;
						case JWXWType.jmkt:

							name = "sqjw_jmkt";
							break;
						case JWXWType.xfhl:
							name = "sqjw_xfhl";
							break;
						case JWXWType.xlff:
							name = "sqjw_xlff";
							break;
						case JWXWType.ffxc:
							name = "sqjw_ffxc";
							break;
						case JWXWType.jwt_gps:
							name = "sqjw_jwt_gps";
							break;
					}
					var baseFilter = {
						entityname: name
					}
					if(searchValue != "") {
						baseFilter.filter = JSON.stringify(filter);
					}
					excuteAjax(TabType.jwxw, elementDataUrl, baseFilter, info, 4, 'demo7', jwxwLayer);
					break;
				default:
					break;
			}

		}

		//tab切换事件
		element.on('tab(featureQuery)', function(data) {
			clearMarker();
			var tabtype;
			switch(data.index) {
				case 0:
					tabtype = TabType.zdry;
					break;
				case 1:
					tabtype = TabType.czfw;
					break;
				case 2:
					tabtype = TabType.qydw;
					break;
				case 3:
					tabtype = TabType.sssb;
					break;
				case 4:
					tabtype = TabType.jwxw;
					break;
				default:
					break;
			}
			initData(tabtype);
		});
	})

	function initData(tabtype) {
		if(tabtype == "") return;
		switch(tabtype) {
			case TabType.zdry: //重点人员
				var personFilter = {
					entityname: 'sqjw_zdry'
				}
				excuteAjax(tabtype, elementDataUrl, personFilter, "", 0, 'demo3', zdryLayer);
				break;
			case TabType.czfw: //出租房屋
				var typeFilter = {
					entityname: 'sqjw_czfw'
				}
				excuteAjax(tabtype, elementDataUrl, typeFilter, '', 1, 'demo4', czfwLayer);
				break;
			case TabType.qydw: //企业单位
				var companyFilter = {
					entityname: 'sqjw_jgdw'
				}
				excuteAjax(tabtype, elementDataUrl, companyFilter, '', 2, 'demo5', qydwLayer);
				break;
			case TabType.sssb: //设施设备
				var curInfo = $('select#sssbSelect').val();
				var name = "getGPS";
				switch(curInfo) {
					case SSSBType.gps:
						name = "getGPS";
						break;
					case SSSBType.jksb:
						name = "getJK";
						break;
					case SSSBType.pfid:
						name = "getRFID";
						break;
					case SSSBType.mac:
						name = "getMAC";
						break;
					case SSSBType.G4:
						name = "getZFJLY";
						break;
					case SSSBType.jycl:
						name = "getBDJC";
						break;
					case SSSBType.jq:
						name = "getJQ";
						break;
					case SSSBType.shspd:
						name = "getSHSP";
						break;
				}
				var baseFilter = {
					fs: name
				}
				excuteAjax(tabtype, deviceUrl, baseFilter, curInfo, 3, 'demo6', sssbLayer);
				break;
			case TabType.jwxw: //警务行为
				tabtype = TabType.jwxw;
				var curInfo = $('select#jwxwSelect').val();
				var name = "sqjw_zfqk";
				switch(curInfo) {
					case JWXWType.zfqk:
						name = "sqjw_zfqk";
						break;
					case JWXWType.jmkt:
						name = "sqjw_jmkt";
						break;
					case JWXWType.xfhl:
						name = "sqjw_xfhl";
						break;
					case JWXWType.xlff:
						name = "sqjw_xlff";
						break;
					case JWXWType.ffxc:
						name = "sqjw_ffxc";
						break;
					case JWXWType.jwt_gps:
						name = "sqjw_jwt_gps";
						break;
				}
				var baseFilter = {
					entityname: name
				}
				excuteAjax(tabtype, elementDataUrl, baseFilter, curInfo, 4, 'demo7', jwxwLayer);
				break;
		}
	}

	function clearMarker() {
		allLayer.clearLayers();
		markers.clearLayers();
		//markerList=[];
	}

	var bCurrentPage = false; //是否只显示当前页数据
	function getTable(type, result, pageIndex, pageSize, pageType) {
		var data = "";
		var _layer;
		if(result != "" && result != null) {
			switch(type) {
				case TabType.zdry:
					_layer = zdryLayer;
					//获取json数据		
					$.each(result.List, function(index, value) {

						var ownunit = "无";
						if(value.owningbusinessunit) {
							ownunit = value.owningbusinessunit.name;
						}
						var ownname = "无";
						if(value.owninguser) {
							ownname = value.owninguser.name;
						}

						var orderNum = (pageIndex - 1) * pageSize + index + 1;
						data += '<div class="detail-search-cons" data-id="' + value.sqjw_zdryid + '" id="' + orderNum + '" onclick=locate(this,"' + type + '")>' +
							'<div class="search-top">' +
							'<h3 class="name">' + value.sqjw_name + '</h3>' +
							'<span>' + getTextByValue(xbType, value.sqjw_xb) + '</span>' +
							'<b>' + value.sqjw_sfzh + '</b>' +
							'</div>' +
							'<div class="search-middle">' +
							'<div class="search-mid-left">' +
							'<span>重点人员类别:</span>' +
							'<b class="ssxq">' + getTextByValue(zdrylbType, value.sqjw_zdrylb) + '</b>' +
							'</div>' +
							'<div class="search-mid-right">' +
							'<span class="frdb" onmouseover="showTel(event);" onmouseout= "noshowTel(event);">' + ownname +
							'<div class="telbox1">' + value.sqjw_lxdh + '</div>' +
							'</span>' +
							'<b class="xqmj">管辖民警:</b>' +
							'</div>' +
							'</div>' +
							'<p class="search-bottom rylb">' +
							'<span class="span_rylb">所属辖区</span>' +
							'<b class="zdrylb">' + ownunit + '</b>' +
							'</p>' +
							'</div>';

					})
					break;
				case TabType.czfw:
					_layer = czfwLayer;
					$.each(result.List, function(index, value) {
						var ownunit = "无";
						if(value.owningbusinessunit) {
							ownunit = value.owningbusinessunit.name;
						}
						var ownname = "无";
						if(value.owninguser) {
							ownname = value.owninguser.name;
						}

						var orderNum = (pageIndex - 1) * pageSize + index + 1;
						data += '<div class="detail-search-cons" >' +
							'<div class="search-top">' +
							'<h3>' + value.sqjw_czfdz + '</h3>' +
							'</div>' +
							'<div class="search-middle-one">' +
							'<div class="search-mid-left">' +
							'<span style="">房屋档案:</span>' +
							'<b style="">' + value.sqjw_name + '</b>' +
							'</div>' +
							'<div class="search-mid-right">' +
							'<span>' + value.sqjw_xm + '</span>' +
							'<b>出租人:</b>' +
							'</div>' +
							'</div>' +
							'<div class="search-middle">' +
							'<div class="search-mid-left">' +
							'<span>所属部门:</span>' +
							'<b>' + ownunit + '</b>' +
							'</div>' +
							'<div class="search-mid-right">' +
							'<span>' + ownname +
							'<div class="pup-detail">' +
							'18435155931' +
							'</div>' +
							'</span>' +
							'<b>负责人:</b>' +
							'</div>' +
							'</div>' +
							'</div>';
					})
					break;
				case TabType.qydw:
					_layer = qydwLayer;
					$.each(result.List, function(index, value) {
						var ownunit = "无";
						if(value.sqjw_dwdz) {
							ownunit = value.owningbusinessunit.name;
						}
						var dwdz = "无";
						if(value.sqjw_dwdz) {
							dwdz = value.sqjw_dwdz.name;
						}
						var ownname = "无";
						if(value.owninguser) {
							ownname = value.owninguser.name;
						}

						var orderNum = (pageIndex - 1) * pageSize + index + 1;
						//获取企业单位信息
						data += '<div class="detail-search-cons consThree" data-id="' + value.sqjw_jgdwid + '" onclick=locate(this,"' + type + '")>' +
							'<div class="search-top">' +
							'<h3>' + value.sqjw_name + '</h3>' +
							'<b>' + getTextByValue(dwlbType, value.sqjw_dwlb) + '</b>' +
							'</div>' +
							'<p class="search-bottom">' +
							'<span>单位地址</span>' +
							'<b title="' + dwdz + '">' + dwdz + '</b>' +
							'</p>' +
							'<div class="search-middle">' +
							'<div class="search-mid-left">' +
							'<span>法人代表:</span>' +
							'<b>' + value.sqjw_frdb + '</b>' +
							'</div>' +
							'<div class="search-mid-right">' +
							'<span onmouseover="showTel(event);" onmouseout= "noshowTel(event);">' + ownname +
							'<div class="telbox">' + value.sqjw_dwdh +
							'</div>' +
							'</span>' +
							'<b>管辖民警:</b>' +
							'</div>' +
							'</div>' +
							'</div>';
					})
					break;
				case TabType.sssb:
					_layer = sssbLayer;
					data = getTableSSSB(result, pageIndex, pageSize, pageType);
					break;
				case TabType.jwxw:
					_layer = jwxwLayer;
					data = getTableJWXW(result, pageIndex, pageSize, pageType);
					break;
				default:
					break;
			}
		}
		addToMap(type, pageType, _layer, result);
		data = data === "" ? "<div class='nolist'>暂无数据</div>" : data;
		return data;
	}

	function addToMap(type, pageType, _layer, result) {
		clearMarker();
		var show = true;
		if(type == TabType.jwxw) {
			if(pageType != JWXWType.xfhl && pageType != JWXWType.jwt_gps) {
				show = false;
			}
		}
		if(show) {
			locateToMap(result.List ? result.List : result.data, _layer, type, pageType);
			//allLayer.addLayer(_layer);
		}
	}

	function excuteAjax(type, dataUrl, data, pageType, _index, _pageId, _layer) {
		curData.type = type;
		curData.dataUrl = dataUrl;
		curData.data = data;
		curData.pageType = pageType;
		curData.index = _index;
		curData.pageId = _pageId;
		curData.layer = _layer;

		data.pagesize = pageSize;
		clearMarker();
		$.ajax({
			url: dataUrl,
			type: "get",
			data: data,
			dataType: 'json',
			success: function(result) {
				var total = result.Total ? result.Total : result.total; //记录总数
				totalLeft = total;
				curData.total = total;
				if(total) {
					var datas = getTable(type, result, 1, pageSize, pageType);
					$(".search-contents").eq(_index).html(datas);
					if(total > 10) {
						//初始化一个分页控件
						pageInit(type, total, 2, 1, _pageId, dataUrl, $(".search-contents").eq(_index), getTable, data, pageSize, pageType);

						$('#' + _pageId).css('display', 'block');
					} else {
						$('#' + _pageId).css("display", "none");

					}
					addToMap(type, pageType, _layer, result);
				} else {
					$(".search-contents").eq(_index).empty();
				}
			},
			error: function(event, request, option) {
				console.log(dataUrl);
				console.log(data);
				console.log('not return data');
			}
		});
	}

	function stringID(id) {
		var str = id + "";
		var result = str.substr(0, str.indexOf("\u0000"));
		return result.trim();
	}

	//设施设备渲染
	function getTableSSSB(result, pageIndex, pageSize, pageType) {
		var data = "";
		if(result != "" && result != null) {
			//获取json数据	
			if(pageType == undefined || pageType == 'GPS') {
				$.each(result.data, function(index, value) {
					var orderNum = (pageIndex - 1) * pageSize + index + 1;
					//获取GPS设施设备信息
					data += '<div class="detail-search-cons consFour" data-id="' + stringID(value.D_ID) + '" onclick=locate(this,"' + TabType.sssb + '");>' +
						'<div class="search-top">' +
						'<h3>' + value.D_Name + '</h3>' +
						'<b>' + value.D_ID + '</b>' +
						'</div>' +
						'<div class="search-middles">' +
						'<div class="search-mids-left">' +
						'<span>设备名称:</span>' +
						'<b>' + value.D_XM + '</b>' +
						'</div>' +
						'<div class="search-mids-right">' +
						'<span>' + value.S_MC + '</span>' +
						'<b>姓名:</b>' +
						'</div>' +
						'</div>' +
						'<div class="search-bottom">' +
						'<div class="search-bot-left">' +
						'<span>设备类型:</span>' +
						'<b>' + value.S_LX + '</b>' +
						'</div>' +
						'<div class="search-bot-right">' +
						'<span title="' + value.DTime + '">' + value.DTime + '</span>' +
						'<b>上报时间:</b>' +
						'</div>' +
						'</div>' +
						'</div>';
				})
			} else if(pageType == '监控设备') {
				$.each(result.data, function(index, value) {

					var orderNum = (pageIndex - 1) * pageSize + index + 1;
					//获取监控设备设施设备信息
					data += '<div class="detail-search-cons consFour"  data-id="' + value.ID + '" onclick=locate(this,"' + TabType.sssb + '");>' +
						'<div class="search-top">' +
						'<h3>' + value.VideoName + '</h3>' +
						'</div>' +
						'<div class="search-middles">' +
						'<div class="search-mids-left">' +
						'<span>设备类型:</span>' +
						'<b>' + value.VideoType + '</b>' +
						'</div>' +
						'<div class="search-mids-right">' +
						'<span>' + value.IP + '</span>' +
						'<b>IP:</b>' +
						'</div>' +
						'</div>' +
						'<div class="search-bottom">' +
						'<div class="search-bot-left">' +
						'<span>所属部门:</span>' +
						'<b>' + value.BMNAME + '</b>' +
						'</div>' +
						'<div class="search-bots-right">' +
						'<span>' + value.IsDel + '</span>' +
						'<b>删除标记:</b>' +
						'</div>' +
						'</div>' +
						'</div>';
				})
			} else if(pageType == 'RFID') {
				$.each(result.data, function(index, value) {
					var orderNum = (pageIndex - 1) * pageSize + index + 1;
					//获取RFID设施设备信息
					data += '<div class="detail-search-cons consFour" data-id="' + value.device_id + '" onclick=locate(this,"' + TabType.sssb + '");>' +
						'<div class="search-top">' +
						'<h3>' + value.address + '</h3>' +
						'</div>' +
						'<div class="search-middles">' +
						'<div class="search-mids-left">' +
						'<span>设备ID:</span>' +
						'<b>' + value.device_id + '</b>' +
						'</div>' +
						'</div>' +
						'<div class="search-bottom">' +
						'<div class="search-bot-left">' +
						'<span>设备最后通讯时间:</span>' +
						'<b>' + value.last_beat_time + '</b>' +
						'</div>' +
						'</div>' +
						'</div>';
				})
			} else if(pageType == 'MAC') {
				$.each(result.data, function(index, value) {
					var orderNum = (pageIndex - 1) * pageSize + index + 1;
					//获取MAC设施设备信息
					data += '<div class="detail-search-cons consFour"  data-id="' + value.INDEXCODE + '" onclick=locate(this,"' + TabType.sssb + '");>' +
						'<div class="search-top">' +
						'<h3>' + value.NAME + '</h3>' +
						'</div>' +
						'<div class="search-middles">' +
						'<div class="search-mids-left">' +
						'<span>所属辖区:</span>' +
						'<b>' + value.REGION_NAME + '</b>' +
						'</div>' +
						'<div class="search-mids-right">' +
						'<span>' + value.IP_ADDR + '</span>' +
						'<b>IP:</b>' +
						'</div>' +
						'</div>' +
						'<div class="search-bottom">' +
						'<div class="search-bot-left">' +
						'<span>海康编号:</span>' +
						'<b>' + value.INDEXCODE + '</b>' +
						'</div>' +
						'</div>' +
						'</div>';
				})
			} else if(pageType == '4G执法记录仪') {
				$.each(result.data, function(index, value) {
					var orderNum = (pageIndex - 1) * pageSize + index + 1;
					//获取4G执法记录仪设施设备信息
					data += '<div class="detail-search-cons consFour"  data-id="' + value.CAMERACODE + '" onclick=locate(this,"' + TabType.sssb + '");>' +
						'<div class="search-top">' +
						'<h3>' + value.DJBM + '</h3>' +
						'</div>' +
						'<div class="search-middles">' +
						'<div class="search-mids-left">' +
						'<span>速度:</span>' +
						'<b>' + value.SPEED + '</b>' +
						'</div>' +
						'<div class="search-mids-right">' +
						'<span>' + value.IP + '</span>' +
						'<b>IP:</b>' +
						'</div>' +
						'</div>' +
						'<div class="search-bottom">' +
						'<div class="search-bot-left">' +
						'<span>通信时间:</span>' +
						'<b>' + value.REPORT_TIME + '</b>' +
						'</div>' +
						'</div>' +
						'</div>';
				})
			} else if(pageType == '警用车辆') {
				$.each(result.data, function(index, value) {
					var orderNum = (pageIndex - 1) * pageSize + index + 1;
					//获取警用车辆设施设备信息
					data += '<div class="detail-search-cons consFour"  data-id="' + value.VEHICLE_CODE + '" onclick=locate(this,"' + TabType.sssb + '");>' +
						'<div class="search-top">' +
						'<h3>' + value.VEHICLE_CODE + '</h3>' +
						'</div>' +
						'<div class="search-middles">' +
						'<div class="search-mids-left">' +
						'<span>卫星数量:</span>' +
						'<b>' + value.SATL_COUNT + '</b>' +
						'</div>' +
						'<div class="search-mids-right">' +
						'<span>' + value.MILE_COUNT + '</span>' +
						'<b>总里程:</b>' +
						'</div>' +
						'</div>' +
						'<div class="search-bottom">' +
						'<div class="search-bot-left">' +
						'<span>速度:</span>' +
						'<b>' + value.SPEED + '</b>' +
						'</div>' +
						'<div class="search-bots-right">' +
						'<span>' + value.SERVER_TIME + '</span>' +
						'<b>通讯时间:</b>' +
						'</div>' +
						'</div>' +
						'</div>';
				})
			} else if(pageType == '警情') {
				$.each(result.data, function(index, value) {
					var orderNum = (pageIndex - 1) * pageSize + index + 1;
					//获取警情设施设备信息
					data += '<div class="detail-search-cons consFour" data-id="' + value.JJDBH + '" onclick=locate(this,"' + TabType.sssb + '");>' +
						'<div class="search-top">' +
						'<h3>' + value.BJNR + '</h3>' +
						'<b class="sg-bg">' + value.BJLBMC + '</b>' +
						'</div>' +
						'<div class="search-middles">' +
						'<div class="search-mids-left">' +
						'<span>报警电话:</span>' +
						'<b>' + value.BJDH + '</b>' +
						'</div>' +
						'<div class="search-mids1-right">' +
						'<span title="' + value.INSERT_TIME + '">' + value.INSERT_TIME + '</span>' +
						'<b>报警时间:</b>' +
						'</div>' +
						'</div>' +
						'<div class="search-bottom">' +
						'<div class="search-bot-left">' +
						'<span>案发地点:</span>' +
						'<b>' + value.AFDD + '</b>' +
						'</div>' +
						'</div>' +
						'</div>';
				})
			} else if(pageType == '社会视频点') {
				$.each(result.data, function(index, value) {
					var orderNum = (pageIndex - 1) * pageSize + index + 1;
					//获取社会视频点设施设备信息
					data += '<div class="detail-search-cons consFour"  data-id="' + value.OBJECTID + '" onclick=locate(this,"' + TabType.sssb + '");>' +
						'<div class="search-top">' +
						'<h3>' + value.MC + '</h3>' +
						'</div>' +
						'<div class="search-middles">' +
						'<div class="search-mids-left">' +
						'<span>类别:</span>' +
						'<b>' + value.LB + '</b>' +
						'</div>' +
						'<div class="search-mids-right">' +
						'<span>' + value.KSD + '</span>' +
						'<b>所属派出所:</b>' +
						'</div>' +
						'</div>' +
						'<div class="search-bottom">' +
						'<div class="search-bot-left">' +
						'<span>播放软件:</span>' +
						'<b>' + value.BFRJ + '</b>' +
						'</div>' +
						'<div class="search-bots-right">' +
						'<span onmouseover="showTel(event);" onmouseout= "noshowTel(event);">' + value.LXR +
						'<div class="telbox">' + value.LXDH + '</div>' +
						'</span>' +
						'<b>联系人:</b>' +
						'</div>' +
						'</div>' +
						'</div>';
				})
			}
		}
		data = data === "" ? "<div class='nolist'>暂无数据</div>" : data;
		return data;
	}

	//警务行为
	function getTableJWXW(result, pageIndex, pageSize, pageType) {
		var type = TabType.jwxw;
		var data = "";
		if(result != "" && result != null) {
			//获取json数据	
			if(pageType == undefined || pageType == JWXWType.zfqk) {
				$.each(result.List, function(index, value) {
					var orderNum = (pageIndex - 1) * pageSize + index + 1;
					//走访情况
					data += '<div class="detail-search-cons consFour interviewCons" data-id="' + value.sqjw_zfqkid + '" onclick=showDetail("' + JWXWType.zfqk + '","sqjw_zfqkid","' + value.sqjw_zfqkid + '")>' +
						'<div class="search-top">' +
						'<h3>' + value.sqjw_name + '</h3>' +
						'<span>' + getTextByValue(xbType, value.sqjw_xb) + '</span>' +
						'<b>' + value.sqjw_sfzh + '</b>' +
						'</div>' +
						'<div class="search-middles">' +
						'<div class="search-mids-left">' +
						'<span>现居住地址:</span>' +
						'<b title=' + value.sqjw_xjzdz + '>' + value.sqjw_xjzdz + '</b>' +
						'</div>' +
						'</div>' +
						'<div class="search-bottom">' +
						'<div class="search-bot-left">' +
						'<span>走访人:</span>' +
						'<b>' + value.sqjw_zfr + '</b>' +
						'</div>' +
						'<div class="search-bot-right">' +
						'<span>' + value.sqjw_zfsj + '</span>' +
						'<b>走访日期:</b>' +
						'</div>' +
						'</div>' +
						'</div>';
				})
			} else if(pageType == JWXWType.jwt_gps) {
				//警务通GPS
				$.each(result.List, function(index, value) {
					var ownunit = "无";
					if(value.owninguser) {
						ownunit = value.owningbusinessunit.name;
					}
					data += '<div class="detail-search-cons consFour" data-id="' + value.sqjw_jwt_gpsid + '" onclick=locate(this,"' + type + '")>' +
						'<div class="search-top">' +
						'<h3>' + value.sqjw_xm + '</h3>' +
						'<b>141024199001470017</b>' +
						'</div>' +
						'<div class="search-middles">' +
						'<div class="search-mids-left">' +
						'<span>经度:</span>' +
						'<b>' + parseFloat(value.sqjw_jd).toFixed(6) + '</b>' +
						'</div>' +
						'<div class="search-mids-right">' +
						'<span>' + parseFloat(value.sqjw_wd).toFixed(6) + '</span>' +
						'<b>纬度</b>' +
						'</div>' +
						'</div>' +
						'<div class="search-bottom">' +
						'<div class="search-bot-left">' +
						'<span>所属辖区:</span>' +
						'<b>' + ownunit + '</b>' +
						'</div>' +
						'<div class="search-bot-right">' +
						'<span title="' + value.sqjw_dwsj + '">' + value.sqjw_dwsj + '</span>' +
						'<b>定位时间:</b>' +
						'</div>' +
						'</div>' +
						'</div>';
				})
			} else if(pageType == JWXWType.jmkt) {
				//军民恳谈
				$.each(result.List, function(index, value) {
					var ownunit = "无";
					if(value.owninguser) {
						ownunit = value.owningbusinessunit.name;
					}
					data += '<div class="detail-search-cons consFour talkCons" data-id="' + value.sqjw_jmktid + '" onclick=showDetail("' + JWXWType.jmkt + '","sqjw_jmktid","' + value.sqjw_jmktid + '")>' +
						'<div class="search-top">' +
						'<h3>' + value.sqjw_name + '</h3>' +
						'<b>' + value.sqjw_ktrq + '</b>' +
						'</div>' +
						'<div class="search-middles">' +
						'<div class="search-mids-left">' +
						'<span>恳谈地址:</span>' +
						'<b title="' + value.sqjw_ktdd + '">' + value.sqjw_ktdd + '</b>' +
						'</div>' +
						'</div>' +
						'<div class="search-bottom">' +
						'<div class="search-bot-left">' +
						'<span>参加群众:</span>' +
						'<b>' + value.sqjw_cjqz + '</b>' +
						'</div>' +
						'<div class="search-bot-right">' +
						'<span>' + ownunit + '</span>' +
						'<b>所属辖区:</b>' +
						'</div>' +
						'</div>' +
						'</div>';
				})
			} else if(pageType == JWXWType.xlff) {
				//巡逻防范
				$.each(result.List, function(index, value) {
					var orderNum = (pageIndex - 1) * pageSize + index + 1;
					data += '<div style="height:120px" class="detail-search-cons consFour conditionCons" data-id="' + value.sqjw_xlffid + '" onclick=showDetail("' + JWXWType.xlff + '","sqjw_xlffid","' + value.sqjw_xlffid + '")>' +
						'<div class="search-top">' +
						'<h3>' + value.sqjw_xlmj + '</h3>' +
						'<b>' + value.sqjw_xqdw + '</b>' +
						'</div>' +
						'<div class="search-middles">' +
						'<div class="search-mids-left">' +
						'<span>巡逻情况:</span>' +
						'<b title="' + value.sqjw_xlkzqk + '">' + value.sqjw_xlkzqk + '</b>' +
						'</div>' +
						'</div>' +
						'<div class="search-bottom">' +
						'<div class="search-bot-left">' +
						'<span>巡逻人员:</span>' +
						'<b>' + value.sqjw_xlry + '</b>' +
						'</div>' +
						'</div>' +
						'<div class="search-bottom">' +
						'<div class="search-bots-left">' +
						'<span>' + value.sqjw_xlqy + '</span>' +
						'<b style="float:left;margin-right:9px">巡逻区域:</b>' +
						'</div>' +
						'</div>' +
						'</div>'
				})

			} else if(pageType == JWXWType.ffxc) {
				//防范宣传
				$.each(result.List, function(index, value) {
					data += '<div class="detail-search-cons consFour"  data-id="' + value.sqjw_ffxcid + '" onclick=showDetail("' + JWXWType.ffxc + '","sqjw_ffxcid","' + value.sqjw_ffxcid + '")>' +
						'<div class="search-top">' +
						'<h3>' + value.sqjw_xcry + '</h3>' +
						'<b>' + value.sqjw_xcqy + '</b>' +
						'	</div>' +
						'<div class="search-middles">' +
						'<div class="search-mids-left">' +
						'<span>宣传教育形式:</span>' +
						'<b>' + value.sqjw_xcxs + '</b>' +
						'</div>' +
						'</div>' +
						'<div class="search-bottom">' +
						'<div class="search-bot-left">' +
						'<span>宣传教育内容:</span>' +
						'<b>' + value.sqjw_xcnr + '</b>' +
						'	</div>' +
						'</div>' +
						'</div>';
				})
			} else if(pageType == JWXWType.xfhl) {
				$.each(result.List, function(index, value) {
					var orderNum = (pageIndex - 1) * pageSize + index + 1;
					//巡防核录
					data += '<div class="detail-search-cons consFour alarmCons"  data-id="' + value.sqjw_xfhlid + '" onclick=locate(this,"' + type + '")>' +
						'<div class="search-top">' +
						'<h3>' + value.sqjw_name + '</h3>' +
						'<b>' + value.sqjw_sfzh + '</b>' +
						'</div>' +
						'<div class="search-middles">' +
						'<div class="search-mids-left">' +
						'<span>地址:</span>' +
						'<b title="">' + value.sqjw_xjd + '</b>' +
						'</div>' +
						'</div>' +
						'<div class="search-bottom">' +
						'<div class="search-bot-left">' +
						'<span>核查民警:</span>' +
						'<b>' + value.sqjw_hcmj + '</b>' +
						'</div>' +
						'</div>' +
						'<div class="search-bottom">' +
						'<div class="search-bot-left">' +
						'<span>核查开始时间:</span>' +
						'<b title="">' + value.sqjw_hckssj + '</b>' +
						'</div>' +
						'</div>' +
						'<div class="search-bottom">' +
						'<div class="search-bot-left">' +
						'<span>核查结束时间:</span>' +
						'<b title="">' + value.sqjw_kcjssj + '</b>' +
						'</div>' +
						'</div>' +
						'</div>';
				})
			}
		}
		return data;
	}

	window.locate = function(obj, type) {
		map.closePopup();
		var targetLayer;
		switch(type) {
			case TabType.zdry: //重点人员
				targetLayer = zdryLayer;
				break;
			case TabType.czfw: //出租房屋
				break;
				targetLayer = czfwLayer;
			case TabType.qydw: //企业单位
				targetLayer = qydwLayer;
				break;
			case TabType.sssb: //设施设备
				targetLayer = sssbLayer;
				break;
				targetLayer = czfwLayer;
			case TabType.jwxw: //警务行为
				targetLayer = jwxwLayer;
				break;
			default:
				targetLayer = null;
				break;
		}
		if(!targetLayer) {
			return;
		}

		var targetId = obj.dataset.id;
		var arr = [];
		for(var p in targetLayer._layers) {
			arr.push(p);
		}
		if(arr.length < 1) return;

		arr.forEach(function(index) {
			var layer = targetLayer._layers[index];
			if(layer.options.data_id == targetId) {
				//这里暂时写为18级，就是为了marker可以尽可能不聚合,因为聚合的状态下是没办法打开layer的popup
				map.setZoomAround(layer._latlng, 17);
				map.panTo(layer._latlng);
				layer.openPopup();
				layer.setIcon(selectIcon);

			} else {
				layer.setIcon(normalIcon);
			}
		})
	}

	/**
	 * 描述：数据定位
	 * objs：对象数组
	 * _layer：目标图层 
	 * */
	function locateToMap(objs, _layer, type, pageType) {
		_layer.clearLayers();
		_layer.on('click',function(e){
			_layer.getLayers().forEach(function(layer){
				layer.setIcon(normalIcon)
			});
			e.layer.setIcon(selectIcon);
		})
		objs.forEach(function(item) {
			var latlng = [];

			var ownunit = "无";
			if(item.owningbusinessunit) {
				ownunit = item.owningbusinessunit.name;
			}
			var ownname = "无";
			if(item.owninguser) {
				ownname = item.owninguser.name;
			}

			var content = "";
			var dataId = "";
			switch(type) {
				case TabType.zdry: //重点人员
					if(item.sqjw_wd && item.sqjw_jd) {
						latlng = [item.sqjw_wd, item.sqjw_jd];
						$('#people_pop #people_type').html(getTextByValue(zdrylbType, item.sqjw_zdrylb));
						$('#people_pop #area').html(ownunit);
						$('#people_pop #police').html(ownname);
						$('#people_pop #person_name').html(item.sqjw_name);
						$('#people_pop #id_card').html(item.sqjw_sfzh);
						content = $('#people_pop').html();
					} else {
						//layer.alert('位置信息缺失！');
					}
					dataId = item["sqjw_zdryid"];
					break;
				case TabType.czfw: //出租房屋
					break;

				case TabType.qydw: //企业单位
					if(item.sqjw_wd && item.sqjw_jd) {
						latlng = [item.sqjw_wd, item.sqjw_jd];
						$('#enterprise_pop #enterprise_name').html(item.sqjw_name);
						$('#enterprise_pop #enterprise_location').html(item.sqjw_dwdz ? item.sqjw_dwdz.name : '未知');
						$('#enterprise_pop #boss').html(item.sqjw_frdb);
						$('#enterprise_pop #enterprise_area').html(ownunit);
						$('#enterprise_pop #enterprise_type').html(getTextByValue(dwlbType, item.sqjw_dwlb));
						$('#enterprise_pop #enterprise_police').html(ownname);
						content = $('#enterprise_pop').html();
					} else {
						//layer.alert('位置信息缺失！');
					}
					dataId = item["sqjw_jgdwid"];
					break;
				case TabType.sssb: //设施设备
					switch(pageType) {
						case SSSBType.gps:
							if(item.LAT && item.LON) {
								latlng = [item.LAT, item.LON];
							}
							dataId = stringID(item[["D_ID"]]); //默认值包含/u0000/u0000							
							$('#gps_pop #gps_name').html(item.S_LX + ":" + item.D_Name);
							$('#gps_pop #gps_user').html(item.D_XM);
							$('#gps_pop #updateTime').html(item.D_Time);
							content = $('#gps_pop').html();
							break;
						case SSSBType.jksb:
							if(item.WD && item.JD) {
								latlng = [item.WD, item.JD];
							}
							dataId = item[["ID"]];
							$('#spjk_pop #spjk_name').html(item.VideoName);
							$('#spjk_pop #spjk_type').html(item.VideoType);
							$('#spjk_pop #ip').html(item.IP);
							$('#spjk_pop #spjk_szxq').html(item.BMNAME);
							$("#spjk_pop #spjk_show").html('<a onclick=showVideo(this,"' + item.HK_CAMERACODE + '") style="cursor: pointer;">查看视频</a>')
							content = $('#spjk_pop').html();
							break;
						case SSSBType.pfid:
							if(item.lat && item.lng) {
								latlng = [item.lat, item.lng];
							}
							dataId = item[["device_id"]];
							$('#sssb_rfid_pop #sssb_rfid_pop_address').html(item.address);
							$('#sssb_rfid_pop #sssb_rfid_pop_communicateTime').html(item.last_beat_time);
							content = $('#sssb_rfid_pop').html();
							break;
						case SSSBType.mac:
							if(item.LATITUDE && item.LONGITUDE) {
								latlng = [item.LATITUDE, item.LONGITUDE];
							}
							dataId = item[["INDEXCODE"]];
							$('#sssb_mac_pop #sssb_mac_pop_name').html(item.NAME);
							$('#sssb_mac_pop #sssb_mac_pop_districBelong').html(item.REGION_NAME);
							content = $('#sssb_rfid_pop').html();
							break;
						case SSSBType.G4:
							if(item.LATITUDE && item.LONGITUDE) {
								latlng = [item.LATITUDE, item.LONGITUDE];
							}
							dataId = item[["CAMERACODE"]];
							content = "<div class='pop-body' style='height: 179px'>" +
								"<div class='layui-card-header font-12 new-title'>4G执法记录仪</div>" +
								"<div class='layui-card-body' style='padding: 0 15px'>" +
								"<div class='detail_sssb_rfid_pop'>" +
								"<div class='content-left'><span>名称:</span></div>" +
								"<div class='content-right'><span>" + item.DJBM + "</span></div></div>" +
								"<div class='detail_sssb_rfid_pop'>" +
								"<div class='content-left'><span>电话:</span></div>" +
								"<div class='content-right'><span>" + item.DH + "</span></div></div>" +
								"<div class='detail_sssb_rfid_pop'>" +
								"<div class='content-left'><span>当前位置:</span></div>" +
								"<div class='content-right'><span>" + item.LATITUDE + " , " + item.LONGITUDE + "</span></div></div>" +
								"<div class='detail_sssb_rfid_pop'>" +
								"<div class='content-left'><span>速度:</span></div>" +
								"<div class='content-right font-12'><span>" + item.SPEED + ' km<sup>2</sup>/h' + "</span></div></div>" +
								"<div class='detail_sssb_rfid_pop'>" +
								"<div class='content-left'><span>更新时间:</span></div>" +
								"<div class='content-right'><span>" + item.REPORT_TIME + "</span></div></div>" +
								"<div class='detail_sssb_rfid_pop'><a onclick='showVideo(this,item.CAMERACODE)'>查看视频</a></div>" +
								"</div>" +
								"</div>";
							break;
						case SSSBType.jycl:
							if(item.LAT && item.LONGIT) {
								latlng = [item.LAT, item.LONGIT];
							}
							dataId = item[["CAMERACODE"]];
							$('#sssb_policecar_pop #sssb_policecar_pop_carNumber').html(item.VEHICLE_CODE);
							$('#sssb_policecar_pop #sssb_policecar_pop_carkilometer').html(item.MILE_COUNT);
							$('#sssb_policecar_pop #sssb_policecar_pop_currentPosition').html(item.LAT + ' , ' + item.LONGIT);
							$('#sssb_policecar_pop #sssb_policecar_pop_speed').html(item.SPEED);
							$('#sssb_policecar_pop #sssb_policecar_pop_communicatetime').html(item.REPORT_TIME);
							content = $('#sssb_policecar_pop').html();
							break;
						case SSSBType.jq:
							if(item.DHDWWD && item.DHDWJD) {
								latlng = [item.DHDWWD, item.DHDWJD];
							}
							dataId = item[["JJDBH"]]; //接警单编号

							$('#sssb_policesituation_pop #sssb_policesituation_pop_address').html(item.AFDD);
							$('#sssb_policesituation_pop #sssb_policesituation_pop_class').html(item.BJLBMC);
							$('#sssb_policesituation_pop #sssb_policesituation_pop_content').html(item.BJNR);
							$('#sssb_policesituation_pop #sssb_policesituation_pop_people').html(item.BJRXM);
							$('#sssb_policesituation_pop #sssb_policesituation_pop_tel').html(item.BJDH);
							$('#sssb_policesituation_pop #sssb_policesituation_pop_position').html(item.DHDWWD + " , " + item.DHDWJD);
							content = $('#sssb_policesituation_pop').html();
							break;
						case SSSBType.shspd:
							if(item.Y && item.X) {
								latlng = [item.Y, item.X];
							}
							dataId = item[["OBJECTID"]]; //接警单编号

							$("#shsp_pop #shsp_name").html(item.MC);
							$("#shsp_pop #shsp_type").html(item.LB);
							$("#shsp_pop #shsp_dz").html(item.BZ);
							$("#shsp_pop #shsp_szxq").html(item.KSD);
							$("#shsp_pop #shsp_lxr").html(item.LXR);
							$("#shsp_pop #shsp_lxdh").html(item.LXDH).attr('title', item.LXDH);
							$("#shsp_pop #shsp_name").html(item.MC);
							content = $("#shsp_pop").html();

							break;
					}
					break;
				case TabType.jwxw: //警务行为
					if(pageType == JWXWType.jwt_gps) {
						if(item.sqjw_wd && item.sqjw_jd) {
							latlng = [item.sqjw_wd, item.sqjw_jd];
						}
						dataId = item[["sqjw_jwt_gpsid"]];
						$('#jwxw_jwtgps_pop #jwxw_jwtgps_pop_name').html(item.sqjw_name);
						$('#jwxw_jwtgps_pop #jwxw_jwtgps_pop_lxdh').html(item.sqjw_lxdh);
						$('#jwxw_jwtgps_pop #jwxw_jwtgps_pop_jd').html(item.sqjw_jd);
						$('#jwxw_jwtgps_pop #jwxw_jwtgps_pop_area').html(ownunit);
						$('#jwxw_jwtgps_pop #jwxw_jwtgps_pop_wd').html(item.sqjw_wd);
						$('#jwxw_jwtgps_pop #jwxw_jwtgps_pop_time').html(item.createdon);
						if(item.createdby) {
							$('#jwxw_jwtgps_pop #jwxw_jwtgps_pop_trail').html('<a onclick=showTrail("' + item.createdby.id + '") style="cursor: pointer;">查看轨迹</a>');
						} else {
							$('#jwxw_jwtgps_pop #jwxw_jwtgps_pop_trail').css('display', 'none');
						}
						content = $('#jwxw_jwtgps_pop').html();

					} else if(pageType == JWXWType.xfhl) {
						if(item.sqjw_wd && item.sqjw_jd) {
							latlng = [item.sqjw_wd, item.sqjw_jd];
						}
						dataId = item[["sqjw_xfhlid"]];
						$('#jwxw_xfhl_pop #jwxw_xfhl_pop_name').html(item.sqjw_name);
						$('#jwxw_xfhl_pop #jwxw_xfhl_pop_sfzh').html(item.sqjw_sfzh);
						$('#jwxw_xfhl_pop #jwxw_xfhl_pop_hjd').html(item.sqjw_hjd);
						$('#jwxw_xfhl_pop #jwxw_xfhl_pop_xjd').html(item.sqjw_xjd);
						$('#jwxw_xfhl_pop #jwxw_xfhl_pop_hcmj').html(item.sqjw_hcmj);
						$('#jwxw_xfhl_pop #jwxw_xfhl_pop_hcjssj').html(item.sqjw_hcjssj);
						content = $('#jwxw_xfhl_pop').html();
					}
					break;
				default:
					break;
			}
			if(latlng.length == 2) {
				//坐标转换

				marker = L.marker(latlng, {
					icon: normalIcon,
					'data_id': dataId
				}).bindPopup(content, {
					minWidth: 344,
					offset: L.point(0,  -10)
				});

				marker.addTo(_layer);
				marker.addTo(markers);
			}
		});
	}

	window.showTrail = function(userid) {
		if(!userid) {
			alert("未找到当前用户轨迹数据!");
			return;
		}

		let now = new Date();
		let todayStart = now.format("yyyy-MM-dd 00:00");
		let todayEnd = now.format("yyyy-MM-dd 23:59");

		$.ajax({
			url: trailDataUrl,
			type: 'post',
			dataType: "json",
			data: {
				entityname: "sqjw_jwt_gps",

				filter: JSON.stringify({
					"Conditions": [{
						"AttributeName": "sqjw_systemuserid",
						"Operator": "equal",
						"Values": [{
							//"id": userid
											"id": "05E3362C-860E-411C-A1DC-32330B61B632"
						}]
					}, {
						"AttributeName": "createdon",
						"Operator": "between",
						//"Values": [todayStart, todayEnd]
												"Values": ["2018-09-17 00:00", "2018-09-17 23:59"]
					}],

					"FilterOperator": "AND",
					"Filters": []
				}),
				order: 'createdon asc',
				pagenum: 0,
				pagesize: 100,
				viewname: "defaultview"
			},
			success: function(data, textStatus) {

				if(data.List && data.List.length > 1) {
					loadTrail(data.List);
				} else {
					alert("未找到该用户轨迹数据!");
				}
			},
			error: function(e) {
				alert("未找到该用户轨迹数据!");
			}
		})

	}

	function loadTrail(list) {

		var optM = {
			radius: 5,
			stroke: true,
			color:'#fff',
			weight:2,
			fill: true,
			fillColor: "#ff5c5c",
			fillOpacity: 1
		}
		var optL = {
			weight: 3,
			color: "#ff5c5c	",
			dashArray: [10, 4],
			fillOpacity: 1,
			snakingSpeed: 800
		}
		var s = {
			permanent: true
		}
		var lineList = [];
		for(var i = 0; i < list.length - 1; i++) {
			let item = list[i];
			let itemNext = list[i + 1];
			let lnglat = [item.sqjw_wd, item.sqjw_jd];
			lineList.push(L.circleMarker([item.sqjw_wd, item.sqjw_jd], optM).bindTooltip(item.sqjw_dwsj, s).openTooltip());
			lineList.push(L.polyline([
				[item.sqjw_wd, item.sqjw_jd],
				[itemNext.sqjw_wd, itemNext.sqjw_jd]
			], optL));
		}
		lineList.push(L.circleMarker([list[list.length - 1].sqjw_wd, list[list.length - 1].sqjw_jd], optM).bindTooltip(list[list.length - 1].sqjw_dwsj, s).openTooltip());
		var route = L.featureGroup(lineList, {
			snakingPause: 100000
		});
		map.closePopup();
		map.fitBounds(route.getBounds(), {
			maxZoom: 12
		});
		trailLayer.clearLayers();
		trailLayer.addLayer(route);
		
		route.snakeIn();
	}

	window.showVideo = function(that, camera) {
		if(!camera || camera == "" || camera == "null") {
			alert("设备识别号为空!");
			return;
		}
		var ip = "10.120.193.239",
			port = "8087",
			user = "33045497",
			pswd = "b2dccf362a63a913d5591f39f8cdd8f709786d1b9dd39e530b8222699bcb2b8e7ab79b559dec9ed19ceee540a0bc33298825a38ad57b977e9e8807b81f44ce845e622adf36c237823ce34702c607595f96f66c9d16cf050b6786bdfedc910f930b923a5b9f07eefdde1e583a6b631fb590f3128dee606e6d1cb4c7cfb40814ee3dd97199cf727572b2bb36d2e87f3d1cef516c61e070a965dc912207dfceb49d0d68e010dbda2cfaa8e9cad56b3425b58568e3030d6622eb997ce15af90514f827aa40393f47374a8bed1fe405ddb09ba901047531ef0269fba1cea166ecae8906d90980ed241cc87162ee14ad8008c4b4d061dfca68cbc6f0cd0f48b880cc7d"
		var url = "hikvideoclient://ReqType:PlayReal;VersionTag:UNIV1.0;ImpIp:" + ip + ";ImpPort:" + port + ";Camlist:" + camera + ";loginName:" + user + ";LoginPwd:" + pswd + ";WndCount:1";
		//alert(url);
		//				document.getElementById("cmd").value = url;
		document.getElementById("videoUrl").src = url;
	}

	window.showDetailRY = function(type, field, value) {
		var filter = {
			"Conditions": [{
				"AttributeName": field,
				"Operator": "equal",
				"Values": [value]
			}],
			"FilterOperator": "AND",
			"Filters": []
		};
		var name = "",
			til = "";
		switch(type) {
			case TabType.zdry:
				name = "sqjw_zdry";
				til = "重点人员";
				break;
			default:
				break;
		}
		if(name == "") return;
		var pFilter = {
			entityname: name,
			filter: JSON.stringify(filter)
		}

		$.ajax({
			url: elementDataUrl,
			type: "get",
			data: pFilter,
			dataType: 'json',
			success: function(result) {
				var data = result.List;
				if(data.length < 1) {
					alert("未找到该项详细信息");
				}
				var ownunit = "无";
				if(data[0].owningbusinessunit) {
					ownunit = data[0].owningbusinessunit.name;
				}
				var ownname = "无";
				if(data[0].owninguser) {
					ownname = data[0].owninguser.name;
				}
				var cont = "";
				switch(type) {
					case TabType.zdry:
						$('#detail_zdry_name').text(data[0].sqjw_name);
						$('#detail_zdry_xb').text(getTextByValue(xbType, data[0].sqjw_xb));
						$('#detail_zdry_zdrylb').text(getTextByValue(zdrylbType, data[0].sqjw_zdrylb));
						$('#detail_zdry_sfzh').text(data[0].sqjw_sfzh);
						$('#detail_zdry_hjdz').text(data[0].sqjw_hjdz);
						$('#detail_zdry_xjzdz').text(data[0].sqjw_xjzdz);
						$('#detail_zdry_ownname').text(ownname);
						$('#detail_zdry_ownunit').text(ownunit);
						cont = $('#detail_sqjw_zdry').html();
						break;
					default:
						break;
				}
				//layui展示
				layui.use('layer', function() {
					var layer = layui.layer;
					layer.open({
						type: 1,
						title: "详细信息 - " + til,
						area: ['420px', '300px'],
						content: cont
					});
				});

			},
			error: function(error1, error2, error3) {
				alert("未找到该项详细信息" + error3);
			}
		})

	}

	window.showDetail = function(type, field, value) {
		var filter = {
			"Conditions": [{
				"AttributeName": field,
				"Operator": "equal",
				"Values": [value]
			}],
			"FilterOperator": "AND",
			"Filters": []
		};
		var name = "",
			til = "";
		switch(type) {
			case JWXWType.zfqk:
				name = "sqjw_zfqk";
				til = "走访入户";
				break;
			case JWXWType.jmkt:
				name = "sqjw_jmkt";
				til = "警民恳谈";
				break;
			case JWXWType.xlff:
				name = "sqjw_xlff";
				til = "巡逻防范";
				break;
			case JWXWType.ffxc:
				name = "sqjw_ffxc";
				til = "防范巡查";
				break;
			default:
				break;
		}
		if(name == "") return;
		var pFilter = {
			entityname: name,
			filter: JSON.stringify(filter)
		}

		$.ajax({
			url: elementDataUrl,
			type: "get",
			data: pFilter,
			dataType: 'json',
			success: function(result) {
				var data = result.List;
				if(data.length < 1) {
					alert("未找到该项详细信息");
				}

				var cont = "";
				switch(type) {
					case JWXWType.zfqk:
						$('#detail_zfqk_name').text(data[0].sqjw_name);
						$('#detail_zfqk_sfzh').text(data[0].sqjw_sfzh);
						$('#detail_zfqk_hjdz').text(data[0].sqjw_hjdz);
						$('#detail_zfqk_xjzdz').text(data[0].sqjw_xjzdz);
						$('#detail_zfqk_zfr').text(data[0].sqjw_zfr);
						$('#detail_zfqk_zfsj').text(data[0].sqjw_zfsj);
						cont = $('#detail_sqjw_zfqk').html();
						break;
					case JWXWType.jmkt:
						$('#detail_jmkt_name').text(data[0].sqjw_name);
						$('#detail_jmkt_ktrq').text(data[0].sqjw_ktrq);
						$('#detail_jmkt_ktdd').text(data[0].sqjw_ktdd);
						$('#detail_jmkt_ownunit').text('无');
						if(data[0].owningbusinessunit && data[0].owningbusinessunit.name) {
							$('#detail_jmkt_ownunit').text(data[0].owningbusinessunit.name);
						}
						$('#detail_jmkt_cjmj').text(data[0].sqjw_cjmj);
						$('#detail_jmkt_cjqz').text(data[0].sqjw_cjqz);
						cont = $('#detail_sqjw_jmkt').html();
						break;
					case JWXWType.xlff:
						$('#detail_xlff_xlmj').text(data[0].sqjw_xlmj);
						$('#detail_xlff_xldw').text(data[0].sqjw_xldw);
						$('#detail_xlff_xlry').text(data[0].sqjw_xlry);
						$('#detail_xlff_xlqy').text(data[0].sqjw_xlqy);
						$('#detail_xlff_xlkzqk').text(data[0].sqjw_xlkzqk);
						cont = $('#detail_sqjw_xlff').html();
						break;
					case JWXWType.ffxc:
						$('#detail_ffxc_xcry').text(data[0].sqjw_xcry);
						$('#detail_ffxc_xcqy').text(data[0].sqjw_xcqy);
						$('#detail_ffxc_xcxs').text(data[0].sqjw_xcxs);
						$('#detail_ffxc_xcnr').text(data[0].sqjw_xcry);
						$('#detail_ffxc_bz').text(data[0].sqjw_bz);
						cont = $('#detail_sqjw_ffxc').html();
						break;
					default:
						break;
				}

				//layui展示
				layui.use('layer', function() {
					var layer = layui.layer;
					layer.open({
						type: 1,
						title: "详细信息 - " + til,
						area: ['420px', '300px'],
						content: cont
					});
				});

			},
			error: function(error1, error2, error3) {
				alert("未找到该项详细信息" + error3);
			}
		})

	}

	window.showTel = function(e) {
		$(e.target).find('.telbox').css('display', 'block');
		$(e.target).find('.telbox1').css('display', 'block');
	}
	window.noshowTel = function(e) {
		$(e.target).find('.telbox').css('display', 'none');
		$(e.target).find('.telbox1').css('display', 'none');
	}

	//右下角获取警力数
	$.ajax({
		url: deviceUrl + '?fs=getZXJL',
		type: "get",
		dataType: 'json',
		success: function(result) {
			$('.titcons').html("");
			$('#one-cons').html("");
			$('#two-cons').html("");
			$('#three-cons').html("");
			$('#four-cons').html("");
			$('.titcons').html(result.num);
			$('#one-cons').html(result.jwt);
			$('#two-cons').html(result.djj);
			$('#three-cons').html(result.zfjly);
			$('#four-cons').html(result.bdjc);
			//			$('.numconts-box:nth-of-type(2) h1').html(result.jwt);
			//			$('.numconts-box:nth-of-type(3) h1').html(result.djj);
			//			$('.numconts-box:nth-of-type(4) h1').html(result.zfjly);
			//			$('.numconts-box:nth-of-type(5) h1').html(result.bdjc);
		}
	});

	function drawChart() {
		var perple_info = $('.perple_info');
		$(perple_info[1]).css({
			width: '348px',
			height: '355px'
		});
		var my_echarts = echarts.init(perple_info[1], layui.echartsTheme);
		var option = {
			//居住人员图表
			tooltip: {
				trigger: 'item',
				formatter: "{a}<br/>{b} : {c}"
			},
			legend: {
				// orient: 'vertical',
				left: 15,
				top: 15,
				itemGap: 20,
				data: ['常住人口', '肇事精神病人', '前科人员', '境外人员']
			},
			series: [{
				name: '居住人口',
				type: 'pie',
				radius: ['35%', '55%'],
				center: ['50%', '50%'],
				data: [{
						value: 4582,
						name: '常住人口'
					},
					{
						value: 563,
						name: '肇事精神病人'
					},
					{
						value: 128,
						name: '前科人员'
					},
					{
						value: 158,
						name: '境外人员'
					},
				],
				color: ['#3686ff', '#ff4936', '#ff9036', '#ffce00'],
				label: {

					normal: {
						textStyle: {
							color: 'rgba(255, 255, 255, 0.3)'
						}
					}
				},
				labelLine: {
					normal: {
						show: false,
						lineStyle: {
							color: 'rgba(255, 255, 255, 0.3)'
						}
					}
				},
			}]
		};

		my_echarts.setOption(option);
		window.onresize = my_echarts.resize;
	}

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
		pianquLayer = L.geoJSON(polices, {
			style: function(feature) {
				return {
					color: '#45A1FF',
					fillOpacity: 0.15,
					weight: 1
				};
			}
		});

//		var gdTile = L.tileLayer.gdLayer({});
		var gaode = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
					maxZoom: 18,
					minZoom: 5
				});
		annotion = new L.FeatureGroup();
		map = L.map('map_container', {
			zoomControl: false,
			attributionControl: false,
			doubleClickZoom: false,
			boxZoom: true,
			dragging: true,
			minZoom: 8,
			layers: [gaode, annotion, pianquLayer, markers,trailLayer]
		}).setView([30.398517669, 120.713582], 11);

		var baseLayer = {
			"高德地图": gaode,
		}
		var groupLayers = {
			"路网图层": null,
			"专题图层": {
				"标记点": markers,
				"片区": pianquLayer,

			}
		}
		L.control.groupedLayers(baseLayer, groupLayers).addTo(map);
		L.control.mousePosition({
			'position': 'bottomright'
		}).addTo(map);

		//比例尺添加
		L.control.betterscale({
			'position': 'bottomright'
		}).addTo(map);

		//暂时关闭片区的点击事件
		/*pianquLayer.on('click', function(e) {
			popup = L.popup({
					minWidth: 751,
					closeButton: true,
					className: 'pianquInfo'
				})
				.setContent($('#popup').html())
				.setLatLng(e.latlng)
				.openOn(map);
			layui.use('table', function() {
				var table = layui.table;
				var $ = layui.$;

				

				var table_type = $('.table-type');
				var length_type = table_type.length;

				table_type[length_type - 1].setAttribute('id', 'table_type');

				$.get(elementDataUrl, {
					entityname: 'sqjw_jgdw'
				}, function(data, textStatus, xhr) {
					var data_table_type = [];
					data_table_type = $.parseJSON(data).List;
					// console.log(data_table_type)

					table.render({
						elem: '#table_type',
						height: 305,
						// url: 'http://47.100.247.54:8080/jhzhps-back/alarm/getList',
						page: { //支持传入 laypage 组件的所有参数（某些参数除外，如：jump/elem） - 详见文档
							layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'] //自定义分页布局
								,
							first: false //不显示首页
								,
							last: false //不显示尾页
								,
							theme: '#0095ff'
						},
						cols: [
							[{
								field: 'sqjw_name',
								title: '单位名称',
								width: 88
							}, {
								field: 'sqjw_dwdz',
								title: '单位地址',
								width: 92,
								templet: '#sqjw_dwdz'
							}, {
								field: 'sqjw_dwlb',
								title: '单位类别',
								width: 88
							}, {
								field: 'sqjw_frdb',
								title: '法人代表',
								width: 80
							}, {
								field: 'sqjw_name',
								title: '管辖民警',
								width: 80,
								templet: '#owninguser'
							}, {
								field: 'sqjw_name',
								title: '所属辖区',
								width: 96,
								templet: '#owningbusinessunit'
							}]
						],
						data: data_table_type
					});
				});
			});

			layui.use('form', function() {
				var form = layui.form;
				form.render(null, 'area');
			});
		});*/
	}

});;