import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';

function ErrorPage() {
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", fontSize: "25px"}}>
            <CloseCircleOutlined style={{fontSize: "50px", margin: "40px"}}/>
            There was an error processing your request...
        </div>
    );
}

export default ErrorPage;