import smells from "./smells.js";
import list from "./list.js";
const smellsDiv = document.getElementById("smells");
const displayDiv = document.getElementById("display");

const filter = new Set();

for await (const smell of smells) {
    const button = document.createElement("button");
    button.id = smell;
    button.textContent = `${smell[0].toUpperCase()}${smell.substring(1)}`;

    button.addEventListener("click", () => {
        button.classList.toggle("selected");
        if (filter.has(button.id)) filter.delete(button.id);
        else filter.add(button.id);
        updateList();
    });

    smellsDiv.appendChild(button);
}

function updateList() {
    document.getElementById("content").remove();
    const content = document.createElement("div");
    content.id = "content";

    for (const parfum in list) {
        if (!isSubset(filter, list[parfum])) continue;
        const filtered = document.createElement("button");
        filtered.textContent = parfum;
        filtered.disabled = true;
        content.appendChild(filtered);
    }

    displayDiv.appendChild(content);
}

function isSubset(subset, superset) {
    for (const value of subset) {
        if (!superset.has(value)) {
            return false;
        }
    }
    return true;
}

updateList();
