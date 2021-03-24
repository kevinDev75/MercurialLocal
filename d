[33mcommit e1860f609c6737da6e3b83f1fb2344fc3fcd86ee[m[33m ([m[1;36mHEAD[m[33m, [m[1;31morigin/develop[m[33m, [m[1;31morigin/Develop-QA[m[33m, [m[1;32mDevelop-QA[m[33m)[m
Author: kevin753 <kevin.cordovasanchez@gmail.com>
Date:   Mon Feb 8 21:15:18 2021 -0500

    asd

[1mdiff --git a/Mercurial.CrossCuting.Utilities/Template/TemplateEnum.cs b/Mercurial.CrossCuting.Utilities/Template/TemplateEnum.cs[m
[1mindex 8531de1..88e13d6 100644[m
[1m--- a/Mercurial.CrossCuting.Utilities/Template/TemplateEnum.cs[m
[1m+++ b/Mercurial.CrossCuting.Utilities/Template/TemplateEnum.cs[m
[36m@@ -8,7 +8,6 @@[m [mnamespace Mercurial.CrossCuting.Utilities.Template[m
 {[m
     public class TemplateEnum[m
     {[m
[31m-[m
         public enum MovementType[m
         {[m
 [m

[33mcommit 174c97c4ba50698cb07b3423ae7b95f05609fe2c[m
Author: Oscar-Rengifo-S <oscarrengifosanchez@gmail.com>
Date:   Sat Feb 6 10:39:36 2021 -0500

    Nuevas Entidades para el formato de Brasil

[1mdiff --git a/AppMercurial/Scripts/riskmanagement/riskmanagement.js b/AppMercurial/Scripts/riskmanagement/riskmanagement.js[m
[1mindex 5118ac1..b966ed1 100644[m
[1m--- a/AppMercurial/Scripts/riskmanagement/riskmanagement.js[m
[1m+++ b/AppMercurial/Scripts/riskmanagement/riskmanagement.js[m
[36m@@ -252,11 +252,11 @@[m [mfunction getListRiskManagement(object) {[m
                     let ButtonDelete = '';[m
                     if (element.ArchivoAdjunto1 != null) {[m
                         //ButtonDownload = ' <a href="' + element.ArchivoAdjunto1.RutaArchivo + '" download="' + element.ArchivoAdjunto1.RutaArchivo + '" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-download"></i></a>'[m
[31m-                        ButtonDownload = '<a onclick="downloadFileRiskManagement(' + element.IdGestionRiesgos + ',1)" class= "btn btn-sm btn-primary active" data-id="' + element.IdGestionRiesgos + '"> <i class="fa fa-download"></i></a>'[m
[32m+[m[32m                        ButtonDownload = '<a onclick="downloadFileRiskManagementEasyPDF(' + element.IdGestionRiesgos + ')" class= "btn btn-sm btn-primary active" data-id="' + element.IdGestionRiesgos + '"> <i class="fa fa-download"></i></a>'[m
                     }[m
                     if (element.ArchivoAdjunto2 != null) {[m
                         //ButtonDownload = ' <a href="' + element.ArchivoAdjunto1.RutaArchivo + '" download="' + element.ArchivoAdjunto1.RutaArchivo + '" class= "btn btn-sm btn-primary active" data-id="' + index + '"> <i class="fa fa-download"></i></a>'[m
[31m-                        ButtonDownload2 = '<a onclick="downloadFileRiskManagement(' + element.IdGestionRiesgos + ',2)" class= "btn btn-sm btn-primary active" data-id="' + element.IdGestionRiesgos + '"> <i class="fa fa-download"></i></a>'[m
[32m+[m[32m                        ButtonDownload2 = '<a onclick="downloadFileRiskManagementPreviewing(' + element.IdGestionRiesgos + ')" class= "btn btn-sm btn-primary active" data-id="' + element.IdGestionRiesgos + '"> <i class="fa fa-download"></i></a>'[m
                     }[m
                     [m
                     if (AccessUpdate.length > 0 && AccessUpdate[0].IdAcceso == 23) {[m
[36m@@ -296,16 +296,8 @@[m [mfunction getListRiskManagement(object) {[m
 [m
 }[m
 [m
[31m-function downloadFileRiskManagement1(value) {[m
[32m+[m[32mfunction downloadFileRiskManagementEasyPDF(value) {[m
     let Object = listRiskManagement.find(x => x.IdGestionRiesgos == value);[m
[31m-    if (NumAdjunto == 1) {[m
[31m-        ruta = Object.ArchivoAdjunto1.RutaArchivo;[m
[31m-    } else if (NumAdjunto == 2) {[m
[31m-        ruta = Object.ArchivoAdjunto2.RutaArchivo;[m
[31m-    } else {[m
[31m-        console.log('No se encuentra la ruta');[m
[31m-        return;[m
[31m-    }[m
     // --[m
     let url = urlGetdownloadFile + "?ruta=" + Object.ArchivoAdjunto1.RutaArchivo;[m
     $.ajax({[m
[36m@@ -328,6 +320,30 @@[m [mfunction downloadFileRiskManagement1(value) {[m
     });[m
 }[m
 [m
[32m+[m[32mfunction downloadFileRiskManagementPreviewing(value) {[m
[32m+[m[32m    let Object = listRiskManagement.find(x => x.IdGestionRiesgos == value);[m
[32m+[m[32m    // --[m
[32m+[m[32m    let url = urlGetdownloadFile + "?ruta=" + Object.ArchivoAdjunto2.RutaArchivo;[m
[32m+[m[32m    $.ajax({[m
[32m+[m[32m        url: url,[m
[32m+[m[32m        type: 'GET',[m
[32m+[m[32m        dataType: 'json',[m
[32m+[m[32m        success: function (d) {[m
[32m+[m[32m            if (d != "" && d != null && d != undefined) {[m
[32m+[m[32m                //let sampleArr = base64ToArrayBuffer(d.DataBase);[m
[32m+[m[32m                //saveByteArray(Object.ArchivoAdjunto1.NombreArchivo, sampleArr, Object.ExtensionArchivo);[m
[32m+[m
[32m+[m[32m                //para previsualizar[m
[32m+[m[32m                let file = obtenerBlobFromBase64(d, "application/pdf");[m
[32m+[m[32m                const urlfile = URL.createObjectURL(file);[m
[32m+[m[32m                window.open(urlfile, "_blank");[m
[32m+[m[32m                //easyPDF(d, "")[m
[32m+[m[32m                //console.log('Generando PDF')[m
[32m+[m[32m            }[m
[32m+[m[32m        }[m
[32m+[m[32m    });[m
[32m+[m[32m}[m
[32m+[m
 //--[m
 function obtenerBlobFromBase64(b64Data, contentType) {[m
     const byteCharacters = atob(b64Data);[m
[1mdiff --git a/AppMercurial/Scripts/work-integrity-detail/index.js b/AppMercurial/Scripts/work-integrity-detail/index.js[m
[1mindex c721806..ecbb4ab 100644[m
[1m--- a/AppMercurial/Scripts/work-integrity-detail/index.js[m
[1m+++ b/AppMercurial/Scripts/work-integrity-detail/index.js[m
[36m@@ -201,14 +201,14 @@[m [mfunction getDetailWorkIntegrity() {[m
                         }[m
 [m
                         // --[m
[32m+[m[32m                        //openFormulary = '<a href="#" class="btn btn-primary btn-icon rounded-circle" onclick="openFormulary(' + value.IdIntegridad + ', ' + value.Item + ', ' + value.IdServicio + ', ' + value.FlgServicioGuardado + ')"><div style="width: 25px!important;height: 25px!important;"><i class="fa fa-file-alt"></i></div></a> '[m[41m[m
[32m+[m[32m                        if (acceso20 != undefined) {[m[41m[m
[32m+[m[32m                            if (acceso20.IdAcceso == 20) {[m[41m[m
[32m+[m[32m                                if (value.IdUsuarioAsignado != null && value.IdUsuarioAsignado != 0) {[m[41m[m
                         openFormulary = '<a href="#" class="btn btn-primary btn-icon rounded-circle" onclick="openFormulary(' + value.IdIntegridad + ', ' + value.Item + ', ' + value.IdServicio + ', ' + value.FlgServicioGuardado + ')"><div style="width: 25px!important;height: 25px!important;"><i class="fa fa-file-alt"></i></div></a> '[m
[31m-                        //if (acceso20 != undefined) {[m
[31m-                        //    if (acceso20.IdAcceso == 20) {[m
[31m-                        //        if (value.IdUsuarioAsignado != null && value.IdUsuarioAsignado != 0) {[m
[31m-                        //            openFormulary = '<a href="#" class="btn btn-primary btn-icon rounded-circle" onclick="openFormulary(' + value.IdIntegridad + ', ' + value.Item + ', ' + value.IdServicio + ', ' + value.FlgServicioGuardado + ')"><div style="width: 25px!important;height: 25px!important;"><i class="fa fa-file-alt"></i></div></a> '[m
[31m-                        //        }[m
[31m-                        //    }[m
[31m-                        //}[m
[32m+[m[32m                                }[m[41m[m
[32m+[m[32m                            }[m[41m[m
[32m+[m[32m                        }[m[41m[m
 [m
                         // -- [m
                         if (acceso38 != undefined) {[m
[1mdiff --git a/Mercurial.Domain.Service/RiskManagementModule/RiskManagementService.cs b/Mercurial.Domain.Service/RiskManagementModule/RiskManagementService.cs[m
[1mindex ca84fe6..c029839 100644[m
[1m--- a/Mercurial.Domain.Service/RiskManagementModule/RiskManagementService.cs[m
[1m+++ b/Mercurial.Domain.Service/RiskManagementModule/RiskManagementService.cs[m
[36m@@ -204,7 +204,7 @@[m [mnamespace Mercurial.Domain.Service.RiskManagementModule[m
             folder = Path.Combine(folder, typeFolder.ToString());[m
             if (typeFolder == TypeFolder.generated)[m
             {[m
[31m-                string FolderId = Path.Combine(folder, DateTime.Now.Year.ToString(), DateTime.Now.Month.ToString("00"));[m
[32m+[m[32m                string FolderId = Path.Combine(folder, DateTime.Now.Year.ToString(), DateTime.Now.Month.ToString("00"), DateTime.Now.Day.ToString("00"));[m
                 return (ExistFolder(FolderId)) ? FolderId : string.Empty;[m
             }[m
             else[m
[1mdiff --git a/Mercurial.DomainEntities/WorkIntegrity/Master/BasicCandidateInformation_Brasil/BasicCandidateInformation_BrasilCandidate.cs b/Mercurial.DomainEntities/WorkIntegrity/Master/BasicCandidateInformation_Brasil/BasicCandidateInformation_BrasilCandidate.cs[m
[1mnew file mode 100644[m
[1mindex 0000000..6204d24[m
[1m--- /dev/null[m
[1m+++ b/Mercurial.DomainEntities/WorkIntegrity/Master/BasicCandidateInformation_Brasil/BasicCandidateInformation_BrasilCandidate.cs[m
[36m@@ -0,0 +1,27 @@[m
[32m+[m[32m﻿using System;[m
[32m+[m[32musing System.Collections.Generic;[m
[32m+[m[32musing System.Linq;[m
[32m+[m[32musing System.Text;[m
[32m+[m[32musing System.Threading.Tasks;[m
[32m+[m
[32m+[m[32mnamespace Mercurial.DomainEntities.WorkIntegrity.Master.BasicCandidateInformation_Brasil[m
[32m+[m[32m{[m
[32m+[m[32m    public class BasicCandidateInformation_BrasilCandidate[m
[32m+[m[32m    {[m
[32m+[m[32m        public long IdInfoBasicaCand { get; set; }[m
[32m+[m[32m        public long IdIntegridad { get; set; }[m
[32m+[m[32m        public int ItemIntegridadDet { get; set; }[m
[32m+[m[32m        public string NombresApellidos { get; set; }[m
[32m+[m[32m        public string NumDocIdentidad { get; set; }[m
[32m+[m[32m        public string Direccion { get; set; }[m
[32m+[m[32m        public string CiudadNacimiento { get; set; }[m
[32m+[m[32m        public string Nacionalidad { get; set; }[m
[32m+[m[32m        public DateTime FechaNacimiento { get; set; }[m
[32m+[m[32m        public int IdSignoZodiaco { get; set; }[m
[32m+[m[32m        public string Sexo { get; set; }[m
[32m+[m[32m        public int Edad { get; set; }[m
[32m+[m[32m        public string IdEstadoCivil { get; set; }[m
[32m+[m[32m        public string Telefono { get; set; }[m
[32m+[m[32m        public string Email { get; set; }[m
[32m+[m[32m    }[m
[32m+[m[32m}[m
[1mdiff --git a/Mercurial.DomainEntities/WorkIntegrity/Master/FederalRegionalCourts/FederalRegionalCourtsCandidate.cs b/Mercurial.DomainEntities/WorkIntegrity/Master/FederalRegionalCourts/FederalRegionalCourtsCandidate.cs[m
[1mnew file mode 100644[m
[1mindex 0000000..ad95e1e[m
[1m--- /dev/null[m
[1m+++ b/Mercurial.DomainEntities/WorkIntegrity/Master/FederalRegionalCourts/FederalRegionalCourtsCandidate.cs[m
[36m@@ -0,0 +1,21 @@[m
[32m+[m[32m﻿using System;[m
[32m+[m[32musing System.Collections.Generic;[m
[32m+[m[32musing System.Linq;[m
[32m+[m[32musing System.Text;[m
[32m+[m[32musing System.Threading.Tasks;[m
[32m+[m
[32m+[m[32mnamespace Mercurial.DomainEntities.WorkIntegrity.Master.FederalRegionalCourts[m
[32m+[m[32m{[m
[32m+[m[32m    public class FederalRegionalCourtsCandidate[m
[32m+[m[32m    {[m
[32m+[m[32m        public long IdTribunalFederalRegional { get; set; }[m
[32m+[m[32m        public long IdIntegridad { get; set; }[m
[32m+[m[32m        public int ItemIntegridadDet { get; set; }[m
[32m+[m[32m        public string AccionJudicial { get; set; }[m
[32m+[m[32m        public string InformePolicial { get; set; }[m
[32m+[m[32m        public string MandatoPrision { get; set; }[m
[32m+[m[32m        public string RegistroNacionalPerJuridica { get; set; }[m
[32m+[m[32m        public string PersonaExpuestaPoliticamente { get; set; }[m
[32m+[m[32m        public string FuncionarioPublico { get; set; }[m
[32m+[m[32m    }[m
[32m+[m[32m}[m
[1mdiff --git a/Mercurial.DomainEntities/WorkIntegrity/Master/FederalRegionalCourts/FederalRegionalCourts_ResumeCandidate.cs b/Mercurial.DomainEntities/WorkIntegrity/Master/FederalRegionalCourts/FederalRegionalCourts_ResumeCandidate.cs[m
[1mnew file mode 100644[m
[1mindex 0000000..0029348[m
[1m--- /dev/null[m
[1m+++ b/Mercurial.DomainEntities/WorkIntegrity/Master/FederalRegionalCourts/FederalRegionalCourts_ResumeCandidate.cs[m
[36m@@ -0,0 +1,16 @@[m
[32m+[m[32m﻿using System;[m
[32m+[m[32musing System.Collections.Generic;[m
[32m+[m[32musing System.Linq;[m
[32m+[m[32musing System.Text;[m
[32m+[m[32musing System.Threading.Tasks;[m
[32m+[m
[32m+[m[32mnamespace Mercurial.DomainEntities.WorkIntegrity.Master.FederalRegionalCourts[m
[32m+[m[32m{[m
[32m+[m[32m    public class FederalRegionalCourts_ResumeCandidate[m
[32m+[m[32m    {[m
[32m+[m[32m        public long IdTribunalFederalRegional { get; set; }[m
[32m+[m[32m        public long IdIntegridad { get; set; }[m
[32m+[m[32m        public int ItemIntegridadDet { get; set; }[m
[32m+[m[32m        public string DesTribunalFederalRegional { get; set; }[m
[32m+[m[32m    }[m
[32m+[m[32m}[m
[1mdiff --git a/Mercurial.DomainEntities/WorkIntegrity/Master/FinancialBehavior_Brasil/FinancialBehavior_BrasilCandidate.cs b/Mercurial.DomainEntities/WorkIntegrity/Master/FinancialBehavior_Brasil/FinancialBehavior_BrasilCandidate.cs[m
[1mnew file mode 100644[m
[1mindex 0000000..c6c3fb1[m
[1m--- /dev/null[m
[1m+++ b/Mercurial.DomainEntities/WorkIntegrity/Master/FinancialBehavior_Brasil/FinancialBehavior_BrasilCandidate.cs[m
[36m@@ -0,0 +1,23 @@[m
[32m+[m[32m﻿using System;[m
[32m+[m[32musing System.Collections.Generic;[m
[32m+[m[32musing System.Linq;[m
[32m+[m[32musing System.Text;[m
[32m+[m[32musing System.Threading.Tasks;[m
[32m+[m
[32m+[m[32mnamespace Mercurial.DomainEntities.WorkIntegrity.Master.FinancialBehavior_Brasil[m
[32m+[m[32m{[m
[32m+[m[32m    public class FinancialBehavior_BrasilCandidate[m
[32m+[m[32m    {[m
[32m+[m[32m        public long IdComportamientoFinanciero { get; set; }[m
[32m+[m[32m        public long IdIntegridad { get; set; }[m
[32m+[m[32m        public int ItemIntegridadDet { get; set; }[m
[32m+[m[32m        public string RangoIngresosPresuntos { get; set; }[m
[32m+[m[32m        public string PoderAdquisitivo { get; set; }[m
[32m+[m[32m        public string RiesgoCredito { get; set; }[m
[32m+[m[32m        public string BusquedaCaptura { get; set; }[m
[32m+[m[32m        public string EjecucionDesalojo { get; set; }[m
[32m+[m[32m        public string ConsultaReembolso { get; set; }[m
[32m+[m[32m        public string RecibeAyudaGobierno { get; set; }[m
[32m+[m[32m        public string NoLlamar { get; set; }[m
[32m+[m[32m    }[m
[32m+[m[32m}[m
[1mdiff --git a/Mercurial.DomainEntities/WorkIntegrity/Master/PsychologicalTestAnalysis/PsychologicalTestAnalysisCandidate.cs b/Mercurial.DomainEntities/WorkIntegrity/Master/PsychologicalTestAnalysis/PsychologicalTestAnalysisCandidate.cs[m
[1mnew file mode 100644[m
[1mindex 0000000..87fcb02[m
[1m--- /dev/null[m
[1m+++ b/Mercurial.DomainEntities/WorkIntegrity/Master/PsychologicalTestAnalysis/PsychologicalTestAnalysisCandidate.cs[m
[36m@@ -0,0 +1,16 @@[m
[32m+[m[32m﻿using System;[m
[32m+[m[32musing System.Collections.Generic;[m
[32m+[m[32musing System.Linq;[m
[32m+[m[32musing System.Text;[m
[32m+[m[32musing System.Threading.Tasks;[m
[32m+[m
[32m+[m[32mnamespace Mercurial.DomainEntities.WorkIntegrity.Master.PsychologicalTestAnalysis[m
[32m+[m[32m{[m
[32m+[m[32m    public class PsychologicalTestAnalysisCandidate[m
[32m+[m[32m    {[m
[32m+[m[32m        public long IdAnalisisTestPsicologico { get; set; }[m
[32m+[m[32m        public long IdIntegridad { get; set; }[m
[32m+[m[32m        public int ItemIntegridadDet { get; set; }[m
[32m+[m[32m        public string DesAnalisisTestPsicologico { get; set; }[m
[32m+[m[32m    }[m
[32m+[m[32m}[m
[1mdiff --git a/Mercurial.DomainEntities/WorkIntegrity/Master/RegistrationData/RegistrationDataCandidate.cs b/Mercurial.DomainEntities/WorkIntegrity/Master/RegistrationData/RegistrationDataCandidate.cs[m
[1mnew file mode 100644[m
[1mindex 0000000..e79f409[m
[1m--- /dev/null[m
[1m+++ b/Mercurial.DomainEntities/WorkIntegrity/Master/RegistrationData/RegistrationDataCandidate.cs[m
[36m@@ -0,0 +1,25 @@[m
[32m+[m[32m﻿using System;[m
[32m+[m[32musing System.Collections.Generic;[m
[32m+[m[32musing System.Linq;[m
[32m+[m[32musing System.Text;[m
[32m+[m[32musing System.Threading.Tasks;[m
[32m+[m
[32m+[m[32mnamespace Mercurial.DomainEntities.WorkIntegrity.Master.RegistrationData[m
[32m+[m[32m{[m
[32m+[m[32m    public class RegistrationDataCandidate[m
[32m+[m[32m    {[m
[32m+[m[32m        public long IdDatosRegistro { get; set; }[m
[32m+[m[32m        public long IdIntegridad { get; set; }[m
[32m+[m[32m        public int ItemIntegridadDet { get; set; }[m
[32m+[m[32m        public string EstadoCPF { get; set; }[m
[32m+[m[32m        public string CalificacionProfesional { get; set; }[m
[32m+[m[32m        public string ActividadProfesional { get; set; }[m
[32m+[m[32m        public string GradoEscolaridad { get; set; }[m
[32m+[m[32m        public string TituloElector { get; set; }[m
[32m+[m[32m        public string PersonasHogar { get; set; }[m
[32m+[m[32m        public string Esposa { get; set; }[m
[32m+[m[32m        public string ChequesFraude { get; set; }[m
[32m+[m[32m        public string PIS { get; set; }[m
[32m+[m[32m        public string Obito { get; set; }[m
[32m+[m[32m    }[m
[32m+[m[32m}[m
[1mdiff --git a/Mercurial.DomainEntities/WorkIntegrity/Master/RegistrationData/RegistrationData_ResumeCandidate.cs b/Mercurial.DomainEntities/WorkIntegrity/Master/RegistrationData/RegistrationData_ResumeCandidate.cs[m
[1mnew file mode 100644[m
[1mindex 0000000..6e7c3c4[m
[1m--- /dev/null[m
[1m+++ b/Mercurial.DomainEntities/WorkIntegrity/Master/RegistrationData/RegistrationData_ResumeCandidate.cs[m
[36m@@ -0,0 +1,16 @@[m
[32m+[m[32m﻿using System;[m
[32m+[m[32musing System.Collections.Generic;[m
[32m+[m[32musing System.Linq;[m
[32m+[m[32musing System.Text;[m
[32m+[m[32musing System.Threading.Tasks;[m
[32m+[m
[32m+[m[32mnamespace Mercurial.DomainEntities.WorkIntegrity.Master.RegistrationData[m
[32m+[m[32m{[m
[32m+[m[32m    public class RegistrationData_ResumeCandidate[m
[32m+[m[32m    {[m
[32m+[m[32m        public long IdDatosRegistro { get; set; }[m
[32m+[m[32m        public long IdIntegridad { get; set; }[m
[32m+[m[32m        public int ItemIntegridadDet { get; set; }[m
[32m+[m[32m        public string DesDatosRegistro { get; set; }[m
[32m+[m[32m    }[m
[32m+[m[32m}[m
[1mdiff --git a/Mercurial.DomainEntities/WorkIntegrity/work270plus/MasterEntity270PlusBrasil.cs b/Mercurial.DomainEntities/WorkIntegrity/work270plus/MasterEntity270PlusBrasil.cs[m
[1mnew file mode 100644[m
[1mindex 0000000..19fa70e[m
[1m--- /dev/null[m
[1m+++ b/Mercurial.DomainEntities/WorkIntegrity/work270plus/MasterEntity270PlusBrasil.cs[m
[36m@@ -0,0 +1,35 @@[m
[32m+[m[32m﻿using Mercurial.DomainEntities.WorkIntegrity.Master;[m
[32m+[m[32musing Mercurial.DomainEntities.WorkIntegrity.Master.BasicCandidateInformation_Brasil;[m
[32m+[m[32musing Mercurial.DomainEntities.WorkIntegrity.Master.Conclusion;[m
[32m+[m[32musing Mercurial.DomainEntities.WorkIntegrity.Master.EndResult;[m
[32m+[m[32musing Mercurial.DomainEntities.WorkIntegrity.Master.FederalRegionalCourts;[m
[32m+[m[32musing Mercurial.DomainEntities.WorkIntegrity.Master.FinancialBehavior;[m
[32m+[m[32musing Mercurial.DomainEntities.WorkIntegrity.Master.FinancialBehavior_Brasil;[m
[32m+[m[32musing Mercurial.DomainEntities.WorkIntegrity.Master.PsychologicalTestAnalysis;[m
[32m+[m[32musing Mercurial.DomainEntities.WorkIntegrity.Master.RegistrationData;[m
[32m+[m[32musing Mercurial.DomainEntities.WorkIntegrity.Master.ReliabilityTest;[m
[32m+[m[32musing System;[m
[32m+[m[32musing System.Collections.Generic;[m
[32m+[m[32musing System.Linq;[m
[32m+[m[32musing System.Text;[m
[32m+[m[32musing System.Threading.Tasks;[m
[32m+[m
[32m+[m[32mnamespace Mercurial.DomainEntities.WorkIntegrity.work270plus[m
[32m+[m[32m{[m
[32m+[m[32m    public class MasterEntity270PlusBrasil[m
[32m+[m[32m    {[m
[32m+[m[32m        public BasicDatacandidate oBasicDataFlt { get; set; }[m
[32m+[m[32m        public RegistrationData_ResumeCandidate oRegistrationData_ResumeFlt { get; set; }[m
[32m+[m[32m        public FinancialBehaviorCandidate oFinancialBehaviorFlt { get; set; }[m
[32m+[m[32m        public FederalRegionalCourts_ResumeCandidate oFederalRegionalCourts_ResumeFlt { get; set; }[m
[32m+[m[32m        public PsychologicalTestAnalysisCandidate oPsychologicalTestAnalysisFlt { get; set; }[m
[32m+[m[32m        public ConclusionCandidate oConclusionFlt { get; set; }[m
[32m+[m[32m        public EndResultCandidate oEndResultFlt { get; set; }[m
[32m+[m
[32m+[m[32m        public BasicCandidateInformation_BrasilCandidate oBasicCandidateInformation_BrasilFlt { get; set; }[m
[32m+[m[32m        public RegistrationDataCandidate oRegistrationDataFlt { get; set; }[m
[32m+[m[32m        public FinancialBehavior_BrasilCandidate oFinancialBehavior_BrasilFlt { get; set; }[m
[32m+[m[32m        public FederalRegionalCourtsCandidate oFederalRegionalCourtsFlt { get; set; }[m
[32m+[m[32m        public ReliabilityTestCandidate oReliabilityTestFlt { get; set; }[m
[32m+[m[32m    }[m
[32m+[m[32m}[m
