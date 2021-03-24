using Mercurial.DomainEntities;
using Mercurial.DomainEntities.CorporateServices.VM;
using System.Collections.Generic;
using System.Web;

namespace Mercurial.Domain.Interfaces.CorporateServicesModule
{
    public interface ICorporateServices
    {
        ApiResponse SaveCorporateRiskManagement(string stringJson, List<HttpPostedFile> files);
        ApiResponse UpdateStatusCorporateManagement(long IdGestionCorporativaRiesgo, bool FlgEstado);
        List<CorporateRiskManagementVm> GetListCorporateRiskManagement(string FechaInicio, string FechaFin);
        ApiResponse SaveSectoralMaps(string stringJson);
        List<SectoralMapsVm> GetListSectoralMaps(string FechaInicio, string FechaFin);
        ApiResponse UpdateStatusSectoralMaps(long IdMapaSectorial, bool FlgEstado);
    }
}
