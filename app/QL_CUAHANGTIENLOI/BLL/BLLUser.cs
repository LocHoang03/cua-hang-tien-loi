using System;
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

        public void AddUser(string name, string email, string phone, string password)
        {
            USER newUser = new USER();

            newUser.NAME = name;
            newUser.EMAIL = email;
            newUser.PHONE = phone;
            newUser.PASSWORD = password;
            udal.AddUser(newUser);
        }

        public void DeleteUser(int userID)
        {
            udal.DeleteUser(userID);
        }

        public void UpdateUser(int userID, string name, string email, string phone, string password)
        {
            udal.UpdateUser(userID, name, email, phone, password);
        }

        public void SaveChanges()
        {
            udal.SaveChanges();
        }

        public List<USER> SearchStaffs(string searchText)
        {
            return udal.SearchUsers(searchText);
        }
    }
}
