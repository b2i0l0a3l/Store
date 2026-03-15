import { TrashIcon } from "@heroicons/react/24/solid";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";

export default function DeleteOrderButton() {
    return (
        <CustomButton
            onClick={() => {}}
            text=""
            className="px-5 py-2 rounded-lg text-white font-medium hover:bg-red-500 transition-colors"
            icon={TrashIcon}
        />
    )
}