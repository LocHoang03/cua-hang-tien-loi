using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using System.Data;

namespace DAL
{
    public class DALTypeProduct
    {
        QL_CHTLDataContext qlchtl = new QL_CHTLDataContext();
        public DALTypeProduct()
        {

        }

        public List<TYPE_PRODUCT> LoadTypeProduct()
        {
            return qlchtl.TYPE_PRODUCTs.Select(tp => tp).ToList<TYPE_PRODUCT>();
        }

        public void AddTypeProduct(TYPE_PRODUCT typeProduct)
        {
            qlchtl.TYPE_PRODUCTs.InsertOnSubmit(typeProduct);
        }

        public void DeleteTypeProduct(int typeProdcutID)
        {
            var typeProduct = qlchtl.TYPE_PRODUCTs.SingleOrDefault(tp => tp.TYPE_ID == typeProdcutID);
            if (typeProduct != null)
            {
                qlchtl.TYPE_PRODUCTs.DeleteOnSubmit(typeProduct);
            }
        }

        public void UpdateTypeProduct(int typeProductId, string nameType, string flag)
        {
            var existingProduct = qlchtl.TYPE_PRODUCTs.SingleOrDefault(tp => tp.TYPE_ID == typeProductId);
            if (existingProduct != null)
            {
                existingProduct.NAMETYPE = nameType;
                existingProduct.FLAG = flag;
            }
        }

        public void SaveChanges()
        {
            qlchtl.SubmitChanges();
        }
    }
}
