using Mercurial.DomainEntities;
using Mercurial.DomainEntities.RiskManagement.RSL;
using Mercurial.DomainEntities.RiskManagement.VM;
using System.Collections.Generic;
using System.Web;

namespace Mercurial.Domain.Interfaces.RiskManagementModule
{
    public interface IRiskManagementService
    {
        ApiResponse SaveRiskManagement(string stringJson, List<HttpPostedFile> files);
        ApiResponse UpdateStatusRiskManagement(long IdGestionRiesgos, bool FlgEstado);
        List<RiskManagementVm> GetListRiskManagement(string FechaInicio, string FechaFin, int? TipoReporte);
        List<TypeAlertRiskManagementRsl> GetTypeAlertRiskManagement();
    }
}
