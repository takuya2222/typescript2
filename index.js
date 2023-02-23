// npx tsc index.ts → node index.js
var ObjectWrapper = /** @class */ (function () {
    /***
     * 引数のオブジェクトのコピーをthis._objに設定
     */
    function ObjectWrapper(_obj) {
        this._obj = Object.assign({}, _obj);
    }
    Object.defineProperty(ObjectWrapper.prototype, "obj", {
        /**
         * this._objのコピーを返却
         * @return Object
         */
        get: function () {
            return this._obj;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * this._obj[key] に valを設定。keyがthis._objに存在しない場合、falseを返却
     * @param key オブジェクトのキー
     * @param val オブジェクトの値
     */
    ObjectWrapper.prototype.set = function (key, val) {
        if (this._obj.hasOwnProperty(key)) {
            this._obj[key] = val;
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * 指定したキーの値のコピーを返却
     * 指定のキーが存在しない場合 undefinedを返却
     * @param key オブジェクトのキー
     */
    // get(key) {}
    ObjectWrapper.prototype.get = function (key) {
        if (key in this._obj) {
            return this._obj[key];
        }
        else {
            return undefined;
        }
    };
    /**
     * 指定した値を持つkeyの配列を返却。該当のものがなければ空の配列を返却。
     */
    // findKeys(val: unknown) {}
    ObjectWrapper.prototype.findKeys = function (val) {
        var keys = [];
        for (var key in this._obj) {
            if (this._obj.hasOwnProperty(key) && this._obj[key] === val) {
                keys.push(key);
            }
        }
        return keys;
    };
    return ObjectWrapper;
}());
/**
 * check script
 * 完成したら、以下のスクリプトがすべてOKになる。
 */
var obj1 = { a: "01", b: "02" };
var wrappedObj1 = new ObjectWrapper(obj1);
if (wrappedObj1.obj.a === "01") {
    console.log("OK: get obj()");
    console.log(wrappedObj1.obj);
}
else {
    console.error("NG: get obj()");
}
if (wrappedObj1.set("c", "03") === false &&
    wrappedObj1.set("b", "04") === true &&
    wrappedObj1.obj.b === "04") {
    console.log("OK: set(key, val)");
}
else {
    console.error("NG: set(key, val)");
}
if (wrappedObj1.get("b") === "04" && wrappedObj1.get("c") === undefined) {
    console.log("OK: get(key)");
}
else {
    console.error("NG: get(key)");
}
var obj2 = { a: "01", b: "02", bb: "02", bbb: "02" };
var wrappedObj2 = new ObjectWrapper(obj2);
var keys = wrappedObj2.findKeys("02");
if (wrappedObj2.findKeys("03").length === 0 &&
    keys.includes("b") &&
    keys.includes("bb") &&
    keys.includes("bbb") &&
    keys.length === 3) {
    console.log("OK: findKeys(val)");
}
else {
    console.error("NG: findKeys(val)");
}
