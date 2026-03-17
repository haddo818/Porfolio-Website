import { useState, useEffect } from "react";
import { Heart, Guitar, Music, Hammer, Tv } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { motion } from "motion/react";

interface Interest {
  id: string;
  title: string;
  icon: JSX.Element;
  description: string;
  details: string[];
}

const interests: Interest[] = [
  {
    id: "bass",
    title: "베이스 (Bass Guitar)",
    icon: <Guitar className="w-12 h-12" />,
    description: "밴드 동아리에서 베이스를 2년간 연주했습니다.",
    details: [
      "밴드 동아리에서 베이스를 2년간 연주했고, 지금도 취미로 열심히 치고 있습니다. 사용하는 베이스는 Sire V7인데 빨간색이라 무대 위에서 무척 예쁘게 보여요:)",
    ],
  },
  {
    id: "band",
    title: "밴드 음악",
    icon: <Music className="w-12 h-12" />,
    description: "슈게이징 장르를 좋아합니다.",
    details: [
      "밴드 음악을 두루두루 듣는데 가장 좋아하는 장르는 슈게이징입니다. 국내 밴드는 파란노을, 리도어를 좋아하고, 가장 좋아하는 밴드는 일본의 Ivy to Fraudulent Game이에요.",
    ],
  },
  {
    id: "handaxe",
    title: "주먹도끼",
    icon: <Hammer className="w-12 h-12" />,
    description: "전공 관련 '석기'에 관심이 많습니다.",
    details: [
      "전공이 고고학이라 '석기'에 관심이 많습니다. 특히 구석기의 주먹도끼에 대해서 과제를 많이 했어요. 저번 학기에는 수업에서 주먹도끼를 실제로 만들어보기도 했어요.",
    ],
  },
  {
    id: "animation",
    title: "애니메이션",
    icon: <Tv className="w-12 h-12" />,
    description: "애니메이션 감상이 취미입니다.",
    details: [
      "애니메이션 보는 걸 좋아해요. 좋아하는 애니메이션은 부끄러우니 언급하지 않도록 할게요.",
    ],
  },
];

export default function Interests() {
  const [likes, setLikes] = useState<{ [key: string]: number }>({});
  const [userLikes, setUserLikes] = useState<Set<string>>(new Set());
  const [selectedInterest, setSelectedInterest] = useState<Interest | null>(null);

  // Load likes from localStorage
  useEffect(() => {
    const storedLikes = localStorage.getItem("interests-likes");
    const storedUserLikes = localStorage.getItem("interests-user-likes");
    
    if (storedLikes) {
      setLikes(JSON.parse(storedLikes));
    } else {
      setLikes({
        bass: 0,
        band: 0,
        handaxe: 0,
        animation: 0,
      });
    }
    
    if (storedUserLikes) {
      setUserLikes(new Set(JSON.parse(storedUserLikes)));
    }
  }, []);

  const handleLike = (id: string) => {
    if (userLikes.has(id)) {
      // Unlike
      const newLikes = { ...likes, [id]: Math.max(0, likes[id] - 1) };
      const newUserLikes = new Set(userLikes);
      newUserLikes.delete(id);
      
      setLikes(newLikes);
      setUserLikes(newUserLikes);
      localStorage.setItem("interests-likes", JSON.stringify(newLikes));
      localStorage.setItem("interests-user-likes", JSON.stringify([...newUserLikes]));
    } else {
      // Like
      const newLikes = { ...likes, [id]: (likes[id] || 0) + 1 };
      const newUserLikes = new Set(userLikes);
      newUserLikes.add(id);
      
      setLikes(newLikes);
      setUserLikes(newUserLikes);
      localStorage.setItem("interests-likes", JSON.stringify(newLikes));
      localStorage.setItem("interests-user-likes", JSON.stringify([...newUserLikes]));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-semibold text-[#2D3436] mb-2 text-center">
        관심사와 취미
      </h1>
      <p className="text-center text-gray-600 mb-2">
        공감되시는 아이콘에는 하트를 눌러주세요
      </p>
      <p className="text-center text-gray-600 mb-8">
        아이콘을 클릭하면 상세내용을 확인할 수 있어요!
      </p>

      {/* 2x2 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {interests.map((interest) => (
          <motion.div
            key={interest.id}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-2xl shadow-lg p-8 relative"
          >
            {/* Card Content */}
            <button
              onClick={() => setSelectedInterest(interest)}
              className="w-full text-left"
            >
              <div className="flex flex-col items-center gap-4 mb-6">
                <div className="text-[#1E90FF]">{interest.icon}</div>
                <h3 className="text-xl font-semibold text-[#2D3436]">
                  {interest.title}
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  {interest.description}
                </p>
              </div>
            </button>

            {/* Heart Button */}
            <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-100">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(interest.id);
                }}
                className="p-2 rounded-full transition-all bg-gray-100 hover:bg-gray-200"
              >
                <motion.div
                  whileTap={{ scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                >
                  <Heart
                    className={`w-6 h-6 transition-colors ${
                      userLikes.has(interest.id)
                        ? "fill-[#FF4B4B] text-[#FF4B4B]"
                        : "text-gray-400"
                    }`}
                  />
                </motion.div>
                <span className="text-lg font-semibold text-gray-700">
                  {likes[interest.id] || 0}
                </span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal */}
      <Dialog
        open={selectedInterest !== null}
        onOpenChange={(open) => !open && setSelectedInterest(null)}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="text-[#1E90FF]">
                {selectedInterest?.icon}
              </div>
              {selectedInterest?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedInterest?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {selectedInterest?.details.map((detail, index) => (
              <p key={index} className="text-gray-700">
                {detail}
              </p>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}