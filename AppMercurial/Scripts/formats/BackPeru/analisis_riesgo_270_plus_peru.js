// -- GLOBAL
const functions = new Functions()
var ListPhotografym = null
var ListSheetReniec = null
var ListTestConfiablidad = null

var ListVerificacionEssalud = null
var ListVerificacionSunat = null
var ListVerificacionRecordConductor = null


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


// --
function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}


// --
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

// --
function validateNumber(value) {
    // --
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
    // --
    let txt_1_2_ciudad = $('#txt_1_2_ciudad').val()
    let txt_1_2_despacho = $('#txt_1_2_despacho').val()
    let txt_1_2_proceso = $('#txt_1_2_proceso').val()
    let txt_1_2_clase = $('#txt_1_2_clase').val()
    let txt_1_2_demandantes = $('#txt_1_2_demandantes').val()
    let txt_1_2_demandados = $('#txt_1_2_demandados').val()

    // -- Validar 
    if (
        txt_1_2_ciudad.length > 0 &&
        txt_1_2_despacho.length > 0 &&
        txt_1_2_proceso.length > 0 &&
        txt_1_2_clase.length > 0 &&
        txt_1_2_demandantes.length > 0 &&
        txt_1_2_demandados.length > 0
    ) {
        // --
        let object = {
            "IdProcesoJudicial": 0,
            "ItemProcesoJudicial": 0,
            "Ciudad": txt_1_2_ciudad,
            "Despacho": txt_1_2_despacho,
            "Proceso": txt_1_2_proceso,
            "Clase": txt_1_2_clase,
            "Demandantes": txt_1_2_demandantes,
            "Demandados": txt_1_2_demandados,
        }

        // -- Agregar objeto al listado
        listProcesosJudiciales.push(object)
        indexListProcesosJudiciales = tableProcesosJudiciales.rows().count() + 1

        // -- Agregar datos a la tabla
        tableProcesosJudiciales.row.add([
            indexListProcesosJudiciales,
            txt_1_2_ciudad,
            txt_1_2_despacho,
            txt_1_2_proceso,
            txt_1_2_clase,
            txt_1_2_demandantes,
            txt_1_2_demandados,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListProcesosJudiciales + '" id="btn_1_2_delete_row"> <i class="fa fa-trash"></i></button >'
        ]).draw(false);
        tableProcesosJudiciales.columns.adjust()
            .responsive.recalc();
        // --
        indexListProcesosJudiciales++
        clearFormularyProcesosJudiciales()
    } else {
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    }
})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_1_2_delete_row', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tableProcesosJudiciales.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tableProcesosJudiciales.row(index).remove().draw(false);
    // --
    let indexObject = listProcesosJudiciales.findIndex(x => x.index == value);
    listProcesosJudiciales.splice(indexObject, 1);
    // --
})


// -- LIMPIAR FORMULARIO
function clearFormularyProcesosJudiciales() {
    // --
    $('#txt_1_2_ciudad').val('')
    $('#txt_1_2_despacho').val('')
    $('#txt_1_2_proceso').val('')
    $('#txt_1_2_clase').val('')
    $('#txt_1_2_demandantes').val('')
    $('#txt_1_2_demandados').val('')
}



// -- PROCESOS PENALES

// -- VARIABLES
var listProcesosPenales = new Array()
var indexListProcesosPenales = 1

// -- TABLE
var tableProcesosPenales = $('#tbl_1_3_list').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_1_3_agregar").on('click', function () {
    // --
    let txt_1_3_ciudad = $('#txt_1_3_ciudad').val()
    let txt_1_3_despacho = $('#txt_1_3_despacho').val()
    let txt_1_3_proceso = $('#txt_1_3_proceso').val()
    let txt_1_3_clase = $('#txt_1_3_clase').val()
    let txt_1_3_demandantes = $('#txt_1_3_demandantes').val()
    let txt_1_3_demandados = $('#txt_1_3_demandados').val()

    // -- Validar 
    if (
        txt_1_3_ciudad.length > 0 &&
        txt_1_3_despacho.length > 0 &&
        txt_1_3_proceso.length > 0 &&
        txt_1_3_clase.length > 0 &&
        txt_1_3_demandantes.length > 0 &&
        txt_1_3_demandados.length > 0
    ) {
        // --
        let object = {
            "IdProcesoPenal": 0,
            "ItemProcesoPenal": 0,
            "Ciudad": txt_1_3_ciudad,
            "Despacho": txt_1_3_despacho,
            "Proceso": txt_1_3_proceso,
            "Clase": txt_1_3_clase,
            "Demandantes": txt_1_3_demandantes,
            "Demandados": txt_1_3_demandados,
        }

        // -- Agregar objeto al listado
        listProcesosPenales.push(object)
        indexListProcesosPenales = tableProcesosPenales.rows().count() + 1

        // -- Agregar datos a la tabla
        tableProcesosPenales.row.add([
            indexListProcesosPenales,
            txt_1_3_ciudad,
            txt_1_3_despacho,
            txt_1_3_proceso,
            txt_1_3_clase,
            txt_1_3_demandantes,
            txt_1_3_demandados,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListProcesosPenales + '" id="btn_1_3_delete_row"> <i class="fa fa-trash"></i></button >'
        ]).draw(false);
        tableProcesosPenales.columns.adjust()
            .responsive.recalc();
        // --
        indexListProcesosPenales++
        clearFormularyProcesosPenales()
    } else {
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    }
})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_1_3_delete_row', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tableProcesosPenales.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tableProcesosPenales.row(index).remove().draw(false);
    // --
    let indexObject = listProcesosPenales.findIndex(x => x.index == value);
    listProcesosPenales.splice(indexObject, 1);
    // --
})

// -- LIMPIAR FORMULARIO
function clearFormularyProcesosPenales() {
    // --
    $('#txt_1_3_ciudad').val('')
    $('#txt_1_3_despacho').val('')
    $('#txt_1_3_proceso').val('')
    $('#txt_1_3_clase').val('')
    $('#txt_1_3_demandantes').val('')
    $('#txt_1_3_demandados').val('')
}




// -- PROCESOS POLICIALES

// -- VARIABLES
var listProcesosPoliciales = new Array()
var indexListProcesosPoliciales = 1

// -- TABLE
var tableProcesosPoliciales = $('#tbl_1_4_list').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_1_4_agregar").on('click', function () {
    // --
    let txt_1_4_ciudad = $('#txt_1_4_ciudad').val()
    let txt_1_4_despacho = $('#txt_1_4_despacho').val()
    let txt_1_4_proceso = $('#txt_1_4_proceso').val()
    let txt_1_4_clase = $('#txt_1_4_clase').val()
    let txt_1_4_demandantes = $('#txt_1_4_demandantes').val()
    let txt_1_4_demandados = $('#txt_1_4_demandados').val()

    // -- Validar 
    if (
        txt_1_4_ciudad.length > 0 &&
        txt_1_4_despacho.length > 0 &&
        txt_1_4_proceso.length > 0 &&
        txt_1_4_clase.length > 0 &&
        txt_1_4_demandantes.length > 0 &&
        txt_1_4_demandados.length > 0
    ) {
        // --
        let object = {
            "IdProcesoPolicial": 0,
            "ItemProcesoPolicial": 0,
            "Ciudad": txt_1_4_ciudad,
            "Despacho": txt_1_4_despacho,
            "Proceso": txt_1_4_proceso,
            "Clase": txt_1_4_clase,
            "Demandantes": txt_1_4_demandantes,
            "Demandados": txt_1_4_demandados,
        }

        // -- Agregar objeto al listado
        listProcesosPoliciales.push(object)
        indexListProcesosPoliciales = tableProcesosPoliciales.rows().count() + 1

        // -- Agregar datos a la tabla
        tableProcesosPoliciales.row.add([
            indexListProcesosPoliciales,
            txt_1_4_ciudad,
            txt_1_4_despacho,
            txt_1_4_proceso,
            txt_1_4_clase,
            txt_1_4_demandantes,
            txt_1_4_demandados,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListProcesosPoliciales + '" id="btn_1_4_delete_row"> <i class="fa fa-trash"></i></button >'
        ]).draw(false);
        tableProcesosPoliciales.columns.adjust()
            .responsive.recalc();
        // --
        indexListProcesosPoliciales++
        clearFormularyProcesosPoliciales()
    } else {
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    }
})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_1_4_delete_row', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tableProcesosPoliciales.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tableProcesosPoliciales.row(index).remove().draw(false);
    // --
    let indexObject = listProcesosPoliciales.findIndex(x => x.index == value);
    listProcesosPoliciales.splice(indexObject, 1);
    // --
})

// -- LIMPIAR FORMULARIO
function clearFormularyProcesosPoliciales() {
    // --
    $('#txt_1_4_ciudad').val('')
    $('#txt_1_4_despacho').val('')
    $('#txt_1_4_proceso').val('')
    $('#txt_1_4_clase').val('')
    $('#txt_1_4_demandantes').val('')
    $('#txt_1_4_demandados').val('')
}



// -- ANTECEDENTES POR TERRORISMO 

// -- VARIABLES
var listAntecedentesTerrorismo = new Array()
var indexListAntecedentesTerrorismo = 1

// -- TABLE
var tableAntecedentesTerrorismo = $('#tbl_1_7_list').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_1_7_agregar").on('click', function () {
    // --
    let txt_1_7_delito = $('#txt_1_7_delito').val()
    let txt_1_7_fecha_sentencia = formatSave($('#txt_1_7_fecha_sentencia').val())
    let txt_1_7_fecha_ejecutoria = formatSave($('#txt_1_7_fecha_ejecutoria').val())
    let txt_1_7_juzgado_ejecucion_sentencia = $('#txt_1_7_juzgado_ejecucion_sentencia').val()
    let txt_1_7_nro_expediente = $('#txt_1_7_nro_expediente').val()
    let txt_1_7_monto_pagos_pendientes = $('#txt_1_7_monto_pagos_pendientes').val()

    // -- Validar
    if (
        txt_1_7_delito.length > 0 &&
        txt_1_7_fecha_sentencia.length > 0 &&
        txt_1_7_fecha_ejecutoria.length > 0 &&
        txt_1_7_juzgado_ejecucion_sentencia.length > 0 &&
        txt_1_7_nro_expediente.length > 0 &&
        txt_1_7_monto_pagos_pendientes.length > 0
    ) {
        // --
        let object = {
            "IdAntecTerro": 0,
            "ItemAntecTerro": 0,
            "Delito": txt_1_7_delito,
            "FechaSentencia": txt_1_7_fecha_sentencia,
            "FechaEjecutoria": txt_1_7_fecha_ejecutoria,
            "JuzgadoEjecucionSentencia": txt_1_7_juzgado_ejecucion_sentencia,
            "NroExpediente": txt_1_7_nro_expediente,
            "MontoPagosPendientes": txt_1_7_monto_pagos_pendientes,
        }

        // -- Agregar objeto al listado
        listAntecedentesTerrorismo.push(object)
        indexListAntecedentesTerrorismo = tableAntecedentesTerrorismo.rows().count() + 1

        // -- Agregar datos a la tabla
        tableAntecedentesTerrorismo.row.add([
            indexListAntecedentesTerrorismo,
            txt_1_7_delito,
            txt_1_7_fecha_sentencia,
            txt_1_7_fecha_ejecutoria,
            txt_1_7_juzgado_ejecucion_sentencia,
            txt_1_7_nro_expediente,
            txt_1_7_monto_pagos_pendientes,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListAntecedentesTerrorismo + '" id="btn_1_7_delete_row"> <i class="fa fa-trash"></i></button >'
        ]).draw(false);
        tableAntecedentesTerrorismo.columns.adjust()
            .responsive.recalc();
        // --
        indexListAntecedentesTerrorismo++
        clearFormularyAntecedentesTerrorismo()
    } else {
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    }
})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_1_7_delete_row', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tableAntecedentesTerrorismo.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tableAntecedentesTerrorismo.row(index).remove().draw(false);
    // --
    let indexObject = listAntecedentesTerrorismo.findIndex(x => x.index == value);
    listAntecedentesTerrorismo.splice(indexObject, 1);
    // --
})

// -- LIMPIAR FORMULARIO
function clearFormularyAntecedentesTerrorismo() {
    // --
    $('#txt_1_7_delito').val('')
    $('#txt_1_7_fecha_sentencia').val('')
    $('#txt_1_7_fecha_ejecutoria').val('')
    $('#txt_1_7_juzgado_ejecucion_sentencia').val('')
    $('#txt_1_7_nro_expediente').val('')
    $('#txt_1_7_monto_pagos_pendientes').val('')
}




// -- ANTECEDENTES POR TRAFICO ILÍCITO DE DROGAS

// -- VARIABLES
var listAntecedentesTraficoIlicitoDrogas = new Array()
var indexListAntecedentesTraficoIlicitoDrogas = 1

// -- TABLE
var tableAntecedentesTraficoIlicitoDrogas = $('#tbl_1_8_list').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_1_8_agregar").on('click', function () {
    // --
    let txt_1_8_delito = $('#txt_1_8_delito').val()
    let txt_1_8_fecha_sentencia = $('#txt_1_8_fecha_sentencia').val()
    let txt_1_8_fecha_ejecutoria = $('#txt_1_8_fecha_ejecutoria').val()
    let txt_1_8_juzgado_ejecucion_sentencia = $('#txt_1_8_juzgado_ejecucion_sentencia').val()
    let txt_1_8_nro_expediente = $('#txt_1_8_nro_expediente').val()
    let txt_1_8_monto_pagos_pendientes = $('#txt_1_8_monto_pagos_pendientes').val()

    // -- Validar
    if (
        txt_1_8_delito.length > 0 &&
        txt_1_8_fecha_sentencia.length > 0 &&
        txt_1_8_fecha_ejecutoria.length > 0 &&
        txt_1_8_juzgado_ejecucion_sentencia.length > 0 &&
        txt_1_8_nro_expediente.length > 0 &&
        txt_1_8_monto_pagos_pendientes.length > 0
    ) {
        // --
        let object = {
            "IdAntecTrafDroga": 0,
            "ItemAntecTrafDroga": 0,
            "Delito": txt_1_8_delito,
            "FechaSentencia": formatSave(txt_1_8_fecha_sentencia),
            "FechaEjecutoria": formatSave(txt_1_8_fecha_ejecutoria),
            "JuzgadoEjecucionSentencia": txt_1_8_juzgado_ejecucion_sentencia,
            "NroExpediente": txt_1_8_nro_expediente,
            "MontoPagosPendientes": txt_1_8_monto_pagos_pendientes,
        }

        // -- Agregar objeto al listado
        listAntecedentesTraficoIlicitoDrogas.push(object)
        indexListAntecedentesTraficoIlicitoDrogas = tableAntecedentesTraficoIlicitoDrogas.rows().count() + 1

        // -- Agregar datos a la tabla
        tableAntecedentesTraficoIlicitoDrogas.row.add([
            indexListAntecedentesTraficoIlicitoDrogas,
            txt_1_8_delito,
            txt_1_8_fecha_sentencia,
            txt_1_8_fecha_ejecutoria,
            txt_1_8_juzgado_ejecucion_sentencia,
            txt_1_8_nro_expediente,
            txt_1_8_monto_pagos_pendientes,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListAntecedentesTraficoIlicitoDrogas + '" id="btn_1_8_delete_row"> <i class="fa fa-trash"></i></button >'
        ]).draw(false);
        tableAntecedentesTraficoIlicitoDrogas.columns.adjust()
            .responsive.recalc();
        // --
        indexListAntecedentesTraficoIlicitoDrogas++
        clearFormularyAntecedentesTraficoIlicitoDrogas()
    } else {
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    }
})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_1_8_delete_row', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tableAntecedentesTraficoIlicitoDrogas.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tableAntecedentesTraficoIlicitoDrogas.row(index).remove().draw(false);
    // --
    let indexObject = listAntecedentesTraficoIlicitoDrogas.findIndex(x => x.index == value);
    listAntecedentesTraficoIlicitoDrogas.splice(indexObject, 1);
    // --
})

