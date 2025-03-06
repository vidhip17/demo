import React, {useRef} from 'react'
import { useState, useEffect } from 'react'
import { fetchItems, addItem, editItem, getItemById, deleteItemById, logout } from '../services/Api'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Modal } from 'bootstrap';
import ToastNotification from './common/ToastNotification';
import useUnauthorizedError from './common/handleUnauthorizedError';
import DataTable from 'react-data-table-component';
import jQuery from 'jquery';
import Header from './common/Header';
window.$ = window.jQuery = jQuery;

const ItemList = () => {
    const handleUnauthorizedError = useUnauthorizedError();
    const navigate = useNavigate();
    const modalRef = useRef(null);
    const dataTableRef = useRef(null);
    const tableRef = useRef(null);
    const roles = JSON.parse(localStorage.getItem("role"));
    const isAdmin = roles && roles.includes("ADMIN");

    const [items, setItems] = useState([]);
    const [modal, setModal] = useState();
    const [itemDetails, setItemDetails] = useState({
        name: "",
        description: "",
        price: 0
    })
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

    useEffect(() => {
        fetchItems()
          .then((fetchedItems) => {
            if(fetchedItems && fetchedItems.data){
                setItems(fetchedItems.data);
            }     
          })
          .catch((error) => {
            console.error('Error fetching items:', error);
            handleUnauthorizedError(error);
          });
      }, [refresh]);

    useEffect(() => {
        if (modalRef.current && !modal) {
            const bootstrapModal = new Modal(modalRef.current);
            setModal(bootstrapModal);
        }
    }, []);

    const addItemModal = () => {
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
        setItemDetails({
            name: '',
            description: '',
            price: ''
        });
        setIsEditing(false);
        setEditId(null);
    };

    const addItemHandle = async (e) => {
        e.preventDefault();
        try {
            if(!isEditing){
                const response = await addItem({
                    name: itemDetails.name,
                    price : itemDetails.price,
                    description: itemDetails.description
                });
    
                setSuccessMessage("Item Added Successfully!")
                setShowToast(true);
                setToastVariant('success');
                setRefresh(prev => !prev)
                handleClose();
            }else{
                const response = await editItem(editId, {
                    name: itemDetails.name,
                    price : itemDetails.price,
                    description: itemDetails.description
                });

                setSuccessMessage("Item Updated Successfully!")
                setShowToast(true);
                setToastVariant('success');
                setRefresh(prev => !prev)
                handleClose();
            }
            
        } catch (error) {
            handleUnauthorizedError(error);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setItemDetails(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleEdit = async (id) => {
       
        try {
            const response = await getItemById(id);
            console.log("edit==>" + response)
            if(response && response.data){
                setEditId(id);
                setItemDetails(prevState => ({
                    ...prevState,
                    name: response.data.name,
                    description: response.data.description,
                    price: response.data.price
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

    const confirmDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            deleteItem(id);
            setRefresh(prev => !prev);
        }
    };

    const deleteItem = async (id) => {
        try {
            deleteItemById(id);
            setErrorMessage("Item Deleted Successfully!")
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

    const logOut = async () => {
        const res = await logout();
        navigate("/");
    }

    const closeToast = () => {
        setShowToast(false);
    };

    const customStyles = {
        headCells: {
            style: {
                fontWeight: 'bold',
                backgroundColor: '#f3f4f6',
                paddingTop: '16px',
                paddingBottom: '16px',
                borderBottom: '2px solid #e5e7eb',
            },
        },
        rows: {
            style: {
                minHeight: '56px',
                '&:nth-of-type(odd)': {
                    backgroundColor: '#f9fafb',
                },
            },
            highlightOnHoverStyle: {
                backgroundColor: '#f1f5f9',
                transition: '0.2s',
            },
        },
        pagination: {
            style: {
                borderTop: '1px solid #e5e7eb',
                padding: '16px',
            },
        },
    };

    const columns = [
        {
            name: 'ID',
            selector: (row, index) => index + 1,
            sortable: true,
            width: '80px',
        },
        {
            name: 'ITEM NAME',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'DESCRIPTION',
            selector: row => row.description || 'No description',
            sortable: true,
            filterable: true
        },
        {
            name: 'PRICE',
            selector: row => row.price || 'No description',
            sortable: true,
            width: '120px',
        },
        {
            name: 'ACTIONS',
            cell: (row) => (
                <div className='flex space-x-2 text-nowrap'>
                    {isAdmin && (
                        <>
                        <button 
                            className="px-3 py-1 text-sm font-medium text-white transition-colors bg-amber-500 rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2" 
                            onClick={() => handleEdit(row.id)}
                        >
                            Edit
                        </button>
                        <button 
                            className="px-3 py-1 text-sm font-medium text-white transition-colors bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" 
                            onClick={() => confirmDelete(row.id)}
                        >
                            Delete
                        </button>
                        </>
                    )}
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

    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.price.toString().includes(searchTerm)
    );

    const indexOfLastItem = currentPage * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalItems = filteredItems.length;
    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const handleRowsPerPageChange = async (newPerPage, page) => {
        setRowsPerPage(newPerPage);
        setCurrentPage(page);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Item Management</h1>
                    {isAdmin && (
                        <button 
                            onClick={addItemModal}
                            className="px-4 py-2 text-sm font-medium text-white transition-colors bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                        >
                            Add New Item
                        </button>
                    )}
                </div>
                
                <div className="overflow-hidden bg-white rounded-lg shadow">
                    <div className="px-4 py-5 sm:p-6">
                        <DataTable
                            columns={columns}
                            data={currentItems}
                            pagination
                            paginationServer
                            paginationTotalRows={totalItems}  
                            paginationPerPage={rowsPerPage}  
                            onChangePage={handlePageChange}  
                            onChangeRowsPerPage={handleRowsPerPageChange}
                            highlightOnHover
                            responsive
                            striped
                            subHeader
                            subHeaderComponent={
                                <div className="w-full mb-4">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Search items..."
                                            className="block w-full py-2 pl-10 pr-3 text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            autoComplete="off"
                                            autoCorrect="off"
                                        />
                                    </div>
                                </div>
                            }
                            noDataComponent={
                                <div className="flex items-center justify-center p-8 text-gray-500">
                                    No items available.
                                </div>
                            }
                            customStyles={customStyles}
                        />
                    </div>
                </div>
                
                {/* Modal - keeping Bootstrap modal for functionality */}
                <div className="modal" tabIndex="-1" ref={modalRef}>
                    <div className="modal-dialog">
                        <div className="modal-content rounded-lg shadow-lg">
                            <div className="modal-header border-b border-gray-200">
                                <h5 className="text-lg font-semibold text-gray-900">
                                    {isEditing ? 'Edit Item' : 'Add New Item'}
                                </h5>
                                <button 
                                    type="button" 
                                    className="p-2 text-gray-400 bg-transparent rounded-md hover:bg-gray-100 hover:text-gray-500"
                                    aria-label="Close" 
                                    data-bs-dismiss="modal"
                                    onClick={handleClose}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <div className="modal-body p-6">
                                <form onSubmit={addItemHandle} autoComplete='off' autoCorrect='off'>
                                    <div className="mb-4">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Item Name</label>
                                        <input 
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                                            type='text' 
                                            onChange={handleInputChange} 
                                            id='name' 
                                            required 
                                            placeholder='Enter item name'
                                            value={itemDetails.name}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-700">Price</label>
                                        <input 
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                                            type='number'
                                            onChange={handleInputChange} 
                                            id='price' 
                                            required 
                                            placeholder='Enter price'
                                            value={itemDetails.price}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">Description</label>
                                        <textarea 
                                            onChange={handleInputChange} 
                                            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
                                            id='description' 
                                            value={itemDetails.description} 
                                            placeholder='Enter description'
                                            rows="3"
                                        ></textarea>
                                    </div>
                                    
                                    <div className="flex justify-end gap-2 mt-6">
                                        <button 
                                            type="button" 
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" 
                                            onClick={handleClose}
                                        >
                                            Cancel
                                        </button>
                                        <button 
                                            type="submit" 
                                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            {isEditing ? 'Update' : 'Save'}
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
        </div>
    )
}

export default ItemList


// import React, {useRef} from 'react'
// import { useState, useEffect } from 'react'
// import { fetchItems, addItem, editItem, getItemById, deleteItemById, logout } from '../services/Api'
// import { useNavigate } from 'react-router-dom'
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import { Modal } from 'bootstrap';
// import ToastNotification from './common/ToastNotification';
// import useUnauthorizedError from './common/handleUnauthorizedError';
// import DataTable from 'react-data-table-component';
// import jQuery from 'jquery';
// import Header from './common/Header';
// window.$ = window.jQuery = jQuery;



// const ItemList = () => {
//     const handleUnauthorizedError  = useUnauthorizedError();


//     const navigate = useNavigate();
//     const modalRef = useRef(null);
//     const dataTableRef = useRef(null);
//     const tableRef = useRef(null);
//     const roles = JSON.parse(localStorage.getItem("role"));
//     const isAdmin = roles && roles.includes("ADMIN");

//     const [items, setItems] = useState([]);
//     const [modal, setModal] = useState();
//     const [itemDetails, setItemDetails] = useState({
//         name: "",
//         description: "",
//         price: 0
//     })
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

//     useEffect(() => {

//         fetchItems()
//           .then((fetchedItems) => {
//             if(fetchedItems && fetchedItems.data){
//                 setItems(fetchedItems.data);
//             }     
//           })
//           .catch((error) => {
//             console.error('Error fetching items:', error);
//             handleUnauthorizedError(error);
//           });
//       }, [refresh]);

//     useEffect(() => {
//         if (modalRef.current && !modal) {
//             const bootstrapModal = new Modal(modalRef.current);
//             setModal(bootstrapModal);
//         }
//     }, []);

//     // useEffect(() => {
//     //     if (items.length > 0 && tableRef.current) {
//     //         // Destroy existing DataTable instance if it exists
//     //         if (dataTableRef.current) {
//     //             dataTableRef.current.destroy();
//     //             jQuery(tableRef.current).empty();
//     //         }

//     //         // Initialize new DataTable with export buttons and all columns searchable
//     //         dataTableRef.current = jQuery(tableRef.current).DataTable({
//     //             responsive: true,
//     //             pageLength: 10,
//     //             lengthMenu: [5, 10, 25, 50],
//     //             dom: 'Bfrtlip',  // Positions for buttons, length, processing, table, info, pagination
//     //             buttons: [
//     //                 'copy', 'csv', 'excel', 'pdf', 'print'
//     //             ],
//     //             language: {
//     //                 search: "Search:",
//     //                 lengthMenu: "Show _MENU_ entries",
//     //                 info: "Showing _START_ to _END_ of _TOTAL_ entries",
//     //                 paginate: {
//     //                     first: "First",
//     //                     last: "Last",
//     //                     next: "Next",
//     //                     previous: "Previous"
//     //                 }
//     //             },
//     //             // Make all columns searchable
//     //             columnDefs: [
//     //                 {
//     //                     targets: '_all',
//     //                     searchable: true
//     //                 },
//     //                 {
//     //                     targets: -1, // Last column (actions)
//     //                     searchable: false,
//     //                     orderable: false
//     //                 }
//     //             ],
//     //             // Handle cell data rendering
//     //             initComplete: function() {
//     //                 // Add individual column searching
//     //                 this.api().columns().every(function(index) {
//     //                     // Skip the actions column
//     //                     if (index !== 4) { // Assuming actions is the 5th column (index 4)
//     //                         var column = this;
//     //                         var title = column.header().textContent;
//     //                         var input = document.createElement('input');
//     //                         input.placeholder = 'Search ' + title;
//     //                         input.className = 'form-control form-control-sm';
//     //                         jQuery(input).appendTo(jQuery(column.header()))
//     //                             .on('keyup change', function() {
//     //                                 column.search(this.value).draw();
//     //                             });
//     //                     }
//     //                 });
//     //             }
//     //         });

//     //         // Clean up function
//     //         return () => {
//     //             if (dataTableRef.current) {
//     //                 dataTableRef.current.destroy();
//     //                 dataTableRef.current = null;
//     //             }
//     //         };
//     //     }
//     // }, [items]);

//     const addItemModal = () => {
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
//         setItemDetails({
//             name: '',
//             description: '',
//             price: ''
//         });
//         setIsEditing(false);
//         setEditId(null);
//     };

//     const addItemHandle = async (e) => {
//         e.preventDefault();
//         try {
//             if(!isEditing){
//                 const response = await addItem({
//                     name: itemDetails.name,
//                     price : itemDetails.price,
//                     description: itemDetails.description
//                 });
    
//                 setSuccessMessage("Item Added Successfully!")
//                 setShowToast(true);
//                 setToastVariant('success');
//                 setRefresh(prev => !prev)
//                 handleClose();
//             }else{
//                 const response = await editItem(editId, {
//                     name: itemDetails.name,
//                     price : itemDetails.price,
//                     description: itemDetails.description
//                 });

//                 setSuccessMessage("Item Updated Successfully!")
//                 setShowToast(true);
//                 setToastVariant('success');
//                 setRefresh(prev => !prev)
//                 handleClose();
//             }
            
//         } catch (error) {
            
//             handleUnauthorizedError(error);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { id, value } = e.target;
//         setItemDetails(prevState => ({
//             ...prevState,
//             [id]: value
//         }));
//     };

//     const handleEdit = async (id) => {
       
//         try {
//             const response = await getItemById(id);
//             console.log("edit==>" + response)
//             if(response && response.data){
//                 setEditId(id);
//                 setItemDetails(prevState => ({
//                     ...prevState,
//                     name: response.data.name,
//                     description: response.data.description,
//                     price: response.data.price
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

//     const confirmDelete = (id) => {
//         if (window.confirm('Are you sure you want to delete this item?')) {
//             deleteItem(id);
//             setRefresh(prev => !prev);
//         }
//     };

//     const deleteItem = async (id) => {
//         try {
//             deleteItemById(id);
//             setErrorMessage("Item Deleted Successfully!")
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

//     const logOut = async () => {
//         const res = await logout();
//         // localStorage.clear();
//         navigate("/");
//     }

//     const closeToast = () => {
//         setShowToast(false);
//       };

//     const customStyles = {
//         headCells: {
//             style: {
//                 fontWeight: 'bold', // Make the header bold
//             },
//         },
//     };

//     const columns = [
//         {
//             name: 'ID',
//             selector: (row, index) => index + 1,
//             sortable: true,
//         },
//         {
//             name: 'ITEM NAME',
//             selector: row => row.name,
//             sortable: true,
//         },
//         {
//             name: 'DESCRIPTION',
//             selector: row => row.description || 'No description',
//             sortable: true,
//             filterable: true
//         },
//         {
//             name: 'PRICE',
//             selector: row => row.price || 'No description',
//             sortable: true,
//         },
//         {
//             name: 'ACTIONS',
//             cell: (row) => (
//                 <div className='d-flex text-nowrap'>
//                     {isAdmin && (
//                         <>
//                         <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(row.id)}>Edit</button>
//                         <button className="btn btn-danger btn-sm" onClick={() => confirmDelete(row.id)}>Delete</button>
//                         </>
//                     )}
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

//     const filteredItems = items.filter((item) =>
//         item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         item.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
//         item.price.toString().includes(searchTerm)
//     );

//     const indexOfLastItem = currentPage * rowsPerPage;
//     const indexOfFirstItem = indexOfLastItem - rowsPerPage;
//     const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
//     const totalItems = filteredItems.length;
//     const handlePageChange = page => {
//         setCurrentPage(page);
//     };

//     // Handle rows per page change
//     const handleRowsPerPageChange = async (newPerPage, page) => {
//         setRowsPerPage(newPerPage);
//         setCurrentPage(page);
//     };

//     return (
//         <div>
//             <Header></Header>
//             <div className='col-8 container-fluid mt-5'>
                
//                 <div className='d-flex justify-content-end'>
//                     {isAdmin && (
//                         <>
//                         <button className='text-end btn btn-success justify-content-end me-2' onClick={addItemModal}>Add Item</button>
//                         </>
//                     )}
                    
                    
//                 </div>
                
//                 <h3 className='text-center mt-auto text-dark-emphasis'>Item List</h3>
//                 {/* <table className="table table-hover" ref={tableRef}>
//                     <thead>
//                         <tr>
//                         <th scope="col">ID</th>
//                         <th scope="col">Item Name</th>
//                         <th scope="col">Description</th>
//                         <th scope="col">Price</th>
//                         <th scope="col" className='text-end'>Action</th>
//                         </tr>
//                     </thead>
//                     <tbody>
                        
//                         {items.length > 0 ? (items.map((item, index) => (
//                             <tr key={item.id}>
//                             <th scope="row">{index + 1}</th>
//                             <td>{item.name}</td>
//                             <td>{item.description || 'No description'}</td>
//                             <td>{item.price || 'No description'}</td>
//                             <td className='text-end'>
//                             <button className="btn btn-warning btn-sm me-2" id={item.id} onClick={() => handleEdit(item.id)}>Edit</button>
//                             <button className="btn btn-danger btn-sm" onClick={() => confirmDelete(item.id)}>Delete</button>
//                             </td>
//                         </tr>
//                         ))) : (<tr>
//                         <td colSpan="8" className="text-center">
//                             No items available.
//                         </td>
//                         </tr>) 
//                             }
//                     </tbody>
//                 </table> */}

//                 <DataTable
//                     columns={columns}
//                     data={currentItems}
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
                
//                 <div className="modal" tabindex="-1" ref={modalRef} style={{paddingTop: '150px'}}>
//                     <div className="modal-dialog" role="document" style={{alignContent: 'center'}}>
//                         <div className="modal-content">
//                         <div className="modal-header">
//                             <h5 className="modal-title">Modal title</h5>
//                             <button type="button" className="btn-close" aria-label="Close" data-bs-dismiss="modal"
//                                 onClick={handleClose}>
//                             </button>
//                         </div>
//                         <div className="modal-body">
//                             <form onSubmit={addItemHandle} autoComplete='off' autoCorrect='off'>
//                                 <div className='form-group'>
//                                     <label>Item Name</label>
//                                     <input className='form-control' type='text' onChange={handleInputChange} id='name' required 
//                                         placeholder='please enter Item Name' value={itemDetails.name}
//                                     ></input>
//                                 </div>
//                                 <div className='form-group'>
//                                     <label>Price</label>
//                                     <input className='form-control' type='number' onChange={handleInputChange} id='price' required 
//                                         placeholder='please enter Price' value={itemDetails.price}
//                                     ></input>
//                                 </div>
//                                 <div className='form-group'>
//                                     <label>Item Description</label>
                                    
//                                     <textarea onChange={handleInputChange} className='form-control' id='description' 
//                                         value={itemDetails.description} placeholder='Enter Description'
//                                     ></textarea>
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
//         </div>
        
//     )
// }

// export default ItemList
