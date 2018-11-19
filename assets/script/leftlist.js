layui.use(['element', 'layer', 'form', 'laypage', 'table', 'laydate'], function() {
	$ = layui.jquery;
	element = layui.element;
	layer = layui.layer;
	form = layui.form;
	table = layui.table;
	laypage = layui.laypage;
	table.render({
		elem: '#test-table-height1',
		height: 315,
		url: 'http://47.100.247.54:8080/jhzhps-back/alarm/getList' //数据接口
			,
		cols: [
			[ //表头
				{
					field: 'id',
					title: '警号',
					width: 70
				}, {
					field: 'username',
					title: '姓名',
					width: 80
				}, {
					field: 'sex',
					title: '联系方式',
					width: 110
				}, {
					field: 'city',
					title: '管辖派出所',
					width: 110
				}
			]
		]
	});
	table.render({
		elem: '#test-table-height2',
		height: 315,
		url: 'http://47.100.247.54:8080/jhzhps-back/alarm/getList' //数据接口
			,
		cols: [
			[ //表头
				{
					field: 'id',
					title: '警号',
					width: 70
				}, {
					field: 'username',
					title: '姓名',
					width: 80
				}, {
					field: 'sex',
					title: '联系方式',
					width: 110
				}, {
					field: 'city',
					title: '管辖派出所',
					width: 110
				}
			]
		]
	});
	table.render({
		elem: '#test-table-height3',
		height: 315,
		url: 'http://47.100.247.54:8080/jhzhps-back/alarm/getList' //数据接口
			,
		cols: [
			[ //表头
				{
					field: 'id',
					title: '警号',
					width: 70
				}, {
					field: 'username',
					title: '姓名',
					width: 80
				}, {
					field: 'sex',
					title: '联系方式',
					width: 110
				}, {
					field: 'city',
					title: '管辖派出所',
					width: 110
				}
			]
		]
	});
	table.render({
		elem: '#test-table-height4',
		height: 315,
		url: 'http://47.100.247.54:8080/jhzhps-back/alarm/getList' //数据接口
			,
		cols: [
			[ //表头
				{
					field: 'id',
					title: '警号',
					width: 70
				}, {
					field: 'username',
					title: '姓名',
					width: 80
				}, {
					field: 'sex',
					title: '联系方式',
					width: 110
				}, {
					field: 'city',
					title: '管辖派出所',
					width: 110
				}
			]
		]
	});
	laypage.render({
		elem: 'test-laypage-demo10',
		count: 40,
		layout: ['count']
	});
	laypage.render({
		elem: 'test-laypage-demo11',
		count: 40,
		groups: 3,
		layout: ['prev', 'page', 'next']
	});
	laypage.render({
		elem: 'laypage-house1',
		count: 40,
		layout: ['count']
	});
	laypage.render({
		elem: 'laypage-house2',
		count: 40,
		groups: 3,
		layout: ['prev', 'page', 'next']
	});
	laypage.render({
		elem: 'laypage-unit1',
		count: 40,
		layout: ['count']
	});
	laypage.render({
		elem: 'laypage-unit2',
		count: 40,
		groups: 3,
		layout: ['prev', 'page', 'next']
	});
	var picSize = 1;
	$(document).on('click', '.billPicture', function(e) {
		if(picSize == 1) {
			this.style.width = "220px";
			this.style.height = "220px";
			this.style.cursor = 'pointer';
			picSize = 2;
		} else {
			this.style.width = "60px";
			this.style.height = "60px";
			this.style.cursor = 'pointer';
			picSize = 1;
		}
	})

	$(".userInfo").click(function() {
		layer.open({
			type: 2,
			area: ['680px', '710px'],
			fix: false,
			maxmin: true,
			shadeClose: true,
			shade: 0.4,
			resize: false,
			title: '个人信息',
			content: 'userInfo.vm',
			skin: 'demo-class'
		});
	})
	$(function() {
		$('.search-contents .detail-search-cons .search-middle .search-mid-right').on('click', function() {
			layer.tips($(this).find('.pup-detail').html(), $(this), {
				tips: [1, '#43d06b'],
				time: 3000
			});
		})		
	})
})