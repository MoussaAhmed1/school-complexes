"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ScrollArea } from "./ui/scroll-area";
import { IUser } from "@/types/users";

type Props = {
  SchoolData: IUser[];
};

export default function SchoolStats({ SchoolData }: Props) {
  const t = useTranslations("navigation");

  // Default to the first school
  const [selectedSchoolId, setSelectedSchoolId] = useState(
    SchoolData.length > 0 ? SchoolData[0].id : "",
  );

  const selectedSchool = SchoolData.find((s) => s.id === selectedSchoolId);

  // Prepare chart data
  const getBarChartData = () => {
    if (!selectedSchool) return [];

    return [
      {
        name: t("pending"),
        value: selectedSchool.pending_requests ?? 0,
        color: "#3b82f6",
      },
      {
        name: t("confirmed"),
        value: selectedSchool.confirmed_requests ?? 0,
        color: "#f59e0b",
      },
      {
        name: t("completed"),
        value: selectedSchool.completed_requests ?? 0,
        color: "#10b981",
      },
    ];
  };

  const barChartData = getBarChartData();

  // Compute total
  const totalRequests =
    (selectedSchool?.pending_requests ?? 0) +
    (selectedSchool?.confirmed_requests ?? 0) +
    (selectedSchool?.completed_requests ?? 0);

  return (
    <div className="mx-auto">
      {/* School Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t("schools")}
        </label>
        <select
          className="w-full max-w-md rounded-lg border p-3 text-sm focus:ring-0 focus:border-blue-400"
          value={selectedSchoolId}
          onChange={(e) => setSelectedSchoolId(e.target.value)}
        >
          {SchoolData.map((school) => (
            <option key={school.id} value={school.id}>
              {school.school?.name}{" "}
              {school.school?.academic_stage &&
                `(${school.school.academic_stage})`}
            </option>
          ))}
        </select>
      </div>

      {/* Stats Summary */}
      {selectedSchool && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-700">
              {totalRequests}
            </div>
            <div className="text-sm text-blue-600">{t("totalRequests")}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-700">
              {selectedSchool.completed_requests}
            </div>
            <div className="text-sm text-green-600">{t("completed")}</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="text-2xl font-bold text-orange-700">
              {selectedSchool.confirmed_requests}
            </div>
            <div className="text-sm text-orange-600">{t("confirmed")}</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-700">
              {selectedSchool.pending_requests}
            </div>
            <div className="text-sm text-blue-600">{t("pending")}</div>
          </div>
        </div>
      )}

      {/* Chart Section */}
      <div className="w-full">
        {barChartData.length > 0 && (
          <div className="p-6 rounded-2xl shadow-xl bg-white">
            <h3 className="text-xl font-bold mb-6 text-center text-gray-800">
              {t("chartTitle")}
            </h3>

            <ScrollArea className="w-full">
              <div className="min-w-[600px]">
                <ResponsiveContainer width="100%" height={550}>
                  <BarChart
                    data={barChartData}
                    margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="1 1" stroke="#e5e7eb" />

                    <XAxis
                      dataKey="name"
                      tick={{
                        fontSize: 12,
                        fontWeight: 500,
                        fill: "#374151",
                      }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: "#374151" }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip
                      cursor={{ fill: "rgba(59,130,246,0.08)" }}
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        color:"black",
                        border: "1px solid #e5e7eb",
                        borderRadius: "0.75rem",
                        padding: "0.75rem 1rem",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                      }}
                      labelStyle={{ fontWeight: 600, color: "#1f2937" }}
                      formatter={(value: number, name: string) => [
                        value.toLocaleString(),
                        name,
                      ]}
                    />
                    <Legend
                      wrapperStyle={{
                        paddingTop: "1rem",
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    />
                    <Bar
                      dataKey="value"
                      fill="url(#barGradient)"
                      radius={[6, 6, 0, 0]}
                      maxBarSize={50}
                    />
                    <defs>
                      <linearGradient
                        id="barGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#2563eb"
                          stopOpacity={0.9}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3b82f6"
                          stopOpacity={0.6}
                        />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}
