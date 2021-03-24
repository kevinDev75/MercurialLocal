using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.EsSaludVerification
{
    public class EsSaludVerificationCandidate
    {
        public long IdVerifEsSalud { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public bool Flg_Registra { get; set; }
        public Archive ArchivoEsSalud { get; set; }
    }
}
