export default function getAvgRating(ratings = [], precision = 1) {
  if (!Array.isArray(ratings) || ratings.length === 0) return 0;

  const total = ratings.reduce((sum, item) => {
    const value = Number(item?.rating) || 0;
    return sum + value;
  }, 0);

  const multiplier = 10 ** precision;
  const average = (total / ratings.length) * multiplier;

  return Math.round(average) / multiplier;
}