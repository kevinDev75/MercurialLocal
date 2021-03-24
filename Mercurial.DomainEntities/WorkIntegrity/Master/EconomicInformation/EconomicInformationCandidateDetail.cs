using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.EconomicInformation
{
    public class EconomicInformationCandidateDetail
    {
        public int IdInfoEconomica { get; set; }
        public int ItemInfoEconomica { get; set; }
        public string IngresosMensuales { get; set; }
        public decimal ValorIngresoMensual { get; set; }
        public string GastosMensuales { get; set; }
        public decimal ValorGastoMensual { get; set; }
    }
}
