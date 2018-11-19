/*传参*/
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null)
		return unescape(r[2]);
	return null;
}

//分页控件的初始化，先解除page事件然后重新绑定，防止多次触发
function pageInit(type, total, visiblePages, startPage, pageId, dataUrl, $_listPanel, getTable, data, limit, pageType) {
	laypage.render({
		elem: pageId,
		count: total,
		limit: limit,
		groups: visiblePages,
		first: '«',
		last: '»',
		prev: '<',
		next: '>',
		curr: startPage,
		jump: function(obj, first) {
			var page = obj.curr - 1;
			var pageSize = limit;
			data.pagenum = page;
			data.pagesize = pageSize;
			$.ajax({
				url: dataUrl,
				data: data,
				type: 'get',
				dataType: 'json',
				success: function(result) {
					var datas = getTable(type, result, page, pageSize, pageType);
					$_listPanel.empty().html(datas);
				}
			});
		}
	});
}
//获取工程
/**
 * pageIndex：第几页
 * url：接口
 * $_listPanel：列表容器的jquery对象，这里是ul
 * $_paginationWrap：分页容器
 * $_resTatal：查询结果总数容器,
 * getTable:函数，根据ajax的返回值生成列表的html
 * */
function getList(pageIndex, url, $_listPanel, $_paginationWrap, paginationId, $_resTatal, getTable) {
	var pageSize = 10;
	$.ajax({
		url: url,
		async: false,
		type: "get",
		data: {
//			page: pageIndex,
//			limit: pageSize
		},
		success: function(result) {
			var total = result.count; //记录总数
			totalLeft = total;
			if(total) {
				var data = getTable(result, pageIndex, pageSize);
				$_listPanel.empty().html(data);
				if(total > 10) {
					var pageTotal = total / pageSize;
					var remainder = total % pageSize;
					if(remainder > 0) {
						pageTotal++;
					}
					//初始化一个分页控件
					pageInit(total, 4, pageIndex, paginationId, url, $_listPanel, getTable);
					$('#' + paginationId).css('display', 'block');
					$_paginationWrap.css('display', 'block');
				} else {
					$('#' + paginationId).css("display", "none");
					$_paginationWrap.css('display', 'none');
				}
			} else {

				$_listPanel.empty();
			}
			if($_resTatal) {
				$_resTatal.text(total);
			}
		}
	});
}