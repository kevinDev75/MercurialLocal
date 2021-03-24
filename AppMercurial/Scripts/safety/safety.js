
// --
const functions = new Functions()
var ListAccessUser = null

//$(document).ready(function () {
//$("#sl_modal_register_BElectronico_empresa").select2({
//    dropdownParent: $("#modal_register_BElectronico")
//});
//});

// -- Datepicker
$('#txt_fecha_inicio_BElectronico').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})
$('#txt_fecha_fin_BElectronico').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})

// -- Datepicker
$('#txt_fecha_inicio_ESPatrimonial').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})
$('#txt_fecha_fin_ESPatrimonial').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})

// -- Datepicker
$('#txt_fecha_inicio_InvestCorporativas').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})
$('#txt_fecha_fin_InvestCorporativas').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})

// -- Datepicker
$('#txt_fecha_inicio_PersIntInformacion').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})
$('#txt_fecha_fin_PersIntInformacion').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})

// -- Datepicker
$('#txt_fecha_inicio_SeguridadFisica').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})
$('#txt_fecha_fin_SeguridadFisica').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})

//#region -- BARRIDO ELECTRONICO

// -- VARIABLES
var listBElectronico = new Array()
var indexListBElectronico = 1

// -- TABLE
var tableDataBElectronico = $('#tbl_data_BElectronico').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    },
    order: [[0, "desc"]]
})

// -- GUARDAR
$('#btn_guardar_registro_BElectronico').on('click', function () {
    // --
    var formData = new FormData();

    var sl_modal_register_BElectronico_empresa = $('#sl_modal_register_BElectronico_empresa').val()
    var sl_modal_register_BElectronico_sucursal = $('#sl_modal_register_BElectronico_sucursal').val()

    // -- ARCHIVO ADJUNTO
    var file_BElectronico = $('#file_modal_register_BElectronico_1').prop("files")[0];
    var ext_BElectronico = ""
    // --
    if (file_BElectronico !== undefined) {
        // --
        ext_BElectronico = getFileExtension(file_BElectronico.name)
        // --
        formData.append("dataFile", file_BElectronico, "BElectronico." + ext_BElectronico);
    }

    // -- OBJECT
    var objectData = {
        // --
        "IdBarridoElectronico": 0,
        "IdEmpresa": Number(sl_modal_register_BElectronico_empresa),
        "IdPais": 0,
        "IdUsuarioEnvio": 0,
        "ArchivoAdjunto1":
        {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "BElectronico." + ext_BElectronico, // -- 
            "RutaArchivo": null,
            "ExtensionArchivo": ext_BElectronico,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        },
        "FlgEstado": true
    }

    var camposVacios = ""
    // --
    if (sl_modal_register_BElectronico_empresa == 0) {
        camposVacios += "<span>No se ha selecionado la empresa.</span></br>"
    }
    /*
    if (sl_modal_register_BElectronico_sucursal == 0) {
        camposVacios += "<span>No se ha selecionado la Sucursal.</span></br>"
    }
    */

    if (file_BElectronico == undefined) {
        camposVacios += "<span>No se ha adjuntado ningun documento.</span>"
    }
    
    if (ext_BElectronico != "pdf") {
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
                    url: urlSaveOrUpdateBElectronico,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {

                        let obj = data.response;
                        // --
                        if (obj.status == 'OK') {
                            $('#content_loader_BElectronico').css('display', 'none');
                            $("#modal_register_BElectronico").modal('hide')
                            let object = new Object()
                            object["FechaInicio"] = $('#txt_fecha_inicio_BElectronico').val()
                            object["FechaFin"] = $('#txt_fecha_fin_BElectronico').val()
                            getListBElectronico(object)
                            functions.notify_message(MESSAGE.es.success_insert, 'success')
                        } else {
                            $('#content_loader_BElectronico').css('display', 'none');
                            functions.notify_message(MESSAGE.es.error_insert, 'error')
                        }
                    },
                    beforeSend: function (xhr) {
                        $('#content_loader_BElectronico').css('display', 'block');
                    }
                });
            }
        }])
    }

})

// --
$('#modal_register_BElectronico').on('shown.bs.modal', function (e) {
    // --
    $('#content_loader_BElectronico').css('display', 'none')
    $("#file_modal_register_BElectronico_1").val(null);
    $('#sl_modal_register_BElectronico_empresa').val('0');
    $('#txt_BElectronico_comentario').val('');
    $("#sl_modal_register_BElectronico_empresa").select2({
        dropdownParent: $("#modal_register_BElectronico")
    });
})

