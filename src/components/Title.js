import React from "react";

class Title extends React.Component{
    constructor(){
        super();
        this.state = {
            title: "Aplikasi Pertama Projek",
            subtitle: "dibuat oleh isna"
        }
    }

    render(){
        return(
            <div>
                <h1>{this.state.title}</h1>
                <p>{this.state.subtitle}</p>
            </div>           
        )
    }

}

export default Title;