using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.RegisterMaintenanceDb
{
    public class RegisterMaintenanceDbCandidate
    {
        public int IdRegDeAlimen { get; set; }
        public int IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public bool Flg_Registra { get; set; }
        public List<RegisterMaintenanceDbCandidateDetail> ListRegisterMaintenanceDebtsDetailFlt { get; set; }
    }
}
