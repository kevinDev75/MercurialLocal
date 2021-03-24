using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.SocioeconomicReport
{
    public class SocioeconomicReportCandidateVM
    {
        public long IdSocioEcon { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string FechaVisita { get; set; }
        public string Ciudad { get; set; }
        public string EmpSolicitante { get; set; }
        public string VisitDomAnter { get; set; }
    }
}
