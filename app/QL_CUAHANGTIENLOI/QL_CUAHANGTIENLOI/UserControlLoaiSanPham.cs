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
    public partial class UserControlLoaiSanPham : UserControl
    {
        BLLTypeProduct tpbll = new BLLTypeProduct();
        bool isAdding = false;
        public UserControlLoaiSanPham()
        {
            InitializeComponent();
        }


        public void LoadTypeProduct() 
        {
            dataGridView1.DataSource = tpbll.LoadTypeProduct();
        }

        private void UserControlLoaiSanPham_Load(object sender, EventArgs e)
        {
            LoadTypeProduct();
            ResetForm();
        }

        private void ResetForm()
        {
            txt_NameType.Text = "";
            txt_Flag.Text = "";
            txt_NameType.Enabled = false;
            txt_Flag.Enabled = false;
            btn_Luu.Enabled = false;
            btn_Sua.Enabled = false;
            btn_Xoa.Enabled = false;
        }

        private void dataGridView1_SelectionChanged(object sender, EventArgs e)
        {
            if (dataGridView1.SelectedRows.Count > 0)
            {
                var selectedRow = dataGridView1.SelectedRows[0];
                txt_NameType.Text = selectedRow.Cells["NAMETYPE"].Value.ToString();
                txt_Flag.Text = selectedRow.Cells["FLAG"].Value.ToString();
                btn_Sua.Enabled = true;
                btn_Xoa.Enabled = true;
            }
        }

        private void btn_Them_Click(object sender, EventArgs e)
        {
            isAdding = true;
            txt_NameType.Enabled = true;
            txt_Flag.Enabled = true;
            btn_Luu.Enabled = true;
            txt_NameType.Clear();
            txt_Flag.Clear();
        }

        private void btn_Xoa_Click(object sender, EventArgs e)
        {
            if (dataGridView1.CurrentRow != null)
            {
                var result = MessageBox.Show("Bạn có chắc chắn muốn xóa dòng này?", "Xác nhận xóa", MessageBoxButtons.YesNo, MessageBoxIcon.Warning);

                if (result == DialogResult.Yes)
                {
                    int typeId = Convert.ToInt32(dataGridView1.CurrentRow.Cells["TYPE_ID"].Value);
                    tpbll.DeleteTypeProduct(typeId);
                    tpbll.SaveChanges();
                    LoadTypeProduct();
                    ResetForm();
                }
            }
        }

        private void btn_Sua_Click(object sender, EventArgs e)
        {
            if (dataGridView1.CurrentRow != null)
            {
                isAdding = false;
                txt_NameType.Enabled = true;
                txt_Flag.Enabled = true;
                btn_Luu.Enabled = true;
            }
        }

        private void btn_Luu_Click(object sender, EventArgs e)
        {
            if (isAdding)
            {
                tpbll.AddTypeProduct(txt_NameType.Text, txt_Flag.Text);
            }
            else
            {
                if (dataGridView1.CurrentRow != null)
                {
                    int typeProductId = Convert.ToInt32(dataGridView1.CurrentRow.Cells["TYPE_ID"].Value);
                    tpbll.UpdateTypeProduct(typeProductId, txt_NameType.Text, txt_Flag.Text);
                }
            }
            tpbll.SaveChanges();
            LoadTypeProduct();
            ResetForm();
        }

        public void SearchTypeProduct()
        {
            string search = txt_TimKiem.Text;
            dataGridView1.DataSource = tpbll.SearchTypeProductsByName(search);
        }
        private void btn_TimKiem_Click(object sender, EventArgs e)
        {
            SearchTypeProduct();
        }

        private void btn_Reset_Click(object sender, EventArgs e)
        {
            UserControlLoaiSanPham_Load(this, null);
        }


    }
}
