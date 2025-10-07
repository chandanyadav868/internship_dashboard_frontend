import React from "react";
import { Container, Typography } from "@mui/material";
import Button from "./Button";
import { Link } from "react-router";

const CallToAction: React.FC = () => {
    return (
        <div className="bg-gradient-to-r from-black to-indigo-900 py-20 text-center text-white">
            <Container maxWidth="md">
                <Typography variant="h4" sx={{ fontWeight: "600" }} className="font-bold mb-4">
                    Ready to supercharge your content strategy?
                </Typography>
                <Typography variant="body1" className="mb-8 text-gray-200">
                    Join thousands of creators using Postify to grow audience and
                    manage posts efficiently.
                </Typography>
                <Link to={"/auth/login"}>
                    <Button
                        text="Create your account"
                        className="bg-white text-blue-600 mt-2 font-bold hover:bg-gray-200"
                    />
                </Link>
            </Container>
        </div>
    );
};

export default CallToAction;
