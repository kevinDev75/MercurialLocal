﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity.VM.PoliceProceeding
{
   public class PoliceProceedingsCandidateVM
    {
        public int IdProcesoPolicial { get; set; }
        public int IdIntegridad { get; set; }
        public int ItemIntegridadDet { get; set; }
        public int NumProcesosContra { get; set; }
        public int NumProcesosInterpuestos { get; set; }
        public List<PoliceProceedingsCandidateDetailVM> ListPoliceProceedingsDetailVm { get; set; }
    }
}
