using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.VerifExcludedPerson
{
    public class VerifExcludedPersonCandidateDetail
    {
        public int IdVerifPersExc { get; set; }
        public int ItemVerifPersExc { get; set; }
        public string Entidad { get; set; }
        public DateTime? FecIngSPP { get; set; }
        public string NroExpediente { get; set; }
        public string NroResol { get; set; } 
        public DateTime? FecResol { get; set; }
        public string Entidad2 { get; set; }
    }
}
