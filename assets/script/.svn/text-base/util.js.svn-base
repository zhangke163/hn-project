function encrypt(text) {
	setMaxDigits(262);
	key = new RSAKeyPair(
		// Public exponent extracted from private_key.pem using
		// openssl rsa -inform PEM -text -noout < private_key.pem
		// Or extracted from public key PEM file using
		// openssl rsa -pubin -inform PEM -text -noout < public_key.pem
		"10001",
		// Dummy decryption exponent -- actual value only kept on server.
		"",
		// Modulus extracted from private key PEM file using
		// openssl rsa -inform PEM -modulus -noout < private_key.pem
		// Or extracted from public key PEM file using
		// openssl rsa -pubin -inform PEM -modulus -noout < public_key.pem
		"F5EEF28E0BBE31E33290E83085AA4DB17C503FA0E93A876EB4C5AB1D6B8A033B0FC016EF82322582AE8920F4CA04008525A9522D6084819BB130A6B0784092FAE3F413771BAE18018EC27A3E89B204C23FC22701B9300D22502712B6C2D979FDEE17EE4309FEB5433AD168EA924659BB855D4A4763007B2C5A7C4AD0E34192D496DD207D38ECEE36D436C27812C9490A69F86088E584EAE61C977336E1B342EC51C8824A441FFA623BC1858005B6E066EE5FC3541A7CF1B567D50F45965121BEDDBF7FF4C2C3C47FA7232F43B5B5C7AEE8A3D0FF82B3C82DFFCFD389F5073D94D6DBEBA63079B4E42DD01FDAFA17AB7A283DD793B03D4C7B4ACDA45E688A4D1F",
		// Key size in bits.
		2048);
	var ciphertext = encryptedString(key, text, RSAAPP.PKCS1Padding, RSAAPP.NumericEncoding);
	return ciphertext;
}

function parseJsonDate(n) {
	return !n || n.length < 6 ? null : new Date(parseInt(n.substr(6)))
};

function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

/**
 * 返回指定format的string
 * format eg:'yyyy-MM-dd hh:mm:ss'
 **/
Date.prototype.format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, //因为getMonth和我们日常使用的月份差一个月
		"d+": this.getDate(),
		"h+": this.getHours(),
		"m+": this.getMinutes(),
		"s+": this.getSeconds(),
		"q+": Math.floor((this.getMonth() + 3) / 3),
		"S": this.getMilliseconds()
	}
	if(/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for(var k in o) {
		if(new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}

function millisecToTime(millisec) {
	var second = Math.floor(millisec / 1000);
	var s = second % 60;
	var m = Math.floor(second / 60) % 60;
	var h = Math.floor(second / 3600);
	s = s < 10 ? '' + 0 + s : s;
	m = m < 10 ? '' + 0 + m : m;
	h = h < 10 ? '' + 0 + h : h;
	return(h + ':' + m + ':' + s);
}

function getTextByValue(arr, value) {
	if(!value) {
		return "空";
	}
	if(!arr || arr.length == 0) {
		return value
	}

	var item = arr.filter(function(obj, index) {
		return obj.Value === parseFloat(value);
	});
	if(item.length < 1) {
		return "空"
	}
	return item[0].Text;
}