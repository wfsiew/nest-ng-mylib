export class AppConstant {
  
  public static PAGE_SIZE = 10;
  public static MAX_PAGE_NUMBERS = 10;
  public static NETWORK_TIMEOUT = 600000;

  public static ROLE = {
    STUDENT: 'STUDENT',
    LIBRARIAN: 'LIBRARIAN'
  };

  public static HTTP_HEADER = {
    LINK: 'link',
    X_TOTAL_COUNT: 'x-total-count',
    X_TOTAL_PAGE: 'x-total-page'
  };
}
