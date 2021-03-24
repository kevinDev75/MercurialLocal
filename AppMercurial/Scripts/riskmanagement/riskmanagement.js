document.oncontextmenu = function () { return false }
// -- GLOBAL
const functions = new Functions()
var xGestionRiesgo = null
var ListAccessUser = null

//$(document).ready(function () {
//$("#sl_modal_register_RiskManagement_empresa").select2({
//    dropdownParent: $("#modal_register_RiskManagement")
//});
//});

// -- Datepicker
$('#txt_fecha_inicio_RiskManagement').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})
$('#txt_fecha_fin_RiskManagement').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})


//#region -- GESTION DE RIESGOS

// -- VARIABLES
var listRiskManagement = new Array()
var indexListRiskManagement = 1

// -- TABLE
var tableDataRiskManagement = $('#tbl_data_RiskManagement').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    },
    order: [[0, "desc"]],
    autoWidth: false
})

// -- GUARDAR
$('#btn_guardar_registro_RiskManagement').on('click', function () {
    // --
    var formData = new FormData();

    var sl_modal_register_RiskManagement_empresa = $('#sl_modal_register_RiskManagement_empresa').val()
    var txt_RiskManagement_Nombre = $('#txt_RiskManagement_Nombre').val()
    var txt_RiskManagement_Link = $('#txt_RiskManagement_Link').val()
    var sl_modal_register_RiskManagement_TipoAlerta = $('#sl_modal_register_RiskManagement_TipoAlerta').val()
    var sl_modal_register_sucursal = $('#sl_modal_register_sucursal').val()

    // -- ARCHIVO ADJUNTO
    var file_RiskManagement = $('#file_modal_register_RiskManagement_1').prop("files")[0];
    var ext_RiskManagement = ""
    // --
    if (file_RiskManagement !== undefined) {
        // --
        ext_RiskManagement = getFileExtension(file_RiskManagement.name)
        // --
        formData.append("dataFile", file_RiskManagement, "RiskManagement." + ext_RiskManagement);
    }

    // -- ARCHIVO ADJUNTO 02
    var file_RiskManagement_2 = $('#file_modal_register_RiskManagement_2').prop("files")[0];
    var ext_RiskManagement_2 = ""
    // --
    if (file_RiskManagement_2 !== undefined) {
        // --
        ext_RiskManagement_2 = getFileExtension(file_RiskManagement_2.name)
        // --
        formData.append("dataFile", file_RiskManagement_2, "RiskManagement2." + ext_RiskManagement_2);
    }
    
    // -- OBJECT
    var objectData = {
        // --
        "IdGestionRiesgos": 0,
        "IdEmpresa": Number(sl_modal_register_RiskManagement_empresa),
        "Nombre": txt_RiskManagement_Nombre,
        "Link": txt_RiskManagement_Link,
        "IdTipoAlerta": sl_modal_register_RiskManagement_TipoAlerta,
        "IdSucursal": sl_modal_register_sucursal,
        "IdUsuarioEnvio": 0,
        "ArchivoAdjunto1":
        {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "RiskManagement." + ext_RiskManagement, // -- 
            "RutaArchivo": null,
            "ExtensionArchivo": ext_RiskManagement,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        },
        "ArchivoAdjunto2":
        {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "RiskManagement2." + ext_RiskManagement_2, // -- 
            "RutaArchivo": null,
            "ExtensionArchivo": ext_RiskManagement_2,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        },
        "FlgEstado": true
    }
    
    if ($('#modal_register_RiskManagement').attr('data-idgestionriesgo') > 0 && xGestionRiesgo != null) { //SI ESTA EDITANDO
        if (xGestionRiesgo.ArchivoAdjunto1.IdArchivoAdjunto > 0) {
            objectData.IdGestionRiesgos = xGestionRiesgo.IdGestionRiesgos
            objectData.ArchivoAdjunto1.IdArchivoAdjunto = xGestionRiesgo.ArchivoAdjunto1.IdArchivoAdjunto
            objectData.ArchivoAdjunto1.NombreArchivo = xGestionRiesgo.ArchivoAdjunto1.NombreArchivo
            objectData.ArchivoAdjunto1.RutaArchivo = xGestionRiesgo.ArchivoAdjunto1.RutaArchivo
            objectData.ArchivoAdjunto1.ExtensionArchivo = xGestionRiesgo.ArchivoAdjunto1.ExtensionArchivo
            objectData.ArchivoAdjunto1.FecRegistro = xGestionRiesgo.ArchivoAdjunto1.FecRegistro
            objectData.ArchivoAdjunto1.IdUsuarioRegistro = xGestionRiesgo.ArchivoAdjunto1.IdUsuarioRegistro
            ext_RiskManagement = xGestionRiesgo.ArchivoAdjunto1.ExtensionArchivo
        }
        // -- Adjunto 2
        if (xGestionRiesgo.ArchivoAdjunto2.IdArchivoAdjunto > 0) {
            objectData.ArchivoAdjunto2.IdArchivoAdjunto = xGestionRiesgo.ArchivoAdjunto2.IdArchivoAdjunto
            objectData.ArchivoAdjunto2.NombreArchivo = xGestionRiesgo.ArchivoAdjunto2.NombreArchivo
            objectData.ArchivoAdjunto2.RutaArchivo = xGestionRiesgo.ArchivoAdjunto2.RutaArchivo
            objectData.ArchivoAdjunto2.ExtensionArchivo = xGestionRiesgo.ArchivoAdjunto2.ExtensionArchivo
            objectData.ArchivoAdjunto2.FecRegistro = xGestionRiesgo.ArchivoAdjunto2.FecRegistro
            objectData.ArchivoAdjunto2.IdUsuarioRegistro = xGestionRiesgo.ArchivoAdjunto2.IdUsuarioRegistro
            ext_RiskManagement_2 = xGestionRiesgo.ArchivoAdjunto2.ExtensionArchivo
        }
    }

    var camposVacios = ""
    // --
    if (txt_RiskManagement_Nombre == '' || txt_RiskManagement_Nombre == null) {
        camposVacios += "<span>Debe ingresar un nombre.</span></br>"
    }
    if (sl_modal_register_RiskManagement_empresa == 0) {
        camposVacios += "<span>No se ha selecionado la empresa.</span></br>"
    }
    if (txt_RiskManagement_Link == "" || isUrl(txt_RiskManagement_Link) == false) {
        camposVacios += "<span>Link incorrecto.</span></br>"
    }
    if (file_RiskManagement == undefined && ext_RiskManagement == '') {
        camposVacios += "<span>No se ha adjuntado ningun documento 01.</span>"
    }else if (ext_RiskManagement.toLowerCase() != "pdf") {
        camposVacios += "<span>El archivo debe ser PDF.</span>"
    }

    if (file_RiskManagement_2 == undefined && ext_RiskManagement_2 == '') {
        camposVacios += "<span>No se ha adjuntado ningun documento 02.</span>"
    } else if (ext_RiskManagement_2.toLowerCase() != "pdf") {
        camposVacios += "<span>El archivo debe ser PDF.</span>"
    }
    
    // --
    formData.append(
        "JsonMaster",
        JSON.stringify(objectData)
    );
    // --
    if (camposVacios != "") {
        // --
        Swal.fire(
            'Validacion',
            camposVacios,
            "warning"
        )
    } else {
        // --
        Swal.queue([{
            icon: 'info',
            title: '¿Desea guardar el registro?',
            html: camposVacios,
            confirmButtonText: 'Guardar',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#d33',
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                // --
                return $.ajax({
                    type: "POST",
                    url: urlSaveOrUpdateRiskManagement,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {

                        let obj = data.response;
                        // --
                        if (obj.status == 'OK') {
                            $('#content_loader_RiskManagement').css('display', 'none');
                            $("#modal_register_RiskManagement").modal('hide')
                            let object = new Object()
                            object["FechaInicio"] = $('#txt_fecha_inicio_RiskManagement').val()
                            object["FechaFin"] = $('#txt_fecha_fin_RiskManagement').val()
                            object["TipoReporte"] = $("#sl_RiskManagement_TipoAlerta").val();
                            getListRiskManagement(object)
                            functions.notify_message(MESSAGE.es.success_insert, 'success')
                        } else {
                            $('#content_loader_RiskManagement').css('display', 'none');
                            functions.notify_message(MESSAGE.es.error_insert, 'error')
                        }
                    },
                    beforeSend: function (xhr) {
                        $('#content_loader_RiskManagement').css('display', 'block');
                    },
                    error: function (e) {
                        console.log(e);
                    }
                });
            }
        }])
    }

})

