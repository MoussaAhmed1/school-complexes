"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

// البيانات الثابتة المبسطة
const staticData = {
  "مدرسة نادني الابتدائية بنات": { waiting: 10, confirmed: 5, completed: 20 },
  "مدرسة نادني الثانوية بنات": { waiting: 7, confirmed: 3, completed: 15 },
  "مدرسة نادني المتوسطة بنات": { waiting: 4, confirmed: 2, completed: 8 },
  "ردني الابتدائية": { waiting: 12, confirmed: 8, completed: 25 },
  "مدرسة نادني الابتدائية بنين": { waiting: 6, confirmed: 4, completed: 18 },
};

export function SimpleStaticSidebar() {
  const t = useTranslations("navigation");
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);

  const handleSchoolSelect = (schoolName: string) => {
    if (selectedSchool === schoolName) {
      setSelectedSchool(null);
    } else {
      setSelectedSchool(schoolName);
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-red-600 mb-4">
        {t("studentAttendanceStats")}
      </h3>
      
      <div className="space-y-2">
        {Object.entries(staticData).map(([schoolName, data]) => {
          const isSelected = selectedSchool === schoolName;
          
          return (
            <div
              key={schoolName}
              className={cn(
                "p-3 rounded-lg cursor-pointer transition-colors",
                isSelected 
                  ? "bg-blue-100 border border-blue-300" 
                  : "bg-gray-50 hover:bg-gray-100 border border-gray-200"
              )}
              onClick={() => handleSchoolSelect(schoolName)}
            >
              <div className="font-medium text-sm mb-2 flex items-center gap-2">
                <Icons.school className="w-4 h-4" />
                {schoolName}
              </div>
              
              {isSelected && (
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center p-2 bg-blue-100 rounded">
                    <div className="font-bold text-blue-700">
                      {data.waiting}
                    </div>
                    <div className="text-blue-600">
                      {t("pending")}
                    </div>
                  </div>
                  <div className="text-center p-2 bg-orange-100 rounded">
                    <div className="font-bold text-orange-700">
                      {data.confirmed}
                    </div>
                    <div className="text-orange-600">
                      {t("confirmed")}
                    </div>
                  </div>
                  <div className="text-center p-2 bg-green-100 rounded">
                    <div className="font-bold text-green-700">
                      {data.completed}
                    </div>
                    <div className="text-green-600">
                      {t("completed")}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

