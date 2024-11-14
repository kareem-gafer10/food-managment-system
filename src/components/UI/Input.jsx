/* eslint-disable react/prop-types */
const Input = (props) => {
  const {label,type,placeholder,Icon,register,validation,error,onClick,showPasswordIcon,autoComplete} = props;

  return (
    <>
      <div className="input-group flex-nowrap mb-3">
        <span className="input-group-text">
          <Icon />
        </span>

        <input
          type={type}
          className="form-control"
          placeholder={placeholder}
          {...register(label, validation)}
          autoComplete={autoComplete}
        />
        {(label === "password" || label === "confirmPassword"
        || label === "newPassword" || label === "confirmNewPassword"|| 
        label=== "oldPassword") && (
          <div className="show-password" onClick={onClick}>
            {showPasswordIcon}
          </div>
        )}
      </div>
      {error && <p className="text-danger">{error.message}</p>}
    </>
  );
};

export default Input;
