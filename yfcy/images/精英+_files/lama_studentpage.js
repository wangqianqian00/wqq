$(function(){
	LamaReqSystemoperation(); //系统权限
    requestStudentInfo();
//	requestLoopTop();
});
var load='<div class="log"><img src="img/loading22.gif" /><span>正在加载中...</span></div>';
//var classid=$.getUrlVar('cid');
var classid=window.location.href.split("?");
	classid=classid[1];
var studentid='';
//请求权限
function LamaReqSystemoperation(){
	if(!classid){
		window.location.href="http://plus.jingyingba.com?isout=1";
	};
	var data = {'isAjaxDebug':isAjaxDebug, 'filePath':'/OA_UP/teaching.html', 'flag':'Systemoperation','classid':classid};
	LamaRequest(interfaceUrl, data);
};
function LamaResSystemoperation(){
	LamaReqStudentClassOption();
};
function LamaBeforeSystemoperation(){
	$(".common").hide();
	$(document.body).append('<img src="img/loading22.gif" id="loading" />');
};
function LamaErrSystemoperation(d,c){
	prompt(c);
};
//班级进度信息
function LamaReqStudentClassOption(){
	var data = {'isAjaxDebug':isAjaxDebug, 'filePath':window.location.pathname, 'flag':'StudentClassOption','classid':classid};
	LamaRequest(interfaceUrl, data);
};
function LamaBeforeStudentClassOption(){
	$(".schedule_cont").append(load);
};
function LamaResStudentClassOption(d,c){
	$("#loading").remove();
	var html='';
	$.each(c.data.data,function(i,v){
		if(v.list&&v.list.length>0){
			var at="";
			$.each(v.list,function(n,a){
				if(a.process_Status==null){
					a.process_Status="0";
				};
				if(a.user_Id==null){
					a.user_Id="0";
				};
				if(a.user_Id!=0&&a.process_Status==1){
					at+='<a class="green active" did="'+a.detail_Id+'" yes="'+a.yestest+'"  no="'+a.notest+'" stat="'+a.process_Status+'" tips="'+a.detail_Title+'" uid="'+a.user_Id+'" js="'+a.user_Name+'"><i>'+(n+1)+'</i><span class="span1"></span></a>'; //下课
				}else if(a.user_Id!=0&&a.process_Status==0){  //上课
					at+='<a class="blue active" did="'+a.detail_Id+'" yes="'+a.yestest+'"  no="'+a.notest+'" stat="'+a.process_Status+'" tips="'+a.detail_Title+'" uid="'+a.user_Id+'" js="'+a.user_Name+'"><i>'+(n+1)+'</i><span class="span1"></span></a>';
				}else if(a.user_Id==0&&a.process_Status==0&&a.open_Ware==1){  //没上课课件未开放
					at+='<a class="grey" did="'+a.detail_Id+'" yes="'+a.yestest+'"  no="'+a.notest+'" stat="'+a.process_Status+'" tips="'+a.detail_Title+'" uid="'+a.user_Id+'" js="'+a.user_Name+'"><i>'+(n+1)+'</i></a>';
				}else if(a.user_Id==0&&a.process_Status==0&&a.open_Ware==0){  //没上课课件开放
					at+='<a class="grey active" did="'+a.detail_Id+'" yes="'+a.yestest+'"  no="'+a.notest+'" stat="'+a.process_Status+'" tips="'+a.detail_Title+'" uid="'+a.user_Id+'" js="'+a.user_Name+'"><i>'+(n+1)+'</i><span class="span1"></span></a>';
				};
			});
			html+='<div class="class" on="'+v.on+'" jd="'+v.course_Type+'" ct="'+v.ctypes+'" day="'+v.list.length+'" tips="'+v.course_Name+'" cid="'+v.course_Id+'">'+at+'<em class="refreshbut"></em></div>';
			$(".classProgress_bottom").append("<p on='"+v.on+"' cid='"+v.course_Id+"' uid='"+v.list[0].user_Id+"'><span>"+v.course_Name+"</span></p>");
		};
	});
	$(".schedule_cont").html(html);
	if($(".schedule_cont .class a[stat=0]")){
		$(".schedule_cont .class a[stat=0]").first().append("<em class='em1'></em>");
		var jd=$(".schedule_cont .class a[stat=0]").parent().attr("jd");
		$(".Weekly_template").html(jd);
	}else{
		$(".schedule_cont .class a").last().append("<em class='em1'></em>");
	};
	var js=$("em.em1").parent().attr("js");
	if(typeof(js)=="undefined"){
		js="<i style='color:#rgba(255,255,255,0.5)'>暂无讲师</i>";
		//$(".navhead_left").html("<span>班级："+c.data.class_Name+"</span><em></em><span id='lecturer'>当前技术讲师：</span><em></em><span id='mentor' planteachid='"+c.data.planuser_Id+"'>职业规划老师："+c.data.planteacher+"</span>");
	};
	if(typeof(c.data.planteacher)=="undefined"||c.data.planteacher==null){
		c.data.planteacher="<i style='color:#rgba(255,255,255,0.5)'>暂无职业规划师</i>";
	};
	$(".navhead_left").html("<div class='logo'><img src='img/logo-nav.png' /></div><span>班级："+c.data.class_Name+"</span><em></em><span id='lecturer'>当前技术讲师："+js+"</span><em></em><span id='mentor' planteachid='"+c.data.planuser_Id+"'>职业规划老师："+c.data.planteacher+"</span>");
	$("#loading").remove();
	$(".common").show();
	scheduleCont();//进度条
	schedule();//课程进度宽度
	textPosition();//进度条下面文字位置
	
	var name=$(".schedule_cont .class a em").parent().parent().attr("cid");
	$(".classProgress_bottom p[cid="+name+"]").click();
	LamaReqStudentSubmitplanteach();
};
function LamaErrStudentClassOption(d,c){
	$("#loading").remove();
	$(".log").remove();
	prompt(c);
};
//查看课件
function LamaReqStudentWareTeach(){
	var cid=$("em.em1").parent().parent().attr("cid");
	var sid=$("em.em1").parent().attr("did");
	var data = {'isAjaxDebug':isAjaxDebug, 'filePath':window.location.pathname, 'flag':'StudentWareTeach','classid':classid,'courseid':cid,'subjectid':sid};
	LamaRequest(interfaceUrl, data);
};
function LamaBeforeStudentWareTeach(){
	$(".courseware").show();
	$("#content0 .courseware_center").html("<div class='log'><img src='img/loading22.gif'><span>loading...</span></div>");
};
function LamaResStudentWareTeach(d,c){
	if(c.wareurl=="-1"){
		$("#content0 .courseware_center").html('<p>该单元暂无课件</p>');
		$("#content0 .courseware_button").hide();
	}else{
		$("#content0 .courseware_center").html('<p><object id="objectCont" type="application/pdf" data="'+c.wareurl+'" width="100%" height="768"></object></p>');
		$("#content0 .courseware_button").show();
	};
	schedule();//课程进度宽度
	textPosition();//进度条下面文字位置
};
function LamaErrStudentWareTeach(d,c){
	$(".log").remove();
	prompt(c);
};
//查看作业
function LamaReqStudentClassWork(){
	var cid=$("em.em1").parent().parent().attr("cid");
	var sid=$("em.em1").parent().attr("did");
	var data = {'isAjaxDebug':isAjaxDebug, 'filePath':window.location.pathname, 'flag':'StudentClassWork','classid':classid,'courseid':cid,'subjectid':sid};
	LamaRequest(interfaceUrl, data);
};
function LamaBeforeStudentClassWork(d,c){
	$(".courseware").show();
	$("#content1 .courseware_center").html("<div class='log'><img src='img/loading22.gif'><span>loading...</span></div>");
	//$(".jobseatingchart").html("<div class='log'><img src='img/loading22.gif'><span>loading...</span></div>");
};
function LamaResStudentClassWork(d,c){
	if(c.data.wareurl==''){
 		$("#courseware1 .courseware_center").html('<p>该单元暂无作业</p>');
		$("#courseware1 .courseware_button").hide();
 	}else{
 		$("#courseware1 .courseware_center").html('<p><object id="objectCont1" type="application/pdf" data="'+c.data.wareurl+'" width="100%" height="768" internalinstanceid="4"></object></p>');
		$("#courseware1 .courseware_button").show();
 	};
	var html='';
	$.each(c.data.comment, function(i,v) {
		html+='<li tid="'+v.contentid+'"><span></span><em>'+v.evetime+'</em><p>'+v.stucontent+'</p></li>';
		if(v.on==1){
			$(".clickalike_right span").addClass("on");
		};
	});
	$(".clickalike_left").html("<ul>"+html+"</ul>");
	if(c.data.comment.length==0){
		$(".clickalike").hide();
	}else{
		$(".clickalike").show();
	};
	schedule();//课程进度宽度
	textPosition();//进度条下面文字位置
};
function LamaErrStudentClassWork(d,c){
	prompt(c);
	$("#content1 .courseware_center").html("<p>该单元暂无作业</p>");
	//$(".jobseatingchart").html("<p>暂无数据</p>");
};

