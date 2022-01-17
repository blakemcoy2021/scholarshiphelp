function isLetter(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 32 && (charCode < 65 || charCode > 90) && (charCode < 97 || charCode > 122) ) {
      return false;
    }
    return true;
}
function isNumber(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode < 48 || charCode > 57) {
        return false;
    }
    return true;
}