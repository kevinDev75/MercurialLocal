using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.AcademicLaborAnalysis
{
    public class AcademicLaborAnalysisCandidateVM
    {
        public long IdAnalisisAcademicoLaboral { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string Sunedu { get; set; }
        public string ReferenciasLaborales { get; set; }
        public string EsSalud { get; set; }
    }
}
