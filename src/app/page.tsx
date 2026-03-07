import DermHero from '@/components/DermHero';
import DoctorProfile from '@/components/DoctorProfile';
import Testimonials from '@/components/Testimonials';
import BookingSection from '@/components/BookingSection';
import Footer from '@/components/Footer';
import SkinAdvisorFAB from '@/components/SkinAdvisorFAB';

export default function Home() {
    return (
        <>
            <DermHero />
            <DoctorProfile />
            <Testimonials />
            <BookingSection />
            <Footer />
            <SkinAdvisorFAB />
        </>
    );
}
