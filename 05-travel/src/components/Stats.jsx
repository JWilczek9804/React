export default function Stats({ items }) {
  if (!items.length) {
    return (
      <footer className="stats">
        <p>
          <em>Start adding some items to your packing list🚀</em>
        </p>
      </footer>
    );
  }

  const numPacked = items.filter((item) => item.packed).length;
  const persentage = ((numPacked / items.length) * 100).toFixed(2);
  return (
    <div className="stats">
      <em>
        {persentage == 100
          ? "You got everything. Ready to travel!!🥳"
          : `💼You have ${items.length} items on your list and you already packed ${numPacked} items (${persentage}%)`}
      </em>
    </div>
  );
}
