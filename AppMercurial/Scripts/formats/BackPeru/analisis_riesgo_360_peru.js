// -- GLOBAL
const functions = new Functions()
var ListSheetReniec = null

var ListVerificacionEssalud = null
var ListVerificacionSunat = null
var ListVerificacionRecordConductor = null
var ListDarkFactor = null


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
    let txt_1_8_fecha_sentencia = formatSave($('#txt_1_8_fecha_sentencia').val())
    let txt_1_8_fecha_ejecutoria = formatSave($('#txt_1_8_fecha_ejecutoria').val())
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
            "FechaSentencia": txt_1_8_fecha_sentencia,
            "FechaEjecutoria": txt_1_8_fecha_ejecutoria,
            "JuzgadoEjecucionSentencia": txt_1_8_juzgado_ejecucion_sentencia,
            "NroExpediente": txt_1_8_nro_expediente,
            "MontoPagosPendientes": txt_1_8_monto_pagos_pendientes,
        }

        // -- Agregar objeto al listado
        listAntecedentesTraficoIlicitoDrogas.push(object)
        indexListAntecedentesTraficoIlicitoDrogas = tableAntecedentesTraficoIlicitoDrogas.rows().count() + 1

        // -- Agregar datos a la tabla
        tableAntecedentesTraficoIlicitoDrogas.row.add([
            indexListAntecedentesTerrorismo,
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


// -- MULTAS EECTORALES   

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
            "IdMultaElectoral": 0,
            "ItemMultaElectoral": 0,
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


// -- VERIFICACIÓN SUNAT




// -- 1.18 VERIFICACIÓN DE ANTECEDENTES LABORALES

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
    let txt_1_18_codigo = $('#txt_1_18_codigo').val()
    let sl_1_18_sexo = $('#sl_1_18_sexo').val()
    let txt_1_18_empresa = $('#txt_1_18_empresa').val()
    let txt_1_18_ruc = $('#txt_1_18_ruc').val()
    let txt_1_18_rubro_empresa = $('#txt_1_18_rubro_empresa').val()

    // -- Validar
    if (
        txt_1_18_codigo.length > 0 &&
        txt_1_18_empresa.length > 0 &&
        txt_1_18_ruc.length > 0 &&
        txt_1_18_rubro_empresa.length > 0
    ) {
        // --
        let object = {
            "IdVerifAntecLaboral": 0,
            "ItemVerifAntecLaboral": 0,
            "Periodo": txt_1_18_codigo,
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
            txt_1_18_codigo,
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
            "IdVerifCargoPublico": 0,
            "ItemVerifCargoPublico": 0,
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
            "IdVerifFiliacionPolitica": 0,
            "ItemVerifFiliacionPolitica": 0,
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

    // -- 1.15 MULTAS EECTORALES
    

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
            formData.append("dataFile", file_1_16_imagen, "VerificacionSunat." + ext1_16_verificacion_sunat)
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

    // -- 2.1 FACTOR OSCURO
    var file_2_1_pdf = $('#file_2_1_factor_oscuro').prop("files")[0];
    var ext2_1_factor_oscuro = ""
    // --
    if (file_2_1_pdf !== undefined) {
        // --
        ext2_1_factor_oscuro = getFileExtension(file_2_1_pdf.name)
        // --
        if (ext2_1_factor_oscuro == "pdf") {
            // --
            formData.append("dataFile", file_2_1_pdf, "FactorOscuro." + ext2_1_factor_oscuro)
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
            "Edad": txt_1_1_edad,
            "IdEstadoCivil": txt_1_1_estado_civil
        },
        // --
        "oJudicialProceedingsFlt": {
            "IdProcesoJudicial": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "NumProcesosContra": txt_1_2_procesos_contra,
            "NumProcesosInterpuestos": txt_1_2_procesos_interpuestos,
            "ListJudicialProceedingsDetailFlt": listProcesosJudiciales
        },
        // -- 
        "oCriminalProceedingsFlt": {
            "IdProcesoPenal": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "NumProcesosContra": txt_1_3_procesos_contra,
            "NumProcesosInterpuestos": txt_1_3_procesos_interpuestos,
            "ListCriminalProceedingsDetailFlt": listProcesosPenales
        },
        // --
        "oPoliceProceedingsFlt": {
            "IdProcesoPolicial": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "NumProcesosContra": txt_1_4_procesos_contra,
            "NumProcesosInterpuestos": txt_1_4_procesos_interpuestos,
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
            "PorcNormal": txt_1_11_normal,
            "PorcProblemasPotenciales": txt_1_11_problemas_potenciales,
            "PorcDeficiente": txt_1_11_deficiente,
            "PorcDudoso": txt_1_11_dudoso,
            "PorcPerdida": txt_1_11_perdida,
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
            "IdDesempeñoLaboral":0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "NombreEmpresa": txt_1_21_nombre_empresa,
            "CargoDesempenado": txt_1_21_cargo_desempenado,
            "FechaInicio": txt_1_21_fecha_inicio,
            "FechaTerminacion": txt_1_21_fecha_termino,
            "MotivoRetiro": txt_1_21_motivo_retiro,
            "NombrePersonBrindaInfo": txt_1_21_persona_brinda_infomacion,
            "Cargo": txt_1_21_cargo,
            "Telefonos_Correo": txt_1_21_telefonos_correo,
            "DescripcionDesempeno": sl_1_21_desempeno,
            "PreguntaVolveriaAContratar": sl_1_21_volveria_contratar
        },
        // --
        "oDarkFactorFlt": {
            "IdFactorOscuro": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "ArchivoAdjunto": {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "FactorOscuro." + ext2_1_factor_oscuro,
                "RutaArchivo": null,
                "ExtensionArchivo": ext2_1_factor_oscuro,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            }
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

    if (ListDarkFactor != null) {
        if (ListDarkFactor.ArchivoAdjunto != null) {
            objectData.oDarkFactorFlt.ArchivoAdjunto = ListDarkFactor.ArchivoAdjunto
        }
    }
  
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
                    url: urlSaveorUpdateIntegrity360Peru,
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
                                return fetch()
                                    .then(window.location.reload())
                                    .catch(() => {
                                    })
                            }
                        }]);



                        // --
                        
                    }
                });
            }
        }])
    } else {
        const ipAPI = 'https://pokeapi.co/api/v2/pokemon/ditto'

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
                    url: urlSaveorUpdateIntegrity360Peru,
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
                                return fetch()
                                    .then(window.location.reload())
                                    .catch(() => {
                                    })
                            }
                        }]);
                    }
                });
            }
        }])
    }

})

