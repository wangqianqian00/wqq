//授课页面初始化
$(function (){
	//schedule();//课程进度宽度
	//scheduleCont();//进度条
	//textPosition();//进度条下面文字位置
	navheadTab();//导航头部tab切换
	courseDetails();//课程详情
	weeklyPopup();//头部弹框
	checkPapersWk();//弹窗位置
	closeTheWindow();//关闭弹窗
	modifyPopup();//填写/修改周报	
	closeModifyPopup();//关闭填写/修改周报弹框
	seeWeeklyPopup();//查看周报弹框
	manualPopup();//查看手册
	closemanualPopup();//关闭手册
	getThePapers();//获取试卷弹框
	resultSummary();//成绩汇总弹窗
	slider();
	generatingTestPaper();//查看试卷
	testPaperTab();//试卷按钮切换
	deleteTestPaper();//删除试卷
	examConfirmation(); //考试
	tooltips();
});

$(window).resize(function(){
	schedule();//课程进度宽度
	textPosition();//进度条下面文字位置
	checkPapersWk();//弹出框位置
	mesPopupHeight();//弹出框位置
});
//弹出框位置
var checkPapersWk=function (){
	var windHeight=$(window).height();
	var titleHeight=$(".popup_title").height();
	if($(".topic").length=="0"){	
		$(".popup_wrap").height(windHeight-100+'px');
		var zHeight=$(".popup_wrap").height();
		$(".popup_wrap").css({"top":50+'px'});
		$(".popup_cont").height(zHeight-titleHeight-103+'px');
	}else{
		$(".popup_wrap").height(windHeight-100+'px');
		var zHeight=$(".popup_wrap").height();
		$(".popup_wrap").css({"top":50+'px'});
		$(".popup_cont").height(zHeight-titleHeight-$(".topic").height()-153+'px');
	};
};

//关闭弹窗
var closeTheWindow=function (){
	$(".close").live("click",function (){
		$(".mask").hide();
		$(this).parent().remove();
		$(".navhead_right li").removeClass("on");
	});	
};

//课程进度宽度
var schedule=function (){
	//进度条
	var zWidth=$(".classProgress_cont").width();
	var lWidth=zWidth*0.05+21;
	$(".classProgress_left").width(zWidth-lWidth);
	
	//每一个块的宽度
	var scheduleW=$(".classProgress_left").width()-2; //进度条的宽度
	var zongLength=$(".schedule_cont .class").children("a").length;  //课程的总个数
	var totla=scheduleW/zongLength;
	$(".classProgress div").width(totla+'px');	
	
	//课件内容的宽高
	//var courWidth=$(window).width()-71;
	//$(".courseware_content p object").width(courWidth-122);	
	
	//知识点考试宽高
	var forknowledgeW=$(window).width()-193;
	var forknowledgeLw=$(".forknowledge_left").width()+46;
	$(".forknowledge_right").css("width",forknowledgeW-forknowledgeLw+'px');	
	
	//试卷头部宽高
	var testPaperHeadW=$(".testPaper_top a").length;
	$(".testPaper_top a").css("width",(forknowledgeW-2)/testPaperHeadW-1+'px');		
	
	//作业页面点赞左侧宽度
	var clickalikeWidth=$(".clickalike").width();
	$(".clickalike_left").width(clickalikeWidth-242+'px');
	
	$(".subnavigation").width($(window).width()-71);
};

//导航头部tab切换
var navheadTab=function (){
	$(".subnavigation_right ul li").live("click",function (){
		if($(this).hasClass("on")){
			return;
		};
		clearNav();
		checkPapersWk();
		$(".subnavigation_right li").removeClass("on");
		$(".courseware").hide();
		//seatingChart();
		if($(this).attr("id")=="kj"){
			if($("em.em1").parent().find(".span1").length<1){
				clearWin();	
				prompt("课件暂未开放，请联系讲师")
				return;
			};	
			LamaReqStudentWareTeach();
		}else if($(this).attr("id")=="zy"){
			if($("em.em1").parent().hasClass("grey")){
				clearWin();
				prompt("作业暂未开放，请联系讲师")
				return;
			};
			LamaReqStudentClassWork();
		}else if($(this).attr("id")=="zsdks"){
			if($("em.em1").parent().hasClass("grey")){
				clearWin();	
				prompt("该日暂未上课");
				return;
			}else{
				clearWin();	
				LamaReqstudentExamSite();
			};
			
		}else if($(this).attr("id")=="jdks"){
			LamaReqStudenPhaseTest();
		};
		$('.seatingchartbei_cont').empty();
		var num=$(".subnavigation_right ul li").index(this);
		$(".subnavigation_right ul li").removeClass("on");
		$(this).addClass("on");
		$(".content").hide();
		$("#content"+num+"").show();
		$(this).parent().css("border-bottom","none");		
		schedule();
		textPosition();
		//seatingChart();
		//LamaReqTeachWareTeach();
	});
};

