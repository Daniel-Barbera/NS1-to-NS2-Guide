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