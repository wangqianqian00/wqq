/**
 * Created by pingwang on 15-5-26.
 */
var Weburl = "Lanou3G.Com";
var htmlcopy = "Copyright &copy;2013-2015 蓝鸥科技 "+Weburl;
var Model = "do";
var doUrl = Model+"/";
var htmlimg='<img src="img/loading.gif">'
var htmling='<img src="img/loadings.gif">'
var QRimg = "";
var waitSecs = 40;
var intervalTop = 30000;
var intervalLogin = 500;
var intervalTouch = 20000;

var ajaxGetvLimit=function(){
	//alert(1);
    var ajax_data={"question":"Visit"};
    //console.log(ajax_data.question);
    $.ajax({
        type:'POST',
        url:doUrl,
        data:ajax_data,
        dateType:'text',
        /*beforeSend(XHR)类型：Function发送请求前可修改 XMLHttpRequest 对象的函数，如添加自定义 HTTP 头。
         XMLHttpRequest 对象是唯一的参数。这是一个 Ajax 事件。如果返回 false 可以取消本次 ajax 请求。*/
        beforeSend:function(){
			$("#Switch").hide();
		    $(".logoText").hide();
		    $(".logoTwo").hide();
			
			loading("s",".center-form");
        },
        error:function(e){
        	//console.log('error');
        },
        //请求成功
        success:function(ans){
			//console.log('success:'+ans);
			//return;
            //success
            //alert(ans);
			loading("h",".center-form");
            var _json=$.parseJSON(ans);
			//console.log(_json);
			$("#lllloading").hide();
			if("undefined"!=typeof(_json.code)){
				QRimg = _json.code;
			}
			$(".center-form").show();
			/* */
			if (1 == parseInt(_json.loginmethod)){
				lamaSetQRLogin();
				return;
			}
			/**/
            var status = _json.status;//vlimit
            var justgo = _json.info;
            var goto = _json.goto;
            var data   = _json.data;
            var limit = _json.data.limit;
			$("#Switch").show();
			$(".logoText").show();
            if(1010 == status){
            		/*
            	  $("#submit").css("background","#CBCCCE");
                $("#submit").val("正在登陆...");
                $("#submit").attr('disabled',true);
                */
                $(".logoText").html("");
                loading("s",".center-form");
                window.location.href=goto;
            } else if(3000 == status){
                if(1 == limit){
                    //$("#checkcode").html(vhtml);
                    $("#checkcode").show();
                    //changeImg();
                    $("#user").keypress(function(e){
                        if('13'==e.keyCode){
                            $("#password").focus();
                        }
                    });
                    $("#password").keypress(function(e){
                        if('13'==e.keyCode){
                            $("#chknum").focus();
                        }
                    });
                    $("#chknum").keypress(function(e){
                        if('13'==e.keyCode){
                            ajaxLogin();
                        }
                    });
                }else{
                    $("#user").keypress(function(e){
                        if('13'==e.keyCode){
                            $("#password").focus();
                        }
                    });
                    $("#password").keypress(function(e){
                        if('13'==e.keyCode){
                            ajaxLogin();
                        }
                    });
                }
            }
        },
        /*complete(XHR, TS)类型：Function请求完成后回调函数 (请求成功或失败之后均调用)。参数： XMLHttpRequest 对象和一个描述请求类型的字符串。这

是一个 Ajax 事件。*/
        complete:function(){
        }
    });
};
var logout=function(){
    var requests={"question":"Logout"};
    $.ajax({
        type:'POST',
        url:doUrl,
        data:requests,
        dateType:'json',
        beforeSend:function(){
            //loadings("s");
        },
        error:function(e){
        },
        success:function(ans){
        	var res=$.parseJSON(ans);
            window.location.href=res.next;
        },
        complete:function(){
        }
    });
};


//分页
var getPaging=function(i,n){
	var total=$("#pagingmain"+n+" p span").html()
	var nowNum=$("#pagsnum"+n+"").val()
	if(i==1){
		nowNum++
		if(nowNum>total-1){
			$("#pagingmain"+n+" a:eq(2)").addClass("on")
			$("#pagingmain"+n+" a:eq(3)").addClass("on")
			}
		if(nowNum>1){
			$("#pagingmain"+n+" a:eq(0)").removeClass("on")
			$("#pagingmain"+n+" a:eq(1)").removeClass("on")
			}
		if(nowNum>total){
			nowNum=total
			}
		$("#pagsnum"+n+"").val(nowNum)
		}
	else if(i==0){
		nowNum--
		if(nowNum<2){
			$("#pagingmain"+n+" a:eq(0)").addClass("on")
			$("#pagingmain"+n+" a:eq(1)").addClass("on")
			}
		if(nowNum<total){
			$("#pagingmain"+n+" a:eq(2)").removeClass("on")
			$("#pagingmain"+n+" a:eq(3)").removeClass("on")
			}
		if(nowNum<1){
			nowNum=1
			}
		$("#pagsnum"+n+"").val(nowNum)
		}
	else if(i==2){
		nowNum=total
		$("#pagsnum"+n+"").val(nowNum)
		$("#pagingmain"+n+" a:eq(2)").addClass("on")
		$("#pagingmain"+n+" a:eq(3)").addClass("on")
		$("#pagingmain"+n+" a:eq(0)").removeClass("on")
		$("#pagingmain"+n+" a:eq(1)").removeClass("on")
		}
	else if(i==3){
		nowNum=1
		$("#pagsnum"+n+"").val(nowNum)
		$("#pagingmain"+n+" a:eq(0)").addClass("on")
		$("#pagingmain"+n+" a:eq(1)").addClass("on")
		$("#pagingmain"+n+" a:eq(2)").removeClass("on")
		$("#pagingmain"+n+" a:eq(3)").removeClass("on");
		}
	}

//下拉框
/*var setSelect=function(){
$(".select .selectShow").live("click",function(){
		$(".option").hide()
		var opt=$(this).next()
		var optLi=$(this).next().find("li")
		opt.show()
		optLi.each(function(i) {
          if($(this).parent().parent().prev().html()==$(this).html()){
			  $(this).prependTo($(this).parent())
			  }  
        });
		})*/
//	$(".select .option li").live("onmouseenter",function(){
//		$(this).css("background-color","#f7f7f7")
//		})
//	$(".select .option li").live("onmouseleave",function(){
//		$(this).css("background-color","#ffffff")
//		})	
	/*$(".select .option li").live("click",function(){
		var seleShow=$(this).parent().parent().prev(".selectShow")
		seleShow.html($(this).html())
		$(this).parent().parent().hide()
		$(this).parentsUntil("option").prev().removeClass("pointSel")
		});	
	$(".select .option").live("mouseleave",function(){
		$(this).hide();
		});			
	
	}*/
	

//文本框+下拉框
var setSelectText=function(){
$(".selectText .selectTextShow a").click(function(){
		
		var opt=$(this).parent().next()
		var optLi=$(this).parent().next().find("li")
		if($(this).parent().next().is(":visible")==false){
		$(".optionText").hide()
		opt.show()
		optLi.each(function(i) {
          if($(this).parent().parent().prev().find("input").val()==$(this).html()){
			  $(this).prependTo($(this).parent())
			  }  
        });
		}else{
			$(".optionText").hide()
			$(this).parent().next().hide()
			}
		})
	$(".selectText .optionText li").mouseenter(function(){
		$(this).css("background-color","#f7f7f7")
		})
	$(".selectText .optionText li").mouseleave(function(){
		$(this).css("background-color","#ffffff")
		})	
	$(".selectText .optionText li").click(function(){
		var seleShow=$(this).parent().parent().prev(".selectTextShow").find("input")
		seleShow.val($(this).html())
		$(this).parent().parent().hide()
		})
	$(".selectText").mouseleave(function(){
		$(this).find(".optionText").hide()
		});
	}
	
	
var setCalendar=function(){
	!function(){
	laydate.skin('lanou');//切换皮肤，请查看skins下面皮肤库
	//laydate({elem: '#demo'});//绑定元素
}();

//日期范围限制
var start = {
    elem: '#start',
    format: 'YYYY-MM-DD',
    min: laydate.now(), //设定最小日期为当前日期
    max: '2099-06-16', //最大日期
    istime: true,
    istoday: false,
    choose: function(datas){
         end.min = datas; //开始日选好后，重置结束日的最小日期
         end.start = datas //将结束日的初始值设定为开始日
    }
};
var startNew = {
    elem: '#startNew',
    format: 'YYYY-MM-DD',
    min: laydate.now(), //设定最小日期为当前日期
    max: '2099-06-16', //最大日期
    istime: true,
    istoday: false,
    choose: function(datas){
         endNew.min = datas; //开始日选好后，重置结束日的最小日期
         endNew.start = datas //将结束日的初始值设定为开始日
    }
};

var end = {
    elem: '#end',
    format: 'YYYY-MM-DD',
    min: laydate.now(),
    max: '2099-06-16',
    istime: true,
    istoday: false,
    choose: function(datas){
        start.max = datas; //结束日选好后，充值开始日的最大日期
    }
};
var endNew = {
    elem: '#endNew',
    format: 'YYYY-MM-DD',
    min: laydate.now(),
    max: '2099-06-16',
    istime: true,
    istoday: false,
    choose: function(datas){
        startNew.max = datas; //结束日选好后，充值开始日的最大日期
    }
};

laydate(start);
laydate(end);
laydate(startNew);
laydate(endNew);

	}
	

//	$("#lookFor .text").bind('input propertychange', function() {
//		$(this).parent().find(".lookForHide").show().width(w);
//		$(this).parent().find("span").show()
//		if($(this).val()==""){
//			$(this).parent().find(".lookForHide").hide()
//			$(this).parent().find("span").hide()
//			}
//		})
//	$("#lookFor span").click(function(){
//		$("#lookFor .text").val("")
//		$(this).hide()
//		$(this).parent().find(".lookForHide").hide()
//		})
//	$(".lookForHide ul li").click(function(){
//		$(this).parent().parent().hide()
//		$(this).parent().parent().parent().find(".text").val($(this).html())
//		$(this).parent().parent().parent().find("span").hide()
//		})
//	$(".lookForHide ul li").mouseenter(function(){
//		$(".lookForHide ul li").removeClass("on");
//		$(this).addClass("on");
//		})
//	$(".lookForHide ul li").mouseleave(function(){
//		$(this).removeClass("on");
//		if($(".lookForHide ul li.on").length<1){
//			$(".lookForHide ul li:first").addClass("on");
//		};
//		});
//	}
	
