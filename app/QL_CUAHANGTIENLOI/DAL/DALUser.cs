using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;

namespace DAL
{
    public class DALUser
    {
        QL_CHTLDataContext qlchtl = new QL_CHTLDataContext();
        public DALUser()
        {

        }

        public List<USER> LoadUser()
        {
            return qlchtl.USERs.Select(u => u).ToList<USER>();
        }
    }
}
