// import React, { useCallback } from "react";
// import Header from "../common/Header";
// import { fetchAllAnnouncements, deleteAnnouncement, getAnnouncementById, saveAnnouncement, updateAnnouncement } from "../../services/AnnouncementsAPI/AnnouncementAPI";
// import useUnauthorizedError from "../common/handleUnauthorizedError";
// import { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
// import ToastNotification from "../common/ToastNotification";
// import DataTable from "react-data-table-component";
// // import TextEditor from "../TextEditor/TextEditor";
// import JoditEditor from "jodit-react";
// import './Announcement.css'


// const Announcement = () => {
//     const handleUnauthorizedError  = useUnauthorizedError();
//     const editor = useRef(null);

//     const [announcement, setAnnouncement] = useState([]);

//     const [errorMessage, setErrorMessage] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [toastVariant, setToastVariant] = useState('');
//     const [showToast, setShowToast] = useState(false);
//     const [refresh, setRefresh] = useState(false);
//     const [isEditing, setIsEditing] = useState(false);
//     const [editId, setEditId] = useState();
//     const [searchTerm, setSearchTerm] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);  
//     const [rowsPerPage, setRowsPerPage] = useState(10); 
//     const [modal, setModal] = useState();
//     const [cursorPosition, setCursorPosition] = useState(null);

//     const [announcementDetails, setAnnouncementDetails] = useState({
//             title: "",
//             content: "",
//             isPublish: false,
//             isActive: false,
//             expirationDate: ""
//         });

//     const handleInputChange = (e) => {
//         const { id, value, type, checked } = e.target;
//         setAnnouncementDetails(prevState => ({
//             ...prevState,
//             [id]: type === 'checkbox' ? checked : value,
//         }));
//     };

//     // const navigate = useNavigate();
//     const modalRef = useRef(null);
    
//     useEffect(() => {
//         fetchAllAnnouncements().then((fetchAnnouncement) => {
//             if(fetchAnnouncement && fetchAnnouncement.data){
//                 setAnnouncement(fetchAnnouncement.data)
//             }
//         }).catch((error) => {
//             console.error('Error fetching Announcement:', error);
//             handleUnauthorizedError(error);
//         })
//     }, [refresh]);

//     useEffect(() => {
//         if (modalRef.current && !modal) {
//             const bootstrapModal = new Modal(modalRef.current);
//             setModal(bootstrapModal);
//         }
//     }, []);

//     const addAnnounementHandle = async (e) => {
//             e.preventDefault();
//             try {
//                 if(!isEditing){
//                     await saveAnnouncement({
//                         title: announcementDetails.title,
//                         content : announcementDetails.content,
//                         isActive: announcementDetails.isActive,
//                         isPublished: announcementDetails.isPublish,
//                         expireDate: announcementDetails.expirationDate
//                     });
        
//                     setSuccessMessage("Announcement Added Successfully!")
//                     setShowToast(true);
//                     setToastVariant('success');
//                     setRefresh(prev => !prev)
//                     handleClose();
//                 }else{
//                     await updateAnnouncement({
//                         title: announcementDetails.title,
//                         content : announcementDetails.content,
//                         isActive: announcementDetails.isActive,
//                         isPublished: announcementDetails.isPublish,
//                         expireDate: announcementDetails.expirationDate
//                     }, editId);
    
//                     setSuccessMessage("Announcement Updated Successfully!")
//                     setShowToast(true);
//                     setToastVariant('success');
//                     setRefresh(prev => !prev)
//                     handleClose();
//                 }
                
//             } catch (error) {
                
//                 handleUnauthorizedError(error);
//             }
//         };

//     const addAnnouncementModal = () => {
//         if (modal) {
//             modal.show();
//         }
//         setIsEditing(false);
//         setEditId(null);
//     };

//     const handleClose = () => {
//         if (modal) {
//             modal.hide();
//         }
//         setAnnouncementDetails({
//             title: "",
//             content: "",
//             isPublished: false,
//             isActive: false,
//             expirationDate: ""
//         });
//         setIsEditing(false);
//         setEditId(null);
//     };

//     const closeToast = () => {
//         setShowToast(false);
//     };

//     const customStyles = {
//         headCells: {
//             style: {
//                 fontWeight: 'bold', // Make the header bold
//             },
//         },
//     };

//     const handleEdit = async (id) => {
           
