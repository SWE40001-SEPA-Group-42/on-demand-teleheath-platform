import Userfront from "@userfront/react";
import { Box } from "@chakra-ui/react"
Userfront.init("xbrr9qdb");

const LogoutButton = Userfront.build({
  toolId: "nmldoa"
});

function Logout() {
    return (
        <Box mt='100px'>
            <LogoutButton />
        </Box>
    )
}

export default Logout