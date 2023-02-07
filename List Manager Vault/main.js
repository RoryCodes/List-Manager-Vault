// checks if values set by Tasker
AutoTools.setDefaultValues({
    prefix: "listManager",
    lists: '[{"name":"Your first list","items":["item one"]},{"name":"Your second list"}]',
    localBackup: true,
});

// DOM Element constants
const navDrawer = document.getElementById("nav__drawer");
const navDrawerLinkList = document.getElementById("nav__drawer-linklist");
const localBackupToggle = document.getElementById("toggle__local-backup");
const headerTitle = document.getElementById("header__title");
const mainList = document.getElementById("main__list");
const footerInput = document.getElementById("footer__input-text-add");
const dialog = document.getElementById("dialog");
const dialogButtonRight = document.getElementById("dialog__button-right");
const dialogTextInput = document.getElementById("dialog__text-input");
const dialogTextLabel = document.getElementById("dialog__text-label");
const dialogTextSupportingPrimary = document.getElementById("dialog__text-supporting-primary");
const dialogTextSupportingSecondary = document.getElementById("dialog__text-supporting-secondary");
const toast = document.getElementById("toast");
var itemToEdit = null;


// initializes page
var vault = new Vault();
JSON.parse(lists).forEach(list => {vault.addList(new List(list.name, list.items))});
showList(vault.getFirstList().name);
// sets local backup toggle
localBackupToggle.checked = localBackup;
// resets nav drawer
resetNavDrawer();

/**
 * adds item to current list
 */
function addToList () {
    // handles error for no input 
    if (footerInput.value === undefined || footerInput.value == "") {
        // writes console debug message
        let debugMsg = `Please add an item in the input`;
        sendUpdate("errorMessage", debugMsg);
        return
    }
    // adds to main list (on screen)
    mainList.appendChild(convertItemToListElement(footerInput.value));
    // adds to Vault Object
    let currentList = vault.getListByName(headerTitle.innerText);
    currentList.addItem(footerInput.value);
    // writes console debug message
    let debugMsg = `Added item: "${ footerInput.value }" to list: "${ currentList.name }"`;
    // AutoTools Command
    sendUpdate("vaultUpdate", debugMsg);
    // resets footer input
    footerInput.value = "";
    footerInput.parentElement.classList.remove("is-dirty");
}
/**
 * removes list item from current list
 * @param {element} item - list element
 */
function removeFromList (item) {
    // removes element from mainList
    let listElement = item.parentElement.parentElement;
    let listElementText = item.parentElement.previousElementSibling.firstElementChild.innerText;
    mainList.removeChild(listElement);
    // prepares Undo function
    let currentList = vault.getListByName(headerTitle.innerText);
    let index = currentList.getItemIndex(listElementText);
    let undoAction = function () {
        // adds back into Vault Object
        currentList.insertItemInPosition(listElementText, index);
        // refreshes list (on screen)
        showList(headerTitle.innerText);
        // writes console debug message
        let debugMsg = `Restored item: "${ listElementText }" to list: "${ currentList.name }"`;
        // AutoTools Command
        sendUpdate("vaultUpdate", debugMsg);
    };
    // removes from Vault Object
    currentList.removeItem(listElementText);
    // shows toast
    toast.MaterialSnackbar.showSnackbar({
        message: `Removed item: '${ listElementText }'`,
        actionHandler: undoAction,
        actionText: 'Undo',
    });
    // writes console debug message
    let debugMsg = `Removed item: "${ listElementText }" from list: "${ currentList.name }"`;
    // AutoTools Command
    sendUpdate("vaultUpdate", debugMsg);
}
/**
 * edits list item from current list
 * @param {element} item - list element
 */
function editFromList (item) {
    // sets title & texts
    dialog.firstElementChild.innerText = "Edit List Item?";
    let listItem = item.firstElementChild;
    dialogTextSupportingPrimary.innerText = "This will change the original item name of";
    dialogTextSupportingSecondary.innerText = listItem.innerText;
    // sets values & buttons
    dialogTextInput.value = listItem.innerText;
    itemToEdit = listItem;
    dialogButtonRight.innerText = "ACCEPT EDIT";
    dialog.showModal();
}
/**
 * adds new list to page
 */
function addNewList () {
    // sets title & texts
    dialog.firstElementChild.innerText = "Add new list?";
    dialogTextSupportingPrimary.innerText = "This will add a new list with name entered below:";
    dialogTextSupportingSecondary.innerText = "";
    // sets values & buttons
    dialogButtonRight.innerText = "ADD NEW";
    dialog.showModal();
}
/**
 * edits current list's name
 * @param {string} listName - list name to edit
 */
function editListName (listName) {
    // sets title & texts
    dialog.firstElementChild.innerText = "Edit list name?";
    dialogTextSupportingPrimary.innerText = "This will change the original list name of";
    dialogTextSupportingSecondary.innerText = listName;
    // sets values & buttons
    dialogTextInput.value = listName;
    dialogButtonRight.innerText = "EDIT NAME";
    dialog.showModal();
}
/**
 * removes current list on page
 */
function removeList () {
    // handles error for last list 
    if (vault.lists.length <= 1) {
        // writes console debug message
        let debugMsg = `Please add another list before deleting this one`;
        sendUpdate("errorMessage", debugMsg);
        return;
    }
    // sets title & texts
    dialog.firstElementChild.innerText = "Remove list?";
    dialogTextSupportingPrimary.innerText = "This will remove the list shown below:";
    dialogTextSupportingSecondary.innerText = "";
    // sets values & buttons
    dialogTextInput.value = headerTitle.innerText;
    dialogTextInput.setAttribute("disabled", true);
    dialogButtonRight.innerText = "REMOVE";
    dialog.showModal();
}
/**
 * performs various list actions
 * @param {string} buttonText - text of button
 */
