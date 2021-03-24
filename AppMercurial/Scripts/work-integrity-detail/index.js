var ListAccessUser;
// --
const functions = new Functions()
var DataSearch;

// --
var IdIntegridadUpdate = null
var ItemUpdate = null
var DataList;
var datosDetalle = null;
var listDataCheck = [];

// -- Table
var tableWorkIntegrityDetail = $('#tbl_data').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

function ChangeStatus() {
    //$('option:selected', '#my_select').val();
    let IdIntegridad = getDatos("IdIntegridad");


    $('#cboEstados').val(datosDetalle.IdStatus);
    $('#idIntegrity').val(IdIntegridad);
    $('#txtPorcentaje').val(datosDetalle.Progreso);
}
GetDataDetalle();
function GetDataDetalle() {
    // --
    let IdIntegridad = getDatos("IdIntegridad");

    $.ajax({
        url: urlGetWorkIntegrity2 + '?IdIntegridad=' + IdIntegridad + '',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            let obj = data.Data
            datosDetalle = obj;
            console.log(datosDetalle);

        }
    })
}
$("#btnGuardarEstado").on('click', function () {
    var idIntegrity = $("#idIntegrity").val();
    var porcentaje = $("#txtPorcentaje").val();
    var statusCheck = $("#chkEnvioCorreo").is(':checked') ? 1 : 0;
    var idStatus = $("#cboEstados").val();


    if (porcentaje > 100 || porcentaje < 0) {
        Swal.fire(
            'Save Status',
            'Rango entre 0 a 100',
            "warning"
        );
        return;
    }

    var DescripcionEmpresa = localStorage.getItem('DescripcionEmpresa');
    var Servicios = localStorage.getItem('Servicios');


    var datos = {
        "idIntegrity": idIntegrity,
        "porcentaje": porcentaje,
        "statusCheck": statusCheck,
        "idStatus": idStatus,
        "DesEmpresa": "",
        "DesStatus": $("#cboEstados option:selected").text(),
        "CodigoIntegridad": datosDetalle.CodigoIntegridad,
        "desServicios": "",
        "idUsuario": datosDetalle.IdUsuario,
    }

    console.log("Datos con lo que se envia");

    console.log(datos);

    //+ "?idInteg=" + idIntegrity + "&idStatus=" + idStatus + "&Porcentaje=" + porcentaje + "&sta=" + statusCheck

    $.ajax({
        url: urlUpdateStatus,
        type: 'POST',
        data: datos,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data.apiResponse.status == "OK") {

                Swal.queue([{
                    title: 'Save Status',
                    confirmButtonText: 'OK',
                    text: data.apiResponse.msg,
                    icon: 'success',
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        $("#modal_Transaction").modal('hide');
                        GetDataDetalle();
                    }
                }]);

            } else {
                Swal.fire(
                    'Save Status',
                    data.apiResponse.msg,
                    "error"
                );
            }
        },
        error: function (error) {
            console.log(error)
        }
    })

});
function getChecksStatus() {
    // --
    $.ajax({
        url: urlGetStatusIntegrity,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // --
            let html = ''
            // --
            let obj = data.Data
            // --
            if (obj.length > 0) { // -- Verificar si tiene datos

                console.log(data);


                let SelectEstados = $("#cboEstados");
                // --
                $.each(obj, function (key, value) {
                    SelectEstados.append('<option value=' + value.IdStatus + '>' + value.DescripcionStatus + '</option>');
                    // --
                    if (value.IdStatus == 4) {
                        html += '<div class="col-sm-2">'
                        html += '    <label class="ckbox">'
                        html += '        <input type="checkbox"  name="check_status[]" value="' + value.IdStatus + '" ><span>' + value.DescripcionStatus + '</span>'
                        html += '    </label>'
                        html += '</div>'
                    } else {
                        html += '<div class="col-sm-2">'
                        html += '    <label class="ckbox">'
                        html += '        <input type="checkbox" checked="" name="check_status[]" value="' + value.IdStatus + '" ><span>' + value.DescripcionStatus + '</span>'
                        html += '    </label>'
                        html += '</div>'
                    }

                });
            }
            // --
            $('#div_checks').html(html)
            // -- 
        }
    })
}
getChecksStatus();
function GetPrivilegios() {
    // --
    $.ajax({
        url: urlGetPrivilegios,
        type: 'GET',
        success: function (data) {
            // --
            let statusDisplay = false
            // --
            if (data != null && data != undefined) {
                // --  
                if (data.RolAcceso != null) {
                    $.each(data.RolAcceso, function (key, value) {
                        if (value.IdAcceso == 22) {
                            statusDisplay = true
                        }
                    })
                }
            }
            // --
            if (statusDisplay) {
                // --
                $('#btn_download_csv').css('display', 'block');
                $('#btn_change_status').css('display', 'block');

            } else {
                $('#btn_download_csv').css('display', 'none');
                $('#btn_change_status').css('display', 'none');

            }
        },
        beforeSend: function (xhr) {
            console.log(xhr);
            $('#btn_download_csv').css('display', 'none');
            $('#btn_change_status').css('display', 'none');

        }
    });

}

