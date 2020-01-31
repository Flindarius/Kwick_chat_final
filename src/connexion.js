$(document).ready(function(){
    const api_url = "http://greenvelvet.alwaysdata.net/kwick/api/"

    $("#go_connect").on("click",function(){
        login()
    }),
    $("#pwd_input").keypress(function(event){
        if(event.which == 13){
            login()	
        }
    }),
    $("#log_input").keypress(function(event){
        if(event.which == 13){
            login()	
        }
    }),
    
    login = function(){
        let user = $("#log_input").val()
        let pass = $("#pwd_input").val()
        $.ajax({
            url: api_url + "login/" + user +"/" + pass,
            dataType: 'jsonp',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            success: function(result, status, xhr) {
                if (result.result.status == "failure") {
                    $(".salut").css({"border" : "#ec4e20 3px solid","color":"#ec4e20","font-size":"15px"}).val("")
                    $(".log_input").css({"border" : "#ec4e20 3px solid","color":"#ec4e20","font-size":"15px"}).val("")
                }else{
                    localStorage.setItem('token', result.result.token);
                    localStorage.setItem('id', result.result.id);
                    localStorage.setItem('name', user);
                    window.location = "chat.html"
                }
                
            },
            error: function(xhr, status, error) {
             }
        })
    }

});
