using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Mercurial.DomainEntities.Home
{
    public class LoginResponse
    {
        public string error { get; set; }
        public User User { get; set; }
    }
}
