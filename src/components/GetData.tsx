import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import BarChart from "./BarChart";
import csvtojson from 'csvtojson';

export default function GetData() {


  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('ADCC_2022.csv');
      const csvData = await response.text();
      const jsonData = await csvtojson().fromString(csvData);

      console.log(jsonData)
      setData(jsonData);
    };

    fetchData();
  }, []);


  const getFrequencies = (key: string, sex?: string, bracket?: string, includeNaN?: boolean) => {
    const frequencies: {[key: string]: number} = {};

    const withSex = sex? data?.filter((each: any) => each.sex === sex): data

    const withBracket = bracket? withSex?.filter((each: any) => each.bracket === bracket): withSex

    withBracket?.forEach((match: any) => {
      const item = match[key];
      
      if (item && (includeNaN || item !== "NaN")) { 
        if (item in frequencies) {
          frequencies[item]++; 
        } else {
          frequencies[item] = 1; 
        }
      }
    });

    const sortedFrequencies = Object.entries(frequencies)
    .sort((a, b) => b[0].localeCompare(a[0]))
    .sort((a, b) => b[1] - a[1])
    .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});

    return sortedFrequencies
  };

 

  const submissionFrequencies = getFrequencies("submission");
  const bracketFrequencies = getFrequencies("bracket");

  const sexFreq = getFrequencies("sex");

  const typeWin = getFrequencies("type_win");

  const matchDuration = getFrequencies("match_duration");

  const subsM = getFrequencies("submission", "M");

  const subsF = getFrequencies("submission", "F");


  const subsFM60 = getFrequencies("submission", "F", "- 60KG", true);

  const subsMM60 = getFrequencies("submission", "M", "- 99 KG", true);


  const getUniqueBrackets = () => {


    const unique: any[] = []


    data?.forEach((match: { bracket: string; sex: string }) => {
      const { bracket, sex } = match;
  
      if (!unique.some(([existingBracket, existingSex]) => existingBracket === bracket && existingSex === sex)) {
        unique.push([bracket, sex]);
      }
    });
  
    return unique;
  }


  

  return (
    <Box sx={{display: "flex", alignItems: "center", flexDirection: "column"}}>

        <h1>ADCC 2022 Matches Dataset</h1>
        <a href="https://www.kaggle.com/datasets/matheusalves1/adcc-2022-matches-dataset?resource=download">Dataset</a>


      <BarChart data={submissionFrequencies} chartName="Submissions:" />

      <BarChart data={subsM} chartName="Male Submissions:" />

      <BarChart data={subsF} chartName="Female Submissions:" />

      <BarChart data={bracketFrequencies} chartName="Weight:" />

      <BarChart data={sexFreq} chartName="Sex:" />

      <BarChart data={typeWin} chartName="Type Win:" />

      <BarChart data={matchDuration} chartName="Match Durations:" />


      {/* {["M", "F"].map(sex => {
        return ["- 60 KG", "+ 60 KG", "- 66KG", "- 77KG", "- 88 KG", "- 99 KG", "+ 99KG", "ABSOLUTE"].map(bracket => <BarChart data={getFrequencies("submission", sex, bracket, true)} chartName={sex + " " + bracket} />)
      })} */}

      <h2>Submissions by bracket:</h2>

      {getUniqueBrackets().map((each) => {

        const bracket = each[0]
        const sex = each[1]
       

        return <BarChart data={getFrequencies("submission", sex, bracket, true)} chartName={sex + " " + bracket}/>
      })}

      

      


    </Box>
  );
}
