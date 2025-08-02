import list from "./list.js";
const smellsDiv = document.getElementById("smells")! as HTMLDivElement;
const displayDiv = document.getElementById("display")! as HTMLDivElement;
const filterarea = document.getElementById("filterarea")! as HTMLTextAreaElement;

const smellsSet = new Set<string>();
const filter = new Set<string>();
const filterDisabled = new Set<string>();

for (const parfum in list) {
    const attributes = list[parfum];
    for (const type in list[parfum]) {
        if (type === "Alle") continue;
        for (const options of list[parfum][type as keyof typeof attributes]!) {
            list[parfum].Alle.add(options);
            smellsSet.add(options);
        }
    }
}

for (const smell of smellsSet) {
    const button = document.createElement("button");
    button.id = smell;
    let amount = 0;
    for (const key in list) {
        if (list[key].Alle.has(smell)) amount += 1;
    }
    button.textContent = `${smell} (${amount})`;
    addFilterFunction(button);
    document.getElementById("smelllist")!.appendChild(button);
}

filterarea.addEventListener("change", () => {
    document.getElementById("smelllist")!.remove();
    const content = document.createElement("div");
    content.id = "smelllist";
    content.classList = "grid";

    const active = Array.from(document.getElementById("content")!.querySelectorAll("button")).map((x) => x.textContent);
    console.log(active);

    for (const smell of smellsSet) {
        if (!smell.toLowerCase().includes(filterarea.value.toLowerCase())) continue;
        const filtered = document.createElement("button");
        if (filter.has(smell)) filtered.classList = "on";
        else if (filter.has(smell)) filtered.classList = "off";
        filtered.id = smell;
        filtered.textContent = smell;
        addFilterFunction(filtered);
        content.appendChild(filtered);
    }

    smellsDiv.appendChild(content);
});

function addFilterFunction(button: HTMLButtonElement) {
    button.addEventListener("click", () => {
        updateList();
        toggleFilter(button);
        if (filter.has(button.id)) {
            filter.delete(button.id);
            filterDisabled.add(button.id);
        } else if (filterDisabled.has(button.id)) filterDisabled.delete(button.id);
        else filter.add(button.id);
    });
}

function updateList() {
    document.getElementById("content")!.remove();
    const content = document.createElement("div");
    content.id = "content";
    content.classList = "grid";

    for (const parfum in list) {
        if (!isSubset(filter, list[parfum].Alle)) continue;
        if (overlaps(filterDisabled, list[parfum].Alle)) continue;
        const filtered = document.createElement("button");
        filtered.textContent = parfum;
        filtered.onclick = () => alert([...list[parfum].Alle].join("\n"));
        content.appendChild(filtered);
    }

    displayDiv.appendChild(content);
}

function isSubset(subset: Set<string>, superset: Set<string>) {
    for (const value of subset) {
        if (!superset.has(value)) {
            return false;
        }
    }
    return true;
}

function overlaps(setA: Set<string>, setB: Set<string>) {
    for (const value of setA) {
        if (setB.has(value)) {
            return true;
        }
    }
    return false;
}

function toggleFilter(button: HTMLButtonElement) {
    if (button.classList.value === "") button.classList = "on";
    else if (button.classList.value === "on") button.classList = "off";
    else if (button.classList.value === "off") button.classList = "";
}

updateList();
