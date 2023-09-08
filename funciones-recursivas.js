/* Funciones recursivas */

function f (x) { // Función recursiva de factorial
  if (x <= 1) return 1;
  else return x * f(x - 1);
}

console.log(f(5));

function fibonacci (n) { // Función recursiva de fibonacci
  if (n <= 1) return 1;
  else return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(5));
