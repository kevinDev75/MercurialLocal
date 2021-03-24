using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.Home
{
    public class RequestCodexUsuario
    {
        public string CodigoCambioPassword { get; set; }
        public bool FlgCambioPassword { get; set; }
        public DateTime FechaCambioPassword { get; set; }
        public string idUsuario { get; set; }

        public bool flgActiveLink { get; set; }
    }
}