// -- LIMPIAR FORMULARIO
function clearFormularyAntecedentesTraficoIlicitoDrogas() {
    // --
    $('#txt_1_8_delito').val('')
    $('#txt_1_8_fecha_sentencia').val('')
    $('#txt_1_8_fecha_ejecutoria').val('')
    $('#txt_1_8_juzgado_ejecucion_sentencia').val('')
    $('#txt_1_8_nro_expediente').val('')
    $('#txt_1_8_monto_pagos_pendientes').val('')
}



// -- REGISTRO DE DEUDAS ALIMENTARIAS

// -- VARIABLES
var listDeudasAlimentarias = new Array()
var indexListDeudasAlimentarias = 1

// -- TABLE
var tableDeudasAlimentarias = $('#tbl_1_9_list').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_1_9_agregar").on('click', function () {
    // --
    let txt_1_9_distrito_judicial = $('#txt_1_9_distrito_judicial').val()
    let txt_1_9_organo_jurisdiccional = $('#txt_1_9_organo_jurisdiccional').val()
    let txt_1_9_nro_expediente = $('#txt_1_9_nro_expediente').val()
    let txt_1_9_pension_mensual = $('#txt_1_9_pension_mensual').val()
    let txt_1_9_importe_adecuado = $('#txt_1_9_importe_adecuado').val()
    let txt_1_9_demandante_alimentista = $('#txt_1_9_demandante_alimentista').val()


    // -- Validar
    if (
        txt_1_9_distrito_judicial.length > 0 &&
        txt_1_9_organo_jurisdiccional.length > 0 &&
        txt_1_9_nro_expediente.length > 0 &&
        txt_1_9_pension_mensual.length > 0 &&
        txt_1_9_importe_adecuado.length > 0 &&
        txt_1_9_demandante_alimentista.length > 0
    ) {
        // --
        let object = {
            "IdRegDeAlimen": 0,
            "ItemRegDeAlimen": 0,
            "DistritoJudicial": txt_1_9_distrito_judicial,
            "OrganoJurisdiccional": txt_1_9_organo_jurisdiccional,
            "NroExpediente": txt_1_9_nro_expediente,
            "PensionMensual": txt_1_9_pension_mensual,
            "ImporteAdeudado": txt_1_9_importe_adecuado,
            "Demandante": txt_1_9_demandante_alimentista,
        }

        // -- Agregar objeto al listado
        listDeudasAlimentarias.push(object)
        indexListDeudasAlimentarias = tableDeudasAlimentarias.rows().count() + 1

        // -- Agregar datos a la tabla
        tableDeudasAlimentarias.row.add([
            indexListDeudasAlimentarias,
            txt_1_9_distrito_judicial,
            txt_1_9_organo_jurisdiccional,
            txt_1_9_nro_expediente,
            txt_1_9_pension_mensual,
            txt_1_9_importe_adecuado,
            txt_1_9_demandante_alimentista,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListDeudasAlimentarias + '" id="btn_1_9_delete_row"> <i class="fa fa-trash"></i></button >'
        ]).draw(false);
        tableDeudasAlimentarias.columns.adjust()
            .responsive.recalc();
        // --
        indexListDeudasAlimentarias++
        clearFormularyDeudasAlimentarias()
    } else {
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    }
})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_1_9_delete_row', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tableDeudasAlimentarias.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tableDeudasAlimentarias.row(index).remove().draw(false);
    // --
    let indexObject = listDeudasAlimentarias.findIndex(x => x.index == value);
    listDeudasAlimentarias.splice(indexObject, 1);
    // --
})

// -- LIMPIAR FORMULARIO
function clearFormularyDeudasAlimentarias() {
    // --
    $('#txt_1_9_distrito_judicial').val('')
    $('#txt_1_9_organo_jurisdiccional').val('')
    $('#txt_1_9_nro_expediente').val('')
    $('#txt_1_9_pension_mensual').val('')
    $('#txt_1_9_importe_adecuado').val('')
    $('#txt_1_9_demandante_alimentista').val('')
}




// -- DESCARTE DE HOMONIMIA

// -- VARIABLES
var listDescarteHomonimia = new Array()
var indexListDescarteHomonimia = 1

// -- TABLE
var tableDescarteHomonimia = $('#tbl_1_10_list').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_1_10_agregar").on('click', function () {
    // --
    let txt_1_10_distrito_judicial = $('#txt_1_10_distrito_judicial').val()
    let txt_1_10_organo_jurisdiccional = $('#txt_1_10_organo_jurisdiccional').val()
    let txt_1_10_nro_expediente = $('#txt_1_10_nro_expediente').val()
    let txt_1_10_pension_mensual = $('#txt_1_10_pension_mensual').val()
    let txt_1_10_importe_adecuado = $('#txt_1_10_importe_adecuado').val()
    let txt_1_10_demandante_alimentista = $('#txt_1_10_demandante_alimentista').val()


    // -- Validar
    if (
        txt_1_10_distrito_judicial.length > 0 &&
        txt_1_10_organo_jurisdiccional.length > 0 &&
        txt_1_10_nro_expediente.length > 0 &&
        txt_1_10_pension_mensual.length > 0 &&
        txt_1_10_importe_adecuado.length > 0 &&
        txt_1_10_demandante_alimentista.length > 0
    ) {
        // --
        let object = {
            "IdDescarteHomon": 0,
            "ItemDescarteHomon": 0,
            "DistritoJudicial": txt_1_10_distrito_judicial,
            "OrganoJurisdiccional": txt_1_10_organo_jurisdiccional,
            "NroExpediente": txt_1_10_nro_expediente,
            "PensionMensual": txt_1_10_pension_mensual,
            "ImporteAdeudado": txt_1_10_importe_adecuado,
            "Demandante": txt_1_10_demandante_alimentista,
        }

        // -- Agregar objeto al listado
        listDescarteHomonimia.push(object)
        indexListDescarteHomonimia = tableDescarteHomonimia.rows().count() + 1

        // -- Agregar datos a la tabla
        tableDescarteHomonimia.row.add([
            indexListDescarteHomonimia,
            txt_1_10_distrito_judicial,
            txt_1_10_organo_jurisdiccional,
            txt_1_10_nro_expediente,
            txt_1_10_pension_mensual,
            txt_1_10_importe_adecuado,
            txt_1_10_demandante_alimentista,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListDescarteHomonimia + '" id="btn_1_10_delete_row"> <i class="fa fa-trash"></i></button >'
        ]).draw(false);
        tableDescarteHomonimia.columns.adjust()
            .responsive.recalc();
        // --
        indexListDescarteHomonimia++
        clearFormularyDescarteHomonimia()
    } else {
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    }
})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_1_10_delete_row', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tableDescarteHomonimia.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tableDescarteHomonimia.row(index).remove().draw(false);
    // --
    let indexObject = listDescarteHomonimia.findIndex(x => x.index == value);
    listDescarteHomonimia.splice(indexObject, 1);
    // --
})

// -- LIMPIAR FORMULARIO
function clearFormularyDescarteHomonimia() {
    // --
    $('#txt_1_10_distrito_judicial').val('')
    $('#txt_1_10_organo_jurisdiccional').val('')
    $('#txt_1_10_nro_expediente').val('')
    $('#txt_1_10_pension_mensual').val('')
    $('#txt_1_10_importe_adecuado').val('')
    $('#txt_1_10_demandante_alimentista').val('')
}





// -- VERIFICACION FINANCIERA SBS

// -- LINEAS DE CRÉDITO

// -- VARIABLES
var listLineasCredito = new Array()
var indexListLineasCredito = 1

// -- TABLE
var tableLineasCredito = $('#tbl_1_11_list_lineas_credito').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_1_11_agregar_lineas_credito").on('click', function () {
    // --
    let txt_1_11_entidad_reportante = $('#txt_1_11_entidad_reportante').val()
    let txt_1_11_tipo_linea = $('#txt_1_11_tipo_linea').val()
    let txt_1_11_total_linea_credito = $('#txt_1_11_total_linea_credito').val()

    // -- Validar
    if (
        txt_1_11_entidad_reportante.length > 0 &&
        txt_1_11_tipo_linea.length > 0 &&
        txt_1_11_total_linea_credito.length > 0
    ) {
        // --
        let object = {
            "IdLineaCredito": 0,
            "IdVerifFinanciera": 0,
            "EntidadReportante": txt_1_11_entidad_reportante,
            "TipoLinea": txt_1_11_tipo_linea,
            "TotalLineaCredito": txt_1_11_total_linea_credito,
        }

        // -- Agregar objeto al listado
        listLineasCredito.push(object)
        indexListLineasCredito = tableLineasCredito.rows().count() + 1

        // -- Agregar datos a la tabla
        tableLineasCredito.row.add([
            indexListLineasCredito,
            txt_1_11_entidad_reportante,
            txt_1_11_tipo_linea,
            txt_1_11_total_linea_credito,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListLineasCredito + '" id="btn_1_11_delete_row_lineas_credito"> <i class="fa fa-trash"></i></button >'
        ]).draw(false);
        tableLineasCredito.columns.adjust()
            .responsive.recalc();
        // --
        indexListLineasCredito++
        clearFormularyLineasCredito()
    } else {
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    }
})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_1_11_delete_row_lineas_credito', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tableLineasCredito.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tableLineasCredito.row(index).remove().draw(false);
    // --
    let indexObject = listLineasCredito.findIndex(x => x.index == value);
    listLineasCredito.splice(indexObject, 1);
    // --
})

// -- LIMPIAR FORMULARIO
function clearFormularyLineasCredito() {
    // --
    $('#txt_1_11_entidad_reportante').val('')
    $('#txt_1_11_tipo_linea').val('')
    $('#txt_1_11_total_linea_credito').val('')
}



// -- DETALLE DE LA DEUDA

// -- VARIABLES
var listDetalleDeuda = new Array()
var indexListDetalleDeuda = 1

// -- TABLE
var tableDetalleDeuda = $('#tbl_1_11_list_detalle_deuda').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_1_11_agregar_detalle_deuda").on('click', function () {
    // --
    let txt_1_11_entidad_informante = $('#txt_1_11_entidad_informante').val()
    let txt_1_11_calificacion = $('#txt_1_11_calificacion').val()
    let txt_1_11_capital = $('#txt_1_11_capital').val()
    let txt_1_11_intereses_comisiones = $('#txt_1_11_intereses_comisiones').val()
    let txt_1_11_deuda_total = $('#txt_1_11_deuda_total').val()

    // -- Validar
    if (
        txt_1_11_entidad_informante.length > 0 &&
        txt_1_11_calificacion.length > 0 &&
        txt_1_11_capital.length > 0 &&
        txt_1_11_intereses_comisiones.length > 0 &&
        txt_1_11_deuda_total.length > 0
    ) {
        // --
        let object = {
            "IdDetalleDeuda": 0,
            "IdVerifFinanciera": 0,
            "EntidadInformante": txt_1_11_entidad_informante,
            "Calificacion": txt_1_11_calificacion,
            "Capital": txt_1_11_capital,
            "InteresComisiones": txt_1_11_intereses_comisiones,
            "DeudaTotal": txt_1_11_deuda_total,
        }

        // -- Agregar objeto al listado
        listDetalleDeuda.push(object)
        indexListDetalleDeuda = tableDetalleDeuda.rows().count() + 1

        // -- Agregar datos a la tabla
        tableDetalleDeuda.row.add([
            indexListDetalleDeuda,
            txt_1_11_entidad_informante,
            txt_1_11_calificacion,
            txt_1_11_capital,
            txt_1_11_intereses_comisiones,
            txt_1_11_deuda_total,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListDetalleDeuda + '" id="btn_1_11_delete_row_detalle_deuda"> <i class="fa fa-trash"></i></button >'
        ]).draw(false);
        tableDetalleDeuda.columns.adjust()
            .responsive.recalc();
        // --
        indexListDetalleDeuda++
        clearFormularyDetalleDeuda()
    } else {
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    }
})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_1_11_delete_row_detalle_deuda', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tableDetalleDeuda.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tableDetalleDeuda.row(index).remove().draw(false);
    // --
    let indexObject = listDetalleDeuda.findIndex(x => x.index == value);
    listDetalleDeuda.splice(indexObject, 1);
    // --
})

// -- LIMPIAR FORMULARIO
function clearFormularyDetalleDeuda() {
    // --
    $('#txt_1_11_entidad_informante').val('')
    $('#txt_1_11_calificacion').val('')
    $('#txt_1_11_capital').val('')
    $('#txt_1_11_intereses_comisiones').val('')
    $('#txt_1_11_deuda_total').val('')
}





// -- VERIFICACIONES DE PERSONAS EXCLUIDAS DE LA SBS Y AFP

// -- VARIABLES
var listPersonasExclusivas = new Array()
var indexListPersonasExclusivas = 1