// --
$('#modal_register_RiskManagement').on('shown.bs.modal', function (e) {
    $("#sl_modal_register_RiskManagement_empresa").select2({
        dropdownParent: $("#modal_register_RiskManagement")
    });
})

// --
function getListRiskManagement(object) {
    // --
    $("#tbl_data_RiskManagement").DataTable().clear().draw()
    let url = urlGetListRiskManagement + "?FechaInicio=" + object["FechaInicio"] + "&FechaFin=" + object["FechaFin"] + "&IdTipoAlerta=" + object["TipoReporte"]
    // --
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        success: function (data) {
            let obj = data.Data
            console.log("Data que viene risk");
            console.log(obj)
            if (obj != null) {

                let lista = obj
                listRiskManagement = lista

                let AccessUpdate = ListAccessUser.filter(x => x.IdAcceso == 23);
                let AccessDelete = ListAccessUser.filter(x => x.IdAcceso == 24);

                lista.forEach((element) => {
                    let index = tableDataRiskManagement.rows().count() + 1;
                    let ButtonDownload = '';
                    let ButtonDownload2 = '';
                    let ButtonUpdate = ''
                    let ButtonDelete = '';
                    if (element.ArchivoAdjunto1 != null) {
                        //ButtonDownload = ' <a href="' + element.ArchivoAdjunto1.RutaArchivo + '" download="' + element.ArchivoAdjunto1.RutaArchivo + '" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-download"></i></a>'
                        ButtonDownload = '<a onclick="downloadFileRiskManagementEasyPDF(' + element.IdGestionRiesgos + ')" class= "btn btn-sm btn-primary active" data-id="' + element.IdGestionRiesgos + '"> <i class="fa fa-download"></i></a>'
                    }
                    if (element.ArchivoAdjunto2 != null) {
                        //ButtonDownload = ' <a href="' + element.ArchivoAdjunto1.RutaArchivo + '" download="' + element.ArchivoAdjunto1.RutaArchivo + '" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-download"></i></a>'
                        ButtonDownload2 = '<a onclick="downloadFileRiskManagementPreviewing(' + element.IdGestionRiesgos + ')" class= "btn btn-sm btn-primary active" data-id="' + element.IdGestionRiesgos + '"> <i class="fa fa-download"></i></a>'
                    }
                    
                    if (AccessUpdate.length > 0 && AccessUpdate[0].IdAcceso == 23) {
                        ButtonUpdate = ' <button class= "btn btn-sm btn-primary" data-id="' + element.IdGestionRiesgos + '" id="btn_edit_row"> <i class="fa fa-edit"></i></button >'
                    }

                    if (AccessDelete.length > 0 && AccessDelete[0].IdAcceso == 24) {
                        ButtonDelete = '<a onclick="deleteRiskManagement(' + element.IdGestionRiesgos + ')" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-trash"></i></a>'
                    }

                    tableDataRiskManagement.row.add([
                        element.IdGestionRiesgos,
                        element.Empresa,
                        element.DescripcionSucursal,
                        element.Nombre,
                        '<a href="' + element.Link + '" target="_blank">' + 'enlace' + '</a>',
                        element.DesTipoAlerta,
                        element.UsuarioEnvio,
                        element.FechaHoraReg,
                        element.Pais,
                        element.Estado,
                        ButtonDownload +
                        ButtonDownload2 +
                        ButtonDelete +
                        ButtonUpdate
                    ]).draw(false);
                    tableDataRiskManagement.columns.adjust()
                        .responsive.recalc();
                })

                functions.notify_message(MESSAGE.es.success_select, 'success')
            }

        }
    });
    // --- }

}

