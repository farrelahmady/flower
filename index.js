const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");

const petal = [
	[
		[0, 0],
		[0.3, -1],
		[0.7, -1],
		[1, 0],
		[0.7, 1],
		[0.3, 1],
		[0, 0],
	],
	[
		[0, 0],
		[1, 0],
	],
];
const colors = [
	"#C0EEE4",
	"#F8F988",
	"#FFCAC8",
	"#FF9E9E",
	"#FB2576",
	"#C147E9",
	"#6ECCAF",
	"#FFE15D",
	"#DC3535",
	"#0D4C92",
	"#7D8F69",
];
function random(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function drawPetal(path, width, height, col) {
	var i = 0;
	do {
		// loop through paths
		const p = path[i];
		let j = 0;
		//ctx.moveTo(p[j][0] * width, p[j++][1] * height);

		while (j < p.length - 1) {
			ctx.lineTo(p[j][0] * width, p[j++][1] * height);
			ctx.fillStyle = col;
			ctx.fill();
		}
	} while (++i < path.length);
}

function drawPetals(x, y, count, startAt, petal, width, height, col) {
	const step = (Math.PI * 2) / count;
	ctx.setTransform(1, 0, 0, 1, x, y);
	ctx.rotate(startAt);
	for (var i = 0; i < count; i += 1) {
		drawPetal(petal, width, height, col);
		ctx.rotate(step);
	}
	ctx.setTransform(1, 0, 0, 1, 0, 0); // restore default
}

function drawFlower(x, y, col, lineWidth, fitScale, petalCount) {
	ctx.strokeStyle = col;
	ctx.lineWidth = lineWidth;
	const size = fitScale * 0.5;
	ctx.beginPath();

	let petalColor = random(colors);
	do {
		petalColor = random(colors);
	} while (petalColor === col);

	drawPetals(
		x,
		y,
		petalCount,
		-Math.PI / 2,
		petal,
		size,
		size * 0.2,
		petalColor
	);
	ctx.beginPath();
	ctx.arc(x, y, size * 0.25, 0, Math.PI * 2);
	ctx.fillStyle = col;
	ctx.fill();
}

let i = 0;
const interval = setInterval(() => {
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawFlower(
		Math.random() * canvas.width,
		Math.random() * canvas.height,
		random(colors),
		2,
		(Math.random() * canvas.width) / 5 <= 100
			? 100
			: (Math.random() * canvas.width) / 5,
		8
	);
	if (i++ >= 50) {
		clearInterval(interval);
	}
}, 750);

console.log(Math.min(ctx.canvas.width, ctx.canvas.height));
