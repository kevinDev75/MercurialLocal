
// -- VARIABLES
var indexListAnexos = 0
var listAnexos = new Array()
var listFilesAnexos = new Array()

// -- TABLES
var tableAnexos = $('#tbl_9_list').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})


// -- FUNCTIONS

// --
function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

// -- Función para validar y retornar un file
function validateFile(file) {
    // -- Constantes para validar el tamaño de un archivo
    const byte = 1048576 // -- 1 MB	-> 1048576 Byte
    const maxSize = 20 // -- 20 Megabytes

    // -- Variable a retornar
    var data = null
    // -- Validamos que exista el archivo
    if (file != undefined) {
        // -- Validamos tamaño que sea menor a 20 MB
        if ((file.size / byte) <= maxSize) {
            // -- Obtenemos la extensión del archivo
            var extension = getFileExtension(file.name)
            // -- Convertimos la extensión a minúscula
            extension = extension.toLowerCase()
            // -- Validamos si es PDF
            if (extension == "pdf") {
                // -- Creamos el objeto del adjunto
                let obj = {
                    "IdArchivoAdjunto": 0,
                    "NombreArchivo": file.name,
                    "RutaArchivo": null,
                    "ExtensionArchivo": extension,
                    "FecRegistro": null,
                    "IdUsuarioRegistro": 0
                }
                // -- 
                data = obj
            }
        }
    }
    // -- Retornamos data
    return data
}

// -- AGREGAR DATOS A LA TABLA
$("#btn_9_agregar").on('click', function () {

    // -- 
    var file = $("#file_9").prop("files")[0]
    // --
    indexListAnexos = tableAnexos.rows().count() + 1
    // --
    var objFile = validateFile(file)

    if (objFile != null) {
        // --
        let object = {
            "IdAnexo": 0,
            "ItemAnexo": 0,
            "ArchivoAdjuntoAnalisisRiesgo": objFile
        }
        // -- Agregar objeto al listado
        listAnexos.push(object)
        // --
        file.id = indexListAnexos
        listFilesAnexos.push(file)

        // -- Agregar datos a la tabla
        tableAnexos.row.add([
            indexListAnexos,
            file.name,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListAnexos + '" id="btn_9_delete_row"> <i class="fa fa-trash"></i></button >'
        ]).draw(false);
        // --
        tableAnexos.columns.adjust()
            .responsive.recalc();

        // --
        indexListAnexos++
        // --
        $('#file_9').val(null);

    }

})