function downloadFileRiskManagementEasyPDF(value) {
    let Object = listRiskManagement.find(x => x.IdGestionRiesgos == value);
    // --
    let url = urlGetdownloadFile + "?ruta=" + Object.ArchivoAdjunto1.RutaArchivo;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (d) {
            if (d != "" && d != null && d != undefined) {
                //let sampleArr = base64ToArrayBuffer(d.DataBase);
                //saveByteArray(Object.ArchivoAdjunto1.NombreArchivo, sampleArr, Object.ExtensionArchivo);

                ////para previsualizar
                //let file = obtenerBlobFromBase64(d.DataBase, "application/pdf");
                //const urlfile = URL.createObjectURL(file);
                //window.open(urlfile, "_blank");
                easyPDF(d, "")
                console.log('Generando PDF')
            }
        }
    });
}

function downloadFileRiskManagementPreviewing(value) {
    let Object = listRiskManagement.find(x => x.IdGestionRiesgos == value);
    // --
    let url = urlGetdownloadFile + "?ruta=" + Object.ArchivoAdjunto2.RutaArchivo;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (d) {
            if (d != "" && d != null && d != undefined) {
                //let sampleArr = base64ToArrayBuffer(d.DataBase);
                //saveByteArray(Object.ArchivoAdjunto1.NombreArchivo, sampleArr, Object.ExtensionArchivo);

                //para previsualizar
                let file = obtenerBlobFromBase64(d, "application/pdf");
                const urlfile = URL.createObjectURL(file);
                window.open(urlfile, "_blank");
                //easyPDF(d, "")
                //console.log('Generando PDF')
            }
        }
    });
}