//         try {
//             const response = await getAnnouncementById(id);
//             console.log("edit==>" + response)
//             if(response && response.data){
//                 setEditId(id);
//                 setAnnouncementDetails(prevState => ({
//                     ...prevState,
//                     title: response.data.title,
//                     content: response.data.content,
//                     isPublish: response.data.isPublished,
//                     isActive: response.data.isActive,
//                     expirationDate: response.data.expireDate ? response.data.expireDate.split("T")[0] : ""
//                 }));
//                 setIsEditing(true);
//                 if (modal) {
//                     modal.show();
//                 }
//             }
//         } catch (error) {
//             setIsEditing(false);
//             handleUnauthorizedError(error);
//         }
        
//     }

//     const deleteAnnouncementById = async (id) => {
//         try {
//             await deleteAnnouncement(id);
//             setErrorMessage("Announcement Deleted Successfully!")
//             setShowToast(true);
//             setToastVariant('error');
//             setRefresh(prev => !prev);
            
//         } catch (error) {
//             setErrorMessage("Something Went Wrong!")
//             setShowToast(true);
//             setToastVariant('error');
//             handleUnauthorizedError(error);
//         }
//     };

//     const confirmDelete = (id) => {
//         if (window.confirm('Are you sure you want to delete this Announcement?')) {
//             deleteAnnouncementById(id);
//             setRefresh(prev => !prev);
//         }
//     };

//     const columns = [
//         {
//             name: 'ID',
//             selector: (row, index) => index + 1,
//             sortable: true,
//             width: '80px',
//         },
//         {
//             name: 'Title',
//             selector: row => row.title,
//             sortable: true,
//             style: {
//                 maxWidth: '200px', 
//                 whiteSpace: 'nowrap', 
//                 overflow: 'hidden',  
//                 textOverflow: 'ellipsis', 
//             },
//         },
//         {
//             name: 'Content',
//             selector: row => row.content?.length > 100 ? row.content.slice(0, 100) + '...' : row.content || 'No description',
//             sortable: true,
//             filterable: true,
//             style: {
//                 // maxWidth: '1000px', 
//                 whiteSpace: 'nowrap', 
//                 overflow: 'hidden',  
//                 textOverflow: 'ellipsis', 
//             },
//         },
//         {
//             name: 'Is Active',
//             cell: (row) => (
//                 <button
//                     className={`btn btn-${row.isActive ? 'success' : 'danger'} btn-sm rounded-circle btn-animated`}
//                     style={{ fontSize: '12px' }}
//                 >
//                     <i className={`fas fa-${row.isActive ? 'check' : 'times'}`} style={{ fontSize: '12px' }}></i>
//                 </button>
//             ),
//             ignoreRowClick: true,
//             allowOverflow: true,
//             button: true,
//             // width: '80px',
//         },
//         {
//             name: 'Is Published',
//             cell: (row) => (
//                 <button
//                     className={`btn btn-${row.isPublished ? 'success' : 'danger'} btn-sm rounded-circle btn-animated`}
//                     style={{ fontSize: '12px' }}
//                 >
//                     <i className={`fas fa-${row.isPublished ? 'check' : 'times'}`} style={{ fontSize: '12px' }}></i>
//                 </button>
//             ),
//             ignoreRowClick: true,
//             allowOverflow: true,
//             button: true,
//             // width: '80px',
//         },
//         {
//             name: 'ACTIONS',
//             cell: (row) => (
//                 <div className='d-flex text-nowrap'>
                    
//                     <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(row.id)}>Edit</button>
//                     <button className="btn btn-danger btn-sm" onClick={() => confirmDelete(row.id)}>Delete</button>
                        
//                 </div>
//             ),
//             ignoreRowClick: true,
//             allowOverflow: true,
//             button: true,
//             width: '200px',
//         }
//     ];

//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//     };

//     const filteredAnnouncement = announcement.filter((item) =>
//         item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.content.toLowerCase().includes(searchTerm.toLowerCase()) 
//     );

//     const indexOfLastItem = currentPage * rowsPerPage;
//     const indexOfFirstItem = indexOfLastItem - rowsPerPage;
//     const currentAnnouncement = filteredAnnouncement.slice(indexOfFirstItem, indexOfLastItem);
//     const totalItems = filteredAnnouncement.length;
//     const handlePageChange = page => {
//         setCurrentPage(page);
//     };

//     const handleRowsPerPageChange = async (newPerPage, page) => {
//         setRowsPerPage(newPerPage);
//         setCurrentPage(page);
//     };

