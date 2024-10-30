import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../js/api'
import Panel from '../components/common/Panel'

function ControlePanel() {
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdminStatus = async () => {
            try {
                const response = await api.get("/api/check-admin");
                if (response.data.isAdmin) {
                    setIsAdmin(true);
                } else {
                    navigate("/"); // Redirect if not an admin
                }
            } catch (error) {
                console.error("Error checking admin status", error);
                navigate("/login"); // Redirect if error occurs
            }
        };

        checkAdminStatus();
    }, [navigate]);

    if (!isAdmin) return null;

    return (
        <div>
            <Panel />
           
        </div>
    );
};


export default ControlePanel
