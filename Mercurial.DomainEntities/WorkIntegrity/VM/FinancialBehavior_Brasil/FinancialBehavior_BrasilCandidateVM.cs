using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.FinancialBehavior_Brasil
{
    public class FinancialBehavior_BrasilCandidateVM
    {
        public long IdComportamientoFinanciero { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string RangoIngresosPresuntos { get; set; }
        public string PoderAdquisitivo { get; set; }
        public string RiesgoCredito { get; set; }
        public string BusquedaCaptura { get; set; }
        public string EjecucionDesalojo { get; set; }
        public string ConsultaReembolso { get; set; }
        public string RecibeAyudaGobierno { get; set; }
        public string NoLlamar { get; set; }
    }
}
