/** @param {NS} ns **/
export async function main(ns) {
	while(true) {
		ns.tprint("Oh boy, I want to crash my game!");
		// no await here
	}
}
