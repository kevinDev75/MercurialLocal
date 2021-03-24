using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.CrossCuting.Utilities
{
    public sealed class Constant
    {
        // --
        public const string success_insert = "Registro almacenado en el sistema con exito";
        public const string error_insert = "No fue posible guardar el registro ingresado, verificar";
        // --
        public const string success_select = "Retornando lista de registros encontrados";
        public const string error_select = "No se encontraron registros en el sistema";
        // --
        public const string success_update = "Edicion del registro exitosa";
        public const string error_update = "No fue posible editar el registro seleccionado, verificar";
        // --
        public const string success_delete = "Registro eliminado con exito del sistema";
        public const string error_delete = "No fue posible eliminar el registro seleccionado, verificar";
        // --
        public const string error_server = "Error en el servidor";
    }
    public sealed class UrlService
    {
        public const string UrlAuthenticate = "Login/Authenticate";
        public const string UrlGetRol = "User/GetAccessMenu";
        public const string UrlGetAccess = "User/GetAccess?IdRol={0}";

        public const string UrlGetIdUserxEmail = "Login/getIdUserxEmail";
        public const string UrlSendCodeRecover = "Login/updateCodeLogin";
        public const string UrlGetCodexIdUsuario = "Login/getCodeLogin?IdUsuario={0}";
        public const string UrlUpdatePassword = "Login/UpdatePassword";




        public const string UrlGetTextControlls = "WorkIntegrity/GetTextControls";
        public const string UrlGetDocumentType = "WorkIntegrity/GetDocumentType?IdPais={0}";
        public const string UrlGetZodiacSign = "User/GetZodiacSign?IdPais={0}";
        public const string UrlGetDocumentType2 = "User/GetDocumentType?IdPais={0}&Opcion={1}";
        public const string UrlGetWorkIntegrity = "WorkIntegrity/GetServices?IdPais={0}";
        public const string UrlGetPayMenthod = "WorkIntegrity/GetPayMentMethod?IdPais={0}";
        public const string UrlGetBranchOffices = "Company/GetBranchOffices?IdEmpresa={0}";
        public const string UrlSaveWorkIntegrity = "WorkIntegrity/SaveWorkIntegrity";
        public const string UrlGetListWorkIntegrity = "WorkIntegrity/GetRequests";
        public const string UrlGetListStatus = "WorkIntegrity/GetStatus?IdPais={0}";
        public const string UrlGetListWorkIntegrityDetail = "WorkIntegrity/GetListWorkIntegrityDetail?IdIntegridad={0}";
        public const string UrlGetWorkIntegrity2 = "WorkIntegrity/GetWorkIntegrity?IdIntegridad={0}";
        public const string UrlGetValidateWorkIntegrity = "WorkIntegrity/GetValidateWorkIntegrityDetail";
        public const string SaveRiskAnalysisFormatBasicPeru = "WorkIntegrity/SaveRiskAnalysisFormatBasicPeru";
        public const string UrlgetRiskAnaysisFormatBasicPeru = "WorkIntegrity/GetRiskAnalysisFormatBasicPeru?IdIntegridad={0}&ItemIntegridadDet={1}";
        public const string SaveRiskAnalysisFormat90Peru = "WorkIntegrity/SaveRiskAnalysisFormat90Peru";
        public const string UrlgetRiskAnaysisFormat90Peru = "WorkIntegrity/GetRiskAnalysisFormat90Peru?IdIntegridad={0}&ItemIntegridadDet={1}";
        public const string SaveRiskAnalysisFormat90PlusPeru = "WorkIntegrity/SaveRiskAnalysisFormat90PlusPeru";
        public const string UrlgetRiskAnaysisFormat90PlusPeru = "WorkIntegrity/GetRiskAnalysisFormat90PlusPeru?IdIntegridad={0}&ItemIntegridadDet={1}";
        public const string SaveRiskAnalysisFormat180Peru = "WorkIntegrity/SaveRiskAnalysisFormat180Peru";
        public const string UrlgetRiskAnaysisFormat180Peru = "WorkIntegrity/GetRiskAnalysisFormat180Peru?IdIntegridad={0}&ItemIntegridadDet={1}";
        public const string SaveRiskAnalysisFormat180PlusPeru = "WorkIntegrity/SaveRiskAnalysisFormat180PlusPeru";
        public const string UrlgetRiskAnaysisFormat180PlusPeru = "WorkIntegrity/GetRiskAnalysisFormat180PlusPeru?IdIntegridad={0}&ItemIntegridadDet={1}";
        public const string SaveRiskAnalysisFormat270Peru = "WorkIntegrity/SaveRiskAnalysisFormat270Peru";
        public const string UrlgetRiskAnaysisFormat270Peru = "WorkIntegrity/GetRiskAnalysisFormat270Peru?IdIntegridad={0}&ItemIntegridadDet={1}";
        public const string SaveRiskAnalysisFormat270PlusPeru = "WorkIntegrity/SaveRiskAnalysisFormat270PlusPeru";
        public const string UrlgetRiskAnaysisFormat270PlusPeru = "WorkIntegrity/GetRiskAnalysisFormat270PlusPeru?IdIntegridad={0}&ItemIntegridadDet={1}";
        public const string SaveRiskAnalysisFormat360Peru = "WorkIntegrity/SaveRiskAnalysisFormat360Peru";
        public const string UrlgetRiskAnaysisFormat360Peru = "WorkIntegrity/GetRiskAnalysisFormat360Peru?IdIntegridad={0}&ItemIntegridadDet={1}";
        public const string SaveRiskAnalysisFormat360PlusPeru = "WorkIntegrity/SaveRiskAnalysisFormat360PlusPeru";
        public const string UrlgetRiskAnaysisFormat360PlusPeru = "WorkIntegrity/GetRiskAnalysisFormat360PlusPeru?IdIntegridad={0}&ItemIntegridadDet={1}";
        public const string SaveFormatPolygraphPeru = "WorkIntegrity/SaveFormatPolygraphPeru";
        public const string UrlgetFormatPolygraphPeru = "WorkIntegrity/GetFormatPolygraphPeru?IdIntegridad={0}&ItemIntegridadDet={1}";
        public const string UrlGetStatusCivil = "User/GetCivilStatus?IdPais={0}";
        public const string SaveRiskAnalysisFormat180Colombia = "WorkIntegrity/SaveRiskAnalysisFormat180Colombia";
        public const string UrlgetRiskAnaysisFormat180Colombia = "WorkIntegrity/GetRiskAnalysisFormat180Colombia?IdIntegridad={0}&ItemIntegridadDet={1}";
        public const string SaveRiskAnalysisFormat180PlusColombia = "WorkIntegrity/SaveRiskAnalysisFormat180PlusColombia";
        public const string UrlgetRiskAnaysisFormat180PlusColombia = "WorkIntegrity/GetRiskAnalysisFormat180PlusColombia?IdIntegridad={0}&ItemIntegridadDet={1}";
        public const string SaveRiskAnalysisFormat270Colombia = "WorkIntegrity/SaveRiskAnalysisFormat270Colombia";
        public const string UrlgetRiskAnaysisFormat270Colombia = "WorkIntegrity/GetRiskAnalysisFormat270Colombia?IdIntegridad={0}&ItemIntegridadDet={1}";
        public const string SaveRiskAnalysisFormat270PlusColombia = "WorkIntegrity/SaveRiskAnalysisFormat270PlusColombia";
        public const string UrlgetRiskAnaysisFormat270PlusColombia = "WorkIntegrity/GetRiskAnalysisFormat270PlusColombia?IdIntegridad={0}&ItemIntegridadDet={1}";
        public const string SaveRiskAnalysisFormat360Colombia = "WorkIntegrity/SaveRiskAnalysisFormat360Colombia";
        public const string UrlgetRiskAnaysisFormat360Colombia = "WorkIntegrity/GetRiskAnalysisFormat360Colombia?IdIntegridad={0}&ItemIntegridadDet={1}";
        public const string SaveRiskAnalysisFormat360PlusColombia = "WorkIntegrity/SaveRiskAnalysisFormat360PlusColombia";
        public const string UrlgetRiskAnaysisFormat360PlusColombia = "WorkIntegrity/GetRiskAnalysisFormat360PlusColombia?IdIntegridad={0}&ItemIntegridadDet={1}";

        public const string SaveRiskAnalysisFormat03Brasil = "WorkIntegrity/SaveRiskAnalysisFormat03Brasil";
        public const string UrlgetRiskAnaysisFormat03Brasil = "WorkIntegrity/GetRiskAnalysisFormat03Brasil?IdIntegridad={0}&ItemIntegridadDet={1}";
        public const string SaveRiskAnalysisFormat270Brasil = "WorkIntegrity/SaveRiskAnalysisFormat270Brasil";
        public const string UrlgetRiskAnaysisFormat270Brasil = "WorkIntegrity/GetRiskAnalysisFormat270Brasil?IdIntegridad={0}&ItemIntegridadDet={1}";
        public const string SaveRiskAnalysisFormat360Brasil = "WorkIntegrity/SaveRiskAnalysisFormat360Brasil";
        public const string UrlgetRiskAnaysisFormat360Brasil = "WorkIntegrity/GetRiskAnalysisFormat360Brasil?IdIntegridad={0}&ItemIntegridadDet={1}";

        public const string SaveFormatPolygraphColombia = "WorkIntegrity/SaveFormatPolygraphColombia";
        public const string UrlgetFormatPolygraphColombia = "WorkIntegrity/GetFormatPolygraphColombia?IdIntegridad={0}&ItemIntegridadDet={1}";
        public const string SaveHackeoEtico = "Cibersecurity/SaveHackeoEtico";
        public const string UrlUpdateStatusHackeoEtico = "Cibersecurity/UpdateStatusHackeoEtico?IdHackeoEtico={0}&Flg_Estado={1}";
        public const string UrlGetListHackeoEtico = "Cibersecurity/GetListHackeoEtico?FechaInicio={0}&FechaFin={1}&IdEmpresa={2}";
        public const string SaveOsint = "Cibersecurity/SaveOsint";
        public const string UrlUpdateStatusOsint = "Cibersecurity/UpdateStatusOsint?IdOSINT={0}&Flg_Estado={1}";
        public const string UrlGetListOsint = "Cibersecurity/GetListOsint?FechaInicio={0}&FechaFin={1}&IdEmpresa={2}";
        public const string SavePentesting = "Cibersecurity/SavePentesting";
        public const string UrlUpdateStatusPentesting = "Cibersecurity/UpdateStatusPentesting?IdPentesting={0}&Flg_Estado={1}";
        public const string UrlGetListPentesting = "Cibersecurity/GetListPentesting?FechaInicio={0}&FechaFin={1}&IdEmpresa={2}";
        public const string UrlGetCompanys = "Company/GetCompanys?IdPais={0}&Flg_Estado={1}";
        public const string UrlSaveElectronicScanning = "SafetySecurity/SaveElectronicScanning";
        public const string UrlUpdateStatusElectronicScanning = "SafetySecurity/UpdateStatusElectronicScanning?IdBarridoElectronico={0}&FlgEstado={1}";
        public const string UrlGetListElectronicScanning = "SafetySecurity/GetListElectronicScanning?FechaInicio={0}&FechaFin={1}&IdEmpresa={2}";
        public const string UrlSaveAssetSecurity = "SafetySecurity/SaveAssetSecurity";
        public const string UrlUpdateStatusAssetSecurity = "SafetySecurity/UpdateStatusAssetSecurity?IdSeguridadPatrimonial={0}&FlgEstado={1}";
        public const string UrlGetListAssetSecurity = "SafetySecurity/GetListAssetSecurity?FechaInicio={0}&FechaFin={1}&IdEmpresa={2}";
        public const string UrlSaveCorporateInvestigations = "SafetySecurity/SaveCorporateInvestigations";
        public const string UrlUpdateStatusCorporateInvestigations = "SafetySecurity/UpdateStatusCorporateInvestigations?IdInvestigacionCorporativa={0}&FlgEstado={1}";
        public const string UrlGetListCorporateInvestigations = "SafetySecurity/GetListCorporateInvestigations?FechaInicio={0}&FechaFin={1}&IdEmpresa={2}";
        public const string UrlSaveInternalStaff = "SafetySecurity/SaveInternalStaff";
        public const string UrlUpdateStatusInternalStaff = "SafetySecurity/UpdateStatusInternalStaff?IdPersInternoInfo={0}&FlgEstado={1}";
        public const string UrlGetListInternalStaff = "SafetySecurity/GetListInternalStaff?FechaInicio={0}&FechaFin={1}&IdEmpresa={2}&TipoReporte={3}";
        public const string UrlSavePhysicalSecurity = "SafetySecurity/SavePhysicalSecurity";
        public const string UrlUpdateStatusPhysicalSecurity = "SafetySecurity/UpdateStatusPhysicalSecurity?IdSeguridadFisica={0}&FlgEstado={1}";
        public const string UrlGetListPhysicalSecurity = "SafetySecurity/GetListPhysicalSecurity?FechaInicio={0}&FechaFin={1}&IdEmpresa={2}";
        public const string UrlSaveRiskMap = "RiskMap/SaveRiskMap";
        public const string UrlUpdateStatusRiskMap = "RiskMap/UpdateStatusRiskMap?IdMapaRiesgo={0}&FlgEstado={1}";
        public const string UrlGetListRiskMap = "RiskMap/GetListRiskMap?FechaInicio={0}&FechaFin={1}&IdEmpresa={2}";
        public const string UrlSaveRiskManagement = "RiskManagement/SaveRiskManagement";
        public const string UrlUpdateStatusRiskManagement = "RiskManagement/UpdateStatusRiskManagement?IdGestionRiesgos={0}&FlgEstado={1}";
        public const string UrlGetListRiskManagement = "RiskManagement/GetListRiskManagement?FechaInicio={0}&FechaFin={1}&IdUsuario={2}&IdEmpresa={3}&IdSucursal={4}&TipoReporte={5}";
        public const string UrlGetTypeAlertRiskManagement = "RiskManagement/GetTypeAlertRiskManagement";
        public const string UrlSaveInterestInformation = "InterestInformation/SaveInterestInformation";
        public const string UrlUpdateStatusInterestInformation = "InterestInformation/UpdateStatusInterestInformation?IdInfoInteres={0}&Flg_Estado={1}";
        public const string UrlGetListInterestInformation = "InterestInformation/GetListInterestInformation?FechaInicio={0}&FechaFin={1}&IdEmpresa={2}";
        public const string UrlSaveCorporateRiskManagement = "CorporateServices/SaveCorporateRiskManagement";
        public const string UrlUpdateStatusCorporateManagement = "CorporateServices/UpdateStatusCorporateManagement?IdGestionCorporativaRiesgo={0}&FlgEstado={1}";
        public const string UrlGetListCorporateRiskManagement = "CorporateServices/GetListCorporateRiskManagement?FechaInicio={0}&FechaFin={1}&IdEmpresa={2}";
        public const string UrlSaveSectoralMaps = "CorporateServices/SaveSectoralMaps";
        public const string UrlUpdateStatusSectoralMaps = "CorporateServices/UpdateStatusSectoralMaps?IdMapaSectorial={0}&FlgEstado={1}";
        public const string UrlGetListSectoralMaps = "CorporateServices/GetListSectoralMaps?FechaInicio={0}&FechaFin={1}&IdEmpresa={2}";
        public const string UrlSaveUser = "User/SaveUser";
        public const string UrlGetUsers = "User/GetUsers?IdUsuario={0}";
        public const string UrlGetUsers_Rol = "User/GetUsers_Rol?IdRol={0}";
        public const string UrlGetCountries = "User/GetCountries";
        public const string UrlSaveCompany = "Company/SaveCompany";
        public const string UrlGetRoles = "User/GetRoles";
        public const string UrlGetListDepartments = "Ubigeo/GetListDepartments";
        public const string UrlGetListProvinces = "Ubigeo/GetListProvinces?departamento={0}";
        public const string UrlGetListDistricts = "Ubigeo/GetListDistricts?departamento={0}&provincia={1}";

        public const string UpdateStatusIntegrity = "WorkIntegrity/UpdateWorkIntegrityStatusProgress?IdIntegridad={0}&IdStatus={1}&Progreso={2}";
        public const string UrlUpdateUserInWorkIntegrityDetail = "WorkIntegrity/UpdateUserInWorkIntegrityDetail?IdIntegridad={0}&ItemIntegridadDet={1}&IdUsuarioAsignado={2}";
    }
    public sealed class Settings
    {
        public static string GetKey(KEY key)
        {
            return ConfigurationManager.AppSettings[key.ToString()].Trim();
        }
        public enum KEY
        {
            UrlService,
            Username,
            Password,
            timeCookies,
            timeSession,
            templateGen,
            HackeoEtico,
            OSINT,
            Pentesting,
            BarridoElectronico,
            SeguridadPatrimonial,
            InvestigacionesCorporativas,
            PersonalInterno,
            SeguridadFisica,
            MapaRiesgos,
            GestionRiesgos,
            InformacionInteres,
            GestionCorporativaRiesgos
        }
        public enum Session
        {
            Ididioma,
            IdRol,
            IdPais,
            IdEmpresa,
            IdSucursal
        }
        public enum Cokkies
        {
            TokenServiceMercurial
        }
    }


}