//--
function obtenerBlobFromBase64(b64Data, contentType) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

function showModal() {
    // --
    cleanFormulary()
    $('#modal_register_RiskManagement').modal('show')
    $('#modal_register_RiskManagement').attr('data-idgestionriesgo', 0)
}

function cleanFormulary() {
    // --
    xGestionRiesgo = null
    $('#txt_RiskManagement_Nombre').val('')
    $('#txt_RiskManagement_Link').val('')
    $('#content_loader_RiskManagement').css('display', 'none')
    $("#file_modal_register_RiskManagement_1").val(null);
    $("#file_modal_register_RiskManagement_2").val(null);
    $('#sl_modal_register_RiskManagement_empresa').val('0');
    $('#sl_modal_register_RiskManagement_TipoAlerta').val('0');
    $("#PreviewFileRiskManagement_1 span").text('')
    $("#PreviewFileRiskManagement_2 span").text('')
}

// -- EDITAR DATOS DE LA TABLA
$(document).on('click', '#btn_edit_row', function () {
    $("#file_modal_register_RiskManagement_1").val(null);
    $("#file_modal_register_RiskManagement_2").val(null);
    // --
    let value = $(this).attr('data-id')
    //let index = null;
    // --
    tableDataRiskManagement.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });

    // --
    let ObjGestionRiesgo = listRiskManagement.find(x => x.IdGestionRiesgos == value)
    xGestionRiesgo = ObjGestionRiesgo
    console.log(ObjGestionRiesgo)

    $('#modal_register_RiskManagement').modal('show')

    $('#modal_register_RiskManagement').attr('data-idgestionriesgo', ObjGestionRiesgo.IdGestionRiesgos)
    $('#txt_RiskManagement_Nombre').val(ObjGestionRiesgo.Nombre)
    $('#txt_RiskManagement_Link').val(ObjGestionRiesgo.Link)
    $('#sl_modal_register_RiskManagement_empresa').val(ObjGestionRiesgo.IdEmpresa)
    $('#sl_modal_register_RiskManagement_TipoAlerta').val(ObjGestionRiesgo.IdTipoAlerta)
    $("#PreviewFileRiskManagement_1 span").text(ObjGestionRiesgo.ArchivoAdjunto1.NombreArchivo)
    $("#PreviewFileRiskManagement_2 span").text(ObjGestionRiesgo.ArchivoAdjunto2.NombreArchivo)
    getSucursales(ObjGestionRiesgo.IdEmpresa, ObjGestionRiesgo.IdSucursal)

    $('#modal_register').attr('data-idgestionriesgo', ObjGestionRiesgo.IdGestionRiesgos)
})