// -- ELIMINAR DATOS DE LA TABLA
$(document).on('click', '#btn_9_delete_row', function () {
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



// -- GUARDAR
$('#btn_guardar').on('click', function () {
    // --
    var formData = new FormData();

    // --
    let idIntegridad = getDatos("key");
    let itemIntegridad = getDatos("item");
    // --
    var txt_1_nombres_apellidos = $("#txt_1_nombres_apellidos").val()
    var txt_1_nro_documento = $("#txt_1_nro_documento").val()
    var txt_1_fecha_inscripcion = formatSaveDefault($("#txt_1_fecha_inscripcion").val())
    var txt_1_fecha_expedicion = formatSaveDefault($("#txt_1_fecha_expedicion").val())
    var txt_1_caducidad = formatSaveDefault($("#txt_1_caducidad").val())
    var txt_1_direccion = $("#txt_1_direccion").val()
    var txt_1_lugar_nacimiento = $("#txt_1_lugar_nacimiento").val()
    var txt_1_fecha_nacimiento = formatSaveDefault($("#txt_1_fecha_nacimiento").val())
    var txt_1_nacionalidad = $("#txt_1_nacionalidad").val()
    var txt_1_edad = $("#txt_1_edad").val()
    var txt_1_estado_civil = $("#txt_1_estado_civil").val()
    var txt_1_grado_instruccion = $("#txt_1_grado_instruccion").val()
    var txt_1_estatura = $("#txt_1_estatura").val()
    var txt_1_nombre_madre = $("#txt_1_nombre_madre").val()
    var txt_1_nombre_padre = $("#txt_1_nombre_padre").val()

    // --
    var radioNivel = $('input:radio[name=radioNivel]:checked').val()
    var radioCalificacion = $('input:radio[name=radioCalificacion]:checked').val()

    // --
    var txt_escala_sinceridad = $("#txt_escala_sinceridad").val()
    var txt_nivel_riesgo = $("#txt_nivel_riesgo").val()

    // --
    var radio_2_analisis = $('input:radio[name=radio_2_analisis]:checked').val()
    var txt_2_observaciones = $("#txt_2_observaciones").val()
    var txt_2_analisis = $("#txt_2_analisis").val()

    // --
    var radio_4_antecedentes_financieros = $('input:radio[name=radio_4_antecedentes_financieros]:checked').val()
    var txt_4_antecedentes_financieros = $("#txt_4_antecedentes_financieros").val()

    // --
    //var txt_8_conclusion = $("#txt_8_conclusion").val()

    // --
    let objectData = {
        // --
        "oPersonalDataEvaluatedFlt": {
            "IdDatoPersonalEvaluado": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "NombresApellidos": txt_1_nombres_apellidos,
            "NroDocumento": txt_1_nro_documento,
            "FechaInscripcion": txt_1_fecha_inscripcion,
            "FechaExpedicion": txt_1_fecha_expedicion,
            "Caducidad": txt_1_caducidad,
            "Direccion": txt_1_direccion,
            "LugarNacimiento": txt_1_lugar_nacimiento,
            "FechaNacimiento": txt_1_fecha_nacimiento,
            "Nacionalidad": txt_1_nacionalidad,
            "Edad": validateNumber(txt_1_edad),
            "IdEstadoCivil": validateNumber(txt_1_estado_civil),
            "GradoInstruccion": txt_1_grado_instruccion,
            "Estatura": txt_1_estatura,
            "NombreMadre": txt_1_nombre_madre,
            "NombrePadre": txt_1_nombre_padre
        },
        // --
        "oPremiumPersonalHistoryFlt": {
            "IdAntecPersonalPremium": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Observaciones": txt_2_observaciones,
            "Analisis": txt_2_analisis,
            "Registra": radio_2_analisis
        },
        // --
        "oFinancialRecordsAnalysisFlt": {
            "IdAnalisisAntecFinanciero": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "CompFinancieroSentienel": radio_4_antecedentes_financieros + txt_4_antecedentes_financieros
        },
        // --
        "oEndResultFlt": {
            "IdResultadoFinal": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Riesgo": radioNivel,
            "Calificacion": radioCalificacion,
            "EscalaSinceridad": validateNumber(txt_escala_sinceridad),
            "NivelRiesgo": validateNumber(txt_nivel_riesgo)
        }
    }

    // --  Validación principal
    var statusFirstValidation = false
    // --
    if ($("#txt_1_fecha_inscripcion").val() == "") { $('#ul_error_1_fecha_inscripcion').show(); statusFirstValidation = true; }
    if ($("#txt_1_fecha_expedicion").val() == "") { $('#ul_error_1_fecha_expedicion').show(); statusFirstValidation = true; }
    if ($("#txt_1_caducidad").val() == "") { $('#ul_error_1_caducidad').show(); statusFirstValidation = true; }
    if ($("#txt_1_nacionalidad").val() == "") { $('#ul_error_1_nacionalidad').show(); statusFirstValidation = true; }
    if ($("#txt_1_edad").val() == "") { $('#ul_error_1_edad').show(); statusFirstValidation = true; }
    if ($("#txt_1_estado_civil").val() == 0) { $('#ul_error_1_estado_civil').show(); statusFirstValidation = true; }
    if ($("#txt_1_grado_instruccion").val() == "") { $('#ul_error_1_grado_instruccion').show(); statusFirstValidation = true; }
    if ($("#txt_1_estatura").val() == "") { $('#ul_error_1_estatura').show(); statusFirstValidation = true; }
    if ($("#txt_1_nombre_madre").val() == "") { $('#ul_error_1_nombre_madre').show(); statusFirstValidation = true; }
    if ($("#txt_1_nombre_padre").val() == "") { $('#ul_error_1_nombre_padre').show(); statusFirstValidation = true; }

    if (statusFirstValidation) {
        // --
        Swal.fire({
            icon: 'error',
            title: 'Completar campos obligatorios.',
            text: 'I. DATOS PERSONALES DEL EVALUADO',
        })
    } else {
        // -- VALIDACION
        var camposVacios = ""
        // --
        if (txt_2_observaciones == "" ||
            txt_2_analisis == "") {
            camposVacios += "<span>II. ANÁLISIS DE ANTECEDENTES PERSONALES</span>"
        }
        // --
        if (txt_4_antecedentes_financieros == "") {
            camposVacios += "<span>III. ANÁLISIS DE ANTECEDENTES FINANCIEROS</span>"
        }

        // --
        console.log(objectData)

        // --
        formData.append(
            "JsonMaster",
            JSON.stringify(objectData)
        );

        // --
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
                        url: UrlSaveorUpdateIntegrityPeru,
                        data: formData,
                        dataType: 'json',
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            // --
                            console.log(data)
                            var typeAlert = (data.response.status == "OK") ? 'success' : 'error';
                            var Message = (data.response.status == "OK") ? 'Se guardo la información correctamente' : 'Ocurrio un problema, Comuniquese con sistemas';
                            // --
                            Swal.insertQueueStep({
                                icon: typeAlert,
                                title: Message
                            });
                            // --
                        }
                    });

                }
            }])

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

                    return $.ajax({
                        type: "POST",
                        url: UrlSaveorUpdateIntegrityPeru,
                        data: formData,
                        dataType: 'json',
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            // --
                            console.log(data)
                            var typeAlert = (data.response.status == "OK") ? 'success' : 'error';
                            var Message = (data.response.status == "OK") ? 'Se guardo la información correctamente' : 'Ocurrio un problema, Comuniquese con sistemas';
                            // --
                            Swal.insertQueueStep({
                                icon: typeAlert,
                                title: Message
                            });
                            // --
                            if (data.response.status == "OK") {
                                // --
                                //location.reload()
                            }
                        }
                    });


                }
            }])
        }
    }
})


// --
function getListStatusCivil() {
    // --
    $.ajax({
        url: UrlGetStatusCivil,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (data) {
            // --
            let html = ''
            html += '<option value=0>[Seleccione]</option>'
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
            $('#txt_1_estado_civil').html(html);
            // --
            
        }
    })
}


// --
function changeFormatInputDate(fecha) {
    // --
    var reordenar = ""
    // --
    if (fecha != null) {
        // --
        var replaceFechaInscripcion = fecha.replace('/', '-');
        replaceFechaInscripcion = replaceFechaInscripcion.replace('/', '-')
        // --
        reordenar = replaceFechaInscripcion.split("-");
        reordenar = reordenar[2] + "-" + reordenar[1] + "-" + reordenar[0];
    }
    // --
    return reordenar;
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

getListStatusCivil()