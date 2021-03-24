using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.VerifExcludedPerson
{
    public class VerifExcludedPersonCandidateVM
    {
        public int IdVerifPersExc { get; set; }
        public int IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public bool Flg_Registra { get; set; }
        public List<VerifExcludedPersonCandidateDetailVM> ListVerificationExcludedPersonsDetailVm { get; set; }
    }
}
