import useNestedCheckbox from "../hooks/useNestedCheckbox";
import Checkbox from "./checkBox";

const NestedCheckBox = () => {
  const { checkBoxData, updateCheckBoxData } = useNestedCheckbox();

  const handleChange = (id, checked) => {
    updateCheckBoxData(id, checked); 
  }

  return (
    <>
        <div>NestedCheckBox</div>
        {checkBoxData.map((cbData) => {
            return <Checkbox key={cbData.id} cbData={cbData} gap="" onCheckBoxChange={handleChange} />
        })}
    </>
  );
};

export default NestedCheckBox;