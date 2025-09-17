"use client";

import { useState, useEffect } from "react";
import { fetchUsers } from "@/actions/users/users-actions";
import { IUser } from "@/types/users";
import { useTranslations } from "next-intl";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface SchoolStats {
  schoolId: string;
  schoolName: string;
  completed: number;
  confirmed: number;
  pending: number;
}

export default function SchoolStatsChart() {
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
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const chartData = getChartData();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        {t("studentAttendanceStats")}
      </h2>
      
      {/* اختيار المدرسة */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("schools")}
        </label>
        <select
          className="w-full max-w-md border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 14, fontWeight: 500 }}
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
                  fontSize: '14px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value, name) => [value, name]}
              />
              <Legend />
              <Bar 
                dataKey="value" 
                fill="#8884d8"
                radius={[6, 6, 0, 0]}
                stroke="#6366f1"
                strokeWidth={1}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* عرض الإحصائيات كبطاقات */}
      {selectedSchool && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {schoolStats
            .filter(stat => stat.schoolId === selectedSchool)
            .map((stats) => (
              <div key={stats.schoolId} className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-700 mb-1">
                    {stats.pending}
                  </div>
                  <div className="text-sm font-medium text-blue-600">
                    {t("pending")}
                  </div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="text-2xl font-bold text-orange-700 mb-1">
                    {stats.confirmed}
                  </div>
                  <div className="text-sm font-medium text-orange-600">
                    {t("confirmed")}
                  </div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-2xl font-bold text-green-700 mb-1">
                    {stats.completed}
                  </div>
                  <div className="text-sm font-medium text-green-600">
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
