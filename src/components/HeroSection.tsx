import React from "react";
import { Container, Typography } from "@mui/material";
import Button from "./Button";

const HeroSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-black to-indigo-900 text-white py-32">
      <Container maxWidth="md" className="text-center">
        <Typography variant="h2" sx={{fontWeight:"800"}} >
          Welcome to Postify 🚀
        </Typography>
        <Typography variant="h6" className="mb-8 text-gray-200">
          Your all-in-one dashboard for tracking posts, performance, and growth.
        </Typography>
        <Button
          text="Get Started"
          className="bg-white text-blue-600 mt-2 font-bold hover:bg-gray-200"
        />
       
      </Container>
    </div>
  );
};

export default HeroSection;
