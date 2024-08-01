using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using CloudinaryDotNet;
using BLL;
using CloudinaryDotNet.Actions;
using System.Data.SqlClient;


namespace QL_CUAHANGTIENLOI
{
    public partial class frm_QLSP : Form
    {
        DBConnection db = new DBConnection();
        public Cloudinary cloudinary;
        public const string CLOUD_NAME = "degvzjziz";
        public const string API_KEY = "982992473793533";
        public const string API_SECRET = "2PypkgkMZdjg2luVx4mK4rMQF70";
        public string imagePath, ImageID, ImageURL;

        bool isAdding = false;

        public frm_QLSP()
        {
            InitializeComponent();
        }

        private void ResetForm()
        {
            txt_Title.Text = "";
            txt_Price.Text = "";

            txt_Title.Enabled = false;
            txt_Price.Enabled = false;
            cbo_TypeID.Enabled = false;
            btn_Choose.Enabled = false;
            //btn_Upload.Enabled = false;
            btn_Luu.Enabled = false;
            btn_Sua.Enabled = false;
            btn_Xoa.Enabled = false;
        }
        private void LoadComboBoxType()
        {
            string query = "SELECT TYPE_ID, NAMETYPE FROM TYPE_PRODUCTS";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, db.conn);
            DataTable dataTable = new DataTable();
            sqlDataAdapter.Fill(dataTable);

            cbo_TypeID.DataSource = dataTable;
            cbo_TypeID.DisplayMember = "NAMETYPE";
            cbo_TypeID.ValueMember = "TYPE_ID";
        }
        private void frm_QLSP_Load(object sender, EventArgs e)
        {
            LoadComboBoxType();
            displayDatagrid();
            ResetForm();
        }

        public void displayDatagrid()
        {
            db.conn.Open();
            string query = "SELECT * from PRODUCTS";
            SqlCommand cmd = new SqlCommand(query, db.conn);

            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(cmd);
            DataTable dataTable = new DataTable();
            sqlDataAdapter.Fill(dataTable);
            dataGridView1.DataSource = dataTable;
            db.conn.Close();
        }

        public void save()
        {

            db.conn.Open();
            string query;

            if (isAdding)
            {
                query = "INSERT INTO PRODUCTS (TITLE, PRICE, IMAGE_URL, IMAGE_ID, TYPE_ID) VALUES (@Title, @Price, @ImageURL, @ImageID, @TypeID)";
            }
            else
            {
                query = "UPDATE PRODUCTS SET TITLE = @Title, PRICE = @Price, IMAGE_URL = @ImageURL, IMAGE_ID = @ImageID, TYPE_ID = @TypeID WHERE PRODUCT_ID = @ProductID";
            }

            using (SqlCommand cmd = new SqlCommand(query, db.conn))
            {
                cmd.Parameters.AddWithValue("@Title", txt_Title.Text);
                cmd.Parameters.AddWithValue("@Price", decimal.Parse(txt_Price.Text));
                cmd.Parameters.AddWithValue("@ImageURL", ImageURL);
                cmd.Parameters.AddWithValue("@ImageID", ImageID);
                cmd.Parameters.AddWithValue("@TypeID", cbo_TypeID.SelectedValue);

                if (!isAdding)
                {
                    // Chỉ thêm tham số @ProductID khi cập nhật
                    cmd.Parameters.AddWithValue("@ProductID", dataGridView1.CurrentRow.Cells["PRODUCT_ID"].Value);
                }

                cmd.ExecuteNonQuery();
                cmd.Dispose();
            }

            db.conn.Close();
        }

        private void cloudinaryStorage()
        {
            Account account = new Account(CLOUD_NAME, API_KEY, API_SECRET);
            cloudinary = new Cloudinary(account);
            uploadImage(imagePath);
        }

        private void uploadImage(string path)
        {
            var uploadParams = new ImageUploadParams() { 
                File = new FileDescription(path),
                Folder = "image",

            };
            var res = cloudinary.Upload(uploadParams);
            ImageID = res.PublicId.ToString();
            ImageURL = res.Uri.ToString();
        }

        private void btn_Choose_Click(object sender, EventArgs e)
        {
            OpenFileDialog dlg = new OpenFileDialog();
            dlg.Filter = "Image | *.jpg; *.jpeg; *.png";
            DialogResult result = dlg.ShowDialog();
            if(result == DialogResult.OK)
            {
                image.SizeMode = PictureBoxSizeMode.Zoom; 
                image.Image = new Bitmap(dlg.FileName);
                imagePath = dlg.FileName;
            }
        }

