using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.CriminalProceeding
{
    public class CriminalProceedingsCandidateVM
    {
        public int IdProcesoPenal { get; set; }
        public int IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public int NumProcesosContra { get; set; }
        public int NumProcesosInterpuestos { get; set; }
        public List<CriminalProceedingsCandidateDetailVM> ListCriminalProceedingsDetailVm { get; set; }
    }
}
