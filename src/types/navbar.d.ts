interface DesignerInfo{
    [key:stirng]: number | undefined;
}

interface UserType {
  [key:string]: string | undefined;
  purchasedProducts?: number;
  designerInfo?: DesignerInfo;
}
