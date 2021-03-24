using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.HealthSituation
{
    public class HealthSituationCandidateVM
    {
        public long IdSituacionSalud { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string MiembroPrstaTipoEnfermedad { get; set; }
        public string MiembroEnfermedadPresenta { get; set; }
        public string MiembroMedicamentoIngiere { get; set; }
        public string MiembroTiempoPadeceEnfermedad { get; set; }
        public string MiembroObservaciones { get; set; }
        public string UdPstaTipoEnfermedad { get; set; }
        public string UdEnfermedadPresenta { get; set; }
        public string UdMedicamentoIngiere { get; set; }
        public string UdTiempoPadeceEnfermedad { get; set; }
        public string UdObservaciones { get; set; }
    }
}