// -- TABLE
var tablePersonasExclusivas = $('#tbl_1_12_list').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_1_12_agregar").on('click', function () {
    // --
    let txt_1_12_entidad_1 = $('#txt_1_12_entidad_1').val()
    let txt_1_12_fec_ing_spp = formatSave($('#txt_1_12_fec_ing_spp').val())
    let txt_1_12_nro_expediente = $('#txt_1_12_nro_expediente').val()
    let txt_1_12_nro_resol = $('#txt_1_12_nro_resol').val()
    let txt_1_12_fec_resol = formatSave($('#txt_1_12_fec_resol').val())
    let txt_1_12_entidad_2 = $('#txt_1_12_entidad_2').val()

    // -- Validar
    if (
        txt_1_12_entidad_1.length > 0 &&
        txt_1_12_fec_ing_spp.length > 0 &&
        txt_1_12_nro_expediente.length > 0 &&
        txt_1_12_nro_resol.length > 0 &&
        txt_1_12_fec_resol.length > 0 &&
        txt_1_12_entidad_2.length > 0
    ) {
        // --
        let object = {
            "IdVerifPersExc": 0,
            "ItemVerifPersExc": 0,
            "Entidad": txt_1_12_entidad_1,
            "FecIngSPP": txt_1_12_fec_ing_spp,
            "NroExpediente": txt_1_12_nro_expediente,
            "NroResol": txt_1_12_nro_resol,
            "FecResol": txt_1_12_fec_resol,
            "Entidad2": txt_1_12_entidad_2
        }

        // -- Agregar objeto al listado
        listPersonasExclusivas.push(object)
        indexListPersonasExclusivas = tablePersonasExclusivas.rows().count() + 1

        // -- Agregar datos a la tabla
        tablePersonasExclusivas.row.add([
            indexListPersonasExclusivas,
            txt_1_12_entidad_1,
            txt_1_12_fec_ing_spp,
            txt_1_12_nro_expediente,
            txt_1_12_nro_resol,
            txt_1_12_fec_resol,
            txt_1_12_entidad_2,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListPersonasExclusivas + '" id="btn_1_12_delete_row"> <i class="fa fa-trash"></i></button >'
        ]).draw(false);
        tablePersonasExclusivas.columns.adjust()
            .responsive.recalc();
        // --
        indexListPersonasExclusivas++
        clearFormularyPersonasExclusivas()
    } else {
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    }
})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_1_12_delete_row', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tablePersonasExclusivas.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tablePersonasExclusivas.row(index).remove().draw(false);
    // --
    let indexObject = listPersonasExclusivas.findIndex(x => x.index == value);
    listPersonasExclusivas.splice(indexObject, 1);
    // --
})

// -- LIMPIAR FORMULARIO
function clearFormularyPersonasExclusivas() {
    // --
    $('#txt_1_12_entidad_1').val('')
    $('#txt_1_12_fec_ing_spp').val('')
    $('#txt_1_12_nro_expediente').val('')
    $('#txt_1_12_nro_resol').val('')
    $('#txt_1_12_fec_resol').val('')
    $('#txt_1_12_entidad_2').val('')
}



// -- VERIFICACION ACADÉMICA (SUNEDU)

// -- VARIABLES
var listVerificacionAcademica = new Array()
var indexListVerificacionAcademica = 1

// -- TABLE
var tableVerificacionAcademica = $('#tbl_1_13_list').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_1_13_agregar").on('click', function () {
    // --
    let txt_1_13_graduado = $('#txt_1_13_graduado').val()
    let txt_1_13_grado_titulo = $('#txt_1_13_grado_titulo').val()
    let txt_1_13_institucion = $('#txt_1_13_institucion').val()

    // -- Validar
    if (
        txt_1_13_graduado.length > 0 &&
        txt_1_13_grado_titulo.length > 0 &&
        txt_1_13_institucion.length > 0
    ) {
        // --
        let object = {
            "Graduado": txt_1_13_graduado,
            "Grado": txt_1_13_grado_titulo,
            "Institucion": txt_1_13_institucion
        }

        // -- Agregar objeto al listado
        listVerificacionAcademica.push(object)
        indexListVerificacionAcademica = tableVerificacionAcademica.rows().count() + 1

        // -- Agregar datos a la tabla
        tableVerificacionAcademica.row.add([
            indexListVerificacionAcademica,
            txt_1_13_graduado,
            txt_1_13_grado_titulo,
            txt_1_13_institucion,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListVerificacionAcademica + '" id="btn_1_13_delete_row"> <i class="fa fa-trash"></i></button >'
        ]).draw(false);
        tableVerificacionAcademica.columns.adjust()
            .responsive.recalc();
        // --
        indexListVerificacionAcademica++
        clearFormularyVerificacionAcademica()
    } else {
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    }
})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_1_13_delete_row', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tableVerificacionAcademica.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tableVerificacionAcademica.row(index).remove().draw(false);
    // --
    let indexObject = listVerificacionAcademica.findIndex(x => x.index == value);
    listVerificacionAcademica.splice(indexObject, 1);
    // --
})

// -- LIMPIAR FORMULARIO
function clearFormularyVerificacionAcademica() {
    // --
    $('#txt_1_13_graduado').val('')
    $('#txt_1_13_grado_titulo').val('')
    $('#txt_1_13_institucion').val('')

}


// -- MULTAS ELECTORALES   

// -- VARIABLES
var listMultasElectorales = new Array()
var indexListMultasElectorales = 1

// -- TABLE
var tableMultasElectorales = $('#tbl_1_15_list').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_1_15_agregar").on('click', function () {
    // --
    let txt_1_15_codigo = $('#txt_1_15_codigo').val()
    let txt_1_15_proceso_electoral = $('#txt_1_15_proceso_electoral').val()
    let txt_1_15_tipo_omision = $('#txt_1_15_tipo_omision').val()
    let txt_1_15_deuda = $('#txt_1_15_deuda').val()
    let txt_1_15_etapa_cobranza = $('#txt_1_15_etapa_cobranza').val()

    // -- Validar
    if (
        txt_1_15_codigo.length > 0 &&
        txt_1_15_proceso_electoral.length > 0 &&
        txt_1_15_tipo_omision.length > 0 &&
        txt_1_15_deuda.length > 0 &&
        txt_1_15_etapa_cobranza.length > 0
    ) {
        // --
        let object = {
            "Codigo": txt_1_15_codigo,
            "ProcesoElectoral": txt_1_15_proceso_electoral,
            "TipoOmision": txt_1_15_tipo_omision,
            "Deuda": txt_1_15_deuda,
            "EtapaCobranza": txt_1_15_etapa_cobranza,
        }

        // -- Agregar objeto al listado
        listMultasElectorales.push(object)
        indexListMultasElectorales = tableMultasElectorales.rows().count() + 1

        // -- Agregar datos a la tabla
        tableMultasElectorales.row.add([
            indexListMultasElectorales,
            txt_1_15_codigo,
            txt_1_15_proceso_electoral,
            txt_1_15_tipo_omision,
            txt_1_15_deuda,
            txt_1_15_etapa_cobranza,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListMultasElectorales + '" id="btn_1_15_delete_row"> <i class="fa fa-trash"></i></button >'
        ]).draw(false);
        tableMultasElectorales.columns.adjust()
            .responsive.recalc();
        // --
        indexListMultasElectorales++
        clearFormularyMultasElectorales()
    } else {
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    }
})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_1_15_delete_row', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tableMultasElectorales.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tableMultasElectorales.row(index).remove().draw(false);
    // --
    let indexObject = listMultasElectorales.findIndex(x => x.index == value);
    listMultasElectorales.splice(indexObject, 1);
    // --
})

// -- LIMPIAR FORMULARIO
function clearFormularyMultasElectorales() {
    // --
    $('#txt_1_15_codigo').val('')
    $('#txt_1_15_proceso_electoral').val('')
    $('#txt_1_15_tipo_omision').val('')
    $('#txt_1_15_deuda').val('')
    $('#txt_1_15_etapa_cobranza').val('')
}


// -- VERIFICACIÓN DE ANTECEDENTES LABORALES

// -- VARIABLES
var listAntecedentesLaborales = new Array()
var indexListAntecedentesLaborales = 1

// -- TABLE
var tableAntecedentesLaborales = $('#tbl_1_18_list').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_1_18_agregar").on('click', function () {
    // --
    let txt_1_18_periodo = $('#txt_1_18_codigo').val()
    let sl_1_18_sexo = $('#sl_1_18_sexo').val()
    let txt_1_18_empresa = $('#txt_1_18_empresa').val()
    let txt_1_18_ruc = $('#txt_1_18_ruc').val()
    let txt_1_18_rubro_empresa = $('#txt_1_18_rubro_empresa').val()

    // -- Validar
    if (
        txt_1_18_periodo.length > 0 &&
        txt_1_18_empresa.length > 0 &&
        txt_1_18_ruc.length > 0 &&
        txt_1_18_rubro_empresa.length > 0
    ) {
        // --
        let object = {
            "Periodo": txt_1_18_periodo,
            "Sexo": sl_1_18_sexo,
            "Empresa": txt_1_18_empresa,
            "RUC": txt_1_18_ruc,
            "RubroEmpresa": txt_1_18_rubro_empresa,
        }

        // -- Agregar objeto al listado
        listAntecedentesLaborales.push(object)
        indexListAntecedentesLaborales = tableAntecedentesLaborales.rows().count() + 1

        // -- Agregar datos a la tabla
        tableAntecedentesLaborales.row.add([
            indexListAntecedentesLaborales,
            txt_1_18_periodo,
            sl_1_18_sexo,
            txt_1_18_empresa,
            txt_1_18_ruc,
            txt_1_18_rubro_empresa,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListAntecedentesLaborales + '" id="btn_1_18_delete_row"> <i class="fa fa-trash"></i></button >'
        ]).draw(false);
        tableAntecedentesLaborales.columns.adjust()
            .responsive.recalc();
        // --
        indexListAntecedentesLaborales++
        clearFormularyAntecedentesLaborales()
    } else {
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    }
})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_1_18_delete_row', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tableAntecedentesLaborales.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tableAntecedentesLaborales.row(index).remove().draw(false);
    // --
    let indexObject = listAntecedentesLaborales.findIndex(x => x.index == value);
    listAntecedentesLaborales.splice(indexObject, 1);
    // --
})

// -- LIMPIAR FORMULARIO
function clearFormularyAntecedentesLaborales() {
    // --
    $('#txt_1_18_codigo').val('')
    $('#txt_1_18_empresa').val('')
    $('#txt_1_18_ruc').val('')
    $('#txt_1_18_rubro_empresa').val('')
}




// -- VERIFICACIÓN CARGOS PUBLICOS

// -- VARIABLES
var listCargosPublicos = new Array()
var indexListCargosPublicos = 1

// -- TABLE
var tableCargosPublicos = $('#tbl_1_19_list').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_1_19_agregar").on('click', function () {
    // --
    let txt_1_19_numero = $('#txt_1_19_numero').val()
    let txt_1_19_institucion = $('#txt_1_19_institucion').val()
    let txt_1_19_tipo_sancion = $('#txt_1_19_tipo_sancion').val()
    let txt_1_19_categoria = $('#txt_1_19_categoria').val()
    let txt_1_19_estado = $('#txt_1_19_estado').val()

    // -- Validar
    if (
        txt_1_19_numero.length > 0 &&
        txt_1_19_institucion.length > 0 &&
        txt_1_19_tipo_sancion.length > 0 &&
        txt_1_19_categoria.length > 0 &&
        txt_1_19_estado.length > 0
    ) {
        // --
        let object = {
            "Num": txt_1_19_numero,
            "Institucion": txt_1_19_institucion,
            "TipoSancion": txt_1_19_tipo_sancion,
            "Categoria": txt_1_19_categoria,
            "Estado": txt_1_19_estado,
        }

        // -- Agregar objeto al listado
        listCargosPublicos.push(object)
        indexListCargosPublicos = tableCargosPublicos.rows().count() + 1

        // -- Agregar datos a la tabla
        tableCargosPublicos.row.add([
            indexListCargosPublicos,
            txt_1_19_numero,
            txt_1_19_institucion,
            txt_1_19_tipo_sancion,
            txt_1_19_categoria,
            txt_1_19_estado,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListCargosPublicos + '" id="btn_1_19_delete_row"> <i class="fa fa-trash"></i></button >'
        ]).draw(false);
        tableCargosPublicos.columns.adjust()
            .responsive.recalc();
        // --
        indexListCargosPublicos++
        clearFormularyCargosPublicos()
    } else {
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    }
})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_1_19_delete_row', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tableCargosPublicos.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tableCargosPublicos.row(index).remove().draw(false);
    // --
    let indexObject = listCargosPublicos.findIndex(x => x.index == value);
    listCargosPublicos.splice(indexObject, 1);
    // --
})

// -- LIMPIAR FORMULARIO
function clearFormularyCargosPublicos() {
    // --
    $('#txt_1_19_numero').val('')
    $('#txt_1_19_institucion').val('')
    $('#txt_1_19_tipo_sancion').val('')
    $('#txt_1_19_categoria').val('')
    $('#txt_1_19_estado').val('')
}



// -- VERIFICACIÓN FILIACION POLITICA 

// -- VARIABLES
var listFiliacionPolitica = new Array()
var indexListFiliacionPolitica = 1

// -- TABLE
var tableFiliacionPolitica = $('#tbl_1_20_list').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_1_20_agregar").on('click', function () {
    // --
    let txt_1_20_historia_afilacion = $('#txt_1_20_historia_afilacion').val()
    let txt_1_20_historia_candidatura = $('#txt_1_20_historia_candidatura').val()

    // -- Validar
    if (
        txt_1_20_historia_afilacion.length > 0 &&
        txt_1_20_historia_candidatura.length > 0
    ) {
        // --
        let object = {
            "HistorialAFiliacion": txt_1_20_historia_afilacion,
            "HistorialCandidatura": txt_1_20_historia_candidatura,
        }

        // -- Agregar objeto al listado
        listFiliacionPolitica.push(object)
        indexListFiliacionPolitica = tableFiliacionPolitica.rows().count() + 1

        // -- Agregar datos a la tabla
        tableFiliacionPolitica.row.add([
            indexListFiliacionPolitica,
            txt_1_20_historia_afilacion,
            txt_1_20_historia_candidatura,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListFiliacionPolitica + '" id="btn_1_20_delete_row"> <i class="fa fa-trash"></i></button >'
        ]).draw(false);
        tableFiliacionPolitica.columns.adjust()
            .responsive.recalc();
        // --
        indexListFiliacionPolitica++
        clearFormularyFiliacionPolitica()
    } else {
        functions.notify_message(MESSAGE.es.complete_formulary, 'warning')
    }
})

// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_1_20_delete_row', function () {
    // --
    let value = $(this).attr('data-id')
    let index = null;
    // --
    tableFiliacionPolitica.rows(function (idx, data, node) {
        if (data[0] == value) {
            index = idx;
        }
    });
    // --
    tableFiliacionPolitica.row(index).remove().draw(false);
    // --
    let indexObject = listFiliacionPolitica.findIndex(x => x.index == value);
    listFiliacionPolitica.splice(indexObject, 1);
    // --
})

// -- LIMPIAR FORMULARIO
function clearFormularyFiliacionPolitica() {
    // --
    $('#txt_1_20_historia_afilacion').val('')
    $('#txt_1_20_historia_candidatura').val('')
}



// -- DESEMPEÑO LABORAL

