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
	it ("constItemDict", () => {

	let input = [
		{"barcode": "ITEM000001", "count": 5, "name": "雪碧", "price": 3, "unit": "瓶"},
		{"barcode": "ITEM000003", "count": 2, "name": "荔枝", "price": 15, "unit": "斤"},
		{"barcode": "ITEM000005", "count": 3, "name": "方便面", "price": 4.5, "unit": "袋"}
	]

	let expected = [
		{"barcode": "ITEM000001", "count": 5, "name": "雪碧", "price": 3, "unit": "瓶", "subTotal": 12},
		{"barcode": "ITEM000003", "count": 2, "name": "荔枝", "price": 15, "unit": "斤", "subTotal": 30},
		{"barcode": "ITEM000005", "count": 3, "name": "方便面", "price": 4.5, "unit": "袋", "subTotal": 9}
	]

	expect(printReceipt.calProm(input,printReceipt.loadPromotions())).toEqual(expected);
});

it ("printReceipt", () => {

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
	]

	let expected = "***<store earning no money>Receipt ***\n" 
		+ "Name: 雪碧, Quantity: 5 瓶, Unit price: 3.00 (yuan), Subtotal: 12.00 (yuan)\n"
		+ "Name: 荔枝, Quantity: 2 斤, Unit price: 15.00 (yuan), Subtotal: 30.00 (yuan)\n"
		+ "Name: 方便面, Quantity: 3 袋, Unit price: 4.50 (yuan), Subtotal: 9.00 (yuan)\n"
		+ "----------------------\n"
		+ "Total: 51.00 (yuan)\n"
		+ "Saving: 7.50 (yuan)\n"
		+ "**********************\n"

	expect(printReceipt.printReceipt(input,printReceipt.loadPromotions())).toEqual(expected);
});