        private void backgroundWorker1_DoWork(object sender, DoWorkEventArgs e)
        {
            cloudinaryStorage();
        }
        private void backgroundWorker1_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
        {
            save();
            displayDatagrid();
            MessageBox.Show("Complete");
        }

        private void btn_Them_Click(object sender, EventArgs e)
        {
            isAdding = true;
            txt_Title.Enabled = true;
            txt_Price.Enabled = true;
            cbo_TypeID.Enabled = true;

            btn_Choose.Enabled = true;
            //btn_Upload.Enabled = true;
            btn_Luu.Enabled = true;
            image.Image = null;
            txt_Title.Clear();
            txt_Price.Clear();
        }

        private void btn_Xoa_Click(object sender, EventArgs e)
        {
            if (dataGridView1.CurrentRow != null)
            {
                if (dataGridView1.CurrentRow.Cells["PRODUCT_ID"].Value != null && !string.IsNullOrEmpty(dataGridView1.CurrentRow.Cells["PRODUCT_ID"].Value.ToString()))
                {
                    DialogResult dialogResult = MessageBox.Show("Bạn có chắc chắn muốn xóa?", "Xác nhận", MessageBoxButtons.YesNo);
                    if (dialogResult == DialogResult.Yes)
                    {
                        db.conn.Open();
                        string query = "DELETE FROM PRODUCTS WHERE PRODUCT_ID = @PRODUCT_ID";
                        SqlCommand sqlCommand = new SqlCommand(query, db.conn);
                        sqlCommand.Parameters.AddWithValue("@PRODUCT_ID", dataGridView1.CurrentRow.Cells["PRODUCT_ID"].Value);
                        sqlCommand.ExecuteNonQuery();
                        db.conn.Close();

                        displayDatagrid();
                        MessageBox.Show("Sản phẩm đã được xóa thành công.", "Thông báo", MessageBoxButtons.OK, MessageBoxIcon.Information);

                        ResetForm();
                    }
                }
            }
        }

        private void btn_Sua_Click(object sender, EventArgs e)
        {
            if (dataGridView1.CurrentRow != null)
            {
                isAdding = false;
                txt_Title.Enabled = true;
                txt_Price.Enabled = true;
                cbo_TypeID.Enabled = true;
                btn_Choose.Enabled = true;
               // btn_Upload.Enabled = true;
                btn_Luu.Enabled = true;
            }
        }

        private void btn_Luu_Click(object sender, EventArgs e)
        {
            if (string.IsNullOrWhiteSpace(txt_Title.Text) || string.IsNullOrWhiteSpace(txt_Price.Text) || cbo_TypeID.SelectedValue == null)
            {
                MessageBox.Show("Vui lòng điền đầy đủ thông tin sản phẩm.", "Thông báo", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            if (isAdding)
            {
                // Nếu có hình ảnh mới được chọn
                if (!string.IsNullOrEmpty(imagePath))
                {
                    cloudinaryStorage(); // Tải lên ảnh mới
                }
                else
                {
                    ImageURL = ""; // Hoặc giá trị mặc định nếu không có ảnh
                    ImageID = "";
                }

                save(); // Thêm sản phẩm mới
                MessageBox.Show("Sản phẩm đã được thêm thành công.", "Thông báo", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            else
            {
                // Nếu có hình ảnh mới được chọn
                if (!string.IsNullOrEmpty(imagePath))
                {
                    cloudinaryStorage(); // Tải lên ảnh mới
                }

                save(); // Cập nhật thông tin sản phẩm
                MessageBox.Show("Thông tin sản phẩm đã được cập nhật.", "Thông báo", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }

            ResetForm();
            displayDatagrid();
        }

        private void dataGridView1_SelectionChanged(object sender, EventArgs e)
        {
            if (dataGridView1.SelectedRows.Count > 0)
            {
                var selectedRow = dataGridView1.SelectedRows[0];
                txt_Title.Text = selectedRow.Cells["TITLE"].Value.ToString();
                txt_Price.Text = selectedRow.Cells["PRICE"].Value.ToString();
                cbo_TypeID.SelectedValue = selectedRow.Cells["TYPE_ID"].Value;
                image.SizeMode = PictureBoxSizeMode.Zoom; 
                image.ImageLocation = selectedRow.Cells["IMAGE_URL"].Value.ToString();
                btn_Sua.Enabled = true;
                btn_Xoa.Enabled = true;
            }
        }

        
    }
}
