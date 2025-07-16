import React, { useState } from 'react';
import usePrevious from './usePrevious';

const DraggableList = ({ items, renderItem, onOrderChange }) => {
  const [listItems, setListItems] = useState(items);
  const [draggedItem, setDraggedItem] = useState(null);
  const previousItems = usePrevious(items);

  // Синхронизируем внутреннее состояние, если изменились пропсы
  React.useEffect(() => {
    if (previousItems !== items) {
      setListItems(items);
    }
  }, [items, previousItems]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index.toString());
    setDraggedItem(index);
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    const sourceIndex = Number(e.dataTransfer.getData('text/plain'));
    
    if (sourceIndex === targetIndex) return;

    const newItems = [...listItems];
    const [removed] = newItems.splice(sourceIndex, 1);
    newItems.splice(targetIndex, 0, removed);

    setListItems(newItems);
    if (onOrderChange) {
      onOrderChange(newItems);
    }
  };

  return (
    <div>
      {listItems.map((item, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => handleDragStart(e, index)}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
          style={{
            cursor: 'move',
            opacity: draggedItem === index ? 0.5 : 1,
            transition: 'opacity 0.2s',
            margin: '8px 0',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            backgroundColor: '#fff',
          }}
        >
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
};

export default DraggableList;