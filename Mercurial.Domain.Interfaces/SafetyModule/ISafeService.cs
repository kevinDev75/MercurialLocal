using Mercurial.DomainEntities;
using Mercurial.DomainEntities.InterestInformation.RSL;
using Mercurial.DomainEntities.SafetySecurity.VM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Mercurial.Domain.Interfaces.SafetyModule
{
    public interface ISafeService
    {
        ApiResponse SaveElectronicScanning(string stringJson, List<HttpPostedFile> files);
        ApiResponse UpdateStatusElectronicScanning(long IdBarridoElectronico, bool FlgEstado);
        List<ElectronicScanningVm> GetListElectronicScanning(string FechaInicio, string FechaFin);
        ApiResponse SaveAssetSecurity(string stringJson, List<HttpPostedFile> files);
        ApiResponse UpdateStatusAssetSecurity(long IdSeguridadPatrimonial, bool FlgEstado);
        List<AssetSecurityVm> GetListAssetSecurity(string FechaInicio, string FechaFin);
        ApiResponse SaveCorporateInvestigations(string stringJson, List<HttpPostedFile> files);
        ApiResponse UpdateStatusCorporateInvestigations(long IdInvestigacionCorporativa, bool FlgEstado);
        List<CorporateInvestigationsVm> GetListCorporateInvestigations(string FechaInicio, string FechaFin);
        ApiResponse SaveInternalStaff(string stringJson, List<HttpPostedFile> files);
        ApiResponse UpdateStatusInternalStaff(long IdPersInternoInfo, bool FlgEstado);
        List<InternalStaffVm> GetListInternalStaff(string FechaInicio, string FechaFin, string TipoReporte);
        ApiResponse SavePhysicalSecurity(string stringJson, List<HttpPostedFile> files);
        ApiResponse UpdateStatusPhysicalSecurity(long IdSeguridadFisica, bool FlgEstado);
        List<PhysicalSecurityVm> GetListPhysicalSecurity(string FechaInicio, string FechaFin);
        ApiResponse SaveInterestInformation(string stringJson, List<HttpPostedFile> files);
        ApiResponse UpdateStatusInterestInformation(long IdInfoInteres, bool Flg_Estado);
        List<InterestInformationRsl> GetListInterestInformation(string FechaInicio, string FechaFin);
    }
}
