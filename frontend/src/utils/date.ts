export function formatDate(dateString?: string): string {
  if (!dateString) return "Fecha no disponible";

  const date = new Date(dateString);
  return date.toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatTime(dateString?: string): string {
  if (!dateString) return "Hora no disponible";

  const date = new Date(dateString);
  return date.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDateTime(dateString?: string): string {
  if (!dateString) return "Fecha no disponible";

  const date = new Date(dateString);
  return date.toLocaleString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}