
// --
const functions = new Functions()
var ListAccessUser = null

//$(document).ready(function () {
    //$("#sl_modal_register_HackeoEtico_empresa").select2({
    //    dropdownParent: $("#modal_register_HackeoEtico")
    //});
//});

// -- Datepicker
$('#txt_fecha_inicio_HackeoEtico').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})
$('#txt_fecha_fin_HackeoEtico').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})
// -- Datepicker
$('#txt_fecha_inicio_OSINT').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})
$('#txt_fecha_fin_OSINT').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})
// -- Datepicker
$('#txt_fecha_inicio_Pentesting').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})
$('#txt_fecha_fin_Pentesting').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})


//#region -- HACKEO ETICO

// -- VARIABLES
var listHackeoEtico = new Array()
var indexListHackeoEtico = 1

// -- TABLE
var tableDataHackeoEtico = $('#tbl_data_Hackeo_Etico').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    },
    order: [[0, "desc"]]
})

// -- GUARDAR
$('#btn_guardar_registro_HackeoEtico').on('click', function () {
    // --
    var formData = new FormData();

    // -- 1.1 DATOS BASICOS DEL CANDIDATO
    var sl_modal_register_HackeoEtico_empresa = $('#sl_modal_register_HackeoEtico_empresa').val()
    var sl_modal_register_HackeoEtico_sucursal = $('#sl_modal_register_HackeoEtico_sucursal').val()

    var txt_HackeoEtico_comentario = $('#txt_HackeoEtico_comentario').val()

    // -- ARCHIVO ADJUNTO
    var file_Hackeo_Etico = $('#file_modal_register_HackeoEtico_1').prop("files")[0];
    var ext_Hackeo_Etico = ""
    // --
    if (file_Hackeo_Etico !== undefined) {
        // --
        ext_Hackeo_Etico = getFileExtension(file_Hackeo_Etico.name)
        // --
        formData.append("dataFile", file_Hackeo_Etico, "Hackeo_Etico." + ext_Hackeo_Etico);
    }

    // -- OBJECT
    var objectData = {
        // --
        "IdHackeoEtico": 0,
        "IdEmpresa": Number(sl_modal_register_HackeoEtico_empresa),
        "IdPais": 0,
        "Comentario": txt_HackeoEtico_comentario,
        "ArchivoAdjunto1":
        {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "Hackeo_Etico." + ext_Hackeo_Etico, // -- 
            "RutaArchivo": null,
            "ExtensionArchivo": ext_Hackeo_Etico,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        }
    }

    // -- I. INFORME ANTECEDENTES JUDICIALES
    var camposVacios = ""
    // --
    if (sl_modal_register_HackeoEtico_empresa == 0) {
        camposVacios += "<span>No se ha selecionado la empresa.</span></br>"
    }

    /*
    if (sl_modal_register_HackeoEtico_sucursal == 0) {
        camposVacios += "<span>No se ha selecionado la sucursal.</span></br>"
    }
    */


    if (file_Hackeo_Etico == undefined) {
        camposVacios += "<span>No se ha adjuntado ningun documento.</span>"
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
                    url: urlSaveOrUpdateHackeoEtico,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        
                        let obj = data.response;
                        // --
                        if (obj.status == 'OK') {
                            $('#content_loader_HackeoEtico').css('display', 'none');
                            $("#modal_register_HackeoEtico").modal('hide')
                            let object = new Object()
                            object["FechaInicio"] = $('#txt_fecha_inicio_HackeoEtico').val()
                            object["FechaFin"] = $('#txt_fecha_fin_HackeoEtico').val()
                            getListHackeoEtico(object)
                            functions.notify_message(MESSAGE.es.success_insert, 'success')
                        } else {
                            $('#content_loader_HackeoEtico').css('display', 'none');
                            functions.notify_message(MESSAGE.es.error_insert, 'error')
                        }
                    },
                    beforeSend: function (xhr) {
                        $('#content_loader_HackeoEtico').css('display', 'block');
                    }
                });
            }
        }])
    }

})

