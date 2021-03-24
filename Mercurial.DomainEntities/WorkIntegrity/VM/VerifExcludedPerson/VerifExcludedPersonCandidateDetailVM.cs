using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.VerifExcludedPerson
{
    public class VerifExcludedPersonCandidateDetailVM
    {
        public int IdVerifPersExc { get; set; }
        public int ItemVerifPersExc { get; set; }
        public string Entidad { get; set; }
        public string FecIngSPP { get; set; }
        public string NroExpediente { get; set; }
        public string NroResol { get; set; }
        public string FecResol { get; set; }
        public string Entidad2 { get; set; }
    }
}