// --
function getListBElectronico(object) {
    // --
    $("#tbl_data_BElectronico").DataTable().clear().draw()
    let url = urlGetListBElectronico + "?FechaInicio=" + object["FechaInicio"] + "&FechaFin=" + object["FechaFin"]
    // --
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        success: function (data) {
            let obj = data.Data
            //console.log(obj)
            if (obj != null) {

                // -- BARRIDO ELECTRONICO
                let lista = obj
                listBElectronico = lista

                let AccessDelete = ListAccessUser.filter(x => x.IdAcceso == 28);
                
                lista.forEach((element) => {
                    let index = tableDataBElectronico.rows().count() + 1;
                    let ButtonDownload = '';
                    let ButtonDelete = '';

                    if (element.ArchivoAdjunto1 != null) {
                        //ButtonDownload = ' <a href="' + element.ArchivoAdjunto1.RutaArchivo + '" download="' + element.ArchivoAdjunto1.RutaArchivo + '" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-download"></i></a>'
                        ButtonDownload = '<a onclick="downloadFileBElectronico(' + element.IdBarridoElectronico + ')" class= "btn btn-sm btn-primary active" data-id="' + element.IdBarridoElectronico + '"> <i class="fa fa-download"></i></a>'
                    }

                    if (AccessDelete.length > 0 && AccessDelete[0].IdAcceso == 28) {
                        ButtonDelete = '<a onclick="deleteBElectronico(' + element.IdBarridoElectronico + ')" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-trash"></i></a>'
                    }

                    tableDataBElectronico.row.add([
                        element.IdBarridoElectronico,
                        element.Servicio,
                        element.UsuarioEnvio,
                        element.FechaHoraReg,
                        element.Pais,
                        element.Estado,
                        ButtonDownload +
                        ButtonDelete
                    ]).draw(false);
                    tableDataBElectronico.columns.adjust()
                        .responsive.recalc();
                })

                functions.notify_message(MESSAGE.es.success_select, 'success')
            }

        }
    });
    // --- }

}

function downloadFileBElectronico(value) {
    let Object = listBElectronico.find(x => x.IdBarridoElectronico == value);
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

function deleteBElectronico(value) {
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

            let url = urlUpdateStatusElectronicScanning + "?IdBarridoElectronico=" + value + '&Flg_Estado=false'
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
                        object["FechaInicio"] = $('#txt_fecha_inicio_BElectronico').val()
                        object["FechaFin"] = $('#txt_fecha_fin_BElectronico').val()
                        getListBElectronico(object)
                    }

                }
            });

        }
    }])

}

$("#btn_buscar_BElectronico").on('click', function () {
    let fechaInicio = $("#txt_fecha_inicio_BElectronico").val()
    let fechaFin = $("#txt_fecha_fin_BElectronico").val()
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
        getListBElectronico(object)
    }
})

//#endregion

//#region -- E.S. PATRIMONIAL

// -- VARIABLES
var listESPatrimonial = new Array()
var indexListESPatrimonial = 1

// -- TABLE
var tableDataESPatrimonial = $('#tbl_data_ESPatrimonial').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    },
    order: [[0, "desc"]]
})

// -- GUARDAR
$('#btn_guardar_registro_ESPatrimonial').on('click', function () {
    // --
    var formData = new FormData();

    var sl_modal_register_ESPatrimonial_empresa = $('#sl_modal_register_ESPatrimonial_empresa').val()
    var sl_modal_register_ESPatrimonial_sucursal = $('#sl_modal_register_ESPatrimonial_sucursal').val()

    // -- ARCHIVO ADJUNTO
    var file_ESPatrimonial = $('#file_modal_register_ESPatrimonial_1').prop("files")[0];
    var ext_ESPatrimonial = ""
    // --
    if (file_ESPatrimonial !== undefined) {
        // --
        ext_ESPatrimonial = getFileExtension(file_ESPatrimonial.name)
        // --
        formData.append("dataFile", file_ESPatrimonial, "ESPatrimonial." + ext_ESPatrimonial);
    }

    // -- OBJECT
    var objectData = {
        // --
        "IdSeguridadPatrimonial": 0,
        "IdEmpresa": Number(sl_modal_register_ESPatrimonial_empresa),
        "IdPais": 0,
        "IdUsuarioEnvio": 0,
        "ArchivoAdjunto1":
        {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "ESPatrimonial." + ext_ESPatrimonial, // -- 
            "RutaArchivo": null,
            "ExtensionArchivo": ext_ESPatrimonial,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        },
        "FlgEstado": true
    }

    var camposVacios = ""
    // --
    if (sl_modal_register_ESPatrimonial_empresa == 0) {
        camposVacios += "<span>No se ha selecionado la empresa.</span></br>"
    }
   // if (sl_modal_register_ESPatrimonial_sucursal == 0) {
   //     camposVacios += "<span>No se ha selecionado la sucursal.</span></br>"
    //}
    
    if (file_ESPatrimonial == undefined) {
        camposVacios += "<span>No se ha adjuntado ningun documento.</span>"
    }
    if (ext_ESPatrimonial != "pdf") {
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
                    url: urlSaveOrUpdateESPatrimonial,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {

                        let obj = data.response;
                        // --
                        if (obj.status == 'OK') {
                            $('#content_loader_ESPatrimonial').css('display', 'none');
                            $("#modal_register_ESPatrimonial").modal('hide')
                            let object = new Object()
                            object["FechaInicio"] = $('#txt_fecha_inicio_ESPatrimonial').val()
                            object["FechaFin"] = $('#txt_fecha_fin_ESPatrimonial').val()
                            getListESPatrimonial(object)
                            functions.notify_message(MESSAGE.es.success_insert, 'success')
                        } else {
                            $('#content_loader_ESPatrimonial').css('display', 'none');
                            functions.notify_message(MESSAGE.es.error_insert, 'error')
                        }
                    },
                    beforeSend: function (xhr) {
                        $('#content_loader_ESPatrimonial').css('display', 'block');
                    }
                });
            }
        }])
    }

})

