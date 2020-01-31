$(document).ready(function(){
    const api_url = "http://greenvelvet.alwaysdata.net/kwick/api/"
    let nom = localStorage.getItem('name')

    $("#go_inscription").on("click",function(){  
            login_valide()
    }),
    $("#log_input").keypress(function(event){
        if(event.which == 13){
            login_valide()	
        }
    }),
    $("#pwd_input").keypress(function(event){
        if(event.which == 13){
            login_valide()	
        }
    }),
    $("#pwd2_input").keypress(function(event){
        if(event.which == 13){
            login_valide()	
        }
    }),
    login_valide = function(){
        if ($(log_input).val() == ""){
            $(".log_input").css({"border" : "#ec4e20 1px solid","color":"#ec4e20","font-size":"15px"}).val("Type your login please")
        }
        else{
           mdp_valide() 
        }

    }
    mdp_valide = function(){
        if ($(pwd_input).val() != $(pwd2_input).val() || $(pwd_input).val() == "" || $(pwd2_input).val() == "" ){
            $(".salut").css({"border" : "#ec4e20 1px solid","color":"#ec4e20","font-size":"15px"}).val("Pwd not available")
            $("#pwd2_input").css({"border" : "#ec4e20 1px solid","color":"#ec4e20","font-size":"15px"}).val("Pwd not available")
        }else{
            signup()
        }
    }
    signup = function(){
        let user = $(log_input).val()
        let pass = $(pwd_input).val()
        $.ajax({
            url: api_url + "signup/" + user +"/" + pass,
            dataType: 'jsonp',
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            success: function(result, status, xhr) {
                if (result.result.status == "failure"){
                    $(".log_input").css({"border" : "#ec4e20 1px solid","color":"#ec4e20","font-size":"15px"}).val("Login already used")

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