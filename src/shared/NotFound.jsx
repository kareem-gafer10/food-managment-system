import { Link } from 'react-router-dom';
import notfound from '../assets/logo.png'


const NotFound = () => {
  return (
   <div className="notfound mt-6">
    <div className="container">

    <div className="p-4 mb-3">
        <img src={notfound} className='img-fluid' alt="notfound" />
     </div>

    <div className="notfound-content">
    <h1>Oops</h1>
    <h3 className=' text-success'>Page  not found </h3>
    <p className='notfound-desc'>This Page doesn’t exist or was removed! We suggest you  back to home.</p>
    <button className='btn btn-success px-4 py-3 mt-4'>
    <Link className='text-white' to='/dashboard'>Back To Home</Link>
    </button>
    </div>

    </div>
   </div>
  );
};

export default NotFound;