//子导航吸顶
var subnavCeiling=function (){
	var oDiv=$('.subnavigation');
	var nTop=oDiv.offset().top;
	$(window).scroll(function (){
		var scrollTop=$(document).scrollTop();
		if (scrollTop >= nTop){
			oDiv.css({'position':'fixed','width':$(window).width()-71+'px'});
		}else{
			oDiv.css({'position':'','width':''});
		}
	});
};
//进度条
var scheduleCont=function (){
	$(".classProgress_bottom p").click(function (){
		clearWin();
		var num=$(this).attr("cid");
		$(".classProgress_bottom p span").removeClass("on");
		$(".schedule_cont .class").hide();
		$(this).find("span").addClass("on");		
		//alert(num);
		//$(".schedule_cont .class div.log").remove();
		//$(".schedule_cont .class").eq(num).append('<div class="log"><img src="img/loading22.gif" /><span>正在加载中...</span></div>');
		//$(".schedule_cont #class"+num+" .log").show();
		//$(".schedule_cont .class").hide();
		$(".schedule_cont .class[cid="+num+"]").show();
		$("em.em1").remove();
//		$(".schedule_cont .class[cid="+num+"]").attr("on")=="1"
		if($(".schedule_cont .class[cid="+num+"] a[stat=0]").length!=0&&$(".schedule_cont .class[cid="+(num-1)+"] a.green").length==$(".schedule_cont .class[cid="+(num-1)+"] a").length){
			$(".schedule_cont .class[cid="+num+"] a[stat=0]").first().append("<em class='em1'></em>");
		};
//		else{
//			$(".schedule_cont .class[cid="+num+"] a").last().append("<em class='em1'></em>");
//		};
		$(".subnavigation_right ul").attr("style","");
		$(".subnavigation_right ul li").removeClass("on");
		$(".content").hide();
		$(".subnavigation").hide();
		$("em.em1").parent().click();
		if($("em.em1").parent().hasClass("blue")||$("em.em1").parent().hasClass("green")){
			$(".schedule_sel").remove();
			$(".subnavigation").show();
		};
		$(".navhead_left span#lecturer").html("当前技术讲师："+$(".schedule_cont .class[cid="+num+"] a").first().attr("js"));
	});	
	var width=$(".classProgress").width();  //进度条的宽度
	var zongLength=$(".schedule_cont a").length;  //课程的总个数
	var legnth=($(".schedule_cont a").length);
	$(".schedule_cont a").each(function (i){	
		//var yiwidth=width/legnth;
		if($(this).hasClass("green")){
			$(".classProgress").append('<div class="classProgressGree"></div>');
		}else if($(this).hasClass("blue")){
			$(".classProgress").append('<div class="classProgressBlue"></div>');	
		}else if($(this).hasClass("grey")){	
			$(".classProgress").append('<div class="classProgressGrey"></div>');	
		};
		if($(this).find("i").html()==1){
			var left=((i/zongLength)*100-0.4).toFixed(1);
			$(".classProgress").append('<span style="left:'+left+'%"></span>');
		};
	});
	$(".classProgress").append('<span class="last"></span>');
};

//进度条下面文字位置
var textPosition=function (){
	var a=0;
	var b=0;
	var c=0;
	var width=$(".classProgress").width();  //进度条的宽度
	$(".classProgress span").each(function (j){				
		if(j!=0){
			b=$(this).css("left");
			if(b.indexOf("%")!=-1){
				b=parseInt(b)/100*width+4;
			}else{
				b=parseInt(b)+4;
			};
			if($(this).hasClass("last")){	
				var bl=((width-8)/width)*100+"%";
				$(this).last().css("left",bl);
				var c=$(this).last().css("left");
				if(c.indexOf("%")!=-1){
					c=parseInt(c)/100*width+4;
				}else{
					c=parseInt(c)+4;
				};
				var sWidth=c-a;
				$(".classProgress_bottom p:last").width(sWidth);
			}		
			var cWidth=b-a;							
			$(".classProgress_bottom p:eq("+(j-1)+")").width(cWidth);			
			a=b;			
		}
	});
};

