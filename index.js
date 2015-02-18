var bignum = require('bignum');
var prime_size = 128;
function pq() {
    var p = bignum.prime(prime_size);
    var q = bignum.prime(prime_size);
    this.p = p;
    this.q = q;
    this.pq = p.mul(q);
    this.t = p.sub(1).mul(q.sub(1));
}

var a = new pq();
var b = new pq();
var c = new pq();
var d = new pq();
var N = 65537;
var y = bignum.prime(prime_size);
var z = bignum.prime(prime_size * 3 - 1);

function make_key(a, others) {
    var product = a.pq;
    for (var i = 0; i < others.length; i++) product = product.mul(others[i].pq);

    var az_totient = a.t.mul(y.sub(1));
    var power_root = bignum(N).invertm(az_totient);
    var root_lock = z.powm(power_root, a.pq.mul(y));
    return product.mul(root_lock).mod(product.mul(y));
}

console.log("----");
console.log( make_key(a, [b, c, d]));
console.log("----");
console.log( make_key(b, [a, c, d]));
console.log("----");
console.log( make_key(c, [a, b, d]));
console.log("----");
console.log( make_key(d, [a, b, c]));
console.log("----");
