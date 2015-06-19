$(function() {
    $( ".allchatbtn" ).click(function() {
      console.log("click");
      $(".allchatplusbtn").toggleClass("glyphicon-plus");
      $(".allchatplusbtn").toggleClass("glyphicon-minus");
      $(".chatpanel").toggleClass("col-md-8");
      $(".chatpanel").toggleClass("col-md-4");
      $(".allchatpanel").toggleClass("hide");
    });

    $(".notificationclose").click(function(object){
      var id = $(this).parent().attr('id');
      var employee = $(this).parent().attr('employee');

      var url = 'http://178.62.252.32:8080/employees/' + employee + '/notifications/' + id;

      console.log("clicked");

      //$.ajax({
      //    url: url,
      //    type: 'DELETE',
      //    success: function(result) {
      //        $(this).parent().fadeOut("slow");
      //    }
      //});
      // call doen om ze ook uit de sessie te verwijderen
    });
});
