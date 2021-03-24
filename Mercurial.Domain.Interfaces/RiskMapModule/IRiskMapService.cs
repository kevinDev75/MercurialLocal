using Mercurial.DomainEntities;
using Mercurial.DomainEntities.RiskMap.VM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Mercurial.Domain.Interfaces.RiskMapModule
{
    public interface IRiskMapService
    {
        ApiResponse SaveRiskMap(string stringJson, List<HttpPostedFile> files);
        ApiResponse UpdateStatusRiskMap(long IdMapaRiesgo, bool FlgEstado);
        List<RiskMapVm> GetListRiskMap(string FechaInicio, string FechaFin);
    }
}