// --
$('#modal_register_HackeoEtico').on('shown.bs.modal', function (e) {
    // --
    $('#content_loader_HackeoEtico').css('display', 'none')
    $("#file_modal_register_HackeoEtico_1").val(null);
    $('#sl_modal_register_HackeoEtico_empresa').val('0');
    $('#txt_HackeoEtico_comentario').val('');
    $("#sl_modal_register_HackeoEtico_empresa").select2({
        dropdownParent: $("#modal_register_HackeoEtico")
    });
})

// --
function getListHackeoEtico(object) {
    // --
    $("#tbl_data_Hackeo_Etico").DataTable().clear().draw()
    let url = urlGetListHackeoEtico + "?FechaInicio=" + object["FechaInicio"] + "&FechaFin=" + object["FechaFin"]
    //let url = urlGetListHackeoEtico + "?FechaInicio=" + object["FechaInicio"] + "&FechaFin=" + object["FechaFin"]+ "&IdTipoAlerta=" + object["TipoReporte"]

    // --
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        success: function (data) {
            let obj = data.Data
            console.log("Data que viene Hackeo etico");

            console.log(obj)
            if (obj != null) {
                
                // -- HACKEO ETICO
                let lista = obj
                listHackeoEtico = lista

                let AccessDelete = ListAccessUser.filter(x => x.IdAcceso == 25);
                
                lista.forEach((element) => {
                    let index = tableDataHackeoEtico.rows().count() + 1;
                    let ButtonDownload = '';
                    let ButtonDelete = '';
                    if (element.ArchivoAdjunto1 != null) {
                        //ButtonDownload = ' <a href="' + element.ArchivoAdjunto1.RutaArchivo + '" download="' + element.ArchivoAdjunto1.RutaArchivo + '" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-download"></i></a>'
                        ButtonDownload = '<a onclick="downloadFileHackeoEtico(' + element.IdHackeoEtico + ')" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-download"></i></a>'
                    }

                    if (AccessDelete.length > 0 && AccessDelete[0].IdAcceso == 25) {
                        ButtonDelete = '<a onclick="deleteHackeoEtico(' + element.IdHackeoEtico + ')" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-trash"></i></a>'
                    }

                    tableDataHackeoEtico.row.add([
                        index,
                        element.Empresa,
                        element.FechaHoraReg,
                        element.Pais,
                        element.Comentario,
                        ButtonDownload +
                        ButtonDelete
                    ]).draw(false);
                    tableDataHackeoEtico.columns.adjust()
                        .responsive.recalc();
                })

                functions.notify_message(MESSAGE.es.success_select, 'success')
            }

        }
    });
    // --- }

}

function downloadFileHackeoEtico(value) {
    let Object = listHackeoEtico.find(x => x.IdHackeoEtico == value);
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

function deleteHackeoEtico(value) {
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

            let url = urlUpdateStatusHackeoEtico + "?IdHackeoEtico=" + value + '&Flg_Estado=false'
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
                        object["FechaInicio"] = $('#txt_fecha_inicio_HackeoEtico').val()
                        object["FechaFin"] = $('#txt_fecha_fin_HackeoEtico').val()
                        getListHackeoEtico(object)
                    }

                }
            });

        }
    }])


}

$("#btn_buscar_HackeoEtico").on('click', function () {
    let fechaInicio = $("#txt_fecha_inicio_HackeoEtico").val()
    let fechaFin = $("#txt_fecha_fin_HackeoEtico").val()
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
        getListHackeoEtico(object)
    }
})

//#endregion

//#region -- OSINT

// -- VARIABLES
var listOSINT = new Array()
var indexListOSINT = 1

// -- TABLE
var tableDataOSINT = $('#tbl_data_OSINT').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    },
    order: [[0, "desc"]]
})

