import React from "react";
import * as widgetServices from "./widgetServices";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Widget extends React.Component{
constructor (props){
    super(props)
    this.state = {
        name: "",
        manufacturer: "",
        description : "",
        cost : parseInt()
    };
};

changeInfo=(e)=>{
    this.setState({
        [e.target.name]:e.target.value
    });
};

onSubmit=(e)=>{
    e.preventDefault();
    const shoeData = this.state;
    
    widgetServices.create(shoeData)
        .then(this.onCreateSuccess)
        .catch(this.onCreateError)
}

onCreateSuccess=(response)=>{
    console.log(response);
    toast.success(`You have successfully created ${response.data.item}!`, {hideProgressBar:true});

};

onCreateError=(response)=>{
    console.error({"error": response});
    toast.warn("Please try again.", {hideProgressBar:true});
};


    render(){
        return (
            <form style={{margin: "5rem",}}>
            <div className="form-group">
                <label htmlFor="nameInput">Name</label>
                <input 
                type="text" 
                required={true}
                minLength="1"
                className="form-control"
                name="name" 
                value = {this.state.name}
                onChange ={this.changeInfo}/>
            </div>
            <div className="form-group">
                <label htmlFor="manufacturer">Manufacturer</label>
                <input type="text"
                required={true}
                minLength="2"
                className="form-control" 
                name="manufacturer" 
                value = {this.state.manufacturer}
                onChange ={this.changeInfo}/>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input type="text"
              required={true}
              minLength="5"
              className="form-control"
              name = "description"
              value = {this.state.description}
              onChange ={this.changeInfo}/>
            </div>
            <div className="mb-3">
              <label htmlFor="cost" className="form-label">Cost</label>
              <input type="number"
              required={true}
              minLength="1"
              className="form-control" 
              name="cost"
              value = {this.state.cost}
              onChange ={this.changeInfo}/>
            </div>
            <button type="submit"
            className="btn btn-primary"
            form="submitForm" 
            onClick={this.onSubmit}>
                Submit
            </button>
          </form>
        )
    };
};

export default Widget;