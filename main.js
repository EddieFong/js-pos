'use strict';

function loadAllItems() {
  return [
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000002',
      name: '苹果',
      unit: '斤',
      price: 5.50
    },
    {
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: '电池',
      unit: '个',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: '方便面',
      unit: '袋',
      price: 4.50
    }
  ];
}

function loadPromotions() {
  return [
    {
      type: 'BUY_TWO_GET_ONE_FREE',
      barcodes: [
        'ITEM000000',
        'ITEM000001',
        'ITEM000005'
      ]
    }
  ];
}

function constItemDict(itemList, allItemList){

	let onlyUnique = function (value, index, self) { 
		return self.indexOf(value) === index;
	}

	let consolidatedItemDict = []
	let uniqueItemList = itemList.map((x) => x.split("-")[0]).filter(onlyUnique);

	uniqueItemList.forEach(element => {
		let newItem = {}
		
		let matchedItem = itemList.filter((x)=>((x.substring(0, 10)) === element));
		let count = 0
		matchedItem.forEach((item) => {
			count += (item.includes("-")) ? parseInt(item.split("-")[1]) : 1
		})
		newItem.count = count;
		newItem.barcode = allItemList.filter((x) => x.barcode.substring(0, 10) === element)[0].barcode
		newItem.name = allItemList.filter((x) => x.barcode.substring(0, 10) === element)[0].name
		newItem.unit = allItemList.filter((x) => x.barcode.substring(0, 10) === element)[0].unit
		newItem.price = allItemList.filter((x) => x.barcode.substring(0, 10) === element)[0].price
		consolidatedItemDict.push(newItem)
	});

	return consolidatedItemDict;
}

function calProm(consolidatedItemDict, promList){
	let consolidatedItemWithPromDict = []
	console.log(promList)
	consolidatedItemDict.forEach((item) => {
		console.log(item.barcode)
		let newItem = item
		if (promList[0].barcodes
				.includes(item.barcode)){
					newItem.subTotal = newItem.price * (newItem.count - parseInt(newItem.count / 3))
		} else {
			newItem.subTotal = newItem.price * newItem.count
		}
		consolidatedItemWithPromDict.push(newItem)
	})
	
	return consolidatedItemWithPromDict
}

function calculate (consolidatedItemWithPromDict){

}

function printReceipt (itemList) {

	let consolidatedItemWithPromDict = calProm(constItemDict(itemList, loadAllItems()), loadPromotions())
	let result = calculate(consolidatedItemWithPromDict)


	return result;
}


let itemList = [
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
console.log(printReceipt(itemList));

module.exports = {
	constItemDict,
	loadAllItems,
	calProm,
	loadPromotions
};