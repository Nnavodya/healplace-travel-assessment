/**
 * Format a numeric amount into Sri Lankan Rupees (LKR) with commas.
 * Example: 25000 -> "Rs. 25,000"
 */
export function formatLKR(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return 'Rs. 0';
  }
  return `Rs. ${amount.toLocaleString('en-US')}`;
}

