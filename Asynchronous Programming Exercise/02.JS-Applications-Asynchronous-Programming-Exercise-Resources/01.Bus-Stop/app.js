async function getInfo() {
    const stopNameElement = document.getElementById('stopName');
    const timeTableElement = document.getElementById('buses');

    const stopId = document.getElementById('stopId').value;

    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;
    try {
        stopNameElement.textContent = "Loading"
        timeTableElement.replaceChildren();
        const res = await fetch(url);
        if (res.status != 200) {
            throw new Error(`Stop ID not found`);
        }
        const data = await res.json();

        stopNameElement.textContent = data.name;

        Object.entries(data.buses).forEach(b => {
            const nomer = b[0];
            const vreme = b[1];
            const liElement = document.createElement('li');
            liElement.textContent = `Bus ${nomer} arrives in ${vreme} minutes`;

            timeTableElement.appendChild(liElement);
        });
    } catch (error) {
        stopNameElement.textContent = 'Error';
    }

}