// -- GUARDAR
$('#btn_guardar_registro_OSINT').on('click', function () {
    // --
    var formData = new FormData();

    // -- 1.1 DATOS BASICOS DEL CANDIDATO
    var sl_modal_register_OSINT_empresa = $('#sl_modal_register_OSINT_empresa').val()
    var sl_modal_register_OSINT_sucursal = $('#sl_modal_register_OSINT_sucursal').val()

    var txt_OSINT_comentario = $('#txt_OSINT_comentario').val()

    // -- ARCHIVO ADJUNTO
    var file_OSINT = $('#file_modal_register_OSINT_1').prop("files")[0];
    var ext_OSINT = ""
    // --
    if (file_OSINT !== undefined) {
        // --
        ext_OSINT = getFileExtension(file_OSINT.name)
        // --
        formData.append("dataFile", file_OSINT, "OSINT." + ext_OSINT);
    }

    // -- OBJECT
    var objectData = {
        // --
        "IdOSINT": 0,
        "IdEmpresa": Number(sl_modal_register_OSINT_empresa),
        "IdPais": 0,
        "Comentario": txt_OSINT_comentario,
        "ArchivoAdjunto1":
        {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "OSINT." + ext_OSINT, // -- 
            "RutaArchivo": null,
            "ExtensionArchivo": ext_OSINT,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        }
    }

    // -- I. INFORME ANTECEDENTES JUDICIALES
    var camposVacios = ""
    // --
    if (sl_modal_register_OSINT_empresa == 0) {
        camposVacios += "<span>No se ha selecionado la empresa.</span></br>"
    }
    /*
    if (sl_modal_register_OSINT_sucursal == 0) {
        camposVacios += "<span>No se ha selecionado la sucursal.</span></br>"
    }
    */

    if (file_OSINT == undefined) {
        camposVacios += "<span>No se ha adjuntado ningun documento.</span>"
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
                    url: urlSaveOrUpdateOsint,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {

                        let obj = data.response;
                        // --
                        if (obj.status == 'OK') {
                            $('#content_loader_OSINT').css('display', 'none');
                            $("#modal_register_OSINT").modal('hide')
                            let object = new Object()
                            object["FechaInicio"] = $('#txt_fecha_inicio_OSINT').val()
                            object["FechaFin"] = $('#txt_fecha_fin_OSINT').val()
                            getListOSINT(object)
                            functions.notify_message(MESSAGE.es.success_insert, 'success')
                        } else {
                            $('#content_loader_OSINT').css('display', 'none');
                            functions.notify_message(MESSAGE.es.error_insert, 'error')
                        }
                    },
                    beforeSend: function (xhr) {
                        $('#content_loader_OSINT').css('display', 'block');
                    }
                });
            }
        }])
    }

})

// --
$('#modal_register_OSINT').on('shown.bs.modal', function (e) {
    // --
    $('#content_loader_OSINT').css('display', 'none')
    $("#file_modal_register_OSINT_1").val(null);
    $('#sl_modal_register_OSINT_empresa').val('0');
    $('#txt_OSINT_comentario').val('');
    $("#sl_modal_register_OSINT_empresa").select2({
        dropdownParent: $("#modal_register_OSINT")
    });
})

