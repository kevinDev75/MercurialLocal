using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.SocioeconomicReport
{
    public class SocioeconomicReportCandidate
    {
        public int IdSocioEcon { get; set; }
        public int IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string  FechaVisita { get; set; }
        public string Ciudad { get; set; }
        public string EmpSolicitante { get; set; }
        public bool VisitDomAnter { get; set; }
    }
}
