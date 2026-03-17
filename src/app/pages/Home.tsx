import { Instagram, Mail, Shovel } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

export default function Home() {
  const [mailDialogOpen, setMailDialogOpen] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("haddo818@snu.ac.kr");
    toast.success("이메일 주소가 복사되었습니다!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center space-y-6 mb-16">
        {/* Profile Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full bg-[#1E90FF] flex items-center justify-center shadow-lg">
            <Shovel className="w-16 h-16 text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl sm:text-5xl font-semibold text-[#2D3436]">
          안녕하세요, 정연우입니다.
        </h1>
        <p className="text-lg sm:text-xl text-gray-700">
          고고미술사학과 고고학전공 24학번입니다.
        </p>
        <p className="text-lg sm:text-xl text-gray-700">
          머릿속에 떠오르는 아이디어를 바이브코딩을 통해 직접 실현해보고 싶어요 !
        </p>
      </div>

      {/* Contact Icons */}
      <div className="flex justify-center gap-8 mb-12">
        <a
          href="https://www.instagram.com/honda._.haddo_628/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-3 group"
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
            <Instagram className="w-10 h-10 text-white" />
          </div>
          <span className="text-sm text-gray-600 group-hover:text-[#FF4B4B] transition-colors">
            Instagram
          </span>
        </a>

        <button
          onClick={() => setMailDialogOpen(true)}
          className="flex flex-col items-center gap-3 group"
        >
          <div className="w-20 h-20 rounded-full bg-[#1E90FF] flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <span className="text-sm text-gray-600 group-hover:text-[#1E90FF] transition-colors">
            Mail
          </span>
        </button>
      </div>

      {/* Mail Dialog */}
      <Dialog open={mailDialogOpen} onOpenChange={setMailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>연락처</DialogTitle>
            <DialogDescription>
              이메일 주소를 복사하여 사용하실 수 있습니다.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-lg">
              메일주소: <span className="font-semibold">haddo818@snu.ac.kr</span>
            </p>
            <Button onClick={handleCopyEmail} className="w-full bg-[#1E90FF] hover:bg-[#1873CC]">
              복사하기
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}