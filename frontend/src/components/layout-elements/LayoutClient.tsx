import Footer from "./Footer";
import TopBar from "./Topbar";
import { Toaster } from "@/components/ui/toaster";

function LayoutClient ({ children }: { children: JSX.Element }){

    return (
        <div>
            <TopBar />
            {children}
            <Toaster />
            <Footer />
        </div>
    )
}

export default LayoutClient; 