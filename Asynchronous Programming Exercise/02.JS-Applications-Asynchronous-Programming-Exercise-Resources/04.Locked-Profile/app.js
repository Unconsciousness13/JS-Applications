function lockedProfile() {
    const url = 'http://localhost:3030/jsonstore/advanced/profiles'
    fetch(url)
        .then(res => res.json())
        .then(data => {
            Object.keys(data).forEach((key, i) => {
                let profile = createProfile(data[key], (i + 1));
                document.querySelector('#main').appendChild(profile);
            });

            function createProfile(obj, i) {
                const divProfile = document.createElement('div');
                divProfile.className = ('profile');

                const imageElement = document.createElement('img');
                imageElement.className = ('userIcon');
                imageElement.src = './iconProfile2.png';

                const lockedLabel = document.createElement('label');
                lockedLabel.textContent = 'Lock';

                const inputLock = document.createElement('input');
                inputLock.type = 'radio';
                inputLock.name = `user${i}Locked`;
                inputLock.value = 'lock';
                inputLock.checked = true;

                const labelUnlock = document.createElement('label');
                labelUnlock.textContent = 'Unlock';

                const unlockInput = document.createElement('input');
                unlockInput.type = 'radio';
                unlockInput.name = `user${i}Locked`;
                unlockInput.value = 'unlock';

                const breakEl = document.createElement('br');
                const hrElement = document.createElement('hr');

                const usernameLabel = document.createElement('label');
                usernameLabel.textContent = 'Username';

                const usernameInput = document.createElement('input');
                usernameInput.type = 'text';
                usernameInput.name = `user${i}Username`;
                usernameInput.value = `${obj.username}`;
                usernameInput.disabled = true;
                usernameInput.readOnly = true;

                const divHidden = document.createElement('div');
                divHidden.id = `user${i}HiddenFields`;

                const secondHrElement = document.createElement('hr');

                const emailLabel = document.createElement('label');
                emailLabel.textContent = 'Email:';

                const emailInput = document.createElement('input');
                emailInput.type = 'email';
                emailInput.name = `user${i}Email`;
                emailInput.value = `${obj.email}`;
                emailInput.disabled = true;
                emailInput.readOnly = true;

                const ageLabel = document.createElement('label');
                ageLabel.textContent = 'Age:';

                const ageInput = document.createElement('input');
                ageInput.type = 'email';
                ageInput.name = `user${i}Age`;
                ageInput.value = `${obj.age}`;
                ageInput.disabled = true;
                ageInput.readOnly = true;

                const showMoreBtn = document.createElement('button');
                showMoreBtn.textContent = 'Show more';
                showMoreBtn.addEventListener('click', showFunction);

                function showFunction(e) {
                    const profileEl = e.target.parentElement;
                    const hiddenDivEl = e.target.previousElementSibling;
                    const lockCheck = profileEl.querySelector('input[value="lock"]');

                    if (lockCheck.checked) {
                        return;
                    }

                    if (hiddenDivEl.style.display === 'none' || hiddenDivEl.style.display === '') {
                        hiddenDivEl.style.display = 'block';
                    } else {
                        hiddenDivEl.style.display = 'none';
                    }

                    if (e.target.textContent === 'Show more') {
                        e.target.textContent = 'Hide it';
                    } else {
                        e.target.textContent = 'Show more';
                    }

                }

                divHidden.appendChild(secondHrElement);
                divHidden.appendChild(emailLabel);
                divHidden.appendChild(emailInput);
                divHidden.appendChild(ageLabel);
                divHidden.appendChild(ageInput);

                divProfile.appendChild(imageElement);
                divProfile.appendChild(lockedLabel);
                divProfile.appendChild(inputLock);
                divProfile.appendChild(labelUnlock);
                divProfile.appendChild(unlockInput);
                divProfile.appendChild(breakEl);
                divProfile.appendChild(hrElement);
                divProfile.appendChild(usernameLabel);
                divProfile.appendChild(usernameInput);
                divProfile.appendChild(divHidden);
                divProfile.appendChild(showMoreBtn);

                return divProfile;
            }
        });
}