using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.RegisterMaintenanceDb
{
    public class RegisterMaintenanceDbCandidateDetail
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
