// import React, { useMemo, forwardRef } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';

// // Custom Quill Wrapper to avoid findDOMNode issues
// const QuillEditor = forwardRef(({ 
//   value, 
//   onChange, 
//   modules, 
//   formats, 
//   placeholder, 
//   ...props 
// }, ref) => {
//   // Default modules if not provided
//   const defaultModules = useMemo(() => ({
//     toolbar: [
//       [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//       ['bold', 'italic', 'underline', 'strike'],
//       [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//       [{ 'script': 'sub'}, { 'script': 'super' }],
//       [{ 'indent': '-1'}, { 'indent': '+1' }],
//       [{ 'color': [] }, { 'background': [] }],
//       [{ 'font': [] }],
//       [{ 'align': [] }],
//       ['link', 'image', 'video'],
//       ['clean']
//     ],
//     clipboard: {
//       matchVisual: false,
//     }
//   }), []);

//   // Default formats if not provided
//   const defaultFormats = [
//     'header',
//     'bold', 'italic', 'underline', 'strike',
//     'list', 'bullet',
//     'script',
//     'indent',
//     'color', 'background',
//     'font',
//     'align',
//     'link', 'image', 'video'
//   ];

//   return (
//     <ReactQuill 
//       ref={ref}
//       value={value}
//       onChange={onChange}
//       modules={modules || defaultModules}
//       formats={formats || defaultFormats}
//       placeholder={placeholder || "Write your content here..."}
//       {...props}
//     />
//   );
// });

// // Wrapper Component
// const TextEditor = ({ 
//   value, 
//   onChange, 
//   modules,
//   formats,
//   placeholder,
//   ...props 
// }) => {
//   return (
//     <div>
//       <QuillEditor 
//         value={value}
//         onChange={onChange}
//         modules={modules}
//         formats={formats}
//         placeholder={placeholder}
//         {...props}
//       />
//     </div>
//   );
// };

// export default TextEditor;