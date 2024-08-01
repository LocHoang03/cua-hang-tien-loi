using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;

namespace BLL
{
    public class BLLTypeProduct
    {
        DALTypeProduct tpdal = new DALTypeProduct();
        public BLLTypeProduct()
        {

        }

        public List<TYPE_PRODUCT> LoadTypeProduct()
        {
            return tpdal.LoadTypeProduct();
        }

        public void AddTypeProduct(string nameType, string flag)
        {
            TYPE_PRODUCT newProduct = new TYPE_PRODUCT();

            newProduct.NAMETYPE = nameType;
            newProduct.FLAG = flag;

            tpdal.AddTypeProduct(newProduct);
        }
        public void DeleteTypeProduct(int typeProductID)
        {
            tpdal.DeleteTypeProduct(typeProductID);
        }

        public void UpdateTypeProduct(int typeProductId, string nameType, string flag)
        {
            tpdal.UpdateTypeProduct(typeProductId, nameType, flag);
        }
        public void SaveChanges()
        {
            tpdal.SaveChanges();
        }
    }
}