//课程详情
var courseDetails=function (){	
	//页面加载判断有没有上课
//	$(".schedule_cont .class a").each(function() {
//    if($(this).hasClass("green")||$(this).hasClass("blue")){
//			$(this).append('<span class="span1"></span>');
//			$(this).addClass("active");
//		}
//});
	
	//点击课程加跟随框和标识
	$(".schedule_cont .class a").live("click",function (){
		clearWin();
		var num=$(".schedule_cont .class").children().index(this);	
		var name=$(this).attr("tips");
		var yes=$(this).attr("yes");
		var no=$(this).attr("no");
		var kcstat='';
		var kjstat='';
		if($(this).hasClass("green")){
			kcstat='已下课';
			kjstat='已开放';
		}else if($(this).hasClass("blue")){
			kcstat='正在上课';
			kjstat='已开放';
		}else if($(this).hasClass("grey")&&$(this).html().indexOf("span")!=-1){
			kcstat='未上课';
			kjstat='已开放';
		}else{
			kcstat='未上课';
			kjstat='未开放';
		};
		var schedulehtml='<div class="schedule_sel"><div class="schedule_sel_top"><div><span>课程内容：</span>'+name+'</div><div><span>课程状态：</span>'+kcstat+'</div><div><span>已考知识点：</span>'+yes+'个</div><div><span>未考知识点：</span>'+no+'个</div><div class="open"><span>课件状态：</span><strong>'+kjstat+'</strong></div></div></div>';
		$(".schedule_sel").remove();
		$(".em1").remove();
		$(schedulehtml).appendTo(this);
		$(this).append('<em class="em1"></em>');		
		$(".subnavigation_left p").html("课程：（unit"+$(this).find("i").html()+"）"+name);
		if($(this).hasClass("active")){	
			$(".schedule_sel_top div.open strong").html("已开放");
		};
//		if($(this).parent().attr("on")=="0"){
//			$(".schedule_sel").remove();
//			$(".subnavigation_right").hide();
//			$(".subnavigation_left a").hide();
//		};
		$(".subnavigation").show();
		subnavCeiling();
		$(".subnavigation_right ul").attr("style","");
		$(".subnavigation_right ul li").removeClass("on");
		$(".content").hide();
		//$(".navhead_left span#lecturer").html("当前技术讲师："+$(this).attr("js"));
		schedule();//课程进度宽度
	});
	
	//鼠标离开跟随框消失
	$(".class").live("mouseleave",function (){
		$(".schedule_sel").remove();	
	});
	$("em.refreshbut").live("click",function(){
		window.location.reload();
//		$(".schedule_cont").empty();
//		$(".classProgress").empty();
//		$(".classProgress_bottom").empty();
//		$(".subnavigation").hide();
//		$(".content").hide();
//		clearNav();
//		clearWin();
//		LamaReqStudentClassOption(); //班级进度
	});
};

//全屏模式
var fullscreen=function (obj,obj1,obj2){
	var elem = document.getElementById(obj2); 
	var full = document.getElementById(obj); 
	var exit = document.getElementById(obj1); 
	requestFullScreen(elem);
	full.style.display="none";
	exit.style.display="block";	
	function requestFullScreen(element) {
		var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
		if (requestMethod) {  
			requestMethod.call(element);
		} else if (typeof window.ActiveXObject !== "undefined") {  
			var wscript = new ActiveXObject("WScript.Shell");
			if (wscript !== null) {
				wscript.SendKeys("{F11}");
			}
		}
	}
};
window.onresize=function (){
	window.screenLeft=0;
	window.document.body.clientWidth=window.screen.width;
	if(window.screenLeft == 0 && window.document.body.clientWidth == window.screen.width){
		var windwWidth=window.screen.width;
		var windwHeight=window.screen.height;
		$(".courseware_content p object").width(windwWidth+'px');
		$(".courseware_content p object").height(windwHeight+'px');
		$(".full").hide();
		$(".exit").show();
    }else{
		var courWidth=$(window).width()-71;
		$(".courseware_content p object").width(courWidth-122);		
		$(".full").show();
		$(".exit").hide();
    }
}

