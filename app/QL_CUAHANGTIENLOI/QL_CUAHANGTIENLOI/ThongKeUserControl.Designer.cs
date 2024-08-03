namespace QL_CUAHANGTIENLOI
{
    partial class ThongKeUserControl
    {
        /// <summary> 
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.Windows.Forms.DataVisualization.Charting.ChartArea chartArea1 = new System.Windows.Forms.DataVisualization.Charting.ChartArea();
            System.Windows.Forms.DataVisualization.Charting.Legend legend1 = new System.Windows.Forms.DataVisualization.Charting.Legend();
            System.Windows.Forms.DataVisualization.Charting.Series series1 = new System.Windows.Forms.DataVisualization.Charting.Series();
            System.Windows.Forms.DataVisualization.Charting.Title title1 = new System.Windows.Forms.DataVisualization.Charting.Title();
            this.btn_current_date = new System.Windows.Forms.Button();
            this.btn_date = new System.Windows.Forms.Button();
            this.btn_current_dt = new System.Windows.Forms.Button();
            this.btn_dt = new System.Windows.Forms.Button();
            this.chart1 = new System.Windows.Forms.DataVisualization.Charting.Chart();
            ((System.ComponentModel.ISupportInitialize)(this.chart1)).BeginInit();
            this.SuspendLayout();
            // 
            // btn_current_date
            // 
            this.btn_current_date.BackColor = System.Drawing.Color.LightGray;
            this.btn_current_date.Enabled = false;
            this.btn_current_date.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btn_current_date.Font = new System.Drawing.Font("Arial Narrow", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_current_date.ForeColor = System.Drawing.Color.White;
            this.btn_current_date.Location = new System.Drawing.Point(753, 27);
            this.btn_current_date.Name = "btn_current_date";
            this.btn_current_date.Size = new System.Drawing.Size(325, 99);
            this.btn_current_date.TabIndex = 14;
            this.btn_current_date.Text = "button1";
            this.btn_current_date.UseVisualStyleBackColor = false;
            // 
            // btn_date
            // 
            this.btn_date.BackColor = System.Drawing.Color.LightGray;
            this.btn_date.Enabled = false;
            this.btn_date.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btn_date.Font = new System.Drawing.Font("Arial Narrow", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_date.ForeColor = System.Drawing.Color.White;
            this.btn_date.Location = new System.Drawing.Point(1115, 27);
            this.btn_date.Name = "btn_date";
            this.btn_date.Size = new System.Drawing.Size(325, 99);
            this.btn_date.TabIndex = 13;
            this.btn_date.Text = "button1";
            this.btn_date.UseVisualStyleBackColor = false;
            // 
            // btn_current_dt
            // 
            this.btn_current_dt.BackColor = System.Drawing.Color.LightGray;
            this.btn_current_dt.Enabled = false;
            this.btn_current_dt.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btn_current_dt.Font = new System.Drawing.Font("Arial Narrow", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_current_dt.ForeColor = System.Drawing.Color.White;
            this.btn_current_dt.Location = new System.Drawing.Point(394, 27);
            this.btn_current_dt.Name = "btn_current_dt";
            this.btn_current_dt.Size = new System.Drawing.Size(325, 99);
            this.btn_current_dt.TabIndex = 12;
            this.btn_current_dt.Text = "button1";
            this.btn_current_dt.UseVisualStyleBackColor = false;
            // 
            // btn_dt
            // 
            this.btn_dt.BackColor = System.Drawing.Color.LightGray;
            this.btn_dt.Enabled = false;
            this.btn_dt.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.btn_dt.Font = new System.Drawing.Font("Arial Narrow", 18F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.btn_dt.ForeColor = System.Drawing.Color.White;
            this.btn_dt.Location = new System.Drawing.Point(38, 27);
            this.btn_dt.Name = "btn_dt";
            this.btn_dt.Size = new System.Drawing.Size(325, 99);
            this.btn_dt.TabIndex = 11;
            this.btn_dt.Text = "button2";
            this.btn_dt.UseVisualStyleBackColor = false;
            // 
            // chart1
            // 
            chartArea1.Name = "ChartArea1";
            this.chart1.ChartAreas.Add(chartArea1);
            legend1.Name = "Legend1";
            this.chart1.Legends.Add(legend1);
            this.chart1.Location = new System.Drawing.Point(0, 167);
            this.chart1.Name = "chart1";
            series1.ChartArea = "ChartArea1";
            series1.Legend = "Legend1";
            series1.LegendText = "Thống kê doanh thu cửa hàng";
            series1.Name = "Series1";
            this.chart1.Series.Add(series1);
            this.chart1.Size = new System.Drawing.Size(1494, 547);
            this.chart1.TabIndex = 15;
            this.chart1.Text = "chart1";
            title1.Name = "Title1";
            title1.Text = "Thống kê nhóm khách hàng";
            this.chart1.Titles.Add(title1);
            // 
            // ThongKeUserControl
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.chart1);
            this.Controls.Add(this.btn_current_date);
            this.Controls.Add(this.btn_date);
            this.Controls.Add(this.btn_current_dt);
            this.Controls.Add(this.btn_dt);
            this.Name = "ThongKeUserControl";
            this.Size = new System.Drawing.Size(1500, 714);
            ((System.ComponentModel.ISupportInitialize)(this.chart1)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.Button btn_current_date;
        private System.Windows.Forms.Button btn_date;
        private System.Windows.Forms.Button btn_current_dt;
        private System.Windows.Forms.Button btn_dt;
        private System.Windows.Forms.DataVisualization.Charting.Chart chart1;
    }
}