//学生点赞
function LamaReqStudentThumbUp(){
	if($(".clickalike_right span").hasClass("on")||$(".clickalike_left ul").html()==""){
		return;
	};
	var pid=$(".clickalike_left ul li").first().attr("tid");
	var sid=$("em.em1").parent().attr("did");
	var data = {'isAjaxDebug':isAjaxDebug, 'filePath':window.location.pathname, 'flag':'StudentThumbUp','classid':classid,'subjectid':sid,'evaluateid':pid};
	LamaRequest(interfaceUrl, data);
};
function LamaResStudentThumbUp(d,c){
	$(".clickalike_right span").addClass("on");
};
function LamaErrStudentThumbUp(d,c){
	$(".clickalike_right span").removeClass("on");
	prompt(c);
};
//知识点考试
function LamaReqstudentExamSite(){
	$("#knowledge").show();
	//$("#content2 .testPaper").show();
	//var cid=$("em.em1").parent().parent().attr("cid");
	var sid=$("em.em1").parent().attr("did");
	var data = {'isAjaxDebug':isAjaxDebug, 'filePath':window.location.pathname, 'flag':'studentExamSite','classid':classid,'subjectid':sid};
	LamaRequest(interfaceUrl, data);
};
function LamaBeforestudentExamSite(d,c){
	//$("#content2 .testPaper").show();
	$(".courseware").show();
	$("#content2 .paper_cont").html(load);
};
function LamaResstudentExamSite(d,c){
	var html='';
	$("#content2 .paper_cont").html('<div class="paper_bot">请选择试卷</div>');
	if(c.data.alreadyknow.length>0){
		$.each(c.data.alreadyknow,function(i,v){
			html+='<div><p tips="'+v.name+'" zt="'+v.state+'" zid="'+v.id+'">'+cutString(v.name)+'</p></div>';
			
		});
	};
	$("#knowledge .forknowledge_right").html(html);
	html='';
	if(c.data.notknow.length>0){
		$.each(c.data.notknow,function(i,v){
			html+='<div><p zt="0" zid="'+v.id+'" class="active" tips="'+v.name+'">'+cutString(v.name)+'</p></div>';
		});
		$("#forknowledge .forknowledge_right").html(html);
	}else{
		if(c.data.alreadyknow.length==0){
			html='<p class="error">该单元暂无知识点考试</p>';
			$(".forknowledge").hide();
			$("#content2 .courseware").append(html);
		};
	};
	$("em.em1").parent().attr({"yes":c.data.alreadyknow.length,"no":c.data.notknow.length});
	schedule();//课程进度宽度
	textPosition();//进度条下面文字位置
};
function LamaErrstudentExamSite(d,c){
	$(".log").remove();
	prompt(c);
};
//判断已考试卷能否查看
function LamaReqIsOkStuEndExamSite(eid,stat){
	var cid=$("em.em1").parent().parent().attr("cid");
	var did=$("em.em1").parent().attr("did");
	var data = {'isAjaxDebug':isAjaxDebug, 'filePath':window.location.pathname,'flag':'IsOkStuEndExamSite','classid':classid,'courseid':cid,'subjectid':did,'examid':eid,'state':stat};
	LamaRequest(interfaceUrl, data);
};

