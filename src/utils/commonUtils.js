export const formatData = data => {
  return data ? data.replace(/\\n/g, '\n') : '';
};
