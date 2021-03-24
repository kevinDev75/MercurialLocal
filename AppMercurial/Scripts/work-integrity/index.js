// --
const functions = new Functions()

// --
var listPersonalInformation = new Array()
var tableList
var fileImportacion
var Privilegios;
var DataSearch;

// -- 
var tbl_voucher_list
var tbl_habeas_list
var indexListVoucher = 1
var indexListHabeas = 1
var listVoucher = new Array()
var listHabeas = new Array()
var listFilesVoucher = new Array()
var listFilesHabeas = new Array()

// -- 
var tbl_voucher_list_importacion
var tbl_habeas_list_importacion
var indexListVoucherImportacion = 1
var indexListHabeasImportacion = 1
var listVoucherImportacion = new Array()
var listFilesVoucherImportacion = new Array()

var listHabeasImportacion = new Array()
var listFilesHabeasImportacion = new Array()

// --
const byte = 1048576 // -- 1 MB	-> 1048576 B
const maxSize = 20 // -- 20 Megabytes

// -- 
function validateFileSize(file) {
    // --
    if ((file.size / byte) <= maxSize) {
        return true
    } else {
        return false
    }
}



//Function para cambiar los titulos a los iconos de descargar y subir
function changeTitles() {

    $(document).ready(function () {
        descargaTitle = $(this).find('.descargaTitle').text();
        subirTitle = $(this).find('.subirTitle').text();


        $('#btn_Download').attr("title", descargaTitle);
        $('#btn_Download').attr("data-original-title", descargaTitle);
        $('#btn_upload').attr("title", subirTitle);
        $('#btn_upload').attr("data-original-title", subirTitle);
        
    });


}


// --
function readCookie(name) {
    // --
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;

}


// -- Datepicker
$('#txt_fecha_inicio').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy' 
})

//$("#txt_fecha_nacimiento").datepicker({
//    format: "dd/mm/yyyy",
//    startDate: "01-01-2015",
//    endDate: "01-01-2020",
//    todayBtn: "linked",
//    autoclose: true,
//    todayHighlight: true,
//    container: '#modal_register modal-body'
//})

$("#input_file_importacion").change(function (e) {
    var file = e.target.files[0].name;
    $("#input_file_importacion").html(file);
    uploadFile();
});
// --
$('#txt_fecha_fin').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy' 
})
var cokkiidioma = readCookie("Ididioma");
if (cokkiidioma == 1) {
    // -- Table
    var table_work_integrity = $('#tbl_data').DataTable({
        responsive: true,
        language: {
            "url": "../Files/lenguaje-spanish.json"
        },
        columnDefs: [
            { "width": "20%", "targets": 2 }
        ],
        order: [[2, "asc"]]
    });

} if (cokkiidioma == 2) {
    // -- Table
    var table_work_integrity = $('#tbl_data').DataTable({
        responsive: true,
        language: {
            "url": "../Files/lenguaje-portugues.json"
        },
        columnDefs: [
            { "width": "20%", "targets": 2 }
        ],
        order: [[2, "asc"]]
    });
} 




// --
$("#check_all").change(function () {
    $('[name="check_status[]"]').prop('checked', $(this).prop("checked"));
});

// -- Modal
$('#modal_register').on('shown.bs.modal', function (e) {
    // -- Datatable

    // -- SON COSAS QUE PASAN EN EL BARRIO FINO (OCULTAR TITULO PORQUE SE HACE LA DIFICIL :V )
    $("#wizard2-h-0").html("")

    // --
    listVoucher = new Array();
    listHabeas = new Array();
    listFilesVoucher = new Array();
    listFilesHabeas = new Array();


    clearFormularyRegister()
    $("#tbl_list").DataTable().clear()
    if (cokkiidioma == 1) {
        $("#tbl_list").DataTable().destroy();
        tableList = $("#tbl_list").DataTable({
            responsive: true,
            language: {
                "url": "../Files/lenguaje-spanish.json"
            },
            colReorder: true,
            searching: false,
            serverSide: false,
            stateSave: true,
            lengthChange: false,
            bSort: false,
            info: false,
        })
            .columns.adjust()
            .responsive.recalc();

    }
    if (cokkiidioma == 2) {
        $("#tbl_list").DataTable().destroy();
        tableList = $("#tbl_list").DataTable({
            responsive: true,
            language: {
                "url": "../Files/lenguaje-portugues.json"
            },
            colReorder: true,
            searching: false,
            serverSide: false,
            stateSave: true,
            lengthChange: false,
            bSort: false,
            info: false,
        })
            .columns.adjust()
            .responsive.recalc();
    }
    

    // --
    $("#tbl_voucher_list").DataTable().clear()
    $("#tbl_voucher_list").DataTable().destroy();
    tbl_voucher_list = $('#tbl_voucher_list').DataTable({
        responsive: true,
        language: {
            "url": "../Files/lenguaje-spanish.json"
        },
        colReorder: true,
        searching: false,
        serverSide: false,
        stateSave: true,
        lengthChange: false,
        bSort: false,
        info: false,
    })
        .columns.adjust()
        .responsive.recalc();
    // --

    $("#tbl_habeas_list").DataTable().clear()
    $("#tbl_habeas_list").DataTable().destroy();
    tbl_habeas_list = $('#tbl_habeas_list').DataTable({
        responsive: true,
        language: {
            "url": "../Files/lenguaje-spanish.json"
        },
        colReorder: true,
        searching: false,
        serverSide: false,
        stateSave: true,
        lengthChange: false,
        bSort: false,
        info: false,
    })
        .columns.adjust()
        .responsive.recalc();


    $("#tbl_habeas_list_importacion").DataTable().clear()
    $("#tbl_habeas_list_importacion").DataTable().destroy();
    tbl_habeas_list_importacion = $('#tbl_habeas_list_importacion').DataTable({
        responsive: true,
        language: {
            "url": "../Files/lenguaje-spanish.json"
        },
        colReorder: true,
        searching: false,
        serverSide: false,
        stateSave: true,
        lengthChange: false,
        bSort: false,
        info: false,
    })
        .columns.adjust()
        .responsive.recalc();



    //$('#file_habeas_data').val(null)

})

// --
$('#modal_upload').on('shown.bs.modal', function (e) {
    // --
    listHabeasImportacion = new Array()
    listFilesHabeasImportacion = new Array()
    // --
    $('#btn_guardar_importacion').prop('disabled', true);
    $('#content_loader_upload').css('display', 'none')
    $('#txt_message_error').html('')
    $("#input_file_importacion").val(null);
    // --
    $("#tbl_voucher_list_importacion").DataTable().clear()
    $("#tbl_voucher_list_importacion").DataTable().destroy();
    tbl_voucher_list_importacion = $('#tbl_voucher_list_importacion').DataTable({
        responsive: true,
        language: {
            "url": "../Files/lenguaje-spanish.json"
        },
        colReorder: true,
        searching: false,
        serverSide: false,
        stateSave: true,
        lengthChange: false,
        bSort: false,
        info: false,
    })
        .columns.adjust()
        .responsive.recalc();
    // --
    $('#file_habeas_data_importacion').val(null)
})

$('#modal_Transaction').on('shown.bs.modal', function (e) {
    // --
});




// -- Steps
$('#wizard2').steps({
    headerTag: 'h3',
    bodyTag: 'section',
    autoFocus: true,
    titleTemplate: '<span class="number">#index#</span> <span class="title">#title#</span>'
});

// --
$('#btn_Download').on('click', function () {
    // --
    var currentLocation = window.location.origin;

    // Leemos la cookie
    var miCookie = readCookie("IdPais");
    var url = null
    // --
    if (miCookie == 1) {
        // -- Perú
        url = currentLocation + "/Files/FormatoAteneaPeru.xls"
    } else if (miCookie == 2) {
        // -- Brasil
        url = currentLocation + "/Files/FormatoAteneaBrasil.xls"
    } else if (miCookie == 3) {
        // -- Colombia
        url = currentLocation + "/Files/FormatoAteneaColombia.xls"
    }
    // -
    if (url != null) {
        downloadURI(url, "Format_Upload");
    }
    
});


// --
$('#lbl_idioma_espanol').on('click', function () {
    // --
    let datos = {
        "NombreVista": "ControlsWorkIntegrity"
    }
    // --
    $.ajax({
        url: '/WorkIntegrity/GetTextControlls',
        type: 'POST',
        data: datos,
        dataType: 'json',
        cache: false,
        success: function (data) {
            // --
            //if (data.Status === 'OK') {

            //} else {
            //    functions.notify_message('Ups! Crendenciales incorrectas :(', 'warning')
            //}
        }
    })
})