// --
$('#modal_register_ESPatrimonial').on('shown.bs.modal', function (e) {
    // --
    $('#content_loader_ESPatrimonial').css('display', 'none')
    $("#file_modal_register_ESPatrimonial_1").val(null);
    $('#sl_modal_register_ESPatrimonial_empresa').val('0');
    $('#txt_ESPatrimonial_comentario').val('');
    $("#sl_modal_register_ESPatrimonial_empresa").select2({
        dropdownParent: $("#modal_register_ESPatrimonial")
    });
})

// --
function getListESPatrimonial(object) {
    // --
    $("#tbl_data_ESPatrimonial").DataTable().clear().draw()
    let url = urlGetListESPatrimonial + "?FechaInicio=" + object["FechaInicio"] + "&FechaFin=" + object["FechaFin"]
    // --
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        success: function (data) {
            let obj = data.Data
            //console.log(obj)
            if (obj != null) {

                // -- BARRIDO ELECTRONICO
                let lista = obj
                listESPatrimonial = lista

                let AccessDelete = ListAccessUser.filter(x => x.IdAcceso == 29);

                lista.forEach((element) => {
                    let index = tableDataESPatrimonial.rows().count() + 1;
                    let ButtonDownload = '';
                    let ButtonDelete = '';
                    if (element.ArchivoAdjunto1 != null) {
                        //ButtonDownload = ' <a href="' + element.ArchivoAdjunto1.RutaArchivo + '" download="' + element.ArchivoAdjunto1.RutaArchivo + '" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-download"></i></a>'
                        ButtonDownload = '<a onclick="downloadFileESPatrimonial(' + element.IdSeguridadPatrimonial + ')" class= "btn btn-sm btn-primary active" data-id="' + element.IdSeguridadPatrimonial + '"> <i class="fa fa-download"></i></a>'
                    }

                    if (AccessDelete.length > 0 && AccessDelete[0].IdAcceso == 29) {
                        ButtonDelete = '<a onclick="deleteESPatrimonial(' + element.IdSeguridadPatrimonial + ')" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-trash"></i></a>'
                    }

                    tableDataESPatrimonial.row.add([
                        element.IdSeguridadPatrimonial,
                        element.Servicio,
                        element.UsuarioEnvio,
                        element.FechaHoraReg,
                        element.Pais,
                        element.Estado,
                        ButtonDownload +
                        ButtonDelete
                    ]).draw(false);
                    tableDataESPatrimonial.columns.adjust()
                        .responsive.recalc();
                })

                functions.notify_message(MESSAGE.es.success_select, 'success')
            }

        }
    });
    // --- }

}

function downloadFileESPatrimonial(value) {
    let Object = listESPatrimonial.find(x => x.IdSeguridadPatrimonial == value);
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

function deleteESPatrimonial(value) {
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

            let url = urlUpdateStatusAssetSecurity + "?IdSeguridadPatrimonial=" + value + '&Flg_Estado=false'
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
                        object["FechaInicio"] = $('#txt_fecha_inicio_ESPatrimonial').val()
                        object["FechaFin"] = $('#txt_fecha_fin_ESPatrimonial').val()
                        getListESPatrimonial(object)
                    }

                }
            });

        }
    }])

}

$("#btn_buscar_ESPatrimonial").on('click', function () {
    let fechaInicio = $("#txt_fecha_inicio_ESPatrimonial").val()
    let fechaFin = $("#txt_fecha_fin_ESPatrimonial").val()
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
        getListESPatrimonial(object)
    }
})

//#endregion

//#region -- INVESTIGACIONES CORPORATIVAS

// -- VARIABLES
var listInvestCorporativas = new Array()
var indexListInvestCorporativas = 1

// -- TABLE
var tableDataInvestCorporativas = $('#tbl_data_InvestCorporativas').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    },
    order: [[0, "desc"]]
})

