var bloki = function(){
	var x = [[12,21],[13,21],[14,21],[14,20],[15,20],[16,20],[17,20],[18,21],[19,21],[20,21],[21,20],[22,19],[23,18],[24,18],[25,18],[26,18],[27,19],
			[28,19],[29,19],[30,20],[31,20],[32,20],[33,20],[34,21],[35,20],[36,19],[37,19],[39,19],[40,20],[41,19],[42,18],[43,18],[44,18],
			[38,19],[45,17],[46,17],[47,17],[48,17],[49,18],[50,18],[51,18],[52,19],[53,19],[54,19],[55,19],[56,19],[57,19],[58,20],[59,21],[59,22],
			[60,23],[60,24],[60,25],[60,26],[61,27],[61,27],[61,28],[61,29],[61,30],[61,31],[61,32],[60,33],[60,34],[59,35],[58,35],[59,36],[59,37],
			[59,38],[59,39],[58,40],[58,41],[57,42],[56,43],[55,44],[54,45],[53,46],[52,47],[51,47],[50,47],[45,48],[46,48],[47,48],[48,48],[49,48],
			[44,49],[43,50],[42,51],[41,52],[40,53],[39,53],[38,54],[37,55],[36,56],[35,56],[34,57],[33,58],[32,59],[31,59],[30,59],[25,60],[26,60],
			[27,60],[28,60],[29,60],[24,59],[23,59],[22,59],[21,58],[20,57],[20,54],[20,55],[20,56],[21,53],[22,52],[23,51],[24,50],[25,49],
			[26,45],[26,46],[26,47],[25,44],[25,43],[24,42],[23,42],[20,41],[21,41],[22,41],[19,40],[18,39],[16,39],[17,39],[15,38],[14,37],[13,36],
			[12,35],[11,34],[10,33],[9,30],[9,31],[9,32],[10,29],[11,28],[10,24],[10,25],[10,26],[10,27],[11,23],[11,22],[26,48]
	];
	for (var i=0; i<x.length;i++)
	gracz.blok[x[i][0]][x[i][1]]=false;
}
