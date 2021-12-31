# First Steps

## Creating a NS2 file
In the terminal, type <mark>nano myScript.js</mark>. Your screen should now look like this:

![](https://github.com/xRalic/NS1-to-NS2-Guide/blob/main/src/images/myScript.png)

## Porting your old code
If, instead, you wish to port your code to NS2 from NS1:
- Type ``nano oldScript.js``. This should open a new NS2 file.
- Copy your old code, and paste it within the code template.

Example: if your old script looked like this: 
```js
var servers0Port = ["n00dles",
		"sigma-cosmetics",
		"joesguns",
		"nectar-net",
		"hong-fang-tea",
		"harakiri-sushi"];
var servers1Port = ["neo-net",
		"zer0",
		"max-hardware",
		"iron-gym"];
for (var i = 0; i < servers0Port.length; ++i) {
	var serv = servers0Port[i];

	scp("early-hack-template.script", serv);
	nuke(serv);
	exec("early-hack-template.script", serv, 6);
}
while (!fileExists("BruteSSH.exe")) {
	sleep(60000);
}
for (var i = 0; i < servers1Port.length; ++i) {
	var serv = servers1Port[i];

	scp("early-hack-template.script", serv);
	brutessh(serv);
	nuke(serv);
	exec("early-hack-template.script", serv, 12);
}
```

After copying it inside the code template, it should look like this:

```js

//** @param {NS} ns **//
export async function main(ns) {
	var servers0Port = ["n00dles",
			"sigma-cosmetics",
			"joesguns",
			"nectar-net",
			"hong-fang-tea",
			"harakiri-sushi"];
	var servers1Port = ["neo-net",
			"zer0",
			"max-hardware",
			"iron-gym"];
	for (var i = 0; i < servers0Port.length; ++i) {
		var serv = servers0Port[i];

		scp("early-hack-template.script", serv);
		nuke(serv);
		exec("early-hack-template.script", serv, 6);
	}
	while (!fileExists("BruteSSH.exe")) {
		sleep(60000);
	}
	for (var i = 0; i < servers1Port.length; ++i) {
		var serv = servers1Port[i];

		scp("early-hack-template.script", serv);
		brutessh(serv);
		nuke(serv);
		exec("early-hack-template.script", serv, 12);
	}
}
````

Note the ``ns`` part inside ``export async function main (ns)``. This will be important later.

# Understanding the syntax differences between NS1 and NS2
Syntactically, code in NS2 is identical in many ways to code in NS1. However, there are <b>two</b> key things to keep in mind:
## Placing ``"ns."`` in front of game related functions
Any function related to the game, like ``hack()`` or ``exec`` needs to be *prepended* (begin) with ``ns.`` This is because the ``ns`` object inside ``export async function main (ns)`` gives you access to all of the game actions and information. Like so: 
```js
	
//** @param {NS} ns **//
export async function main(ns) {
	var servers0Port = ["n00dles",
			"sigma-cosmetics",
			"joesguns",
			"nectar-net",
			"hong-fang-tea",
			"harakiri-sushi"];
	var servers1Port = ["neo-net",
			"zer0",
			"max-hardware",
			"iron-gym"];
	for (var i = 0; i < servers0Port.length; ++i) {
		var serv = servers0Port[i];

		ns.scp("early-hack-template.script", serv);
		ns.nuke(serv);
		ns.exec("early-hack-template.script", serv, 6);
	}
	while (!ns.fileExists("BruteSSH.exe")) {
		ns.sleep(60000);
	}
	for (var i = 0; i < servers1Port.length; ++i) {
		var serv = servers1Port[i];

		ns.scp("early-hack-template.script", serv);
		ns.brutessh(serv);
		ns.nuke(serv);
		ns.exec("early-hack-template.script", serv, 12);
	}
}
```

The code above has been refactored (changed) to add ``ns`` in front of all game-related functions. However, if we tried to run the code inside the game, we'd get the following error:

![](https://github.com/xRalic/NS1-to-NS2-Guide/blob/main/src/images/oldScriptWithNSError.png)

This introduces us to #2:
## Async/await calls
Some actions of the game, like the function ``ns.hack()``, are <b>asynchronous</b>. Essentially, this means that they take some time, and you need to tell your script to wait for them to resolve by adding the keyword ``await`` before calling to them.

```js
/** @param {NS} ns **/
export async function main(ns) {
	var servers0Port = ["n00dles",
			"sigma-cosmetics",
			"joesguns",
			"nectar-net",
			"hong-fang-tea",
			"harakiri-sushi"];
	var servers1Port = ["neo-net",
			"zer0",
			"max-hardware",
			"iron-gym"];
	for (var i = 0; i < servers0Port.length; ++i) {
		var serv = servers0Port[i];

		await ns.scp("early-hack-template.script", serv);
		ns.nuke(serv);
		ns.exec("early-hack-template.script", serv, 6);
	}
	while (!ns.fileExists("BruteSSH.exe")) {
		await ns.sleep(60000);
	}
	for (var i = 0; i < servers1Port.length; ++i) {
		var serv = servers1Port[i];

		await ns.scp("early-hack-template.script", serv);
		ns.brutessh(serv);
		ns.nuke(serv);
		ns.exec("early-hack-template.script", serv, 12);
	}
}
```

The list of actions that need to be awaited can be found <a href="https://bitburner.readthedocs.io/en/latest/netscript/netscriptjs.html"> here. </a>
Alternatively, you can hover your cursor over any function, and check if they return a promise, like in the following image.

![](https://github.com/xRalic/NS1-to-NS2-Guide/blob/main/src/images/Promise.png)
		
# Common Issues
	
## P: "The game says that "ns.someFunctionThatTotallyExists() is not a function!"
A: If you have defined your own functions within the code and they're located outside of ``main``, check if you've defined the ``ns``  object as a function parameter, so the function can use the game actions, just like ``main``.

// TODO: example

Likewise, once you have the ``ns`` object inside your function signature, you will need to pass it as an argument whenever you call to it.

## P: "The game is throwing an "unexpected reserved word" error!"
A: The usual cause for this, is that you've defined your own function outside of main that makes an ``async`` call like ``async ns.hack()``, but the function itself has not been defined as ``async``. All functions that use ``async`` code must be ``async" themselves.

// TODO: example

// unsure on whether to comment on forEach async calls 

## P: "The game is throwing an async/await error, but I've awaited everywhere you've told me to!"
A:  You have written an infinite loop, without yielding control to the game. Inside infinite loops like while (true) loops, the game needs to take control from time to time to
avoid crashing. If this should happen, the game will tell you by raising a red flag in the text editor.

// TODO: Image

Fix: Await something inside the loop. If nothing in the loop is awaitable, you can add "await ns.sleep(50);", which will make the script await for 50 millisecond after every loop iteration.

# Resources
- https://bitburner.readthedocs.io/en/latest/
- https://github.com/danielyxie/bitburner/blob/dev/markdown/bitburner.ns.md

