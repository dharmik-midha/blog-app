export const formatDate = (date) => {
    const newDate = new Date();
    const formatedDate = new Date(date);
    return newDate.getFullYear() !== formatedDate.getFullYear()
      ? formatedDate.toString().slice(4, 10) +
          ", " +
          formatedDate.toString().slice(11, 15)
      : formatedDate.toString().slice(4, 10);
  };