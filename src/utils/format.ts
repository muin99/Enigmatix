const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatDate(iso: string): string {
  const date = new Date(iso);
  return `${MONTHS[date.getMonth()]} ${String(date.getDate()).padStart(2, "0")}`;
}

export function formatCredits(amount: number): string {
  return amount > 0 ? `+${amount}` : `${amount}`;
}

export function formatMoney(amount: number): string {
  return `$${amount.toFixed(2)}`;
}