//还原
var exitFullscreen=function(obj,obj1){
	var full = document.getElementById(obj); 
	var exit = document.getElementById(obj1);
	full.style.display='block';
	exit.style.display='none';
	var elem=document;
    if(elem.webkitCancelFullScreen){
        elem.webkitCancelFullScreen();    
    }else if(elem.mozCancelFullScreen){
        elem.mozCancelFullScreen();
    }else if(elem.cancelFullScreen){
        elem.cancelFullScreen();
    }else if(elem.exitFullscreen){
        elem.exitFullscreen();
    }else if (typeof window.ActiveXObject !== "undefined") {  
		var wscript = new ActiveXObject("WScript.Shell");
		if (wscript !== null) {
			wscript.SendKeys("{F11}");
		}
	}
};
function mesPopupHeight(){
	$.each($(".mes_popup"), function(i,v) {
		if($(this).is(":visible")){
			if($(this).height()>$(window).height()){
				$(this).find(".popup_cont").height($(window).height()-300);
			};
			$(this).css("margin-top",-$(this).height()/2+"px");
		};
	});
};
//头部弹框
var weeklyPopup=function (){
	$(".navhead_right ul li").live("click",function (){
		if($(this).hasClass("on")){
			if($(this).attr("id")=="information"){
				$(".information_popup_cont span.guan").click();
			};
			return;
		};
		if($(this).attr("id")=="weekly"){
			LamaReqStudentListWeekly();
		}else if($(this).attr("id")=="lecturer"){
			assesstips=true;
			LamaReqStudentSubmitpexpert();
		}else if($(this).attr("id")=="dutydiv"){
			assesstips=true;
			LamaReqStudentSubmitplanteach();
		}else if($(this).attr("id")=="information"){
			$(this).addClass("on");
			LamaReqStudnetPersonalInfor();
			//$(document.body).append('<div class="popup_cont information_popup_cont"><span class="san"></span><span class="guan"></span><div class="information_popup_cont_positon"><a class="manual">查看学员手册</a></div><ul><li><span>待缴学费：</span><p>已完结</p></li><li class="leave"><span>请假记录：</span><p>请假【4次】，共【60小时】</p></li></ul><ul class="discipline"><li><span>纪律：</span><p>100</p><em>（纪律80分（含）以上合格，60-69警告，60分以下不及格）</em></li><li><span>考勤：</span><p>100</p><em>（考勤80分（含）以上合格，60-79警告，60分以下不及格）</em></li></ul><table><tbody><tr class="record_title"><td class="record_time">记录时间</td><td class="disc_type">违纪类型</td><td class="disc_time">违纪时间</td><td class="disc_reasons">违纪原因</td></tr><tr><td class="record_time">2015.07.07 18:30:49</td><td class="disc_type">纪律</td><td class="disc_time">2015.07.07 18:30:49</td><td class="disc_reasons">看小说、看无关视频看无关视频看无关视频看无关视频看无关视频，第一次扣5分(上午下课期间，看视频“奔跑吧，兄弟”。</td></tr></tbody></table></div>');
		};
//		$(".mask").show();
//		mesPopupHeight();
	});
};

//填写/修改周报
var modifyPopup=function (){
	$(".weekly_popup .weekly_popup_title em").live("click",function (){
		if($(".weekly_popup_cont div[on=1]").length>0){
			$(".weekly_popup_cont div[on=1] a").click();
		}else{
			var title=$(".classProgress_bottom p").eq($(".schedule_cont .class a[stat=0]:first").parent().index()).find('span').html();
			if($(".schedule_cont .class:visible").attr("ct")==1){
				$(document.body).append('<div class="modify_popup mes_popup"><span class="modify_popup_close"></span><div class="popup_title modify_popup_title">'+title+'</div><div class="popup_cont modify_popup_cont"><form><div class="clear"><p>掌握的知识点</p><textarea></textarea></div><div class="clear"><p>模糊不清的知识点</p><textarea></textarea></div><div class="clear"><p>没有掌握的知识点</p><textarea></textarea></div><div class="clear"><p>学习心得</p><textarea></textarea></div><div class="clear"><p>个人反省</p><textarea></textarea></div><div class="clear"><p>个人建议</p><textarea></textarea></div></form></div><div class="modify_popup_bot" wid="-1"><a class="modify_popup_btn" style="margin-left:355px">保存</a><a class="modify_popup_btn" style="margin-left:20px">保存并关闭</a></div></div>');
			}else{
				$(document.body).append('<div class="modify_popup mes_popup"><span class="modify_popup_close"></span><div class="popup_title modify_popup_title">'+title+'</div><div class="popup_cont modify_popup_cont"><form><div class="clear"><p>研发人员</p><textarea></textarea></div><div class="clear"><p>项目名称</p><textarea></textarea></div><div class="clear"><p>项目简介</p><textarea></textarea></div><div class="clear"><p>遇到的问题</p><textarea></textarea></div><div class="clear"><p>解决方案</p><textarea></textarea></div><div class="clear"><p>研发进度</p><textarea></textarea></div><div class="clear"><p>总结</p><textarea></textarea></div><div class="clear"><p>个人建议</p><textarea></textarea></div></form></div><div class="modify_popup_bot" wid="-1"><a class="modify_popup_btn" style="margin-left:355px">保存</a><a class="modify_popup_btn" style="margin-left:20px">保存并关闭</a></div></div>');
			};
		};
		$(".weekly_popup").hide();
		mesPopupHeight();
	});
	$(".modify_popup_bot .modify_popup_btn").live("click",function(){
		if($(this).hasClass("gray")){
			return;
		};
		$(".modify_popup_btn").addClass("gray");
		$(this).addClass("on");
		if($(this).parent().attr("wid")=="-1"){
			LamaReqStudentSubmitWeekly();
		}else{
			LamaReqStudentSubBottonWeekly();
		};
	});
};

