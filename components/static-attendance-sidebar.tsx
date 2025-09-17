"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

// البيانات الثابتة للمدارس
const staticSchoolData = {
  "مدرسة نادني الابتدائية بنات": { 
    waiting: 10, 
    confirmed: 5, 
    completed: 20,
    totalStudents: 35
  },
  "مدرسة نادني الثانوية بنات": { 
    waiting: 7, 
    confirmed: 3, 
    completed: 15,
    totalStudents: 25
  },
  "مدرسة نادني المتوسطة بنات": { 
    waiting: 4, 
    confirmed: 2, 
    completed: 8,
    totalStudents: 14
  },
  "ردني الابتدائية": { 
    waiting: 12, 
    confirmed: 8, 
    completed: 25,
    totalStudents: 45
  },
  "مدرسة نادني الابتدائية بنين": { 
    waiting: 6, 
    confirmed: 4, 
    completed: 18,
    totalStudents: 28
  },
};

export function StaticAttendanceSidebar() {
  const t = useTranslations("navigation");
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);

  const handleSchoolSelect = (schoolName: string) => {
    if (selectedSchool === schoolName) {
      setSelectedSchool(null);
    } else {
      setSelectedSchool(schoolName);
    }
  };

  // تحضير البيانات للرسم البياني
  const getChartData = (schoolName: string) => {
    const data = staticSchoolData[schoolName as keyof typeof staticSchoolData];
    if (!data) return [];

    return [
      { name: t("pending"), value: data.waiting, color: "#3b82f6" },
      { name: t("confirmed"), value: data.confirmed, color: "#f59e0b" },
      { name: t("completed"), value: data.completed, color: "#10b981" },
    ];
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-red-600 mb-4">
        {t("studentAttendanceStats")}
      </h3>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="schools-stats" className="border-b-0">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Icons.school className="w-5 h-5" />
              <span className="text-sm font-semibold">
                {t("schools")}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {Object.entries(staticSchoolData).map(([schoolName, data]) => {
                const isSelected = selectedSchool === schoolName;
                const chartData = getChartData(schoolName);
                
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
                    <div className="font-medium text-sm mb-2">
                      {schoolName}
                    </div>
                    
                    {isSelected && (
                      <div className="space-y-3">
                        {/* الرسم البياني المصغر */}
                        <div className="h-32">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                              <XAxis 
                                dataKey="name" 
                                tick={{ fontSize: 10 }}
                                axisLine={false}
                                tickLine={false}
                              />
                              <YAxis 
                                tick={{ fontSize: 10 }}
                                axisLine={false}
                                tickLine={false}
                              />
                              <Tooltip 
                                contentStyle={{
                                  backgroundColor: '#f8fafc',
                                  border: '1px solid #e2e8f0',
                                  borderRadius: '6px',
                                  fontSize: '12px'
                                }}
                              />
                              <Bar 
                                dataKey="value" 
                                fill="#8884d8"
                                radius={[2, 2, 0, 0]}
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>

                        {/* البطاقات */}
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
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

