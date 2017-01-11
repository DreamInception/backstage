$(document).ready(function () {

    if(top.location != this.location){
        top.location = this.location;
    }

    var form = $("#form-login");
    $(".submit-btn").click(function (e) {
        e.preventDefault();
        $(".msg").hide();
        if (form.find(".user-name").val() != "" && form.find(".user-password").val() != "") {
            var userName = form.find(".user-name").val();
            var passWd = form.find(".user-password").val();
            $.ajax({
                url: loginUrl,
                type: "POST",
                data: {"loginName": userName, "password": passWd},
                dataType: 'json'
            }).done(function (data) {
                if (data.result == "0") {
                    $(location).attr('href', "index.html");
                } else {
                    $(".error-msg").show();
                }
            }).error(function(data){
                $(".error-msg").show();
            });
        } else {
            $(".valid-msg").show();
        }
    });
    form.find("input").focusin(function () {
        $(this).parent().find(".icon").addClass("active");
    }).focusout(function () {
        $(this).parent().find(".icon").removeClass("active");
    });
});