// --
$("#btn_voucher_agregar").on('click', function () {
    // --
    let file_voucher = $('#file_voucher').prop("files")[0];

    var valFacturanombre=validarFacturar_nombre()
    var valComentario = validarComentario()
    console.log("resultado de validado :" + valFacturanombre + valComentario)
    // --
    if (file_voucher !== undefined) {
        // --
        if (validateFileSize(file_voucher)) {
            // --
            ext_file_voucher = getFileExtension(file_voucher.name)
            ext_file_voucher = ext_file_voucher.toLowerCase()
            // --
            if (ext_file_voucher == "img" || ext_file_voucher == "png" || ext_file_voucher == "jpg" || ext_file_voucher == "jpeg") {

                $('#ul_error_file_voucher').hide();
                  //valFacturanombre > 0 &&
                    //valComentario > 0
                
                    //Limpiar campos
                    $("#txt_comentario").val("")
                    $("#sl_facturar_nombre").val($("#sl_facturar_nombre option:first").val());

                    // -- NO USAR ESTA VAINA LOCA XD
                    //indexListVoucher = tbl_voucher_list.rows().count() + 1
                    // --
                    let object = {
                        "IdIntegridad": 0,
                        "ItemIntegridadVoucher": 0,
                        "NombreArchivo": "Voucher_" + indexListVoucher + "." + ext_file_voucher,
                        "RutaArchivo": null,
                        "ExtensionArchivo": ext_file_voucher,
                        "FecRegistro": null,
                        "IdUsuarioRegistro": 0
                    }
                    // -- Agregar objeto al listado
                    listVoucher.push(object)
                    // --
                    file_voucher.id = indexListVoucher
                    console.log('FileVoucher', file_voucher)
                    listFilesVoucher.push(file_voucher)
                    // -- Agregar datos a la tabla
                    tbl_voucher_list.row.add([
                        indexListVoucher,
                        'Voucher_' + indexListVoucher,
                        ' <button class= "btn btn-sm btn-danger" data-id="' + indexListVoucher + '" id="btn_voucher_delete_row"> <i class="fa fa-trash"></i></button >'
                    ]).draw(false);
                    // --
                    tbl_voucher_list.columns.adjust()
                        .responsive.recalc();
                    // --
                    indexListVoucher++
                    // --
                    $('#file_voucher').val(null)
                
                
            } else {
                functions.notify_message('Solo se admiten archivos de imagen', 'warning')
            }
        } else {
            functions.notify_message('Solo se admiten 25 MB', 'warning')
        }
    } else {

        $('#ul_error_file_voucher').show();

    }

})
function validarFacturar_nombre() {
    let sl_facturar_nombre = $("#sl_facturar_nombre").val()

    if (sl_facturar_nombre == "") {
        $('#ul_error_facturar_nombre').show();
        return 0;
    } else {
        $('#ul_error_facturar_nombre').hide();
        return 1;


    }

}
function validarComentario() {
    let txt_comentario = $("#txt_comentario").val()
    if (txt_comentario == "") {
        $('#ul_error_comentario').show();
        return 0;

    } else {
        $('#ul_error_comentario').hide();
        return 1;

    }
}
// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_voucher_delete_row', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tbl_voucher_list.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tbl_voucher_list.row(index).remove().draw(false);
    // --
    let indexObject = listVoucher.findIndex(x => x.index == value)
    listVoucher.splice(indexObject, 1)
    // --
    $.each(listFilesVoucher, function (key, item) {
        if (item != undefined) {
            if (item.id == value) {
                listFilesVoucher.splice(key, 1)
            }
        }
    });

})


// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_habeas_delete_row', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tbl_habeas_list.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tbl_habeas_list.row(index).remove().draw(false);
    // --
    let indexObject = listHabeas.findIndex(x => x.index == value)
    listHabeas.splice(indexObject, 1)
    // --
    $.each(listFilesHabeas, function (key, item) {
        if (item != undefined) {
            if (item.id == value) {
                listFilesHabeas.splice(key, 1)
            }
        }
    });
   
})

$(document).on('click', '#btn_habeas_importacion_delete_row', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tbl_habeas_list_importacion.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tbl_habeas_list_importacion.row(index).remove().draw(false);
    // --
    let indexObject = listHabeasImportacion.findIndex(x => x.index == value)
    listHabeasImportacion.splice(indexObject, 1)
    // --
    $.each(listFilesHabeasImportacion, function (key, item) {
        if (item != undefined) {
            if (item.id == value) {
                listFilesHabeasImportacion.splice(key, 1)
            }
        }
    });

})

// --
$("#btn_voucher_agregar_importacion").on('click', function () {
    // --
    let file_voucher_importacion = $('#file_voucher_importacion').prop("files")[0];
    // --
    if (file_voucher_importacion !== undefined) {
        // --
        if (validateFileSize(file_voucher_importacion)) {
            // --
            ext_file_voucher_importacion = getFileExtension(file_voucher_importacion.name)
            ext_file_voucher_importacion = ext_file_voucher_importacion.toLowerCase()
            // --
            if (ext_file_voucher_importacion == "img" || ext_file_voucher_importacion == "png" || ext_file_voucher_importacion == "jpg" || ext_file_voucher_importacion == "jpeg") {

                $('#ul_error_file_voucher_importacion').hide();

                // -- NO USAR ESTA VAINA LOCA XD
                //indexListVoucherImportacion = tbl_voucher_list_importacion.rows().count() + 1
                // --
                let object = {
                    "IdIntegridad": 0,
                    "ItemIntegridadVoucher": 0,
                    "NombreArchivo": "Voucher_" + indexListVoucherImportacion + "." + ext_file_voucher_importacion,
                    "RutaArchivo": null,
                    "ExtensionArchivo": ext_file_voucher_importacion,
                    "FecRegistro": null,
                    "IdUsuarioRegistro": 0
                }
                // -- Agregar objeto al listado
                listVoucherImportacion.push(object)
                // --
                file_voucher_importacion.id = indexListVoucherImportacion
                console.log('FileVoucherImporacion', file_voucher_importacion)
                listFilesVoucherImportacion.push(file_voucher_importacion)
                // -- Agregar datos a la tabla
                tbl_voucher_list_importacion.row.add([
                    indexListVoucherImportacion,
                    'Voucher_' + indexListVoucherImportacion,
                    ' <button class= "btn btn-sm btn-danger" data-id="' + indexListVoucherImportacion + '" id="btn_voucher_importacion_delete_row"> <i class="fa fa-trash"></i></button >'
                ]).draw(false);
                // --
                tbl_voucher_list_importacion.columns.adjust()
                    .responsive.recalc();
                // --
                indexListVoucherImportacion++
                // --
                $('#file_voucher_importacion').val(null)
            } else {
                functions.notify_message('Solo se admiten archivos de imagen', 'warning')
            }
        } else {
            functions.notify_message('Solo se admiten 25 MB', 'warning')
        }
    } else {
        $('#ul_error_file_voucher_importacion').show();

    }

})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_voucher_importacion_delete_row', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tbl_voucher_list_importacion.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tbl_voucher_list_importacion.row(index).remove().draw(false);
    // --
    let indexObject = listVoucherImportacion.findIndex(x => x.index == value)
    listVoucherImportacion.splice(indexObject, 1)
    // --
    $.each(listFilesVoucherImportacion, function (key, item) {
        if (item != undefined) {
            if (item.id == value) {
                listFilesVoucherImportacion.splice(key, 1)
            }
        }
    });

})



