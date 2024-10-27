import Header from "../../components/Header";
import HeaderImg from "../../assets/header.png";
import SpecialTitle from "../../components/SpecialTitle";
import DisplayRecipes from "../../components/DisplayRecipes";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Recipes = () => {
  const { userData } = useContext(AuthContext);

  return (
    <div className="mt-6">
      <Header
        title="Recipes Items"
        description="You can now add your items that any user can order it from the Application and you can edit"
        img={HeaderImg}
      />
      {userData?.userGroup === "SuperAdmin" && (
        <SpecialTitle
          title="Recipe Table Details"
          subtitle="You can check all details"
          button="Add New Recipe"
          path="/dashboard/add-recipe"
        />
      )}

      <DisplayRecipes />
    </div>
  );
};

export default Recipes;
