using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.CriminalRecord
{
    public class CriminalRecordCandidate
    {
        public long IdAntecCriminal { get; set; }
        public long IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public string DescripcionAntecCriminal { get; set; }
        public Archive ArchivoAdjunto { get; set; }
    }
}
