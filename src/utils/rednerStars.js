export const renderStars = (rate) => {
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  const stars = [];
  for (let i = 0; i < fullStars; i++) stars.push('★');
  if (hasHalfStar) stars.push('☆'); // optional: half star
  for (let i = 0; i < emptyStars; i++) stars.push('☆');
  return stars.join(' ');
};