// -- GUARDAR
$('#btn_guardar_registro_InvestCorporativas').on('click', function () {
    // --
    var formData = new FormData();

    var sl_modal_register_InvestCorporativas_empresa = $('#sl_modal_register_InvestCorporativas_empresa').val()
    var sl_modal_register_InvestCorporativas_sucursal = $('#sl_modal_register_InvestCorporativas_sucursal').val()

    // -- ARCHIVO ADJUNTO
    var file_InvestCorporativas = $('#file_modal_register_InvestCorporativas_1').prop("files")[0];
    var ext_InvestCorporativas = ""
    // --
    if (file_InvestCorporativas !== undefined) {
        // --
        ext_InvestCorporativas = getFileExtension(file_InvestCorporativas.name)
        // --
        formData.append("dataFile", file_InvestCorporativas, "InvestCorporativas." + ext_InvestCorporativas);
    }

    // -- OBJECT
    var objectData = {
        // --
        "IdInvestigacionCorporativa": 0,
        "IdEmpresa": Number(sl_modal_register_InvestCorporativas_empresa),
        "IdPais": 0,
        "IdUsuarioEnvio": 0,
        "ArchivoAdjunto1":
        {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "InvestCorporativas." + ext_InvestCorporativas, // -- 
            "RutaArchivo": null,
            "ExtensionArchivo": ext_InvestCorporativas,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        },
        "FlgEstado": true
    }

    var camposVacios = ""
    // --
    if (sl_modal_register_InvestCorporativas_empresa == 0) {
        camposVacios += "<span>No se ha selecionado la empresa.</span></br>"
    }
   // if (sl_modal_register_InvestCorporativas_sucursal == 0) {
  //      camposVacios += "<span>No se ha selecionado la sucursal.</span></br>"
   // }
    
    if (file_InvestCorporativas == undefined) {
        camposVacios += "<span>No se ha adjuntado ningun documento.</span>"
    }
    if (ext_InvestCorporativas != "pdf") {
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
                    url: urlSaveOrUpdateInvestCorporativas,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {

                        let obj = data.response;
                        // --
                        if (obj.status == 'OK') {
                            $('#content_loader_InvestCorporativas').css('display', 'none');
                            $("#modal_register_InvestCorporativas").modal('hide')
                            let object = new Object()
                            object["FechaInicio"] = $('#txt_fecha_inicio_InvestCorporativas').val()
                            object["FechaFin"] = $('#txt_fecha_fin_InvestCorporativas').val()
                            getListInvestCorporativas(object)
                            functions.notify_message(MESSAGE.es.success_insert, 'success')
                        } else {
                            $('#content_loader_InvestCorporativas').css('display', 'none');
                            functions.notify_message(MESSAGE.es.error_insert, 'error')
                        }
                    },
                    beforeSend: function (xhr) {
                        $('#content_loader_InvestCorporativas').css('display', 'block');
                    }
                });
            }
        }])
    }

})

// --
$('#modal_register_InvestCorporativas').on('shown.bs.modal', function (e) {
    // --
    $('#content_loader_InvestCorporativas').css('display', 'none')
    $("#file_modal_register_InvestCorporativas_1").val(null);
    $('#sl_modal_register_InvestCorporativas_empresa').val('0');
    $('#txt_InvestCorporativas_comentario').val('');
    $("#sl_modal_register_InvestCorporativas_empresa").select2({
        dropdownParent: $("#modal_register_InvestCorporativas")
    });
})

// --
function getListInvestCorporativas(object) {
    // --
    $("#tbl_data_InvestCorporativas").DataTable().clear().draw()
    let url = urlGetListInvestCorporativas + "?FechaInicio=" + object["FechaInicio"] + "&FechaFin=" + object["FechaFin"]
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

                let AccessDelete = ListAccessUser.filter(x => x.IdAcceso == 30);

                listInvestCorporativas = lista
                lista.forEach((element) => {
                    let index = tableDataInvestCorporativas.rows().count() + 1;
                    let ButtonDownload = '';
                    let ButtonDelete = '';
                    if (element.ArchivoAdjunto1 != null) {
                        //ButtonDownload = ' <a href="' + element.ArchivoAdjunto1.RutaArchivo + '" download="' + element.ArchivoAdjunto1.RutaArchivo + '" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-download"></i></a>'
                        ButtonDownload = '<a onclick="downloadFileInvestCorporativas(' + element.IdInvestigacionCorporativa + ')" class= "btn btn-sm btn-primary active" data-id="' + element.IdInvestigacionCorporativa + '"> <i class="fa fa-download"></i></a>'
                    }

                    if (AccessDelete.length > 0 && AccessDelete[0].IdAcceso == 30) {
                        ButtonDelete = '<a onclick="deleteInvestCorporativas(' + element.IdInvestigacionCorporativa + ')" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-trash"></i></a>'
                    }

                    tableDataInvestCorporativas.row.add([
                        element.IdInvestigacionCorporativa,
                        element.Servicio,
                        element.UsuarioEnvio,
                        element.FechaHoraReg,
                        element.Pais,
                        element.Estado,
                        ButtonDownload +
                        ButtonDelete
                    ]).draw(false);
                    tableDataInvestCorporativas.columns.adjust()
                        .responsive.recalc();
                })

                functions.notify_message(MESSAGE.es.success_select, 'success')
            }

        }
    });
    // --- }

}

function downloadFileInvestCorporativas(value) {
    let Object = listInvestCorporativas.find(x => x.IdInvestigacionCorporativa == value);
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

function deleteInvestCorporativas(value) {
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

            let url = urlUpdateStatusCorporateInvestigations + "?IdInvestigacionCorporativa=" + value + '&Flg_Estado=false'
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
                        object["FechaInicio"] = $('#txt_fecha_inicio_InvestCorporativas').val()
                        object["FechaFin"] = $('#txt_fecha_fin_InvestCorporativas').val()
                        getListInvestCorporativas(object)
                    }

                }
            });

        }
    }])

}

$("#btn_buscar_InvestCorporativas").on('click', function () {
    let fechaInicio = $("#txt_fecha_inicio_InvestCorporativas").val()
    let fechaFin = $("#txt_fecha_fin_InvestCorporativas").val()
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
        getListInvestCorporativas(object)
    }
})

