// -- GLOBAL
const functions = new Functions()




// -- ANEXOS SENTINEL, PRUEBAS PSIGMA, VISISTA DOMICILIARIA
// -- VARIABLES
var listAnexos = new Array()
var listFilesAnexos = new Array()
var indexListAnexos = 1
var listFirma = null
var ListPhotografym = null
//Funcion para fecha y hora juntos
function SendDateTimeLocal(fecha) {
    console.log("fecha original" + fecha)
    var reordenar = ""
    var fechaOrdenar = ""
    var horarSeparar = ""
    if (fecha == "") { return reordenar = "" }
    if (fecha != null) {
        var replaceFechaInscripcion = fecha.replace('-', '/');
        replaceFechaInscripcion = replaceFechaInscripcion.replace('-', '/');
        console.log(replaceFechaInscripcion);
        //Lo separamos por la letra T
        var separar = replaceFechaInscripcion.split("T");
        //Reordenamos  la fecha
        fechaOrdenar = separar[0]
        horarSeparar = separar[1]
        fechaOrdenar = fechaOrdenar.split("/");
        fechaOrdenar = fechaOrdenar[1] + "/" + fechaOrdenar[2] + "/" + fechaOrdenar[0];
        reordenar = fechaOrdenar + " " + horarSeparar;
        console.log("verificar" + reordenar)
        $("#txt_7_hora_entrevista").val(horarSeparar)

    }
    return reordenar;
}
function SetDateTimeLocal(fecha, hora) {
    if (fecha == null) {
        return "";
    }
    if (fecha == "") { return ""; }
    var ordenar = "";
    var fechaCambiar = fecha.replace('/', '-');
    fechaCambiar = fechaCambiar.replace('/', '-');
    fechaCambiar = fechaCambiar.split("-");
    fechaCambiar = fechaCambiar[2] + "-" + fechaCambiar[1] + "-" + fechaCambiar[0];
    ordenar = fechaCambiar + "T" + hora
    console.log(ordenar);
    return ordenar;
}
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
        $("#container-graphic").css("visibility", "visible");
        svg_to_png('container-graphic')
    } else {
        // -- alert("Ingrese digitos entre 1 y 50")
    }
    if (txt_escala_sinceridad == 0 & txt_nivel_riesgo == 0) {
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
        $("#container-graphic").css("visibility", "hidden");
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
    console.log("radioAntecedentes" + radio_2_antecedentes);

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
    var txt_6_analisis_factor_oscuro = $("#txt_6_analisis_factor_oscuro").val()

    // --
    var txt_7_direccion = $("#txt_7_direccion").val()
    var txt_7_fecha_entrevista = SendDateTimeLocal($("#txt_7_fecha_entrevista").val())
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
                if (ext == "pdf" || ext == "PDF") {
                    // --
                    formData.append("dataFile", element, "Anexo_" + element.id + "." + ext);
                }
            }
        })
    }

    // --
    var txt_vd_1_nombres_apellidos = $("#txt_vd_1_nombres_apellidos").val()
    var sl_vd_1_tipo_documento = $("#sl_vd_1_tipo_documento").val()
    var txt_vd_1_nro = $("#txt_vd_1_nro").val()
    var txt_vd_1_lugar_fecha_nacimento = $("#txt_vd_1_lugar_fecha_nacimento").val()
    var txt_vd_1_edad = $("#txt_vd_1_edad").val()
    var txt_vd_1_direccion = $("#txt_vd_1_direccion").val()
    var txt_vd_1_telefonos = $("#txt_vd_1_telefonos").val()
    var txt_vd_1_correo_electronico = $("#txt_vd_1_correo_electronico").val()
    var sl_vd_1_estado_civil = $("#sl_vd_1_estado_civil").val()
    var txt_vd_1_nivel_educativo = $("#txt_vd_1_nivel_educativo").val()

    // --
    var txt_vd_1_cargo_aplica = $("#txt_vd_1_cargo_aplica").val()
    var txt_vd_1_fecha_visita = formatSaveDefault($("#txt_vd_1_fecha_visita").val())
    var txt_vd_1_personas_presente_visita = $("#txt_vd_1_personas_presente_visita").val()
    var sl_vd_1_tipo_evaluado = $("#sl_vd_1_tipo_evaluado").val()

    // --
    var txt_vd_1_actividades_evaluado = $("#txt_vd_1_actividades_evaluado").val()
    var txt_vd_1_proyectos_proyecciones = $("#txt_vd_1_proyectos_proyecciones").val()
    var txt_vd_1_problemas_justicia = $("#txt_vd_1_problemas_justicia").val()
    var txt_vd_1_consumo_estupefacientes = $("#txt_vd_1_consumo_estupefacientes").val()


    // --
    var txt_vd_conclusion = $("#txt_vd_conclusion").val()

    // --
    var txt_vd_2_padre_nombres = $("#txt_vd_2_padre_nombres").val()
    var txt_vd_2_padre_edad = $("#txt_vd_2_padre_edad").val()
    var txt_vd_2_padre_nivel_educativo = $("#txt_vd_2_padre_nivel_educativo").val()
    var txt_vd_2_padre_ocupacion = $("#txt_vd_2_padre_ocupacion").val()
    var txt_vd_2_padre_empresa_institucion = $("#txt_vd_2_padre_empresa_institucion").val()
    var txt_vd_2_padre_convive_usted = $("#txt_vd_2_padre_convive_usted").val()
    // --
    var txt_vd_2_madre_nombres = $("#txt_vd_2_madre_nombres").val()
    var txt_vd_2_madre_edad = $("#txt_vd_2_madre_edad").val()
    var txt_vd_2_madre_nivel_educativo = $("#txt_vd_2_madre_nivel_educativo").val()
    var txt_vd_2_madre_ocupacion = $("#txt_vd_2_madre_ocupacion").val()
    var txt_vd_2_madre_empresa_institucion = $("#txt_vd_2_madre_empresa_institucion").val()
    var txt_vd_2_madre_convive_usted = $("#txt_vd_2_madre_convive_usted").val()

    // --
    var txt_vd_2_conyugue_nombres = $("#txt_vd_2_conyugue_nombres").val()
    var txt_vd_2_conyugue_edad = $("#txt_vd_2_conyugue_edad").val()
    var txt_vd_2_conyugue_nivel_educativo = $("#txt_vd_2_conyugue_nivel_educativo").val()
    var txt_vd_2_conyugue_ocupacion = $("#txt_vd_2_conyugue_ocupacion").val()
    var txt_vd_2_conyugue_empresa_institucion = $("#txt_vd_2_conyugue_empresa_institucion").val()
    var txt_vd_2_conyugue_convive_usted = $("#txt_vd_2_conyugue_convive_usted").val()

    // --
    var txt_vd_4_ingresos_mensuales_ingresos_fijos = $("#txt_vd_4_ingresos_mensuales_ingresos_fijos").val()
    var txt_vd_4_ingresos_mensuales_apoyo_economico = $("#txt_vd_4_ingresos_mensuales_apoyo_economico").val()
    var txt_vd_4_ingresos_mensuales_otros_ingresos = $("#txt_vd_4_ingresos_mensuales_otros_ingresos").val()
    var txt_vd_4_ingresos_mensuales_total_ingresos = $("#txt_vd_4_ingresos_mensuales_total_ingresos").val()

    // --
    var txt_vd_4_gastos_mensuales_gastos_fijos = $("#txt_vd_4_gastos_mensuales_gastos_fijos").val()
    var txt_vd_4_gastos_mensuales_creditos = $("#txt_vd_4_gastos_mensuales_creditos").val()
    var txt_vd_4_gastos_mensuales_valor = $("#txt_vd_4_gastos_mensuales_valor").val()
    var txt_vd_4_gastos_mensuales_total_egresos = $("#txt_vd_4_gastos_mensuales_total_egresos").val()

    // --
    var sl_vd_4_bienes_comerciales = $("#sl_vd_4_bienes_comerciales").val()
    var txt_vd_4_proyecto_proyecciones = $("#txt_vd_4_proyecto_proyecciones").val()



    // -- CARACTERISTICAS BASICAS DE LA VIVIENDA
    var txt_vd_5_estrato_social = $("#txt_vd_5_estrato_social").val()
    var txt_vd_5_ubicacion = $("#txt_vd_5_ubicacion").val()
    var txt_vd_5_tiempo_residencia = $("#txt_vd_5_tiempo_residencia").val()
    // --
    var sl_vd_5_tipo = $("#sl_vd_5_tipo").val()
    var sl_vd_5_aprecion_interna = $("#sl_vd_5_aprecion_interna").val()
    var sl_vd_5_aprecion_externa = $("#sl_vd_5_aprecion_externa").val()
    // --
    var check_servicios_publicos = $('[name="check_servicios_publicos[]"]:checked').map(function () {
        return this.value;
    }).get();
    check_servicios_publicos = check_servicios_publicos.join('|')
    // --
    var check_servicios_instalados = $('[name="check_servicios_instalados[]"]:checked').map(function () {
        return this.value;
    }).get();
    check_servicios_instalados = check_servicios_instalados.join('|')
    // --
    var sl_vd_5_estado = $("#sl_vd_5_estado").val()
    var sl_vd_5_servicio_alcantarillado = $("#sl_vd_5_servicio_alcantarillado").val()
    var sl_vd_5_ubicacion = $("#sl_vd_5_ubicacion").val()
    //var sl_vd_5_distribucion = $("#sl_vd_5_distribucion").val()
    // --
    var txt_3_8_numero_alcobas = validateNumber($("#txt_3_8_numero_alcobas").val())
    var txt_3_8_numero_banos = validateNumber($("#txt_3_8_numero_banos").val())
    var txt_3_8_numero_cocinas = validateNumber($("#txt_3_8_numero_cocinas").val())
    // --
    var sl_vd_5_ambiente_sector = $("#sl_vd_5_ambiente_sector").val()
    var sl_vd_5_vias_acceso = $("#sl_vd_5_vias_acceso").val()
    var sl_vd_5_propiedad = $("#sl_vd_5_propiedad").val()
    var txt_vd_5_concepto = $("#txt_vd_5_concepto").val()

    // -- APRECIACIÓN DEL EVALUADOR
    var txt_dv_6_conclusion = $("#txt_dv_6_conclusion").val()
    var sl_vd_6_resultado = $("#sl_vd_6_resultado").val()
    var txt_vd_6_realizado_por = $("#txt_vd_6_realizado_por").val()


    // -- REGISTRO FOTOGRÁFICO
    //var txt_vd_7_candidato_observaciones = $("#txt_vd_7_candidato_observaciones").val()
    //var txt_vd_7_ambiente_social_observaciones = $("#txt_vd_7_ambiente_social_observaciones").val()
    //var txt_vd_7_habitaciones_observaciones = $("#txt_vd_7_habitaciones_observaciones").val()
    //var txt_vd_7_cocina_observaciones = $('#txt_vd_7_cocina_observaciones').val()

    // -- 3.9 APRECIACIÓN DEL EVALUADO

    if ($('#txt_vd_6_firma').prop("files") != null) {
        var file_vd_6_firma = $('#txt_vd_6_firma').prop("files")[0];
    }
    // --
    var ext_vd_6_firma = ""
    // --
    if (file_vd_6_firma !== undefined) {
        // --
        ext_vd_6_firma = getFileExtension(file_vd_6_firma.name)
        ext_vd_6_firma = ext_vd_6_firma.toLowerCase()
        // --
        if (ext_vd_6_firma == "img" || ext_vd_6_firma == "png" || ext_vd_6_firma == "jpg" || ext_vd_6_firma == "jpeg") {
            // --
            formData.append("dataFile", file_vd_6_firma, "Firma." + ext_vd_6_firma);
        }
    }


    // -- 3.10 REGISTRO FOTOGRÁFICO

    // -- IMG
    var file_vd_7_foto_entrada_domicilio = $('#file_vd_7_foto_entrada_domicilio').prop("files")[0];
    var file_vd_7_foto_ambiente_social = $('#file_vd_7_foto_ambiente_social').prop("files")[0];
    var file_vd_7_foto_habitaciones = $('#file_vd_7_foto_habitaciones').prop("files")[0];
    var file_vd_7_foto_cocina = $('#file_vd_7_foto_cocina').prop("files")[0];

    // -- TEXT
    var txt_vd_7_candidato_observaciones = $('#txt_vd_7_candidato_observaciones').val()
    var txt_vd_7_ambiente_social_observaciones = $('#txt_vd_7_ambiente_social_observaciones').val()
    var txt_vd_7_habitaciones_observaciones = $('#txt_vd_7_habitaciones_observaciones').val()
    var txt_vd_7_cocina_observaciones = $('#txt_vd_7_cocina_observaciones').val()

    // --
    var ext_vd_7_foto_entrada_domicilio = ""
    // --
    if (file_vd_7_foto_entrada_domicilio !== undefined) {
        // --
        ext_vd_7_foto_entrada_domicilio = getFileExtension(file_vd_7_foto_entrada_domicilio.name)
        ext_vd_7_foto_entrada_domicilio = ext_vd_7_foto_entrada_domicilio.toLowerCase()
        // --
        if (ext_vd_7_foto_entrada_domicilio == "img" || ext_vd_7_foto_entrada_domicilio == "png" || ext_vd_7_foto_entrada_domicilio == "jpg" || ext_vd_7_foto_entrada_domicilio == "jpeg") {
            // --
            formData.append("dataFile", file_vd_7_foto_entrada_domicilio, "FotoEntradaDomicilio." + ext_vd_7_foto_entrada_domicilio);
        }
    }

    // --
    var ext_vd_7_foto_ambiente_social = ""
    // --
    if (file_vd_7_foto_ambiente_social !== undefined) {
        // --
        ext_vd_7_foto_ambiente_social = getFileExtension(file_vd_7_foto_ambiente_social.name)
        ext_vd_7_foto_ambiente_social = ext_vd_7_foto_ambiente_social.toLowerCase()
        // --
        if (ext_vd_7_foto_ambiente_social == "img" || ext_vd_7_foto_ambiente_social == "png" || ext_vd_7_foto_ambiente_social == "jpg" || ext_vd_7_foto_ambiente_social == "jpeg") {
            // --
            formData.append("dataFile", file_vd_7_foto_ambiente_social, "FotoAmbienteSocial." + ext_vd_7_foto_ambiente_social);
        }
    }

    // --
    var ext_vd_7_foto_habitaciones = ""
    // --
    if (file_vd_7_foto_habitaciones !== undefined) {
        // --
        ext_vd_7_foto_habitaciones = getFileExtension(file_vd_7_foto_habitaciones.name)
        ext_vd_7_foto_habitaciones = ext_vd_7_foto_habitaciones.toLowerCase()
        // --
        if (ext_vd_7_foto_habitaciones == "img" || ext_vd_7_foto_habitaciones == "png" || ext_vd_7_foto_habitaciones == "jpg" || ext_vd_7_foto_habitaciones == "jpeg") {
            // --
            formData.append("dataFile", file_vd_7_foto_habitaciones, "FotoHabitaciones." + ext_vd_7_foto_habitaciones);
        }
    }

    // --
    var ext_vd_7_foto_cocina = ""
    // --
    if (file_vd_7_foto_cocina !== undefined) {
        // --
        ext_vd_7_foto_cocina = getFileExtension(file_vd_7_foto_cocina.name)
        ext_vd_7_foto_cocina = ext_vd_7_foto_cocina.toLowerCase()
        // --
        if (ext_vd_7_foto_cocina == "img" || ext_vd_7_foto_cocina == "png" || ext_vd_7_foto_cocina == "jpg" || ext_vd_7_foto_cocina == "jpeg") {
            // --
            formData.append("dataFile", file_vd_7_foto_cocina, "FotoCocina." + ext_vd_7_foto_cocina);
        }
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
        "oAcademicLaborAnalysisFlt": {
            "IdAnalisisAcademicoLaboral": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Sunedu": txt_3_sunedu,
            "ReferenciasLaborales": txt_3_referencias_laborales,
            "EsSalud": txt_3_essalud
        },
        "oFinancialRecordsAnalysisFlt": {
            "IdAnalisisAntecFinanciero": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "NivelRiesgo": radio_2_antecedentes,

            "CompFinancieroSentienel":  txt_4_financiero_sentienel,
            "Sunat": txt_4_sunat,
            "VerifPersExcluidas": txt_4_personas_excluidas
        },
        "oPoliticalSocialBackgroundAnalysisFlt": {
            "IdAnalisisAntecSocialPolitico": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "VerificacionCargoPublico": txt_5_verificacion_cargos_publicos,
            "VerificacionFiliacionPolitica": txt_5_verificacion_filiacion_politica,
            "MultasElectorales": txt_5_multas_electorales
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
        "oBasicInformationEvaluatedFlt": {
            "IdInfoBasicaEvaluado": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "NombresApellidos": txt_vd_1_nombres_apellidos,
            "IdTipoDocIdentidad": validateNumber(sl_vd_1_tipo_documento),
            "NumDocIdentidad": txt_vd_1_nro,
            "Lugar_FecNacimiento": txt_vd_1_lugar_fecha_nacimento,
            "Edad": validateNumber(txt_vd_1_edad),
            "Direccion": txt_vd_1_direccion,
            "Telefonos": txt_vd_1_telefonos,
            "email": txt_vd_1_correo_electronico,
            "IdEstadoCivil": validateNumber(sl_vd_1_estado_civil),
            "NivelEducativo": txt_vd_1_nivel_educativo,
            "CargoAplica": txt_vd_1_cargo_aplica,
            "FechaVisita": txt_vd_1_fecha_visita,
            "PersonasPresentesVisita": txt_vd_1_personas_presente_visita,
            "IdTipoEvaluado": validateNumber(sl_vd_1_tipo_evaluado),
            "ActividadesHobbie": txt_vd_1_actividades_evaluado,
            "ProyectosProyecciones": txt_vd_1_proyectos_proyecciones,
            "RptaProblemasJusticia": txt_vd_1_problemas_justicia,
            "RptaConsumidoEstupefacientes": txt_vd_1_consumo_estupefacientes,
        },
        "oFamilyEnvironmentFlt": {
            "IdEntornoFamiliar": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "RptaCasoSerCandidato": txt_vd_conclusion,
            "ListFamilyEnvironmentDetailFlt": [
                {
                    "IdEntornoFamiliar": 0,
                    "ItemEntornoFamiliar": 0,
                    "IdParentesco": 1, // -- PADRE
                    "Nombres": txt_vd_2_padre_nombres,
                    "Edad": validateNumber(txt_vd_2_padre_edad),
                    "NivelEducativo": txt_vd_2_padre_nivel_educativo,
                    "Ocupacion": txt_vd_2_padre_ocupacion,
                    "EmpresaInstitucion": txt_vd_2_padre_empresa_institucion,
                    "ConviveConUsted": txt_vd_2_padre_convive_usted
                },
                {
                    "IdEntornoFamiliar": 0,
                    "ItemEntornoFamiliar": 0,
                    "IdParentesco": 2, // -- MADRE
                    "Nombres": txt_vd_2_madre_nombres,
                    "Edad": validateNumber(txt_vd_2_madre_edad),
                    "NivelEducativo": txt_vd_2_madre_nivel_educativo,
                    "Ocupacion": txt_vd_2_madre_ocupacion,
                    "EmpresaInstitucion": txt_vd_2_madre_empresa_institucion,
                    "ConviveConUsted": txt_vd_2_madre_convive_usted
                },
                {
                    "IdEntornoFamiliar": 0,
                    "ItemEntornoFamiliar": 0,
                    "IdParentesco": 4, // -- CONYUGUE
                    "Nombres": txt_vd_2_conyugue_nombres,
                    "Edad": validateNumber(txt_vd_2_conyugue_edad),
                    "NivelEducativo": txt_vd_2_conyugue_nivel_educativo,
                    "Ocupacion": txt_vd_2_conyugue_ocupacion,
                    "EmpresaInstitucion": txt_vd_2_conyugue_empresa_institucion,
                    "ConviveConUsted": txt_vd_2_conyugue_convive_usted
                }
            ]
        },
        "oProfessionalEnvironmentFlt": {
            "IdEntornoProf": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "ListProfessionalEnvironmentDetailFlt": listEntornoProfesionalLaboral
        },
        "oEconomicInformationFlt": {
            "IdInfoEconomica": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "CtaBienesComerciales": sl_vd_4_bienes_comerciales,
            "ReportadoDataCredito": txt_vd_4_proyecto_proyecciones,
            "TotalIngresos": txt_vd_4_ingresos_mensuales_total_ingresos,
            "TotalEgresos": txt_vd_4_gastos_mensuales_total_egresos,
            "ListEconomicInformationDetailFlt": [
                {
                    "IdInfoEconomica": 0,
                    "ItemInfoEconomica": 0,
                    "IngresosMensuales": "Ingresos Fijos",
                    "ValorIngresoMensual": txt_vd_4_ingresos_mensuales_ingresos_fijos,
                    "GastosMensuales": "Gastos Fijos",
                    "ValorGastoMensual": txt_vd_4_gastos_mensuales_gastos_fijos
                },
                {
                    "IdInfoEconomica": 0,
                    "ItemInfoEconomica": 0,
                    "IngresosMensuales": "Apoyo Económico",
                    "ValorIngresoMensual": txt_vd_4_ingresos_mensuales_apoyo_economico,
                    "GastosMensuales": "Créditos",
                    "ValorGastoMensual": txt_vd_4_gastos_mensuales_creditos
                },
                {
                    "IdInfoEconomica": 0,
                    "ItemInfoEconomica": 0,
                    "IngresosMensuales": "Otros Ingresos",
                    "ValorIngresoMensual": txt_vd_4_ingresos_mensuales_otros_ingresos,
                    "GastosMensuales": "Otros Gastos",
                    "ValorGastoMensual": txt_vd_4_gastos_mensuales_valor
                }
            ]
        },
        "oBasicHousingFeaturesFlt": {
            "IdCaracteristicaBas": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "EstratoSocial": txt_vd_5_estrato_social,
            "Ubicacion": txt_vd_5_ubicacion,
            "TiempoResidencia": txt_vd_5_tiempo_residencia,
            "Tipo": sl_vd_5_tipo,
            "ApreciacionInterna": sl_vd_5_aprecion_interna,
            "ApreciacionExterna": sl_vd_5_aprecion_externa,
            "ListServiciosPublicos": check_servicios_publicos,
            "ListServiciosInstalados": check_servicios_instalados,
            "Estado": sl_vd_5_estado,
            "ServAlcantarillado": sl_vd_5_servicio_alcantarillado,
            "UbicacionVivienda": sl_vd_5_ubicacion,
            //"Distribucion": sl_vd_5_distribucion,
            // --
            "NroAlcobas": txt_3_8_numero_alcobas,
            "NroBanos": txt_3_8_numero_banos,
            "NroCocinas": txt_3_8_numero_cocinas,
            // --
            "AmbienteSector": sl_vd_5_ambiente_sector,
            "ViasAcceso": sl_vd_5_vias_acceso,
            "Propiedad": sl_vd_5_propiedad,
            "Concepto": txt_vd_5_concepto,
            "ListCommunityRelationShipFlt": listRelacionComunidad
        },
        "oAssessmentEvaluatorFlt": {
            "IdApreciacionEvaluador": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Conclusion": txt_dv_6_conclusion,
            "Resultado": sl_vd_6_resultado,
            "RealizadoPor": txt_vd_6_realizado_por,
            "Firma": {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "Firma." + ext_vd_6_firma,
                "RutaArchivo": null,
                "ExtensionArchivo": ext_vd_6_firma,
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
                "NombreArchivo": "FotoEntradaDomicilio." + ext_vd_7_foto_entrada_domicilio,
                "RutaArchivo": null,
                "ExtensionArchivo": ext_vd_7_foto_entrada_domicilio,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            },
            "Observaciones_EntradaDomicilio": txt_vd_7_candidato_observaciones,
            "ArchivoAdjunto_AmbSocial":
            {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "FotoAmbienteSocial." + ext_vd_7_foto_ambiente_social,
                "RutaArchivo": null,
                "ExtensionArchivo": ext_vd_7_foto_ambiente_social,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            },
            "Observaciones_AmbSocial": txt_vd_7_ambiente_social_observaciones,
            "ArchivoAdjunto_Habitaciones":
            {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "FotoHabitaciones." + ext_vd_7_foto_habitaciones,
                "RutaArchivo": null,
                "ExtensionArchivo": ext_vd_7_foto_habitaciones,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            },
            "Observaciones_Habitaciones": txt_vd_7_habitaciones_observaciones,
            "ArchivoAdjunto_Cocina":
            {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "FotoCocina." + ext_vd_7_foto_cocina,
                "RutaArchivo": null,
                "ExtensionArchivo": ext_vd_7_foto_cocina,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            },
            "Observaciones_Cocina": txt_vd_7_cocina_observaciones
        }
    }

    // --
    listHermanos.forEach((element) => {
        objectData.oFamilyEnvironmentFlt.ListFamilyEnvironmentDetailFlt.push(element)
    })
    listHijos.forEach((element) => {
        objectData.oFamilyEnvironmentFlt.ListFamilyEnvironmentDetailFlt.push(element)
    })

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
        //// --
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
            camposVacios += "<span>II. ANÁLISIS DE ANTECEDENTES PERSONALES PREMIUM</span>"
        }
        // --
        if (txt_3_sunedu == "" ||
            txt_3_referencias_laborales == "" ||
            txt_3_essalud == "") {
            camposVacios += "<span>III. ANÁLISIS DE ACADÉMICOS Y LABORALES</span>"
        }
        // --
        if (txt_4_financiero_sentienel == "" ||
            txt_4_sunat == "" ||
            txt_4_personas_excluidas == "") {
            camposVacios += "<span>IV. ANÁLISIS DE ANTECEDENTES FINANCIEROS</span>"
        }
        // --
        if (txt_5_verificacion_cargos_publicos == "" ||
            txt_5_verificacion_filiacion_politica == "" ||
            txt_5_multas_electorales == "") {
            camposVacios += "<span>V. ANÁLISIS DE ANTECEDENTES SOCIALES Y POLÍTICOS</span>"
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

        // -- Visita Domiciliaria
        if (txt_vd_1_nombres_apellidos == "" ||
            txt_vd_1_nro == "" ||
            txt_vd_1_lugar_fecha_nacimento == "" ||
            txt_vd_1_edad == "" ||
            txt_vd_1_direccion == "" ||
            txt_vd_1_telefonos == "" ||
            txt_vd_1_correo_electronico == "" ||
            sl_vd_1_estado_civil == "0" ||
            txt_vd_1_nivel_educativo == "" ||
            txt_vd_1_cargo_aplica == "" ||
            txt_vd_1_fecha_visita == "" ||
            txt_vd_1_personas_presente_visita == "" ||
            txt_vd_1_actividades_evaluado == "" ||
            txt_vd_1_proyectos_proyecciones == "" ||
            txt_vd_1_problemas_justicia == "" ||
            txt_vd_1_consumo_estupefacientes == "") {
            camposVacios += "<span>INFORMACION BASICA DEL EVALUADO</span>"
        }
        // --
        if (
            txt_vd_2_padre_nombres == "" ||
            txt_vd_2_madre_nombres == "" ||
            txt_vd_2_conyugue_nombres == "" ||
            listHermanos.length < 1 ||
            listHermanos.length < 1
        ) {
            camposVacios += "<br><span>ENTORNO FAMILIAR</span>"
        }
        // --
        if (listEntornoProfesionalLaboral.length < 1) {
            camposVacios += "<br><span>ENTORNO PROFESIONAL Y LABORAL</span>"
        }
        // --
        if (
            txt_vd_4_ingresos_mensuales_ingresos_fijos == "" ||
            txt_vd_4_gastos_mensuales_gastos_fijos == "" ||
            txt_vd_4_proyecto_proyecciones == ""
        ) {
            camposVacios += "<br><span>INFORMACION ECONÓMICA</span>"
        }
        // --
        if (
            txt_vd_5_estrato_social == "" ||
            txt_vd_5_ubicacion == "" ||
            txt_vd_5_tiempo_residencia == "" ||
            listRelacionComunidad.length < 1
        ) {
            camposVacios += "<br><span>CARACTERISTICAS BASICAS DE LA VIVIENDA</span>"
        }
        // --
        if (
            txt_dv_6_conclusion == "" ||
            txt_vd_6_realizado_por == ""
        ) {
            camposVacios += "<br><span>APRECIACIÓN DEL EVALUADOR</span>"
        }

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
                        url: UrlSaveorUpdateIntegrity360PlusPeru,
                        data: formData,
                        dataType: 'json',
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            // --
                            //console.log(data)
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
                        url: UrlSaveorUpdateIntegrity360PlusPeru,
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
function saveFirstTime(data){
    var formData = new FormData();

    // -- GET VALUES
    let idIntegridad = getDatos("key");
    let itemIntegridad = getDatos("item");

    // --
    var txt_1_nombres_apellidos = $("#txt_1_nombres_apellidos").val()
    var txt_1_nro_documento = $("#txt_1_nro_documento").val()
    var txt_1_fecha_inscripcion = formatSaveDefault($("#txt_1_fecha_inscripcion").val())
    var txt_1_fecha_expedicion = formatSaveDefault($("#txt_1_fecha_expedicion").val())
    var txt_1_caducidad = $("#txt_1_caducidad").val()
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
    var txt_6_analisis_factor_oscuro = $("#txt_6_analisis_factor_oscuro").val()

    // --
    var txt_7_direccion = $("#txt_7_direccion").val()
    var txt_7_fecha_entrevista = SendDateTimeLocal($("#txt_7_fecha_entrevista").val())
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
                if (ext == "pdf" || ext == "PDF") {
                    // --
                    formData.append("dataFile", element, "Anexo_" + element.id + "." + ext);
                }
            }
        })
    }

    // --
    var txt_vd_1_nombres_apellidos = $("#txt_vd_1_nombres_apellidos").val()
    var sl_vd_1_tipo_documento = $("#sl_vd_1_tipo_documento").val()
    var txt_vd_1_nro = $("#txt_vd_1_nro").val()
    var txt_vd_1_lugar_fecha_nacimento = $("#txt_vd_1_lugar_fecha_nacimento").val()
    var txt_vd_1_edad = $("#txt_vd_1_edad").val()
    var txt_vd_1_direccion = $("#txt_vd_1_direccion").val()
    var txt_vd_1_telefonos = $("#txt_vd_1_telefonos").val()
    var txt_vd_1_correo_electronico = $("#txt_vd_1_correo_electronico").val()
    var sl_vd_1_estado_civil = $("#sl_vd_1_estado_civil").val()
    var txt_vd_1_nivel_educativo = $("#txt_vd_1_nivel_educativo").val()

    // --
    var txt_vd_1_cargo_aplica = $("#txt_vd_1_cargo_aplica").val()
    var txt_vd_1_fecha_visita = formatSaveDefault($("#txt_vd_1_fecha_visita").val())
    var txt_vd_1_personas_presente_visita = $("#txt_vd_1_personas_presente_visita").val()
    var sl_vd_1_tipo_evaluado = $("#sl_vd_1_tipo_evaluado").val()

    // --
    var txt_vd_1_actividades_evaluado = $("#txt_vd_1_actividades_evaluado").val()
    var txt_vd_1_proyectos_proyecciones = $("#txt_vd_1_proyectos_proyecciones").val()
    var txt_vd_1_problemas_justicia = $("#txt_vd_1_problemas_justicia").val()
    var txt_vd_1_consumo_estupefacientes = $("#txt_vd_1_consumo_estupefacientes").val()


    // --
    var txt_vd_conclusion = $("#txt_vd_conclusion").val()

    // --
    var txt_vd_2_padre_nombres = $("#txt_vd_2_padre_nombres").val()
    var txt_vd_2_padre_edad = $("#txt_vd_2_padre_edad").val()
    var txt_vd_2_padre_nivel_educativo = $("#txt_vd_2_padre_nivel_educativo").val()
    var txt_vd_2_padre_ocupacion = $("#txt_vd_2_padre_ocupacion").val()
    var txt_vd_2_padre_empresa_institucion = $("#txt_vd_2_padre_empresa_institucion").val()
    var txt_vd_2_padre_convive_usted = $("#txt_vd_2_padre_convive_usted").val()
    // --
    var txt_vd_2_madre_nombres = $("#txt_vd_2_madre_nombres").val()
    var txt_vd_2_madre_edad = $("#txt_vd_2_madre_edad").val()
    var txt_vd_2_madre_nivel_educativo = $("#txt_vd_2_madre_nivel_educativo").val()
    var txt_vd_2_madre_ocupacion = $("#txt_vd_2_madre_ocupacion").val()
    var txt_vd_2_madre_empresa_institucion = $("#txt_vd_2_madre_empresa_institucion").val()
    var txt_vd_2_madre_convive_usted = $("#txt_vd_2_madre_convive_usted").val()

    // --
    var txt_vd_2_conyugue_nombres = $("#txt_vd_2_conyugue_nombres").val()
    var txt_vd_2_conyugue_edad = $("#txt_vd_2_conyugue_edad").val()
    var txt_vd_2_conyugue_nivel_educativo = $("#txt_vd_2_conyugue_nivel_educativo").val()
    var txt_vd_2_conyugue_ocupacion = $("#txt_vd_2_conyugue_ocupacion").val()
    var txt_vd_2_conyugue_empresa_institucion = $("#txt_vd_2_conyugue_empresa_institucion").val()
    var txt_vd_2_conyugue_convive_usted = $("#txt_vd_2_conyugue_convive_usted").val()

    // --
    var txt_vd_4_ingresos_mensuales_ingresos_fijos = $("#txt_vd_4_ingresos_mensuales_ingresos_fijos").val()
    var txt_vd_4_ingresos_mensuales_apoyo_economico = $("#txt_vd_4_ingresos_mensuales_apoyo_economico").val()
    var txt_vd_4_ingresos_mensuales_otros_ingresos = $("#txt_vd_4_ingresos_mensuales_otros_ingresos").val()
    var txt_vd_4_ingresos_mensuales_total_ingresos = $("#txt_vd_4_ingresos_mensuales_total_ingresos").val()

    // --
    var txt_vd_4_gastos_mensuales_gastos_fijos = $("#txt_vd_4_gastos_mensuales_gastos_fijos").val()
    var txt_vd_4_gastos_mensuales_creditos = $("#txt_vd_4_gastos_mensuales_creditos").val()
    var txt_vd_4_gastos_mensuales_valor = $("#txt_vd_4_gastos_mensuales_valor").val()
    var txt_vd_4_gastos_mensuales_total_egresos = $("#txt_vd_4_gastos_mensuales_total_egresos").val()

    // --
    var sl_vd_4_bienes_comerciales = $("#sl_vd_4_bienes_comerciales").val()
    var txt_vd_4_proyecto_proyecciones = $("#txt_vd_4_proyecto_proyecciones").val()



    // -- CARACTERISTICAS BASICAS DE LA VIVIENDA
    var txt_vd_5_estrato_social = $("#txt_vd_5_estrato_social").val()
    var txt_vd_5_ubicacion = $("#txt_vd_5_ubicacion").val()
    var txt_vd_5_tiempo_residencia = $("#txt_vd_5_tiempo_residencia").val()
    // --
    var sl_vd_5_tipo = $("#sl_vd_5_tipo").val()
    var sl_vd_5_aprecion_interna = $("#sl_vd_5_aprecion_interna").val()
    var sl_vd_5_aprecion_externa = $("#sl_vd_5_aprecion_externa").val()
    // --
    var check_servicios_publicos = $('[name="check_servicios_publicos[]"]:checked').map(function () {
        return this.value;
    }).get();
    check_servicios_publicos = check_servicios_publicos.join('|')
    // --
    var check_servicios_instalados = $('[name="check_servicios_instalados[]"]:checked').map(function () {
        return this.value;
    }).get();
    check_servicios_instalados = check_servicios_instalados.join('|')
    // --
    var sl_vd_5_estado = $("#sl_vd_5_estado").val()
    var sl_vd_5_servicio_alcantarillado = $("#sl_vd_5_servicio_alcantarillado").val()
    var sl_vd_5_ubicacion = $("#sl_vd_5_ubicacion").val()
    //var sl_vd_5_distribucion = $("#sl_vd_5_distribucion").val()
    // --
    var txt_3_8_numero_alcobas = validateNumber($("#txt_3_8_numero_alcobas").val())
    var txt_3_8_numero_banos = validateNumber($("#txt_3_8_numero_banos").val())
    var txt_3_8_numero_cocinas = validateNumber($("#txt_3_8_numero_cocinas").val())
    // --
    var sl_vd_5_ambiente_sector = $("#sl_vd_5_ambiente_sector").val()
    var sl_vd_5_vias_acceso = $("#sl_vd_5_vias_acceso").val()
    var sl_vd_5_propiedad = $("#sl_vd_5_propiedad").val()
    var txt_vd_5_concepto = $("#txt_vd_5_concepto").val()

    // -- APRECIACIÓN DEL EVALUADOR
    var txt_dv_6_conclusion = $("#txt_dv_6_conclusion").val()
    var sl_vd_6_resultado = $("#sl_vd_6_resultado").val()
    var txt_vd_6_realizado_por = $("#txt_vd_6_realizado_por").val()


    // -- REGISTRO FOTOGRÁFICO
    //var txt_vd_7_candidato_observaciones = $("#txt_vd_7_candidato_observaciones").val()
    //var txt_vd_7_ambiente_social_observaciones = $("#txt_vd_7_ambiente_social_observaciones").val()
    //var txt_vd_7_habitaciones_observaciones = $("#txt_vd_7_habitaciones_observaciones").val()
    //var txt_vd_7_cocina_observaciones = $('#txt_vd_7_cocina_observaciones').val()

    // -- 3.9 APRECIACIÓN DEL EVALUADO

    if ($('#txt_vd_6_firma').prop("files") != null) {
        var file_vd_6_firma = $('#txt_vd_6_firma').prop("files")[0];
    }
    // --
    var ext_vd_6_firma = ""
    // --
    if (file_vd_6_firma !== undefined) {
        // --
        ext_vd_6_firma = getFileExtension(file_vd_6_firma.name)
        ext_vd_6_firma = ext_vd_6_firma.toLowerCase()
        // --
        if (ext_vd_6_firma == "img" || ext_vd_6_firma == "png" || ext_vd_6_firma == "jpg" || ext_vd_6_firma == "jpeg") {
            // --
            formData.append("dataFile", file_vd_6_firma, "Firma." + ext_vd_6_firma);
        }
    }


    // -- 3.10 REGISTRO FOTOGRÁFICO

    // -- IMG
    var file_vd_7_foto_entrada_domicilio = $('#file_vd_7_foto_entrada_domicilio').prop("files")[0];
    var file_vd_7_foto_ambiente_social = $('#file_vd_7_foto_ambiente_social').prop("files")[0];
    var file_vd_7_foto_habitaciones = $('#file_vd_7_foto_habitaciones').prop("files")[0];
    var file_vd_7_foto_cocina = $('#file_vd_7_foto_cocina').prop("files")[0];

    // -- TEXT
    var txt_vd_7_candidato_observaciones = $('#txt_vd_7_candidato_observaciones').val()
    var txt_vd_7_ambiente_social_observaciones = $('#txt_vd_7_ambiente_social_observaciones').val()
    var txt_vd_7_habitaciones_observaciones = $('#txt_vd_7_habitaciones_observaciones').val()
    var txt_vd_7_cocina_observaciones = $('#txt_vd_7_cocina_observaciones').val()

    // --
    var ext_vd_7_foto_entrada_domicilio = ""
    // --
    if (file_vd_7_foto_entrada_domicilio !== undefined) {
        // --
        ext_vd_7_foto_entrada_domicilio = getFileExtension(file_vd_7_foto_entrada_domicilio.name)
        ext_vd_7_foto_entrada_domicilio = ext_vd_7_foto_entrada_domicilio.toLowerCase()
        // --
        if (ext_vd_7_foto_entrada_domicilio == "img" || ext_vd_7_foto_entrada_domicilio == "png" || ext_vd_7_foto_entrada_domicilio == "jpg" || ext_vd_7_foto_entrada_domicilio == "jpeg") {
            // --
            formData.append("dataFile", file_vd_7_foto_entrada_domicilio, "FotoEntradaDomicilio." + ext_vd_7_foto_entrada_domicilio);
        }
    }

    // --
    var ext_vd_7_foto_ambiente_social = ""
    // --
    if (file_vd_7_foto_ambiente_social !== undefined) {
        // --
        ext_vd_7_foto_ambiente_social = getFileExtension(file_vd_7_foto_ambiente_social.name)
        ext_vd_7_foto_ambiente_social = ext_vd_7_foto_ambiente_social.toLowerCase()
        // --
        if (ext_vd_7_foto_ambiente_social == "img" || ext_vd_7_foto_ambiente_social == "png" || ext_vd_7_foto_ambiente_social == "jpg" || ext_vd_7_foto_ambiente_social == "jpeg") {
            // --
            formData.append("dataFile", file_vd_7_foto_ambiente_social, "FotoAmbienteSocial." + ext_vd_7_foto_ambiente_social);
        }
    }

    // --
    var ext_vd_7_foto_habitaciones = ""
    // --
    if (file_vd_7_foto_habitaciones !== undefined) {
        // --
        ext_vd_7_foto_habitaciones = getFileExtension(file_vd_7_foto_habitaciones.name)
        ext_vd_7_foto_habitaciones = ext_vd_7_foto_habitaciones.toLowerCase()
        // --
        if (ext_vd_7_foto_habitaciones == "img" || ext_vd_7_foto_habitaciones == "png" || ext_vd_7_foto_habitaciones == "jpg" || ext_vd_7_foto_habitaciones == "jpeg") {
            // --
            formData.append("dataFile", file_vd_7_foto_habitaciones, "FotoHabitaciones." + ext_vd_7_foto_habitaciones);
        }
    }

    // --
    var ext_vd_7_foto_cocina = ""
    // --
    if (file_vd_7_foto_cocina !== undefined) {
        // --
        ext_vd_7_foto_cocina = getFileExtension(file_vd_7_foto_cocina.name)
        ext_vd_7_foto_cocina = ext_vd_7_foto_cocina.toLowerCase()
        // --
        if (ext_vd_7_foto_cocina == "img" || ext_vd_7_foto_cocina == "png" || ext_vd_7_foto_cocina == "jpg" || ext_vd_7_foto_cocina == "jpeg") {
            // --
            formData.append("dataFile", file_vd_7_foto_cocina, "FotoCocina." + ext_vd_7_foto_cocina);
        }
    }
    console.log(data.FechaNacimiento.substr(0, 10))
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
        "oAcademicLaborAnalysisFlt": {
            "IdAnalisisAcademicoLaboral": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Sunedu": txt_3_sunedu,
            "ReferenciasLaborales": txt_3_referencias_laborales,
            "EsSalud": txt_3_essalud
        },
        "oFinancialRecordsAnalysisFlt": {
            "IdAnalisisAntecFinanciero": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "NivelRiesgo": radio_2_antecedentes,

            "CompFinancieroSentienel":  txt_4_financiero_sentienel,
            "Sunat": txt_4_sunat,
            "VerifPersExcluidas": txt_4_personas_excluidas
        },
        "oPoliticalSocialBackgroundAnalysisFlt": {
            "IdAnalisisAntecSocialPolitico": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "VerificacionCargoPublico": txt_5_verificacion_cargos_publicos,
            "VerificacionFiliacionPolitica": txt_5_verificacion_filiacion_politica,
            "MultasElectorales": txt_5_multas_electorales
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
        "oBasicInformationEvaluatedFlt": {
            "IdInfoBasicaEvaluado": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "NombresApellidos": txt_vd_1_nombres_apellidos,
            "IdTipoDocIdentidad": validateNumber(sl_vd_1_tipo_documento),
            "NumDocIdentidad": txt_vd_1_nro,
            "Lugar_FecNacimiento": txt_vd_1_lugar_fecha_nacimento,
            "Edad": validateNumber(txt_vd_1_edad),
            "Direccion": txt_vd_1_direccion,
            "Telefonos": txt_vd_1_telefonos,
            "email": txt_vd_1_correo_electronico,
            "IdEstadoCivil": validateNumber(sl_vd_1_estado_civil),
            "NivelEducativo": txt_vd_1_nivel_educativo,
            "CargoAplica": txt_vd_1_cargo_aplica,
            "FechaVisita": txt_vd_1_fecha_visita,
            "PersonasPresentesVisita": txt_vd_1_personas_presente_visita,
            "IdTipoEvaluado": validateNumber(sl_vd_1_tipo_evaluado),
            "ActividadesHobbie": txt_vd_1_actividades_evaluado,
            "ProyectosProyecciones": txt_vd_1_proyectos_proyecciones,
            "RptaProblemasJusticia": txt_vd_1_problemas_justicia,
            "RptaConsumidoEstupefacientes": txt_vd_1_consumo_estupefacientes,
        },
        "oFamilyEnvironmentFlt": {
            "IdEntornoFamiliar": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "RptaCasoSerCandidato": txt_vd_conclusion,
            "ListFamilyEnvironmentDetailFlt": [
                {
                    "IdEntornoFamiliar": 0,
                    "ItemEntornoFamiliar": 0,
                    "IdParentesco": 1, // -- PADRE
                    "Nombres": txt_vd_2_padre_nombres,
                    "Edad": validateNumber(txt_vd_2_padre_edad),
                    "NivelEducativo": txt_vd_2_padre_nivel_educativo,
                    "Ocupacion": txt_vd_2_padre_ocupacion,
                    "EmpresaInstitucion": txt_vd_2_padre_empresa_institucion,
                    "ConviveConUsted": txt_vd_2_padre_convive_usted
                },
                {
                    "IdEntornoFamiliar": 0,
                    "ItemEntornoFamiliar": 0,
                    "IdParentesco": 2, // -- MADRE
                    "Nombres": txt_vd_2_madre_nombres,
                    "Edad": validateNumber(txt_vd_2_madre_edad),
                    "NivelEducativo": txt_vd_2_madre_nivel_educativo,
                    "Ocupacion": txt_vd_2_madre_ocupacion,
                    "EmpresaInstitucion": txt_vd_2_madre_empresa_institucion,
                    "ConviveConUsted": txt_vd_2_madre_convive_usted
                },
                {
                    "IdEntornoFamiliar": 0,
                    "ItemEntornoFamiliar": 0,
                    "IdParentesco": 4, // -- CONYUGUE
                    "Nombres": txt_vd_2_conyugue_nombres,
                    "Edad": validateNumber(txt_vd_2_conyugue_edad),
                    "NivelEducativo": txt_vd_2_conyugue_nivel_educativo,
                    "Ocupacion": txt_vd_2_conyugue_ocupacion,
                    "EmpresaInstitucion": txt_vd_2_conyugue_empresa_institucion,
                    "ConviveConUsted": txt_vd_2_conyugue_convive_usted
                }
            ]
        },
        "oProfessionalEnvironmentFlt": {
            "IdEntornoProf": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "ListProfessionalEnvironmentDetailFlt": listEntornoProfesionalLaboral
        },
        "oEconomicInformationFlt": {
            "IdInfoEconomica": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "CtaBienesComerciales": sl_vd_4_bienes_comerciales,
            "ReportadoDataCredito": txt_vd_4_proyecto_proyecciones,
            "TotalIngresos": txt_vd_4_ingresos_mensuales_total_ingresos,
            "TotalEgresos": txt_vd_4_gastos_mensuales_total_egresos,
            "ListEconomicInformationDetailFlt": [
                {
                    "IdInfoEconomica": 0,
                    "ItemInfoEconomica": 0,
                    "IngresosMensuales": "Ingresos Fijos",
                    "ValorIngresoMensual": txt_vd_4_ingresos_mensuales_ingresos_fijos,
                    "GastosMensuales": "Gastos Fijos",
                    "ValorGastoMensual": txt_vd_4_gastos_mensuales_gastos_fijos
                },
                {
                    "IdInfoEconomica": 0,
                    "ItemInfoEconomica": 0,
                    "IngresosMensuales": "Apoyo Económico",
                    "ValorIngresoMensual": txt_vd_4_ingresos_mensuales_apoyo_economico,
                    "GastosMensuales": "Créditos",
                    "ValorGastoMensual": txt_vd_4_gastos_mensuales_creditos
                },
                {
                    "IdInfoEconomica": 0,
                    "ItemInfoEconomica": 0,
                    "IngresosMensuales": "Otros Ingresos",
                    "ValorIngresoMensual": txt_vd_4_ingresos_mensuales_otros_ingresos,
                    "GastosMensuales": "Otros Gastos",
                    "ValorGastoMensual": txt_vd_4_gastos_mensuales_valor
                }
            ]
        },
        "oBasicHousingFeaturesFlt": {
            "IdCaracteristicaBas": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "EstratoSocial": txt_vd_5_estrato_social,
            "Ubicacion": txt_vd_5_ubicacion,
            "TiempoResidencia": txt_vd_5_tiempo_residencia,
            "Tipo": sl_vd_5_tipo,
            "ApreciacionInterna": sl_vd_5_aprecion_interna,
            "ApreciacionExterna": sl_vd_5_aprecion_externa,
            "ListServiciosPublicos": check_servicios_publicos,
            "ListServiciosInstalados": check_servicios_instalados,
            "Estado": sl_vd_5_estado,
            "ServAlcantarillado": sl_vd_5_servicio_alcantarillado,
            "UbicacionVivienda": sl_vd_5_ubicacion,
            //"Distribucion": sl_vd_5_distribucion,
            // --
            "NroAlcobas": txt_3_8_numero_alcobas,
            "NroBanos": txt_3_8_numero_banos,
            "NroCocinas": txt_3_8_numero_cocinas,
            // --
            "AmbienteSector": sl_vd_5_ambiente_sector,
            "ViasAcceso": sl_vd_5_vias_acceso,
            "Propiedad": sl_vd_5_propiedad,
            "Concepto": txt_vd_5_concepto,
            "ListCommunityRelationShipFlt": listRelacionComunidad
        },
        "oAssessmentEvaluatorFlt": {
            "IdApreciacionEvaluador": 0,
            "IdIntegridad": idIntegridad,
            "ItemIntegridadDet": itemIntegridad,
            "Conclusion": txt_dv_6_conclusion,
            "Resultado": sl_vd_6_resultado,
            "RealizadoPor": txt_vd_6_realizado_por,
            "Firma": {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "Firma." + ext_vd_6_firma,
                "RutaArchivo": null,
                "ExtensionArchivo": ext_vd_6_firma,
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
                "NombreArchivo": "FotoEntradaDomicilio." + ext_vd_7_foto_entrada_domicilio,
                "RutaArchivo": null,
                "ExtensionArchivo": ext_vd_7_foto_entrada_domicilio,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            },
            "Observaciones_EntradaDomicilio": txt_vd_7_candidato_observaciones,
            "ArchivoAdjunto_AmbSocial":
            {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "FotoAmbienteSocial." + ext_vd_7_foto_ambiente_social,
                "RutaArchivo": null,
                "ExtensionArchivo": ext_vd_7_foto_ambiente_social,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            },
            "Observaciones_AmbSocial": txt_vd_7_ambiente_social_observaciones,
            "ArchivoAdjunto_Habitaciones":
            {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "FotoHabitaciones." + ext_vd_7_foto_habitaciones,
                "RutaArchivo": null,
                "ExtensionArchivo": ext_vd_7_foto_habitaciones,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            },
            "Observaciones_Habitaciones": txt_vd_7_habitaciones_observaciones,
            "ArchivoAdjunto_Cocina":
            {
                "IdArchivoAdjunto": 0,
                "NombreArchivo": "FotoCocina." + ext_vd_7_foto_cocina,
                "RutaArchivo": null,
                "ExtensionArchivo": ext_vd_7_foto_cocina,
                "FecRegistro": null,
                "IdUsuarioRegistro": 0
            },
            "Observaciones_Cocina": txt_vd_7_cocina_observaciones
        }
    }

    // --
    listHermanos.forEach((element) => {
        objectData.oFamilyEnvironmentFlt.ListFamilyEnvironmentDetailFlt.push(element)
    })
    listHijos.forEach((element) => {
        objectData.oFamilyEnvironmentFlt.ListFamilyEnvironmentDetailFlt.push(element)
    })

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
        camposVacios += "<span>II. ANÁLISIS DE ANTECEDENTES PERSONALES PREMIUM</span>"
    }
    // --
    if (txt_3_sunedu == "" ||
        txt_3_referencias_laborales == "" ||
        txt_3_essalud == "") {
        camposVacios += "<span>III. ANÁLISIS DE ACADÉMICOS Y LABORALES</span>"
    }
    // --
    if (txt_4_financiero_sentienel == "" ||
        txt_4_sunat == "" ||
        txt_4_personas_excluidas == "") {
        camposVacios += "<span>IV. ANÁLISIS DE ANTECEDENTES FINANCIEROS</span>"
    }
    // --
    if (txt_5_verificacion_cargos_publicos == "" ||
        txt_5_verificacion_filiacion_politica == "" ||
        txt_5_multas_electorales == "") {
        camposVacios += "<span>V. ANÁLISIS DE ANTECEDENTES SOCIALES Y POLÍTICOS</span>"
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

    // -- Visita Domiciliaria
    if (txt_vd_1_nombres_apellidos == "" ||
        txt_vd_1_nro == "" ||
        txt_vd_1_lugar_fecha_nacimento == "" ||
        txt_vd_1_edad == "" ||
        txt_vd_1_direccion == "" ||
        txt_vd_1_telefonos == "" ||
        txt_vd_1_correo_electronico == "" ||
        sl_vd_1_estado_civil == "0" ||
        txt_vd_1_nivel_educativo == "" ||
        txt_vd_1_cargo_aplica == "" ||
        txt_vd_1_fecha_visita == "" ||
        txt_vd_1_personas_presente_visita == "" ||
        txt_vd_1_actividades_evaluado == "" ||
        txt_vd_1_proyectos_proyecciones == "" ||
        txt_vd_1_problemas_justicia == "" ||
        txt_vd_1_consumo_estupefacientes == "") {
        camposVacios += "<span>INFORMACION BASICA DEL EVALUADO</span>"
    }
    // --
    if (
        txt_vd_2_padre_nombres == "" ||
        txt_vd_2_madre_nombres == "" ||
        txt_vd_2_conyugue_nombres == "" ||
        listHermanos.length < 1 ||
        listHermanos.length < 1
    ) {
        camposVacios += "<br><span>ENTORNO FAMILIAR</span>"
    }
    // --
    if (listEntornoProfesionalLaboral.length < 1) {
        camposVacios += "<br><span>ENTORNO PROFESIONAL Y LABORAL</span>"
    }
    // --
    if (
        txt_vd_4_ingresos_mensuales_ingresos_fijos == "" ||
        txt_vd_4_gastos_mensuales_gastos_fijos == "" ||
        txt_vd_4_proyecto_proyecciones == ""
    ) {
        camposVacios += "<br><span>INFORMACION ECONÓMICA</span>"
    }
    // --
    if (
        txt_vd_5_estrato_social == "" ||
        txt_vd_5_ubicacion == "" ||
        txt_vd_5_tiempo_residencia == "" ||
        listRelacionComunidad.length < 1
    ) {
        camposVacios += "<br><span>CARACTERISTICAS BASICAS DE LA VIVIENDA</span>"
    }
    // --
    if (
        txt_dv_6_conclusion == "" ||
        txt_vd_6_realizado_por == ""
    ) {
        camposVacios += "<br><span>APRECIACIÓN DEL EVALUADOR</span>"
    }

    // --
    formData.append(
        "JsonMaster",
        JSON.stringify(objectData)
    );
    // --

    if (camposVacios != "") {
        return $.ajax({
            type: "POST",
            url: UrlSaveorUpdateIntegrity360PlusPeru,
            data: formData,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                getList360PlusPeru();
            }
        });
        


    } else {
        return $.ajax({
            type: "POST",
            url: UrlSaveorUpdateIntegrity360PlusPeru,
            data: formData,
            dataType: 'json',
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                getList360PlusPeru();
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

function getList360PlusPeru() {
    // --
    let idIntegridad = getDatos("key")
    let Item = getDatos("item")
    // --
    let url = urlGetRiskAnalysisFormat360PlusPeru + "?IdIntegridad=" + idIntegridad + "&ItemIntegridadDet=" + Item
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
                if (obj.oAcademicLaborAnalysisVm != null) {
                    // --
                    $("#txt_3_sunedu").val(obj.oAcademicLaborAnalysisVm.Sunedu)
                    $("#txt_3_referencias_laborales").val(obj.oAcademicLaborAnalysisVm.ReferenciasLaborales)
                    $("#txt_3_essalud").val(obj.oAcademicLaborAnalysisVm.EsSalud)
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
                if (obj.oPoliticalSocialBackgroundAnalysisVm != null) {
                    // --
                    $("#txt_5_verificacion_cargos_publicos").val(obj.oPoliticalSocialBackgroundAnalysisVm.VerificacionCargoPublico)
                    $("#txt_5_verificacion_filiacion_politica").val(obj.oPoliticalSocialBackgroundAnalysisVm.VerificacionFiliacionPolitica)
                    $("#txt_5_multas_electorales").val(obj.oPoliticalSocialBackgroundAnalysisVm.MultasElectorales)
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
                    $("#txt_7_fecha_entrevista").val(SetDateTimeLocal(obj.oHouseCallsAnalysisVm.FechaEntrevista, obj.oHouseCallsAnalysisVm.HoraEntrevista))
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
                if (obj.oBasicInformationEvaluatedVm != null) {
                    // --
                    $("#txt_vd_1_nombres_apellidos").val(obj.oBasicInformationEvaluatedVm.NombresApellidos)
                    $("#sl_vd_1_tipo_documento").val(obj.oBasicInformationEvaluatedVm.IdTipoDocIdentidad)
                    $("#txt_vd_1_nro").val(obj.oBasicInformationEvaluatedVm.NumDocIdentidad)
                    $("#txt_vd_1_lugar_fecha_nacimento").val(obj.oBasicInformationEvaluatedVm.Lugar_FecNacimiento)
                    $("#txt_vd_1_edad").val(obj.oBasicInformationEvaluatedVm.Edad)
                    $("#txt_vd_1_direccion").val(obj.oBasicInformationEvaluatedVm.Direccion)
                    $("#txt_vd_1_telefonos").val(obj.oBasicInformationEvaluatedVm.Telefonos)
                    $("#txt_vd_1_correo_electronico").val(obj.oBasicInformationEvaluatedVm.email)
                    $("#sl_vd_1_estado_civil").val(obj.oBasicInformationEvaluatedVm.IdEstadoCivil)
                    $("#txt_vd_1_nivel_educativo").val(obj.oBasicInformationEvaluatedVm.NivelEducativo)
                    $("#txt_vd_1_cargo_aplica").val(obj.oBasicInformationEvaluatedVm.CargoAplica)
                    $("#txt_vd_1_fecha_visita").val(changeFormatInputDate(obj.oBasicInformationEvaluatedVm.FechaVisita))
                    $("#txt_vd_1_personas_presente_visita").val(obj.oBasicInformationEvaluatedVm.PersonasPresentesVisita)
                    $("#sl_vd_1_tipo_evaluado").val(obj.oBasicInformationEvaluatedVm.IdTipoEvaluado)
                    $("#txt_vd_1_actividades_evaluado").val(obj.oBasicInformationEvaluatedVm.ActividadesHobbie)
                    $("#txt_vd_1_proyectos_proyecciones").val(obj.oBasicInformationEvaluatedVm.ProyectosProyecciones)
                    $("#txt_vd_1_problemas_justicia").val(obj.oBasicInformationEvaluatedVm.RptaProblemasJusticia)
                    $("#txt_vd_1_consumo_estupefacientes").val(obj.oBasicInformationEvaluatedVm.RptaConsumidoEstupefacientes)
                }


                // --
                if (obj.oFamilyEnvironmentVm != null) {
                    // --
                    if (obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm.length > 0) {
                        // --
                        let lista = obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm
                        // --
                        if (obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[0] != undefined && obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[0] != null) {
                            $('#txt_vd_2_padre_nombres').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[0].Nombres)
                            $('#txt_vd_2_padre_edad').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[0].Edad)
                            $('#txt_vd_2_padre_nivel_educativo').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[0].NivelEducativo)
                            $('#txt_vd_2_padre_ocupacion').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[0].Ocupacion)
                            $('#txt_vd_2_padre_empresa_institucion').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[0].EmpresaInstitucion)
                            $('#txt_vd_2_padre_convive_usted').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[0].ConviveConUsted)
                        }

                        // --
                        if (obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[1] != undefined && obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[1] != null) {
                            $('#txt_vd_2_madre_nombres').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[1].Nombres)
                            $('#txt_vd_2_madre_edad').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[1].Edad)
                            $('#txt_vd_2_madre_nivel_educativo').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[1].NivelEducativo)
                            $('#txt_vd_2_madre_ocupacion').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[1].Ocupacion)
                            $('#txt_vd_2_madre_empresa_institucion').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[1].EmpresaInstitucion)
                            $('#txt_vd_2_madre_convive_usted').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[1].ConviveConUsted)
                        }

                        // --
                        if (obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[2] != undefined && obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[2] != null) {
                            $('#txt_vd_2_conyugue_nombres').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[2].Nombres)
                            $('#txt_vd_2_conyugue_edad').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[2].Edad)
                            $('#txt_vd_2_conyugue_nivel_educativo').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[2].NivelEducativo)
                            $('#txt_vd_2_conyugue_ocupacion').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[2].Ocupacion)
                            $('#txt_vd_2_conyugue_empresa_institucion').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[2].EmpresaInstitucion)
                            $('#txt_vd_2_conyugue_convive_usted').val(obj.oFamilyEnvironmentVm.ListFamilyEnvironmentDetailVm[2].ConviveConUsted)
                        }
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
                                    ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_vd_2_delete_row_hermanos"> <i class="fa fa-trash"></i></button >'
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
                                    ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_vd_2_delete_row_hijos"> <i class="fa fa-trash"></i></button >'
                                ]).draw(false);
                                tableHijos.columns.adjust()
                                    .responsive.recalc();
                            }

                        })
                    }
                }

                // --
                if (obj.oConclusionVm != null) {
                    $("#txt_vd_conclusion").val(obj.oFamilyEnvironmentVm.RptaCasoSerCandidato)
                }

                // --
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
                                ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_vd_3_delete_row"> <i class="fa fa-trash"></i></button >'
                            ]).draw(false);
                            tableEntornoProfesionalLaboral.columns.adjust()
                                .responsive.recalc();
                        })
                    }
                }

                // --
                if (obj.oEconomicInformationVm != null) {
                    // --
                    $('#txt_vd_4_ingresos_mensuales_ingresos_fijos').val(obj.oEconomicInformationVm.ListEconomicInformationDetailVm[0].ValorIngresoMensual)
                    $('#txt_vd_4_ingresos_mensuales_apoyo_economico').val(obj.oEconomicInformationVm.ListEconomicInformationDetailVm[1].ValorIngresoMensual)
                    $('#txt_vd_4_ingresos_mensuales_otros_ingresos').val(obj.oEconomicInformationVm.ListEconomicInformationDetailVm[2].ValorIngresoMensual)
                    $('#txt_vd_4_ingresos_mensuales_total_ingresos').val(obj.oEconomicInformationVm.TotalIngresos)

                    $('#txt_vd_4_gastos_mensuales_gastos_fijos').val(obj.oEconomicInformationVm.ListEconomicInformationDetailVm[0].ValorGastoMensual)
                    $('#txt_vd_4_gastos_mensuales_creditos').val(obj.oEconomicInformationVm.ListEconomicInformationDetailVm[1].ValorGastoMensual)
                    $('#txt_vd_4_gastos_mensuales_valor').val(obj.oEconomicInformationVm.ListEconomicInformationDetailVm[2].ValorGastoMensual)
                    $('#txt_vd_4_gastos_mensuales_total_egresos').val(obj.oEconomicInformationVm.TotalEgresos)

                    $('#sl_vd_4_bienes_comerciales').val(obj.oEconomicInformationVm.CtaBienesComerciales)
                    $('#txt_vd_4_proyecto_proyecciones').val(obj.oEconomicInformationVm.ReportadoDataCredito)
                }

                // --
                if (obj.oBasicHousingFeaturesVm != null) {
                    // --
                    $('#txt_vd_5_estrato_social').val(obj.oBasicHousingFeaturesVm.EstratoSocial)
                    $('#txt_vd_5_ubicacion').val(obj.oBasicHousingFeaturesVm.Ubicacion)
                    $('#txt_vd_5_tiempo_residencia').val(obj.oBasicHousingFeaturesVm.TiempoResidencia)
                    $('#sl_vd_5_tipo').val(obj.oBasicHousingFeaturesVm.Tipo)
                    $('#sl_vd_5_aprecion_interna').val(obj.oBasicHousingFeaturesVm.ApreciacionInterna)
                    $('#sl_vd_5_aprecion_externa').val(obj.oBasicHousingFeaturesVm.ApreciacionExterna)
                    $('#sl_vd_5_estado').val(obj.oBasicHousingFeaturesVm.Estado)
                    $('#sl_vd_5_servicio_alcantarillado').val(obj.oBasicHousingFeaturesVm.ServAlcantarillado)
                    $('#sl_vd_5_ubicacion').val(obj.oBasicHousingFeaturesVm.UbicacionVivienda)
                    //$('#sl_vd_5_distribucion').val(obj.oBasicHousingFeaturesVm.Distribucion)
                    // --
                    $("#txt_3_8_numero_alcobas").val(obj.oBasicHousingFeaturesVm.NroAlcobas)
                    $("#txt_3_8_numero_banos").val(obj.oBasicHousingFeaturesVm.NroBanos)
                    $("#txt_3_8_numero_cocinas").val(obj.oBasicHousingFeaturesVm.NroCocinas)
                    // --
                    $('#sl_vd_5_ambiente_sector').val(obj.oBasicHousingFeaturesVm.AmbienteSector)
                    $('#sl_vd_5_vias_acceso').val(obj.oBasicHousingFeaturesVm.ViasAcceso)
                    $('#sl_vd_5_propiedad').val(obj.oBasicHousingFeaturesVm.Propiedad)
                    $('#txt_vd_5_concepto').val(obj.oBasicHousingFeaturesVm.Concepto)
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
                                ' <button class= "btn btn-sm btn-danger" data-id="' + index + '" id="btn_vd_5_delete_row"> <i class="fa fa-trash"></i></button >'
                            ]).draw(false);
                            tableRelacionComunidad.columns.adjust()
                                .responsive.recalc();
                        })
                    }
                }

                // --
                if (obj.oAssessmentEvaluatorVm != null) {
                    // --
                    $('#txt_dv_6_conclusion').val(obj.oAssessmentEvaluatorVm.Conclusion)
                    $('#sl_vd_6_resultado').val(obj.oAssessmentEvaluatorVm.Resultado)
                    $('#txt_vd_6_realizado_por').val(obj.oAssessmentEvaluatorVm.RealizadoPor)
                }

                // --
                if (obj.oAssessmentEvaluatorVm != null) {
                    // --
                    if (obj.oAssessmentEvaluatorVm.Firma != null) {
                        // --
                        listFirma = obj.oAssessmentEvaluatorVm
                        $("#PreviewFirma button").attr("data-typefile", obj.oAssessmentEvaluatorVm.Firma.ExtensionArchivo)
                        $("#PreviewFirma button").attr("data-route", btoa(obj.oAssessmentEvaluatorVm.Firma.RutaArchivo))
                        $("#PreviewFirma span").text(obj.oAssessmentEvaluatorVm.Firma.NombreArchivo)
                    }
                }


                // --
                if (obj.oPhotographicRecordVm != null) {
                    // --
                    ListPhotografym = obj.oPhotographicRecordVm;
                    $('#txt_vd_7_candidato_observaciones').val(obj.oPhotographicRecordVm.Observaciones_EntradaDomicilio)
                    $('#txt_vd_7_ambiente_social_observaciones').val(obj.oPhotographicRecordVm.Observaciones_AmbSocial)
                    $('#txt_vd_7_habitaciones_observaciones').val(obj.oPhotographicRecordVm.Observaciones_Habitaciones)
                    $('#txt_vd_7_cocina_observaciones').val(obj.oPhotographicRecordVm.Observaciones_Cocina)

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

            } else {

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
    let url = urlGenerateDocument + "?IdIntegridad=" + idIntegridad + "&ItemIntegridadDet=" + itemIntegridad + "&idDocumentFile=16";
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



function separateFinancieros(dato) {

    var x = dato.substring(0, 9)
    console.log("data Total");
    console.log(dato);
    var valormaximo = dato.split("");

    console.log(valormaximo);
    var respuesta = "";

    if (valormaximo[0]=="B") {
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
// -- 
//setInputDatePicker("txt_1_fecha_inscripcion")
//setInputDatePicker("txt_1_fecha_expedicion")
//setInputDatePicker("txt_1_fecha_nacimiento")
//setInputDatePicker("txt_7_fecha_entrevista")
//setInputDatePicker("txt_vd_1_fecha_visita")


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
getList360PlusPeru()