function LamaResIsOkStuEndExamSite(d,c){
	var me=$("#knowledge .forknowledge_right div p[zid="+c.data.examid+"]");
	var html=me.parent().find("p").attr("tips");
	var yiZid=me.attr("zid");
	var yiZt=me.attr("zt");
	me.addClass("on");
	$("#content2 .testPaper").show();
	$("#content2 .testPaper_top").append('<a href="javascript:;" zt="'+yiZt+'" zid="'+yiZid+'" tips="'+html+'">'+cutString(html,20)+'<em></em></a>');
	if($("#content2 .testPaper_top a").length<2){
		$("#content2 .testPaper_top a").first().click();
	};
	schedule();	
};
function LamaErrIsOkStuEndExamSite(d,c){
	prompt(c);
};
//查看已考试卷
function LamaReqStuEndExamSite(eid,stat){
	clearWin();
	$("#content2 .testPaper").show();
	var cid=$("em.em1").parent().parent().attr("cid");
	var did=$("em.em1").parent().attr("did");
	var data = {'isAjaxDebug':isAjaxDebug, 'filePath':window.location.pathname, 'flag':'StuEndExamSite','classid':classid,'courseid':cid,'subjectid':did,'examid':eid,'state':stat};
	LamaRequest(interfaceUrl, data);
};
function LamaBeforeStuEndExamSite(d,c){
	$("#content2 .paper_cont").html(load);
};
function LamaResStuEndExamSite(d,c){
	html='';
	$.each(c.data.libexam, function(i,v){
		var da='';
		var dui='';
		if(v.lib_Answer=="A"||v.lib_Answer=="T"){
			dui=0;
		}else if(v.lib_Answer=="B"||v.lib_Answer=="F"){
			dui=1;
		}else if(v.lib_Answer=="C"){
			dui=2;
		}else if(v.lib_Answer=="D"){
			dui=3;
		};
		$.each(v.lib_Question, function(n,a) {
			if(dui==n){
				da+='<li class="on"><em></em>'+a+'</li>';
			}else{
				da+='<li><em></em>'+a+'</li>';
			};
		});
		if(v.lib_Question.length==2){
			html+='<div class="checkthepapers_cont" tid="'+v.id+'" kid="'+v.knowledge_Id+'"><p>'+(i+1)+'. '+v.lib_Subject+'</p><ul class="judgment">'+da+'</ul></div>';
		}else{
			html+='<div class="checkthepapers_cont" tid="'+v.id+'" kid="'+v.knowledge_Id+'"><p>'+(i+1)+'. '+v.lib_Subject+'</p><ul>'+da+'</ul></div>';
		};
	});
	var len=c.data.libexam.length;
	html='<div class="checkthepapers"><div class="checkthepapers_position"><span><em>得分：'+c.data.data.stuscore+'分</em> 计时'+(len*c.sec)+'秒/共'+len+'题</span><span><i class="on1"></i>正确答案</span><span><i class="on2"></i>错误答案</span></div>'+html+'</div>';
	$("#content2 .paper_cont").html(html);
	$(".seatingchartbei").show();
	$("#content2 .testPaper");
	var da=c.data.data.stuAnswer.split(",");
	$.each(da, function(i,v) {
		var dui='';
		if(v=="[A]"||v=="[T]"){
			dui=0;
		}else if(v=="[B]"||v=="[F]"){
			dui=1;
		}else if(v=="[C]"){
			dui=2;
		}else if(v=="[D]"){
			dui=3;
		}else if(v=="[]"){
			dui=3000;
		};
		$(".checkthepapers .checkthepapers_cont").eq(i).find("ul li em").eq(dui).addClass("on");
		$(".checkthepapers .checkthepapers_cont").eq(i).find("ul li").eq(dui).addClass("redon");
	});
	schedule();//课程进度宽度
	textPosition();//进度条下面文字位置
};
function LamaErrStuEndExamSite(d,c){
	prompt(c);
	$("#content2 .paper_cont").html(c);
};
//获取试卷
var exam=new Array;
var num=0;
var time='';
var answer=new Array;
var going;
var le=15;
var wi=0;
var countdown='';
var minute='00';
var second='00';
var seconds='00';
var now='';
var lave='';
function LamaReqStuGainTestPaper(){
	var cid=$(".classProgress_bottom span.on").parent().attr("cid");
	var did=$("em.em1").parent().attr("did");
	if(!did){
		did="-1";
	};
	var data = {'isAjaxDebug':isAjaxDebug, 'filePath':window.location.pathname, 'flag':'StuGainTestPaper','classid':classid,'courseid':cid,'subjectid':did};
	LamaRequest(interfaceUrl, data);
};
function LamaResStuGainTestPaper(d,c){
	$(".mask").show();
	var html='<div class="getthepapers"><div class="getthepapers_title">提示</div><div class="getthepapers_cont">试卷已下发，请在规定时间内完成考试。<br />点击确认开始答题</div><div class="getthepapers_bot"><a class="getthepapers_btn" onclick="startTest()">确认</a></div></div>';
	$(document.body).append(html);
	$.each(c.data, function(i,v){
		$.each(v, function(n,a) {
			exam.push(a);
		});
	});
	exam.sort(function(){ return 0.5 - Math.random() });
	time=exam.length*c.sec*1000;
	if(Math.floor(time/60000)<10){
		minute='0'+Math.floor(time/60000);
	}else{
		minute=Math.floor(time/60000);
	};
	if(Math.floor((time%60000)/1000)<10){
		second='0'+Math.floor((time%60000)/1000);
	}else{
		second=Math.floor((time%60000)/1000);
	};
};
function LamaBeforeStuGainTestPaper(d,c){
	$("#getExam").addClass("on");
};
function LamaErrStuGainTestPaper(d,c){
	$("#getExam").removeClass("on");
	prompt(c);
};
//定时器
function setSchedule(){
	$(".countdown_time").css("left",le+"px");
	$(".countdown").css("width",wi+"%");
	countdown=minute+":"+second+":"+seconds;
	going=setInterval(function(){
		setCountdown();
		le=((time-lave)/time)*720+15;
		wi=((le-15)/720)*100;
		$(".countdown_time").stop().animate({'left':le},10);
		$(".countdown").stop().animate({'width':wi+"%"},10);
		$(".countdown_time").html(countdown);
	},10);
};
function setCountdown(){
	var ts = new Date() - now;
	lave=time-ts;
	if(Math.floor((lave/1000/60%60)<10)){
		minute='0'+Math.floor(lave/1000/60%60);
	}else{
		minute=Math.floor(lave/1000/60%60);
	};
	if(Math.floor((lave/1000%60)<10)){
		second='0'+Math.floor(lave/1000%60);
	}else{
		second=Math.floor(lave/1000%60);
	};
	seconds=Math.floor(String(lave).substring(String(lave).length-3,String(lave).length-1));
	if(Number(seconds)<10){
		seconds='0'+seconds;
	};
	if(lave<=0||le>=735){
		window.clearInterval(going);
		$(".countdown_time").css("left","735px");
		$(".countdown").css("width","100%");
		$(".countdown_time").html("00:00:00");
		if($(".topic").length<1){
			recordingAnswer();
			LamaReqStudenTexaManSwer();
		}else{
			LamaReqStudentsubPhaseanwer();
		};
		return;
	};
	countdown=minute+":"+second+":"+seconds;
};
//开始考试
function startTest(){
	$(".getthepapers").hide();
	$(".examquestions").remove();
	var html='<div class="examquestions popup_wrap"><div class="examquestions_title popup_title"></div><div class="examquestions_time"><span class="countdown"></span><i class="countdown_time"></i></div><div class="examquestions_cont popup_cont"></div><div class="examquestions_bot"><a class="examquestions_btn">下一题</a></div></div>';
	var closehtml='<span class="examquestions_close"></span>';
	$(document.body).append(html);
	$(document.body).append(closehtml);
	$(".examquestions_bot a.examquestions_btn").addClass("gray");
	if(num!=0){
		num=num-1;
		nextQuestion();
		$(".countdown_time").css("left",le+"px");
		$(".countdown").css("width",wi+"%");
		countdown=minute+":"+second+":"+seconds;
		checkPapersWk();
		return;
	};
	now=new Date();
	nextQuestion();
	setSchedule();
	checkPapersWk();
};
//下一题
function nextQuestion(){
	if(num==exam.length-1){
		$(".examquestions_bot a").html("交卷");
	};
	recordingAnswer();
	if(num==exam.length){
		LamaReqStudenTexaManSwer();
		return;
	};
	var e=exam[num];
	var da='';
	$.each(e.lib_Question, function(i,v) {
		da+='<li><em></em><span>'+v+'</span></li>';
	});
	if(e.lib_Question.length==2){
		da='<ul class="judgment">'+da+'</ul>';
	}else{
		da='<ul>'+da+'</ul>';
	};
	$(".examquestions_cont").html('<p id="'+e.id+'" kid="'+e.knowledge_Id+'" statid="'+e.knowexam_Status+'" sid="'+e.subid+'">'+e.lib_Subject+'</p>'+da);
	$(".examquestions_title").html('第'+(num+1)+'题<span>'+(num+1)+'/'+exam.length+'</span>');
	num++;
	$(".examquestions_bot a.examquestions_btn").addClass("gray");
};
//记录学生答案
function recordingAnswer(){
	if($(".examquestions_cont p").length<1||num>exam.length){
		return;
	};
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
		answer.push('['+one+']');
	};
};
//交卷
function LamaReqStudenTexaManSwer(){
	if(answer.length!=exam.length){
		$.each(exam,function(i,v) {
			if(i>num-1){
				answer.push('['+v.id+','+v.knowledge_Id+',[]]');
			};
		});
	};
	var stat=$(".examquestions_cont p").attr("statid");
//	var cid=$("em.em1").parent().parent().attr("cid");
	var did=$(".examquestions_cont p").attr("sid");
	var data = {'isAjaxDebug':isAjaxDebug, 'filePath':window.location.pathname, 'flag':'StudenTexaManSwer','classid':classid,'subjectid':did,'answer':answer,'studentid':studentid,'state':stat};
	LamaRequest(interfaceUrl, data);
};
function LamaBeforeStudenTexaManSwer(d,c){
	$(".examquestions_bot a.examquestions_btn").addClass("gray");
	$(".examquestions_bot p").remove();
};
function LamaResStudenTexaManSwer(d,c){
	clearExam();
	prompt("提交成功");
	$(".classProgress_bottom p[cid="+c.data.courseid+"]").click();
	$(".schedule_cont .class a[did="+c.data.subjectid+"]").removeClass("grey").addClass("blue active").append('<span class="span1"></span>').click();
	$(".subnavigation_right li#zsdks").removeClass("on").click();
};
function LamaErrStudenTexaManSwer(d,c){
	$(".examquestions_btn").removeClass("gray");
	if(c=="-1"){
		clearExam();
		prompt("该知识点考试已结束，无法提交");
	}else{
		$(".examquestions_bot").append("<p>"+c+"</p>");
	};
};
function clearExam(){
	window.clearInterval(going);
	num=0;
	exam=new Array;
	answer=new Array;
	le=15;
	wi=0;
	countdown='';
	minute='00';
	second='00';
	seconds='00';
	$('.examquestions_close').click();
	$(".examquestions").remove();
};
//阶段考试列表
function LamaReqStudenPhaseTest(){
	var data = {'isAjaxDebug':isAjaxDebug, 'filePath':window.location.pathname, 'flag':'StudenPhaseTest','classid':classid};
	LamaRequest(interfaceUrl, data);
};
function LamaBeforeStudenPhaseTest(d,c){
	$(".courseware").show();
	$("#content3 .paper_cont").html(load);
};
function LamaResStudenPhaseTest(d,c){
	$("#content3 .paper_cont").html('<div class="paper_bot">请生成试卷</div>');
	var html='';
	if(c.data.alreadyPhase.length>0){
		$.each(c.data.alreadyPhase,function(i,v){
			html+='<div><p style="width:auto;" zt="1" zid="'+v.classexam_Id+'" tips="'+v.name+'">'+cutString(v.name)+'</p><em>('+v.fs+'分)</em></div>';
		});
	};
	$("#beenteststage .forknowledge_right").html(html);
	html='';
	if(c.data.notPhase.length>0){
		$.each(c.data.notPhase,function(i,v){
			html+='<div><p zt="0" zid="'+v.id+'" tips="'+v.name+'" enter="'+v.exam_IsEntrance+'">'+cutString(v.name)+'</p></div>';
		});
	};
	$("#forthestage .forknowledge_right").html(html);
	schedule();//课程进度宽度
	textPosition();//进度条下面文字位置
};
function LamaErrStudenPhaseTest(d,c){
	$(".log").remove();
	prompt(c);
};
//查看已考阶段是否可以查看
function LamaReqStudentIsTimePhaseTest(eid){
	var data = {'isAjaxDebug':isAjaxDebug, 'filePath':window.location.pathname, 'flag':'StudentIsTimePhaseTest','classid':classid,'classexam_Id':eid};
	LamaRequest(interfaceUrl, data);
};
function LamaResStudentIsTimePhaseTest(d,c){
	var t=$("#beenteststage .forknowledge_right p[zid="+c.data+"]");
	t.addClass("on");
	var html=t.parent().find("p").attr("tips");
	var yiZid2=t.attr("zid");
	var yiZt=t.attr("zt");
	$("#content3 .testPaper").show();
	$("#content3 .testPaper_top").append('<a href="javascript:;" zt="'+yiZt+'" zid="'+yiZid2+'" tips="'+html+'">'+cutString(html,20)+'<em></em></a>');
	if($("#content3 .testPaper_top a").length<2){
		$("#content3 .testPaper_top a").first().click();
	};
	//ellipsis();				
	schedule();
};
function LamaErrStudentIsTimePhaseTest(d,c){
	prompt(c);
};
//查看已考阶段
function LamaReqStudentEndPhaseTest(eid){
	var data = {'isAjaxDebug':isAjaxDebug, 'filePath':window.location.pathname, 'flag':'StudentEndPhaseTest','classid':classid,'classexam_Id':eid};
	LamaRequest(interfaceUrl, data);
};
function LamaBeforeStudentEndPhaseTest(){
	$(".paper_cont").html(load);
	schedule();//课程进度宽度
	textPosition();//进度条下面文字位置
};
function LamaResStudentEndPhaseTest(d,c){
	html='';
	c.data.examlibs.sel=c.data.examlibs.sel.concat(c.data.examlibs.jud);
	$.each(c.data.examlibs.sel, function(i,v){
		var da='';
		var dui='';
		if(v.lib_Answer=="A"||v.lib_Answer=="T"){
			dui=0;
		}else if(v.lib_Answer=="B"||v.lib_Answer=="F"){
			dui=1;
		}else if(v.lib_Answer=="C"){
			dui=2;
		}else if(v.lib_Answer=="D"){
			dui=3;
		};
		$.each(v.lib_Question, function(n,a) {
			if(dui==n){
				da+='<li class="on"><em></em>'+a+'</li>';
			}else{
				da+='<li><em></em>'+a+'</li>';
			};
		});
		if(v.lib_Question.length==2){
			html+='<div class="checkthepapers_cont" tid="'+v.id+'" kid="'+v.knowledge_Id+'"><p>'+(i+1)+'. '+v.lib_Subject+'</p><ul class="judgment">'+da+'</ul></div>';
		}else{
			html+='<div class="checkthepapers_cont" tid="'+v.id+'" kid="'+v.knowledge_Id+'"><p>'+(i+1)+'. '+v.lib_Subject+'</p><ul>'+da+'</ul></div>';
		};
	});
	var len=c.data.examlibs.sel.length;
	html='<div class="checkthepapers"><div class="checkthepapers_position"><span><em>成绩：'+c.data.answer.result_Credit+'分</em>/共'+len+'题，判断题'+c.data.examlibs.other.judum+'道，每道'+c.data.examlibs.other.judAnswer+'分，选择题'+c.data.examlibs.other.selum+'道，每道'+c.data.examlibs.other.selAnswer+'分</span><span><i class="on1"></i>正确答案</span><span><i class="on2"></i>错误答案</span></div>'+html+'</div>';
	$("#content3 .paper_cont").html(html);
	$(".seatingchartbei").show();
	$("#content3 .testPaper");
	c.data.answer.result_Select=c.data.answer.result_Select.concat(c.data.answer.result_Judge);
	var da=c.data.answer.result_Select.split(";");
	$.each(da, function(i,v) {
		var dui='';
		if(v=="A"||v=="T"){
			dui=0;
		}else if(v=="B"||v=="F"){
			dui=1;
		}else if(v=="C"){
			dui=2;
		}else if(v=="D"){
			dui=3;
		}else if(v==""){
			dui=3000;
		};
		$(".checkthepapers .checkthepapers_cont").eq(i).find("ul li em").eq(dui).addClass("on");
		$(".checkthepapers .checkthepapers_cont").eq(i).find("ul li").eq(dui).addClass("redon");
	});
	schedule();//课程进度宽度
	textPosition();//进度条下面文字位置
};
function LamaErrStudentEndPhaseTest(d,c){
	$(".log").remove();
	prompt(c);
};
//待考阶段获取试卷
function LamaReqStudentstartPhaseTest(eid,enter){
	var data = {'isAjaxDebug':isAjaxDebug, 'filePath':window.location.pathname, 'flag':'StudentstartPhaseTest','classid':classid,'examid':eid,'isEntrance':enter};
	LamaRequest(interfaceUrl, data);
};
var sellen
function LamaResStudentstartPhaseTest(d,c){
	$(".mask").show();
	var html='<div class="getthepapers"><div class="getthepapers_title">提示</div><div class="getthepapers_cont">试卷已下发，请在规定时间内完成考试，点击确认开始答题</div><div class="getthepapers_bot"><a class="getthepapers_btn" onclick="startTests()">确认</a></div></div>';
	$(document.body).append(html);
	sellen=c.data.sel.length;
	c.data.jud.sort(function(){ return 0.5 - Math.random() });
	c.data.sel.sort(function(){ return 0.5 - Math.random() });
	exam=c.data.sel.concat(c.data.jud);
	$.each(exam,function(i,v){
		answer.push('['+v.id+','+v.knowledge_Id+',[]]');
	});
	time=c.data.other.ztime*1000;
	if(time=="0"){
		return;
	};
	if(Math.floor(time/60000)<10){
		minute='0'+Math.floor(time/60000);
	}else{
		minute=Math.floor(time/60000);
	};
	if(Math.floor((time%60000)/1000)<10){
		second='0'+Math.floor((time%60000)/1000);
	}else{
		second=Math.floor((time%60000)/1000);
	};
	$("#getExam").addClass("lock");
};
function LamaErrStudentstartPhaseTest(d,c){
	prompt(c);
};
//开始阶段考试
function startTests(){
	$(".getthepapers").hide();
	$(".examquestions").remove();
	var html='<div class="examquestions popup_wrap"><div class="examquestions_title popup_title"></div><div class="examquestions_time"><span class="countdown"></span><i class="countdown_time"></i></div><div class="examquestions_cont popup_cont"></div><div class="examquestions_bot"><a class="examquestions_btn">下一题</a></div></div>';
	var closehtml='<span class="examquestions_close"></span>';
	var topic='';
	$.each(exam, function(i,v) {
		topic+='<li>'+(i+1)+'</li>';
	});
	topic='<div class="topic"><ul>'+topic+'</ul><p><span></span>已提交答案</p></div>';
	$(document.body).append(html);
	$(document.body).append(closehtml);
	$(".examquestions").append(topic);
	if(time=="0"){
		$(".examquestions_time").remove();
		$(".examquestions_title").css("border-bottom","1px solid #e6e6e6");
	};
	if(num!=0){
		num=num-1;
		nextQuestion();
		$(".countdown_time").css("left",le+"px");
		$(".countdown").css("width",wi+"%");
		countdown=minute+":"+second+":"+seconds;
		checkPapersWk();
		return;
	};
	now=new Date();
	nextQuestions();
	checkPapersWk();
	if(time=="0"){
		return;
	};
	setSchedule();
};
//阶段下一题
function nextQuestions(){
	$(".examquestions_bot a.examquestions_btn").removeClass("gray");
	var e=exam[num];
	var da='';
	$.each(e.lib_Question, function(i,v) {
		da+='<li><em></em><span>'+v+'</span></li>';
	});
	if(e.lib_Question.length==2){
		da='<ul class="judgment">'+da+'</ul>';
	}else{
		da='<ul>'+da+'</ul>';
	};
	$(".examquestions_cont").html('<p id="'+e.id+'" kid="'+e.knowledge_Id+'" sid="'+e.classexamid+'">'+e.lib_Subject+'</p>'+da);
	$(".examquestions_title").html('第'+(num+1)+'题<span>'+(num+1)+'/'+exam.length+'</span>');
	if(answer[num]){
		var an=answer[num].split(",")[2].replace(/[^a-zA-Z]/g,"");
		var dui='';
		if(an=="A"||an=="T"){
			dui=0;
		}else if(an=="B"||an=="F"){
			dui=1;
		}else if(an=="C"){
			dui=2;
		}else if(an=="D"){
			dui=3;
		}else{
			dui=3000;
		};
		$(".examquestions_cont li em").eq(dui).addClass("on");
	};
	num++;
	if(num==exam.length){
		$(".examquestions_bot a.examquestions_btn").addClass("gray");
	};
};
//提交答案
function LamaReqStudentsubPhaseanwer(){
	var judanswer=new Array;
	var selanswer=new Array;
	for(var i=0;i<answer.length;i++){
		if(i<sellen){
			selanswer.push(answer[i]);
		}else{
			judanswer.push(answer[i]);
		};
	};
	var eid=$(".examquestions_cont p").attr("sid");
	var data = {'isAjaxDebug':isAjaxDebug, 'filePath':window.location.pathname, 'flag':'StudentsubPhaseanwer','classid':classid,'classexam_Id':eid,'judanswer':judanswer,'selanswer':selanswer,'studentid':studentid};
	LamaRequest(interfaceUrl, data);
};
function LamaBeforeStudentsubPhaseanwer(d,c){
	$(".examquestions_bot a.examquestions_btn").addClass("gray");
	$(".examquestions_bot p").remove();
};
function LamaResStudentsubPhaseanwer(d,c){
	clearExam();
	$(".subnavigation_right li#jdks").removeClass("on").click();
	$("#getExam").removeClass("lock");
	prompt("提交成功");
};
function LamaErrStudentsubPhaseanwer(d,c){
	$(".examquestions_btn").removeClass("gray");
	if(c.data=="-1"){
		clearExam();
		prompt(c);
	}else{
		$(".examquestions_bot").append("<p>"+c+"</p>");
	};
};


