const Checkbox = ({ cbData, gap, onCheckBoxChange}) => {
  const { id, name, checked, children } = cbData;
  const handleChange = (id, checked) => {
    onCheckBoxChange(id, !checked)
  };

  return (
    <>
      <div
        style={{
          whiteSpace: "pre",
          fontFamily: "monospace",
          width: "fit-content",
        }}
      >
        <span>{gap}</span>
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={() => handleChange(id, checked)}
        />
        <label for={name}>{name}</label>
        <br />
      </div>
      {children?.map((childrenCBData) => {
        return (
          <Checkbox
            key={childrenCBData.id}
            cbData={childrenCBData}
            gap={gap + "   "}
            onCheckBoxChange={onCheckBoxChange}
          />
        );
      })}
    </>
  );
};

export default Checkbox;