// --
function getListOSINT(object) {
    // --
    $("#tbl_data_OSINT").DataTable().clear().draw()
    let url = urlGetListOsint + "?FechaInicio=" + object["FechaInicio"] + "&FechaFin=" + object["FechaFin"]
    // --
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        success: function (data) {
            let obj = data.Data
            if (obj != null) {

                // -- OSINT
                let lista = obj
                listOSINT = lista

                let AccessDelete = ListAccessUser.filter(x => x.IdAcceso == 26);

                lista.forEach((element) => {
                    let index = tableDataOSINT.rows().count() + 1;
                    let ButtonDownload = '';
                    let ButtonDelete = '';
                    if (element.ArchivoAdjunto1 != null) {
                        //ButtonDownload = ' <a href="' + element.ArchivoAdjunto1.RutaArchivo + '" download="' + element.ArchivoAdjunto1.RutaArchivo + '" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-download"></i></a>'
                        ButtonDownload = '<a onclick="downloadFileOSINT(' + element.IdOSINT + ')" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-download"></i></a>'
                    }

                    if (AccessDelete.length > 0 && AccessDelete[0].IdAcceso == 26) {
                        ButtonDelete = '<a onclick="deleteOSINT(' + element.IdOSINT + ')" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-trash"></i></a>'
                    }

                    tableDataOSINT.row.add([
                        index,
                        element.Empresa,
                        element.FechaHoraReg,
                        element.Pais,
                        element.Comentario,
                        ButtonDownload +
                        ButtonDelete
                    ]).draw(false);
                    tableDataOSINT.columns.adjust()
                        .responsive.recalc();
                })

                functions.notify_message(MESSAGE.es.success_select, 'success')
            }

        }
    });
    // --- }

}

function downloadFileOSINT(value) {
    let Object = listOSINT.find(x => x.IdOSINT == value);
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

function deleteOSINT(value) {
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

            let url = urlUpdateStatusOsint + "?IdOSINT=" + value + '&Flg_Estado=false'
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
                        object["FechaInicio"] = $('#txt_fecha_inicio_OSINT').val()
                        object["FechaFin"] = $('#txt_fecha_fin_OSINT').val()
                        getListOSINT(object)
                    }

                }
            });

        }
    }])

}

$("#btn_buscar_OSINT").on('click', function () {
    let fechaInicio = $("#txt_fecha_inicio_OSINT").val()
    let fechaFin = $("#txt_fecha_fin_OSINT").val()
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
        getListOSINT(object)
    }
})
//#endregion

//#region -- PENTESTING

// -- VARIABLES
var listPentesting = new Array()
var indexListPentesting = 1

// -- TABLE
var tableDataPentesting = $('#tbl_data_Pentesting').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    },
    order: [[0, "desc"]]
})

// -- GUARDAR
$('#btn_guardar_registro_Pentesting').on('click', function () {
    // --
    var formData = new FormData();

    // -- 1.1 DATOS BASICOS DEL CANDIDATO
    var sl_modal_register_Pentesting_empresa = $('#sl_modal_register_Pentesting_empresa').val()
    var sl_modal_register_Pentesting_sucursal = $('#sl_modal_register_Pentesting_sucursal').val()

    var txt_Pentesting_comentario = $('#txt_Pentesting_comentario').val()

    // -- ARCHIVO ADJUNTO
    var file_Pentesting = $('#file_modal_register_Pentesting_1').prop("files")[0];
    var ext_Pentesting = ""
    // --
    if (file_Pentesting !== undefined) {
        // --
        ext_Pentesting = getFileExtension(file_Pentesting.name)
        // --
        formData.append("dataFile", file_Pentesting, "Pentesting." + ext_Pentesting);
    }

    // -- OBJECT
    var objectData = {
        // --
        "IdPentesting": 0,
        "IdEmpresa": Number(sl_modal_register_Pentesting_empresa),
        "IdPais": 0,
        "Comentario": txt_Pentesting_comentario,
        "ArchivoAdjunto1":
        {
            "IdArchivoAdjunto": 0,
            "NombreArchivo": "Pentesting." + ext_Pentesting, // -- 
            "RutaArchivo": null,
            "ExtensionArchivo": ext_Pentesting,
            "FecRegistro": null,
            "IdUsuarioRegistro": 0
        }
    }

    // -- I. INFORME ANTECEDENTES JUDICIALES
    var camposVacios = ""
    // --
    if (sl_modal_register_Pentesting_empresa == 0) {
        camposVacios += "<span>No se ha selecionado la empresa.</span></br>"
    }
    /*
    if (sl_modal_register_Pentesting_sucursal == 0) {
        camposVacios += "<span>No se ha selecionado la sucursal.</span></br>"
    }
    */

    if (file_Pentesting == undefined) {
        camposVacios += "<span>No se ha adjuntado ningun documento.</span>"
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
                    url: urlSaveOrUpdatePentesting,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {

                        let obj = data.response;
                        // --
                        if (obj.status == 'OK') {
                            $('#content_loader_Pentesting').css('display', 'none');
                            $("#modal_register_Pentesting").modal('hide')
                            let object = new Object()
                            object["FechaInicio"] = $('#txt_fecha_inicio_Pentesting').val()
                            object["FechaFin"] = $('#txt_fecha_fin_Pentesting').val()
                            getListPentesting(object)
                            functions.notify_message(MESSAGE.es.success_insert, 'success')
                        } else {
                            $('#content_loader_Pentesting').css('display', 'none');
                            functions.notify_message(MESSAGE.es.error_insert, 'error')
                        }
                    },
                    beforeSend: function (xhr) {
                        $('#content_loader_Pentesting').css('display', 'block');
                    }
                });
            }
        }])
    }

})

