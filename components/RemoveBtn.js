import { useRouter } from "next/navigation";
import { MdDeleteForever} from "react-icons/md";

const RemoveBtn = ({ id }) => {
  const router = useRouter();

  const removeTodo = async () => {
    const confirmed = confirm("Are you sure you want to delete this todo?");

    if (confirmed) {
      try {
        const res = await fetch(`http://localhost:3000/api/todo?id=${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          router.reload(); // Reload the page to reflect the changes
        } else {
          throw new Error("Failed to delete todo");
        }
      } catch (error) {
        console.error("Error deleting todo:", error.message);
        // Handle error here
      }
    }
  };

  return (

<button href="#" className="mx-2 text-red_1 cursor-pointer" onClick={removeTodo}>
<MdDeleteForever />
</button>
  );
};

export default RemoveBtn;
