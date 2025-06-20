import { useState } from 'react';

function LimitedTextArea() {
  const [text, setText] = useState('');
  const maxLength = 100;
  const remaining = maxLength - text.length;
  const isWarning = remaining <= 10;

  const handleChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setText(e.target.value);
    }
  };

  return (
    <div style={{ margin: '20px' }}>
      <textarea
        value={text}
        onChange={handleChange}
        style={{
          width: '100%',
          minHeight: '100px',
          border: isWarning ? '1px solid red' : '1px solid #ccc',
          color: isWarning ? 'red' : 'inherit'
        }}
      />
      <div style={{ color: isWarning ? 'red' : 'inherit' }}>
        Осталось: {remaining} символов
      </div>
      {isWarning && (
        <div style={{ color: 'red' }}>
          Вы близки к ограничению в {maxLength} символов!
        </div>
      )}
    </div>
  );
}
export default LimitedTextArea;