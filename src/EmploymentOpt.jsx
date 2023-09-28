import React, { useEffect, useState } from 'react';
import './JobPage.css'
import './index.css'
import { JobListsEmployment } from './JobListsEmployment';
import { useNavigate } from 'react-router-dom';
import { addCollectionAndDocument, storage } from './routes/utils/firebase';
import { v4 } from "uuid"; 
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

function EmploymentOpt() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [skills, setSkills] = useState('');
    const [projectLength, setProjectLength] = useState('');
    const [minPayment, setMinPayment] = useState('');
    const [maxPayment, setMaxPayment] = useState('');
    const [workingHours, setWorkingHours] = useState('');
    const [image, setImageUpload] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const job = {
            type: 'Employment',
            title,
            description,
            skills,
            projectLength,
            minPayment,
            maxPayment,
            workingHours,
            image,
        };
        JobListsEmployment.push(job);
        console.log(JobListsEmployment);
        // get last index in JobLits Array
        const index = JobListsEmployment.length - 1;
        addCollectionAndDocument('employmentJobs', JobListsEmployment[index]);
        navigate('/');
    };

    const handleUpload = async (e) => {
        if (image == null) return;
        const imageRef = ref(storage, `images/${image.name + v4()}`);
        await uploadBytes(imageRef, image);
        console.log('Uploaded Image!');
      
        const dbImage = ref(storage, `images/`);
        listAll(dbImage).then((res) => {
          res.items.forEach((itemRef) => {
            console.log(itemRef.name);
          }); 
        });
      
        const url = await getDownloadURL(imageRef);
        console.log(url);
        window.alert('Image Uploaded Successfully!');
        setImageUpload(url);
      };


    return (
        <div className="freelanceBody">
            <div>
                <div className="DescribeYourJob">
                    <h2>Describe Your Job</h2>
                </div>
                <div className="JobDescription">
                    <form onSubmit={handleSubmit}>
                        <label style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "10px" }}>
                            Title/Position
                            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ marginTop: "15px", padding: "12px", boxShadow: "0 0 2px" }} />
                        </label>
                        <br />
                        <label style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "10px" }}>
                            Job Description
                            <textarea type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ marginTop: "15px", padding: "10px", boxShadow: "0 0 2px", boxSizing: "border-box", height: "200px", fontFamily: "Arial, sans-serif"}} />
                        </label>
                        <br />
                        <label style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "10px" }}>
                            Skills
                            <input type="text" name="skills" value={skills} onChange={(e) => setSkills(e.target.value)} style={{ marginTop: "15px", padding: "12px", boxShadow: "0 0 2px" }} placeholder='Please Add Relevant Skills ... ' />
                        </label>
                    </form>

                    <div className="ProjectConditionsBanner">
                        <h2>Project Condition</h2>
                    </div>

                    <div className="ProjectConditions">
                        <form onSubmit={handleSubmit}>
                            <br />
                            <label style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "10px" }}>
                                Project Length
                                <input type="text" name="projectLength" value={projectLength} onChange={(e) => setProjectLength(e.target.value)} style={{ marginTop: "15px", padding: "12px", boxShadow: "0 0 2px" }} />
                            </label>
                            <br />
                            <label style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "-10px" }}>
                                Payment
                            </label>
                            <label style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px", fontStyle: "italic" }}>
                                Min Payment:
                                <input type="text" name="minPayment" value={minPayment} onChange={(e) => setMinPayment(e.target.value)} style={{ marginTop: "15px", padding: "10px", boxShadow: "0 0 2px" }} />
                                <br />
                                Max Payment:
                                <input type="text" name="maxPayment" value={maxPayment} onChange={(e) => setMaxPayment(e.target.value)} style={{ marginTop: "15px", padding: "10px", boxShadow: "0 0 2px" }} />
                            </label>
                            <br />
                            <label style={{ fontSize: "25px", fontWeight: "bold", marginBottom: "10px" }}>
                                Working Hours
                                <input type="text" name="workingHours" value={workingHours} onChange={(e) => setWorkingHours(e.target.value)} style={{ marginTop: "15px", padding: "12px", boxShadow: "0 0 2px" }} />
                            </label>
                            <br />
                            <label style={{ marginTop:"0px", fontSize: "25px", fontWeight: "bold", marginLeft:"235px", marginBottom: "10px" }}>
                                Upload Image
                                <input type="file" name="image" onChange={(e) => setImageUpload(e.target.files[0])} style={{ marginTop: "15px", padding: "12px", boxShadow: "0 0 2px", marginBottom: "35px" }} />
                            </label>
                        </form>
                    </div>
                        <button style={{ marginTop:"-20px", fontSize: "20px", padding:"10px 25px", marginBottom:"80px"}} onClick={handleUpload}>Upload Image</button>
                        <button style={{ fontSize: "35px", marginBottom:"100px"}} type="submit" onClick={handleSubmit}>POST</button>
                    </div>
            </div>
        </div>
    );
}

export default EmploymentOpt;