var txt_1_21_nombre_empresa = $('#txt_1_21_nombre_empresa').val()
var txt_1_21_cargo_desempenado = $('#txt_1_21_cargo_desempenado').val()
var txt_1_21_fecha_inicio = $('#txt_1_21_fecha_inicio').val()
var txt_1_21_fecha_termino = $('#txt_1_21_fecha_termino').val()
var txt_1_21_motivo_retiro = $('#txt_1_21_motivo_retiro').val()
var txt_1_21_persona_brinda_infomacion = $('#txt_1_21_persona_brinda_infomacion').val()
var txt_1_21_cargo = $('#txt_1_21_cargo').val()
var txt_1_21_telefonos_correo = $('#txt_1_21_telefonos_correo').val()


// -- II. INFORME SOCIOECONÓMICO

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
    // --
    var formData = new FormData();
    // -- GET VALUES
    let idIntegridad = getDatos("key");
    var itemIntegridad = getDatos("item");

    // -- I. INFORME ANTECEDENTES JUDICIALES

    // -- 1.1 DATOS BASICOS DEL CANDIDATO
    var txt_1_1_nombre = $('#txt_1_1_nombre').val()
    var txt_1_1_identificacion = $('#txt_1_1_identificacion').val()
    var txt_1_1_lugar_nacimiento = $('#txt_1_1_lugar_nacimiento').val()
    var txt_1_1_fecha_nacimiento = formatSave($('#txt_1_1_fecha_nacimiento').val())
    var txt_1_1_nacionalidad = $('#txt_1_1_nacionalidad').val()
    var txt_1_1_edad = $('#txt_1_1_edad').val()
    var txt_1_1_estado_civil = $('#txt_1_1_estado_civil').val()

    // -- 1.2 PROCESOS JUDICIALES
    var txt_1_2_procesos_contra = $('#txt_1_2_procesos_contra').val()
    var txt_1_2_procesos_interpuestos = $('#txt_1_2_procesos_interpuestos').val()


    // -- 1.3 PROCESOS PENALES
    var txt_1_3_procesos_contra = $('#txt_1_3_procesos_contra').val()
    var txt_1_3_procesos_interpuestos = $('#txt_1_3_procesos_interpuestos').val()


    // -- 1.4 PROCESOS POLICIALES
    var txt_1_4_procesos_contra = $('#txt_1_4_procesos_contra').val()
    var txt_1_4_procesos_interpuestos = $('#txt_1_4_procesos_interpuestos').val()


    // -- 1.5 FICHA RENIEC
    var file_1_5_imagen = $('#file_1_5_imagen').prop("files")[0];
    var ext1_5_ficha_reniec = ""
    // --
    if (file_1_5_imagen !== undefined) {
        // --
        ext1_5_ficha_reniec = getFileExtension(file_1_5_imagen.name)
        // --
        if (ext1_5_ficha_reniec == "img" || ext1_5_ficha_reniec == "png" || ext1_5_ficha_reniec == "jpg" || ext1_5_ficha_reniec == "jpeg") {
            // --
            console.log(file_1_5_imagen);
            formData.append("dataFile", file_1_5_imagen, "FichaReniec." + ext1_5_ficha_reniec);
        }
    }

    // -- 1.6 TEXTO

    // -- 1.7 ANTECEDENTES POR TERRORISMO


    // -- 1.8 ANTECEDENTES POR TRAFICO ILÍCITO DE DROGAS


    // -- 1.9 REGISTRO DE DEUDAS ALIMENTARIAS


    // -- 1.10 DESCARTE DE HOMONIMIA


    // -- 1.11 VERIFICACION FINANCIERA SBS


    // -- CALIFICACIÓN CREDITICIA
    var txt_1_11_periodo_reportado = $('#txt_1_11_periodo_reportado').val()
    var txt_1_11_normal = $('#txt_1_11_normal').val()
    var txt_1_11_problemas_potenciales = $('#txt_1_11_problemas_potenciales').val()
    var txt_1_11_deficiente = $('#txt_1_11_deficiente').val()
    var txt_1_11_dudoso = $('#txt_1_11_dudoso').val()
    var txt_1_11_perdida = $('#txt_1_11_perdida').val()

    // -- DETALLE DEUDA


    // -- 1.12 VERIFICACIONES DE PERSONAS EXCLUIDAS DE LA SBS Y AFP


    // -- 1.13 VERIFICACION ACADÉMICA (SUNEDU)


    // -- 1.14 VERIFICACION ESSALUD
    var file_1_14_imagen = $('#file_1_14_imagen').prop("files")[0];
    var ext1_14_verificacion_essalud = ""
    // --
    if (file_1_14_imagen !== undefined) {
        // --
        ext1_14_verificacion_essalud = getFileExtension(file_1_14_imagen.name)
        // --
        if (ext1_14_verificacion_essalud == "img" || ext1_14_verificacion_essalud == "png" || ext1_14_verificacion_essalud == "jpg" || ext1_14_verificacion_essalud == "jpeg") {
            // --
            formData.append("dataFile", file_1_14_imagen, "VerificacionEssalud." + ext1_14_verificacion_essalud);
        }
    }

    // -- 1.15 MULTAS ELECTORALES


    // -- 1.16 VERIFICACIÓN SUNAT
    var file_1_16_imagen = $('#file_1_16_imagen').prop("files")[0];
    var ext1_16_verificacion_sunat = ""
    // --
    if (file_1_16_imagen !== undefined) {
        // --
        ext1_16_verificacion_sunat = getFileExtension(file_1_16_imagen.name)
        // --
        if (ext1_16_verificacion_sunat == "img" || ext1_16_verificacion_sunat == "png" || ext1_16_verificacion_sunat == "jpg" || ext1_16_verificacion_sunat == "jpeg") {
            // --
            formData.append("dataFile", file_1_16_imagen, "FichaReniec." + ext1_16_verificacion_sunat)
        }
    }

    // -- 1.17 VERIFICACIÓN RECORD DEL CONDUCTOR
    var file_1_17_imagen = $('#file_1_17_imagen').prop("files")[0];
    var ext1_17_record_conductor = ""
    // --
    if (file_1_17_imagen !== undefined) {
        // --
        ext1_17_record_conductor = getFileExtension(file_1_17_imagen.name)
        // --
        if (ext1_17_record_conductor == "img" || ext1_17_record_conductor == "png" || ext1_17_record_conductor == "jpg" || ext1_17_record_conductor == "jpeg") {
            // --
            formData.append("dataFile", file_1_17_imagen, "RecordConductor." + ext1_17_record_conductor)
        }
    }

    // -- 1.18 VERIFICACIÓN DE ANTECEDENTES LABORALES

    // -- 1.19 VERIFICACIÓN CARGOS PUBLICOS

    // -- 1.20 VERIFICACIÓN FILIACION POLITICA


    // -- 1.21 DESEMPEÑO LABORAL
    var txt_1_21_nombre_empresa = $('#txt_1_21_nombre_empresa').val()
    var txt_1_21_cargo_desempenado = $('#txt_1_21_cargo_desempenado').val()
    var txt_1_21_fecha_inicio = formatSave($('#txt_1_21_fecha_inicio').val())
    var txt_1_21_fecha_termino = formatSave($('#txt_1_21_fecha_termino').val())
    var txt_1_21_motivo_retiro = $('#txt_1_21_motivo_retiro').val()
    var txt_1_21_persona_brinda_infomacion = $('#txt_1_21_persona_brinda_infomacion').val()
    var txt_1_21_cargo = $('#txt_1_21_cargo').val()
    var txt_1_21_telefonos_correo = $('#txt_1_21_telefonos_correo').val()
    var sl_1_21_desempeno = $("#sl_1_21_desempeno").val()
    var sl_1_21_volveria_contratar = $("#sl_1_21_volveria_contratar").val()

    // -- II. TEST CONFIABILIDAD
    var file_2_0_test_confiabilidad = $('#file_2_0_test_confiabilidad').prop("files")[0];
    var ext2_0_test_confiabilidad = ""
    // --
    if (file_2_0_test_confiabilidad !== undefined) {
        // --
        ext2_0_test_confiabilidad = getFileExtension(file_2_0_test_confiabilidad.name)
        // --
        if (ext2_0_test_confiabilidad == "pdf") {
            // --
            formData.append("dataFile", file_2_0_test_confiabilidad, "TestConfiabilidad." + ext2_0_test_confiabilidad);
        }
    }


    // -- III. INFORME SOCIOECONÓMICO


    // -- 3.0
    var txt_3_0_fecha_visita = formatSave($('#txt_3_0_fecha_visita').val())
    var txt_3_0_ciudad = $('#txt_3_0_ciudad').val()
    var txt_3_0_empresa_solicitante = $('#txt_3_0_empresa_solicitante').val()
    var sl_3_0_visita_domiciliaria = $('#sl_3_0_visita_domiciliaria').val()

    // -- 3.1 INFORMACION BASICA DEL CANDIDATO
    var txt_3_1_nombres_apellidos = $('#txt_3_1_nombres_apellidos').val()
    var sl_3_1_tipo_documento = $('#sl_3_1_tipo_documento').val()
    var txt_3_1_nro = $('#txt_3_1_nro').val()
    var txt_3_1_lugar_fecha_nacimento = $('#txt_3_1_lugar_fecha_nacimento').val()
    var txt_3_1_edad = $('#txt_3_1_edad').val()
    var sl_3_1_estado_civil = $('#sl_3_1_estado_civil').val()
    var txt_3_1_direccion = $('#txt_3_1_direccion').val()
    var txt_3_1_telefonos = $('#txt_3_1_telefonos').val()
    var txt_3_1_libretas_militar = $('#txt_3_1_libretas_militar').val()
    var txt_3_1_clase = $('#txt_3_1_clase').val()
    var txt_3_1_correo_electronico = $('#txt_3_1_correo_electronico').val()
    var txt_3_1_eps = $('#txt_3_1_eps').val()
    var txt_3_1_fondos_pensiones = $('#txt_3_1_fondos_pensiones').val()
    var txt_3_1_fondos_cesantias = $('#txt_3_1_fondos_cesantias').val()
    var txt_3_1_nivel_educativo = $('#txt_3_1_nivel_educativo').val()
    var txt_3_1_cargo_aplica = $('#txt_3_1_cargo_aplica').val()
    var sl_3_1_viaje_exterior = $('#sl_3_1_viaje_exterior').val()
    var txt_3_1_motivo_viaje = $('#txt_3_1_motivo_viaje').val()

    // -- 3.2 INFORMACIÓN ACADEMICA

    // -- BACHILLERATO
    var txt_3_2_bachillerato_institucion = $('#txt_3_2_bachillerato_institucion').val()
    var txt_3_2_bachillerato_titulo = $('#txt_3_2_bachillerato_titulo').val()
    var txt_3_2_bachillerato_estado = $('#txt_3_2_bachillerato_estado').val()
    var txt_3_2_bachillerato_fecha_inicio = formatSave($('#txt_3_2_bachillerato_fecha_inicio').val())
    var txt_3_2_bachillerato_fecha_terminacion = formatSave($('#txt_3_2_bachillerato_fecha_terminacion').val())

    // -- TECNICOS
    var txt_3_2_tecnicos_institucion = $('#txt_3_2_tecnicos_institucion').val()
    var txt_3_2_tecnicos_titulo = $('#txt_3_2_tecnicos_titulo').val()
    var txt_3_2_tecnicos_estado = $('#txt_3_2_tecnicos_estado').val()
    var txt_3_2_tecnicos_fecha_inicio = formatSave($('#txt_3_2_tecnicos_fecha_inicio').val())
    var txt_3_2_tecnicos_fecha_terminacion = formatSave($('#txt_3_2_tecnicos_fecha_terminacion').val())

    // -- TECNOLOGICOS
    var txt_3_2_tecnologicos_institucion = $('#txt_3_2_tecnologicos_institucion').val()
    var txt_3_2_tecnologicos_titulo = $('#txt_3_2_tecnologicos_titulo').val()
    var txt_3_2_tecnologicos_estado = $('#txt_3_2_tecnologicos_estado').val()
    var txt_3_2_tecnologicos_fecha_inicio = formatSave($('#txt_3_2_tecnologicos_fecha_inicio').val())
    var txt_3_2_tecnologicos_fecha_terminacion = formatSave($('#txt_3_2_tecnologicos_fecha_terminacion').val())

    // -- UNIVERSITARIOS
    var txt_3_2_universitarios_institucion = $('#txt_3_2_universitarios_institucion').val()
    var txt_3_2_universitarios_titulo = $('#txt_3_2_universitarios_titulo').val()
    var txt_3_2_universitarios_estado = $('#txt_3_2_universitarios_estado').val()
    var txt_3_2_universitarios_fecha_inicio = formatSave($('#txt_3_2_universitarios_fecha_inicio').val())
    var txt_3_2_universitarios_fecha_terminacion = formatSave($('#txt_3_2_universitarios_fecha_terminacion').val())

    // -- POSTGRADO
    var txt_3_2_postgrado_institucion = $('#txt_3_2_postgrado_institucion').val()
    var txt_3_2_postgrado_titulo = $('#txt_3_2_postgrado_titulo').val()
    var txt_3_2_postgrado_estado = $('#txt_3_2_postgrado_estado').val()
    var txt_3_2_postgrado_fecha_inicio = formatSave($('#txt_3_2_postgrado_fecha_inicio').val())
    var txt_3_2_postgrado_fecha_terminacion = formatSave($('#txt_3_2_postgrado_fecha_terminacion').val())

    // -- OTROS ESTUDIOS
    var txt_3_2_otros_institucion = $('#txt_3_2_otros_institucion').val()
    var txt_3_2_otros_titulo = $('#txt_3_2_otros_titulo').val()
    var txt_3_2_otros_estado = $('#txt_3_2_otros_estado').val()
    var txt_3_2_otros_fecha_inicio = formatSave($('#txt_3_2_otros_fecha_inicio').val())
    var txt_3_2_otros_fecha_terminacion = formatSave($('#txt_3_2_otros_fecha_terminacion').val())

    // -- FORMULARIO
    var txt_3_2_activades = $('#txt_3_2_activades').val()
    var txt_3_2_proyectos_proyecciones = $('#txt_3_2_proyectos_proyecciones').val()
    var txt_3_2_aspectos_criticos_riesgo = $('#txt_3_2_aspectos_criticos_riesgo').val()
    var txt_3_2_problemas_justicia = $('#txt_3_2_problemas_justicia').val()
    var txt_3_2_consumidor_alcohol_drogas = $('#txt_3_2_consumidor_alcohol_drogas').val()
    var txt_3_2_personas_presentes = $('#txt_3_2_personas_presentes').val()

    // -- 3.3 ENTORNO FAMILIAR

    // -- PADRE
    var txt_3_3_padre_nombres = $('#txt_3_3_padre_nombres').val()
    var txt_3_3_padre_edad = $('#txt_3_3_padre_edad').val()
    var txt_3_3_padre_nivel_educativo = $('#txt_3_3_padre_nivel_educativo').val()
    var txt_3_3_padre_ocupacion = $('#txt_3_3_padre_ocupacion').val()
    var txt_3_3_padre_empresa_institucion = $('#txt_3_3_padre_empresa_institucion').val()
    var txt_3_3_padre_convive_usted = $('#txt_3_3_padre_convive_usted').val()

    // -- MADRE
    var txt_3_3_madre_nombres = $('#txt_3_3_madre_nombres').val()
    var txt_3_3_madre_edad = $('#txt_3_3_madre_edad').val()
    var txt_3_3_madre_nivel_educativo = $('#txt_3_3_madre_nivel_educativo').val()
    var txt_3_3_madre_ocupacion = $('#txt_3_3_madre_ocupacion').val()
    var txt_3_3_madre_empresa_institucion = $('#txt_3_3_madre_empresa_institucion').val()
    var txt_3_3_madre_convive_usted = $('#txt_3_3_madre_convive_usted').val()

    // -- HERMANOS
    

    // -- CONYUGUES
    var txt_3_3_conyugue_nombres = $('#txt_3_3_conyugue_nombres').val()
    var txt_3_3_conyugue_edad = $('#txt_3_3_conyugue_edad').val()
    var txt_3_3_conyugue_nivel_educativo = $('#txt_3_3_conyugue_nivel_educativo').val()
    var txt_3_3_conyugue_ocupacion = $('#txt_3_3_conyugue_ocupacion').val()
    var txt_3_3_conyugue_empresa_institucion = $('#txt_3_3_conyugue_empresa_institucion').val()
    var txt_3_3_conyugue_convive_usted = $('#txt_3_3_conyugue_convive_usted').val()

    // -- HIJOS


    // -- 3.4 ENTORNO PROFESIONAL Y LABORAL


    // -- 3.5 VACIOS LABORALES Y/O INACTIVIDAD LABORAL


    // -- FORMULARIO
    var txt_3_5_razones_cambio_empleo = $('#txt_3_5_razones_cambio_empleo').val()
    var txt_3_5_motivos_cambio_empleo = $('#txt_3_5_motivos_cambio_empleo').val()
    var txt_3_5_empleo_ideal = $('#txt_3_5_empleo_ideal').val()
    var txt_3_5_aspiracion_salarial = $('#txt_3_5_aspiracion_salarial').val()
    var txt_3_5_conocimiento_empresa = $('#txt_3_5_conocimiento_empresa').val()
    var txt_3_5_hoja_vida_empresa = $('#txt_3_5_hoja_vida_empresa').val()
    var txt_3_5_persona_dentro_empresa = $('#txt_3_5_persona_dentro_empresa').val()

    // -- 3.6 INFORMACION ECONÓMICA

    // --
    var txt_3_6_ingresos_mensuales_ingresos_fijos = $('#txt_3_6_ingresos_mensuales_ingresos_fijos').val()
    var txt_3_6_ingresos_mensuales_apoyo_economico = $('#txt_3_6_ingresos_mensuales_apoyo_economico').val()
    var txt_3_6_ingresos_mensuales_otros_ingresos = $('#txt_3_6_ingresos_mensuales_otros_ingresos').val()
    var txt_3_6_ingresos_mensuales_total_ingresos = $('#txt_3_6_ingresos_mensuales_total_ingresos').val()

    // --
    var txt_3_6_gastos_mensuales_gastos_fijos = $('#txt_3_6_gastos_mensuales_gastos_fijos').val()
    var txt_3_6_gastos_mensuales_creditos = $('#txt_3_6_gastos_mensuales_creditos').val()
    var txt_3_6_gastos_mensuales_valor = $('#txt_3_6_gastos_mensuales_valor').val()
    var txt_3_6_gastos_mensuales_total_egresos = $('#txt_3_6_gastos_mensuales_total_egresos').val()

    // --
    var txt_3_6_comerciales_nombre = $('#txt_3_6_comerciales_nombre').val()
    var txt_3_6_data_credito = $('#txt_3_6_data_credito').val()


    // -- 3.7 SITUACION DE SALUD

    // --
    var txt_3_7_familia_tipo_enfermedad = $('#txt_3_7_familia_tipo_enfermedad').val()
    var txt_3_7_familia_enfermedad = $('#txt_3_7_familia_enfermedad').val()
    var txt_3_7_familia_tipo_medicamento_ingiere = $('#txt_3_7_familia_tipo_medicamento_ingiere').val()
    var txt_3_7_familia_tiempo_enfermedad = $('#txt_3_7_familia_tiempo_enfermedad').val()
    var txt_3_7_familia_observaciones = $('#txt_3_7_familia_observaciones').val()

    // -- 
    var txt_3_7_usted_tipo_enfermedad = $('#txt_3_7_usted_tipo_enfermedad').val()
    var txt_3_7_usted_enfermedad = $('#txt_3_7_usted_enfermedad').val()
    var txt_3_7_usted_tipo_medicamento_ingiere = $('#txt_3_7_usted_tipo_medicamento_ingiere').val()
    var txt_3_7_usted_tiempo_enfemerdad = $('#txt_3_7_usted_tiempo_enfemerdad').val()
    var txt_3_7_usted_observaciones = $('#txt_3_7_usted_observaciones').val()



    // -- 3.8 CARACTERISTICAS BASICAS DE LA VIVIENDA

    // --
    var txt_3_8_estrato_social = $('#txt_3_8_estrato_social').val()
    var txt_3_8_ubicacion = $('#txt_3_8_ubicacion').val()
    var txt_3_8_tiempo_residencia = $('#txt_3_8_tiempo_residencia').val()

    // --
    var sl_3_8_tipo = $('#sl_3_8_tipo').val()
    var sl_3_8_aprecion_interna = $('#sl_3_8_aprecion_interna').val()
    var sl_3_8_aprecion_externa = $('#sl_3_8_aprecion_externa').val()

    // --
    var check_servicios_publicos = $('[name="check_servicios_publicos[]"]:checked').map(function () {
        return this.value;
    }).get();
    check_servicios_publicos = check_servicios_publicos.join('|')

    var check_servicios_instalados = $('[name="check_servicios_instalados[]"]:checked').map(function () {
        return this.value;
    }).get();
    check_servicios_instalados = check_servicios_instalados.join('|')

    // --
    var sl_3_8_estado = $('#sl_3_8_estado').val()
    var sl_3_8_servicio_alcantarillado = $('#sl_3_8_servicio_alcantarillado').val()
    var sl_3_8_ubicacion = $('#sl_3_8_ubicacion').val()
    var sl_3_8_distribucion = $('#sl_3_8_distribucion').val()
    var sl_3_8_ambiente_sector = $('#sl_3_8_ambiente_sector').val()
    var sl_3_8_vias_acceso = $('#sl_3_8_vias_acceso').val()
    var sl_3_8_propiedad = $('#sl_3_8_propiedad').val()
    var txt_3_8_concepto = $('#txt_3_8_concepto').val()

    // -- 


    // -- 3.9 APRECIACIÓN DEL EVALUADOR

    // -- 
    var sl_3_9_resultado = $('#sl_3_9_resultado').val()
    var txt_3_9_realizado_por = $('#txt_3_9_realizado_por').val()
    var txt_3_9_firma = $('#txt_3_9_firma').val()

    // -- 3.10 REGISTRO FOTOGRÁFICO

    // -- IMG
    var file_3_10_foto_entrada_domicilio = $('#file_3_10_foto_entrada_domicilio').prop("files")[0];
    var file_3_10_foto_ambiente_social = $('#file_3_10_foto_ambiente_social').prop("files")[0];
    var file_3_10_foto_habitaciones = $('#file_3_10_foto_habitaciones').prop("files")[0];
    var file_3_10_foto_cocina = $('#file_3_10_foto_cocina').prop("files")[0];

    // -- TEXT
    var txt_3_10_candidato_observaciones = $('#txt_3_10_candidato_observaciones').val()
    var txt_3_10_ambiente_social_observaciones = $('#txt_3_10_ambiente_social_observaciones').val()
    var txt_3_10_habitaciones_observaciones = $('#txt_3_10_habitaciones_observaciones').val()
    var txt_3_10_cocina_observaciones = $('#txt_3_10_cocina_observaciones').val()

    // --
    var ext3_10_foto_entrada_domicilio = ""
    // --
    if (file_3_10_foto_entrada_domicilio !== undefined) {
        // --
        ext3_10_foto_entrada_domicilio = getFileExtension(file_3_10_foto_entrada_domicilio.name)
        // --
        if (ext3_10_foto_entrada_domicilio == "img" || ext3_10_foto_entrada_domicilio == "png" || ext3_10_foto_entrada_domicilio == "jpg" || ext3_10_foto_entrada_domicilio == "jpeg") {
            // --
            formData.append("dataFile", file_3_10_foto_entrada_domicilio, "FotoEntradaDomicilio." + ext3_10_foto_entrada_domicilio);
        }
    }

    // --
    var ext3_10_foto_ambiente_social = ""
    // --
    if (file_3_10_foto_ambiente_social !== undefined) {
        // --
        ext3_10_foto_ambiente_social = getFileExtension(file_3_10_foto_ambiente_social.name)
        // --
        if (ext3_10_foto_ambiente_social == "img" || ext3_10_foto_ambiente_social == "png" || ext3_10_foto_ambiente_social == "jpg" || ext3_10_foto_ambiente_social == "jpeg") {
            // --
            formData.append("dataFile", file_3_10_foto_ambiente_social, "FotoAmbienteSocial." + ext3_10_foto_ambiente_social);
        }
    }

    // --
    var ext3_10_foto_habitaciones = ""
    // --
    if (file_3_10_foto_habitaciones !== undefined) {
        // --
        ext3_10_foto_habitaciones = getFileExtension(file_3_10_foto_habitaciones.name)
        // --
        if (ext3_10_foto_habitaciones == "img" || ext3_10_foto_habitaciones == "png" || ext3_10_foto_habitaciones == "jpg" || ext3_10_foto_habitaciones == "jpeg") {
            // --
            formData.append("dataFile", file_3_10_foto_habitaciones, "FotoHabitaciones." + ext3_10_foto_habitaciones);
        }
    }

    // --
    var ext3_10_foto_cocina = ""
    // --
    if (file_3_10_foto_cocina !== undefined) {
        // --
        ext3_10_foto_cocina = getFileExtension(file_3_10_foto_cocina.name)
        // --
        if (ext3_10_foto_cocina == "img" || ext3_10_foto_cocina == "png" || ext3_10_foto_cocina == "jpg" || ext3_10_foto_cocina == "jpeg") {
            // --
            formData.append("dataFile", file_3_10_foto_cocina, "FotoCocina." + ext3_10_foto_cocina);
        }
    }


    // -- OBJECT
    var objectData = {
        // --
        "oBasicDataFlt": {
            "IdDatoBasico": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Nombre": txt_1_1_nombre,
            "Identificacion": txt_1_1_identificacion,
            "LugarNacimiento": txt_1_1_lugar_nacimiento,
            "FechaNacimiento": txt_1_1_fecha_nacimiento,
            "Nacionalidad": txt_1_1_nacionalidad,
            "Edad": validateNumber(txt_1_1_edad),
            "IdEstadoCivil": txt_1_1_estado_civil
        },
        // --
        "oJudicialProceedingsFlt": {
            "IdProcesoJudicial": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "NumProcesosContra": validateNumber(txt_1_2_procesos_contra),
            "NumProcesosInterpuestos": validateNumber(txt_1_2_procesos_interpuestos),
            "ListJudicialProceedingsDetailFlt": listProcesosJudiciales
        },
        // -- 
        "oCriminalProceedingsFlt": {
            "IdProcesoPenal": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "NumProcesosContra": validateNumber(txt_1_3_procesos_contra),
            "NumProcesosInterpuestos": validateNumber(txt_1_3_procesos_interpuestos),
            "ListCriminalProceedingsDetailFlt": listProcesosPenales
        },
        // --
        "oPoliceProceedingsFlt": {
            "IdProcesoPolicial": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "NumProcesosContra": validateNumber(txt_1_4_procesos_contra),
            "NumProcesosInterpuestos": validateNumber(txt_1_4_procesos_interpuestos),
            "ListPoliceProceedingsDetailFlt": listProcesosPoliciales
        },
        // --
        "oSheetReniecFlt":
        {
            "IdFichaReniec": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "FotoAdjunta":
            {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "FichaReniec." + ext1_5_ficha_reniec, // -- 
                "RutaArchivo": null,
                "ExtensionArchivo": ext1_5_ficha_reniec,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            }
        },
        // -- un toqu prrodx oka
        "oTerrorismBackgroundFlt": {
            "IdAntecTerro": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Flg_Registra": true,
            "ListTerrorismBackgroundDetailFlt": listAntecedentesTerrorismo
        },
        // --
        "oBackgroundDrugTraffickingFlt": {
            "IdAntecTrafDroga": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Flg_Registra": true,
            "ListBackgroundDrugTraffickingDetailFlt": listAntecedentesTraficoIlicitoDrogas
        },
        // -- 
        "oRegisterMaintenanceDebtsFlt": {
            "IdRegDeAlimen": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Flg_Registra": true,
            "ListRegisterMaintenanceDebtsDetailFlt": listDeudasAlimentarias
        },
        // --
        "oDiscardHomonymyFlt": {
            "IdDescarteHomon": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Flg_Registra": true,
            "ListDiscardHomonymyDetailFlt": listDescarteHomonimia
        },
        // --
        "oFinancialVerificationFlt": {
            "IdVerifFinanciera": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Flg_Registra": true,
            "PeriodoReportado": txt_1_11_periodo_reportado,
            "PorcNormal": validateNumber(txt_1_11_normal),
            "PorcProblemasPotenciales": validateNumber(txt_1_11_problemas_potenciales),
            "PorcDeficiente": validateNumber(txt_1_11_deficiente),
            "PorcDudoso": validateNumber(txt_1_11_dudoso),
            "PorcPerdida": validateNumber(txt_1_11_perdida),
            "ListCreditLineFlt": listLineasCredito,
            "ListDebtDetailFlt": listDetalleDeuda
        },
        // -- 
        "oVerificationExcludedPersonsFlt": {
            "IdVerifPersExc": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Flg_Registra": true,
            "ListVerificationExcludedPersonsDetailFlt": listPersonasExclusivas
        },
        // --
        "oAcademicVerificationFlt": {
            "IdVerifAcademica": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "ListAcademicVerificationDetailFlt": listVerificacionAcademica
        },
        // --
        "oEsSaludVerificationFlt": {
            "IdVerifEsSalud": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Flg_Registra": true,
            "ArchivoEsSalud": {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "VerificacionEssalud." + ext1_14_verificacion_essalud,
                "RutaArchivo": null,
                "ExtensionArchivo": ext1_14_verificacion_essalud,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            }
        },
        "oElectoralFinesFlt": {
            "IdMultaElectoral": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Flg_Registra": true,
            "ListElectoralFinesDetailFlt": listMultasElectorales
        },
        "oSunatVerificationFlt": {
            "IdVerifSunat": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Flg_Registra": true,
            "ArchivoSunat": {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "VerificacionSunat." + ext1_16_verificacion_sunat,
                "RutaArchivo": null,
                "ExtensionArchivo": ext1_16_verificacion_sunat,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            }
        },
        "oDriverRecordCheckFlt": {
            "IdVerifRecordConductor": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Flg_Registra": true,
            "ArchivoRecordConductor": {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "RecordConductor." + ext1_17_record_conductor,
                "RutaArchivo": null,
                "ExtensionArchivo": ext1_17_record_conductor,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            }
        },
        "oWorkBackgroundCheckFlt": {
            "IdVerifAntecLaboral": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Flg_Registra": true,
            "ListWorkBackgroundCheckDetailFlt": listAntecedentesLaborales
        },
        "oPublicOfficeVerificationFlt": {
            "IdVerifCargoPublico": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Flg_Registra": true,
            "ListPublicOfficeVerificationDetailFlt": listCargosPublicos
        },
        "oPoliticalAffiliationVerificationFlt": {
            "IdVerifFiliacionPolitica": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Flg_Registra": true,
            "ListPoliticalAffiliationVerificationDetailFlt": listFiliacionPolitica
        },
        "oJobPerformanceFlt": {
            "IdDesempeñoLaboral": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "NombreEmpresa": txt_1_21_nombre_empresa,
            "CargoDesempeñado": txt_1_21_cargo_desempenado,
            "FechaInicio": txt_1_21_fecha_inicio,
            "FechaTerminacion": txt_1_21_fecha_termino,
            "MotivoRetiro": txt_1_21_motivo_retiro,
            "NombrePersonBrindaInfo": txt_1_21_persona_brinda_infomacion,
            "Cargo": txt_1_21_cargo,
            "Telefonos_Correo": txt_1_21_telefonos_correo,
            "DescripcionDesempeño": sl_1_21_desempeno,
            "PreguntaVolveriaAContratar": sl_1_21_volveria_contratar
        },
        "oSocioeconomicReportFlt": {
            "IdSocioEcon": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "FechaVisita": txt_3_0_fecha_visita,
            "Ciudad": txt_3_0_ciudad,
            "EmpSolicitante": txt_3_0_empresa_solicitante,
            "VisitDomAnter": sl_3_0_visita_domiciliaria,
        },
        // --
        "oBasicCandidateInformation": {
            "IdInfoBasicaCand": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "NombresApellidos": txt_3_1_nombres_apellidos,
            "IdTipoDocIdentidad": sl_3_1_tipo_documento,
            "NumDocIdentidad": txt_3_1_nro,
            "Lugar_FecNacimiento": txt_3_1_lugar_fecha_nacimento,
            "Edad": validateNumber(txt_3_1_edad),
            "EstadoCivil": sl_3_1_estado_civil,
            "Direccion": txt_3_1_direccion,
            "Telefonos": txt_3_1_telefonos,
            "LibretaMilitar": txt_3_1_libretas_militar,
            "Clase": txt_3_1_clase,
            "Email": txt_3_1_correo_electronico,
            "EPS": txt_3_1_eps,
            "FondoPensiones": txt_3_1_fondos_pensiones,
            "FondoCesantias": txt_3_1_fondos_cesantias,
            "NivelEducativo": txt_3_1_nivel_educativo,
            "CargoAplica": txt_3_1_cargo_aplica,
            "ViajadoExterior": sl_3_1_viaje_exterior,
            "Motivo": txt_3_1_motivo_viaje,
        },
        // --
        "oAcademicInformationFlt": {
            "IdInfoAcademica": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Actividades": txt_3_2_activades,
            "ProyectosYProyecciones": txt_3_2_proyectos_proyecciones,
            "AspectosCriRiesgo": txt_3_2_aspectos_criticos_riesgo,
            "ProbJusticia": txt_3_2_problemas_justicia,
            "ConsumEstupefacientes": txt_3_2_consumidor_alcohol_drogas,
            "PersonasPresenVisita": txt_3_2_personas_presentes,
            "ListAcademicInformationDetailFlt": [
                {
                    "IdInfoAcademica": 0,
                    "ItemInfoAcademica": 0,
                    "Estudios": "Bachillerato",
                    "Institucion": txt_3_2_bachillerato_institucion,
                    "Titulo": txt_3_2_bachillerato_titulo,
                    "Estado": txt_3_2_bachillerato_estado,
                    "FecInicio": txt_3_2_bachillerato_fecha_inicio,
                    "FecFin": txt_3_2_bachillerato_fecha_terminacion
                },
                {
                    "IdInfoAcademica": 0,
                    "ItemInfoAcademica": 0,
                    "Estudios": "Tecnicos",
                    "Institucion": txt_3_2_tecnicos_institucion,
                    "Titulo": txt_3_2_tecnicos_titulo,
                    "Estado": txt_3_2_tecnicos_estado,
                    "FecInicio": txt_3_2_tecnicos_fecha_inicio,
                    "FecFin": txt_3_2_tecnicos_fecha_terminacion
                },
                {
                    "IdInfoAcademica": 0,
                    "ItemInfoAcademica": 0,
                    "Estudios": "Tecnologicos",
                    "Institucion": txt_3_2_tecnologicos_institucion,
                    "Titulo": txt_3_2_tecnologicos_titulo,
                    "Estado": txt_3_2_tecnologicos_estado,
                    "FecInicio": txt_3_2_tecnologicos_fecha_inicio,
                    "FecFin": txt_3_2_tecnologicos_fecha_terminacion
                },
                {
                    "IdInfoAcademica": 0,
                    "ItemInfoAcademica": 0,
                    "Estudios": "Universitarios",
                    "Institucion": txt_3_2_universitarios_institucion,
                    "Titulo": txt_3_2_universitarios_titulo,
                    "Estado": txt_3_2_universitarios_estado,
                    "FecInicio": txt_3_2_universitarios_fecha_inicio,
                    "FecFin": txt_3_2_universitarios_fecha_terminacion
                },
                {
                    "IdInfoAcademica": 0,
                    "ItemInfoAcademica": 0,
                    "Estudios": "Postgrado",
                    "Institucion": txt_3_2_postgrado_institucion,
                    "Titulo": txt_3_2_postgrado_titulo,
                    "Estado": txt_3_2_postgrado_estado,
                    "FecInicio": txt_3_2_postgrado_fecha_inicio,
                    "FecFin": txt_3_2_postgrado_fecha_terminacion
                },
                {
                    "IdInfoAcademica": 0,
                    "ItemInfoAcademica": 0,
                    "Estudios": "Otros Cursos",
                    "Institucion": txt_3_2_otros_institucion,
                    "Titulo": txt_3_2_otros_titulo,
                    "Estado": txt_3_2_otros_estado,
                    "FecInicio": txt_3_2_otros_fecha_inicio,
                    "FecFin": txt_3_2_otros_fecha_terminacion
                }
            ]
        },
        // --
        "oFamilyEnvironmentFlt": {
            "IdEntornoFamiliar": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "ListFamilyEnvironmentDetailFlt": [
                {
                    "IdEntornoFamiliar": 0,
                    "ItemEntornoFamiliar": 0,
                    "IdParentesco": 1, // -- PADRE
                    "Nombres": txt_3_3_padre_nombres,
                    "Edad": validateNumber(txt_3_3_padre_edad),
                    "NivelEducativo": txt_3_3_padre_nivel_educativo,
                    "Ocupacion": txt_3_3_padre_ocupacion,
                    "EmpresaInstitucion": txt_3_3_padre_empresa_institucion,
                    "ConviveConUsted": txt_3_3_padre_convive_usted
                },
                {
                    "IdEntornoFamiliar": 0,
                    "ItemEntornoFamiliar": 0,
                    "IdParentesco": 2, // -- MADRE
                    "Nombres": txt_3_3_madre_nombres,
                    "Edad": validateNumber(txt_3_3_madre_edad),
                    "NivelEducativo": txt_3_3_madre_nivel_educativo,
                    "Ocupacion": txt_3_3_madre_ocupacion,
                    "EmpresaInstitucion": txt_3_3_madre_empresa_institucion,
                    "ConviveConUsted": txt_3_3_madre_convive_usted
                },
                {
                    "IdEntornoFamiliar": 0,
                    "ItemEntornoFamiliar": 0,
                    "IdParentesco": 4, // -- CONYUGUE
                    "Nombres": txt_3_3_conyugue_nombres,
                    "Edad": validateNumber(txt_3_3_conyugue_edad),
                    "NivelEducativo": txt_3_3_conyugue_nivel_educativo,
                    "Ocupacion": txt_3_3_conyugue_ocupacion,
                    "EmpresaInstitucion": txt_3_3_conyugue_empresa_institucion,
                    "ConviveConUsted": txt_3_3_conyugue_convive_usted
                },
            ],
        },
        // --
        "oProfessionalEnvironmentFlt": {
            "IdEntornoProf": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "ListProfessionalEnvironmentDetailFlt": listEntornoProfesionalLaboral
        },
        // --
        "oWorkInactivityFlt": {
            "IdInactLaboral": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "RazonCambioEmpleo": txt_3_5_razones_cambio_empleo,
            "MotivoCambioEmpleo": txt_3_5_motivos_cambio_empleo,
            "EmpleoIdeal": txt_3_5_empleo_ideal,
            "AspiracionSalarial": txt_3_5_aspiracion_salarial,
            "ConocimientoEmpresa": txt_3_5_conocimiento_empresa,
            "HojaVidaAEmpresa": txt_3_5_hoja_vida_empresa,
            "PersonaDentroEmpresa": txt_3_5_persona_dentro_empresa,
            "ListWorkInactivityDetailFlt": listLaboral,
        },
        // --
        "oEconomicInformationFlt": {
            "IdInfoEconomica": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "CtaBienesComerciales": txt_3_6_comerciales_nombre,
            "ReportadoDataCredito": txt_3_6_data_credito,
            "TotalIngresos": validateNumber(txt_3_6_ingresos_mensuales_total_ingresos),
            "TotalEgresos": validateNumber(txt_3_6_gastos_mensuales_total_egresos),
            "ListEconomicInformationDetailFlt": [
                {
                    "IdInfoEconomica": 0,
                    "ItemInfoEconomica": 0,
                    "IngresosMensuales": "Ingresos Fijos",
                    "ValorIngresoMensual": validateNumber(txt_3_6_ingresos_mensuales_ingresos_fijos),
                    "GastosMensuales": "Gastos Fijos",
                    "ValorGastoMensual": validateNumber(txt_3_6_gastos_mensuales_gastos_fijos)
                },
                {
                    "IdInfoEconomica": 0,
                    "ItemInfoEconomica": 0,
                    "IngresosMensuales": "Apoyo Económico",
                    "ValorIngresoMensual": validateNumber(txt_3_6_ingresos_mensuales_apoyo_economico),
                    "GastosMensuales": "Créditos",
                    "ValorGastoMensual": validateNumber(txt_3_6_gastos_mensuales_creditos)
                },
                {
                    "IdInfoEconomica": 0,
                    "ItemInfoEconomica": 0,
                    "IngresosMensuales": "Otros Ingresos",
                    "ValorIngresoMensual": validateNumber(txt_3_6_ingresos_mensuales_otros_ingresos),
                    "GastosMensuales": "Otros Gastos",
                    "ValorGastoMensual": validateNumber(txt_3_6_gastos_mensuales_valor)
                }
            ],
        },
        // --
        "oHealthSituationFlt": {
            "IdSituacionSalud": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "MiembroPrstaTipoEnfermedad": txt_3_7_familia_tipo_enfermedad,
            "MiembroEnfermedadPresenta": txt_3_7_familia_enfermedad,
            "MiembroMedicamentoIngiere": txt_3_7_familia_tipo_medicamento_ingiere,
            "MiembroTiempoPadeceEnfermedad": txt_3_7_familia_tiempo_enfermedad,
            "MiembroObservaciones": txt_3_7_familia_observaciones,
            "UdPstaTipoEnfermedad": txt_3_7_usted_tipo_enfermedad,
            "UdEnfermedadPresenta": txt_3_7_usted_enfermedad,
            "UdMedicamentoIngiere": txt_3_7_usted_tipo_medicamento_ingiere,
            "UdTiempoPadeceEnfermedad": txt_3_7_usted_tiempo_enfemerdad,
            "UdObservaciones": txt_3_7_usted_observaciones,
        },
        // --
        "oBasicHousingFeaturesFlt": {
            "IdCaracteristicaBas": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "EstratoSocial": txt_3_8_estrato_social,
            "Ubicacion": txt_3_8_ubicacion,
            "TiempoResidencia": txt_3_8_tiempo_residencia,
            "Tipo": sl_3_8_tipo,
            "ApreciacionInterna": sl_3_8_aprecion_interna,
            "ApreciacionExterna": sl_3_8_aprecion_externa,
            "ListServiciosPublicos": check_servicios_publicos,
            "ListServiciosInstalados": check_servicios_instalados,
            "Estado": sl_3_8_estado,
            "ServAlcantarillado": sl_3_8_servicio_alcantarillado,
            "UbicacionVivienda": sl_3_8_ubicacion,
            "Distribucion": sl_3_8_distribucion,
            "AmbienteSector": sl_3_8_ambiente_sector,
            "ViasAcceso": sl_3_8_vias_acceso,
            "Propiedad": sl_3_8_propiedad,
            "Concepto": txt_3_8_concepto,
            "ListCommunityRelationShipFlt": listRelacionComunidad
        },
        // --
        "oAssessmentEvaluatorFlt": {
            "IdApreciacionEvaluador": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Resultado": sl_3_9_resultado,
            "RealizadoPor": txt_3_9_realizado_por,
            "Firma": txt_3_9_firma
        },
        "oPhotographicRecordFlt":
        {
            "IdRegistroFotografico": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "ArchivoAdjunto_EntradaDomicilio":
            {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "FotoEntradaDomicilio." + ext3_10_foto_entrada_domicilio,
                "RutaArchivo": null,
                "ExtensionArchivo": ext3_10_foto_entrada_domicilio,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            },
            "Observaciones_EntradaDomicilio": txt_3_10_candidato_observaciones,
            "ArchivoAdjunto_AmbSocial":
            {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "FotoAmbienteSocial." + ext3_10_foto_ambiente_social,
                "RutaArchivo": null,
                "ExtensionArchivo": ext3_10_foto_ambiente_social,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            },
            "Observaciones_AmbSocial": txt_3_10_ambiente_social_observaciones,
            "ArchivoAdjunto_Habitaciones":
            {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "FotoHabitaciones." + ext3_10_foto_habitaciones,
                "RutaArchivo": null,
                "ExtensionArchivo": ext3_10_foto_habitaciones,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            },
            "Observaciones_Habitaciones": txt_3_10_habitaciones_observaciones,
            "ArchivoAdjunto_Cocina":
            {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "FotoCocina." + ext3_10_foto_cocina,
                "RutaArchivo": null,
                "ExtensionArchivo": ext3_10_foto_cocina,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            },
            "Observaciones_Cocina": txt_3_10_cocina_observaciones
        },
        "oReliabilityTestFlt": {
            "IdTestConfiabilidad": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "ArchivoAdjunto": {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "TestConfiabilidad." + ext2_0_test_confiabilidad,
                "RutaArchivo": null,
                "ExtensionArchivo": ext2_0_test_confiabilidad,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            }
        }
    }

    if (ListPhotografym != null) {
        if (ListPhotografym.ArchivoAdjunto_EntradaDomicilio != null) {
            objectData.oPhotographicRecordFlt.ArchivoAdjunto_EntradaDomicilio = ListPhotografym.ArchivoAdjunto_EntradaDomicilio
        }
        if (ListPhotografym.ArchivoAdjunto_AmbSocial != null) {
            objectData.oPhotographicRecordFlt.ArchivoAdjunto_AmbSocial = ListPhotografym.ArchivoAdjunto_AmbSocial
        }
        if (ListPhotografym.ArchivoAdjunto_Habitaciones != null) {
            objectData.oPhotographicRecordFlt.ArchivoAdjunto_Habitaciones = ListPhotografym.ArchivoAdjunto_Habitaciones
        }
        if (ListPhotografym.ArchivoAdjunto_Cocina != null) {
            objectData.oPhotographicRecordFlt.ArchivoAdjunto_Cocina = ListPhotografym.ArchivoAdjunto_Cocina
        }

    }

    if (ListSheetReniec != null) {
        if (ListSheetReniec.FotoAdjunta != null) {
            objectData.oSheetReniecFlt.FotoAdjunta = ListSheetReniec.FotoAdjunta
        }
    }

    if (ListVerificacionEssalud != null) {
        if (ListVerificacionEssalud.ArchivoEsSalud != null) {
            objectData.oEsSaludVerificationFlt.ArchivoEsSalud = ListVerificacionEssalud.ArchivoEsSalud
        }
    }

    if (ListVerificacionSunat != null) {
        if (ListVerificacionSunat.ArchivoSunat != null) {
            objectData.oSunatVerificationFlt.ArchivoSunat = ListVerificacionSunat.ArchivoSunat
        }
    }

    if (ListVerificacionRecordConductor != null) {
        if (ListVerificacionRecordConductor.ArchivoRecordConductor != null) {
            objectData.oDriverRecordCheckFlt.ArchivoRecordConductor = ListVerificacionRecordConductor.ArchivoRecordConductor
        }
    }

    if (ListTestConfiablidad != null) {
        if (ListTestConfiablidad.ArchivoAdjunto != null) {
            objectData.oReliabilityTestFlt.ArchivoAdjunto = ListTestConfiablidad.ArchivoAdjunto
        }
    }

    // --
    listHermanos.forEach((element) => {
        objectData.oFamilyEnvironmentFlt.ListFamilyEnvironmentDetailFlt.push(element)
    })
    listHijos.forEach((element) => {
        objectData.oFamilyEnvironmentFlt.ListFamilyEnvironmentDetailFlt.push(element)
    })


    // -- I. INFORME ANTECEDENTES JUDICIALES
    var camposVacios = ""
    // --
    if (txt_1_1_nombre == "") {                            // -- 1.1 DATOS BASICOS DEL CANDIDATO
        camposVacios += "<span>1.1 DATOS BASICOS DEL CANDIDATO</span>"
    }
    if (listProcesosJudiciales.length < 1) {                // -- 1.2 PROCESOS JUDICIALES
        camposVacios += "<br><span>1.2 PROCESOS JUDICIALES</span> "
    }
    if (listProcesosPenales.length < 1) {                   // -- 1.3 PROCESOS PENALES
        camposVacios += "<br><span>1.3 PROCESOS PENALES</span>"
    }
    if (listProcesosPoliciales.length < 1) {                // -- 1.4 PROCESOS POLICIALES
        camposVacios += "<br><span>1.4 PROCESOS POLICIALES</span>"
    }
    if (listAntecedentesTerrorismo.length < 1) {            // --  1.7 ANTECEDENTES POR TERRORISMO
        camposVacios += "<br><span>1.7 ANTECEDENTES POR TERRORISMO</span>"
    }
    if (listAntecedentesTraficoIlicitoDrogas.length < 1) {  // -- 1.8 ANTECEDENTES POR TRAFICO ILÍCITO DE DROGAS
        camposVacios += "<br><span>1.8 ANTECEDENTES POR TRAFICO ILÍCITO DE DROGAS</span>"
    }
    if (listDeudasAlimentarias.length < 1) {                // --1.9 REGISTRO DE DEUDAS ALIMENTARIAS
        camposVacios += "<br><span>1.9 REGISTRO DE DEUDAS ALIMENTARIAS</span>"
    }
    if (listDescarteHomonimia.length < 1) {                 // -- 1.10 DESCARTE DE HOMONIMIA
        camposVacios += "<br><span>1.10 DESCARTE DE HOMONIMIA</span>"
    }
    if (listLineasCredito.length < 1) {                     // -- 1.11 VERIFICACION FINANCIERA SBS
        camposVacios += "<br><span>1.11 VERIFICACION FINANCIERA SBS - LÍNEAS DE CRÉDITO</span>"
    }
    if (                                                    // -- 1.11 VERIFICACION FINANCIERA SBS
        txt_1_11_periodo_reportado == "" ||
        txt_1_11_normal == "") {
        camposVacios += "<br><span>1.11 VERIFICACION FINANCIERA SBS - CALIFICACIÓN CREDITICIA</span>"
    }
    if (listDetalleDeuda.length < 1) {                      // -- 1.11 VERIFICACION FINANCIERA SBS
        camposVacios += "<br><span>1.11 VERIFICACION FINANCIERA SBS - DETALLE DE LA DEUDA</span> "
    }
    if (listPersonasExclusivas.length < 1) {                // -- 1.12 VERIFICACIONES DE PERSONAS EXCLUIDAS DE LA SBS Y AFP
        camposVacios += "<br><span>1.12 VERIFICACIONES DE PERSONAS EXCLUIDAS DE LA SBS Y AFP</span> "
    }
    if (listVerificacionAcademica.length < 1) {                // -- 1.13 VERIFICACION ACADÉMICA (SUNEDU)
        camposVacios += "<br><span>1.13 VERIFICACION ACADÉMICA (SUNEDU)</span> "
    }
    if (listMultasElectorales.length < 1) {                // -- 1.15 MULTAS ELECTORALES
        camposVacios += "<br><span>1.15 MULTAS ELECTORALES</span> "
    }
    if (listAntecedentesLaborales.length < 1) {                // -- 1.18 VERIFICACIÓN DE ANTECEDENTES LABORALES
        camposVacios += "<br><span>1.18 VERIFICACIÓN DE ANTECEDENTES LABORALES</span> "
    }
    if (listCargosPublicos.length < 1) {                // -- 1.19 VERIFICACIÓN CARGOS PUBLICOS
        camposVacios += "<br><span>1.19 VERIFICACIÓN CARGOS PUBLICOS</span> "
    }
    if (listFiliacionPolitica.length < 1) {                // -- 1.20 VERIFICACIÓN FILIACION POLITICA
        camposVacios += "<br><span>1.20 VERIFICACIÓN FILIACION POLITICA</span> "
    }
    if (                                                    // -- 1.21 DESEMPEÑO LABORAL
        txt_1_21_nombre_empresa == "" ||
        txt_1_21_cargo_desempenado == "" ||
        txt_1_21_fecha_inicio == "" ||
        txt_1_21_fecha_termino == "" ||
        txt_1_21_motivo_retiro == "" ||
        txt_1_21_persona_brinda_infomacion == "" ||
        txt_1_21_cargo == "" ||
        txt_1_21_telefonos_correo == "") {
        camposVacios += "<br><span>1.21 DESEMPEÑO LABORAL</span>"
    }

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
    console.log(formData)

    if (camposVacios != "") {

        // --
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
                    url: urlSaveorUpdateIntegrity270PlusPeru,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        console.log('DATA', data)
                        var typeAlert = (data.response.Status == "OK") ? 'success' : 'error';
                        var Message = (data.response.Status == "OK") ? 'Se guardo la información correctamente' : 'Ocurrio un problema, Comuniquese con sistemas';
                        // --
                        Swal.insertQueueStep({
                            icon: typeAlert,
                            title: Message
                        });
                        // --
                        window.location.reload();
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
                    url: urlSaveorUpdateIntegrity270PlusPeru,
                    data: formData,
                    dataType: 'json',
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        console.log('DATA', data)
                        var typeAlert = (data.response.Status == "OK") ? 'success' : 'error';
                        var Message = (data.response.Status == "OK") ? 'Se guardo la información correctamente' : 'Ocurrio un problema, Comuniquese con sistemas';
                        // --
                        Swal.insertQueueStep({
                            icon: typeAlert,
                            title: Message,
                        });
                        // --
                        window.location.reload();
                    }
                });
            }
        }])
    }

})

