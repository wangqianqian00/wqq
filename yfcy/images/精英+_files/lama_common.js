// 全局是否是调试
var isAjaxDebug = true;

// 前端相应时间计时器
var t0 = 0;

// 后台接口路径，用相对路径
var interfaceUrl = './do/deal/';

// 终端输出
function LamaLog(s){
	if(isAjaxDebug){
		//console.log(s);
	}
}

// 尝试执行某函数 及参数
function LamaDoing(f,d,c){
  var t = 'window.'+f;
  if(!$.isFunction(eval(t))){
    LamaLog("没有对应的js函数：function "+f+"(d,c){}");
    return;
  }
  
  LamaLog("正在执行js函数：function "+f+"(d,c){}");
  eval(f+"(d,c);");
}

/**
 *扩展jQuery方法，获取URL请求参数
 *Get object of URL parameters var allVars = $.getUrlVars();
 *Getting URL var by its name var byName = $.getUrlVar('name');
 */
$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var href = window.location.href;
    var hashes = href.slice(href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  }
});

// ajax 请求
var value_ajax = 0;
function LamaRequest(u,d){
  if(0 != value_ajax){
    value_ajax.abort();
  }
  value_ajax = $.ajax({
		type: "POST",
		url: u,
		data: d,
    timeout: 100000,
		cache: false,
		async: true,
		beforeSend:	function(){
      LamaLog("data:");
      LamaLog(d);
      t0 = (new Date()).getTime();
      LamaDoing('LamaBefore'+d.flag,d,'');
		},
		success:	function(r){
      LamaLog("服务端的输出");
      LamaLog(r);
			var ret = [];
			ret = r.split("<br />");
			if (!r.match("^\{(.+:.+,*){1,}\}$")){
        LamaLog("服务器返回中的字符串不是标准的json结构！");
      }
      
      var result = r;
      
      $.each(ret,function(i,v){
        if(!v.match("^\{(.+:.+,*){1,}\}$")){
          LamaLog(v);
        }else{
          result = v;
        }
      });
      
      
			if (!result.match("^\{(.+:.+,*){1,}\}$")){
        LamaLog("服务器返回的字符串中不含json结构的数据！")
				return;
			}
			
			var res= $.parseJSON(result);
      LamaLog("服务器返回的json数据");
      LamaLog(res);
      if(4000 == parseInt(res.status)){
          top.location = res.goto;
          return;
      }
      
      if (3000 == parseInt(res.status)||2001 == parseInt(res.status)){
        LamaLog("status返回3000:");
        var info = '后台处理出错';
        if ('undefined'!=typeof(res.info) && '' != $.trim(res.info)) {
          info = res.info
        }
        LamaDoing('LamaErr'+d.flag,d,info);
        return;
      }
      
      if(1010 == parseInt(res.status)){
        LamaLog("status返回1010:");
        LamaDoing('LamaRes'+d.flag,d,res);
        return;
      }
      
      LamaLog("status返回非4000、3000或1010");
      LamaDoing('LamaErr'+d.flag,d,'返回异常');
		},
		complete:	function(XMLHttpRequest,status){
      value_ajax = 0;
			if('timeout'==status){
        LamaLog("请求超时！");
        LamaDoing('LamaErr'+d.flag,d,'超时');
      }

      LamaLog("ajax请求开始到完成用时:(ms)");
      LamaLog((new Date()).getTime()-t0);
		},
		error: function(jqXHR,textStatus,errorThrown){
		    LamaLog(jqXHR);
        LamaLog(textStatus);
        LamaLog(errorThrown);
        LamaDoing('LamaErr'+d.flag,d,'');
		}
	});
}

function LamaGetNullStr(str, rep){
	if('' == $.trim(str) || 'null' == str){
		return rep;
	}
	
	return str;
}

(function($) {
	$.extend({       
		urlGet:function(){
		  var aQuery = window.location.href.split("?");  //取得Get参数
		  var aGET = new Array();
		  if(aQuery.length > 1)
		  {
		    var aBuf = aQuery[1].split("&");
		    for(var i=0, iLoop = aBuf.length; i<iLoop; i++)
		    {
		      var aTmp = aBuf[i].split("=");  //分离key与Value
		      aGET[aTmp[0]] = aTmp[1];
		    }
		  }
		  return aGET;
		 }
	})
})(jQuery);

//(function($,h,c){var a=$([]),e=$.resize=$.extend($.resize,{}),i,k="setTimeout",j="resize",d=j+"-special-event",b="delay",f="throttleWindow";e[b]=250;e[f]=true;$.event.special[j]={setup:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.add(l);$.data(this,d,{w:l.width(),h:l.height()});if(a.length===1){g()}},teardown:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.not(l);l.removeData(d);if(!a.length){clearTimeout(i)}},add:function(l){if(!e[f]&&this[k]){return false}var n;function m(s,o,p){var q=$(this),r=$.data(this,d);r.w=o!==c?o:q.width();r.h=p!==c?p:q.height();n.apply(this,arguments)}if($.isFunction(l)){n=l;return m}else{n=l.handler;l.handler=m}}};function g(){i=h[k](function(){a.each(function(){var n=$(this),m=n.width(),l=n.height(),o=$.data(this,d);if(m!==o.w||l!==o.h){n.trigger(j,[o.w=m,o.h=l])}});g()},e[b])}})(jQuery,this);