//#endregion

//#region -- PERSONAL INTERNO

// -- VARIABLES
var listPersIntInformacion = new Array()
var indexListPersIntInformacion = 1

// -- TABLE
var tableDataPersIntInformacion = $('#tbl_data_PersIntInformacion').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    },
    order: [[0, "desc"]]
})

// -- GUARDAR
$('#btn_guardar_registro_PersIntInformacion').on('click', function () {
    // --
    var formData = new FormData();

    var sl_modal_register_PersIntInformacion_empresa = $('#sl_modal_register_PersIntInformacion_empresa').val()
    var sl_modal_register_PersIntInformacion_sucursal = $('#sl_modal_register_PersIntInformacion_sucursal').val()

    var sl_modal_register_PersIntInformacion_tipo_informe = $('#sl_modal_register_PersIntInformacion_tipo_informe').val()
    var txt_PersIntInformacion_nombre = $('#txt_PersIntInformacion_nombre').val()
    
    // -- ARCHIVO ADJUNTO
    var file_PersIntInformacion = $('#file_modal_register_PersIntInformacion_1').prop("files")[0];
    var ext_PersIntInformacion = ""
    // --
    if (file_PersIntInformacion !== undefined) {
        // --
        ext_PersIntInformacion = getFileExtension(file_PersIntInformacion.name)
        // --
        formData.append("dataFile", file_PersIntInformacion, "PersIntInformacion." + ext_PersIntInformacion);
    }
    
    // -- OBJECT
    var objectData = {
        // --
        "IdPersInternoInfo": 0,
        "IdEmpresa": Number(sl_modal_register_PersIntInformacion_empresa),
        "Nombre": txt_PersIntInformacion_nombre,
        "TipoReporte": sl_modal_register_PersIntInformacion_tipo_informe,
        "IdUsuarioEnvio": 0,
        "ArchivoAdjunto1":
        {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "PersIntInformacion." + ext_PersIntInformacion, // -- 
            "RutaArchivo": null,
            "ExtensionArchivo": ext_PersIntInformacion,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        },
        "FlgEstado": true
    }

    var camposVacios = ""
    // --
    if (sl_modal_register_PersIntInformacion_empresa == 0) {
        camposVacios += "<span>No se ha selecionado la empresa.</span></br>"
    }

  //  if (sl_modal_register_PersIntInformacion_sucursal == 0) {
   //     camposVacios += "<span>No se ha selecionado la sucursal.</span></br>"
   // }
    
    if (sl_modal_register_PersIntInformacion_tipo_informe == '0') {
        //console.log(sl_modal_register_PersIntInformacion_tipo_informe)
        camposVacios += "<span>No se ha selecionado el Tipo de Informe.</span></br>"
    }
    if (txt_PersIntInformacion_nombre.length == 0) {
        camposVacios += "<span>No ha ingresado el nombre.</span></br>"
    }
    if (file_PersIntInformacion == undefined) {
        camposVacios += "<span>No se ha adjuntado ningun documento.</span>"
    }
    if (ext_PersIntInformacion != "pdf") {
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
                    url: urlSaveOrUpdateInternalStaff,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {

                        let obj = data.response;
                        // --
                        if (obj.status == 'OK') {
                            $('#content_loader_PersIntInformacion').css('display', 'none');
                            $("#modal_register_PersIntInformacion").modal('hide')
                            let object = new Object()
                            object["FechaInicio"] = $('#txt_fecha_inicio_PersIntInformacion').val()
                            object["FechaFin"] = $('#txt_fecha_fin_PersIntInformacion').val()
                            object["TipoReporte"] = $("#sl_PersIntInformacion_tipo_informe").val();
                            getListPersIntInformacion(object)
                            functions.notify_message(MESSAGE.es.success_insert, 'success')
                        } else {
                            $('#content_loader_PersIntInformacion').css('display', 'none');
                            functions.notify_message(MESSAGE.es.error_insert, 'error')
                        }
                    },
                    beforeSend: function (xhr) {
                        $('#content_loader_PersIntInformacion').css('display', 'block');
                    }
                });
            }
        }])
    }

})

// --
$('#modal_register_PersIntInformacion').on('shown.bs.modal', function (e) {
    // --
    $('#content_loader_PersIntInformacion').css('display', 'none')
    $("#file_modal_register_PersIntInformacion_1").val(null);
    $('#sl_modal_register_PersIntInformacion_empresa').val('0');
    $('#txt_PersIntInformacion_nombre').val('');
    $("#sl_modal_register_PersIntInformacion_empresa").select2({
        dropdownParent: $("#modal_register_PersIntInformacion")
    });
    $('#sl_modal_register_PersIntInformacion_tipo_informe').val('0');
})

