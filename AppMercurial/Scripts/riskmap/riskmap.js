//import { string32 } from "../pdf/pdf.worker"

// --
const functions = new Functions()
var ListAccessUser = null

//$(document).ready(function () {
//$("#sl_modal_register_RiskMap_empresa").select2({
//    dropdownParent: $("#modal_register_RiskMap")
//});
//});

// -- Datepicker
$('#txt_fecha_inicio_RiskMap').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})
$('#txt_fecha_fin_RiskMap').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})


//#region -- MAPA DE RIESGOS

// -- VARIABLES
var listRiskMap = new Array()
var indexListRiskMap = 1

// -- TABLE
var tableDataRiskMap = $('#tbl_data_RiskMap').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    },
    order: [[0, "desc"]]
})

// -- GUARDAR
$('#btn_guardar_registro_RiskMap').on('click', function () {
    // --
    var formData = new FormData();

    var sl_modal_register_RiskMap_empresa = $('#sl_modal_register_RiskMap_empresa').val()
    var txt_MapaRiesgo_Nombre = $('#txt_MapaRiesgo_Nombre').val()
    var txt_MapaRiesgo_Link = $('#txt_MapaRiesgo_Link').val()
    
    // -- ARCHIVO ADJUNTO
    var file_RiskMap = $('#file_modal_register_RiskMap_1').prop("files")[0];
    var ext_RiskMap = ""
    // --
    if (file_RiskMap !== undefined) {
        // --
        ext_RiskMap = getFileExtension(file_RiskMap.name)
        // --
        formData.append("dataFile", file_RiskMap, "RiskMap." + ext_RiskMap);
    }

    // -- OBJECT
    var objectData = {
        // --
        "IdRiskMap": 0,
        "IdEmpresa": Number(sl_modal_register_RiskMap_empresa),
        "IdPais": 0,
        "IdUsuarioEnvio": 0,
        "ArchivoAdjunto1":
        {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "RiskMap." + ext_RiskMap, // -- 
            "RutaArchivo": null,
            "ExtensionArchivo": ext_RiskMap,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        },
        "Nombre": txt_MapaRiesgo_Nombre,
        "Link": txt_MapaRiesgo_Link,
        "FlgEstado": true
    }

    var camposVacios = ""
    // --
    if (sl_modal_register_RiskMap_empresa == 0) {
        camposVacios += "<span>No se ha selecionado la empresa.</span></br>"
    }
    if (file_RiskMap == undefined) {
        camposVacios += "<span>No se ha adjuntado ningun documento.</span></br>"
    }
    if (txt_MapaRiesgo_Link == "" || isUrl(txt_MapaRiesgo_Link) == false) {
        camposVacios += "<span>Link incorrecto.</span></br>"
    }
    if (ext_RiskMap != "pdf") {
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
                    url: urlSaveOrUpdateRiskMap,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {

                        let obj = data.response;
                        // --
                        if (obj.status == 'OK') {
                            $('#content_loader_RiskMap').css('display', 'none');
                            $("#modal_register_RiskMap").modal('hide')
                            let object = new Object()
                            object["FechaInicio"] = $('#txt_fecha_inicio_RiskMap').val()
                            object["FechaFin"] = $('#txt_fecha_fin_RiskMap').val()
                            getListRiskMap(object)
                            functions.notify_message(MESSAGE.es.success_insert, 'success')
                        } else {
                            $('#content_loader_RiskMap').css('display', 'none');
                            functions.notify_message(MESSAGE.es.error_insert, 'error')
                        }
                    },
                    beforeSend: function (xhr) {
                        $('#content_loader_RiskMap').css('display', 'block');
                    }
                });
            }
        }])
    }

})

// --
$('#modal_register_RiskMap').on('shown.bs.modal', function (e) {
    // --
    $('#content_loader_RiskMap').css('display', 'none')
    $('#txt_MapaSectorial_Link').val('');
    $("#file_modal_register_RiskMap_1").val(null);
    $('#sl_modal_register_RiskMap_empresa').val('0');
    $("#sl_modal_register_RiskMap_empresa").select2({
        dropdownParent: $("#modal_register_RiskMap")
    });
})

