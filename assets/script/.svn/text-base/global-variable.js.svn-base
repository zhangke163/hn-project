//公安网正式部署采用接口
//var elementDataUrl = "/Service/Data/GetListData.ashx";
//var deviceUrl = "http://10.120.193.85:8085/jwhn/api/GPS.ashx";
//var mapUrl = "/Service/Data/GetEntityField.ashx";

//外网测试公安网测试数据采用接口
var elementDataUrl = "http://119.3.2.150:18901/Service/Data/GetListData.ashx";
var deviceUrl = "http://10.120.193.85:8085/jwhn/api/GPS.ashx";
var mapUrl = "http://119.3.2.150:18901/Service/Data/GetEntityField.ashx";

//外网测试数据谢步祺编写的接口
/*var elementDataUrl = "http://47.100.247.54:3000/getDataList";
var deviceUrl = "http://47.100.247.54:3000/getSSList";
var mapUrl = "http://47.100.247.54:3000/GetEntityField";*/

var TabType = {
    zdry: "重点人员",
    czfw: "出租房屋",
    qydw: "企业单位",
    sssb: "设施设备",
    jwxw: "警务行为"
}
Object.freeze(TabType);
var SSSBType = {
    gps: "GPS",
    jksb: "监控设备",
    pfid: "RFID",
    mac: "MAC",
    G4: "4G执法记录仪",
    jycl: "警用车辆",
    jq: "警情",
    shspd: "社会视频点"
}
Object.freeze(SSSBType);
var JWXWType = {
    zfqk: "入户走访",
    jmkt: "警民恳谈",
    xlff: "巡逻防范",
    ffxc: "防范宣传",
    xfhl: "巡防核录",
    jwt_gps: "警务通GPS"
}
Object.freeze(JWXWType);

var dwdlType = [];
var dwlbType = [];
var xbType = [];
var mzType = [];
var zdrylbType = [];

//获取键值对应
$(function () {
    var filter = {
        entityname: 'sqjw_jgdw'
    };
    var optionJG = excuteMap(mapUrl, filter);
    filter = {
        entityname: 'sqjw_zdry'
    };
    var optionRY = excuteMap(mapUrl, filter);

    if (optionJG) {
        dwdlType = optionJG.sqjw_dwdl;
        dwlbType = optionJG.sqjw_dwlb;
    }
    if (optionRY) {
        mzType = optionRY.sqjw_mz;
        xbType = optionRY.sqjw_xb;
        zdrylbType = optionRY.sqjw_zdrylb;
    }

    //下拉列表更新
    var list = ' <option value="">请选择人员类别</option>';
    zdrylbType.forEach(function (item) {
        list += '<option value="' + item.Value + '">' + item.Text + '</option>';
    });
    $('#personSelect').empty().append(list);

    //小类
    var list = ' <option value="">请选择企业小类</option>';
    $('#companySelect').empty().append(list);
    //大类
    var list = ' <option value="">请选择企业大类</option>';
    dwdlType.forEach(function (item) {
        list += '<option value="' + item.Value + '">' + item.Text + '</option>';
    });
    $('#companyDLSelect').empty().append(list);

    function excuteMap(url, filter) {
        var options = [];
        $.ajax({
            url: url,
            type: "get",
            async: false,
            data: filter,
            dataType: 'json',
            success: function (result) {
                options = result.Options;
            },

            error: function (e1) {
                options = [];
            },
            complete: function (e1, e2, e43) {
                debugger
            }
        })
        return options;
    }
})

function refreshCompanyLB(info, dwlbType) {
    var arrTypes = dwlbType.filter(function (item) {
        return parseInt(item.Value / 100) == info;
    });
    var list = ' <option value="">请选择企业小类</option>';
    arrTypes.forEach(function (item) {
        list += '<option value="' + item.Value + '">' + item.Text + '</option>';
    });
    $('#companySelect').empty().append(list);
}

var zdryIcon = L.icon({
    iconUrl: '../assets/images/监控.png',
    iconSize: [20, 26],
    iconAnchor: [0, 0]
});

var zdryIconActive = L.icon({
    iconUrl: '../assets/images/监控a.png',
    iconSize: [20, 26],
    iconAnchor: [0, 0]
});

var dwjgIcon = L.icon({
    iconUrl: '../assets/images/场所.png',
    iconSize: [20, 26],
    iconAnchor: [0, 0]
});

var dwjgIconActive = L.icon({
    iconUrl: '../assets/images/场所a.png',
    iconSize: [20, 26],
    iconAnchor: [0, 0]
});

var GPSIcon =L.icon({
    iconUrl: '../assets/images/gps.png',
    iconSize: [20, 26],
    iconAnchor: [0, 0]
});
var RFIDIcon =L.icon({
    iconUrl: '../assets/images/rfida.png',
    iconSize: [20, 26],
    iconAnchor: [0, 0]
});
var MACIcon =L.icon({
    iconUrl: '../assets/images/maca.png',
    iconSize: [20, 26],
    iconAnchor: [0, 0]
});

var fourGeCameralIcon =L.icon({
    iconUrl: '../assets/images/记录仪.png',
    iconSize: [20, 26],
    iconAnchor: [0, 0]
});
var policeCarIcon =L.icon({
    iconUrl: '../assets/images/警车a.png',
    iconSize: [20, 26],
    iconAnchor: [0, 0]
});
var policeSituationIcon =L.icon({
    iconUrl: '../assets/images/警情a.png',
    iconSize: [20, 26],
    iconAnchor: [0, 0]
});