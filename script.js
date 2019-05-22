// I can use this to set the value of an input element and trigger change event programmatically
// Object.defineProperty(HTMLInputElement.prototype, 'content', {
//     get() {
//         return this.value;
//     },
//     set(newValue) {
//         this.value = newValue;
//         this.dispatchEvent(new Event('change', { bubbles: true }));
//     },
//     configurable: true
// });

if ('serviceWorker' in navigator) {

	navigator.serviceWorker
		.register('./serviceWorker.js')
		.then((registration) => {
			console.log("Service Worker Registered");
		})
		.catch((err) => {
			console.log("Service Worker Failed to Register", err);
		})

}

let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
	// Prevent Chrome 67 and earlier from automatically showing the prompt
	e.preventDefault();
	// Stash the event so it can be triggered later.
	deferredPrompt = e;
	// Update UI to notify the user they can add to home screen
	addBtn.style.display = 'block';

	addBtn.addEventListener('click', (e) => {
		// hide our user interface that shows our A2HS button
		addBtn.style.display = 'none';
		// Show the prompt
		deferredPrompt.prompt();
		// Wait for the user to respond to the prompt
		deferredPrompt.userChoice.then((choiceResult) => {
			if (choiceResult.outcome === 'accepted') {
				console.log('User accepted the A2HS prompt');
			} else {
				console.log('User dismissed the A2HS prompt');
			}
			deferredPrompt = null;
		});
	});
});

let dices = document.getElementsByClassName("dice");
let save = new savedData();
fillSavedData();

function fillSavedData() {
	let inventoryInputs = document.getElementsByClassName("inventoryInput");
	Array.from(inventoryInputs).forEach((element, index) => {
		element.value = save.inventory[index];
	});
	let statInputs = document.getElementsByClassName("statInput");
	Array.from(statInputs).forEach((element) => {
		element.value = save.stats[element.dataset.savedDataStats];
	});
}

function saveInventoryData(element) {
	let inventoryInputs = document.getElementsByClassName("inventoryInput");
	save.inventory[Array.from(inventoryInputs).indexOf(element)] = element.value;
	savedData.setData(save);
}

function saveStatData(element) {
	save.stats[element.dataset.savedDataStats] = element.value;
	savedData.setData(save);
}

function scaleAnimation(element) {
    element.style.transform = "scale(1.3, 1.3)";
    setTimeout(function () {
        element.style.transform = "scale(1, 1)";
    }, 200);
}

function rollDice() {
	if (dices.length > 0) {
		for (let i = 0; dices.length > i; i++) {
			let res = Math.floor((Math.random() * 6) + 1);
			dices[i].src = dicesInfo.getByNumber(res).base64Encode;
			scaleAnimation(dices[i]);
		}
	}
}

function add_dice() {
	if (dices.length < 6) {
		let img = document.createElement("IMG");
		img.className = "dice";
		img.src = dicesInfo.one.base64Encode;
		document.getElementById("diceContainer").appendChild(img);
	}
}

function remove_dice() {
	if (document.getElementById("diceContainer").lastElementChild !== null) {
		document.getElementById('diceContainer').lastElementChild.remove();
	}
}

function convertNumber(element, operation) {
	if (operation === "up") {
		element.value = Number(element.value) + 1;
	} else if (operation === "down" && element.value > 0) {
		element.value = Number(element.value) - 1;
	}
	element.dispatchEvent(new Event('change', { bubbles: true }));
}
