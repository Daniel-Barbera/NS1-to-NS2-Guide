/** @param {NS} ns **/
export async function main(ns) {
	let target = ns.args[0];
    // await is missing here
	myFunction(ns, target);
}

/** @param {NS} ns **/
// async is missing in the function signature
function myFunction(ns, target) {
	await ns.hack(target);
}