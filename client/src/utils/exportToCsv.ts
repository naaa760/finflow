interface ExportData {
  Date: string;
  Description: string;
  Category: string;
  Amount: number;
  Type: "income" | "expense";
  [key: string]: string | number;
}

export const exportToCsv = (data: ExportData[], filename: string) => {
  if (!data || !data.length) {
    console.warn("No data to export");
    return;
  }

  try {
    // Convert data to CSV format
    const csvData = data.map((row) => {
      return Object.values(row).join(",");
    });

    // Add headers
    const headers = Object.keys(data[0]).join(",");
    csvData.unshift(headers);

    // Create blob and save file
    const csvContent = csvData.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Failed to export CSV:", error);
  }
};
