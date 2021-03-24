using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.PublicOfficeVerification
{
    public class PublicOfficeVerificationCandidateDetailVM
    {
        public long IdVerifCargoPublico { get; set; }
        public int ItemVerifCargoPublico { get; set; }
        public string Num { get; set; }
        public string Institucion { get; set; }
        public string TipoSancion { get; set; }
        public string Categoria { get; set; }
        public string Estado { get; set; }
    }
}
