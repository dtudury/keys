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
var z = bignum.prime(prime_size);
var y = bignum.prime(prime_size * 2.5);

function make_key(a, others) {
    var product = a.pq;
    for (var i = 0; i < others.length; i++) product = product.mul(others[i].pq);
    var az_totient = a.t.mul(z.sub(1));
    var power_root = bignum(65537).invertm(az_totient);
    var root_lock = y.powm(power_root, a.pq.mul(z));
    return product.mul(root_lock).mod(product.mul(z));
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
