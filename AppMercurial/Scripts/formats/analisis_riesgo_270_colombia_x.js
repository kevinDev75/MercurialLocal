// -- GLOBAL
const functions = new Functions()

// --
var listRestrictivasNacionales = {
    "ArchivoAdjunto_AntecFiscal" : null,
    "ArchivoAdjunto_AntecDisciplinario": null,
    "ArchivoAdjunto_SIMIT": null,
    "ArchivoAdjunto_RUNT": null,
    "ArchivoAdjunto_ConsulAfiliadosBDUA": null,
    "ArchivoAdjunto_PersoExpuestaPoliticamente": null,
    "ArchivoAdjunto_PoliciaNacional": null
}
var listDefinicionSituacionMilitar = {
    "ArchivoDefSituacionMilitar": null
}
var listComportamientoFinanciero = {
    "ArchivoCompFinanciero": null
}
var listAnexos = null
var ListPhotografym = {
    "ArchivoAdjunto_EntradaDomicilio": null,
    "ArchivoAdjunto_AmbSocial": null,
    "ArchivoAdjunto_Habitaciones": null,
    "ArchivoAdjunto_Cocina": null
}
var ListDarkFactor = {
    "ArchivoAdjunto": null
}

// --
function getFileExtension(filename) {    
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

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
            // -- console.log(d);
            $("#imgPreview").attr('src',
                'data:image/' + typeFile + ';base64,' + d);
        }
    });
}

function GenerateDocument() {
    // --
    let idIntegridad = getDatos("key");
    var itemIntegridad = getDatos("item");
    let url = urlGenerateDocument + "?IdIntegridad=" + idIntegridad + "&ItemIntegridadDet=" + itemIntegridad + "&idDocumentFile=2";
    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function (d) {
            console.log(d);
            var typeAlert = (d.Data.status == "0") ? 'success' : 'error';
            var Message = (d.Data.status == "0") ? 'Se genero el documento correctamente' : 'Ocurrio un problema, Comuniquese con sistemas';
            // --
            Swal.fire(
                'Generación de documentos',
                Message,
                typeAlert
            )
        }
    })
}


$("#btn_3_10_Generar").on('click', function () {
    GenerateDocument();
});

function getDatos(variable) {
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

function validateNumber(value) {
    if (value === undefined || value === null || value === 'null' || value === '') {
        return 0
    } else {
        return value
    }
}


// -- PROCESOS JUDICIALES

// -- VARIABLES
var listProcesosJudiciales = new Array()
var indexListProcesosJudiciales = 1

// -- TABLE
var tableProcesosJudiciales = $('#tbl_1_2_list').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_1_2_agregar").on('click', function () {
    addJudicialProcessOrAssetLaunderingToTable({
        "ciudad": $('#txt_1_2_ciudad').val(),
        "despacho": $('#txt_1_2_despacho').val(),
        "proceso": $('#txt_1_2_proceso').val(),
        "clase": $('#txt_1_2_clase').val(),
        "demandantes": $('#txt_1_2_demandantes').val(),
        "demandados": $('#txt_1_2_demandados').val()
    }, true, {
        "list": listProcesosJudiciales,
        "index": indexListProcesosJudiciales,
        "table": tableProcesosJudiciales,
    })
})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_1_2_delete_row', function () {
    let value = $(this).attr('data-id')
    let index = null;
    tableProcesosJudiciales.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    tableProcesosJudiciales.row(index).remove().draw(false);
    let indexObject = listProcesosJudiciales.findIndex(x => x.index == value);
    listProcesosJudiciales.splice(indexObject, 1);
})

// -- LIMPIAR FORMULARIO
function clearFormularyProcesosJudiciales() {
    $('#txt_1_2_ciudad').val('')
    $('#txt_1_2_despacho').val('')
    $('#txt_1_2_proceso').val('')
    $('#txt_1_2_clase').val('')
    $('#txt_1_2_demandantes').val('')
    $('#txt_1_2_demandados').val('')
}

// -- PROCESO LA/FT
// -- VARIABLES
var listProcesoLavadoActivos = new Array()
var indexListProcesoLavadoActivos = 1

// -- TABLE
var tableLavadoActivos = $('#tbl_1_3_list').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_1_3_agregar").on('click', function () {
    addJudicialProcessOrAssetLaunderingToTable({
        "ciudad": $('#txt_1_3_ciudad').val(),
        "despacho": $('#txt_1_3_despacho').val(),
        "proceso": $('#txt_1_3_proceso').val(),
        "clase": $('#txt_1_3_clase').val(),
        "demandantes": $('#txt_1_3_demandantes').val(),
        "demandados": $('#txt_1_3_demandados').val()
    }, false, {
        "list": listProcesoLavadoActivos,
        "index": indexListProcesoLavadoActivos,
        "table": tableLavadoActivos,
    })
})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_1_3_delete_row', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tableLavadoActivos.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tableLavadoActivos.row(index).remove().draw(false);
    // --
    let indexObject = listProcesoLavadoActivos.findIndex(x => x.index == value);
    listProcesoLavadoActivos.splice(indexObject, 1);
    // --
})

// -- LIMPIAR FORMULARIO
function clearFormularyProcesoLavadoActivos() {
    // --
    $('#txt_1_3_ciudad').val('')
    $('#txt_1_3_despacho').val('')
    $('#txt_1_3_proceso').val('')
    $('#txt_1_3_clase').val('')
    $('#txt_1_3_demandantes').val('')
    $('#txt_1_3_demandados').val('')
}

// -- 1.8 ANEXOS

// -- VARIABLES
var listAnexos = new Array()
var listFilesAnexos = new Array()
var indexListAnexos = 1

// -- TABLE
var tableAnexos = $('#tbl_1_11_list').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})


// -- AGREGAR DATOS A LA TABLA
$("#btn_1_11_agregar").on('click', function () {
    var file = $("#file_1_11").prop("files")[0]
    var ext = ""
    if (file !== undefined) {
        ext = getFileExtension(file.name)
        if (ext != "") {
            indexListAnexos = tableAnexos.rows().count() + 1
            let object = {
                "IdAnexo": 0,
                "ItemAnexo": 0,
                "ArchivoAdjuntoAnexo":
                {
                    "IdArchivoAdjunto": 0,
                    "NombreArchivo": "Anexo_" + indexListAnexos + "." + ext,
                    "RutaArchivo": null,
                    "ExtensionArchivo": ext,
                    "FecRegistro": null,
                    "IdUsuarioRegistro": 0
                }
            }
            console.log('Anexo', object)
            // -- Agregar objeto al listado
            listAnexos.push(object)
            // --
            file.id = indexListAnexos
            listFilesAnexos.push(file)

            // -- Agregar datos a la tabla
            tableAnexos.row.add([
                indexListAnexos,
                'Anexo_' + indexListAnexos,
                ' <button class= "btn btn-sm btn-danger" data-id="' + indexListAnexos + '" id="btn_1_11_delete_row"> <i class="fa fa-trash"></i></button >'
            ]).draw(false);
            // --
            tableAnexos.columns.adjust()
                .responsive.recalc();

            // --
            indexListAnexos++
            // --
            $('#file_1_11').val(null);

        }

    }

})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_1_11_delete_row', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tableAnexos.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tableAnexos.row(index).remove().draw(false);
    // --
    let indexObject = listAnexos.findIndex(x => x.index == value)
    listAnexos.splice(indexObject, 1)
    // --
    $.each(listFilesAnexos, function (key, item) {
        if (item != undefined) {
            if (item.id == value) {
                listFilesAnexos.splice(key, 1)
            }
        }
    });

})



// -- II. INFORME SOCIOECONÓMICO


// -- ENTORNO FAMILIAR
// -- HERMANOS

// -- VARIABLES
var listHermanos = new Array()
var indexListHermanos = 1

// -- TABLE
var tableHermanos = $('#tbl_3_3_list_hermanos').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_3_3_agregar_hermanos").on('click', function () {
    // --
    let txt_3_3_hermanos_nombres = $('#txt_3_3_hermanos_nombres').val()
    let txt_3_3_hermanos_edad = $('#txt_3_3_hermanos_edad').val()
    let txt_3_3_hermanos_nivel_educativo = $('#txt_3_3_hermanos_nivel_educativo').val()
    let txt_3_3_hermanos_ocupacion = $('#txt_3_3_hermanos_ocupacion').val()
    let txt_3_3_hermanos_empresa_institucion = $('#txt_3_3_hermanos_empresa_institucion').val()
    let txt_3_3_hermanos_convive_usted = $('#txt_3_3_hermanos_convive_usted').val()

    // -- Validar
    if (
        txt_3_3_hermanos_nombres.length > 0 &&
        txt_3_3_hermanos_edad.length > 0 &&
        txt_3_3_hermanos_nivel_educativo.length > 0 &&
        txt_3_3_hermanos_ocupacion.length > 0 &&
        txt_3_3_hermanos_empresa_institucion.length > 0 &&
        txt_3_3_hermanos_convive_usted.length > 0
    ) {
        // --
        let object = {
            "IdEntornoFamiliar": 0,
            "ItemEntornoFamiliar": 0,
            "IdParentesco": 3, // -- HERMANO
            "Nombres": txt_3_3_hermanos_nombres,
            "Edad": validateNumber(txt_3_3_hermanos_edad),
            "NivelEducativo": txt_3_3_hermanos_nivel_educativo,
            "Ocupacion": txt_3_3_hermanos_ocupacion,
            "EmpresaInstitucion": txt_3_3_hermanos_empresa_institucion,
            "ConviveConUsted": txt_3_3_hermanos_convive_usted
        }

        // -- Agregar objeto al listado
        listHermanos.push(object)
        indexListHermanos = tableHermanos.rows().count() + 1

        // -- Agregar datos a la tabla
        tableHermanos.row.add([
            indexListHermanos,
            txt_3_3_hermanos_nombres,
            txt_3_3_hermanos_edad,
            txt_3_3_hermanos_nivel_educativo,
            txt_3_3_hermanos_ocupacion,
            txt_3_3_hermanos_empresa_institucion,
            txt_3_3_hermanos_convive_usted,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListHermanos + '" id="btn_3_3_delete_row_hermanos"> <i class="fa fa-trash"></i></button >'
        ]).draw(false);
        tableHermanos.columns.adjust()
            .responsive.recalc();
        // --
        indexListHermanos++
        clearFormularyHermanos()
    } else {
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    }
})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_3_3_delete_row_hermanos', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tableHermanos.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tableHermanos.row(index).remove().draw(false);
    // --
    let indexObject = listHermanos.findIndex(x => x.index == value);
    listHermanos.splice(indexObject, 1);
    // --
})

// -- LIMPIAR FORMULARIO
function clearFormularyHermanos() {
    // --
    $('#txt_3_3_hermanos_nombres').val('')
    $('#txt_3_3_hermanos_edad').val('')
    $('#txt_3_3_hermanos_nivel_educativo').val('')
    $('#txt_3_3_hermanos_ocupacion').val('')
    $('#txt_3_3_hermanos_empresa_institucion').val('')
    $('#txt_3_3_hermanos_convive_usted').val('')
}



