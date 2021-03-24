// -- GLOBAL
const functions = new Functions()
// --
// --
const byte = 1048576 // -- 1 MB	-> 1048576 B
const maxSize = 20  // -- 20 Megabytes

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
function validateFileSize(file) {
    // --
    if ((file.size / byte) <= maxSize) {
        return true
    } else {
        return false
    }
}

// --
function calculateGraphic() {
    // --
    let txt_1_escala_sinceridad = $("#txt_1_escala_sinceridad").val()
    let txt_1_nivel_riesgo = $("#txt_1_nivel_riesgo").val()
    let txt_1_justicia_trabajo = $("#txt_1_justicia_trabajo").val()
    // --
    if (
        txt_1_escala_sinceridad <= 100 &&
        txt_1_nivel_riesgo <= 100 &&
        txt_1_justicia_trabajo <= 100 &&
        txt_1_escala_sinceridad > 0 &&
        txt_1_nivel_riesgo > 0 &&
        txt_1_justicia_trabajo > 0
    ) {
        // --
        var chart = Highcharts.chart('container-graphic', {

            title: {
                text: 'Resultados Test Psicologico'
            },

            subtitle: {
                text: ''
            },

            xAxis: {
                categories: ['Escala Sinceridade', 'Nivel de Risco', 'Justiça no trabalho']
            },

            series: [{
                type: 'column',
                colorByPoint: true,
                data: [parseFloat(txt_1_escala_sinceridad), parseFloat(txt_1_nivel_riesgo), parseFloat(txt_1_justicia_trabajo)],
                showInLegend: false
            }]

        });

    } else {
        // -- alert("Ingrese digitos entre 1 y 50")
    }
    // --
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

// --
function getListStatusCivil(id) {
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
            $('#' + id).html(html);
        }
    })
}