/*var setLookFor=function(){
	$("#lookFor .text").bind('input propertychange', function() {
		$(this).parent().find(".lookForHide").show()
		if($(this).val()==""){
			$(this).parent().find(".lookForHide").hide()
			}
		})
	$(".lookForHide ul li").click(function(){
		$(this).parent().parent().hide()
		$(this).parent().parent().prev().prev().val($(this).html())
		})
	$(".lookForHide ul li").mouseenter(function(){
		$(this).css("background-color","#f7f7f7")
		})
	$(".lookForHide ul li").mouseleave(function(){
		$(this).css("background-color","#ffffff")
		})
	}*/


//设置单选框复选框
var setCheckBox=function(){
	$(".tdmess span").click(function(){
	if($(this).hasClass("")){
	$(this).addClass("checked")
	}else{
	$(this).removeClass("checked")	
	}
	})
	$(".tdSingle span").click(function(){
	if($(this).hasClass("")){
	$(".tdSingle span").removeClass("checked")	
	$(this).addClass("checked")
	}else{
	$(this).removeClass("checked")	
	}
	})
	}


//个人设置弹窗
var isCanBeClose = 1;

var stuClose = function(){
    if($(".mask").is(":visible")){
        return;
    }
    $("#peoInfo").removeClass("on");
    $('.perSet input').val('');
    $('.perSet').hide();
};

var stuPwdSubmit = function(){
    if($.trim($(".perSet").find("input").eq(0).val()) != $.trim($(".perSet").find("input").eq(1).val()) || "" == $.trim($(".perSet").find("input").eq(0).val()) || "" == $.trim($(".perSet").find("input").eq(1).val()) ){
		$(".perSetMaPsd").find("h3").eq(0).find("span").remove();
		$(".perSetMaPsd").find("h3").eq(0).append("<span style=\"padding-left:5px;color:red;\">密码不同或为空</span>");
		$(".perSet").find("input").addClass("illegal");
		$(".perSet").find("input").val("");
		$(".perSet").find("input").eq(0).focus();
		return;
	}
	
	$(".perSet").find("input").removeClass("illegal");
	$(".perSetMaPsd").find("h3").eq(0).find("span").remove();
	
	var ajax_data={"question":"RenewPWD","pwd":$.trim($(".perSet").find("input").eq(0).val())};
    $.ajax({
        type:'POST',
        url:doUrl,
        data:ajax_data,
        dateType:'json',
        beforeSend:function(){
			$(".perSet").find("input").removeClass("illegal");
			$(".perSetMaPsd").find("h3").eq(0).find("span").remove();
			$(".perSetMaPsd").find("h3").eq(0).find("img").remove();
            //console.log(ajax_data);
			/*
			$(".perSetMaPsd").find("h3").eq(0).append("<img style=\"float:right; margin-right:50px;\" src=\"img/loading22.gif\" 

height=\"32px\"/>");
			*/
			loadingsPar("s","修改中——请稍后");
        },
        error:function(e){
        },
        success:function(ans){
			//console.log(ans);
			var res = $.parseJSON(ans);
			$(".perSet").find("input").removeClass("illegal");
			$(".perSetMaPsd").find("h3").eq(0).find("span").remove();
			$(".perSet").find("input").val("");
			$(".perSet").find("input").eq(0).focus();
			
			$(".perSet").find("input").removeClass("illegal");
			$(".perSetMaPsd").find("h3").eq(0).find("span").remove()
			//res.status = 3000;
			if("undefined" != $.trim(res.status)){
				switch(parseInt(res.status)){
					case 1010:{
                        if($(".mask").is(":visible")){
                            $(".mask").hide();
                        }
                        stuClose();
						loadingsPar("h","修改成功");
					}break;
					case 2001:{
						if("undefined" != $.trim(res.info)&&
							"" != $.trim(res.info) )
						$(".perSetMaPsd").find("h3").eq(0).append("<span style=\"padding-left:5px;color:red;\">"+$.trim

(res.info)+"</span>");
						loadingsPar("h",$.trim(res.info));
					}break;
					case 3000:{
						loadingsPar("h","有问题，请查看温馨提示。");
						//personSet();
                        prompt(res.info);
                        //$('.promptBoxFot a').removeAttr('href');
						$('.promptBoxTit').html('温馨提示');
                        if(!$(".mask").is(":visible")){
                            $(".mask").show();
                        }
					}break;
					case 4000:{
						window.location.href=res.goto;
						break;
					}
				}
			}
        },
        complete:function(){
        }
    });
};

var stuonset=function(){
    $(".perSet").css("z-index","900");
	$(".perSet").find("input").val("");
	var html = $(".perSetMaInfo").html();
	
	$(".perSet").find("input").removeClass("illegal");
	$(".perSetMaPsd").find("h3").eq(0).find("span").remove();
    $(".perSetMaPsd a").removeAttr('onclick');
    $(".perSetMaPsd a").eq(1).attr('href','javascript:stuClose();');
    $(".perSetMaPsd a").eq(0).attr('href','javascript:stuPwdSubmit();');
	//$(".perSet").show();
	if($("#peoInfo").hasClass("on")){
			$("#peoInfo").removeClass("on");
			$(".perSet").hide();
		}else{	
			$("#peoInfo").addClass("on");
			$(".perSet").show();
		}
};

var personSet=function(){
	$(".perSet").css("z-index","900");
	$(".perSet").find("input").val("");
	var html = $(".perSetMaInfo").html();
	
	$(".perSet").find("input").removeClass("illegal");
	$(".perSetMaPsd").find("h3").eq(0).find("span").remove();
	$(".perSet").show();
	if($(".news").is(":visible")){
		$(".news").hide();
	}
	if( $(".perSetMaInfo p").length<1 ){
		requestUserInfo();
	}else{
		$(".perSet").find("a").eq(0).attr("href","javascript:clickSubmitRenew();");
		if(1 != isCanBeClose){
			$(".perSet").find("a").eq(1).hide();
		}else{
			$(".perSet").find("a").eq(1).show();
		}
		if($("#peoInfo").hasClass("on")){
			$("#peoInfo").removeClass("on");
			$(".perSet").hide();
			$(".perSetMaPsdDiv input").val("");
		}else{	
			$("#peoInfo").addClass("on");
			$(".perSet").show();
			//window.parent.find(".perSet").show();
		}
	}
	
	$(".perSet").find("input").eq(0).focus();
}
//开关
var setSwitch=function(){
	$(".Switch").click(function(){
	if($(this).hasClass("on")){
		$(this).removeClass("on")
		}else{
		$(this).addClass("on")	
		}
	})
}
//鼠标经过背景切换
var setBackGroundColor=function(){
	$(".bgColor").mouseenter(function(){
	$(this).addClass("AfterBg")
	})
	$(".bgColor").mouseleave(function(){
	if(!$(this).hasClass("on")){
	$(this).removeClass("AfterBg")
	}
	})
}
//公共部分载入
var publicLoading=function(name){
	$(".head").load("public.html .head .head-right")
	$(".navtop").load("public.html .navtop div")
	//$(".navleft").load("public.html .navleft ul",function(){
	//	$("#left_"+name+"").parent().addClass("on")
	//})
	$(".foot .foottext").html(htmlcopy)
}
//loading载入
var loadingsPar=function(v,t){
	if(0 == $("#over").length){
		$("body").append("<div id=\"over\" style=\"z-index:1000;\"></div>");
	}
	switch(v){
		case "s":{
			$("body").append('<div id="load"><span>'+htmlimg+'</span><p>'+t+'</p></div>')
			$("#load").addClass("load")
			showForm("#load","#over");
			$(".load p").html(t)
		}break;
		case "h":{
			$(".load span").html("")
			$(".load p").html(t)
			setTimeout('hideForm("#load","#over"),$("#load").remove()',2000)
		}break;
	}
	var w=$(".load").width()/2
	$(".load").css("margin-left",-w+"px")
}
var loading=function(v,t){
	
	switch(v){
		case "s":{
			$(t).append('<div id="load">'+htmling+'</div>')
			$("#load").addClass("loads")
			showForm("#load","#over");
		}break;
		case "h":{
			hideForm("#load","#over")
			$("#load").remove()
		}break;
	}
	//$("#load").html(htmling);
	//$("#load").addClass("loads")
}
var showForm=function(l,f){
	$(l).show();
	$(f).show();
};

var hideForm=function(l,f){
	$(l).hide();
	$(f).hide();
};

//新消息提醒弹窗
var setNewsWin=function(){
	$(".news").remove()
}

