import React, { useEffect, useState } from "react";

function Layout({ data }) {
  const [selections, setSelections] = useState(new Set());
  const [visibileItems, setVisibleItems] = useState(0);
  const [isUnloading, setIsUnloading] = useState(false);

  const layoutData = data.flat();

  useEffect(() => {
    let count = 0;
    count = layoutData.reduce((acc, cur) => {
      return (acc += cur);
    }, 0);
    setVisibleItems(count);
  }, [data]);

  useEffect(() => {
    if (!!selections.size && selections.size === visibileItems) {
      unload();
    }
  }, [selections]);

  const unload = () => {
    setIsUnloading(true);
    const keys = [...selections];
    const removeNext = () => {
      if (keys.length) {
        const cur = keys.shift();
        console.log(cur, keys, selections.size);
        setSelections((prev) => {
          const updated = new Set(prev);
          updated.delete(cur);
          return updated;
        });
        setTimeout(removeNext, 1000);
      } else {
        setIsUnloading(false);
      }
    };
    setTimeout(removeNext, 1000);
  };

  const handleClick = (id) => {
    if(!isUnloading) {
        setSelections((prev) => new Set(prev.add(id)));
    }
  };

  return (
    <div className="uber-layout">
      {layoutData.map((item, i) => {
        return (
          <div
            key={`${item}-${i}`}
            className={`uber-grid-item ${
              !item ? "disabled-item" : "enabled-item"
            } ${selections.has(i) ? "selected-grid-item" : ""}`}
            onClick={() => handleClick(i)}
          ></div>
        );
      })}
    </div>
  );
}

export default Layout;