// --
function GetAccessUser() {
    let url = urlGetAccess;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (d) {
            console.log('Access', d);
            ListAccessUser = d.RolAcceso;
            getDetailWorkIntegrity()
        }
    });
}

function getDatos(variable) {
    // --
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return false;
}
function base64ToArrayBuffer(base64) {
    var binaryString = atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}

function saveByteArray(reportName, byte) {
    var blob = new Blob([byte], { type: "application/pdf" });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
};


function downloadFileZip() {
    console.log(DataList);
    let IdIntegridad = getDatos("IdIntegridad");
    let url = UrlGetFilesZip + "?id=" + IdIntegridad ;
    window.open(url, '_blank');
    
}


function downloadDocument(idIntegridad, itemIntegridad, idservicio, idflag) {
    $.ajax({
        url: urlValidateFile + "?id=" + idIntegridad + "&detail=" + itemIntegridad + "&doc=" + idflag,
        type: 'GET',
        dataType: 'json',
        success: function (d, statusText, xhdr) {
            console.log(d);
            if (d == true) {
                let url = urlGetdonwloadFile + "?id=" + idIntegridad + "&detail=" + itemIntegridad + "&doc=" + idflag;
                window.open(url, '_blank');
            } else {
                functions.notify_message("No se encontro archivo para descargar", 'warning')
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
}

function downloadFilePDF(ruta, nombre, ext) {

    // -- Funciona prro :v
    let url = urlGetdonwloadFile2 + "?ruta=" + ruta;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (d) {

            if (d != "" && d != null && d != undefined) {
                let sampleArr = base64ToArrayBuffer(d);
                console.log(sampleArr);
                saveByteArray(nombre, sampleArr, 'pdf');
            }
        }
    });
}

function cambiarIdioma() {
    lang = $("#idioma").val();
    // Habilita las 2 siguientes para guardar la preferencia.
    // lang = lang || sessionStorage.getItem('app-lang') || 'es';
    // sessionStorage.setItem('app-lang', lang);

    var elems = document.querySelectorAll('[data-tr]');
    for (var x = 0; x < elems.length; x++) {
        elems[x].innerHTML = frases.hasOwnProperty(lang)
            ? frases[lang][elems[x].dataset.tr]
            : elems[x].dataset.tr;
    }
}

// --
function getDetailWorkIntegrity() {
    // --
    let IdIntegridad = getDatos("IdIntegridad");
    $("#tbl_data").DataTable().clear()
    // --
    let Lista = ListAccessUser.filter(x => x.IdAcceso == 20);
    console.log(Lista)
    // --
    let acceso20 = ListAccessUser.filter(x => x.IdAcceso == 20);
    let acceso38 = ListAccessUser.filter(x => x.IdAcceso == 38);
    let acceso39 = ListAccessUser.filter(x => x.IdAcceso == 39);
    // --
    acceso20 = acceso20[0]
    acceso38 = acceso38[0]
    acceso39 = acceso39[0]

    // --
    $.ajax({
        url: urlGetDetailWorkIntegrity + '?IdIntegridad=' + IdIntegridad + '',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            let obj = data.Data
            DataList = obj;
            // --
            console.log('Detail', obj)
            if (obj !== null) {
                if (obj.length > 0) {
                    // --
                    $("#lbl_numero_documento").text(obj[0].CodigoIntegridad)
                    $.each(obj, function (key, value) {
                        // --
                        let nombres = "-"
                        // --
                        if (value.NombreCompleto != "" && value.NombreCompleto != null) {
                            nombres = value.NombreCompleto
                        }

                        // --
                        var downloadDocument = ''
                        var openFormulary = ''
                        var setOperator = ''
                        var openFormCheck = '<input class="" id="CheckId_' + value.Item   +   '" style=" margin-left: 1rem;  width: 1.4rem;height: 1.4rem;vertical - align: -webkit - baseline - middle;" type = "checkbox" value = "" onclick="checkDownload(' + value.IdIntegridad + ', ' + value.Item + ')" />';
                        

                        // -- Validate Access
                        if (acceso39 != undefined) {
                            if (acceso39.IdAcceso == 39) {
                                downloadDocument = '<a href="#" class="btn btn-primary btn-icon rounded-circle" onclick="downloadDocument(' + value.IdIntegridad + ', ' + value.Item + ', ' + "'" + value.DesTipoDocIdentidad + "'" + ', ' + value.NroDocumento + ')"><div style="width: 25px!important;height: 25px!important;"><i class="fa fa-download"></i></div></a> '
                            }
                        }

                        // --
                        //openFormulary = '<a href="#" class="btn btn-primary btn-icon rounded-circle" onclick="openFormulary(' + value.IdIntegridad + ', ' + value.Item + ', ' + value.IdServicio + ', ' + value.FlgServicioGuardado + ')"><div style="width: 25px!important;height: 25px!important;"><i class="fa fa-file-alt"></i></div></a> '
                        if (acceso20 != undefined) {
                            if (acceso20.IdAcceso == 20) {
                                openFormulary = '<a href="#" class="btn btn-primary btn-icon rounded-circle" onclick="openFormulary(' + value.IdIntegridad + ', ' + value.Item + ', ' + value.IdServicio + ', ' + value.FlgServicioGuardado + ')"><div style="width: 25px!important;height: 25px!important;"><i class="fa fa-edit"></i></div></a> '
                                //if (value.IdUsuarioAsignado != null && value.IdUsuarioAsignado != 0) {
                                //    openFormulary = '<a href="#" class="btn btn-primary btn-icon rounded-circle" onclick="openFormulary(' + value.IdIntegridad + ', ' + value.Item + ', ' + value.IdServicio + ', ' + value.FlgServicioGuardado + ')"><div style="width: 25px!important;height: 25px!important;"><i class="fa fa-file-alt"></i></div></a> '
                                //}
                            }
                        }

                        // -- 
                        //if (acceso38 != undefined) {
                        //    if (acceso38.IdAcceso == 38) {
                        //        setOperator = '<a href="#" class="btn btn-primary btn-icon rounded-circle" onclick="openSetClient(' + value.IdIntegridad + ', ' + value.Item + ', ' + value.IdServicio + ', ' + value.FlgServicioGuardado + ', ' + value.IdUsuarioAsignado + ')"><div style="width: 25px!important;height: 25px!important;"><i class="icon ion-person"></i></div></a> '
                        //    }
                        //}

                        // --
                        tableWorkIntegrityDetail.row.add([
                            openFormCheck,
                            value.DesTipoDocIdentidad,
                            value.NroDocumento,
                            nombres,
                            value.DescripcionServicio,
                            value.Departamento,
                            value.Distrito,
                            value.Direccion,
                            value.Email,
                            value.Celular,
                            downloadDocument + openFormulary + setOperator
                        ]).draw(false);
                        tableWorkIntegrityDetail.columns.adjust()
                            .responsive.recalc();
                    })
                    // --
                    functions.notify_message(MESSAGE.es.success_select, 'success')
                } else {
                    functions.notify_message(MESSAGE.es.error_select, 'warning')
                }
            } else {
                functions.notify_message(MESSAGE.es.error_select, 'warning')
            }

        }
    })
}

function _base64ToArrayBuffer(base64) {
    console.log(base64);
    var binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

function downloadFileSelectZip() {
    console.log(DataList);
    let IdIntegridad = getDatos("IdIntegridad");
    var listId = [];
    listDataCheck.forEach(function (valor) {
        console.log(valor);
        var item = { "idItem": valor };
        listId.push(item);
    });

    var listid2 = [];
    listDataCheck.forEach(function (valor) {
        console.log(valor);
        var item = { "idItem": valor.toString() };
        listid2.push(item);
    });
    
    console.log(listid2);
   
    let data = {
        "id": IdIntegridad,
        "idsDetail": listId,
        "idstring" : listid2
    };
    console.log(data);
    $.ajax({
        url: UrlGetFilesSelect,
        type: 'POST',
        data: data,
        dataType: 'json',
        success: function (d) { 

            console.log(d)
            var blob = new Blob([_base64ToArrayBuffer(d.apiResponse.data)], { type:"application/zip" });
            var link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = "CheckFiles_" + IdIntegridad +  ".zip";
            link.click();
            
         


        }
    })
}


// --
function printDetail(idIntegridad, item, idServicio, status) {
    // --
    console.log(idIntegridad + '|' + item)
}

// --
function openSetClient(idIntegridad, item, idServicio, status, IdUsuarioAsignado) {
    // --
    $('#exampleModalCenter').modal('show')
    // --
    IdIntegridadUpdate = idIntegridad
    ItemUpdate = item
    // --
    $('#btn_guardar_user_rol').attr("disabled", true);
    // --
    getListUser(IdUsuarioAsignado)
}

// --
function getListUser(IdUsuarioAsignado) {
    // --
    $.ajax({
        url: urlGetUserRol + '?idRol=9',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // --
            console.log(data)
            let html = ''
            html += '<option value="0">[Seleccionar]</option>'
            // --
            let obj = data.Data
            // --
            if (obj.length > 0) { // -- Verificar si tiene datos
                // --
                $.each(obj, function (key, value) {
                    // --
                    if (value.IdUsuario == IdUsuarioAsignado) {
                        html += '<option value="' + value.IdUsuario + '" selected="selected"> ' + value.Usuario + '</option>'
                    } else {
                        html += '<option value="' + value.IdUsuario + '"> ' + value.Usuario + '</option>'
                    }

                });
            }
            // --
            $('#sl_user_rol').html(html);
            $('#btn_guardar_user_rol').attr("disabled", false);
        }
    })
}

$("#btn_guardar_user_rol").on('click', function () {
    // --
    setUserRol()
})

// --
function setUserRol() {
    // --
    let slUserRol = $("#sl_user_rol").val()
    // --
    if (IdIntegridadUpdate != null && ItemUpdate != null && slUserRol != "0" && slUserRol != 0) {
        // --
        var URL = urlSetUserRol + '?IdIntegridad=' + IdIntegridadUpdate + '&ItemIntegridadDet=' + ItemUpdate + '&IdUsuarioAsignado=' + parseInt(slUserRol)
        console.log('URL', URL)
        // --
        $.ajax({
            url: URL,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // --
                functions.notify_message("Registro exitoso.", 'success')
                $("#exampleModalCenter").modal('hide')
                getDetailWorkIntegrity()
            }
        })
    } else {
        console.log('Parametros nulos, revisar')
    }

}

