﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;
using DAL;

namespace BLL
{
    public class BLLUser
    {
        DALUser udal = new DALUser();
        public BLLUser()
        {

        }

        public List<USER> LoadUser()
        {
            return udal.LoadUser();
        }
    }
}
