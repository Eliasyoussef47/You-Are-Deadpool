let dices = document.getElementsByClassName("dice");
let i;

function scaleAnimation(element) {
    element.style.transform = "scale(1.3, 1.3)";
    setTimeout(function () {
        element.style.transform = "scale(1, 1)";
    }, 200);
}

function rollDice() {
	if (dices.length > 0) {
		for (i = 0; dices.length > i; i++) {
			let res = Math.floor((Math.random() * 6) + 1);
			dices[i].src = "img/Deadpool dice_" + res + "-b.png";
			scaleAnimation(dices[i]);
		}
	}
}

function add_dice() {
	if (dices.length < 6) {
		let img = document.createElement("IMG");
		img.className = "dice";
		img.src = "img/Deadpool dice_1-b.png";
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
}
