using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.AcademicInformation
{
    public class AcademicInformationCandidate
    {
        public int IdInfoAcademica { get; set; }
        public int IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string Actividades { get; set; }
        public string ProyectosYProyecciones { get; set; }
        public string AspectosCriRiesgo { get; set; }
        public string ProbJusticia { get; set; }
        public string ConsumEstupefacientes { get; set; }
        public string PersonasPresenVisita { get; set; }
        public List<AcademicInformationCandidateDetail> ListAcademicInformationDetailFlt { get; set; }
    }
}
