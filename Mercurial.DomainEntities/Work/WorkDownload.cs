using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.Work
{
    public class datosFileDow
    {
        public int id { get; set; }
        public List<itemDetail> idsDetail { get; set; }
        public List<itemDetail2> idstring { get; set; }
    }
    public class itemDetail
    {
        public int idItem { get; set; }
    }
    public class itemDetail2
    {
        public string idItem { get; set; }
    }
}
