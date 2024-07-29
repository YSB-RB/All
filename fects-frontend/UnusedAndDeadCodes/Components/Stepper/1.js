// const steps = ['Basic Details', 'Account Details', 'Password Setting'];

// const CreateUser = () => {
//     const [activeStep, setActiveStep] = React.useState(0);
//     const [skipped, setSkipped] = React.useState(new Set());

//     const isStepOptional = (step) => {
//         return step === 1;
//     };

//     const isStepSkipped = (step) => {
//         return skipped.has(step);
//     };

//     const handleNext = () => {
//         let newSkipped = skipped;
//         if (isStepSkipped(activeStep)) {
//             newSkipped = new Set(newSkipped.values());
//             newSkipped.delete(activeStep);
//         }

//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//         setSkipped(newSkipped);
//     };

//     const handleBack = () => {
//         setActiveStep((prevActiveStep) => prevActiveStep - 1);
//     };

//     const handleSkip = () => {
//         if (!isStepOptional(activeStep)) {
//             // You probably want to guard against something like this,
//             // it should never occur unless someone's actively trying to break something.
//             throw new Error("You can't skip a step that isn't optional.");
//         }
//         setActiveStep((prevActiveStep) => prevActiveStep + 1);
//     };

//     const HandleBack = () => {
//         setActiveStep(0);
//     };

//     return (
//         <div className="mt-40">
//             <Card className="w-[1024px] m-auto border border-gray-100">
//                 <div className="flex justify-center gap-4">
//                     <Stepper activeStep={activeStep} className="mt-20">
//                         {steps.map((label, index) => {
//                             const stepProps = {};
//                             const labelProps = {};
//                             if (isStepSkipped(index)) {
//                                 stepProps.completed = false;
//                             }
//                             return (
//                                 <Step key={label} {...stepProps}>
//                                     <StepLabel {...labelProps}>{label}</StepLabel>
//                                 </Step>
//                             );
//                         })}
//                     </Stepper>
//                 </div>

//                 {activeStep === 0 && <BasicDetails />}
//                 {activeStep === 1 && <AccountDetails />}
//                 {activeStep === 2 && <PasswordSetting />}

//                 {activeStep === steps.length ? (
//                     <>
//                         <Typography sx={{ mt: 2, mb: 1 }}>
//                             All steps completed - you&apos;re finished
//                         </Typography>
//                         <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
//                             <Box sx={{ flex: '1 1 auto' }} />
//                             <Button onClick={HandleBack}>Back</Button>
//                         </Box>
//                     </>
//                 ) : (
//                     <>
//                         <div className="flex justify-between mt-10">
//                             <Button
//                                 color="inherit"
//                                 disabled={activeStep === 0}
//                                 onClick={handleBack}
//                                 sx={{ mr: 1 }}
//                             >
//                                 Back
//                             </Button>
//                             <Button onClick={handleNext}>
//                                 {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
//                             </Button>
//                         </div>
//                     </>
//                 )}

//             </Card>
//         </div>
//     );
// }

// export default CreateUser







"use control"

import React, { useState, useEffect } from "react"

const ToggleControl = () => {
    const [isHidden, setIsHidden] = useState(false)
    
    const HandleToggle = () => {
        setIsHidden(!isHidden)
    }

    useEffect(() => {
        const htmlElement = document.documentElement;
        if (isHidden) {
            htmlElement.classList.add('hide_controls');
        } else {
            htmlElement.classList.remove('hide_controls');
        }
    }, [isHidden]);

    return (
        <span onClick={HandleToggle} className="control_toggle"></span>
    )
}

export default ToggleControl;