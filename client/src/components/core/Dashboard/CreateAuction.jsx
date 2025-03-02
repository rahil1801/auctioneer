import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createAuction, fetchCategories } from '../../../services/operations/auctionAPI';

import { FaUser } from 'react-icons/fa';
import { AiFillProduct } from "react-icons/ai";
import { AiOutlineDelete } from 'react-icons/ai';
import { MdOutlineFileUpload } from "react-icons/md";
import { MdSubtitles } from "react-icons/md";


const CreateAuction = () => {

    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [preview, setPreview] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");

    const {
        register,
        reset,
        setValue,
        handleSubmit,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    //handle input change
    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if(file){
        setValue("image", file);
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
        }
    }

    const removeImage = () => {
        setValue("image", null);
        setPreview(null);
        if(fileInputRef.current){
        fileInputRef.current.value = "";
        }
    }

    const handleDateChange = (e) => {
        const date = e.target.value;
        const now = new Date(); 
        
        if (!date) return;

        // Append the current time (HH:mm:ss) to the selected date
        const formattedDateTime = new Date(`${date}T${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}Z`).toISOString();
        
        // Set the value in formData
        setValue("auctionDate", formattedDateTime);
    };

    const onSubmit = async (data) => {
        try{
            //console.log("DATA", data);
            const formData = new FormData();

            console.log("DATE", data.auctionDate);
            console.log("PRICE", data.startingPrice);

            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("category", data.category);
            formData.append("startingPrice", data.startingPrice);
            formData.append("auctionDate", data.auctionDate);

            if(data.image instanceof File){
                formData.append("image", data.image);
            }

            //console.log("FORMDATA", [...formData.entries()]);

            //API Call
            const response = await createAuction(formData, navigate);
        }
        catch(error){
            console.error("Error submitting form:", error.response?.data || error.message);
            alert("Failed to create auction. Please try again.");
        }

    }

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                title:"",
                description:"",
                category:"",
                startingPrice:"",
                auctionDate:"",
            })

            setPreview(null);
        }
    })

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            try {
                const categories = await fetchCategories();
                if (Array.isArray(categories) && categories.length > 0) {
                    setCategories(categories);
                } else {
                    setCategories([]); // Ensure it's an empty array if categories is undefined or not an array
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
                setCategories([]); // Ensure it's an empty array in case of an error
            }
            setLoading(false);
        };
        getCategories();
    }, []);

    //console.log("CATEGORIES", categories);

    return(
        <div className="flex items-center flex-col w-full min-h-[575px] overflow-y-auto bg-white text-3xl p-10">
            <h1 className="bg-[#F2EFE7] w-full px-8 py-6 rounded-4xl text-center 
            font-sans uppercase font-bold text-6xl">Create Auction</h1>

            <div className="flex flex-col gap-4 w-full mt-10">
                <h1 className='font-mono font-medium text-lg'>Fill up the form to create an auction for a product:</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='w-[60%] mx-auto'>
                     <div className="w-full flex flex-col items-center">
                            <div className="w-full flex flex-col items-center relative bg-gray-100 rounded-xl overflow-hidden">
                                {
                                    preview ? (
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                    ) :
                                        <div className='py-6 flex flex-col items-center'>
                                            <div className="w-fit">
                                                <div className='p-3 bg-gray-200 rounded-full'>
                                                    <AiFillProduct fontSize={16} className="w-full h-full text-white p-1 rounded-full bg-black"/>
                                                </div>
                                            </div>
                                            
                                            <p className='text-sm font-medium mt-3 text-gray-400'>Images must be 256 x 256px - Max 10MB</p>
                                            
                                            {/* Upload Button */}
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current.click()} // Trigger hidden file input
                                                className="w-fit flex items-center gap-3 self-center mt-3 font-medium text-sm bg-white
                                                text-black border border-gray-300 rounded-lg px-4 py-2 cursor-pointer"
                                            >
                                                <MdOutlineFileUpload />
                                                Upload Product Picture
                                            </button>
                                        </div>
                                }
        
                                {
                                    preview &&
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute bottom-2 right-2 mt-2 p-2 bg-red-500 text-white cursor-pointer text-sm rounded-full"
                                    >
                                        <AiOutlineDelete />
                                    </button>
                                }
                            </div>
                        </div>
    
                        {/* Hidden File Input */}
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            style={{ display: "none" }}
                            onChange={handleImageChange}
                        />

                        {/* New Section from here */}
                        <div className='flex flex-col gap-2 mt-5'>
                            <label htmlFor='title' className="text-base text-gray-500 font-medium">Title of Product</label>
                            <div className="flex items-center rounded-lg px-4 py-2 w-full gap-3 bg-white border-2 border-gray-300">
                                <div className="flex flex-col w-full gap-1">
                                    <input
                                        required
                                        type="title"
                                        name='title'
                                        id='title'
                                        className="outline-none text-lg text-black bg-transparent w-full"
                                        placeholder="Enter Title"
                                        {...register('title', {required:true}) }
                                    />
                                    {errors.title && <span className="text-red-500 text-sm mt-1 block">Please enter Title</span>}
                                </div>
                            </div>
                        </div>

                        <div className='gap-2 mt-5'>
                            <label htmlFor='description' className="text-base text-gray-500 font-medium">Description of Product</label>
                            <div className="rounded-lg px-4 py-2 w-full gap-3 bg-white border-2 border-gray-300">
                                
                                <textarea
                                    required
                                    name='description'
                                    id='description'
                                    className="outline-none resize-none min-h-20 text-lg text-black bg-transparent w-full"
                                    placeholder="Enter Description"
                                    {...register('description', {required:true}) }
                                ></textarea>
                                {errors.description && <span className="text-red-500 text-sm mt-1 block">Please enter Description</span>}
                            
                            </div>
                        </div>

                        <div className="mt-5">
                            <label htmlFor="category" className="text-base text-gray-500 font-medium">
                                Category
                            </label>
                            
                                <select
                                    id="category"
                                    defaultValue=""
                                    {...register("category", {required:true})}
                                    className="rounded-lg h-full w-full text-base outline-none gap-3 bg-white border-2 
                                    py-2 border-gray-300"
                                >
                                    <option value="" disabled>Choose a Category</option>

                                    {
                                        !loading && categories.map((category, index) => (
                                            <option key={index} value={category?._id}>
                                                {category?.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            
                            {
                                errors.category && (
                                    <span className="text-red-500">This field is required</span>
                                )
                            }
                        </div>

                        <div className='flex flex-col gap-2 mt-5'>
                            <label htmlFor='startingPrice' className="text-base text-gray-500 font-medium">Starting Price (Min. 100$)</label>
                            <div className="flex items-center rounded-lg px-4 py-2 w-full gap-3 bg-white border-2 border-gray-300">
                                <div className="flex flex-col w-full gap-1">
                                <input
                                    required
                                    type="number"
                                    min={100} // Ensures values below 1000 are not accepted
                                    name="startingPrice"
                                    id="startingPrice"
                                    className="outline-none text-lg text-black bg-transparent w-full"
                                    placeholder="Enter Starting Price"
                                    {...register('startingPrice', {
                                        required: true,
                                        min: {
                                            value: 100,
                                            message: "Starting price must be greater than 100"
                                        }
                                    })}
                                />
                                    {errors.startingPrice && <span className="text-red-500 text-sm mt-1 block">Please enter Starting Price</span>}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 mt-5">
                            <label htmlFor="auctionDate" className="text-base text-gray-500 font-medium">Auction Date</label>
                            <div className="flex items-center rounded-lg px-4 py-2 w-full gap-3 bg-white border-2 border-gray-300">
                                <div className="flex flex-col w-full gap-1">
                                    <input
                                        required
                                        type="date"
                                        name="auctionDate"
                                        id="auctionDate"
                                        className="outline-none text-lg text-black bg-transparent w-full"
                                        placeholder="Select Auction Date"
                                        min={new Date().toISOString().split("T")[0]} // Restricts past dates
                                        onChange={handleDateChange} // Updates the state
                                    />
                                    {selectedDate && (
                                        <span className="text-gray-500 text-sm mt-1 block">Selected Date-Time: {selectedDate}</span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <button type='submit' disabled={loading}
                        className='text-base mt-5 px-6 py-2 bg-[#2973B2] text-white hover:bg-blue-600 transition-all duration-300 rounded-lg cursor-pointer'>
                            {
                                loading ? "Creating..." : "Create Auction"
                            }
                        </button>
                        
                </form>
            </div>
        </div>
    )
};

export default CreateAuction;