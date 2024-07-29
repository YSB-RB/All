const AddMultiple = () => {
    const [tags, setTags] = useState([])
    const [tagInput, setTagInput] = useState('')

    const HandleAddTag = () => {
        if (tagInput.trim() !== "") {
            setTags([...tags, tagInput.trim()])
            setTagInput("")
        }
    }
    const handleDelete = (index) => {
        const updatedTags = [...tags];
        updatedTags.splice(index, 1);
        setTags(updatedTags);
    };

    const TagStyle = {
        marginRight: '5px',
        marginButton: '5px',
        padding: "3px 8px",
        color: "white",
        backgroundColor: 'teal',
        borderRadius: '3px',
        display: 'inline block',
        marginTop: "2px"
    }
    const colorStatus = ["info", "success", "warning", "primary"];


    return (
        <>
            <InputGroup>
                <Input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="Add here" />
                <Button color="primary" className="align-self-center" id="tooltipAddNew" onClick={HandleAddTag}>
                    <i className="fa-fw fa fa-plus"></i>
                </Button>
            </InputGroup>

            <div style={{ marginTop: '10px' }}>
                {
                    tags.map((tag, index) => (
                        <span key={index} style={TagStyle}>
                            {tag}
                            <span style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={() => handleDelete(index)}>x</span>
                        </span>
                    ))
                }
            </div >
        </>

        // <>
        //   <div className="flex items-center">
        //     <input
        //       type="text"
        //       value={tagInput}
        //       onChange={(e) => setTagInput(e.target.value)}
        //       placeholder="Add here"
        //       className="border border-gray-300 p-2 rounded-l-md flex-grow"
        //     />
        //     <button
        //       onClick={HandleAddTag}
        //       className="bg-blue-500 text-white p-2 rounded-r-md"
        //     >
        //       +
        //     </button>
        //   </div>

        //   <div className="mt-2">
        //     {tags.map((tag, index) => (
        //       <span
        //         key={index}
        //         className="mr-2 mb-2 px-2 py-1 bg-teal-500 text-white rounded inline-block"
        //       >
        //         {tag}
        //         <span
        //           className="ml-1 cursor-pointer"
        //           onClick={() => handleDelete(index)}
        //         >
        //           x
        //         </span>
        //       </span>
        //     ))}
        //   </div>
        // </>
    )
}