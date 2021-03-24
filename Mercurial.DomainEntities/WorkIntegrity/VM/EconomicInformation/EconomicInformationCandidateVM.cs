using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.EconomicInformation
{
    public class EconomicInformationCandidateVM
    {
        public int IdInfoEconomica { get; set; }
        public int IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string CtaBienesComerciales { get; set; }
        public string ReportadoDataCredito { get; set; }
        public decimal TotalIngresos { get; set; }
        public decimal TotalEgresos { get; set; }
        public List<EconomicInformationCandidateDetailVM> ListEconomicInformationDetailVm { get; set; }
    }
}
