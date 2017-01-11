$(document).ready(function () {
    var form = $("#form-updatepassword");
    var timeoutTrigger;
    // press update button
    $(".submit-btn").click(function (e) {
        e.preventDefault();
        $(".msg").hide();
        var passWd = form.find(".user-password").val();
        var passWdTwice = form.find(".user-password.twice").val();
        if (passWd != "" && passWdTwice != "") {
            if(passWd == passWdTwice) {
                $.ajax({
                    url: ajaxUrl,
                    type: "POST",
                    data: {"password": passWd},
                    dataType: 'json'
                }).done(function (data) {
                    if (data.result == "0") {
                        // UI
                        showAlertBox('#alertbar');

                        timeoutTrigger = setTimeout(function () {
                            // timeout to reload page
                            $(location).attr('href', "index.html");
                        }, 3000);
                    } else {
                        $(".error-msg").show();
                    }
                }).error(function (data) {
                    $(".error-msg").show();
                });
            }else{
                $(".valid-msg").show();
            }
        } else {
            $(".valid-msg").show();
        }
    });
    // close AlertBox
    $(".close-alert").click(function(){
        // stop timeout trigger
        clearTimeout(timeoutTrigger);
        $(".mask").remove();
        $("#alertbar").addClass("close");
    });
});

function showAlertBox(alertElem) {
    var mask = "<div class='mask' style='height:100%;width:100%'></div>";
    $("body").append(mask);
    var w=$(alertElem).width(),
        h=$(alertElem).height();
    $(alertElem).css({"margin-left":-(w/2)-30+"px","margin-top":-(h/2)-30+"px"});
    $(alertElem).removeClass("close");
}