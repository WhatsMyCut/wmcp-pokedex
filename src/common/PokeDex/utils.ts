const searchButton = (index: number, searchMode: number) => {
  switch (index) {
    case 0:
      switch (searchMode) {
        case 0:
          return 'A';
        case 1:
          return 'F';
        case 2:
          return 'K';
        case 3:
          return 'P';
        case 4:
          return 'U';
        case 5:
          return 'Z';
      }
      break;
    case 1:
      switch (searchMode) {
        case 0:
          return 'B';
        case 1:
          return 'G';
        case 2:
          return 'L';
        case 3:
          return 'Q';
        case 4:
          return 'V';
        case 5:
          return '-';
      }
      break;
    case 2:
      switch (searchMode) {
        case 0:
          return 'C';
        case 1:
          return 'H';
        case 2:
          return 'M';
        case 3:
          return 'R';
        case 4:
          return 'W';
        case 5:
          return '-';
      }
      break;
    case 3:
      switch (searchMode) {
        case 0:
          return 'D';
        case 1:
          return 'I';
        case 2:
          return 'N';
        case 3:
          return 'S';
        case 4:
          return 'X';
        case 5:
          return '-';
      }
      break;
    case 4:
      switch (searchMode) {
        case 0:
          return 'E';
        case 1:
          return 'J';
        case 2:
          return 'O';
        case 3:
          return 'T';
        case 4:
          return 'Y';
        case 5:
          return '-';
      }
      break;
  }
};

export { searchButton };