// -- HIJOS

// -- VARIABLES
var listHijos = new Array()
var indexListHijos = 1

// -- TABLE
var tableHijos = $('#tbl_3_3_list_hijos').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_3_3_agregar_hijos").on('click', function () {
    // --
    let txt_3_3_hijos_nombres = $('#txt_3_3_hijos_nombres').val()
    let txt_3_3_hijos_edad = $('#txt_3_3_hijos_edad').val()
    let txt_3_3_hijos_nivel_educativo = $('#txt_3_3_hijos_nivel_educativo').val()
    let txt_3_3_hijos_ocupacion = $('#txt_3_3_hijos_ocupacion').val()
    let txt_3_3_hijos_empresa_institucion = $('#txt_3_3_hijos_empresa_institucion').val()
    let txt_3_3_hijos_convive_usted = $('#txt_3_3_hijos_convive_usted').val()

    // -- Validar
    if (
        txt_3_3_hijos_nombres.length > 0 &&
        txt_3_3_hijos_edad.length > 0 &&
        txt_3_3_hijos_nivel_educativo.length > 0 &&
        txt_3_3_hijos_ocupacion.length > 0 &&
        txt_3_3_hijos_empresa_institucion.length > 0 &&
        txt_3_3_hijos_convive_usted.length > 0
    ) {
        // --
        let object = {
            "IdEntornoFamiliar": 0,
            "ItemEntornoFamiliar": 0,
            "IdParentesco": 5, // -- HIJO(A)
            "Nombres": txt_3_3_hijos_nombres,
            "Edad": validateNumber(txt_3_3_hijos_edad),
            "NivelEducativo": txt_3_3_hijos_nivel_educativo,
            "Ocupacion": txt_3_3_hijos_ocupacion,
            "EmpresaInstitucion": txt_3_3_hijos_empresa_institucion,
            "ConviveConUsted": txt_3_3_hijos_convive_usted
        }

        // -- Agregar objeto al listado
        listHijos.push(object)
        indexListHijos = tableHijos.rows().count() + 1

        // -- Agregar datos a la tabla
        tableHijos.row.add([
            indexListHijos,
            txt_3_3_hijos_nombres,
            txt_3_3_hijos_edad,
            txt_3_3_hijos_nivel_educativo,
            txt_3_3_hijos_ocupacion,
            txt_3_3_hijos_empresa_institucion,
            txt_3_3_hijos_convive_usted,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListHijos + '" id="btn_3_3_delete_row_hijos"> <i class="fa fa-trash"></i></button >'
        ]).draw(false);
        tableHijos.columns.adjust()
            .responsive.recalc();
        // --
        indexListHijos++
        clearFormularyHijos()
    } else {
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    }
})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_3_3_delete_row_hijos', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tableHijos.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tableHijos.row(index).remove().draw(false);
    // --
    let indexObject = listHijos.findIndex(x => x.index == value);
    listHijos.splice(indexObject, 1);
    // --
})

// -- LIMPIAR FORMULARIO
function clearFormularyHijos() {
    // --
    $('#txt_3_3_hijos_nombres').val('')
    $('#txt_3_3_hijos_edad').val('')
    $('#txt_3_3_hijos_nivel_educativo').val('')
    $('#txt_3_3_hijos_ocupacion').val('')
    $('#txt_3_3_hijos_empresa_institucion').val('')
    $('#txt_3_3_hijos_convive_usted').val('')
}




// -- ENTORNO PROFESIONAL Y LABORAL

// -- VARIABLES
var listEntornoProfesionalLaboral = new Array()
var indexListEntornoProfesionalLaboral = 1

// -- TABLE
var tableEntornoProfesionalLaboral = $('#tbl_3_4_list').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_3_4_agregar").on('click', function () {
    // --
    let txt_3_4_empresa = $('#txt_3_4_empresa').val()
    let txt_3_4_cargo = $('#txt_3_4_cargo').val()
    let txt_3_4_tiempo_laborado = $('#txt_3_4_tiempo_laborado').val()
    let txt_3_4_jefe_inmediato = $('#txt_3_4_jefe_inmediato').val()
    let txt_3_4_telefonos = $('#txt_3_4_telefonos').val()

    // -- Validar
    if (
        txt_3_4_empresa.length > 0 &&
        txt_3_4_cargo.length > 0 &&
        txt_3_4_tiempo_laborado.length > 0 &&
        txt_3_4_jefe_inmediato.length > 0 &&
        txt_3_4_telefonos.length > 0
    ) {
        // --
        let object = {
            "IdEntornoProf": 0,
            "ItemEntornoProf": 0,
            "Empresa": txt_3_4_empresa,
            "Cargo": txt_3_4_cargo,
            "TiempoLaborado": txt_3_4_tiempo_laborado,
            "JefeInmediato": txt_3_4_jefe_inmediato,
            "Telefonos": txt_3_4_telefonos
        }

        // -- Agregar objeto al listado
        listEntornoProfesionalLaboral.push(object)
        indexListEntornoProfesionalLaboral = tableEntornoProfesionalLaboral.rows().count() + 1

        // -- Agregar datos a la tabla
        tableEntornoProfesionalLaboral.row.add([
            indexListEntornoProfesionalLaboral,
            txt_3_4_empresa,
            txt_3_4_cargo,
            txt_3_4_tiempo_laborado,
            txt_3_4_jefe_inmediato,
            txt_3_4_telefonos,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListEntornoProfesionalLaboral + '" id="btn_3_4_delete_row"> <i class="fa fa-trash"></i></button >'
        ]).draw(false);
        tableEntornoProfesionalLaboral.columns.adjust()
            .responsive.recalc();
        // --
        indexListEntornoProfesionalLaboral++
        clearFormularyEntornoProfesionalLaboral()
    } else {
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    }
})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_3_4_delete_row', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tableEntornoProfesionalLaboral.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tableEntornoProfesionalLaboral.row(index).remove().draw(false);
    // --
    let indexObject = listEntornoProfesionalLaboral.findIndex(x => x.index == value);
    listEntornoProfesionalLaboral.splice(indexObject, 1);
})

// -- LIMPIAR FORMULARIO
function clearFormularyEntornoProfesionalLaboral() {
    // --
    $('#txt_3_4_empresa').val('')
    $('#txt_3_4_cargo').val('')
    $('#txt_3_4_tiempo_laborado').val('')
    $('#txt_3_4_jefe_inmediato').val('')
    $('#txt_3_4_telefonos').val('')
}




// -- VACIOS LABORALES Y/O INACTIVIDAD LABORAL

// -- VARIABLES
var listLaboral = new Array()
var indexListLaboral = 1

// -- TABLE
var tableLaboral = $('#tbl_3_5_list').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_3_5_agregar").on('click', function () {
    // --
    let txt_3_5_periodo = $('#txt_3_5_periodo').val()
    let txt_3_5_ocupacion = $('#txt_3_5_ocupacion').val()

    // -- Validar
    if (
        txt_3_5_periodo.length > 0 &&
        txt_3_5_ocupacion.length > 0
    ) {
        // --
        let object = {
            "IdInactLaboral": 0,
            "ItemInactLaboral": 0,
            "Periodo": txt_3_5_periodo,
            "Ocupacion": txt_3_5_ocupacion,
        }

        // -- Agregar objeto al listado
        listLaboral.push(object)
        indexListLaboral = tableLaboral.rows().count() + 1

        // -- Agregar datos a la tabla
        tableLaboral.row.add([
            indexListLaboral,
            txt_3_5_periodo,
            txt_3_5_ocupacion,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListLaboral + '" id="btn_3_5_delete_row"> <i class="fa fa-trash"></i></button >'
        ]).draw(false);
        tableLaboral.columns.adjust()
            .responsive.recalc();
        // --
        indexListLaboral++
        clearFormularyLaboral()
    } else {
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    }
})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_3_5_delete_row', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tableLaboral.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tableLaboral.row(index).remove().draw(false);
    // --
    let indexObject = listLaboral.findIndex(x => x.index == value);
    listLaboral.splice(indexObject, 1);
})

// -- LIMPIAR FORMULARIO
function clearFormularyLaboral() {
    // --
    $('#txt_3_5_periodo').val('')
    $('#txt_3_5_ocupacion').val('')
}




// -- RELACIÓN CON LA COMUNIDAD

// -- VARIABLES
var listRelacionComunidad = new Array()
var indexListRelacionComunidad = 1

// -- TABLE
var tableRelacionComunidad = $('#tbl_3_8_list').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_3_8_agregar").on('click', function () {
    // --
    var txt_3_8_relacion_comunidad_nombre = $('#txt_3_8_relacion_comunidad_nombre').val()
    var txt_3_8_relacion_comunidad_tiempo_conoce = $('#txt_3_8_relacion_comunidad_tiempo_conoce').val()
    var txt_3_8_relacion_comunidad_concepto = $('#txt_3_8_relacion_comunidad_concepto').val()

    // -- Validar
    if (
        txt_3_8_relacion_comunidad_nombre.length > 0 &&
        txt_3_8_relacion_comunidad_tiempo_conoce.length > 0 &&
        txt_3_8_relacion_comunidad_concepto.length > 0
    ) {
        // --
        let object = {
            "IdRelacionComunidad": 0,
            "IdCaracteristicaBas": 0,
            "Nombre": txt_3_8_relacion_comunidad_nombre,
            "TiempoConoce": txt_3_8_relacion_comunidad_tiempo_conoce,
            "Concepto": txt_3_8_relacion_comunidad_concepto
        }

        // -- Agregar objeto al listado
        listRelacionComunidad.push(object)
        indexListRelacionComunidad = tableRelacionComunidad.rows().count() + 1

        // -- Agregar datos a la tabla
        tableRelacionComunidad.row.add([
            indexListRelacionComunidad,
            txt_3_8_relacion_comunidad_nombre,
            txt_3_8_relacion_comunidad_tiempo_conoce,
            txt_3_8_relacion_comunidad_concepto,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListRelacionComunidad + '" id="btn_3_8_delete_row"> <i class="fa fa-trash"></i></button >'
        ]).draw(false);
        tableRelacionComunidad.columns.adjust()
            .responsive.recalc();
        // --
        indexListRelacionComunidad++
        clearFormularyRelacionComunidad()
    } else {
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    }
})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_3_8_delete_row', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tableRelacionComunidad.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tableRelacionComunidad.row(index).remove().draw(false);
    // --
    let indexObject = listRelacionComunidad.findIndex(x => x.index == value);
    listRelacionComunidad.splice(indexObject, 1);
})

// -- LIMPIAR FORMULARIO
function clearFormularyRelacionComunidad() {
    // --
    $('#txt_3_8_relacion_comunidad_nombre').val('')
    $('#txt_3_8_relacion_comunidad_tiempo_conoce').val('')
    $('#txt_3_8_relacion_comunidad_concepto').val('')
}