// --
function getComentary() {
    // --
    let IdIntegridad = getDatos("IdIntegridad");
    var URL = urlGetCommentaryWorkIntegrity + '?IdIntegridad=' + IdIntegridad
    // --
    $.ajax({
        url: URL,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // --
            $("#lbl_commentary").text(data.Data.Comentario)
        }
    })

}

// --


$("#btnSelectZip").on('click', function () {
    // --
    if (listDataCheck.length == 0) {
        Swal.fire(
            'Debe seleccionar algun archivo a descargar',
            "No se encontro ningun archivo seleccionado",
            "warning"
        )
    } else { downloadFileSelectZip(); }
    
})
$("#chkSelAll").on('click', function () {
    // --
    console.log(DataList);
    console.log();
    
    DataList.forEach((element) => {
        var id = "CheckId_" + element.Item;
        console.log(id);
        $('#' + id).prop('checked', this.checked);

        if (this.checked) {
            const index = listDataCheck.indexOf(Number(element.Item));
            if (index > -1) {

            } else {
                listDataCheck.push(Number(element.Item));
            }
            console.log(listDataCheck);
        } else {
            listDataCheck = [];
        }
        

    });

    
})



function checkDownload(idIntegridad, item) {
         console.log(item);
        const index = listDataCheck.indexOf(item);
    if (index > -1) {
        listDataCheck.splice(index, 1);
    } else {
        listDataCheck.push(item);
    }

    console.log(listDataCheck);
    
}
function openFormulary(idIntegridad, item, idServicio, status) {
    // -- 
    if (idServicio == "1") {            // --  ANALISIS DE RIESGO 180 º PLUS PERÚ
        // --
        window.location.replace(BASE_URL + 'Services/FormatoAnalisisRiesgo180PlusPeru?key=' + idIntegridad + "&item=" + item + "&status=" + status)

    } else if (idServicio == "2") {     // --  ANALISIS DE RIESGO 180 º PERÚ
        // --
        window.location.replace(BASE_URL + 'Services/FormatoAnalisisRiesgo180Peru?key=' + idIntegridad + "&item=" + item + "&status=" + status)

    } else if (idServicio == "3") {     // --  ANALISIS DE RIESGO 270 PLUS PERÚ
        // --
        window.location.replace(BASE_URL + 'Services/FormatoAnalisisRiesgo270PlusPeru?key=' + idIntegridad + "&item=" + item + "&status=" + status)

    } else if (idServicio == "4") {     // --  ANALISIS DE RIESGO 270 º PERÚ
        // --
        window.location.replace(BASE_URL + 'Services/FormatoAnalisisRiesgo270Peru?key=' + idIntegridad + "&item=" + item + "&status=" + status)

    } else if (idServicio == "5") {     // --  ANALISIS DE RIESGO 360º PLUS PERÚ
        // --
        window.location.replace(BASE_URL + 'Services/FormatoAnalisisRiesgo360PlusPeru?key=' + idIntegridad + "&item=" + item + "&status=" + status)

    } else if (idServicio == "6") {     // --  ANALISIS DE RIESGO 360º PERÚ
        // --
        window.location.replace(BASE_URL + 'Services/FormatoAnalisisRiesgo360Peru?key=' + idIntegridad + "&item=" + item + "&status=" + status)

    } else if (idServicio == "7") {     // --  POLÍGRAFO PERÚ
        // --
        window.location.replace(BASE_URL + 'Services/FormatoPoligrafoColombia?key=' + idIntegridad + "&item=" + item + "&status=" + status)
    } else if (idServicio == "8") {
        // --
        window.location.replace(BASE_URL + 'Services/FormatoAnalisisRiesgo90Peru?key=' + idIntegridad + "&item=" + item + "&status=" + status)
    } else if (idServicio == "9") {
        // --
        window.location.replace(BASE_URL + 'Services/FormatoAnalisisRiesgo90PlusPeru?key=' + idIntegridad + "&item=" + item + "&status=" + status)
    }
    else if (idServicio == "40") {            // --  ANALISIS DE RIESGO 180 º PLUS COLOMBIA
        // --
        window.location.replace(BASE_URL + 'Services/FormatoAnalisisRiesgo180PlusColombia?key=' + idIntegridad + "&item=" + item + "&status=" + status)

    } else if (idServicio == "41") {     // --  ANALISIS DE RIESGO 180 º COLOMBIA
        // --
        window.location.replace(BASE_URL + 'Services/FormatoAnalisisRiesgo180Colombia?key=' + idIntegridad + "&item=" + item + "&status=" + status)

    } else if (idServicio == "42") {     // --  ANALISIS DE RIESGO 270 PLUS COLOMBIA
        // --
        window.location.replace(BASE_URL + 'Services/FormatoAnalisisRiesgo270PlusColombia?key=' + idIntegridad + "&item=" + item + "&status=" + status)

    } else if (idServicio == "43") {     // --  ANALISIS DE RIESGO 270 º COLOMBIA
        // --
        window.location.replace(BASE_URL + 'Services/FormatoAnalisisRiesgo270Colombia?key=' + idIntegridad + "&item=" + item + "&status=" + status)

    } else if (idServicio == "44") {     // --  ANALISIS DE RIESGO 360º PLUS COLOMBIA
        // --
        window.location.replace(BASE_URL + 'Services/FormatoAnalisisRiesgo360PlusColombia?key=' + idIntegridad + "&item=" + item + "&status=" + status)

    } else if (idServicio == "45") {     // --  ANALISIS DE RIESGO 360º COLOMBIA
        // --
        window.location.replace(BASE_URL + 'Services/FormatoAnalisisRiesgo360Colombia?key=' + idIntegridad + "&item=" + item + "&status=" + status)

    } else if (idServicio == "46") {     // --  POLÍGRAFO COLOMBIA
        // --
        window.location.replace(BASE_URL + 'Services/FormatoPoligrafoColombia?key=' + idIntegridad + "&item=" + item + "&status=" + status)
    } else if (idServicio == "20") {     // --   ANÁLISE DE RISCO 03 BRASIL
        // --
        window.location.replace(BASE_URL + 'Services/FormatoAnalisisRiesgo03Brasil?key=' + idIntegridad + "&item=" + item + "&status=" + status)
    } else if (idServicio == "21") {     // --   ANÁLISE DE RISCO 270  BRASIL
        // --
        window.location.replace(BASE_URL + 'Services/FormatoAnalisisRiesgo270Brasil?key=' + idIntegridad + "&item=" + item + "&status=" + status)
    } else if (idServicio == "22") {     // --   ANÁLISE DE RISCO 270 PLUS BRASIL
        // --
        window.location.replace(BASE_URL + 'Services/FormatoAnalisisRiesgo270PlusBrasil?key=' + idIntegridad + "&item=" + item + "&status=" + status)
    } else if (idServicio == "23") {     // --   ANÁLISE DE RISCO 270 PLUS BRASIL
        // --
        window.location.replace(BASE_URL + 'Services/FormatoAnalisisRiesgo360Brasil?key=' + idIntegridad + "&item=" + item + "&status=" + status)
    } else if (idServicio == "10") {     // --   ANALISIS DE RIESGO BÁSICO
        // --
        window.location.replace(BASE_URL + 'Services/FormatoAnalisisRiesgoBasicoPeru?key=' + idIntegridad + "&item=" + item + "&status=" + status)
    } else if (idServicio == "11") {     // --   ANÁLISE DE RIESGO PREMIUM
        // --
        window.location.replace(BASE_URL + 'Services/FormatoAnalisisRiesgoPremiumPeru?key=' + idIntegridad + "&item=" + item + "&status=" + status)
    }


}


