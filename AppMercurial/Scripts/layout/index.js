// --
function logout() {
    // --
    $.ajax({
        url: urlLogOut,
        type: 'POST',
        cache: false,
        async:true,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            // --
            console.log(urlMain);
            location.reload();

        }
    })
}

// --
function GetUser() {
    // --
    $.ajax({
        url: urlGetUser,
        type: 'GET',
        cache: false,
        async: true,
        dataType: 'json',
        success: function (data) {
            //console.log(data);
            if (data.Data.length > 0) {
                $('#lbl_login_usuario').text(data.Data[0].NombreUsuario)
                $('#lbl_nombre_apellido_usuario').text(data.Data[0].Nombre + ' ' + data.Data[0].ApellidoPaterno + ' ' + data.Data[0].ApellidoMaterno)
                $('#lbl_correo_usuario').text(data.Data[0].Email)
            }
        }
    })
}

GetUser()