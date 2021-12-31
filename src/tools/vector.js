export default class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // GET-SET X
    get x() {
        return this._x;
    }
    set x(x) {
        this._x = x;
    }

    // GET-SET Y
    get y() {
        return this._y;
    }
    set y(y) {
        this._y = y;
    }

    magnitude() {
        let mag = Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
        return mag;
    }

    unitVector() {
        let length = this.magnitude();
        if(length == 0) {
            console.trace("length 0 unit vector");
            return new Vector(0,0);
        }
        let unitVector = new Vector(this.x / length, this.y / length);
        return unitVector;
    }

    // might be nice to have a static version of each of these.
    add(vector) {
        let add = new Vector(this.x + vector.x, this.y + vector.y);
        return add;
    }
    sub(vector) {
        let sub = new Vector(this.x - vector.x, this.y - vector.y);
        return sub;
    }
    multiply(fac) {
        let mult = new Vector(this.x * fac, this.y * fac);
        return mult;
    }
    reverse() {
        let rev = this.multiply(-1);
        return rev;
    }
    dotProduct(vector) {
        let prod = (vector.x * this.x) + (vector.y + this.y);
        // console.log(prod);
        return prod;
    }
    angleWith(vector) { // in radians
        let me = this.unitVector();
        let it = vector.unitVector();
        let cost = me.dotProduct(it);

        // account for floating point errors
        if(cost > 1) {
            cost = 1;
        }
        if(cost < -1) {
            cost = -1;
        }

        let t = Math.acos(cost);
        return t;
    }

    projectOnto(vector) {
        let prod = this.dotProduct(vector);
        let mag = vector.magnitude();
        let mag2 = Math.pow(mag, 2);
        let fac = prod / mag2;
        let out = vector.multiply(fac);
        return out;
    }
}