var t = 0;
function requestLoopTop(s){
	if( 0 == $(".mask").length){
		$("body").append("<div class=\"mask\" style=\"display: none;\"></div>");
	}
	/*
	if("undefined" == e.attr("onclick")){
		e.attr("onclick","javascript:clickMessagesList();")
	}
	*/
	
	//console.log("进入头部请求");
	var ajax_data={"question":"GetTop"};
    $.ajax({
        type:'POST',
        url:doUrl,
        data:ajax_data,
        dateType:'json',
        beforeSend:function(){
        	//console.log("loading");
        },
        error:function(e){
        },
        success:function(ans){
			console.log(ans);
			var res = $.parseJSON(ans);
			if("undefined" != typeof(res.name) && ""!= $.trim(res.name)){
				if(res.relorjurl!=""){
					var swich="<a title=\"身份切换\" href=\""+res.relorjurl+"\" class=\"swich\"></a>";
					$("#peoInfo").before(swich);
				};
				if(s==false){
					$("#peoInfo").html(res.dutyname+"，"+res.name);
				}else{
					$("#peoInfo").html(res.dutyname+"，"+res.name+"<span class=\"ico1\"></span>");
				};
			};
			if(0 < $(".news").length){
				$(".news").remove();
			}
			if("undefined" != typeof(res.messages) && 0 < res.messages.length){
				$(".numMes").html(res.messages.length);
				if("undefined" == typeof($(".numMes").attr("onclick"))){
					$(".numMes").attr("onclick","javascript:clickShowUnreadMessages();")
				}
				$(".numMes").show();
				
				var html = "<div class=\"news\" style=\"display:none;\"><span class=\"san\"></span><div class=\"newsInfo\">";
				$.each(res.messages,function(i,v){
					html+="<div class=\"newsOne\" mid=\""+v.id+"\">";
					html+="<p>"+v.msg+"</p>";
					html+="<span>"+v.dtm+"</span>";
					html+="<a href=\"message.html?mid="+v.id+"\" class=\"det\" target=\"_blank\">详情</a>";
					html+="<a href=\"javascript:clickHadReaded("+v.id+");\" class=\"read\">已读</a>";
					html+="</div>";
				});
				html += "<div class=\"newsFot\"><a href=\"javascript:clickHadReaded(0);\" class=\"allRead\">全部已读</a><a href=\"javascript:clickShowUnreadMessages();\" class=\"allClose\">关闭</a></div></div></div>";
				$(".numMes").parent().parent().append(html);
				if(!$(".news").is(":visible") && !$(".mask").is(":visible") ){
					if($(".perSet").is(":visible")){
						$(".perSet").hide();
					}
					$(".news").show();
				}
			}else{
				$(".numMes").hide();
			}
			
			if("undefined" != typeof(res.isNeedRenewPWD) && 1 == parseInt(res.isNeedRenewPWD)){
				isCanBeClose = 0;
				if(!$(".mask").is(":visible")){
					$(".mask").show();
					$(".news").hide();
				}
				personSet();
			}else{
				isCanBeClose = 1;
				if($(".mask").is(":visible")){
					$(".mask").hide();
				}
				//console.log("1111");
				/*
				t = setTimeout(function() {
					requestLoopTop();
				}, intervalTop);
				*/
			}
			
			requestTouch();
        },
        complete:function(){
        }
    });
}

function requestTouch(){
	//intervalTouch
    var href = window.location.href;
    if(0 <= href.indexOf('teaching.html')){
        return;
    }
	var ajax_data={"question":"Touch"};
	
	 $.ajax({
        type:'POST',
        url:doUrl,
        data:ajax_data,
        dateType:'json',
        beforeSend:function(){
			//console.log("before touch");
        },
        error:function(e){
        },
        success:function(ans){
			//console.log("1111");
			t = setTimeout(function() {
				requestTouch();
			}, intervalTop);
			ans = $.parseJSON(ans);
			
			//console.log("success");
			//console.log(ans);
			//alert(1);
			if(4000 == parseInt(ans.status)){
				window.location.href= ans.goto;
			}
        },
        complete:function(){
        }
    });
}

function requestStudentInfo(){
    $('#peoInfo').attr("onclick","javascript:stuonset();");
    $('.perSetMaInfo').empty();
    var ajax_data={'question':'StudentTop'};
    $.ajax({
        type:'POST',
        url:doUrl,
        data:ajax_data,
        dateType:'json',
        beforeSend:function(){
            //console.log(ajax_data);
            $('#peoInfo img').attr('src','img/loading22.gif');
        },
        error:function(e){
        },
        success:function(ans){
        	//console.log(ans);
			$('#peoInfo img').remove();
            var res = $.parseJSON(ans);
            $('#peoInfo').html(res.name+"<span class=\"ico1\"></span>");
            $('.perSetMaInfo').append('<p>学号：'+res.student_Number+'</p>');
            $('.perSetMaInfo').append('<p>上次登录时间：<br />'+res.latestlogindatetime+'</p>');
            $('.perSetMaInfo').append('<p>上次登录IP地址：<br />'+res.userLastIP+'</p>');
            studentid=res.student_Id;
            if('undefined' != res.isNeedRenewPWD && 1 == parseInt(res.isNeedRenewPWD)){
                stuonset();
                $(".mask").show();
            };
            //console.log(res);
        },
        complete:function(){
        }
    });
}

function requestUserInfo(){
	var ajax_data={"question":"GetUserInfo"};
    $.ajax({
        type:'POST',
        url:doUrl,
        data:ajax_data,
        dateType:'json',
        beforeSend:function(){
			$(".perSet").show();
			$(".perSetMaInfo").html("<img src=\"img/loading33.gif\"/>");
        },
        error:function(e){
        },
        success:function(ans){
			var res = $.parseJSON(ans);
			var html = "";
			//console.log(res);
			if("undefined" != res.phone && "" != $.trim(res.phone)){
				html += "<p>手机号："+res.phone+"</p>";
			}
			if("undefined" != res.mail && "" != $.trim(res.mail)){
				html += "<p>Email："+res.mail+"</p>";
			}
			if("undefined" != res.latestlogindatetime && "" != $.trim(res.latestlogindatetime)){
				html += "<p>上次登陆时间："+res.latestlogindatetime+"</p>";
			}
			if("undefined" != res.latestloginip && "" != $.trim(res.latestloginip)){
				html += "<p>上次登陆IP地址："+res.latestloginip+"</p>";
			}
			
			/*if("undefined" != res.position && "" != $.trim(res.position)){
				html += "<p>职务："+res.position+"</p>";
			}*/
			if("undefined" != res.limit && "" != $.trim(res.limit)){
				html += "<p>权限："+res.limit+"</p>";
			}
			
			$(".perSetMaInfo").html(html);
			
			personSet();
        },
        complete:function(){
        }
    });
}

function clickSubmitRenew(){
	if($.trim($(".perSet").find("input").eq(0).val()) != $.trim($(".perSet").find("input").eq(1).val()) || "" == $.trim($(".perSet").find

("input").eq(0).val()) || "" == $.trim($(".perSet").find("input").eq(1).val()) ){
		$(".perSetMaPsd").find("h3").eq(0).find("span").remove();
		$(".perSetMaPsd").find("h3").eq(0).append("<span style=\"padding-left:5px;color:red;\">密码不同或为空</span>");
		$(".perSet").find("input").addClass("illegal");
		$(".perSet").find("input").val("");
		$(".perSet").find("input").eq(0).focus();
		return;
	}
	
	$(".perSet").find("input").removeClass("illegal");
	$(".perSetMaPsd").find("h3").eq(0).find("span").remove();
	
	var ajax_data={"question":"RenewPWD","pwd":$.trim($(".perSet").find("input").eq(0).val())};
    $.ajax({
        type:'POST',
        url:doUrl,
        data:ajax_data,
        dateType:'json',
        beforeSend:function(){
			$(".perSet").find("input").removeClass("illegal");
			$(".perSetMaPsd").find("h3").eq(0).find("span").remove();
			$(".perSetMaPsd").find("h3").eq(0).find("img").remove();
            //console.log(ajax_data);
			/*
			$(".perSetMaPsd").find("h3").eq(0).append("<img style=\"float:right; margin-right:50px;\" src=\"img/loading22.gif\" 

height=\"32px\"/>");
			*/
			loadingsPar("s","修改中——请稍后");
        },
        error:function(e){
        },
        success:function(ans){
			//console.log(ans);
			var res = $.parseJSON(ans);
			$(".perSet").find("input").removeClass("illegal");
			$(".perSetMaPsd").find("h3").eq(0).find("span").remove();
			$(".perSet").find("input").val("");
			$(".perSet").find("input").eq(0).focus();
			
			$(".perSet").find("input").removeClass("illegal");
			$(".perSetMaPsd").find("h3").eq(0).find("span").remove()
			
			if("undefined" != $.trim(res.status)){
                if($(".mask").is(":visible")){
					$(".mask").hide();
				}
                isCanBeClose = 1;
				switch(parseInt(res.status)){
					case 1010:{
						loadingsPar("h","修改成功");
						personSet();
						//console.log("2222");
						//requestLoopTop();
					}break;
					case 2001:{
						if("undefined" != $.trim(res.info)&&
							"" != $.trim(res.info) )
						$(".perSetMaPsd").find("h3").eq(0).append("<span style=\"padding-left:5px;color:red;\">"+$.trim

(res.info)+"</span>");
						loadingsPar("h",$.trim(res.info));
					}break;
					case 3000:{
						loadingsPar("h","有问题，请查看温馨提示。");
						personSet();
                        prompt(res.info);
                        $('.promptBoxFot a').removeAttr('href');
						$('.promptBoxTit').html('温馨提示');
                        $('.promptBoxFot a').unbind('click').click(function(){
                            $('.promptBox').remove();
                            isCanBeClose = 0;
                            personSet();
                            $('.mask').show();
                        });
                        //personSet();
						//logout();
						//window.location.href = "./";
					}break;
					case 4000:{
						window.location.href=res.goto;
					}break;
				}
			}
        },
        complete:function(){
        }
    });
}

function clickShowUnreadMessages(){
	if($(".news").is(":visible")){
		$(".news").hide();
	}else{
		if($(".perSet").is(":visible")){
			$(".perSet").hide();
		}
		$(".news").show();
	}
}

function clickHadReaded(i){
	var ajax_data={"question":"HadReaded","id":i};
    $.ajax({
        type:'POST',
        url:doUrl,
        data:ajax_data,
        dateType:'json',
        beforeSend:function(){
        },
        error:function(e){
        },
        success:function(ans){
			//console.log(ans);
			var res = $.parseJSON(ans);
			if("undefined" != res.status && 1010 == parseInt(res.status)){
				$(".news").hide();
				clearTimeout(t);
				requestLoopTop();
			}
        },
        complete:function(){
        }
    });
}

function getPHPJsonResponse(r){
	//console.log(r);
	var ret = [];
	ret = r.split("<br />");

	if (!r.match("^\{(.+:.+,*){1,}\}$")){
		//console.log("Wrong in PHP");
		if ( 1 < ret.length ){
			for(var i=0;i<ret.length-1; i++){
				var err = $.trim(ret[i]);
				err = err.replace("\r","");
				err = err.replace("\n","");
				//console.log(err);
			}
		}
	}
	var result = r;
	if(1 < ret.length ) {
		result = $.trim(ret[ret.length-1]);
	}
	
	if (!result.match("^\{(.+:.+,*){1,}\}$")){
		return "[]";
	}
	
	
	//console.log(result);
	
	return result;
}
function JSONstringify(Json){
	if($.browser.msie){
	   if($.browser.version=="7.0"||$.browser.version=="6.0"){
		  var  result=$.parseJSON(Json);
	   }else{
		  var result=JSON.stringify(Json);   
	   }		
	}else{
		var result=JSON.stringify(Json);  			
	}
	return result;
}