// --
function reformatDateString(s) {
    var b = s.split(/\D/);
    return b.reverse().join('-');
}


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


// --
function getList270PlusPeru() {
    // --
    // -- $("#txt_1_1_fecha_nacimiento").datepicker({ dateFormat: 'DD/MM/YYYY' });
    // - let status = getDatos("status")
    // --
    // -- if (status == "true" || status == true) {
    // --
    let idIntegridad = getDatos("key")
    let Item = getDatos("item")
    // --
    let url = urlGetRiskAnalysisFormat270PlusPeru + "?IdIntegridad=" + idIntegridad + "&ItemIntegridadDet=" + Item
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

                // -- 1.3 PROCESOS PENALES
                if (obj.oCriminalProceedingsVm != null) {
                    // --
                    $('#txt_1_3_procesos_contra').val(obj.oCriminalProceedingsVm.NumProcesosContra)
                    $('#txt_1_3_procesos_interpuestos').val(obj.oCriminalProceedingsVm.NumProcesosInterpuestos)

                    let lista = obj.oCriminalProceedingsVm.ListCriminalProceedingsDetailVm
                    listProcesosPenales = lista
                    lista.forEach((element) => {
                        let index = tableProcesosPenales.rows().count() + 1;
                        tableProcesosPenales.row.add([
                            index,
                            element.Ciudad,
                            element.Despacho,
                            element.Proceso,
                            element.Clase,
                            element.Demandantes,
                            element.Demandados,
                            ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_1_3_delete_row"> <i class="fa fa-trash"></i></button >'
                        ]).draw(false);
                        tableProcesosPenales.columns.adjust()
                            .responsive.recalc();
                    })
                }


                // -- 1.4 PROCESOS POLICIALES
                if (obj.oPoliceProceedingsVm != null) {
                    // --
                    $('#txt_1_4_procesos_contra').val(obj.oPoliceProceedingsVm.NumProcesosContra)
                    $('#txt_1_4_procesos_interpuestos').val(obj.oPoliceProceedingsVm.NumProcesosInterpuestos)

                    let lista = obj.oPoliceProceedingsVm.ListPoliceProceedingsDetailVm
                    listProcesosPoliciales = lista
                    lista.forEach((element) => {
                        let index = tableProcesosPoliciales.rows().count() + 1;
                        tableProcesosPoliciales.row.add([
                            index,
                            element.Ciudad,
                            element.Despacho,
                            element.Proceso,
                            element.Clase,
                            element.Demandantes,
                            element.Demandados,
                            ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_1_4_delete_row"> <i class="fa fa-trash"></i></button >'
                        ]).draw(false);
                        tableProcesosPoliciales.columns.adjust()
                            .responsive.recalc();
                    })
                }

                // -- 1.5 FICHA RENIEC
                if (obj.oSheetReniecVm != null) {
                    // --
                    if (obj.oSheetReniecVm.FotoAdjunta != null) {
                        // --
                        ListSheetReniec = obj.oSheetReniecVm

                        $("#PreviewReniec button").attr("data-typefile", obj.oSheetReniecVm.FotoAdjunta.ExtensionArchivo)
                        $("#PreviewReniec button").attr("data-route", btoa(obj.oSheetReniecVm.FotoAdjunta.RutaArchivo))
                        $("#PreviewReniec span").text(obj.oSheetReniecVm.FotoAdjunta.NombreArchivo)
                    }
                }


                // -- 1.7 ANTECEDENTES POR TERRORISMO
                if (obj.oTerrorismBackgroundVm != null) {
                    // --
                    let lista = obj.oTerrorismBackgroundVm.ListTerrorismBackgroundDetailVm
                    listAntecedentesTerrorismo = lista
                    lista.forEach((element) => {
                        let index = tableAntecedentesTerrorismo.rows().count() + 1;
                        tableAntecedentesTerrorismo.row.add([
                            index,
                            element.Delito,
                            element.FechaSentencia,
                            element.FechaEjecutoria,
                            element.JuzgadoEjecucionSentencia,
                            element.NroExpediente,
                            element.MontoPagosPendientes,
                            ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_1_7_delete_row"> <i class="fa fa-trash"></i></button >'
                        ]).draw(false);
                        tableAntecedentesTerrorismo.columns.adjust()
                            .responsive.recalc();
                    })
                }


                // -- 1.8 ANTECEDENTES POR TRAFICO ILÍCITO DE DROGAS
                if (obj.oBackgroundDrugTraffickingVm != null) {
                    // --
                    let lista = obj.oBackgroundDrugTraffickingVm.ListBackgroundDrugTraffickingDetailVm
                    listAntecedentesTraficoIlicitoDrogas = lista
                    lista.forEach((element) => {
                        let index = tableAntecedentesTraficoIlicitoDrogas.rows().count() + 1;
                        tableAntecedentesTraficoIlicitoDrogas.row.add([
                            index,
                            element.Delito,
                            element.FechaSentencia,
                            element.FechaEjecutoria,
                            element.JuzgadoEjecucionSentencia,
                            element.NroExpediente,
                            element.MontoPagosPendientes,
                            ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_1_8_delete_row"> <i class="fa fa-trash"></i></button >'
                        ]).draw(false);
                        tableAntecedentesTraficoIlicitoDrogas.columns.adjust()
                            .responsive.recalc();
                    })
                }


                // -- 1.9 REGISTRO DE DEUDAS ALIMENTARIAS
                if (obj.oRegisterMaintenanceDebtsVm != null) {
                    // --
                    let lista = obj.oRegisterMaintenanceDebtsVm.ListRegisterMaintenanceDebtsDetailVm
                    listDeudasAlimentarias = lista
                    lista.forEach((element) => {
                        let index = tableDeudasAlimentarias.rows().count() + 1;
                        tableDeudasAlimentarias.row.add([
                            index,
                            element.DistritoJudicial,
                            element.OrganoJurisdiccional,
                            element.NroExpediente,
                            element.PensionMensual,
                            element.ImporteAdeudado,
                            element.Demandante,
                            ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_1_9_delete_row"> <i class="fa fa-trash"></i></button >'
                        ]).draw(false);
                        tableDeudasAlimentarias.columns.adjust()
                            .responsive.recalc();
                    })
                }


                // -- 1.10 DESCARTE DE HOMONIMIA
                if (obj.oDiscardHomonymyVm != null) {
                    // --
                    let lista = obj.oDiscardHomonymyVm.ListDiscardHomonymyDetailVm
                    listDescarteHomonimia = lista
                    lista.forEach((element) => {
                        let index = tableDescarteHomonimia.rows().count() + 1;
                        tableDescarteHomonimia.row.add([
                            index,
                            element.DistritoJudicial,
                            element.OrganoJurisdiccional,
                            element.NroExpediente,
                            element.PensionMensual,
                            element.ImporteAdeudado,
                            element.Demandante,
                            ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_1_10_delete_row"> <i class="fa fa-trash"></i></button >'
                        ]).draw(false);
                        tableDescarteHomonimia.columns.adjust()
                            .responsive.recalc();
                    })
                }


                // -- 1.11 VERIFICACION FINANCIERA SBS

                // --
                if (obj.oFinancialVerificationVm != null) {

                    // -- LÍNEAS DE CRÉDITO
                    if (obj.oFinancialVerificationVm.ListCreditLineVm != null) {
                        // -- 
                        let lista = obj.oFinancialVerificationVm.ListCreditLineVm
                        listLineasCredito = lista
                        lista.forEach((element) => {
                            let index = tableLineasCredito.rows().count() + 1;
                            tableLineasCredito.row.add([
                                index,
                                element.EntidadReportante,
                                element.TipoLinea,
                                element.TotalLineaCredito,
                                ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_1_11_delete_row_lineas_credito"> <i class="fa fa-trash"></i></button >'
                            ]).draw(false);
                            tableLineasCredito.columns.adjust()
                                .responsive.recalc();
                        })
                    }

                    // -- CALIFICACIÓN CREDITICIA
                    $('#txt_1_11_periodo_reportado').val(obj.oFinancialVerificationVm.PeriodoReportado)
                    $('#txt_1_11_normal').val(obj.oFinancialVerificationVm.PorcNormal)
                    $('#txt_1_11_problemas_potenciales').val(obj.oFinancialVerificationVm.PorcProblemasPotenciales)
                    $('#txt_1_11_deficiente').val(obj.oFinancialVerificationVm.PorcDeficiente)
                    $('#txt_1_11_dudoso').val(obj.oFinancialVerificationVm.PorcDudoso)
                    $('#txt_1_11_perdida').val(obj.oFinancialVerificationVm.PorcPerdida)

                    // -- DETALLE DE LA DEUDA
                    if (obj.oFinancialVerificationVm.ListDebtDetailVm != null) {
                        // -- 
                        let lista = obj.oFinancialVerificationVm.ListDebtDetailVm
                        listDetalleDeuda = lista
                        lista.forEach((element) => {
                            let index = tableDetalleDeuda.rows().count() + 1;
                            tableDetalleDeuda.row.add([
                                index,
                                element.EntidadInformante,
                                element.Calificacion,
                                element.Capital,
                                element.InteresComisiones,
                                element.DeudaTotal,
                                ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_1_11_delete_row_detalle_deuda"> <i class="fa fa-trash"></i></button >'
                            ]).draw(false);
                            tableDetalleDeuda.columns.adjust()
                                .responsive.recalc();
                        })
                    }
                }

                // -- 1.12 VERIFICACIONES DE PERSONAS EXCLUIDAS DE LA SBS Y AFP
                if (obj.oVerificationExcludedPersonsVm != null) {
                    // -- 
                    if (obj.oVerificationExcludedPersonsVm.ListVerificationExcludedPersonsDetailVm != null && obj.oVerificationExcludedPersonsVm.ListVerificationExcludedPersonsDetailVm.length > 0) {
                        let lista = obj.oVerificationExcludedPersonsVm.ListVerificationExcludedPersonsDetailVm
                        listPersonasExclusivas = lista
                        lista.forEach((element) => {
                            let index = tablePersonasExclusivas.rows().count() + 1;
                            tablePersonasExclusivas.row.add([
                                index,
                                element.Entidad,
                                element.FecIngSPP,
                                element.NroExpediente,
                                element.NroResol,
                                element.FecResol,
                                element.Entidad2,
                                ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_1_12_delete_row"> <i class="fa fa-trash"></i></button >'
                            ]).draw(false);
                            tablePersonasExclusivas.columns.adjust()
                                .responsive.recalc();
                        })
                    }
                }

                // -- 1.13 VERIFICACION ACADÉMICA (SUNEDU)
                if (obj.oAcademicVerificationVm != null) {
                    // -- 
                    if (obj.oAcademicVerificationVm.ListAcademicVerificationDetailVm != null && obj.oAcademicVerificationVm.ListAcademicVerificationDetailVm.length > 0) {
                        let lista = obj.oAcademicVerificationVm.ListAcademicVerificationDetailVm
                        listVerificacionAcademica = lista
                        lista.forEach((element) => {
                            let index = tableVerificacionAcademica.rows().count() + 1;
                            tableVerificacionAcademica.row.add([
                                index,
                                element.Graduado,
                                element.Grado,
                                element.Institucion,
                                ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_1_13_delete_row"> <i class="fa fa-trash"></i></button >'
                            ]).draw(false);
                            tableVerificacionAcademica.columns.adjust()
                                .responsive.recalc();
                        })
                    }
                }


                // -- 1.14 VERIFICACION ESSALUD
                if (obj.oEsSaludVerificationVm != null) {
                    // --
                    if (obj.oEsSaludVerificationVm.ArchivoEsSalud != null) {
                        // --
                        ListVerificacionEssalud = obj.oEsSaludVerificationVm

                        $("#PreviewVerificacionEssalud button").attr("data-typefile", obj.oEsSaludVerificationVm.ArchivoEsSalud.ExtensionArchivo)
                        $("#PreviewVerificacionEssalud button").attr("data-route", btoa(obj.oEsSaludVerificationVm.ArchivoEsSalud.RutaArchivo))
                        $("#PreviewVerificacionEssalud span").text(obj.oEsSaludVerificationVm.ArchivoEsSalud.NombreArchivo)
                    }
                }

                // -- SUNAT
                if (obj.oSunatVerificationVm != null) {
                    // --
                    if (obj.oSunatVerificationVm.ArchivoSunat != null) {
                        // --
                        ListVerificacionSunat = obj.oSunatVerificationVm

                        $("#PreviewVerificacionSunat button").attr("data-typefile", obj.oSunatVerificationVm.ArchivoSunat.ExtensionArchivo)
                        $("#PreviewVerificacionSunat button").attr("data-route", btoa(obj.oSunatVerificationVm.ArchivoSunat.RutaArchivo))
                        $("#PreviewVerificacionSunat span").text(obj.oSunatVerificationVm.ARCHIVO.NombreArchivo)
                    }
                }

                // -- RECORD
                if (obj.oDriverRecordCheckVm != null) {
                    // --
                    if (obj.oDriverRecordCheckVm.ArchivoRecordConductor != null) {
                        // --
                        ListVerificacionRecordConductor = obj.oDriverRecordCheckVm

                        $("#PreviewVerificacionRecordConductor button").attr("data-typefile", obj.oDriverRecordCheckVm.ArchivoRecordConductor.ExtensionArchivo)
                        $("#PreviewVerificacionRecordConductor button").attr("data-route", btoa(obj.oDriverRecordCheckVm.ArchivoRecordConductor.RutaArchivo))
                        $("#PreviewVerificacionRecordConductor span").text(obj.oDriverRecordCheckVm.ArchivoRecordConductor.NombreArchivo)
                    }
                }

                // -- 1.15 MULTAS ELECTORALES
                if (obj.oElectoralFinesVm != null) {
                    // -- 
                    if (obj.oElectoralFinesVm.ListElectoralFinesDetailVm != null && obj.oElectoralFinesVm.ListElectoralFinesDetailVm.length > 0) {
                        let lista = obj.oElectoralFinesVm.ListElectoralFinesDetailVm
                        listMultasElectorales = lista
                        lista.forEach((element) => {
                            let index = tableMultasElectorales.rows().count() + 1;
                            tableMultasElectorales.row.add([
                                index,
                                element.Codigo,
                                element.ProcesoElectoral,
                                element.TipoOmision,
                                element.Deuda,
                                element.EtapaCobranza,
                                ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_1_15_delete_row"> <i class="fa fa-trash"></i></button >'
                            ]).draw(false);
                            tableMultasElectorales.columns.adjust()
                                .responsive.recalc();
                        })
                    }
                }

                // -- 1.18 VERIFICACIÓN DE ANTECEDENTES LABORALES
                if (obj.oWorkBackgroundCheckVm != null) {
                    // -- 
                    if (obj.oWorkBackgroundCheckVm.ListWorkBackgroundCheckDetailVm != null && obj.oWorkBackgroundCheckVm.ListWorkBackgroundCheckDetailVm.length > 0) {
                        let lista = obj.oWorkBackgroundCheckVm.ListWorkBackgroundCheckDetailVm
                        listAntecedentesLaborales = lista
                        lista.forEach((element) => {
                            let index = tableAntecedentesLaborales.rows().count() + 1;
                            tableAntecedentesLaborales.row.add([
                                index,
                                element.Periodo,
                                element.Sexo,
                                element.Empresa,
                                element.Ruc,
                                element.RubroEmpresa,
                                ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_1_18_delete_row"> <i class="fa fa-trash"></i></button >'
                            ]).draw(false);
                            tableAntecedentesLaborales.columns.adjust()
                                .responsive.recalc();
                        })
                    }
                }

                // -- 1.19 VERIFICACIÓN CARGOS PUBLICOS
                if (obj.oPublicOfficeVerificationVm != null) {
                    // -- 
                    if (obj.oPublicOfficeVerificationVm.ListPublicOfficeVerificationDetailVm != null && obj.oPublicOfficeVerificationVm.ListPublicOfficeVerificationDetailVm.length > 0) {
                        let lista = obj.oPublicOfficeVerificationVm.ListPublicOfficeVerificationDetailVm
                        listCargosPublicos = lista
                        lista.forEach((element) => {
                            let index = tableCargosPublicos.rows().count() + 1;
                            tableCargosPublicos.row.add([
                                index,
                                element.Num,
                                element.Institucion,
                                element.TipoSancion,
                                element.Categoria,
                                element.Estado,
                                ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_1_19_delete_row"> <i class="fa fa-trash"></i></button >'
                            ]).draw(false);
                            tableCargosPublicos.columns.adjust()
                                .responsive.recalc();
                        })
                    }
                }

                // -- 1.20 VERIFICACIÓN FILIACION POLITICA
                if (obj.oPoliticalAffiliationVerificationVm != null) {
                    // -- 
                    if (obj.oPoliticalAffiliationVerificationVm.ListPoliticalAffiliationVerificationDetailVm != null && obj.oPoliticalAffiliationVerificationVm.ListPoliticalAffiliationVerificationDetailVm.length > 0) {
                        let lista = obj.oPoliticalAffiliationVerificationVm.ListPoliticalAffiliationVerificationDetailVm
                        listFiliacionPolitica = lista
                        lista.forEach((element) => {
                            let index = tableFiliacionPolitica.rows().count() + 1;
                            tableFiliacionPolitica.row.add([
                                index,
                                element.HistorialAFiliacion,
                                element.HistorialCandidatura,
                                ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_1_20_delete_row"> <i class="fa fa-trash"></i></button >'
                            ]).draw(false);
                            tableFiliacionPolitica.columns.adjust()
                                .responsive.recalc();
                        })
                    }
                }

                // -- 1.21
                if (obj.oJobPerformanceVm != null) {
                    // --
                    $('#txt_1_21_nombre_empresa').val(obj.oJobPerformanceVm.NombreEmpresa)
                    $('#txt_1_21_cargo_desempenado').val(obj.oJobPerformanceVm.CargoDesempeñado)
                    $('#txt_1_21_fecha_inicio').val(formatDate(obj.oJobPerformanceVm.FechaInicio))
                    $('#txt_1_21_fecha_termino').val(formatDate(obj.oJobPerformanceVm.FechaTerminacion))
                    $('#txt_1_21_motivo_retiro').val(obj.oJobPerformanceVm.MotivoRetiro)
                    $('#txt_1_21_persona_brinda_infomacion').val(obj.oJobPerformanceVm.NombrePersonBrindaInfo)
                    $('#txt_1_21_cargo').val(obj.oJobPerformanceVm.Cargo)
                    $('#txt_1_21_telefonos_correo').val(obj.oJobPerformanceVm.Telefonos_Correo)
                    $('#sl_1_21_desempeno').val(obj.oJobPerformanceVm.DescripcionDesempeño)
                    $('#sl_1_21_volveria_contratar').val(obj.oJobPerformanceVm.PreguntaVolveriaAContratar)
                }

                // -- 2.0 TEST CONFIABILIDAD
                if (obj.oReliabilityTestVm != null) {
                    // --
                    if (obj.oReliabilityTestVm.ArchivoAdjunto != null) {
                        // --
                        ListTestConfiablidad = obj.oReliabilityTestVm
                        //$("#PreviewReniec button").attr("data-typefile", obj.oSheetReniecVm.FotoAdjunta.ExtensionArchivo)
                        //$("#PreviewReniec button").attr("data-route", btoa(obj.oSheetReniecVm.FotoAdjunta.RutaArchivo))
                        $("#PreviewTestConfiabilidad span").text(obj.oReliabilityTestVm.ArchivoAdjunto.NombreArchivo)
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

// -- DATEPICKER
setInputDatePicker("txt_1_1_fecha_nacimiento")
setInputDatePicker("txt_1_7_fecha_sentencia")
setInputDatePicker("txt_1_7_fecha_ejecutoria")
setInputDatePicker("txt_1_8_fecha_sentencia")
setInputDatePicker("txt_1_8_fecha_ejecutoria")
setInputDatePicker("txt_1_12_fec_ing_spp")
setInputDatePicker("txt_1_12_fec_resol")
setInputDatePicker("txt_1_21_fecha_inicio")
setInputDatePicker("txt_1_21_fecha_termino")
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
getList270PlusPeru();