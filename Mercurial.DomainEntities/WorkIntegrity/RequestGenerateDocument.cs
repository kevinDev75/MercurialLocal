using Mercurial.DomainEntities.WorkIntegrity.work270;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.WorkIntegrity
{
    public class RequestGenerateDocument
    {
        public string pathFile { get; set; }
        public int idtemplate { get; set; }
        public GenericTemplateIntegrity270 templateIntegrity270 { get; set; }
    }
}
