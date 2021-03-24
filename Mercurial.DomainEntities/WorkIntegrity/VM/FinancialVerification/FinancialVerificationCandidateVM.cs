using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.FinancialVerification
{
    public class FinancialVerificationCandidateVM
    {
        public int IdVerifFinanciera { get; set; }
        public int IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public bool Flg_Registra { get; set; }
        public string PeriodoReportado { get; set; }
        public decimal PorcNormal { get; set; }
        public decimal PorcProblemasPotenciales { get; set; }
        public decimal PorcDeficiente { get; set; }
        public decimal PorcDudoso { get; set; }
        public decimal PorcPerdida { get; set; }
        public List<ListCreditLineCandidateDetailVM> ListCreditLineVm { get; set; }
        public List<ListDebtDetailCandidateDetailVM> ListDebtDetailVm { get; set; }
    }
}
