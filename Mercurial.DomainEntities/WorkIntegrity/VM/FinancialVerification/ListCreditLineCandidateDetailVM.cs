
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.FinancialVerification
{
    public class ListCreditLineCandidateDetailVM
    {
        public int IdLineaCredito { get; set; }
        public int IdVerifFinanciera { get; set; }
        public string EntidadReportante { get; set; }
        public string TipoLinea { get; set; }
        public decimal TotalLineaCredito { get; set; }
    }
}
