'use client';
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@/components/ui/button";

const Logout: React.FC = () => {
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove('accessToken');
        Cookies.remove('role');
        Cookies.remove('userId');
        router.push('/login');
    };

    return (
        <Button variant='outline'>
            <LogoutIcon onClick={handleLogout} />
        </Button>
    );
};

export default Logout;