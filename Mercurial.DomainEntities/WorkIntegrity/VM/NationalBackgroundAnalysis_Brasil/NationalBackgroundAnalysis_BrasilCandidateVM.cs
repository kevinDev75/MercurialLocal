using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.NationalBackgroundAnalysis_Brasil
{
    public class NationalBackgroundAnalysis_BrasilCandidateVM
    {
        public long IdAnalisisAntecPersoNacional { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string PoliciaCivilInforma { get; set; }
        public string PoliciaFederalInforma { get; set; }
        public string ComisionInmobiliariaInforma { get; set; }
        public string MicroEmprendedorIndividual { get; set; }
    }
}
