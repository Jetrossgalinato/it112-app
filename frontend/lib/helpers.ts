export const getStatusColor = (status: string) => {
  switch (status) {
    case "Not Started":
      return "bg-slate-500";
    case "Pending":
      return "bg-yellow-500";
    case "In Progress":
      return "bg-blue-500";
    case "Completed":
      return "bg-green-500";
    default:
      return "bg-slate-500";
  }
};
