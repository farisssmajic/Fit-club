import './App.css';
import Footer from './Components/Footer/Footer';
import Hero from './Components/Hero/Hero';
import Join from './Components/Join/Join';
import Plans from './Components/Plans/Plans';
import Programs from './Components/Programs/Programs';
import Reasons from './Components/Reasons/Reasons';
import Testimonials from './Components/Testimonials/Testimonials';
import BMICalculator from './Components/BMICalculator/BMICalculator';
import TrainerProfiles from './Components/TrainerProfiles/TrainerProfiles';
import MemberDashboard from './Components/MemberDashboard/MemberDashboard';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
            <Hero/>
            <Programs/>
            <Reasons/>
            <Plans/>
            <TrainerProfiles/>
            <BMICalculator/>
            <MemberDashboard/>
            <Testimonials/>
            <Join/>
            <Footer/>
      </div>
    </AuthProvider>
  );
}

export default App;
