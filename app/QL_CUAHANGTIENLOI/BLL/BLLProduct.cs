﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using DAL;

namespace BLL
{
    public class BLLProduct
    {
        DALProduct pdal = new DALProduct();
        public BLLProduct()
        {

        }

        public List<PRODUCT> LoadProduct()
        {
            return pdal.LoadProduct();
        }
    }
}
