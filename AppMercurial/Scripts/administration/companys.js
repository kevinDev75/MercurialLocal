// -- GLOBAL
const functions = new Functions()

var ListaCompanias = new Array()
var ListaSucursales = new Array()



var indexListaSucursales = 1
// -- TABLE
var tableCompanias = $('#tbl_data').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- TABLE
var tableSucursales = $('#tbl_list_sucursales').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_agregar_sucursal").on('click', function () {
    let txt_descripcion_sucursal = $('#txt_descripcion_sucursal').val()
    // --
    indexListaSucursales = tableSucursales.rows().count() + 1
    // --
    let object = {
        "IdSucursal": 0,
        "IdEmpresa": 0,
        "IdPais": 0,
        "DescripcionSucursal": txt_descripcion_sucursal,
        "IdUsuarioCreacion": 0,
        "IdUsuarioAccion": 0,
        "Flg_Estado": true
    }
    // -- Agregar objeto al listado
    ListaSucursales.push(object)

    // -- Agregar datos a la tabla
    tableSucursales.row.add([
        indexListaSucursales,
        txt_descripcion_sucursal,
        ' <button class= "btn btn-sm btn-danger" data-id="' + indexListaSucursales + '" id="btn_delete_row_sucursal"> <i class="fa fa-trash"></i></button >'
    ]).draw(false);
    // --
    tableSucursales.columns.adjust()
        .responsive.recalc();
    // --
    $('#txt_descripcion_sucursal').val('')
})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_delete_row_sucursal', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tableSucursales.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tableSucursales.row(index).remove().draw(false)

    // --
    for (let i = 0; i < ListaSucursales.length; i++) {
        if (ListaSucursales[i].IdSucursal == value) {
            ListaSucursales[i].Flg_Estado = false
        }
    }

})

function convertToString(value) {
    return value + ""
}

// --
function getListCompanies() {
    // --
    $("#tbl_data").DataTable().clear().draw()
    // --
    let url = urlGetListCompanies
    // --
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            let lista = data.Data
            ListaCompanias = lista
            
            lista.forEach((element) => {
                let Estado = 'INACTIVO'
                if (element.Flg_Estado == true) {
                    Estado = 'ACTIVO'
                }
                // --
                tableCompanias.row.add([
                    element.IdEmpresa,
                    element.DescripcionEmpresa,
                    element.Pais,
                    element.DesTipoDocIdentidad,
                    element.NroDocumento,
                    Estado,
                    ' <button class= "btn btn-sm btn-primary" data-id="' + element.IdEmpresa + '" id="btn_edit_row"> <i class="fa fa-edit"></i></button >'
                    //' <button class= "btn btn-sm btn-danger" data-id="' + element.IdUsuario + '" id="btn_delete_row"> <i class="fa fa-trash"></i></button >'
                ]).draw(false);
                tableCompanias.columns.adjust()
                    .responsive.recalc();
            })
        }
    })
}

// --
$('#sl_pais').on('change', function (e) {
    let IdPais = $(this).val()
    //getListCompanies(IdPais)
    getListTypeDocument(IdPais)
})

// --
function getListTypeDocument(IdPais) {
    let url = urlGetDocumentType + '?IdPais=' + IdPais + '&Opcion=3' //Opcion3 es para empresas
    // --
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // --
            let html = ''
            html += '<option>[Seleccionar]</option>'
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
function getListCountries() {
    // --
    $.ajax({
        url: urlGetListCountries,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // --
            let html = ''
            html += '<option value="0">[Seleccionar]</option>'
            // --
            let obj = data.Data
            //console.log(obj)
            // --
            if (obj.length > 0) { // -- Verificar si tiene datos
                // --
                $.each(obj, function (key, value) {
                    // --
                    html += '<option value="' + value.IdPais + '"> ' + value.Descripcion + '</option>'
                });
            }
            // --
            $('#sl_pais').html(html);
        }
    })
}

