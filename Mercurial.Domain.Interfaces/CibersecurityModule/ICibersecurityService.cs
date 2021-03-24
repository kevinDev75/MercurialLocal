using Mercurial.DomainEntities;
using Mercurial.DomainEntities.Cibersecurity.VM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Mercurial.Domain.Interfaces.Cibersecurity
{
    public interface ICibersecurityService
    {
        ApiResponse SaveHackeoEtico(string stringJson, List<HttpPostedFile> files);
        ApiResponse UpdateStatusHackeoEtico(long IdHackeoEtico, bool Flg_Estado);
        List<HackeoEticoVm> GetListHackeoEtico(string FechaInicio, string FechaFin);
        ApiResponse SaveOsint(string stringJson, List<HttpPostedFile> files);
        ApiResponse UpdateStatusOsint(long IdOSINT, bool Flg_Estado);
        List<OsintVm> GetListOsint(string FechaInicio, string FechaFin);
        ApiResponse SavePentesting(string stringJson, List<HttpPostedFile> files);
        ApiResponse UpdateStatusPentesting(long IdPentesting, bool Flg_Estado);
        List<PentestingVm> GetListPentesting(string FechaInicio, string FechaFin);
    }
}
