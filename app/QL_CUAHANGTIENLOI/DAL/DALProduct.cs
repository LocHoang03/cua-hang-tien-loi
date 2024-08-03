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

        public List<PRODUCT> SearchProductsByTitle(string title)
        {
            return qlchtl.PRODUCTs
                          .Where(p => p.TITLE.Contains(title))
                          .ToList();
        }

        public List<PRODUCT> GetProductsByPriceRange(decimal minPrice, decimal maxPrice)
        {
            return qlchtl.PRODUCTs
                          .Where(p => p.PRICE >= minPrice && p.PRICE <= maxPrice)
                          .ToList();
        }
    }
}