function getListStatusCivil() {
   
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
            console.log(data);
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
function getList360Peru() {
    // --
    // -- $("#txt_1_1_fecha_nacimiento").datepicker({ dateFormat: 'DD/MM/YYYY' });
    // - let status = getDatos("status")
    // --
    // -- if (status == "true" || status == true) {
    // --
    let idIntegridad = getDatos("key")
    let Item = getDatos("item")
    // --
    let url = urlGetRiskAnalysisFormat360Peru + "?IdIntegridad=" + idIntegridad + "&ItemIntegridadDet=" + Item
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
                    $('#txt_1_1_estado_civil').trigger('change');
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

                        console.log(obj.oSunatVerificationVm);

                        $("#PreviewVerificacionSunat button").attr("data-typefile", obj.oSunatVerificationVm.ArchivoSunat.ExtensionArchivo)
                        $("#PreviewVerificacionSunat button").attr("data-route", btoa(obj.oSunatVerificationVm.ArchivoSunat.RutaArchivo))
                        $("#PreviewVerificacionSunat span").text(obj.oSunatVerificationVm.ArchivoSunat.NombreArchivo)
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
                    $('#txt_1_21_cargo_desempenado').val(obj.oJobPerformanceVm.CargoDesempenado)
                    $('#txt_1_21_fecha_inicio').val(formatDate(obj.oJobPerformanceVm.FechaInicio))
                    $('#txt_1_21_fecha_termino').val(formatDate(obj.oJobPerformanceVm.FechaTerminacion))
                    $('#txt_1_21_motivo_retiro').val(obj.oJobPerformanceVm.MotivoRetiro)
                    $('#txt_1_21_persona_brinda_infomacion').val(obj.oJobPerformanceVm.NombrePersonBrindaInfo)
                    $('#txt_1_21_cargo').val(obj.oJobPerformanceVm.Cargo)
                    $('#txt_1_21_telefonos_correo').val(obj.oJobPerformanceVm.Telefonos_Correo)
                    $('#sl_1_21_desempeno').val(obj.oJobPerformanceVm.DescripcionDesempeno)
                    $('#sl_1_21_desempeno').trigger('change');
                    $('#sl_1_21_volveria_contratar').val(obj.oJobPerformanceVm.PreguntaVolveriaAContratar)
                }

                // -- 2.0 FACTOR OSCURO
                if (obj.oDarkFactorVm != null) {
                    // --
                    if (obj.oDarkFactorVm.ArchivoAdjunto != null) {
                        // --
                        ListDarkFactor = obj.oDarkFactorVm

                        //$("#PreviewFactorOscuro button").attr("data-typefile", obj.oSheetReniecVm.FotoAdjunta.ExtensionArchivo)
                        //$("#PreviewFactorOscuro button").attr("data-route", btoa(obj.oSheetReniecVm.FotoAdjunta.RutaArchivo))
                        $("#PreviewFactorOscuro span").text(obj.oDarkFactorVm.ArchivoAdjunto.NombreArchivo)
                    }
                }
            }

        }
    });
    // --- }

}
$("#btn_3_10_Generar").on('click', function () {
    console.log("ad");
    GenerateDocument();
});

function GenerateDocument() {
    // --
    let idIntegridad = getDatos("key");
    var itemIntegridad = getDatos("item");
    let url = urlGenerateDocument + "?IdIntegridad=" + idIntegridad + "&ItemIntegridadDet=" + itemIntegridad + "&idDocumentFile=1";
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

// --
getListStatusCivil();
getList360Peru();