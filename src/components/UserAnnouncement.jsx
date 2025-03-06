// // import { useState, useEffect } from "react";
// // import useUnauthorizedError from "./common/handleUnauthorizedError";
// // import { fetchAllActivePublicshedAnnouncements } from "../services/AnnouncementsAPI/AnnouncementAPI";

// import React, { useState, useEffect } from "react";
// import useUnauthorizedError from "./common/handleUnauthorizedError";
// import { fetchAllActivePublicshedAnnouncements } from "../services/AnnouncementsAPI/AnnouncementAPI";
// import { Card, CardContent, Typography, Modal, Box, Button } from "@mui/material";
// import { useSpring, animated } from "react-spring";
// import Header from "./common/Header";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBullhorn } from "@fortawesome/free-solid-svg-icons"; 

// const UserAnnouncement = () => {

//     const handleUnauthorizedError = useUnauthorizedError();
//     const [announcement, setAnnouncement] = useState([]);
//     const [selectedAnnouncement, setSelectedAnnouncement] = useState(null); // State to manage selected announcement for modal
//     const [openModal, setOpenModal] = useState(false); // State to manage modal open/close

//     useEffect(() => {
//         fetchAllActivePublicshedAnnouncements()
//         .then((fetchAnnouncement) => {
//                 if(fetchAnnouncement && fetchAnnouncement.data){
//                     setAnnouncement(fetchAnnouncement.data)
//                 }
//         }).catch((error) => {
//             console.error('Error fetching Announcement:', error);
//             handleUnauthorizedError(error);
//         })
//     }, []);

//     const fadeIn = useSpring({
//         opacity: 1,
//         from: { opacity: 0 },
//         config: { duration: 1000 },
//         });
    
//         // Handle opening the modal with a specific announcement
//     const handleOpenModal = (announcement) => {
//         setSelectedAnnouncement(announcement);
//         setOpenModal(true);
//     };
    
//         // Handle closing the modal
//     const handleCloseModal = () => {
//         setOpenModal(false);
//         setSelectedAnnouncement(null);
//     };

//     return(
//       <div>
//       <Header></Header>


//             {/* Announcement Headline Marquee */}
//             <div style={{
//                 overflow: "hidden", 
//                 whiteSpace: "nowrap", 
//                 margin: "20px 0",
//                 backgroundColor: "yellow",  // Yellow background
//                 padding: "5px",  // Add some padding for better spacing
//                 borderRadius: "5px", // Rounded corners
//                 boxShadow: "0px 2px 5px rgba(0,0,0,0.1)"  // Slight shadow for effect
//             }}>
//                 <marquee behavior="scroll" direction="left" scrollamount="8">
//                     {/* Font Awesome Icon and Announcements */}
//                     <FontAwesomeIcon icon={faBullhorn} style={{ marginRight: "10px", fontSize: "24px" }} />
//                     {announcement.length > 0 ? (
//                         announcement.map((item) => (
//                             <span key={item.id} style={{ marginRight: "50px", fontSize: "20px", color: "red" }} onClick={() => handleOpenModal(item)}>
//                                 {item.title} &nbsp;&nbsp;&nbsp;&nbsp;
//                             </span>
//                         ))
//                     ) : (
//                         <span>No Announcements Available</span>
//                     )}
//                 </marquee>
//             </div>

//       <h2 className="text-center" style={{ marginTop: '20px', color: '#444' }}>Latest Announcements</h2>
      
//       <animated.div style={fadeIn}>
//           <div className="announcement-list" style={{ padding: '20px 15px' }}>
//               {announcement.length > 0 ? (
//                   announcement.map((item) => (
//                       <Card
//                           key={item.id}
//                           sx={{
//                               margin: 2,
//                               cursor: "pointer",
//                               backgroundColor: "#f7f7f7", // Slight grey for the card background
//                               boxShadow: 2,
//                               transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                               '&:hover': {
//                                   transform: 'scale(1.02)',
//                                   boxShadow: 6,
//                               }
//                           }}
//                           onClick={() => handleOpenModal(item)} 
//                       >
//                           <CardContent>
//                               <Typography variant="h6">{item.title}</Typography>
//                               {/* <Typography variant="body2" color="textSecondary">
//                                   {item.content.length > 100
//                                       ? item.content.slice(0, 100) + "..."
//                                       : item.content}
//                               </Typography> */}
//                               <Typography
//                                 variant="body2"
//                                 color="textSecondary"
//                                 dangerouslySetInnerHTML={{
//                                     __html: item.content.length > 100 
//                                         ? item.content.slice(0, 100) + "..." 
//                                         : item.content
//                                 }}
// />

