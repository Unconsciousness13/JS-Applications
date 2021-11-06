export async function updateCatches() {

    let catchesElement = document.getElementById(`catches`);
    catchesElement.innerHTML = ``;

    const response = await fetch(`http://localhost:3030/data/catches`);
    const catches = await response.json();

    Object.values(catches).forEach(c => {

        const el = createCatchDiv(c);
        catchesElement.appendChild(el);

    });

    if (sessionStorage.getItem('userToken') != null) {

        enableButtons();
    }

    function createCatchDiv(c) {

        const result = e(`div`, { className: "catch", ownerid: `${c._ownerId}`, id: `${c._id}` },
            e(`label`, {}, `Angler`),
            e(`input`, { type: `text`, className: `angler`, value: c.angler }),
            e(`hr`, {}),
            e(`label`, {}, `Weight`),
            e(`input`, { type: `number`, className: `weight`, value: c.weight }),
            e(`hr`, {}),
            e(`label`, {}, `Species`),
            e(`input`, { type: `text`, className: `species`, value: c.species }),
            e(`hr`, {}),
            e(`label`, {}, `Location`),
            e(`input`, { type: `text`, className: `location`, value: c.location }),
            e(`hr`, {}),
            e(`label`, {}, `Bait`),
            e(`input`, { type: `text`, className: `bait`, value: c.bait }),
            e(`hr`, {}),
            e(`label`, {}, `Capture Time`),
            e(`input`, { type: `number`, className: `captureTime`, value: c.captureTime }),
            e(`button`, { className: `update`, disabled: `disabled` }, `Update`),
            e(`button`, { className: `delete`, disabled: `disabled` }, `Delete`),

        )

        return result;
    }

    function e(type, attributes, ...content) {
        const result = document.createElement(type);

        for (let [attr, value] of Object.entries(attributes || {})) {
            if (attr.substring(0, 2) == 'on') {
                result.addEventListener(attr.substring(2).toLocaleLowerCase(), value);
            } else {
                result[attr] = value;
            }
        }

        content = content.reduce((a, c) => a.concat(Array.isArray(c) ? c : [c]), []);

        content.forEach(e => {
            if (typeof e == 'string' || typeof e == 'number') {
                const node = document.createTextNode(e);
                result.appendChild(node);
            } else {
                result.appendChild(e);
            }
        });

        return result;
    }

    function enableButtons() {

        const userIdToken = sessionStorage.getItem(`userId`);
        const catchElements = document.getElementById(`catches`).children;
        Array.from(catchElements).forEach(el => {
            if (el.ownerid == userIdToken) {
                el.querySelector(`.update`).disabled = false;
                el.querySelector(`.delete`).disabled = false;

            }
        });
    }
}