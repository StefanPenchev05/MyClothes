interface DesignerInfo{
    [key:string]: number | undefined;
}

/**
 * Represents the user type.
 */
interface UserType {
  [key:string]: string | undefined;
  purchasedProducts?: number;
  designerInfo?: DesignerInfo;
}
