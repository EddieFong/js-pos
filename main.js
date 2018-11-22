"use strict";

function loadAllItems() {
	return [
		{
			barcode: "ITEM000000",
			name: "可口可乐",
			unit: "瓶",
			price: 3.00
		},
		{
			barcode: "ITEM000001",
			name: "雪碧",
			unit: "瓶",
			price: 3.00
		},
		{
			barcode: "ITEM000002",
			name: "苹果",
			unit: "斤",
			price: 5.50
		},
		{
			barcode: "ITEM000003",
			name: "荔枝",
			unit: "斤",
			price: 15.00
		},
		{
			barcode: "ITEM000004",
			name: "电池",
			unit: "个",
			price: 2.00
		},
		{
			barcode: "ITEM000005",
			name: "方便面",
			unit: "袋",
			price: 4.50
		}
	];
}

function loadPromotions() {
	return [
		{
			type: "BUY_TWO_GET_ONE_FREE",
			barcodes: [
				"ITEM000000",
				"ITEM000001",
				"ITEM000005"
			]
		}
	];
}

function constItemDict(itemList, allItemList){

	let onlyUnique = function (value, index, self) { 
		return self.indexOf(value) === index;
	};

	let consolidatedItemDict = [];
	let uniqueItemList = itemList.map((x) => x.split("-")[0]).filter(onlyUnique);

	uniqueItemList.forEach(element => {
		constructUniqueItem(itemList, element, allItemList, consolidatedItemDict);
	});

	return consolidatedItemDict;
}

function constructUniqueItem(itemList, element, allItemList, consolidatedItemDict) {
	let newItem = {};
	let matchedItem = itemList.filter((x) => ((x.substring(0, 10)) === element));
	let count = 0;
	matchedItem.forEach((item) => {
		count += (item.includes("-")) ? parseFloat(item.split("-")[1]) : 1;
	});
	newItem.count = count;
	newItem.barcode = allItemList.find((x) => x.barcode.substring(0, 10) === element).barcode;
	newItem.name = allItemList.find((x) => x.barcode.substring(0, 10) === element).name;
	newItem.unit = allItemList.find((x) => x.barcode.substring(0, 10) === element).unit;
	newItem.price = allItemList.find((x) => x.barcode.substring(0, 10) === element).price;
	consolidatedItemDict.push(newItem);
}

function calProm(consolidatedItemDict, promList){
	let consolidatedItemWithPromDict = [];
	
	consolidatedItemDict.forEach((item) => {
		constructItem(item, promList, consolidatedItemWithPromDict);
	});
	
	return consolidatedItemWithPromDict;
}

function constructItem(item, promList, consolidatedItemWithPromDict) {
	let newItem = item;
	let buy2Get1Free = promList.find((x) => x.type === "BUY_TWO_GET_ONE_FREE");
	newItem.subTotal = newItem.price * (newItem.count - ((buy2Get1Free.barcodes.includes(item.barcode)) ? parseInt(newItem.count / 3) : 0));
	consolidatedItemWithPromDict.push(newItem);
}

function printReceipt (itemList) {

	let consolidatedItemWithPromDict = calProm(constItemDict(itemList, loadAllItems()), loadPromotions());
	let result = "***<store earning no money>Receipt ***\n";
	let total = 0;
	let totalSaved = 0;
	consolidatedItemWithPromDict.forEach((item) => {
		({ result, total, totalSaved } = calculateAndPrintItem(result, item, total, totalSaved)); 
	});
	result = printFooter(result, total, totalSaved);

	return result;
}

module.exports = {
	constItemDict,
	loadAllItems,
	calProm,
	loadPromotions,
	printReceipt
};

function printFooter(result, total, totalSaved) {
	result += "----------------------\n";
	result += `Total: ${total.toFixed(2)} (yuan)\n`;
	result += `Saving: ${totalSaved.toFixed(2)} (yuan)\n`;
	result += "**********************\n";
	return result;
}

function calculateAndPrintItem(result, item, total, totalSaved) {
	result = printBody(result, item);
	total += item.subTotal;
	totalSaved += item.price * item.count - item.subTotal;
	return { result, total, totalSaved };
}

function printBody(result, item) {
	result += `Name: ${item.name}, Quantity: ${item.count} ${item.unit}, Unit price: ${item.price.toFixed(2)} (yuan), Subtotal: ${item.subTotal.toFixed(2)} (yuan)\n`;
	return result;
}

