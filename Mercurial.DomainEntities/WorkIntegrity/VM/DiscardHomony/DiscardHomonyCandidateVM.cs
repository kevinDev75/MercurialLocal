using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.DiscardHomony
{
    public class DiscardHomonyCandidateVM
    {
        public int IdDescarteHomon { get; set; }
        public int IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public bool Flg_Registra { get; set; }
        public List<DiscardHomonyCandidateDetailVM> ListDiscardHomonymyDetailVm { get; set; }
    }
}
