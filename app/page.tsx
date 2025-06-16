import Card from "./components/Card";
import { DollarSign } from "lucide-react";


export default function Home() {
  return (
    <div className="flex space-x-8 p-6">

        <div>
        <Card icon = {<DollarSign size={20}/>} 
        label="Total Revenue"
        amount="KD 53,009.89"
        sales="12% increase from last month"/>  
        </div>

        <div>
        <Card icon = {<DollarSign size={20}/>} 
        label="Installment Pending KD"
        amount="KD 5,000"
        sales="10% decrease from last month"/> 
        </div>

        <div>
        <Card icon = {<DollarSign size={20}/>} 
        label="Institute share Percentage"
        amount="KD 4,000"
        sales="8% increase from last month"/>   
        </div>

        <div>
        <Card icon = {<DollarSign size={20}/>} 
        label="Instructor share Percentage"
        amount="KD 5,000"
        sales="2% increase from last month"/> 
        </div>

    </div>       
  );
}
