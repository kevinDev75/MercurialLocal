using Mercurial.CrossCuting.Utilities;
using Mercurial.Domain.Interfaces.SafetyModule;
using Mercurial.Domain.Service.HomeModule;
using Mercurial.DomainEntities;
using Mercurial.DomainEntities.Cibersecurity.FLT;
using Mercurial.DomainEntities.InterestInformation.FLT;
using Mercurial.DomainEntities.InterestInformation.RSL;
using Mercurial.DomainEntities.SafetySecurity.FLT;
using Mercurial.DomainEntities.SafetySecurity.VM;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using static Mercurial.CrossCuting.Utilities.Template.TemplateEnum;

namespace Mercurial.Domain.Service.SafetyModule
{
    public class SafeService : ISafeService
    {
        private readonly string _ServicePrefix = "api/";
        private readonly string _UrlService;
        private LoginService _LoginService;

        public SafeService()
        {
            _LoginService = new LoginService();
            _UrlService = System.Configuration.ConfigurationManager.AppSettings["ServiceMercurial"].ToString();
        }

        public ApiResponse SaveElectronicScanning(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response;

            try
            {
                int IdUsuario = Int32.Parse(SessionHelper.GetUser().ToString());
                SaveElectronicScanningFlt saveEntity = JsonConvert.DeserializeObject<SaveElectronicScanningFlt>(stringJson);
                saveEntity.IdUsuarioEnvio = IdUsuario;
                string folder = Settings.GetKey(Settings.KEY.BarridoElectronico);
                string FolderGenerate = CreateFolder(TypeFolder.generated, folder);
                foreach (var archivos in files)
                {
                    string routeFile = string.Format("{0}\\{1}_{2}", FolderGenerate, DateTime.Now.ToString("HH:mm:ss").Replace(':', '_'), archivos.FileName);
                    if (File.Exists(routeFile)) File.Delete(routeFile);
                    archivos.SaveAs(routeFile);

                    if (saveEntity != null && saveEntity.ArchivoAdjunto1 != null)
                    {
                        saveEntity.ArchivoAdjunto1.RutaArchivo = routeFile;
                        saveEntity.ArchivoAdjunto1.IdUsuarioRegistro = IdUsuario;
                    }

                }

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlSaveElectronicScanning),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = new ApiResponse("Error", ex.Message);
            }
            return response;
        }