//关闭填写/修改周报弹框
var closeModifyPopup=function (){	
	$(".modify_popup_close").live("click",function (){
		$(this).parent().remove();	
		$(".weekly_popup").show();
	});	
	
};
//查看周报弹框
var seeWeeklyPopup=function (){
	$(".weekly_popup_cont div a").live("click",function (){
		var html='';
		var list;
		var t=$(this).parent();
		var info='';
		$.each(studentWeekly, function(i,v){
			if(v.weekly_Id==t.attr("wid")){
				list=v;
			};
		});
		if($(this).parent().attr("on")==0){
			if($(this).parent().attr("ctype")==1){
				info+='<div class="clear"><p>掌握的知识点</p><span>'+list.s_Knowledge+'</span></div>';
				info+='<div class="clear"><p>模糊不清的知识点</p><span>'+list.s_Mistiness+'</span></div>';
				info+='<div class="clear"><p>没有掌握的知识点</p><span>'+list.s_Nomaster+'</span></div>';
				info+='<div class="clear"><p>学习心得</p><span>'+list.s_Studynotes+'</span></div>';
				info+='<div class="clear"><p>个人反省</p><span>'+list.s_Reflection+'</span></div>';
				info+='<div class="clear"><p>个人建议</p><span>'+list.recommend+'</span></div>';
			}else if($(this).parent().attr("ctype")==2){
				info+='<div class="clear"><p>研发人员</p><span>'+list.p_Persons+'</span></div>';
				info+='<div class="clear"><p>项目名称</p><span>'+list.p_ProjectName+'</span></div>';
				info+='<div class="clear"><p>项目简介</p><span>'+list.p_Project+'</span></div>';
				info+='<div class="clear"><p>遇到的问题</p><span>'+list.p_Problem+'</span></div>';
				info+='<div class="clear"><p>解决方案</p><span>'+list.p_Solution+'</span></div>';
				info+='<div class="clear"><p>研发进度</p><span>'+list.p_Process+'</span></div>';
				info+='<div class="clear"><p>总结</p><span>'+list.p_Summary+'</span></div>';
				info+='<div class="clear"><p>个人建议</p><span>'+list.recommend+'</span></div>';
			};
			html='<div class="mes_popup seeweekly_popup"><span class="modify_popup_close"></span><div class="popup_title seeweekly_popup_title">'+$(this).parent().find("em").html()+'</div><div class="popup_cont seeweekly_popup_cont">'+info+'</div></div>';
		}else if($(this).parent().attr("on")==1){
			if($(this).parent().attr("ctype")==1){
				info+='<div class="clear"><p>掌握的知识点</p><textarea>'+list.s_Knowledge+'</textarea></div>';
				info+='<div class="clear"><p>模糊不清的知识点</p><textarea>'+list.s_Mistiness+'</textarea></div>';
				info+='<div class="clear"><p>没有掌握的知识点</p><textarea>'+list.s_Nomaster+'</textarea></div>';
				info+='<div class="clear"><p>学习心得</p><textarea>'+list.s_Studynotes+'</textarea></div>';
				info+='<div class="clear"><p>个人反省</p><textarea>'+list.s_Reflection+'</textarea></div>';
				info+='<div class="clear"><p>个人建议</p><textarea>'+list.recommend+'</textarea></div>';
			}else if($(this).parent().attr("ctype")==2){
				info+='<div class="clear"><p>研发人员</p><textarea>'+list.p_Persons+'</textarea></div>';
				info+='<div class="clear"><p>项目名称</p><textarea>'+list.p_ProjectName+'</textarea></div>';
				info+='<div class="clear"><p>项目简介</p><textarea>'+list.p_Project+'</textarea></div>';
				info+='<div class="clear"><p>遇到的问题</p><textarea>'+list.p_Problem+'</textarea></div>';
				info+='<div class="clear"><p>解决方案</p><textarea>'+list.p_Solution+'</textarea></div>';
				info+='<div class="clear"><p>研发进度</p><textarea>'+list.p_Process+'</textarea></div>';
				info+='<div class="clear"><p>总结</p><textarea>'+list.p_Summary+'</textarea></div>';
				info+='<div class="clear"><p>个人建议</p><textarea>'+list.recommend+'</textarea></div>';
			};
			html='<div class="modify_popup mes_popup" style="margin-top: -436.5px;"><span class="modify_popup_close"></span><div class="popup_title modify_popup_title">'+$(this).parent().find("em").html()+'</div><div class="popup_cont modify_popup_cont"><form>'+info+'</form></div><div class="modify_popup_bot" wid="'+list.weekly_Id+'"><a class="modify_popup_btn" style="margin-left:355px">保存</a><a class="modify_popup_btn" style="margin-left:20px">保存并关闭</a></div></div>';
		};
		$(".weekly_popup").hide();
		$(document.body).append(html);
		mesPopupHeight();
	});
};

