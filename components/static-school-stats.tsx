"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ComposedChart, Line, LineChart } from "recharts";

// البيانات الثابتة للمدارس
const staticSchoolData = {
  "مدرسة نادني الابتدائية بنات": { 
    waiting: 10, 
    confirmed: 5, 
    completed: 20,
    totalStudents: 35,
    percentage: 2.5
  },
  "مدرسة نادني الثانوية بنات": { 
    waiting: 7, 
    confirmed: 3, 
    completed: 15,
    totalStudents: 25,
    percentage: 3.2
  },
  "مدرسة نادني المتوسطة بنات": { 
    waiting: 4, 
    confirmed: 2, 
    completed: 8,
    totalStudents: 14,
    percentage: 5.8
  },
  "ردني الابتدائية": { 
    waiting: 12, 
    confirmed: 8, 
    completed: 25,
    totalStudents: 45,
    percentage: 35.2
  },
  "مدرسة نادني الابتدائية بنين": { 
    waiting: 6, 
    confirmed: 4, 
    completed: 18,
    totalStudents: 28,
    percentage: 8.5
  },
};

// بيانات إضافية للرسم البياني المركب
const monthlyData = [
  { month: "يناير", students: 20, percentage: 2.5 },
  { month: "فبراير", students: 50, percentage: 3.2 },
  { month: "مارس", students: 140, percentage: 5.8 },
  { month: "أبريل", students: 190, percentage: 35.2 },
];

export default function StaticSchoolStats() {
  const t = useTranslations("navigation");
  const [selectedSchool, setSelectedSchool] = useState(Object.keys(staticSchoolData)[0]);

  // تحضير البيانات للرسم البياني العمودي
  const getBarChartData = () => {
    const schoolData = staticSchoolData[selectedSchool as keyof typeof staticSchoolData];
    if (!schoolData) return [];

    return [
      { name: t("pending"), value: schoolData.waiting, color: "#3b82f6" },
      { name: t("confirmed"), value: schoolData.confirmed, color: "#f59e0b" },
      { name: t("completed"), value: schoolData.completed, color: "#10b981" },
    ];
  };

  // تحضير البيانات للرسم البياني الدائري
  const getPieChartData = () => {
    const schoolData = staticSchoolData[selectedSchool as keyof typeof staticSchoolData];
    if (!schoolData) return [];

    return [
      { name: t("pending"), value: schoolData.waiting, color: "#3b82f6" },
      { name: t("confirmed"), value: schoolData.confirmed, color: "#f59e0b" },
      { name: t("completed"), value: schoolData.completed, color: "#10b981" },
    ];
  };

  const barChartData = getBarChartData();
  const pieChartData = getPieChartData();
  const selectedData = staticSchoolData[selectedSchool as keyof typeof staticSchoolData];

  return (
    <div className="p-6 max-w-6xl mx-auto">
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
          value={selectedSchool}
          onChange={(e) => setSelectedSchool(e.target.value)}
        >
          {Object.keys(staticSchoolData).map((school) => (
            <option key={school} value={school}>
              {school}
            </option>
          ))}
        </select>
      </div>

      {/* عرض الإحصائيات العامة */}
      {selectedData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-700">{selectedData.totalStudents}</div>
            <div className="text-sm text-blue-600">إجمالي الطلاب</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-700">{selectedData.completed}</div>
            <div className="text-sm text-green-600">{t("completed")}</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="text-2xl font-bold text-orange-700">{selectedData.confirmed}</div>
            <div className="text-sm text-orange-600">{t("confirmed")}</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-700">{selectedData.waiting}</div>
            <div className="text-sm text-blue-600">{t("pending")}</div>
          </div>
        </div>
      )}

      {/* الرسوم البيانية */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* الرسم البياني العمودي */}
        {barChartData.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-center">الرسم البياني العمودي</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fontWeight: 500 }}
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

        {/* الرسم البياني الدائري */}
        {pieChartData.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4 text-center">الرسم البياني الدائري</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* جدول تفصيلي للمدارس */}
      <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b">
          <h3 className="text-lg font-semibold">تفاصيل جميع المدارس</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  اسم المدرسة
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  إجمالي الطلاب
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("completed")}
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("confirmed")}
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("pending")}
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  النسبة المئوية
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(staticSchoolData).map(([schoolName, data]) => {
                const completionRate = ((data.completed / data.totalStudents) * 100).toFixed(1);
                return (
                  <tr key={schoolName} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {schoolName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {data.totalStudents}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 text-center font-semibold">
                      {data.completed}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600 text-center font-semibold">
                      {data.confirmed}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 text-center font-semibold">
                      {data.waiting}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      {completionRate}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