// -- GUARDAR
$('#btn_3_10_agregar').on('click', function () {
    var formData = new FormData();
    let idIntegridad = getDatos("key");
    var itemIntegridad = getDatos("item");

    const basicData = {
        "IdDatoBasico": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridad": itemIntegridad,
        "Nombre": $('#txt_1_1_nombre').val(),
        "Identificacion": $('#txt_1_1_identificacion').val(),
        "LugarNacimiento": $('#txt_1_1_lugar_nacimiento').val(),
        "FechaNacimiento": formatSave($('#txt_1_1_fecha_nacimiento').val()),
        "Nacionalidad": $('#txt_1_1_nacionalidad').val(),
        "Edad": $('#txt_1_1_edad').val(),
        "EstadoCivil": $('#txt_1_1_estado_civil').val()
    }

    const judicialProcesses = {
        "IdProcesoJudicial": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "NumProcesosContra": validateNumber($('#txt_1_2_procesos_contra').val()),
        "NumProcesosInterpuestos": validateNumber($('#txt_1_2_procesos_interpuestos').val()),
        "ListJudicialProceedingsDetailFlt": listProcesosJudiciales
    }

    const moneyLaundering = {
        "IdLavadoActivos": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "EvaluaNacionalRiesgo": validateNumber($('#txt_1_3_evaluacion_nacional_riesgo').val()),
        "ListMoneyLaunderingDetailFlt": listProcesoLavadoActivos
    }

    const nationalRestrictiveLists = {
        "IdListaRestrictivaNacional": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "ArchivoAntecFiscal": validateFileObject(listRestrictivasNacionales.ArchivoAdjunto_AntecFiscal, "file_1_5_antec_fiscal", "1_5AntecFiscal."),
        "ArchivoAntecDisciplinario": validateFileObject(listRestrictivasNacionales.ArchivoAdjunto_AntecDisciplinario, "file_1_5_antec_disciplinario", "1_5AntecDisciplinario"),
        "ArchivoSIMIT": validateFileObject(listRestrictivasNacionales.ArchivoAdjunto_SIMIT, "file_1_5_simit", "1_5Simit."),
        "ArchivoRUNT": validateFileObject(listRestrictivasNacionales.ArchivoAdjunto_RUNT, "file_1_5_runt", "1_5Runt."),
        "ArchivoConsulAfiliadosBDUA": validateFileObject(listRestrictivasNacionales.ArchivoAdjunto_ConsulAfiliadosBDUA, "file_1_5_consul_afiliados_bdua", "1_5BDUA."),
        "ArchivoPersoExpuestaPoliticamente": validateFileObject(listRestrictivasNacionales.ArchivoAdjunto_PersoExpuestaPoliticamente, "file_1_5_perso_expuesta_politicamente", "1_5PersExpPolit."),
        "ArchivoPoliciaNacional": validateFileObject(listRestrictivasNacionales.ArchivoAdjunto_PoliciaNacional, "file_1_5_policia_nacional", "1_5PoliciaNacional."),
    }

    const definitionMilitarySituation = {
        "IdDefSituacionMilitar": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "ArchivoDefSituacionMilitar": validateFileObject(listDefinicionSituacionMilitar.ArchivoDefSituacionMilitar, "file_1_6", "DefSitMilitar.")
    }

    const financialBehavior = {
        "IdComportamientoFinanciero": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "ArchivoCompFinanciero": validateFileObject(listComportamientoFinanciero.ArchivoCompFinanciero, "file_1_7", "CompFinanciero."),
    }

    const anexos = {
        "IdAnexo": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "ListAnexosDetFlt": listAnexos
    }

    const darkFactor = {
        "IdFactorOscuro": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "ArchivoAdjunto": validateFileObject(ListDarkFactor.ArchivoAdjunto, "file_2_1_factor_oscuro", "FactorOscuro.")
    }

    const socioEconomicReport = {
        "IdSocioEcon": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "FechaVisita": formatSave($('#txt_3_0_fecha_visita').val()),
        "Ciudad": $('#txt_3_0_ciudad').val(),
        "EmpSolicitante": $('#txt_3_0_empresa_solicitante').val(),
        "VisitDomAnter": $('#sl_3_0_visita_domiciliaria').val(),

    }

    const basicInformationCandidate = {
        "IdInfoBasicaCand": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "NombresApellidos": $('#txt_3_1_nombres_apellidos').val(),
        "IdTipoDocIdentidad": $('#sl_3_1_tipo_documento').val(),
        "NumDocIdentidad": $('#txt_3_1_nro').val(),
        "Lugar_FecNacimiento": $('#txt_3_1_lugar_fecha_nacimento').val(),
        "Edad": validateNumber($('#txt_3_1_edad').val()),
        "EstadoCivil": $('#sl_3_1_estado_civil').val(),
        "Direccion": $('#txt_3_1_direccion').val(),
        "Telefonos": $('#txt_3_1_telefonos').val(),
        "LibretaMilitar": $('#txt_3_1_libretas_militar').val(),
        "Clase": $('#txt_3_1_clase').val(),
        "Email": $('#txt_3_1_correo_electronico').val(),
        "EPS": $('#txt_3_1_eps').val(),
        "FondoPensiones": $('#txt_3_1_fondos_pensiones').val(),
        "FondoCesantias": $('#txt_3_1_fondos_cesantias').val(),
        "NivelEducativo": $('#txt_3_1_cargo_aplica').val(),
        "CargoAplica": $('#txt_3_1_cargo_aplica').val(),
        "ViajadoExterior": $('#sl_3_1_viaje_exterior').val(),
        "Motivo": $('#txt_3_1_motivo_viaje').val(),
    }

    const academicInformation = {
        "IdInfoAcademica": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "Actividades": $('#txt_3_2_activades').val(),
        "ProyectosYProyecciones": $('#txt_3_2_proyectos_proyecciones').val(),
        "AspectosCriRiesgo": $('#txt_3_2_aspectos_criticos_riesgo').val(),
        "ProbJusticia": $('#txt_3_2_problemas_justicia').val(),
        "ConsumEstupefacientes": $('#txt_3_2_consumidor_alcohol_drogas').val(),
        "PersonasPresenVisita": $('#txt_3_2_personas_presentes').val(),
        "ListAcademicInformationDetailFlt": [
            {
                "IdInfoAcademica": 0,
                "ItemInfoAcademica": 0,
                "Estudios": "Bachillerato",
                "Institucion": $('#txt_3_2_bachillerato_institucion').val(),
                "Titulo": $('#txt_3_2_bachillerato_titulo').val(),
                "Estado": $('#txt_3_2_bachillerato_estado').val(),
                "FecInicio": formatSave($('#txt_3_2_bachillerato_fecha_inicio').val()),
                "FecFin": formatSave($('#txt_3_2_bachillerato_fecha_terminacion').val())
            },
            {
                "IdInfoAcademica": 0,
                "ItemInfoAcademica": 0,
                "Estudios": "Tecnicos",
                "Institucion": $('#txt_3_2_tecnicos_institucion').val(),
                "Titulo": $('#txt_3_2_tecnicos_titulo').val(),
                "Estado": $('#txt_3_2_tecnicos_estado').val(),
                "FecInicio": formatSave($('#txt_3_2_tecnicos_fecha_inicio').val()),
                "FecFin": formatSave($('#txt_3_2_tecnicos_fecha_terminacion').val())
            },
            {
                "IdInfoAcademica": 0,
                "ItemInfoAcademica": 0,
                "Estudios": "Tecnologicos",
                "Institucion": $('#txt_3_2_tecnologicos_institucion').val(),
                "Titulo": $('#txt_3_2_tecnologicos_titulo').val(),
                "Estado": $('#txt_3_2_tecnologicos_estado').val(),
                "FecInicio": formatSave($('#txt_3_2_tecnologicos_fecha_inicio').val()),
                "FecFin": formatSave($('#txt_3_2_tecnologicos_fecha_terminacion').val())
            },
            {
                "IdInfoAcademica": 0,
                "ItemInfoAcademica": 0,
                "Estudios": "Universitarios",
                "Institucion": $('#txt_3_2_universitarios_institucion').val(),
                "Titulo": $('#txt_3_2_universitarios_titulo').val(),
                "Estado": $('#txt_3_2_universitarios_estado').val(),
                "FecInicio": formatSave($('#txt_3_2_universitarios_fecha_inicio').val()),
                "FecFin": formatSave($('#txt_3_2_universitarios_fecha_terminacion').val())
            },
            {
                "IdInfoAcademica": 0,
                "ItemInfoAcademica": 0,
                "Estudios": "Postgrado",
                "Institucion": $('#txt_3_2_postgrado_institucion').val(),
                "Titulo": $('#txt_3_2_postgrado_titulo').val(),
                "Estado": $('#txt_3_2_postgrado_estado').val(),
                "FecInicio": formatSave($('#txt_3_2_postgrado_fecha_inicio').val()),
                "FecFin": formatSave($('#txt_3_2_postgrado_fecha_terminacion').val())
            },
            {
                "IdInfoAcademica": 0,
                "ItemInfoAcademica": 0,
                "Estudios": "Otros Cursos",
                "Institucion": $('#txt_3_2_otros_institucion').val(),
                "Titulo": $('#txt_3_2_otros_titulo').val(),
                "Estado": $('#txt_3_2_otros_estado').val(),
                "FecInicio": formatSave($('#txt_3_2_otros_fecha_inicio').val()),
                "FecFin": formatSave($('#txt_3_2_otros_fecha_terminacion').val())
            }
        ]
    }

    const familyEnvironment = {
        "IdEntornoFamiliar": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "ListFamilyEnvironmentDetailFlt": [
            {
                "IdEntornoFamiliar": 0,
                "ItemEntornoFamiliar": 0,
                "IdParentesco": 1,
                "Nombres": $('#txt_3_3_padre_nombres').val(),
                "Edad": validateNumber($('#txt_3_3_padre_edad').val()),
                "NivelEducativo": $('#txt_3_3_padre_nivel_educativo').val(),
                "Ocupacion": $('#txt_3_3_padre_ocupacion').val(),
                "EmpresaInstitucion": $('#txt_3_3_padre_empresa_institucion').val(),
                "ConviveConUsted": $('#txt_3_3_padre_convive_usted').val()
            },
            {
                "IdEntornoFamiliar": 0,
                "ItemEntornoFamiliar": 0,
                "IdParentesco": 2,
                "Nombres": $('#txt_3_3_madre_nombres').val(),
                "Edad": validateNumber($('#txt_3_3_madre_edad').val()),
                "NivelEducativo": $('#txt_3_3_madre_nivel_educativo').val(),
                "Ocupacion": $('#txt_3_3_madre_ocupacion').val(),
                "EmpresaInstitucion": $('#txt_3_3_madre_empresa_institucion').val(),
                "ConviveConUsted": $('#txt_3_3_madre_convive_usted').val()
            },
            {
                "IdEntornoFamiliar": 0,
                "ItemEntornoFamiliar": 0,
                "IdParentesco": 4, // -- CONYUGUE
                "Nombres": $('#txt_3_3_conyugue_nombres').val(),
                "Edad": validateNumber($('#txt_3_3_conyugue_edad').val()),
                "NivelEducativo": $('#txt_3_3_conyugue_nivel_educativo').val(),
                "Ocupacion": $('#txt_3_3_conyugue_ocupacion').val(),
                "EmpresaInstitucion": $('#txt_3_3_conyugue_empresa_institucion').val(),
                "ConviveConUsted": $('#txt_3_3_conyugue_convive_usted').val()
            },
        ],
    }

    const professionalEnvironment = {
        "IdEntornoProf": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "ListProfessionalEnvironmentDetailFlt": listEntornoProfesionalLaboral
    }

    const workInactivity = {
        "IdInactLaboral": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "RazonCambioEmpleo": $('#txt_3_5_razones_cambio_empleo').val(),
        "MotivoCambioEmpleo": $('#txt_3_5_motivos_cambio_empleo').val(),
        "EmpleoIdeal": $('#txt_3_5_empleo_ideal').val(),
        "AspiracionSalarial": $('#txt_3_5_aspiracion_salarial').val(),
        "ConocimientoEmpresa": $('#txt_3_5_conocimiento_empresa').val(),
        "HojaVidaAEmpresa": $('#txt_3_5_hoja_vida_empresa').val(),
        "PersonaDentroEmpresa": $('#txt_3_5_persona_dentro_empresa').val(),
        "ListWorkInactivityDetailFlt": listLaboral,
    }

    const economicInformation = {
        "IdInfoEconomica": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "CtaBienesComerciales": $('#txt_3_6_comerciales_nombre').val(),
        "ReportadoDataCredito": $('#txt_3_6_data_credito').val(),
        "TotalIngresos": validateNumber($('#txt_3_6_ingresos_mensuales_total_ingresos').val()),
        "TotalEgresos": validateNumber($('#txt_3_6_gastos_mensuales_total_egresos').val()),
        "ListEconomicInformationDetailFlt": [
            {
                "IdInfoEconomica": 0,
                "ItemInfoEconomica": 0,
                "IngresosMensuales": "Ingresos Fijos",
                "ValorIngresoMensual": validateNumber($('#txt_3_6_ingresos_mensuales_ingresos_fijos').val()),
                "GastosMensuales": "Gastos Fijos",
                "ValorGastoMensual": validateNumber($('#txt_3_6_gastos_mensuales_gastos_fijos').val())
            },
            {
                "IdInfoEconomica": 0,
                "ItemInfoEconomica": 0,
                "IngresosMensuales": "Apoyo Económico",
                "ValorIngresoMensual": validateNumber($('#txt_3_6_ingresos_mensuales_apoyo_economico').val()),
                "GastosMensuales": "Créditos",
                "ValorGastoMensual": validateNumber($('#txt_3_6_gastos_mensuales_creditos').val())
            },
            {
                "IdInfoEconomica": 0,
                "ItemInfoEconomica": 0,
                "IngresosMensuales": "Otros Ingresos",
                "ValorIngresoMensual": validateNumber($('#txt_3_6_ingresos_mensuales_otros_ingresos').val()),
                "GastosMensuales": "Otros Gastos",
                "ValorGastoMensual": validateNumber($('#txt_3_6_gastos_mensuales_valor').val())
            }
        ],
    }

    const healthSituation = {
        "IdSituacionSalud": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "MiembroPrstaTipoEnfermedad": $('#txt_3_7_familia_tipo_enfermedad').val(),
        "MiembroEnfermedadPresenta": $('#txt_3_7_familia_enfermedad').val(),
        "MiembroMedicamentoIngiere": $('#txt_3_7_familia_tipo_medicamento_ingiere').val(),
        "MiembroTiempoPadeceEnfermedad": $('#txt_3_7_familia_tiempo_enfermedad').val(),
        "MiembroObservaciones": $('#txt_3_7_familia_observaciones').val(),
        "UdPstaTipoEnfermedad": $('#txt_3_7_usted_tipo_enfermedad').val(),
        "UdEnfermedadPresenta": $('#txt_3_7_usted_enfermedad').val(),
        "UdMedicamentoIngiere": $('#txt_3_7_usted_tipo_medicamento_ingiere').val(),
        "UdTiempoPadeceEnfermedad": $('#txt_3_7_usted_tiempo_enfemerdad').val(),
        "UdObservaciones": $('#txt_3_7_usted_observaciones').val(),
    }

    const basicHousingFeatures = {
        "IdCaracteristicaBas": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "EstratoSocial": $('#txt_3_8_estrato_social').val(),
        "Ubicacion": $('#txt_3_8_ubicacion').val(),
        "TiempoResidencia": $('#txt_3_8_tiempo_residencia').val(),
        "Tipo": $('#sl_3_8_tipo').val(),
        "ApreciacionInterna": $('#sl_3_8_aprecion_interna').val(),
        "ApreciacionExterna": $('#sl_3_8_aprecion_externa').val(),
        "ListServiciosPublicos": check_servicios_publicos,
        "ListServiciosInstalados": check_servicios_instalados,
        "Estado": $('#sl_3_8_estado').val(),
        "ServAlcantarillado": $('#sl_3_8_servicio_alcantarillado').val(),
        "UbicacionVivienda": $('#sl_3_8_ubicacion').val(),
        "Distribucion": $('#sl_3_8_distribucion').val(),
        "AmbienteSector": $('#sl_3_8_ambiente_sector').val(),
        "ViasAcceso": $('#sl_3_8_vias_acceso').val(),
        "Propiedad": $('#sl_3_8_propiedad').val(),
        "Concepto": $('#txt_3_8_concepto').val(),
        "ListCommunityRelationShipFlt": listRelacionComunidad
    }


    // REVIEW
    var check_servicios_publicos = $('[name="check_servicios_publicos[]"]:checked').map(function () {
        return this.value;
    }).get();
    check_servicios_publicos = check_servicios_publicos.join('|')

    var check_servicios_instalados = $('[name="check_servicios_instalados[]"]:checked').map(function () {
        return this.value;
    }).get();
    check_servicios_instalados = check_servicios_instalados.join('|')
    // END REVIEW

    const assessmentEvaluator = {
        "IdApreciacionEvaluador": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "Resultado": $('#sl_3_9_resultado').val(),
        "RealizadoPor": $('#txt_3_9_realizado_por').val(),
        "Firma": $('#txt_3_9_firma').val()
    }

    const photographicRecord = {
        "IdRegistroFotografico": 0,
        "IdIntegridad": idIntegridad,
        "ItemIntegridadDet": itemIntegridad,
        "ArchivoAdjunto_EntradaDomicilio": validateFileObject(ListPhotografym.ArchivoAdjunto_EntradaDomicilio, "file_3_10_foto_entrada_domicilio", "FotoEntradaDomicilio."),
        "Observaciones_EntradaDomicilio": $('#txt_3_10_candidato_observaciones').val(),
        "ArchivoAdjunto_AmbSocial": validateFileObject(ListPhotografym.ArchivoAdjunto_AmbSocial, "file_3_10_foto_ambiente_social", "FotoAmbienteSocial."),
        "Observaciones_AmbSocial": $('#txt_3_10_ambiente_social_observaciones').val(),
        "ArchivoAdjunto_Habitaciones": validateFileObject(ListPhotografym.ArchivoAdjunto_Habitaciones, "file_3_10_foto_habitaciones", "FotoHabitaciones."),
        "Observaciones_Habitaciones": $('#txt_3_10_habitaciones_observaciones').val(),
        "ArchivoAdjunto_Cocina": validateFileObject(ListPhotografym.ArchivoAdjunto_Cocina, "file_3_10_foto_cocina", "FotoCocina."),
        "Observaciones_Cocina": $('#txt_3_10_cocina_observaciones').val()
    }

    var objectData = {
        "oBasicDataFlt": basicData,
        "oJudicialProceedingsFlt": judicialProcesses,
        "oMoneyLaunderingFlt": moneyLaundering,
        "oNationalRestrictiveListsFlt": nationalRestrictiveLists,
        "oDefinitionMilitarySituationFlt": definitionMilitarySituation,
        "oFinancialBehaviorFlt": financialBehavior,
        "oAnexosFlt": anexos,
        "oSocioeconomicReportFlt": socioEconomicReport,
        "oBasicCandidateInformation": basicInformationCandidate,
        "oAcademicInformationFlt": academicInformation,
        "oFamilyEnvironmentFlt": familyEnvironment,
        "oProfessionalEnvironmentFlt": professionalEnvironment,
        "oWorkInactivityFlt": workInactivity,
        "oEconomicInformationFlt": economicInformation,
        "oHealthSituationFlt": healthSituation,
        "oBasicHousingFeaturesFlt": basicHousingFeatures,
        "oAssessmentEvaluatorFlt": assessmentEvaluator,
        "oPhotographicRecordFlt": photographicRecord,
        "oDarkFactorFlt": darkFactor,
    }

    if (listFilesAnexos) {
        listFilesAnexos.forEach((element) => {
            var ext = getFileExtension(element.name)
            formData.append("dataFile", element, "Anexo_" + element.id + "." + ext);
        })
    }

    listHermanos.forEach((element) => {
        objectData.oFamilyEnvironmentFlt.ListFamilyEnvironmentDetailFlt.push(element)
    })
    listHijos.forEach((element) => {
        objectData.oFamilyEnvironmentFlt.ListFamilyEnvironmentDetailFlt.push(element)
    })


    // -- I. INFORME ANTECEDENTES JUDICIALES
    var camposVacios = ""
    // --
    if ($('#txt_1_1_nombre').val() == "") {                            // -- 1.1 DATOS BASICOS DEL CANDIDATO
        camposVacios += "<span>1.1 DATOS BASICOS DEL CANDIDATO</span>"
    }
    if (listProcesosJudiciales.length < 1) {                // -- 1.2 PROCESOS JUDICIALES
        camposVacios += "<br><span>1.2 PROCESOS JUDICIALES</span> "
    }
    if (listProcesoLavadoActivos.length < 1) {                   // -- 1.3 PROCESOS LAVADO DE ACTIVOS
        camposVacios += "<br><span>1.3 PROCESOS LAVADO DE ACTIVOS</span>"
    }
    //if (txt_1_8_nombre_empresa == "" ||
    //    txt_1_8_cargo_desempenado == "" ||
    //    txt_1_8_fecha_inicio == "" ||
    //    txt_1_8_fecha_termino == "" ||
    //    txt_1_8_motivo_retiro == "" ||
    //    txt_1_8_tiempo_experiencia == "" ||
    //    txt_1_8_persona_brinda_infomacion == "" ||
    //    txt_1_8_cargo == "" ||
    //    txt_1_8_telefonos_correo == "" ||
    //    txt_1_8_experiencia_cargo_postula == "" ||
    //    txt_1_8_experiencia_especifica == "" ||
    //    sl_1_8_desempeno == "" ||
    //    sl_1_8_volveria_contratar == "") {                // -- 1.8 VERIFICACIONES LABORALES
    //    camposVacios += "<br><span>1.8 VERIFICACIONES LABORALES</span>"
    //}
    //if (txt_1_9_nombre_institucion == "" ||
    //    txt_1_9_titulo_grado == "" ||
    //    txt_1_9_fecha_finalizacion == "" ||
    //    txt_1_9_estudio_terminado_proceso == "" ||
    //    sl_1_9_acta_folio_diploma == "" ||
    //    txt_1_9_persona_brinda_infomacion == "" ||
    //    txt_1_9_cargo == "" ||
    //    txt_1_9_telefono == "" ||
    //    txt_1_9_correo == "") {            // --  1.9 VERIFICACIONES ACADÉMICAS
    //    camposVacios += "<br><span>1.9 VERIFICACIONES ACADÉMICAS</span>"
    //}

    // -- II. INFORME SOCIOECONÓMICO

    if (                                                    // -- 3.0 FORMULARIO
        txt_3_1_nombres_apellidos == "" ||
        txt_3_1_cargo_aplica == "") {
        camposVacios += "<br><span>3.0 FORMULARIO</span>"
    }
    if (                                                    // -- 3.2 INFORMACIÓN ACADEMICA
        txt_3_2_bachillerato_institucion == "" ||
        txt_3_2_tecnicos_institucion == "" ||
        txt_3_2_tecnologicos_institucion == "" ||
        txt_3_2_universitarios_institucion == "" ||
        txt_3_2_universitarios_institucion == "" ||
        txt_3_2_otros_institucion == "" ||
        txt_3_2_activades == ""
    ) {
        camposVacios += "<br><span>3.2 INFORMACIÓN ACADEMICA</span>"
    }
    if (                                                    // -- 3.3 ENTORNO FAMILIAR
        txt_3_3_padre_nombres == "" ||
        txt_3_3_madre_nombres == "" ||
        txt_3_3_conyugue_nombres == "" ||
        listHermanos.length < 1 ||
        listHermanos.length < 1
    ) {
        camposVacios += "<br><span>3.3 ENTORNO FAMILIAR</span>"
    }
    if (listEntornoProfesionalLaboral.length < 1) {         // -- 3.4 ENTORNO PROFESIONAL Y LABORAL
        camposVacios += "<br><span>3.4 ENTORNO PROFESIONAL Y LABORAL</span>"
    }
    if (                                                    // -- 3.5 VACIOS LABORALES Y/O INACTIVIDAD LABORAL
        listLaboral.length < 1 ||
        txt_3_5_razones_cambio_empleo == ""
    ) {
        camposVacios += "<br><span>3.5 VACIOS LABORALES Y/O INACTIVIDAD LABORAL</span>"
    }
    if (                                                    // -- 3.6 INFORMACION ECONÓMICA
        txt_3_6_ingresos_mensuales_ingresos_fijos == "" ||
        txt_3_6_gastos_mensuales_gastos_fijos == "" ||
        txt_3_6_comerciales_nombre == ""
    ) {
        camposVacios += "<br><span>3.6 INFORMACION ECONÓMICA</span>"
    }
    if (                                                    // -- 3.7 SITUACION DE SALUD
        txt_3_7_familia_tipo_enfermedad == "" ||
        txt_3_7_familia_enfermedad == ""
    ) {
        camposVacios += "<br><span>3.7 SITUACION DE SALUD</span>"
    }
    if (                                                    // -- 3.8 CARACTERISTICAS BASICAS DE LA VIVIENDA
        txt_3_8_estrato_social == "" ||
        txt_3_8_ubicacion == "" ||
        txt_3_8_tiempo_residencia == "" ||
        listRelacionComunidad.length < 1
    ) {
        camposVacios += "<br><span>3.8 CARACTERISTICAS BASICAS DE LA VIVIENDA</span>"
    }
    if (                                                    // -- 3.9 APRECIACIÓN DEL EVALUADOR
        sl_3_9_resultado == "" ||
        txt_3_9_realizado_por == ""
    ) {
        camposVacios += "<br><span>3.9 APRECIACIÓN DEL EVALUADOR</span>"
    }


    // --
    formData.append(
        "JsonMaster",
        JSON.stringify(objectData)
    );
    // --

    console.log(objectData);
    
    if (camposVacios != "") {
        Swal.queue([{
            icon: 'warning',
            title: 'Formularios incompletos...',
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
                    url: urlSaveorUpdateIntegrity270Colombia,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        console.log('DATA', data)
                        var typeAlert = (data.response.status == "OK") ? 'success' : 'error';
                        var Message = (data.response.status == "OK") ? 'Se guardo la información correctamente' : 'Ocurrio un problema, Comuniquese con sistemas';
                        // --
                        Swal.queue([{
                            title: 'Guardar información',
                            confirmButtonText: 'OK',
                            text: Message,
                            icon: typeAlert,
                            showLoaderOnConfirm: true,
                            preConfirm: () => {
                                console.log('guardado');
                                //return fetch()
                                //    .then(window.location.reload())
                                //    .catch(() => {
                                //    })
                            }
                        }]);
                    }
                });
            }
        }])
    } else {
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
                return $.ajax({
                    type: "POST",
                    url: urlSaveorUpdateIntegrity270Colombia,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        console.log('DATA', data)
                        var typeAlert = (data.response.status == "OK") ? 'success' : 'error';
                        var Message = (data.response.status == "OK") ? 'Se guardo la información correctamente' : 'Ocurrio un problema, Comuniquese con sistemas';
                        // --
                        Swal.queue([{
                            title: 'Guardar información',
                            confirmButtonText: 'OK',
                            text: Message,
                            icon: typeAlert,
                            showLoaderOnConfirm: true,
                            preConfirm: () => {
                                console.log('guardado');
                                //return fetch()
                                //    .then(window.location.reload())
                                //    .catch(() => {
                                //    })
                            }
                        }]);
                    }
                });
            }
        }])
    }
})