var assesstips=false;
//请求职业规划师测评
function LamaReqStudentSubmitplanteach(){
	var cid=$(".classProgress_bottom span.on").parent().attr("cid")||"null";
	var planteachid=$("#mentor").attr("planteachid");
	var data = {'isAjaxDebug':isAjaxDebug, 'filePath':window.location.pathname, 'flag':'StudentSubmitplanteach','classid':classid};
	LamaRequest(interfaceUrl, data);
};
function LamaBeforeStudentSubmitplanteach(){
	$("#dutydiv").addClass("on");
};
function LamaResStudentSubmitplanteach(d,c){
	var html='';
	var num=0;
	var name=$(".classProgress_bottom p[cid="+c.data.courseid+"] span").html();
	var teach=$(".navhead_left #mentor").html().split("：");
	$("#dutydiv").removeClass("on");
	var temp=$.parseJSON(c.data.temp);
	//console.log(temp)
	$.each(temp, function(i,v) {
		$.each(v.list, function(n,a) {
			num++;
			if(n==0){
				html+='<tr><td class="tile">'+num+'</td><td class="tile2" rowspan="'+v.list.length+'">'+v.title+'</td><td class="tile3">'+a+'</td><td class="tile4"><i>5</i><span class="single"></span></td><td class="tile4"><i>4</i><span class="single"></span></td><td class="tile4"><i>3</i><span class="single"></span></td><td class="tile4"><i>2</i><span class="single"></span></td><td class="tile4"><i>1</i><span class="single"></span></td></tr>';
			}else{
				html+='<tr><td class="tile">'+num+'</td><td class="tile3">'+a+'</td><td class="tile4"><i>5</i><span class="single"></span></td><td class="tile4"><i>4</i><span class="single"></span></td><td class="tile4"><i>3</i><span class="single"></span></td><td class="tile4"><i>2</i><span class="single"></span></td><td class="tile4"><i>1</i><span class="single"></span></td></tr>';
			};
		});
	});
	html+='<tr><td class="tile">'+(num+1)+'</td><td class="tile2">关于优化本授课内容的建议</td><td class="tile5" colspan="6"><textarea id="contsuggest"></textarea></td></tr><tr><td class="tile">'+(num+2)+'</td><td class="tile2">对老师的建议</td><td class="tile5" colspan="6"><textarea id="teachsuggest"></textarea></td></tr>';
	html='<div class="lecturer_popup_bot" cid="'+c.data.courseid+'" oid="'+c.data.occevalid+'"><table><tbody><tr><td class="tile">编号</td><td class="tile2">评价指标点</td><td class="tile3">评价项目</td><td class="tile4">很好</td><td class="tile4">好</td><td class="tile4">一般</td><td class="tile4">差</td><td class="tile4">很差</td></tr>'+html+'</tbody></table></div>';
	html='<div class="lecturer_popup mes_popup"><!--<span class="close"></span>--><div class="popup_title lecturer_popup_title">【'+name+'】职业规划师【'+teach[1]+'】测评</div><div class="popup_cont lecturer_popup_cont">'+html+'</div><div class="lecturer_popup_btn"><a href="javascript:LamaReqStudnetMentorAppraisalSubmit();">提交</a></div></div>';
	$(document.body).append(html);
	$(".mask").show();
	mesPopupHeight();
	$("#dutydiv").removeClass("on");
	assesstips=false;
	//测评提示<div class="lecturer_popup_top"><p>1、此问卷目的，是为了收集对该讲师和授课内容的真切感受，为进一步改进训练方式提供有价值的反馈信息，促进训练整体水平的提高。</p><p>2、问卷不具姓名，请您认真填写。</p><p>3、请你结合下述评价项目给讲师评定一个适当的等级，在对应的项目下选择。</p></div>
};
var lecuid=new Array;  //同一阶段讲师id数组
function LamaErrStudentSubmitplanteach(d,c){
	$(".mask").hide();
	$("#dutydiv").removeClass("on");
	if(assesstips==true){
		prompt(c);
		assesstips=false;
		return;
	};
	LamaReqStudentSubmitpexpert();//讲师测评请求
};
//职规测试提交
function LamaReqStudnetMentorAppraisalSubmit(){
	if($(".lecturer_popup_btn a").hasClass("gray")){
		return;
	};
	var lock=true;
	var answer='';
	$(".lecturer_popup_btn p").remove();
	$(".lecturer_popup_bot table tr:gt(0)").each(function(){
		if($(this).find("span.on").length<1&&$(this).find(".single").length>0){
			lock=false;
		}else if($(this).find(".single").length>0){
			answer+=($(this).find("span.on").prev().html())+'|';
		};
	});
	if(lock==false){
		$(".lecturer_popup_btn").append("<p>请完成所有测评</p>");
		return;
	};
	var teachsuggest=$("#teachsuggest").val();
	var contsuggest=$("#contsuggest").val();
	answer=answer.substring(0,answer.length-1);
	var planteachid=$("#mentor").attr("planteachid");
	var cid=$(".lecturer_popup_bot").attr("cid");
	var oid=$(".lecturer_popup_bot").attr("oid");
	var data = {'isAjaxDebug':isAjaxDebug, 'filePath':window.location.pathname, 'flag':'StudnetMentorAppraisalSubmit','classid':classid,'courseid':cid,'planteachid':planteachid,'answer':answer,'teachsuggest':teachsuggest,'contsuggest':contsuggest,'occevalid':oid};
	LamaRequest(interfaceUrl, data);
};
function LamaBeforeStudnetMentorAppraisalSubmit(d,c){
	$(".lecturer_popup_btn a").addClass("gray");
};
function LamaResStudnetMentorAppraisalSubmit(d,c){
	$(".mes_popup").remove();
	$(".mask").hide();
	LamaReqStudentSubmitpexpert();//讲师测评请求
};
function LamaErrStudnetMentorAppraisalSubmit(d,c){
	$(".lecturer_popup_btn a").removeClass("gray");
	$(".lecturer_popup_btn").append("<p>"+c+"</p>");
};

