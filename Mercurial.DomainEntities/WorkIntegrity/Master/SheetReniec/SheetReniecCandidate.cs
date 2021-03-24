using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.Master.SheetReniec
{
    public class SheetReniecCandidate
    {
        public int IdFichaReniec { get; set; }
        public int IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public Archive FotoAdjunta { get; set; }
    }
}