function requestAttendance(){
	var currentlt = new Date().getTime();
	currentlt = parseInt(currentlt)/1000;
	var ajax_data={"question":"atlegal","str":currentlt};
    $.ajax({
        type:'POST',
        url:doUrl,
        data:ajax_data,
        dateType:'json',
        beforeSend:function(){
        },
        error:function(e){
        },
        success:function(ans){
					//console.log(ans);
          var _json=$.parseJSON(ans);
					if(1010 == parseInt(_json.status)){
						var strcmp = parseInt(_json.info)
						LoadQR(strcmp);
						//$(".cover").hide();
					}
					if(3000 == parseInt(_json.status)){
						//$(".cover input").focus();
						$(".cover").show();
						$(".cover input").unbind("keydown").keydown(function(e){
							if(13 == e.keyCode){
								requestPWD();
								return;
							}
						});
						
					}
        },
        complete:function(){
        }
    });
}

function requestPWD(){
	if ("" == $.trim($("input[type=password]").val())){
		isbegin = 0;
		return;
	}
	var ajax_data={"question":"atcodelogin","pwd":$.trim($("input[type=password]").val())};
    $.ajax({
        type:'POST',
        url:doUrl,
        data:ajax_data,
        dateType:'json',
        /*beforeSend(XHR)类型：Function发送请求前可修改 XMLHttpRequest 对象的函数，如添加自定义 HTTP 头。
         XMLHttpRequest 对象是唯一的参数。这是一个 Ajax 事件。如果返回 false 可以取消本次 ajax 请求。*/
        beforeSend:function(){
			//console.log(ajax_data);
			//console.log(doUrl);
        },
        error:function(e){
        },
        //请求成功
        success:function(ans){
        	
			//console.log(ans);
            var _json=$.parseJSON(ans);
			if(1010 == parseInt(_json.status)){
				//isLoop = 1;
				LoadQR();
				return;
			}
			if(3000 == parseInt(_json.status)){
				//isLoop = 0;
				if("undefined" != typeof(_json.info) && "" != $.trim(_json.info)){
					$("input[type=password]").val("");
					$("input[type=password]").focus();
					//alert(_json.info);
				}
			}
        },
        /*complete(XHR, TS)类型：Function请求完成后回调函数 (请求成功或失败之后均调用)。参数： XMLHttpRequest 对象和一个描述请求类型的字符串。这

是一个 Ajax 事件。*/
        complete:function(){
        	$.cookie("qrUser", "true", { expires: 1 }); 
        }
    });
}


var heightLimit=function(z){
	var h=$(window).height();
	z.css({
		"max-height":h-200+"px",
		"overflow-y":"auto"
	});
};

var noDate=function(n){
	var _ph=$(window).height(),
		_top=$(n).offset().top,
		_fh=$(".foot").height(),
		_mt=(_ph-_top-_fh)/2-105,
		_html='<div style="text-align:center;margin-top:'+_mt+'px;" class="noDate"><img src="img/bg0929.png"><p style="color:#ccc;line-height:28px;">暂无数据</p></div>';
	$(n).append(_html);
};

function prompt(p,fn){
	if('' == $.trim(p)){
		return;
	}
	if(!fn){
		fn='addWinHide()';
	};
	var html='<div class="pop_content"><div class="pop_content_box"><span class="prompt"></span>'+p+'</div></div>';
	setPopups("提示",fn,html);
};

function setDelWinHeight(s){
	var h=s.find("p").height();
	if(h>18){
		s.find("p").css({"line-height":"16px","padding-top":"15px"});
		s.find("a").css("top","58px");
	}else{
		s.find("p").css({"line-height":"14px","padding-top":"18px"});
		s.find("a").css("top","50px");
	};
};
//修改adminiframe高度
function adminIframeHs(){
		var adRi=$(".centertab").height();
//			var scr=adRi.contentWindow.document.body.scrollHeight;
//			adRi.style.height=scr+"px";
		window.parent.$("#admin_frame").height(adRi+200);
		adminIframeHx();
	};
function adminIframeHx(){
		var adRi=window.parent.$(".tabmain").height();
		window.top.$("#view_frame").height(adRi+200);
	};
function tooltips(){
	$("a,p").live("mouseenter",function(){
		if($(this).attr("tips")){
			var tips='<div class="tips"><p>'+$(this).attr("tips")+'</p><span></span></div>';
			$(document.body).append(tips);
			var a=window.event||e;
			var x=$(this).offset().left+($(this).width()/2),
				y=$(this).offset().top-$(".tips").height()-2,
				w=$(".tips").width()/2;
			$(".tips").css({"left":(x-w),"top":y,"opacity":"0"});
			$(".tips").stop().animate({"opacity":"1"},300);
		};
	});
	$("a,p").live("mouseleave",function(){
		$(".tips").remove();
	});
};
//截取字符串
function cutString(str,len){  
    if(!str) return "";  
    len?len:len=30;
    if(str.replace(/[^x00-xFF]/g,'**').length<=len) return str;  
    var templen=0;  
    for(var i=0;i<str.length;i++){  
        if(str.charCodeAt(i)>255||/^[A-Z]/.test(str[i])){  
            templen+=2;  
        }else{  
            templen++  
        };  
        if(templen >len-2){ 
            return str.substring(0,i)+"..."; 
        };  
    };  
    return str;  
}; 
/*弹窗方法*/
function setPopups(title,fn,info,style){
	var html='<div class="pop_head">'+
				'<h2>'+title+'</h2>'+
				'<span class="pop_close" onClick="addWinHide()"></span>'+
			'</div>'+
			info+
			'<div class="pop_bottom">'+
				'<ul>'+
					'<li class="pop_sureBtn" onclick="'+fn+'">确定</li>'+
					'<li class="pop_cancelBtn" onclick="addWinHide()">取消</li>'+
				'</ul>'+
			'</div>'+
			'<div class="scroll" id="scroll">'+
				'<p id="p"></p>'+
			'</div>';
	style=style?style:"";
	window.top.$(".popups").removeAttr("style").show().html(html).css(style);	
	var w=style.width?parseInt(style.width):"500";
	window.top.$(".popups").css({'width':w,'margin-left':-w/2});
	window.top.$(".mask").show();
	window.top.$(".right_frame").css("overflow","hidden");
	chengedPopupsSize();
};
//弹窗尺寸
function chengedPopupsSize(){	
	window.top.$("#bd").height('auto');
	var h=-window.top.$(".popups").height()/2;	
	window.top.$(".popups").css({'margin-top':h});
	var nh=window.top.$(".popups").height()-window.top.$(".pop_head").outerHeight()-window.top.$(".pop_bottom").outerHeight();	
	nh=nh-window.top.$(".pop_content").outerHeight()+window.top.$(".pop_content").height();	
	if(window.top.$("#bd").attr("high")){
		window.top.$("#bd,#scroll").height(window.top.$(".popups").height()-parseInt(window.top.$("#bd").attr("high")));	
	}else{
		window.top.$("#bd,#scroll").height(nh);	
	};
	if(window.top.$(".popups").width()>window.top.$(window).width()){
		window.top.$(".popups").css("left",window.top.$(".popups").width()/2);
	}else{
		window.top.$(".popups").css("left","50%");
	};
	isScorll();	
};
//弹窗提示
function popupspoint(p,red){
	$(".popupsPoint").remove();
	if(!p){
		$(".red").removeClass("red");
		return;
	};
	if(red){
		red.addClass("red");
	};
	if(p==-1){
		var html='<img src="img/loading33.gif" />';
	}else{
		var html='<em></em>'+p	
	};
	$(".pop_bottom").append('<div class="popupsPoint">'+html+'</div>');
};
//选择框回调

