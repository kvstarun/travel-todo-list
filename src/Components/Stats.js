export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding items that you need for your vacation 😄</em>
      </p>
    );

  const totalItems = items.length;
  const itemsPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((itemsPacked / totalItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You packed everything. Have a great vacation🕺💃"
          : `🧳You have ${totalItems} items on your list and you already packed ${itemsPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
