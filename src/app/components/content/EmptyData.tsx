import React from "react";
import Image from "next/image";
import EmptyBoxImg from "../../../../public/images/empty-box.png";
import { useTranslation } from "react-i18next";
type EmptyStateProps = {
  onClearFilter: () => void;
};

const EmptyData: React.FC<EmptyStateProps> = ({ onClearFilter }) => {

  const {t} = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-2">
      
      <div className="w-25 h-25 relative">
        <Image
          src={EmptyBoxImg}
          alt="Empty state"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>

      <p className="text-lg text-gray-500">
        {t("empty-page.title")}
      </p>

      <button
        onClick={onClearFilter}
        className="text-sm rounded-lg mt-4 cursor-pointer text-white bg-[var(--primary)] hover:bg-[var(--primary-300)]  px-2 py-1 rounded transition"
      >
       {t("empty-page.btn-clear-search-filters")}
      </button>
    </div>
  );
};

export default EmptyData;
