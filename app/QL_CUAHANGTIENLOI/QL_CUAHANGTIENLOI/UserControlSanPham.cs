using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using CloudinaryDotNet;
using System.Data.SqlClient;
using CloudinaryDotNet.Actions;
using BLL;
using System.Net;
using System.IO;

namespace QL_CUAHANGTIENLOI
{
    public partial class UserControlSanPham : UserControl
    {
        BLLProduct pbll = new BLLProduct();

        DBConnection db = new DBConnection();
        public Cloudinary cloudinary;
        public const string CLOUD_NAME = "degvzjziz";
        public const string API_KEY = "982992473793533";
        public const string API_SECRET = "2PypkgkMZdjg2luVx4mK4rMQF70";
        public string imagePath, ImageID, ImageURL;
        byte[] imageData;

        bool isAdding = false;

        public UserControlSanPham()
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
            image.ImageLocation = null;
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

        private void UserControlSanPham_Load(object sender, EventArgs e)
        {
            LoadComboBoxType();
            LoadPriceRanges();
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
            var uploadParams = new ImageUploadParams()
            {
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
            if (result == DialogResult.OK)
            {
                image.SizeMode = PictureBoxSizeMode.Zoom;
                image.Image = new Bitmap(dlg.FileName);
                imagePath = dlg.FileName;
            }
        }


        private void btn_Them_Click(object sender, EventArgs e)
        {
            isAdding = true;
            txt_Title.Enabled = true;
            txt_Price.Enabled = true;
            cbo_TypeID.Enabled = true;

            btn_Choose.Enabled = true;
            btn_Luu.Enabled = true;
            image.Image = null;
            txt_Title.Clear();
            txt_Price.Clear();
        }

        private void btn_Xoa_Click(object sender, EventArgs e)
        {
            if (dataGridView1.CurrentRow != null)
            {
                var productIdCell = dataGridView1.CurrentRow.Cells["PRODUCT_ID"];
                var imageIdCell = dataGridView1.CurrentRow.Cells["IMAGE_ID"];

                if (productIdCell.Value != null && !string.IsNullOrEmpty(productIdCell.Value.ToString()) && imageIdCell.Value != null)
                {
                    DialogResult dialogResult = MessageBox.Show("Bạn có chắc chắn muốn xóa?", "Xác nhận", MessageBoxButtons.YesNo);
                    if (dialogResult == DialogResult.Yes)
                    {
                        db.conn.Open();
                        string query = "DELETE FROM PRODUCTS WHERE PRODUCT_ID = @PRODUCT_ID";
                        SqlCommand sqlCommand = new SqlCommand(query, db.conn);
                        sqlCommand.Parameters.AddWithValue("@PRODUCT_ID", productIdCell.Value);
                        sqlCommand.ExecuteNonQuery();

                        string path = imageIdCell.Value.ToString();
                        if (cloudinary != null)
                        {
                            var deleteParams = new DelResParams()
                            {
                                PublicIds = new List<string> { path },
                                Type = "upload",
                                ResourceType = ResourceType.Image
                            };
                            var result = cloudinary.DeleteResources(deleteParams);
                        }

                        db.conn.Close();

                        displayDatagrid();
                        image.Image = null;
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
                btn_Luu.Enabled = true;
            }
        }


        

        private void btn_Luu_Click(object sender, EventArgs e)
        {

            var imageIdCell = dataGridView1.CurrentRow.Cells["IMAGE_ID"];
            if (string.IsNullOrWhiteSpace(txt_Title.Text) || string.IsNullOrWhiteSpace(txt_Price.Text) || cbo_TypeID.SelectedValue == null)
            {
                MessageBox.Show("Vui lòng điền đầy đủ thông tin sản phẩm.", "Thông báo", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                return;
            }

            if (dataGridView1.CurrentRow == null || dataGridView1.CurrentRow.Cells["IMAGE_ID"].Value == null || dataGridView1.CurrentRow.Cells["IMAGE_URL"].Value == null)
            {
                MessageBox.Show("Thông tin hình ảnh không hợp lệ.", "Thông báo", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }

            string path = dataGridView1.CurrentRow.Cells["IMAGE_ID"].Value.ToString();
            string url = dataGridView1.CurrentRow.Cells["IMAGE_URL"].Value.ToString();

            if (isAdding)
            {
                if (!string.IsNullOrEmpty(imagePath))
                {
                    cloudinaryStorage(); // Tải lên ảnh mới
                }
                else
                {
                    MessageBox.Show("Vui lòng chọn hình ảnh.", "Thông báo", MessageBoxButtons.OK, MessageBoxIcon.Information);
                    return;
                }

                image.ImageLocation = null;
                save(); // Thêm sản phẩm mới

                MessageBox.Show("Sản phẩm đã được thêm thành công.", "Thông báo", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            else
            {
                if (string.IsNullOrEmpty(path))
                {
                    MessageBox.Show("Không thể xóa ảnh, đường dẫn hình ảnh không hợp lệ.", "Thông báo", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return;
                }
                string pathDel = imageIdCell.Value.ToString();
                MessageBox.Show(pathDel);
                MessageBox.Show(imagePath);
                if (cloudinary != null)
                {
                    var deleteParams = new DelResParams()
                    {
                        PublicIds = new List<string> { pathDel },
                        Type = "upload",
                        ResourceType = ResourceType.Image
                    };
                    var result = cloudinary.DeleteResources(deleteParams);
                    Console.WriteLine(result.JsonObj);
                }

                cloudinaryStorage(); // Tải lên ảnh mới
                save(); // Cập nhật thông tin sản phẩm

                MessageBox.Show("Thông tin sản phẩm đã được cập nhật.", "Thông báo", MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            image.Image = null;
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

        public void SearchProduct()
        {
            string search = txt_TimKiem.Text;
            dataGridView1.DataSource = pbll.SearchProductsByTitle(search);
        }
        private void btn_TimKiem_Click(object sender, EventArgs e)
        {
            SearchProduct();
        }

        private void LoadPriceRanges()
        {
            cbo_Price.Items.Add("0 - 30000đ");
            cbo_Price.Items.Add("31000đ - 50000đ");
            cbo_Price.Items.Add("50000đ - 100000đ");
            cbo_Price.Items.Add("Trên 100000đ");
        }


        private void btn_Reset_Click(object sender, EventArgs e)
        {
            UserControlSanPham_Load(this, null);
        }
        public void FilterProduct()
        {
            string selectedRange = cbo_Price.SelectedItem as string;
            if (selectedRange == null)
            {
                MessageBox.Show("Please select a price range.");
                return;
            }

            decimal minPrice = 0;
            decimal maxPrice = decimal.MaxValue;

            if (selectedRange.Contains("0 - 30000đ"))
            {
                minPrice = 0;
                maxPrice = 30000;
            }
            else if (selectedRange.Contains("31000đ - 50000đ"))
            {
                minPrice = 31000;
                maxPrice = 50000;
            }
            else if (selectedRange.Contains("50000đ - 100000đ"))
            {
                minPrice = 50000;
                maxPrice = 100000;
            }
            else if (selectedRange.Contains("Trên 100000đ"))
            {
                minPrice = 100000;
                maxPrice = 99999999;
            }

            dataGridView1.DataSource = pbll.GetProductsByPriceRange(minPrice, maxPrice);
        }

        private void btn_Loc_Click(object sender, EventArgs e)
        {
            FilterProduct();
        }



    }
}