//查看手册
var manualPopup=function (){
	$(".information_popup_cont_positon a.manual").live("click",function (){
		$(document.body).append('<div class="manual_popup mes_popup"><span class="manual_popup_close"></span><div class="popup_title manual_popup_title">学员手册</div><div class="popup_cont manual_popup_cont"><object id="objectCont" type="application/pdf" data="'+$(this).attr("adr")+'" width="100%" height="'+($(window).height()-200)+'" internalinstanceid="9"></object></div></div>');
		$(".mask").show();
		mesPopupHeight();
	});
	
	$(".information_popup_cont span.guan,.transparent").live("click",function(){
		$(".information_popup_cont").remove();
		$("#information").removeClass("on");
		$(".transparent").remove();
	});
//	$(".information_popup_cont_positon a.standard").live("click",function (){
//		$(".information_popup").hide();
//		$(document.body).append('<div class="standard_popup mes_popup"><span class="standard_popup_close"></span><div class="popup_title standard_popup_title">编程规范</div><div class="popup_cont standard_popup_cont"></div></div>');	
//		mesPopupHeight();
//	});	
};

//关闭手册
var closemanualPopup=function (){
	$(".manual_popup .manual_popup_close").live("click",function (){
		$(".information_popup").show();
		$(this).parent().remove();
		$('.mask').hide();
	});
//	$(".standard_popup .standard_popup_close").live("click",function (){
//		$(".information_popup").show();
//		$(this).parent().remove();
//	});	
};

//获取试卷弹框
var getThePapers=function (){
	$("#getExam").live("click",function (){
		if($("#getExam").hasClass("on")||$("#getExam").hasClass("lock")){
			return;
		};
		if(exam!=''){
			$(".mask").show();
			startTest();
			return;
		};
		LamaReqStuGainTestPaper();
	});	
};

//开始考试
var examConfirmation=function (){
//	$(".getthepapers").hide();
//	var html='<div class="examquestions"><div class="examquestions_title">第1题<span>1/10</span></div><div class="examquestions_time"><span class="countdown"></span><i class="countdown_time">10:45:10</i></div><div class="examquestions_cont"><p>人身上有些地方长痣代表有福气，但是有些却代表厄运。网曝一男子头上“福痣”被理发师剃破，医院检查后发现癌变的新闻引热议，该男子因祸得福救了自己一命太幸运了</p><ul><li><em></em>选择题答案A</li><li><em></em>选择题答案B</li><li><em></em>选择题答案C</li><li><em></em>选择题答案D</li></ul></div><div class="examquestions_bot"><a class="examquestions_btn">下一题</a></div></div>';
//	var closehtml='<span class="examquestions_close"></span>';
//	$(document.body).append(html);
//	$(document.body).append(closehtml);
	
	$(".examquestions_cont ul li").live("click",function (){
		$(".examquestions_cont ul li em").removeClass("on");
		$(this).find("em").addClass("on");
		$(".examquestions_bot a.examquestions_btn").removeClass("gray");
		if($(".topic").length>0){
			if(num>0){
				var one=new Array;
				var sel='';
				if($(".examquestions_cont ul li").length==2){
					switch ($(".examquestions_cont ul li em.on").parent().index()){
						case 0:
						sel="[T]"
						break;
						case 1:
						sel="[F]"
						break;
						default:
						sel="[]"
						break;
					};
				}else{
					switch ($(".examquestions_cont ul li em.on").parent().index()){
						case 0:
						sel="[A]"
						break;
						case 1:
						sel="[B]"
						break;
						case 2:
						sel="[C]"
						break;
						case 3:
						sel="[D]"
						break;
						default:
						sel="[]"
						break;
					};
				};
				one.push($(".examquestions_cont p").attr("id"),$(".examquestions_cont p").attr("kid"),sel);
				answer[num-1]=('['+one+']');
				$(".topic ul li").eq(num-1).addClass("on");
				if($(".topic ul li").length==$(".topic ul li.on").length){
					$(".examquestions_bot a").html("交卷");
				};
				if(num==exam.length&&$(".topic ul li.on").length!=$(".topic ul li").length){
					$(".examquestions_bot a.examquestions_btn").addClass("gray");
				};
			};
		};
	});
	
	$(".examquestions_bot a.examquestions_btn").live("click",function (){
		if($(".examquestions_bot a.examquestions_btn").hasClass("gray")){
			return;
		};
		if($(".topic").length>0){
			if($(".topic ul li").length==$(".topic ul li.on").length){
				LamaReqStudentsubPhaseanwer();
				return;
			};
			nextQuestions();
		}else{
			nextQuestion();
		};
	});
	
	$(".examquestions_close").live("click",function (){
		$(".examquestions").hide();
		$(".mask").hide();
		$(this).remove();
		$("#getExam").removeClass("on");
	});
	$(".topic ul li").live("click",function(){
		num=$(this).index();
		nextQuestions();
	});
};

