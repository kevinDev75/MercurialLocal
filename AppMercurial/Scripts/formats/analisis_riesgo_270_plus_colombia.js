// -- GLOBAL
const functions = new Functions()
// --
const byte = 1048576 // -- 1 MB	-> 1048576 B
const maxSize = 20  // -- 20 Megabytes
// --
var ListTestConfiabilidad = null
var ListNationalRestrictiveLists = null
var ListDefinitionMilitarySituation = null
var ListFinancialBehavior = null
var listFirma = null
var ListPhotografym = null

// --
getListStatusCivil();
getListDocumentType();

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

    } else {
        // -- alert("Ingrese digitos entre 1 y 50")
    }
    svg_to_png('container-graphic')
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



// --
function validateFileSize(file) {
    // --
    if ((file.size / byte) <= maxSize) {
        return true
    } else {
        return false
    }
}

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


function GenerateDocument() {
    // --
    let idIntegridad = getDatos("key");
    var itemIntegridad = getDatos("item");
    let url = urlGenerateDocument + "?IdIntegridad=" + idIntegridad + "&ItemIntegridadDet=" + itemIntegridad + "&idDocumentFile=3";
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

// --

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
    // --
    let txt_1_3_evaluacion_nacional_riesgo = $('#txt_1_3_evaluacion_nacional_riesgo').val()
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
            "IdLavadoActivos": 0,
            "ItemLavadoActivos": 0,
            "Ciudad": txt_1_3_ciudad,
            "Despacho": txt_1_3_despacho,
            "Proceso": txt_1_3_proceso,
            "Clase": txt_1_3_clase,
            "Demandantes": txt_1_3_demandantes,
            "Demandados": txt_1_3_demandados,
        }

        // -- Agregar objeto al listado
        listProcesoLavadoActivos.push(object)

        // -- Agregar datos a la tabla
        tableLavadoActivos.row.add([
            indexListProcesoLavadoActivos,
            txt_1_3_ciudad,
            txt_1_3_despacho,
            txt_1_3_proceso,
            txt_1_3_clase,
            txt_1_3_demandantes,
            txt_1_3_demandados,
            ' <button class= "btn btn-sm btn-danger" data-id="' + indexListProcesoLavadoActivos + '" id="btn_1_3_delete_row"> <i class="fa fa-trash"></i></button >'
        ]).draw(false);
        tableLavadoActivos.columns.adjust()
            .responsive.recalc();
        // --
        indexListProcesoLavadoActivos++
        clearFormularyProcesoLavadoActivos()
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




//// -- DEFINICION DE LA SITUACION MILITAR
//// -- IMG
//var file_1_6 = $('#file_1_6').prop("files")[0];
//if (file_1_6 !== undefined) {
//    // --
//    let ext_1_6 = getFileExtension(file_1_6.name)
//    // --
//    if (ext_1_6 == "img" || ext_1_6 == "png" || ext_1_6 == "jpg" || ext_1_6 == "jpeg") {
//        // --
//        formData.append("dataFile", file_2_1_pdf, "FactorOscuro." + ext2_1_factor_oscuro).append("imagen", file_1_6);
//    }
//}




//// -- COMPORTAMIENTO FINANCIERO
//// -- IMG
//var file_1_7 = $('#file_1_7').prop("files")[0];
//if (file_1_7 !== undefined) {
//    // --
//    let ext_1_7 = getFileExtension(file_1_7.name)
//    // --
//    if (ext_1_7 == "img" || ext_1_7 == "png" || ext_1_7 == "jpg" || ext_1_7 == "jpeg") {
//        // --
//        formData.append("dataFile", file_2_1_pdf, "FactorOscuro." + ext2_1_factor_oscuro).append("imagen", file_1_7);
//    }
//}




