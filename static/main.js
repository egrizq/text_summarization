const text = document.getElementById('text')
const generate = document.getElementById("generate");
const summary = document.getElementById('summary');
const process = document.getElementById('process');

const load = document.getElementsByClassName("load")[0];
const load_background = document.getElementsByClassName("load-background")[0];

	
generate.addEventListener("click", function() {
	const text_value = text.value; 

	const xhr = new XMLHttpRequest();
	xhr.open("POST", "/process", true);
	xhr.setRequestHeader("Content-Type", "application/json");
	
	xhr.onloadstart = function() {
		generate.style.display = "none"
		
		load.style.display = "block"
		load_background.style.display = "block"

		summary.innerHTML = ""
		process.innerHTML = ""
	}
		
	xhr.onloadend = function() {
		if (xhr.status === 200) {
			const response = JSON.parse(xhr.responseText)
			summary.innerHTML = response.text
			process.innerHTML = response.time

			setTimeout(function() {
				generate.style.display = "block"
				generate.innerHTML = "Simpulkan"

				load.style.display = "none"
				load_background.style.display = "none"
			}, 200)
		}
	}
	
	xhr.send(JSON.stringify({"text": text_value}));
})

function text1() {
	text.innerHTML = `Both reading and writing work to improve one’s communication skills. That’s why if you’re looking to become a better writer, many of the suggestions that you come across will include reading more. Reading can open your eyes, literally and figuratively, to new words. Try this next time you read: if you come across any words, you read that you don’t know, take a moment to look them up and write them down. Then, remember to use your new words in your speech so you don’t forget them!`
}

function text2() {
	text.innerHTML = `Back in November last year, the time I was in denial about myself. My heart was cold, and my eyes were blind. I would never believe that the person came into my life again until the silly chat “Hi” from you. I can’t believe that the warmest greeting that you have given would be the most painful heartbreak I ever have. Surprisingly, the shadow has been grown up with me for almost a year. My last autumn to winter was the warmest season I ever felt, but this time is different. I’m trying to make my life busier than ever, but I think is not the medicine. Whenever I go back home at night, I still remember the one earphone for two plays your favorite playlist. And the rain this year biased me the memories of our deep talk topic while waiting for the rain to stop. You tell me that you loved your mom so do I. You told me about your favorite song from the Midnight Album by Taylor and now I can’t stop playing it everywhere I walk. You were so excited telling me about your dreams. And now I’m just looking at you from another universe to keep supporting you.`
}

function text3() {
	text.innerHTML = `We are encouraged by the changes to the OpenAI board. We believe this is a first essential step on a path to more stable, well-informed, and effective governance. Sam, Greg, and I have talked and agreed they have a key role to play along with the OAI leadership team in ensuring OAI continues to thrive and build on its mission. We look forward to building on our strong partnership and delivering the value of to the next generation of AI to our customers and partners.`
}