// --
function getListPersIntInformacion(object) {
    $("#tbl_data_PersIntInformacion").DataTable().clear().draw().draw()
    // --
    let url = urlGetListInternalStaff + "?FechaInicio=" + object["FechaInicio"] + "&FechaFin=" + object["FechaFin"] + "&TipoReporte=" + object["TipoReporte"]
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
                listPersIntInformacion = lista

                let AccessDelete = ListAccessUser.filter(x => x.IdAcceso == 31);

                lista.forEach((element) => {
                    let index = tableDataPersIntInformacion.rows().count() + 1;
                    let ButtonDownload = '';
                    let ButtonDelete = '';
                    if (element.ArchivoAdjunto1 != null) {
                        //ButtonDownload = ' <a href="' + element.ArchivoAdjunto1.RutaArchivo + '" download="' + element.ArchivoAdjunto1.RutaArchivo + '" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-download"></i></a>'
                        ButtonDownload = '<a onclick="downloadFilePersIntInformacion(' + element.IdPersInternoInfo + ')" class= "btn btn-sm btn-primary active" data-id="' + element.IdPersInternoInfo + '"> <i class="fa fa-download"></i></a>'
                    }

                    if (AccessDelete.length > 0 && AccessDelete[0].IdAcceso == 31) {
                        ButtonDelete = '<a onclick="deletePersIntInformacion(' + element.IdPersInternoInfo + ')" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-trash"></i></a>'
                    }

                    tableDataPersIntInformacion.row.add([
                        element.IdPersInternoInfo,
                        element.Nombre,
                        element.TipoReporte,
                        element.UsuarioEnvio,
                        element.FechaHoraReg,
                        element.Pais,
                        element.Estado,
                        ButtonDownload +
                        ButtonDelete
                    ]).draw(false);
                    tableDataPersIntInformacion.columns.adjust()
                        .responsive.recalc();
                })

                functions.notify_message(MESSAGE.es.success_select, 'success')
            }

        }
    });
    // --- }

}

function downloadFilePersIntInformacion(value) {
    let Object = listPersIntInformacion.find(x => x.IdPersInternoInfo == value);
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

function deletePersIntInformacion(value) {
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

            let url = urlUpdateStatusInternalStaff + "?IdPersInternoInfo=" + value + '&Flg_Estado=false'
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
                        object["FechaInicio"] = $('#txt_fecha_inicio_PersIntInformacion').val()
                        object["FechaFin"] = $('#txt_fecha_fin_PersIntInformacion').val()
                        object["TipoReporte"] = $("#sl_PersIntInformacion_tipo_informe").val();
                        getListPersIntInformacion(object)
                    }

                }
            });

        }
    }])

}

$("#btn_buscar_PersIntInformacion").on('click', function () {
    let fechaInicio = $("#txt_fecha_inicio_PersIntInformacion").val()
    let fechaFin = $("#txt_fecha_fin_PersIntInformacion").val()
    let tipoReporte = $("#sl_PersIntInformacion_tipo_informe").val();
    // --
    if (fechaFin.length < 1 || fechaInicio.length < 1) {
        // --
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    } else {
        // --
        let object = new Object()
        object["FechaInicio"] = fechaInicio
        object["FechaFin"] = fechaFin
        object["TipoReporte"] = tipoReporte
        // --
        getListPersIntInformacion(object)
    }
})

//#endregion

//#region -- SEGURIDAD FISICA

// -- VARIABLES
var listSeguridadFisica = new Array()
var indexListSeguridadFisica = 1

// -- TABLE
var tableDataSeguridadFisica = $('#tbl_data_SeguridadFisica').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    },
    order: [[0, "desc"]]
})

// -- GUARDAR
$('#btn_guardar_registro_SeguridadFisica').on('click', function () {
    // --
    var formData = new FormData();

    var sl_modal_register_SeguridadFisica_empresa = $('#sl_modal_register_SeguridadFisica_empresa').val()
    var sl_modal_register_SeguridadFisica_sucursal = $('#sl_modal_register_SeguridadFisica_sucursal').val()

    // -- ARCHIVO ADJUNTO
    var file_SeguridadFisica = $('#file_modal_register_SeguridadFisica_1').prop("files")[0];
    var ext_SeguridadFisica = ""
    // --
    if (file_SeguridadFisica !== undefined) {
        // --
        ext_SeguridadFisica = getFileExtension(file_SeguridadFisica.name)
        // --
        formData.append("dataFile", file_SeguridadFisica, "SeguridadFisica." + ext_SeguridadFisica);
    }

    // -- OBJECT
    var objectData = {
        // --
        "IdSeguridadFisica": 0,
        "IdEmpresa": Number(sl_modal_register_SeguridadFisica_empresa),
        "IdPais": 0,
        "IdUsuarioEnvio": 0,
        "ArchivoAdjunto1":
        {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "SeguridadFisica." + ext_SeguridadFisica, // -- 
            "RutaArchivo": null,
            "ExtensionArchivo": ext_SeguridadFisica,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        },
        "FlgEstado": true
    }

    var camposVacios = ""
    // --
    if (sl_modal_register_SeguridadFisica_empresa == 0) {
        camposVacios += "<span>No se ha selecionado la empresa.</span></br>"
    }

    //if (sl_modal_register_SeguridadFisica_sucursal == 0) {
   //     camposVacios += "<span>No se ha selecionado la sucursal.</span></br>"
   // }

    if (file_SeguridadFisica == undefined) {
        camposVacios += "<span>No se ha adjuntado ningun documento.</span>"
    }
    if (ext_SeguridadFisica != "pdf") {
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
                    url: urlSaveOrUpdatePhysicalSecurity,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {

                        let obj = data.response;
                        // --
                        if (obj.status == 'OK') {
                            $('#content_loader_SeguridadFisica').css('display', 'none');
                            $("#modal_register_SeguridadFisica").modal('hide')
                            let object = new Object()
                            object["FechaInicio"] = $('#txt_fecha_inicio_SeguridadFisica').val()
                            object["FechaFin"] = $('#txt_fecha_fin_SeguridadFisica').val()
                            getListSeguridadFisica(object)
                            functions.notify_message(MESSAGE.es.success_insert, 'success')
                        } else {
                            $('#content_loader_SeguridadFisica').css('display', 'none');
                            functions.notify_message(MESSAGE.es.error_insert, 'error')
                        }
                    },
                    beforeSend: function (xhr) {
                        $('#content_loader_SeguridadFisica').css('display', 'block');
                    }
                });
            }
        }])
    }

})

