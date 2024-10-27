import useDisplayTable from "../hooks/useDisplayTable";
// import { useForm } from "react-hook-form"


const Category = ({ handleSearch, searchTerm }) => {
  const { usersList } = useDisplayTable("Category", searchTerm);
  // const {register,formState:{ errors }} = useForm()


  return (
    <div className="w-100">
    <select className=" form-select text-secondary" 
    onChange={handleSearch}
     name="categoryId"
      //  {...register("categoriesIds", { required: "Category is required" })}
     >
      <option value="">Categories</option>
      {usersList.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
    {/* {errors.categoriesIds && <p className="text-danger">{errors.categoriesIds.message}</p>} */}
    </div>
  );
};

export default Category;
