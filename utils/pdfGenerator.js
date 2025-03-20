export async function generateInvoicePDF(formData) {
  try {
    // Dynamic import to prevent SSR issues
    const { jsPDF } = await import("jspdf");
    const autoTable = (await import("jspdf-autotable")).default;

    const doc = new jsPDF();

    // Invoice Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Invoice", 105, 15, { align: "center" });

    // Invoice Details
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Invoice #: ${formData?.invoice || "N/A"}`, 14, 30);
    doc.text(`Date: ${formData?.date || "N/A"}`, 14, 40);

    // Table Headers & Data
    const tableHeaders = [
      ["Product", "Type", "Quantity", "Received Qty", "Rate ($)", "Total ($)"],
    ];
    const tableData = [];

    if (Array.isArray(formData?.accordionItems)) {
      formData.accordionItems.forEach((accordion) => {
        if (Array.isArray(accordion.productRows)) {
          accordion.productRows.forEach((row) => {
            tableData.push([
              row?.selectProducts || "N/A",
              row?.selectType || "N/A",
              row?.quantity || 0,
              row?.receiveQty || 0,
              row?.rate ? `$${row.rate}` : "$0",
              row?.total ? `$${row.total}` : "$0",
            ]);
          });
        }
      });
    }

    // Generate Table
    autoTable(doc, {
      startY: 50,
      head: tableHeaders,
      body: tableData,
      theme: "grid",
      styles: {
        fontSize: 10,
        cellPadding: 3,
      },
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    // Save PDF
    doc.save(`Invoice_${formData?.invoice || "N/A"}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
}
