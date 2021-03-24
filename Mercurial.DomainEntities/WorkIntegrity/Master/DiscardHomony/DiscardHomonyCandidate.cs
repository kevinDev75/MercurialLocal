using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.DiscardHomony
{
    public class DiscardHomonyCandidate
    {
        public int IdDescarteHomon { get; set; }
        public int IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public bool Flg_Registra { get; set; }
        public List<DiscardHomonyCandidateDetail> ListDiscardHomonymyDetailFlt { get; set; }
    }
}
