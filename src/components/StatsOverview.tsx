import React from "react";
import { Card, CardContent, Typography, Container, Grid } from "@mui/material";
import { TrendingUp, Group, PostAdd } from "@mui/icons-material";

const stats = [
    { icon: <TrendingUp fontSize="large" />, title: "Views", value: "120K+" },
    { icon: <Group fontSize="large" />, title: "Active Users", value: "8.5K" },
    { icon: <PostAdd fontSize="large" />, title: "Posts Created", value: "34K" },
];

const StatsOverview: React.FC = () => {
    return (
        <div className="bg-gradient-to-r from-black to-indigo-900 text-white">
            <Container maxWidth="lg" className="py-20">
                <Typography variant="h4" sx={{fontWeight:900,marginBottom:2}} className="font-bold text-center mb-12">
                    Dashboard Overview 📊
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {stats.map((stat, index) => (
                        <Grid key={index}>
                            <Card className="hover:shadow-lg transition-all duration-300">
                                <CardContent className="text-center p-8">
                                    <div className="flex justify-center mb-4 text-blue-600">
                                        {stat.icon}
                                    </div>
                                    <Typography variant="h5" className="font-semibold">
                                        {stat.value}
                                    </Typography>
                                    <Typography color="textSecondary">{stat.title}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default StatsOverview;