//                           </CardContent>
//                       </Card>
//                   ))
//               ) : (
//                   <Typography>No Announcements Available</Typography>
//               )}
//           </div>
//       </animated.div>

//       <Modal open={openModal} onClose={handleCloseModal}>
//           <Box sx={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               bgcolor: '#333',  // Darker background for the modal
//               border: '2px solid #444', 
//               boxShadow: 24,
//               p: 4,
//               maxWidth: '600px',
//               width: '100%',
//               borderRadius: 2,
//           }}>
//               {selectedAnnouncement && (
//                   <>
//                       <Typography variant="h5" gutterBottom style={{ color: '#fff' }}>
//                           {selectedAnnouncement.title}
//                       </Typography>
//                       <Typography variant="body1" style={{ color: '#fff' }}
//                             dangerouslySetInnerHTML={{ __html: selectedAnnouncement.content }}>
//                           {/* {selectedAnnouncement.content} */}
//                       </Typography>
//                       <Button 
//                           sx={{ marginTop: 2, backgroundColor: '#f44336', '&:hover': { backgroundColor: '#d32f2f' } }}
//                           variant="contained"
//                           onClick={handleCloseModal}
//                       >
//                           Close
//                       </Button>
//                   </>
//               )}
//           </Box>
//       </Modal>
//   </div>
//     )
// }

// export default UserAnnouncement;

import React, { useState, useEffect } from "react";
import useUnauthorizedError from "./common/handleUnauthorizedError";
import { fetchAllActivePublicshedAnnouncements } from "../services/AnnouncementsAPI/AnnouncementAPI";
import Header from "./common/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";

const UserAnnouncement = () => {
    const handleUnauthorizedError = useUnauthorizedError();
    const [announcement, setAnnouncement] = useState([]);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        fetchAllActivePublicshedAnnouncements()
        .then((fetchAnnouncement) => {
            if(fetchAnnouncement && fetchAnnouncement.data){
                setAnnouncement(fetchAnnouncement.data)
            }
        }).catch((error) => {
            console.error('Error fetching Announcement:', error);
            handleUnauthorizedError(error);
        })
    }, []);

    // Handle opening the modal with a specific announcement
    const handleOpenModal = (announcement) => {
        setSelectedAnnouncement(announcement);
        setOpenModal(true);
    };

    // Handle closing the modal
    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedAnnouncement(null);
    };

    return(
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Announcement Headline Marquee */}
            <div className="mx-4 my-5 bg-yellow-300 p-3 rounded-lg shadow overflow-hidden whitespace-nowrap">
                <marquee behavior="scroll" direction="left" scrollamount="8">
                    <FontAwesomeIcon icon={faBullhorn} className="mr-3 text-2xl" />
                    {announcement.length > 0 ? (
                        announcement.map((item) => (
                            <span key={item.id} className="mr-12 text-xl text-red-600 cursor-pointer" onClick={() => handleOpenModal(item)}>
                                {item.title} &nbsp;&nbsp;&nbsp;&nbsp;
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-700">No Announcements Available</span>
                    )}
                </marquee>
            </div>

            <h2 className="text-center text-2xl font-semibold text-gray-700 mt-8 mb-6">Latest Announcements</h2>
            
            <div className="max-w-5xl mx-auto px-4 pb-12 transition-opacity duration-1000 opacity-100">
                <div className="space-y-4">
                    {announcement.length > 0 ? (
                        announcement.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-lg shadow-md p-5 cursor-pointer transform transition-all duration-300 hover:scale-102 hover:shadow-lg"
                                onClick={() => handleOpenModal(item)}
                            >
                                <h3 className="text-lg font-medium text-gray-800 mb-2">{item.title}</h3>
                                <div 
                                    className="text-sm text-gray-600"
                                    dangerouslySetInnerHTML={{
                                        __html: item.content.length > 100 
                                            ? item.content.slice(0, 100) + "..." 
                                            : item.content
                                    }}
                                />
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-gray-600">No Announcements Available</p>
                    )}
                </div>
            </div>

            {/* Modal */}
            {openModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full shadow-xl transform transition-all">
                        {selectedAnnouncement && (
                            <>
                                <h2 className="text-xl font-semibold text-white mb-4">{selectedAnnouncement.title}</h2>
                                <div 
                                    className="text-white mb-6"
                                    dangerouslySetInnerHTML={{ __html: selectedAnnouncement.content }}
                                />
                                <button 
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                    onClick={handleCloseModal}
                                >
                                    Close
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserAnnouncement;