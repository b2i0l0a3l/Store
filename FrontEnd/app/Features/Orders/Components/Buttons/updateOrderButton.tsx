import { PencilIcon } from "@heroicons/react/24/solid";
import CustomButton from "@/app/components/Ui/buttons/CustomButton";

export default function UpdateOrderButton() {
    return (
        <CustomButton
        onClick={() => {}}
        text=""
        
        className="px-5 py-2 rounded-lg text-white font-medium hover:bg-blue-500 transition-colors"
        icon={PencilIcon}
        />
    )
}