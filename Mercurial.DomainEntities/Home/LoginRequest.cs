using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.Home
{
    public class LoginRequest
    {
        public string username { get; set; }
        public string password { get; set; }
        public string email { get; set; }
    }
}
