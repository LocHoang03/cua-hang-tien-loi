using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DTO;

namespace BLL
{
    public class BLLStaff
    {
        DALStaff stdal = new DALStaff();
        public BLLStaff()
        {

        }

        public List<STAFF> LoadStaff()
        {
            return stdal.LoadStaff();
        }

        public void AddStaff(string name, string email, string phone, string password, bool isAdmin)
        {
            STAFF newStaff = new STAFF();

            newStaff.NAME = name;
            newStaff.EMAIL = email;
            newStaff.PHONE = phone;
            newStaff.PASSWORD = password;
            newStaff.ISADMIN = isAdmin;
            stdal.AddStaff(newStaff);
        }

        public void DeleteStaff(int staffID)
        {
            stdal.DeleteStaff(staffID);
        }

        public void UpdateStaff(int staffID, string name, string email, string phone, string password, bool isAdmin)
        {
            stdal.UpdateStaff(staffID, name, email, phone, password, isAdmin);
        }

        public void SaveChanges()
        {
            stdal.SaveChanges();
        }
    }
}