// --
$("#btn_habeas_agregar").on('click', function () {
    // --
    let file_habeas = $('#file_habeas_data').prop("files")[0];
    // --
    if (file_habeas !== undefined) {
        // --
        if (validateFileSize(file_habeas)) {
            // --
            ext_file_habeas = getFileExtension(file_habeas.name)
            ext_file_habeas = ext_file_habeas.toLowerCase()
            // --
            if (ext_file_habeas == "pdf" || ext_file_habeas == "PDF") {
                $('#ul_error_file_habeas_data').hide();


                // -- NO USAR ESTA VAINA LOCA XD
                //indexListVoucher = tbl_voucher_list.rows().count() + 1
                // --
                let object = {
                    "IdIntegridad": 0,
                    "ItemIntegridadVoucher": 0,
                    "NombreArchivo": "HabeasData_" + indexListHabeas + "." + ext_file_habeas,
                    "RutaArchivo": null,
                    "ExtensionArchivo": ext_file_habeas,
                    "FecRegistro": null,
                    "IdUsuarioRegistro": 0
                }
                // -- Agregar objeto al listado
                listHabeas.push(object)
                // --
                file_habeas.id = indexListHabeas
                console.log('FileHabeas', file_habeas)
                listFilesHabeas.push(file_habeas)
                // -- Agregar datos a la tabla
                tbl_habeas_list.row.add([
                    indexListHabeas,
                    'Habeas_' + indexListHabeas,
                    ' <button class= "btn btn-sm btn-danger" data-id="' + indexListHabeas + '" id="btn_habeas_delete_row"> <i class="fa fa-trash"></i></button >'
                ]).draw(false);
                // --
                tbl_habeas_list.columns.adjust()
                    .responsive.recalc();
                // --
                indexListHabeas++
                // --
                $('#file_habeas_data').val(null)
            } else {
                functions.notify_message('Solo se admiten archivos Pdf', 'warning')
            }
        } else {
            functions.notify_message('Solo se admiten 25 MB', 'warning')
        }
    } else {
        $('#ul_error_file_habeas_data').show();

    }

})


$("#btn_habeas_agregar_importacion").on('click', function () {
    // --
    let file_habeas_importacion = $('#file_habeas_data_importacion').prop("files")[0];
    // --
    if (file_habeas_importacion !== undefined) {
        // --
        if (validateFileSize(file_habeas_importacion)) {
            // --
            ext_file_habeas_importacion = getFileExtension(file_habeas_importacion.name)
            ext_file_habeas_importacion = ext_file_habeas_importacion.toLowerCase()
            // --
            if (ext_file_habeas_importacion == "pdf" || ext_file_habeas_importacion == "PDF") {
                $('#ul_error_file_habeas_data_importacion').hide();
                // -- NO USAR ESTA VAINA LOCA XD
                //indexListVoucher = tbl_voucher_list.rows().count() + 1
                // --
                let object = {
                    "IdIntegridad": 0,
                    "ItemIntegridadVoucher": 0,
                    "NombreArchivo": "HabeasData_" + indexListHabeasImportacion + "." + ext_file_habeas_importacion,
                    "RutaArchivo": null,
                    "ExtensionArchivo": ext_file_habeas_importacion,
                    "FecRegistro": null,
                    "IdUsuarioRegistro": 0
                }
                // -- Agregar objeto al listado
                listHabeasImportacion.push(object)
                // --
                file_habeas_importacion.id = indexListHabeasImportacion
                console.log('FileHabeas', file_habeas_importacion)
                listFilesHabeasImportacion.push(file_habeas_importacion)
                // -- Agregar datos a la tabla
                tbl_habeas_list_importacion.row.add([
                    indexListHabeasImportacion,
                    'Habeas_' + indexListHabeasImportacion,
                    ' <button class= "btn btn-sm btn-danger" data-id="' + indexListHabeasImportacion + '" id="btn_habeas_importacion_delete_row"> <i class="fa fa-trash"></i></button >'
                ]).draw(false);
                // --
                tbl_habeas_list_importacion.columns.adjust()
                    .responsive.recalc();
                // --
                indexListHabeasImportacion++
                // --
                $('#file_habeas_data_importacion').val(null)
            } else {
                functions.notify_message('Solo se admiten archivos de PDF', 'warning')
            }
        } else {
            functions.notify_message('Solo se admiten 25 MB', 'warning')
        }
    } else {

        $('#ul_error_file_habeas_data_importacion').show();
    }

})


// --
$('#btn_guardar_registro').on('click', function () {
    // --
    let radioFormaPago = $('input:radio[name=rdioFormaPago]:checked').val()
    let comentario = $("#txt_comentario").val()
    let slFacturarNombre = $("#sl_facturar_nombre").val()

    // -- 
    if (
        listPersonalInformation.length > 0 &&
        radioFormaPago.length > 0 &&
        slFacturarNombre.length > 0
    )
    {
        // --
        if (comentario.length < 1) {
            comentario = "-"
        }
        // --
        let object = new Object()
        // --
        object["IdSucursal"] = slFacturarNombre
        object["IdStatus"] = 3
        object["IdFormaPago"] = radioFormaPago
        object["Progreso"] = 0
        object["Comentario"] = comentario
        object["ListInsertWorkIntegrityDetailRequest"] = listPersonalInformation
        // --
        console.log(object)
        saveRegister(object, false)

    } else {
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    }
})
       
// --
$('#btn_guardar_registro_brasil').on('click', function () {
    // --
    let radioFormaPago = $('input:radio[name=rdioFormaPago]:checked').val()
    let comentario = $("#txt_comentario").val()
    let slFacturarNombre = $("#sl_facturar_nombre").val()
    console.log("Tamaño de lista");
    console.log(listPersonalInformation);
    // -- 
    if (
        listPersonalInformation.length > 0 
       
    )
    {
        console.log("llega guardar brasil");
        console.log(slFacturarNombre);
        // --
        let object = new Object()
        // --
        object["IdSucursal"] = 0
        object["IdStatus"] = 3
        object["IdFormaPago"] = 7
        object["Progreso"] = 0
        object["Comentario"] = "a "
        object["ListInsertWorkIntegrityDetailRequest"] = listPersonalInformation
        // --
        console.log(object)
        saveRegister(object, false)

    } else {
        functions.notify_message("Pelo menos 1 informa\u00e7\u00e3o pessoal deve ser adicionada", 'warning')
    }
})
// --
$("#btn_guardar_importacion").on('click', function () {
    // --
    

    var miCookie = readCookie("IdPais");
    console.log("cookie pais" + miCookie)
    if (miCookie == 1) {
        let radioFormaPago = $('input:radio[name=rdioFormaPagoImportacion]:checked').val()
        let comentario = $("#txt_comentario_importacion").val()
        let slFacturarNombre = $("#sl_facturar_nombre_importacion").val()
// --
        let object = new Object()
    // --
        object["IdSucursal"] = 0
        object["IdStatus"] = 3
        object["IdFormaPago"] = 7
        object["Progreso"] = 0
        object["Comentario"] = comentario
        object["ListInsertWorkIntegrityDetailRequest"] = fileImportacion

        saveRegister(object, true)
    } else {
    let radioFormaPago = $('input:radio[name=rdioFormaPagoImportacion]:checked').val()
    let comentario = $("#txt_comentario_importacion").val()
    let slFacturarNombre = $("#sl_facturar_nombre_importacion").val()
    // --
    let object = new Object()
    // --
    object["IdSucursal"] = slFacturarNombre
    object["IdStatus"] = 3
        object["IdFormaPago"] = 2
    object["Progreso"] = 0
        object["Comentario"] = "a"
    object["ListInsertWorkIntegrityDetailRequest"] = fileImportacion

    saveRegister(object, true)
    }


})

// --
function Buscar() {
    // --
    let codigo = $("#txt_codigo").val()
    let fechaInicio = $("#txt_fecha_inicio").val()
    let fechaFin = $("#txt_fecha_fin").val()
    let nroDocumento = $('#txt_nrodocumento').val()
    let status = $('[name="check_status[]"]:checked').map(function () {
        return this.value;
    }).get();
    // --
    status = status.join('|')
    // --
    let object = new Object()
    // --
    if (codigo.length < 1) {
        codigo = null
    }
    // --
    if (status.length < 1) {
        status = null
    }
    // --
    if (fechaFin.length < 1 || fechaInicio.length < 1 || status === null) {
        // --
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    } else {
        // --
        object["CodigoIntegridad"] = codigo
        object["FechaInicio"] = fechaInicio
        object["FechaFin"] = fechaFin
        object["IdStatus"] = status
        object["NroDocumento"] = nroDocumento
        // --
        consultRequestIntegrity(object)
    }
}

