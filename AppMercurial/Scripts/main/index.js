// --
function readCookie(name) {
    // --
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

}

// Leemos la cookie
var miCookie = readCookie("IdPais");

// Muestra "Ecuador"
//alert(miCookie);