// --
$('#modal_register_SeguridadFisica').on('shown.bs.modal', function (e) {
    // --
    $('#content_loader_SeguridadFisica').css('display', 'none')
    $("#file_modal_register_SeguridadFisica_1").val(null);
    $('#sl_modal_register_SeguridadFisica_empresa').val('0');
    $("#sl_modal_register_SeguridadFisica_empresa").select2({
        dropdownParent: $("#modal_register_SeguridadFisica")
    });
})

// --
function getListSeguridadFisica(object) {
    // --
    $("#tbl_data_SeguridadFisica").DataTable().clear().draw()
    let url = urlGetListPhysicalSecurity + "?FechaInicio=" + object["FechaInicio"] + "&FechaFin=" + object["FechaFin"]
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

                let AccessDelete = ListAccessUser.filter(x => x.IdAcceso == 32);

                listSeguridadFisica = lista
                lista.forEach((element) => {
                    let index = tableDataSeguridadFisica.rows().count() + 1;
                    let ButtonDownload = '';
                    let ButtonDelete = '';
                    if (element.ArchivoAdjunto1 != null) {
                        //ButtonDownload = ' <a href="' + element.ArchivoAdjunto1.RutaArchivo + '" download="' + element.ArchivoAdjunto1.RutaArchivo + '" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-download"></i></a>'
                        ButtonDownload = '<a onclick="downloadFileSeguridadFisica(' + element.IdSeguridadFisica + ')" class= "btn btn-sm btn-primary active" data-id="' + element.IdSeguridadFisica + '"> <i class="fa fa-download"></i></a>'
                    }

                    if (AccessDelete.length > 0 && AccessDelete[0].IdAcceso == 32) {
                        ButtonDelete = '<a onclick="deleteSeguridadFisica(' + element.IdSeguridadFisica + ')" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-trash"></i></a>'
                    }

                    tableDataSeguridadFisica.row.add([
                        element.IdSeguridadFisica,
                        element.Servicio,
                        element.UsuarioEnvio,
                        element.FechaHoraReg,
                        element.Pais,
                        element.Estado,
                        ButtonDownload +
                        ButtonDelete
                    ]).draw(false);
                    tableDataSeguridadFisica.columns.adjust()
                        .responsive.recalc();
                })

                functions.notify_message(MESSAGE.es.success_select, 'success')
            }

        }
    });
    // --- }

}

function downloadFileSeguridadFisica(value) {
    let Object = listSeguridadFisica.find(x => x.IdSeguridadFisica == value);
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

function deleteSeguridadFisica(value) {
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

            let url = urlUpdateStatusPhysicalSecurity + "?IdSeguridadFisica=" + value + '&Flg_Estado=false'
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
                        object["FechaInicio"] = $('#txt_fecha_inicio_SeguridadFisica').val()
                        object["FechaFin"] = $('#txt_fecha_fin_SeguridadFisica').val()
                        getListSeguridadFisica(object)
                    }

                }
            });

        }
    }])

}

$("#btn_buscar_SeguridadFisica").on('click', function () {
    let fechaInicio = $("#txt_fecha_inicio_SeguridadFisica").val()
    let fechaFin = $("#txt_fecha_fin_SeguridadFisica").val()
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
        getListSeguridadFisica(object)
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
            getListBElectronico(object)
        }
    });
}



function Inicio() {
    //let FechaActual = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')
    let FechaInicio = new Date()
    FechaInicio.setMonth(FechaInicio.getMonth() - 1)
    let FechaInicio_in_string = FechaInicio.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
    let FechaFin_in_string = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
    $('#txt_fecha_inicio_BElectronico').val(FechaInicio_in_string)
    $('#txt_fecha_fin_BElectronico').val(FechaFin_in_string)
    // --
    $('#txt_fecha_inicio_ESPatrimonial').val(FechaInicio_in_string)
    $('#txt_fecha_fin_ESPatrimonial').val(FechaFin_in_string)
    // --
    $('#txt_fecha_inicio_InvestCorporativas').val(FechaInicio_in_string)
    $('#txt_fecha_fin_InvestCorporativas').val(FechaFin_in_string)
    // --
    $('#txt_fecha_inicio_PersIntInformacion').val(FechaInicio_in_string)
    $('#txt_fecha_fin_PersIntInformacion').val(FechaFin_in_string)
    // --
    $('#txt_fecha_inicio_SeguridadFisica').val(FechaInicio_in_string)
    $('#txt_fecha_fin_SeguridadFisica').val(FechaFin_in_string)
    // --

    GetAccessUser(FechaInicio_in_string, FechaFin_in_string)
}

