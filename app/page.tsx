import LandingPage from "@/pages/LandingPage";
import GridBackground from "../components/ui/GridBackground";
import GradientOverlay from "../components/ui/GradientOverlay";

const page = () => {
  return (
    <>
      <GridBackground />
      <GradientOverlay />
      <LandingPage />
    </>
  );
};

export default page;