function optionRes(obj,_this,after){//obj是选择框的元素，_this选中的下拉菜单i元素，after选择框p元素
	var name=obj.find("p").attr("id");
	var className=obj.find("p").attr("class");
	if(name=="addAreaOption"){
		var id=$("#"+name+" i").html();
		$("#addSetMessRight").find(".lock").removeClass("lock");
		$("#addSetMessRight span[cid="+id+"]").addClass("on lock");
		return;
	};
	if(name=="course_area_sel"){
		$("#view_frame").contents().find("#course_frame").contents().find("#refresh").attr("onclick","LamaReqlabel_adminAreaCenter(1)").click();
		return;
	};
	if(name=="class_area_list"){
		if(_this.html()==after){
			return;
		};
		if(_this.find("i").html()==""){
			$("#view_frame").contents().find("#course_frame").contents().find("#class_scre").hide();
		}else{
			$("#view_frame").contents().find("#course_frame").contents().find("#class_scre").show();	
		};
		options=obj.find("b").html().replace(/\;/g,",");
		$("#view_frame").contents().find("#course_frame").contents().find("#class_courseid_list").html("全部<i></i>").parent().attr("option",options);
		$("#view_frame").contents().find("#course_frame").contents().find("#keyword").val("");
		$("#view_frame").contents().find("#course_frame").contents().find("#refresh").attr("onclick","LamaReqlhy_AreaClassList(1)").click();
	};
	if(name=="class_courseid_list"){
		if(_this.html()==after){
			return;
		};
		$("#view_frame").contents().find("#course_frame").contents().find("#keyword").val("");
		$("#view_frame").contents().find("#course_frame").contents().find("#refresh").attr("onclick","LamaReqlhy_AreaClassList(1)").click();
	};
	if(name=="counrse_class_selCenter"){
		if(_this.html()==after){
			return;
		};
		var opt1=obj.find("b").eq(0).html().replace(/\;/g,",");
		var opt2=obj.find("b").eq(1).html().replace(/\;/g,",");
		if(opt1==""){
			opt1="暂无课程";
		};
		if(opt2==""){
			opt2="暂无教室";
		};
		$("#selCounrse").html("请选择课程<q></q>").parent().attr("option",opt1);
		$("#selClass").html("请选择教室<q></q>").parent().attr("option",opt2);
		var jian=obj.find("p q").html()+$("#selCounrse q").html();
		$("#classjian").html(jian);
	};
	if(name=="selCounrse"){
		var jian=$("#counrse_class_selCenter q").html()+obj.find("p q").html();
		$("#classjian").html(jian);
	};
	if(className=="course_setTeach"){
		var id=$(".lecturer_cont").attr("classid");
		var cid=obj.parent().attr("cid");
		var tid=_this.find("i").html();
		var lid=$(".lecturer_cont").attr("lid");
		LamaReqlhy_setlecturer(id,cid,tid,lid,after);
	};
	if(name=="knowledgeSel"){
		$("#view_frame").contents().find("#course_frame").contents().find("#keyword").val("");
		$("#view_frame").contents().find("#course_frame").contents().find("#refresh").click();
	};
	if(obj.hasClass('zsd_sel')&&obj.find("b")){
		if(_this.html()==after){
			return;
		};
		var ldinfo=obj.find("b").html().replace(/\;/g,",");
		ldinfo=ldinfo.substring(0,ldinfo.length-0)
		ldinfo=ldinfo==""?"暂无数据":ldinfo;
		obj.next().next().attr("option",ldinfo).find("p").html("请选择课件");
//		var objindex=$(".zsd_sel").index()-1;
//		$.each($(".zsd_sel"), function(i,e) {			
//			var ldinfo=$(".zsd_sel").eq(i).find("b").html().replace(/\;/g,",");
//			$(".zsd_sel").eq(i).parent().find(".zsd_sels").attr("option",ldinfo);
//			/*if(".popups".css('display')=='block')*/			
//			$(".zsd_sel").eq(objindex).parent().find(".zsd_sels").find("p").html("请选择课件");
//		});	
	};
	if(name=="ruleSelType"){
		if(_this.html()==after){
			return;
		};
		$("#view_frame").contents().find("#course_frame").contents().find("#keyword").val("");
		$("#view_frame").contents().find("#course_frame").contents().find("#refresh").click();
	};
	if(name=="topicCourse"||name=="topicType"||name=="topicStat"){
		if(_this.html()==after){
			return;
		};
		$("#view_frame").contents().find("#course_frame").contents().find("#refresh").click();
	};
	if(name=="area"){
		var charea='',
			glarea='';
		if($("#view_frame").contents().find("#finance_frame").contents().find("#area").find("i").text()!='0'){
			var num=$("#view_frame").contents().find("#finance_frame").contents().find("#area").find("i").text();		
			var rep=$("#view_frame").contents().find("#finance_frame").contents().find("#area").text().replace(num,'');
			charea="<em>"+rep+"</em>";	
			glarea="<em style='color:#000000'>【"+rep+"】</em>";	
		}
		$("#view_frame").contents().find("#finance_frame").contents().find("#achievement span em").remove();
		$("#view_frame").contents().find("#finance_frame").contents().find("#achievement span").prepend(charea);
		$("#view_frame").contents().find("#finance_frame").contents().find("#adviser").html("全部<i>0</i>");
		$("#view_frame").contents().find("#finance_frame").contents().find("#school").html("全部<i>0</i>");
		$("#view_frame").contents().find("#finance_frame").contents().find("#statistics em").remove();
		$("#view_frame").contents().find("#finance_frame").contents().find("#statistics").prepend(glarea);
		
	};
	if(name=="adviser"){
		$("#view_frame").contents().find("#finance_frame").contents().find("#school").html("全部<i>0</i>");
	};
	if(name=="school"){		
		$("#view_frame").contents().find("#finance_frame").contents().find("#adviser").html("全部<i>0</i>");		
	};
	if(name=="area"||name=="adviser"||name=="school"){	
		$("#view_frame").contents().find("#finance_frame").contents().find("#refresh").attr("page","true");
		$("#view_frame").contents().find("#finance_frame").contents().find("#refresh").attr("refresh","false");
		$("#view_frame").contents().find("#finance_frame").contents().find("#refresh").click();
	};	
	if(name=="channel_area"){
		$("#view_frame").contents().find("#keyword").val("");
		$("#view_frame").contents().find(".pendaudit").parent().removeClass("on");
		$("#view_frame").contents().find("#refresh").attr("type","0");		
		$("#view_frame").contents().find("#refresh").attr("refresh","false");
		$("#view_frame").contents().find("#refresh").click();
	}	
	if(name=="consult_area"){//obj是选择框的元素，_this选中的下拉菜单i元素，after选择框p元素
		var opt1=obj.find("b").eq(0).html().replace(/\;/g,",");
		var opt2=obj.find("b").eq(1).html().replace(/\;/g,",");
		var opt3=obj.find("b").eq(2).html().replace(/\;/g,",");
		var opt4=obj.find("b").eq(3).html().replace(/\;/g,",");
		if(opt1==""){
			opt1="全部";
		}else{
			opt1="全部<i></i>,"+opt1;
		};
		if(opt2==""){
			opt2="全部";
		}else{
			opt2="全部<i></i>,"+opt2;
		};	
		if(opt3==""){
			opt3="全部";
		}else{
			opt3="全部<i></i>,"+opt3;
		};
		if(opt4==""){
			opt4="全部";
		}else{
			opt4="全部<i></i>,"+opt4;
		};
		$("#view_frame").contents().find("#consult_source").html("全部").parent().attr("option",opt1);
		$("#view_frame").contents().find("#consult_adviser").html("全部").parent().attr("option",opt2);
		$("#view_frame").contents().find("#consult_customer").html("全部").parent().attr("option",opt3);
		$("#view_frame").contents().find("#cnsult_subject").html("全部").parent().attr("option",opt4);	
	};
	if(name=="student_discipline_area"){
		if(_this.html()==after){
			return;
		};
		if(obj.find("b").length>0){
			var opt=obj.find("b").eq(0).html().replace(/\;/g,",");
		}else{
			var opt='全部<i></i>';
		};
		if(_this.find("i").first().html()!=""){
			$("#view_frame").contents().find("#student_frame").contents().find("#class_scre").show();
		}else{
			$("#view_frame").contents().find("#student_frame").contents().find("#class_scre").hide();
		};
		
		$("#view_frame").contents().find("#student_frame").contents().find("#student_discipline_class").html("全部<i></i>").parent().attr("option",opt);
		$("#view_frame").contents().find("#student_frame").contents().find("#refresh").click();
	};
	if(name=="student_discipline_class"){
		if(_this.html()==after){
			return;
		};
		$("#view_frame").contents().find("#student_frame").contents().find("#refresh").click();
	};
	if(name=="student_evaluation_area"){
		if(_this.html()==after){
			return;
		};
		if(obj.find("b").length>0){
			var opt=obj.find("b").eq(0).html().replace(/\;/g,",");
		}else{
			var opt='全部<i></i>';
		};
		if(_this.find("i").first().html()!=""){
			$("#view_frame").contents().find("#student_frame").contents().find("#class_scre").show();
		}else{
			$("#view_frame").contents().find("#student_frame").contents().find("#class_scre").hide();
		};
		$("#view_frame").contents().find("#student_frame").contents().find("#student_evaluation_class").html("全部<i></i>").parent().attr("option",opt);
		$("#view_frame").contents().find("#student_frame").contents().find("#refresh").click();
	};
	if(name=="student_evaluation_class"){
		if(_this.html()==after){
			return;
		};
		$("#view_frame").contents().find("#student_frame").contents().find("#refresh").click();
	};
	if(name=="student_open_area"){
		if(_this.html()==after){
			return;
		};
		if(obj.find("b").html()!=""){
			var opt=obj.find("b").eq(0).html().replace(/\;/g,",");
		}else{
			var opt='暂无数据';
		};
		$("#student_open_class").html("请选择班级").parent().attr("option",opt);
		$(".openeval_select_class").show();
	};
	if(name=='student_open_class'){
		if(_this.html()==after){
			return;
		};
		if($("#student_open_class i").length>0&&$("#view_frame").contents().find("#student_frame").contents().find(".evaluation_tabbtn p.on").attr("flag")=="lhy_stuTolecturerEvaluation"){
			LamaReqlhy_HistoryPlanTest();
		}else if($("#student_open_class i").length>0&&$("#view_frame").contents().find("#student_frame").contents().find(".evaluation_tabbtn p.on").attr("flag")=="lhy_stuToPlanDivision"){
			LamaReqlhy_HistoryProjectTest();
		};
	};
	if(name=='student_behavior_area'){
		if(_this.html()==after){
			return;
		};
		if(obj.find("b").length>0){
			var opt=obj.find("b").eq(0).html().replace(/\?/g,",");
		}else{
			var opt='全部<i></i>';
		};
		var doc=$("#view_frame").contents().find("#student_frame").contents();
		doc.find(".classCont span").removeClass("active");
		doc.find(".opencent").hide().find("span").removeClass("active");
		doc.find(".behavior_class_cont .last").removeClass("on");
		doc.find("#keyword").val("");
		doc.find(".evaluationdate").first().show();
		doc.find(".stuWaitQuit").removeClass("on");
		doc.find("#class_scre").show();
		doc.find("#student_behavior_class").html("全部<i></i>").parent().attr("option",opt);
		doc.find("#refresh").click();
		if(_this.find("i").html()==""){
			doc.find("#class_scre").hide();
		};
	};
	if(name=="student_behavior_class"){
		var doc=$("#view_frame").contents().find("#student_frame").contents();
		doc.find("#keyword").val("");
		doc.find(".stuWaitQuit").removeClass("on");
		doc.find(".evaluationdate").first().hide().find("a").first().addClass("on").siblings().removeClass("on");
		doc.find("#refresh").click();
	};
	if(name=="student_ChangeClass_Center"){
		if(_this.html()==after){
			return;
		};
		var cid=_this.find("i").html();
		$(".transfer_cont_left").css("margin-top","0").find("li").show().removeClass("on");
		if(cid!=""){
			$.each($(".transfer_cont_left li"), function() {
				if(cid!=$(this).attr("cid")&&$(this).attr("cid")){
					$(this).hide();
				};
			});
		};
		$("#p").css("top","0");
		isScorll();
	};
	if(name=="statics_behavior_area"){	
		var parojb=$("#view_frame").contents().find("#statics_frame").contents().find("#statics_behavior_area").parents(".marketCont_title");
		parojb.find("a").each(function(i,v){			
			if($(this).hasClass("on")){
				var start=$(this).attr("start")+" 00:00:00";
				var end=$(this).attr("end")+" 23:59:59";
				var tit=$(this).text();
				if($(this).hasClass("finance_all")){
					start="0";
					end="0";
				}
				if($(this).hasClass("last")){
					start=$(this).parent().find("input").eq(0).val();
					end=$(this).parent().find("input").eq(1).val();
					tit=start+"至"+end;
					start+=" 00:00:00";
					end+=" 23:59:59";
				}
				$("#view_frame").contents().find("#statics_frame").contents().find("#refresh").attr("stime",start);
				$("#view_frame").contents().find("#statics_frame").contents().find("#refresh").attr("etime",end);
				$("#view_frame").contents().find("#statics_frame").contents().find(".marketCont").attr("tit",tit);
			}
		})
		$("#view_frame").contents().find("#statics_frame").contents().find("#refresh").attr("refresh","false");
		$("#view_frame").contents().find("#statics_frame").contents().find("#refresh").click();
	}
	if(name=="enrollment_area"||name=="enrollment_class"||name=="enrollment_source"){
		$("#view_frame").contents().find("#keyword").val("");
		$("#view_frame").contents().find("#enrollment_frame").contents().find("#refresh").attr("refresh","false");
		$("#view_frame").contents().find("#enrollment_frame").contents().find("#refresh").click();
	}
};

