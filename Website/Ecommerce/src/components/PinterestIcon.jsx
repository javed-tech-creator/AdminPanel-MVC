import { Circle } from "lucide-react";

const PinterestIcon = () => {
  return (
    <div className="relative w-8 h-8 flex items-center justify-center">
      <Circle size={62} className="text-white" />
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/3/35/Pinterest_Logo.svg"
        alt="Pinterest"
        className="absolute w-20 h-20"
      />
    </div>
  );
};

export default PinterestIcon;
