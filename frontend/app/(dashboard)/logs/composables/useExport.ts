import { useAlert } from "@/context/alert-context";
import { Log } from "@/hooks/use-logs";

export function useExport(logs: Log[]) {
  const { showAlert } = useAlert();

  const handleExport = (type: "excel" | "csv") => {
    if (logs.length === 0) {
      showAlert("No logs to export", "destructive");
      return;
    }

    if (type === "csv") {
      const headers = ["ID", "Date & Time", "Activity", "Duration", "Status"];
      const csvContent = [
        headers.join(","),
        ...logs.map((log) =>
          [
            log.id,
            `"${new Date(log.timestamp).toLocaleString().replace(/"/g, '""')}"`,
            `"${log.activity.replace(/"/g, '""')}"`,
            `"${(log.duration ?? "").replace(/"/g, '""')}"`,
            log.status,
          ].join(","),
        ),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `logs_${new Date().toISOString()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      const headers = ["ID", "Date & Time", "Activity", "Duration", "Status"];
      const tableHTML = `
        <table border="1">
          <thead>
            <tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr>
          </thead>
          <tbody>
            ${logs
              .map(
                (log) => `
              <tr>
                <td>${log.id}</td>
                <td>${new Date(log.timestamp).toLocaleString()}</td>
                <td>${log.activity}</td>
                <td>${log.duration ?? ""}</td>
                <td>${log.status}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      `;
      const blob = new Blob([tableHTML], { type: "application/vnd.ms-excel" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `logs_${new Date().toISOString()}.xls`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return { handleExport };
}
