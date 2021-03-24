using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.EndResult
{
    public class EndResultCandidateVM
    {
        public long IdResultadoFinal { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public int Riesgo { get; set; }
        public string DesRiesgo { get; set; }
        public int Calificacion { get; set; }
        public string DesCalificacion { get; set; }
        public int EscalaSinceridad { get; set; }
        public int NivelRiesgo { get; set; }
        public int Justicia_Trabajo { get; set; }
    }
}
