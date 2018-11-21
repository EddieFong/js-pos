const createMultiplicationTableByRange = require("../main");

it ("given -1, -1 as input, when called the function, should return null string", () => {
	expect(printReceipt("")).toBe(null);
});
