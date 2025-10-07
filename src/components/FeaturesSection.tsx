import React from "react";
import { Container, Grid, Typography, Paper } from "@mui/material";

const features = [
    {
        title: "Analytics & Insights",
        desc: "Understand user behavior with powerful analytics and reporting tools.",
    },
    {
        title: "Real-time Updates",
        desc: "Keep track of posts, likes, and trends as they happen in real time.",
    },
    {
        title: "Team Collaboration",
        desc: "Work together with teammates and manage content effectively.",
    },
];

const FeaturesSection: React.FC = () => {
    return (
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white">
            <Container maxWidth="lg" className="py-20">
                <Typography variant="h4" sx={{fontWeight:"600", marginBottom:"4px"}} className="font-bold text-center mb-12">
                    Powerful Features ⚙️
                </Typography>
                <Grid container spacing={4}>
                    {features.map((f, i) => (
                        <Grid key={i}>
                            <Paper className="p-6 hover:shadow-md transition duration-300">
                                <Typography variant="h6" className="font-semibold mb-2">
                                    {f.title}
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    {f.desc}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default FeaturesSection;
