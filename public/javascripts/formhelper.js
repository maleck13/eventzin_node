$('document').ready(function(){
    
    
    var registerForm = $('form[name="register"]');
    if(registerForm.length > 0){
        console.log("register form found");
        registerForm.find("input[name='username']").keyup(function(){
            console.log("called key down"+ $(this).val());
            if($(this).val().length > 3){
                $.post("/user/checkUsername", {username:$(this).val()}, function(data){
                    if(data.available !== true){
                        $('span#username_error').html("username unavailable");
                        $('span#username_error').show();
                    }else{
                        $('span#username_error').hide();
                    }
                    
                }, 'json');
            }
        });
        registerForm.find("input[names='email']").keyup(function(){
            if($(this).val().length > 6){
                $.post("/user/checkEmail", {email:$(this).val()}, function(data){
                    if(data.available !== true){
                        $('span#email_error').html("email adddress already registered");
                        $('span#email_error').show();
                    }else{
                        $('span#email_error').hide();
                    }
                }, 'json');
            }
        });
        
        registerForm.submit(function(){
            
            
        });
    }
    
    $('.date').datepicker();
    
});







