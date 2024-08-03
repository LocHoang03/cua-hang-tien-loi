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

        public void AddUser(USER us)
        {
            qlchtl.USERs.InsertOnSubmit(us);
        }

        public void DeleteUser(int userID)
        {
            var user = qlchtl.USERs.SingleOrDefault(us => us.USER_ID == userID);
            if (user != null)
            {
                qlchtl.USERs.DeleteOnSubmit(user);
            }
        }

        public void UpdateUser(int userID, string name, string email, string phone, string password)
        {
            var existingUser = qlchtl.USERs.SingleOrDefault(us => us.USER_ID == userID);
            if (existingUser != null)
            {
                existingUser.NAME = name;
                existingUser.EMAIL = email;
                existingUser.PHONE = phone;
                existingUser.PASSWORD = password;
            }
        }

        public void SaveChanges()
        {
            qlchtl.SubmitChanges();
        }

        public List<USER> SearchUsers(string searchText)
        {
            return qlchtl.USERs
                         .Where(s => s.NAME.Contains(searchText) ||
                                   s.EMAIL.Contains(searchText) ||
                                   s.PHONE.Contains(searchText))
                         .ToList();
        }
    }
}