Inicio();



//Barrido electronico
$("#sl_modal_register_BElectronico_empresa").change(function () {
    let value = $("#sl_modal_register_BElectronico_empresa").val()
    console.log('Select', value)
    getSucursalesBarridoElectronico(value)
});

// --
function getSucursalesBarridoElectronico(IdEmpresa, IdSucursal = 0) {
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
                // --urlGetListBranchOffice 
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
                $('#sl_modal_register_BElectronico_sucursal').html(html);
                $('#sl_modal_register_BElectronico_sucursal').attr("disabled", false);
            }
        });
    } else {
        // --
        let html = '<option value="0">[Seleccionar]</option>'
        // --
        $('#sl_modal_register_BElectronico_sucursal').html(html);
        $('#sl_modal_register_BElectronico_sucursal').attr("disabled", "disabled");
    }

}


//SeguridadPatrimonial
$("#sl_modal_register_ESPatrimonial_empresa").change(function () {
    let value = $("#sl_modal_register_ESPatrimonial_empresa").val()
    console.log('Select', value)
    getSucursalesSeguridadPatrimonial(value)
});

// --
function getSucursalesSeguridadPatrimonial(IdEmpresa, IdSucursal = 0) {
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
                $('#sl_modal_register_ESPatrimonial_sucursal').html(html);
                $('#sl_modal_register_ESPatrimonial_sucursal').attr("disabled", false);
            }
        });
    } else {
        // --
        let html = '<option value="0">[Seleccionar]</option>'
        // --
        $('#sl_modal_register_ESPatrimonial_sucursal').html(html);
        $('#sl_modal_register_ESPatrimonial_sucursal').attr("disabled", "disabled");
    }

}


//Investigaciones Corporativas
$("#sl_modal_register_InvestCorporativas_empresa").change(function () {
    let value = $("#sl_modal_register_InvestCorporativas_empresa").val()
    console.log('Select', value)
    getSucursalesInvestigacionesCorporativas(value)
});

// --
function getSucursalesInvestigacionesCorporativas(IdEmpresa, IdSucursal = 0) {
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
                $('#sl_modal_register_InvestCorporativas_sucursal').html(html);
                $('#sl_modal_register_InvestCorporativas_sucursal').attr("disabled", false);
            }
        });
    } else {
        // --
        let html = '<option value="0">[Seleccionar]</option>'
        // --
        $('#sl_modal_register_InvestCorporativas_sucursal').html(html);
        $('#sl_modal_register_InvestCorporativas_sucursal').attr("disabled", "disabled");
    }

}


//PersonalInterno
$("#sl_modal_register_PersIntInformacion_empresa").change(function () {
    let value = $("#sl_modal_register_PersIntInformacion_empresa").val()
    console.log('Select', value)
    getSucursalesPersonalInterno(value)
});

// --
function getSucursalesPersonalInterno(IdEmpresa, IdSucursal = 0) {
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
                $('#sl_modal_register_PersIntInformacion_sucursal').html(html);
                $('#sl_modal_register_PersIntInformacion_sucursal').attr("disabled", false);
            }
        });
    } else {
        // --
        let html = '<option value="0">[Seleccionar]</option>'
        // --
        $('#sl_modal_register_PersIntInformacion_sucursal').html(html);
        $('#sl_modal_register_PersIntInformacion_sucursal').attr("disabled", "disabled");
    }

}


//Seguridad Fisica Industrial
$("#sl_modal_register_SeguridadFisica_empresa").change(function () {
    let value = $("#sl_modal_register_SeguridadFisica_empresa").val()
    console.log('Select', value)
    getSucursalesFisicaIndustrial(value)
});

// --
function getSucursalesFisicaIndustrial(IdEmpresa, IdSucursal = 0) {
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
                $('#sl_modal_register_SeguridadFisica_sucursal').html(html);
                $('#sl_modal_register_SeguridadFisica_sucursal').attr("disabled", false);
            }
        });
    } else {
        // --
        let html = '<option value="0">[Seleccionar]</option>'
        // --
        $('#sl_modal_register_SeguridadFisica_sucursal').html(html);
        $('#sl_modal_register_SeguridadFisica_sucursal').attr("disabled", "disabled");
    }

}

//Se deshabilita el sucursal

$('#sl_modal_register_BElectronico_sucursal').attr('disabled', 'disabled');
$('#sl_modal_register_ESPatrimonial_sucursal').attr('disabled', 'disabled');
$('#sl_modal_register_InvestCorporativas_sucursal').attr('disabled', 'disabled');
$('#sl_modal_register_PersIntInformacion_sucursal').attr('disabled', 'disabled');
$('#sl_modal_register_SeguridadFisica_sucursal').attr('disabled', 'disabled');