function getListStatusCivil() {
    console.log(UrlGetStatusCivil);
    // --
    $.ajax({
        url: UrlGetStatusCivil,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // --
            let html = ''
            html += '<option value=0>[Seleccionar]</option>'
            // --
            let obj = data.Data
            // --
            if (obj.length > 0) { // -- Verificar si tiene datos
                // --
                $.each(obj, function (key, value) {
                    // --
                    html += '<option value="' + value.IdEstadoCivil + '"> ' + value.DesEstadoCivil + '</option>'
                });
            }
            // --
            $('.ClassStatusCivil').html(html);
        }
    })
}

function getListDocumentType() {
    // --
    $.ajax({
        url: UrlGetDocumentType,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            // --
            let html = ''
            html += '<option value=0>[Seleccionar]</option>'
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
            $('.ClassDocumentType').html(html);
        }
    })
}

// --
function getList270Colombia() {
    let idIntegridad = getDatos("key")
    let Item = getDatos("item")
    // --
    let url = urlGetRiskAnalysisFormat270Colombia + "?IdIntegridad=" + idIntegridad + "&ItemIntegridadDet=" + Item
    // --
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        success: function (data) {
            let obj = data.Data
            console.log(obj);
            if (obj != null) {
                // -- 1.1 DATOS BASICOS DEL CANDIDATO
                if (obj.oBasicDataVm != null) {
                    // --
                    $('#txt_1_1_nombre').val(obj.oBasicDataVm.Nombre)
                    $('#txt_1_1_identificacion').val(obj.oBasicDataVm.Identificacion)
                    $('#txt_1_1_lugar_nacimiento').val(obj.oBasicDataVm.LugarNacimiento)
                    $('#txt_1_1_fecha_nacimiento').val(obj.oBasicDataVm.FechaNacimiento)
                    $('#txt_1_1_nacionalidad').val(obj.oBasicDataVm.Nacionalidad)
                    $('#txt_1_1_edad').val(obj.oBasicDataVm.Edad)
                    $('#txt_1_1_estado_civil').val(obj.oBasicDataVm.IdEstadoCivil)
                }

                // -- 1.2 PROCESOS JUDICIALES
                if (obj.oJudicialProceedingsVm != null) {
                    // --
                    $('#txt_1_2_procesos_contra').val(obj.oJudicialProceedingsVm.NumProcesosContra)
                    $('#txt_1_2_procesos_interpuestos').val(obj.oJudicialProceedingsVm.NumProcesosInterpuestos)

                    let lista = obj.oJudicialProceedingsVm.ListJudicialProceedingsDetailVm
                    listProcesosJudiciales = lista
                    lista.forEach((element) => {
                        let index = tableProcesosJudiciales.rows().count() + 1;
                        tableProcesosJudiciales.row.add([
                            index,
                            element.Ciudad,
                            element.Despacho,
                            element.Proceso,
                            element.Clase,
                            element.Demandantes,
                            element.Demandados,
                            ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_1_2_delete_row"> <i class="fa fa-trash"></i></button >'
                        ]).draw(false);
                        tableProcesosJudiciales.columns.adjust()
                            .responsive.recalc();
                    })
                }

                // -- 1.3 PROCESO LAVADO DE ACTIVOS
                if (obj.oMoneyLaunderingVm != null) {
                    // --
                    $('#txt_1_3_evaluacion_nacional_riesgo').val(obj.oMoneyLaunderingVm.EvaluaNacionalRiesgo)

                    let lista = obj.oMoneyLaunderingVm.ListMoneyLaunderingDetailVm
                    listProcesoLavadoActivos = lista
                    lista.forEach((element) => {
                        let index = tableLavadoActivos.rows().count() + 1;
                        tableLavadoActivos.row.add([
                            index,
                            element.Ciudad,
                            element.Despacho,
                            element.Proceso,
                            element.Clase,
                            element.Demandantes,
                            element.Demandados,
                            ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_1_3_delete_row"> <i class="fa fa-trash"></i></button >'
                        ]).draw(false);
                        tableLavadoActivos.columns.adjust()
                            .responsive.recalc();
                    })
                }

                // -- 1.5 
                if (obj.oNationalRestrictiveListsVm != null) {
                    // --
                    listRestrictivasNacionales = obj.oNationalRestrictiveListsVm
                    // --
                    if (obj.oNationalRestrictiveListsVm.ArchivoAdjunto_AntecFiscal != null) {
                        $("#PreviewAntecFiscal button").attr("data-typefile", obj.oNationalRestrictiveListsVm.ArchivoAdjunto_AntecFiscal.ExtensionArchivo);
                        $("#PreviewAntecFiscal button").attr("data-route", btoa(obj.oNationalRestrictiveListsVm.ArchivoAdjunto_AntecFiscal.RutaArchivo));
                        $("#PreviewAntecFiscal span").text(obj.oNationalRestrictiveListsVm.ArchivoAdjunto_AntecFiscal.NombreArchivo);
                    }

                    if (obj.oNationalRestrictiveListsVm.ArchivoAdjunto_AntecDisciplinario != null) {
                        $("#PreviewAntecDisciplinario button").attr("data-typefile", obj.oNationalRestrictiveListsVm.ArchivoAdjunto_AntecDisciplinario.ExtensionArchivo);
                        $("#PreviewAntecDisciplinario button").attr("data-route", btoa(obj.oNationalRestrictiveListsVm.ArchivoAdjunto_AntecDisciplinario.RutaArchivo));
                        $("#PreviewAntecDisciplinario span").text(obj.oNationalRestrictiveListsVm.ArchivoAdjunto_AntecDisciplinario.NombreArchivo);
                    }

                    if (obj.oNationalRestrictiveListsVm.ArchivoAdjunto_RUNT != null) {
                        $("#PreviewRUNT button").attr("data-typefile", obj.oNationalRestrictiveListsVm.ArchivoAdjunto_RUNT.ExtensionArchivo);
                        $("#PreviewRUNT button").attr("data-route", btoa(obj.oNationalRestrictiveListsVm.ArchivoAdjunto_RUNT.RutaArchivo));
                        $("#PreviewRUNT span").text(obj.oNationalRestrictiveListsVm.ArchivoAdjunto_RUNT.NombreArchivo);
                    }

                    if (obj.oNationalRestrictiveListsVm.ArchivoAdjunto_ConsulAfiliadosBDUA != null) {
                        $("#PreviewConsulAfiliadosBDUA button").attr("data-typefile", obj.oNationalRestrictiveListsVm.ArchivoAdjunto_ConsulAfiliadosBDUA.ExtensionArchivo);
                        $("#PreviewConsulAfiliadosBDUA button").attr("data-route", btoa(obj.oNationalRestrictiveListsVm.ArchivoAdjunto_ConsulAfiliadosBDUA.RutaArchivo));
                        $("#PreviewConsulAfiliadosBDUA span").text(obj.oNationalRestrictiveListsVm.ArchivoAdjunto_ConsulAfiliadosBDUA.NombreArchivo);
                    }

                    if (obj.oNationalRestrictiveListsVm.ArchivoAdjunto_PersoExpuestaPoliticamente != null) {
                        $("#PreviewPersoExpuestaPoliticamente button").attr("data-typefile", obj.oNationalRestrictiveListsVm.ArchivoAdjunto_PersoExpuestaPoliticamente.ExtensionArchivo);
                        $("#PreviewPersoExpuestaPoliticamente button").attr("data-route", btoa(obj.oNationalRestrictiveListsVm.ArchivoAdjunto_PersoExpuestaPoliticamente.RutaArchivo));
                        $("#PreviewPersoExpuestaPoliticamente span").text(obj.oNationalRestrictiveListsVm.ArchivoAdjunto_PersoExpuestaPoliticamente.NombreArchivo);
                    }

                    if (obj.oNationalRestrictiveListsVm.ArchivoAdjunto_PoliciaNacional != null) {
                        $("#PreviewPoliciaNacional button").attr("data-typefile", obj.oNationalRestrictiveListsVm.ArchivoAdjunto_PoliciaNacional.ExtensionArchivo);
                        $("#PreviewPoliciaNacional button").attr("data-route", btoa(obj.oNationalRestrictiveListsVm.ArchivoAdjunto_PoliciaNacional.RutaArchivo));
                        $("#PreviewPoliciaNacional span").text(obj.oNationalRestrictiveListsVm.ArchivoAdjunto_PoliciaNacional.NombreArchivo);
                    }


                    if (obj.oNationalRestrictiveListsVm.ArchivoAdjunto_SIMIT != null) {
                        $("#PreviewSIMIT button").attr("data-typefile", obj.oNationalRestrictiveListsVm.ArchivoAdjunto_SIMIT.ExtensionArchivo);
                        $("#PreviewSIMIT button").attr("data-route", btoa(obj.oNationalRestrictiveListsVm.ArchivoAdjunto_SIMIT.RutaArchivo));
                        $("#PreviewSIMIT span").text(obj.oNationalRestrictiveListsVm.ArchivoAdjunto_SIMIT.NombreArchivo);
                    }
                }

                // -- 1.6
                if (obj.oDefinitionMilitarySituationVm != null) {

                    // --
                    if (obj.oDefinitionMilitarySituationVm.ArchivoAdjunto != null) {
                        // --
                        listDefinicionSituacionMilitar = obj.oDefinitionMilitarySituationVm
                        // --
                        $("#PreviewStuacionMilitar button").attr("data-typefile", obj.oDefinitionMilitarySituationVm.ArchivoAdjunto.ExtensionArchivo)
                        $("#PreviewStuacionMilitar button").attr("data-route", btoa(obj.oDefinitionMilitarySituationVm.ArchivoAdjunto.RutaArchivo))
                        $("#PreviewStuacionMilitar span").text(obj.oDefinitionMilitarySituationVm.ArchivoAdjunto.NombreArchivo)
                    }

                }

                // -- 1.7

                if (obj.oFinancialBehaviorVm != null) {

                    // --
                    if (obj.oFinancialBehaviorVm.ArchivoCompFinanciero != null) {
                        // --
                        listComportamientoFinanciero = obj.oFinancialBehaviorVm
                        // --
                        $("#PreviewComportamientoFinanciero button").attr("data-typefile", obj.oFinancialBehaviorVm.ArchivoCompFinanciero.ExtensionArchivo)
                        $("#PreviewComportamientoFinanciero button").attr("data-route", btoa(obj.oFinancialBehaviorVm.ArchivoCompFinanciero.RutaArchivo))
                        $("#PreviewComportamientoFinanciero span").text(obj.oFinancialBehaviorVm.ArchivoCompFinanciero.NombreArchivo)
                    }

                }

                // -- 1.8 ANEXOS
                if (obj.oAnexosVm != null) {
                    // --
                    let lista = obj.oAnexosVm.ListAnexosDetailVm
                    listAnexos = lista
                    lista.forEach((element) => {
                        // --
                        let index = tableAnexos.rows().count() + 1
                        // --
                        tableAnexos.row.add([
                            index,
                            'Anexo_' + index,
                            ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_1_11_delete_row"> <i class="fa fa-trash"></i></button >'
                        ]).draw(false);
                        tableAnexos.columns.adjust()
                            .responsive.recalc();
                    })
                }


                // -- 2.0 FACTOR OSCURO
                if (obj.oDarkFactorVm != null) {
                    // --
                    if (obj.oDarkFactorVm.ArchivoAdjunto != null) {
                        // --
                        ListDarkFactor = obj.oDarkFactorVm

                        //$("#PreviewReniec button").attr("data-typefile", obj.oSheetReniecVm.FotoAdjunta.ExtensionArchivo)
                        //$("#PreviewReniec button").attr("data-route", btoa(obj.oSheetReniecVm.FotoAdjunta.RutaArchivo))
                        $("#PreviewFactorOscuro span").text(obj.oDarkFactorVm.ArchivoAdjunto.NombreArchivo)
                    }
                }


                // -- 3.0
                if (obj.oSocioeconomicReportVm != null) {
                    // --
                    $('#txt_3_0_fecha_visita').val(formatDate(obj.oSocioeconomicReportVm.FechaVisita))
                    $('#txt_3_0_ciudad').val(obj.oSocioeconomicReportVm.Ciudad)
                    $('#txt_3_0_empresa_solicitante').val(obj.oSocioeconomicReportVm.EmpSolicitante)
                    $('#sl_3_0_visita_domiciliaria').val(convertToString(obj.oSocioeconomicReportVm.VisitDomAnter))
                }


                // -- 3.1 INFORMACION BASICA DEL CANDIDATO
                if (obj.oBasicCandidateInformationVm != null) {
                    // --
                    $('#txt_3_1_nombres_apellidos').val(obj.oBasicCandidateInformationVm.NombresApellidos)
                    $('#sl_3_1_tipo_documento').val(obj.oBasicCandidateInformationVm.IdTipoDocIdentidad)
                    $('#txt_3_1_nro').val(obj.oBasicCandidateInformationVm.NumDocIdentidad)
                    $('#txt_3_1_lugar_fecha_nacimento').val(obj.oBasicCandidateInformationVm.Lugar_FecNacimiento)
                    $('#txt_3_1_edad').val(obj.oBasicCandidateInformationVm.Edad)
                    $('#sl_3_1_estado_civil').val(obj.oBasicCandidateInformationVm.EstadoCivil)
                    $('#txt_3_1_direccion').val(obj.oBasicCandidateInformationVm.Direccion)
                    $('#txt_3_1_telefonos').val(obj.oBasicCandidateInformationVm.Telefonos)
                    $('#txt_3_1_libretas_militar').val(obj.oBasicCandidateInformationVm.LibretaMilitar)
                    $('#txt_3_1_clase').val(obj.oBasicCandidateInformationVm.Clase)
                    $('#txt_3_1_correo_electronico').val(obj.oBasicCandidateInformationVm.Email)
                    $('#txt_3_1_eps').val(obj.oBasicCandidateInformationVm.EPS)
                    $('#txt_3_1_fondos_pensiones').val(obj.oBasicCandidateInformationVm.FondoPensiones)
                    $('#txt_3_1_fondos_cesantias').val(obj.oBasicCandidateInformationVm.FondoCesantias)
                    $('#txt_3_1_nivel_educativo').val(obj.oBasicCandidateInformationVm.NivelEducativo)
                    $('#txt_3_1_cargo_aplica').val(obj.oBasicCandidateInformationVm.CargoAplica)
                    $('#sl_3_1_viaje_exterior').val(convertToString(obj.oBasicCandidateInformationVm.ViajadoExterior))
                    $('#txt_3_1_motivo_viaje').val(obj.oBasicCandidateInformationVm.Motivo)
                }

                // -- 3.2 INFORMACIÓN ACADEMICA
                if (obj.oAcademicInformationVm != null) {
                    // --
                    $('#txt_3_2_activades').val(obj.oAcademicInformationVm.Actividades)
                    $('#txt_3_2_proyectos_proyecciones').val(obj.oAcademicInformationVm.ProyectosYProyecciones)
                    $('#txt_3_2_aspectos_criticos_riesgo').val(obj.oAcademicInformationVm.AspectosCriRiesgo)
                    $('#txt_3_2_problemas_justicia').val(obj.oAcademicInformationVm.ProbJusticia)
                    $('#txt_3_2_consumidor_alcohol_drogas').val(obj.oAcademicInformationVm.ConsumEstupefacientes)
                    $('#txt_3_2_personas_presentes').val(obj.oAcademicInformationVm.PersonasPresenVisita)

                    // -- List
                    $('#txt_3_2_bachillerato_institucion').val(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[0].Institucion)
                    $('#txt_3_2_bachillerato_titulo').val(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[0].Titulo)
                    $('#txt_3_2_bachillerato_estado').val(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[0].Estado)
                    $('#txt_3_2_bachillerato_fecha_inicio').val(formatDate(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[0].FecInicio))
                    $('#txt_3_2_bachillerato_fecha_terminacion').val(formatDate(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[0].FecFin))

                    $('#txt_3_2_tecnicos_institucion').val(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[1].Institucion)
                    $('#txt_3_2_tecnicos_titulo').val(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[1].Titulo)
                    $('#txt_3_2_tecnicos_estado').val(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[1].Estado)
                    $('#txt_3_2_tecnicos_fecha_inicio').val(formatDate(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[1].FecInicio))
                    $('#txt_3_2_tecnicos_fecha_terminacion').val(formatDate(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[1].FecFin))

                    $('#txt_3_2_tecnologicos_institucion').val(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[2].Institucion)
                    $('#txt_3_2_tecnologicos_titulo').val(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[2].Titulo)
                    $('#txt_3_2_tecnologicos_estado').val(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[2].Estado)
                    $('#txt_3_2_tecnologicos_fecha_inicio').val(formatDate(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[2].FecInicio))
                    $('#txt_3_2_tecnologicos_fecha_terminacion').val(formatDate(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[2].FecFin))

                    $('#txt_3_2_universitarios_institucion').val(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[3].Institucion)
                    $('#txt_3_2_universitarios_titulo').val(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[3].Titulo)
                    $('#txt_3_2_universitarios_estado').val(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[3].Estado)
                    $('#txt_3_2_universitarios_fecha_inicio').val(formatDate(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[3].FecInicio))
                    $('#txt_3_2_universitarios_fecha_terminacion').val(formatDate(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[3].FecFin))

                    $('#txt_3_2_postgrado_institucion').val(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[4].Institucion)
                    $('#txt_3_2_postgrado_titulo').val(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[4].Titulo)
                    $('#txt_3_2_postgrado_estado').val(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[4].Estado)
                    $('#txt_3_2_postgrado_fecha_inicio').val(formatDate(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[4].FecInicio))
                    $('#txt_3_2_postgrado_fecha_terminacion').val(formatDate(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[4].FecFin))

                    $('#txt_3_2_otros_institucion').val(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[5].Institucion)
                    $('#txt_3_2_otros_titulo').val(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[5].Titulo)
                    $('#txt_3_2_otros_estado').val(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[5].Estado)
                    $('#txt_3_2_otros_fecha_inicio').val(formatDate(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[5].FecInicio))
                    $('#txt_3_2_otros_fecha_terminacion').val(formatDate(obj.oAcademicInformationVm.ListAcademicInformationDetailVm[5].FecFin))
                }

                // -- 3.3 ENTORNO FAMILIAR
                if (obj.oFamilyEnvironmentVm != null) {
                    // --
                    if (obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm.length > 0) {
                        // --
                        let lista = obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm
                        // --
                        $('#txt_3_3_padre_nombres').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[0].Nombres)
                        $('#txt_3_3_padre_edad').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[0].Edad)
                        $('#txt_3_3_padre_nivel_educativo').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[0].NivelEducativo)
                        $('#txt_3_3_padre_ocupacion').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[0].Ocupacion)
                        $('#txt_3_3_padre_empresa_institucion').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[0].EmpresaInstitucion)
                        $('#txt_3_3_padre_convive_usted').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[0].ConviveConUsted)

                        $('#txt_3_3_madre_nombres').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[1].Nombres)
                        $('#txt_3_3_madre_edad').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[1].Edad)
                        $('#txt_3_3_madre_nivel_educativo').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[1].NivelEducativo)
                        $('#txt_3_3_madre_ocupacion').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[1].Ocupacion)
                        $('#txt_3_3_madre_empresa_institucion').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[1].EmpresaInstitucion)
                        $('#txt_3_3_madre_convive_usted').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[1].ConviveConUsted)

                        $('#txt_3_3_conyugue_nombres').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[2].Nombres)
                        $('#txt_3_3_conyugue_edad').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[2].Edad)
                        $('#txt_3_3_conyugue_nivel_educativo').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[2].NivelEducativo)
                        $('#txt_3_3_conyugue_ocupacion').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[2].Ocupacion)
                        $('#txt_3_3_conyugue_empresa_institucion').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[2].EmpresaInstitucion)
                        $('#txt_3_3_conyugue_convive_usted').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[2].ConviveConUsted)
                        // --

                        // --
                        lista.forEach((element) => {
                            if (element.IdParentesco === 3) {
                                // --
                                listHermanos.push(element)
                                // --
                                let index = tableHermanos.rows().count() + 1;
                                tableHermanos.row.add([
                                    index,
                                    element.Nombres,
                                    element.Edad,
                                    element.NivelEducativo,
                                    element.Ocupacion,
                                    element.EmpresaInstitucion,
                                    element.ConviveConUsted,
                                    ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_3_3_delete_row_hermanos"> <i class="fa fa-trash"></i></button >'
                                ]).draw(false);
                                tableHermanos.columns.adjust()
                                    .responsive.recalc();
                            } else if (element.IdParentesco === 5) {
                                // --
                                listHijos.push(element)
                                // --
                                let index = tableHijos.rows().count() + 1;
                                tableHijos.row.add([
                                    index,
                                    element.Nombres,
                                    element.Edad,
                                    element.NivelEducativo,
                                    element.Ocupacion,
                                    element.EmpresaInstitucion,
                                    element.ConviveConUsted,
                                    ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_3_3_delete_row_hijos"> <i class="fa fa-trash"></i></button >'
                                ]).draw(false);
                                tableHijos.columns.adjust()
                                    .responsive.recalc();
                            }

                        })
                    }
                }

                // -- 3.4 ENTORNO PROFESIONAL Y LABORAL
                if (obj.oProfessionalEnvironmentVm != null) {
                    if (obj.oProfessionalEnvironmentVm.ListProfessionalEnvironmentDetailVm != null) {
                        // -- 
                        let lista = obj.oProfessionalEnvironmentVm.ListProfessionalEnvironmentDetailVm
                        listEntornoProfesionalLaboral = lista
                        lista.forEach((element) => {
                            let index = tableEntornoProfesionalLaboral.rows().count() + 1;
                            tableEntornoProfesionalLaboral.row.add([
                                index,
                                element.Empresa,
                                element.Cargo,
                                element.TiempoLaborado,
                                element.JefeInmediato,
                                element.Telefonos,
                                ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_3_4_delete_row"> <i class="fa fa-trash"></i></button >'
                            ]).draw(false);
                            tableEntornoProfesionalLaboral.columns.adjust()
                                .responsive.recalc();
                        })
                    }
                }


                // -- 3.5 VACIOS LABORALES Y/O INACTIVIDAD LABORAL
                if (obj.oWorkInactivityVm != null) {
                    if (obj.oWorkInactivityVm.ListWorkInactivityDetailVm != null) {
                        // -- 
                        let lista = obj.oWorkInactivityVm.ListWorkInactivityDetailVm
                        listLaboral = lista
                        lista.forEach((element) => {
                            let index = tableLaboral.rows().count() + 1;
                            tableLaboral.row.add([
                                index,
                                element.Ocupacion,
                                element.Periodo,
                                ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_3_5_delete_row"> <i class="fa fa-trash"></i></button >'
                            ]).draw(false);
                            tableLaboral.columns.adjust()
                                .responsive.recalc();
                        })
                    }
                }


                // --
                if (obj.oWorkInactivityVm != null) {
                    // --
                    $('#txt_3_5_razones_cambio_empleo').val(obj.oWorkInactivityVm.RazonCambioEmpleo)
                    $('#txt_3_5_motivos_cambio_empleo').val(obj.oWorkInactivityVm.MotivoCambioEmpleo)
                    $('#txt_3_5_empleo_ideal').val(obj.oWorkInactivityVm.EmpleoIdeal)
                    $('#txt_3_5_aspiracion_salarial').val(obj.oWorkInactivityVm.AspiracionSalarial)
                    $('#txt_3_5_conocimiento_empresa').val(obj.oWorkInactivityVm.ConocimientoEmpresa)
                    $('#txt_3_5_hoja_vida_empresa').val(obj.oWorkInactivityVm.HojaVidaAEmpresa)
                    $('#txt_3_5_persona_dentro_empresa').val(obj.oWorkInactivityVm.PersonaDentroEmpresa)
                }

                // -- 3.6 INFORMACION ECONÓMICA
                if (obj.oEconomicInformationVm != null) {
                    // --
                    $('#txt_3_6_ingresos_mensuales_ingresos_fijos').val(obj.oEconomicInformationVm.ListEconomicInformationDetailVm[0].ValorIngresoMensual)
                    $('#txt_3_6_ingresos_mensuales_apoyo_economico').val(obj.oEconomicInformationVm.ListEconomicInformationDetailVm[1].ValorIngresoMensual)
                    $('#txt_3_6_ingresos_mensuales_otros_ingresos').val(obj.oEconomicInformationVm.ListEconomicInformationDetailVm[2].ValorIngresoMensual)
                    $('#txt_3_6_ingresos_mensuales_total_ingresos').val(obj.oEconomicInformationVm.TotalIngresos)

                    $('#txt_3_6_gastos_mensuales_gastos_fijos').val(obj.oEconomicInformationVm.ListEconomicInformationDetailVm[0].ValorGastoMensual)
                    $('#txt_3_6_gastos_mensuales_creditos').val(obj.oEconomicInformationVm.ListEconomicInformationDetailVm[1].ValorGastoMensual)
                    $('#txt_3_6_gastos_mensuales_valor').val(obj.oEconomicInformationVm.ListEconomicInformationDetailVm[2].ValorGastoMensual)
                    $('#txt_3_6_gastos_mensuales_total_egresos').val(obj.oEconomicInformationVm.TotalEgresos)

                    $('#txt_3_6_comerciales_nombre').val(obj.oEconomicInformationVm.CtaBienesComerciales)
                    $('#txt_3_6_data_credito').val(obj.oEconomicInformationVm.ReportadoDataCredito)
                }

                // -- 3.7 SITUACION DE SALUD
                if (obj.oHealthSituationVm != null) {
                    // --
                    $('#txt_3_7_familia_tipo_enfermedad').val(obj.oHealthSituationVm.MiembroPrstaTipoEnfermedad)
                    $('#txt_3_7_familia_enfermedad').val(obj.oHealthSituationVm.MiembroEnfermedadPresenta)
                    $('#txt_3_7_familia_tipo_medicamento_ingiere').val(obj.oHealthSituationVm.MiembroMedicamentoIngiere)
                    $('#txt_3_7_familia_tiempo_enfermedad').val(obj.oHealthSituationVm.MiembroTiempoPadeceEnfermedad)
                    $('#txt_3_7_familia_observaciones').val(obj.oHealthSituationVm.MiembroObservaciones)

                    $('#txt_3_7_usted_tipo_enfermedad').val(obj.oHealthSituationVm.UdPstaTipoEnfermedad)
                    $('#txt_3_7_usted_enfermedad').val(obj.oHealthSituationVm.UdEnfermedadPresenta)
                    $('#txt_3_7_usted_tipo_medicamento_ingiere').val(obj.oHealthSituationVm.UdMedicamentoIngiere)
                    $('#txt_3_7_usted_tiempo_enfemerdad').val(obj.oHealthSituationVm.UdTiempoPadeceEnfermedad)
                    $('#txt_3_7_usted_observaciones').val(obj.oHealthSituationVm.UdObservaciones)
                }

                // -- 3.8 CARACTERISTICAS BASICAS DE LA VIVIENDA
                if (obj.oBasicHousingFeaturesVm != null) {
                    // --
                    $('#txt_3_8_estrato_social').val(obj.oBasicHousingFeaturesVm.EstratoSocial)
                    $('#txt_3_8_ubicacion').val(obj.oBasicHousingFeaturesVm.Ubicacion)
                    $('#txt_3_8_tiempo_residencia').val(obj.oBasicHousingFeaturesVm.TiempoResidencia)
                    $('#sl_3_8_tipo').val(obj.oBasicHousingFeaturesVm.Tipo)
                    $('#sl_3_8_aprecion_interna').val(obj.oBasicHousingFeaturesVm.ApreciacionInterna)
                    $('#sl_3_8_aprecion_externa').val(obj.oBasicHousingFeaturesVm.ApreciacionExterna)
                    $('#sl_3_8_estado').val(obj.oBasicHousingFeaturesVm.Estado)
                    $('#sl_3_8_servicio_alcantarillado').val(obj.oBasicHousingFeaturesVm.ServAlcantarillado)
                    $('#sl_3_8_ubicacion').val(obj.oBasicHousingFeaturesVm.UbicacionVivienda)
                    $('#sl_3_8_distribucion').val(obj.oBasicHousingFeaturesVm.Distribucion)
                    $('#sl_3_8_ambiente_sector').val(obj.oBasicHousingFeaturesVm.AmbienteSector)
                    $('#sl_3_8_vias_acceso').val(obj.oBasicHousingFeaturesVm.ViasAcceso)
                    $('#sl_3_8_propiedad').val(obj.oBasicHousingFeaturesVm.Propiedad)
                    $('#txt_3_8_concepto').val(obj.oBasicHousingFeaturesVm.Concepto)
                    // --
                    $('[name="check_servicios_publicos[]"]').each(function () {
                        let cbPublicos = $(this);
                        // --
                        if (obj.oBasicHousingFeaturesVm.ListServiciosPublicos != "" && obj.oBasicHousingFeaturesVm.ListServiciosPublicos != null) {
                            // --
                            let arrayServiciosPublicos = obj.oBasicHousingFeaturesVm.ListServiciosPublicos.split("|")
                            arrayServiciosPublicos.forEach(function (name) {
                                if (cbPublicos.attr('value') == name) {
                                    cbPublicos.attr('checked', true);
                                }
                            });
                        }
                    });
                    // --
                    $('[name="check_servicios_instalados[]"]').each(function () {
                        let cbInstalados = $(this);
                        // --
                        if (obj.oBasicHousingFeaturesVm.ListServiciosInstalados != "" && obj.oBasicHousingFeaturesVm.ListServiciosInstalados != null) {
                            // --
                            let arrayServiciosInstalados = obj.oBasicHousingFeaturesVm.ListServiciosInstalados.split("|")
                            arrayServiciosInstalados.forEach(function (name) {
                                if (cbInstalados.attr('value') == name) {
                                    cbInstalados.attr('checked', true);
                                }
                            });
                        }
                    });

                    // --
                    if (obj.oBasicHousingFeaturesVm.ListCommunityRelationShipVm != null && obj.oBasicHousingFeaturesVm.ListCommunityRelationShipVm.length > 0) {
                        // -- 
                        let lista = obj.oBasicHousingFeaturesVm.ListCommunityRelationShipVm
                        listRelacionComunidad = lista
                        lista.forEach((element) => {
                            let index = tableRelacionComunidad.rows().count() + 1;
                            tableRelacionComunidad.row.add([
                                index,
                                element.Nombre,
                                element.TiempoConoce,
                                element.Concepto,
                                ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_3_8_delete_row"> <i class="fa fa-trash"></i></button >'
                            ]).draw(false);
                            tableRelacionComunidad.columns.adjust()
                                .responsive.recalc();
                        })
                    }
                }

                // -- 3.9 APRECIACIÓN DEL EVALUADOR
                if (obj.oAssessmentEvaluatorVm != null) {
                    // --
                    // -- $('#sl_3_9_resultado').val(obj.oAssessmentEvaluatorVm.Resultado)
                    $('#txt_3_9_realizado_por').val(obj.oAssessmentEvaluatorVm.RealizadoPor)
                    // -- $('#txt_3_9_firma').val(obj.oAssessmentEvaluatorVm.Firma)
                }

                // -- 3.10 REGISTRO FOTOGRÁFICO
                if (obj.oPhotographicRecordVm != null) {
                    // --
                    ListPhotografym = obj.oPhotographicRecordVm;
                    $('#txt_3_10_candidato_observaciones').val(obj.oPhotographicRecordVm.Observaciones_EntradaDomicilio)
                    $('#txt_3_10_ambiente_social_observaciones').val(obj.oPhotographicRecordVm.Observaciones_AmbSocial)
                    $('#txt_3_10_habitaciones_observaciones').val(obj.oPhotographicRecordVm.Observaciones_Habitaciones)
                    $('#txt_3_10_cocina_observaciones').val(obj.oPhotographicRecordVm.Observaciones_Cocina)

                    if (obj.oPhotographicRecordVm.ArchivoAdjunto_EntradaDomicilio != null) {
                        $("#PreviewDomicilio button").attr("data-typefile", obj.oPhotographicRecordVm.ArchivoAdjunto_EntradaDomicilio.ExtensionArchivo);
                        $("#PreviewDomicilio button").attr("data-route", btoa(obj.oPhotographicRecordVm.ArchivoAdjunto_EntradaDomicilio.RutaArchivo));
                        $("#PreviewDomicilio span").text(obj.oPhotographicRecordVm.ArchivoAdjunto_EntradaDomicilio.NombreArchivo);
                    }

                    if (obj.oPhotographicRecordVm.ArchivoAdjunto_AmbSocial != null) {
                        $("#PreviewSocial button").attr("data-typefile", obj.oPhotographicRecordVm.ArchivoAdjunto_AmbSocial.ExtensionArchivo);
                        $("#PreviewSocial button").attr("data-route", btoa(obj.oPhotographicRecordVm.ArchivoAdjunto_AmbSocial.RutaArchivo));
                        $("#PreviewSocial span").text(obj.oPhotographicRecordVm.ArchivoAdjunto_AmbSocial.NombreArchivo);
                    }

                    if (obj.oPhotographicRecordVm.ArchivoAdjunto_Habitaciones != null) {
                        $("#PreviewHabitaciones button").attr("data-typefile", obj.oPhotographicRecordVm.ArchivoAdjunto_Habitaciones.ExtensionArchivo);
                        $("#PreviewHabitaciones button").attr("data-route", btoa(obj.oPhotographicRecordVm.ArchivoAdjunto_Habitaciones.RutaArchivo));
                        $("#PreviewHabitaciones span").text(obj.oPhotographicRecordVm.ArchivoAdjunto_Habitaciones.NombreArchivo);
                    }

                    if (obj.oPhotographicRecordVm.ArchivoAdjunto_Cocina != null) {
                        $("#PreviewCocina button").attr("data-typefile", obj.oPhotographicRecordVm.ArchivoAdjunto_Cocina.ExtensionArchivo);
                        $("#PreviewCocina button").attr("data-route", btoa(obj.oPhotographicRecordVm.ArchivoAdjunto_Cocina.RutaArchivo));
                        $("#PreviewCocina span").text(obj.oPhotographicRecordVm.ArchivoAdjunto_Cocina.NombreArchivo);
                    }

                }
            }

        }
    });
    // --- }

}

