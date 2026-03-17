import { useEffect, useState, useCallback } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { TrendingUp } from "lucide-react";
import { supabase } from "@/lib/supabase";

const COLORS = {
  bass: "#1E90FF",
  band: "#6C5CE7",
  handaxe: "#FDCB6E",
  animation: "#00B894",
};

const LABELS = {
  bass: "베이스",
  band: "밴드 음악",
  handaxe: "주먹도끼",
  animation: "애니메이션",
};

export default function Statistics() {
  const [chartData, setChartData] = useState<any[]>([]);
  const [totalLikes, setTotalLikes] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    const { data: rows, error } = await supabase
      .from("interest_likes")
      .select("interest_id");

    if (error) {
      console.error("Failed to fetch likes:", error);
      setChartData([]);
      setTotalLikes(0);
      setLoading(false);
      return;
    }

    const counts: Record<string, number> = { bass: 0, band: 0, handaxe: 0, animation: 0 };
    (rows || []).forEach((row: { interest_id: string }) => {
      if (row.interest_id in counts) {
        counts[row.interest_id] += 1;
      }
    });
    const total = Object.values(counts).reduce((a, b) => a + b, 0);

    if (total > 0) {
      setChartData(
        Object.entries(counts)
          .filter(([, value]) => value > 0)
          .map(([key, value]) => ({
            name: LABELS[key as keyof typeof LABELS],
            value,
            id: key,
          }))
      );
      setTotalLikes(total);
    } else {
      setChartData([]);
      setTotalLikes(0);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 5000);
    return () => clearInterval(interval);
  }, [loadData]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-[#2D3436]">{payload[0].name}</p>
          <p className="text-[#1E90FF] font-bold text-lg">{payload[0].value} ❤️</p>
          <p className="text-sm text-gray-600">
            {((payload[0].value / totalLikes) * 100).toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-semibold text-[#2D3436] mb-4">
          공감 통계
        </h1>
        <p className="text-gray-600">
          모든 방문자가 Interests에서 누른 하트를 한눈에 확인해보세요
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-600">통계를 불러오는 중...</p>
          </div>
        ) : totalLikes === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-8xl mb-6">💭</div>
            <h3 className="text-2xl font-semibold text-[#2D3436] mb-3">
              아직 하트가 없어요
            </h3>
            <p className="text-gray-600 mb-6">
              첫 번째 하트를 눌러주세요!
            </p>
            <a
              href="/interests"
              className="px-6 py-3 bg-[#1E90FF] text-white rounded-lg hover:bg-[#1873CC] transition-colors"
            >
              Interests 페이지로 가기
            </a>
          </div>
        ) : (
          // Chart
          <div>
            <div className="flex items-center justify-center gap-3 mb-8">
              <TrendingUp className="w-6 h-6 text-[#1E90FF]" />
              <h2 className="text-2xl font-semibold text-[#2D3436]">
                총 {totalLikes}개의 하트
              </h2>
            </div>

            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.id}-${index}`}
                      fill={COLORS[entry.id as keyof typeof COLORS]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {chartData.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-lg border-2 transition-all hover:shadow-md"
                  style={{ borderColor: COLORS[item.id as keyof typeof COLORS] }}
                >
                  <div className="text-center">
                    <div
                      className="text-3xl font-bold mb-1"
                      style={{ color: COLORS[item.id as keyof typeof COLORS] }}
                    >
                      {item.value}
                    </div>
                    <div className="text-sm text-gray-600">{item.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {totalLikes > 0 && (
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            💡 Interests 페이지에서 더 많은 하트를 눌러보세요!
          </p>
        </div>
      )}
    </div>
  );
}