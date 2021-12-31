# NS1-to-NS2-Guide
Beginner guide to switch from NS1 to NS2 in the game Bitburner.


/*==========================SWITCHING TO NS2==========================
 *
 *=============================	  INDEX   ============================
 *
 *  - 1 - First steps
 *  - 2 - Common problems
 *  - 3 - Resources
 *
 *==========================   FIRST STEPS   =========================
 * 
	#1: Creating a NS2 file
		- In the terminal, type "nano myScript.js". Your
		screen should now look like this:
		
		<image of code template>
		
		- If you wish to port your code to NS2 from NS1 instead:
			- Type "nano oldScript.js". This should open a new NS2
			file.
			- Copy your old code, and paste it within the code template.
			
		<example of an old script> <--- this could be the script at the 
		end of the  "Getting Started" of the basic docs.
		
		- Note the "(ns)" part inside "export async function main (ns)". 
		This will be important later.
		
		<image of said script copied within the NS2 code template>
	@2: Understanding the syntax differences between NS1 and NS2
		- Syntactically, code in NS2 is identical in many ways to code in 
		NS1. However, there are two key things to keep in mind:
			#1: Placing "ns." in front of game related functions
			- Any function related to the game, like "hack()" or "exec()"
			now needs to be prepended (begin) with "ns." This is because 
			the "ns" object inside "export async function main (ns)" gives
			you access to all of the game actions and information.
			Like so: 
			
		<follow-up of old script ported to NS2, this time with ns.>
		
		- The code above has been refactored (changed) to add "ns." in 
		front of all game-related functions. However, if we tried to run
		the code inside the game, we'd get the following error:
		
		<image of async/await error>
		
		- This introduces us to #2:
			#2: Async/await calls
			- Some actions of the game, like the function ns.hack(),
			are asynchronous. Essentially, this means that they take
			some time, and you need to tell your script to wait for
			them to resolve by adding the keyword "await" before calling 
			to them.
			
		<insert image of old script, fully ported to NS2>
		
		- The list of actions that need to be awaited can be found
		here: <link to basic docs>.
		Alternatively, you can hover your cursor over any function,
		and check if they return a promise, like in the following image.
		
		<image that highlights promise>
		
*========================== COMMON PROBLEMS ==========================
	
	P: "The game says that "ns.someFunctionThatTotallyExists() is 
	not a function!"
	A: If you have defined your own functions within the code and
	they're located outside of main, check if you've defined the "ns" 
	object as a function parameter, so the function can use the
	game actions, just like main.
		
		<image of function with ns as param. in the signature,
		vs. of function without>
	
	Likewise, once you have the "ns" object inside your function
	signature, you will need to pass it as an argument whenever you
	call to it.
		
		<image of function that has ns in signature but not in call,
		vs. fix>
	
	P: "The game is throwing an "unexpected reserved word" error!"
	A: The usual cause for this, is that you've defined your own
	function outside of main that makes an "async" call like 
	"async ns.hack()", but the function itself has not been defined
	as "async". All functions that use "async" code must be "async"
	themselves.
	
		<image of non-async function calling an async function, vs fix>
	
	// unsure on whether to comment on forEach async calls 
	
	P: "The game is throwing an async/await error, but I've awaited
	everywhere you've told me to!"
	A: There's two possible reasons:
		- a) You have written an infinite loop, without yielding
		control to the game. Inside infinite loops like while (true)
		loops, the game needs to take control from time to time to
		avoid crashing. If this should happen, the game will tell you
		by raising a red flag in the text editor.
		
		<image>
		
		Fix: Await something inside the loop. If nothing in the loop is
		awaitable, you can add "await ns.sleep(50);", which will make the
		script await for 50 millisecond after every loop iteration.

*==========================   RESOURCES   ============================
	<links to basic docs and full docs>
*/