$("#btn_download_csv").on('click', function () {
    // --
    let IdIntegridad = getDatos("IdIntegridad");
    // --
    $.ajax({
        url: urlValidateFileExcel + "?id=" + IdIntegridad + "&nameTypeFile=ExcelLoad",
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data == true) {
                let url = urlGetdonwloadFileExcel + "?id=" + IdIntegridad + "&nameTypeFile=ExcelLoad";
                window.open(url, '_blank');
            } else {
                functions.notify_message("No se encontro archivo para descargar", 'warning')
            }
        },
        error: function (e) {
            console.log(e);
        }
    });
})


// --
$(".previewClass").click(async function () {
    let route = $(this).attr('data-route');
    if (route != undefined && route != null && route != "") {
        $("#imgPreview").attr('src', 'https://i.gifer.com/YCZH.gif');
        $("#modalIMG").modal("show");
        $("#modalIMG").addClass("in");
        let typeFile = $(this).attr('data-typefile');
        var RouteDecode = route;
        await getImgBase64(RouteDecode, typeFile);
    } else {
        console.log("no se encontro");
        Swal.fire(
            'Previsualizar imagen',
            "No se encontro ningun archivo",
            "warning"
        )
    }
});

$("#btnZip").click(async function () {
    downloadFileZip();
});


// --
async function getImgBase64(route, typeFile) {
    let datos = {
        "route": route
    };
    $.ajax({
        url: urlDownloadBase64,
        type: 'POST',
        dataType: 'json',
        data: datos,
        success: function (d) {
            //console.log(d);
            $("#imgPreview").attr('src',
                'data:image/' + typeFile + ';base64,' + d);
        }
    });
}


// -- Init
GetAccessUser()
GetPrivilegios()
getComentary()