var isScor=true;
function isScorll(){	
	if(window.top.$("#bd").length<1||window.top.$("#ul").length<1){
		window.top.$(".scroll").remove();
		return;
	};
	if(window.top.$("#bd #ul").height()>=window.top.$("#bd").height()+1){	
		isScor=true;
		scroll();	
		window.top.$("#scroll").css('display','block');
	}else{
		isScor=false;
		window.top.$("#bd #ul").css('margin-top','0');		
		window.top.$("#scroll").css('display','none');
	}
}
function scroll(){	
	var Scro=window.top.$("#scroll");
	var Scrp=window.top.$("#scroll #p");
	var Scrobd=window.top.$("#bd");
	var Scroul=window.top.$("#bd #ul");
	var Scromain=window.top.$(".popups");
	var dragging=false,
		diffY=0,
		scrBtnY=0,
		scrBjY=0,		
		targY=0,
		startTouch=0,
		start=0,
		Num1=Scro.outerHeight()-Scrp.outerHeight();//滚动条剩余的高度;	
	Scrp.die("mousedown touchstart").live("mousedown touchstart",function(e){
		e = e || window.event; 
		dragging=true;		
		scrBtnY=$(this).offset().top;//控制滚动按钮距浏览器顶部的偏移量
		scrBjY=$(Scro).offset().top;//控制滚动条区域距浏览器顶部的偏移量
		if(e.type=='mousedown'){
			diffY=e.clientY-scrBtnY;//坐标点距离按钮顶部的距离	
		}else{
			diffY=e.originalEvent.changedTouches[0].clientY-scrBtnY;//坐标点距离按钮顶部的距离	
		}
		var html='<div class="movebj"></div>';
		window.top.$("body").prepend(html);		
	})
	window.top.$(".movebj").die('mousemove touchmove').live('mousemove touchmove',function(e){	
		e = e || window.event; 	
		e.preventDefault();
		if(dragging){
			if(e.type=='mousemove'){
				targY=e.clientY-diffY-scrBjY;//鼠标移动的距离		
			}else{
				targY=e.originalEvent.changedTouches[0].clientY-diffY-scrBjY;//鼠标移动的距离					
			}					
			if(targY<=0){
				Scrll(0);
				targY=1;
			}else if(targY>=Num1){
				Scrll(Num1);
				targY=Num1;
			}
			Scrll(targY);
			$(Scrp).css('top',targY);	
			noSelect();
		}
	})	
	window.top.$(".movebj").die('mouseup touchend').live('mouseup touchend',function(){
		window.top.$(".movebj").remove();
		dragging=false;		
	})
	Scrobd.bind("touchstart",function(e){
		e = e || window.event; 	
		startTouch = e.originalEvent.changedTouches[0].clientY;
		start = parseInt(Scroul.css("margin-top"));
	});
	Scrobd.bind("touchmove",function(e){
		e = e || window.event; 	
		e.preventDefault();
		var nowTouch = e.originalEvent.changedTouches[0].clientY;
		var disX = nowTouch - startTouch;
		var y=start+disX;
		if(y>0){
			y=0;
		}
		if(y<-(Scroul.height()-Scrobd.height())){
			y=-(Scroul.height()-Scrobd.height());
		};
		Scroul.css("margin-top",y);
		Scrp.css("top",(-parseInt(Scroul.css("margin-top"))/(Scroul.height()-Scrobd.height()))*(Scro.height()-Scrp.height()));
	});
	
	function Scrll(y,n){		
		if(n){
			Scrp.stop().animate({"top":y},100);
			Scroul.stop().animate({"margin-top":-(y/(Scro.outerHeight()-Scrp.outerHeight()))*(Scroul.outerHeight()-Scrobd.height())},100);
		}else{
			Scrp.css("top",y);
			Scroul.css("margin-top",-(y/(Scro.outerHeight()-Scrp.outerHeight()))*(Scroul.outerHeight()-Scrobd.height()));
		}
	}	
	/*注册事件*/ 
	if(window.top.document.getElementById("scroll_bd").addEventListener){ 
		window.top.document.getElementById("scroll_bd").addEventListener('DOMMouseScroll',wheel,false); 
	}//W3C 
	window.top.document.getElementById("scroll_bd").onmousewheel=wheel;//IE/Opera/Chrome
	
	var Distance=Num1*0.1;
	function wheel(e){			
		if(isScor){	
			var evt = e || window.event;			
			var wheelDelta = evt.wheelDelta || evt.detail;
			if(wheelDelta == -12 || wheelDelta == 12 ){
				var n=1
			};
			if(wheelDelta == -120 || wheelDelta == 3 || wheelDelta == -360 || wheelDelta == -12 || wheelDelta == 1){
				var Distances=Scrp.position().top+50;
				if(Distances>=Num1){
					Scrp.css("top",Num1);
					Scrll(Num1,n);
				}else{
					Scrll(Distances,n);
				}				
				return;
			}else if (wheelDelta == 120 || wheelDelta == -3 || wheelDelta == 360 || wheelDelta == 12 || wheelDelta == -1){
				var Distances=Scrp.position().top-50;
				if(Distances<=1){
					Scrll(0,n);
					Scrp.css("top",1);
				}else{
					Scrll(Distances,n);
				}				
				return;
			}
		}			
	}	
}
//禁止选中
function noSelect(){
	/*if(window.top.document.all){
		window.top.document.onselectstart= function(){return;}; //for ie
	}else{
		window.top.document.onmousedown= function(){return;};
		window.top.document.onmouseup= function(){return true;};
	}
	window.top.document.onselectstart = new Function('event.returnValue=false;');	*/
}
/*横向滚动条*/
function colscroll(scroobj1,scroobj2,scroobj3,scroobj4,scrobtn1,scrobtn2){	
	var dragging=false,
	diffX=0,
	scrBtnX=0,
	scrBjX=0,		
	targX=0,
	startTouch = 0,
	start=0,
	Num1=$(scrobtn1).outerWidth()-$(scrobtn2).outerWidth();//滚动条剩余的高度;
	$(scrobtn2).die("mousedown touchstart").live("mousedown touchstart",function(e){
		e = e || window.event; 
		dragging=true;		
		scrBtnX=$(this).offset().left;//控制滚动按钮距浏览器顶部的偏移量
		scrBjX=$(scrobtn1).offset().left;//控制滚动条区域距浏览器顶部的偏移量
		if(e.type=='mousedown'){
			diffX=e.clientX-scrBtnX;//坐标点距离按钮顶部的距离		
		}else{
			diffX=e.originalEvent.changedTouches[0].clientX-scrBtnX;//坐标点距离按钮顶部的距离		
		}
		var html='<div class="movebj"></div>';
		$("body").prepend(html);		
	})
	$(".movebj").die('mousemove touchmove').live('mousemove touchmove',function(e){	
		e = e || window.event; 	
		e.preventDefault();
		if(dragging){	
			if(e.type=='mousemove'){
				targX=e.clientX-diffX-scrBjX;//鼠标移动的距离
			}else{
				targX=e.originalEvent.changedTouches[0].clientX-diffX-scrBjX;//鼠标移动的距离
			}						
			if(targX<=0){
				Scrll(0);
				targX=1;
			}else if(targX>=Num1){
				Scrll(Num1);
				targX=Num1;
			}
			Scrll(targX);
			$(scrobtn2).css('left',targX);	
			noSelect();
		}
	})
	$(".movebj").die('mouseup touchend').live('mouseup touchend',function(){
		$(".movebj").remove();
		dragging=false;		
	})
	$(scroobj2).bind("touchstart",function(e){
		e = e || window.event; 	
		startTouch = e.originalEvent.changedTouches[0].clientX;
		start = parseInt($(scroobj3).css("margin-left"));
	});
	$(scroobj2).bind("touchmove",function(e){
		e = e || window.event; 	
		e.preventDefault();
		var nowTouch = e.originalEvent.changedTouches[0].clientX;
		var disX = nowTouch - startTouch;
		var y=start+disX;
		if(y>0){
			y=0;
		}
		if(y<-($(scroobj3).width()-$(scroobj2).width())){
			y=-($(scroobj3).width()-$(scroobj2).width());
		};
		$(scroobj3).css("margin-left",y);
		$(scrobtn2).css("left",(-parseInt($(scroobj3).css("margin-left"))/($(scroobj3).width()-$(scroobj2).width()))*($(scrobtn1).width()-$(scrobtn2).width()));
	});
	function Scrll(x){				
		$(scrobtn2).css("left",x);			
		$(scroobj3).css("margin-left",-(x/($(scrobtn1).outerWidth()-$(scrobtn2).outerWidth()))*($(scroobj3).width()-$(scroobj2).width()));
	}
	/*兼容火狐和ie的写法*/
	if(document.getElementById(scroobj4).addEventListener) {
		document.getElementById(scroobj4).addEventListener('DOMMouseScroll',wheel,true);		
	}
	document.getElementById(scroobj4).onmousewheel=wheel;//ie
	var Distance=Num1*0.1;
	function wheel(e){
		var evt = e || window.event;
		var wheelDelta = evt.wheelDelta || evt.detail;	
		if(wheelDelta == -120 || wheelDelta == 3 || wheelDelta == -360){//滚轮向下		
			var Distances=$(scrobtn2).position().left+Distance;//除滚动按钮以外滚动条的高度
			
			if(Distances>=Num1){
					
				$(scrobtn2).css("left",Num1);
				Scrll(Num1);
			}else{
				Scrll(Distances);
			}
			return;
		}else if (wheelDelta == 120 || wheelDelta == -3 || wheelDelta == 360){//滚轮向上
			var Distances=$(scrobtn2).position().left-Distance;
			if(Distances<=1){
				Scrll(0);				
				$(scrobtn2).css("left",1);
			}else{
				Scrll(Distances);
			}
			return;
		}   
	}	
}
//内层页面loading和无数据提示
function contentpoint(t,o){
	$("#loading").remove();
	if(!t){
		return;
	};
	if(t==2){
		o.show().append('<div id="loading" style="line-height:84px;font-size:14px;"><img src="../img/loading22.gif">加载中...</div>');
	}else{
		o.show().append('<div id="loading" style="padding:100px 0;"><p style="text-align:center;"><img src="../img/bg0929.png"></p><p style="color:#ccc; text-align:center; line-height:28px;">暂无数据</p><div>');
	}
};
function isNull(t){
	if(t==null||t==""||t==undefined){
		return "--";
	}else{
		return t;
	};
};
//删除弹窗
var addWinHide=function(){
	window.top.$(".mask").hide();
	window.top.$(".popups").attr("style","").hide().empty();
	window.top.$(".right_frame").css("overflow","auto");
};
/*日历*/
function checkDate(){	
   //日期
   var myDate=new Date();//实例化日期对像
   var mygetYear=myDate.getFullYear();//获取当前年
   var mygetMonth=myDate.getMonth();//获取当前月
   var mygetDay=myDate.getDate();//获取当前日
   $(".year").text(mygetYear);
   $(".month").text(parseInt(mygetMonth)+1);
   function DayNumOfMonth(Year,Month,loopWrap){	   			
   		var setDay=new Date(Year,Month,1);//setDay.mygetDay()获取指定月1号是星期几
	    var setDate = new Date(Year,Month+1,0);//setDate.getDate()获取指定月一共有多少天（day为0会取上个月最后一天，month为0会取上年最后一天）
	    var ddfir=7-setDay.getDay();
	    var ddnum=0;//指定月显示的行数
	    var ddobj='';//初始化显示的内容
	    var attrDate=0;
	    var issun;
	    var enableMonth=parseInt(Month)+1;
	    var hidvalue;//对应日期值
	    var chagAttrDate;//日期小于10
	    if(ddfir==7){
	    	issun=true;
	    	ddnum=Math.ceil(setDate.getDate()/7); //向上取整 
	    }else{
	    	issun=false;
	    	ddnum=Math.ceil((setDate.getDate()-ddfir)/7)+1; 
	    }	
	    if(enableMonth<10){
			enableMonth="0"+enableMonth;
		}
		for(i=0;i<ddnum;i++){
			ddobj+="<dd>";			
			for(j=0;j<7;j++){
				if(i==0&&ddfir!=7&&j<setDay.getDay()){
					ddobj+="<em>"+"　"+"</em>";
				}else{
					attrDate++;
					if(attrDate<=setDate.getDate()){
						if(attrDate<10){
							chagAttrDate="0"+attrDate;
						}else{
							chagAttrDate=attrDate;
						}
						hidvalue=Year+"-"+enableMonth+"-"+chagAttrDate;
						var start=toDate(loopWrap.parents(".checkDate").attr("start"));
						var end=toDate(loopWrap.parents(".checkDate").attr("end"));
						
						var d0=toDate(hidvalue);
						if(d0<start||d0>end){
							ddobj+="<em class='date-optional null' date-time="+hidvalue+">"+attrDate+"</em>";
						}else{
							ddobj+="<em class='date-optional' date-time="+hidvalue+">"+attrDate+"</em>";
						};
					}else{
						ddobj+="<em>"+"　"+"</em>";
					}					
				}
				
			}
			ddobj+="</dd>";
		}
		loopWrap.find('dd').remove();
		loopWrap.append(ddobj)
		//$(ddobj).appendTo(loopWrap);
		
   }
   //DayNumOfMonth(mygetYear,mygetMonth,$("date-loop")); 
   //选中默认状态
   function sta(){
   	   var chamonth=$(this).parents(".checkDate").find('.month').text();
   	   var chaobj='';   	   
   	   switch(chamonth){
   	   		case '01':
   	   		case '1':
   	   			chaobj="一月";
   	   			break;
   			case '02':
   			case '2':
	   			chaobj="二月";
	   			break;
	   		case '03':
	   		case '3':
   	   			chaobj="三月";
   	   			break;
   			case '04':
   			case '4':
	   			chaobj="四月";
	   			break;
	   		case '05':
	   		case '5':
   	   			chaobj="五月";
   	   			break;
   			case '06':
   			case '6':
	   			chaobj="六月";
	   			break;
	   		case '07':
	   		case '7':
   	   			chaobj="七月";
   	   			break;
   			case '08':
   			case '8':
	   			chaobj="八月";
	   			break;
	   		case '09':
	   		case '9':
   	   			chaobj="九月";
   	   			break;
   			case '10':
	   			chaobj="十月";
	   			break;
	   		case '11':
   	   			chaobj="十一月";
   	   			break;
   			case '12':
	   			chaobj="十二月";
	   			break;
   	   }   	  
   	   $(this).parents(".checkDate").find(".blomonth").text(chaobj);
	   DayNumOfMonth(mygetYear,mygetMonth,$(this).parents(".checkDate").find(".date-loop"));
	   var dateTxt=$(this).parents(".checkDate").find('input').val();
	   var selDate=$(this).parents(".checkDate").find(".date-loop em");
	   selDate.removeClass('on');
	   if(dateTxt!=""){	   	
		  var datelist=selDate.length;		  
		  for(z=0;z<datelist;z++){
			  if(dateTxt==selDate.eq(z).attr('date-time')){
				  selDate.eq(z).addClass('on');					
			  }
		  }		  
	   }
   }   
   //选择出行日期
   $(".date-loop .date-optional").die("click").live("click",function(e){   
   		if($(this).hasClass("null")){
   			return;
   		};
   		$(this).parents(".checkDate").find('input').val($(this).attr("date-time"));
   		var dateTxt=$(this).parents(".checkDate").find('input').val();
	   	var selDate=$(this).parents(".checkDate").find(".date-loop em");
	    selDate.removeClass('on');	    
	    if(dateTxt!=""){	   	
		  var datelist=selDate.length;		  
		  for(z=0;z<datelist;z++){
			  if(dateTxt==selDate.eq(z).attr('date-time')){
				  selDate.eq(z).addClass('on');					
			  }
		  }		  
	    }
	    calendarAfter($(this));
   		$(".mytime").css('display','none');
   		e.stopPropagation();
   })   
   //改变日历
   $(".prev-year-btn").die("click").live('click',function(e){
	    mygetYear= $(this).parent().find(".year").text()-1;
   		$(this).parent().find(".year").text(mygetYear);
		sta.call(this);
		e.stopPropagation();
   })
   $(".next-year-btn").die("click").live('click',function(e){
	   mygetYear= parseInt($(this).parent().find(".year").text())+1;
   		$(this).parent().find(".year").text(mygetYear);
		sta.call(this);
		e.stopPropagation();
   })
   $(".prev-month-btn").die("click").live('click',function(e){
   		mygetYear= parseInt($(this).parent().find(".year").text());
	    mygetMonth= $(this).parent().find(".month").text()-2;  
		if(mygetMonth<0){  		
   			mygetYear-=1;
   			mygetMonth=11;
   		}
   		$(this).parent().find(".year").text(mygetYear);
   		$(this).parent().find(".month").text(mygetMonth+1);  
		sta.call(this);
		e.stopPropagation();
   })
   $(".next-month-btn").die("click").live('click',function(e){
   		mygetYear= parseInt($(this).parent().find(".year").text());
	    mygetMonth=parseInt($(this).parent().find(".month").text());  
		if(mygetMonth>11){
   			mygetYear+=1;
   			mygetMonth=0;
   		}
   		$(this).parent().find(".year").text(mygetYear);		
   		$(this).parent().find(".month").text(mygetMonth+1);
		sta.call(this);
		e.stopPropagation();
   })
   //显示日历
   $(".checkDate").die("click").live('click',function(){
   		uerstime.call(this);
   		$('.mytime').css('display','none');
   		$(this).find('.mytime').css('display','block');
   })
   /*点击窗体其它部分下拉菜单消失*/	
	$(document).click(function(e){
		 e = window.event || e; // 兼容IE7
		 obj = $(e.srcElement || e.target);
			if (!$(obj).is(".checkDate")&&!$(obj).is(".form-control")&&!$(obj).is(".form-date h5 em")&&!$(obj).is(".form-date h5 span")&&!$(obj).is(".form-date-list dt em")) { //除dropDown层外的部分
				$(".mytime").css('display','none');
		   }
	});
   /*自定义时间*/
  　 function uerstime(){
  		var datearr=new Array();
  		datearr=$(this).find('input').val().split('-');
   		var chamonths=datearr[1];
   		var chaobjs=''; 
   		var siglemonth=0;
   		switch(chamonths){
   	   		case '01':  
   	   		case '1':
   	   			chaobjs="一月";
   	   			break;
   			case '02': 
   			case '2':
	   			chaobjs="二月";
	   			break;
	   		case '03':
	   		case '3':
   	   			chaobjs="三月";
   	   			break;
   			case '04': 
   			case '4':
	   			chaobjs="四月";
	   			break;
	   		case '05':
	   		case '5':
   	   			chaobjs="五月";
   	   			break;
   			case '06':   
   			case '6':
	   			chaobjs="六月";
	   			break;
	   		case '07':	
	   		case '7':
   	   			chaobjs="七月";
   	   			break;
   			case '08': 
   			case '8':
	   			chaobjs="八月";
	   			break;
	   		case '09':
	   		case '9':
   	   			chaobjs="九月";
   	   			break;
   			case '10':
	   			chaobjs="十月";
	   			break;
	   		case '11':
   	   			chaobjs="十一月";
   	   			break;
   			case '12':
	   			chaobjs="十二月";
	   			break;
   	   }
   		if(datearr[1]<10){
   			siglemonth=chamonths.substr(1,1);
   		}else{
   			siglemonth=chamonths;
   		}   		
   	   $(this).find(".year").text(datearr[0]);
   	   $(this).find(".month").text(siglemonth);
   	   $(this).find(".blomonth").text(chaobjs);   	   
   	   mygetYear=datearr[0];
   	   mygetMonth=datearr[1]-1;
   	   DayNumOfMonth(mygetYear,mygetMonth,$(this).find(".date-loop"));
   	   var dateTxt=$(this).find('input').val();
	   var selDate=$(this).find(".date-loop em");
	   selDate.removeClass('on');
	   if(dateTxt!=""){	   	
		  var datelist=selDate.length;		  
		  for(z=0;z<datelist;z++){
			  if(dateTxt==selDate.eq(z).attr('date-time')){
				  selDate.eq(z).addClass('on');					
			  }
		  }		  
	   }
  }
   
}
//日历回调
function calendarAfter(_this){
	if(_this.parents(".checkDate").attr("id")=="employment_info_date_start"){
		$("#employment_info_date_end").attr("start",_this.attr("date-time"));
		
		LamaReqlhy_studenttableEmployment();
	};
	if(_this.parents(".checkDate").attr("id")=="employment_info_date_end"){
		$("#employment_info_date_start").attr("end",_this.attr("date-time"));
		
		LamaReqlhy_studenttableEmployment();
	};
	if(_this.parents(".checkDate").attr("id")=="discipline_info_date_start"){
		$("#discipline_info_date_end").attr("start",_this.attr("date-time"));
		
		LamaReqlhy_studentDiscipline(1);
	};
	if(_this.parents(".checkDate").attr("id")=="discipline_info_date_end"){
		$("#discipline_info_date_start").attr("end",_this.attr("date-time"));
		
		LamaReqlhy_studentDiscipline(1);
	};
	if(_this.parents(".checkDate").find("input").attr("id")=="finance_starDate"){
		$("#finance_endDate").parent().attr("start",_this.attr("date-time"));		
	}
	if(_this.parents(".checkDate").find("input").attr("id")=="finance_endDate"){
		$("#finance_starDate").parent().attr("end",_this.attr("date-time"));		
	}
	if(_this.parents(".checkDate").find("input").attr("id")=="consult_starDate"){
		$("#consult_endDate").parent().attr("start",_this.attr("date-time"));		
	}
	if(_this.parents(".checkDate").find("input").attr("id")=="consult_endDate"){
		$("#consult_starDate").parent().attr("end",_this.attr("date-time"));		
	}
	if(_this.parents(".checkDate").attr("id")=="course_class_start"){
		$("#course_class_end").attr("start",_this.attr("date-time"));
	};
	if(_this.parents(".checkDate").attr("id")=="course_class_end"){
		$("#course_class_start").attr("end",_this.attr("date-time"));
	};
	if(_this.parents(".checkDate").attr("id")=="evaluation_info_date_start"){
		$("#evaluation_info_date_end").attr("start",_this.attr("date-time"));
		
		if($(".evaluation_tabbtn p.on").attr("flag")=="lhy_stuTolecturerEvaluation"){
			LamaReqlhy_stuTolecturerEvaluation(1);
		}else{
			LamaReqlhy_stuToPlanDivision(1);
		};
	};
	if(_this.parents(".checkDate").attr("id")=="evaluation_info_date_end"){
		$("#evaluation_info_date_start").attr("end",_this.attr("date-time"));
		
		if($(".evaluation_tabbtn p.on").attr("flag")=="lhy_stuTolecturerEvaluation"){
			LamaReqlhy_stuTolecturerEvaluation(1);
		}else{
			LamaReqlhy_stuToPlanDivision(1);
		};
	};
	if(_this.parents(".checkDate").find("input").attr("id")=="lecture_time"){
		$("#protect_time").parent().attr("start",getNextDay(_this.attr("date-time")));	
		$("#protect_time").val(getNextDay(_this.attr("date-time")));
	}
	
	if(_this.parents(".checkDate").find("input").attr("id")=="statics_starDate"){		
		$("#statics_endDate").parent().attr("start",_this.attr("date-time"));
	}
	if(_this.parents(".checkDate").find("input").attr("id")=="statics_endDate"){
		$("#statics_starDate").parent().attr("end",_this.attr("date-time"));		
	}
	if(_this.parents(".checkDate").find("input").attr("id")=="statics_starDates"){
		$("#statics_endDates").parent().attr("start",_this.attr("date-time"));
	}
	if(_this.parents(".checkDate").find("input").attr("id")=="statics_endDates"){
		$("#statics_starDates").parent().attr("end",_this.attr("date-time"));		
	}
	
	
};
function getNextDay(d){//指定日期下一天
    d = new Date(d);
    d = +d + 1000*60*60*24;
    d = new Date(d);
    //return d;
    //格式化
	var year=d.getFullYear();
	var month=d.getMonth()+1;
	var day=d.getDate();
	if(month<10){
		month="0"+month;
	}
	if(day<10){
		day="0"+day;
	}
    return year+"-"+month+"-"+day;
     
}
function toDate(str){
    var sd=str.split("-");
    return new Date(sd[0],parseInt(sd[1])-1,sd[2]);
};
function getYear(type,dates){
	var dd = new Date();
	if(dates==0){
		var year = dd.getFullYear();
	}else{
		var year = dd.getFullYear()-1;
	}	
	var fd = year+"-01-01";
	var ed = year+"-12-31";
	var yr = "";
	if(type=="s"){
		yr = fd;
	}else{
		yr = ed;
	}
	return yr;	
}
function getDate(dates){
	var dd = new Date();
    dd.setDate(dd.getDate()+dates);
    var y = dd.getFullYear();
    var m = dd.getMonth()+1;
    var d = dd.getDate();
    m=m<10?"0"+m:m;
    d=d<10?"0"+d:d;
	return y+"-"+m+"-"+d;
};

