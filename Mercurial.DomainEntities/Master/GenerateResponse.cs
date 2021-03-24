using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.Master
{
    public class GenerateResponse
    {
        public int pcode { get; set; }
        public string message { get; set; }
        public object data { get; set; }
    }
}
