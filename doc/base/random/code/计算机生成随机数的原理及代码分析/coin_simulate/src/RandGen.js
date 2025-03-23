function LinearCongruentialGenerator(a, b, c, seed) {
  this.a = a;
  this.c = b;
  this.m = c; // 2^32
  this.seed = seed % this.m;
}

LinearCongruentialGenerator.prototype.next = function () {
  this.seed = (this.a * this.seed + this.c) % this.m;
  return this.seed / this.m; // 返回一个0到1之间的浮点数
};

export { LinearCongruentialGenerator };