//查看试卷
var generatingTestPaper=function (){	
	//第一次考试查看
	$("#knowledge .forknowledge_right div p").live("click",function (){
		if($(this).hasClass("on")||$(this).hasClass("noton")){			
		}else{
			var yiZid=$(this).attr("zid");
			var yiZt=$(this).attr("zt");
			LamaReqIsOkStuEndExamSite(yiZid,yiZt);
		}
	});
	
	
	//第二次考试查看
//	$("#knowledge .forknowledge_right div strong").live("click",function (){
//		if($(this).hasClass("on")||$(this).hasClass("noton")){			
//		}else{
//			var yiZid=$(this).attr("zid");
//			var yiZt=$(this).attr("zt");
//			LamaReqIsOkStuEndExamSite(yiZid,yiZt);
//			
////			$(this).addClass("on");
////			var html=$(this).parent().find("p").attr("tips");
////			var yiZid2=$(this).attr("zid");
////			var yiZt=$(this).attr("zt");
////			$("#content2 .testPaper").show();
////			$("#content2 .testPaper_top").append('<a href="javascript:;" zt="'+yiZt+'" zid="'+yiZid2+'" tips="'+html+'<i>（自考）</i>">'+html+'<i>（自考）</i><em></em></a>');
////			$("#content2 .testPaper_top a").removeClass("on");
////			$("#content2 .testPaper_top a:eq(0)").addClass("on");
////			$(".testPaper_cont:eq(0)").show();	
////			if($("#content2 .testPaper_top a").length<2){
////				$("#content2 .testPaper_top a").first().click();
////			};
////			ellipsis();				
////			schedule();
//		};		
//	});	
	
	//阶段已考查看
	$("#beenteststage .forknowledge_right p").live("click",function(){
		if($(this).hasClass("on")){
			return;
		};
		LamaReqStudentIsTimePhaseTest($(this).attr("zid"));
	});
	$("#forthestage .forknowledge_right p").live("click",function(){
		if(num>0){
			$(".examquestions").show();
			$(".mask").show();
			$(document.body).append('<span class="examquestions_close"></span>');
		}else{
			LamaReqStudentstartPhaseTest($(this).attr("zid"),$(this).attr("enter"));
		};
	});
};
//试卷按钮切换
var testPaperTab=function (){
	$("#content2 .testPaper_top a").live("click",function (){		
		if($(this).hasClass("on")){
			return;
		};
		$(".testPaper .testPaper_top a").removeClass("on");
		$(this).addClass("on");
		var eid=$(this).attr("zid");
		var stat=$(this).attr("zt");
		LamaReqStuEndExamSite(eid,stat);
	});
	$("#content3 .testPaper_top a").live("click",function (){		
		if($(this).hasClass("on")){
			return;
		};
		$(".testPaper .testPaper_top a").removeClass("on");
		$(this).addClass("on");
		var eid=$(this).attr("zid");
		LamaReqStudentEndPhaseTest(eid);
	});
	
	//添加删除试卷按钮
	$(".testPaper .testPaper_top a").live("mouseenter",function (){
		var number=$(".testPaper_top a").index(this);
		$(this).find("em").show();
	});
	
	$(".testPaper .testPaper_top a").live("mouseleave",function (){
		$(this).find("em").hide();
	});	
};

//删除试卷
var deleteTestPaper=function (){
	$(".testPaper .testPaper_top a em").live("click",function (i){
		var id=$(this).parent().attr("zid");
		if($(this).parent().attr("zt")=="0"){
			$(this).parent().remove();
			$("#forknowledge .forknowledge_right div p[zid="+id+"]").removeClass("on");	
		} 
		if($(this).parent().attr("zt")=="1"){
			$(this).parent().remove();
			if($(".subnavigation_right li.on").attr("id")=="zsdks"){
				$("#knowledge .forknowledge_right div p[zid="+id+"]").removeClass("on");	
			}else{
				$("#beenteststage .forknowledge_right div p[zid="+id+"]").removeClass("on");	
			};
		};
			
		if($(".testPaper_top a").length<1){
			$(".testPaper").hide();
			$(".paper_cont").html('<div class="paper_bot">请选择试卷</div>');
			$(".seatingchartbei_cont").empty();
		}else{
			$("#content2 .testPaper").show();
			$(".testPaper_top a").first().click();
		};
		$(".tips").remove();
		i.stopPropagation();
		schedule();//课程进度宽度
		textPosition();//进度条下面文字位置
	});			
};
//成绩汇总弹窗
var resultSummary=function (){
	$(".courseware .selcourse_top a").live("click",function (){
		if($(this).hasClass("gray")){
			return;
		};
		if($(".subnavigation_right li.on").attr("id")=="zsdks"){
			LamaReqStudentKnowAll();
		}else if($(".subnavigation_right li.on").attr("id")=="jdks"){
			LamaReqStudentPhaseTestAll();
		};
		
	});	
	
};