// --
function getListRiskMap(object) {
    // --
    $("#tbl_data_RiskMap").DataTable().clear().draw()
    let url = urlGetListRiskMap + "?FechaInicio=" + object["FechaInicio"] + "&FechaFin=" + object["FechaFin"]
    // --
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        success: function (data) {
            let obj = data.Data
            //console.log(obj)
            if (obj != null) {

                let lista = obj

                let AccessDelete = ListAccessUser.filter(x => x.IdAcceso == 33);

                listRiskMap = lista
                lista.forEach((element) => {
                    let index = tableDataRiskMap.rows().count() + 1;
                    let ButtonDownload = '';
                    let ButtonDelete = '';
                    if (element.ArchivoAdjunto1 != null) {
                        //ButtonDownload = ' <a href="' + element.ArchivoAdjunto1.RutaArchivo + '" download="' + element.ArchivoAdjunto1.RutaArchivo + '" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-download"></i></a>'
                        ButtonDownload = '<a onclick="downloadFileRiskMap(' + element.IdMapaRiesgo + ')" class= "btn btn-sm btn-primary active" data-id="' + element.IdMapaRiesgo + '"> <i class="fa fa-download"></i></a>'
                    }

                    if (AccessDelete.length > 0 && AccessDelete[0].IdAcceso == 33) {
                        ButtonDelete = '<a onclick="deleteRiskMap(' + element.IdMapaRiesgo + ')" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-trash"></i></a>'
                    }

                    let link = '-';
                    console.log(element.Link)
                    if (element.Link != null) {
                        link = '<a href="' + element.Link + '" target="_blank">' + 'enlace' + '</a>';
                    }

                    tableDataRiskMap.row.add([
                        element.IdMapaRiesgo,
                        element.Empresa,
                        element.Nombre,
                        link,
                        element.UsuarioEnvio,
                        element.FechaHoraReg,
                        element.Pais,
                        element.Estado,
                        ButtonDownload +
                        ButtonDelete
                    ]).draw(false);
                    tableDataRiskMap.columns.adjust()
                        .responsive.recalc();
                })

                functions.notify_message(MESSAGE.es.success_select, 'success')
            }

        }
    });
    // --- }

}

function downloadFileRiskMap(value) {
    let Object = listRiskMap.find(x => x.IdMapaRiesgo == value);
    // --
    let url = urlGetdownloadFile + "?ruta=" + Object.ArchivoAdjunto1.RutaArchivo;
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (d) {
            if (d.DataBase != "" && d.DataBase != null && d.DataBase != undefined) {
                let sampleArr = base64ToArrayBuffer(d.DataBase);
                //console.log(sampleArr);
                saveByteArray(Object.ArchivoAdjunto1.NombreArchivo, sampleArr, Object.ExtensionArchivo);
            }
        }
    });
}

function deleteRiskMap(value) {
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

            let url = urlUpdateStatusRiskMap + "?IdMapaRiesgo=" + value + '&Flg_Estado=false'
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
                        object["FechaInicio"] = $('#txt_fecha_inicio_RiskMap').val()
                        object["FechaFin"] = $('#txt_fecha_fin_RiskMap').val()
                        getListRiskMap(object)
                    }

                }
            });

        }
    }])

}

$("#btn_buscar_RiskMap").on('click', function () {
    let fechaInicio = $("#txt_fecha_inicio_RiskMap").val()
    let fechaFin = $("#txt_fecha_fin_RiskMap").val()
    // --
    if (fechaFin.length < 1 || fechaInicio.length < 1 || status === null) {
        // --
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    } else {
        // --
        let object = new Object()
        object["FechaInicio"] = fechaInicio
        object["FechaFin"] = fechaFin
        // --
        getListRiskMap(object)
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
            getListRiskMap(object)
        }
    });
}


function Inicio() {
    //let FechaActual = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')
    let FechaInicio = new Date()
    FechaInicio.setMonth(FechaInicio.getMonth() - 1)
    let FechaInicio_in_string = FechaInicio.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
    let FechaFin_in_string = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
    $('#txt_fecha_inicio_RiskMap').val(FechaInicio_in_string)
    $('#txt_fecha_fin_RiskMap').val(FechaFin_in_string)
    // --
    GetAccessUser(FechaInicio_in_string, FechaFin_in_string)
}

Inicio();