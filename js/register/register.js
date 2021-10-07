function uploadPhoto() {
    document.getElementById("inpPhoto").click();
}

document.getElementById("inpPhoto").onchange = function (evt) {
    var tar = evt.target || window.event.srcElement;
    var photofile = tar.files;

    if (FileReader && photofile && photofile.length) {

        var fr = new FileReader();
        fr.readAsDataURL(photofile[0]);
        fr.onload = function (e) {
            var img = new Image();
            img.src = e.target.result;
            img.name = e.target.name;
            img.size = e.target.size;
            img.onload = function (el) {
                var elem = document.createElement("canvas");
                var scaleFactor = 100/el.target.width;
                elem.width = 100;
                elem.height = el.target.height * scaleFactor;

                var ctx = elem.getContext("2d");
                ctx.drawImage(el.target, 0, 0, elem.width, elem.height);

                var srcEncoded = ctx.canvas.toDataURL(el.target, 'image/jpeg', 0);

                document.getElementById("imgPhoto").src = srcEncoded;
            }
        }
    }
    else {
        console.log("not supported :: try sending the image uploaded to a server then ajax query download it back");
    }
}