//折线图
function lineChart(x,y1,y2) {
    var ctx = document.getElementById("sales-volume-chart").getContext("2d");
    var data = {
        labels: x,
        datasets: [
		{
            label: "",
            fillColor: "transparent",
            strokeColor: "#4a9cde",
            pointColor: "#ffffff",
            pointStrokeColor: "#4a9cde",
            pointHighlightFill: "#4a9cde",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: y1
        },
		{
            label: "",
            fillColor: "transparent",
            strokeColor: "#f06589",
            pointColor: "#ffffff",
            pointStrokeColor: "#f06589",
            pointHighlightFill: "#f06589",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: y2
        }
		
		]
    };    
	//var salesVolumeCharts = new Chart(ctx).Line(data1);
    var salesVolumeChart= new Chart(ctx).Line(data, {
         // 小提示的圆角
            // tooltipCornerRadius: 0,
            // 折线的曲线过渡，0是直线，默认0.4是曲线
            bezierCurveTension: 0,
            // bezierCurveTension: 0.4,
            // 关闭曲线功能
            bezierCurve: false,
            // 背景表格显示
            // scaleShowGridLines : false,
            // 点击的小提示
            tooltipTemplate: "<%if (label){%><%=label%> 分数：<%}%><%= value %>分",
            //自定义背景小方格、y轴每个格子的单位、起始坐标
            scaleOverride: true,
            scaleSteps: 5,
            // scaleStepWidth: Math.ceil(Math.max.apply(null,data.datasets[0].data) / 0.1),
            scaleStepWidth: 20,
            scaleStartValue: 0
    });
}

var sliderRuler=function (x){
	$(".timeline").html('<div class="slider"><div class="gun left"></div><div class="gun right"></div></div>');
	var max=114,
		b=Math.ceil(x/max),
		g=Math.floor(x/b),
		w=($(".timeline").width()/(g+1))-2,
		html='';
	for(var i=0;i<g;i++){
		html+="<span style='width:"+w+"px'></span>";
	};
	html+="<br class='cle'/>";
	$(".timeline").append(html);
	//计算折线图和滑块的宽度
	if(x<=10){
		$(".slider").width($(".timeline").width());
		$(".container").width($(".chart").width());
	}else{
		$(".slider").width(10/x*$(".timeline").width());
		$(".container").width(x*120);
	};
	//$(".detailsRight").height($(".detailsRight table").height());
};

var slider=function (x){
	var lock=false;
	var s="";
	
	//计算折线图和滑块的宽度
	$(".timeline .slider").live("mousedown",function(e){
		lock=true;
		s=e.clientX-$(".timeline .slider").offset().left;
	});
	$(document.body).bind("mouseup mouseleave",function(){
		lock=false;
	});
	$(document.body).live("mousemove",function(e){
		e=window.event||e;
		if(lock==true){
			var l=e.clientX-$(".timeline").offset().left-s;
			if(l<=0){
				l=0;
			}else if(l>=$(".timeline").width()-$(".slider").width()){
				l=$(".timeline").width()-$(".slider").width();
			};
			var bl=-l/($(".timeline").width()-$(".slider").width())*($(".container").width()-$(".chart").width());
			var bb=-l/($(".timeline").width()-$(".slider").width())*($(".detailsRight table").width()-$(".detailsRight").width());
			$(".timeline .slider").css("left",l+"px");
			$(".container").css("left",bl+"px");
			$(".detailsRight table").css("left",bb+"px");
		};
	});
};

//知识点增加省略号
var ellipsis=function(){
	var self = $(".forknowledge_right div p");  
    self.each(function(){  
        var objString = $(this).text();  
        var objLength = $(this).text().length;
        if(objLength > 10){
            objString = $(this).text(objString.substring(0,9) + "...");  
        }  
    })
	
	var selfa = $(".testPaper_top a");  
    selfa.each(function(){  
        var objString = $(this).text();  
        var objLength = $(this).text().length;
        if(objLength > 10){
            objString = $(this).html(objString.substring(0,9) + "...<em></em>");  
        }  
    })
};

//学生打分选项
(function(){
	$(".single").live("click",function(){
		$.each($(this).parents(), function() {
			if($(this).find(".single").length>1){
				$(this).find(".single").removeClass("on");
				return false;
			};
		});
		$(this).addClass("on");
	});
	$(".check").live("click",function(){
		$(this).addClass("on");
	});
})(jQuery);
