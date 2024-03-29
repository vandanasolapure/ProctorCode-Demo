import React,{useState, useEffect} from "react";
import axios from "axios";
import {toast} from "react-hot-toast"
import { useParams } from "react-router-dom";

const Problem = ()=>{

    const [output, setOutput] = useState(null);
    const [loading, setLoading] = useState(false);
    const {examCode} = useParams();

    useEffect(() => {
        const fetchProblemStatement = async () => {
          console.log("EDITOR IS HERE!")
          try {
            setLoading(true);
            const response = await axios.post("http://localhost:3001/exam/getOneExam", {
              examCode: examCode // Replace "your_exam_code_here" with the actual exam code
            }); // Make API call to fetch a single exam
    
            console.log("DATA IN EDITOR", response)
            const problemStatements = response.data.problemStatement;
            console.log("problemStateMent is ",problemStatements)
    
    
            if (problemStatements && problemStatements.length > 0) {
              const randomIndex = Math.floor(Math.random() * problemStatements.length);
              const randomProblemStatement = problemStatements[randomIndex].problemStatementDescription;
              setOutput(randomProblemStatement);
              console.log(output);
            }
          } catch (error) {
            toast.error("An error occurred while fetching problem statement");
            console.error(error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchProblemStatement();
      }, []);



    return(
<div className="p-4">
    <p className="font-semibold mt-10">Alloted Problem Statement : </p>
    <p className="mt-5">
{output}
    </p>
</div>
    )

}

export default Problem;