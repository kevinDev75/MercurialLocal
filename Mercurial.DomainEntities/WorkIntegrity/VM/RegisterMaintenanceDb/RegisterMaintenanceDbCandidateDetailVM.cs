using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.RegisterMaintenanceDb
{
    public class RegisterMaintenanceDbCandidateDetailVM
    {
        public int IdRegDeAlimen { get; set; }
        public int ItemRegDeAlimen { get; set; }
        public string DistritoJudicial { get; set; }
        public string OrganoJurisdiccional { get; set; }
        public string NroExpediente { get; set; }
        public string PensionMensual { get; set; }
        public decimal ImporteAdeudado { get; set; }
        public string Demandante { get; set; }
    }
}