function deleteRiskManagement(value) {
    // --

    Swal.queue([{
        icon: 'info',
        title: '¿Desea eliminar el registro?',
        html: '',
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#d33',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        preConfirm: () => {

            let url = urlUpdateStatusRiskManagement + "?IdGestionRiesgos=" + value + '&Flg_Estado=false'
            $.ajax({
                url: url,
                type: 'GET',
                dataType: 'json',
                success: function (d) {
                    console.log(d)
                    let obj = d.response;
                    // --
                    if (obj.status == 'OK') {
                        let object = new Object()
                        object["FechaInicio"] = $('#txt_fecha_inicio_RiskManagement').val()
                        object["FechaFin"] = $('#txt_fecha_fin_RiskManagement').val()
                        object["TipoReporte"] = $("#sl_RiskManagement_TipoAlerta").val();
                        getListRiskManagement(object)
                    }

                }
            });

        }
    }])

}

$("#btn_buscar_RiskManagement").on('click', function () {
    let fechaInicio = $("#txt_fecha_inicio_RiskManagement").val()
    let fechaFin = $("#txt_fecha_fin_RiskManagement").val()
    // --
    if (fechaFin.length < 1 || fechaInicio.length < 1 || status === null) {
        // --
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    } else {
        // --
        let object = new Object()
        object["FechaInicio"] = fechaInicio
        object["FechaFin"] = fechaFin
        object["TipoReporte"] = $("#sl_RiskManagement_TipoAlerta").val();
        // --
        getListRiskManagement(object)
    }
})

//#endregion


function saveByteArray(reportName, byte, type) {
    var blob = new Blob([byte], { type: type });
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var fileName = reportName;
    link.download = fileName;
    link.click();
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

// --
function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}


// --
function GetAccessUser(FechaInicio, FechaFin) {
    let url = urlGetAccess;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (d) {
            //console.log(d);
            ListAccessUser = d.RolAcceso;

            // --
            let object = new Object()
            object["FechaInicio"] = FechaInicio
            object["FechaFin"] = FechaFin
            object["TipoReporte"] = $("#sl_RiskManagement_TipoAlerta").val();
            getListRiskManagement(object)
        }
    });
}


function Inicio() {
    //let FechaActual = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')
    let FechaInicio = new Date()
    FechaInicio.setMonth(FechaInicio.getMonth() - 1)
    let FechaInicio_in_string = FechaInicio.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
    let FechaFin_in_string = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
    $('#txt_fecha_inicio_RiskManagement').val(FechaInicio_in_string)
    $('#txt_fecha_fin_RiskManagement').val(FechaFin_in_string)

    GetAccessUser(FechaInicio_in_string, FechaFin_in_string)
}

Inicio();


function isUrl(s) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/
    return regexp.test(s);
}

// --

