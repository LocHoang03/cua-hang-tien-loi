using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DTO;

namespace DAL
{
    public class DALStaff
    {
        QL_CHTLDataContext qlchtl = new QL_CHTLDataContext();
        public DALStaff()
        {

        }

        public List<STAFF> LoadStaff()
        {
            return qlchtl.STAFFs.Where(st => st.ISADMIN == false).ToList<STAFF>();
        }

        public void AddStaff(STAFF stf)
        {
            qlchtl.STAFFs.InsertOnSubmit(stf);
        }

        public void DeleteStaff(int staffID)
        {
            var staff = qlchtl.STAFFs.SingleOrDefault(stf => stf.STAFF_ID == staffID);
            if (staff != null)
            {
                qlchtl.STAFFs.DeleteOnSubmit(staff);
            }
        }

        public void UpdateStaff(int staffID, string name, string email, string phone, string password, bool isAdmin)
        {
            var existingStaff = qlchtl.STAFFs.SingleOrDefault(stf => stf.STAFF_ID == staffID);
            if (existingStaff != null)
            {
                existingStaff.NAME = name;
                existingStaff.EMAIL = email;
                existingStaff.PHONE = phone;
                existingStaff.PASSWORD = password;
                existingStaff.ISADMIN = isAdmin;
            }
        }

        public void SaveChanges()
        {
            qlchtl.SubmitChanges();
        }
    }
}