// --
$('#modal_register_Pentesting').on('shown.bs.modal', function (e) {
    // --
    $('#content_loader_Pentesting').css('display', 'none')
    $("#file_modal_register_Pentesting_1").val(null);
    $('#sl_modal_register_Pentesting_empresa').val('0');
    $('#txt_Pentesting_comentario').val('');
    $("#sl_modal_register_Pentesting_empresa").select2({
        dropdownParent: $("#modal_register_Pentesting")
    });
})

// --
function getListPentesting(object) {
    // --
    $("#tbl_data_Pentesting").DataTable().clear().draw()
    let url = urlGetListPentesting + "?FechaInicio=" + object["FechaInicio"] + "&FechaFin=" + object["FechaFin"]
    // --
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        success: function (data) {
            let obj = data.Data
            //console.log(obj)
            if (obj != null) {

                // -- Pentesting
                let lista = obj
                listPentesting = lista

                let AccessDelete = ListAccessUser.filter(x => x.IdAcceso == 27);

                lista.forEach((element) => {
                    let index = tableDataPentesting.rows().count() + 1;
                    let ButtonDownload = '';
                    let ButtonDelete = '';
                    if (element.ArchivoAdjunto1 != null) {
                        //ButtonDownload = ' <a href="' + element.ArchivoAdjunto1.RutaArchivo + '" download="' + element.ArchivoAdjunto1.RutaArchivo + '" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-download"></i></a>'
                        ButtonDownload = '<a onclick="downloadFilePentesting(' + element.IdPentesting + ')" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-download"></i></a>'
                    }

                    if (AccessDelete.length > 0 && AccessDelete[0].IdAcceso == 27) {
                        ButtonDelete = '<a onclick="deletePentesting(' + element.IdPentesting + ')" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-trash"></i></a>'
                    }

                    tableDataPentesting.row.add([
                        index,
                        element.Empresa,
                        element.FechaHoraReg,
                        element.Pais,
                        element.Comentario,
                        ButtonDownload +
                        ButtonDelete
                    ]).draw(false);
                    tableDataPentesting.columns.adjust()
                        .responsive.recalc();
                })

                functions.notify_message(MESSAGE.es.success_select, 'success')
            }

        }
    });
    // --- }

}

function downloadFilePentesting(value) {
    let Object = listPentesting.find(x => x.IdPentesting == value);
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

function deletePentesting(value) {
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

            let url = urlUpdateStatusPentesting + "?IdPentesting=" + value + '&Flg_Estado=false'
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
                        object["FechaInicio"] = $('#txt_fecha_inicio_Pentesting').val()
                        object["FechaFin"] = $('#txt_fecha_fin_Pentesting').val()
                        getListPentesting(object)
                    }

                }
            });

        }
    }])

}

$("#btn_buscar_Pentesting").on('click', function () {
    let fechaInicio = $("#txt_fecha_inicio_Pentesting").val()
    let fechaFin = $("#txt_fecha_fin_Pentesting").val()
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
        getListPentesting(object)
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
            getListHackeoEtico(object)
        }
    });
}