var lecnum=0; //同一阶段讲师个数
//请求讲师测评
function LamaReqStudentSubmitpexpert(){
	var cid=$(".classProgress_bottom span.on").parent().attr("cid")||"null";
	var data = {'isAjaxDebug':isAjaxDebug, 'filePath':window.location.pathname, 'flag':'StudentSubmitpexpert','classid':classid,'courseid':cid};
	LamaRequest(interfaceUrl, data);
};
function LamaBeforeStudentSubmitpexpert(){
	$(".navhead_right #lecturer").addClass("on");
};
function LamaResStudentSubmitpexpert(d,c){
	var html='';
	var num=0;
	//var name=$(".classProgress_bottom p[cid="+c.data.courseid+"] span").html();
	$(".navhead_right #lecturer").removeClass("on");
	var temp=$.parseJSON(c.data.temp);
	//console.log(temp)
	$.each(temp, function(i,v) {
		$.each(v.list, function(n,a) {
			num++;
			if(n==0){
				html+='<tr><td class="tile">'+num+'</td><td class="tile2" rowspan="'+v.list.length+'">'+v.title+'</td><td class="tile3">'+a+'</td><td class="tile4"><i>5</i><span class="single"></span></td><td class="tile4"><i>4</i><span class="single"></span></td><td class="tile4"><i>3</i><span class="single"></span></td><td class="tile4"><i>2</i><span class="single"></span></td><td class="tile4"><i>1</i><span class="single"></span></td></tr>';
			}else{
				html+='<tr><td class="tile">'+num+'</td><td class="tile3">'+a+'</td><td class="tile4"><i>5</i><span class="single"></span></td><td class="tile4"><i>4</i><span class="single"></span></td><td class="tile4"><i>3</i><span class="single"></span></td><td class="tile4"><i>2</i><span class="single"></span></td><td class="tile4"><i>1</i><span class="single"></span></td></tr>';
			};
		});
	});
	html+='<tr><td class="tile">'+(num+1)+'</td><td class="tile2">关于优化本授课内容的建议</td><td class="tile5" colspan="6"><textarea id="contsuggest"></textarea></td></tr><tr><td class="tile">'+(num+2)+'</td><td class="tile2">关于授课老师的建议</td><td class="tile5" colspan="6"><textarea id="teachsuggest"></textarea></td></tr><tr><td class="tile">'+(num+3)+'</td><td class="tile2">对教学/研发中心环境的评价</td><td class="tile5" colspan="6"><textarea id="envirsuggest"></textarea></td></tr>';
	html='<div class="lecturer_popup_bot" cid="'+c.data.courseid+'" type="'+c.data.type+'"><table><tbody><tr><td class="tile">编号</td><td class="tile2">评价指标点</td><td class="tile3">评价项目</td><td class="tile4">很好</td><td class="tile4">好</td><td class="tile4">一般</td><td class="tile4">差</td><td class="tile4">很差</td></tr>'+html+'</tbody></table></div>';
	html='<div class="lecturer_popup mes_popup"><!--<span class="close"></span>--><div class="popup_title lecturer_popup_title">【'+c.data.course_Name+'】讲师【'+c.data.name+'】测评</div><div class="popup_cont lecturer_popup_cont">'+html+'</div><div class="lecturer_popup_btn"><a uid="'+c.data.lecturerid+'" href="javascript:LamaReqStudnetExpertAppraisalSubmit();">提交</a></div></div>';
	$(document.body).append(html);
	$(".mask").show();
	mesPopupHeight();
	$(".navhead_right #lecturer").removeClass("on"); 
	assesstips=false;
};
function LamaErrStudentSubmitpexpert(d,c){
	$(".navhead_right #lecturer").removeClass("on");
	$(".mask").hide();
	if(assesstips==true){
		prompt(c);
		assesstips=false;
	};
};
//讲师测试提交
function LamaReqStudnetExpertAppraisalSubmit(){
	if($(".lecturer_popup_btn a").hasClass("gray")){
		return;
	};
	var lock=true;
	var answer='';
	$(".lecturer_popup_btn p").remove();
	$(".lecturer_popup_bot table tr:gt(0)").each(function(){
		if($(this).find("span.on").length<1&&$(this).find(".single").length>0){
			lock=false;
		}else if($(this).find(".single").length>0){
			answer+=($(this).find("span.on").prev().html())+'|';
		};
	});
	if(lock==false){
		$(".lecturer_popup_btn").append("<p>请完成所有测评</p>");
		return;
	};
	var teachsuggest=$("#teachsuggest").val();
	var contsuggest=$("#contsuggest").val();
	answer=answer.substring(0,answer.length-1);
	var lecturerid=$(".lecturer_popup_btn a").attr("uid");
	var envirsuggest=$("#envirsuggest").val();
	var cid=$(".lecturer_popup_bot").attr("cid");
	var type=$(".lecturer_popup_bot").attr("type");
	var data = {'isAjaxDebug':isAjaxDebug, 'filePath':window.location.pathname, 'flag':'StudnetExpertAppraisalSubmit','classid':classid,'courseid':cid,'lecturerid':lecturerid,'answer':answer,'teachsuggest':teachsuggest,'contsuggest':contsuggest,'envirsuggest':envirsuggest,'type':type};
	LamaRequest(interfaceUrl, data);
};
function LamaBeforeStudnetExpertAppraisalSubmit(d,c){
	$(".lecturer_popup_btn a").addClass("gray");
};
function LamaResStudnetExpertAppraisalSubmit(d,c){
	$(".mes_popup").remove();
	$(".mask").hide(); 
};
function LamaErrStudnetExpertAppraisalSubmit(d,c){
	$(".lecturer_popup_btn a").removeClass("gray");
	$(".lecturer_popup_btn").append("<p>"+c+"</p>");
};

