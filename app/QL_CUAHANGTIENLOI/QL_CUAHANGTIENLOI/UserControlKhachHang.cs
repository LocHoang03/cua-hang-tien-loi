using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using BLL;

namespace QL_CUAHANGTIENLOI
{
    public partial class UserControlKhachHang : UserControl
    {
        BLLUser ubll = new BLLUser();
        bool isAdding = false;
        public UserControlKhachHang()
        {
            InitializeComponent();
        }

        public void LoadUser()
        {
            dataGridView1.DataSource = ubll.LoadUser();
        }

        private void UserControlKhachHang_Load(object sender, EventArgs e)
        {
            LoadUser();
            ResetForm();
        }

        private void ResetForm()
        {
            txt_Name.Text = "";
            txt_Email.Text = "";
            txt_Phone.Text = "";
            txt_Password.Text = "";


            txt_Name.Enabled = false;
            txt_Email.Enabled = false;
            txt_Phone.Enabled = false;
            txt_Password.Enabled = false;

            btn_Luu.Enabled = false;
            btn_Sua.Enabled = false;
            btn_Xoa.Enabled = false;
        }

        private void dataGridView1_SelectionChanged(object sender, EventArgs e)
        {
            if (dataGridView1.SelectedRows.Count > 0)
            {
                var selectedRow = dataGridView1.SelectedRows[0];
                txt_Name.Text = selectedRow.Cells["NAME"].Value.ToString();
                txt_Email.Text = selectedRow.Cells["EMAIL"].Value.ToString();
                txt_Phone.Text = selectedRow.Cells["PHONE"].Value.ToString();
                txt_Password.Text = selectedRow.Cells["PASSWORD"].Value.ToString();

                btn_Sua.Enabled = true;
                btn_Xoa.Enabled = true;
            }
        }

        private void btn_Them_Click(object sender, EventArgs e)
        {
            isAdding = true;
            txt_Name.Enabled = true;
            txt_Email.Enabled = true;
            txt_Phone.Enabled = true;
            txt_Password.Enabled = true;


            btn_Luu.Enabled = true;
            txt_Name.Clear();
            txt_Email.Clear();
            txt_Phone.Clear();
            txt_Password.Clear();
        }

        private void btn_Xoa_Click(object sender, EventArgs e)
        {
            if (dataGridView1.CurrentRow != null)
            {
                var result = MessageBox.Show("Bạn có chắc chắn muốn xóa dòng này?", "Xác nhận xóa", MessageBoxButtons.YesNo, MessageBoxIcon.Warning);

                if (result == DialogResult.Yes)
                {
                    int userId = Convert.ToInt32(dataGridView1.CurrentRow.Cells["USER_ID"].Value);
                    ubll.DeleteUser(userId);
                    ubll.SaveChanges();
                    LoadUser();
                    ResetForm();
                }
            }
        }

        private void btn_Sua_Click(object sender, EventArgs e)
        {
            if (dataGridView1.CurrentRow != null)
            {
                isAdding = false;
                txt_Name.Enabled = true;
                txt_Email.Enabled = true;
                txt_Phone.Enabled = true;
                txt_Password.Enabled = true;

                btn_Luu.Enabled = true;
            }
        }

        private void btn_Luu_Click(object sender, EventArgs e)
        {
            if (isAdding)
            {
                ubll.AddUser(txt_Name.Text, txt_Email.Text, txt_Phone.Text, txt_Password.Text);
            }
            else
            {
                if (dataGridView1.CurrentRow != null)
                {
                    int userId = Convert.ToInt32(dataGridView1.CurrentRow.Cells["USER_ID"].Value);
                    ubll.UpdateUser(userId, txt_Name.Text, txt_Email.Text, txt_Phone.Text, txt_Password.Text);
                }
            }
            ubll.SaveChanges();
            LoadUser();
            ResetForm();
        }

        public void SearchUsers()
        {
            string search = txt_TimKiem.Text;
            dataGridView1.DataSource = ubll.SearchStaffs(search);
        }
        private void btn_TimKiem_Click(object sender, EventArgs e)
        {
            SearchUsers();
        }

        private void btn_Reset_Click(object sender, EventArgs e)
        {
            UserControlKhachHang_Load(this, null);
        }
    }
}
