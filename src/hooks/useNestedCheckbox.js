import { useState } from "react";
import CheckBoxdata from "../data/checkbox.json";

const useNestedCheckbox = () => {
  const [checkBoxData, setCheckBoxData] = useState(CheckBoxdata);

  const checkUnCheckChildren = (tree, id, checked) => {
    return tree.map((node) => {
      let updatedNode = { ...node, checked };
      if (node.children?.length) {
        updatedNode.children = checkUnCheckChildren(node.children, id, checked);
      }
      return updatedNode;
    });
  };

  const updateCheckBoxTree = (tree, id, checked) => {
    console.log(checked);
    return tree.map((node) => {
      let updatedNode = { ...node };
      if (node.id === id) {
        updatedNode.checked = checked;
        if (node.children?.length) {
          updatedNode.children = checkUnCheckChildren(
            node.children,
            id,
            checked
          );
        }
      } else if (node.children?.length) {
        updatedNode.children = updateCheckBoxTree(node.children, id, checked);
      }
      if (updatedNode.children?.length) {
        const allChecked = updatedNode.children.every((child) => child.checked);
        updatedNode.checked = allChecked;
      }
      return updatedNode;
    });
  };

  const updateCheckBoxData = (id, checked) => {
    setCheckBoxData((prevCheckBoxData) =>
      updateCheckBoxTree(prevCheckBoxData, id, checked)
    );
  };

  return {
    checkBoxData,
    updateCheckBoxData,
  };
};

export default useNestedCheckbox;
