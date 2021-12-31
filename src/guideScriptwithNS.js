/** @param {NS} ns **/
export async function main(ns) {
	let target = ns.args[0];
    await myFunction(ns, target);
}

/** @param {NS} ns **/
async function myFunction(ns, target) {
	await ns.hack(target);
}