$("#btn_buscar").on('click', function () {
    Buscar();
})

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

    var InfoSoli = DataSearch.find(x => x.IdIntegridad == idIntegrity);

    var datos = {
        "idIntegrity": idIntegrity,
        "porcentaje": porcentaje,
        "statusCheck": statusCheck,
        "idStatus": idStatus,
        "DesEmpresa": InfoSoli.DescripcionEmpresa,
        "DesStatus": $("#cboEstados option:selected").text(),
        "CodigoIntegridad": InfoSoli.CodigoIntegridad,
        "desServicios": InfoSoli.Servicios,
        "idUsuario": InfoSoli.IdUsuario,
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
                        Buscar();
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

// --
$("#btn_add_list").on('click', function () {
    // -
    addTableList()
})

// --
$(document).on('click', '.btn_delete_test', function () {
    // --
    let value = $(this).attr('data-id')
    var index;
    tableList.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    tableList.row(index).remove().draw(false);
    // --
    var indexObject = listPersonalInformation.findIndex(x => x.index == value);
    listPersonalInformation.splice(indexObject, 1);
    // --
})


function GetPrivilegios() {

    $.ajax({
        url: urlGetPrivilegios,
        type: 'GET',
        success: function (data) {
            Privilegios = data;
            console.log(Privilegios);

        },
        beforeSend: function (xhr) {
            console.log(xhr);
        }
    });

}


        //function GetSession() {
        //    $.ajax({
        //        url: urlGetSessionValue,
        //        type: 'GET',
        //        success: function (data) {
        //            SessionData = data;
        //            GetPrivilegios();
        //        },
        //        beforeSend: function (xhr) {
        //            $('#content_loader').css('display', 'block');
        //        }
        //    })
        //}

GetPrivilegios();

// --
function saveRegister(object, modal) {
    // --
    let formData = new FormData();
    let file = $('#input_file_importacion').prop("files")[0];
    // --

    //let ext_file_habeas_data = ""
    //let nameHabeasData = null
    // --
    if (modal) {
        // -- FILES IMPORTACION
        object["ListVoucher"] = listVoucherImportacion
        // --
        if (listFilesVoucherImportacion != undefined && listFilesVoucherImportacion.length > 0) {
            // --
            listFilesVoucherImportacion.forEach((element) => {
                // --
                if (element !== undefined) {
                    // --
                    var ext = getFileExtension(element.name)
                    // --
                    formData.append("dataFile", element, "Voucher_" + element.id + "." + ext);
                }
            })
        }
        // --
        // -- FILES IMPORTACION
        object["ListHabeasData"] = listHabeasImportacion
        // --
        if (listFilesHabeasImportacion != undefined && listFilesHabeasImportacion.length > 0) {
            // --
            listFilesHabeasImportacion.forEach((element) => {
                // --
                if (element !== undefined) {
                    // --
                    var ext = getFileExtension(element.name)
                    // --
                    formData.append("dataFile", element, "HabeasData_" + element.id + "." + ext);
                }
            })
        }

    } else {
        // -- FILES
        object["ListVoucher"] = listVoucher
        // --
        if (listFilesVoucher != undefined && listFilesVoucher.length > 0) {
            // --
            listFilesVoucher.forEach((element) => {
                // --
                if (element !== undefined) {
                    // --
                    var ext = getFileExtension(element.name)
                    // --
                    formData.append("dataFile", element, "Voucher_" + element.id + "." + ext);
                }
            })
        }
        // --
        object["ListHabeasData"] = listHabeas
        // --
        if (listFilesHabeas != undefined && listFilesHabeas.length > 0) {
            // --
            listFilesHabeas.forEach((element) => {
                // --
                if (element !== undefined) {
                    // --
                    var ext = getFileExtension(element.name)
                    // --
                    formData.append("dataFile", element, "HabeasData_" + element.id + "." + ext);
                }
            })
        }

    }
    // --
    formData.append("dataFile", file);

    formData.append(
        "JsonMaster",
        JSON.stringify(object)
    );

    console.log(object)

    $.ajax({
        url: urlSaveWorkIntegrity,
        type: 'POST',
        data: formData,
        dataType: 'json',
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            // --
            let obj = data.Data
            if (obj.Status == 'OK') {
                console.log("salio bien el guardado");
                //Reiniciar step,se pone antes para evitar el corte de la animación de success

                $("#wizard2-t-0").trigger('click');
                //Se reinician los select a su estado inicial "Seleccionar"
                $("#sl_facturar_nombre").val($("#sl_facturar_nombre option:first").val());
                // --
                $("#modal_register").modal('hide')
                $("#modal_upload").modal('hide')
                $('#content_loader').css('display', 'none');
                getListWorkIntegrity()
                functions.notify_message(MESSAGE.es.success_insert, 'success')
                //Limpiar Lista 
                listPersonalInformation = new Array()
                
            } else {
                $('#content_loader').css('display', 'none');
                functions.notify_message(MESSAGE.es.error_insert, 'warning')
            }
        },
        beforeSend: function (xhr) {
            $('#content_loader').css('display', 'block');
        }
    })
}

// --
function getListWorkIntegrity() {
    // --
    let object = new Object()
    object["CodigoIntegridad"] = null
    object["FechaInicio"] = $('#txt_fecha_inicio').val()
    object["FechaFin"] = FECHA_HOY
    // --
    let status = $('[name="check_status[]"]:checked').map(function () {
        return this.value;
    }).get();
    status = status.join('|')
    object["IdStatus"] = status
    object["NroDocumento"] = null
    // --
    consultRequestIntegrity(object)
}

// --
function getListTypeDocument() {
    // --
    $.ajax({
        url: urlGetDocumentType,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // --
            let html = ''
            //html += '<option>[Selecionar]</option>'
            // --
            let obj = data.Data
            // --
            if (obj.length > 0) { // -- Verificar si tiene datos
                // --
                $.each(obj, function (key, value) {
                    // --
                    html += '<option value="' + value.IdTipoDocIdentidad + '"> ' + value.DesTipoDocIdentidad + '</option>'
                });
            }
            // --
            $('#sl_tipo_documento').html(html);
        }
    })
}

// --
function downloadURI(uri, name) {
    // --
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
}


// --
function getWorkIntegrity() {
    // --
    $.ajax({
        url: urlGetWorkIntegrity,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // --
            let html = ''
            html += '<option label="[Selecionar]"></option>'
            // --
            let obj = data.Data
            // --
            if (obj.length > 0) { // -- Verificar si tiene datos
                // --
                $.each(obj, function (key, value) {
                    // --
                    html += '<option value="' + value.IdServicio + '"> ' + value.DescripcionServicio + '</option>'
                });
            }
            // --
            $('#sl_servicio').html(html);
        }
    })
}

// --
function getBranchOffices() {
    // --
    $.ajax({
        url: urlGetBranchOffices,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // --
            let html = ''
            var miCookie = readCookie("IdPais");
            if (miCookie == 2) {

            } else {
            html += '<option label="[Selecionar]"></option>'

            }
            // --
            let obj = data.Data
            // --
            if (obj.length > 0) { // -- Verificar si tiene datos
                // --
                
                $.each(obj, function (key, value) {
                    // --
                    html += '<option value="' + value.IdSucursal + '"> ' + value.DescripcionSucursal + '</option>'
                });
            }

            // --
            $('#sl_facturar_nombre').html(html);
            $('#sl_facturar_nombre_importacion').html(html);
        }
    })
}

// --
function getPayMethod() {
    // --
    $.ajax({
        url: urlGetPayMethod,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // --
            let html = ''
            let html2 = ''
            // --
            let obj = data.Data
            let statusCheck = true
            let check = 'checked=""'
            // --
            
            if (obj.length > 0) { // -- Verificar si tiene datos
                // --
                console.log("llega bien a pay method");
                console.log(obj);

                $.each(obj, function (key, value) {
                    // --
                    if (statusCheck == false) {
                        check = ""
                    }
                    // --
                    html += '<div class="col-lg-3">'
                    html += '    <label class="rdiobox">'
                    html += '        <input name="rdioFormaPago" type="radio"  value="' + value.IdFormaPago + '" ' + check+'>'
                    html += '        <span>' + value.Descripcion +'</span>'
                    html += '    </label>'
                    html += '</div>'


                    html2 += '<div class="col-lg-3">'
                    html2 += '    <label class="rdiobox">'
                    html2 += '        <input name="rdioFormaPagoImportacion" type="radio"  value="' + value.IdFormaPago + '" ' + check + '>'
                    html2 += '        <span>' + value.Descripcion + '</span>'
                    html2 += '    </label>'
                    html2 += '</div>'

                    // --
                    statusCheck = false
                });
            }
            // --
            console.log("llenaLos campos");
            $('#div_register_sl_forma_pagos').html(html);
            $('#div_importacion_sl_forma_pago').html(html2);
        }
    })
}


// --
var i = 1
// --
//Funcion para validad el numero de documento




