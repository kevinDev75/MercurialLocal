﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.Work
{
    public class ConsultsRequestIntegrity
    {
        public string IdEmpresa { get; set; }
        public string CodigoIntegridad { get; set; }
        public string FechaInicio { get; set; }
        public string FechaFin { get; set; }
        public string  IdStatus { get; set; }
        public string IdUser { get; set; }
        public string NroDocumento { get; set; }

    }
}
