using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.FinancialVerification
{
    public class ListDebtDetailCandidateDetail
    {
        public int IdDetalleDeuda { get; set; }
        public int IdVerifFinanciera { get; set; }
        public string EntidadInformante { get; set; }
        public string Calificacion { get; set; }
        public decimal Capital { get; set; }
        public decimal InteresComisiones { get; set; }
        public decimal DeudaTotal { get; set; }
        
    }
}
