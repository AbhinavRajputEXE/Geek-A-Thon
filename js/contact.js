/*==================== CONTACT FORM ====================*/ 

function sendEmail(){
    Email.send({
        SecureToken: "b5f1ffbe-42fd-4df6-be9b-deddf87c6041",
        To : 'solvingforindiagfg@gmail.com',
        From : 'solvingforindiagfg@gmail.com',
        Subject : "KhetiFy feed form",
        Body : "Name: "+document.getElementById("bb-name").value
              +"<br> Email: "+document.getElementById("bb-email").value
              +"<br> Phone: "+document.getElementById("bb-phone").value
              +"<br> Message: "+document.getElementById("bb-message").value
    }).then(
      message => alert(message)
    );
}