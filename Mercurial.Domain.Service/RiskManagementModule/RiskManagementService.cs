using Mercurial.CrossCuting.Utilities;
using Mercurial.Domain.Interfaces.RiskManagementModule;
using Mercurial.Domain.Service.HomeModule;
using Mercurial.DomainEntities;
using Mercurial.DomainEntities.RiskManagement.FLT;
using Mercurial.DomainEntities.RiskManagement.RSL;
using Mercurial.DomainEntities.RiskManagement.VM;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Web;
using static Mercurial.CrossCuting.Utilities.Template.TemplateEnum;

namespace Mercurial.Domain.Service.RiskManagementModule
{
    public class RiskManagementService: IRiskManagementService
    {
        private readonly string _ServicePrefix = "api/";
        private readonly string _UrlService;
        private LoginService _LoginService;

        public RiskManagementService()
        {
            _LoginService = new LoginService();
            _UrlService = System.Configuration.ConfigurationManager.AppSettings["ServiceMercurial"].ToString();
        }

        public ApiResponse SaveRiskManagement(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response;

            try
            {
                int IdUsuario = Int32.Parse(SessionHelper.GetUser().ToString());
                SaveRiskManagementFlt saveEntity = JsonConvert.DeserializeObject<SaveRiskManagementFlt>(stringJson);
                saveEntity.IdUsuarioEnvio = IdUsuario;
                
                if (files != null)
                {
                    string folder = Settings.GetKey(Settings.KEY.GestionRiesgos);
                    string FolderGenerate = CreateFolder(TypeFolder.generated, folder);
                    foreach(var archivos in files)
                    {
                        if (saveEntity != null && saveEntity.ArchivoAdjunto1 != null && saveEntity.ArchivoAdjunto1.NombreArchivo.Equals(archivos.FileName))
                        {
                            string routeFile = saveEntity.ArchivoAdjunto1.RutaArchivo;
                            if (string.IsNullOrEmpty(routeFile))
                            {
                                routeFile = string.Format("{0}\\{1}_{2}", FolderGenerate, DateTime.Now.ToString("HH:mm:ss").Replace(':', '_'), archivos.FileName);
                            }
                            saveEntity.ArchivoAdjunto1.RutaArchivo = routeFile;
                            saveEntity.ArchivoAdjunto1.IdUsuarioRegistro = IdUsuario;
                            if (File.Exists(saveEntity.ArchivoAdjunto1.RutaArchivo)) File.Delete(saveEntity.ArchivoAdjunto1.RutaArchivo);
                            archivos.SaveAs(routeFile);
                        }

                        if (saveEntity != null && saveEntity.ArchivoAdjunto2 != null && saveEntity.ArchivoAdjunto2.NombreArchivo.Equals(archivos.FileName))
                        {
                            string routeFile = saveEntity.ArchivoAdjunto2.RutaArchivo;
                            if (string.IsNullOrEmpty(routeFile))
                            {
                                routeFile = string.Format("{0}\\{1}_{2}", FolderGenerate, DateTime.Now.ToString("HH:mm:ss").Replace(':', '_'), archivos.FileName);
                            }
                            saveEntity.ArchivoAdjunto2.RutaArchivo = routeFile;
                            saveEntity.ArchivoAdjunto2.IdUsuarioRegistro = IdUsuario;
                            if (File.Exists(saveEntity.ArchivoAdjunto2.RutaArchivo)) File.Delete(saveEntity.ArchivoAdjunto2.RutaArchivo);
                            archivos.SaveAs(routeFile);
                        }
                    }
                }

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlSaveRiskManagement),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = new ApiResponse("Error", ex.Message);
            }
            return response;
        }

        public ApiResponse UpdateStatusRiskManagement(long IdGestionRiesgos, bool FlgEstado)
        {
            ApiResponse response;

            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlUpdateStatusRiskManagement, IdGestionRiesgos, FlgEstado),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public List<RiskManagementVm> GetListRiskManagement(string FechaInicio, string FechaFin, int? IdTipoAlerta)
        {
            List<RiskManagementVm> request = new List<RiskManagementVm>();
            ApiResponse apiResponse;
            try
            {
                int? IdEmpresa;
                //int IdRol = Int32.Parse(SessionHelper.GetValueSession(Settings.Session.IdRol).ToString());
                //if (IdRol != 1 && IdRol != 2 && IdRol != 4)
                //{
                //    IdEmpresa = Int32.Parse(SessionHelper.GetValueSession(Settings.Session.IdEmpresa).ToString());
                //}
                IdEmpresa = Int32.Parse(SessionHelper.GetValueSession(Settings.Session.IdEmpresa).ToString());
                int? IdSucursal = Common.checkIntNull(SessionHelper.GetValueSession(Settings.Session.IdSucursal).ToString());
                int IdUsuario = SessionHelper.GetUser();
                if (IdTipoAlerta == 0)
                {
                    IdTipoAlerta = null;
                }
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlGetListRiskManagement, FechaInicio, FechaFin, IdUsuario, IdEmpresa, IdSucursal, IdTipoAlerta),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<List<RiskManagementVm>>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                request = null;
            }
            return request;
        }

        public List<TypeAlertRiskManagementRsl> GetTypeAlertRiskManagement()
        {
            List<TypeAlertRiskManagementRsl> request = new List<TypeAlertRiskManagementRsl>();
            ApiResponse apiResponse;
            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlGetTypeAlertRiskManagement),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<List<TypeAlertRiskManagementRsl>>(
                               apiResponse.data.ToString(),
                               new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                }
            }
            catch (Exception ex)
            {
                request = null;
            }
            return request;
        }

        private bool ExistFolder(string path)
        {
            try
            {
                if (!Directory.Exists(path)) Directory.CreateDirectory(path);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        private string CreateFolder(TypeFolder typeFolder, string folder)
        {
            folder = Path.Combine(folder, typeFolder.ToString());
            if (typeFolder == TypeFolder.generated)
            {
                string FolderId = Path.Combine(folder, DateTime.Now.Year.ToString(), DateTime.Now.Month.ToString("00"), DateTime.Now.Day.ToString("00"));
                return (ExistFolder(FolderId)) ? FolderId : string.Empty;
            }
            else
            {
                return folder;
            }
        }



    }
}
