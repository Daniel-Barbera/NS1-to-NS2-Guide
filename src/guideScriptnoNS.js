/** @param {NS} ns **/
export async function main(ns) {
	let target = ns.args[0];
    await myFunction(target);
}

/** @param {NS} ns **/
					  // no ns here
async function myFunction(target) {
	await ns.hack(target);
}