// -- 
function saveData() {
    // --
    let sl_pais = $("#sl_pais").val()
    let sl_tipo_documento = $("#sl_tipo_documento").val()
    let txt_num_documento = $("#txt_num_documento").val()
    let txt_descripcion_empresa = $("#txt_descripcion_empresa").val()
    let FlgEstadoEmpresa = $("#check_estado").prop('checked')
    // --
    
    $('#txt_descripcion_empresa').val("")

    let IdEmpresa = $('#modal_register').attr('data-idempresa')

    // --
    let objectData = {
        "IdEmpresa": IdEmpresa,
        "IdPais": sl_pais,
        "IdTipodocumentoEmpresa": sl_tipo_documento,
        "NroDocumento": convertToString(txt_num_documento),
        "DescripcionEmpresa": convertToString(txt_descripcion_empresa),
        "Flg_Estado": FlgEstadoEmpresa,
        "ListBranchOfficeFlt": ListaSucursales
    }

    var camposVacios = ''
    // --
    if (sl_pais == "0" || sl_pais == '[Seleccionar]' || sl_pais == null) {
        camposVacios += "<span>PAIS</span>"
    }
    // --
    if (sl_tipo_documento == "" || sl_tipo_documento == '[Seleccionar]' || sl_tipo_documento == null) {
        camposVacios += "<br/><span>TIPO DE DOCUMENTO</span>"
    }
    // --
    if (txt_num_documento == "") {
        camposVacios += "<br/><span>NUMERO DE DOCUMENTO DE IDENTIDAD</span>"
    }
    // --
    if (txt_descripcion_empresa == "") {
        camposVacios += "<br/><span>DESCRIPCION DE LA EMPRESA</span>"
    }
    //--
    if (ListaSucursales.length == 0) {
        camposVacios += "<br/><span>NO HAY NINGUNA SUCURSAL</span>"
    }

    console.log('Json', objectData)

    if (camposVacios == "") {
        console.log('campos vacios')
        $.ajax({
            type: "POST",
            url: urlSaveCompany,
            dataType: 'json',
            data: objectData,
            success: function (data) {
                console.log(data)
                var typeAlert = (data.Data.status == "OK") ? 'success' : 'error';
                var Message = (data.Data.status == "OK") ? 'Se guardo la información correctamente' : 'Ocurrio un problema, Comuniquese con sistemas';
                // --
                //Swal.insertQueueStep({
                //    icon: typeAlert,
                //    title: Message
                //});
                // --
                Swal.queue([{
                    title: 'Guardar información',
                    confirmButtonText: 'OK',
                    text: Message,
                    icon: typeAlert,
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                        $('#modal_register').modal('hide')
                        getListCompanies()
                    }
                }]);

            }
        });
    } else {
        Swal.queue([{
            icon: 'warning',
            title: 'Formularios incompletos...',
            html: camposVacios,
            confirmButtonText: 'Ok',
            //cancelButtonText: 'Cancelar',
            cancelButtonColor: '#d33',
            showCancelButton: false,
            showLoaderOnConfirm: true,
            preConfirm: () => {

            }
        }]);

    }


}


// -- EDITAR DATOS DE LA TABLA
$(document).on('click', '#btn_edit_row', function () {
    // --
    let value = $(this).attr('data-id')
    //let index = null;
    // --

    tableCompanias.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });

    // --
    let indexObject = ListaCompanias.findIndex(x => x.IdEmpresa == value)

    let ObjEmpresa = ListaCompanias.find(x => x.IdEmpresa == value)
    //console.log(ObjEmpresa)

    $('#modal_register').modal('show')

    $('#modal_register').attr('data-idempresa', ObjEmpresa.IdUsuario)
    $('#sl_pais').val(ObjEmpresa.IdPais)
    SetTypeDocument(ObjEmpresa.IdPais, ObjEmpresa.IdTipodocumentoEmpresa)
    SetBranchOffice(value)
    $('#txt_num_documento').val(ObjEmpresa.NroDocumento)
    $('#txt_descripcion_empresa').val(ObjEmpresa.DescripcionEmpresa)
    $("#check_estado").prop('checked', ObjEmpresa.Flg_Estado)

    $('#modal_register').attr('data-idempresa', ObjEmpresa.IdEmpresa)
})

function SetBranchOffice(IdEmpresa) {
    $("#tbl_list_sucursales").DataTable().clear().draw()
    //console.log(IdEmpresa)
    let url = urlGetBranchOffices + '?IdEmpresa=' + IdEmpresa
    // --
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // --
            let lista = data.Data
            console.log('Get', lista)
            ListaSucursales = lista
            lista.forEach((element) => {
                // --
                if (element.Flg_Estado == true) {
                    // --
                    let index = tableSucursales.rows().count() + 1
                    // --
                    tableSucursales.row.add([
                        index,
                        element.DescripcionSucursal,
                        ' <button class= "btn btn-sm btn-danger" data-id="' + element.IdSucursal + '" id="btn_delete_row_sucursal"> <i class="fa fa-trash"></i></button >'
                    ]).draw(false);
                    tableSucursales.columns.adjust()
                        .responsive.recalc();
                }
                
            })
            

        }
    })
}

// --
//$("#check_all").change(function () {
//    $('[name="check_status[]"]').prop('checked', $(this).prop("checked"));
//});

function SetTypeDocument(IdPais, IdTipoDocIdentidad) {
    let url = urlGetDocumentType + '?IdPais=' + IdPais + '&Opcion=3' //Opcion3 es para empresas
    // --
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // --
            let html = ''
            html += '<option value="0">[Seleccionar]</option>'
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
            $('#sl_tipo_documento').val(IdTipoDocIdentidad)
        }
    })
}

// -- Modal
//$('#modal_register').on('shown.bs.modal', function (e) {
//    $('#modal_register').attr('data-idempresa', 0)
//    cleanFormulary()
//})

function showModal() {
    // --
    cleanFormulary()
    $('#modal_register').modal('show')
    $('#modal_register').attr('data-idempresa', 0)
}

function cleanFormulary() {
    // --
    $("#sl_pais").val(0)
    $("#sl_tipo_documento").val(0) 
    $("#txt_num_documento").val("") 
    $('#txt_descripcion_sucursal').val("")
    $('#txt_descripcion_empresa').val("")

    // --
    $("#tbl_list_sucursales").DataTable().clear()
    $("#tbl_list_sucursales").DataTable().destroy();

    tableSucursales = $('#tbl_list_sucursales').DataTable({
        responsive: true,
        language: {
            "url": "../Files/lenguaje-spanish.json"
        }
    })

   
}

// -- Init
getListCompanies()
//getListTypeDocument()
getListCountries()