function getMonday(){
	var d = new Date();
	var year = d.getFullYear();
    var month = d.getMonth()+1;
    var date = d.getDate();
	// 周
	var day=d.getDay();
	var monday = day!=0?day-1:6; // 本周一与当前日期相差的天数

	return monday;
}

function getMonth(type,months){
	var d = new Date();
	var year = d.getFullYear();
	var month = d.getMonth()+1;
	
	if(months!=0){
	// 如果本月为12月，年份加1，月份为1，否则月份加1。
	if(month==12 && months>0){
	year++;month=1;
	}else if(month==1 && months<0){
	year--;month=12;
	}else{
	month = month+months;
	}
	}
	month=month<10?"0"+month:month;
    var date = d.getDate();
    var firstday=year+"-"+month+"-"+"01";
	var lastday="";
	if(month=="01" || month=="03" || month=="05" || month=="07" || month=="08" || month=="10" || month=="12"){
	lastday = year+"-"+month+"-"+31;
	}else if(month=="02"){
	// 判断是否为闰年（能被4整除且不能被100整除 或 能被100整除且能被400整除）
	if((year%4==0 && year%100!=0)||(year%100==0 && year%400==0)){
	lastday = year+"-"+month+"-"+29;
	}else{
	lastday = year+"-"+month+"-"+28;
	}
	}else{
	lastday = year+"-"+month+"-"+30;
	}
	var day = "";
	if(type=="s"){
	day = firstday;
	}else{
	day = lastday;
	}
	return day;
}

