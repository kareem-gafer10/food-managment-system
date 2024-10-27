import ReciepeListHeader from "../../components/ReciepeListHeader";
import { useForm } from "react-hook-form"
import baseInstance from "../../config/baseInstance";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
// import useSearchTerm from "../../hooks/useSearchTerm ";
// import useDisplayTable from "../../hooks/useDisplayTable";
import { useEffect, useState } from "react";
const baseUrl = "https://upskilling-egypt.com:3006";

const EditRecipe = () => {

    const { register, handleSubmit,reset} = useForm();
 
    const navigate=useNavigate();
    // const {searchTerm, handleSearch }= useSearchTerm();
    // const { usersList } = useDisplayTable("Category",searchTerm);
    const [tags, setTags] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [recipeData, setRecipeData] = useState({});
    const { id } = useParams();

    const goToRecipe=()=>{
      navigate(`/dashboard/recipes`)
    }
   

    


    const getRecipeData = async () => {
      try {
        const response = await baseInstance.get(`Recipe/${id}`);
        setRecipeData(response.data); 
        reset({
          name: response.data.name,
          price: response.data.price,
          description: response.data.description,
          tag: response.data.tag,
          category: response.data.category[0].name,
          imagePath: response.data.imagePath,
        });
      } catch (error) {
        console.log(error);
      }
    };

    const displayTag = async () => {
      try {
        const { data } = await baseInstance.get("tag");
        setTags(data);
      } catch (error) {
        console.log(error);
      }
    };

    
    const getCategories = async () => {
      try {
        const response = await baseInstance.get("Category",{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        } );

        setCategoriesList(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    useEffect(() => {
      getCategories();
      displayTag();
      getRecipeData();
    }, []);



    const appendToFormData=(data)=>{
        let formData=new FormData();
        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("price",data.price);
        formData.append("tagId",parseInt(data.tagId));
        formData.append("recipeImage",  data.recipeImage[0]);
        formData.append("categoriesIds",data.categoriesIds);
        return formData;
      }

    
      const onSubmit=async(data)=>{
        let recipeFormData = appendToFormData(data);
        
        try {
          const response = await baseInstance.put(`Recipe/${id}`,recipeFormData,
            { headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }}
          );
          console.log(response);
          toast.success("Reciepe Edited Successfully");
          navigate("/dashboard/recipes");
        } catch (error) {
          console.log(error);
        }
      }









  return (
    <div className="mt-6">
    <ReciepeListHeader />
    <div className="container">
      <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>

      <div className="input-group flex-nowrap mb-2 p-2">
      <input type="text"
       className="form-control p-2" 
       placeholder="Recipe Name"
       {...register("name", {  required: "name  is Required"})}
       />
      </div>

      <div className="input-group flex-nowrap mb-2 p-2">
       
      {/* <Tags handleSearch={handleSearch} /> */}
      <select 
      className="form-select text-secondary"
      name="tagId"
   {...register("tagId", { required: "Tags is required" })}
   >
    <option defaultValue value={recipeData?.tag?.id}>
    {recipeData?.tag?.name}
    </option>
    {tags.map((tag) => (
      <option key={tag.id} value={tag.id}>
        {tag.name}
      </option>
    ))}
      </select>
      </div>

      <div className="input-group flex-nowrap mb-2 p-2">
        <input type="Price"
       className="form-control" 
       placeholder="Recipe Price"
       {...register("price", {required: "Price is Required"})}
       />
       <span className=" input-group-text text-secondary">EGP</span>
      </div>

      <div className="input-group flex-nowrap mb-2 p-2">
      {/* <Category handleSearch={handleSearch} searchTerm={searchTerm}  /> */}
      <select
       className=" form-select" 
        name="categoryId"
        {...register("categoriesIds", { required: "Category is required" })}
        >
       <option defaultValue value={recipeData?.category && recipeData.category.length > 0
        ? recipeData.category[0]?.id
         : ""
       }
      
       >
       {recipeData?.category && recipeData.category.length > 0
                  ? recipeData.category[0]?.name
                  : ""}
       </option>
      {categoriesList.map((category) => (
        <option key={category.id} value={category.id} >
          {category.name}
        </option>
      ))}
      </select>
      </div> 

      <div className="input-group flex-nowrap mb-2 p-2">
        <textarea
        rows={5}
       className="form-control" 
       placeholder="Description"
       {...register("description", {required: "Description is Required"})}
       />
      </div>

      <div className="input-group flex-nowrap mb-2 p-2">

      {recipeData?.imagePath && (
      <div>
      <img 
      src={`${baseUrl}/${recipeData?.imagePath}`}
        alt="img" 
        style={{ width: "200px", height: "auto" }} 
      />
      </div>
      )}
  
  <input 
    type="file" 
    className="form-control" 
    accept=".jpg,.png" 
    {...register("recipeImage",{ required: "profileImage is Required"})}
  />
      </div>


        <div className=" mt-5">
        <button className="btn btn-danger me-3" onClick={goToRecipe}>Cancel</button>
        <button className="btn btn-success">Save</button>
        </div>


      </form>
    </div>
  </div>
  )
}

export default EditRecipe










