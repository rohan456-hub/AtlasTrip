import PDFDocument from "pdfkit";

export const createReceiptBuffer = (booking, item, user) =>
  new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 40 });
    const chunks = [];

    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));

    doc.fontSize(22).text("Travel Booking Receipt", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Booking ID: ${booking._id}`);
    doc.text(`Traveller: ${user.name}`);
    doc.text(`Email: ${user.email}`);
    doc.text(`Booking Type: ${booking.bookingType}`);
    doc.text(`Travel Date: ${booking.travelDate}`);
    doc.text(`Status: ${booking.status}`);
    doc.text(`Total Amount: $${booking.totalAmount}`);
    doc.moveDown();
    doc.fontSize(14).text("Booked Item", { underline: true });
    doc.fontSize(12).text(item?.title || item?.name || item?.flightNumber || "Travel Item");
    doc.text(item?.destination || item?.city || `${item?.from || ""} - ${item?.to || ""}`);
    doc.moveDown();
    doc.fontSize(14).text("Passengers", { underline: true });
    booking.passengers.forEach((passenger, index) => {
      doc.fontSize(12).text(
        `${index + 1}. ${passenger.firstName} ${passenger.lastName} | ${passenger.gender} | Passport: ${passenger.passportNumber}`
      );
    });

    doc.end();
  });
