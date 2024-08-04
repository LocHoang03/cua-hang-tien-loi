const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const createOrderPdf = (order, user, products, res) => {
  return new Promise((resolve, reject) => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const pdfDoc = new PDFDocument({
      margins: {
        top: 30,
        bottom: 50,
        left: 72,
        right: 72,
      },
    });
    let fontpath = path.join(__dirname, '../', 'fonts', 'Arial.ttf');
    const invoiceName = 'invoice-' + order.ORDER_ID + '.pdf';
    const invoicePath = path.join('data', 'invoice', invoiceName);
    pdfDoc.pipe(fs.createWriteStream(invoicePath));
    pdfDoc.pipe(res);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'inline; filename="' + invoicePath + '"',
    );

    // Bắt đầu ghi PDF
    pdfDoc.font(fontpath).fontSize(14).text('NEXTSTORE', {
      align: 'center',
    });
    const yPos = pdfDoc.y;
    pdfDoc
      .fontSize(14)
      .text(
        'hoangphuocloc.phurieng@gmail.com, +84967936728',
        pdfDoc.page.margins.left,
        yPos,
        {
          align: 'center',
        },
      );
    pdfDoc.moveDown();

    pdfDoc
      .fontSize(30)
      .text('Hóa đơn mua hàng', pdfDoc.page.margins.left, 100, {
        align: 'center',
      });
    pdfDoc.moveDown();
    pdfDoc.fontSize(14).text('ID hóa đơn: ' + order.ORDER_ID);
    pdfDoc.moveDown();
    pdfDoc.fontSize(14).text('Khách hàng: ' + user.NAME);
    pdfDoc.moveDown();
    pdfDoc.fontSize(14).text('Số điện thoại: ' + user.PHONE);
    pdfDoc.moveDown();
    pdfDoc.fontSize(14).text('Email: ' + user.EMAIL);
    pdfDoc.moveDown();
    pdfDoc.fontSize(14).text('Date: ' + `${day}/${month}/${year}`);

    const yPosition = pdfDoc.y + 30;
    pdfDoc
      .fontSize(14)
      .fillColor('#24a99f')
      .text('Tên sản phẩm', pdfDoc.page.margins.left, yPosition);
    pdfDoc
      .fillColor('#24a99f')
      .text('Giá', pdfDoc.page.margins.left + 255, yPosition);
    pdfDoc
      .fillColor('#24a99f')
      .text('Số lượng', pdfDoc.page.margins.left + 320, yPosition);
    pdfDoc
      .fillColor('#24a99f')
      .text('Tổng tiền', pdfDoc.page.margins.left + 405, yPosition);

    pdfDoc
      .strokeColor('#24a99f')
      .moveTo(pdfDoc.page.margins.left, yPosition + 20)
      .lineTo(pdfDoc.page.width - pdfDoc.page.margins.right, yPosition + 20)
      .stroke();

    let y = yPosition + 30;
    let yProduct = y;
    let total = 0;
    products.map((data) => {
      total += data.PRICE * data.QUANTITY;
      pdfDoc
        .fontSize(10)
        .fillColor('#000')
        .text(data.TITLE, pdfDoc.page.margins.left, yProduct);
      pdfDoc.text(
        `${data.PRICE} VND`,
        pdfDoc.page.margins.left + 240,
        yProduct,
        {
          width: 100,
          align: 'left',
        },
      );
      pdfDoc.text(
        `${data.QUANTITY}`,
        pdfDoc.page.margins.left + 300,
        yProduct,
        {
          width: 100,
          align: 'center',
        },
      );
      pdfDoc.text(
        `${data.PRICE * data.QUANTITY} VND`,
        pdfDoc.page.margins.left + 410,
        yProduct,
        { width: 100, align: 'left' },
      );

      pdfDoc
        .strokeColor('#ccc')
        .lineWidth(1)
        .moveTo(pdfDoc.page.margins.left, yProduct + 22)
        .lineTo(pdfDoc.page.width - pdfDoc.page.margins.right, yProduct + 22)
        .stroke();
      yProduct = yProduct + 30;
    });

    pdfDoc
      .fontSize(13)
      .fillColor('#000')
      .text('Phí vận chuyển: ', pdfDoc.page.margins.left, yProduct);
    pdfDoc.text(
      order.FEE - total + ' VND',
      pdfDoc.page.margins.left + 362,
      yProduct,
      {
        width: 100,
        align: 'right',
      },
    );
    pdfDoc
      .fillColor('#000')
      .text('Tổng tiền: ', pdfDoc.page.margins.left, yProduct + 20);
    pdfDoc.text(
      order.FEE + ' VND',
      pdfDoc.page.margins.left + 362,
      yProduct + 20,
      {
        width: 100,
        align: 'right',
      },
    );

    const yPositionTerms = pdfDoc.y + 50;
    pdfDoc.moveDown();
    pdfDoc
      .fontSize(16)
      .text(
        'Điều khoản và điều kiện',
        pdfDoc.page.margins.left,
        yPositionTerms,
      );
    pdfDoc.moveDown();
    pdfDoc;
    pdfDoc
      .font(fontpath)
      .fontSize(15)
      .text(
        '1. Các mức giá trong biểu mẫu này không có bất kỳ thay đổi nào và sẽ là mức giá áp dụng khi thanh toán.',
        pdfDoc.page.margins.left,
        yPositionTerms + 20,
      );
    pdfDoc.moveDown();
    pdfDoc
      .fontSize(15)
      .text(
        '2. Lệnh giao hàng này sẽ không có hiệu lực trừ khi người nhận xuất trình bản gốc hóa đơn mua hàng.',
        pdfDoc.page.margins.left,
        yPositionTerms + 60,
      );

    pdfDoc.end();

    resolve(invoicePath);
  });
};

module.exports = createOrderPdf;
