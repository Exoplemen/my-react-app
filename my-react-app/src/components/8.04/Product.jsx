function Product({ name, price, onBuy }) {
  return (
    <div className="product">
      <h3>{name}</h3>
      <p>Цена: {price} руб.</p>
      <button onClick={onBuy}>Купить</button>
    </div>
  );
}
export default Product