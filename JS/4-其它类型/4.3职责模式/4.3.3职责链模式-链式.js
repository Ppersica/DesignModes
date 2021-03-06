const newOrder500 = function (orderType, pay, stock) {
    if (orderType === 1 && pay === true) {
        console.log('500 元定金预购，得到 100 元优惠券');
    } else {
        return 'nextSuccess';
    }
};

const newOrder200 = function (orderType, pay, stock) {
    if (orderType === 2 && pay === true) {
        console.log('200 元定金预购，得到 50 元优惠券');
    } else {
        return 'nextSuccess';
    }
};

const newOrderCommon = function (orderType, pay, stock) {
    if (orderType === 3 && stock > 0) {
        console.log('普通购买，无优惠券');
    } else {
        console.log('库存不够，无法购买');
    }
};

// 链路代码
const Chain = function (fn) {
    this.fn = fn;
    this.sucessor = null;
};

Chain.prototype.setNext = function (sucessor) {
    this.sucessor = sucessor;
};

Chain.prototype.init = function () {
    const result = this.fn.apply(this, arguments);
    if (result === 'nextSuccess') {
        this.sucessor.init.apply(this.sucessor, arguments);
    }
};

const order500New = new Chain(newOrder500);
const order200New = new Chain(newOrder200);
const orderCommonNew = new Chain(newOrderCommon);

order500New.setNext(order200New);
order200New.setNext(orderCommonNew);

order500New.init(3, true, 500); // 普通购买，无优惠券