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
    public partial class UserControlNhanVien : UserControl
    {
        BLLStaff stbll = new BLLStaff();
        bool isAdding = false;
        public UserControlNhanVien()
        {
            InitializeComponent();
        }

        public void LoadStaff()
        {
            dataGridView1.DataSource = stbll.LoadStaff();
        }

        private void UserControlNhanVien_Load(object sender, EventArgs e)
        {
            LoadStaff();
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

                bool isAdmin = Convert.ToBoolean(selectedRow.Cells["ISADMIN"].Value);


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
                    int staffId = Convert.ToInt32(dataGridView1.CurrentRow.Cells["STAFF_ID"].Value);
                    stbll.DeleteStaff(staffId);
                    stbll.SaveChanges();
                    LoadStaff();
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
                stbll.AddStaff(txt_Name.Text, txt_Email.Text, txt_Phone.Text, txt_Password.Text);
            }
            else
            {
                if (dataGridView1.CurrentRow != null)
                {
                    int staffId = Convert.ToInt32(dataGridView1.CurrentRow.Cells["STAFF_ID"].Value);
                    stbll.UpdateStaff(staffId, txt_Name.Text, txt_Email.Text, txt_Phone.Text, txt_Password.Text);
                }
            }
            stbll.SaveChanges();
            LoadStaff();
            ResetForm();
        }
        public void SearchStaffs()
        {
            string search = txt_TimKiem.Text;
            dataGridView1.DataSource = stbll.SearchStaffs(search);
        }
        private void btn_TimKiem_Click(object sender, EventArgs e)
        {
            SearchStaffs();
        }

        private void btn_Reset_Click(object sender, EventArgs e)
        {
            UserControlNhanVien_Load(this, null);
        }


    }
}
