import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import { BackgroundPattern } from "./background-pattern";

import { MdDashboard } from "react-icons/md"; // Material Design dashboard icon
import { FiGrid } from "react-icons/fi"; // Grid icon
import { AiOutlinePieChart } from "react-icons/ai"; // Pie chart
import { BiBarChartAlt2 } from "react-icons/bi"; // Bar chart

const Hero06 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <BackgroundPattern />

      <div className="relative z-10 text-center max-w-2xl">
        <Badge className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-full py-1 px-3 shadow-sm">
          Just released v1.0.0
        </Badge>

        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
          Everything
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          All your daily tools, perfectly organized. Stay on top of tasks, events, and connections without switching apps.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <a href="/sign-in">
            <Button size="lg" className="rounded-full text-base">
              Get Started <ArrowUpRight className="!h-5 !w-5" />
            </Button>
          </a>
          <a href="/dashboard">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base shadow-none"
            >
              <MdDashboard />
              Dashboard
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero06;