//个人信息
function LamaReqStudnetPersonalInfor(){
	var data = {'isAjaxDebug':isAjaxDebug, 'filePath':window.location.pathname, 'flag':'StudnetPersonalInfor','classid':classid};
	LamaRequest(interfaceUrl, data);
};
function LamaBeforeStudnetPersonalInfor(d,c){
	$(".navhead_right #information").addClass("on");
};
function LamaResStudnetPersonalInfor(d,c){
	var score='';
	var money=c.data.djfei;
	if(parseInt(c.data.djfei)<=0){
		money='已结清';
	};
	if(parseInt(c.data.jlv)>=80){
		score='<li><span>纪律：</span><p class="green">'+c.data.jlv+'</p><em>（纪律80分（含）以上合格，60-69警告，60分以下不及格）</em></li>';
	}else if(parseInt(c.data.jlv)>=60){
		score='<li><span>纪律：</span><p class="yellow">'+c.data.jlv+'</p><em>（纪律80分（含）以上合格，60-69警告，60分以下不及格）</em></li>';
	}else{
		score='<li><span>纪律：</span><p class="red">'+c.data.jlv+'</p><em>（纪律80分（含）以上合格，60-69警告，60分以下不及格）</em></li>';
	};
	if(parseInt(c.data.kq)>=80){
		score+='<li><span>考勤：</span><p class="green">'+c.data.kq+'</p><em>（考勤80分（含）以上合格，60-79警告，60分以下不及格）</em></li>';
	}else if(parseInt(c.data.kq)>=60){
		score+='<li><span>考勤：</span><p class="yellow">'+c.data.kq+'</p><em>（考勤80分（含）以上合格，60-79警告，60分以下不及格）</em></li>';
	}else{
		score+='<li><span>考勤：</span><p class="red">'+c.data.kq+'</p><em>（考勤80分（含）以上合格，60-79警告，60分以下不及格）</em></li>';
	};
	score='<ul class="discipline">'+score+'</ul>';
	var record='';
	if(c.data.list.length>0){
		$.each(c.data.list, function(i,v) {
			var type;
			if(v.categoryType==1){
				type='迟到';
			}else if(v.categoryType==2){
				type='早退';
			}else if(v.categoryType==3){
				type='旷课';
			}else if(v.categoryType==4){
				type='纪律';
			};
			var timebucket=v.timebucket==""?"--":v.timebucket;
			record+='<tr><td class="record_time">'+v.recordtime+'</td><td class="disc_type">'+type+'</td><td class="disc_time">'+timebucket+'</td><td class="disc_reasons">'+v.content+'</td></tr>';
		});
		record='<table><tbody><tr class="record_title"><td class="record_time">违纪时间</td><td class="disc_type">违纪类型</td><td class="disc_time">时间段</td><td class="disc_reasons">违纪原因</td></tr>'+record+'</tbody></table>';
	}else{
		record='';	
	};
	$(".navhead").append('<div class="popup_cont information_popup_cont"><span class="san"></span><span class="guan"></span><div class="information_popup_cont_positon"><a class="manual" adr="'+c.data.sce+'">实训生手册</a></div><ul><li><span>待缴学费：</span><p>'+money+'</p></li><li class="leave"><span>请假记录：</span><p>请假【'+c.data.number+'次】，共【'+c.data.times+'小时】</p></li></ul>'+score+record+'</div>');
	$(document.body).append("<div class='transparent'></div>");
};
function LamaErrStudnetPersonalInfor(d,c){
	$(".navhead_right #information").removeClass("on");
	prompt(c);
};
//学生周报列表
var studentWeekly;
function LamaReqStudentListWeekly(){
	var data = {'isAjaxDebug':isAjaxDebug, 'filePath':window.location.pathname, 'flag':'StudentListWeekly','classid':classid};
	LamaRequest(interfaceUrl, data);
};
function LamaBeforeStudentListWeekly(){
	$(".navhead_right #weekly").addClass("on");
};
function LamaResStudentListWeekly(d,c){
	var html='';
	var subject=$(".schedule_cont a[stat=0]").first().parent().attr("tips");
	studentWeekly=c.data.list;
	if(c.data.list.length>0){
		$.each(c.data.list, function(i,v){
			html='<div on="'+v.on+'" ctype="'+v.ctype+'" wid="'+v.weekly_Id+'"><p><span></span><em>'+v.name+'【'+v.weeklydate+'】期周报</em><i>'+v.weekly_Time+'</i></p><a>查看</a></div>'+html;
		});
	}else{
		html='<div id="loading" style="padding:100px 0;"><p style="text-align:center; width:100%;"><img src="img/bg0929.png"></p><p style="color:#ccc; width:100%; text-align:center; line-height:28px;">暂无数据</p><div>';
	};
	if($(".modify_popup").length>0){
		$(".weekly_popup_cont").html(html);
	}else{
		$(document.body).append('<div class="weekly_popup mes_popup"><span class="close"></span><div class="weekly_popup_title popup_title"><span>当前课程：'+subject+'</span><em>填写/修改周报</em><i>（若与实际授课进度不符，请告知讲师修改）</i></div><div class="weekly_popup_cont popup_cont">'+html+'</div></div>');
		if(c.data.isopen==0){
			$(".weekly_popup_title em").remove();
		};
		$(".mask").show();
	};
	mesPopupHeight();
};
function LamaErrStudentListWeekly(d,c){
	$(".navhead_right #weekly").removeClass("on");
	prompt(c);
};
//周报提交
function LamaReqStudentSubmitWeekly(){
	if($(".schedule_cont .class a[stat=0]:first").parent().attr("ct")==1){
		var p_Persons="",p_Problem="",p_Process="",p_Project="",p_ProjectName="",p_Solution="",p_Summary="";
		var s_Knowledge=$(".modify_popup_cont textarea").eq(0).val(),
			s_Mistiness=$(".modify_popup_cont textarea").eq(1).val(),
			s_Nomaster=$(".modify_popup_cont textarea").eq(2).val(),
			s_Studynotes=$(".modify_popup_cont textarea").eq(3).val(),
			s_Reflection=$(".modify_popup_cont textarea").eq(4).val(),
			recommend=$(".modify_popup_cont textarea").eq(5).val();
	}else{
		var s_Knowledge="",s_Mistiness="",s_Nomaster="",s_Studynotes="",s_Reflection="";
		var p_Persons=$(".modify_popup_cont textarea").eq(0).val(),
			p_ProjectName=$(".modify_popup_cont textarea").eq(1).val(),
			p_Project=$(".modify_popup_cont textarea").eq(2).val(),
			p_Problem=$(".modify_popup_cont textarea").eq(3).val(),
			p_Solution=$(".modify_popup_cont textarea").eq(4).val(),
			p_Process=$(".modify_popup_cont textarea").eq(5).val(),
			p_Summary=$(".modify_popup_cont textarea").eq(6).val(),
			recommend=$(".modify_popup_cont textarea").eq(7).val();
	};
	var cid=$(".schedule_cont .class a[stat=0]:first").parent().attr("cid");
	var data = {'isAjaxDebug':isAjaxDebug,
				'filePath':window.location.pathname, 
				'flag':'StudentSubmitWeekly',
				'classid':classid,
				'courseid':cid,
				'p_Persons':p_Persons,
				'p_Problem':p_Problem,
				'p_Process':p_Process,
				'p_Project':p_Project,
				'p_ProjectName':p_ProjectName,
				'p_Solution':p_Solution,
				'p_Summary':p_Summary,
				's_Knowledge':s_Knowledge,
				's_Mistiness':s_Mistiness,
				's_Nomaster':s_Nomaster,
				's_Studynotes':s_Studynotes,
				's_Reflection':s_Reflection,
				'weekly_Recommend':recommend
				};
	LamaRequest(interfaceUrl, data);
};
function LamaBeforeStudentSubmitWeekly(d,c){
	$(".modify_popup_bot").find("p").remove();
	$(".modify_popup_bot").append("<p style='color:#FF0000;line-height:55px;float:left;padding-left:20px;'>loading...</p>");
};
function LamaResStudentSubmitWeekly(d,c){
	$(".modify_popup_bot a").removeClass("gray");
	if($(".modify_popup_bot a").first().hasClass("on")){
		$(".modify_popup_bot").find("p").remove();
		$(".modify_popup_bot").append("<p style='color:#FF0000;line-height:55px;float:left;padding-left:20px;'>保存成功</p>");
		$(".modify_popup_bot").attr("wid",c.data);
		LamaReqStudentListWeekly();
	}else{
		$(".weekly_popup").remove();
		$(".modify_popup").remove();
		$(".mask").hide();
	};
	$(".modify_popup_bot a").removeClass("on");
	$("#weekly").removeClass("on");
};
function LamaErrStudentSubmitWeekly(d,c){
	$(".modify_popup_bot a").removeClass("on gray");
	$(".modify_popup_bot").find("p").remove();
	$(".modify_popup_bot").append("<p style='color:#FF0000;line-height:55px;float:left;padding-left:20px;'>"+c+"</p>");
};
//修改周报保存
function LamaReqStudentSubBottonWeekly(){
	if($(".schedule_cont .class a[stat=0]:first").parent().attr("ct")==1){
		var p_Persons="",p_Problem="",p_Process="",p_Project="",p_ProjectName="",p_Solution="",p_Summary="";
		var s_Knowledge=$(".modify_popup_cont textarea").eq(0).val(),
			s_Mistiness=$(".modify_popup_cont textarea").eq(1).val(),
			s_Nomaster=$(".modify_popup_cont textarea").eq(2).val(),
			s_Studynotes=$(".modify_popup_cont textarea").eq(3).val(),
			s_Reflection=$(".modify_popup_cont textarea").eq(4).val(),
			recommend=$(".modify_popup_cont textarea").eq(5).val();
	}else{
		var s_Knowledge="",s_Mistiness="",s_Nomaster="",s_Studynotes="",s_Reflection="";
		var p_Persons=$(".modify_popup_cont textarea").eq(0).val(),
			p_ProjectName=$(".modify_popup_cont textarea").eq(1).val(),
			p_Project=$(".modify_popup_cont textarea").eq(2).val(),
			p_Problem=$(".modify_popup_cont textarea").eq(3).val(),
			p_Solution=$(".modify_popup_cont textarea").eq(4).val(),
			p_Process=$(".modify_popup_cont textarea").eq(5).val(),
			p_Summary=$(".modify_popup_cont textarea").eq(6).val(),
			recommend=$(".modify_popup_cont textarea").eq(7).val();
	};
	var cid=$(".schedule_cont .class a[stat=0]:first").parent().attr("cid");
	var wid=$(".modify_popup_bot").attr("wid");
	var data = {'isAjaxDebug':isAjaxDebug,
				'filePath':window.location.pathname, 
				'flag':'StudentSubBottonWeekly',
				'classid':classid,
				'courseid':cid,
				'weeklyId':wid,
				'p_Persons':p_Persons,
				'p_Problem':p_Problem,
				'p_Process':p_Process,
				'p_Project':p_Project,
				'p_ProjectName':p_ProjectName,
				'p_Solution':p_Solution,
				'p_Summary':p_Summary,
				's_Knowledge':s_Knowledge,
				's_Mistiness':s_Mistiness,
				's_Nomaster':s_Nomaster,
				's_Studynotes':s_Studynotes,
				's_Reflection':s_Reflection,
				'weekly_Recommend':recommend
				};
	//console.log(data)
	LamaRequest(interfaceUrl, data);
};
function LamaBeforeStudentSubBottonWeekly(d,c){
	$(".modify_popup_bot").find("p").remove();
	$(".modify_popup_bot").append("<p style='color:#FF0000;line-height:55px;float:left;padding-left:20px;'>loading...</p>");
};
function LamaResStudentSubBottonWeekly(d,c){
	$(".modify_popup_bot a").removeClass("gray");
	if($(".modify_popup_bot a").first().hasClass("on")){
		$(".modify_popup_bot").find("p").remove();
		$(".modify_popup_bot").append("<p style='color:#FF0000;line-height:55px;float:left;padding-left:20px;'>保存成功</p>");
		LamaReqStudentListWeekly();
	}else{
		$(".weekly_popup").remove();
		$(".modify_popup").remove();
		$(".mask").hide();
	};
	$(".modify_popup_bot a").removeClass("on");
	$("#weekly").removeClass("on");
};
function LamaErrStudentSubBottonWeekly(d,c){
	$(".modify_popup_bot a").removeClass("on gray");
	$(".modify_popup_bot").find("p").remove();
	$(".modify_popup_bot").append("<p style='color:#FF0000;line-height:55px;float:left;padding-left:20px;'>"+c+"</p>");
};

