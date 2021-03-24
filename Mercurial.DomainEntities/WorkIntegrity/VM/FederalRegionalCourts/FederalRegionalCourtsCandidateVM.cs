using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.FederalRegionalCourts
{
    public class FederalRegionalCourtsCandidateVM
    {
        public long IdTribunalFederalRegional { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string AccionJudicial { get; set; }
        public string InformePolicial { get; set; }
        public string MandatoPrision { get; set; }
        public string RegistroNacionalPerJuridica { get; set; }
        public string PersonaExpuestaPoliticamente { get; set; }
        public string FuncionarioPublico { get; set; }
    }
}
