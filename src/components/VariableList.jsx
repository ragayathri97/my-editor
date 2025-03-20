import React, { useState, useEffect } from "react";

export const VariableList = ({ editor, range, variables, query }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredVariables = variables.filter((variable) =>
    variable.label.toLowerCase().includes(query.toLowerCase())
  );

  const selectItem = (index) => {
    const variable = filteredVariables[index];
    if (variable) {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertContent({
          type: "mention",
          attrs: {
            id: variable.id,
            label: variable.label,
          },
        })
        .run();
    }
  };

  const onKeyDown = ({ event }) => {
    if (event.key === "ArrowDown") {
      setSelectedIndex((selectedIndex + 1) % filteredVariables.length);
      return true;
    }
    if (event.key === "ArrowUp") {
      setSelectedIndex(
        (selectedIndex - 1 + filteredVariables.length) % filteredVariables.length
      );
      return true;
    }
    if (event.key === "Enter") {
      selectItem(selectedIndex);
      return true;
    }
    return false;
  };

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <div className="variable-list">
      {filteredVariables.length > 0 ? (
        filteredVariables.map((variable, index) => (
          <div
            key={variable.id}
            className={`variable-item ${index === selectedIndex ? "selected" : ""}`}
            onClick={() => selectItem(index)}
          >
            {variable.label}
          </div>
        ))
      ) : (
        <div className="no-variables">No variables found</div>
      )}
    </div>
  );
};