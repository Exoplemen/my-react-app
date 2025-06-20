function ClickCounterButton({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Кликов: {count}
    </button>
  );
}
export default ClickCounterButton;