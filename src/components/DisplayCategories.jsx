import { FaRegTrashCan } from "react-icons/fa6";
import useDisplayTable from "../hooks/useDisplayTable";
import useSearchTerm from "../hooks/useSearchTerm ";
import NoData from "./NoData";
import SearchInput from "./SearchInput";
import { HiDotsHorizontal } from "react-icons/hi";
import { IoEye } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import Modals from "../shared/Modal";
import useModals from "../hooks/useModals";
import { useState } from "react";
import useDisplayTableId from "../hooks/useDisplayTableId";
import useDeleteTable from "../hooks/useDeleteTable";
import useAddTable from "../hooks/useAddTable";
import useEditTable from "../hooks/useEditTable";
import Image from "../assets/no-data.png";
import SpecialTitle from "./SpecialTitle";
import Paginate from "./Paginate";
import Loader from "./Loader";



const DisplayCategories = () => {

  const {searchTerm, handleSearch}= useSearchTerm();
  // const { usersList,getCurrentUsers } = useDisplayTable(`Category`, searchTerm);
  const { show, handleClose,handleShow } = useModals();
  const { getRecipeId,recipeId } = useDisplayTableId("Category");
  const { RecipeDelete} =  useDeleteTable("Category");
  const { AddProduct } = useAddTable("Category");
  const { EditProduct } = useEditTable("Category");
  const [modalType, setModalType] = useState('');
  const [newCategory, setNewCategory] = useState({
    name: '',
    creationDate: new Date(),
  });

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5); // ثابت للـ page size
  const { usersList,getCurrentUsers,totalNumberOfPages,loading  } = useDisplayTable("Category",searchTerm, pageNumber, pageSize);


  const handlePageClick = (data) => {
    setPageNumber(data.selected + 1); // نستخدم selected + 1 عشان react-paginate بيبدأ العد من 0
  };






  const openModal = (id) => {
    handleShow();
    getRecipeId(id)
    setModalType('view');
  }

  const handleAdd = () => {
    setModalType('add');
    handleShow();
    setNewCategory({ name: '', creationDate: new Date() }); // إعادة تعيين الحقول
  };

  const addNewItem = async () => {
    await AddProduct(newCategory);
    handleClose();
    getCurrentUsers();
  };

  const handleEdit = (id) => {
    const categoryToEdit = usersList.find(user => user.id === id); // جلب البيانات الموجودة
  if (categoryToEdit) {
    setNewCategory({
      name: categoryToEdit.name,
      creationDate: new Date(categoryToEdit.creationDate), // ضبط الحقول بناءً على العنصر المراد تعديله
    });
  }
    setModalType('edit');
    handleShow();
    getRecipeId(id); // لتحميل بيانات العنصر اللي هيتعدل
  };

 

  const editItem = async () => {
    await EditProduct(recipeId.id, newCategory);
    handleClose();
    getCurrentUsers();
  };

  const handleDelete = (id) => {
    setModalType('delete');
    handleShow(); 
    getRecipeId(id); 
  };

  const deleteitem = async () => {
    await RecipeDelete(recipeId.id); 
    handleClose(); 
    getCurrentUsers(); 
  };





  return (
    <div className=" mx-md-5">

  
       <SpecialTitle title= "Categories Table Details" 
      subtitle="You can check all details"
      button="Add New Category"
      onckick={handleAdd}

      />


          <SearchInput 
            searchTerm={searchTerm.name} 
            handleSearch={handleSearch} 
            placeholder={"Search By User Name"} 
            name="name"
          />



    {loading? <div className="text-center my-5">
    <Loader/>
    </div> :
       <div className="table-responsive">
      <table className="table table-hover table-responsive text-center">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Creation Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersList.length > 0 ?
            usersList.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{new Date(user.creationDate).toLocaleString('en-US')}</td>
                <td>     
                  <div className="dropdown">
               <button  className=" dropdown-toggle btn btn-success" type="button" data-bs-toggle="dropdown" >
                  <HiDotsHorizontal />
               </button>
                 <ul  className="dropdown-menu ">
                  <li className="drop-link" onClick={() => openModal(user.id)}>
                  <IoEye className=" text-success"/>
                  <span>View</span>
                  </li>
                <li className=" drop-link" onClick={() => handleDelete(user.id)}>
                <FaRegTrashCan className=" text-danger" />
                <span>Delete</span>
                </li>
                <li className=" drop-link" onClick={() => handleEdit(user.id)}>
                <FaEdit className=" text-warning" />
                <span>Edit</span>
                </li>
           
                </ul>
                   </div>
                </td>
              </tr>
            ))
            :  <tr>
          <td colSpan="3">
                <NoData />
             </td>
             </tr>
            }

        </tbody>
      </table>
      </div>
    }

     


      <Modals show={show} handleClose={handleClose}>
        {modalType === 'view' && recipeId ? (
          <div>
          <h4>Category Details</h4>
          <input type="text" className="form-control text-center my-5" disabled value={recipeId.name} />
          </div>
        
        ) : modalType === 'delete'&& recipeId ?  (
          <div className=" text-center">
              <div className="text-center my-5 ">
             <img src={Image} alt="logo"  className="recipe-delete" />
              </div>
           <h4>Delete This Category</h4>
           <p className=" text-secondary">are you sure you want to delete this item ? if you are sure just click on delete it</p>
           <div className=" text-end">
           <button className=" btn btn-outline-danger" onClick={deleteitem}>Delete</button>
           </div>
          </div>
        ) :  modalType === 'add'&& recipeId ?
        <div>
            <h4>Add New Category</h4>
            <input
              type="text"
              className="form-control my-5"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              placeholder="Category Name"
            />
            <div className=" d-flex justify-content-end">
            <button className="btn btn-success " onClick={addNewItem}>Add</button>
            </div>
         </div>
          : modalType === 'edit' && recipeId ? (
            <div>
            <h4>Edit Category</h4>
            <input
              type="text"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              placeholder="Category Name"
              className="form-control mt-5 mb-4"
            />
            <div className=" d-flex justify-content-end">
            <button className="btn btn-success text-white" onClick={editItem}>Edit</button>
            </div>
          </div>
          )
          :
         (
          <Loader />
        )}
      </Modals>



      {usersList.length>0 &&
      <Paginate handlePageClick={handlePageClick} totalNumberOfPages={totalNumberOfPages} />
         }



    </div>
  );
};

export default DisplayCategories;