//     // const config = {
//     //     readonly: false, // Set to true if you want to make the editor readonly
//     //     height: 400, // Adjust editor height
//     //   };

//     const config = {
//         readonly: false, 
//         height: 400, 
//         toolbarButtonSize: 'small',
//         uploader: {
//           insertImageAsBase64URI: true,
//           url: '/upload', 
//           format: 'json', 
//             uploadMethod: 'POST',
//           name: 'file',
//           multiple: false,
//           accept: 'image/*',
//         },
//       };
//     const handleContentChange = (value) => {
//     setAnnouncementDetails((prevState) => ({
//         ...prevState,
//         content: value, // Update content specifically
//     }));
//     };
      
    

//     useEffect(() => {
//         if (editor.current && announcementDetails.content && editor.current.editor) {
//             const editorInstance = editor.current.editor;
//             editorInstance.selection.restore();
//         }
//     }, [announcementDetails.content, cursorPosition]);
    
//     return(
//         <div>
//             <Header></Header>

//             <div className='col-10 container-fluid mt-5'>
                
//                 <div className='d-flex justify-content-end'>
//                     <button className='text-end btn btn-success justify-content-end me-2' onClick={addAnnouncementModal}>Add Announcement</button>
                    
//                 </div>
                
//                 <h3 className='text-center mt-auto text-dark-emphasis'>Announcement List</h3>

//                 <DataTable
//                     columns={columns}
//                     data={currentAnnouncement}
//                     pagination
//                     paginationServer
//                     paginationTotalRows={totalItems}  
//                     paginationPerPage={rowsPerPage}  
//                     onChangePage={handlePageChange}  
//                     onChangeRowsPerPage={handleRowsPerPageChange}
//                     highlightOnHover
//                     responsive
//                     striped
//                     subHeader
//                     subHeaderComponent={
//                         <div className='d-flex justify-content-end mb-3'>
//                             <input
//                                 type="text"
//                                 placeholder="Search..."
//                                 className="form-control"
//                                 value={searchTerm}
//                                 onChange={handleSearchChange}
//                                 autoComplete="off"
//                                 autoCorrect="off"
//                             />
//                         </div>
                        
//                     }
//                     noDataComponent="No items available."
//                     customStyles={customStyles}
//                 />
//             </div>
//             <div className="modal" tabindex="-1" ref={modalRef} style={{paddingTop: '150px'}}>
//                     <div className="modal-dialog" role="document" style={{alignContent: 'center'}}>
//                         <div className="modal-content">
//                         <div className="modal-header">
//                             <h5 className="modal-title">Modal title</h5>
//                             <button type="button" className="btn-close" aria-label="Close" data-bs-dismiss="modal"
//                                 onClick={handleClose}>
//                             </button>
//                         </div>
//                         <div className="modal-body">
//                             <form autoComplete='off' autoCorrect='off' onSubmit={addAnnounementHandle}>
//                                 <div className='form-group mt-3'>
//                                     <label>Title</label>
//                                     <input className='form-control' type='text'  id='title' required 
//                                         placeholder='please enter Title' onChange={handleInputChange} value={announcementDetails.title}
//                                     ></input>
//                                 </div>
                                
//                                 <div className="mt-3">
//                                     <JoditEditor
//                                         ref={editor}
//                                         value={announcementDetails.content}
//                                         config={config}
//                                         onChange={handleContentChange}
//                                         // onChange={useCallback((value) => {
//                                         //     setAnnouncementDetails((prev) => ({ ...prev, content: value }));
//                                         // }, [])}
//                                     />
//                                 </div>

//                                 {/* <div>
//                                     <JoditEditor
//                                     ref={editor}
//                                     value={announcementDetails.content} // Bind content to the editor
//                                     config={config}
//                                     onChange={useCallback((value) => {
//                                         setAnnouncementDetails((prev) => ({
//                                         ...prev,
//                                         content: value, // Update the content state when the editor changes
//                                         }));
//                                     }, [])}
//                                     />
//                                 </div> */}
//                                 <div className='form-group mt-3'>
//                                     <label>Expiration Date</label>
//                                     <input
//                                         type='date'
//                                         id='expirationDate'
//                                         className='form-control'
//                                         onChange={handleInputChange} required
//                                         value={announcementDetails.expirationDate}
//                                     />
//                                 </div>
                               
