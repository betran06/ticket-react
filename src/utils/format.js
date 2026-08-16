export const formatDate = (dateString) => {
  if (!dateString) return '-';
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  } catch (e) {
    return dateString;
  }
};

export const formatStatus = (status) => {
  switch (status) {
    case 'open':
      return { label: 'Open', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
    case 'onprogress':
      return { label: 'On Progress', color: 'bg-blue-100 text-blue-800 border-blue-200' };
    case 'resolved':
      return { label: 'Resolved', color: 'bg-green-100 text-green-800 border-green-200' };
    case 'rejected':
      return { label: 'Rejected', color: 'bg-red-100 text-red-800 border-red-200' };
    default:
      return { label: status || 'Unknown', color: 'bg-gray-100 text-gray-800 border-gray-200' };
  }
};

export const formatPriority = (priority) => {
  switch (priority) {
    case 'low':
      return { label: 'Low', color: 'bg-slate-100 text-slate-700 border-slate-200' };
    case 'medium':
      return { label: 'Medium', color: 'bg-amber-100 text-amber-800 border-amber-200' };
    case 'high':
      return { label: 'High', color: 'bg-rose-100 text-rose-800 border-rose-200' };
    default:
      return { label: priority || 'Normal', color: 'bg-gray-100 text-gray-700 border-gray-200' };
  }
};