function addJudicialProcessOrAssetLaunderingToTable(attr, condition, props) {    
    const values = Object.values(attr);
    const res = values.filter(el => el.length == 0);
    if (res.length == 0) {
        let objectJudicialProcess = {
            "IdProcesoJudicial": 0,
            "ItemProcesoJudicial": 0
        }
        let objectAssetLaundering = {
            "IdLavadoActivos": 0,
            "ItemLavadoActivos": 0
        }
        let objectVariation = condition ? objectJudicialProcess : objectAssetLaundering
        let object = {
            ...objectVariation,
            "Ciudad": attr.ciudad,
            "Despacho": attr.despacho,
            "Proceso": attr.proceso,
            "Clase": attr.clase,
            "Demandantes": attr.demandantes,
            "Demandados": attr.demandados,
        }
        props.list.push(object)
        props.index = props.table.rows().count() + 1
        props.table.row.add([
            props.index,
            attr.ciudad,
            attr.despacho,
            attr.proceso,
            attr.clase,
            attr.demandantes,
            attr.demandados,
            `<button class= "btn btn-sm btn-danger" data-id="${props.index}" id="btn_1_2_delete_row"> <i class="fa fa-trash"></i></button >`
        ]).draw(false);
        props.table.columns.adjust()
        props.table.responsive.recalc()
        props.index++
        clearFormularyProcesosJudiciales()
    } else {
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    }
}

