import Userfront from "@userfront/react";

Userfront.init("xbrr9qdb");

const PasswordResetForm = Userfront.build({
  toolId: "modbal"
});

function Reset() {
    return (
        <>
            <PasswordResetForm/> 
        </>
    )
}

export default Reset