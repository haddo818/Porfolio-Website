import { CheckCircle2, Target } from "lucide-react";
import { Progress } from "../components/ui/progress";

const currentSkills = [
  { name: "Python", level: 40, description: "Basic" },
  { name: "Java", level: 35, description: "Basic" },
  { name: "C", level: 30, description: "Basic" },
];

const futureGoals = [
  { name: "바이브코딩", description: "아이디어를 빠르게 실현하는 능력" },
  { name: "Python", description: "더 깊이 있는 학습과 실전 프로젝트 적용" },
  { name: "Java", description: "객체지향 프로그래밍 마스터" },
  { name: "C", description: "시스템 레벨 프로그래밍 이해" },
];

export default function Skills() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-semibold text-[#2D3436] mb-12 text-center">
        기술 스택
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Current Skills */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="w-8 h-8 text-[#1E90FF]" />
            <h2 className="text-2xl font-semibold text-[#2D3436]">
              현재 사용 가능한 기술
            </h2>
          </div>

          <div className="space-y-6">
            {currentSkills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-[#2D3436]">{skill.name}</span>
                  <span className="text-sm text-gray-600">{skill.description}</span>
                </div>
                <Progress value={skill.level} className="h-3" />
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              💡 현재는 기초 단계이지만, 꾸준히 학습하며 성장하고 있습니다.
            </p>
          </div>
        </div>

        {/* Future Goals */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <Target className="w-8 h-8 text-[#1E90FF]" />
            <h2 className="text-2xl font-semibold text-[#2D3436]">
              앞으로 배우고 싶은 기술
            </h2>
          </div>

          <div className="space-y-4">
            {futureGoals.map((goal, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 rounded-lg border-2 border-gray-100 hover:border-[#1E90FF] transition-colors"
              >
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#1E90FF] text-white flex items-center justify-center text-sm font-semibold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-[#2D3436] mb-1">
                    {goal.name}
                  </h3>
                  <p className="text-sm text-gray-600">{goal.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
            <p className="text-sm text-gray-700">
              🎯 이미 배운 언어도 계속 깊이 있게 학습하며 전문성을 키우고 싶습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}