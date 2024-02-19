import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import "./index.css"

function UserDetails() {
  const { t } = useTranslation();
  const userInfo = useSelector((state: any) => state.userNavBar);

  return (
    <div className=" ml-2">
      <p className="userName text-xl">
        {userInfo.firstName} {userInfo.lastName}
      </p>
      <p color={"gray"} className="products text-lg">
        {userInfo.role === "Designer"
          ? `${t("navbar.Designs")}: ${userInfo.products}`
          : `${t("navbar.PurchasedProducts")}: ${userInfo.purchasedProducts}`}
      </p>
    </div>
  );
}

export default UserDetails;