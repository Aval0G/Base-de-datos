function f (x) {
  if (x <= 1) return 1;
  else return x * f(x - 1);
}

console.log(f(5));
