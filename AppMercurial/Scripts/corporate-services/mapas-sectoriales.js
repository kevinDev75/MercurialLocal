
// --
const functions = new Functions()
var ListAccessUser = null

//$(document).ready(function () {
//$("#sl_modal_register_MapaSectorial_empresa").select2({
//    dropdownParent: $("#modal_register_MapaSectorial")
//});
//});

// -- Datepicker
$('#txt_fecha_inicio_MapaSectorial').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})
$('#txt_fecha_fin_MapaSectorial').datepicker({
    showOtherMonths: true,
    selectOtherMonths: true,
    dateFormat: 'dd/mm/yy'
})


//#region -- MAPA SECTORIAL

// -- VARIABLES
var listMapaSectorial = new Array()
var indexListMapaSectorial = 1

// -- TABLE
var tableDataMapaSectorial = $('#tbl_data_MapaSectorial').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    },
    order: [[0, "desc"]]
})

// -- GUARDAR
$('#btn_guardar_registro_MapaSectorial').on('click', function () {
    // --
    var formData = new FormData();

    var txt_MapaSectorial_Nombre = $('#txt_MapaSectorial_Nombre').val()
    var txt_MapaSectorial_Link = $('#txt_MapaSectorial_Link').val()
    var sl_modal_register_MapaSectorial_empresa = $('#sl_modal_register_MapaSectorial_empresa').val()

    // -- OBJECT
    var objectData = {
        // --
        "IdGestionCorporativaRiesgo": 0,
        "IdEmpresa": Number(sl_modal_register_MapaSectorial_empresa),
        "IdUsuarioEnvio": 0,
        "Nombre": txt_MapaSectorial_Nombre,
        "Link": txt_MapaSectorial_Link
    }

    var camposVacios = ""
    // --
    if (txt_MapaSectorial_Nombre == "") {
        camposVacios += "<span>No se ha ingresado el nombre.</span></br>"
    }
    if (txt_MapaSectorial_Link == "" || isUrl(txt_MapaSectorial_Link) == false) {
        camposVacios += "<span>Link incorrecto.</span></br>"
    }
    if (sl_modal_register_MapaSectorial_empresa == 0) {
        camposVacios += "<span>No se ha selecionado la empresa.</span></br>"
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
                    url: urlSaveOrUpdateSectoralMaps,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {

                        let obj = data.response;
                        // --
                        if (obj.status == 'OK') {
                            $('#content_loader_MapaSectorial').css('display', 'none');
                            $("#modal_register_MapaSectorial").modal('hide')
                            functions.notify_message(MESSAGE.es.success_insert, 'success')
                            let object = new Object()
                            object["FechaInicio"] = $('#txt_fecha_inicio_MapaSectorial').val()
                            object["FechaFin"] = $('#txt_fecha_fin_MapaSectorial').val()
                            getListMapaSectorial(object)
                        } else {
                            $('#content_loader_MapaSectorial').css('display', 'none');
                            functions.notify_message(MESSAGE.es.error_insert, 'error')
                        }
                    },
                    beforeSend: function (xhr) {
                        $('#content_loader_MapaSectorial').css('display', 'block');
                    }
                });
            }
        }])
    }

})

// --
$('#modal_register_MapaSectorial').on('shown.bs.modal', function (e) {
    // --
    $('#content_loader_MapaSectorial').css('display', 'none')
    $("#txt_MapaSectorial_Nombre").val('');
    $('#txt_MapaSectorial_Link').val('');
    $('#sl_modal_register_MapaSectorial_empresa').val('0');
    $("#sl_modal_register_MapaSectorial_empresa").select2({
        dropdownParent: $("#modal_register_MapaSectorial")
    });
})

// --
function getListMapaSectorial(object) {
    // --
    $("#tbl_data_MapaSectorial").DataTable().clear().draw()
    let url = urlGetListSectoralMaps + "?FechaInicio=" + object["FechaInicio"] + "&FechaFin=" + object["FechaFin"]
    // --
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        success: function (data) {
            let obj = data.Data
            console.log(obj)
            if (obj != null) {

                let lista = obj

                let AccessDelete = ListAccessUser.filter(x => x.IdAcceso == 35);

                listMapaSectorial = lista
                lista.forEach((element) => {
                    let index = tableDataMapaSectorial.rows().count() + 1;
                    let ButtonDelete = '';

                    if (AccessDelete.length > 0 && AccessDelete[0].IdAcceso == 35) {
                        ButtonDelete = '<a onclick="deleteRiskMap(' + element.IdMapaSectorial + ')" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-trash"></i></a>'
                    }

                    tableDataMapaSectorial.row.add([
                        element.IdMapaSectorial,
                        element.Nombre,
                        '<a href="' + element.Link + '" target="_blank">' + 'enlace' + '</a>',
                        element.UsuarioEnvio,
                        element.FechaHoraReg,
                        element.Pais,
                        element.Estado,
                        ButtonDelete
                    ]).draw(false);
                    tableDataMapaSectorial.columns.adjust()
                        .responsive.recalc();
                })

                functions.notify_message(MESSAGE.es.success_select, 'success')
            }

        }
    });
    // --- }

}

$("#btn_buscar_MapaSectorial").on('click', function () {
    let fechaInicio = $("#txt_fecha_inicio_MapaSectorial").val()
    let fechaFin = $("#txt_fecha_fin_MapaSectorial").val()
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
        getListMapaSectorial(object)
    }
})

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

            let url = urlUpdateStatusSectoralMaps + "?IdMapaSectorial=" + value + '&Flg_Estado=false'
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
                        object["FechaInicio"] = $('#txt_fecha_inicio_MapaSectorial').val()
                        object["FechaFin"] = $('#txt_fecha_fin_MapaSectorial').val()
                        getListMapaSectorial(object)
                    }

                }
            });

        }
    }])

}

//#endregion

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
            getListMapaSectorial(object)
        }
    });
}


function Inicio() {
    //let FechaActual = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2')
    let FechaInicio = new Date()
    FechaInicio.setMonth(FechaInicio.getMonth() - 1)
    let FechaInicio_in_string = FechaInicio.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
    let FechaFin_in_string = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
    $('#txt_fecha_inicio_MapaSectorial').val(FechaInicio_in_string)
    $('#txt_fecha_fin_MapaSectorial').val(FechaFin_in_string)

    let object = new Object()
    object["FechaInicio"] = FechaInicio_in_string
    object["FechaFin"] = FechaFin_in_string
    GetAccessUser(FechaInicio_in_string, FechaFin_in_string)
}

Inicio();