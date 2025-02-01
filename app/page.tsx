import LandingPage from '@/pages/LandingPage';
import GridBackground from '@/components/ui/gridBackground'
import GradientOverlay from '@/components/ui/gradientOverlay';

const page = () => {
  return (
    <>
      <GridBackground />
      <GradientOverlay />
      <LandingPage />
    </>
  )
}

export default page