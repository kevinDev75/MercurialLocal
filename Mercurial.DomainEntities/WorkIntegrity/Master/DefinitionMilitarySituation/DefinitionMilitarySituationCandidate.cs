using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.DefinitionMilitarySituation
{
    public class DefinitionMilitarySituationCandidate
    {
        public long IdDefSituacionMilitar { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public Archive ArchivoDefSituacionMilitar { get; set; }
        public string DefSituacionMilitar { get; set; }
    }
}
