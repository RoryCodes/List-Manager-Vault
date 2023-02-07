/**
 * creates mdl list item with name as button and delete icon button
 * @param {string} listItem new list item
 * @returns {Element} 
 */
function convertItemToListElement (listItem) {
    // Text node
    let textNode = document.createTextNode(listItem);
    // Outter Div of Text
    let outterDiv = document.createElement("div");
    outterDiv.appendChild(textNode);
    // First Span containing Content
    let spanContent = document.createElement("span");
    spanContent.className = "mdl-list__item-primary-content mdl-button mdl-js-button mdl-js-ripple-effect my-mixed_case auto_height left_align normal_height";
    spanContent.setAttribute("style", "font-size:16px; letter-spacing:.04em;");
    spanContent.onclick = function () {editFromList(this)};
    spanContent.appendChild(outterDiv);
    componentHandler.upgradeElement(spanContent);
    // Icon Text Node
    let iconTextNode = document.createTextNode("delete_sweep");
    // Icon
    let icon = document.createElement("i");
    icon.className = "material-icons";
    icon.appendChild(iconTextNode);
    componentHandler.upgradeElement(icon);
    // Icon Button
    let button = document.createElement("button");
    button.className = "mdl-button mdl-js-button mdl-button--icon";
    button.onclick = function () {removeFromList(this)};
    button.appendChild(icon);
    componentHandler.upgradeElement(button);
    // Second Span containing Icon Button
    let spanIcon = document.createElement("span");
    spanIcon.className = "mdl-list__item-secondary-action";
    spanIcon.appendChild(button);
    componentHandler.upgradeElement(spanIcon);
    // List Element
    let listElement = document.createElement("li");
    listElement.className = "mdl-list__item";
    listElement.appendChild(spanContent);
    listElement.appendChild(spanIcon);
    componentHandler.upgradeElement(listElement);
    // return list element
    return listElement;
}
/**
 * creates a nav drawer list element
 * @param {string} listName - list name
 * @returns {Element}
 */
function createNavDrawerListElement (listName) {
    // text node
    let textNode = document.createTextNode(listName);
    // link element
    let linkElement = document.createElement("a");
    linkElement.onclick = function () {
        showList(this.innerText)
    };
    linkElement.className = "mdl-navigation__link";
    linkElement.appendChild(textNode);
    componentHandler.upgradeElement(linkElement);
    return linkElement;
}