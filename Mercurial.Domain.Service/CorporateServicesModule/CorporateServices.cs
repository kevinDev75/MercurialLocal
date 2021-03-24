using Mercurial.CrossCuting.Utilities;
using Mercurial.Domain.Interfaces.CorporateServicesModule;
using Mercurial.Domain.Service.HomeModule;
using Mercurial.DomainEntities;
using Mercurial.DomainEntities.CorporateServices.FLT;
using Mercurial.DomainEntities.CorporateServices.VM;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Web;
using static Mercurial.CrossCuting.Utilities.Template.TemplateEnum;

namespace Mercurial.Domain.Service.CorporateServicesModule
{
    public class CorporateServices : ICorporateServices
    {
        private readonly string _ServicePrefix = "api/";
        private readonly string _UrlService;
        private LoginService _LoginService;

        public CorporateServices()
        {
            _LoginService = new LoginService();
            _UrlService = System.Configuration.ConfigurationManager.AppSettings["ServiceMercurial"].ToString();
        }

        public ApiResponse SaveCorporateRiskManagement(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response;

            try
            {
                int IdUsuario = Int32.Parse(SessionHelper.GetUser().ToString());
                //int IdEmpresa = Int32.Parse(SessionHelper.GetValueSession(Settings.Session.IdEmpresa).ToString());
                SaveCorporateRiskManagementFlt saveEntity = JsonConvert.DeserializeObject<SaveCorporateRiskManagementFlt>(stringJson);
                saveEntity.IdUsuarioEnvio = IdUsuario;
                //saveEntity.IdEmpresa = IdEmpresa;

                string folder = Settings.GetKey(Settings.KEY.GestionCorporativaRiesgos);
                string FolderGenerate = CreateFolder(TypeFolder.generated, folder);
                foreach (var archivos in files)
                {
                    string routeFile = string.Format("{0}\\{1}_{2}", FolderGenerate, DateTime.Now.ToString("HH:mm:ss").Replace(':', '_'), archivos.FileName);
                    if (File.Exists(routeFile)) File.Delete(routeFile);
                    archivos.SaveAs(routeFile);

                    if (saveEntity != null && saveEntity.ArchivoAdjunto != null)
                    {
                        saveEntity.ArchivoAdjunto.RutaArchivo = routeFile;
                        saveEntity.ArchivoAdjunto.IdUsuarioRegistro = IdUsuario;
                    }

                }

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlSaveCorporateRiskManagement),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = new ApiResponse("Error", ex.Message);
            }
            return response;
        }

        public ApiResponse UpdateStatusCorporateManagement(long IdGestionCorporativaRiesgo, bool FlgEstado)
        {
            ApiResponse response;

            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlUpdateStatusCorporateManagement, IdGestionCorporativaRiesgo, FlgEstado),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public List<CorporateRiskManagementVm> GetListCorporateRiskManagement(string FechaInicio, string FechaFin)
        {
            List<CorporateRiskManagementVm> request = new List<CorporateRiskManagementVm>();
            ApiResponse apiResponse;
            try
            {
                int? IdEmpresa = null;
                int IdRol = Int32.Parse(SessionHelper.GetValueSession(Settings.Session.IdRol).ToString());
                if (IdRol != 1 && IdRol != 2 && IdRol != 4)
                {
                    IdEmpresa = Int32.Parse(SessionHelper.GetValueSession(Settings.Session.IdEmpresa).ToString());
                }
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlGetListCorporateRiskManagement, FechaInicio, FechaFin, IdEmpresa),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<List<CorporateRiskManagementVm>>(
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

        public ApiResponse SaveSectoralMaps(string stringJson)
        {
            ApiResponse response;

            try
            {
                int IdUsuario = Int32.Parse(SessionHelper.GetUser().ToString());
                //int IdEmpresa = Int32.Parse(SessionHelper.GetValueSession(Settings.Session.IdEmpresa).ToString());
                SectoralMapsFlt saveEntity = JsonConvert.DeserializeObject<SectoralMapsFlt>(stringJson);
                saveEntity.IdUsuarioEnvio = IdUsuario;
                //saveEntity.IdEmpresa = IdEmpresa;

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlSaveSectoralMaps),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = new ApiResponse("Error", ex.Message);
            }
            return response;
        }

        public List<SectoralMapsVm> GetListSectoralMaps(string FechaInicio, string FechaFin)
        {
            List<SectoralMapsVm> request = new List<SectoralMapsVm>();
            ApiResponse apiResponse;
            try
            {
                int? IdEmpresa = null;
                int IdRol = Int32.Parse(SessionHelper.GetValueSession(Settings.Session.IdRol).ToString());
                if (IdRol != 1 && IdRol != 2 && IdRol != 4)
                {
                    IdEmpresa = Int32.Parse(SessionHelper.GetValueSession(Settings.Session.IdEmpresa).ToString());
                }
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    string.Format(UrlService.UrlGetListSectoralMaps, FechaInicio, FechaFin, IdEmpresa),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<List<SectoralMapsVm>>(
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

        public ApiResponse UpdateStatusSectoralMaps(long IdMapaSectorial, bool FlgEstado)
        {
            ApiResponse response;

            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlUpdateStatusSectoralMaps, IdMapaSectorial, FlgEstado),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        private string CreateFolder(TypeFolder typeFolder, string folder)
        {
            folder = Path.Combine(folder, typeFolder.ToString());
            if (typeFolder == TypeFolder.generated)
            {
                //string FolderId = Path.Combine(folder, DateTime.Now.Year.ToString(), DateTime.Now.Month.ToString("00"));
                string FolderId = Path.Combine(folder, DateTime.Now.Year.ToString(), DateTime.Now.Month.ToString("00"), DateTime.Now.Day.ToString("00"));
                return (ExistFolder(FolderId)) ? FolderId : string.Empty;
            }
            else
            {
                return folder;
            }
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


    }
}
