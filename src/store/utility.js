export const updateObject = (oldObject, updatedProp) => ({
  ...oldObject,
  ...updatedProp,
});