function validateImg(nationalRestrictive, prefixName) {
    if (nationalRestrictive) return null;
    const extensions = ['img', 'png', 'jpg', 'jpeg'];
    const extension = getFileExtension(nationalRestrictive.name);
    const ifValidateFile = extensions.filter(el => el == extension);
    if (ifValidateFile) {
        formData.append("dataFile", nationalRestrictive, prefixName + extension);
    }
    return extension;
}

function validatePDF(nationalRestrictive, prefixName) {
    if (nationalRestrictive) return null;
    const pdf = 'pdf';
    const extension = extension = getFileExtension(nationalRestrictive.name);
    if (extension === pdf) {
        formData.append("dataFile", nationalRestrictive, prefixName + extension);
    }
}

function validateFileObject(fileObject, nameInputFile, prefixName) {
    const object = {
        "IdArchivoAdjunto": 0,
        "NombreArchivo": prefixName + getFileExtension($(`#${nameInputFile}`).prop("files")[0].name),
        "RutaArchivo": null,
        "ExtensionArchivo": validateImg($(`#${nameInputFile}`).prop("files")[0], prefixName),
        "FecRegistro": null,
        "IdUsuarioRegistro": 0
    }
    return fileObject ? fileObject : object;
}

// -- DATEPICKER
setInputDatePicker('txt_1_1_fecha_nacimiento')
setInputDatePicker("txt_1_8_fecha_inicio")
setInputDatePicker("txt_1_8_fecha_termino")
setInputDatePicker("txt_1_9_fecha_finalizacion")
setInputDatePicker("txt_3_0_fecha_visita")
setInputDatePicker("txt_3_2_bachillerato_fecha_inicio")
setInputDatePicker("txt_3_2_bachillerato_fecha_terminacion")
setInputDatePicker("txt_3_2_tecnicos_fecha_inicio")
setInputDatePicker("txt_3_2_tecnicos_fecha_terminacion")
setInputDatePicker("txt_3_2_tecnologicos_fecha_inicio")
setInputDatePicker("txt_3_2_tecnologicos_fecha_terminacion")
setInputDatePicker("txt_3_2_universitarios_fecha_inicio")
setInputDatePicker("txt_3_2_universitarios_fecha_terminacion")
setInputDatePicker("txt_3_2_postgrado_fecha_inicio")
setInputDatePicker("txt_3_2_postgrado_fecha_terminacion")
setInputDatePicker("txt_3_2_otros_fecha_inicio")
setInputDatePicker("txt_3_2_otros_fecha_terminacion")

// --
getListStatusCivil();
getListDocumentType();
getList270Colombia();
