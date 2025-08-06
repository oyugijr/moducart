exports.getBasket = async (req, res, client) => {
  const { userId } = req.params;
  const data = await client.get(`basket:${userId}`);
  if (!data) return res.status(404).json({ message: 'Basket not found' });
  res.json(JSON.parse(data));
};

exports.addToBasket = async (req, res, client) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  const key = `basket:${userId}`;
  let basket = await client.get(key);
  basket = basket ? JSON.parse(basket) : [];

  const index = basket.findIndex(item => item.productId === productId);
  if (index >= 0) basket[index].quantity += quantity;
  else basket.push({ productId, quantity });

  await client.set(key, JSON.stringify(basket));
  res.json({ message: 'Item added to basket' });
};

exports.clearBasket = async (req, res, client) => {
  const { userId } = req.params;
  await client.del(`basket:${userId}`);
  res.json({ message: 'Basket cleared' });
};