//                                 {/* <div className='form-group form-check'>
                                    
//                                     <input type='checkbox' id='isActive' 
//                                         onChange={handleInputChange} checked = {announcementDetails.isActive}
//                                     ></input>
//                                     <label className="form-check-label" htmlFor="isActive">
//                                     Is Active
//                                     </label>
//                                 </div>
//                                 <div className='form-group form-check'>
                                    
//                                     <input type='checkbox' id='isPublish' 
//                                         onChange={handleInputChange} checked = {announcementDetails.isPublish}
//                                     ></input>
//                                     <label className="form-check-label" htmlFor="isPublish">
//                                     Is Publish
//                                     </label>
//                                 </div> */}

//                                 <div className="form-group mt-3">
//                                     {/* Inline checkboxes */}
//                                     <div style={{ display: 'flex', alignItems: 'center' }}>
//                                     <div style={{ marginRight: '20px' }}>
//                                         <input
//                                         type="checkbox"
//                                         id="isActive"
//                                         onChange={handleInputChange}
//                                         checked={announcementDetails.isActive}
//                                         />
//                                         <label htmlFor="isActive">Is Active</label>
//                                     </div>

//                                     <div>
//                                         <input
//                                         type="checkbox"
//                                         id="isPublish"
//                                         onChange={handleInputChange}
//                                         checked={announcementDetails.isPublish}
//                                         />
//                                         <label htmlFor="isPublish">Is Publish</label>
//                                     </div>
//                                     </div>
//                                 </div>
                                
                                
//                                 <div className="modal-footer">
//                                     <button type="submit" className="btn btn-primary">{isEditing ? 'Update' : 'Save'} changes</button>
//                                     <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleClose}>Close</button>
//                                 </div>
//                             </form>
//                         </div>
                        
//                         </div>
//                     </div>
//                 </div>
//                 <ToastNotification
//                     show={showToast}
//                     message={toastVariant === 'success' ? successMessage : errorMessage}
//                     variant={toastVariant}
//                     onClose={closeToast}
//                 />
//             </div>
//     )
// }



// export default Announcement;

import React, { useCallback } from "react";
import Header from "../common/Header";
import { fetchAllAnnouncements, deleteAnnouncement, getAnnouncementById, saveAnnouncement, updateAnnouncement } from "../../services/AnnouncementsAPI/AnnouncementAPI";
import useUnauthorizedError from "../common/handleUnauthorizedError";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import ToastNotification from "../common/ToastNotification";
import DataTable from "react-data-table-component";
import JoditEditor from "jodit-react";
import './Announcement.css'

