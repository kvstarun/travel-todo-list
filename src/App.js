import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    //Here we are taking the current-state of the items[] and then adding the new items to the 'items' state. But while adding items to the array, we are creating new array because arrays should be immutable and we shouldn't mutate an array.
    //Here currItems is an empty array i.e currItems = []; and now we are adding new items into this currItems array, which then stores in items[] array using setItems() method.
    setItems((currItems) => [...currItems, item]);
  }

  function deleteItem(id) {
    setItems((currItems) =>
      currItems.filter((toDeleteItem) => toDeleteItem.id !== id)
    );
  }

  function updateItem(id) {
    setItems((currItems) =>
      currItems.map((toUpdateItem) =>
        toUpdateItem.id === id
          ? { ...toUpdateItem, packed: !toUpdateItem.packed }
          : toUpdateItem
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={deleteItem}
        onChangeItemsStatus={updateItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴Travel To-Do🎒</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  //This function is basically used to not reload the page entirely whenever we add an item and click add or hit enter
  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem); //We are calling handleAddItems() using a prop onAddItems which used in

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip 🤔💭?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Add your items..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onChangeItemsStatus }) {
  return (
    <div className="list">
      <ul className="list">
        {items.map((item) => (
          <Item
            itemObj={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onChangeItemsStatus={onChangeItemsStatus}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ itemObj, onDeleteItem, onChangeItemsStatus }) {
  return (
    <li>
      <input
        type="checkbox"
        value={itemObj.packed}
        onChange={() => onChangeItemsStatus(itemObj.id)}
      />
      <span style={itemObj.packed ? { textDecoration: "line-through" } : {}}>
        {itemObj.quantity} {itemObj.description}
      </span>
      <button onClick={() => onDeleteItem(itemObj.id)}>❌</button>
    </li>
  );
}

function Stats({ items }) {
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
