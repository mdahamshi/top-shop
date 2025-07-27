import './css/StarRating.css';
export function StarRating({ rate, color = 'var(--sb-theme-color,gold)' }) {
  const percent = `${(Math.min(rate, 5) / 5) * 100}%`;

  return (
    <div
      className="star-rating"
      style={{ '--star-percent': percent, '--star-color': color }}
    >
      <span></span>
    </div>
  );
}
