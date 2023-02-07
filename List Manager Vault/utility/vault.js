"use strict";

class Vault {
    constructor() {
        this.lists = [];
        return this;
    }

    addList (list) {
        this.lists.push(list);
        return this;
    }

    addLists (listArray) {
        listArray.forEach(list => {
            this.lists.push(list)
        });
        return this;
    }
    
    removeListByName (listName) {
        const index = this.lists.findIndex(List => List.name === listName);
        if (index === -1) {return "List not found"}
        this.lists.splice(index, 1);
        return this;
    }

//    get lists () {
//        return this.lists;
//    }

    getListByName (listName) {
        const list = this.lists.find(List => List.name === listName);
        return list;
    }

    getFirstList () {
        return this.lists[0];
    }

    getListIndex (listName) {
        const index = this.lists.findIndex(List => List.name === listName);
        if (index === -1) {return "List not found"}
        return index;
    }

    insertListInPosition (list, index) {
        this.lists.splice(index, 0, list);
        return this;
    }
}

class List {
    constructor(name, items = []) {
        this.name = name;
        this.items = items;
        return this;
    }

//    get name () {
//        return this.name;
//    }

//    set name (newName) {
//        this.name = newName;
//        return this;
//    }

//    get items () {
//        return this.items;
//    }

    addItem (itemName) {
        this.items.push(itemName);
        return this;
    }

    removeItem (itemName) {
        if (this.items.length === 0) {return "No items to remove"}
        const index = this.items.findIndex(item => item === itemName);
        if (index === -1) {return "Item does not exist"}
        this.items.splice(index, 1);
        return this;
    }

    editItem (oldItemName, newItemName) {
        const index = this.items.findIndex(item => item === oldItemName);
        if (index === -1) {return "Item does not exist"}
        this.items.splice(index, 1, newItemName);
        return this;
    }

    getItemIndex (itemName) {
        const index = this.items.findIndex(item => item === itemName);
        if (index === -1) {return "Item does not exist"};
        return index;
    }

    insertItemInPosition (itemName, index) {
        this.items.splice(index, 0, itemName);
        return this;
    }
}