//Validar Documento
function terminarValidarDocumento(valorDocumento) {

    var tipoDocumento = $("#sl_tipo_documento :selected").text()
    let slTipoDocumento = $("#sl_tipo_documento").val()

    

    if (valorDocumento == "") {
        $('#ul_error_nro_documento').show();

        return 0;

        //Si esta vacio por defecto aparece el alert de falta llenar los campos

    } else {
        $('#ul_error_nro_documento').hide();

        //Ver si selecciono algo
        if (slTipoDocumento > 0) {

            //Aquí se validaria obteniendo los valores del select 
            if (valorDocumento.length != 8 && tipoDocumento == " DNI") {
                var resValidarIdioma = validarIdioma(tipoDocumento," 8 ");
                return resValidarIdioma;
            }
            if (valorDocumento.length != 11 && tipoDocumento == " CPF") {
                var resValidarIdioma = validarIdioma(tipoDocumento, " 11 ");
                return resValidarIdioma;
            }
            if (valorDocumento.length != 14 && tipoDocumento == " CPNJ") {
                var resValidarIdioma = validarIdioma(tipoDocumento, " 14 ");
                return resValidarIdioma;
            }
            if (valorDocumento.length != 9 && tipoDocumento == " RG") {
                var resValidarIdioma = validarIdioma(tipoDocumento, " 9 ");
                return resValidarIdioma;
            }
            if (valorDocumento.length <8 && tipoDocumento == " CEDULA") {
                //Rango minimo
                var resValidarIdioma = validarIdioma(tipoDocumento, " de 8 a 10 ");
                return resValidarIdioma;
            }
            if (valorDocumento.length > 10 && tipoDocumento == " CEDULA") {
                //Rango Maximo
                var resValidarIdioma = validarIdioma(tipoDocumento, " de 8 a 10 ");
                return resValidarIdioma;
            }
        } else {

            return 0;
        }
       
    }

    return 1;
}



function validarIdioma(tipoDocumento, digitos) {

    var nroDocumento = document.getElementById("txt_nro_documento");

    var miCookie = readCookie("Ididioma");
    console.log(miCookie);
    if (miCookie == 1) {
        nroDocumento.setCustomValidity(tipoDocumento + " debe tener" + digitos + "d\u00edgitos");
        nroDocumento.reportValidity();
        return 0;
    } else {
        nroDocumento.setCustomValidity(tipoDocumento + " deve ter" + digitos + "d\u00edgitos");
        nroDocumento.reportValidity();
        return 0;
    }
}
//Nombres Completos
function terminarValidarNombres() {
    let Valornombres_completos = $("#txt_nombres_completos").val()
    if (Valornombres_completos == "") {
        var txt_nombres_completos = document.getElementById("txt_nombres_completos");
        var miCookie = readCookie("Ididioma");
        console.log(miCookie);
        if (miCookie == 1) {
            console.log("debe hacerce visible");
            $('#ul_error_nombres').show();


            return 0;
        } else {
            $('#ul_error_nombres').show();

            return 0;
        }
        return 0;
        //Si esta vacio por defecto aparece el alert de falta llenar los campos
    } else {
        $('#ul_error_nombres').hide();
        console.log("Deberia pasar")
        return 1;
    }
}
//if(contenido.indexOf("@")==-1){alert('el email introducido no es válido')}
//Valida Email
function terminarValidarEmail() {
    let emailText = $("#txt_email").val()
    var txt_email = document.getElementById("txt_email");

    
    if (emailText == "") {
        var miCookie = readCookie("Ididioma");
        console.log(miCookie);
        if (miCookie == 1) {
            
            $('#ul_error_email').show();

            return 0;
        } else {
            $('#ul_error_email').show();

            return 0;
        }
        return 0;
    } else {
        if (emailText.indexOf("@") == -1) {
            $('#ul_error_email').show();

        } else {
            console.log("Deberia pasar")
            $('#ul_error_email').hide();

            return 1;
        }
    }
}
 

//Lugar de nacimiento
function terminarValidarLugarNacimiento() {
    let lugar_nacimiento = $("#txt_lugar_nacimiento").val()
    if (lugar_nacimiento == "") {
        var txt_lugar_nacimiento = document.getElementById("txt_lugar_nacimiento");
        var miCookie = readCookie("Ididioma");
        console.log(miCookie);
        if (miCookie == 1) {
            $('#ul_error_lugar_nacimiento').show();

            return 0;
        } else {
            $('#ul_error_lugar_nacimiento').show();

            return 0;
        }
        return 0;
        //Si esta vacio por defecto aparece el alert de falta llenar los campos
    } else {
        console.log("Deberia pasar")
        $('#ul_error_lugar_nacimiento').hide();

        return 1;
    }
}
//Validar celular
function terminarValidarCelular() {
    let Valorcelular = $("#txt_celular").val()
    if (Valorcelular == "") {
        var txt_celular = document.getElementById("txt_celular");
        var miCookie = readCookie("Ididioma");
        console.log(miCookie);
        if (miCookie == 1) {
            $('#ul_error_celular').show();

            return 0;
        } else {
            $('#ul_error_celular').show();

            return 0;
        }
        return 0;
        //Si esta vacio por defecto aparece el alert de falta llenar los campos
    } else {
        console.log("Deberia pasar")
        $('#ul_error_celular').hide();

        return 1;
    }
}
//Validar Departamento
function terminarValidarDepartamento() {
    let valorCiudad = $("#txt_ciudad").val()
    if (valorCiudad == "") {
        var txt_ciudad = document.getElementById("txt_ciudad");
        var miCookie = readCookie("Ididioma");
        console.log(miCookie);
        if (miCookie == 1) {
            $('#ul_error_departamento').show();

            return 0;
        } else {
            $('#ul_error_departamento').show();

            return 0;
        }
        return 0;
        //Si esta vacio por defecto aparece el alert de falta llenar los campos
    } else {
        console.log("Deberia pasar")
        $('#ul_error_departamento').hide();

        return 1;
    }
}
//Validar Ciudad
function terminarValidarCiudad() {
    let valorBarrio = $("#txt_barrio").val()
    if (valorBarrio == "") {
        var txt_barrio = document.getElementById("txt_barrio");
        var miCookie = readCookie("Ididioma");
        console.log(miCookie);
        if (miCookie == 1) {


            $('#ul_error_ciudad').show();

            return 0;
        } else {
            $('#ul_error_ciudad').show();

            return 0;
        }
        return 0;
        //Si esta vacio por defecto aparece el alert de falta llenar los campos
    } else {
        console.log("Deberia pasar")
        $('#ul_error_ciudad').hide();

        return 1;
    }
}
//Direccion
function terminarValidarDireccion() {
    let valorDireccion = $("#txt_direccion").val()
    if (valorDireccion == "") {
        var txt_direccion = document.getElementById("txt_direccion");
        var miCookie = readCookie("Ididioma");
        console.log(miCookie);
        if (miCookie == 1) {
            $('#ul_error_direccion').show();

            return 0;
        } else {
            $('#ul_error_direccion').show();

            return 0;
        }
        return 0;
        //Si esta vacio por defecto aparece el alert de falta llenar los campos
    } else {
        console.log("Deberia pasar")
        $('#ul_error_direccion').hide();

        return 1;
    }
}

