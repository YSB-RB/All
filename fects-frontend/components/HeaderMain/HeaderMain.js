import React from 'react'

const HeaderMain = (props) => {
    return (
        <div className={`d-flex ${props.className}`}>
            <h1 className="display-4 mr-3 mb-0 align-self-start text-black-500">
                {props.title}
            </h1>
        </div>
    )
}

HeaderMain.defaultProps = {
    title: "Waiting for Data...",
    subTitle: "Waiting for Data...",
    className: "my-4"
};

export default HeaderMain