
export default function AddNewButton({
  onClick,
  label = "Add New",
  className = "",
}: AddNew ) {
  return (
    <button
      className={`ml-auto bg-blue-900 text-white px-4 py-2 rounded ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
 