function createParams() {
    // --
    var formData = new FormData();

    // -- GET VALUES
    let idIntegridad = getDatos("key");
    let itemIntegridad = getDatos("item");

    // --
    let txt_1_nombres_apellidos = $("#txt_1_nombres_apellidos").val()
    let txt_1_nro_documento = $("#txt_1_nro_documento").val()
    let txt_1_lugar_nacimiento = $("#txt_1_lugar_nacimiento").val()
    let txt_1_nacionalidad = $("#txt_1_nacionalidad").val()
    let txt_1_fecha_nacimiento = $("#txt_1_fecha_nacimiento").val()
    let txt_1_edad = $("#txt_1_edad").val()
    let txt_1_signo = $("#txt_1_signo").val()
    let sl_1_sexo = $("#sl_1_sexo").val()
    let sl_1_estado_civil = $("#sl_1_estado_civil").val()
    let txt_1_direccion = $("#txt_1_direccion").val()

    // --
    let txt_1_escala_sinceridad = $("#txt_1_escala_sinceridad").val()
    let txt_1_nivel_riesgo = $("#txt_1_nivel_riesgo").val()
    let txt_1_justicia_trabajo = $("#txt_1_justicia_trabajo").val()
    var radio_1_nivel = $('input:radio[name=radio_1_nivel]:checked').val()
    var radio_1_calificacion = $('input:radio[name=radio_1_calificacion]:checked').val()

    // --
    let txt_2_datos_registro = $("#txt_2_datos_registro").val()

    // --
    let txt_3_comportamiento_financiero = $("#txt_3_comportamiento_financiero").val()

    // --
    let txt_4_restrictivas_nacionales = $("#txt_4_restrictivas_nacionales").val()

    // --
    let txt_5_analisis_test_psicologico = $("#txt_5_analisis_test_psicologico").val()

    // --
    let txt_6_conclusion = $("#txt_6_conclusion").val()

    // --
    let txt_1_1_nombre = $("#txt_1_1_nombre").val()
    let txt_1_1_cpf = $("#txt_1_1_cpf").val()
    let txt_1_1_habla = $("#txt_1_1_habla").val()
    let txt_1_1_lugar_nacimiento = $("#txt_1_1_lugar_nacimiento").val()
    let txt_1_1_nacionalidad = $("#txt_1_1_nacionalidad").val()
    let txt_1_1_fecha_nacimiento = $("#txt_1_1_fecha_nacimiento").val()
    let txt_1_1_signo = $("#txt_1_1_signo").val()
    let sl_1_1_genero = $("#sl_1_1_genero").val()
    let txt_1_1_edad = $("#txt_1_1_edad").val()
    let sl_1_1_estado_civil = $("#sl_1_1_estado_civil").val()
    let txt_1_1_telefono = $("#txt_1_1_telefono").val()
    let txt_1_1_email = $("#txt_1_1_email").val()

    // --
    let txt_1_2_estado_cpf = $("#txt_1_2_estado_cpf").val()
    let txt_1_2_calificacion_profesional = $("#txt_1_2_calificacion_profesional").val()
    let txt_1_2_actividad_profesional = $("#txt_1_2_actividad_profesional").val()
    let txt_1_2_grado_escolaridad = $("#txt_1_2_grado_escolaridad").val()
    let txt_1_2_titulo_elector = $("#txt_1_2_titulo_elector").val()
    let txt_1_2_personas_hogar = $("#txt_1_2_personas_hogar").val()
    let txt_1_2_esposa = $("#txt_1_2_esposa").val()
    let txt_1_2_cheques_fraude = $("#txt_1_2_cheques_fraude").val()
    let txt_1_2_pis = $("#txt_1_2_pis").val()
    let txt_1_2_obito = $("#txt_1_2_obito").val()

    // --
    let txt_2_3_rango_ingresos_presuntos = $("#txt_2_3_rango_ingresos_presuntos").val()
    let txt_2_3_poder_adquisitivo = $("#txt_2_3_poder_adquisitivo").val()
    let txt_2_3_riesgo_credito = $("#txt_2_3_riesgo_credito").val()
    let txt_2_3_busqueda_captura = $("#txt_2_3_busqueda_captura").val()
    let txt_2_3_ejecucion_desalojo = $("#txt_2_3_ejecucion_desalojo").val()
    let txt_2_3_consulta_reembolso = $("#txt_2_3_consulta_reembolso").val()
    let txt_2_3_recibe_ayuda_gobierno = $("#txt_2_3_recibe_ayuda_gobierno").val()
    let txt_2_3_no_llamar = $("#txt_2_3_no_llamar").val()

    // --
    let txt_3_1_poder_juridico = $("#txt_3_1_poder_juridico").val()
    let txt_3_2_poder_juridico = $("#txt_3_2_poder_juridico").val()
    let txt_3_3_poder_juridico = $("#txt_3_3_poder_juridico").val()

    let txt_3_1_informacion_adicional = $("#txt_3_1_informacion_adicional").val()
    let txt_3_2_informacion_adicional = $("#txt_3_2_informacion_adicional").val()
    let txt_3_3_informacion_adicional = $("#txt_3_3_informacion_adicional").val()

    // --
    let file_4_test_confiabilidad = $('#file_4_test_confiabilidad').prop("files")[0];
    var ext_file_4_test_confiabilidad = ""
    // --
    if (file_4_test_confiabilidad !== undefined) {
        // -
        if (validateFileSize(file_3_test_confiabilidad)) {
            // --
            ext_file_4_test_confiabilidad = getFileExtension(file_4_test_confiabilidad.name)
            ext_file_4_test_confiabilidad = ext_file_4_test_confiabilidad.toLocaleLowerCase()
            // --
            if (ext_file_4_test_confiabilidad == "pdf") {
                // --
                formData.append("dataFile", file_4_test_confiabilidad, "TestConfiabilidad." + ext_file_4_test_confiabilidad);
            }
        }
    }

}


// -- Load
getListStatusCivil('sl_1_estado_civil')
getListStatusCivil('sl_1_1_estado_civil')