        public ApiResponse UpdateStatusElectronicScanning(long IdBarridoElectronico, bool FlgEstado)
        {
            ApiResponse response;

            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlUpdateStatusElectronicScanning, IdBarridoElectronico, FlgEstado),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public List<ElectronicScanningVm> GetListElectronicScanning(string FechaInicio, string FechaFin)
        {
            List<ElectronicScanningVm> request = new List<ElectronicScanningVm>();
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
                    string.Format(UrlService.UrlGetListElectronicScanning, FechaInicio, FechaFin, IdEmpresa),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<List<ElectronicScanningVm>>(
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

        public ApiResponse SaveAssetSecurity(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response;

            try
            {
                int IdUsuario = Int32.Parse(SessionHelper.GetUser().ToString());
                SaveAssetSecurityFlt saveEntity = JsonConvert.DeserializeObject<SaveAssetSecurityFlt>(stringJson);
                saveEntity.IdUsuarioEnvio = IdUsuario;
                string folder = Settings.GetKey(Settings.KEY.SeguridadPatrimonial);
                string FolderGenerate = CreateFolder(TypeFolder.generated, folder);
                foreach (var archivos in files)
                {
                    string routeFile = string.Format("{0}\\{1}_{2}", FolderGenerate, DateTime.Now.ToString("HH:mm:ss").Replace(':', '_'), archivos.FileName);
                    if (File.Exists(routeFile)) File.Delete(routeFile);
                    archivos.SaveAs(routeFile);

                    if (saveEntity != null && saveEntity.ArchivoAdjunto1 != null)
                    {
                        saveEntity.ArchivoAdjunto1.RutaArchivo = routeFile;
                        saveEntity.ArchivoAdjunto1.IdUsuarioRegistro = IdUsuario;
                    }

                }

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlSaveAssetSecurity),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = new ApiResponse("Error", ex.Message);
            }
            return response;
        }

        public ApiResponse UpdateStatusAssetSecurity(long IdSeguridadPatrimonial, bool FlgEstado)
        {
            ApiResponse response;

            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlUpdateStatusAssetSecurity, IdSeguridadPatrimonial, FlgEstado),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public List<AssetSecurityVm> GetListAssetSecurity(string FechaInicio, string FechaFin)
        {
            List<AssetSecurityVm> request = new List<AssetSecurityVm>();
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
                    string.Format(UrlService.UrlGetListAssetSecurity, FechaInicio, FechaFin, IdEmpresa),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<List<AssetSecurityVm>>(
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

        public ApiResponse SaveCorporateInvestigations(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response;

            try
            {
                int IdUsuario = Int32.Parse(SessionHelper.GetUser().ToString());
                SaveCorporateInvestigationsFlt saveEntity = JsonConvert.DeserializeObject<SaveCorporateInvestigationsFlt>(stringJson);
                saveEntity.IdUsuarioEnvio = IdUsuario;
                string folder = Settings.GetKey(Settings.KEY.InvestigacionesCorporativas);
                string FolderGenerate = CreateFolder(TypeFolder.generated, folder);
                foreach (var archivos in files)
                {
                    string routeFile = string.Format("{0}\\{1}_{2}", FolderGenerate, DateTime.Now.ToString("HH:mm:ss").Replace(':', '_'), archivos.FileName);
                    if (File.Exists(routeFile)) File.Delete(routeFile);
                    archivos.SaveAs(routeFile);

                    if (saveEntity != null && saveEntity.ArchivoAdjunto1 != null)
                    {
                        saveEntity.ArchivoAdjunto1.RutaArchivo = routeFile;
                        saveEntity.ArchivoAdjunto1.IdUsuarioRegistro = IdUsuario;
                    }

                }

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlSaveCorporateInvestigations),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = new ApiResponse("Error", ex.Message);
            }
            return response;
        }

        public ApiResponse UpdateStatusCorporateInvestigations(long IdInvestigacionCorporativa, bool FlgEstado)
        {
            ApiResponse response;

            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlUpdateStatusCorporateInvestigations, IdInvestigacionCorporativa, FlgEstado),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public List<CorporateInvestigationsVm> GetListCorporateInvestigations(string FechaInicio, string FechaFin)
        {
            List<CorporateInvestigationsVm> request = new List<CorporateInvestigationsVm>();
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
                    string.Format(UrlService.UrlGetListCorporateInvestigations, FechaInicio, FechaFin, IdEmpresa),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<List<CorporateInvestigationsVm>>(
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

        public ApiResponse SaveInternalStaff(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response;

            try
            {
                int IdUsuario = Int32.Parse(SessionHelper.GetUser().ToString());
                SaveInternalStaffFlt saveEntity = JsonConvert.DeserializeObject<SaveInternalStaffFlt>(stringJson);
                saveEntity.IdUsuarioEnvio = IdUsuario;
                string folder = Settings.GetKey(Settings.KEY.PersonalInterno);
                string FolderGenerate = CreateFolder(TypeFolder.generated, folder);
                foreach (var archivos in files)
                {
                    string routeFile = string.Format("{0}\\{1}_{2}", FolderGenerate, DateTime.Now.ToString("HH:mm:ss").Replace(':', '_'), archivos.FileName);
                    if (File.Exists(routeFile)) File.Delete(routeFile);
                    archivos.SaveAs(routeFile);

                    if (saveEntity != null && saveEntity.ArchivoAdjunto1 != null)
                    {
                        saveEntity.ArchivoAdjunto1.RutaArchivo = routeFile;
                        saveEntity.ArchivoAdjunto1.IdUsuarioRegistro = IdUsuario;
                    }

                }

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlSaveInternalStaff),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = new ApiResponse("Error", ex.Message);
            }
            return response;
        }

        public ApiResponse UpdateStatusInternalStaff(long IdPersInternoInfo, bool FlgEstado)
        {
            ApiResponse response;

            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlUpdateStatusInternalStaff, IdPersInternoInfo, FlgEstado),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public List<InternalStaffVm> GetListInternalStaff(string FechaInicio, string FechaFin, string TipoReporte)
        {
            List<InternalStaffVm> request = new List<InternalStaffVm>();
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
                    string.Format(UrlService.UrlGetListInternalStaff, FechaInicio, FechaFin, IdEmpresa, TipoReporte),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<List<InternalStaffVm>>(
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

        public ApiResponse SavePhysicalSecurity(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response;

            try
            {
                int IdUsuario = Int32.Parse(SessionHelper.GetUser().ToString());
                SavePhysicalSecurityFlt saveEntity = JsonConvert.DeserializeObject<SavePhysicalSecurityFlt>(stringJson);
                saveEntity.IdUsuarioEnvio = IdUsuario;
                string folder = Settings.GetKey(Settings.KEY.SeguridadFisica);
                string FolderGenerate = CreateFolder(TypeFolder.generated, folder);
                foreach (var archivos in files)
                {
                    string routeFile = string.Format("{0}\\{1}_{2}", FolderGenerate, DateTime.Now.ToString("HH:mm:ss").Replace(':', '_'), archivos.FileName);
                    if (File.Exists(routeFile)) File.Delete(routeFile);
                    archivos.SaveAs(routeFile);

                    if (saveEntity != null && saveEntity.ArchivoAdjunto1 != null)
                    {
                        saveEntity.ArchivoAdjunto1.RutaArchivo = routeFile;
                        saveEntity.ArchivoAdjunto1.IdUsuarioRegistro = IdUsuario;
                    }

                }

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlSavePhysicalSecurity),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = new ApiResponse("Error", ex.Message);
            }
            return response;
        }

        public ApiResponse UpdateStatusPhysicalSecurity(long IdSeguridadFisica, bool FlgEstado)
        {
            ApiResponse response;

            try
            {
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlUpdateStatusPhysicalSecurity, IdSeguridadFisica, FlgEstado),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = null;
            }
            return response;
        }

        public List<PhysicalSecurityVm> GetListPhysicalSecurity(string FechaInicio, string FechaFin)
        {
            List<PhysicalSecurityVm> request = new List<PhysicalSecurityVm>();
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
                    string.Format(UrlService.UrlGetListPhysicalSecurity, FechaInicio, FechaFin, IdEmpresa),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<List<PhysicalSecurityVm>>(
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

        public ApiResponse SaveInterestInformation(string stringJson, List<HttpPostedFile> files)
        {
            ApiResponse response;

            try
            {
                int IdUsuario = Int32.Parse(SessionHelper.GetUser().ToString());
                var IdEmpresa = int.Parse(SessionHelper.GetValueSession(Settings.Session.IdEmpresa).ToString());
                SaveInterestInformationFlt saveEntity = JsonConvert.DeserializeObject<SaveInterestInformationFlt>(stringJson);
                saveEntity.IdUsuarioRegistro = IdUsuario;
                saveEntity.IdEmpresa = IdEmpresa;
                string folder = Settings.GetKey(Settings.KEY.InformacionInteres);
                string FolderGenerate = CreateFolder(TypeFolder.generated, folder);
                foreach (var archivos in files)
                {
                    string routeFile = string.Format("{0}\\{1}_{2}", FolderGenerate, DateTime.Now.ToString("HH:mm:ss").Replace(':', '_'), archivos.FileName);
                    if (File.Exists(routeFile)) File.Delete(routeFile);
                    archivos.SaveAs(routeFile);
                    saveEntity.RutaArchivo = routeFile;
                }

                var _JsonRequest = JsonConvert.SerializeObject(saveEntity, Formatting.Indented);
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.POST,
                    _JsonRequest,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlSaveInterestInformation),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = new ApiResponse("Error", ex.Message);
            }
            return response;
        }

        public ApiResponse UpdateStatusInterestInformation(long IdInfoInteres, bool Flg_Estado)
        {
            ApiResponse response;

            try
            {
                
                var _response = ConsumeService.ConsumirAPIConToken(
                    Enums.Method.GET,
                    string.Empty,
                    _UrlService,
                    _ServicePrefix,
                    String.Format(UrlService.UrlUpdateStatusInterestInformation, IdInfoInteres, Flg_Estado),
                    _LoginService.GetToken());

                response = JsonConvert.DeserializeObject<ApiResponse>(_response);

            }
            catch (Exception ex)
            {
                response = new ApiResponse("Error", ex.Message);
            }
            return response;
        }

        public List<InterestInformationRsl> GetListInterestInformation(string FechaInicio, string FechaFin)
        {
            List<InterestInformationRsl> request = new List<InterestInformationRsl>();
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
                    string.Format(UrlService.UrlGetListInterestInformation, FechaInicio, FechaFin, IdEmpresa),
                    _LoginService.GetToken());

                apiResponse = JsonConvert.DeserializeObject<ApiResponse>(_response);

                if (apiResponse != null && apiResponse.status.Equals("OK"))
                {
                    request = JsonConvert.DeserializeObject<List<InterestInformationRsl>>(
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
                //string FolderId = Path.Combine(folder, DateTime.Now.Year.ToString(), DateTime.Now.Month.ToString("00"));
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