function Inicio() {
    //let FechaActual = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')
    let FechaInicio = new Date()
    FechaInicio.setMonth(FechaInicio.getMonth() - 1)
    let FechaInicio_in_string = FechaInicio.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
    let FechaFin_in_string = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
    $('#txt_fecha_inicio_HackeoEtico').val(FechaInicio_in_string)
    $('#txt_fecha_fin_HackeoEtico').val(FechaFin_in_string)
    // --
    $('#txt_fecha_inicio_OSINT').val(FechaInicio_in_string)
    $('#txt_fecha_fin_OSINT').val(FechaFin_in_string)
    // --
    $('#txt_fecha_inicio_Pentesting').val(FechaInicio_in_string)
    $('#txt_fecha_fin_Pentesting').val(FechaFin_in_string)
    // --
    //let object = new Object()
    //object["FechaInicio"] = FechaInicio_in_string
    //object["FechaFin"] = FechaFin_in_string
    GetAccessUser(FechaInicio_in_string, FechaFin_in_string)
    // --
    //getListOSINT(object)
    // --
    //getListPentesting(object)
}

Inicio();

//======================Cambiar sucursales dependiendo el tipo de empresa
//OSINT
$("#sl_modal_register_OSINT_empresa").change(function () {
    let value = $("#sl_modal_register_OSINT_empresa").val()
    console.log('Select', value)
    getSucursalesOsint(value)
});

// --
function getSucursalesOsint(IdEmpresa, IdSucursal = 0) {
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
                $('#sl_modal_register_OSINT_sucursal').html(html);
                $('#sl_modal_register_OSINT_sucursal').attr("disabled", false);
            }
        });
    } else {
        // --
        let html = '<option value="0">[Seleccionar]</option>'
        // --
        $('#sl_modal_register_OSINT_sucursal').html(html);
        $('#sl_modal_register_OSINT_sucursal').attr("disabled", "disabled");
    }

}
//Pentesting
$("#sl_modal_register_Pentesting_empresa").change(function () {
    let value = $("#sl_modal_register_Pentesting_empresa").val()
    console.log('Select', value)
    getSucursalesPentesting(value)
});

// --
function getSucursalesPentesting(IdEmpresa, IdSucursal = 0) {
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
                $('#sl_modal_register_Pentesting_sucursal').html(html);
                $('#sl_modal_register_Pentesting_sucursal').attr("disabled", false);
            }
        });
    } else {
        // --
        let html = '<option value="0">[Seleccionar]</option>'
        // --
        $('#sl_modal_register_Pentesting_sucursal').html(html);
        $('#sl_modal_register_Pentesting_sucursal').attr("disabled", "disabled");
    }

}
//HackeoEtico
$("#sl_modal_register_HackeoEtico_empresa").change(function () {
    let value = $("#sl_modal_register_HackeoEtico_empresa").val()
    console.log('Select', value)
    getSucursalesHackeoEtico(value)
});

// --
function getSucursalesHackeoEtico(IdEmpresa, IdSucursal = 0) {
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
                $('#sl_modal_register_HackeoEtico_sucursal').html(html);
                $('#sl_modal_register_HackeoEtico_sucursal').attr("disabled", false);
            }
        });
    } else {
        // --
        let html = '<option value="0">[Seleccionar]</option>'
        // --
        $('#sl_modal_register_HackeoEtico_sucursal').html(html);
        $('#sl_modal_register_HackeoEtico_sucursal').attr("disabled", "disabled");
    }

}

//Se deshabilita el sucursal

$('#sl_modal_register_Pentesting_sucursal').attr('disabled', 'disabled');
$('#sl_modal_register_OSINT_sucursal').attr('disabled', 'disabled');
$('#sl_modal_register_HackeoEtico_sucursal').attr('disabled', 'disabled');
