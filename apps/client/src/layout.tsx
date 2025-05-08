

interface RootLayoutProps {
    children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {

    

    return(
        <div className="relative min-h-screen w-full overflow-hidden">
            <img 
                src="/images/bg-cubos-movies.png" 
                alt="Background" 
                className="w-full h-full absolute inset-0 object-cover" />
            <div className="absolute bottom-0 left-0 w-full h-4/5 bg-gradient-to-t from-black to-transparent" />
            <div className="relative z-10 flex items-center min-h-screen mx-4">
                {children}
            </div>
        </div>
    )
}