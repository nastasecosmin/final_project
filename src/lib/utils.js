export const getCategoryUrl = (category) => {
  if (category === "all") {
    return "/";
  }

  return `/category/${category?.replace(" ", "-")?.replace("'", "-")?.toLowerCase()}`;
};
