import React, { useEffect, useState } from 'react'
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import Footer from '../components/Footer';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { setDocData } from '../redux/docSlice';
import Card from '../components/Card';
import RightCol from '../components/RightCol';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const Drawing = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user);
    const allData = useSelector((state) => state.doc);
    const [searchData, setSearchData] = useState([]);
    const [selectedImg, setSelectedImg] = useState(false);
    const [docInfo, setDocInfo] = useState(null);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [isShowSearchData, setIsShowSearchData] = useState(false);
    const [numPages, setNumPages] = useState(null);
    const [selectedPdf, setSelectedPdf] = useState(false);
    const [data, setData] = useState({
        length: "",
        breadth: "",
        category: "",
        totalArea: ""
    })

    const docData = allData?.docList.filter((doc) => doc.category === data.category)
    useEffect(() => {
        console.log(searchData);
    }, [searchData]);
    const handleSearch = () => {
        if (!data.category) {
            return toast("Please choose a category");
        }
        if (!data.length && !data.breadth && !data.totalArea) {
            return toast("Please enter the value atleast one")
        } else {
            setIsShowSearchData(true);
            if (data.length !== "" && data.breadth !== "" && data.totalArea !== "") {
                setSearchData(
                    docData?.filter(
                        (doc) =>
                            doc.length === data.length &&
                            doc.breadth === data.breadth &&
                            doc.totalArea === data.totalArea
                    )
                );
            } else if (data.length !== "" && data.breadth !== "") {
                setSearchData(
                    docData?.filter(
                        (doc) => doc.length === data.length && doc.breadth === data.breadth
                    )
                );
            } else if (data.length !== "") {
                setSearchData(docData?.filter((doc) => doc.length === data.length));
            } else if (data.breadth !== "") {
                setSearchData(docData?.filter((doc) => doc.breadth === data.breadth));
            } else if (data.totalArea !== "") {
                setSearchData(docData?.filter((doc) => doc.totalArea === data.totalArea));
            } else {
                return toast("Search Plan not found");
            }
            setData(() => {
                return {
                    name: "",
                    length: "",
                    category: "",
                    breadth: "",
                    totalArea: ""
                }
            });
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/pdf/data`)
                if (res?.status === 200) {
                    dispatch(setDocData(res?.data))
                }
            } catch (error) {
                if (error?.response?.status == 500) {
                    toast(error?.response?.data);
                }
            }
        }
        fetchData();
    }, [])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handlePhoneCallClick = () => {
        const phoneNumber = import.meta.env.VITE_PHONE_NUMBER;
        const telUrl = `tel:${phoneNumber}`;
        window.open(telUrl, '_blank');
    };

    const handleLoadSuccess = ({ numPages }) => {
        console.log(`Document loaded with ${numPages} pages`);
        setNumPages(numPages);
    };
    const handleCardClick = (doc) => {
        if (doc.category === "jpg") {
            setSelectedImg(true);
            setDocInfo(`data:image/jpeg;base64,${arrayBufferToBase64(doc.pdf.data)}`);
        } else {
            setSelectedPdf(true);
        }
        setSelectedDoc(doc);
    };
    const handleDelete = async (id) => {
        console.log(allData);

        try {
            const res = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/pdf/delete/${id}`)
            if (res.status === 200) {
                toast("item deleted")
                const updatedDocList = allData?.docList.filter(doc => doc.docId !== id);
                dispatch(setDocData(updatedDocList));
            }
        } catch (error) {
            if (error?.response?.status === 500) {
                toast(error?.response?.data)
            }
        }
    }
    function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;

        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }
    const handleDownloadPdf = () => {
        if (selectedDoc) {
            const byteArray = new Uint8Array(selectedDoc.pdf.data)
            const base64Data = btoa(String.fromCharCode.apply(null, byteArray));
            const blob = b64toBlob(base64Data, 'application/pdf');
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${selectedDoc.DocName}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    }
    const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    };
    return (
        <>
            <div className='w-full min-h-screen flex flex-col bg-[#8adada]'>
                <div className='flex items-center p-4 gap-4 w-full'>
                    <div className='w-[50%] flex bg-white rounded-xl shadow-xl flex-col items-center gap-3'>
                        <h1 className='w-full text-xl font-semibold bg-blue-700 p-3 text-center rounded-t-xl text-white'>Search Sample Plan</h1>
                        <div className='mt-3 flex items-center  gap-4'>
                            <p className='text-xl font-semibold'>Book a free consultation :-</p>
                            <span className='text-3xl text-blue-700 cursor-pointer' onClick={handlePhoneCallClick}><BiSolidPhoneCall /></span>
                        </div>
                        <div className='w-full flex items-center justify-between p-2'>
                            <div className='w-[40%] ml-4 gap-1'>
                                <label htmlFor='length' className='item-start text-lg'>By Length</label>
                                <input type='number' id='length' name='length' value={data.length} onChange={handleChange} className='p-1.5 w-full rounded-lg outline-none border-b-2 ' placeholder='Enter length...' />
                            </div>
                            <div className='w-[40%] mr-4 gap-1'>
                                <label htmlFor='breadth' className='item-start text-lg'>By Breadth</label>
                                <input type='number' id='breadth' name='breadth' value={data.breadth} onChange={handleChange} className='p-1.5 w-full rounded-lg outline-none border-b-2 ' placeholder='Enter breadth...' />
                            </div>
                        </div>
                        <div className='w-[100%] flex items-center justify-between gap-1.5 p-2'>
                            <div className='w-[40%] ml-4 gap-1.5'>
                                <label htmlFor='totalArea' className='item-start text-lg'>By Area</label>
                                <input type='number' id='totalArea' name='totalArea' value={data.totalArea} onChange={handleChange} className='p-1.5 w-full rounded-lg outline-none border-b-2 ' placeholder='Enter Square Feet' />
                            </div>
                            <div className='w-[40%] mr-4 flex flex-col gap-1'>
                                <label htmlFor='category' className='item-start text-lg'>Category</label>
                                <select className='p-1.5 outline-none border-b-2 rounded-lg ' id='category' name='category' value={data.category} onChange={handleChange}>
                                    <option>SELECT</option>
                                    <option value={"jpg"}>JPG</option>
                                    {
                                        userData?.token &&
                                        <option value={"pdf"}>PDF</option>
                                    }
                                </select>
                            </div>
                        </div>
                        <div className='w-full flex items-center justify-center my-5'>
                            <button type='button' className='w-[10rem] p-2   hover:bg-blue-950  bg-blue-700 rounded-full text-center text-white text-lg font-semibold' onClick={handleSearch}>Search Now</button>
                        </div>

                    </div>

                    <div className='w-[50%]'>
                        <RightCol />
                    </div>

                </div>
                {
                    isShowSearchData &&
                    <div className='w-full p-5 flex items-center gap-4'>
                        {
                            searchData.length !== 0 ?
                                searchData.map((doc, index) => {
                                    return (
                                        <div key={index} onClick={() => handleCardClick(doc)}>
                                            <Card
                                                docName={doc.DocName}
                                                length={doc.length}
                                                breadth={doc.breadth}
                                                totalArea={doc.totalArea}
                                                category={doc.category}
                                            />
                                        </div>
                                    )
                                })
                                :
                                toast("Document Not Found")
                        }
                    </div>
                }
                {
                    selectedImg &&
                    <div className='w-[60%] m-auto h-full mt-10'>
                        <div className='w-full flex flex-col'>
                            <span className='text-4xl my-1 flex justify-evenly'> <FaArrowAltCircleLeft onClick={() => setSelectedImg(prev => !prev)} className='cursor-pointer' />
                                <a
                                    href={docInfo}
                                    download={`${selectedDoc.DocName}.jpg`}
                                    className='w-[10rem] p-2 hover:bg-blue-950 bg-blue-700 rounded-full text-center text-white text-lg font-semibold'
                                >
                                    Download Now
                                </a>

                                {
                                    userData.email === "imashelp@gmail.com" &&
                                    <span className='cursor-pointer'> <AiFillDelete onClick={() => handleDelete(selectedDoc.docId)} /></span>
                                }
                            </span>
                            <img src={docInfo} alt='image' />
                        </div>
                    </div>}

                {selectedPdf && (
                    <div className='m-auto w-[70%]'>
                        <span className='text-4xl my-1 flex justify-evenly'> <FaArrowAltCircleLeft onClick={() => setSelectedPdf(prev => !prev)} className='cursor-pointer' />
                            <button
                                className='w-[10rem] p-2 hover:bg-blue-950 bg-blue-700 rounded-full text-center text-white text-lg font-semibold' onClick={handleDownloadPdf}>
                                Download Now
                            </button>
                            {
                                userData.email === "imashelp@gmail.com" &&
                                <span className='cursor-pointer'> <AiFillDelete onClick={() => handleDelete(selectedDoc.docId)} /></span>
                            }
                        </span>
                        <div className='w-full gap-2 h-[100vh] overflow-x-scroll'>
                            {selectedDoc.category !== 'jpg' && (
                                <Document
                                    file={{ data: selectedDoc.pdf.data }}
                                    onLoadSuccess={handleLoadSuccess}
                                >
                                    <div className="inline-flex gap-2">
                                        {Array.from(new Array(numPages), (el, index) => (
                                            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                                        ))}
                                    </div>
                                </Document>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    )
}

export default Drawing