const Announcement = () => {
    const handleUnauthorizedError = useUnauthorizedError();
    const editor = useRef(null);

    const [announcement, setAnnouncement] = useState([]);

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [modal, setModal] = useState();
    const [cursorPosition, setCursorPosition] = useState(null);

    const [announcementDetails, setAnnouncementDetails] = useState({
        title: "",
        content: "",
        isPublish: false,
        isActive: false,
        expirationDate: ""
    });

    const handleInputChange = (e) => {
        const { id, value, type, checked } = e.target;
        setAnnouncementDetails(prevState => ({
            ...prevState,
            [id]: type === 'checkbox' ? checked : value,
        }));
    };

    const modalRef = useRef(null);
    
    useEffect(() => {
        fetchAllAnnouncements().then((fetchAnnouncement) => {
            if(fetchAnnouncement && fetchAnnouncement.data){
                setAnnouncement(fetchAnnouncement.data)
            }
        }).catch((error) => {
            console.error('Error fetching Announcement:', error);
            handleUnauthorizedError(error);
        })
    }, [refresh]);

    useEffect(() => {
        if (modalRef.current && !modal) {
            const bootstrapModal = new Modal(modalRef.current);
            setModal(bootstrapModal);
        }
    }, []);

    const addAnnounementHandle = async (e) => {
        e.preventDefault();
        try {
            if(!isEditing){
                await saveAnnouncement({
                    title: announcementDetails.title,
                    content : announcementDetails.content,
                    isActive: announcementDetails.isActive,
                    isPublished: announcementDetails.isPublish,
                    expireDate: announcementDetails.expirationDate
                });
    
                setSuccessMessage("Announcement Added Successfully!")
                setShowToast(true);
                setToastVariant('success');
                setRefresh(prev => !prev)
                handleClose();
            }else{
                await updateAnnouncement({
                    title: announcementDetails.title,
                    content : announcementDetails.content,
                    isActive: announcementDetails.isActive,
                    isPublished: announcementDetails.isPublish,
                    expireDate: announcementDetails.expirationDate
                }, editId);

                setSuccessMessage("Announcement Updated Successfully!")
                setShowToast(true);
                setToastVariant('success');
                setRefresh(prev => !prev)
                handleClose();
            }
            
        } catch (error) {
            
            handleUnauthorizedError(error);
        }
    };

    const addAnnouncementModal = () => {
        if (modal) {
            modal.show();
        }
        setIsEditing(false);
        setEditId(null);
    };

    const handleClose = () => {
        if (modal) {
            modal.hide();
        }
        setAnnouncementDetails({
            title: "",
            content: "",
            isPublished: false,
            isActive: false,
            expirationDate: ""
        });
        setIsEditing(false);
        setEditId(null);
    };

    const closeToast = () => {
        setShowToast(false);
    };

    const customStyles = {
        headCells: {
            style: {
                fontWeight: 'bold',
                backgroundColor: '#f1f5f9',
                paddingTop: '16px',
                paddingBottom: '16px',
            },
        },
        rows: {
            style: {
                minHeight: '60px',
                fontSize: '14px',
            },
        },
        pagination: {
            style: {
                marginTop: '16px',
                borderRadius: '8px',
            },
        },
    };

    const handleEdit = async (id) => {
        try {
            const response = await getAnnouncementById(id);
            if(response && response.data){
                setEditId(id);
                setAnnouncementDetails(prevState => ({
                    ...prevState,
                    title: response.data.title,
                    content: response.data.content,
                    isPublish: response.data.isPublished,
                    isActive: response.data.isActive,
                    expirationDate: response.data.expireDate ? response.data.expireDate.split("T")[0] : ""
                }));
                setIsEditing(true);
                if (modal) {
                    modal.show();
                }
            }
        } catch (error) {
            setIsEditing(false);
            handleUnauthorizedError(error);
        }
    }

    const deleteAnnouncementById = async (id) => {
        try {
            await deleteAnnouncement(id);
            setErrorMessage("Announcement Deleted Successfully!")
            setShowToast(true);
            setToastVariant('error');
            setRefresh(prev => !prev);
            
        } catch (error) {
            setErrorMessage("Something Went Wrong!")
            setShowToast(true);
            setToastVariant('error');
            handleUnauthorizedError(error);
        }
    };

    const confirmDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this Announcement?')) {
            deleteAnnouncementById(id);
            setRefresh(prev => !prev);
        }
    };

    const columns = [
        {
            name: 'ID',
            selector: (row, index) => index + 1,
            sortable: true,
            width: '80px',
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
            style: {
                maxWidth: '200px', 
                whiteSpace: 'nowrap', 
                overflow: 'hidden',  
                textOverflow: 'ellipsis', 
            },
        },
        {
            name: 'Content',
            selector: row => row.content?.length > 100 ? row.content.slice(0, 100) + '...' : row.content || 'No description',
            sortable: true,
            filterable: true,
            style: {
                whiteSpace: 'nowrap', 
                overflow: 'hidden',  
                textOverflow: 'ellipsis', 
            },
        },
        {
            name: 'Is Active',
            cell: (row) => (
                <div className={`h-6 w-6 rounded-full flex items-center justify-center ${row.isActive ? 'bg-green-500' : 'bg-red-500'}`}>
                    <span className="text-white text-xs">
                        {row.isActive ? '✓' : '✕'}
                    </span>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '100px',
        },
        {
            name: 'Is Published',
            cell: (row) => (
                <div className={`h-6 w-6 rounded-full flex items-center justify-center ${row.isPublished ? 'bg-green-500' : 'bg-red-500'}`}>
                    <span className="text-white text-xs">
                        {row.isPublished ? '✓' : '✕'}
                    </span>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '120px',
        },
        {
            name: 'ACTIONS',
            cell: (row) => (
                <div className='flex space-x-2'>
                    <button 
                        className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded text-sm transition duration-300 ease-in-out"
                        onClick={() => handleEdit(row.id)}
                    >
                        Edit
                    </button>
                    <button 
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition duration-300 ease-in-out"
                        onClick={() => confirmDelete(row.id)}
                    >
                        Delete
                    </button>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '200px',
        }
    ];

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredAnnouncement = announcement.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentAnnouncement = filteredAnnouncement.slice(indexOfFirstItem, indexOfLastItem);
    const totalItems = filteredAnnouncement.length;
    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = async (newPerPage, page) => {
        setRowsPerPage(newPerPage);
        setCurrentPage(page);
    };

    const config = {
        readonly: false, 
        height: 400, 
        toolbarButtonSize: 'small',
        uploader: {
          insertImageAsBase64URI: true,
          url: '/upload', 
          format: 'json', 
          uploadMethod: 'POST',
          name: 'file',
          multiple: false,
          accept: 'image/*',
        },
    };
    
    const handleContentChange = (value) => {
        setAnnouncementDetails((prevState) => ({
            ...prevState,
            content: value,
        }));
    };

    useEffect(() => {
        if (editor.current && announcementDetails.content && editor.current.editor) {
            const editorInstance = editor.current.editor;
            editorInstance.selection.restore();
        }
    }, [announcementDetails.content, cursorPosition]);
    
    return(
        <div className="bg-gray-50 min-h-screen">
            <Header />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">Announcements</h1>
                        <button 
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center transition duration-300 ease-in-out"
                            onClick={addAnnouncementModal}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Add Announcement
                        </button>
                    </div>
                    
                    <div className="mb-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search announcements..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                autoComplete="off"
                                autoCorrect="off"
                            />
                            <div className="absolute left-3 top-2.5 text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-gray-200">
                        <DataTable
                            columns={columns}
                            data={currentAnnouncement}
                            pagination
                            paginationServer
                            paginationTotalRows={totalItems}  
                            paginationPerPage={rowsPerPage}  
                            onChangePage={handlePageChange}  
                            onChangeRowsPerPage={handleRowsPerPageChange}
                            highlightOnHover
                            responsive
                            striped
                            noDataComponent={
                                <div className="flex flex-col items-center justify-center p-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <p className="text-gray-600">No announcements available</p>
                                </div>
                            }
                            customStyles={customStyles}
                        />
                    </div>
                </div>
            </div>

            {/* Modal */}
            <div className="modal" tabIndex="-1" ref={modalRef}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content rounded-lg shadow-xl">
                        <div className="modal-header bg-gray-50 border-b p-4">
                            <h5 className="text-xl font-semibold text-gray-800">{isEditing ? 'Edit Announcement' : 'Add New Announcement'}</h5>
                            <button 
                                type="button" 
                                className="text-gray-400 hover:text-gray-500 focus:outline-none" 
                                aria-label="Close" 
                                data-bs-dismiss="modal"
                                onClick={handleClose}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="modal-body p-6">
                            <form autoComplete='off' autoCorrect='off' onSubmit={addAnnounementHandle}>
                                <div className='mb-4'>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                    <input 
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                                        type='text'  
                                        id='title' 
                                        required 
                                        placeholder='Enter announcement title' 
                                        onChange={handleInputChange} 
                                        value={announcementDetails.title}
                                    />
                                </div>
                                
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                                    <div className="border border-gray-200 rounded-md">
                                        <JoditEditor
                                            ref={editor}
                                            value={announcementDetails.content}
                                            config={config}
                                            onChange={handleContentChange}
                                        />
                                    </div>
                                </div>

                                <div className='mb-4'>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
                                    <input
                                        type='date'
                                        id='expirationDate'
                                        className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                        onChange={handleInputChange} 
                                        required
                                        value={announcementDetails.expirationDate}
                                    />
                                </div>
                               
                                <div className="mb-4">
                                    <div className="flex space-x-6">
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="isActive"
                                                onChange={handleInputChange}
                                                checked={announcementDetails.isActive}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="isActive" className="ml-2 block text-sm text-gray-700">Is Active</label>
                                        </div>

                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                id="isPublish"
                                                onChange={handleInputChange}
                                                checked={announcementDetails.isPublish}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="isPublish" className="ml-2 block text-sm text-gray-700">Is Published</label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex justify-end space-x-3 mt-6">
                                    <button 
                                        type="button" 
                                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md transition duration-300 ease-in-out"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-300 ease-in-out"
                                    >
                                        {isEditing ? 'Update' : 'Save'} Announcement
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <ToastNotification
                show={showToast}
                message={toastVariant === 'success' ? successMessage : errorMessage}
                variant={toastVariant}
                onClose={closeToast}
            />
        </div>
    )
}

export default Announcement;