//知识点成绩汇总
function LamaReqStudentKnowAll(){
	var data = {'isAjaxDebug':isAjaxDebug, 'filePath':window.location.pathname, 'flag':'StudentKnowAll','classid':classid};
	LamaRequest(interfaceUrl, data);
};
function LamaBeforeStudentKnowAll(){
	$(".selcourse_top a").addClass("gray");
};
function LamaResStudentKnowAll(d,c){
	var x=new Array(),y1=new Array(),kid=new Array(),y2;
	$.each(c.data.statu1, function(i,v){
		var name=v.knowledgename;
		x.push(cutString(name,10));
		y1.push(v.result);
		kid.push(v.knowledgeid);
	});
	y2=new Array(y1.length);
	$.each(kid, function(i,v){
		$.each(c.data.statu2, function(n,a) {
			if(v==a.knowledgeid){
				y2[n]=a.result;
			};
		});
	});
	//console.log(y1);
	//console.log(y2);
	$(".mask").show();
	var tableLeft='<table border="0"width="100%"cellpadding="0"cellspacing="0"><tr><th>科目</th></tr><tr><td>第一次成绩</td></tr><tr><td>班级排名</td></tr><tr><td>最高分</td></tr><tr><td>最低分</td></tr><tr><td>第二次成绩</td></tr><tr><td>班级排名</td></tr><tr><td>最高分</td></tr><tr><td>最低分</td></tr></table>';
	$(document.body).append('<div class="resultsummary"><span class="closebutton close"></span><div class="resultsummary_title">学习曲线图</div><div class="resultsummary_cont"><div class="resultsummary_cont_til">成绩排名趋势图<em class="one"></em><span>第一次成绩</span><em class="two"></em><span>第二次成绩</span></div><div class="chart"><div class="vertical"><p>100</p><p>80</p><p>60</p><p>40</p><p>20</p><p>0</p></div><div class="container"><div class="chart-wrapper"><canvas id="sales-volume-chart"></canvas></div></div></div><div class="timeline"><div class="slider"><div class="gun left"></div><div class="gun right"></div></div></div><div class="details"><div class="detailsTitle"><p>全班学生知识点考试成绩详情</p><em class="gao"></em><span>成绩优良</span><em class="di"></em><span>成绩较差</span></div><div class="detailsMain"><div class="detailsLeft">'+tableLeft+'</div><div class="detailsRight" style="height:315px"><table border="0" cellpadding="0" cellspacing="0" style="left: 0px;min-width:964px;"><tbody><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr><tr></tr></tbody></table></div></div></div></div></div>');
	$.each(c.data.statu1, function(i,v){
		var name=v.knowledgename;
		name=cutString(name,10,"..."); 
		$(".detailsRight tr").eq(0).append('<th kid="'+v.knowledgeid+'"><p tips="'+v.knowledgename+'">'+name+'</p></th>');
		$(".detailsRight tr").eq(1).append('<td><p tips="'+v.knowledgename+'">'+v.result+'</p></td>');
		$(".detailsRight tr").eq(2).append('<td><p tips="'+v.knowledgename+'">'+v.paistate1+'</p></td>');
		$(".detailsRight tr").eq(3).append('<td><p tips="'+v.knowledgename+'">'+v.statue1d+'</p></td>');
		$(".detailsRight tr").eq(4).append('<td><p tips="'+v.knowledgename+'">'+v.statue1x+'</p></td>');
		$(".detailsRight tr").eq(5).append('<td></td>');
		$(".detailsRight tr").eq(6).append('<td></td>');
		$(".detailsRight tr").eq(7).append('<td></td>');
		$(".detailsRight tr").eq(8).append('<td></td>');
	});
	$.each(c.data.statu2, function(i,v){
		$(".detailsRight tr").eq(5).find("td").eq(i).append('<p tips="'+v.knowledgename+'">'+v.result+'</p>');
		$(".detailsRight tr").eq(6).find("td").eq(i).append('<p tips="'+v.knowledgename+'">'+v.paistate2+'</p>');
		$(".detailsRight tr").eq(7).find("td").eq(i).append('<p tips="'+v.knowledgename+'">'+v.statue2d+'</p>');
		$(".detailsRight tr").eq(8).find("td").eq(i).append('<p tips="'+v.knowledgename+'">'+v.statue2x+'</p>');
	});
	sliderRuler(x.length);
	lineChart(x,y1,y2);
	$(".courseware .selcourse_top a").removeClass("gray");
//	$(".resultsummary").show();	
};
function LamaErrStudentKnowAll(d,c){
	$(".selcourse_top a").removeClass("gray");
	prompt(c);
};

