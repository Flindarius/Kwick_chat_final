const app = {
	kwick_api_url: 'http://greenvelvet.alwaysdata.net/kwick/api/',
	kwick_url: 'http://greenvelvet.alwaysdata.net/kwick/',
	init: function() {
		$('#deconnexion').on('click', app.logout); //Bouton pour deco
		app.talk(); //apparaitre tout les messages
		localStorage.setItem("temps", 0);
		$('#envo_sms').on('click', app.espace())//Bouton envoyer le message
	},	
	espace : function(){
		let sms = $('#zone_ecriture_sms').val();
		let sms_tableau = sms.split(" ");
		if (sms_tableau.length > sms.length){
		}else{
			app.say()
		}
	},
	timenow : function() {
		var now = new Date(),
		  ampm = 'am',
		  h = now.getHours(),
		  m = now.getMinutes(),
		  s = now.getSeconds();
		if (h >= 12) {
		  if (h > 12) h -= 12;
		  ampm = 'pm';
		}
	  
		if (m < 10) m = '0' + m;
		if (s < 10) s = '0' + s;
		return now.toLocaleDateString() + ' ' + h + ':' + m + ':' + s + ' ' + ampm;
	},
	

	listusers: function(){
		$.ajax({
			url: app.kwick_api_url + "user/logged/"+ localStorage.getItem('token'),
			dataType: 'jsonp',
			type: 'GET',
			contentType: 'application/json; charset=utf-8',
			success: function(result, status, xhr) {
				localStorage.setItem('Users',result.result.user);
				$(".users").remove();
				$(".users_moi").remove();
				$(".image_avatar").remove();
				for (let j=0; j<result.result.user.length; j++){
					if (result.result.user[j] ==localStorage.getItem('name')){
						$("#personne_connectes").append('<div class="users_moi"><img src="img/avatar2.png" class="image_avatar" alt="">'+result.result.user[j] +'</div>')
					}else{
					$("#personne_connectes").append('<div class="users"><img src="img/avatar.png" class="image_avatar" alt="">'+result.result.user[j] +'</div>')
					}
				}
			},
			error: function(xhr, status, error) {
			}
		});

	},

	logout: function(){
		$.ajax({
			url: app.kwick_api_url + "logout/"+ localStorage.getItem('token') + "/"+ localStorage.getItem('id'),
			dataType: 'jsonp',
			type: 'GET',
			contentType: 'application/json; charset=utf-8',
			success: function(result, status, xhr) {
				alert('You will be disconnected');
				window.location = "index.html";
				localStorage.removeItem('token')
				localStorage.removeItem('id')
				localStorage.removeItem('name')
			},
			error: function(xhr, status, error) {
			}
		});

	},
	talk: function(){
		$.ajax({
			url: app.kwick_api_url + "talk/list/"+ localStorage.getItem('token') + "/" + localStorage.getItem('temps'),
			dataType: 'jsonp',
			type: 'GET',
			contentType: 'application/json; charset=utf-8',
			success: function(result, status, xhr) {;
			for (let k=0; k<result.result.talk.length; k++){
				console.log(result.result.talk)
				if (result.result.talk[k].user_name == localStorage.getItem('name')){
					$("#zone_de_chat").append('<div id="name_de_moi">'+result.result.talk[k].user_name+'</div><div id="message_moi" class="message_bubble_2">'+ result.result.talk[k].content +'</div><div id="heure_date_moi">'+app.timenow()+'</div>')
				}else{
					$("#zone_de_chat").append('<div id="name_des_users">'+result.result.talk[k].user_name+'</div><div id="message" class="message_bubble">'+ result.result.talk[k].content +'</div><div id="heure_date">'+app.timenow()+'</div>')
				}
				localStorage.setItem("temps",result.result.last_timestamp);
				
            	$('#zone_de_chat').scrollTop($('#zone_de_chat')[0].scrollHeight);     
			}
			},
			error: function(xhr, status, error) {
			}
		});

	},
	
	
	
	say: function(){
		let sms = $('#zone_ecriture_sms').val();
		var uri = encodeURI(sms);
			$.ajax({
				url: app.kwick_api_url + "say/"+ localStorage.getItem('token') + "/" + localStorage.getItem('id')+ "/"+uri,
				dataType: 'jsonp',
				type: 'GET',
				contentType: 'application/json; charset=utf-8',
				success: function(result, status, xhr) {
					$(".chat_zone_decriture").val('')
					app.talk();
				},
				error: function(xhr, status, error) {
					
				}
			});		
	},

		  
};

$(document).ready(function(){
	setInterval(function(){app.talk()},3000)
	setInterval(function(){app.listusers()},10000)
	$("#zone_ecriture_sms").keypress(function(event){
		if(event.which == 13){
			app.espace();
		}
	})
});
app.talk();
app.listusers();
app.timenow();
