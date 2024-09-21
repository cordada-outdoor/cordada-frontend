export function findLangName(language: string) {
  switch (language) {
    case "ca":
      return "CAT";
    case "es":
      return "ESP";
    case "en":
      return "ENG";
  }
}

export const isEven = (x: number) => {
  return x % 2 === 0;
};

export const formatDate = (date: string) => {
  const projectDate = new Date(date ?? undefined);
  const yyyy = projectDate.getFullYear();
  const mm =
    projectDate.getMonth() + 1 < 10
      ? "0" + projectDate.getMonth()
      : projectDate.getMonth();
  //can add day if we want
  // const dd = Number(projectDate.getDate()) < 10 ? '0' + projectDate.getDate() : projectDate.getDate();

  return mm + "/" + yyyy;
};
