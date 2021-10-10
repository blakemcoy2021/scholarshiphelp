function init() {
    var uname = document.getElementById("lblScholarName");
    if (typeof(Storage) !== "undefined") {
        let fname = window.localStorage.getItem("fname");
        uname.innerHTML = fname;
        console.log("Acquire localstorage value :: " + fname);

        document.getElementById("hidfld_uid").value = window.localStorage.getItem("uid");
        document.getElementById("hidfld_fname").value = fname;

    } else {
        let urlParams = new URLSearchParams(window.location.search);
        let fname = urlParams.get("fname");
        uname.innerHTML = fname;
        console.log("NO localstorage support :: " + fname);

        document.getElementById("hidfld_uid").value = urlParams.get('uid');
        document.getElementById("hidfld_fname").value = fname;
    }
}

document.getElementById("inpCOR").onchange = function (evt) {
    document.getElementById("lbldoc1").innerHTML = getFileName(document.getElementById("inpCOR").value);
}

document.getElementById("inpCOG").onchange = function (evt) {
    document.getElementById("lbldoc2").innerHTML = getFileName(document.getElementById("inpCOG").value);
}

document.getElementById("inpIDG").onchange = function (evt) {
    document.getElementById("lbldoc3").innerHTML = getFileName(document.getElementById("inpIDG").value);
}

function getFileName(fullPath) {
    var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
    var filename = fullPath.substring(startIndex);
    if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
        filename = filename.substring(1);
    }
    console.log(filename);
    return filename;
}