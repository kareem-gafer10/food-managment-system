import Header from "../../components/Header";
import HeaderImg from "../../assets/header.png";
import DisplayFavourite from "../../components/DisplayFavourite";
const Favorites = () => {
  return (
    <div className="mt-6 bg-bage">
      <Header
        title="Favorite Items"
        description="You can now add your items that any user can order it from the Application and you can editYou can now add your items that any user can order it from the Application and you can edit"
        img={HeaderImg}
      />
      <DisplayFavourite />
    </div>
  );
};

export default Favorites;
