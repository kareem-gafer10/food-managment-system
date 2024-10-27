import { useEffect, useState } from "react";
import baseInstance from "../config/baseInstance";
// import { useForm } from "react-hook-form"

const Tags = ({ handleSearch }) => {
  
  // const {register,formState:{ errors }} = useForm()
  
  const [tags, setTags] = useState([]);
  
  useEffect(() => {

    const displayTag = async () => {
      try {
        const { data } = await baseInstance.get("tag");
        setTags(data);
      } catch (error) {
        console.log(error);
      }
    };

    displayTag();
  }, []);

  return (
    <div className="w-100">
    <select 
    className="form-select text-secondary"
     onChange={handleSearch} name="tagId"
    //  {...register("tagId", { required: "Tags is required" })}
     >
      <option value="">Tags</option>
      {tags.map((tag) => (
        <option key={tag.id} value={tag.id}>
          {tag.name}
        </option>
      ))}
    </select>
    {/* {errors.tagId && <p className="text-danger">{errors.tagId.message}</p>} */}
    </div>
  );
};

export default Tags;
