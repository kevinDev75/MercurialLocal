using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.DiscardHomony
{
    public class DiscardHomonyCandidateDetail
    {
         public int IdDescarteHomon { get; set; }
         public int ItemDescarteHomon { get; set; }
         public string DistritoJudicial { get; set; }
         public string OrganoJurisdiccional { get; set; }
         public string NroExpediente { get; set; }
         public string PensionMensual { get; set; }
         public decimal ImporteAdeudado { get; set; }
         public string Demandante { get; set; }

    }

}
