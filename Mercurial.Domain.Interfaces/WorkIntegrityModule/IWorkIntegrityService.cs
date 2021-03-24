using Mercurial.DomainEntities;
using Mercurial.DomainEntities.Work;
using Mercurial.DomainEntities.WorkIntegrity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.Domain.Interfaces.WorkIntegrityModule
{
    public interface IWorkIntegrityService
    {
        // --
        ApiResponse GetTextControlls(String NombreVista);
        ApiResponse UpdateStatusIntegrity(UpdateStatus data);
        ApiResponse UpdateUserInWorkIntegrityDetail(long IdIntegridad, int ItemIntegridadDet, int IdUsuarioAsignado);
        ApiResponse GenerateZipSelect(datosFileDow data);

        //ApiResponse GenerateZipReport(int id);
    }
}
