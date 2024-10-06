import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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

  function clearList() {
    if (items === null) return;
    const confirm = window.confirm(
      "Are you sure you want to clear the packing list"
    );
    if (confirm) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={deleteItem}
        onChangeItemsStatus={updateItem}
        onClearList={clearList}
      />
      <Stats items={items} />
    </div>
  );
}
