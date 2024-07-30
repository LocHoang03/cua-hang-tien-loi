using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Data.SqlClient;

namespace QL_CUAHANGTIENLOI
{
    public partial class frm_DangNhap : Form
    {
        DBConnection db = new DBConnection();
        public frm_DangNhap()
        {
            InitializeComponent();
        }

        private void frm_DangNhap_Load(object sender, EventArgs e)
        {
            lbl_LoiMatKhau.Visible = false;
        }

        private void btn_DangNhap_Click(object sender, EventArgs e)
        {
            string email = txt_Email.Text;
            string password = txt_Password.Text;
            if (string.IsNullOrEmpty(txt_Email.Text) || string.IsNullOrEmpty(txt_Password.Text))
            {
                lbl_LoiMatKhau.Visible = true;
                return;
            }

            try
            {
                db.conn.Open();
                string query = "SELECT STAFF_ID, ISADMIN FROM STAFF WHERE EMAIL COLLATE Latin1_General_BIN = @email AND PASSWORD COLLATE Latin1_General_BIN = @password";
                SqlCommand sqlCommand = new SqlCommand(query, db.conn);
                sqlCommand.Parameters.AddWithValue("@email", email);
                sqlCommand.Parameters.AddWithValue("@password", password);
                SqlDataReader reader = sqlCommand.ExecuteReader();

                if (reader.HasRows)
                {
                    // Đăng nhập thành công
                    reader.Read();
                    string manv = reader["STAFF_ID"].ToString();
                    bool isAdmin = Convert.ToBoolean(reader["ISADMIN"]);
                    db.conn.Close();

                    // Ẩn LoginForm và hiển thị HomePage
                    this.Hide();
                    frm_TrangChu index = new frm_TrangChu(isAdmin);
                    index.Show();
                }
                else
                {
                    // Đăng nhập thất bại
                    MessageBox.Show("Email hoặc mật khẩu không đúng.", "THÔNG BÁO");
                    db.conn.Close();
                }
            }
            catch (SqlException ex)
            {
                MessageBox.Show("An error occurred: " + ex.Message);
                db.conn.Close();
            }
        }


    }
}
