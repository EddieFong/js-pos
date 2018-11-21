const createMultiplicationTableByRange = require("../main");
const printReceipt = require("../main");

it ("constItemDict", () => {
	let input = [
		'ITEM000001',
		'ITEM000001',
		'ITEM000001',
		'ITEM000001',
		'ITEM000001',
		'ITEM000003-2',
		'ITEM000005',
		'ITEM000005',
		'ITEM000005'
	  ];
	  let expected = [
		{
			'barcode':'ITEM000001',
			'name': '雪碧',
			'unit': '瓶',
			'price': 3.00,
			'count': 5,
			},
			{
			'barcode':'ITEM000003',
			'name': '荔枝',
			'unit': '斤',
			'price': 15.0,
			'count': 2,
			},
			{
			'barcode':'ITEM000005',
			'name': '方便面',
			'unit': '袋',
			'price': 4.50,
			'count': 3,
			},
	  ];
	expect(printReceipt.constItemDict(input,printReceipt.loadAllItems())).toEqual(expected);
});
});