function addTableList() {
    // --
    let slTipoDocumento = $("#sl_tipo_documento").val()
    let slServicio = $("#sl_servicio").val()
    // -- Validar 

    let valuenroDocumento = $("#txt_nro_documento").val()
    validarParamNroDocumento = terminarValidarDocumento(valuenroDocumento);

    var validarNombresCompleto = terminarValidarNombres();
    var validarLugarNacimiento = terminarValidarLugarNacimiento();
    var validarCelular = terminarValidarCelular();
    var validarDepartamento = terminarValidarDepartamento();
    var validarCiudad = terminarValidarCiudad();
    var validarDireccion = terminarValidarDireccion();
    var validarEmail = terminarValidarEmail();

   /* var validarOrdenarAlert=ordenarAlert(validarNombresCompleto, validarLugarNacimiento, validarParamNroDocumento
        , validarCelular, validarDepartamento, validarCiudad, validarDireccion, validarEmail)
    */
    var tipDoc = $("#sl_tipo_documento :selected").text()
    console.log("Esto trae tipoDocumento:" + slTipoDocumento);
    if (slTipoDocumento =="[Selecionar]" ) {
        $('#ul_error_tipoDocumento').show();

    } else {
        $('#ul_error_tipoDocumento').hide();
    }
    if (slServicio.length > 0) {
        $('#ul_error_servicio').hide();

    } else {
        $('#ul_error_servicio').show();

    }
    //Evitar que valida cuando este en brasil
    var idPais = readCookie("IdPais");
    if (idPais == 2) {

    } else {
        if (validateParam("txt_fecha_nacimiento")) {
            $('#ul_error_fecha').hide();

            console.log("Verdad");
        } else {
            $('#ul_error_fecha').show();

            console.log("falso");

        }
    }

    if (idPais == 2) {
        console.log("llego aquí pais 2")

        if (
            validarNombresCompleto > 0 &&

            validarParamNroDocumento > 0 &&
            validarCelular > 0 &&
            validarDepartamento > 0 &&
            validarCiudad > 0 &&
            validarDireccion > 0 &&
            validarEmail > 0 &&

            slTipoDocumento.length > 0 &&
            slServicio.length > 0

        ) {
            // -- Obtener valores
            let idTipoDocumento = $("#sl_tipo_documento").val()
            let descripcionTipoDocumento = $("#sl_tipo_documento option:selected").text()
            // --
            let nroDocumento = $("#txt_nro_documento").val()
            let telefono = $("#txt_telefono").val()
            let celular = $("#txt_celular").val()
            let ciudad = $("#txt_ciudad").val()
            let barrio = $("#txt_barrio").val()
            let direccion = $("#txt_direccion").val()
            let email = $("#txt_email").val()
            // -- For Peru
            let txt_nombres_completos = $("#txt_nombres_completos").val()
            let txt_fecha_nacimiento = $("#txt_fecha_nacimiento").val()
            let txt_lugar_nacimiento = $("#txt_lugar_nacimiento").val()
            // --
            //Prueba kevin alexander
            let txt_dep = $("#sl_lugar_nacimiento_departamento option:selected").text()
            let txt_prov = $("#sl_lugar_nacimiento_provincia option:selected").text()
            let txt_dis = $("#sl_lugar_nacimiento_distrito option:selected").text()

            
            
            //
            let idServicio = $("#sl_servicio").val()
            let descripcionServicio = $("#sl_servicio option:selected").text()
            // -- Construir objeto
            let object = new Object()
            // --
            let objTipoDocumento = new Object()
            objTipoDocumento['id'] = idTipoDocumento
            objTipoDocumento['descripcion'] = descripcionTipoDocumento.trim()
            object["tipo_documento"] = objTipoDocumento
            // --
            let objServicio = new Object()
            objServicio['id'] = idServicio
            objServicio['descripcion'] = descripcionServicio.trim()
            object["servicio"] = objServicio
            // --
            object["index"] = i
            object["Item"] = null
            object["IdTipoDocIdentidad"] = idTipoDocumento
            object["NroDocumento"] = nroDocumento
            object["Telefono"] = telefono
            object["Celular"] = celular
            object["Departamento"] = ciudad
            object["Distrito"] = barrio
            object["Direccion"] = direccion
            object["Email"] = email
            object["IdServicio"] = idServicio
            // -- For Peru
            object["NombreCompleto"] = txt_nombres_completos
            object["FechaNacimiento"] = formatSaveDefault(txt_fecha_nacimiento)
            if (txt_fecha_nacimiento == undefined) {
                object["FechaNacimiento"] = null
            }
            object["LugarNacimiento"] = txt_lugar_nacimiento

            // -- Agregar objeto al listado
            listPersonalInformation.push(object)
            // --
            tableList.row.add([
                object.index,
                object.tipo_documento.descripcion, // -- Objeto
                object.NroDocumento,
                object.Telefono,
                object.Celular,
                object.Departamento,
                object.Direccion,
                object.Direccion,
                object.Email,
                object.servicio.descripcion,    // -- Objeto
                ' <button class= "btn btn-sm btn-danger btn_delete_test" data-id="' + object.index + '"> <i class="fa fa-trash"></i></button >'
            ]).draw(false);
            tableList.columns.adjust()
                .responsive.recalc();
            // --
            clearFormularyRegister()
            // -- <button class="btn btn-sm btn-primary " onclick="editPersonalInformation(' + object.index + ')"><i class="fa fa-edit"></i></button>

            //Se reinician los select a su estado inicial "Seleccionar"
            $("#sl_tipo_documento").val($("#sl_tipo_documento option:first").val());
            $("#sl_servicio").val($("#sl_servicio option:first").val());


            $('#btn_guardar_registro_brasil').show();




            i++
        } else {
            functions.notify_message(MESSAGE.es.complete_formulary, 'warning')

        }
    } else {
        if (
            validateParam("txt_fecha_nacimiento") &&
            validarNombresCompleto > 0 &&
            validarLugarNacimiento > 0 &&
            validarParamNroDocumento > 0 &&
            validarCelular > 0 &&
            
            validarDireccion > 0 &&
            validarEmail > 0 &&

            slTipoDocumento.length > 0 &&
            slServicio.length > 0
        ) {
            // -- Obtener valores
            let idTipoDocumento = $("#sl_tipo_documento").val()
            let descripcionTipoDocumento = $("#sl_tipo_documento option:selected").text()
            // --
            let nroDocumento = $("#txt_nro_documento").val()
            let telefono = $("#txt_telefono").val()
            let celular = $("#txt_celular").val()
            let ciudad = $("#txt_ciudad").val()
            let barrio = $("#txt_barrio").val()
            let direccion = $("#txt_direccion").val()
            let email = $("#txt_email").val()
            // -- For Peru
            let txt_nombres_completos = $("#txt_nombres_completos").val()
            let txt_fecha_nacimiento = $("#txt_fecha_nacimiento").val()
            let txt_lugar_nacimiento = $("#txt_lugar_nacimiento").val()
            //Prueba kevin alexander
            let txt_dep = $("#sl_lugar_nacimiento_departamento option:selected").text()
            let txt_prov = $("#sl_lugar_nacimiento_provincia option:selected").text()
            let txt_dis = $("#sl_lugar_nacimiento_distrito option:selected").text()
            // --
            let idServicio = $("#sl_servicio").val()
            let descripcionServicio = $("#sl_servicio option:selected").text()
            // -- Construir objeto
            let object = new Object()
            // --
            let objTipoDocumento = new Object()
            objTipoDocumento['id'] = idTipoDocumento
            objTipoDocumento['descripcion'] = descripcionTipoDocumento.trim()
            object["tipo_documento"] = objTipoDocumento
            // --
            let objServicio = new Object()
            objServicio['id'] = idServicio
            objServicio['descripcion'] = descripcionServicio.trim()
            object["servicio"] = objServicio
            // --
            object["index"] = i
            object["Item"] = null
            object["IdTipoDocIdentidad"] = idTipoDocumento
            object["NroDocumento"] = nroDocumento
            object["Telefono"] = telefono
            object["Celular"] = celular
            object["Departamento"] = ciudad
            object["Distrito"] = barrio
            object["Direccion"] = direccion
            object["Email"] = email
            object["IdServicio"] = idServicio
            // -- For Peru
            object["NombreCompleto"] = txt_nombres_completos
            object["FechaNacimiento"] = formatSaveDefault(txt_fecha_nacimiento)
            if (txt_fecha_nacimiento == undefined) {
                object["FechaNacimiento"] = null
            }
            object["LugarNacimiento"] = txt_dep + "," + txt_prov + "," + txt_dis

            // -- Agregar objeto al listado
            listPersonalInformation.push(object)
            // --
            tableList.row.add([
                object.index,
                object.tipo_documento.descripcion, // -- Objeto
                object.NroDocumento,
                object.Telefono,
                object.Celular,
                object.Departamento,
                object.Direccion,
                object.Direccion,
                object.Email,
                object.servicio.descripcion,    // -- Objeto
                ' <button class= "btn btn-sm btn-danger btn_delete_test" data-id="' + object.index + '"> <i class="fa fa-trash"></i></button >'
            ]).draw(false);
            tableList.columns.adjust()
                .responsive.recalc();
            // --
            clearFormularyRegister()
            // -- <button class="btn btn-sm btn-primary " onclick="editPersonalInformation(' + object.index + ')"><i class="fa fa-edit"></i></button>

            //Se reinician los select a su estado inicial "Seleccionar"
            $("#sl_tipo_documento").val($("#sl_tipo_documento option:first").val());
            $("#sl_servicio").val($("#sl_servicio option:first").val());
            //Se necesita poner en este orden
            $("#sl_lugar_nacimiento_distrito").val($("#sl_lugar_nacimiento_departamento option:first").val(""));
            $("#sl_lugar_nacimiento_provincia").val($("#sl_lugar_nacimiento_departamento option:first").val(""));

            $("#sl_lugar_nacimiento_departamento").val($("#sl_lugar_nacimiento_departamento option:first").val());
            $('#sl_lugar_nacimiento_distrito').attr("disabled", true);
            $('#sl_lugar_nacimiento_provincia').attr("disabled", true);





            i++
        } else {
            functions.notify_message(MESSAGE.es.complete_formulary, 'warning')

        }
    }

    
}
function ModalTrasabilidad() {


}


