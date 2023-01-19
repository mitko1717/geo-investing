export const getSplitted = (str: any) => {
  let splitted = str
    .replaceAll("\nSOURCE", " SOURCE")
    .replaceAll("\nSource", " Source")
    .split(" ")
    .filter((w: string[]) => !w.includes(".com"))
    .filter((w: string[]) => !w.includes(".ca"))
    .filter((w: string[]) => !w.includes(".uk"));

  if (splitted[0] === "Story:") {
    splitted.shift();
    splitted = splitted.join(" ");
  } else splitted = splitted.join(" ");

  return splitted;
};

export const replaceAllFunc = (str: string) => {
  let string = str
    .replaceAll("p.m.", "pm")
    .replaceAll("a.m.", "am")
    .replaceAll("Dr.", "Dr")
    .replaceAll("Mr.", "Mr")
    .replaceAll("No.", "No")
    .replaceAll("Jan.", "Jan")
    .replaceAll("Feb.", "Feb")
    .replaceAll("Mar.", "Mar")
    .replaceAll("Apr.", "Apr")
    .replaceAll("May.", "May")
    .replaceAll("Jun.", "Jun")
    .replaceAll("Jul.", "Jul")
    .replaceAll("Aug.", "Aug")
    .replaceAll("Sept.", "Sept")
    .replaceAll("Sep.", "Sept")
    .replaceAll("Oct.", "Oct")
    .replaceAll("Nov.", "Nov")
    .replaceAll("Dec.", "Dec")
    .replaceAll("Mrs.", "Mrs")
    .replaceAll("Ph.D.", "PhD")
    .replaceAll("A.I.", "AI")
    .replaceAll("M.L.", "ML")
    .replaceAll("N.A.", "NA")
    .replaceAll("\n", " ")
    .replaceAll(`"`, `'`)
    .replaceAll("B.Sc.", "BSc.")
    .replaceAll("M.B.A.", "MBA.")
    .replaceAll("U.S.", "US")
    .replaceAll("U.K.", "UK")
    .replaceAll("E.U.", "EU")
    .replaceAll("vs.", "vs")
    .replaceAll("--", "-")
    .replaceAll("M.D.", "MD")
    .replaceAll(".,", ",")
    .replaceAll(",,", ",")
    .replaceAll("Inc.", "")
    .replaceAll(", Inc.", "")
    .replaceAll("Corp.", "")
    .replaceAll("LLC.", "")
    .replaceAll("Ltd.", "")
    .replaceAll("LTD.", "")
    .replaceAll(/ *\([^)]*\) */g, " ")
    .replace(/\s\s+/g, " ")
    .replaceAll("Co.,", "")
    .replaceAll("Co.", "")
    .replaceAll(" - - ", " - ")
    .replaceAll("- -", "-")
    .replaceAll("###", "")
    .replaceAll(`'`, "")
    .replaceAll(`®`, "")
    .replaceAll(`©`, "")
    .replaceAll(`’s`, "s")
    .replaceAll(`“`, `'`)
    .replaceAll(`”`, `'`)
    .replaceAll(`??`, " ")
    .replaceAll(`€`, "")
    .replaceAll(`$`, "")
    .replaceAll(`th`, "th")
    .replaceAll(`e.g.`, "eg")
    .replaceAll(`s'`, "s")
    .replaceAll(", , ", ", ")
    .replaceAll(" , , ", ", ")
    .replaceAll(" , ", ", ")
    .replaceAll(" ,", ",")
    .replaceAll(" .", ".")
    .replace(
      /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/g,
      ""
    );

  return string;
};

export const getCompanyName = (str: any) => {
  str = getSplitted(str);
  str = replaceAllFunc(str);

  let replaced = str.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
  let lastSentence = replaced[replaced.length - 1];
  if (lastSentence.includes("SOURCE")) {
    replaced.slice(lastSentence, replaced.length - 1);
  }

  let sourceSentence = replaced[replaced.length - 1].replaceAll(":", "");

  let splittedSourceSentence = sourceSentence.split(" ").filter((a: any) => a);
  const sourceWordIndex = splittedSourceSentence.findIndex(
    (x: string) => x.toLowerCase() === "source"
  );
  let nameOfCompany = splittedSourceSentence
    .splice(sourceWordIndex)
    .filter((word: string) => word.toLowerCase() !== "source")
    .join(" ")
    .split(" ")
    .filter((n: string) => n)
    .join(" ")
    .replaceAll("Corporation", "")
    .replaceAll("Limited", "")
    .replaceAll(new RegExp("\\b" + "Corp" + "\\b", "gi"), "")
    .replaceAll(/\.|\,/g, "")
    .split(" ")
    .filter((n: string) => n)
    .join(" ");

  return nameOfCompany;
};
