using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.FinancialVerification
{
    public class ListCreditLineCandidateDetail
    { 
        public int IdLineaCredito { get; set; }
        public int IdVerifFinanciera { get; set; }
        public string EntidadReportante { get; set; }
        public string TipoLinea { get; set; }
        public decimal TotalLineaCredito { get; set; }
    }
}
