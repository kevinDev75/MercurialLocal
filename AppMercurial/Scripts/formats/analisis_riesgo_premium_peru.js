// -- VARIABLES
var indexListAnexos = 0
var listAnexos = new Array()
var listFilesAnexos = new Array()

// -- TABLES
var tableAnexos = $('#tbl_8_list').DataTable({
    responsive: true,
    language: {
        "url": "../Files/lenguaje-spanish.json"
    }
})

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
$("#btn_8_agregar").on('click', function () {
    // -- 
    var file = $("#file_8").prop("files")[0]
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
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListAnexos + '" id="btn_8_delete_row"> <i class="fa fa-trash"></i></button >'
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
$(document).on('click', '#btn_8_delete_row', function () {
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


// -- GET VALUES
let idIntegridad = getDatos("key");
let itemIntegridad = getDatos("item");

// --
var txt_1_nombres_apellidos = $("#txt_1_nombres_apellidos").val()
var txt_1_nro_documento = $("#txt_1_nro_documento").val()
var txt_1_fecha_inscripcion = formatSave($("#txt_1_fecha_inscripcion").val())
var txt_1_fecha_expedicion = formatSave($("#txt_1_fecha_expedicion").val())
var txt_1_caducidad = $("#txt_1_caducidad").val()
var txt_1_direccion = $("#txt_1_direccion").val()
var txt_1_lugar_nacimiento = $("#txt_1_lugar_nacimiento").val()
var txt_1_fecha_nacimiento = formatSave($("#txt_1_fecha_nacimiento").val())
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

// --
var txt_3_sunedu = $("#txt_3_sunedu").val()
var txt_3_referencias_laborales = $("#txt_3_referencias_laborales").val()
var txt_3_essalud = $("#txt_3_essalud").val()

// --
var txt_4_financiero_sentienel = $("#txt_4_financiero_sentienel").val()
var txt_4_sunat = $("#txt_4_sunat").val()
var txt_4_personas_excluidas = $("#txt_4_personas_excluidas").val()

// --
var txt_5_verificacion_cargos_publicos = $("#txt_5_verificacion_cargos_publicos").val()
var txt_5_verificacion_filiacion_politica = $("#txt_5_verificacion_filiacion_politica").val()
var txt_5_multas_electorales = $("#txt_5_multas_electorales").val()

// --
var txt_6_analisis_otros = $("#txt_6_analisis_otros").val()

// --
var txt_7_conclusion = $("#txt_7_conclusion").val()