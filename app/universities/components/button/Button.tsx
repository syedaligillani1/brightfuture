
export default function AddNewButton({  onClick,  label = "Add New",  className = "",}: AddNew ) {
  return (
    <button
    style={{ backgroundColor: '#094e85' }}
      className={`ml-auto text-white px-4 py-2 rounded ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
 