$("#sl_modal_register_RiskManagement_empresa").change(function () {
    let value = $("#sl_modal_register_RiskManagement_empresa").val()
    console.log('Select', value)
    getSucursales(value)
});

// --
function getSucursales(IdEmpresa, IdSucursal = 0) {
    // --
    if (IdEmpresa != 0) {
        // --
        let url = urlGetListBranchOffice + "?IdEmpresa=" + IdEmpresa;
        // --
        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
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
                        if (value.IdSucursal == IdSucursal) {
                            html += '<option value="' + value.IdSucursal + '" selected="selected"> ' + value.DescripcionSucursal + '</option>'
                        } else {
                            html += '<option value="' + value.IdSucursal + '"> ' + value.DescripcionSucursal + '</option>'
                        }
                    });
                }
                // --
                $('#sl_modal_register_sucursal').html(html);
                $('#sl_modal_register_sucursal').attr("disabled", false);
            }
        });
    } else {
        // --
        let html = '<option value="0">[Seleccionar]</option>'
        // --
        $('#sl_modal_register_sucursal').html(html);
        $('#sl_modal_register_sucursal').attr("disabled", "disabled");
    }

}


// --
function easyPDF(_base64, _title) {
    // HTML definition of dialog elements
    var dialog = '<div id="pdfDialog" title="' + _title + '">' +
        '<label>Page: &nbsp;</label><label id="pageNum"></label><label>&nbsp; of &nbsp;</label><label id="pageLength"></label>' +
        '<canvas id="pdfview"></canvas>' +
        '</div>';
    $("div[id=pdfDialog]").remove();
    $(document.body).append(dialog);

    // We need the javascript object of the canvas, not the jQuery reference
    var canvas = document.getElementById('pdfview');
    // Init page count
    var page = 1;
    // Dialog definition
    $("#pdfDialog").dialog({
        // Moves controls to top of dialog
        open: function (event, ui) {
            $(this).before($(this).parent().find('.ui-dialog-buttonpane'));
        },
        width: ($(window).width() / 1.25),
        modal: true,
        position: {
            my: "top",
            at: "top",
            of: window,
            collision: "none"
        },
        buttons: {
            "Back": {
                click: function () {
                    RenderPDF(-1)
                },
                text: 'Previous',
            },
            "Next": {
                click: function () {
                    RenderPDF(1)
                },
                text: 'Next',
            },
            "Confirm": {
                click: function () {
                    $(this).dialog("close");
                    $("#pdfDialog").remove()
                },
                text: 'Close',
            }
        }
    });

    // Init page number and the document
    $('#pageNum').text(page);
    RenderPDF(0);

    // PDF.js control
    function RenderPDF(pageNumber) {
        var pdfData = atob(_base64);
        pdfjsLib.disableWorker = true;

        // Get current global page number, defaults to 1
        displayNum = parseInt($('#pageNum').html())
        pageNumber = parseInt(pageNumber)

        var loadingTask = pdfjsLib.getDocument({ data: pdfData });
        loadingTask.promise.then(function (pdf) {
            // Gets total page length of pdf
            size = pdf.numPages;
            $('#pageLength').text(size);
            // Handling for changing pages
            if (pageNumber == 1) {
                pageNumber = displayNum + 1;
            }
            if (pageNumber == -1) {
                pageNumber = displayNum - 1;
            }
            if (pageNumber == 0) {
                pageNumber = 1;
            }
            // If the requested page is outside the document bounds
            if (pageNumber > size || pageNumber < 1) {
                throw "bad page number";
            }
            // Changes the cheeky global to our valid new page number
            $('#pageNum').text(pageNumber)
            pdf.getPage(pageNumber).then(function (page) {
                var scale = 1.5;
                var viewport = page.getViewport(scale);
                var context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                //canvas.height = 1024
                //canvas.width = 768
                var renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                page.render(renderContext);
            });
        }).catch(e => { });
    }
}


// -- 
$('#sl_modal_register_sucursal').attr('disabled', 'disabled');