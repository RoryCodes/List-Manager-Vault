class List {
    constructor(name, items = ["Add your first item here!"]) {
        this._name = name;
        this._items = items;
        return this;
    }

    get name () {
        return this._name;
    }

    set name (newName) {
        this._name = newName;
        return this;
    }

    get items () {
        return this._items;
    }

    addItem (itemName) {
        this._items.push(itemName);
        return this;
    }

    removeItem (itemName) {
        if (this._items.length === 0) {return "No items to remove"}
        const index = this._items.findIndex(item => item === itemName);
        if (index === -1) {return "Item does not exist"}
        this._items.splice(index, 1);
        return this;
    }

    editItem (OldItemName, NewItemName) {
        const index = this._items.findIndex(item => item === OldItemName);
        if (index === -1) {return "Item does not exist"}
        this._items.splice(index, 1, NewItemName);
        return this;
    }

    getItemIndex (itemName) {
        const index = this._items.findIndex(item => item === itemName);
        if (index === -1) {return "Item does not exist"};
        return index;
    }

    insertItemInPosition (itemName, index) {
        this._items.splice(index, 0, itemName);
        return this;
    }
}

const groceryList = new List('Groceries');
//console.log(groceryList);

if (new List("Name Match").name !== "Name Match") {
    throw new Error("Check Fail: Name Match");
}
if (new List("Items instantiation").items[0] !== 'Add your first item here!') {
    throw new Error("Check Fail: Items instantiation");
}
if (new List("Set Name", ["item1"]).name = "NEW NAME!" !== "NEW NAME!") {
    throw new Error("Check Fail: Set Name");
}
if (new List("Edit Item", ["first item", "second item"]).editItem("first item", "Renamed Item").items[0] != "Renamed Item") {
    throw new Error("Check Fail: Edit Item");
}
if (new List("First List", ["item1", "item2"]).editItem("NoNameItem", "Renamed Item") !== "Item does not exist") {
    throw new Error("Check Fail: Set Item Error Check Message");
}
if (new List("First List", ["item1", "item2"]).removeItem("item1").items[0] !== "item2") {
    throw new Error("Check Fail: Remove Item");
}
if (new List("First List", ["item1", "item2"]).removeItem("item12") !== "Item does not exist") {
    throw new Error("Check Fail: Remove Item - No items to remove");
}
if (new List("First List", ["item1"]).removeItem("item1").removeItem("any item") !== "No items to remove") {
    throw new Error("Check Fail: Remove Item - No items to remove");
}
if (new List("First List", ["item1"]).getItemIndex("item1") != 0) {
    throw new Error("Check Fail: Get Item Index - item 0")
}
if (new List("First List", ["item1"]).addItem("newItem").getItemIndex("newItem") != 1) {
    throw new Error("Check Fail: Get Item Index - item 1")
}
if (new List("First List", ["item1"]).addItem("newItem").getItemIndex("newItem1") != "Item does not exist") {
    throw new Error("Check Fail: Get Item Index - Item does not exist")
}
if (new List("First List", ["item1"]).insertItemInPosition("newItem", 0).getItemIndex("newItem") != 0) {
    throw new Error("Check Fail: Insert Item In Position - First Position")
}
if (new List("First List", ["item1"]).insertItemInPosition("newItem", 1).getItemIndex("newItem") != 1) {
    throw new Error("Check Fail: Insert Item In Position - Second Position")
}
if (new List("First List", ["item1"]).insertItemInPosition("newItem", 99).getItemIndex("newItem") != List.length) {
    throw new Error("Check Fail: Insert Item In Position - Last Position")
}
////////////////////////////////////////////////////////////////////////////////

class Vault {
    constructor() {
        this._lists = [];
        return this;
    }

    addList (list) {
        this._lists.push(list);
        return this;
    }

    removeListByName (_listName) {
        const index = this._lists.findIndex(List => List._name === _listName);
        if (index === -1) {return "List not found"}
        this._lists.splice(index, 1);
        return this;
    }

    get lists () {
        return this._lists;
    }

    getListByName (_listName) {
        const list = this._lists.find(List => List._name === _listName);
        return list;
    }

    getFirstList () {
        return this._lists[0];
    }

    getListIndex (_listName) {
        const index = this._lists.findIndex(List => List._name === _listName);
        if (index === -1) {return "List not found"}
        return index;
    }

    insertListInPosition (list, index) {
        this._lists.splice(index, 0, list);
        return this;
    }
}

const newList = new List("first List");
//console.log(newList);
const secondList = new List("second List");
//console.log(secondList);
const newVault = new Vault();
//console.log(newVault);
if (newVault.addList(newList).lists[0].name !== "first List") {
    throw new Error("Check Fail: Add List");
}
if (newVault.addList(secondList).removeListByName("first List").lists[0].name !== "second List") {
    throw new Error("Check Fail: Remove List By Name");
}
if (new Vault().addList(newList).removeListByName("1second List") !== "List not found") {
    throw new Error("Check Fail: Remove List By Name - List Not Found");
}
if (new Vault().addList(newList).addList(secondList).getListByName("first List").name !== "first List") {
    throw new Error("Check Fail: Get List By Name")
}
if (new Vault().addList(newList).getFirstList().name !== "first List") {
    throw new Error("Check Fail: Get First List")
}
if (new Vault().addList(newList).addList(secondList).getListIndex("first List") !== 0) {
    throw new Error("Check Fail: Get List Index - First List")
}
if (new Vault().addList(newList).addList(secondList).getListIndex("first List") !== 0) {
    throw new Error("Check Fail: Get List Index - First List")
}
if (new Vault().addList(newList).addList(secondList).getListIndex("first List1") !== "List not found") {
    throw new Error("Check Fail: Get List Index - List not found")
}
if (new Vault().addList(newList).insertListInPosition(secondList, 0).getListIndex("second List") !== 0) {
    throw new Error("Check Fail: Insert List In Position - First Position")
}
if (new Vault().addList(newList).addList(newList).addList(secondList).insertListInPosition(secondList, 99).getListIndex("second List") !== 2) {
    throw new Error("Check Fail: Insert List In Position - Last Position")
}