function dialogAction (buttonText) {
    if (buttonText == "ACCEPT EDIT" && dialogTextInput.value != "") {
        // edits list element on page
        itemToEdit.innerText = dialogTextInput.value;
        // edits item from Vault Object
        let currentList = vault.getListByName(headerTitle.innerText);
        currentList.editItem(dialogTextSupportingSecondary.innerText, itemToEdit.innerText);
        // writes console debug message
        let debugMsg = `Edited item name from: "${ dialogTextSupportingSecondary.innerText }" to: "${ itemToEdit.innerText }" on list: "${ headerTitle.innerText }"`;
        // AutoTools Command
        sendUpdate("vaultUpdate", debugMsg);
    } else if (buttonText == "EDIT NAME" && dialogTextInput.value != "") {
        // edits list name from Vault Object
        let currentList = vault.getListByName(headerTitle.innerText);
        currentList.name = dialogTextInput.value;
        // edits list name in the header
        headerTitle.innerText = dialogTextInput.value;
        // resets nav drawer
        resetNavDrawer();
        // writes console debug message
        let debugMsg = `Edited list name from: "${ dialogTextSupportingSecondary.innerText }" to: "${ headerTitle.innerText }"`;
        // AutoTools Command
        sendUpdate("vaultUpdate", debugMsg);
    } else if (buttonText == "REMOVE" && dialogTextInput.value != "") {
        // prepares Undo function
        let index = vault.getListIndex(headerTitle.innerText);
        let list = vault.getListByName(headerTitle.innerText);
        let undoAction = function () {
            // adds back into Vault Object
            console.log(`var list is: ${ list.name }`);
            console.log(`var index is: ${ index }`);
            vault.insertListInPosition(list, index);
            // refreshes list (on screen)
            showList(list.name);
            // resets nav drawer
            resetNavDrawer();
            // writes console debug message
            let debugMsg = `Restored List: "${ list.name }"`;
            // AutoTools Command
            sendUpdate("vaultUpdate", debugMsg);
        };
        // remove list from Vault object
        vault.removeListByName(headerTitle.innerText);
        // shows toast
        toast.MaterialSnackbar.showSnackbar({
            message: `Removed list: '${ headerTitle.innerText }'`,
            actionHandler: undoAction,
            actionText: 'Undo',
        });
        // shows first list on page
        showList(vault.getFirstList().name);
        // resets nav drawer
        resetNavDrawer();
    } else if (buttonText == "ADD NEW" && dialogTextInput.value != "") {
        // adds new list to Vault Object
        let newList = new List(dialogTextInput.value);
        vault.addList(newList);
        // shows newList on page
        headerTitle.innerText = dialogTextInput.value;
        // clears page of previous list items
        while (mainList.hasChildNodes()) {
            mainList.removeChild(mainList.firstChild);
        };
        // resets nav drawer
        resetNavDrawer();
        // writes console debug message
        let debugMsg = `Added list: "${ dialogTextInput.value }"`;
        // AutoTools Command
        sendUpdate("vaultUpdate", debugMsg);
    }
    // resets dialog values
    dialogTextSupportingSecondary.innerText = "";
    dialogTextInput.value = "";
    dialogTextLabel.parentElement.classList.remove("is-dirty");
    dialogTextInput.removeAttribute("disabled");
    dialog.close();
}
/**
 * shows list on page
 * @param {string} listName - list name
 */
function showList (listName) {
    // clears page of previous list items
    while (mainList.hasChildNodes()) {
        mainList.removeChild(mainList.firstChild);
    };
    // adds to Vault Object
    let currentList = vault.getListByName(listName);
    // adds list items to page
    currentList.items.forEach(item => {mainList.appendChild(convertItemToListElement(item))})
    // updates list name on page
    headerTitle.innerText = listName;
    //simulate nav drawer list element click
    navDrawer.classList.remove("is-visible");
    if (document.querySelector(".mdl-layout__obfuscator")) {
        document.querySelector(".mdl-layout__obfuscator").classList.remove("is-visible");
    };
}
/**
 * resets navigation drawer
 */
function resetNavDrawer () {
    // clears nav drawer
    while (navDrawerLinkList.hasChildNodes()) {
        navDrawerLinkList.removeChild(navDrawerLinkList.firstChild);
    }
    // adds list names to nav drawer
    vault.lists.forEach(list => {navDrawerLinkList.appendChild(createNavDrawerListElement(list.name))});
}
/**
 * sends debug message of switch status
 */
function localBackupChange () {
    // let status = localBackupToggle.checked ? `checked` : `unechecked`;
    let debugMsg = `Local Backup is now ${ localBackupToggle.checked ? "<b>ON</b>" : "<b>OFF</b>" }`;
    sendUpdate("localBackupChange", debugMsg);
}
/**
 * sends AutoTools Command and console debug message
 * @param {string} debugMsg - message for console.debug
 */
function sendUpdate (type, debugMsg) {
    AutoTools.sendCommand(`${ type }=:=${ localBackupToggle.checked }=:=${ type == "errorMessage" || type == "localBackupChange" ? debugMsg : JSON.stringify(vault) }`, prefix);
    console.debug(debugMsg);
}