function getQFMonth(month){
	var quarterMonthStart=0; 
	var spring=1; //春  
	var summer=4; //夏  
	var fall=7;   //秋  
	var winter=10;//冬  
	if(month<=3){ return spring; } 
	if(month<=6){ return summer; } 
	if(month<=9){ return fall; } 
	return winter; 
}; 

function getQF(type,months){//(months) 本季度0上季度-3下季度3
	var d = new Date();
	var year = d.getFullYear();
    var month = d.getMonth()+1;
    var qfmonth = getQFMonth(month);
    

    if(months!=0){
	    if(qfmonth==10 && months>0){
	    	year++;
	    	qfmonth=1;
	    }else if(qfmonth==1 && months<0){
	    	year--;
	    	qfmonth=10;
	    }else{
	    	qfmonth = qfmonth+months;
	    }
    }  
        
    var stmonth="",
       edmonth=qfmonth+2;
    if(qfmonth<10){
    	stmonth="0"+qfmonth;
    }      
    if(edmonth<10){
    	edmonth="0"+edmonth;
    }
    var fd = year+"-"+stmonth+"-"+"01";
    var ed = "";    
    if(qfmonth==1 || qfmonth==10){    	
		ed = year+"-"+edmonth+"-"+31;
    }else{    	
		ed = year+"-"+edmonth+"-"+30;
    }
   
    var qf = "";
	if(type=="s"){
		qf = fd;
	}else{
		qf = ed;
	}
	return qf;
}

function getYears(type,years){
	var d = new Date();
	var year = d.getFullYear();
	
	var fd = (year+years)+"-"+01+"-"+01;
	var ed = (year+years)+"-"+12+"-"+31;
	
	var yr = "";
	if(type=="s"){
		yr = fd;
	}else{
		yr = ed;
	}
	return yr;
}
//换页
function pagejumps(e,fn){
	if(e.keyCode!=13){
		return;
	};
	var num=parseInt($("#pagsnum").val());
	var last=parseInt($("#pagsnum").attr("last"));
	$("#pagsnum").removeClass("red");
	if(isNaN(num)){
		$("#pagsnum").addClass("red");
		return;
	};
	if(num>last){
		num=last	
	};
	if(num<1){
		num=1;
	};
	eval(fn+'('+num+')');
};

//替换option的特殊符号
function optReplace(str){
	if(str){
		str=str.replace(/;/g,"；");
		str=str.replace(/,/g,"，");
		str=str.replace(/\?/g,"？");
		return str;
	};
};
//过滤字符串标签
function filterString(t){
	t=String(t);
	t=t.replace(/<\/?[^>]*>/g,'');
	$.trim(t);
	return t;
};
