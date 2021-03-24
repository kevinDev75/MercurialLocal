// -- GLOBAL
const functions = new Functions()

// -- ANEXOS SENTINEL, PRUEBAS PSIGMA, VISISTA DOMICILIARIA
// -- VARIABLES
var listAnexos = new Array()
var listFilesAnexos = new Array()
var indexListAnexos = 1
var listFirma = null
var ListPhotografym = null

// -- TABLE
var tableAnexos = $('#tbl_9_list').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})


// -- AGREGAR DATOS A LA TABLA
$("#btn_9_agregar").on('click', function () {

    // -- 
    var file = $("#file_9").prop("files")[0]

    var ext = ""
    // --
    if (file !== undefined) {
        // --
        ext = getFileExtension(file.name)
        // --
        if (ext != "" && (ext == "pdf" || ext == "PDF")) {
            // --
            indexListAnexos = tableAnexos.rows().count() + 1
            // --
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
            // -- Agregar objeto al listado
            listAnexos.push(object)
            // --
            file.id = indexListAnexos
            listFilesAnexos.push(file)

            // -- Agregar datos a la tabla
            tableAnexos.row.add([
                indexListAnexos,
                'Anexo_' + indexListAnexos,
                ' <button class= "btn btn-sm btn-danger" data-id="' + indexListAnexos + '" id="btn_9_delete_row"> <i class="fa fa-trash"></i></button >'
            ]).draw(false);
            // --
            tableAnexos.columns.adjust()
                .responsive.recalc();

            // --
            indexListAnexos++
            // --
            $('#file_9').val(null);

        } else {
            functions.notify_message('Solo se admiten archivos PDF', 'warning')
        }

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



// -- VISITA DOMICILIARIA




// -- HERMANOS
var listHermanos = new Array()
var indexListHermanos = 1

// -- TABLE
var tableHermanos = $('#tbl_vd_2_list_hermanos').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_vd_2_agregar_hermanos").on('click', function () {
    // --
    var txt_vd_2_hermanos_nombres = $("#txt_vd_2_hermanos_nombres").val()
    var txt_vd_2_hermanos_edad = $("#txt_vd_2_hermanos_edad").val()
    var txt_vd_2_hermanos_nivel_educativo = $("#txt_vd_2_hermanos_nivel_educativo").val()
    var txt_vd_2_hermanos_ocupacion = $("#txt_vd_2_hermanos_ocupacion").val()
    var txt_vd_2_hermanos_empresa_institucion = $("#txt_vd_2_hermanos_empresa_institucion").val()
    var txt_vd_2_hermanos_convive_usted = $("#txt_vd_2_hermanos_convive_usted").val()

    // -- Validar
    if (
        txt_vd_2_hermanos_nombres.length > 0 &&
        txt_vd_2_hermanos_edad.length > 0 &&
        txt_vd_2_hermanos_nivel_educativo.length > 0 &&
        txt_vd_2_hermanos_ocupacion.length > 0 &&
        txt_vd_2_hermanos_empresa_institucion.length > 0 &&
        txt_vd_2_hermanos_convive_usted.length > 0
    ) {
        // --
        let object = {
            "IdEntornoFamiliar": 0,
            "ItemEntornoFamiliar": 0,
            "IdParentesco": 3, // -- HERMANO
            "Nombres": txt_vd_2_hermanos_nombres,
            "Edad": validateNumber(txt_vd_2_hermanos_edad),
            "NivelEducativo": txt_vd_2_hermanos_nivel_educativo,
            "Ocupacion": txt_vd_2_hermanos_ocupacion,
            "EmpresaInstitucion": txt_vd_2_hermanos_empresa_institucion,
            "ConviveConUsted": txt_vd_2_hermanos_convive_usted
        }

        // -- Agregar objeto al listado
        listHermanos.push(object)
        indexListHermanos = tableHermanos.rows().count() + 1

        // -- Agregar datos a la tabla
        tableHermanos.row.add([
            indexListHermanos,
            txt_vd_2_hermanos_nombres,
            txt_vd_2_hermanos_edad,
            txt_vd_2_hermanos_nivel_educativo,
            txt_vd_2_hermanos_ocupacion,
            txt_vd_2_hermanos_empresa_institucion,
            txt_vd_2_hermanos_convive_usted,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListHermanos + '" id="btn_vd_2_delete_row_hermanos"> <i class="fa fa-trash"></i></button >'
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
$(document).on('click', '#btn_vd_2_delete_row_hermanos', function () {
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
    $('#txt_vd_2_hermanos_nombres').val('')
    $('#txt_vd_2_hermanos_edad').val('')
    $('#txt_vd_2_hermanos_nivel_educativo').val('')
    $('#txt_vd_2_hermanos_ocupacion').val('')
    $('#txt_vd_2_hermanos_empresa_institucion').val('')
    $('#txt_vd_2_hermanos_convive_usted').val('')
}




// -- HIJOS

// -- VARIABLES
var listHijos = new Array()
var indexListHijos = 1

// -- TABLE
var tableHijos = $('#tbl_vd_2_list_hijos').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_vd_2_agregar_hijos").on('click', function () {
    // --
    let txt_vd_2_hijos_nombres = $('#txt_vd_2_hijos_nombres').val()
    let txt_vd_2_hijos_edad = $('#txt_vd_2_hijos_edad').val()
    let txt_vd_2_hijos_nivel_educativo = $('#txt_vd_2_hijos_nivel_educativo').val()
    let txt_vd_2_hijos_ocupacion = $('#txt_vd_2_hijos_ocupacion').val()
    let txt_vd_2_hijos_empresa_institucion = $('#txt_vd_2_hijos_empresa_institucion').val()
    let txt_vd_2_hijos_convive_usted = $('#txt_vd_2_hijos_convive_usted').val()

    // -- Validar
    if (
        txt_vd_2_hijos_nombres.length > 0 &&
        txt_vd_2_hijos_edad.length > 0 &&
        txt_vd_2_hijos_nivel_educativo.length > 0 &&
        txt_vd_2_hijos_ocupacion.length > 0 &&
        txt_vd_2_hijos_empresa_institucion.length > 0 &&
        txt_vd_2_hijos_convive_usted.length > 0
    ) {
        // --
        let object = {
            "IdEntornoFamiliar": 0,
            "ItemEntornoFamiliar": 0,
            "IdParentesco": 5, // -- HIJO(A)
            "Nombres": txt_vd_2_hijos_nombres,
            "Edad": validateNumber(txt_vd_2_hijos_edad),
            "NivelEducativo": txt_vd_2_hijos_nivel_educativo,
            "Ocupacion": txt_vd_2_hijos_ocupacion,
            "EmpresaInstitucion": txt_vd_2_hijos_empresa_institucion,
            "ConviveConUsted": txt_vd_2_hijos_convive_usted
        }

        // -- Agregar objeto al listado
        listHijos.push(object)
        indexListHijos = tableHijos.rows().count() + 1

        // -- Agregar datos a la tabla
        tableHijos.row.add([
            indexListHijos,
            txt_vd_2_hijos_nombres,
            txt_vd_2_hijos_edad,
            txt_vd_2_hijos_nivel_educativo,
            txt_vd_2_hijos_ocupacion,
            txt_vd_2_hijos_empresa_institucion,
            txt_vd_2_hijos_convive_usted,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListHijos + '" id="btn_vd_2_delete_row_hijos"> <i class="fa fa-trash"></i></button >'
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
$(document).on('click', '#btn_vd_2_delete_row_hijos', function () {
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
    $('#txt_vd_2_hijos_nombres').val('')
    $('#txt_vd_2_hijos_edad').val('')
    $('#txt_vd_2_hijos_nivel_educativo').val('')
    $('#txt_vd_2_hijos_ocupacion').val('')
    $('#txt_vd_2_hijos_empresa_institucion').val('')
    $('#txt_vd_2_hijos_convive_usted').val('')
}


// -- ENTORNO PROFESIONAL Y LABORAL

// -- VARIABLES
var listEntornoProfesionalLaboral = new Array()
var indexListEntornoProfesionalLaboral = 1

// -- TABLE
var tableEntornoProfesionalLaboral = $('#tbl_vd_3_list').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_vd_3_agregar").on('click', function () {
    // --
    let txt_vd_3_empresa = $('#txt_vd_3_empresa').val()
    let txt_vd_3_cargo = $('#txt_vd_3_cargo').val()
    let txt_vd_3_tiempo_laborado = $('#txt_vd_3_tiempo_laborado').val()
    let txt_vd_3_jefe_inmediato = $('#txt_vd_3_jefe_inmediato').val()
    let txt_vd_3_telefonos = $('#txt_vd_3_telefonos').val()

    // -- Validar
    if (
        txt_vd_3_empresa.length > 0 &&
        txt_vd_3_cargo.length > 0 &&
        txt_vd_3_tiempo_laborado.length > 0 &&
        txt_vd_3_jefe_inmediato.length > 0 &&
        txt_vd_3_telefonos.length > 0
    ) {
        // --
        let object = {
            "IdEntornoProf": 0,
            "ItemEntornoProf": 0,
            "Empresa": txt_vd_3_empresa,
            "Cargo": txt_vd_3_cargo,
            "TiempoLaborado": txt_vd_3_tiempo_laborado,
            "JefeInmediato": txt_vd_3_jefe_inmediato,
            "Telefonos": txt_vd_3_telefonos
        }

        // -- Agregar objeto al listado
        listEntornoProfesionalLaboral.push(object)
        indexListEntornoProfesionalLaboral = tableEntornoProfesionalLaboral.rows().count() + 1

        // -- Agregar datos a la tabla
        tableEntornoProfesionalLaboral.row.add([
            indexListEntornoProfesionalLaboral,
            txt_vd_3_empresa,
            txt_vd_3_cargo,
            txt_vd_3_tiempo_laborado,
            txt_vd_3_jefe_inmediato,
            txt_vd_3_telefonos,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListEntornoProfesionalLaboral + '" id="btn_vd_3_delete_row"> <i class="fa fa-trash"></i></button >'
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
$(document).on('click', '#btn_vd_3_delete_row', function () {
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
    $('#txt_vd_3_empresa').val('')
    $('#txt_vd_3_cargo').val('')
    $('#txt_vd_3_tiempo_laborado').val('')
    $('#txt_vd_3_jefe_inmediato').val('')
    $('#txt_vd_3_telefonos').val('')
}



// -- RELACIÓN CON LA COMUNIDAD

// -- VARIABLES
var listRelacionComunidad = new Array()
var indexListRelacionComunidad = 1

// -- TABLE
var tableRelacionComunidad = $('#tbl_vd_5_list').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

// -- AGREGAR DATOS A LA TABLA
$("#btn_vd_5_agregar").on('click', function () {
    // --
    var txt_vd_5_relacion_comunidad_nombre = $('#txt_vd_5_relacion_comunidad_nombre').val()
    var txt_vd_5_relacion_comunidad_tiempo_conoce = $('#txt_vd_5_relacion_comunidad_tiempo_conoce').val()
    var txt_vd_5_relacion_comunidad_concepto = $('#txt_vd_5_relacion_comunidad_concepto').val()

    // -- Validar
    if (
        txt_vd_5_relacion_comunidad_nombre.length > 0 &&
        txt_vd_5_relacion_comunidad_tiempo_conoce.length > 0 &&
        txt_vd_5_relacion_comunidad_concepto.length > 0
    ) {
        // --
        let object = {
            "IdRelacionComunidad": 0,
            "IdCaracteristicaBas": 0,
            "Nombre": txt_vd_5_relacion_comunidad_nombre,
            "TiempoConoce": txt_vd_5_relacion_comunidad_tiempo_conoce,
            "Concepto": txt_vd_5_relacion_comunidad_concepto
        }

        // -- Agregar objeto al listado
        listRelacionComunidad.push(object)
        indexListRelacionComunidad = tableRelacionComunidad.rows().count() + 1

        // -- Agregar datos a la tabla
        tableRelacionComunidad.row.add([
            indexListRelacionComunidad,
            txt_vd_5_relacion_comunidad_nombre,
            txt_vd_5_relacion_comunidad_tiempo_conoce,
            txt_vd_5_relacion_comunidad_concepto,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListRelacionComunidad + '" id="btn_vd_5_delete_row"> <i class="fa fa-trash"></i></button >'
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
$(document).on('click', '#btn_vd_5_delete_row', function () {
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
    $('#txt_vd_5_relacion_comunidad_nombre').val('')
    $('#txt_vd_5_relacion_comunidad_tiempo_conoce').val('')
    $('#txt_vd_5_relacion_comunidad_concepto').val('')
}


// --
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
            $('#sl_vd_1_estado_civil').html(html);
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
function calculateGraphic() {
    // --
    let txt_escala_sinceridad = $("#txt_escala_sinceridad").val()
    let txt_nivel_riesgo = $("#txt_nivel_riesgo").val()
    // --
    if (txt_escala_sinceridad <= 100 & txt_nivel_riesgo <= 100 && txt_escala_sinceridad > 0 & txt_nivel_riesgo > 0) {
        // --
        var chart = Highcharts.chart('container-graphic', {

            title: {
                text: 'Resultados Test Psicologico'
            },

            subtitle: {
                text: ''
            },

            xAxis: {
                categories: ['Escala sinceridad', 'Nivel de Riesgo']
            },

            series: [{
                type: 'column',
                colorByPoint: true,
                data: [parseFloat(txt_escala_sinceridad), parseFloat(txt_nivel_riesgo)],
                showInLegend: false
            }]

        });
        svg_to_png('container-graphic')


    } else {
        // -- alert("Ingrese digitos entre 1 y 50")
    }
    if (txt_escala_sinceridad == 0 && txt_nivel_riesgo == 0) {
        console.log("deberia limpiar todo");
        $("#container-graphic").empty();

    } else {
        var chart = Highcharts.chart('container-graphic', {

            title: {
                text: 'Resultados Test Psicologico'
            },

            subtitle: {
                text: ''
            },

            xAxis: {
                categories: ['Escala sinceridad', 'Nivel de Riesgo']
            },

            series: [{
                type: 'column',
                colorByPoint: true,
                data: [parseFloat(txt_escala_sinceridad), parseFloat(txt_nivel_riesgo)],
                showInLegend: false
            }]

        });
        svg_to_png('container-graphic')
    }
}

function dataURLtoFile(dataurl, filename) {
    // --
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    // --
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    // --
    return new File([u8arr], filename, { type: mime });
}




// -- GUARDAR
$('#btn_guardar').on('click', function () {
    // --
    var formData = new FormData();

    // -- GET VALUES
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
    var wrapper = document.getElementById("container-graphic");
    var svg = wrapper.querySelector("svg");
    // --
    if (svg != null) {
        // --
        if (typeof window.XMLSerializer != "undefined") {
            var svgData = (new XMLSerializer()).serializeToString(svg);
        } else if (typeof svg.xml != "undefined") {
            var svgData = svg.xml;
        }

        // --
        var canvas = document.createElement("canvas");
        var svgSize = svg.getBoundingClientRect();
        canvas.width = svgSize.width;
        canvas.height = svgSize.height;
        var ctx = canvas.getContext("2d");
        // --
        var img = document.createElement("img");
        img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))));

        img.onload = function () {
            // --
            ctx.drawImage(img, 0, 0);
            // --
            var imgsrc = canvas.toDataURL("image/png");
            var file = dataURLtoFile(imgsrc, "FotoGrafico.png");
            formData.append("dataFile", file, "FotoGrafico.png");
        };
    }



    // --
    var radio_2_analisis = $('input:radio[name=radio_2_analisis]:checked').val()
    var txt_2_observaciones = $("#txt_2_observaciones").val()
    var txt_2_analisis = $("#txt_2_analisis").val()
    var radio_2_antecedentes = $('input:radio[name=radio_2_antecedentes]:checked').val()
    // --
    var txt_4_financiero_sentienel = $("#txt_4_financiero_sentienel").val()
    var txt_4_sunat = $("#txt_4_sunat").val()
    var txt_4_personas_excluidas = $("#txt_4_personas_excluidas").val()


    // --
    var txt_6_analisis_factor_oscuro = $("#txt_6_analisis_factor_oscuro").val()

    // --
    var txt_7_direccion = $("#txt_7_direccion").val()
    var txt_7_fecha_entrevista = formatSave($("#txt_7_fecha_entrevista").val())
    var txt_7_hora_entrevista = $("#txt_7_hora_entrevista").val()
    var txt_7_personas_entrevistadas = $("#txt_7_personas_entrevistadas").val()
    var txt_7_analisis = $("#txt_7_analisis").val()

    // --
    var txt_8_conclusion = $("#txt_8_conclusion").val()


    // -- ANEXOS
    if (listFilesAnexos != undefined && listFilesAnexos.length > 0) {
        // --
        listFilesAnexos.forEach((element) => {
            // --
            if (element !== undefined) {
                // --
                var ext = getFileExtension(element.name)
                // --
                if (ext == "pdf") {
                    // --
                    formData.append("dataFile", element, "Anexo_" + element.id + "." + ext);
                }
            }
        })
    }


    // --
    let objectData = {
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
        "oPremiumPersonalHistoryFlt": {
            "IdAntecPersonalPremium": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Observaciones": txt_2_observaciones,
            "Analisis": txt_2_analisis,
            "Registra": radio_2_analisis
        },
        "oFinancialRecordsAnalysisFlt": {
            "IdAnalisisAntecFinanciero": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "NivelRiesgo": radio_2_antecedentes,

            "CompFinancieroSentienel":  txt_4_financiero_sentienel
        },
        "oAnalysisTestDarkFactorFlt": {
            "IdAnalisisTestFactorOscuro": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Analisis": txt_6_analisis_factor_oscuro
        },
        "oHouseCallsAnalysisFlt": {
            "IdAnalisisVisitaDomiciliaria": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Direccion": txt_7_direccion,
            "FechaEntrevista": txt_7_fecha_entrevista,
            "HoraEntrevista": txt_7_hora_entrevista,
            "PersonasEntrevistadas": txt_7_personas_entrevistadas,
            "Analisis": txt_7_analisis
        },
        "oConclusionFlt": {
            "IdConclusion": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Conclusion": txt_8_conclusion
        },
        "oAnexosFlt": {
            "IdAnexo": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "ListAnexosDetFlt": listAnexos
        },
        "oEndResultFlt": {
            "IdResultadoFinal": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Riesgo": radioNivel,
            "Calificacion": radioCalificacion,
            "EscalaSinceridad": validateNumber(txt_escala_sinceridad),
            "NivelRiesgo": validateNumber(txt_nivel_riesgo)
        },

    }


    // --
    if (listFilesAnexos != undefined && listFilesAnexos.length > 0) {
        // --
        listFilesAnexos.forEach((element) => {
            // --
            var ext = getFileExtension(element.name)
            formData.append("dataFile", element, "Anexo_" + element.id + "." + ext);
        })
    }

    // --  Validación principal

    // --  Validación principal
    var statusFirstValidation = false
    var urlUsuario = urlWorkIntegrityDetail + "?IdIntegridad=" + idIntegridad;
    var validacionDocumento;
    $.ajax({
        url: urlUsuario,
        type: 'GET',
        dataType: 'json',
        async: false,
        success: function (d) {

            if (d != null) {
                validacionDocumento = d.Data;
                console.log(validacionDocumento);
                let itemIntegridad = getDatos("item");
                validacionDocumento = validacionDocumento[itemIntegridad - 1]
                console.log(validacionDocumento);

            } else {
                console.log("error no trae nada");
            }
        },
        error: function () {
            console.log("error con la consulta getdatoworkintegriy");
        }
    })

    if (validacionDocumento.IdTipoDocIdentidad == 1) {
        if ($("#txt_1_estado_civil").val() == 0) { $('#ul_error_1_estado_civil').show(); statusFirstValidation = true; }
        if ($("#txt_1_grado_instruccion").val() == "") { $('#ul_error_1_grado_instruccion').show(); statusFirstValidation = true; }
        if ($("#txt_1_estatura").val() == "") { $('#ul_error_1_estatura').show(); statusFirstValidation = true; }
        if ($("#txt_1_nombre_madre").val() == "") { $('#ul_error_1_nombre_madre').show(); statusFirstValidation = true; }
        if ($("#txt_1_nombre_padre").val() == "") { $('#ul_error_1_nombre_padre').show(); statusFirstValidation = true; }
    } else {
        console.log("No Dni");

    }

    if ($("#txt_1_fecha_inscripcion").val() == "") { $('#ul_error_1_fecha_inscripcion').show(); statusFirstValidation = true; }
    if ($("#txt_1_fecha_expedicion").val() == "") { $('#ul_error_1_fecha_expedicion').show(); statusFirstValidation = true; }
    if ($("#txt_1_caducidad").val() == "") { $('#ul_error_1_caducidad').show(); statusFirstValidation = true; }
    if ($("#txt_1_nacionalidad").val() == "") { $('#ul_error_1_nacionalidad').show(); statusFirstValidation = true; }
    if ($("#txt_1_edad").val() == "") { $('#ul_error_1_edad').show(); statusFirstValidation = true; }


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
        //if (txt_1_nombres_apellidos == "" ||
        //    txt_1_nro_documento == "" ||
        //    txt_1_fecha_inscripcion == "" ||
        //    txt_1_fecha_expedicion == "" ||
        //    txt_1_caducidad == "" ||
        //    txt_1_direccion == "" ||
        //    txt_1_lugar_nacimiento == "" ||
        //    txt_1_fecha_nacimiento == "" ||
        //    txt_1_nacionalidad == "" ||
        //    txt_1_edad == "" ||
        //    txt_1_estado_civil == "0" ||
        //    txt_1_grado_instruccion == "" ||
        //    txt_1_estatura == "" ||
        //    txt_1_nombre_madre == "" ||
        //    txt_1_nombre_padre == "") {                            // -- 1.1 DATOS PERSONALES DEL EVALUADO
        //    camposVacios += "<span>I. DATOS PERSONALES DEL EVALUADO</span>"
        //}
        // --
        if (txt_2_observaciones == "" ||
            txt_2_analisis == "") {
            camposVacios += "<span>II. ANÁLISIS DE ANTECEDENTES PERSONALES BASICO</span>"
        }
        // --
        if (txt_4_financiero_sentienel == "" ||
            txt_4_sunat == "" ||
            txt_4_personas_excluidas == "") {
            camposVacios += "<span>IV. ANÁLISIS DE ANTECEDENTES FINANCIEROS</span>"
        }
        // --
        if (txt_6_analisis_factor_oscuro == "") {
            camposVacios += "<span>VI. ANÁLISIS DEL TEST FACTOR OSCURO</span>"
        }
        // --
        if (txt_7_direccion == "" ||
            txt_7_fecha_entrevista == "" ||
            txt_7_hora_entrevista == "" ||
            txt_7_personas_entrevistadas == "" ||
            txt_7_analisis == "") {
            camposVacios += "<span>VII.ANÁLISIS DE VISITA DOMICILIARIA</span>"
        }
        // --
        if (txt_8_conclusion == "") {
            camposVacios += "<span>VIII. CONCLUSIÓN</span>"
        }

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
                        url: UrlSaveorUpdateIntegrity180lusPeru,
                        data: formData,
                        dataType: 'json',
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            // --
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
                        url: UrlSaveorUpdateIntegrity180lusPeru,
                        data: formData,
                        dataType: 'json',
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            // --
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

function saveFirstTime(data) {
     // --
    var formData = new FormData();

    // -- GET VALUES
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
    var wrapper = document.getElementById("container-graphic");
    var svg = wrapper.querySelector("svg");
    // --
    if (svg != null) {
        // --
        if (typeof window.XMLSerializer != "undefined") {
            var svgData = (new XMLSerializer()).serializeToString(svg);
        } else if (typeof svg.xml != "undefined") {
            var svgData = svg.xml;
        }

        // --
        var canvas = document.createElement("canvas");
        var svgSize = svg.getBoundingClientRect();
        canvas.width = svgSize.width;
        canvas.height = svgSize.height;
        var ctx = canvas.getContext("2d");
        // --
        var img = document.createElement("img");
        img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))));

        img.onload = function () {
            // --
            ctx.drawImage(img, 0, 0);
            // --
            var imgsrc = canvas.toDataURL("image/png");
            var file = dataURLtoFile(imgsrc, "FotoGrafico.png");
            formData.append("dataFile", file, "FotoGrafico.png");
        };
    }



    // --
    var radio_2_analisis = $('input:radio[name=radio_2_analisis]:checked').val()
    var txt_2_observaciones = $("#txt_2_observaciones").val()
    var txt_2_analisis = $("#txt_2_analisis").val()
    var radio_2_antecedentes = $('input:radio[name=radio_2_antecedentes]:checked').val()
    // --
    var txt_4_financiero_sentienel = $("#txt_4_financiero_sentienel").val()
    var txt_4_sunat = $("#txt_4_sunat").val()
    var txt_4_personas_excluidas = $("#txt_4_personas_excluidas").val()


    // --
    var txt_6_analisis_factor_oscuro = $("#txt_6_analisis_factor_oscuro").val()

    // --
    var txt_7_direccion = $("#txt_7_direccion").val()
    var txt_7_fecha_entrevista = formatSave($("#txt_7_fecha_entrevista").val())
    var txt_7_hora_entrevista = $("#txt_7_hora_entrevista").val()
    var txt_7_personas_entrevistadas = $("#txt_7_personas_entrevistadas").val()
    var txt_7_analisis = $("#txt_7_analisis").val()

    // --
    var txt_8_conclusion = $("#txt_8_conclusion").val()


    // -- ANEXOS
    if (listFilesAnexos != undefined && listFilesAnexos.length > 0) {
        // --
        listFilesAnexos.forEach((element) => {
            // --
            if (element !== undefined) {
                // --
                var ext = getFileExtension(element.name)
                // --
                if (ext == "pdf") {
                    // --
                    formData.append("dataFile", element, "Anexo_" + element.id + "." + ext);
                }
            }
        })
    }


    // --
    let objectData = {
        "oPersonalDataEvaluatedFlt": {
            "IdDatoPersonalEvaluado": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "NombresApellidos": data.NombreCompleto,
            "NroDocumento": data.NroDocumento,
            "FechaInscripcion": txt_1_fecha_inscripcion,
            "FechaExpedicion": txt_1_fecha_expedicion,
            "Caducidad": txt_1_caducidad,
            "Direccion": data.Direccion,
            "LugarNacimiento": data.LugarNacimiento,
            "FechaNacimiento": changeFormatInputDate(data.FechaNacimiento.substr(0, 10)),
            "Nacionalidad": txt_1_nacionalidad,
            "Edad": functions.calcularEdad(changeFormatInputDate(data.FechaNacimiento.substr(0, 10))), //validateNumber(txt_1_edad),
            "IdEstadoCivil": validateNumber(txt_1_estado_civil),
            "GradoInstruccion": txt_1_grado_instruccion,
            "Estatura": txt_1_estatura,
            "NombreMadre": txt_1_nombre_madre,
            "NombrePadre": txt_1_nombre_padre
        },
        "oPremiumPersonalHistoryFlt": {
            "IdAntecPersonalPremium": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Observaciones": txt_2_observaciones,
            "Analisis": txt_2_analisis,
            "Registra": radio_2_analisis
        },
        "oFinancialRecordsAnalysisFlt": {
            "IdAnalisisAntecFinanciero": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "NivelRiesgo": radio_2_antecedentes,

            "CompFinancieroSentienel":  txt_4_financiero_sentienel
        },
        "oAnalysisTestDarkFactorFlt": {
            "IdAnalisisTestFactorOscuro": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Analisis": txt_6_analisis_factor_oscuro
        },
        "oHouseCallsAnalysisFlt": {
            "IdAnalisisVisitaDomiciliaria": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Direccion": txt_7_direccion,
            "FechaEntrevista": txt_7_fecha_entrevista,
            "HoraEntrevista": txt_7_hora_entrevista,
            "PersonasEntrevistadas": txt_7_personas_entrevistadas,
            "Analisis": txt_7_analisis
        },
        "oConclusionFlt": {
            "IdConclusion": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Conclusion": txt_8_conclusion
        },
        "oAnexosFlt": {
            "IdAnexo": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "ListAnexosDetFlt": listAnexos
        },
        "oEndResultFlt": {
            "IdResultadoFinal": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Riesgo": radioNivel,
            "Calificacion": radioCalificacion,
            "EscalaSinceridad": validateNumber(txt_escala_sinceridad),
            "NivelRiesgo": validateNumber(txt_nivel_riesgo)
        },

    }


    // --
    if (listFilesAnexos != undefined && listFilesAnexos.length > 0) {
        // --
        listFilesAnexos.forEach((element) => {
            // --
            var ext = getFileExtension(element.name)
            formData.append("dataFile", element, "Anexo_" + element.id + "." + ext);
        })
    }


    // -- VALIDACION
    var camposVacios = ""
    // --
    if (txt_1_nombres_apellidos == "" ||
        txt_1_nro_documento == "" ||
        txt_1_fecha_inscripcion == "" ||
        txt_1_fecha_expedicion == "" ||
        txt_1_caducidad == "" ||
        txt_1_direccion == "" ||
        txt_1_lugar_nacimiento == "" ||
        txt_1_fecha_nacimiento == "" ||
        txt_1_nacionalidad == "" ||
        txt_1_edad == "" ||
        txt_1_estado_civil == "0" ||
        txt_1_grado_instruccion == "" ||
        txt_1_estatura == "" ||
        txt_1_nombre_madre == "" ||
        txt_1_nombre_padre == "") {                            // -- 1.1 DATOS PERSONALES DEL EVALUADO
        camposVacios += "<span>I. DATOS PERSONALES DEL EVALUADO</span>"
    }
    // --
    if (txt_2_observaciones == "" ||
        txt_2_analisis == "") {
        camposVacios += "<span>II. ANÁLISIS DE ANTECEDENTES PERSONALES BASICO</span>"
    }
    // --
    if (txt_4_financiero_sentienel == "" ||
        txt_4_sunat == "" ||
        txt_4_personas_excluidas == "") {
        camposVacios += "<span>IV. ANÁLISIS DE ANTECEDENTES FINANCIEROS</span>"
    }
    // --
    if (txt_6_analisis_factor_oscuro == "") {
        camposVacios += "<span>VI. ANÁLISIS DEL TEST FACTOR OSCURO</span>"
    }
    // --
    if (txt_7_direccion == "" ||
        txt_7_fecha_entrevista == "" ||
        txt_7_hora_entrevista == "" ||
        txt_7_personas_entrevistadas == "" ||
        txt_7_analisis == "") {
        camposVacios += "<span>VII.ANÁLISIS DE VISITA DOMICILIARIA</span>"
    }
    // --
    if (txt_8_conclusion == "") {
        camposVacios += "<span>VIII. CONCLUSIÓN</span>"
    }

    console.log(objectData)

    // --
    formData.append(
        "JsonMaster",
        JSON.stringify(objectData)
    );
    // --

    if (camposVacios != "") {
        // --
        return $.ajax({
            type: "POST",
            url: UrlSaveorUpdateIntegrity180lusPeru,
            data: formData,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                
                // --
                getList180PlusPeru();
            }
        });
      


    } else {
        return $.ajax({
            type: "POST",
            url: UrlSaveorUpdateIntegrity180lusPeru,
            data: formData,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                
                getList180PlusPeru();
            }
        });
        
    }
}

// --
function svg_to_png(container) {
    // --
    var wrapper = document.getElementById(container);
    var svg = wrapper.querySelector("svg");
    // --
    if (svg != null) {
        // --
        if (typeof window.XMLSerializer != "undefined") {
            var svgData = (new XMLSerializer()).serializeToString(svg);
        } else if (typeof svg.xml != "undefined") {
            var svgData = svg.xml;
        }
        // --
        var canvas = document.createElement("canvas");
        var svgSize = svg.getBoundingClientRect();
        canvas.width = svgSize.width;
        canvas.height = svgSize.height;
        var ctx = canvas.getContext("2d");
        // --
        var img = document.createElement("img");
        img.setAttribute("src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData))));

        img.onload = function () {
            ctx.drawImage(img, 0, 0);
            var imgsrc = canvas.toDataURL("image/png");
        };
    }

}

// --

function getList180PlusPeru() {
    // --
    let idIntegridad = getDatos("key")
    let Item = getDatos("item")
    // --
    let url = urlGetRiskAnalysisFormat180PlusPeru + "?IdIntegridad=" + idIntegridad + "&ItemIntegridadDet=" + Item
    var urlUsuario = urlWorkIntegrityDetail + "?IdIntegridad=" + idIntegridad; 

    // --
    $.ajax({
        type: "GET",
        url: url,
        dataType: 'json',
        success: function (data) {
            console.log(data)
            let obj = data.Data
            // --
            if (obj.oPersonalDataEvaluatedVm != null) {
                console.log("No deberia guardar")
                if (obj.oPersonalDataEvaluatedVm != null) {
                    // --
                    $("#txt_1_nombres_apellidos").val(obj.oPersonalDataEvaluatedVm.NombresApellidos)
                    $("#txt_1_nro_documento").val(obj.oPersonalDataEvaluatedVm.NroDocumento)
                    $("#txt_1_fecha_inscripcion").val(changeFormatInputDate(obj.oPersonalDataEvaluatedVm.FechaInscripcion))
                    $("#txt_1_fecha_expedicion").val(changeFormatInputDate(obj.oPersonalDataEvaluatedVm.FechaExpedicion))
                    $("#txt_1_caducidad").val(obj.oPersonalDataEvaluatedVm.Caducidad)
                    $("#txt_1_direccion").val(obj.oPersonalDataEvaluatedVm.Direccion)
                    $("#txt_1_lugar_nacimiento").val(obj.oPersonalDataEvaluatedVm.LugarNacimiento)
                    $("#txt_1_fecha_nacimiento").val(changeFormatInputDate(obj.oPersonalDataEvaluatedVm.FechaNacimiento))
                    $("#txt_1_nacionalidad").val(obj.oPersonalDataEvaluatedVm.Nacionalidad)
                    $("#txt_1_edad").val(obj.oPersonalDataEvaluatedVm.Edad)
                    $("#txt_1_estado_civil").val(obj.oPersonalDataEvaluatedVm.IdEstadoCivil)
                    $("#txt_1_grado_instruccion").val(obj.oPersonalDataEvaluatedVm.GradoInstruccion)
                    $("#txt_1_estatura").val(obj.oPersonalDataEvaluatedVm.Estatura)
                    $("#txt_1_nombre_madre").val(obj.oPersonalDataEvaluatedVm.NombreMadre)
                    $("#txt_1_nombre_padre").val(obj.oPersonalDataEvaluatedVm.NombrePadre)
                }

                // --
                if (obj.oPremiumPersonalHistoryVm != null) {
                    // --
                    let radio_2_analisis = obj.oPremiumPersonalHistoryVm.Registra
                    $("input:radio[name='radio_2_analisis'][value=" + radio_2_analisis + "]").prop('checked', true)
                    $("#txt_2_observaciones").val(obj.oPremiumPersonalHistoryVm.Observaciones)
                    $("#txt_2_analisis").val(obj.oPremiumPersonalHistoryVm.Analisis)
                }

                // --    
                if (obj.oFinancialRecordsAnalysisVm != null) {
                    // --
                    let radio_2_antecedentes = obj.oFinancialRecordsAnalysisVm.NivelRiesgo
                    $("input:radio[name='radio_2_antecedentes'][value=" + radio_2_antecedentes + "]").prop('checked', true)
                    $("#txt_4_financiero_sentienel").val(obj.oFinancialRecordsAnalysisVm.CompFinancieroSentienel)
                    $("#txt_4_sunat").val(obj.oFinancialRecordsAnalysisVm.Sunat)
                    $("#txt_4_personas_excluidas").val(obj.oFinancialRecordsAnalysisVm.VerifPersExcluidas)
                }

                // --
                if (obj.oAnalysisTestDarkFactorVm != null) {
                    // --
                    $("#txt_6_analisis_factor_oscuro").val(obj.oAnalysisTestDarkFactorVm.Analisis)
                }

                // --
                if (obj.oHouseCallsAnalysisVm != null) {
                    // --
                    $("#txt_7_direccion").val(obj.oHouseCallsAnalysisVm.Direccion)
                    $("#txt_7_fecha_entrevista").val(obj.oHouseCallsAnalysisVm.FechaEntrevista)
                    $("#txt_7_hora_entrevista").val(obj.oHouseCallsAnalysisVm.HoraEntrevista)
                    $("#txt_7_personas_entrevistadas").val(obj.oHouseCallsAnalysisVm.PersonasEntrevistadas)
                    $("#txt_7_analisis").val(obj.oHouseCallsAnalysisVm.Analisis)
                }


                // --
                if (obj.oConclusionVm != null) {
                    // --
                    $("#txt_8_conclusion").val(obj.oConclusionVm.Conclusion)
                }


                // --
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
                            ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_9_delete_row"> <i class="fa fa-trash"></i></button >'
                        ]).draw(false);
                        tableAnexos.columns.adjust()
                            .responsive.recalc();
                    })
                }

                // --
                if (obj.oEndResultVm != null) {
                    // --
                    $("#txt_escala_sinceridad").val(obj.oEndResultVm.EscalaSinceridad)
                    $("#txt_nivel_riesgo").val(obj.oEndResultVm.NivelRiesgo)
                    // --
                    let radio_nivel = obj.oEndResultVm.Riesgo
                    $("input:radio[name='radioNivel'][value=" + radio_nivel + "]").prop('checked', true)
                    // --
                    let radio_calificacion = obj.oEndResultVm.Calificacion
                    $("input:radio[name='radioCalificacion'][value=" + radio_calificacion + "]").prop('checked', true)
                    // --
                    calculateGraphic()
                }
            }else {
                console.log("Deberia guardar primera vez")
                $.ajax({
                    url: urlUsuario,
                    type: 'GET',
                    dataType: 'json',
                    success: function (d) {

                        if (d != null) {
                            let data = d.Data;
                            console.log(data);
                            let itemIntegridad = getDatos("item");
                            data = data[itemIntegridad - 1]
                            console.log("procediendo a guardar ");
                            saveFirstTime(data);


                        } else {
                            console.log("error no trae nada");
                        }
                    },
                    error: function () {
                        console.log("error con la consulta getdatoworkintegriy");
                    }
                })
            }
            

        }
    })
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


// --
$(".previewClass").click(async function () {
    // --
    let route = $(this).attr('data-route');
    // --
    if (route != undefined && route != null && route != "") {
        // --
        $("#imgPreview").attr('src', 'https://i.gifer.com/YCZH.gif');
        $("#modalIMG").modal("show");
        $("#modalIMG").addClass("in");
        // --
        let typeFile = $(this).attr('data-typefile');
        var RouteDecode = route;
        await getImgBase64(RouteDecode, typeFile);
    } else {
        // --
        console.log("no se encontro");
        Swal.fire(
            'Previsualizar imagen',
            "No se encontro ningun archivo",
            "warning"
        )
    }
});

// --
$("#btn_generar").on('click', function () {
    GenerateDocument();
});

//Regresar
$("#btn_regresar").on('click', function () {
    let idIntegridad = getDatos("key");

    window.location.href = "/Services/WorkIntegrityDetail?IdIntegridad=" + idIntegridad;


});


// --
function GenerateDocument() {
    // --
    let idIntegridad = getDatos("key");
    var itemIntegridad = getDatos("item");
    let url = urlGenerateDocument + "?IdIntegridad=" + idIntegridad + "&ItemIntegridadDet=" + itemIntegridad + "&idDocumentFile=12";
    // --
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

// --
function readCookie(name) {
    // --
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + name.replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
}

//// --
//function showVisitaDomiciliaria() {
//    // --
//    let idRol = readCookie("IdRol")
//    // --
//    if (idRol == "7" || idRol == 7) {
//        $("#formato_visita_domiciliaria").show()
//    } else {
//        // --
//        $("#formato_visita_domiciliaria").hide()
//    }

//}

// --
function showVisitaDomiciliaria() {
    // --
    let idRol = readCookie("IdRol")
    // --
    if (idRol == "7" || idRol == 7) {
        $("#formato_visita_domiciliaria").show()
        $("#formato").hide()
        $("#btn_generar").hide()
    } else {
        // --
        $("#formato_visita_domiciliaria").show()
        $("#formato").show()
        $("#btn_generar").show()
    }
}
//Cambiar Formato de fecha de dd/mm/yyyy a yyyy-mm-dd
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
async function getImgBase64(route, typeFile) {
    // --
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
function separateFinancieros(dato) {

    var x = dato.substring(0, 9)
    console.log("data Total");
    console.log(dato);
    var valormaximo = dato.split("");
    console.log(valormaximo);
    var respuesta = "";
    if (valormaximo[0] == "B") {
        $("input:radio[name='radio_2_antecedentes'][value='Bajo']").prop('checked', true)
        respuesta = dato.substring(7, valormaximo.length)
    }
    if (valormaximo[0] == "M") {
        $("input:radio[name='radio_2_antecedentes'][value='Medio']").prop('checked', true)
        respuesta = dato.substring(8, valormaximo.length)
    }
    if (valormaximo[0] == "A") {
        $("input:radio[name='radio_2_antecedentes'][value='Alto']").prop('checked', true)
        respuesta = dato.substring(7, valormaximo.length)
    }

    return respuesta
}
//// -- 
//setInputDatePicker("txt_1_fecha_inscripcion")
//setInputDatePicker("txt_1_fecha_expedicion")
//setInputDatePicker("txt_1_fecha_nacimiento")
//setInputDatePicker("txt_7_fecha_entrevista")

// --  1. DATOS PERSONALES DEL EVALUADO
$('#ul_error_1_fecha_inscripcion').hide()
$('#ul_error_1_fecha_expedicion').hide()
$('#ul_error_1_caducidad').hide()
$('#ul_error_1_nacionalidad').hide()
$('#ul_error_1_edad').hide()
$('#ul_error_1_estado_civil').hide()
$('#ul_error_1_grado_instruccion').hide()
$('#ul_error_1_estatura').hide()
$('#ul_error_1_nombre_madre').hide()
$('#ul_error_1_nombre_padre').hide()


// --
getListStatusCivil()
getListDocumentType();
showVisitaDomiciliaria()
getList180PlusPeru()