// -- 1.11 ANEXOS

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

    // -- 
    var file = $("#file_1_11").prop("files")[0]

    var ext = ""
    // --
    if (file !== undefined) {
        // --
        ext = getFileExtension(file.name)
        // --
        if (ext != "") {
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


    // -- 1.3 PROCESO LA/FT
    var txt_1_3_evaluacion_nacional_riesgo = $('#txt_1_3_evaluacion_nacional_riesgo').val()


    // -- 1.5 LISTAS RESTRICTIVAS NACIONALES
    var txt_antec_fiscal = $('#txt_antec_fiscal').val()
    var txt_antec_disciplinario = $('#txt_antec_disciplinario').val()
    var txt_simit = $('#txt_simit').val()
    var txt_runt = $('#txt_runt').val()
    var txt_consul_afiliados_bdua = $('#txt_consul_afiliados_bdua').val()
    var txt_perso_expuesta_politicamente = $('#txt_perso_expuesta_politicamente').val()
    var txt_policia_nacional = $('#txt_policia_nacional').val()

    var file_1_5_antec_fiscal = $('#file_1_5_antec_fiscal').prop("files")[0];
    var txt_antec_fiscal = $('#txt_antec_fiscal').val()
    var file_1_5_antec_disciplinario = $('#file_1_5_antec_disciplinario').prop("files")[0];
    var txt_antec_disciplinario = $('#txt_antec_disciplinario').val()
    var file_1_5_simit = $('#file_1_5_simit').prop("files")[0];
    var txt_simit = $('#txt_simit').val()
    var file_1_5_runt = $('#file_1_5_runt').prop("files")[0];
    var txt_runt = $('#txt_runt').val()
    var file_1_5_consul_afiliados_bdua = $('#file_1_5_consul_afiliados_bdua').prop("files")[0];
    var txt_consul_afiliados_bdua = $('#txt_consul_afiliados_bdua').val()
    var file_1_5_perso_expuesta_politicamente = $('#file_1_5_perso_expuesta_politicamente').prop("files")[0];
    var txt_perso_expuesta_politicamente = $('#txt_perso_expuesta_politicamente').val()
    var file_1_5_policia_nacional = $('#file_1_5_policia_nacional').prop("files")[0];
    var txt_policia_nacional = $('#txt_policia_nacional').val()
    var ext1_5_antec_fiscal = ""
    var ext1_5_antec_disciplinario = ""
    var ext1_5_simit = ""
    var ext1_5_runt = ""
    var ext1_5_consul_afiliados_bdua = ""
    var ext1_5_perso_expuesta_politicamente = ""
    var ext1_5_policia_nacional = ""
    // --
    if (file_1_5_antec_fiscal !== undefined) {
        // --
        if (validateFileSize(file_1_5_antec_fiscal)) {
            // --
            ext1_5_antec_fiscal = getFileExtension(file_1_5_antec_fiscal.name)
            // --
            if (ext1_5_antec_fiscal.toLowerCase() == "pdf") {
                // --
                formData.append("dataFile", file_1_5_antec_fiscal, "AntecFiscal." + ext1_5_antec_fiscal);
            }
        }

    }
    // --
    if (file_1_5_antec_disciplinario !== undefined) {
        // --
        if (validateFileSize(file_1_5_antec_disciplinario)) {
            // --
            ext1_5_antec_disciplinario = getFileExtension(file_1_5_antec_disciplinario.name)
            // --
            if (ext1_5_antec_disciplinario.toLowerCase() == "pdf") {
                // --
                formData.append("dataFile", file_1_5_antec_disciplinario, "AntecDisciplinario." + ext1_5_antec_disciplinario);
            }
        }
    }
    // --
    if (file_1_5_simit !== undefined) {
        // --
        if (validateFileSize(file_1_5_simit)) {
            // --
            ext1_5_simit = getFileExtension(file_1_5_simit.name)
            // --
            if (ext1_5_simit.toLowerCase() == "pdf") {
                // --
                formData.append("dataFile", file_1_5_simit, "Simit." + ext1_5_simit);
            }
        }
    }
    // --
    if (file_1_5_runt !== undefined) {
        // --
        if (validateFileSize(file_1_5_runt)) {
            // --
            ext1_5_runt = getFileExtension(file_1_5_runt.name)
            // --
            if (ext1_5_runt.toLowerCase() == "pdf") {
                // --
                formData.append("dataFile", file_1_5_runt, "Runt." + ext1_5_runt);
            }
        }
    }
    // --
    if (file_1_5_consul_afiliados_bdua !== undefined) {
        // --
        if (validateFileSize(file_1_5_consul_afiliados_bdua)) {
            // --
            ext1_5_consul_afiliados_bdua = getFileExtension(file_1_5_consul_afiliados_bdua.name)
            // --
            if (ext1_5_consul_afiliados_bdua.toLowerCase() == "pdf") {
                // --
                formData.append("dataFile", file_1_5_consul_afiliados_bdua, "BDUA." + ext1_5_consul_afiliados_bdua);
            }
        }
    }
    // --
    if (file_1_5_perso_expuesta_politicamente !== undefined) {
        // --
        if (validateFileSize(file_1_5_perso_expuesta_politicamente)) {
            // --
            ext1_5_perso_expuesta_politicamente = getFileExtension(file_1_5_perso_expuesta_politicamente.name)
            // --
            if (ext1_5_perso_expuesta_politicamente.toLowerCase() == "pdf") {
                // --
                formData.append("dataFile", file_1_5_perso_expuesta_politicamente, "PersExpPolit." + ext1_5_perso_expuesta_politicamente);
            }
        }
    }
    // --
    if (file_1_5_policia_nacional !== undefined) {
        // --
        if (validateFileSize(file_1_5_policia_nacional)) {
            // --
            ext1_5_policia_nacional = getFileExtension(file_1_5_policia_nacional.name)
            // --
            if (ext1_5_policia_nacional.toLowerCase() == "pdf") {
                // --
                formData.append("dataFile", file_1_5_policia_nacional, "PoliciaNacional." + ext1_5_policia_nacional);
            }
        }
    }

    // -- 1.6 DEFINICION DE LA SITUACION MILITAR
    var txt_definicion_situacion_militar = $('#txt_definicion_situacion_militar').val()
    var file_1_6 = $('#file_1_6').prop("files")[0];
    var ext1_6 = ""
    // --
    if (file_1_6 !== undefined) {
        // --
        if (validateFileSize(file_1_6)) {
            // --
            ext1_6 = getFileExtension(file_1_6.name)
            // --
            if (ext1_6.toLowerCase() == "pdf") {
                // --
                formData.append("dataFile", file_1_6, "DefSitMilitar." + ext1_6);
            }
        }
    }

    // -- 1.7 COMPORTAMIENTO FINANCIERO
    var txt_comportamiento_financiero = $('#txt_comportamiento_financiero').val()
    var file_1_7 = $('#file_1_7').prop("files")[0];
    var ext1_7 = ""
    // --
    if (file_1_7 !== undefined) {
        // --
        if (validateFileSize(file_1_7)) {
            // --
            ext1_7 = getFileExtension(file_1_7.name)
            // --
            if (ext1_7.toLowerCase() == "pdf") {
                // --
                formData.append("dataFile", file_1_7, "CompFinanciero." + ext1_7);
            }
        }
    }

    // -- 1.8 VERIFICACIONES LABORALES
    var txt_1_8_nombre_empresa = $('#txt_1_8_nombre_empresa').val()
    var txt_1_8_cargo_desempenado = $('#txt_1_8_cargo_desempenado').val()
    var txt_1_8_fecha_inicio = formatSave($('#txt_1_8_fecha_inicio').val())
    var txt_1_8_fecha_termino = formatSave($('#txt_1_8_fecha_termino').val())
    var txt_1_8_motivo_retiro = $('#txt_1_8_motivo_retiro').val()
    var txt_1_8_tiempo_experiencia = $('#txt_1_8_tiempo_experiencia').val()
    var txt_1_8_persona_brinda_infomacion = $('#txt_1_8_persona_brinda_infomacion').val()
    var txt_1_8_cargo = $('#txt_1_8_cargo').val()
    var txt_1_8_telefonos_correo = $('#txt_1_8_telefonos_correo').val()
    var txt_1_8_experiencia_cargo_postula = $('#txt_1_8_experiencia_cargo_postula').val()
    var txt_1_8_experiencia_especifica = $('#txt_1_8_experiencia_especifica').val()
    var sl_1_8_desempeno = $('#sl_1_8_desempeno').val()
    var sl_1_8_volveria_contratar = $('#sl_1_8_volveria_contratar').val()
    var txt_1_8_observaciones = $('#txt_1_8_observaciones').val()
    var txt_1_8_conclusion = $('#txt_1_8_conclusion').val()

    // -- 1.9 VERIFICACIONES ACADÉMICAS
    var txt_1_9_nombre_institucion = $('#txt_1_9_nombre_institucion').val()
    var txt_1_9_titulo_grado = $('#txt_1_9_titulo_grado').val()
    var txt_1_9_fecha_finalizacion = formatSave($('#txt_1_9_fecha_finalizacion').val())
    var txt_1_9_estudio_terminado_proceso = $('#txt_1_9_estudio_terminado_proceso').val()
    var sl_1_9_acta_folio_diploma = $('#sl_1_9_acta_folio_diploma').val()
    var txt_1_9_persona_brinda_infomacion = $('#txt_1_9_persona_brinda_infomacion').val()
    var txt_1_9_cargo = $('#txt_1_9_cargo').val()
    var txt_1_9_telefono = $('#txt_1_9_telefono').val()
    var txt_1_9_correo = $('#txt_1_9_correo').val()
    var txt_1_9_conclusion = $('#txt_1_9_conclusion').val()

    
    // -- ANEXOS
    if (listFilesAnexos != undefined && listFilesAnexos.length > 0) {
        // --
        listFilesAnexos.forEach((element) => {
            // --
            if (element !== undefined) {
                // --
                var ext = getFileExtension(element.name)
                // --
                if (ext == "pdf" || ext == "PDF") {
                    // --
                    formData.append("dataFile", element, "Anexo_" + element.id + "." + ext);
                }
            }
        })
    }


    // -- 2.1 FACTOR OSCURO
    var file_2_1_pdf = $('#file_2_0_test_confiabilidad').prop("files")[0];
    var ext2_1_test_confiabilidad = ""
    // --
    if (file_2_1_pdf !== undefined) {
        // --
        ext2_1_test_confiabilidad = getFileExtension(file_2_1_pdf.name)
        // --
        if (ext2_1_test_confiabilidad == "pdf") {
            // --
            formData.append("dataFile", file_2_1_pdf, "TestConfiabilidad." + ext2_1_test_confiabilidad)
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
    //var sl_3_8_distribucion = $('#sl_3_8_distribucion').val()
    // --
    var txt_3_8_numero_alcobas = validateNumber($("#txt_3_8_numero_alcobas").val())
    var txt_3_8_numero_banos = validateNumber($("#txt_3_8_numero_banos").val())
    var txt_3_8_numero_cocinas = validateNumber($("#txt_3_8_numero_cocinas").val())
    // --
    var sl_3_8_ambiente_sector = $('#sl_3_8_ambiente_sector').val()
    var sl_3_8_vias_acceso = $('#sl_3_8_vias_acceso').val()
    var sl_3_8_propiedad = $('#sl_3_8_propiedad').val()
    var txt_3_8_concepto = $('#txt_3_8_concepto').val()

    // -- 


    // -- 3.9 APRECIACIÓN DEL EVALUADOR

    // -- 
    var sl_3_9_resultado = $('#sl_3_9_resultado').val()
    var txt_3_9_realizado_por = $('#txt_3_9_realizado_por').val()
    //var txt_3_9_firma = $('#txt_3_9_firma').val()
    if ($('#file_3_9_firma').prop("files") != null) {
        var file_3_9_firma = $('#file_3_9_firma').prop("files")[0];
    }
    // --
    var ext_3_9_firma = ""
    // --
    if (file_3_9_firma !== undefined) {
        // --
        ext_3_9_firma = getFileExtension(file_3_9_firma.name)
        // --
        if (ext_3_9_firma == "img" || ext_3_9_firma == "png" || ext_3_9_firma == "jpg" || ext_3_9_firma == "jpeg") {
            // --
            formData.append("dataFile", file_3_9_firma, "Firma." + ext_3_9_firma);
        }
    }

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



    // -- NEW
    // --
    var txt_1_nombres_apellidos = $("#txt_1_nombres_apellidos").val()
    var txt_1_nro_documento = $("#txt_1_nro_documento").val()
    var txt_1_fecha_expedicion = formatSave($("#txt_1_fecha_expedicion").val())
    var txt_1_direccion = $("#txt_1_direccion").val()
    var txt_1_lugar_nacimiento = $("#txt_1_lugar_nacimiento").val()
    var txt_1_fecha_nacimiento = formatSave($("#txt_1_fecha_nacimiento").val())
    var txt_1_nacionalidad = $("#txt_1_nacionalidad").val()
    var txt_1_edad = $("#txt_1_edad").val()
    var txt_1_estado_civil = $("#txt_1_estado_civil").val()
    var txt_1_nivel_educativo = $("#txt_1_nivel_educativo").val()

    // --
    var radioNivel = $('input:radio[name=radioNivel]:checked').val()
    var radioCalificacion = $('input:radio[name=radioCalificacion]:checked').val()

    // --
    var txt_escala_sinceridad = $("#txt_escala_sinceridad").val()
    var txt_nivel_riesgo = $("#txt_nivel_riesgo").val()

    // --
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

    // --
    var sl_3_nivel_riesgo_financiero = $("#sl_3_nivel_riesgo_financiero").val()
    var txt_3_observaciones = $("#txt_3_observaciones").val()
    var txt_3_analisis = $("#txt_3_analisis").val()

    // --
    var txt_4_analisis = $("#txt_4_analisis").val()



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
            "NumProcesosContra": validateNumber(txt_1_2_procesos_contra),
            "NumProcesosInterpuestos": validateNumber(txt_1_2_procesos_interpuestos),
            "ListJudicialProceedingsDetailFlt": listProcesosJudiciales
        },
        // -- 
        "oMoneyLaunderingFlt":
        {
            "IdLavadoActivos": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "EvaluaNacionalRiesgo": validateNumber(txt_1_3_evaluacion_nacional_riesgo),
            "ListMoneyLaunderingDetailFlt": listProcesoLavadoActivos
        },
        "oNationalRestrictiveListsFlt":
        {
            "IdListaRestrictivaNacional": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "ArchivoAntecFiscal":
            {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "AntecFiscal." + ext1_5_antec_fiscal,
                "RutaArchivo": null,
                "ExtensionArchivo": ext1_5_antec_fiscal,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            },
            "AntecFiscal": txt_antec_fiscal,
            "ArchivoAntecDisciplinario":
            {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "AntecDisciplinario." + ext1_5_antec_disciplinario,
                "RutaArchivo": null,
                "ExtensionArchivo": ext1_5_antec_disciplinario,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            },
            "AntecDisciplinario": txt_antec_disciplinario,
            "ArchivoSIMIT":
            {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "Simit." + ext1_5_simit,
                "RutaArchivo": null,
                "ExtensionArchivo": ext1_5_simit,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            },
            "SIMIT": txt_simit,
            "ArchivoRUNT":
            {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "RUNT." + ext1_5_runt,
                "RutaArchivo": null,
                "ExtensionArchivo": ext1_5_runt,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            },
            "RUNT": txt_runt,
            "ArchivoConsulAfiliadosBDUA":
            {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "BDUA." + ext1_5_consul_afiliados_bdua,
                "RutaArchivo": null,
                "ExtensionArchivo": ext1_5_consul_afiliados_bdua,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            },
            "ConsulAfiliadosBDUA": txt_consul_afiliados_bdua,
            "ArchivoPersoExpuestaPoliticamente":
            {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "PersExpPolit." + ext1_5_perso_expuesta_politicamente,
                "RutaArchivo": null,
                "ExtensionArchivo": ext1_5_perso_expuesta_politicamente,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            },
            "PersoExpuestaPoliticamente": txt_perso_expuesta_politicamente,
            "ArchivoPoliciaNacional":
            {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "PoliciaNacional." + ext1_5_policia_nacional,
                "RutaArchivo": null,
                "ExtensionArchivo": ext1_5_policia_nacional,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            },
            "PoliciaNacional": txt_policia_nacional
        },
        "oDefinitionMilitarySituationFlt":
        {
            "IdDefSituacionMilitar": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "ArchivoDefSituacionMilitar":
            {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "DefSitMilitar." + ext1_6,
                "RutaArchivo": null,
                "ExtensionArchivo": ext1_6,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            },
            "DefSituacionMilitar": txt_definicion_situacion_militar
        },
        "oFinancialBehaviorFlt":
        {
            "IdComportamientoFinanciero": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "ArchivoCompFinanciero":
            {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "CompFinanciero." + ext1_7,
                "RutaArchivo": null,
                "ExtensionArchivo": ext1_7,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            },
            "ComportamientoFinanciero": txt_comportamiento_financiero
        },
        "oLaborVerificationFlt":
        {
            "IdVerifLaboral": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "NombreEmpresa": txt_1_8_nombre_empresa,
            "CargoDesempeñado": txt_1_8_cargo_desempenado,
            "FechaInicio": txt_1_8_fecha_inicio,
            "FechaTerminacion": txt_1_8_fecha_termino,
            "MotivoRetiro": txt_1_8_motivo_retiro,
            "TiempoExperiencia": txt_1_8_tiempo_experiencia,
            "NombrePersonBrindaInfo": txt_1_8_persona_brinda_infomacion,
            "Cargo": txt_1_8_cargo,
            "Telefonos_Correo": txt_1_8_telefonos_correo,
            "ExpTotalCargoPostula": txt_1_8_experiencia_cargo_postula,
            "ExpEspecifica": txt_1_8_experiencia_especifica,
            "DescripcionDesempeño": sl_1_8_desempeno,
            "PreguntaVolveriaAContratar": sl_1_8_volveria_contratar,
            "Observaciones": txt_1_8_observaciones,
            "Conclusion": txt_1_8_conclusion
        },
        "oAcademicVerification_ColFlt":
        {
            "IdVerifAcademicasCol": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "NombreInstitucion": txt_1_9_nombre_institucion,
            "GradoObtenido": txt_1_9_titulo_grado,
            "FecFinalizacion": txt_1_9_fecha_finalizacion,
            "EstudioTerminadoOProceso": txt_1_9_estudio_terminado_proceso,
            "Diploma": sl_1_9_acta_folio_diploma,
            "NombrePersonBrindaInfo": txt_1_9_persona_brinda_infomacion,
            "Cargo": txt_1_9_cargo,
            "Telefono": txt_1_9_telefono,
            "Correo": txt_1_9_correo,
            "Conclusion": txt_1_9_conclusion
        },
        "oAnexosFlt":
        {
            "IdAnexo": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "ListAnexosDetFlt": listAnexos
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
            //"Distribucion": sl_3_8_distribucion,
            // --
            "NroAlcobas": txt_3_8_numero_alcobas,
            "NroBanos": txt_3_8_numero_banos,
            "NroCocinas": txt_3_8_numero_cocinas,
            // --
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
            "Firma": {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "Firma." + ext_3_9_firma,
                "RutaArchivo": null,
                "ExtensionArchivo": ext_3_9_firma,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            }
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
        // --
        "oReliabilityTestFlt": {
            "IdTestConfiabilidad": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "ArchivoAdjunto": {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "TestConfiabilidad." + ext2_1_test_confiabilidad,
                "RutaArchivo": null,
                "ExtensionArchivo": ext2_1_test_confiabilidad,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            }
        },
        // -- New
        "oPersonalDataEvaluatedFlt": {
            "IdDatoPersonalEvaluado": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "NombresApellidos": txt_1_nombres_apellidos,
            "NroDocumento": txt_1_nro_documento,
            "FechaInscripcion": null,
            "FechaExpedicion": txt_1_fecha_expedicion,
            "Caducidad": "",
            "Direccion": txt_1_direccion,
            "LugarNacimiento": txt_1_lugar_nacimiento,
            "FechaNacimiento": txt_1_fecha_nacimiento,
            "Nacionalidad": txt_1_nacionalidad,
            "Edad": validateNumber(txt_1_edad),
            "IdEstadoCivil": txt_1_estado_civil,
            "GradoInstruccion": txt_1_nivel_educativo,
            "Estatura": "",
            "NombreMadre": "",
            "NombrePadre": ""
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
        "oPremiumPersonalHistoryFlt": {
            "IdAntecPersonalPremium": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Observaciones": txt_2_observaciones,
            "Analisis": txt_2_analisis,
            "Registra": radio_2_analisis
        },
        "oFinancialRecordsAnalysis_ColFlt": {
            "IdAnalisisAntecFinanciero": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "NivelRiesgoFinanciero": sl_3_nivel_riesgo_financiero,
            "Observaciones": txt_3_observaciones,
            "Analisis": txt_3_analisis
        },
        "oAnalysisReliabilityTestFlt": {
            "IdTestConfiabilidad": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Analisis": txt_4_analisis
        }
    }

    // --
    listHermanos.forEach((element) => {
        objectData.oFamilyEnvironmentFlt.ListFamilyEnvironmentDetailFlt.push(element)
    })
    listHijos.forEach((element) => {
        objectData.oFamilyEnvironmentFlt.ListFamilyEnvironmentDetailFlt.push(element)
    })

    if (ListNationalRestrictiveLists != null) {
        if (ListNationalRestrictiveLists.ArchivoAntecFiscal != null) {
            objectData.oNationalRestrictiveListsFlt.ArchivoAntecFiscal = ListNationalRestrictiveLists.ArchivoAntecFiscal
        }
        if (ListNationalRestrictiveLists.ArchivoAntecDisciplinario != null) {
            objectData.oNationalRestrictiveListsFlt.ArchivoAntecDisciplinario = ListNationalRestrictiveLists.ArchivoAntecDisciplinario
        }
        if (ListNationalRestrictiveLists.ArchivoSIMIT != null) {
            objectData.oNationalRestrictiveListsFlt.ArchivoSIMIT = ListNationalRestrictiveLists.ArchivoSIMIT
        }
        if (ListNationalRestrictiveLists.ArchivoRUNT != null) {
            objectData.oNationalRestrictiveListsFlt.ArchivoRUNT = ListNationalRestrictiveLists.ArchivoRUNT
        }
        if (ListNationalRestrictiveLists.ArchivoConsulAfiliadosBDUA != null) {
            objectData.oNationalRestrictiveListsFlt.ArchivoConsulAfiliadosBDUA = ListNationalRestrictiveLists.ArchivoConsulAfiliadosBDUA
        }
        if (ListNationalRestrictiveLists.ArchivoPersoExpuestaPoliticamente != null) {
            objectData.oNationalRestrictiveListsFlt.ArchivoPersoExpuestaPoliticamente = ListNationalRestrictiveLists.ArchivoPersoExpuestaPoliticamente
        }
        if (ListNationalRestrictiveLists.ArchivoPoliciaNacional != null) {
            objectData.oNationalRestrictiveListsFlt.ArchivoPoliciaNacional = ListNationalRestrictiveLists.ArchivoPoliciaNacional
        }
    }

    if (ListDefinitionMilitarySituation != null) {
        if (ListDefinitionMilitarySituation.ArchivoDefSituacionMilitar != null) {
            objectData.oDefinitionMilitarySituationFlt.ArchivoDefSituacionMilitar = ListDefinitionMilitarySituation.ArchivoDefSituacionMilitar
        }
    }

    if (ListFinancialBehavior != null) {
        if (ListFinancialBehavior.ArchivoCompFinanciero != null) {
            objectData.oFinancialBehaviorFlt.ArchivoCompFinanciero = ListFinancialBehavior.ArchivoCompFinanciero
        }
    }

    if (ListTestConfiabilidad != null) {
        if (ListTestConfiabilidad.ArchivoAdjunto != null) {
            objectData.oReliabilityTestFlt.ArchivoAdjunto = ListTestConfiabilidad.ArchivoAdjunto
        }
    }

    // --
    if (listFirma != null) {
        if (listFirma.Firma != null) {
            objectData.oAssessmentEvaluatorFlt.Firma = listFirma.Firma
        }
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

    // --
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

    console.log(objectData)

    // -- I. INFORME ANTECEDENTES JUDICIALES
    var camposVacios = ""
    // --
    if (txt_1_1_nombre == "") {                            // -- 1.1 DATOS BASICOS DEL CANDIDATO
        camposVacios += "<span>1.1 DATOS BASICOS DEL CANDIDATO</span>"
    }
    if (listProcesosJudiciales.length < 1) {                // -- 1.2 PROCESOS JUDICIALES
        camposVacios += "<br><span>1.2 PROCESOS JUDICIALES</span> "
    }
    if (listProcesoLavadoActivos.length < 1) {                   // -- 1.3 PROCESOS LAVADO DE ACTIVOS
        camposVacios += "<br><span>1.3 PROCESOS LAVADO DE ACTIVOS</span>"
    }
    if (txt_1_8_nombre_empresa == "" ||
        txt_1_8_cargo_desempenado == "" ||
        txt_1_8_fecha_inicio == "" ||
        txt_1_8_fecha_termino == "" ||
        txt_1_8_motivo_retiro == "" ||
        txt_1_8_tiempo_experiencia == "" ||
        txt_1_8_persona_brinda_infomacion == "" ||
        txt_1_8_cargo == "" ||
        txt_1_8_telefonos_correo == "" ||
        txt_1_8_experiencia_cargo_postula == "" ||
        txt_1_8_experiencia_especifica == "" ||
        txt_1_8_observaciones == "" ||
        txt_1_8_conclusion == "" ||
        sl_1_8_desempeno == "" ||
        sl_1_8_volveria_contratar == "") {                // -- 1.8 VERIFICACIONES LABORALES
        camposVacios += "<br><span>1.8 VERIFICACIONES LABORALES</span>"
    }
    if (txt_1_9_nombre_institucion == "" ||
        txt_1_9_titulo_grado == "" ||
        txt_1_9_fecha_finalizacion == "" ||
        txt_1_9_estudio_terminado_proceso == "" ||
        sl_1_9_acta_folio_diploma == "" ||
        txt_1_9_persona_brinda_infomacion == "" ||
        txt_1_9_cargo == "" ||
        txt_1_9_telefono == "" ||
        txt_1_9_correo == "" ||
        txt_1_9_conclusion == "") {            // --  1.9 VERIFICACIONES ACADÉMICAS
        camposVacios += "<br><span>1.9 VERIFICACIONES ACADÉMICAS</span>"
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
    console.log(ListNationalRestrictiveLists)
    console.log(objectData)

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
                    url: urlSaveorUpdateIntegrity270PlusColombia,
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
                    url: urlSaveorUpdateIntegrity270PlusColombia,
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
function getList270PlusColombia() {
    let idIntegridad = getDatos("key")
    let Item = getDatos("item")
    // --
    let url = urlGetRiskAnalysisFormat270PlusColombia + "?IdIntegridad=" + idIntegridad + "&ItemIntegridadDet=" + Item
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


                // -- 1.5 LISTAS RESTRICTIVAS NACIONALES
                if (obj.oNationalRestrictiveListsVm != null) {
                    ListNationalRestrictiveLists = obj.oNationalRestrictiveListsVm
                    // --
                    $('#txt_antec_fiscal').val(obj.oNationalRestrictiveListsVm.AntecFiscal)
                    if (obj.oNationalRestrictiveListsVm.ArchivoAntecFiscal != null) {
                        //$("#PreviewAntecFiscal button").attr("data-typefile", obj.oSheetReniecVm.ArchivoAntecFiscal.ExtensionArchivo)
                        //$("#PreviewAntecFiscal button").attr("data-route", btoa(obj.oSheetReniecVm.ArchivoAntecFiscal.RutaArchivo))
                        $("#PreviewAntecFiscal span").text(obj.oNationalRestrictiveListsVm.ArchivoAntecFiscal.NombreArchivo)
                    }

                    $('#txt_antec_disciplinario').val(obj.oNationalRestrictiveListsVm.AntecDisciplinario)
                    if (obj.oNationalRestrictiveListsVm.ArchivoAntecDisciplinario != null) {
                        //$("#PreviewAntecDisciplinario button").attr("data-typefile", obj.oNationalRestrictiveListsVm.ArchivoAntecDisciplinario.ExtensionArchivo)
                        //$("#PreviewAntecDisciplinario button").attr("data-route", btoa(obj.oNationalRestrictiveListsVm.ArchivoAntecDisciplinario.RutaArchivo))
                        $("#PreviewAntecDisciplinario span").text(obj.oNationalRestrictiveListsVm.ArchivoAntecDisciplinario.NombreArchivo)
                    }

                    $('#txt_simit').val(obj.oNationalRestrictiveListsVm.AntecDisciplinario)
                    if (obj.oNationalRestrictiveListsVm.ArchivoSIMIT != null) {
                        //$("#PreviewSimit button").attr("data-typefile", obj.oNationalRestrictiveListsVm.ArchivoSIMIT.ExtensionArchivo)
                        //$("#PreviewSimit button").attr("data-route", btoa(obj.oNationalRestrictiveListsVm.ArchivoSIMIT.RutaArchivo))
                        $("#PreviewSimit span").text(obj.oNationalRestrictiveListsVm.ArchivoSIMIT.NombreArchivo)
                    }

                    $('#txt_runt').val(obj.oNationalRestrictiveListsVm.AntecDisciplinario)
                    if (obj.oNationalRestrictiveListsVm.ArchivoRUNT != null) {
                        //$("#PreviewRunt button").attr("data-typefile", obj.oNationalRestrictiveListsVm.ArchivoRUNT.ExtensionArchivo)
                        //$("#PreviewRunt button").attr("data-route", btoa(obj.oNationalRestrictiveListsVm.ArchivoRUNT.RutaArchivo))
                        $("#PreviewRunt span").text(obj.oNationalRestrictiveListsVm.ArchivoRUNT.NombreArchivo)
                    }

                    $('#txt_consul_afiliados_bdua').val(obj.oNationalRestrictiveListsVm.ConsulAfiliadosBDUA)
                    if (obj.oNationalRestrictiveListsVm.ArchivoConsulAfiliadosBDUA != null) {
                        //$("#PreviewConsultAfiliadosBdua button").attr("data-typefile", obj.oNationalRestrictiveListsVm.ArchivoConsulAfiliadosBDUA.ExtensionArchivo)
                        //$("#PreviewConsultAfiliadosBdua button").attr("data-route", btoa(obj.oNationalRestrictiveListsVm.ArchivoConsulAfiliadosBDUA.RutaArchivo))
                        $("#PreviewConsultAfiliadosBdua span").text(obj.oNationalRestrictiveListsVm.ArchivoConsulAfiliadosBDUA.NombreArchivo)
                    }

                    $('#txt_perso_expuesta_politicamente').val(obj.oNationalRestrictiveListsVm.PersoExpuestaPoliticamente)
                    if (obj.oNationalRestrictiveListsVm.ArchivoPersoExpuestaPoliticamente != null) {
                        //$("#PreviewPersoExpuestaPoliticamente button").attr("data-typefile", obj.oNationalRestrictiveListsVm.ArchivoPersoExpuestaPoliticamente.ExtensionArchivo)
                        //$("#PreviewPersoExpuestaPoliticamente button").attr("data-route", btoa(obj.oNationalRestrictiveListsVm.ArchivoPersoExpuestaPoliticamente.RutaArchivo))
                        $("#PreviewPersoExpuestaPoliticamente span").text(obj.oNationalRestrictiveListsVm.ArchivoPersoExpuestaPoliticamente.NombreArchivo)
                    }

                    $('#txt_policia_nacional').val(obj.oNationalRestrictiveListsVm.PoliciaNacional)
                    if (obj.oNationalRestrictiveListsVm.ArchivoPoliciaNacional != null) {
                        //$("#PreviewPoliciaNacional button").attr("data-typefile", obj.oNationalRestrictiveListsVm.ArchivoPoliciaNacional.ExtensionArchivo)
                        //$("#PreviewPoliciaNacional button").attr("data-route", btoa(obj.oNationalRestrictiveListsVm.ArchivoPoliciaNacional.RutaArchivo))
                        $("#PreviewPoliciaNacional span").text(obj.oNationalRestrictiveListsVm.ArchivoPoliciaNacional.NombreArchivo)
                    }
                }


                // -- 1.6 DEFINICION DE LA SITUACION MILITAR
                if (obj.oDefinitionMilitarySituationVm != null) {
                    ListDefinitionMilitarySituation = obj.oDefinitionMilitarySituationVm
                    $('#txt_definicion_situacion_militar').val(obj.oDefinitionMilitarySituationVm.DefSituacionMilitar)
                    if (obj.oDefinitionMilitarySituationVm.ArchivoDefSituacionMilitar != null) {
                        //$("#PreviewDefSitMilitar button").attr("data-typefile", obj.oDefinitionMilitarySituationVm.ArchivoAdjunto.ExtensionArchivo)
                        //$("#PreviewDefSitMilitar button").attr("data-route", btoa(obj.oDefinitionMilitarySituationVm.ArchivoAdjunto.RutaArchivo))
                        $("#PreviewDefSitMilitar span").text(obj.oDefinitionMilitarySituationVm.ArchivoDefSituacionMilitar.NombreArchivo)
                    }
                }


                // -- 1.7 COMPORTAMIENTO FINANCIERO
                if (obj.oFinancialBehaviorVm != null) {
                    ListFinancialBehavior = obj.oFinancialBehaviorVm
                    $('#txt_comportamiento_financiero').val(obj.oFinancialBehaviorVm.ComportamientoFinanciero)
                    if (obj.oFinancialBehaviorVm.ArchivoCompFinanciero != null) {
                        //$("#PreviewCompFinanciero button").attr("data-typefile", obj.oFinancialBehaviorVm.ArchivoCompFinanciero.ExtensionArchivo)
                        //$("#PreviewCompFinanciero button").attr("data-route", btoa(obj.oFinancialBehaviorVm.ArchivoCompFinanciero.RutaArchivo))
                        $("#PreviewCompFinanciero span").text(obj.oFinancialBehaviorVm.ArchivoCompFinanciero.NombreArchivo)
                    }
                }


                // -- 1.8 VERIFICACIONES LABORALES
                if (obj.oLaborVerificationVm != null) {
                    // --
                    $('#txt_1_8_nombre_empresa').val(obj.oLaborVerificationVm.NombreEmpresa)
                    $('#txt_1_8_cargo_desempenado').val(obj.oLaborVerificationVm.CargoDesempeñado)
                    $('#txt_1_8_fecha_inicio').val(obj.oLaborVerificationVm.FechaInicio)
                    $('#txt_1_8_fecha_termino').val(obj.oLaborVerificationVm.FechaTerminacion)
                    $('#txt_1_8_motivo_retiro').val(obj.oLaborVerificationVm.MotivoRetiro)
                    $('#txt_1_8_tiempo_experiencia').val(obj.oLaborVerificationVm.TiempoExperiencia)
                    $('#txt_1_8_persona_brinda_infomacion').val(obj.oLaborVerificationVm.NombrePersonBrindaInfo)
                    $('#txt_1_8_cargo').val(obj.oLaborVerificationVm.Cargo)
                    $('#txt_1_8_telefonos_correo').val(obj.oLaborVerificationVm.Telefonos_Correo)
                    $('#txt_1_8_experiencia_cargo_postula').val(obj.oLaborVerificationVm.ExpTotalCargoPostula)
                    $('#txt_1_8_experiencia_especifica').val(obj.oLaborVerificationVm.ExpEspecifica)
                    $('#sl_1_8_desempeno').val(obj.oLaborVerificationVm.DescripcionDesempeño)
                    $('#sl_1_8_volveria_contratar').val(obj.oLaborVerificationVm.PreguntaVolveriaAContratar)
                    $('#txt_1_8_observaciones').val(obj.oLaborVerificationVm.Observaciones)
                    $('#txt_1_8_conclusion').val(obj.oLaborVerificationVm.Conclusion)
                }


                // -- 1.9 VERIFICACIONES ACADÉMICAS
                if (obj.oAcademicVerification_ColVm != null) {
                    // --
                    $('#txt_1_9_nombre_institucion').val(obj.oAcademicVerification_ColVm.NombreInstitucion)
                    $('#txt_1_9_titulo_grado').val(obj.oAcademicVerification_ColVm.GradoObtenido)
                    $('#txt_1_9_fecha_finalizacion').val(formatDate(obj.oAcademicVerification_ColVm.FecFinalizacion))
                    $('#txt_1_9_estudio_terminado_proceso').val(obj.oAcademicVerification_ColVm.EstudioTerminadoOProceso)
                    $('#sl_1_9_acta_folio_diploma').val(obj.oAcademicVerification_ColVm.Diploma)
                    $('#txt_1_9_persona_brinda_infomacion').val(obj.oAcademicVerification_ColVm.NombrePersonBrindaInfo)
                    $('#txt_1_9_cargo').val(obj.oAcademicVerification_ColVm.Cargo)
                    $('#txt_1_9_telefono').val(obj.oAcademicVerification_ColVm.Telefono)
                    $('#txt_1_9_correo').val(obj.oAcademicVerification_ColVm.Correo)
                    $('#txt_1_9_conclusion').val(obj.oAcademicVerification_ColVm.Conclusion)
                }


                // -- 1.11 ANEXOS
                if (obj.oAnexosVm != null) {
                    // --
                    let lista = obj.oAnexosVm.ListAnexosDetailVm
                    console.log('ListViewAnexos', lista)
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
                if (obj.oReliabilityTestVm != null) {
                    // --
                    if (obj.oReliabilityTestVm.ArchivoAdjunto != null) {
                        // --
                        ListTestConfiabilidad = obj.oReliabilityTestVm

                        //$("#PreviewTestConfiabilidad button").attr("data-typefile", obj.oReliabilityTestVm.ArchivoAdjunto.ExtensionArchivo)
                        //$("#PreviewTestConfiabilidad button").attr("data-route", btoa(obj.oReliabilityTestVm.ArchivoAdjunto.RutaArchivo))
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
                        if (obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[0] != undefined && obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[0] != null) {
                            $('#txt_3_3_padre_nombres').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[0].Nombres)
                            $('#txt_3_3_padre_edad').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[0].Edad)
                            $('#txt_3_3_padre_nivel_educativo').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[0].NivelEducativo)
                            $('#txt_3_3_padre_ocupacion').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[0].Ocupacion)
                            $('#txt_3_3_padre_empresa_institucion').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[0].EmpresaInstitucion)
                            $('#txt_3_3_padre_convive_usted').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[0].ConviveConUsted)
                        }
                        
                        // --
                        if (obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[1] != undefined && obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[1] != null) {
                            $('#txt_3_3_madre_nombres').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[1].Nombres)
                            $('#txt_3_3_madre_edad').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[1].Edad)
                            $('#txt_3_3_madre_nivel_educativo').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[1].NivelEducativo)
                            $('#txt_3_3_madre_ocupacion').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[1].Ocupacion)
                            $('#txt_3_3_madre_empresa_institucion').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[1].EmpresaInstitucion)
                            $('#txt_3_3_madre_convive_usted').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[1].ConviveConUsted)
                        }
                        // --
                        if (obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[2] != undefined && obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[2] != null) {
                            $('#txt_3_3_conyugue_nombres').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[2].Nombres)
                            $('#txt_3_3_conyugue_edad').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[2].Edad)
                            $('#txt_3_3_conyugue_nivel_educativo').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[2].NivelEducativo)
                            $('#txt_3_3_conyugue_ocupacion').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[2].Ocupacion)
                            $('#txt_3_3_conyugue_empresa_institucion').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[2].EmpresaInstitucion)
                            $('#txt_3_3_conyugue_convive_usted').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[2].ConviveConUsted)
                        }
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
                    //$('#sl_3_8_distribucion').val(obj.oBasicHousingFeaturesVm.Distribucion)
                    // --
                    $("#txt_3_8_numero_alcobas").val(obj.oBasicHousingFeaturesVm.NroAlcobas)
                    $("#txt_3_8_numero_banos").val(obj.oBasicHousingFeaturesVm.NroBanos)
                    $("#txt_3_8_numero_cocinas").val(obj.oBasicHousingFeaturesVm.NroCocinas)
                    // --
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
                    $('#txt_3_9_realizado_por').val(obj.oAssessmentEvaluatorVm.RealizadoPor)
                    $('#sl_3_9_resultado').val(obj.oAssessmentEvaluatorVm.Resultado)
                    if (obj.oAssessmentEvaluatorVm.Firma != null) {
                        // --
                        listFirma = obj.oAssessmentEvaluatorVm
                        $("#PreviewFirma button").attr("data-typefile", obj.oAssessmentEvaluatorVm.Firma.ExtensionArchivo)
                        $("#PreviewFirma button").attr("data-route", btoa(obj.oAssessmentEvaluatorVm.Firma.RutaArchivo))
                        $("#PreviewFirma span").text(obj.oAssessmentEvaluatorVm.Firma.NombreArchivo)
                    }
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

                // -- NEW
                // --
                if (obj.oPersonalDataEvaluatedVm != null) {
                    // --
                    $("#txt_1_nombres_apellidos").val(obj.oPersonalDataEvaluatedVm.NombresApellidos)
                    $("#txt_1_nro_documento").val(obj.oPersonalDataEvaluatedVm.NroDocumento)
                    $("#txt_1_fecha_expedicion").val(obj.oPersonalDataEvaluatedVm.FechaExpedicion)
                    $("#txt_1_direccion").val(obj.oPersonalDataEvaluatedVm.Direccion)
                    $("#txt_1_lugar_nacimiento").val(obj.oPersonalDataEvaluatedVm.LugarNacimiento)
                    $("#txt_1_fecha_nacimiento").val(obj.oPersonalDataEvaluatedVm.FechaNacimiento)
                    $("#txt_1_nacionalidad").val(obj.oPersonalDataEvaluatedVm.Nacionalidad)
                    $("#txt_1_edad").val(obj.oPersonalDataEvaluatedVm.Edad)
                    $("#txt_1_estado_civil").val(obj.oPersonalDataEvaluatedVm.IdEstadoCivil)
                    $("#txt_1_nivel_educativo").val(obj.oPersonalDataEvaluatedVm.GradoInstruccion)
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


                // --
                if (obj.oPremiumPersonalHistoryVm != null) {
                    // --
                    let radio_2_analisis = obj.oPremiumPersonalHistoryVm.Registra
                    $("input:radio[name='radio_2_analisis'][value=" + radio_2_analisis + "]").prop('checked', true)
                    $("#txt_2_observaciones").val(obj.oPremiumPersonalHistoryVm.Observaciones)
                    $("#txt_2_analisis").val(obj.oPremiumPersonalHistoryVm.Analisis)
                }

                // --
                if (obj.oFinancialRecordsAnalysis_ColVm != null) {
                    // --
                    $("#sl_3_nivel_riesgo_financiero").val(obj.oFinancialRecordsAnalysis_ColVm.NivelRiesgoFinanciero)
                    $("#txt_3_observaciones").val(obj.oFinancialRecordsAnalysis_ColVm.Observaciones)
                    $("#txt_3_analisis").val(obj.oFinancialRecordsAnalysis_ColVm.Analisis)
                }

                // --
                if (obj.oAnalysisReliabilityTestVm != null) {
                    // --
                    $("#txt_4_analisis").val(obj.oAnalysisReliabilityTestVm.Analisis)
                }
            }

        }
    });
    // --- }

}

// --
function showVisitaDomiciliaria() {
    // --
    let idRol = readCookie("IdRol")
    // --
    if (idRol == "7" || idRol == 7) {
        $("#formato_visita_domiciliaria").show()
        $("#formato").hide()
        $("#nuevo_formato").hide()
        $("#btn_3_10_Generar").hide()
    } else {
        // --
        $("#formato_visita_domiciliaria").show()
        $("#formato").show()
        $("#nuevo_formato").show()
        $("#btn_3_10_Generar").show()
    }
}


// -- DATEPICKER
setInputDatePicker("txt_1_1_fecha_nacimiento")
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
setInputDatePicker("txt_1_fecha_expedicion")
setInputDatePicker("txt_1_fecha_nacimiento")

// --

getList270PlusColombia();
showVisitaDomiciliaria();