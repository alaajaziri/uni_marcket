export function getAllProducts(req, res) {
  res.json([
    { id: 1, title: "Math Book", price: 15 },
    { id: 2, title: "Calculator", price: 30 }
  ]);
}