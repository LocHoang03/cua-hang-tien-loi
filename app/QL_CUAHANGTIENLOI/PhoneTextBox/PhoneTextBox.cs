using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows.Forms;


namespace PhoneTextBox
{
    public class PhoneTextBox: TextBox
    {
        ErrorProvider error;
        public PhoneTextBox()
        {
            this.TextChanged += PhoneTextBox_TextChanged;
            this.error = new ErrorProvider();
        }

        void PhoneTextBox_TextChanged(object sender, EventArgs e)
        {
            Regex regex = new Regex(@"^0\d{9}$");
            string phone = this.Text;

            if (regex.IsMatch(phone))
            {
                error.Clear();
            }
            else
            {
                error.SetError(this, "Phone is not valid.");
            }
        }
    }
}
