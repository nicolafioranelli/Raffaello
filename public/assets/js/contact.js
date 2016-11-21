$(document).ready(function() {
//Contact Form 
// Form validation via the jQuery Validate plugin
$('#contactForm').validate({
  debug: true,
  ignore: ".ignore",
  errorElement: "span",
  rules: {
    name: {
      required: true,
      minlength: 2
    },
    email: {
      required: true,
      email: true
    },
    subject: {
      required:true,
      minlength:2
    },
    message: {
      required: true
    }
  },

  submitHandler: function(form) {
    $.ajax({
      type: "POST",
      url: "php/contact.php",
      data: $(form).serialize(),
      success: function(response){

}
});
return false; // required to block normal submit since you used ajax
} 

});//validate
// Reset validation messages when clearing or cancelling the form
$('#reset, #cancel').on('click', function() {
  $('span.error').hide();
  $('.error, .valid').removeClass('error valid');
}); 
});