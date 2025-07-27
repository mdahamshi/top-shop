export function StarRating({ rate, color = 'var(--sb-theme-color,gold)' }) {
  const full = Math.floor(rate);
  const half = rate % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;

  return (
    <div style={{ color: color, fontSize: '20px' }}>
      {'★'.repeat(full)}
      {half ? '⯪' : ''}
      {'☆'.repeat(empty)}
    </div>
  );
}
