"use client";

import { useState, useEffect } from "react";
import { fetchUsers } from "@/actions/users/users-actions";
import { IUser } from "@/types/users";
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

interface SchoolStats {
  schoolId: string;
  schoolName: string;
  completed: number;
  confirmed: number;
  pending: number;
}

export function StudentAttendanceStats() {
  const t = useTranslations("navigation");
  const [schools, setSchools] = useState<IUser[]>([]);
  const [schoolStats, setSchoolStats] = useState<SchoolStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const schoolsRes = await fetchUsers();
        if (schoolsRes?.data?.data) {
          setSchools(schoolsRes.data.data);
          
          // إنشاء إحصائيات وهمية للمدارس بناءً على البيانات من fetchUsers
          const mockStats: SchoolStats[] = schoolsRes.data.data.map((school: IUser) => ({
            schoolId: school.id,
            schoolName: school.school?.name || school.name,
            completed: Math.floor(Math.random() * 50) + 10,
            confirmed: Math.floor(Math.random() * 30) + 5,
            pending: Math.floor(Math.random() * 20) + 1,
          }));
          setSchoolStats(mockStats);
          
          // تعيين أول مدرسة كافتراضية
          if (schoolsRes.data.data.length > 0) {
            setSelectedSchool(schoolsRes.data.data[0].id);
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSchoolSelect = (schoolId: string) => {
    setSelectedSchool(schoolId);
  };

  // تحضير البيانات للرسم البياني
  const getChartData = () => {
    if (!selectedSchool) return [];
    
    const stats = schoolStats.find(stat => stat.schoolId === selectedSchool);
    if (!stats) return [];

    return [
      { name: t("pending"), value: stats.pending, color: "#3b82f6" },
      { name: t("confirmed"), value: stats.confirmed, color: "#f59e0b" },
      { name: t("completed"), value: stats.completed, color: "#10b981" },
    ];
  };

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  const chartData = getChartData();

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-red-600 mb-4">
        {t("studentAttendanceStats")}
      </h3>
      
      {/* اختيار المدرسة */}
      <div className="mb-4">
        <select
          className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={selectedSchool || ""}
          onChange={(e) => handleSchoolSelect(e.target.value)}
        >
          {schools.map((school) => (
            <option key={school.id} value={school.id}>
              {school.school?.name || school.name}
            </option>
          ))}
        </select>
      </div>

      {/* الرسم البياني */}
      {chartData.length > 0 && (
        <div className="mb-4">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Legend />
              <Bar 
                dataKey="value" 
                fill="#8884d8"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* عرض الإحصائيات كبطاقات */}
      {selectedSchool && (
        <div className="space-y-2">
          {schoolStats
            .filter(stat => stat.schoolId === selectedSchool)
            .map((stats) => (
              <div key={stats.schoolId} className="grid grid-cols-3 gap-2 text-xs">
                <div className="text-center p-2 bg-blue-100 rounded">
                  <div className="font-bold text-blue-700">
                    {stats.pending}
                  </div>
                  <div className="text-blue-600">
                    {t("pending")}
                  </div>
                </div>
                <div className="text-center p-2 bg-orange-100 rounded">
                  <div className="font-bold text-orange-700">
                    {stats.confirmed}
                  </div>
                  <div className="text-orange-600">
                    {t("confirmed")}
                  </div>
                </div>
                <div className="text-center p-2 bg-green-100 rounded">
                  <div className="font-bold text-green-700">
                    {stats.completed}
                  </div>
                  <div className="text-green-600">
                    {t("completed")}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