//阶段成绩汇总
function LamaReqStudentPhaseTestAll(){
	var data = {'isAjaxDebug':isAjaxDebug, 'filePath':window.location.pathname, 'flag':'StudentPhaseTestAll','classid':classid};
	LamaRequest(interfaceUrl, data);
};
function LamaBeforeStudentPhaseTestAll(){
	$(".selcourse_top a").addClass("gray");
};
function LamaResStudentPhaseTestAll(d,c){
	var x=new Array(),y1=new Array($(".classProgress_bottom p").length);
	var info='';
	$.each($(".classProgress_bottom p"), function(i,v) {
		var cid=$(this).attr("cid");
		var name=$(this).find("span").html();
		x.push(cutString(name,10));
		info+='<td cid="'+cid+'"></td>';
		$.each(c.data, function(n,a){
			if(a.courseid==cid){
				y1[i]=a.credit;
			};
		});
	});
	$.each(c.data, function(n,a){
		if(a.exam_IsEntrance==1){
			x.unshift("入学测试");
			y1.unshift(a.credit);
			info='<td cid="'+a.courseid+'" enter="'+a.exam_IsEntrance+'"></td>'+info;
		};
	});
	$(".mask").show();
	var tableLeft='<table border="0"width="100%"cellpadding="0"cellspacing="0"><tr><th>科目</th></tr><tr><td>阶段成绩</td></tr><tr><td>班级排名</td></tr><tr><td>最高分</td></tr><tr><td>最低分</td></tr></table>';
	$(document.body).append('<div class="resultsummary"><span class="closebutton close"></span><div class="resultsummary_title">学习曲线图</div><div class="resultsummary_cont"><div class="resultsummary_cont_til">成绩排名趋势图<em class="one"></em><span>阶段考试成绩</span></div><div class="chart"><div class="vertical"><p>100</p><p>80</p><p>60</p><p>40</p><p>20</p><p>0</p></div><div class="container"><div class="chart-wrapper"><canvas id="sales-volume-chart"></canvas></div></div></div><div class="timeline"><div class="slider"><div class="gun left"></div><div class="gun right"></div></div></div><div class="details"><div class="detailsTitle"><p>全班学生知识点考试成绩详情</p><em class="gao"></em><span>成绩优良</span><em class="di"></em><span>成绩较差</span></div><div class="detailsMain"><div class="detailsLeft">'+tableLeft+'</div><div class="detailsRight" style="height:175px"><table border="0" cellpadding="0" cellspacing="0" style="left: 0px;min-width:964px;"><tbody><tr>'+info+'</tr><tr>'+info+'</tr><tr>'+info+'</tr><tr>'+info+'</tr><tr>'+info+'</tr></tbody></table></div></div></div></div></div>');
	$.each($(".classProgress_bottom p"), function(i,v){
		var name=cutString(name,10,"..."); 
		$(".detailsRight tr").eq(0).find("td[cid="+$(this).attr("cid")+"]").append('<p>'+$(this).find("span").html()+'</p>');
	});
	$.each(c.data, function(n,a){
		if(a.exam_IsEntrance==1){
			$(".detailsRight tr").eq(0).find("td").first().html('<p>入学测试</p>');
			$(".detailsRight tr").eq(1).find("td[cid="+a.courseid+"][enter=1]").html('<p>'+a.credit+'</p>');
			$(".detailsRight tr").eq(2).find("td[cid="+a.courseid+"][enter=1]").html('<p>'+a.pai+'</p>');
			$(".detailsRight tr").eq(3).find("td[cid="+a.courseid+"][enter=1]").html('<p>'+a.da+'</p>');
			$(".detailsRight tr").eq(4).find("td[cid="+a.courseid+"][enter=1]").html('<p>'+a.xiao+'</p>');
		}else{
			$(".detailsRight tr").eq(1).find("td[cid="+a.courseid+"][enter!=1]").html('<p>'+a.credit+'</p>');
			$(".detailsRight tr").eq(2).find("td[cid="+a.courseid+"][enter!=1]").html('<p>'+a.pai+'</p>');
			$(".detailsRight tr").eq(3).find("td[cid="+a.courseid+"][enter!=1]").html('<p>'+a.da+'</p>');
			$(".detailsRight tr").eq(4).find("td[cid="+a.courseid+"][enter!=1]").html('<p>'+a.xiao+'</p>');
		};
	});
	sliderRuler(x.length);
	lineChart(x,y1);
	$(".courseware .selcourse_top a").removeClass("gray");
//	$(".resultsummary").show();	
};
function LamaErrStudentPhaseTestAll(d,c){
	$(".selcourse_top a").removeClass("gray");
	prompt(c);
};


var clearWin=function(){
	$('.paper_cont').empty();
	$('.seatingchartbei_cont').empty();
	$('.testButton a').removeClass("on");
	$(".seatingchartbei").hide();
	$(".schedule_sel").remove();
	$(".subnavigation").show();
	$(".subnavigation_right").show();
	//$(".subnavigation_left a").show();
	$(".courseware_button").hide();
	$(".testPaper").hide();
	$(".error").remove();
	$(".forknowledge").show();
};
function clearNav(){
	$(".jobseatingchart").empty();
	$(".courseware_center").empty();
	$(".forknowledge_right").empty();
	$(".paper_cont").empty();
	$(".testButton a").removeClass("on");
	$(".testPaper_top").empty();
	$(".seatingchartbei_cont").empty();
	$(".clickalike_left ul").empty();
	$(".clickalike_right span").removeClass("on");
	$(".courseware_button").hide();
	$(".testPaper").hide();
	$(".error").remove();
	$(".forknowledge").show(); 
};