// --
function consultRequestIntegrity(object) {
    // --
    //$("#tbl_data").DataTable().clear();
    $("#tbl_data").DataTable().clear().draw();
    // --
    $.ajax({
        url: urlConsultRequestIntegrity,
        type: 'POST',
        data: object,
        dataType: 'json',
        cache: false,
        success: function (data) {
            // --
            let obj = data.Data
            console.log("llenaTabla");
            console.log(obj)

            DataSearch = obj;

            //if (Privilegios.RolAcceso != null) {

            //}
            //console.log(Privilegios.RolAcceso);
            // --
            if (obj !== null) {
                if (obj.length > 0) {
                    // --
                    if (Privilegios.RolAcceso != undefined && Privilegios.RolAcceso.find(x => x.IdAcceso == 21) != undefined) {

                        $.each(obj, function (key, value) {
                            // --
                            console.log("Orden de datos");

                            //console.log(value.FechaHoraReg);

                            table_work_integrity.row.add([
                                value.CodigoIntegridad,
                                value.Servicios, // -- Objeto
                                '<div class="progress"> ' +
                                '<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="' + value.Progreso + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + value.Progreso +'%"></div>' +
                                '</div>',
                                value.Usuario,
                                value.FechaHoraReg,
                                value.Status,
                                value.Pais,
                                '<a href="#" class="btn btn-primary btn-icon rounded-circle"  data-toggle="modal" data-target="#modal_Transaction" onclick="ChangeStatus(' + value.IdIntegridad + ',' + value.IdStatus + ',' + value.Progreso + ')"> <div style="width: 25px!important;height: 25px!important;"><i class="icon ion-clock"></i></div></a>' +
                                '<a href = "#" class= "btn btn-danger btn-icon rounded-circle" onclick = "filterDetail(' + value.IdIntegridad + ')" > <div style="width: 25px!important;height: 25px!important;"><i class="fa fa-eye"></i></div></a > ' +
                                '<a href="#" class="btn btn-danger btn-icon rounded-circle" onclick="deleteDetail(' + value.IdIntegridad + ',' + value.IdStatus + ',' + value.Progreso + ')" > <div style="width: 25px!important;height: 25px!important;"><i class="fa fa-trash"></i></div></a >'


                            ]).draw(false);


                           table_work_integrity.columns.adjust()
                               .responsive.recalc();
                        })

                    } else {

                        $.each(obj, function (key, value) {
                            // --
                            table_work_integrity.row.add([
                                value.CodigoIntegridad,
                                value.Servicios, // -- Objeto
                                '<div class="progress"> ' +
                                '<div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="' + value.Progreso + '" aria-valuemin="0" aria-valuemax="100" style="width: ' + value.Progreso + '%"></div>' +
                                '</div>',
                                "",
                                value.FechaHoraReg,
                                value.Status,
                                value.Pais,
                                '<a href = "#" class= "btn btn-danger btn-icon rounded-circle" onclick = "filterDetail(' + value.IdIntegridad + ')" > <div style="width: 25px!important;height: 25px!important;"><i class="fa fa-eye"></i></div></a > '

                            ]).draw(false);


                            table_work_integrity.columns.adjust()
                                .responsive.recalc();
                        })

                    }
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

// --
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
            getListWorkIntegrity()
        }
    })
}

// --
function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}


// --
function uploadFile() {
    // --
    let formData = new FormData();
    //let file = $('input[type=file]')[0].files[0];
    let file = $('#input_file_importacion').prop("files")[0];

    if (file !== undefined) {

        let ext = getFileExtension(file.name);
        if (ext === "xls" || ext === "xlsx") { 
            // --
            formData.append("dataFile", file);
            $("#dataFile").val("");
            $.ajax({
                type: "POST",
                url: urlProcesarTramaCollaborator,
                data: formData,
                dataType: 'json',
                contentType: false,
                processData: false,
                async: true,
                success: function (data) {
                    console.log(data)
                    // --
                    $('#content_loader_upload').css('display', 'none');
                    $('#btn_guardar_importacion').prop('disabled', false);
                    // --
                    let obj = data.response
                    fileImportacion = obj

                    if (obj.length > 0) { // -- Verificar si tiene datos
                        // --
                        let status = true
                        let messageError = ""
                        let count = 0
                        // --
                        $.each(obj, function (key, value) {
                            // --
                            count++
                            if (value.IsSuccess == false) {
                                messageError += 'Item: ' + value.Item + ' => ' + value.Resp + '<br>'
                                status = false
                            }
                        })
                        // --
                        if (status === false) {
                            // --
                            $('#txt_message_error').html(messageError)
                            $('#btn_guardar_importacion').prop('disabled', true);
                        } else {
                            // --
                            $("#lbl_registros").text(count + " Items")
                            $('#btn_guardar_importacion').prop('disabled', false);
                        }
                    }
                },
                beforeSend: function (xhr) {
                    // --
                    $("#content_loader_upload").css('display', 'block');
                },
            });
        } else {
            functions.notify_message('El formato de archivo no es el correcto', 'warning')
        }
    } else {
        functions.notify_message('Debe adjuntar un archivo excel para realizar esta operación', 'warning')
    }
}

// --
function deleteDetail(idIntegrity, idStatus, Porcentaje) {
    ChangeStatus(idIntegrity, idStatus, Porcentaje)
    console.log("eliminarestado")
    console.log(idIntegrity, idStatus, Porcentaje)
    console.log($("#cboEstados option:selected").text())
    
    var idIntegrity = $("#idIntegrity").val();
    var porcentaje = $("#txtPorcentaje").val();
    var statusCheck = $("#chkEnvioCorreo").is(':checked') ? 1 : 0;
    var idStatus = $("#cboEstados").val();

    var InfoSoli = DataSearch.find(x => x.IdIntegridad == idIntegrity);
    if (porcentaje == 0) {
        var datos2 = {
            "idIntegrity": idIntegrity,
            "porcentaje": porcentaje,
            "statusCheck": statusCheck,
            "idStatus": 4,
            "DesEmpresa": InfoSoli.DescripcionEmpresa,
            "DesStatus": "Cancelado",
            "CodigoIntegridad": InfoSoli.CodigoIntegridad,
            "desServicios": InfoSoli.Servicios,
            "idUsuario": InfoSoli.IdUsuario,
        }
        console.log("Datos con lo que se envia");
        console.log(datos2);
        //==============Inicio de modal eliminar =================
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: true
        })

        swalWithBootstrapButtons.fire({
            title: 'Quer apagar o seu pedido?',
            text: "",

            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Aceitar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {


                $.ajax({
                    url: urlUpdateStatus,
                    type: 'POST',
                    data: datos2,
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        if (data.apiResponse.status == "OK") {
                            var miCookie = readCookie("IdPais");
                            // --
                            if (miCookie == 1) {
                                // -- Perú
                                swalWithBootstrapButtons.fire(
                                    'Eliminado!',
                                    '',
                                    ''
                                )
                            } else {
                                swalWithBootstrapButtons.fire(
                                    'Removido!',
                                    '',
                                    ''
                                )
                            }
                            
                            Buscar();

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




            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                //swalWithBootstrapButtons.fire(
                //    'Cancelled',
                //    'Your imaginary file is safe :)',
                //    'error'
                //)
            }
        })
    } else {
        var miCookie = readCookie("IdPais");
        // --
        if (miCookie == 1) {
            // -- Perú
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'El proceso ya ha comenzado',
                footer: ''
            })
        } else {
           
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'O processo j\u00e1 come\u00e7ou',
                footer: ''
            })
        }
        

    }




    //===============Modal end=========
   
   
}
function filterDetail(val) {
    // --
    window.location.href = './WorkIntegrityDetail?IdIntegridad=' + val + '';
}

// --
function ChangeStatus(idIntegrity, idStatus, Porcentaje) {
    //$('option:selected', '#my_select').val();
    $('#cboEstados').val(idStatus);
    $('#idIntegrity').val(idIntegrity);
    $('#txtPorcentaje').val(Porcentaje);
}

// --
function clearFormularyRegister() {
    // --
    $("#txt_nro_documento").val("")
    $("#txt_telefono").val("")
    $("#txt_celular").val("")
    $("#txt_ciudad").val("")
    $("#txt_barrio").val("")
    $("#txt_direccion").val("")
    $("#txt_email").val("")

    $("#txt_nombres_completos").val("")
    $("#txt_fecha_nacimiento").val(null)
    $("#txt_lugar_nacimiento").val("")
    
}

