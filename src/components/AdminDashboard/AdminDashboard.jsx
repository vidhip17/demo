// import React from "react";
// import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
// import { useNavigate } from 'react-router-dom';
// import { Link } from "react-router-dom";
// import { styled } from '@mui/system';
// import Header from "../common/Header";
// import { FaUsers, FaBullhorn } from "react-icons/fa";


// const cardColors = [
//     '#FF6F61', // Red
//     '#6A4CFF', // Purple
//     '#56C1A3', // Teal
//     '#FFD54F', // Yellow
//     '#FF7043', // Orange
//     '#64B5F6', // Blue
//   ];
  
//   const HoverCard = styled(Card)(({ color }) => ({
//     backgroundColor: color,
//     height: '100%',
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'center',
//     transition: 'transform 0.3s ease', // Smooth scaling animation
//     '&:hover': {
//       transform: 'scale(1.05)', // Scale up by 5% (adjust as needed)
//       cursor: 'pointer',
//     },
//     // Adding padding to avoid overlap when scaling
//     padding: '16px',
//   }));

// const AdminDashboard = () => {
//     const navigate = useNavigate();

//     const sections = [
//         { title: 'Items', link: '/itemList' },
//         { title: 'Announcements', link: '/announcement' }
//       ];
//     return(
//         // <div>
//         //     <Header></Header>
//         //     <Box sx={{ padding: 2 }}>
//         //         <Typography variant="h4" gutterBottom>
//         //             Admin Dashboard
//         //         </Typography>

//         //         <Grid container spacing={3}>
//         //             {sections.map((section, index) => (
//         //             <Grid item xs={12} sm={4} md={4} key={index}>
//         //                 <Link to={section.link} style={{ textDecoration: 'none' }}>
//         //                 <HoverCard color={cardColors[index]}>
//         //                     <CardContent>
//         //                     <Typography variant="h6" component="div" align="center" color="white">
//         //                         {section.title}
//         //                     </Typography>
//         //                     </CardContent>
//         //                 </HoverCard>
//         //                 </Link>
//         //             </Grid>
//         //             ))}
//         //         </Grid>
//         //     </Box>
//         // </div>

//         <div>
//       <Header />
//       <div className="container mt-5">
//         <h2 className="text-center mb-4">Admin Dashboard</h2>

//         <div className="row justify-content-center">
//           {/* User List Card */}
//           <div className="col-md-5">
//             <div
//               className="card text-center shadow-lg p-3 mb-5 bg-body rounded"
//               onClick={() => navigate('/itemList')}
//               style={{ cursor: "pointer", transition: "transform 0.3s ease" }}
//               onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} // Hover effect
//               onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
//             >
//               <div className="card-body">
//                 <FaUsers size={50} className="mb-3 text-primary" />
//                 <h5 className="card-title">Item List</h5>
//                 <p className="card-text">View and manage items.</p>
//               </div>
//             </div>
//           </div>

//           {/* Announcements Card */}
//           <div className="col-md-5">
//             <div
//               className="card text-center shadow-lg p-3 mb-5 bg-body rounded"
//               onClick={() => navigate('/announcement')}
//               style={{ cursor: "pointer", transition: "transform 0.3s ease" }}
//               onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'} // Hover effect
//               onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
//             >
//               <div className="card-body">
//                 <FaBullhorn size={50} className="mb-3 text-secondary" />
//                 <h5 className="card-title">Announcements</h5>
//                 <p className="card-text">Create and manage announcements.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
        
//     );
// }

import React from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../common/Header";
// import { FaBoxOpen, FaBullhorn } from "react-icons/fa";
import { FaUsers, FaBullhorn, FaBoxOpen, FaChartLine, FaCog, FaCalendarAlt } from "react-icons/fa";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    
    const cards = [
        {
            title: 'Items',
            description: 'View and manage inventory items',
            icon: <FaBoxOpen size={36} className="text-indigo-600" />,
            link: '/itemList',
            color: 'bg-indigo-50 border-indigo-200',
            hoverColor: 'hover:bg-indigo-100',
        },
        {
            title: 'Announcements',
            description: 'Create and manage announcements',
            icon: <FaBullhorn size={36} className="text-emerald-600" />,
            link: '/announcement',
            color: 'bg-emerald-50 border-emerald-200',
            hoverColor: 'hover:bg-emerald-100',
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back, {username || 'Admin'}</h1>
                    <p className="mt-2 text-gray-600">
                        Admin Dashboard | What would you like to manage today?
                    </p>
                </div>

                <div className="mb-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                    <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                                        <div className="p-5">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                                                    <FaUsers className="h-6 w-6 text-white" />
                                                </div>
                                                <div className="ml-5 w-0 flex-1">
                                                    <dl>
                                                        <dt className="text-sm font-medium text-gray-500 truncate">Active Users</dt>
                                                        <dd className="flex items-baseline">
                                                            <div className="text-2xl font-semibold text-gray-900">48</div>
                                                            <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                                                                <span>+12%</span>
                                                            </div>
                                                        </dd>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                                        <div className="p-5">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 bg-emerald-500 rounded-md p-3">
                                                    <FaBoxOpen className="h-6 w-6 text-white" />
                                                </div>
                                                <div className="ml-5 w-0 flex-1">
                                                    <dl>
                                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Items</dt>
                                                        <dd className="flex items-baseline">
                                                            <div className="text-2xl font-semibold text-gray-900">356</div>
                                                            <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                                                                <span>+8%</span>
                                                            </div>
                                                        </dd>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                                        <div className="p-5">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 bg-amber-500 rounded-md p-3">
                                                    <FaBullhorn className="h-6 w-6 text-white" />
                                                </div>
                                                <div className="ml-5 w-0 flex-1">
                                                    <dl>
                                                        <dt className="text-sm font-medium text-gray-500 truncate">Announcements</dt>
                                                        <dd className="flex items-baseline">
                                                            <div className="text-2xl font-semibold text-gray-900">12</div>
                                                            <div className="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                                                                <span>-2%</span>
                                                            </div>
                                                        </dd>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
                                        <div className="p-5">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                                                    <FaCog className="h-6 w-6 text-white" />
                                                </div>
                                                <div className="ml-5 w-0 flex-1">
                                                    <dl>
                                                        <dt className="text-sm font-medium text-gray-500 truncate">System Status</dt>
                                                        <dd className="flex items-baseline">
                                                            <div className="text-2xl font-semibold text-gray-900">Healthy</div>
                                                            <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                                                                <span>100%</span>
                                                            </div>
                                                        </dd>
                                                    </dl>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                
                {/* Main Cards */}
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Quick Access</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
                    {cards.map((card, index) => (
                        <div 
                            key={index}
                            className={`cursor-pointer transition-all duration-300 transform hover:scale-105 border rounded-xl shadow-sm ${card.color} ${card.hoverColor}`}
                            onClick={() => navigate(card.link)}
                        >
                            <div className="p-6">
                                <div className="mb-4">
                                    {card.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                                <p className="text-sm text-gray-600">{card.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;