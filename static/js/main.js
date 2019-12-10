// JavaScript Document

/* function typeChange(){  
	var x=document.getElementById("types")
	if (x.options[x.selectedIndex].value == "no-choose"){
		$(".ucars").css('display','none')
  		$(".mcars").css('display','none')
		$(".score").css('display','none')
	}
  	else if (x.options[x.selectedIndex].value == "0"){
  		$(".ucars").css('display','block')
		$(".score").css('display','block')
  		$(".mcars").css('display','none')
  	}
  	else if (x.options[x.selectedIndex].value == "1" || x.options[x.selectedIndex].value == "2"){
  		$(".mcars").css('display','block')
  		$(".ucars").css('display','none')
		$(".score").css('display','none')
  	}
} */


/* $(document).ready(function() {
	$(".mcars").css('display','none')
  	$(".ucars").css('display','none')
	$(".score").css('display','none')

	//sex
	$(".sex").find("span").click(function(e) {
		$(".sex").find("span").removeClass("choose")
        $(this).addClass("choose")
    });

    //scholl
	$(".school").find("span").click(function(e) {
        if ($(this).hasClass("choose")) {
	        $(this).removeClass("choose");   
	    }
	    else {
	        $(this).addClass("choose")
	    }
    });

    //rank
    $(".rank").find("input").bind('input propertychange', function() { 
    	rankn = $(".rank").find(".rankn").val();
    	sumn = $(".rank").find(".sumn").val();
    	if (rankn*sumn>0) {
    		$(".rank").find(".divn").val(((rankn/sumn*100).toFixed(2))+"%")
    	}
	});

}); */

/*submit*/

function end_notice(){
	alert('报名已截止')
}


function mysubmit() {
   

		var firstname=$("input[name=first_name]").val();
		var lastname=$("input[name=last_name]").val();
		var sex=$(".sex").find(".choose").html();
		if(sex == 'Male')
			sex = '0';
		else
			sex = '1';
		var affiliation = $("input[name=Affiliation]").val();
		var address=$("input[name=Address]").val();
		var phone=$("input[name=tel]").val();
		var email=$("input[name=email]").val();
		var Title=$('#Title option:selected').val();
		
		
		if((firstname=="")||(lastname=="")||(affiliation=="")||(address=="")||(phone=="")||(email=="")){
			alert("Please complete the information")
			return false;
		}
		
		var x=document.getElementById("Title")
		if (x.options[x.selectedIndex].value == "no-choose"){
			alert("please choose your position/title")
			return false;
		}
		
		/* if(types == '0'){
			var x=document.getElementById("diy_cars")
			if (x.options[x.selectedIndex].value == "no-choose"){
				alert("本科生请选择diy参与类型")
				return false;
			}
			if((divn=="")){
				alert("本科生请输入成绩排名")
				return false;
			}
		} */
		//var reg = /^[\u0391-\uFFE5]+$/;
		//var result=reg.test(name);
		
		var reg2=/^[0-9]*$/;
		var result3=reg2.test(phone);
		var l3=phone.length;
		if (result3==false || l3!==11) {
			   alert("please input correct phone number")
			   return false;
		}

		var reg=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+/; 
		result4=reg.test(email); 
		if (result4==false) {
			alert("please input correct email address")
			return false;
		}
		var _data = {
			 "first_name": firstname,
			 "last_name": lastname,
			 "sex": sex,
			 "affiliation": affiliation, 
			 "address": address,
			 "phone": phone,
			 "email": email,
			 "Title": Title,
			}

		$.ajax({
			async: false,
			url: "http://rubbly.cn:8080/signup/information/new.do",
			type: "POST",
			data: _data,
			dataType: "jsonp",
			jsonp: 'jsoncallback',
			success: function(json) {
				console.log(json);
				var status = json.msg.errcode;
				if(status >= 1){
					if(confirm("Registration is completed, your registration number is "+status+", whether to close the page?")){
						window.opener=null;
						window.open('','_self');
						window.close();
					}
				} 
				else if(status < -10){
					num = 0 - status
					alert("You have already registered, your registration number is "+num+")");
				}
				else{
					alert(json.msg.errmsg);
				}
			}
			
		});

		return true;
}
	