// --
function validateParam(input) {
    // --
    let element = $("#" + input)
    if (!element[0].checkValidity()) {
        return false
    } else {
        return true
    }
}

// --
function editPersonalInformation(obj) {
    // --
    console.log(obj)
}

// --
function showInputForPeru() {
    // Leemos la cookie
    var miCookie = readCookie("IdPais");
    // --
    if (miCookie == 1) {
        // -- Perú
        $('.input-for-peru').css('display', 'block');
    } else {
        $('.input-for-peru').css('display', 'none');
    }

}
//Oculta el boton de guardar y el formulario completar informacion
function ocultarBrasil() {
    
    var miCookie = readCookie("IdPais");
    console.log("cookie pais" + miCookie)
    if (miCookie == 1) {
        $('#boton_brasil').hide();

    } else {
        $('#boton_brasil').show();

    }
    
    
}
//
$('#sl_tipo_documento').on('change', function () {
    // lo que queramos hacer
    var miCookie = readCookie("IdPais");
    // --
    if (miCookie == 1) {
        let descripcionTipoDocumento = $("#sl_tipo_documento option:selected").text()
        var tipo_documento = document.getElementById("cambiar_size_tipo_documento");
        var documento = document.getElementById("cambiar_size_nro_documento");
        var nombre_completo = document.getElementById("cambiar_size_nombres_completos");

        

        if (descripcionTipoDocumento != " DNI") {
            tipo_documento.className = "col-lg-4"
            documento.className = "col-lg-4"
            nombre_completo.className = "col-lg-4"
            document.getElementById("div_boton_consultar_dni").style.display = "none";

        } else {
            tipo_documento.className = "col-lg-3"
            documento.className = "col-lg-2"
            nombre_completo.className = "col-lg-5"
            document.getElementById("div_boton_consultar_dni").style.display = "block";

        }

    }
   
});
function btn_consultar_dni() {
    let valuenroDocumento = $("#txt_nro_documento").val()
    validarParamNroDocumento = terminarValidarDocumento(valuenroDocumento);
    if (validarParamNroDocumento > 0) {
        var ruta = "https://api.reniec.cloud/dni/" + valuenroDocumento;
        var ruta2 = "http://servicio.fitcoders.com/v1/all?service=DNI&id=" + valuenroDocumento+"&key=5b8e0a07c0307c1e5a5c55cb & fbclid=IwAR1zBfwT93AdY_Gzy2nFct5fVcp30KHWGMaGCaG_3YKEUlIBceHEWy96r70"
        console.log(ruta);
        $.ajax({
            url: urlGetDniApi + "?dni=" + valuenroDocumento,
            type: 'GET',
            dataType: 'json',
            success: function (d) {
                let data = d
                console.log(d);
                data = JSON.parse(data.responseString);
                if (data.error == "NO_DATA") {
                    
                    console.log("error ");

                    functions.notify_message('No se encontro su dni :(', 'danger')
                    

                } else {

                    $('#txt_nombres_completos').val( data.apellido_paterno + " " + data.apellido_materno+" "+data.nombres )


                    functions.notify_message("Exitoso", 'success')
                }


            },
            error: function () {
                console.log("error ");
                functions.notify_message('Error de consulta, Reniec no responde :(', 'danger')

            }
        })
       
      
       
    }
}

// -- UBIGEO
// -- DEPARTAMENTO
$('#sl_lugar_nacimiento_departamento').on('change', function (e) {
    // --
    let idDepartamento = $(this).val()
    getProvincia(idDepartamento)
})

// --
function getDepartamento() {
    // --
    let loaderHtml = '<option></option>'
    let url = urlGetDepartamento
    // --
    $('#sl_lugar_nacimiento_departamento').attr("disabled", true);
    $('#sl_lugar_nacimiento_provincia').attr("disabled", true);
    $('#sl_lugar_nacimiento_distrito').attr("disabled", true);
    // --
    $('#sl_lugar_nacimiento_departamento').html(loaderHtml);
    $('#sl_lugar_nacimiento_provincia').html(loaderHtml);
    $('#sl_lugar_nacimiento_distrito').html(loaderHtml);
   
    // --
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // --
            if (data != null) {
                // --
                let html = ''
                html += '<option value="0">[Seleccionar]</option>'
                // --
                let obj = data.Data
                console.log(data)
                // --
                if (obj != null) {
                    // --
                    if (obj.length > 0) { // -- Verificar si tiene datos
                        // --
                        $.each(obj, function (key, value) {
                            // --
                            html += '<option value="' + value.id + '"> ' + value.name + '</option>'
                        });
                    }
                    //// --
                    $('#sl_lugar_nacimiento_departamento').html(html);
                    $('#sl_lugar_nacimiento_departamento').attr("disabled", false);
                }
            }
        }
    })
}

// --
function getProvincia(idDepartamento) {
    // --
    let url = urlGetProvincia + '?departamento=' + idDepartamento
    // --
    let loaderHtml = '<option></option>'
    // --
    $('#sl_lugar_nacimiento_provincia').attr("disabled", true);
    $('#sl_lugar_nacimiento_distrito').attr("disabled", true);
    // --
    $('#sl_lugar_nacimiento_provincia').html(loaderHtml);
    $('#sl_lugar_nacimiento_distrito').html(loaderHtml);
    // --
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // --
            if (data != null) {
                let html = ''
                html += '<option value="0">[Seleccionar]</option>'
                // --
                let obj = data.Data
                // --
                if (obj != null) {
                    // --
                    if (obj.length > 0) { // -- Verificar si tiene datos
                        // --
                        $.each(obj, function (key, value) {
                            // --
                            html += '<option value="' + value.id + '"> ' + value.name + '</option>'
                        });
                    }
                    // --
                    $('#sl_lugar_nacimiento_provincia').html(html);
                    $('#sl_lugar_nacimiento_provincia').attr("disabled", false);
                }

            }
        }
    })
}

$('#sl_lugar_nacimiento_provincia').on('change', function (e) {
    // --
    let idDepartamento = $("#sl_lugar_nacimiento_departamento").val()
    let idProvincia = $(this).val()
    getDistrito(idDepartamento, idProvincia)
})


// --
function getDistrito(idDepartamento, idProvincia) {
    // --
    let url = urlGetDistrito + '?departamento=' + idDepartamento + '&provincia=' + idProvincia
    // --
    let loaderHtml = '<option></option>'
    $('#sl_lugar_nacimiento_distrito').html(loaderHtml);
    // --
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // --
            if (data != null) {
                let html = ''
                html += '<option value="0">[Seleccionar]</option>'
                // --
                let obj = data.Data
                // --
                if (obj != null) {
                    // --
                    if (obj.length > 0) { // -- Verificar si tiene datos
                        // --
                        $.each(obj, function (key, value) {
                            // --
                            html += '<option value="' + value.id + '"> ' + value.name + '</option>'
                        });
                    }
                    // --
                    $('#sl_lugar_nacimiento_distrito').html(html);
                    $('#sl_lugar_nacimiento_distrito').attr("disabled", false);
                }

            }
        }
    })
}


// -- Init
getListTypeDocument()
getWorkIntegrity()
getBranchOffices()
getPayMethod()
getChecksStatus()
showInputForPeru()
getDepartamento()

//Hide
$('#ul_error_nombres').hide();
$('#ul_error_fecha').hide();
$('#ul_error_lugar_nacimiento').hide();
$('#ul_error_nro_documento').hide();
$('#ul_error_celular').hide();
$('#ul_error_departamento').hide();
$('#ul_error_ciudad').hide();
$('#ul_error_direccion').hide();
$('#ul_error_email').hide();
$('#ul_error_servicio').hide();
$('#ul_error_tipoDocumento').hide();
$('#ul_error_lugar_nacimiento_departamento').hide();
$('#ul_error_lugar_nacimiento_provincia').hide();
$('#ul_error_lugar_nacimiento_distrito').hide();

//Hide completar informacion
$('#ul_error_facturar_nombre').hide();
$('#ul_error_comentario').hide();
$('#ul_error_file_voucher').hide();
$('#ul_error_file_habeas_data').hide();
//Subir formulario
$('#ul_error_file_voucher_importacion').hide();
$('#ul_error_file_habeas_data_importacion').hide();



//Ocultar datos brasil
$('#boton_brasil').hide();
//Ocultar boton
$('#btn_guardar_registro_brasil').hide();


ocultarBrasil();
getPayMethod()
