$('document').ready(function(){
    
    var registerForm = $('form[name="register"]');
    if(registerForm.length > 0){
        console.log("register form found");
        registerForm.find("input[name='username']").keyup(function(){
            console.log("called key down"+ $(this).val());
            if($(this).val().length > 3){
                $.post("/user/checkUsername", {username:$(this).val()}, function(data){
                    
                    console.log(data);
                }, 'json');
            }
        });
        registerForm.find("input[names='email']").keyup(function(){
            if($(this).val().length > 6){
                $.post("/user/checkEmail", {email:$(this).val()}, function(data){
                    
                }, 'json');
            }
        });
    }
    
    $('.date').datepicker();
    
});





