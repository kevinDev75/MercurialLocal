using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.Home
{
    public class UpdatePassword
    {
        public int IdUsuario { get; set; }
        public string Password { get; set; }
    }
}
