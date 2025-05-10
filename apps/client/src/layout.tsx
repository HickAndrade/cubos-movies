import Footer from "./components/Footer";
import Navbar from "./components/Navbar";


interface RootLayoutProps {
    children: React.ReactNode;
    itemCenter?: boolean;
}

export function RootLayout({ children, itemCenter = true }: RootLayoutProps) {

    

    return(
    <div className="relative min-h-screen w-full overflow-hidden">
        <img 
            src="/images/bg-cubos-movies.png" 
            alt="Background" 
            className="w-full h-full absolute inset-0 object-cover" />
        <div className="transition-colors absolute bottom-0 left-0 w-full h-4/5 bg-gradient-to-t dark:from-black from-[#b5b2bca9]  to-transparent" />
        <div className="relative z-10">
            <Navbar />
            <div className={`flex min-h-screen mx-4 ${itemCenter && 'items-center'}`}>
                {children}
            </div>
            <Footer />
        </div>
    </div>
    )
}