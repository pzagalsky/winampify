export interface Theme {
  titleBar: string;
  contentWindow: {
    backgroundColor: string;
  };
  explorerFile: {
    color: string;
  };
  [key: string]: string | {};
}

export enum THEMES {
  DEFAULT,
  DARK
}

export const selectTheme = (selected: THEMES) => {
  switch (selected) {
    case THEMES.DARK:
      return darkTheme;
    case THEMES.DEFAULT:
    default:
      return defaultTheme;
  }
};

export const primaryLight = "#f1b958";
export const primaryDark = "#ef9930";
export const dangerLight = "#F93D5C";
export const dangerDark = "#9e2539";
export const secondaryLight = "#E8E8E8";
export const secondaryMedium = "#C8C8C8";
export const secondaryDark = "#808080";
export const thirdLight = "rgb(29, 185, 84)";
export const titleDark = "#002e7c";
export const titleBar = "blue";

export const defaultTheme: Theme = {
  titleBar: "#0055e5",
  contentWindow: {
    backgroundColor: "white"
  },
  explorerFile: {
    color: "black"
  }
};
export const darkTheme: Theme = {
  titleBar: "black",
  contentWindow: {
    backgroundColor: "black"
  },
  explorerFile: {
    color: "white"
  }
};
