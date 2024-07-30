using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;

namespace DAL
{
    public class DALProduct
    {
        QL_CHTLDataContext qlchtl = new QL_CHTLDataContext();
        public DALProduct()
        {

        }

        public List<PRODUCT> LoadProduct()
        {
            return qlchtl.PRODUCTs.Select(p => p).ToList<PRODUCT>();
        }
    }
}
