import { useRouter } from "next/navigation";
import { MdDeleteForever } from "react-icons/md";

const RemoveShiftBtn = ({ id }) => {
  const router = useRouter();

  const removeEvent = async () => {
    const confirmed = confirm("Are you sure you want to delete this event?");

    if (confirmed) {
      try {
        const res = await fetch(`http://localhost:3000/api/events?id=${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          router.reload(); // Reload the page to reflect the changes
        } else {
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to delete event");
        }
      } catch (error) {
        console.error("Error deleting event:", error.message);
        // Optionally, you can display an error message to the user here
      }
    }
  };

  return (
    <button href="#" className="mx-2 text-red-500 cursor-pointer" onClick={removeEvent}>
      <MdDeleteForever />
    </button>
  );
};

export default RemoveShiftBtn;
